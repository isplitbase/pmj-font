<?php
/*
 * zaiTask: 画面に表示中のページ画像を OpenAI で補正する
 *
 *   pmj-door(-real) 経由で pmj-hosei-imges(-real) の /hosei を呼ぶ。
 *   サーバ(test1 / 149)の負荷を上げないため、画像処理は一切こちらで行わない。
 *
 *       検証(test1)   : この .do → pmj-door      → pmj-hosei-imges      → OpenAI
 *       本番(148,149) : この .do → pmj-door-real → pmj-hosei-imges-real → OpenAI
 *
 *   POST:
 *     itask_pages_str … 画面が持っている画像の base64(あればこれを使う)
 *     itask_id        … itask_pages_str が無い場合に元画像を読むため(test1 はファイル、149 は DB)
 *     itask_pages_no  … 同上(画面と同じ 1 始まり)
 *     prompt          … 任意(最大300文字)。省略時は API 側の既定プロンプト
 *
 *   返り値:
 *     { "status":"OK", "image_base64":"…", "mime":"image/png", "elapsed":23.4, … }
 *
 *   ※ 元画像は書き換えない。補正結果を返すだけ。
 *   ※ ID token 取得関数・定数は keieidangi_call_ai.do で定義済みのものを再利用
 *      (ディスパッチャが同フォルダの .do を全 include するため。二重定義しないこと)
 */

// ---- 設定 ----
// 画像補正で使う door の URL (= ID token の audience)。
//   検証(test1) は pmj-door → pmj-hosei-imges
//   本番(148,149) は pmj-door-real → pmj-hosei-imges-real
// ソースは全サーバ共通にしたいので、URL は /data/hosei_door.conf で上書きする。
// ファイルが無い場合は本番(pmj-door-real)とみなす。
if (!defined("HOSEI_DOOR_URL")) {
	$__hosei_door_url = "https://pmj-door-real-512697354748.asia-northeast1.run.app";
	$__hosei_door_conf = @file_get_contents("/data/hosei_door.conf");
	if ($__hosei_door_conf !== false) {
		$__hosei_door_conf = trim($__hosei_door_conf);
		if (preg_match('#^https://[A-Za-z0-9._-]+\.run\.app/?$#', $__hosei_door_conf)) {
			$__hosei_door_url = rtrim($__hosei_door_conf, "/");
		}
	}
	define("HOSEI_DOOR_URL", $__hosei_door_url);
}

function itask_image_hosei(){
	global $link;

	// 時間のかかる処理なので、先にセッションロックを解放しておく
	// (これをしないと補正中に同じブラウザの他の操作が全部止まる)
	keieidangi_release_session();
	// 149 は php.ini の max_execution_time が 30 秒なので、ここで上限を外す(再分析の .do と同じ)
	@set_time_limit(0);

	$putmobj = array();

	//------------------------------------------------------------
	// 1. 補正する画像を用意する
	//------------------------------------------------------------
	$img_b64 = isset($_POST['itask_pages_str']) ? trim((string)$_POST['itask_pages_str']) : "";
	$img_b64 = preg_replace('/^data:image\/[a-zA-Z]+;base64,/', '', $img_b64);

	if ($img_b64 === "") {
		// 画面から画像が来ていない場合は元画像を読む(読み込み先は itask_aitext_analyze.do の
		// itask_aitext_page_images を参照。test1 はファイル、149 は DB)
		$itask_id       = isset($_POST['itask_id'])       ? (int)$_POST['itask_id']       : 0;
		$itask_pages_no = isset($_POST['itask_pages_no']) ? (int)$_POST['itask_pages_no'] : 0;
		if ($itask_id <= 0 || $itask_pages_no <= 0) {
			$putmobj["status"] = "NG";
			$putmobj["error"]  = "画像が指定されていません。";
			echo json_encode($putmobj, JSON_UNESCAPED_UNICODE);
			exit();
		}
		$no = $itask_pages_no - 1;        // 画面のページ番号は 1 始まり
		$orig_pages = itask_aitext_page_images($itask_id);
		if ($orig_pages === false || !isset($orig_pages[$no])) {
			$putmobj["status"] = "NG";
			$putmobj["error"]  = "該当ページの画像が見つかりません。";
			echo json_encode($putmobj, JSON_UNESCAPED_UNICODE);
			mysql_close($link);
			exit();
		}
		$raw = itask_aitext_page_raw($orig_pages[$no]);
		if ($raw === false || $raw === "") {
			$putmobj["status"] = "NG";
			$putmobj["error"]  = "画像ファイルを読めませんでした。";
			echo json_encode($putmobj, JSON_UNESCAPED_UNICODE);
			mysql_close($link);
			exit();
		}
		$img_b64 = base64_encode($raw);
	}

	//------------------------------------------------------------
	// 2. door へ渡す本体を組む
	//------------------------------------------------------------
	$payload = array("image_base64" => $img_b64);
	if (isset($_POST['prompt']) && trim((string)$_POST['prompt']) !== "") {
		// 画面の歯車から一時的に指定されたプロンプト(最大300文字)
		$prompt = trim((string)$_POST['prompt']);
		if (mb_strlen($prompt, "UTF-8") > 300) {
			$putmobj["status"] = "NG";
			$putmobj["error"]  = "プロンプトは300文字以内にしてください。";
			echo json_encode($putmobj, JSON_UNESCAPED_UNICODE);
			mysql_close($link);
			exit();
		}
		$payload["prompt"] = $prompt;
	}
	if (isset($_POST['size']) && trim((string)$_POST['size']) !== "") {
		$payload["size"] = (string)$_POST['size'];
	}

	$door_body = array(
		"target"  => "hoseiimges",
		"path"    => "/hosei",
		"payload" => $payload,
	);

	//------------------------------------------------------------
	// 3. ID token を取って door を叩く
	//------------------------------------------------------------
	try {
		$id_token = get_cloud_run_id_token_keieidangi(KEIEIDANGI_SA_JSON, HOSEI_DOOR_URL);
	} catch (Exception $e) {
		$putmobj["status"] = "NG";
		$putmobj["error"]  = "id_token error: " . $e->getMessage();
		echo json_encode($putmobj, JSON_UNESCAPED_UNICODE);
		mysql_close($link);
		exit();
	}

	$url = rtrim(HOSEI_DOOR_URL, "/") . "/call";
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		"Content-Type: application/json",
		"Authorization: Bearer " . $id_token,
	));
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($door_body, JSON_UNESCAPED_UNICODE));
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
	curl_setopt($ch, CURLOPT_TIMEOUT, 900);        // 画像生成は数分かかることがある
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
	$response_body = curl_exec($ch);
	$curl_errno = curl_errno($ch);
	$curl_error = curl_error($ch);
	$http_code  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);

	if ($curl_errno) {
		$putmobj["status"]    = "NG";
		$putmobj["error"]     = "door curl error: " . $curl_error;
		$putmobj["http_code"] = $http_code;
		echo json_encode($putmobj, JSON_UNESCAPED_UNICODE);
		mysql_close($link);
		exit();
	}

	$data = json_decode($response_body, true);
	if (!is_array($data)) {
		$putmobj["status"]    = "NG";
		$putmobj["error"]     = "invalid JSON from door";
		$putmobj["http_code"] = $http_code;
		$putmobj["raw"]       = substr((string)$response_body, 0, 500);
		echo json_encode($putmobj, JSON_UNESCAPED_UNICODE);
		mysql_close($link);
		exit();
	}
	if (!isset($data["status"])) {
		$data["status"] = ($http_code >= 200 && $http_code < 300) ? "OK" : "NG";
	}

	echo json_encode($data, JSON_UNESCAPED_UNICODE);
	mysql_close($link);
	exit();
}
?>
