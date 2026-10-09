<?php
/*
 * zaiTask 一覧の「強力分析」: チェックした案件を強力分析のキュー(i_itask_queue_ana)に登録する
 *
 *   POST: itask_id_list … カンマ区切りの itask_id
 *         use_pdf       … 1 なら元の PDF からページ画像を作って分析する(既定 0: 保存済みの画像)
 *   登録した案件は m_itask.status=1(分析中)にする。分析は cron の batch/ikisaki_itask_make_ana.do が行う
 *   (成功: m_itask.status=9 + 精査ステータス 0 / 失敗: m_itask.status=2)。
 *   すでに分析中(m_itask.status=1)・キューに入っている案件は登録しない。
 *   個人/法人は i_aitask_top_info.type で決める(konjin で始まれば個人)。
 *
 *   ※ 関数名は他の .do とぶつからないよう itask_ana_ で始める(同フォルダの .do は全部 include される)
 */
function itask_ana_request(){
	global $link;
	global $user_id;
	$putmobj = array();

	$ids = array();
	foreach (explode(",", isset($_POST["itask_id_list"]) ? (string)$_POST["itask_id_list"] : "") as $v) {
		$v = intval(trim($v));
		if ($v > 0) { $ids[$v] = true; }
	}
	$ids = array_keys($ids);
	$use_pdf = (isset($_POST["use_pdf"]) && intval($_POST["use_pdf"]) === 1) ? 1 : 0;
	if (count($ids) == 0) {
		$putmobj["status"] = "NG";
		$putmobj["message"] = "強力分析する行を選択してください";
		echo json_encode($putmobj, JSON_UNESCAPED_UNICODE);
		exit();
	}

	// 自分のユーザーの案件だけ(選択削除と同じく v_itask_file_info の user_id で確認)
	$sqlstr = "SELECT m.itask_id, m.status, t.type FROM m_itask m"
	        . " JOIN v_itask_file_info v ON v.itask_id=m.itask_id"
	        . " LEFT JOIN i_aitask_top_info t ON t.itask_id=m.itask_id"
	        . " WHERE v.user_id=" . intval($user_id) . " AND m.itask_id IN (" . implode(",", $ids) . ")";
	$rs = runsql(__FILE__, $sqlstr);
	if (!$rs) { exit(); }
	$targets = array();
	while ($row = mysql_fetch_assoc($rs)) { $targets[intval($row["itask_id"])] = $row; }

	$added = 0;
	$skipped_busy = 0;
	foreach ($ids as $itask_id) {
		if (!isset($targets[$itask_id])) { continue; }
		$row = $targets[$itask_id];
		$rs2 = runsql(__FILE__, "SELECT id FROM i_itask_queue_ana WHERE itask_id=$itask_id AND status IN ('NM','MN') LIMIT 1");
		$queued = ($rs2 && mysql_fetch_assoc($rs2));
		if (intval($row["status"]) === 1 || $queued) { $skipped_busy++; continue; }
		$doc_type = (strpos((string)$row["type"], "konjin") === 0) ? "kojin" : "houjin";
		runsql(__FILE__, "INSERT INTO i_itask_queue_ana (itask_id, status, doc_type, use_pdf, user_id, member_id, prev_status)"
			. " VALUES ($itask_id, 'NM', '$doc_type', $use_pdf, " . intval($user_id) . ", " . intval($_SESSION["member_id"]) . ", " . intval($row["status"]) . ")");
		runsql(__FILE__, "UPDATE m_itask SET status=1, update_at=now() WHERE itask_id=$itask_id");
		$added++;
	}

	$putmobj["status"] = "OK";
	$putmobj["added"] = $added;
	$putmobj["skipped_busy"] = $skipped_busy;
	$putmobj["not_found"] = count($ids) - count($targets);
	echo json_encode($putmobj, JSON_UNESCAPED_UNICODE);
	exit();
}
?>
