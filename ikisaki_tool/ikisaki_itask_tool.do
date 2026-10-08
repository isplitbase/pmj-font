<?php
/*
メンバーのログイン機能
*/
include "../apis/common.php";

// include "./ikisaki_mymenu_tool/menu_mymenu_click.do";
include './kanri_itask/extract_number.do';
foreach(glob('./ikisaki_itask_tool/*') as $file){
    if(is_file($file)){
        include $file;
    }
}
if (!$link) {
	$putmobj=array();
	$putmobj["status"]="NG";
	$putmobj["message"]="接続が失敗しました。";
	echo json_encode($putmobj);
	exit();
}
header('Content-type: application/json');
session_start();
if($_POST['action']!="ikisaki_readpdf"){
	if(!isset($_SESSION['member_id']) or $_SESSION['member_id']==""){
		$putmobj=array();
		$putmobj["status"]="NG";
		$putmobj["message"]="セッションの有効期限が切ています、\n再度ログインしてください。";
		$putmobj["session_id"]=session_id();
		echo json_encode($putmobj);
		exit();
	}
}

$user_id=$_SESSION['user_id'];
function bin2hex_cs($o){
	$sujibox=array();
	$sujibox["0"]="0ab23";
	$sujibox["1"]="3df46";
	$sujibox["2"]="6hj78";
	$sujibox["3"]="8kl89";
	$sujibox["4"]="9npac";
	$sujibox["5"]="asteg";
	$sujibox["6"]="cuvij";
	$sujibox["7"]="ewwmo";
	$sujibox["8"]="jxxrt";
	$sujibox["9"]="hzzvy";
	if(isset($sujibox[$o])){
		return $sujibox[$o];
	}else{
		return bin2hex($o);
	}
}

try{
	$action=$_POST['action'];
	if($action == "itask_read_seikyu"){
		itask_read_seikyu();
	}else if($action == "itask_get_option"){
		itask_get_option();
	}else if($action == "files_itask_create_anken"){
		files_itask_create_anken();
	}else if($action == "files_itask_open_select_anken_window"){
		files_itask_open_select_anken_window();
	}else if($action == "files_itask_select_anken_show"){
		files_itask_select_anken_show();
	}else if($action == "files_itask_save"){
		files_itask_save();
	}else if($action == "itask_get_itask_info"){
		itask_get_itask_info();
	}else if($action == "get_itask_list"){
		get_itask_list();
	}else if($action == "itask_upload"){
		itask_upload();
	}else if($action == "itask_list_search"){
		itask_list_search();
	}else if($action == "itask_list_delete"){
		itask_list_delete();
	}else if($action == "itask_list_download"){
		itask_list_download();
	}else if($action == "itask_list_show_edit_window_save"){
		itask_list_show_edit_window_save();
	}else if($action == "itask_list_search_forgraph"){
		itask_list_search_forgraph();
	}else if($action == "ikisaki_readpdf"){
		ikisaki_readpdf();
	}else if($action == "get_itask_change_page"){
		get_itask_change_page();
	}else if($action == "itask_list_show_edit_window"){
		itask_list_show_edit_window();
	}else if($action == "itask_list_show_history"){
		itask_list_show_history();
	}else if($action == "delete_itask_history"){
		delete_itask_history();
	}else if($action == "analyze_upload"){
		analyze_upload();
	}else if($action == "itask_list_show_alert_time_save"){
		itask_list_show_alert_time_save();
	}else if($action == "get_itask_alert_list"){
		get_itask_alert_list();
	}else if($action == "get_itask_type_list"){
		get_itask_type_list();
	}else if($action == "itask_list_delete_all"){
		itask_list_delete_all();
	}else if($action == "itask_kanjo_edit_show"){
		itask_kanjo_edit_show();
	}else if($action == "itask_list_show_edit_window_pana_save"){
		itask_list_show_edit_window_pana_save();
	}else if($action == "itask_list_show_edit_window_getcompanyinfo"){
		itask_list_show_edit_window_getcompanyinfo();
	}else if($action == "itask_list_csv1"){
		itask_list_csv1();
	}else if($action == "itask_list_csv2"){
		itask_list_csv2();
	}else if($action == "itask_list_show_edit_window_save_img"){
		itask_list_show_edit_window_save_img();
	}else if($action == "itask_list_show_edit_window_getfullimage"){
		itask_list_show_edit_window_getfullimage();
	}else if($action == "itask_list_show_edit_window_batch"){
		itask_list_show_edit_window_batch();
	}else if($action == "itask_list_show_edit_window_pana_save_batch"){
		itask_list_show_edit_window_pana_save_batch();
	}else if($action == "itask_list_show_edit_window_linkingpage"){
		itask_list_show_edit_window_linkingpage();
	}else if($action == "itask_list_show_edit_window_pana_save_batch_C"){
		itask_list_show_edit_window_pana_save_batch_C();
	}else if($action == "itask_list_show_edit_window_pana_save_batch_B"){
		itask_list_show_edit_window_pana_save_batch_B();
	}else if($action == "itask_list_show_edit_pana_get_pre_year"){
		itask_list_show_edit_pana_get_pre_year();
	}else if($action == "itask_list_show_edit_window_tool_soneki0"){
		itask_list_show_edit_window_tool_soneki0();
	}else if($action == "itask_list_change_memo"){
		itask_list_change_memo();
	}else if($action == "itask_list_show_edit_window_csv_fromlist"){
		itask_list_show_edit_window_csv_fromlist();
	}else if($action == "itask_list_show_edit_window_map_do"){
		itask_list_show_edit_window_map_do();
	}else if($action == "itask_getexlist"){
		itask_getexlist();
	}else if($action == "aitask_exlist_add"){
		aitask_exlist_add();
	}else if($action == "aitask_exlist_del"){
		aitask_exlist_del();
	}else if($action == "itask_list_show_edit_window_map_adjust_brightness"){
		itask_list_show_edit_window_map_adjust_brightness();
	}else if($action == "itask_list_show_edit_window_map_keystone_do"){
		itask_list_show_edit_window_map_keystone_do();
	}else if($action == "itask_list_show_edit_window_set_me"){
		itask_list_show_edit_window_set_me();
	}else if($action == "itask_list_show_edit_window_get_me"){
		itask_list_show_edit_window_get_me();
	}else if($action == "itask_list_show_edit_window_del_me"){
		itask_list_show_edit_window_del_me();
	}else if($action == "itask_list_show_edit_window_ana2"){
		itask_list_show_edit_window_ana2();
	}else if($action == "itask_list_show_edit_window_manual_analyze_gemini_houjin"){
		itask_list_show_edit_window_manual_analyze_gemini_houjin();
	}else if($action == "keieidangi_get_base_info"){
		keieidangi_get_base_info();
	}else if($action == "keieidangi_get_report_data"){
		keieidangi_get_report_data();
	}else if($action == "keieidangi_call_ai"){
		keieidangi_call_ai();
	}else if($action == "keieidangi_call_summary"){
		keieidangi_call_summary();
	}else if($action == "itask_image_hosei"){
		itask_image_hosei();
	}else if($action == "itask_aitext_analyze"){
		itask_aitext_analyze();
	}else if($action == "keieidangi_download_excel"){
		keieidangi_download_excel();
	}else if($action == "keieidangi_get_prompt"){		keieidangi_get_prompt();	}else if($action == "keieidangi_save_prompt"){		keieidangi_save_prompt();	}
} catch (Exception $e) {
	put_error($_SESSION['user_id'],$_SESSION['member_id'],$_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"],$action,$e->getMessage());
}
mysql_close($link);
?>
