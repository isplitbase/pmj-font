<?php
/*
 * 強力分析の結果を、分析前の勘定科目に戻す (サーバ上でコマンドとして実行する)
 *
 *   php ikisaki_itask_make_ana_restore.do <キュー番号>            … 戻す前の確認(件数を表示するだけ)
 *   php ikisaki_itask_make_ana_restore.do <キュー番号> --restore  … 戻す
 *   php ikisaki_itask_make_ana_restore.do --list [itask_id]       … 強力分析の履歴(キュー番号)を表示
 *
 *   強力分析(batch/ikisaki_itask_make_ana.do)は、置き換える前の勘定科目を i_kanjo_info_ana_bk に、
 *   精査ステータス・決算日・集計列(o0〜o31)を i_itask_queue_ana.prev_top_info に退避している。
 *   戻すと、その案件の今の勘定科目は退避していたもので置き換わる(m_itask.status は変えない)。
 */
if (PHP_SAPI !== "cli") { exit(); }
chdir("/var/www/html/ikisaki_tool/batch/");
include '../../apis/common.php';
date_default_timezone_set("Asia/Tokyo");
if (!$link) { echo "DB に接続できません\n"; exit(1); }

$arg = isset($argv[1]) ? $argv[1] : "";
if ($arg === "" ) {
	echo "使い方: php ikisaki_itask_make_ana_restore.do <キュー番号> [--restore] / --list [itask_id]\n";
	exit(1);
}

if ($arg === "--list") {
	$where = isset($argv[2]) ? "WHERE q.itask_id=".intval($argv[2]) : "";
	$rs = runsql(__FILE__, "SELECT q.id, q.itask_id, q.status, q.use_pdf, q.backup_rows, q.create_at, q.end_at,"
		." (SELECT COUNT(*) FROM i_kanjo_info_ana_bk b WHERE b.bk_queue_id=q.id) bk"
		." FROM i_itask_queue_ana q $where ORDER BY q.id DESC LIMIT 30");
	printf("%-6s %-8s %-4s %-4s %-6s %-20s %-20s\n", "キュー", "itask", "状態", "PDF", "退避行", "登録", "終了");
	while ($rs && ($r = mysql_fetch_assoc($rs))) {
		printf("%-6s %-8s %-4s %-4s %-6s %-20s %-20s\n", $r["id"], $r["itask_id"], $r["status"], $r["use_pdf"], $r["bk"], $r["create_at"], $r["end_at"]);
	}
	exit(0);
}

$qid = intval($arg);
$restore = (isset($argv[2]) && $argv[2] === "--restore");
$rs = runsql(__FILE__, "SELECT * FROM i_itask_queue_ana WHERE id=$qid");
$q = $rs ? mysql_fetch_assoc($rs) : null;
if (!$q) { echo "キュー $qid がありません\n"; exit(1); }
$itask_id = intval($q["itask_id"]);
$rs = runsql(__FILE__, "SELECT COUNT(*) c FROM i_kanjo_info_ana_bk WHERE bk_queue_id=$qid");
$bk = intval(mysql_fetch_assoc($rs)["c"]);
$rs = runsql(__FILE__, "SELECT COUNT(*) c FROM i_kanjo_info WHERE aitask_id=$itask_id");
$now = intval(mysql_fetch_assoc($rs)["c"]);
echo "キュー $qid / itask $itask_id / 状態 ".$q["status"]." / 退避した行 $bk / 今の行 $now\n";
echo "退避した精査ステータス等: ".$q["prev_top_info"]."\n";
if ($bk == 0 && $q["prev_top_info"] === null) { echo "退避したものがありません\n"; exit(1); }

// このキューより後に、同じ案件で強力分析をしていれば注意する
$rs = runsql(__FILE__, "SELECT id FROM i_itask_queue_ana WHERE itask_id=$itask_id AND id>$qid AND status='OK' ORDER BY id");
$later = array();
while ($rs && ($r = mysql_fetch_assoc($rs))) { $later[] = $r["id"]; }
if (count($later)) { echo "※ このあとにも強力分析をしています(キュー ".implode(",", $later).")。戻すと、それより前の状態になります\n"; }

if (!$restore) { echo "(確認のみ。戻すときは --restore を付けて実行)\n"; exit(0); }

$cols = array();
$rs = runsql(__FILE__, "SHOW COLUMNS FROM i_kanjo_info");
while ($rs && ($row = mysql_fetch_assoc($rs))) { $cols[] = "`".$row["Field"]."`"; }
$col_list = implode(",", $cols);

runsql(__FILE__, "START TRANSACTION");
runsql(__FILE__, "DELETE FROM i_kanjo_info WHERE aitask_id=$itask_id");
$ok = runsql(__FILE__, "INSERT INTO i_kanjo_info ($col_list) SELECT $col_list FROM i_kanjo_info_ana_bk WHERE bk_queue_id=$qid ORDER BY bk_id");
if (!$ok) {
	$err = mysqli_error($link);
	runsql(__FILE__, "ROLLBACK");
	echo "失敗しました(元のまま): $err\n";
	exit(1);
}
$prev = json_decode((string)$q["prev_top_info"], true);
if (is_array($prev)) {
	$set = array();
	foreach ($prev as $k => $v) {
		if (!preg_match('/^(status|closing_date_date|o\d{1,2})$/', $k)) { continue; }
		$set[] = "`$k`=".($v === null ? "NULL" : "'".mysqli_real_escape_string($link, (string)$v)."'");
	}
	if (count($set)) { runsql(__FILE__, "UPDATE i_aitask_top_info SET ".implode(",", $set)." WHERE itask_id=$itask_id"); }
}
runsql(__FILE__, "COMMIT");
$rs = runsql(__FILE__, "SELECT COUNT(*) c FROM i_kanjo_info WHERE aitask_id=$itask_id");
echo "戻しました: itask $itask_id の勘定科目 ".intval(mysql_fetch_assoc($rs)["c"])." 行\n";
@file_put_contents("/data/pmj_cron/ikisaki_itask_make_ana.log", date("Y-m-d H:i:s")." RESTORE itask=$itask_id queue=$qid rows=$bk\n", FILE_APPEND | LOCK_EX);
mysql_close($link);
