<?php
/*
 * 149 から pmj-door-real 経由で、画像補正・再分析の Cloud Run に届くかを確認する (任意)
 *   使い方 (root で):  php check_door.php
 *   ・OpenAI の画像生成は呼ばない(料金はかからない)。ping だけ
 *   ・root のシェルのプロキシ設定(https_proxy)をそのまま使う
 */
require "/var/www/html/ikisaki_tool/ikisaki_itask_tool/keieidangi_call_ai.do";
$door = "https://pmj-door-real-512697354748.asia-northeast1.run.app";
echo "door: $door\n";
try {
	$tok = get_cloud_run_id_token_keieidangi(KEIEIDANGI_SA_JSON, $door);
	echo "[OK] ID トークン取得\n";
} catch (Exception $e) {
	echo "[NG] ID トークン取得: " . $e->getMessage() . "\n";
	exit(1);
}
$rc = 0;
foreach (array(array("hoseiimges", "/ping", "画像補正 (pmj-hosei-imges-real)"),
               array("aitext1",    "/ping", "再分析   (pmj-aitext-1-real)")) as $t) {
	$ch = curl_init($door . "/call");
	curl_setopt_array($ch, array(
		CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_CONNECTTIMEOUT => 10, CURLOPT_TIMEOUT => 120,
		CURLOPT_HTTPHEADER => array("Content-Type: application/json", "Authorization: Bearer " . $tok),
		CURLOPT_POSTFIELDS => json_encode(array("target" => $t[0], "path" => $t[1], "payload" => new stdClass())),
	));
	$r = curl_exec($ch);
	$c = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	$e = curl_error($ch);
	curl_close($ch);
	$j = json_decode((string)$r, true);
	if ($c == 200 && is_array($j) && isset($j["status"]) && $j["status"] === "OK") {
		echo "[OK] " . $t[2] . "\n";
	} else {
		echo "[NG] " . $t[2] . " HTTP " . $c . " " . ($e ? $e : substr(preg_replace('/\s+/', ' ', (string)$r), 0, 200)) . "\n";
		$rc = 1;
	}
}
exit($rc);
