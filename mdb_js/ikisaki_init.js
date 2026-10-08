var protocol = location.protocol;
if(protocol == 'http:'){
	//location.href = "https://"+document.domain+"/login.html";
}
function loadScript(src, callback) {
	var done = false;
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.src = src;
	head.appendChild(script);
	// Attach handlers for all browsers
	script.onload = script.onreadystatechange = function () {
		if (!done && (!this.readyState ||
				this.readyState === "loaded" || this.readyState === "complete")) {
			done = true;
			callback();
			// Handle memory leak in IE
			script.onload = script.onreadystatechange = null;
			if (head && script.parentNode) {
				head.removeChild(script);
			}
		}
	};
}
CS.after_loads = function () {
	
	var hidelist=[];
	for(var i=0;i<100;i++){
		hidelist[i]=true;
	}
	
	var vueUseObj={
		el: '#vueObj',
		data: {
			//デザイン系変数
			info_color: "info-color",
			white_text: "white-text",
			lockId: "lockId",
			hidelist:hidelist,
			//機能系変数
			ac_files: false,
			ac_secur: false,
			ac_kanri: false,
			ac_history: false,
			//iTaskメニューを表示するか
			ac_itask: false,
			//行先表示フラグ
			ac_ikisaki : false,
			//itask管理画面を表示するか
			ac_kanri_itask : false,
			/////////////////////////////////
			menu_control_file : false,
			menu_control_chatroom : false,
			menu_control_help : false,
			/////////////////////////////////
			//スマホメニューOPEN
			menu_phon_active: false,
			//管理メニューを開けたかどうか
			menu_kanri_open: false,
			menu_kanri_open_class: false,
			//管理->本支社を開けたかどうか
			menu_kanri_branch_open: false,
			//管理->部門を開けたかどうか
			menu_kanri_section_open: false,
			//管理->役職を開けたかどうか
			menu_kanri_post_open: false,
			//管理->チャットルームを開けたかどうか
			menu_kanri_chatroom_open: false,
			//管理->二段認証管理画面を開けたかどうか
			menu_kanri_certification_open: false,
			//管理->itask画面を開けたかどうか
			menu_kanri_itask_open: false,
			menu_files_open: false,
			menu_itask_open: false,
			menu_analyze_open: false,
			//ユーザのご利用情報
			menu_user_info_open: false,
			menu_inquiry_open: false,
			browser_flag:"chrome",
			device_flag:"",
			show_files_propertys: false,
			true_str: true,
			post_list_old: [],
			post_list: [],
			branch_list_old: [],
			branch_list: [],
			section_list_old: [],
			section_list: [],
			kanri_certification_list:[],
			chatroom_list_old: [],
			chatroom_list: [],
			menu_security_open: false,
			menu_security_member_open: false,
			menu_security_member_selecttype_open: true,
			menu_history_open: false,
			menu_chatroom_open: false,
			menu_chat_new_flag : false,
			menu_show_home_flag : false,
			itask_show_format_edit_window_flag : false,
			itask_master_show_titles :[],
			itask_show_category_edit_window_flag : false,
			member_info : {} ,
			menu_sub_title : "",
			change_color_keys:[false,false,false,false,false,false,false],
			kanri_itask_edit_flag: false,
			kanri_itask_show_type: "tm",
			kanri_itask_open: false,
			kanri_itask_format_list: [],
			//テンプレートのキーの選択情報
			kanri_itask_format_create_select_info_xy:[],
			kanri_itask_format_create_select_info:{},
			//フォーマット追加画面を表示するフラグ
			kanri_itask_format_create_show: false,
			//フォーマット追加画面のファイルアップロード画面を表示するフラグ
			kanri_itask_format_create_step1: false,
			//フォーマット追加画面のファイルアップロード画面のアップロード枠線
			kanri_itask_format_create_file_dropover_flag: false,
			//フォーマット追加画面の詳細編集画面を表示するフラグ
			kanri_itask_format_create_step2: false,
			//フォーマット追加画面の詳細編集画面の最大高さ（autoスクロールあり）
			kanri_itask_format_create_maxheight: 1024,
			//itaskのフォーマットを編集する時、検索条件を編集するフラグ
			kanri_itask_format_create_step2_editselect: false,
			//検索条件のパラメータを編集するフラグ
			kanri_itask_format_create_step2_editparam: false,
			//itaskのフォーマットを編集画面からパラメータ画面に遷移する時に、選択した検索条件のindex
			kanri_itask_format_create_selected: 0,
			//フォーマット編集画面の選択肢を表示するフラグ
			kanri_itask_format_create_step2_showtext_flag:true,
			//フォーマット編集画面の画像を表示するフラグ
			kanri_itask_format_create_step2_showimag_flag:true,
			//フォーマット編集画面の画像を選択した座標
			kanri_itask_format_create_step2_imag_xy:[],
			//フォーマット編集画面の画像の選択座標
			kanri_itask_format_create_step2_imag_xy_sort:true,
			//itaskフォーマット新規する時に現在表示画像の番号
			kanri_itask_format_create_uploadFile_imgs_now:0,
			//画像を更新するフラグ
			kanri_itask_format_create_update_pages: "NG",
			//itaskフォーマット新規のパラメータ選択する時に現在表示画像の番号
			kanri_itask_format_create_step2_imgs_now:0,
			//itaskフォーマット新規のフォーマット名
			kanri_itask_format_create_step1_format_name:"",
			//itaskフォーマットの編集権限があるか
			kanri_itask_format_create_step2_editselect_edit_flag:true,
			//itaskフォーマットのパラメータ編集権限があるか
			kanri_itask_format_create_sel_readonly:false,
			//フォーマット作る時、適用可能なフォーマット一覧
			itask_format_idadaptation: [],
			//フォーマット作る時、適用可能なフォーマットindex
			itask_format_idadaptation_id:0,
			kanri_itask_format_show_update_img_window_flag:false,
			kanri_itask_format_create_now_format_id: "",
			kanri_itask_format_create_now_format_user_id: "",
			//itaskフォーマットの項目編集画面の表示フラグ
			kanri_itask_items_show_flag:false,
			kanri_itask_master_show_flag:false,
			aitask_common_pop_ac:false,
			kanri_itask_master_show_selall_flag:false,
			kanri_itask_master_uploadfile_list:[],
			kanri_itask_master_show_titles:[],
			kanri_itask_master_show_codes:[],
			kanri_itask_master_show_codes_old:[],
			kanri_itask_master_show_codes_sel:[],
			kanri_itask_master_show_lines:[],
			kanri_itask_master_show_pagesum :0,
			kanri_itask_master_show_pagenow:0,
			kanri_itask_master_show_pagestr:0,
			kanri_itask_master_show_pageend:0,
			kanri_itask_master_show_pages:[],
			kanri_itask_master_show_pagelimit:0,
			kanri_itask_master_id_list:[],
			kanri_itask_master_addcode_list:[],
			kanri_itask_master_search_keyword:"",
			
			itask_list_show_edit_pana_flag:true,
			
			kanri_itask_format_list_have_items:true,
			//他のフォーマットからコピーする　画面を表示する
			kanri_itask_format_create_step2_copy_format_flag:false,
			//置き換え文字一覧を表示する
			kanri_itask_replace_show_flag:false,
			//置き換え文字詳細を表示する
			kanri_itask_replace_sub_show_flag:false,
			//置き換え文字を追加或いは編集する時に使う置き換え文字パターン名
			kanri_itask_format_okikae_list_add_name: "",
			//置き換え文字を追加或いは編集する時に使う置き換え文字パターン内容
			kanri_itask_format_okikae_list_add_text: [],
			//置き換え文字を追加或いは編集する時に使う置き換え文字パターンID
			kanri_itask_format_okikae_list_add_id: "",
			//フォーマットコピー元
			kanri_itask_format_create_items_from:[],
			//itaskフォーマットの項目
			kanri_itask_format_now_items:[],
			//テンプレート一覧画面で表示するメッセージ
			kanri_itask_format_list_show_message:"",
			//itaskフォーマットのすべて項目
			kanri_itask_format_all_items:[],
			//フォーマット画像の横サイズ
			kanri_itask_format_create_step2_width: 0,
			//置き換え表リスト
			kanri_itask_format_okikae_list:[],
			//フォーマット作成用項目
			kanri_itask_format_create_items: [],
			//フォーマット作成用選択待ち項目
			kanri_itask_format_create_source: [],
			//フォーマット作成用選択待ち項目の座標
			kanri_itask_format_create_points: [],
			//現在編集するフォーマット検索条件
			kanri_itask_format_create_now_conditions: [],
			kanri_itask_format_create_uploadFile:[],
			kanri_itask_format_create_uploadFile_names:[],
			kanri_itask_format_create_uploadFile_imgs:[],
			kanri_itask_format_create_itask_forms:[],
			kanri_itask_format_create_conditions_parameter:[],
			kanri_itask_format_create_conditions_master:[],
			kanri_itask_format_create_items_kotei:[],
			kanri_itask_format_create_format_items:[],
			kanri_itask_format_create_itask_forms_map:{},
			kanri_itask_format_create_itask_format_item_name_map:{},
			kanri_itask_default_col_name: [],
			kanri_itask_format_create_now_col_name: "",
			kanri_itask_format_create_now_coke_by_default: "",
			//フォーマット編集・新規画面の試し読み込み文字
			kanri_itask_format_detaili_read_text: "",
			//管理画面のiTask種類名
			kanri_itask_now_show_type_name:"",
			//iTask管理画面を表示するフラグ
			kanri_itask_type_list_show:false,
			//itaskのカテゴリーを編集するかのフラグ
			kanri_itask_type_edit_authority_flag:false,
			//itaskのカテゴリーを編集する時に、メモするカテゴリー情報
			kanri_itask_type_edit_authority_nowtype:[],
			//現在編集中のカテゴリーを弄る権限を持つメンバー一覧
			kanri_itask_type_edit_authority_member_list:[],
			//テンプレートの手入力キー
			kanri_itask_format_create_use_key:"",
			kanri_itask_format_create_use_key_checkpage:"",
			kanri_itask_format_create_use_key_startx:"",
			kanri_itask_format_create_use_key_endx:"",
			kanri_itask_format_create_use_key_starty:"",
			kanri_itask_format_create_use_key_endy:"",
			kanri_itask_type_edit_authority_new_member_id:0,
			//管理画面のiTask種類リスト
			kanri_itask_type_list:[],
			engine_list:[],
			//itaskの履歴を表示する時に使うitaskのindex
			itask_list_show_history_index:null,
			itask_list_autoloading:false,
			//itaskの履歴を表示するflag
			itask_list_show_history_flag:false,
			//itask現在の履歴リスト
			itask_now_history: [],
			itask_list_display_category: "NG",
			itask_list_display_format: "NG",
			security_member_branch_list: [],
			security_member_section_list: [],
			security_member_post_list: [],
			security_member_status_list: [],
			security_member_list: [],
			menu_security_member_select_recode_open: false,
			menu_security_member_select_syousai_open: false,
			menu_security_member_select_syousai_read: true,
			security_member_now_member_icon: "",
			security_member_now_member_name: "",
			security_member_now_member_name_hiragana: "",
			security_member_now_branch_name: "",
			security_member_now_section_name: "",
			security_member_now_post_name: "",
			security_member_now_member_id: "",
			security_member_now_branch_id: "",
			security_member_now_section_id: "",
			security_member_now_post_id: "",
			security_member_now_mobile: "",
			security_member_now_mail: "",
			security_member_now_status_id: "",
			security_member_now_status: "",
			//メンバー詳細画面で表示するメンバー操作権限
			menu_security_member_member_ctlauth_list: [],
			//メンバー詳細画面で表示する管理画面操作権限
			menu_security_member_kanri_ctlauth_list: [],
			//メンバー詳細画面で表示するファイル画面操作権限
			menu_security_member_file_ctlauth_list: [],
			
			menu_security_member_itask_category_ctlauth_list: [],
			//メンバー詳細画面で表示するメンバー操作権限選択肢
			menu_security_member_member_ctlauth: 999,
			//メンバー詳細画面で表示する管理画面操作権限選択肢
			menu_security_member_kanri_ctlauth: 999,
			//メンバー詳細画面で表示するファイル画面操作権限選択肢
			menu_security_member_file_ctlauth: 999,
			//メンバー詳細画面で表示するitask画面操作権限選択肢
			menu_security_member_itask_ctlauth: 999,
			security_member_now_itask_category_ctlauth: 999,
			security_member_now_itask_format_ctlauth: 999,
			
			//メンバー詳細画面で表示するメンバー操作権限選択肢
			menu_security_member_member_ctlauth_name: "",
			//メンバー詳細画面で表示する管理画面操作権限選択肢
			menu_security_member_kanri_ctlauth_name: "",
			//メンバー詳細画面で表示するファイル画面操作権限選択肢
			menu_security_member_file_ctlauth_name: "",
			//メンバー詳細画面で表示するitask画面操作権限選択肢
			menu_security_member_itask_ctlauth_name: "",
			security_member_now_itask_category_ctlauth_name: "",
			security_member_now_itask_format_ctlauth_name: "",
			security_member_add_member_icon: "",
			security_member_add_member_name: "",
			security_member_add_member_name_hiragana: "",
			security_member_add_branch_name: "",
			security_member_add_section_name: "",
			security_member_add_post_name: "",
			security_member_add_member_id: "",
			security_member_add_branch_id: "",
			security_member_add_section_id: "",
			security_member_add_post_id: "",
			security_member_add_mobile: "",
			security_member_add_mail: "",
			security_member_add_status_id: "",
			security_member_add_status: "",
			
			security_member_show_taisyokusya_flag: false,
			security_member_branch_sel_all: false,
			security_member_section_sel_all: false,
			//詳細画面の変更ボタンがあるかどうか
			menu_security_member_select_syousai_change_flag: false,
			//メンバー画像
			security_member_add_image_uploadFile: null,
			//メンバー画像
			security_member_image_uploadFile: null,
			//機密情報
			security_member_kimituinfo: [],
			security_member_syousai_open_health_flag: false,
			//メンバー追加画面
			menu_security_addmember_open: false,
			//メンバー追加画面で表示するメンバー操作権限
			menu_security_addmember_member_ctlauth_list: [],
			//メンバー追加画面で表示する管理画面操作権限
			menu_security_addmember_kanri_ctlauth_list: [],
			//メンバー追加画面で表示するファイル画面操作権限
			menu_security_addmember_file_ctlauth_list: [],
			//メンバー追加画面で表示するitask画面操作権限
			menu_security_addmember_itask_ctlauth_list: [],
			//メンバー追加画面で表示するメンバー操作権限選択肢
			menu_security_addmember_member_ctlauth: 999,
			//メンバー追加画面で表示する管理画面操作権限選択肢
			menu_security_addmember_kanri_ctlauth: 999,
			//メンバー追加画面で表示するファイル画面操作権限選択肢
			menu_security_addmember_file_ctlauth: 999,
			//メンバー追加画面で表示するitask画面操作権限選択肢
			menu_security_addmember_itask_ctlauth: 999,
			menu_security_addmember_itask_category_ctlauth: 999,
			menu_security_addmember_itask_format_ctlauth: 999,
			//マイナンバーを表示するか
			security_member_show_my_member_flag:false,
			//認証コードを認証する必要があれば、この変数の値はtrue
			security_check_open_code: true,
			//既に認証コードを送信した場合にこの変数の値はtrue
			security_send_open_code_complete: false,
			//入力した認証コード
			security_open_code: "",
			//検索キーワード　上部検索機能共通
			menu_search_word: "",
			
			files_roots: [],
			file_list: [],
			files_uploadFile: [],
			files_upload_type: "file",
			files_show_upload_progress: false,
			files_boos_id: "",
			files_db_size: "",
			files_max_db_size: "",
			files_note: "",
			file_list_show_items: [{name:"ファイル名",flag:true},{name:"更新日",flag:true},{name:"サイズ",flag:true},{name:"更新者",flag:true}],
			file_list_setting_show_items_flag: false,
			files_show_share_window_flag: false,
			files_share_mail_address: [],
			files_share_expire_date: "",
			//ファイルをドロップしているかを判断する
			file_list_dropover:false,
			file_list_sort_0: true,
			file_list_sort_up_0: false,
			file_list_sort_dw_0: true,
			file_list_sort_1: false,
			file_list_sort_up_1: true,
			file_list_sort_dw_1: false,
			file_list_sort_2: false,
			file_list_sort_up_2: true,
			file_list_sort_dw_2: false,
			file_list_sort_3: false,
			file_list_sort_up_3: true,
			file_list_sort_dw_3: false,
			file_list_sort_search_0: false,
			file_list_sort_search_up_0: true,
			file_list_sort_search_dw_0: false,
			file_list_sort_search_1: false,
			file_list_sort_search_up_1: true,
			file_list_sort_search_dw_1: false,
			file_list_sort_search_2: false,
			file_list_sort_search_up_2: true,
			file_list_sort_search_dw_2: false,
			file_list_sort_search_3: false,
			file_list_sort_search_up_3: true,
			file_list_sort_search_dw_3: false,
			file_list_sort_my_0: false,
			file_list_sort_my_up_0: true,
			file_list_sort_my_dw_0: false,
			file_list_sort_my_1: false,
			file_list_sort_my_up_1: true,
			file_list_sort_my_dw_1: false,
			file_list_sort_my_2: false,
			file_list_sort_my_up_2: true,
			file_list_sort_my_dw_2: false,
			file_list_sort_my_3: false,
			file_list_sort_my_up_3: true,
			file_list_sort_my_dw_3: false,
			file_list_sort_my_goto_0: false,
			file_list_sort_my_goto_up_0: true,
			file_list_sort_my_goto_dw_0: false,
			file_list_sort_my_goto_1: false,
			file_list_sort_my_goto_up_1: true,
			file_list_sort_my_goto_dw_1: false,
			file_list_sort_my_goto_2: false,
			file_list_sort_my_goto_up_2: true,
			file_list_sort_my_goto_dw_2: false,
			file_list_sort_my_goto_3: false,
			file_list_sort_my_goto_up_3: true,
			file_list_sort_my_goto_dw_3: false,
			files_folder_name: "",
			files_now_tree_id: "",
			files_now_name: "",
			files_now_member_id: "",
			files_now_member_name: "",
			files_now_type: "",
			files_now_update_at: "",
			files_now_file_size: "",
			files_now_history: [],
			files_uploadFile_names: [],
			open_set_auth_window_flag: false,
			files_auth_read_flag_user_type: "OK",
			files_auth_view_model: "r",
			files_auth_change_flag_user_type: "OK",
			files_auth_read_flag_user_list: [],
			//権限設定画面の照会権限の本支社選択肢
			files_auth_read_branch_list: [],
			//権限設定画面の照会権限の部門選択肢
			files_auth_read_section_list: [],
			//権限設定画面の照会権限の入力キーワード
			files_auth_read_keyword: "",
			//権限設定画面の照会権限全文選択フラグ
			files_auth_read_changeall_flag: true,
			files_auth_change_flag_user_list: [],
			//権限設定画面の変更権限の本支社選択肢
			files_auth_change_branch_list: [],
			//権限設定画面の変更権限の部門選択肢
			files_auth_change_section_list: [],
			//権限設定画面の変更権限の入力キーワード
			files_auth_change_keyword: "",
			//権限設定画面の変更権限全文選択フラグ
			files_auth_change_changeall_flag: true,
			//権限設定画面の所有権タイプ
			files_auth_syoyu_flag_user_type: "OK",
			//権限設定画面の所有権選択ユーザリスト
			files_auth_syoyu_flag_user_list: [],
			//権限設定画面の所有権の本支社選択肢
			files_auth_syoyu_branch_list: [],
			//権限設定画面の所有権の部門選択肢
			files_auth_syoyu_section_list: [],
			//権限設定画面の所有権の入力キーワード
			files_auth_syoyu_keyword: "",
			files_auth_syoyu_member_id: "",
			//読み込み権限選択
			files_auth_read_branch_sel_all: true,
			files_auth_read_section_sel_all: true,
			//読み込み権限選択
			files_auth_change_branch_sel_all: true,
			files_auth_change_section_sel_all: true,
			//読み込み権限選択
			files_auth_syoyu_branch_sel_all: true,
			files_auth_syoyu_section_sel_all: true,
			
			file_show_create_folder: true,
			file_show_file_upload: true,
			file_change_history: [],
			//ファイルアップロードエリアを表示するか
			file_show_upload_area_flag: false,
			//フォルダ作成エリアを表示するか
			file_show_create_folder_area_flag: false,
			//ファイルサーチの結果
			files_search_list: [],
			//ファイルサーチの結果を表示するかフラグ
			//認証コードを認証する必要があれば、この変数の値はtrue
			files_check_open_code: true,
			//既に認証コードを送信した場合にこの変数の値はtrue
			files_send_open_code_complete: false,
			//入力した認証コード
			files_open_code: "",
			//ファイル共有する時に使うコメント
			files_share_comment: "",
			files_share_link: "none",
			files_share_ok: false,
			//ファイル共有する時にパスワード発行するかの選択し
			files_share_make_password_flag: true,
			file_list_show_my_files_flag: false,
			//自己所有フォルダのコピー或いは移動の先を選択する画面を表示するかのフラグ
			file_list_show_my_files_goto_target_flag: false,
			file_list_my_goto_list_roots: [],
			file_list_my_goto_list: [],
			//i taskの設定画面を表示するフラグ
			files_show_itask_flag: false,
			files_open_code: "",
			show_files_search_list: false,
			//受注見込（見積書）設定window
			files_itask_atv1_flag:false,
			//受注（注文請書）設定window
			files_itask_atv2_flag:false,
			//売上（請求書）設定window
			files_itask_atv3_flag:true,
			files_itask_atv_flag: "",
			files_itask_do_insert_flag: false,
			//受注見込（見積書）の入力値
			files_itask_mikomi_input: [0,"","",0,0,0,0,0],
			//受注（注文請書）の入力値
			files_itask_uke_input: [0,"","",0,0,0,0],
			//売上（請求書）の入力値
			files_itask_seikyu_input: [],
			//請求書などを入力する際に利用する案件情報
			files_itask_anken_input:null,
			//タスクのID
			files_itask_create_anken_flag: false,
			files_itask_create_anken_info: [],
			files_itask_branch_list: [],
			files_itask_section_list: [],
			files_itask_post_list: [],
			//案件選択画面を表示するかのフラグ
			files_itask_select_anken_flag: false,
			//案件選択画面⇒本支社全選択
			files_itask_select_anken_branch_sel_all: false,
			//案件選択画面⇒部門全選択
			files_itask_select_anken_section_sel_all: false,
			//案件選択画面⇒本支社リスト
			files_itask_select_anken_branch_list: [],
			//案件選択画面⇒部門リスト
			files_itask_select_anken_section_list: [],
			//案件リスト
			files_itask_select_anken_list: [],
			//i.taskの案件一覧で表示する項目のオプション
			files_itask_select_anken_show_items: [],
			//i.taskを登録する時に記録するtree_id
			files_itask_tree_id: null,
			//i.taskを登録する時に記録するfile_id(複数バージョンあり)
			files_itask_file_id: null,
			//i.taskが業務書類ID
			files_itask_itask_id: null,
			//i.taskを開いたとき、登録していない場合、業務書類種類を選択する画面を開くフラグ
			files_itask_select_syurui_flag: false,
			//itask種類一覧
			files_itask_select_syurui_list: [],
			//履歴検索用開始日
			history_select_date_start: "",
			//履歴検索用終了日
			history_select_date_end: "",
			//itask画面で表示する項目
			itask_show_type: "sk",
			//ファイルドロップするフラグ
			itask_list_dropover: false,
			//itaskで表示する項目
			itask_list_show_items: {},
			//itaskで表示する項目 現在　こうしないと項目をクリックしても変わらない
			itask_list_show_items_now: [],
			itask_list_show_items_search_other_items: [],
			itask_list_show_items_search_other_items_val1: [],
			itask_list_show_items_search_other_items_val2: [],
			//itaskで表示する検索項目
			itask_list_search_items: {},
			itask_list_search_kojinhoujin: "",
			//itaskで表示するファイルリスト
			itask_list_show_file_list: {},
			//テンプレートがないなどの際に表示するメッセージ
			itask_list_show_message: null,
			//itaskで表示するファイル数
			itask_list_show_file_itask_count:0,
			//現在表示中のファイルリスト
			itask_list_show_file_list_now: [],
			itask_list_show_file_list_now_xy: {},
			itask_list_show_file_list_now_xy_page: null,
			itask_list_show_file_list_now_xy_deletes: {},
			aitask_points_list: {},
			itask_list_show_file_list_now_have_alert:false,
			itask_list_search_file_name: "",
			itask_list_search_show_kotei: true,
			itask_list_search_member_name: "",
			itask_list_search_update_at_start: "",
			itask_list_search_update_at_end: "",
			itask_list_search_date_year: "",
			itask_list_search_date_month: "",
			itask_list_search_date_list_month: [],
			itask_list_search_date_list_year: [],
			itask_list_search_start_date_year: "",
			itask_list_search_start_date_month: "",
			itask_list_search_end_date_year: "",
			itask_list_search_end_date_month: "",
			itask_list_show_file_list_now_imgs: [],
			itask_list_show_file_list_now_imgs_index:0,
			itask_list_show_file_list_selectall_click_flag:true,
			//itaskグラフが使うデータ
			itask_list_graph_data: {},
			//アップロードファイル
			itask_uploadFile: [],
			//アップロードファイル名
			itask_uploadFile_names: [],
			itask_format_list_auto_select_flag: false,
			//自分定義ドキュメント種類
			itask_sub_type_list: [],
			itask_shaer_type_list: [],
			itask_now_name:"",
			//itaskの種類
			//受注（注文書）
			tm: "tm",
			//受注見込（見積書）
			jt: "jt",
			//売上（請求書）
			sk: "sk",
			//入金
			nk: "nk",
			//経費
			kh: "kh",
			//支払
			sh: "sh",
			//itaskリストのページング用変数
			itask_list_show_file_list_paging: {},
			//itask項目金額の合計
			itask_list_show_file_list_goukei: "-",
			//itaskのフォーマットリスト
			itask_format_list: [],
			itask_list_show_share_flag: "NG",
			itask_list_show_edit_window_flag: false,
			itask_list_show_edit_window_display_image: true,
			itask_list_show_edit_index: 0,
			itask_list_show_edit_aitask_name: '',
			itask_list_show_edit_window_editing_list: {},
			itask_list_show_edit_window_table_zoom: 50,
			//任意検索項目
			itask_list_search_free_col:"",
			itask_list_graph_show_flag:false,
			//表示項目の設定画面を表示するか
			itask_show_items_setting_flag:false,
			//itask検索条件を表示フラグ
			itask_list_search_flag:false,
			//アップロードファイルのテンプレートを表示フラグ
			itask_list_format_flag:false,
			kanri_itask_show_format_list_flag:false,
			itask_list_show_flag:false,
			//すべてのページを解析するフラグ
			itask_show_coke_pages_all_flag:false,
			//ページを設定する文字
			itask_show_coke_pages_str:"",
			//表示する項目
			itask_list_show_items_setting: {},
			//任意検索項目のキーワード
			itask_list_search_free_keyword: "",
			//グラフを表示できる
			itask_list_show_graph_flag:false,
			itask_alert_list:[],
			//分析ページを選択するフラグ
			itask_show_coke_pages_flag:false,
			itask_show_coke_pages_strs:{},
			//itask一覧の種類名
			itask_now_show_type_name:"",
			//チャットルーム情報リスト
			chatroom_roomlist: [],
			//メンバー間チャットルーム情報リスト
			chatroom_roomlist_member: [],
			//チャットルームに入ったかのフラグ
			chatroom_syousai: false,
			//チャットルームを編集してるか
			chatroom_add_room_edit_flag:false,
			chatroom_add_room_edit_name: "",
			//今現在入ったグループチャットルームのID
			chatroom_now_chatroom_id: null,
			//今のチャットルーム名
			chatroom_now_chatroom_name: null,
			//今現在入ったチャットルームのID
			chatroom_now_member_id: null,
			//今のチャットルーム名
			chatroom_now_member_name: null,
			chatroom_now_member_mobile: null,
			chatroom_now_member_icon: null,
			//websocket用メンバー間チャットルームID
			chatroom_now_member_roomid: null,
			chatroom_mycomment: "",
			chatroom_messagelist: [],
			//チャット一覧を表示するフラグ
			chatroom_chatlist_flag: false,
			//メンバーチャットを追記リストを表示するフラグ
			chatroom_add_member_flag: false,
			//ルームチャットを追記リストを表示するフラグ
			chatroom_add_room_flag: false,
			//ルームチャットを新規する画面を表示するフラグ
			chatroom_create_room_flag: false,
			chatroom_add_member_id: null,
			chatroom_add_member_list: [],
			chatroom_create_room_add_member_list: [],
			chatroom_add_room_id: null,
			chatroom_add_room_list: [],
			//チャットルームをフォローしているメンバーの一覧
			chatroom_join_member_list: [],
			chatroom_create_room_add_room_name: "",
			//既に存在しているチャートルームを編集していますかを判断するフラグ
			chatroom_create_room_editing_flag: false,
			//部門順フラグ
			chatroom_create_room_add_sort_section:false,
			//名前順フラグ
			chatroom_create_room_add_sort_member:false,
			//同時実行を避けるため、chatroom_running_flagで判断する
			chatroom_running_flag: false,
			//テキストのチャットモード
			chatroom_chat_text_model_flag: true,
			//画像のチャットモード
			chatroom_chat_imag_model_flag: false,
			//チャットルームを編集する画面を開くときに取得したメンバーリスト
			editing_chat_room_member_list: [],
			//チャートルームのチャート画面で検索する場合の検索結果一覧
			chatroom_search_comment_list: [],
			chatroom_chat_imag_uploadFile_names: [],
			chatroom_chat_imag_uploadFile: [],
			chatroom_chat_imag_src: "",
			chatroom_chat_dropover: true,
			chatroom_chat_selectedFile_list:[],
			chatroom_chat_selectedFile_chat_file_id:"",
			chatroom_chat_selectedFile_modle:null,
			chatroom_showmembers_for_add_members_flag:false,
			chatroom_edit_room_add_member_list:[],
			//チャートのコメント一覧検索結果を表示するかのフラグ
			show_chatroom_search_comment_list : false,
			show_calendar: false,
			//■■■■■■■利用状況■■■■■■■
			menu_user_info_list: [],
			//■■■■■■■問い合わせ■■■■■■■
			menu_inquiry_list:[],
			//■■■■■■■マイメニュー変数■■■■■■■
			menu_mymenu_open: false,
			mymenu_member_info: [],
			mymenu_image_uploadFile: null,
			//ibox操作権限
			mymenu_member_file_ctlauth_list: [],
			//管理画面操作権限
			mymenu_member_kanri_ctlauth_list: [],
			//高機密画面操作権限
			mymenu_member_member_ctlauth_list: [],
			//本支社リスト
			mymenu_branch_list: [],
			//部門リスト
			mymenu_section_list: [],
			//役職リスト
			mymenu_post_list: [],
			mymenu_member_kimituinfo: [],
			mymenu_show_my_member_flag: false,
			mymenu_setting_flag: false,
			menu_mymenu_read: true,
			//
			analyze_uploadFile_names: [],
			analyze_uploadFile: [],
			analyze_dropover:false,
			analyze_complet:false,
			analyze_response:"",
			analyze_wait:false
		},
		methods: {
			share_facebook: CS.share_facebook,
			share_twitter: CS.share_twitter,
			share_line: CS.share_line,
			share_google: CS.share_google,
			share_weixin: CS.share_weixin,
			logout: CS.logout,
			cleartooltip: CS.cleartooltip,
			show_home: CS.show_home,
			menu_phon_close: CS.menu_phon_close,
			menu_phon_click: CS.menu_phon_click,
			menu_kanri_click: CS.menu_kanri_click,
			menu_branch_click: CS.menu_branch_click,
			menu_section_click: CS.menu_section_click,
			menu_post_click: CS.menu_post_click,
			menu_kanri_itask_click: CS.menu_kanri_itask_click,
			menu_chatroom_click: CS.menu_chatroom_click,
			menu_history_click: CS.menu_history_click,
			menu_chat_click: CS.menu_chat_click,
			menu_search_manager: CS.menu_search_manager,
			kanri_branch_save: CS.kanri_branch_save,
			kanri_branch_add: CS.kanri_branch_add,
			kanri_branch_reset: CS.kanri_branch_reset,
			kanri_branch_edt: CS.kanri_branch_edt,
			kanri_branch_del: CS.kanri_branch_del,
			kanri_section_save: CS.kanri_section_save,
			kanri_section_add: CS.kanri_section_add,
			kanri_section_reset: CS.kanri_section_reset,
			kanri_section_edt: CS.kanri_section_edt,
			kanri_section_del: CS.kanri_section_del,
			kanri_post_save: CS.kanri_post_save,
			kanri_post_add: CS.kanri_post_add,
			kanri_post_reset: CS.kanri_post_reset,
			kanri_post_edt: CS.kanri_post_edt,
			kanri_post_del: CS.kanri_post_del,
			kanri_chatroom_save: CS.kanri_chatroom_save,
			kanri_chatroom_add: CS.kanri_chatroom_add,
			kanri_chatroom_reset: CS.kanri_chatroom_reset,
			kanri_chatroom_edt: CS.kanri_chatroom_edt,
			kanri_chatroom_del: CS.kanri_chatroom_del,
			
			kanri_itask_format_list_add: CS.kanri_itask_format_list_add,
			kanri_itask_change_show_type: CS.kanri_itask_change_show_type,
			kanri_itask_format_list_show: CS.kanri_itask_format_list_show,
			kanri_itask_format_list_show_pram: CS.kanri_itask_format_list_show_pram,
			kanri_itask_goto_itask_list: CS.kanri_itask_goto_itask_list,
			kanri_itask_format_create_file_dragover: CS.kanri_itask_format_create_file_dragover,
			kanri_itask_format_create_file_dragleave: CS.kanri_itask_format_create_file_dragleave,
			kanri_itask_format_create_file_drop: CS.kanri_itask_format_create_file_drop,
			kanri_itask_format_create_step2_col_click: CS.kanri_itask_format_create_step2_col_click,
			kanri_itask_format_create_step2_editselect_back: CS.kanri_itask_format_create_step2_editselect_back,
			kanri_itask_format_create_step2_editselect_save: CS.kanri_itask_format_create_step2_editselect_save,
			kanri_itask_format_create_step2_editselect_test: CS.kanri_itask_format_create_step2_editselect_test,
			kanri_itask_format_create_step2_editselect_editparam_click: CS.kanri_itask_format_create_step2_editselect_editparam_click,
			//検索条件を変える際の動作
			kanri_itask_format_create_changeparam: CS.kanri_itask_format_create_changeparam,
			//検索条件追記する
			kanri_itask_format_create_step2_conditions_add: CS.kanri_itask_format_create_step2_conditions_add,
			//検索条件削除する
			kanri_itask_format_create_step2_conditions_del: CS.kanri_itask_format_create_step2_conditions_del,
			//検索条件追記する
			kanri_itask_format_create_step2_conditions_youso_add: CS.kanri_itask_format_create_step2_conditions_youso_add,
			//検索条件削除する
			kanri_itask_format_create_step2_conditions_youso_del: CS.kanri_itask_format_create_step2_conditions_youso_del,
			//フォーマットカラムを追加する
			kanri_itask_format_create_step2_col_add: CS.kanri_itask_format_create_step2_col_add,
			//フォーマットカラムを削除する
			kanri_itask_format_create_step2_col_del: CS.kanri_itask_format_create_step2_col_del,
			//フォーマットキー選択イベント
			kanri_itask_format_create_init_key_select_mousedown: CS.kanri_itask_format_create_init_key_select_mousedown,
			kanri_itask_format_create_init_key_select_click: CS.kanri_itask_format_create_init_key_select_click,
			kanri_itask_format_create_init_key_select_move: CS.kanri_itask_format_create_init_key_select_move,
			kanri_itask_format_create_init_key_select_mouseout: CS.kanri_itask_format_create_init_key_select_mouseout,
			kanri_itask_format_create_init_key_select_mouseup: CS.kanri_itask_format_create_init_key_select_mouseup,
			kanri_itask_format_create_init_key_select_mouseover: CS.kanri_itask_format_create_init_key_select_mouseover,
			kanri_itask_format_create_init_key_select_get: CS.kanri_itask_format_create_init_key_select_get,
			//選択肢の移動動作
			kanri_itask_format_create_source_click: CS.kanri_itask_format_create_source_click,
			kanri_itask_format_create_source_mousedown: CS.kanri_itask_format_create_source_mousedown,
			kanri_itask_format_create_source_mouseover: CS.kanri_itask_format_create_source_mouseover,
			kanri_itask_format_create_source_mouseout: CS.kanri_itask_format_create_source_mouseout,
			kanri_itask_format_create_step2_dragover: CS.kanri_itask_format_create_step2_dragover,
			kanri_itask_format_create_step2_drop: CS.kanri_itask_format_create_step2_drop,
			kanri_itask_format_create_step2_change_source: CS.kanri_itask_format_create_step2_change_source,
			//ドキュメント画像をマウスダウンイベントを遮断する
			kanri_itask_format_create_step2_sourceimage_mousedown: CS.kanri_itask_format_create_step2_sourceimage_mousedown,
			kanri_itask_format_create_step2_sourceimage_click: CS.kanri_itask_format_create_step2_sourceimage_click,
			kanri_itask_format_create_step2_sourceimage_move: CS.kanri_itask_format_create_step2_sourceimage_move,
			//マウスがアウトすると四角を描画しない
			kanri_itask_format_create_step2_sourceimage_mouseout: CS.kanri_itask_format_create_step2_sourceimage_mouseout,
			//マウスがアップしたら四角を描画しない
			kanri_itask_format_create_step2_sourceimage_mouseup: CS.kanri_itask_format_create_step2_sourceimage_mouseup,
			kanri_itask_format_create_step2_sourceimage_mouseover: CS.kanri_itask_format_create_step2_sourceimage_mouseover,
			//検索座標のパラメータを表示するかを変更する
			itask_col_conditions_show_search_param_click:CS.itask_col_conditions_show_search_param_click,
			//画像から座標を取込
			itask_col_conditions_get_search_param_click:CS.itask_col_conditions_get_search_param_click,
			//座標をクリアする
			itask_col_conditions_clear_search_param_click:CS.itask_col_conditions_clear_search_param_click,
			//itask新規画面の項目一覧画面のドキュメントビューを前ページに遷移する
			kanri_itask_format_create_step1_prevpage:CS.kanri_itask_format_create_step1_prevpage,
			//itask新規画面の項目一覧画面のドキュメントビューを次ページに遷移する
			kanri_itask_format_create_step1_nextpage:CS.kanri_itask_format_create_step1_nextpage,
			//itask詳細情報編集の画面遷移
			itask_list_show_file_list_now_imgs_prevpage:CS.itask_list_show_file_list_now_imgs_prevpage,
			itask_list_show_file_list_now_imgs_nextpage:CS.itask_list_show_file_list_now_imgs_nextpage,
			itask_list_show_file_list_now_imgs_rotate_right:CS.itask_list_show_file_list_now_imgs_rotate_right,
			itask_list_show_file_list_now_imgs_rotate_left:CS.itask_list_show_file_list_now_imgs_rotate_left,
			//座標を表示する
			itask_list_show_file_list_now_xy_selecte:CS.itask_list_show_file_list_now_xy_selecte,
			//選択イベント
			itask_list_show_file_list_select_click:CS.itask_list_show_file_list_select_click,
			//すべて選択、解除
			itask_list_show_file_list_selectall_click:CS.itask_list_show_file_list_selectall_click,
			
			itask_kanjo_edit_show:CS.itask_kanjo_edit_show,
			//itask新規画面のパラメータ編集画面のドキュメントビューを前ページに遷移する
			kanri_itask_format_create_step2_prevpage:CS.kanri_itask_format_create_step2_prevpage,
			//itask新規画面のパラメータ編集画面のドキュメントビューを次ページに遷移する
			kanri_itask_format_create_step2_nextpage:CS.kanri_itask_format_create_step2_nextpage,
			//itask新規画面の保存機能
			kanri_itask_format_create_save:CS.kanri_itask_format_create_save,
			//itaskのフォーマットを削除する
			kanri_itask_format_list_del:CS.kanri_itask_format_list_del,
			//itaskのフォーマットを編集する
			kanri_itask_format_list_edt:CS.kanri_itask_format_list_edt,
			//itaskのフォーマット一覧に戻る
			kanri_itask_format_create_step1_back:CS.kanri_itask_format_create_step1_back,
			//itaskのフォーマットの内容を現在フォーマットコピー
			kanri_itask_format_list_copy:CS.kanri_itask_format_list_copy,
			//編集中のitaskのimgを更新する画面を表示
			kanri_itask_format_show_update_img_window:CS.kanri_itask_format_show_update_img_window,
			//ファイル更新する
			kanri_itask_format_create_file_update_drop:CS.kanri_itask_format_create_file_update_drop,
			//ファイル更新ウィンドウを閉じる
			kanri_itask_format_create_file_update_drop_close:CS.kanri_itask_format_create_file_update_drop_close,
			//定義したフォーマットのテスト
			kanri_itask_format_create_test:CS.kanri_itask_format_create_test,
			//項目を保存する
			kanri_itask_format_all_items_save:CS.kanri_itask_format_all_items_save,
			kanri_itask_format_all_items_back:CS.kanri_itask_format_all_items_back,
			kanri_itask_format_create_show_imag_xy:CS.kanri_itask_format_create_show_imag_xy,
			//すべての項目を表示する画面で項目を削除する
			kanri_itask_all_items_del:CS.kanri_itask_all_items_del,
			//すべての項目を表示する画面で項目を追加する
			kanri_itask_all_items_add:CS.kanri_itask_all_items_add,
			//表示する項目を編集する
			kanri_itask_items_show:CS.kanri_itask_items_show,
			kanri_itask_master_show:CS.kanri_itask_master_show,
			kanri_itask_master_search:CS.kanri_itask_master_search,
			kanri_itask_master_show_paging:CS.kanri_itask_master_show_paging,
			kanri_itask_master_add:CS.kanri_itask_master_add,
			kanri_itask_master_save:CS.kanri_itask_master_save,
			kanri_itask_master_delet:CS.kanri_itask_master_delet,
			kanri_itask_master_deletone:CS.kanri_itask_master_deletone,
			//フォーマットを新規或いは編集する時に項目を変更する時に発生するイベント
			kanri_itask_format_create_items_change:CS.kanri_itask_format_create_items_change,
			//フォーマットコピー画面から戻る、保存しない
			kanri_itask_format_create_step2_copy_format_back:CS.kanri_itask_format_create_step2_copy_format_back,
			//フォーマットコピーを実行する
			kanri_itask_format_list_copy_do:CS.kanri_itask_format_list_copy_do,
			kanri_itask_replace_close:CS.kanri_itask_replace_close,
			//置き換え文字
			kanri_itask_replace_show:CS.kanri_itask_replace_show,
			//置き換え文字詳細
			kanri_itask_replace_sub_show:CS.kanri_itask_replace_sub_show,
			//置き換えパターンを編集する
			kanri_itask_format_okikae_list_edit:CS.kanri_itask_format_okikae_list_edit,
			//置き換えパターンを削除する
			kanri_itask_format_okikae_list_del:CS.kanri_itask_format_okikae_list_del,
			//置き換えパターンを追加する
			kanri_itask_format_okikae_list_add:CS.kanri_itask_format_okikae_list_add,
			//置き換えパターンの詳細画面で項目を追加する
			kanri_itask_format_okikae_list_sub_add:CS.kanri_itask_format_okikae_list_sub_add,
			//置き換えパターンの詳細画面で項目を削除する
			kanri_itask_format_okikae_list_sub_del:CS.kanri_itask_format_okikae_list_sub_del,
			kanri_itask_format_okikae_list_sub_back:CS.kanri_itask_format_okikae_list_sub_back,
			kanri_itask_format_okikae_list_sub_save:CS.kanri_itask_format_okikae_list_sub_save,
			//itask一覧からテンプレート作成画面に遷移する
			kanri_itask_format_create_by_itask_list_show:CS.kanri_itask_format_create_by_itask_list_show,
			kanri_itask_format_create_now_coke_by_default_change:CS.kanri_itask_format_create_now_coke_by_default_change,
			//テンプレート管理画面でitask種別を切り返す
			kanri_itask_list_click_tab_list:CS.kanri_itask_list_click_tab_list,
			//テンプレート新規画面のファイルアップロード子画面から戻る
			kanri_itask_format_create_file_dropover_back:CS.kanri_itask_format_create_file_dropover_back,
			//カテゴリーの権限を表示する
			kanri_itask_type_list_get_authority:CS.kanri_itask_type_list_get_authority,
			//カテゴリーの権限メンバーを追加する
			kanri_itask_type_edit_authority_Leave:CS.kanri_itask_type_edit_authority_Leave,
			kanri_itask_type_edit_authority_add:CS.kanri_itask_type_edit_authority_add,
			kanri_itask_type_edit_authority_del:CS.kanri_itask_type_edit_authority_del,
			kanri_itask_type_edit_authority_back:CS.kanri_itask_type_edit_authority_back,
			kanri_itask_type_edit_authority_save:CS.kanri_itask_type_edit_authority_save,
			//カテゴリー一覧を表示する
			kanri_itask_type_list_show_do:CS.kanri_itask_type_list_show_do,
			//カテゴリー一覧からitask一覧にバックする
			kanri_itask_type_list_back:CS.kanri_itask_type_list_back,
			//カテゴリー一覧を保存する
			kanri_itask_type_list_save:CS.kanri_itask_type_list_save,
			//カテゴリー一覧の画面にカテゴリーを追加する
			kanri_itask_type_list_add:CS.kanri_itask_type_list_add,
			//カテゴリー一覧の画面にカテゴリーを削除する
			kanri_itask_type_list_del:CS.kanri_itask_type_list_del,
			menu_itask_refresh:CS.menu_itask_refresh,
			menu_security_click: CS.menu_security_click,
			menu_security_member_click: CS.menu_security_member_click,
			menu_security_member_selecttype_open_click: CS.menu_security_member_selecttype_open_click,
			menu_security_member_selecttype_clos_click: CS.menu_security_member_selecttype_clos_click,
			security_select_member: CS.security_select_member,
			menu_security_member_select_recode_click: CS.menu_security_member_select_recode_click,
			menu_security_member_select_recode_bar_clos_click: CS.menu_security_member_select_recode_bar_clos_click,
			menu_security_member_select_recode_bar_open_click: CS.menu_security_member_select_recode_bar_open_click,
			security_member_image_btn_click: CS.security_member_image_btn_click,
			security_member_image_selectedFile: CS.security_member_image_selectedFile,
			security_member_syousai_change: CS.security_member_syousai_change,
			//メンバー詳細情報を保存する
			security_member_syousai_save: CS.security_member_syousai_save,
			//メンバー詳細情報画面から変更せずに戻る
			security_member_syousai_back: CS.security_member_syousai_back,
			//メンバー機密情報を保存する
			security_member_syousai_save_kimitu: CS.security_member_syousai_save_kimitu,
			menu_security_addmember_click: CS.menu_security_addmember_click,
			menu_security_addmember_save: CS.menu_security_addmember_save,
			security_member_add_image_btn_click: CS.security_member_add_image_btn_click,
			security_member_add_image_selectedFile: CS.security_member_add_image_selectedFile,
			//メンバー詳細画面を表示する前に、チェックコードを送ります。
			security_send_open_code: CS.security_send_open_code,
			//メンバー詳細画面を表示する前に、チェックコードをチェックする
			security_check_open_code_run: CS.security_check_open_code_run,
			security_member_my_member_show: CS.security_member_my_member_show,
			security_member_my_member_hidden: CS.security_member_my_member_hidden,
			security_member_branch_select: CS.security_member_branch_select,
			security_member_section_select: CS.security_member_section_select,
			security_member_change_show_taisyokusya_flag: CS.security_member_change_show_taisyokusya_flag,
			security_member_sel_all: CS.security_member_sel_all,
			security_member_syousai_open_health: CS.security_member_syousai_open_health,
			menu_files_click: CS.menu_files_click,
			files_selectedFile: CS.files_selectedFile,
			files_create_folder: CS.files_create_folder,
			files_openfolder_tree_name: CS.files_openfolder_tree_name,
			files_openfolder: CS.files_openfolder,
			files_upfolder: CS.files_upfolder,
			files_downloadfile: CS.files_downloadfile,
			files_downloadfolder: CS.files_downloadfolder,
			files_deletefile: CS.files_deletefile,
			files_deletefolder: CS.files_deletefolder,
			files_get_pro_file: CS.files_get_pro_file,
			files_get_pro_folder: CS.files_get_pro_folder,
			files_back_to_top: CS.files_back_to_top,
			files_change_name_folder: CS.files_change_name_folder,
			files_deletehistory: CS.files_deletehistory,
			files_downloadhistory: CS.files_downloadhistory,
			files_uploadarea_drop: CS.files_uploadarea_drop,
			files_uploadarea_dragenter: CS.files_uploadarea_dragenter,
			files_uploadarea_dragover: CS.files_uploadarea_dragover,
			files_btn_click: CS.files_btn_click,
			files_do_property: CS.files_do_property,
			files_history_do_property: CS.files_history_do_property,
			files_folder_btn_click: CS.files_folder_btn_click,
			files_selectedFolder: CS.files_selectedFolder,
			files_open_set_auth_menu: CS.files_open_set_auth_menu,
			files_close_set_auth_menu: CS.files_close_set_auth_menu,
			file_show_create_folder_click: CS.file_show_create_folder_click,
			file_show_file_upload_click: CS.file_show_file_upload_click,
			file_resort_file_list: CS.file_resort_file_list,
			file_resort_search_file_list: CS.file_resort_search_file_list,
			files_save_auth: CS.files_save_auth,
			//権限設定の画面で選択条件が変わった時の動作
			files_auth_read_select_change: CS.files_auth_read_select_change,
			//権限設定の画面で選択条件が変わった時の動作
			files_auth_change_select_change: CS.files_auth_change_select_change,
			files_auth_syoyu_select_change: CS.files_auth_syoyu_select_change,
			//照会権限全部選択・解除
			files_auth_read_changeall: CS.files_auth_read_changeall,
			//変更権限全部選択・解除
			files_auth_change_changeall: CS.files_auth_change_changeall,
			files_auth_syoyu_changeall: CS.files_auth_syoyu_changeall,
			files_auth_view_change: CS.files_auth_view_change,
			files_auth_sel_all: CS.files_auth_sel_all,
			files_upload: CS.files_upload,
			//ファイルアップロードエリアを表示する
			file_show_upload_area: CS.file_show_upload_area,
			//フォルダ作成エリアを表示する
			file_show_create_folder_area: CS.file_show_create_folder_area,
			//ファイルの検索機能
			files_search: CS.files_search,
			//メンバー詳細画面を表示する前に、チェックコードを送ります。
			files_send_open_code: CS.files_send_open_code,
			//メンバー詳細画面を表示する前に、チェックコードをチェックする
			files_check_open_code_run: CS.files_check_open_code_run,
			//検索一覧」画面を閉じってから元の画面に戻る
			files_search_back: CS.files_search_back,
			files_change_upload_type: CS.files_change_upload_type,
			files_show_itask_window: CS.files_show_itask_window,
			file_list_dragover: CS.file_list_dragover,
			file_list_drop: CS.file_list_drop,
			file_list_dragleave: CS.file_list_dragleave,
			files_open_set_auth_menu_file: CS.files_open_set_auth_menu_file,
			files_open_set_auth_menu_folder: CS.files_open_set_auth_menu_folder,
			file_list_save_note: CS.file_list_save_note,
			file_list_edit_note: CS.file_list_edit_note,
			//ファイルリストの設定画面を表示する
			file_list_show_option: CS.file_list_show_option,
			file_list_show_items_change: CS.file_list_show_items_change,
			files_show_share_window: CS.files_show_share_window,
			files_share_back: CS.files_share_back,
			files_share_todo: CS.files_share_todo,
			files_share_add: CS.files_share_add,
			files_share_del: CS.files_share_del,
			files_share_change_expire_date: CS.files_share_change_expire_date,
			files_share_copy_like: CS.files_share_copy_like,
			files_share_mailer_fire: CS.files_share_mailer_fire,
			files_share_line_fire: CS.files_share_line_fire,
			files_share_twitter_fire: CS.files_share_twitter_fire,
			files_share_facebook_fire: CS.files_share_facebook_fire,
			file_list_show_my_files: CS.file_list_show_my_files,
			file_list_my_back: CS.file_list_my_back,
			file_list_resort_my_file_list: CS.file_list_resort_my_file_list,
			//自分所有ファイル一覧の画面で移動或いはコピー先を開く
			files_open_target_folder: CS.files_open_target_folder,
			files_auth_button_click: CS.files_auth_button_click,
			files_share_expire_date_click: CS.files_share_expire_date_click,
			
			//タスクの内容を入力する画面を表示する
			files_itask_atv_show: CS.files_itask_atv_show,
			//i.taskバイナリファイルから情報を読み込む
			itask_read_seikyu: CS.itask_read_seikyu,
			//i.taskメイン画面から戻る
			files_itask_back: CS.files_itask_back,
			//i.taskを保存する
			files_itask_save: CS.files_itask_save,
			//案件選択画面を開く
			files_itask_open_select_anken_window: CS.files_itask_open_select_anken_window,
			//案件選択画面⇒戻る
			files_itask_select_anken_back: CS.files_itask_select_anken_back,
			//案件登録画面を開く
			files_itask_open_create_anken_window: CS.files_itask_open_create_anken_window,
			//案件登録画面⇒戻る
			files_itask_create_anken_back: CS.files_itask_create_anken_back,
			//案件登録を実行する
			files_itask_create_anken: CS.files_itask_create_anken,
			//i.task案件全選択　全外す
			files_itask_select_anken_sel_all: CS.files_itask_select_anken_sel_all,
			//案件選択画面⇒本支社選択
			files_itask_select_anken_branch_select: CS.files_itask_select_anken_branch_select,
			//案件選択画面⇒部門選択
			files_itask_select_anken_section_select: CS.files_itask_select_anken_section_select,
			//案件選択画面⇒案件一覧を出す
			files_itask_select_anken_show: CS.files_itask_select_anken_show,
			//案件選択画面の案件一覧をソートする
			files_itask_resort_anken_list: CS.files_itask_resort_anken_list,
			//i.taskの背景を塗る
			files_itask_select_anken_list_light: CS.files_itask_select_anken_list_light,
			//i.taskの背景をクリア
			files_itask_select_anken_list_not_light: CS.files_itask_select_anken_list_not_light,
			//案件を選択する
			files_itask_select_anken_list_select: CS.files_itask_select_anken_list_select,
			//I.TASKの種類リスト
			files_itask_select_syurui: CS.files_itask_select_syurui,
			//iTaskのメニューを開く
			menu_itask_click: CS.menu_itask_click,
			menu_itask_click_for_type:CS.menu_itask_click_for_type,
			menu_itask_click_for_itask:CS.menu_itask_click_for_itask,
			//グラフを表示する
			itask_list_show_graph: CS.itask_list_show_graph,
			//aiTaskファイルドラグ用
			itask_list_dragover: CS.itask_list_dragover,
			itask_list_dragleave: CS.itask_list_dragleave,
			itask_list_drop: CS.itask_list_drop,
			//iTaskを検索する
			itask_list_search : CS.itask_list_search,
			itask_list_search_clear : CS.itask_list_search_clear,
			//i.taskの背景を塗る
			itask_list_show_file_list_now_light: CS.itask_list_show_file_list_now_light,
			//i.taskの背景をクリア
			itask_list_show_file_list_now_not_light: CS.itask_list_show_file_list_now_not_light,
			itask_change_show_type: CS.itask_change_show_type,
			//itaskのファイルリストをクリックした時の挙動
			itask_list_show_file_list_click: CS.itask_list_show_file_list_click,
			//itaskのファイルリストをソートする
			itask_list_show_file_list_resort: CS.itask_list_show_file_list_resort,
			//ページを変える
			itask_list_show_file_list_paging_click: CS.itask_list_show_file_list_paging_click,
			//アップロードファイルフォーマットをクリックしたの動作
			itask_format_list_click: CS.itask_format_list_click,
			//itaskを削除する
			itask_list_delete: CS.itask_list_delete,
			itask_list_delete_all: CS.itask_list_delete_all, 
			//itaskをダウンロードする
			itask_list_download: CS.itask_list_download,
			//itaskを編集する
			itask_list_show_edit_window: CS.itask_list_show_edit_window,
			itask_list_show_view_window: CS.itask_list_show_view_window,
			itask_list_show_edit_window_back: CS.itask_list_show_edit_window_back,
			itask_list_show_edit_window_save: CS.itask_list_show_edit_window_save,
			itask_list_show_edit_window_edit_click: CS.itask_list_show_edit_window_edit_click,
			itask_list_show_edit_window_edit_blur: CS.itask_list_show_edit_window_edit_blur,
			itask_list_show_edit_window_table_zoom_change: CS.itask_list_show_edit_window_table_zoom_change,
			//itaskの履歴を表示する
			itask_list_show_history: CS.itask_list_show_history,
			//履歴画面を閉じる
			itask_list_history_back: CS.itask_list_history_back,
			itask_history_do_property: CS.itask_history_do_property,
			itask_downloadhistory: CS.itask_downloadhistory,
			itask_deletehistory: CS.itask_deletehistory,
			//itaskの表示項目の設定画面を開く
			itask_list_show_option: CS.itask_list_show_option,
			//itaskの表示項目の設定画面を変更する
			itask_list_show_items_change: CS.itask_list_show_items_change,
			//itaskの検索条件画面を開く
			itask_list_show_search: CS.itask_list_show_search,
			//itaskのアップロードファイルのテンプレーの設定画面を開く
			itask_list_show_format_list: CS.itask_list_show_format_list,
			itask_list_show_select_all: CS.itask_list_show_select_all,
			//グラフを表示する
			itask_list_search_forgraph: CS.itask_list_search_forgraph,
			//csvファイルをダウンロードする
			itask_list_get_csv: CS.itask_list_get_csv,
			itask_list_get_csv1: CS.itask_list_get_csv1,
			itask_list_get_csv2: CS.itask_list_get_csv2,
			keieidangi_action: function(action){ if(typeof keieidangiAction==='function'){ keieidangiAction(action, this); } },
			//分析ページを選択する
			itask_show_coke_pages: CS.itask_show_coke_pages,
			//全部のページを分析するかを設定する
			itask_show_coke_pages_all_change: CS.itask_show_coke_pages_all_change,
			//ページ設定の文字を修正した場合
			itask_show_coke_pages_str_change: CS.itask_show_coke_pages_str_change,
			//itaskの項目を切り替える
			itask_list_click_tab_list: CS.itask_list_click_tab_list,
			itask_list_clear_btn :CS.itask_list_clear_btn,
			//アラートの時間を変更する
			itask_list_change_alert :CS.itask_list_change_alert,
			//管理画面のitaskのターゲット項目を移動し始める
			kanri_itask_target_list_dragstart: CS.kanri_itask_target_list_dragstart,
			//管理画面のitaskのターゲット項目の位置がはみ出した
			kanri_itask_target_list_dragover: CS.kanri_itask_target_list_dragover,
			//管理画面のitaskのターゲット項目を設定位置に置いた時
			kanri_itask_target_list_drop: CS.kanri_itask_target_list_drop,
			
			//チャートルームをクリックする
			chatroom_click: CS.chatroom_click,
			chatroom_send_mycomment: CS.chatroom_send_mycomment,
			chatroom_send_mycomment_withemail: CS.chatroom_send_mycomment_withemail,
			//対話を追加する
			chatroom_add_run: CS.chatroom_add_run,
			//対話を隠す
			chatroom_hidden_run: CS.chatroom_hidden_run,
			//前の50メッセージを取り出す。
			chatroom_getmore_comment: CS.chatroom_getmore_comment,
			//メンバー追加画面を表示する
			show_add_member_list: CS.show_add_member_list,
			//ファイルを選択する
			chatroom_chat_selectedFile: CS.chatroom_chat_selectedFile,
			//チャットルーム追加画面を表示する
			show_add_room_list: CS.show_add_room_list,
			//メンバー追加画面を隠す
			hidden_member_list: CS.hidden_member_list,
			//メンバーチャットリストを追加する
			chatroom_add_run_member: CS.chatroom_add_run_member,
			//メンバーチャットリストを追加する(チャットルームの場合)
			chatroom_add_run_member_room: CS.chatroom_add_run_member_room,
			//新しいチャットルームを作成する
			show_create_room: CS.show_create_room,
			//部門名よりメンバー一覧をソートする
			show_create_room_sort_by_section_name: CS.show_create_room_sort_by_section_name,
			//メンバー名よりメンバー一覧をソートする
			show_create_room_sort_by_section_member_name: CS.show_create_room_sort_by_section_member_name,
			//チャットルームのメンバーを編集する
			chatroom_create_room_check: CS.chatroom_create_room_check,
			//新しいチャットルームを作成する
			chatroom_create_room_run: CS.chatroom_create_room_run,
			//チャートルームを削除する
			chatroom_add_run_member_room_del_run: CS.chatroom_add_run_member_room_del_run,
			//チャットルームの左上の戻るボタン
			chatroom_back: CS.chatroom_back,
			//チャットルームを編集する画面を開き
			show_create_room_editing: CS.show_create_room_editing,
			//チャットルームを更新する
			chatroom_create_room_edit_run: CS.chatroom_create_room_edit_run,
			//検索結果から以前のメッセージをだす
			chatroom_search_comment_get_old: CS.chatroom_search_comment_get_old,
			//グループチャット編集画面を閉じる
			chatroom_add_room_edit_chatroom_back: CS.chatroom_add_room_edit_chatroom_back,
			//グループチャット編集画面でグループチャット名を保存してから戻る
			chatroom_add_room_edit_chatroom_save: CS.chatroom_add_room_edit_chatroom_save,
			//グループチャットを削除してから戻る
			chatroom_add_room_edit_chatroom_delete: CS.chatroom_add_room_edit_chatroom_delete,
			chatroom_add_run_member_room_show_edit: CS.chatroom_add_run_member_room_show_edit,
			chatroom_search_back: CS.chatroom_search_back,
			chatroom_change_chat_model: CS.chatroom_change_chat_model,
			chatroom_chat_imag_btn_click: CS.chatroom_chat_imag_btn_click,
			chatroom_chat_imag_selectedFile: CS.chatroom_chat_imag_selectedFile,
			chatroom_chat_dragover: CS.chatroom_chat_dragover,
			chatroom_chat_dragleave: CS.chatroom_chat_dragleave,
			chatroom_chat_drop: CS.chatroom_chat_drop,
			chatroom_showmembers_for_add_members: CS.chatroom_showmembers_for_add_members,
			chatroom_closemembers_for_edit_members: CS.chatroom_closemembers_for_edit_members,
			chatroom_add_member_in_room_run: CS.chatroom_add_member_in_room_run,
			chatroom_del_member_in_room_run: CS.chatroom_del_member_in_room_run,
			chatroom_savemembers_for_edit_members: CS.chatroom_savemembers_for_edit_members,
			history_select_do: CS.history_select_do,
			
			//■■■■■■■マイメニュー変数■■■■■■■
			menu_mymenu_click: CS.menu_mymenu_click,
			//自分の情報を編集する　
			mymenu_change: CS.mymenu_change,
			//自分の情報を保存する
			mymenu_save: CS.mymenu_save,
			//イメージ選択
			mymenu_image_selectedFile: CS.mymenu_image_selectedFile,
			//イメージ選択
			mymenu_member_image_btn_click: CS.mymenu_image_selectedFile,
			//自分の機密情報を取得する
			mymenu_show_kimitu: CS.mymenu_show_kimitu,
			//戻る
			mymenu_back: CS.mymenu_back,
			mymenu_my_member_show: CS.mymenu_my_member_show,
			mymenu_my_member_hidden: CS.mymenu_my_member_hidden,
			//マイメニュー設定画面を開く
			mymenu_get_setting: CS.mymenu_get_setting,
			mymenu_save_setting: CS.mymenu_save_setting,
			mymenu_save_back: CS.mymenu_save_back,
			//ご利用方法を開く
			menu_open_help: CS.menu_open_help,
			//ご利用情報ページを開く
			menu_open_user_info: CS.menu_open_user_info,
			user_info_show_graph: CS.user_info_show_graph,
			//解析練習
			menu_open_analyze: CS.menu_open_analyze,
			analyze_uploadarea_drop: CS.analyze_uploadarea_drop,
			analyze_uploadarea_dragenter: CS.analyze_uploadarea_dragenter,
			analyze_uploadarea_dragover: CS.analyze_uploadarea_dragover,
			analyze_uploadarea_dragleave: CS.analyze_uploadarea_dragleave,
			analyze_upload: CS.analyze_upload,
			analyze_btn_click: CS.analyze_btn_click,
			analyze_selectedFile: CS.analyze_selectedFile,
			analyze_copy: CS.analyze_copy,
			analyze_download: CS.analyze_download,
			//問い合わせページを開く
			menu_open_inquiry: CS.menu_open_inquiry,
			menu_inquiry_open_create_window: CS.menu_inquiry_open_create_window,
			menu_inquiry_create_do: CS.menu_inquiry_create_do,
			inquiry_question_do: CS.inquiry_question_do,
			inquiry_question_close: CS.inquiry_question_close,
			inquiry_create_close: CS.inquiry_create_close,
			inquiry_close_one: CS.inquiry_close_one,
			inquiry_get_syousai: CS.inquiry_get_syousai,
			kanri_itask_master_uploadfile_dragover: CS.kanri_itask_master_uploadfile_dragover,
			kanri_itask_master_uploadfile_dragleave: CS.kanri_itask_master_uploadfile_dragleave,
			kanri_itask_master_uploadfile_drop: CS.kanri_itask_master_uploadfile_drop ,
			kanri_itask_master_uploadfile_run: CS.kanri_itask_master_uploadfile_run ,
			kanri_itask_master_uploadfile_run_nochange: CS.kanri_itask_master_uploadfile_run_nochange ,
			kanri_itask_master_show_selall: CS.kanri_itask_master_show_selall,
			kanri_itask_master_uploadfile_download: CS.kanri_itask_master_uploadfile_download,
			get_itask_alert_list: CS.get_itask_alert_list
		}
	};
	
	
	//会社マスタポップアップ////////////////////////////////////////////////////////////////////////
	vueUseObj.data.company_master_pop_main="";
	vueUseObj.data.kanri_itask_company_master_pop_search_company_code="";
	vueUseObj.data.kanri_itask_company_master_pop_search_company_name="";
	vueUseObj.data.kanri_itask_company_master_pop_list=[];
	vueUseObj.data.kanri_itask_company_master_pop_search_company_page=1;
	vueUseObj.data.kanri_itask_company_master_pop_add_company_code="";
	vueUseObj.data.kanri_itask_company_master_pop_add_company_name="";
	vueUseObj.data.kanri_itask_company_master_pop_add_m2="";
	vueUseObj.data.kanri_itask_company_master_pop_add_m3="";
	vueUseObj.data.kanri_itask_company_master_pop_add_m4="";
	vueUseObj.data.kanri_itask_company_master_pop_add_m5="";
	vueUseObj.data.kanri_itask_company_master_pop_add_m6="";
	vueUseObj.data.kanri_itask_company_master_pop_add_company_coli=0;
	vueUseObj.data.kanri_itask_company_master_pop_add_company_sumpage=0;
	vueUseObj.data.kanri_itask_company_master_pop_add_company_pageing=[];
	vueUseObj.data.kanri_itask_company_master_hiddenadd_flag=true;
	vueUseObj.methods.kanri_itask_company_master_pop_show=CS.kanri_itask_company_master_pop_show;
	vueUseObj.methods.kanri_itask_company_master_pop_search=CS.kanri_itask_company_master_pop_search;
	vueUseObj.methods.kanri_itask_company_master_pop_back=CS.kanri_itask_company_master_pop_back;
	vueUseObj.methods.kanri_itask_company_master_pop_add=CS.kanri_itask_company_master_pop_add;
	vueUseObj.methods.kanri_itask_company_master_pop_search_company_pageing_click=CS.kanri_itask_company_master_pop_search_company_pageing_click;
	vueUseObj.methods.kanri_itask_company_master_change=CS.kanri_itask_company_master_change;
	vueUseObj.methods.kanri_itask_company_master_get_csv=CS.kanri_itask_company_master_get_csv;
	vueUseObj.methods.kanri_itask_company_master_hiddenadd=CS.kanri_itask_company_master_hiddenadd;
	vueUseObj.methods.kanri_itask_company_master_showadd=CS.kanri_itask_company_master_showadd;
	//勘定科目ポップアップ/////////////////////////////////////////////////////////////
	vueUseObj.data.kanri_itask_kanjo_show_flag=false;
	vueUseObj.data.kanri_itask_kanjo_show_main={};
	vueUseObj.data.kanri_itask_master_add_sonshitugoukei_disflag=false;
	vueUseObj.data.kanri_itask_kanjo_show_main_add_variety_family="";
	vueUseObj.data.kanri_itask_kanjo_show_main_add_variety_genus="";
	vueUseObj.data.kanri_itask_kanjo_show_main_add_variety_species="";
	vueUseObj.data.kanri_itask_kanjo_show_main_add_variety_name="";
	vueUseObj.data.kanri_itask_kanjo_show_main_add_variety_species_list=[];
	
	vueUseObj.data.kanri_itask_kanjo_show_main_add_genus_family="";
	vueUseObj.data.kanri_itask_kanjo_show_main_add_genus_name="";
	
	vueUseObj.data.kanri_itask_kanjo_show_main_add_species_family="";
	vueUseObj.data.kanri_itask_kanjo_show_main_add_species_genus="";
	vueUseObj.data.kanri_itask_kanjo_show_main_add_species_name="";
	vueUseObj.data.kanri_itask_kanjo_show_add_species_genus_list=[];
	
	vueUseObj.data.kanri_itask_kanjo_show_family_list=[];
	vueUseObj.data.kanri_itask_kanjo_show_plus_list=[];
	vueUseObj.data.kanri_itask_kanjo_show_list=[];
	vueUseObj.data.kanri_itask_kanjo_show_genus_list=[];
	vueUseObj.data.kanri_itask_kanjo_show_species_list=[];
	vueUseObj.data.kanri_itask_kanjo_show_order_code=1;
	vueUseObj.data.kanri_itask_kanjo_show_variety_add_flag=true;
	vueUseObj.data.kanjo_kamoku_pop_main="";
	vueUseObj.data.kanri_itask_kanjo_show_main_search_variety_name="";
	vueUseObj.data.kanri_itask_kanjo_show_main_search_variety_name_first="";
	vueUseObj.data.kanri_itask_kanjo_show_main_search_order="NONE";
	vueUseObj.data.kanri_itask_kanjo_show_main_search_variety_list=[];
	vueUseObj.data.kanri_itask_kanjo_show_main_pageing=[];
	vueUseObj.data.kanri_itask_kanjo_show_main_page=1;
	vueUseObj.data.kanri_itask_kanjo_show_main_sum_page=0;
	vueUseObj.data.kanri_itask_kanjo_show_editer_page=1;
	vueUseObj.data.kanri_itask_kanjo_show_editer_sum_page=0;
	vueUseObj.data.kanri_itask_kanjo_show_editer_pageing=[];
	
	//////////////////////////////////////////////////////////////////////////////
	vueUseObj.methods.kanjo_kamoku__pop_back=CS.kanjo_kamoku__pop_back;
	vueUseObj.methods.kanri_itask_kanjo_show=CS.kanri_itask_kanjo_show;
	vueUseObj.methods.kanri_itask_kanjo_show_family_change=CS.kanri_itask_kanjo_show_family_change;
	vueUseObj.methods.kanri_itask_kanjo_show_genus_change=CS.kanri_itask_kanjo_show_genus_change;
	vueUseObj.methods.kanri_itask_kanjo_show_main_add_species_family_change=CS.kanri_itask_kanjo_show_main_add_species_family_change;
	vueUseObj.methods.kanri_itask_kanjo_reload =CS.kanri_itask_kanjo_reload;
	vueUseObj.methods.kanri_itask_kanjo_variety_add=CS.kanri_itask_kanjo_variety_add;
	vueUseObj.methods.kanri_itask_kanjo_genus_add=CS.kanri_itask_kanjo_genus_add;
	vueUseObj.methods.kanri_itask_kanjo_show_main_add_species=CS.kanri_itask_kanjo_show_main_add_species;
	vueUseObj.methods.kanri_itask_kanjo_show_onchange=CS.kanri_itask_kanjo_show_onchange;
	vueUseObj.methods.kanri_itask_kanjo_show_main_search=CS.kanri_itask_kanjo_show_main_search;
	vueUseObj.methods.kanri_itask_kanjo_show_main_pageing_click=CS.kanri_itask_kanjo_show_main_pageing_click;
	vueUseObj.methods.kanri_itask_kanjo_show_editer_pageing_click=CS.kanri_itask_kanjo_show_editer_pageing_click;
	
	vueUseObj.data.kanjo_kamoku_pop_furikae="";
	vueUseObj.data.kanjo_kamoku_pop_furikae_list="";
	vueUseObj.data.kanri_itask_kanjo_furikae_show_main_search_variety_name_first="";
	vueUseObj.data.kanri_itask_kanjo_furikae_show_main_search_haveconf=false;
	vueUseObj.data.kanri_itask_kanjo_furikae_show_main_search_variety_name="";
	vueUseObj.data.kanri_itask_kanjo_furikae_show_main_page=1;
	vueUseObj.data.kanri_itask_kanjo_furikae_show_main_sum_page=1;
	vueUseObj.data.kanri_itask_kanjo_furikae_show_main_pageing=[];
	vueUseObj.data.kanri_itask_kanjo_furikae_show_main_search_variety_list=[];
	vueUseObj.data.furikae_target_list=[];
	vueUseObj.methods.kanri_itask_kanjo_furikae_show=CS.kanri_itask_kanjo_furikae_show;
	vueUseObj.methods.kanri_itask_kanjo_furikae_back=CS.kanri_itask_kanjo_furikae_back;
	vueUseObj.methods.kanri_itask_kanjo_furikae_furikae_target_change=CS.kanri_itask_kanjo_furikae_furikae_target_change;
	vueUseObj.methods.kanri_itask_kanjo_furikae_show_main_search=CS.kanri_itask_kanjo_furikae_show_main_search;
	vueUseObj.methods.kanri_itask_kanjo_furikae_show_main_pageing_click=CS.kanri_itask_kanjo_furikae_show_main_pageing_click;
	//aitask編集画面用/////////////////////////////////////////////
	vueUseObj.data.itask_list_show_edit_pana_seisa_over0="";
	vueUseObj.data.itask_list_show_edit_pana_seisa_over1="";
	vueUseObj.data.itask_list_show_edit_pana_seisa_over2="";
	vueUseObj.data.itask_list_show_edit_pana_seisa_over3="";
	vueUseObj.data.itask_list_show_edit_pana_seisa_over4="";
	vueUseObj.data.itask_list_show_edit_pana_senen_tani0="";
	vueUseObj.data.itask_list_show_edit_pana_senen_tani1="";
	vueUseObj.data.itask_list_show_edit_pana_senen_tani2="";
	vueUseObj.data.itask_list_show_edit_pana_senen_tani3="";
	vueUseObj.data.itask_list_show_edit_pana_senen_tani4="";
	
	vueUseObj.data.itask_list_show_edit_pana_company_code="";
	vueUseObj.data.itask_list_show_edit_pana_company_name="";
	vueUseObj.data.itask_list_show_edit_pana_kesan_date="";
	vueUseObj.data.itask_list_show_edit_pana_status=0;
	vueUseObj.data.itask_list_show_edit_pana_status_list=[];
	vueUseObj.data.kanjo_detail=[];
	vueUseObj.data.itask_list_show_edit_pana_tag_button_index=1;
	vueUseObj.data.itask_list_show_edit_pana_kensan_zenki={};
	vueUseObj.data.itask_list_show_edit_pana_kensan_konki={};
	vueUseObj.data.i_aitask_top_info={};
	vueUseObj.data.candidate_select_list=[];
	vueUseObj.data.candidate_select_list_showflag=[];
	vueUseObj.data.itask_list_show_edit_window_kensan0=false;
	vueUseObj.data.itask_list_show_edit_window_kensan1=false;
	vueUseObj.data.itask_list_show_file_itask_csv_show = true;
	vueUseObj.data.itask_list_show_edit_window_itask_type = "";
	vueUseObj.data.itask_list_show_edit_pana_kojin_input_show = false;
	vueUseObj.data.itask_list_show_edit_pana_houjin_input_show = false;
	vueUseObj.data.houjin_eazy_inputlist = [];
	vueUseObj.data.itask_list_show_edit_pana_eazyinput_tag_index=1;
	vueUseObj.data.itask_list_show_edit_window_getfullimage_show=false;
	vueUseObj.data.itask_list_show_edit_window_map_flag=-1;
	vueUseObj.data.itask_list_show_edit_window_map_step="A";
	vueUseObj.data.gemini_houjin_mode=false;
	vueUseObj.data.itask_list_show_edit_window_tool_show=false;
	vueUseObj.data.itaskloadnig="";
	vueUseObj.data.outputtext="";//テスト用変数
	vueUseObj.data.itask_list_show_edit_window_map_add_rect_x=0;
	vueUseObj.data.itask_list_show_edit_window_map_add_rect_y=0;
	vueUseObj.data.itask_list_show_edit_window_map_add_rect_w=50;
	vueUseObj.data.itask_list_show_edit_window_map_add_rect_h=50;
	vueUseObj.data.itask_list_show_edit_pana_irekae_number=4;
	vueUseObj.data.exmessage_flag=null;
	vueUseObj.data.exmessage_flag1=null;
	vueUseObj.methods.itask_list_show_edit_pana_get_pre_year= CS.itask_list_show_edit_pana_get_pre_year;
	vueUseObj.methods.itask_list_show_edit_window_manual_analysis_preparation= CS.itask_list_show_edit_window_manual_analysis_preparation;
	vueUseObj.methods.itask_list_show_edit_window_ma_return= CS.itask_list_show_edit_window_ma_return;
	vueUseObj.methods.itask_list_show_edit_window_ma_close= CS.itask_list_show_edit_window_ma_close;
	vueUseObj.methods.itask_list_show_edit_window_manual_analysis_close= CS.itask_list_show_edit_window_manual_analysis_close;
	vueUseObj.methods.itask_list_show_edit_window_manual_analysis_back= CS.itask_list_show_edit_window_manual_analysis_back;
	vueUseObj.methods.itask_list_show_edit_window_tool_soneki0= CS.itask_list_show_edit_window_tool_soneki0;
	vueUseObj.methods.itask_list_show_edit_window_tool_soneki1= CS.itask_list_show_edit_window_tool_soneki1;
	vueUseObj.methods.itask_list_show_edit_window_show_tool= CS.itask_list_show_edit_window_show_tool;
	vueUseObj.methods.itask_list_show_edit_window_openai_image= CS.itask_list_show_edit_window_openai_image;
	vueUseObj.methods.itask_list_ana_all= CS.itask_list_ana_all;
	vueUseObj.methods.itask_list_show_edit_window_map_add_rect= CS.itask_list_show_edit_window_map_add_rect;
	vueUseObj.methods.itask_list_show_edit_window_change_goukei_checkbox= CS.itask_list_show_edit_window_change_goukei_checkbox;
	vueUseObj.methods.itask_list_show_edit_window_change_kaijyo_checkbox= CS.itask_list_show_edit_window_change_kaijyo_checkbox;
	vueUseObj.methods.itask_list_show_edit_window_getfullimage= CS.itask_list_show_edit_window_getfullimage;
	vueUseObj.methods.itask_list_show_edit_window_bakfullimage= CS.itask_list_show_edit_window_bakfullimage;
	vueUseObj.methods.itask_list_show_edit_window_linking= CS.itask_list_show_edit_window_linking;
	vueUseObj.methods.itask_list_show_edit_window_change_tab=CS.itask_list_show_edit_window_change_tab;
	vueUseObj.methods.itask_list_show_edit_window_change_tab_konjin=CS.itask_list_show_edit_window_change_tab_konjin;
	vueUseObj.methods.itask_list_show_edit_window_kensan=CS.itask_list_show_edit_window_kensan;
	vueUseObj.methods.set_itask_list_show_edit_pana_company_info=CS.set_itask_list_show_edit_pana_company_info;
	vueUseObj.methods.itask_list_show_edit_pana_showerea=CS.itask_list_show_edit_pana_showerea;
	vueUseObj.methods.candidate_select_list_dbclick=CS.candidate_select_list_dbclick;
	vueUseObj.methods.itask_list_show_edit_window_csv=CS.itask_list_show_edit_window_csv;
	vueUseObj.methods.itask_list_show_edit_window_csv_fromlist=CS.itask_list_show_edit_window_csv_fromlist;
	vueUseObj.methods.candidate_select_list_x_click=CS.candidate_select_list_x_click;
	vueUseObj.methods.candidate_select_list_change=CS.candidate_select_list_change;
	vueUseObj.methods.candidate_select_list_kanjopop=CS.candidate_select_list_kanjopop;
	vueUseObj.methods.clear_kanjokamoku=CS.clear_kanjokamoku;
	vueUseObj.methods.itask_list_show_edit_window_pana_kanjo_select =CS.itask_list_show_edit_window_pana_kanjo_select;
	vueUseObj.methods.kanjo_detail_delete = CS.kanjo_detail_delete;
	vueUseObj.methods.itask_list_show_edit_pana_kanjo_add = CS.itask_list_show_edit_pana_kanjo_add;
	vueUseObj.methods.itask_list_show_edit_pana_edit_text = CS.itask_list_show_edit_pana_edit_text;
	vueUseObj.methods.itask_list_show_edit_pana_edit_change = CS.itask_list_show_edit_pana_edit_change;
	vueUseObj.methods.itask_list_show_edit_window_pana_save = CS.itask_list_show_edit_window_pana_save;
	vueUseObj.methods.kanjo_detail_up = CS.kanjo_detail_up;
	vueUseObj.methods.kanjo_detail_down = CS.kanjo_detail_down;
	vueUseObj.methods.kanjo_detail_addup = CS.kanjo_detail_addup;
	vueUseObj.methods.kanjo_detail_adddown = CS.kanjo_detail_adddown;
	vueUseObj.methods.kanri_itask_kanjo_property_change = CS.kanri_itask_kanjo_property_change;
	vueUseObj.methods.kanri_itask_kanjo_abc_flag_change = CS.kanri_itask_kanjo_abc_flag_change;
	vueUseObj.methods.itask_list_show_edit_pana_kojin_input = CS.itask_list_show_edit_pana_kojin_input;
	vueUseObj.methods.itask_list_show_edit_pana_houjin_input = CS.itask_list_show_edit_pana_houjin_input;
	vueUseObj.methods.itask_list_show_edit_pana_houjin_input_save = CS.itask_list_show_edit_pana_houjin_input_save;
	vueUseObj.methods.itask_list_show_edit_pana_kojin_input_save = CS.itask_list_show_edit_pana_kojin_input_save;
	vueUseObj.methods.itask_list_show_edit_window_change_eazyinput_tab=CS.itask_list_show_edit_window_change_eazyinput_tab;
	vueUseObj.methods.itask_list_show_edit_window_change_checkbox=CS.itask_list_show_edit_window_change_checkbox;
	vueUseObj.methods.itask_list_change_memo=CS.itask_list_change_memo;
	vueUseObj.methods.itask_list_show_edit_window_irekae=CS.itask_list_show_edit_window_irekae;
	vueUseObj.methods.f_analysis=CS.f_analysis;
	vueUseObj.methods.aitask_image_edit_closewindow_call=CS.aitask_image_edit_closewindow_call;
	vueUseObj.methods.itask_list_show_edit_window_map_a_kanjyo_keyword_change = CS.itask_list_show_edit_window_map_a_kanjyo_keyword_change;
	vueUseObj.methods.itask_upload_pop_close = CS.itask_upload_pop_close;
	vueUseObj.methods.itask_list_show_edit_window_map_a_addup = CS.itask_list_show_edit_window_map_a_addup;
	vueUseObj.methods.itask_list_show_edit_window_map_a_adddown = CS.itask_list_show_edit_window_map_a_adddown;
	vueUseObj.methods.itask_list_show_edit_window_map_a_delete = CS.itask_list_show_edit_window_map_a_delete;
	vueUseObj.methods.itask_list_show_edit_window_map_a_gettarget = CS.itask_list_show_edit_window_map_a_gettarget;
	vueUseObj.methods.itask_list_show_edit_window_map_a_settarget = CS.itask_list_show_edit_window_map_a_settarget;
	vueUseObj.methods.itask_list_show_edit_window_map_backtoanser = CS.itask_list_show_edit_window_map_backtoanser;
	vueUseObj.methods.clearback = CS.clearback;
	vueUseObj.methods.itask_list_show_edit_window_map_rotate = CS.itask_list_show_edit_window_map_rotate;
	vueUseObj.methods.aitask_exlist_show = CS.aitask_exlist_show;
	vueUseObj.methods.aitask_exlist_open = CS.aitask_exlist_open;
	vueUseObj.methods.aitask_exlist_kanjo_keyword_change = CS.aitask_exlist_kanjo_keyword_change;
	vueUseObj.methods.aitask_exlist_add = CS.aitask_exlist_add;
	vueUseObj.methods.aitask_exlist_del = CS.aitask_exlist_del;
	vueUseObj.methods.aitask_exlist_closewindow_call = CS.aitask_exlist_closewindow_call;
	vueUseObj.methods.itask_list_show_edit_window_map_kingaku_change = CS.itask_list_show_edit_window_map_kingaku_change;
	vueUseObj.methods.itask_list_show_edit_window_map_adjust_brightness = CS.itask_list_show_edit_window_map_adjust_brightness;
	vueUseObj.methods.itask_list_show_edit_window_map_process_img = CS.itask_list_show_edit_window_map_process_img;
	vueUseObj.methods.itask_list_show_edit_window_map_get_fullimg = CS.itask_list_show_edit_window_map_get_fullimg;
	vueUseObj.methods.itask_list_show_edit_window_map_brightness_close = CS.itask_list_show_edit_window_map_brightness_close;
	vueUseObj.methods.itask_list_show_edit_window_map_brightness_save = CS.itask_list_show_edit_window_map_brightness_save;
	vueUseObj.methods.itask_list_show_edit_window_map_manual = CS.itask_list_show_edit_window_map_manual;
	vueUseObj.methods.itask_list_show_edit_window_map_add_roline = CS.itask_list_show_edit_window_map_add_roline;//画像回転スタート
	vueUseObj.methods.itask_list_show_edit_window_map_ro_back = CS.itask_list_show_edit_window_map_ro_back;
	vueUseObj.methods.itask_list_show_edit_window_map_ro_do = CS.itask_list_show_edit_window_map_ro_do;
	vueUseObj.methods.itask_list_show_edit_window_mab_area_on = CS.itask_list_show_edit_window_mab_area_on;//エリア指定
	vueUseObj.methods.itask_list_show_edit_window_mab_area_off = CS.itask_list_show_edit_window_mab_area_off;
	vueUseObj.methods.itask_list_show_edit_window_map_redaction = CS.itask_list_show_edit_window_map_redaction;
	vueUseObj.methods.itask_list_show_edit_window_map_redaction_do = CS.itask_list_show_edit_window_map_redaction_do;
	vueUseObj.methods.itask_list_show_edit_window_map_redaction_back = CS.itask_list_show_edit_window_map_redaction_back;
	vueUseObj.methods.itask_list_show_edit_window_map_keystone = CS.itask_list_show_edit_window_map_keystone;
	vueUseObj.methods.itask_list_show_edit_window_map_keystone_do = CS.itask_list_show_edit_window_map_keystone_do;
	vueUseObj.methods.aitask_pop_main_keydown = CS.aitask_pop_main_keydown;
	vueUseObj.methods.aitask_pop_main_mouseup = CS.aitask_pop_main_mouseup;
	vueUseObj.methods.aitask_pop_main_mousemove = CS.aitask_pop_main_mousemove;
	vueUseObj.methods.itask_list_show_edit_pana_edit_keydown = CS.itask_list_show_edit_pana_edit_keydown;
	vueUseObj.methods.itask_list_show_edit_pana_text_keydown = CS.itask_list_show_edit_pana_text_keydown;
	vueUseObj.methods.itask_list_show_edit_pana_text_mouseover = CS.itask_list_show_edit_pana_text_mouseover;
	vueUseObj.methods.itask_list_show_edit_window_ana2 = CS.itask_list_show_edit_window_ana2;
	vueUseObj.methods.itask_list_show_edit_window_manual_analyze_gemini_houjin = CS.itask_list_show_edit_window_manual_analyze_gemini_houjin;
	//aitask一覧追加変数
	vueUseObj.data.itask_upload_pop_text1="";
	vueUseObj.data.itask_upload_pop_text2="";
	vueUseObj.data.itask_upload_pop_main="";
	vueUseObj.data.itask_list_show_edit_pana_tag_button_red1=false;
	vueUseObj.data.itask_list_show_edit_pana_tag_button_red2=false;
	vueUseObj.data.itask_list_show_edit_pana_tag_button_red3=false;
	vueUseObj.data.itask_list_show_edit_pana_tag_button_red4=false;
	vueUseObj.data.itask_list_show_edit_pana_tag_button_eazyinput_red1=false;
	vueUseObj.data.itask_list_show_edit_pana_tag_button_eazyinput_red2=false;
	vueUseObj.data.itask_list_show_edit_pana_tag_button_eazyinput_red3=false;
	vueUseObj.data.itask_list_show_edit_pana_tag_button_eazyinput_red4=false;
	vueUseObj.data.kanri_itask_kanjo_show_main_get_all_c=999;
	vueUseObj.data.itask_list_search_memo="";
	vueUseObj.data.itask_list_show_edit_window_map_a=[];
	vueUseObj.data.itask_list_show_edit_window_map_a_kanjyo=[];
	vueUseObj.data.itask_list_show_edit_window_map_a_kanjyo_list=[];
	vueUseObj.data.itask_list_show_edit_window_map_a_kanjyo_list_readonly=[];
	vueUseObj.data.itask_list_show_edit_window_map_a_kanjyo_list_index=[];
	vueUseObj.data.itask_list_show_edit_window_map_a_kanjyo_list_zenki=[];
	vueUseObj.data.itask_list_show_edit_window_map_a_kanjyo_list_konki=[];
	vueUseObj.data.itask_list_show_edit_window_map_a_konki=[];
	vueUseObj.data.itask_list_show_edit_window_map_a_zenki=[];
	vueUseObj.data.itask_list_show_edit_window_map_a_konki_copy=[];
	vueUseObj.data.itask_list_show_edit_window_map_a_movetarget_index=null;
	vueUseObj.data.itask_list_show_edit_window_map_a_zenki_copy=[];
	vueUseObj.data.itask_list_show_edit_window_map_kakudo=0;
	vueUseObj.data.aitask_exlist_kanjo_view_list=[];
	vueUseObj.data.aitask_exlist_kanjo_view_list_from=[];
	vueUseObj.data.aitask_exlist_kanjo_view_list_to=[];
	vueUseObj.data.aitask_exlist_kanjo_from_kanjo_code="";
	vueUseObj.data.aitask_exlist_kanjo_to_kanjo_code="";
	vueUseObj.data.aitask_exlist_kanjo_from_kanjo_name="";
	vueUseObj.data.aitask_exlist_kanjo_to_kanjo_name="";
	vueUseObj.data.aitask_exlist=[];
	vueUseObj.data.itask_list_show_edit_window_map_adjust=1.2;
	vueUseObj.data.itask_list_show_edit_window_map_brightness=100;
	vueUseObj.data.itask_list_show_edit_window_map_brightness_flag=null;
	vueUseObj.data.itask_list_show_edit_window_map_brightness_list=[];
	vueUseObj.data.itask_list_show_edit_window_mab_area_flag=false;
	vueUseObj.data.kanri_itask_kanjo_show_selected_kanjo_code=null;
	vueUseObj.data.itask_list_show_edit_pana_text_mousedown_flag=false;
	
	CS.vueObj = new Vue(vueUseObj);
	CS.check_member();
	$("#area_mw").css("display", "inline");
	setInterval(function(){
		CS.menu_chat_check_new();
	},30000);
	$('[data-toggle="tooltip"]').tooltip();
	if(CS.getDevice != 'sp' ){
		setInterval(function(){
			$('[data-toggle="tooltip"]').tooltip();
		},3000);
	}
	
	
	
	
	
	if(navigator.userAgent.match(/(iPhone|Android)/)){
		$('.button-collapse').sideNav({
		edge: 'left', // Choose the horizontal origin
		closeOnClick: true, // Closes side-nav on &lt;a&gt; clicks, useful for Angular/Meteor
		breakpoint: 1940, // Breakpoint for button collapse
		MENU_WIDTH: 190, // Width for sidenav
		timeDurationOpen: 300, // Time duration open menu
		timeDurationClose: 200, // Time duration open menu
		timeDurationOverlayOpen: 50, // Time duration open overlay
		timeDurationOverlayClose: 200, // Time duration close overlay
		easingOpen: 'easeOutQuad', // Open animation
		easingClose: 'easeOutCubic', // Close animation
		showOverlay: true, // Display overflay
		showCloseButton: false // Append close button into siednav
		});
	}else{
		$('.button-collapse').sideNav({
		edge: 'left', // Choose the horizontal origin
		//closeOnClick: true, // Closes side-nav on &lt;a&gt; clicks, useful for Angular/Meteor
		breakpoint: 1440, // Breakpoint for button collapse
		MENU_WIDTH: 190, // Width for sidenav
		timeDurationOpen: 300, // Time duration open menu
		timeDurationClose: 200, // Time duration open menu
		timeDurationOverlayOpen: 50, // Time duration open overlay
		timeDurationOverlayClose: 200, // Time duration close overlay
		easingOpen: 'easeOutQuad', // Open animation
		easingClose: 'easeOutCubic', // Close animation
		showOverlay: false, // Display overflay
		buildSidenavOverlay: false, // Display overflay
		showCloseButton: false, // Append close button into siednav
		slim: false, // turn on slime mode
		onOpen: null, // callback function
		onClose: null // callback function
		});
	}

	// SideNav Scrollbar Initialization
	var sideNavScrollbar = document.querySelector('.custom-scrollbar');
	if(sideNavScrollbar!=null){
		Ps.initialize(sideNavScrollbar);
		$("#vueObj").css("display", "inline");
		var sec=500;
		var sec_=200;
		setTimeout(function(){
			CS.vueObj.$set(CS.vueObj.hidelist, 0, false);
			},sec);
		sec=sec+sec_;
		setTimeout(function(){
			CS.vueObj.$set(CS.vueObj.hidelist, 1, false);
			},sec);
		sec=sec+sec_;
		setTimeout(function(){
			CS.vueObj.$set(CS.vueObj.hidelist, 2, false);
			},sec);
			sec=sec+sec_;
		setTimeout(function(){
			CS.vueObj.$set(CS.vueObj.hidelist, 3, false);
			},sec);
			sec=sec+sec_;
		setTimeout(function(){
			CS.vueObj.$set(CS.vueObj.hidelist, 4, false);
			},sec);
			sec=sec+sec_;
		setTimeout(function(){
			CS.vueObj.$set(CS.vueObj.hidelist, 5, false);
			},sec);
			sec=sec+sec_;
		setTimeout(function(){
			CS.vueObj.$set(CS.vueObj.hidelist, 6, false);
			},sec);
			sec=sec+sec_;
		setTimeout(function(){
			CS.vueObj.$set(CS.vueObj.hidelist, 7, false);
			},sec);
		setTimeout(function(){
			// Hide sideNav
			$('.side-nav').css('transform',"translateX(-100%)");
			},sec);
	}else if(location.href.indexOf("aitask_hosei")!=-1){
		// 画像補正・再分析ポップアップ(pmjtools2.js)
		CS.aitask_hosei_start();
	}else if(location.href.indexOf("aitask_image_edit2")!=-1){
		$("#vueObj").css("display", "inline");
		CS.aitask_image_edit2();
	}else if(location.href.indexOf("aitask_image_edit")!=-1){
		$("#vueObj").css("display", "inline");
		CS.aitask_image_edit();
	}else if(location.href.indexOf("aitask_exlist")!=-1){
		$("#vueObj").css("display", "inline");
		CS.aitask_exlist_show();
	}

	
    $(document).mouseup(function(evt2) {
        CS.vueObj.itask_list_show_edit_pana_text_mousedown_flag=false;
        document.removeEventListener("selectstart", CS.itask_list_show_edit_pana_text_preventSelection);
    });
    $(document).keydown(CS.itask_list_show_edit_pana_text_keydown2);
	
	
	


}

CS.ready_function = function () {
	var userAgent = window.navigator.userAgent.toLowerCase();
	if(userAgent.indexOf('msie') >= 0 || userAgent.indexOf('trident') >= 0) {
	$("#worrying").css("display", "inline");
		return;
	}
	var obj = {};
	obj["action"] = "get_actions";
	$.ajax({
		type: 'POST',
		url: "./ikisaki_tool/check_member.php",
		cache: false,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
			location.href = "./login.html";
		} else {
			CS.load_flag_list=[];
			CS.load_flag_list_num=data["load_flag_list_num"];
			for(var i=0;i<CS.load_flag_list_num;i++){
				CS.load_flag_list[i]=false;
			}
			var date=new Date();
			date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
			for(var i=0;i<CS.load_flag_list_num;i++){
				loadScript(data["s"+i]+date, function () {
					for(var j=0;j<CS.load_flag_list.length;j++){
						if(!CS.load_flag_list[j]){
							CS.load_flag_list[j]=true;
							break;
						}
					}
				});
			}
			CS.setintervalobj=setInterval(function(e){
				for(var i=0;i<CS.load_flag_list_num;i++){
					if(!CS.load_flag_list[i]){
						return;
					}
				}
				CS.after_loads();
				clearInterval(CS.setintervalobj);
			}, 500);
			
		}
	});
};
CS.logout = function () {
	var obj = {};
	obj["action"] = "logout";
	$.ajax({
		type: 'POST',
		url: "./ikisaki_tool/ikisaki_login.do",
		cache: false,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		$.cookie("isplit_mailaddress", "", { expires: 365 });
		$.cookie("isplit_loginpassword", "", { expires: 365 });
		$.cookie("isplit_user_name", "", { expires: 365 });
		location.href = "./login.html";
	});
}

CS.menu_phon_click = function (evt) {
	if (CS.mouseHandled) {
		return false;
	}
	if (this.menu_phon_active) {
		this.menu_phon_active = false;
	} else {
		this.menu_phon_active = true;
	}
}
CS.menu_phon_close = function (evt) {}
CS.closeALL = function () {
	CS.vueObj.menu_kanri_post_open = false;
	CS.vueObj.menu_kanri_section_open = false;
	CS.vueObj.menu_kanri_branch_open = false;
	CS.vueObj.menu_kanri_chatroom_open = false;
	CS.vueObj.menu_kanri_itask_open = false;
	CS.vueObj.menu_security_open = false;
	CS.vueObj.menu_security_member_open = false;
	CS.vueObj.menu_security_member_selecttype_open = true;
	CS.vueObj.menu_security_member_select_recode_open = false;
	CS.vueObj.menu_security_member_select_syousai_open = false;
	CS.vueObj.menu_security_addmember_open = false;
	CS.vueObj.menu_kanri_open = false;
	CS.vueObj.menu_kanri_open_class = false;
	CS.vueObj.menu_files_open = false;
	CS.vueObj.menu_itask_open = false;
	CS.vueObj.menu_user_info_open = false;
	CS.vueObj.menu_inquiry_open = false;
	CS.vueObj.itask_list_show_edit_window_readonly_flag = false;
	CS.vueObj.itask_list_show_edit_window_flag = false;
	CS.vueObj.itask_list_show_edit_window_memo = "";
	CS.vueObj.show_files_propertys = false;
	CS.vueObj.open_set_auth_window_flag = false;
	CS.vueObj.menu_kanri_post_open = false;
	CS.vueObj.menu_kanri_section_open = false;
	CS.vueObj.menu_kanri_branch_open = false;
	CS.vueObj.menu_mymenu_open=false;

	CS.vueObj.menu_history_open = false;
	CS.vueObj.menu_chatroom_open = false;
	
	CS.vueObj.files_show_itask_flag=false;
	CS.vueObj.files_itask_create_anken_flag=false;
	CS.vueObj.files_itask_select_anken_flag=false;
	CS.vueObj.menu_sub_title="";
	CS.vueObj.menu_analyze_open=false;
	CS.vueObj.menu_show_home_flag=false;
	CS.vueObj.kanri_itask_open=false;
	CS.vueObj.kanri_itask_show_format_list_flag=false;
	CS.vueObj.itask_list_show_flag=false;
	CS.vueObj.kanri_itask_format_create_show=false;
	CS.vueObj.kanri_itask_items_show_flag=false;
	CS.vueObj.kanri_itask_master_show_flag=false;
	CS.vueObj.kanri_itask_kanjo_show_flag=false;
	CS.vueObj.kanri_itask_replace_show_flag=false;
	CS.vueObj.kanri_itask_show_format_list_flag=false;

	CS.vueObj.kanri_itask_type_edit_authority_flag=false;
	CS.vueObj.kanri_itask_type_list_show=false;
}
CS.check_member = function () {
	var obj = {};
	obj["action"] = "check_member";
	$.ajax({
		type: 'POST',
		url: "./ikisaki_tool/check_member.php",
		cache: false,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
			location.href = "./login.html";
		} else {
			var date=new Date();
			CS.vueObj["member_info"] = data["member_info"];
			$('#member_icon').attr('src', CS.vueObj["member_info"]["member_icon"]+"?d="+date);
			var str = CS.vueObj["member_info"]["auth"];
			var obj = JSON.parse(str);
			CS.vueObj["member_info"]["auth"] = JSON.parse(CS.vueObj["member_info"]["auth"]);
			// if (typeof CS.vueObj["member_info"]["auth"]["auth"]["1"] != "undefined") {
				CS.vueObj.menu_control_file = data["menu_control_file"];
				CS.vueObj.menu_control_chatroom = data["menu_control_chatroom"];
				CS.vueObj.menu_control_help = data["menu_control_help"];
				CS.MENU_KANRI_URL = data["menu_kanri_url"];
				CS.MENU_FILES_URL = data["menu_files_url"];
				CS.FILE_DOWN = data["file_down"];
				CS.FOLDER_DOWN = data["folder_down"];
				CS.FILE_DOWN_HISTORY = data["file_down_history"];
				CS.DOWN_FILE = data["down_file"];
				CS.DOWN_HISTORY = data["down_history"];
				CS.DOWN_FOLDER = data["down_folder"];
				CS.MENU_SECURITY_URL = data["menu_security_url"];
				CS.MENU_HISTORY_URL = data["menu_history_url"];
				CS.MENU_MYMENU_API = data["menu_mymenu_api"];
				CS.ITASK_TOOL_URL = data["itask_tool_url"];
				CS.KANRI_ITASK_URL = data["kanri_itask_url"];
				CS.MY_ACCESS_KEY = data["my_access_key"];
				CS.MY_KIMITU_URL = data["my_kimitu_url"];
				CS.MY_SELECT_API = data["my_select_api"];
				CS.MY_UPDATE_API = data["my_update_api"];
				
				
				if (CS.MENU_FILES_URL != "") {
					CS.vueObj.ac_files = true;
				}
				if (CS.MENU_SECURITY_URL != "") {
					CS.vueObj.ac_secur = true;
				}
				if (CS.MENU_HISTORY_URL != "") {
					CS.vueObj.ac_history = true;
				}
				if (CS.MENU_KANRI_URL != "") {
					CS.vueObj.ac_kanri = true;
					if(CS.getDevice=="other"){
						CS.vueObj.ac_kanri_itask = true;
					}
				}
				if (CS.ITASK_TOOL_URL != "") {
					CS.vueObj.ac_itask=true;
				}
				if (data["tool_0"] != "") {
					loadScript(data["tool_0"], function () {
						console.log('tool_0 loaded');
					});
				}
				if (data["tool_1"] != "") {
					loadScript(data["tool_1"], function () {
						console.log('tool_1 loaded');
					});
				}
				if (data["access_key"] != "") {
					CS.ACCESS_KEY = data["access_key"];
				}
				if (data["insert_api"] != "") {
					CS.INSERT_API = data["insert_api"];
					CS.KIMITU_URL = data["kimitu_url"];
					CS.UPDATE_API = data["update_api"];
					CS.vueObj.menu_security_member_select_syousai_change_flag = true;
				}
				if (data["select_api"] != "") {
					CS.KIMITU_URL = data["kimitu_url"];
					CS.SELECT_API = data["select_api"];
				}
				if (data["itask_kimitu_url"] != "") {
					CS.ITASK_ACCESS_KEY = data["itask_access_key"];
					CS.ITASK_KIMITU_URL = data["itask_kimitu_url"];
					CS.ITASK_INSERT_API = data["itask_insert_api"];
					CS.ITASK_SELECT_API = data["itask_select_api"];
					CS.ITASK_UPDATE_API = data["itask_update_api"];
					CS.DOWN_ITASK_HISTORY = data["down_itask_history"];
				}
				var auth=new Object();
				for(var i=0;i<CS.vueObj["member_info"]["auth"]["auth"].length;i++){
					auth[CS.vueObj["member_info"]["auth"]["auth"][i]]=true;
				}
				if (typeof auth["7"] != "undefined"){
					CS.vueObj.itask_show_category_edit_window_flag=true;
				}else{
					CS.vueObj.itask_show_category_edit_window_flag=false;
				}
				if (typeof auth["8"] != "undefined"){
					CS.vueObj.itask_show_format_edit_window_flag=true;
				}else{
					CS.vueObj.itask_show_format_edit_window_flag=false;
				}
				if(CS.getParam("action")=="chat"){
				}else{
					//if(CS.vueObj["member_info"]["member_id"]=="1"){
						CS.show_home();
					/*}else{
						if (CS.ITASK_TOOL_URL != "") {
						CS.menu_itask_click();
						}else if (CS.MENU_FILES_URL != "") {
							CS.menu_files_click();
						}
					}*/
				}
			// }
			//チャットAPI
			if (data["chat_api"] != "") {
				CS.MENU_CHAT_URL = data["chat_api"];
			}
			if(CS.vueObj.menu_control_chatroom){
				loadScript(data["socket_io_js"], function () {
					//CS.socket_connect();
				});
				if(CS.getParam("action")=="chat" || CS.MENU_FILES_URL == ""){
					//CS.menu_chat_click();
				}
			}
			
			var userAgent = window.navigator.userAgent.toLowerCase();
			if(userAgent.indexOf('msie') != -1 ||
					userAgent.indexOf('trident') != -1) {
				CS.vueObj.browser_flag="ie";
			} else if(userAgent.indexOf('edge') != -1) {
				CS.vueObj.browser_flag="edge";
			} else if(userAgent.indexOf('chrome') != -1) {
				CS.vueObj.browser_flag="chrome";
			} else if(userAgent.indexOf('safari') != -1) {
				CS.vueObj.browser_flag="safari";
			} else if(userAgent.indexOf('firefox') != -1) {
				CS.vueObj.browser_flag="firefox";
			} else if(userAgent.indexOf('opera') != -1) {
				CS.vueObj.browser_flag="opera";
			} else {
				CS.vueObj.browser_flag="other";
			}
			if(userAgent.indexOf(' mac ') != -1) {
				CS.vueObj.device_flag="mac";
			}

			new WOW().init();

		}
	});
}
CS.show_home = function () {
	CS.closeALL();
	CS.vueObj.menu_show_home_flag=true;
	CS.get_itask_alert_list();
	$("#sidenav-overlay").click();
	// setTimeout(CS.clearback,500);
}
CS.getLocalTime = function () {
	var now = new Date();
	var y = now.getFullYear();
	var m = now.getMonth() + 1;
	var d = now.getDate();
	var w = now.getDay();
	var wd = ['日', '月', '火', '水', '木', '金', '土'];
	var h = now.getHours();
	var mi = now.getMinutes();
	var s = now.getSeconds();
	var mm = ('0' + m).slice(-2);
	var dd = ('0' + d).slice(-2);
	var hh = ('0' + h).slice(-2);
	var mmi = ('0' + mi).slice(-2);
	var ss = ('0' + s).slice(-2);
	return y + '-' + mm + '-' + dd + ' ' + hh + ':' + mmi + ':' + ss;
}
/*
 * 画面操作を無効にする
 */
CS.lockScreen = function (id) {
	/*
	 * 現在画面を覆い隠すためのDIVタグを作成する
	 */
	var divTag = $('<div />').attr("id", id);
	/*
	 * スタイルを設定
	 */
	divTag.css("z-index", "999")
	.css("position", "absolute")
	.css("top", "0px")
	.css("left", "0px")
	.css("right", "0px")
	.css("bottom", "0px")
	.css("width", $('body').width()+"px")
	.css("height", $('body').height()+"px")
	.css("background-color", "gray")
	.css("opacity", "0.1");

	/*
	 * BODYタグに作成したDIVタグを追加
	 */
	$('body').append(divTag);
};
CS.shaer_url="https://isplitbox.com/login.html";
CS.share_facebook = function () {
	window.open('http://www.facebook.com/share.php?u='+encodeURIComponent(CS.shaer_url), '', 'menubar=no,toolbar=no,scrollbars=yes');
};
CS.share_twitter = function () {
	window.open('https://twitter.com/share?text='+encodeURIComponent("Wellcome to https://isplitbox.com! We will be your reliable partner!")+'&url='+encodeURIComponent(CS.shaer_url), '', 'menubar=no,toolbar=no,scrollbars=yes');
};
CS.share_line = function () {
	window.open('https://line.me/R/msg/text/?'+encodeURIComponent("Wellcome to https://isplitbox.com! We will be your reliable partner!")+' '+encodeURIComponent(CS.shaer_url), '', 'menubar=no,toolbar=no,scrollbars=yes');
};
CS.share_google = function () {
	window.open('https://plus.google.com/share?url='+CS.shaer_url+'&hl=ja', '', 'menubar=no,toolbar=no,scrollbars=yes');
};
CS.share_weixin = function () {
	window.open('https://plus.google.com/share?url='+CS.shaer_url+'&hl=ja', '', 'menubar=no,toolbar=no,scrollbars=yes');
};
CS.getDevice = (function(){
    var ua = navigator.userAgent;
    if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
        return 'sp';
    }else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
        return 'tab';
    }else{
        return 'other';
    }
})();
CS.cleartooltip = function (id) {
	$('[role="tooltip"]').remove();
};
CS.getFileType = function (fileName) {
	var word_list=[];
	word_list.push('doc');
	word_list.push('docm');
	word_list.push('docx');

	var csv_list=[];
	csv_list.push('csv');

	var pdf_list=[];
	pdf_list.push('pdf');

	var excel_list=[];
	excel_list.push('xls');
	excel_list.push('xlsm');
	excel_list.push('xlsx');
	excel_list.push('dbf');
	excel_list.push('xlt');
	excel_list.push('xltm');

	var ppt_list=[];
	ppt_list.push('pps');
	ppt_list.push('ppsm');
	ppt_list.push('ppsx');
	ppt_list.push('ppt');
	ppt_list.push('pptm');
	ppt_list.push('pptx');
	var img_list=[];
	img_list.push('gif');
	img_list.push('png');
	img_list.push('jpg');
	img_list.push('jpeg');
	img_list.push('tif');
	img_list.push('tiff');
	img_list.push('bmp');
	var type = fileName.split('.');
	var kakutyou=type[type.length - 1].toLowerCase();
	if (word_list.indexOf(kakutyou) >= 0){
		return "word-color fa-file-word";
	}
	if (csv_list.indexOf(kakutyou) >= 0){
		return "csv-color fa-file-csv";
	}
	if (pdf_list.indexOf(kakutyou) >= 0){
		return "pdf-color fa-file-pdf";
	}
	if (excel_list.indexOf(kakutyou) >= 0){
		return "excel-color fa-file-excel";
	}
	if (ppt_list.indexOf(kakutyou) >= 0){
		return "ppt-color fa-file-powerpoint";
	}
	if (img_list.indexOf(kakutyou) >= 0){
		return "img-color fa-file-image";
	}
	return "file-color fa-file-alt";
}
//ご利用方法を開く
CS.menu_open_help = function (id) {
	window.open("./help.pdf");
};
/*
 * 画面操作無効を解除する
 */
CS.unlockScreen = function (id) {
	/*
	 * 画面を覆っているタグを削除する
	 */
	$("#" + id).remove();
};
/**
 * Get the URL parameter value
 *
 * @param  name {string} パラメータのキー文字列
 * @return  url {url} 対象のURL文字列（任意）
 */
CS.getParam = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
/*
エラーアラートを出します
*/
CS.alert_error = function (error_message) {
	toastr.options = {
		"closeButton": true, // true/false
		"debug": false, // true/false
		"newestOnTop": false, // true/false
		"progressBar": false, // true/false
		"positionClass": "toast-top-right", // toast-top-right / toast-top-left / toast-bottom-right / toast-bottom-left
		"preventDuplicates": false, //true/false
		"onclick": null,
		"showDuration": "300", // in milliseconds
		"hideDuration": "1000", // in milliseconds
		"timeOut": "10000", // in milliseconds
		"extendedTimeOut": "10000", // in milliseconds
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}
	if(typeof error_message == "undefined" || error_message==null || error_message==""){
		toastr.error("システムエラーが発生しました。");
	}else if(error_message.indexOf('再度ログインしてください。') != -1){
		location.href = "./login.html";
	}else{
		toastr.success(error_message);
	}
};
CS.alert_worrying = function (message,model) {
	toastr.options = {
		"closeButton": true, // true/false
		"debug": false, // true/false
		"newestOnTop": false, // true/false
		"progressBar": false, // true/false
		"positionClass": "toast-top-right", // toast-top-right / toast-top-left / toast-bottom-right / toast-bottom-left
		"preventDuplicates": false, //true/false
		"onclick": null,
		"showDuration": "300", // in milliseconds
		"hideDuration": "1000", // in milliseconds
		"timeOut": "10000", // in milliseconds
		"extendedTimeOut": "10000", // in milliseconds
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}
	if(model=="warning"){
		toastr.warning(message);
	}else{
		toastr.success(message);
	}
};
//cookie値を連想配列として取得する
CS.getCookieArray = function () {
  var arr = new Array();
  if(document.cookie != ''){
    var tmp = document.cookie.split('; ');
    for(var i=0;i<tmp.length;i++){
      var data = tmp[i].split('=');
      arr[data[0]] = decodeURIComponent(data[1].replace(/%/g, "％" ));
    }
  }
  return arr;
}
/////////////////////////////////////////////////
$(document).ready(CS.ready_function);

new WOW().init();
// オブジェクトをintに転換する
CS.toI = function(o) {
	if(typeof o == "string"){
		o=o.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0) - 65248);});
		o=o.replace(/,/g,"");
	}
	if (o == "") {
		return 0;
	}
	return parseInt(o, 10);
};

// $('.file_upload').file_upload();
$(window).on('scroll', function(){
	CS.aitask_common_pop_resize();
});
$(window).on('resize', function(){
	$('.side-nav').css('display',"none");
	setTimeout(function(){
		// Hide sideNav
		$('.side-nav').css('transform',"translateX(-100%)");
		$('.side-nav').css('display',"block");
	},100);
	CS.aitask_common_pop_resize();
});
CS.aitask_common_auto_setpop_topleft = async function (W,H) {
	$("#aitask_common_pop_back").css({'cssText': ''});
	CS.vueObj.aitask_common_pop_ac=true;
	$("body").css("overflow-y","hidden");
	return;
	$("body").css("overflow-y","hidden");
	CS.aitask_common_setpop_W=W;
	CS.aitask_common_setpop_H=H;
	setTimeout(
		function(){
			CS.vueObj.aitask_common_pop_ac=true;
			if(CS.aitask_common_setpop_W!=null){
				$("#aitask_pop_main").css("width",CS.aitask_common_setpop_W);
			}
			if(CS.aitask_common_setpop_H!=null){
				$("#aitask_pop_main").css("height",CS.aitask_common_setpop_H);
			}
			CS.aitask_common_pop_resize();
			},100);
}
CS.aitask_common_pop_resize = function(){
	return;
	if(!CS.vueObj.aitask_common_pop_ac){
		return;
	}
	var mainW=$("#aitask_pop_main").width();
	var mainH=$("#aitask_pop_main").height();
	var bodyW=document.documentElement.clientWidth;
	var bodyH=document.documentElement.clientHeight;
	$("#aitask_pop_main").css("top",window.scrollY+((bodyH-mainH)/2)+"px");
	$("#aitask_pop_main").css("left",window.scrollX+((bodyW-mainW)/2)+"px");
	//$("#aitask_common_pop_back").css({'cssText': 'display: none !important;'});
	setTimeout(
		function(){
			$("#aitask_common_pop_back").css({'cssText': ''});
			var bodyW=$('body').width();
			var bodyH=$('body').height();
			$("#aitask_common_pop_back").css("width",bodyW+"px");
			$("#aitask_common_pop_back").css("height",bodyH+"px");
		},100);
};

CS.common_pop_mouseevent = function (targetid) {
    CS.common_pop_targetid=targetid;
    //要素内でマウスボタンが押された場合
    $("#"+CS.common_pop_targetid).mousedown(function(evt1) {
  
        //ドラッグ判定（ドラッグしてない場合）
        if(CS.common_pop_drag_flg == false) {

            //要素の位置取得
            pos1 = $("#"+CS.common_pop_targetid).position();
            //要素位置を取得して修正値を計算
            CS.common_pop_posX1 = evt1.clientX - pos1.left;
            CS.common_pop_posY1 = evt1.clientY - pos1.top;
   
            //ドラッグ中にする
            CS.common_pop_drag_flg = true;
  
        //ドラッグ中の場合
        } else if(CS.common_pop_drag_flg == true) {
   
            //要素のドラッグを解除
            CS.common_pop_drag_flg = false;
        }
    });
    $("#"+CS.common_pop_targetid).mouseup(function(evt1) {
        CS.common_pop_drag_flg = false;
    });
    //ドキュメント上でマウスポインタが動いた場合
    $(document).mousemove(function(evt2) {
        //ドラッグ中の場合
        if(CS.common_pop_drag_flg == true) {
            //要素位置をCSSで設定
            $("#"+CS.common_pop_targetid).css("left",(evt2.clientX - CS.common_pop_posX1));
            $("#"+CS.common_pop_targetid).css("top",(evt2.clientY - CS.common_pop_posY1));
        }
    });
}