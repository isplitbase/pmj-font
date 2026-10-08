<?php
/*
 * マスタ(v2ac_kanjo_master.json)を GCS へ転送する (cron から10分ごとに実行)
 *
 *   検証: この php → pmj-door      → pmj-simpletool      → gs://pmjbase/ 直下
 *   本番: この php → pmj-door-real → pmj-simpletool-real → gs://pmjbase/real/ 直下
 *
 *   送る条件:
 *     ・ファイルの更新が30分以内
 *     ・かつ、その送り先へ前回送れた中身(md5)と違う
 *       (kanri_itask_put_master.do が中身が同じでも毎分書き直すため、更新時刻だけだと毎回送ってしまう)
 *     ・JSON として読めること(書き込み途中のファイルを送らない)
 *   送れなかった送り先は、次の回(10分後)にもう一度送る。
 *
 *   置き場所: /data/pmj_cron/master_to_gcs.php (Web から実行されないよう Web ルートの外)
 *   cron:     /etc/cron.d/pmj_master_gcs
 *   記録:     /data/pmj_cron/master_to_gcs.log (送ったとき・失敗したときだけ書く)
 *   状態:     /data/pmj_cron/master_to_gcs.state.json (送り先ごとの、送れた md5 と日時)
 *
 *   手動実行:
 *     php /data/pmj_cron/master_to_gcs.php            … 通常(条件を満たすときだけ送る)
 *     php /data/pmj_cron/master_to_gcs.php --force    … 条件を見ずに送る
 *     php /data/pmj_cron/master_to_gcs.php --dry-run  … 送らずに、送るかどうかだけ表示
 *     (--only=test / --only=real で片方だけ)
 */

date_default_timezone_set("Asia/Tokyo");   // CLI の php は UTC になっているため

$SRC        = "/var/www/html/pys/v2ac_kanjo_master.json";
$WINDOW_SEC = 30 * 60;
$DIR        = "/data/pmj_cron";
$LOG        = $DIR . "/master_to_gcs.log";
$STATE      = $DIR . "/master_to_gcs.state.json";
$LOCK       = $DIR . "/master_to_gcs.lock";
$SA_JSON    = "/data/gen-lang-client-0018414550-f50b079b0584.json";

// 送り先 (door の URL = ID token の audience)。door 側に TARGET_SIMPLETOOL が必要
$DESTS = array(
	"test" => array("door" => "https://pmj-door-512697354748.asia-northeast1.run.app",      "where" => "gs://pmjbase/"),
	"real" => array("door" => "https://pmj-door-real-512697354748.asia-northeast1.run.app", "where" => "gs://pmjbase/real/"),
);
$DOOR_TARGET = "simpletool";
$DOOR_PATH   = "/gcs_put";

// ---- 引数 ----
$opt_force = in_array("--force", $argv, true);
$opt_dry   = in_array("--dry-run", $argv, true);
$opt_only  = null;
foreach ($argv as $a) {
	if (strpos($a, "--only=") === 0) { $opt_only = substr($a, 7); }
}

function mtg_log($msg) {
	global $LOG;
	$line = date("Y-m-d H:i:s") . " " . $msg . "\n";
	@file_put_contents($LOG, $line, FILE_APPEND);
	echo $line;
}

// base64url
function mtg_b64url($data) {
	return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

// サービスアカウントJWT で Cloud Run 用 ID token を取得 (audience = door の URL)
//   keieidangi_call_ai.do の get_cloud_run_id_token_keieidangi と同じ方式
function mtg_id_token($sa_path, $audience) {
	$sa = json_decode((string)@file_get_contents($sa_path), true);
	if (!is_array($sa) || empty($sa["client_email"]) || empty($sa["private_key"]) || empty($sa["token_uri"])) {
		throw new Exception("service account json が読めません");
	}
	$now = time();
	$head  = mtg_b64url(json_encode(array("alg" => "RS256", "typ" => "JWT")));
	$claim = mtg_b64url(json_encode(array(
		"iss" => $sa["client_email"], "sub" => $sa["client_email"], "aud" => $sa["token_uri"],
		"iat" => $now, "exp" => $now + 3600, "target_audience" => $audience,
	), JSON_UNESCAPED_SLASHES));
	$key = openssl_pkey_get_private($sa["private_key"]);
	if ($key === false) { throw new Exception("秘密鍵が読めません"); }
	$sig = "";
	if (!openssl_sign($head . "." . $claim, $sig, $key, OPENSSL_ALGO_SHA256)) { throw new Exception("署名に失敗"); }
	$ch = curl_init($sa["token_uri"]);
	curl_setopt_array($ch, array(
		CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true,
		CURLOPT_POSTFIELDS => http_build_query(array(
			"grant_type" => "urn:ietf:params:oauth:grant-type:jwt-bearer",
			"assertion"  => $head . "." . $claim . "." . mtg_b64url($sig),
		)),
		CURLOPT_CONNECTTIMEOUT => 10, CURLOPT_TIMEOUT => 60,
	));
	$res = curl_exec($ch);
	$err = curl_error($ch);
	curl_close($ch);
	$j = json_decode((string)$res, true);
	if (!is_array($j) || empty($j["id_token"])) {
		throw new Exception("id_token が取れません: " . ($err ? $err : substr((string)$res, 0, 200)));
	}
	return $j["id_token"];
}

// door 経由で simpletool の /gcs_put を呼ぶ。成功なら応答の配列、失敗なら例外
function mtg_send($door, $payload) {
	global $SA_JSON, $DOOR_TARGET, $DOOR_PATH;
	$token = mtg_id_token($SA_JSON, $door);
	$body = json_encode(array("target" => $DOOR_TARGET, "path" => $DOOR_PATH, "payload" => $payload));
	$ch = curl_init($door . "/call");
	curl_setopt_array($ch, array(
		CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_POSTFIELDS => $body,
		CURLOPT_HTTPHEADER => array("Content-Type: application/json", "Authorization: Bearer " . $token),
		CURLOPT_CONNECTTIMEOUT => 10, CURLOPT_TIMEOUT => 300,
	));
	$res  = curl_exec($ch);
	$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	$err  = curl_error($ch);
	curl_close($ch);
	if ($res === false) { throw new Exception("door 通信エラー: " . $err); }
	$j = json_decode($res, true);
	if ($code != 200 || !is_array($j) || !isset($j["status"]) || $j["status"] !== "OK") {
		throw new Exception("HTTP " . $code . " " . substr(preg_replace('/\s+/', ' ', $res), 0, 300));
	}
	return $j;
}

// ---- 本体 ----
if (!is_dir($DIR)) { @mkdir($DIR, 0775, true); }

// 前の回がまだ動いていたら何もしない
$lock = fopen($LOCK, "c");
if (!$lock || !flock($lock, LOCK_EX | LOCK_NB)) { exit(0); }

clearstatcache();
if (!is_file($SRC)) { mtg_log("NG ファイルがありません: " . $SRC); exit(1); }
$mtime = filemtime($SRC);
$age   = time() - $mtime;
if (!$opt_force && $age > $WINDOW_SEC) {
	if ($opt_dry) { echo "更新から " . floor($age / 60) . " 分たっているので送りません\n"; }
	exit(0);
}

$data = file_get_contents($SRC);
if ($data === false || $data === "") { mtg_log("NG 読み込めません: " . $SRC); exit(1); }
if (json_decode($data) === null) { mtg_log("SKIP JSON として読めない(書き込み途中の可能性)。次の回に再確認"); exit(0); }
$md5 = md5($data);

$state = json_decode((string)@file_get_contents($STATE), true);
if (!is_array($state)) { $state = array(); }

$payload = null;     // 必要になったときだけ作る
$rc = 0;
foreach ($DESTS as $name => $d) {
	if ($opt_only !== null && $opt_only !== $name) { continue; }
	if (!$opt_force && isset($state[$name]["md5"]) && $state[$name]["md5"] === $md5) {
		if ($opt_dry) { echo $name . ": 送信済みと同じ中身なので送りません (md5 " . $md5 . ")\n"; }
		continue;
	}
	if ($opt_dry) { echo $name . ": 送ります → " . $d["where"] . " (md5 " . $md5 . ", 更新 " . date("Y-m-d H:i:s", $mtime) . ")\n"; continue; }
	if ($payload === null) {
		$payload = array(
			"filename"         => basename($SRC),
			"content_gzip_b64" => base64_encode(gzencode($data, 9)),
			"md5"              => $md5,
		);
	}
	try {
		$t0 = microtime(true);
		$j = mtg_send($d["door"], $payload);
		$state[$name] = array("md5" => $md5, "sent_at" => date("Y-m-d H:i:s"), "uri" => $j["uri"]);
		@file_put_contents($STATE, json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
		mtg_log("OK " . $name . " " . $j["uri"] . " size=" . $j["size"] . " md5=" . $md5 . " " . round(microtime(true) - $t0, 1) . "s");
	} catch (Exception $e) {
		mtg_log("NG " . $name . " " . $e->getMessage());
		$rc = 1;
	}
}
exit($rc);
