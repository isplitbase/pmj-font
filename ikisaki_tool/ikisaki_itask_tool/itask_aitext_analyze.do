<?php
/*
 * zaiTask: 選んだページを決算書の自動分析にかけ直す(画像補正ポップアップの「分析」)
 *
 *   検証(test1)   : この .do → pmj-door      → pmj-aitext-1      → Cloud Vision
 *   本番(148,149) : この .do → pmj-door-real → pmj-aitext-1-real → Cloud Vision
 *
 *   分析は、PDF アップロード時の自動分析(/iTaskScanPapers2 の v2ac エンジン)と
 *   同じものを Cloud Run で動かしている。
 *   ここでは読み取った行(キーワード・金額)を返すだけで、勘定科目(マスタ)との突き合わせはしない。
 *   突き合わせは画面側(pmjtools2.js)で、手動分析(?aitask_image_edit)と同じやり方で行う。
 *   そのためのマスタ(m_kanjo_view_list)と除外リスト(excodelist)を一緒に返す。
 *   ※ DB には何も書かない
 *
 *   POST:
 *     itask_id   … 対象の itask
 *     tab_index  … 反映先のタブ(1借方 2貸方 3損益計算書 4販管費)。このタブの行だけを返す
 *     pages      … JSON 文字列。ページ順に
 *                    [{"no":3,"source":"orig"}, {"no":4,"source":"hosei","image":"<base64>"}, ...]
 *                  no は画面と同じ 1 始まり。
 *                  orig  … 元画像をそのまま使う(読み込み先は itask_aitext_page_images を参照)
 *                  hosei … 画面から受け取った補正後の画像を、元画像と同じ大きさに拡大して使う
 *     document_judgment_flag … houjin(既定) / kojin
 *
 *   返り値:
 *     { "status":"OK", "rows":[{val, amount_this_year, amount_pre_year, page, ...}],
 *       "m_kanjo_view_list":[...], "excodelist":[...], "closing_date":"2025/09/30",
 *       "all_rows_count":105, "elapsed":52.3 }
 *
 *   ※ ID token 取得関数・定数(KEIEIDANGI_SA_JSON)と keieidangi_release_session() は
 *      keieidangi_call_ai.do で定義済みのものを使う(同フォルダの .do は全部 include されるため)
 *   ※ 関数名は他の .do とぶつからないよう itask_aitext_ で始める
 */

// ---- 設定 ----
// door の URL は画像補正と同じく /data/hosei_door.conf で切り替える。
//   検証(test1) は pmj-door、本番(148,149) は pmj-door-real。ファイルが無ければ本番とみなす。
if (!defined("AITEXT_DOOR_URL")) {
	$__aitext_door_url = "https://pmj-door-real-512697354748.asia-northeast1.run.app";
	$__aitext_door_conf = @file_get_contents("/data/hosei_door.conf");
	if ($__aitext_door_conf !== false) {
		$__aitext_door_conf = trim($__aitext_door_conf);
		if (preg_match('#^https://[A-Za-z0-9._-]+\.run\.app/?$#', $__aitext_door_conf)) {
			$__aitext_door_url = rtrim($__aitext_door_conf, "/");
		}
	}
	define("AITEXT_DOOR_URL", $__aitext_door_url);
}

function itask_aitext_analyze(){
	global $link;

	// 分析は数分かかるので、先にセッションロックを解放する(他の画面操作を止めないため)
	keieidangi_release_session();
	@set_time_limit(0);
	$t0 = microtime(true);

	$putmobj = array();
	$itask_id  = isset($_POST['itask_id'])  ? intval($_POST['itask_id'])  : 0;
	$tab_index = isset($_POST['tab_index']) ? intval($_POST['tab_index']) : 0;
	$flag = (isset($_POST['document_judgment_flag']) && $_POST['document_judgment_flag'] === "kojin") ? "kojin" : "houjin";
	$pages = isset($_POST['pages']) ? json_decode((string)$_POST['pages'], true) : null;

	if ($itask_id <= 0 || $tab_index < 1 || $tab_index > 4 || !is_array($pages) || count($pages) == 0) {
		itask_aitext_ng("パラメータが不正です。");
	}

	//------------------------------------------------------------
	// 1. 元画像(画面のページ順。0 始まり)
	//------------------------------------------------------------
	$orig_pages = itask_aitext_page_images($itask_id);
	if ($orig_pages === false) { itask_aitext_ng("ページ情報を取得できませんでした。"); }

	//------------------------------------------------------------
	// 2. 分析に送る画像を揃える
	//------------------------------------------------------------
	$images = array();
	$resize_to = array();
	$page_nos = array();          // 送った順番 → itask のページ(0 始まり)
	$received = array();          // 確認用: 実際に分析に使った画像の情報
	foreach ($pages as $p) {
		$no = isset($p["no"]) ? intval($p["no"]) : 0;
		$idx = $no - 1;
		if ($idx < 0 || !isset($orig_pages[$idx])) {
			itask_aitext_ng($no . " ページの画像が見つかりません。");
		}
		$raw = itask_aitext_page_raw($orig_pages[$idx]);
		if ($raw === false || $raw === "") { itask_aitext_ng($no . " ページの画像を読めませんでした。"); }
		$source = (isset($p["source"]) && $p["source"] === "hosei") ? "hosei" : "orig";
		if ($source === "hosei") {
			$b64 = isset($p["image"]) ? preg_replace('/^data:image\/[a-zA-Z]+;base64,/', '', trim((string)$p["image"])) : "";
			if ($b64 === "") { itask_aitext_ng($no . " ページの補正後画像がありません。"); }
			$size = @getimagesizefromstring($raw);
			$images[] = $b64;
			// 補正後画像は 1024x1536 程度なので、元画像の大きさに戻してから分析する
			$resize_to[] = ($size !== false) ? array(intval($size[0]), intval($size[1])) : null;
		} else {
			$images[] = base64_encode($raw);
			$resize_to[] = null;
		}
		unset($raw);
		$page_nos[] = $idx;
		// 確認用: 実際に分析に使う画像の大きさと指紋(CRC32)を画面に返す
		$last = $images[count($images) - 1];
		$received[] = array(
			"no"         => $no,
			"source"     => $source,
			"b64_length" => strlen($last),
			"crc32"      => sprintf("%08x", crc32($last)),
			"resize_to"  => $resize_to[count($resize_to) - 1],
		);
	}

	//------------------------------------------------------------
	// 3. door 経由で分析 API を呼ぶ
	//------------------------------------------------------------
	$door_body = array(
		"target"  => "aitext1",
		"path"    => "/analyze",
		"payload" => array(
			"images" => $images,
			"resize_to" => $resize_to,
			"document_judgment_flag" => $flag,
			"filenam" => "itask_" . $itask_id,
		),
	);
	unset($images);
	try {
		$id_token = get_cloud_run_id_token_keieidangi(KEIEIDANGI_SA_JSON, AITEXT_DOOR_URL);
	} catch (Exception $e) {
		itask_aitext_ng("id_token error: " . $e->getMessage());
	}
	$ch = curl_init(rtrim(AITEXT_DOOR_URL, "/") . "/call");
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		"Content-Type: application/json",
		"Authorization: Bearer " . $id_token,
	));
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($door_body, JSON_UNESCAPED_UNICODE));
	unset($door_body);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
	curl_setopt($ch, CURLOPT_TIMEOUT, 1000);      // 1ページ 25〜30 秒ほどかかる
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
	$response_body = curl_exec($ch);
	$curl_errno = curl_errno($ch);
	$curl_error = curl_error($ch);
	$http_code  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);
	if ($curl_errno) {
		itask_aitext_ng("door curl error: " . $curl_error, array("http_code" => $http_code));
	}
	$data = json_decode($response_body, true);
	if (!is_array($data)) {
		itask_aitext_ng("分析APIの応答が不正です。", array("http_code" => $http_code, "raw" => substr((string)$response_body, 0, 500)));
	}
	if (!isset($data["status"]) || $data["status"] !== "OK" || !isset($data["result"]["format_info"]["cols"][0]["block_result"])) {
		$err = isset($data["error"]) ? $data["error"] : (isset($data["message"]) ? $data["message"] : "分析に失敗しました。");
		itask_aitext_ng($err, array("http_code" => $http_code));
	}

	//------------------------------------------------------------
	// 4. 読み取った行のうち、今のタブの行だけを返す
	//    勘定科目(マスタ)との突き合わせはしない。画面側(pmjtools2.js)で
	//    手動分析(?aitask_image_edit)と同じやり方で行う。
	//------------------------------------------------------------
	$br = $data["result"]["format_info"]["cols"][0]["block_result"];
	$detail = (isset($br["detail"]) && is_array($br["detail"])) ? $br["detail"] : array();
	$rows = array();
	foreach ($detail as $d) {
		// エンジンの tabindex: 1借方 2貸方 3損益計算書 4販管費
		if (intval(isset($d["tabindex"]) ? $d["tabindex"] : 0) !== $tab_index) { continue; }
		$sent = isset($d["page"]) ? intval($d["page"]) : -1;
		$rows[] = array(
			"val"              => isset($d["val"]) ? (string)$d["val"] : "",
			"amount_this_year" => isset($d["amount_this_year"]) ? (string)$d["amount_this_year"] : "",
			"amount_pre_year"  => isset($d["amount_pre_year"]) ? (string)$d["amount_pre_year"] : "",
			"tabindex"         => $tab_index,
			"sent_index"       => $sent,
			// エンジンのページ(送った順番)を itask のページ番号(0 始まり)に直す
			"page"             => isset($page_nos[$sent]) ? $page_nos[$sent] : -1,
			"start_x"          => isset($d["start_x"]) ? intval($d["start_x"]) : 0,
			"start_y"          => isset($d["start_y"]) ? intval($d["start_y"]) : 0,
			"end_x"            => isset($d["end_x"]) ? intval($d["end_x"]) : 0,
			"end_y"            => isset($d["end_y"]) ? intval($d["end_y"]) : 0,
		);
	}

	//------------------------------------------------------------
	// 5. 勘定科目マスタと除外リスト
	//    手動分析(itask_list_show_edit_window_map_do.do)の m_kanjo_view_list / excodelist と同じ形
	//------------------------------------------------------------
	$m_kanjo_view_list = array();
	$rs = runsql(__FILE__, "SELECT * FROM m_kanjo_view");
	while ($row = mysql_fetch_array($rs)) {
		$tmpobj = array();
		$tmpobj["m_kanjo_code"] = $row["m_kanjo_code"];
		$tmpobj["m_kanjo_name"] = $row["m_kanjo_name"];
		$tmpobj["property"]     = $row["property"];
		$tmpobj["m_kanjo_id"]   = $row["m_kanjo_id"];
		$tmpobj["family_name"]  = $row["family_name"];
		$tmpobj["genus_name"]   = $row["genus_name"];
		$tmpobj["order_code"]   = $row["order_code"];
		$tmpobj["family_code"]  = $row["family_code"];
		$tmpobj["genus_code"]   = $row["genus_code"];
		$tmpobj["create_at"]    = $row["create_at"];
		$tmpobj["species_name"] = $row["species_name"];
		$tmpobj["species_code"] = $row["species_code"];
		if ($row["variety"] <= 0) {
			$tmpobj["goukei"] = "合計";
		} else {
			$tmpobj["goukei"] = "普通";
		}
		$tmpobj["variety"]  = $row["variety"];
		$tmpobj["abc_flag"] = $row["abc_flag"];
		array_push($m_kanjo_view_list, $tmpobj);
	}
	$excodelist = array();
	$rs = runsql(__FILE__, "SELECT * FROM exlist order by to_kanjo_code,from_kanjo_code");
	while ($row = mysql_fetch_assoc($rs)) {
		array_push($excodelist, $row["from_kanjo_code"]);
	}

	$putmobj["status"] = "OK";
	$putmobj["rows"] = $rows;
	$putmobj["m_kanjo_view_list"] = $m_kanjo_view_list;
	$putmobj["excodelist"] = $excodelist;
	$putmobj["closing_date"] = isset($br["closing_date"]["date"]) ? $br["closing_date"]["date"] : "";
	$putmobj["all_rows_count"] = count($detail);
	$putmobj["received"] = $received;
	$putmobj["tab_index"] = $tab_index;
	$putmobj["engine_elapsed"] = isset($data["elapsed"]) ? $data["elapsed"] : null;
	$putmobj["elapsed"] = round(microtime(true) - $t0, 1);
	header('Content-type: application/json');
	echo json_encode($putmobj, JSON_UNESCAPED_UNICODE);
	mysql_close($link);
	exit();
}

function itask_aitext_ng($message, $extra = array()){
	global $link;
	$putmobj = array("status" => "NG", "error" => $message);
	foreach ($extra as $k => $v) { $putmobj[$k] = $v; }
	header('Content-type: application/json');
	echo json_encode($putmobj, JSON_UNESCAPED_UNICODE);
	if ($link) { mysql_close($link); }
	exit();
}

//------------------------------------------------------------
// 元画像の一覧(画面のページ順。0 始まり)
//   サーバによって編集画面の画像の持ち方が違うので、その画面と同じ読み方をする。
//     test1 : i_itask_v_pages_root の fileroot → /data/iimgs/ のファイル
//     149   : v_itask_v_pages の itask_pages_id → i_itask_v_pages.itask_pages_str (base64)
//   i_itask_v_pages_root が無い・行が無い・ファイルが読めない場合は 149 の読み方にする。
//   返り値: [ ["file" => パス] または ["b64" => base64], ... ]   失敗時 false
//   ※ 画像補正の .do(itask_image_hosei.do)からも使う
//------------------------------------------------------------
if (!function_exists('itask_aitext_page_images')) {
	function itask_aitext_page_images($itask_id){
		$itask_id = intval($itask_id);
		$list = array();

		// test1 の読み方(テーブルがあるときだけ。無いテーブルを SELECT するとエラーになるため先に確認)
		$rs = runsql(__FILE__, "SHOW TABLES LIKE 'i_itask_v_pages_root';");
		if ($rs && mysql_fetch_assoc($rs)) {
			$rs = runsql(__FILE__, "SELECT fileroot FROM i_itask_v_pages_root WHERE itask_id=" . $itask_id
				. " ORDER BY itask_pages_no, itask_pages_id;");
			if (!$rs) { return false; }
			$ok = true;
			while ($row = mysql_fetch_assoc($rs)) {
				$path = "/data/iimgs/" . $row["fileroot"];
				if (!is_file($path)) { $ok = false; }
				$list[] = array("file" => $path);
			}
			if ($ok && count($list) > 0) { return $list; }
			$list = array();
		}

		// 149 の読み方(149 の itask_list_show_edit_window.do と同じ)
		$rs = runsql(__FILE__, "SELECT itask_pages_id FROM v_itask_v_pages WHERE itask_id=" . $itask_id . ";");
		if (!$rs) { return false; }
		$ids = array();
		while ($row = mysql_fetch_assoc($rs)) { $ids[] = intval($row["itask_pages_id"]); }
		if (count($ids) == 0) { return $list; }
		$rs = runsql(__FILE__, "SELECT itask_pages_str FROM i_itask_v_pages WHERE itask_pages_id IN (" . implode(",", $ids) . ")"
			. " ORDER BY itask_pages_no, itask_pages_id;");
		if (!$rs) { return false; }
		while ($row = mysql_fetch_assoc($rs)) {
			$list[] = array("b64" => $row["itask_pages_str"]);
		}
		return $list;
	}
}
// 上の一覧の1件から画像の中身(バイナリ)を取り出す。失敗時 false
if (!function_exists('itask_aitext_page_raw')) {
	function itask_aitext_page_raw($page){
		if (isset($page["file"])) { return @file_get_contents($page["file"]); }
		if (isset($page["b64"]))  {
			$b64 = preg_replace('/^data:image\/[a-zA-Z]+;base64,/', '', trim((string)$page["b64"]));
			return base64_decode($b64);
		}
		return false;
	}
}
?>
