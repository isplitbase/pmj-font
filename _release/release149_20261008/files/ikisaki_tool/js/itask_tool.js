//i.taskの画面を表示する
CS.files_show_itask_window = function (index) {
	CS.vueObj.files_itask_tree_id=CS.vueObj.file_list[index]["tree_id"];
	var obj = {};
	obj["id"] = CS.vueObj.file_list[index]["tree_id"];
	// if(this.files_itask_atv3_flag){
		// obj["type"] = CS.vueObj.sk;
	// }
	obj["action"] = "itask_get_itask_info";
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			if(typeof data["anken_id"]!="undefined"){
				CS.vueObj.files_itask_file_id = data["file_id"];
				CS.vueObj.files_itask_seikyu_input = data["clms_seikyu"];
				CS.vueObj.files_itask_itask_id=data["itask_id"];
				CS.vueObj.files_itask_anken_input={};
				CS.vueObj.files_itask_anken_input["anken_id"]=data["anken_id"];
				CS.vueObj.files_itask_anken_input["anken_name"]=data["anken_name"];
				CS.vueObj.files_itask_anken_input["anken_no"]=data["anken_no"];
				CS.files_itask_get_kimitu(CS.vueObj.files_itask_itask_id);
				CS.vueObj.files_show_itask_flag=true;
				CS.vueObj.files_itask_create_anken_flag=false;
				CS.vueObj.files_itask_select_anken_flag=false;
				CS.vueObj.files_itask_do_insert_flag = false;
				CS.vueObj.files_itask_atv_flag=CS.vueObj.sk;
			}else{
				var syurui_id=["mm","tu",CS.vueObj.sk,"at"];
				var syurui_name=["見積書","注文請書","請求書","自動判断"];
				for(var i=0;i<syurui_name.length;i++){
					CS.vueObj.files_itask_select_syurui_list[i]={"id":syurui_id[i],"name":syurui_name[i]};
				}
				CS.vueObj.files_itask_anken_input={};
				CS.vueObj.files_itask_anken_input["anken_id"]=data["anken_id"];
				CS.vueObj.files_itask_anken_input["anken_name"]=data["anken_name"];
				CS.vueObj.files_itask_anken_input["anken_no"]=data["anken_no"];
				CS.vueObj.files_itask_do_insert_flag = true;
				// CS.vueObj.files_itask_select_syurui_flag=true;
				CS.itask_read_seikyu(CS.vueObj.files_itask_tree_id);
			}
		}
	});
};
//itaskのファイル種類
CS.files_itask_select_syurui = function (index) {
	var type=CS.vueObj.files_itask_select_syurui_list[index]["id"];
	if(type!=CS.vueObj.sk){
		CS.alert_error("工事中・・・・・・");
	}else{
		CS.itask_read_seikyu(CS.vueObj.files_itask_tree_id);
	}
	
}
//i.taskバイナリファイルから情報を読み込む
CS.itask_read_seikyu = function (tree_id) {
	var obj = {};
	obj["id"] = tree_id;
	// if(this.files_itask_atv3_flag){
		// obj["type"] = CS.vueObj.sk;
	// }
	obj["action"] = "itask_read_seikyu";
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.vueObj.files_itask_file_id = data["file_id"];
			CS.vueObj.files_itask_seikyu_input = data["clms_seikyu"];
			CS.vueObj.files_itask_itask_id=data["itask_id"];
			CS.vueObj.files_itask_anken_input=null;
			CS.files_itask_get_kimitu(CS.vueObj.files_itask_itask_id);
			CS.vueObj.files_show_itask_flag=true;
			CS.vueObj.files_itask_select_syurui_flag=false;
			CS.vueObj.files_itask_create_anken_flag=false;
			CS.vueObj.files_itask_select_anken_flag=false;
			CS.files_itask_atv_show(CS.vueObj.sk);
			CS.vueObj.files_itask_atv_flag=CS.vueObj.sk;
		}
	});
};
//i.taskのタグ（請求書、見積書、注文書）の切り替え
CS.files_itask_atv_show = function (model) {
	this.files_itask_atv1_flag=false;
	this.files_itask_atv2_flag=false;
	this.files_itask_atv3_flag=false;
	if(model=="mitumori"){
		this.files_itask_atv1_flag=true;
	}else if(model=="uke"){
		this.files_itask_atv2_flag=true;
	}else{
		this.files_itask_atv3_flag=true;
	}
};
//i.task設定画面から戻る
CS.files_itask_back = function () {
	this.files_show_itask_flag=false;
};
//i.taskを保存する
CS.files_itask_save = function () {
	if(CS.vueObj.files_itask_anken_input==null){
		CS.alert_error("案件を選択してください。","w");
		return;
	}
	var obj = {};
	if(CS.vueObj.files_itask_atv_flag==CS.vueObj.sk){
		//請求書の場合
		//typeを「sk」に設定する
		obj["type"] = CS.vueObj.sk;
		//案件名をセットする
		obj["anken_id"] = CS.vueObj.files_itask_anken_input["anken_id"];
		//ファイルツリーIDをセットする
		obj["tree_id"] = CS.vueObj.files_itask_tree_id;
		//ファイルID
		obj["file_id"] = CS.vueObj.files_itask_file_id;
		for(var i=0;i<CS.vueObj.files_itask_seikyu_input.length;i++){
			if(CS.vueObj.files_itask_seikyu_input[i]["value"]==null){
				obj[CS.vueObj.files_itask_seikyu_input[i]["seikyu_col_name"]]="";
			}else{
				obj[CS.vueObj.files_itask_seikyu_input[i]["seikyu_col_name"]]=CS.vueObj.files_itask_seikyu_input[i]["value"];
			}
			
		}
	}
	obj["action"] = "files_itask_save";
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.vueObj.files_itask_itask_id=data["itask_id"];
			if(CS.vueObj.files_itask_do_insert_flag && data["insert_flag"]=="OK"){
				CS.files_itask_insert_kimitu(CS.vueObj.files_itask_itask_id);
			}else{
				CS.files_itask_update_kimitu(CS.vueObj.files_itask_itask_id);
			}
			CS.alert_error("請求書を登録できました。");
		}
	});
};
//新しいメンバーを作成する＿機密情報も更新する
CS.files_itask_update_kimitu = function (itask_id) {
	var params = new Object();
	params["access_key"] = CS.ITASK_ACCESS_KEY;
	params["api_name"] = CS.ITASK_UPDATE_API;
	params["n0"] = CS.vueObj.files_itask_itask_id;
	var files_itask_kimituinfo_key = [];
	for(var i=1;i<150;i++){
		files_itask_kimituinfo_key[i-1]="n"+i;
	}
	var values = [];
	values[0] = [];
	values[0][0] = new Object();
	values[0][0]["name"] = "n0";
	values[0][0]["value"] = string_to_utf8_hex_string_for(CS.vueObj.files_itask_itask_id);
	var files_itask_seikyu_input={};
	for(var i=0;i<CS.vueObj.files_itask_seikyu_input.length;i++){
		if(CS.vueObj.files_itask_seikyu_input[i]["value"]==null){
			files_itask_seikyu_input[CS.vueObj.files_itask_seikyu_input[i]["seikyu_col_name"]]="";
		}else{
			files_itask_seikyu_input[CS.vueObj.files_itask_seikyu_input[i]["seikyu_col_name"]]=CS.vueObj.files_itask_seikyu_input[i]["value"];
		}
	}
	for (var i = 0; i < files_itask_kimituinfo_key.length; i++) {
		values[0][i+1] = new Object();
		values[0][i+1]["name"] = files_itask_kimituinfo_key[i];
		var value=files_itask_seikyu_input[files_itask_kimituinfo_key[i]];
		if(typeof value=="undefined"){
			values[0][i+1]["value"] = string_to_utf8_hex_string_for("");
		}else{
			values[0][i+1]["value"] = string_to_utf8_hex_string_for(files_itask_seikyu_input[files_itask_kimituinfo_key[i]]);
		}
		
	}
	supersender.send(CS.ITASK_KIMITU_URL, params, values, function () {});
}
//i.task情報を保存する
//新しいメンバーを作成する＿機密情報も保存する
CS.files_itask_insert_kimitu = function (itask_id) {
	var params = new Object();
	params["access_key"] = CS.ITASK_ACCESS_KEY;
	params["api_name"] = CS.ITASK_INSERT_API;
	params["member_id"] = CS.vueObj["member_info"]["member_id"];
	var files_itask_kimituinfo_key = [];
	for(var i=1;i<150;i++){
		files_itask_kimituinfo_key[i-1]="n"+i;
	}
	var values = [];
	values[0] = [];
	values[0][0] = new Object();
	values[0][0]["name"] = "n0";
	values[0][0]["value"] = string_to_utf8_hex_string_for(CS.vueObj.files_itask_itask_id);
	var files_itask_seikyu_input={};
	for(var i=0;i<CS.vueObj.files_itask_seikyu_input.length;i++){
		if(CS.vueObj.files_itask_seikyu_input[i]["value"]==null){
			files_itask_seikyu_input[CS.vueObj.files_itask_seikyu_input[i]["seikyu_col_name"]]="";
		}else{
			files_itask_seikyu_input[CS.vueObj.files_itask_seikyu_input[i]["seikyu_col_name"]]=CS.vueObj.files_itask_seikyu_input[i]["value"];
		}
		
	}
	
	for (var i = 0; i < files_itask_kimituinfo_key.length; i++) {
		values[0][i+1] = new Object();
		values[0][i+1]["name"] = files_itask_kimituinfo_key[i];
		var value=files_itask_seikyu_input[files_itask_kimituinfo_key[i]];
		if(typeof value=="undefined"){
			values[0][i+1]["value"] = string_to_utf8_hex_string_for("");
		}else{
			values[0][i+1]["value"] = string_to_utf8_hex_string_for(files_itask_seikyu_input[files_itask_kimituinfo_key[i]]);
		}
		
	}
	supersender.send(CS.ITASK_KIMITU_URL, params, values, function () {});
}
//新しいメンバーを作成する＿機密情報も保存する
CS.files_itask_get_kimitu = function (seikyu_id) {
	var obj = {};
	obj["api_name"] = CS.ITASK_SELECT_API;
	obj["access_key"] = CS.ITASK_ACCESS_KEY;
	obj["n0"] = seikyu_id;
	obj["member_id"] = CS.vueObj["member_info"]["member_id"];
	$.ajax({
		type: 'POST',
		url: CS.ITASK_KIMITU_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'text',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		data = eval("(" + data.replace(/\n/g, '\\n') + ")");
		if (data["status"] != "OK") {
			if (typeof data["message"] != "undefined") {
				if(data["status"]!="IKISAKI_FILES_TOOL_00" && data["status"]!="IKISAKI_FILES_TOOL_01"){
					CS.alert_error(data["message"]);
				}
			} else {
				CS.alert_error("機密情報を取得できませんでした。");
			}
			return true;
		} else {
			if (typeof data["clms"] != "undefined" && typeof data["clms"][0] != "undefined") {
				for(var i=0;i<CS.vueObj.files_itask_seikyu_input.length;i++){
					var value=data["clms"][0][CS.vueObj.files_itask_seikyu_input[i]["seikyu_col_name"]];
					if(typeof value != "undefined" && value != null){
						CS.vueObj.files_itask_seikyu_input[i]["value"] = value;
					}
				}
			}
			return true;
		}
	});
}
//案件作成画面を開く
CS.files_itask_open_create_anken_window = function(){
	this.files_itask_create_anken_info[0]="";
	this.files_itask_create_anken_info[1]=null;
	this.files_itask_create_anken_info[2]=null;
	this.files_itask_create_anken_info[3]=null;
	this.files_itask_anken_input=null;
	var obj = {};
	obj["action"] = "itask_get_option";
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.vueObj.files_itask_branch_list = data["branch_list"];
			CS.vueObj.files_itask_section_list = data["section_list"];
			CS.vueObj.files_itask_post_list = data["post_list"];
			CS.vueObj.files_itask_create_anken_flag=true;
		}
	});
};
//案件作成を実行する
CS.files_itask_create_anken = function(){
	if(this.files_itask_create_anken_info[0]=="" || this.files_itask_create_anken_info[0]==null){
		CS.alert_error("案件名を入力してください。");
		return;
	}
	if(this.files_itask_create_anken_info[1]=="" || this.files_itask_create_anken_info[1]==null){
		CS.alert_error("本支社を選択してください。");
		return;
	}
	if(this.files_itask_create_anken_info[2]=="" || this.files_itask_create_anken_info[2]==null){
		CS.alert_error("部門を選択してください。");
		return;
	}
	var obj = {};
	obj["action"] = "files_itask_create_anken";
	obj["anken_name"] = this.files_itask_create_anken_info[0];
	obj["branch_id"] = this.files_itask_create_anken_info[1];
	obj["section_id"] = this.files_itask_create_anken_info[2];
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.vueObj.files_itask_anken_input={};
			CS.vueObj.files_itask_anken_input["anken_id"]=data["anken_id"];
			CS.vueObj.files_itask_anken_input["anken_name"]=data["anken_name"];
			CS.vueObj.files_itask_create_anken_info[0]="";
			CS.vueObj.files_itask_create_anken_info[1]=null;
			CS.vueObj.files_itask_create_anken_info[2]=null;
			CS.vueObj.files_itask_create_anken_info[3]=null;
			CS.vueObj.files_itask_create_anken_flag=false;
		}
	});
};
//案件作成画面からi.task画面に戻る
CS.files_itask_create_anken_back = function(){
	this.files_itask_create_anken_flag=false;
};
//案件選択画面を開く
CS.files_itask_open_select_anken_window = function(){
	var obj = {};
	obj["action"] = "files_itask_open_select_anken_window";
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.vueObj.files_itask_select_anken_branch_sel_all= false;
			CS.vueObj.files_itask_select_anken_section_sel_all= false;
			CS.vueObj.files_itask_select_anken_branch_list = data["branch_list"];
			for (var i = 0; i < CS.vueObj.files_itask_select_anken_branch_list.length; i++) {
				CS.vueObj.files_itask_select_anken_branch_list[i]["flag"] = false;
			}
			CS.vueObj.files_itask_select_anken_section_list = data["section_list"];
			for (var i = 0; i < CS.vueObj.files_itask_select_anken_section_list.length; i++) {
				CS.vueObj.files_itask_select_anken_section_list[i]["flag"] = false;
			}
			//案件リストを初期化する
			CS.vueObj.files_itask_select_anken_list=[];
			//
			CS.vueObj.files_itask_select_anken_show_items=data["files_itask_select_anken_show_items"];
			setTimeout(function(){
				CS.vueObj.$set(CS.vueObj.change_color_keys, 0, true);
			},300);
			setTimeout(function(){
				CS.vueObj.$set(CS.vueObj.change_color_keys, 0, false);
			},600);
			setTimeout(function(){
				$('#search_key_input').css('background-color', 'white');
			},300);
			setTimeout(function(){
				$('#search_key_input').css('background-color', '');
			},600);
		}
	});
	this.files_itask_select_anken_flag=true;
};
//案件選択画面からi.task画面に戻る
CS.files_itask_select_anken_back = function(){
	this.files_itask_select_anken_flag=false;
};
CS.files_itask_select_anken_branch_select = function(index){
	var tmpobj=CS.vueObj.files_itask_select_anken_branch_list[index];
	if(CS.vueObj.files_itask_select_anken_branch_list[index]["flag"]){
		tmpobj.flag=false;
		CS.vueObj.$set(CS.vueObj.files_itask_select_anken_branch_list, index, tmpobj);
	}else{
		tmpobj.flag=true;
		CS.vueObj.$set(CS.vueObj.files_itask_select_anken_branch_list, index, tmpobj);
	}
};
CS.files_itask_select_anken_section_select = function(index){
	var tmpobj=CS.vueObj.files_itask_select_anken_section_list[index];
	if(CS.vueObj.files_itask_select_anken_section_list[index]["flag"]){
		tmpobj.flag=false;
		CS.vueObj.$set(CS.vueObj.files_itask_select_anken_section_list, index, tmpobj);
	}else{
		tmpobj.flag=true;
		CS.vueObj.$set(CS.vueObj.files_itask_select_anken_section_list, index, tmpobj);
	}
};
CS.files_itask_select_anken_sel_all = function(e){
	if(e.target.id=="files_itask_select_anken_branch_sel_all"){
		this.files_itask_select_anken_branch_sel_all=true;
		for(var i=0;i<this.files_itask_select_anken_branch_list.length;i++){
			this.files_itask_select_anken_branch_list[i]["flag"]=true;
		}
	}else if(e.target.id=="files_itask_select_anken_branch_sel_all_n"){
		this.files_itask_select_anken_branch_sel_all=false;
		for(var i=0;i<this.files_itask_select_anken_branch_list.length;i++){
			this.files_itask_select_anken_branch_list[i]["flag"]=false;
		}
	}
	if(e.target.id=="files_itask_select_anken_section_sel_all"){
		this.files_itask_select_anken_section_sel_all=true;
		for(var i=0;i<this.files_itask_select_anken_section_list.length;i++){
			this.files_itask_select_anken_section_list[i]["flag"]=true;
		}
	}else if(e.target.id=="files_itask_select_anken_section_sel_all_n"){
		this.files_itask_select_anken_section_sel_all=false;
		for(var i=0;i<this.files_itask_select_anken_section_list.length;i++){
			this.files_itask_select_anken_section_list[i]["flag"]=false;
		}
	}
};
//案件選択画面を開く
CS.files_itask_select_anken_show = function(){
	var branch_id_list = [];
	for (var i = 0; i < CS.vueObj.files_itask_select_anken_branch_list.length; i++) {
		if (CS.vueObj.files_itask_select_anken_branch_list[i]["flag"]) {
			branch_id_list[branch_id_list.length] = CS.vueObj.files_itask_select_anken_branch_list[i]["branch_id"];
		}
	}
	var section_id_list = [];
	for (var i = 0; i < CS.vueObj.files_itask_select_anken_section_list.length; i++) {
		if (CS.vueObj.files_itask_select_anken_section_list[i]["flag"]) {
			section_id_list[section_id_list.length] = CS.vueObj.files_itask_select_anken_section_list[i]["section_id"];
		}
	}
	var obj = {};
	obj["branch_id_list"] = branch_id_list;
	obj["section_id_list"] = section_id_list;
	obj["action"] = "files_itask_select_anken_show";
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.vueObj.files_itask_select_anken_list = data["files_itask_select_anken_list"];
		}
	});
}
//案件選択画面の案件一覧をソートする
CS.files_itask_resort_anken_list = function(index){
	var sortlist = [];
	var temp_list = [];
	var list_name="files_itask_select_anken_list";
	var items_name="files_itask_select_anken_show_items";
	for (var i = 0; i < CS.vueObj[list_name].length; i++) {
		sortlist.push(CS.vueObj[list_name][i][CS.vueObj[items_name][index]["col"]]);
		temp_list.push(CS.vueObj[list_name][i]);
	}
	for(var i = 0; i < CS.vueObj[items_name].length; i++){
		if(i==index){
			CS.vueObj[items_name][i].sort_flag=true;
			if(CS.vueObj[items_name][i].dw){
				CS.vueObj[items_name][i].dw=false;
				CS.vueObj[items_name][i].up=true;
				temp_list.sort(function (a, b) {
					var name=CS.vueObj[items_name][i].col;
					if (a[name] < b[name])
						return -1;
					if (a[name] > b[name])
						return 1;
					return 0;
				});
			}else{
				CS.vueObj[items_name][i].dw=true;
				CS.vueObj[items_name][i].up=false;
				temp_list.sort(function (a, b) {
					var name=CS.vueObj[items_name][i].col;
					if (a[name] > b[name])
						return -1;
					if (a[name] < b[name])
						return 1;
					return 0;
				});
			}
		}else{
			CS.vueObj[items_name][i].sort_flag=false;
		}
	}
	CS.vueObj[list_name] = [];
	CS.vueObj[list_name] = temp_list;
}
//i.taskの背景を塗る
CS.files_itask_select_anken_list_light = function(index){
	var tempobj=this.files_itask_select_anken_list[index];
	tempobj.light=true;
	this.$set(this.files_itask_select_anken_list, index, tempobj);
}
//i.taskの背景をクリア
CS.files_itask_select_anken_list_not_light = function(index){
	var tempobj=this.files_itask_select_anken_list[index];
	tempobj.light=false;
	this.$set(this.files_itask_select_anken_list, index, tempobj);
}
//案件を選択
CS.files_itask_select_anken_list_select = function(index){
	CS.vueObj.files_itask_anken_input={};
	CS.vueObj.files_itask_anken_input["anken_id"]=this.files_itask_select_anken_list[index]["anken_id"];
	CS.vueObj.files_itask_anken_input["anken_name"]=this.files_itask_select_anken_list[index]["anken_name"];
	this.files_itask_select_anken_flag=false;
}
CS.clearback=function(){
	$("#sidenav-overlay").remove();
}
//////////////////////////////////////////////////////////////////////////////////////////////
//i.taskの画面を表示する
CS.menu_itask_click = function () {
	var gototype=null;
	
	CS.closeALL();
	
	$("#sidenav-overlay").click();
	//請求書一覧を出す
	//if(CS.vueObj.member_info.user_id=="16"){
	if(CS.fromalertflag!="OK"){
		CS.vueObj.itask_show_type="NONE";
	}
		
	//}else{
	//	CS.vueObj.itask_show_type=CS.vueObj.kh;
	//}
	if(CS.fromalertflag=="OK"){
	}else if(CS.getParam("itask_type")!=null && CS.getParam("itask_type")!=""){
		if(CS.getParam("itask_id")==null){
			CS.alert_error("リンクが無効です");
		}else{
			CS.vueObj.itask_show_type=CS.getParam("itask_type");
		}
	}
	CS.vueObj.menu_sub_title="zaiTask カテゴリー一覧";
	CS.vueObj.itask_list_show_flag=false;
	CS.vueObj.menu_itask_open=true;
	CS.vueObj.kanri_itask_open=false;
	CS.vueObj.itask_list_graph_show_flag=false;
	//sk 請求書
	//tm 見積書
	var items=[CS.vueObj.sk,CS.vueObj.tm];
	for(var i=0;i<items.length;i++){
		
	}
	//表示項目の設定画面を表示するか
	this.itask_show_items_setting_flag=false;
	//itask検索条件を表示フラグ
	this.itask_list_search_flag=false;
	//アップロードファイルのテンプレートを表示フラグ
	this.itask_list_format_flag=false;
	//分析ページを選択するフラグ
	this.itask_show_coke_pages_flag=false;
	//カテゴリー管理画面フラグ
	this.kanri_itask_type_list_show=false;
	
	this.itask_list_show_history_flag=false;
	CS.vueObj.itask_list_show_message=null;
	var obj = {};
	obj["type"] = CS.vueObj.itask_show_type;
	if(CS.fromalertflag=="OK" && typeof CS.fromalert_itask_id!="undefined" && CS.fromalert_itask_id!=null){
		obj["itask_id"] = CS.fromalert_itask_id;
	}else{
		obj["itask_id"] = CS.getParam("itask_id");
	}
	
	obj["action"] = "get_itask_list";
	CS.itask_list_search_flag=false;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.kanri_itask_authority_list_back_target="TOP";
			CS.kanri_itask_type_list_back_target="TOP";
			if(CS.vueObj.itask_show_type=="NONE"){
				CS.vueObj.itask_show_type=data["itask_show_type"];
			}
			if(CS.vueObj.itask_show_type.substr(0,1)=="T"){
				CS.vueObj.itask_list_search_show_kotei=false;
			}else{
				CS.vueObj.itask_list_search_show_kotei=true;
			}
			CS.vueObj.itask_master_show_titles=data["itask_master_show_titles"];
			
			CS.vueObj.itask_list_show_share_flag="NG";
			CS.vueObj.itask_list_display_category=data["display_category"];
			CS.vueObj.itask_list_display_format=data["display_format"];
			CS.vueObj.itask_list_show_file_itask_count=data["itask_count"];
			CS.vueObj.itask_sub_type_list=data["itask_sub_type_list"];
			CS.vueObj.itask_shaer_type_list=data["itask_shaer_type_list"];
			CS.vueObj.itask_list_show_file_list_paging.sum=1;
			CS.itask_list_show_file_list_paging_click_index=0;
			CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type]=data["itask_list_show_items"][CS.vueObj.itask_show_type];
			CS.vueObj.itask_list_show_items_now=CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type];
			if(typeof CS.vueObj.itask_list_show_items=="undefined" || CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type].length==0){
				CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type]=[];
				CS.vueObj.itask_list_show_file_list_now=[];
				CS.vueObj.kanri_itask_format_list_have_items=false;
				CS.vueObj.itask_list_show_message="項目とテンプレートを設定してください。";
				CS.vueObj.itask_now_show_type_name=CS.vueObj.kanri_itask_now_show_type_name=CS.itask_get_show_type_name(CS.vueObj.itask_show_type);
				return;
			}
			CS.vueObj.kanri_itask_format_list_have_items=true;
			CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type]=data[CS.vueObj.itask_show_type];
			CS.vueObj.itask_list_show_file_list_now=CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type];
			CS.vueObj.itask_list_show_file_list_goukei=data["goukei"];
			
			CS.vueObj.itask_list_show_file_list_paging.limit=CS.toI(data["itask_list_show_file_list_paging_limit"]);
			CS.vueObj.itask_list_show_file_list_paging.num=1;
			CS.vueObj.itask_list_show_file_list_paging.start=0;
			CS.vueObj.itask_list_show_file_list_paging.end=9999;
			var r=CS.vueObj.itask_list_show_file_itask_count%CS.vueObj.itask_list_show_file_list_paging.limit;
			var t=(CS.vueObj.itask_list_show_file_itask_count-r)/CS.vueObj.itask_list_show_file_list_paging.limit;
			if(r>0){
				CS.vueObj.itask_list_show_file_list_paging.sum=t+1;
			}else{
				CS.vueObj.itask_list_show_file_list_paging.sum=t;
			}
			CS.vueObj.itask_list_show_file_list_paging.pages=[];
			for(var i=0;i<CS.vueObj.itask_list_show_file_list_paging.sum;i++){
				CS.vueObj.itask_list_show_file_list_paging.pages[i]={};
				CS.vueObj.itask_list_show_file_list_paging.pages[i].act=false;
				CS.vueObj.itask_list_show_file_list_paging.pages[i].val=i+1;
			}
			if(CS.vueObj.itask_list_show_file_list_paging.pages.length>0){
				CS.vueObj.itask_list_show_file_list_paging.pages[0].act=true;
			}
			var tempobj={};
			tempobj.value="";
			tempobj.name="未選択";
			var hiduke=new Date(); 
			var year = hiduke.getFullYear();
			var month = hiduke.getMonth()+1;
			CS.vueObj.itask_list_search_date_month=year+"年 "+month+"月";
			CS.vueObj.itask_list_search_date_list_month=[];
			CS.vueObj.itask_list_search_date_list_year=[];
			CS.vueObj.itask_list_search_date_list_year.push(tempobj);
			CS.vueObj.itask_list_search_date_list_month.push(tempobj);
			for(var i=year+2;i>year-7;i--){
				var tempobj={};
				tempobj.value=i;
				tempobj.name=i+"年";
				CS.vueObj.itask_list_search_date_list_year.push(tempobj);
			}
			for(var i=1;i<13;i++){
				var tempobj={};
				tempobj.value=i;
				tempobj.name=i+"月";
				CS.vueObj.itask_list_search_date_list_month.push(tempobj);
			}
			CS.vueObj.itask_list_search_date_year="";
			CS.vueObj.itask_list_search_date_month="";
			CS.vueObj.itask_list_search_end_date_year="";
			CS.vueObj.itask_list_search_end_date_month="";
			CS.vueObj.itask_format_list=data["itask_format_list"];
			CS.vueObj.itask_list_search_items[CS.vueObj.itask_show_type]=data["itask_list_search_items"][CS.vueObj.itask_show_type];
			
			//itask表示項目を初期化する
			var cookielist=CS.getCookieArray();
			if(typeof cookielist["itask_show_items"] != "undefined"){
				var itask_list_show_items=$.parseJSON(cookielist["itask_show_items"]);
				CS.itask_list_set_items(itask_list_show_items);
			}else{
				var typelist=["tm","jt","sk","nk","kh","sh"];
				typelist=[];
				for(var i=0;i<CS.vueObj.itask_sub_type_list.length;i++){
					typelist[i]=CS.vueObj.itask_sub_type_list[i]["itask_type"];
				}
				var count = new Date('2999/12/31 00:00');
				var set_itask_list_show_items={};
				for(var i=0;i<typelist.length;i++){
					if(typeof CS.vueObj.itask_list_show_items[typelist[i]] != "undefined"){
						set_itask_list_show_items[typelist[i]]=[];
						for(var j=0;j<CS.vueObj.itask_list_show_items[typelist[i]].length;j++){
							set_itask_list_show_items[typelist[i]][j]=Object.assign({}, CS.vueObj.itask_list_show_items[typelist[i]][j]);
						}
					}
				}
				for(var i=0;i<typelist.length;i++){
					if(typeof set_itask_list_show_items[typelist[i]] != "undefined"){
						for(var j=0;j<set_itask_list_show_items[typelist[i]].length;j++){
							//余計な属性を除く
							delete set_itask_list_show_items[typelist[i]][j]["name"];
							delete set_itask_list_show_items[typelist[i]][j]["sort_flag"];
							delete set_itask_list_show_items[typelist[i]][j]["dw"];
							delete set_itask_list_show_items[typelist[i]][j]["up"];
						}
					}
				}
				document.cookie = 'itask_show_items='+JSON.stringify(set_itask_list_show_items)+'; expires=' + count.toUTCString();
			}
			if(typeof cookielist["itask_show_coke_pages_strs"] != "undefined"){
				var itask_show_coke_pages_strs=$.parseJSON(cookielist["itask_show_coke_pages_strs"]);
				CS.itask_list_set_coke_pages_strs(itask_show_coke_pages_strs);
			}else{
				
				var typelist=["tm","jt","sk","nk","kh","sh"];
				typelist=[];
				for(var i=0;i<CS.vueObj.itask_sub_type_list.length;i++){
					typelist[i]=CS.vueObj.itask_sub_type_list[i]["itask_type"];
				}
				for(var i=0;i<typelist.length;i++){
					CS.vueObj.itask_show_coke_pages_strs[typelist[i]]="";
				}
			}
			CS.vueObj.itask_show_coke_pages_str=CS.vueObj.itask_show_coke_pages_strs[CS.vueObj.itask_show_type];
			CS.vueObj.itask_format_list_auto_select_flag=true;
			CS.itask_list_click_tab_list_count=0;
			CS.vueObj.itask_now_show_type_name=CS.vueObj.kanri_itask_now_show_type_name=CS.itask_get_show_type_name(CS.vueObj.itask_show_type);
			if(CS.getParam("itask_id")!=null){
				for(var i=0;i<CS.vueObj.itask_list_show_file_list_now.length;i++){
					if(CS.vueObj.itask_list_show_file_list_now[i]["itask_id"]==CS.getParam("itask_id")){
						CS.itask_list_show_edit_window(i);
						CS.itask_list_show_edit_window_for_link_flag=true;
						return;
					}
				}
				CS.alert_error("リンクが無効です");
				location.href=location.pathname;
			}
			if(CS.fromalertflag=="OK" && typeof CS.fromalert_itask_id!="undefined" && CS.fromalert_itask_id!=null){
				for(var i=0;i<CS.vueObj.itask_list_show_file_list_now.length;i++){
					if(CS.vueObj.itask_list_show_file_list_now[i]["itask_id"]==CS.fromalert_itask_id){
						CS.itask_list_show_edit_window(i);
						CS.itask_list_show_edit_window_for_link_flag=true;
						CS.fromalertflag=null;
						CS.fromalert_itask_id=null;
						return;
					}
				}
				CS.fromalertflag=null;
				CS.fromalert_itask_id=null;
				CS.alert_error("リンクが無効です");
				location.href=location.pathname;
			}
			for(var i=0;i<CS.vueObj.itask_list_show_file_list_now.length;i++){
				CS.vueObj.itask_list_show_file_list_now[i].delete_flag=false;
			}
			CS.vueObj.itask_list_show_file_list_selectall_click_flag=false;
			setTimeout(function(){
				var hh=$(window).height()-($("#itask > div > div:nth-child(1)").outerHeight(true)+$("#vueObj > header > nav").outerHeight(true)+$("#vueObj > footer").outerHeight(true)+10);
				$("#itask_list_body").animate({"min-height": hh},600, "swing");
			},2000);
			setTimeout(function(){
				CS.itask_list_reset_header();
			},500);
			// setTimeout(CS.clearback,500);
			
			CS.menu_itask_auto_refresh();
		}
	});
};
CS.menu_itask_click_for_type=function(type){
	CS.vueObj.itask_show_type=type;
	CS.fromalertflag="OK";
	CS.menu_itask_click();
	CS.itask_change_show_type(type,CS.itask_get_show_type_name(type),"NG",null);
}
CS.menu_itask_click_for_itask=function(type,itask_id){
	CS.vueObj.itask_show_type=type;
	CS.fromalert_itask_id=itask_id;
	CS.fromalertflag="OK";
	CS.menu_itask_click();
}

CS.itask_list_click_tab_list = function (e) {
	if(typeof CS.itask_list_click_tab_list_count == "undefined"){
		CS.itask_list_click_tab_list_count=0;
	}
	if($('#itask_type_tabs').attr("class").indexOf("show")!=-1){
		return;
	}
	if(CS.itask_list_click_tab_list_count==0){
		CS.itask_list_click_tab_list_count++;
		setTimeout(function(){
			$('#itask_type_tabs').addClass('show');
			$('#itask_type_tabs div').addClass('show');
			$('#itask_type_tabs div').css('top',0);
			$('#itask_type_tabs > div > a').css('padding',"1px");
			CS.itask_list_click_tab_transform=$('.dropdown-menu.dropdown-primary.show').css("transform");
		},10);
	}else{
		$('#itask_type_tabs').removeClass('show');
		setTimeout(function(){
			$('#itask_type_tabs').addClass('show');
			$('#itask_type_tabs div').addClass('show');
			$('#itask_type_tabs div').attr('x-placement', 'bottom-start');
			$('.dropdown-menu.dropdown-primary.show').css("transform",CS.itask_list_click_tab_transform);
			$('#itask_type_tabs div').css('top',0);
			$('#itask_type_tabs > div > a').css('padding',"1px");
		},10);
	}
}
CS.itask_list_dragover = function (e) {
	e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.dropEffect = 'copy';
	this.itask_list_dropover=true;
	var itask_list_body = $('#itask_list_body');
	$('#itask_futa').height(itask_list_body.height()-6).width(itask_list_body.width()-6);
}
CS.itask_list_dragleave = function (e) {
	this.itask_list_dropover=false;
}
CS.itask_list_drop = async function (e) {
	e.preventDefault();
	var files = e.dataTransfer.files;
	this.itask_list_dropover=false;
	var items = e.dataTransfer.items;
	CS.itask_list_drop_results = [];
	var promise = [];
	for (var i=0;i<items.length;i++) {
		var item=items[i];
		var entry = item.webkitGetAsEntry();
		promise.push(scanFiles(entry, CS.itask_list_drop_results));
	}
	await Promise.all(promise);
	// console.log(CS.itask_list_drop_results); //テスト表示
	CS.vueObj.itask_uploadFile=[];
	CS.vueObj.itask_uploadFile_names=[];
	CS.vueObj.itask_boos_id="";
	CS.readers=[];
	CS.itask_list_drop_flag_list=[];
	/*--------------------追加コード--------------------*/
	for(let result of CS.itask_list_drop_results) {
		result.file(file => {
			var tmpobj = new Object();
			var path=result.fullPath;
			if(path.substr(0,1)=="/"){
				tmpobj.name = path.substr(1);
			}else{
				tmpobj.name = path;
			}
			//ファイルリストに重複ファイルがあるかをチェックする
			//重複ファイルがある時に現在のファイルを削除する
			var pushflag=true;
			for(var i=0;i<CS.vueObj.itask_uploadFile_names.length;i++){
				var A=CS.vueObj.itask_uploadFile_names[i].name.split("/");
				var B=tmpobj.name.split("/");
				if(A[A.length-1]==B[B.length-1]){
					pushflag=false;
				}
			}
			if(pushflag){
				CS.vueObj.itask_uploadFile_names.push(tmpobj);
				CS.vueObj.itask_uploadFile.push(file);
			}
			CS.itask_list_drop_flag_list[CS.itask_list_drop_flag_list.length]=true;
			// var reader = new FileReader();
			// reader.readAsText(file);
			// reader.onload = () => {
				// console.log(result.fullPath);
				// console.log(file);
				// console.log(reader.result);
			// };
		});
	}
	CS.itask_list_drop_timer=setInterval(function(){
		if(CS.itask_list_drop_flag_list.length == CS.itask_list_drop_results.length){
			CS.itask_upload();
			clearInterval(CS.itask_list_drop_timer);
		}
	},500);
	
/*-----------------------------------------------*/
}
//i.taskの画面を更新する
CS.menu_itask_refresh = function () {
	CS.itask_list_show_file_list_paging_click(CS.vueObj.itask_list_show_file_list_paging.num-1);
};
//i.taskの画面を更新する
CS.menu_itask_auto_refresh = function () {
	CS.menu_itask_refresh();
	CS.vueObj.itask_list_autoloading=false;
	if(typeof CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type] == "undefined"){
		return;
	}
	if(CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type] == null){
		return;
	}
	for(var i=0;i<CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type].length;i++){
		if(CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type][i].status==1){
			CS.vueObj.itask_list_autoloading=true;
			break;
		}
	}
	if(typeof CS.menu_itask_auto_refresh_man!="undefined"){return;}
	CS.menu_itask_auto_refresh_man=setInterval(
	function(){
		CS.vueObj.itask_list_autoloading=false;
		if(CS.vueObj.itask_list_show_edit_window_flag){
			return;
		}
		if(typeof CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type] == "undefined"){
			return;
		}
		if(CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type] == null){
			return;
		}
		for(var i=0;i<CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type].length;i++){
			if(CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type][i].status==1){
				CS.menu_itask_refresh();
				CS.vueObj.itask_list_autoloading=true;
				return;
			}
		}
	},120000);
};
CS.get_itask_type_list = function(){
	var obj = {};
	obj["action"] = "get_itask_type_list";
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.vueObj.itask_sub_type_list=data["itask_sub_type_list"];
			CS.vueObj.itask_shaer_type_list=data["itask_shaer_type_list"];
			var inittypeflag=true;
			for(var i=0;i<CS.vueObj.itask_sub_type_list.length;i++){
				if(CS.vueObj.itask_sub_type_list[i].itask_type==CS.vueObj.kanri_itask_show_type){
					inittypeflag=false;
				}
			}
			for(var i=0;i<CS.vueObj.itask_shaer_type_list.length;i++){
				if(CS.vueObj.itask_shaer_type_list[i].itask_type==CS.vueObj.kanri_itask_show_type){
					inittypeflag=false;
				}
			}
			if(inittypeflag){
				for(var i=0;i<CS.vueObj.itask_sub_type_list.length;i++){
					CS.vueObj.kanri_itask_show_type=CS.vueObj.itask_show_type=CS.vueObj.itask_sub_type_list[i].itask_type;
					CS.vueObj.itask_now_show_type_name=CS.vueObj.kanri_itask_now_show_type_name=CS.itask_get_show_type_name(CS.vueObj.itask_show_type);
					inittypeflag=false;
					break;
				}
			}
			if(inittypeflag){
				for(var i=0;i<CS.vueObj.itask_shaer_type_list.length;i++){
					CS.vueObj.kanri_itask_show_type=CS.vueObj.itask_show_type=CS.vueObj.itask_sub_type_list[i].itask_type;
					CS.vueObj.itask_now_show_type_name=CS.vueObj.kanri_itask_now_show_type_name=CS.itask_get_show_type_name(CS.vueObj.itask_show_type);
					break;
				}
			}
		}
	});
};
//i.taskの画面を更新する
CS.menu_itask_change_share = function (share_user_id) {
	//sk 請求書
	//tm 見積書
	var items=[CS.vueObj.sk,CS.vueObj.tm];
	for(var i=0;i<items.length;i++){
		
	}
	CS.vueObj.menu_sub_title="";
	if(typeof CS.vueObj.itask_show_coke_pages_strs[CS.vueObj.itask_show_type] == "undefined"){
		CS.vueObj.itask_show_coke_pages_strs[CS.vueObj.itask_show_type]="";
	}
	CS.vueObj.itask_show_coke_pages_str=CS.vueObj.itask_show_coke_pages_strs[CS.vueObj.itask_show_type];
	CS.vueObj.itask_show_coke_pages_flag=false;
	CS.vueObj.itask_list_show_message=null;
	CS.itask_list_show_share_user_id=share_user_id;
	var obj = {};
	//請求書一覧を出す
	obj["type"] = CS.vueObj.itask_show_type;
	obj["share_user_id"] = share_user_id;
	obj["action"] = "get_itask_list";
	CS.itask_list_search_flag=false;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: true,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.kanri_itask_type_list_back_target="NAV1";
			CS.vueObj.itask_show_type=CS.vueObj.itask_show_type;
			CS.vueObj.itask_list_show_flag=true;
			if(CS.vueObj.itask_show_type.substr(0,1)=="T"){
				CS.vueObj.itask_list_search_show_kotei=false;
			}else{
				CS.vueObj.itask_list_search_show_kotei=true;
			}
			CS.vueObj.itask_master_show_titles=data["itask_master_show_titles"];
			CS.vueObj.itask_list_show_share_flag="OK";
			CS.vueObj.itask_list_show_file_list_paging.sum=1;
			CS.itask_list_show_file_list_paging_click_index=0;
			CS.vueObj.itask_sub_type_list=data["itask_sub_type_list"];
			CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type]=data["itask_list_show_items"][CS.vueObj.itask_show_type];
			CS.vueObj.itask_list_show_items_now=CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type];
			CS.vueObj.itask_now_show_type_name=CS.vueObj.kanri_itask_now_show_type_name=data["itask_type_name"];
			if(typeof CS.vueObj.itask_list_show_items=="undefined" || typeof CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type]=="undefined" ||CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type].length==0){
				CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type]=[];
				CS.vueObj.itask_list_show_file_list_now=[];
				CS.vueObj.kanri_itask_format_list_have_items=false;
				CS.vueObj.itask_list_show_file_itask_count=0;
				CS.vueObj.itask_list_show_message="項目とテンプレートを設定してください。";
				return;
			}
			CS.vueObj.itask_list_show_file_itask_count=data["itask_count"];
			CS.vueObj.kanri_itask_format_list_have_items=true;
			var cookielist=CS.getCookieArray();
			if(typeof cookielist["itask_show_items"] != "undefined"){
				var itask_list_show_items=$.parseJSON(cookielist["itask_show_items"]);
				CS.itask_list_set_items(itask_list_show_items);
			}
			CS.vueObj.itask_list_search_items[CS.vueObj.itask_show_type]=data["itask_list_search_items"][CS.vueObj.itask_show_type];
			CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type]=data[CS.vueObj.itask_show_type];
			CS.vueObj.itask_list_show_file_list_now=CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type];
			CS.vueObj.itask_list_show_file_list_goukei=data["goukei"];
			CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type]=data[CS.vueObj.itask_show_type];
			CS.vueObj.itask_list_show_file_list_now=CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type];
			if(CS.vueObj.itask_list_show_file_list_now.length>0){
				var tempobj=CS.vueObj.itask_list_show_file_list_now[0];
				CS.vueObj.$set(CS.vueObj.itask_list_show_file_list_now, 0, tempobj);
			}
			
			CS.vueObj.itask_list_show_file_list_paging.limit=CS.toI(data["itask_list_show_file_list_paging_limit"]);
			CS.vueObj.itask_list_show_file_list_paging.num=1;
			CS.vueObj.itask_list_show_file_list_paging.start=0;
			CS.vueObj.itask_list_show_file_list_paging.end=9999;
			var r=CS.vueObj.itask_list_show_file_itask_count%CS.vueObj.itask_list_show_file_list_paging.limit;
			var t=(CS.vueObj.itask_list_show_file_itask_count-r)/CS.vueObj.itask_list_show_file_list_paging.limit;
			if(r>0){
				CS.vueObj.itask_list_show_file_list_paging.sum=t+1;
			}else{
				CS.vueObj.itask_list_show_file_list_paging.sum=t;
			}
			CS.vueObj.itask_list_show_file_list_paging.pages=[];
			for(var i=0;i<CS.vueObj.itask_list_show_file_list_paging.sum;i++){
				CS.vueObj.itask_list_show_file_list_paging.pages[i]={};
				CS.vueObj.itask_list_show_file_list_paging.pages[i].act=false;
				CS.vueObj.itask_list_show_file_list_paging.pages[i].val=i+1;
			}
			if(CS.vueObj.itask_list_show_file_list_paging.pages.length>0){
				CS.vueObj.itask_list_show_file_list_paging.pages[0].act=true;
			}
			CS.vueObj.itask_format_list=data["itask_format_list"];
			CS.vueObj.itask_format_list_auto_select_flag=true;
			for(var i=0;i<CS.vueObj.itask_list_show_file_list_now.length;i++){
				CS.vueObj.itask_list_show_file_list_now[i].delete_flag=false;
			}
			CS.vueObj.itask_list_show_file_list_selectall_click_flag=false;
			setTimeout(function(){
				CS.itask_list_reset_header();
			},500);
		}
	});
};
//i.taskの画面を更新する
CS.menu_itask_change = function () {
	//sk 請求書
	//tm 見積書
	var items=[CS.vueObj.sk,CS.vueObj.tm];
	for(var i=0;i<items.length;i++){
		
	}
	if(typeof CS.vueObj.itask_show_coke_pages_strs[CS.vueObj.itask_show_type] == "undefined"){
		CS.vueObj.itask_show_coke_pages_strs[CS.vueObj.itask_show_type]="";
	}
	CS.vueObj.menu_sub_title="";
	CS.vueObj.itask_show_coke_pages_str=CS.vueObj.itask_show_coke_pages_strs[CS.vueObj.itask_show_type];
	CS.vueObj.itask_show_coke_pages_flag=false;
	CS.vueObj.itask_list_show_message=null;
	CS.vueObj.itask_list_show_flag=true;
	CS.vueObj.kanri_itask_items_show_flag=false;
	CS.vueObj.kanri_itask_replace_show_flag=false;
	CS.vueObj.kanri_itask_format_create_show=false;
	CS.vueObj.kanri_itask_open=false;
	CS.vueObj.kanri_itask_type_list_show=false;
	CS.vueObj.kanri_itask_type_edit_authority_flag=false;
	var obj = {};
	//請求書一覧を出す
	obj["type"] = CS.vueObj.itask_show_type;
	CS.vueObj.itask_list_show_items_search_other_items=[
	"売上高"
	,"売上原価"
	,"売上総利益"
	,"販売費一般管理費"
	,"営業利益"
	,"営業外収益"
	,"営業外費用"
	,"経常利益"
	,"特別利益"
	,"特別損失"
	,"税引前当期利益"
	,"有形固定資産"
	,"無形固定資産"
	,"投資その他の資産"
	,"繰延資産"
	,"固定資産合計"
	,"資産の部合計"
	,"流動負債"
	,"固定負債"
	,"負債の部合計"
	,"資本金"
	,"資本剰余金"
	,"利益準備金"
	,"その他の利益剰余金"
	,"利益剰余金"
	,"自己株式"
	,"株主資本合計"
	,"評価換算差額等"
	,"新株予約権"
	,"非支配株主持分"
	,"純資産合計"
	,"負債及び純資産合計"];
	for(var i=0;i<CS.vueObj.itask_list_show_items_search_other_items.length;i++){
		CS.vueObj.itask_list_show_items_search_other_items_val1[i]="";
		CS.vueObj.itask_list_show_items_search_other_items_val2[i]="";
	}
	obj["action"] = "get_itask_list";
	CS.itask_list_search_flag=false;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.kanri_itask_type_list_back_target="NAV1";
			CS.vueObj.itask_show_type=CS.vueObj.kanri_itask_show_type;
			CS.vueObj.itask_now_show_type_name=CS.vueObj.kanri_itask_now_show_type_name=CS.itask_get_show_type_name(CS.vueObj.itask_show_type);
			if(CS.vueObj.itask_show_type.substr(0,1)=="T"){
				CS.vueObj.itask_list_search_show_kotei=false;
			}else{
				CS.vueObj.itask_list_search_show_kotei=true;
			}
			CS.vueObj.itask_master_show_titles=data["itask_master_show_titles"];
			CS.vueObj.itask_list_show_share_flag="NG";
			CS.vueObj.itask_list_show_file_list_paging.sum=1;
			CS.itask_list_show_file_list_paging_click_index=0;
			CS.vueObj.itask_sub_type_list=data["itask_sub_type_list"];
			CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type]=data["itask_list_show_items"][CS.vueObj.itask_show_type];
			CS.vueObj.itask_list_show_items_now=CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type];
			CS.vueObj.itask_now_show_type_name=CS.vueObj.kanri_itask_now_show_type_name=CS.itask_get_show_type_name(CS.vueObj.itask_show_type);
			//CS.vueObj.menu_sub_title=CS.itask_get_show_type_name(CS.vueObj.itask_show_type);
			if(typeof CS.vueObj.itask_list_show_items=="undefined" || typeof CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type]=="undefined" ||CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type].length==0){
				CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type]=[];
				CS.vueObj.itask_list_show_file_list_now=[];
				CS.vueObj.kanri_itask_format_list_have_items=false;
				CS.vueObj.itask_list_show_file_itask_count=0;
				CS.vueObj.itask_list_show_message="項目とテンプレートを設定してください。";
				return;
			}
			CS.vueObj.itask_list_show_file_itask_count=data["itask_count"];
			CS.vueObj.kanri_itask_format_list_have_items=true;
			var cookielist=CS.getCookieArray();
			if(typeof cookielist["itask_show_items"] != "undefined"){
				var itask_list_show_items=$.parseJSON(cookielist["itask_show_items"]);
				CS.itask_list_set_items(itask_list_show_items);
			}
			CS.vueObj.itask_list_search_items[CS.vueObj.itask_show_type]=data["itask_list_search_items"][CS.vueObj.itask_show_type];
			CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type]=data[CS.vueObj.itask_show_type];
			CS.vueObj.itask_list_show_file_list_now=CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type];
			CS.vueObj.itask_list_show_file_list_goukei=data["goukei"];
			CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type]=data[CS.vueObj.itask_show_type];
			CS.vueObj.itask_list_show_file_list_now=CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type];
			if(CS.vueObj.itask_list_show_file_list_now.length>0){
				var tempobj=CS.vueObj.itask_list_show_file_list_now[0];
				CS.vueObj.$set(CS.vueObj.itask_list_show_file_list_now, 0, tempobj);
			}
			
			CS.vueObj.itask_list_show_file_list_paging.limit=CS.toI(data["itask_list_show_file_list_paging_limit"]);
			CS.vueObj.itask_list_show_file_list_paging.num=1;
			CS.vueObj.itask_list_show_file_list_paging.start=0;
			CS.vueObj.itask_list_show_file_list_paging.end=9999;
			var r=CS.vueObj.itask_list_show_file_itask_count%CS.vueObj.itask_list_show_file_list_paging.limit;
			var t=(CS.vueObj.itask_list_show_file_itask_count-r)/CS.vueObj.itask_list_show_file_list_paging.limit;
			if(r>0){
				CS.vueObj.itask_list_show_file_list_paging.sum=t+1;
			}else{
				CS.vueObj.itask_list_show_file_list_paging.sum=t;
			}
			CS.vueObj.itask_list_show_file_list_paging.pages=[];
			for(var i=0;i<CS.vueObj.itask_list_show_file_list_paging.sum;i++){
				CS.vueObj.itask_list_show_file_list_paging.pages[i]={};
				CS.vueObj.itask_list_show_file_list_paging.pages[i].act=false;
				CS.vueObj.itask_list_show_file_list_paging.pages[i].val=i+1;
			}
			if(CS.vueObj.itask_list_show_file_list_paging.pages.length>0){
				CS.vueObj.itask_list_show_file_list_paging.pages[0].act=true;
			}
			CS.vueObj.itask_format_list=data["itask_format_list"];
			CS.vueObj.itask_format_list_auto_select_flag=true;
			for(var i=0;i<CS.vueObj.itask_list_show_file_list_now.length;i++){
				CS.vueObj.itask_list_show_file_list_now[i].delete_flag=false;
			}
			CS.vueObj.itask_list_show_file_list_selectall_click_flag=false;
			setTimeout(function(){
				CS.itask_list_reset_header();
			},500);
		}
	});
};
CS.plustime = function () {
	if(document.getElementById("itask_upprogress") !=null && document.getElementById("itask_upprogress").value+(100/(50*CS.itask_upload_sum))<100*CS.itask_upload_sum_ended/CS.itask_upload_sum){
		document.getElementById("itask_upprogress").value=document.getElementById("itask_upprogress").value+(100/(50*CS.itask_upload_sum));
	}
}
//ドキュメントアップロードメイン
CS.itask_upload = function (e) {
	// FormData を利用して File を POST する
	var fd = new FormData();
	if (CS.vueObj.itask_uploadFile.length == 0) {
		CS.alert_error("ファイルを選択してください。");
		return;
	}
	/*
	var obj = {};
	var checkfiles = [];
	for (var i = 0; i < CS.vueObj.itask_uploadFile_names.length; i++) {
		checkfiles.push(CS.vueObj.itask_uploadFile_names[i].name);
	}
	var nextflag=false;
	checkfiles=checkfiles.join('[ISPLITKANMA]');
	obj["type"] = CS.vueObj.itask_show_type;
	obj["action"] = "check_file_list";
	obj["checkfiles"] = checkfiles;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			alert(data["message"]);
		}
	});
	if(!nextflag){
		return;
	}
	return;
	*/
	var pages=[];
	var itask_show_coke_pages_str = CS.vueObj.itask_show_coke_pages_str.split(",");
	for(var i=itask_show_coke_pages_str.length-1;i>=0;i--){
		itask_show_coke_pages_str_sub=itask_show_coke_pages_str[i].split("-");
		if(itask_show_coke_pages_str_sub.length==2){
			if(!isNaN(parseInt(itask_show_coke_pages_str_sub[0],10)) && !isNaN(parseInt(itask_show_coke_pages_str_sub[1],10))){
				for(var j=parseInt(itask_show_coke_pages_str_sub[0],10);j<=parseInt(itask_show_coke_pages_str_sub[1],10);j++){
					if (pages.indexOf(j) == -1){
						pages[pages.length]=j;
					}
				}
			}
		}else{
			if (pages.indexOf(parseInt(itask_show_coke_pages_str_sub[0],10)) == -1 && !isNaN(parseInt(itask_show_coke_pages_str_sub[0],10))){
				pages[pages.length]=parseInt(itask_show_coke_pages_str_sub[0],10);
			}
		}
	}
	pages.sort(function compareFunc(a, b) {return a - b;});
	CS.itask_upload_pages_number= pages.join(",");
	document.getElementById("itask_upprogress").value = 0;
	CS.vueObj.itask_list_autoloading=true;
	if(CS.vueObj.itask_uploadFile.length>0){
		CS.itask_timer=setInterval(CS.plustime,500);
		CS.itask_upload_sum=CS.vueObj.itask_uploadFile.length;
		CS.itask_upload_sum_start=0;
		CS.itask_upload_sum_ended=1;
		CS.itask_upload_skip_one="NONE";
		CS.itask_upload_skip_all="NONE";
		CS.itask_upload_did=0;
		CS.itask_upload_sub();
		return;
	}
	for (var i = 0; i < CS.vueObj.itask_uploadFile.length; i++) {
		fd.append("files[]", CS.vueObj.itask_uploadFile[i]);
	}
	fd.append("itask_upload_skip_one", CS.itask_upload_skip_one);
	fd.append("itask_upload_skip_all", CS.itask_upload_skip_all);
	fd.append("action", "itask_upload");
	fd.append("boos_id", CS.vueObj.itask_boos_id);
	fd.append("type", CS.vueObj.itask_show_type);
	//テスト用
	// if(CS.vueObj.itask_show_type=="sk"){
		// fd.append("itask_format_id", "0");
	// }else if(CS.vueObj.itask_show_type=="tm"){
		// fd.append("itask_format_id", "1");
	// }
	for(var i=0;i<this.itask_format_list.length;i++){
		if(this.itask_format_list.length[i]["flag"]){
			fd.append("itask_format_id", this.itask_format_list.length[i]["itask_format_id"]);
		}
	}
	var tmplist = [];
	for (var i = 0; i < CS.vueObj.itask_uploadFile_names.length; i++) {
		tmplist.push(CS.vueObj.itask_uploadFile_names[i].name);
	}
	tmplist=tmplist.join('[ISPLITKANMA]');
	fd.append("roots", tmplist);
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: fd,
		dataType: 'json',
		cache: false,
		beforeSend: function (xhr, setting) {
			CS.lockScreen(CS.vueObj.lockId);
			$('#itask_upprogress').css('display', '');
			document.getElementById("itask_upprogress").value = 0;
		},
		xhr: function () {
			XHR = $.ajaxSettings.xhr();
			if (XHR.upload) {
				XHR.upload.addEventListener('progress',
					function (e) {
					progre = parseInt(e.loaded / e.total * 10000) / 100;
					document.getElementById("itask_upprogress").value = progre;
				}, false);
			}
			return XHR;
		},
		processData: false,
		contentType: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {
		$('#itask_upprogress').css('display', 'none');
		CS.unlockScreen(CS.vueObj.lockId);
		CS.alert_error("ファイルをアップロードできませんでした。");
	}).done(function (data) {
		CS.unlockScreen(CS.vueObj.lockId);
		if (data["status"] != "OK") {
			if (typeof data["message"] != "undefined") {
				CS.alert_error(data["message"]);
			} else {
				CS.alert_error("ファイルをアップロードできませんでした。");
			}
		} else {
			if(typeof data["action"] !="undefined"){
				if(data["action"]=="request"){
					CS.alert_error("すでに同じ名前のファイル"+data["file_name"]+"があります。上書きしてよろしいですか？");
				}
			}else{
				CS.alert_error("ファイルをアップロードしました。");
			}
		}
		CS.vueObj.itask_uploadFile_names = [];
		CS.vueObj.itask_uploadFile = [];
		$('#itask_upprogress').css('display', 'none');
		CS.menu_itask_refresh();
	});
}
//多数ドキュメントアップロード対応
CS.itask_upload_sub = function () {
	// FormData を利用して File を POST する
	var fd = new FormData();
	if (CS.vueObj.itask_uploadFile.length == 0) {
		CS.alert_error("ファイルを選択してください。");
		return;
	}
	for (var i = CS.itask_upload_sum_start; i < CS.itask_upload_sum_ended; i++) {
		if(CS.vueObj.itask_uploadFile.length>i){
			fd.append("files[]", CS.vueObj.itask_uploadFile[i]);
		}
	}
	if(CS.itask_upload_pages_number==""){
		CS.itask_upload_pages_number="all";
	}
	fd.append("itask_upload_skip_one", CS.itask_upload_skip_one);
	fd.append("itask_upload_skip_all", CS.itask_upload_skip_all);
	fd.append("itask_upload_pages_number", CS.itask_upload_pages_number);
	fd.append("action", "itask_upload");
	fd.append("boos_id", CS.vueObj.itask_boos_id);
	fd.append("type", CS.vueObj.itask_show_type);
	if(CS.vueObj.itask_format_list_auto_select_flag){
		fd.append("itask_format_id", "auto");
	}else{
		for(var i=0;i<CS.vueObj.itask_format_list.length;i++){
			if(CS.vueObj.itask_format_list[i]["flag"]){
				fd.append("itask_format_id", CS.vueObj.itask_format_list[i]["itask_format_id"]);
			}
		}
	}
	
	var tmplist = [];
	for (var i = CS.itask_upload_sum_start; i < CS.itask_upload_sum_ended; i++) {
		if(CS.vueObj.itask_uploadFile_names.length>i){
			tmplist.push(CS.vueObj.itask_uploadFile_names[i].name);
		}
	}
	tmplist=tmplist.join('[ISPLITKANMA]');
	fd.append("roots", tmplist);

	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: fd,
		dataType: 'json',
		cache: false,
		beforeSend: function (xhr, setting) {
			CS.lockScreen(CS.vueObj.lockId);
			$('#itask_upprogress').css('display', '');
		},
		xhr: function () {
			XHR = $.ajaxSettings.xhr();
			if (XHR.upload) {
				XHR.upload.addEventListener('progress',
					function (e) {
					// progre = parseInt(e.loaded / e.total * 10000) / 100;
					// document.getElementById("itask_upprogress").value = progre;
				}, false);
			}
			return XHR;
		},
		processData: false,
		contentType: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {
		$('#itask_upprogress').css('display', 'none');
		CS.unlockScreen(CS.vueObj.lockId);
		CS.alert_error("ファイルをアップロードできませんでした。");
	}).done(function (data) {
		CS.unlockScreen(CS.vueObj.lockId);
		if (data["status"] != "OK") {
			if (typeof data["message"] != "undefined") {
				CS.alert_error(data["message"]);
			} else {
				CS.alert_error("ファイルをアップロードできませんでした。");
			}
		} else {
			CS.itask_upload_skip_one="NONE";
			if(typeof data["action"] !="undefined"){
				if(data["action"]=="request"){
					//CS.alert_error("すでに同じ名前のファイル【"+data["file_name"]+"】があります。上書きしてよろしいですか？");
					CS.vueObj.itask_upload_pop_text1="すでに同じ名前のファイル【"+data["file_name"]+"】があります。";
					CS.vueObj.itask_upload_pop_text2="上書きしてよろしいですか？";
					CS.vueObj.itask_upload_pop_main="aitask_pop_main";
					CS.aitask_common_auto_setpop_topleft("600px","100px");
					$('#itask_upprogress').css('display', 'none');
					return;
				}
			}else{
				CS.itask_upload_did++;
				if(CS.itask_upload_sum_ended>=CS.itask_upload_sum){
					CS.alert_error(CS.itask_upload_sum_ended+"ファイルをアップロードしました。");
					CS.vueObj.itask_uploadFile_names = [];
					CS.vueObj.itask_uploadFile = [];
					$('#itask_upprogress').css('display', 'none');
					clearInterval(CS.itask_timer);
					CS.menu_itask_auto_refresh();
				}else{
					document.getElementById("itask_upprogress").value = CS.toI(CS.itask_upload_sum_ended/CS.itask_upload_sum*100);
					CS.itask_upload_sum_start=CS.itask_upload_sum_start+1;
					CS.itask_upload_sum_ended=CS.itask_upload_sum_ended+1;
					CS.itask_upload_sub();
				}
			}
		}
	});
};
CS.itask_upload_pop_close = function(flag){
	if(flag==0){
		CS.itask_upload_skip_one="NG";
		CS.itask_upload_skip_all="NG";
		CS.itask_upload_sub();
	}else if(flag==1){
		CS.itask_upload_skip_one="OK";
		CS.itask_upload_skip_all="OK";
		if(CS.itask_upload_did>0){
			CS.alert_error("ファイルをアップロードしました。");
		}
		CS.vueObj.itask_uploadFile_names = [];
		CS.vueObj.itask_uploadFile = [];
		$('#itask_upprogress').css('display', 'none');
		clearInterval(CS.itask_timer);
		CS.menu_itask_auto_refresh();
	}else if(flag==2){
		CS.itask_upload_skip_one="NG";
		CS.itask_upload_skip_all="NONE";
		CS.itask_upload_sub();
	}else if(flag==3){
		CS.itask_upload_skip_one="NONE";
		CS.itask_upload_skip_all="NONE";
		if(CS.itask_upload_sum_ended>=CS.itask_upload_sum){
			if(CS.itask_upload_did>0){
				CS.alert_error("ファイルをアップロードしました。");
			}
			CS.vueObj.itask_uploadFile_names = [];
			CS.vueObj.itask_uploadFile = [];
			$('#itask_upprogress').css('display', 'none');
			clearInterval(CS.itask_timer);
			CS.menu_itask_auto_refresh();
		}else{
			document.getElementById("itask_upprogress").value = CS.toI(CS.itask_upload_sum_ended/CS.itask_upload_sum*100);
			CS.itask_upload_sum_start=CS.itask_upload_sum_start+1;
			CS.itask_upload_sum_ended=CS.itask_upload_sum_ended+1;
			CS.itask_upload_sub();
		}
	}
	CS.vueObj.itask_upload_pop_main="";
	CS.vueObj.aitask_common_pop_ac=false;
	$("body").css("overflow-y","scroll");
}
//i.taskの背景を塗る
CS.itask_list_show_file_list_now_light = function(index){
	var tempobj=this.itask_list_show_file_list_now[index];
	tempobj.light=true;
	this.$set(this.itask_list_show_file_list_now, index, tempobj);
};
//i.taskの背景をクリア
CS.itask_list_show_file_list_now_not_light = function(index){
	var tempobj=this.itask_list_show_file_list_now[index];
	tempobj.light=false;
	this.$set(this.itask_list_show_file_list_now, index, tempobj);
};
//表示するiタスクの種類を変更する
CS.itask_change_show_type = function(type,name,share_flag,share_user_id){
	CS.vueObj.itask_show_type=CS.vueObj.kanri_itask_show_type=type;
	CS.vueObj.itask_now_show_type_name=CS.vueObj.kanri_itask_now_show_type_name=name;
	if(share_flag=="OK"){
		CS.menu_itask_change_share(share_user_id);
	}else{
		CS.menu_itask_change();
	}
};
CS.itask_get_show_type_name = function(type){
	for(var i=0;i<CS.vueObj.itask_sub_type_list.length;i++){
		if(CS.vueObj.itask_sub_type_list[i].itask_type==type){
			return CS.vueObj.itask_sub_type_list[i].itask_type_name;
		}
	}
	for(var i=0;i<CS.vueObj.itask_shaer_type_list.length;i++){
		if(CS.vueObj.itask_shaer_type_list[i].itask_type==type){
			return CS.vueObj.itask_shaer_type_list[i].itask_type_name;
		}
	}
	return "";
};
//itaskのファイルリストをクリックした時の挙動
CS.itask_list_show_file_list_click = function(index){
	if(this.itask_list_show_file_list_now[index].show_property){
		var tempobj=this.itask_list_show_file_list_now[index];
		tempobj.show_property=false;
		this.$set(this.itask_list_show_file_list_now, index, tempobj);
	}else{
		for(var i=0;i<this.itask_list_show_file_list_now.length;i++){
			if(this.itask_list_show_file_list_now[i].show_property){
				var tempobj=this.itask_list_show_file_list_now[i];
				tempobj.show_property=false;
				this.$set(this.itask_list_show_file_list_now, i, tempobj);
			}
		}
		tempobj=this.itask_list_show_file_list_now[index];
		tempobj.show_property=true;
		this.$set(this.itask_list_show_file_list_now, index, tempobj);
	}
};
//itaskのファイルリストをソートする
CS.itask_list_show_file_list_resort = function(index){
	var sortlist = [];
	var temp_list = [];
	var list_name="itask_list_show_file_list_now";
	var items=CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type];
	for (var i = 0; i < CS.vueObj[list_name].length; i++) {
		sortlist.push(CS.vueObj[list_name][i][items[index]["col"]]);
		temp_list.push(CS.vueObj[list_name][i]);
	}
	if(items[index]["col"]=="n3"){
		CS.itask_list_show_file_list_resort_number_flag=true;
	}else{
		CS.itask_list_show_file_list_resort_number_flag=false;
	}
	for(var i = 0; i < items.length; i++){
		if(i==index){
			items[i].sort_flag=true;
			if(items[i].dw){
				items[i].dw=false;
				items[i].up=true;
				temp_list.sort(function (a, b) {
					var name=items[i].col;
					// if(CS.itask_list_show_file_list_resort_number_flag){
						// if (CS.toI(a[name]) < CS.toI(b[name]))
							// return -1;
						// if (CS.toI(a[name]) > CS.toI(b[name]))
							// return 1;
					// }else{
						if (a[name] < b[name])
							return -1;
						if (a[name] > b[name])
							return 1;
					// }
					return 0;
				});
			}else{
				items[i].dw=true;
				items[i].up=false;
				temp_list.sort(function (a, b) {
					var name=items[i].col;
					// if(CS.itask_list_show_file_list_resort_number_flag){
						// if (CS.toI(a[name]) > CS.toI(b[name]))
							// return -1;
						// if (CS.toI(a[name]) < CS.toI(b[name]))
							// return 1;
					// }else{
						if (a[name] > b[name])
							return -1;
						if (a[name] < b[name])
							return 1;
					// }
					return 0;
				});
			}
		}else{
			items[i].sort_flag=false;
		}
	}
	CS.vueObj[list_name] = [];
	CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type]=CS.vueObj[list_name] = temp_list;
	
	var indexs=[];
	var id_list=[];
	for(var i=CS.vueObj.itask_list_show_file_list_paging.start;i<=CS.vueObj.itask_list_show_file_list_paging.end;i++){
		if(typeof CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type][i]["n0"]=="undefined"){
			indexs[indexs.length]=i;
			id_list[id_list.length]=CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type][i]["itask_id"];
		}
	}
	if(indexs.length==0){
		return;
	}
	var obj = {};
	obj["indexs"] = indexs.join(",");;
	obj["id_list"] = id_list.join(",");;
	obj["type"] = CS.vueObj.itask_show_type;
	obj["action"] = "get_itask_change_page";
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			var code=data[CS.vueObj.itask_show_type];
			
			CS.vueObj.itask_list_show_file_list_paging.num=CS.itask_list_show_file_list_paging_click_index+1;
			CS.vueObj.itask_list_show_file_list_paging.start=CS.itask_list_show_file_list_paging_click_index*CS.vueObj.itask_list_show_file_list_paging.limit;
			CS.vueObj.itask_list_show_file_list_paging.end=CS.vueObj.itask_list_show_file_list_paging.limit*(CS.itask_list_show_file_list_paging_click_index+1)-1;
			if(CS.vueObj.itask_list_show_file_list_paging.end>CS.vueObj.itask_list_show_file_list_now.length-1){
				CS.vueObj.itask_list_show_file_list_paging.end=CS.vueObj.itask_list_show_file_list_now.length-1;
			}
			for(var i=CS.vueObj.itask_list_show_file_list_paging.start;i<=CS.vueObj.itask_list_show_file_list_paging.end;i++){
				var code_sub=code[i];
				if(typeof code[i]!="undefined"){
					for (key in code_sub) {
						CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type][i][key]=code_sub[key];
					}
				}
			}
			CS.vueObj.itask_list_show_file_list_now=CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type];
			for(var i=0;i<CS.vueObj.itask_list_show_file_list_paging.pages.length;i++){
				CS.vueObj.itask_list_show_file_list_paging.pages[i].act=false;
			}
			var tempobj=CS.vueObj.itask_list_show_file_list_paging.pages[CS.itask_list_show_file_list_paging_click_index];
			tempobj.act=true;
			CS.vueObj.$set(CS.vueObj.itask_list_show_file_list_paging.pages, CS.itask_list_show_file_list_paging_click_index, tempobj);
			if(CS.vueObj.itask_list_show_file_list_now.length>0){
				var tempobj=CS.vueObj.itask_list_show_file_list_now[0];
				CS.vueObj.$set(CS.vueObj.itask_list_show_file_list_now, 0, tempobj);
			}
		}
	});
	
}
CS.itask_list_show_file_list_paging_click = function(index){
	if(index<0){index=0;}
	if(index>CS.vueObj.itask_list_show_file_list_paging.sum-1){index=CS.vueObj.itask_list_show_file_list_paging.sum-1;}
	if(!CS.itask_list_search_flag){
		var obj = {};
		obj["type"] = CS.vueObj.itask_show_type;
		obj["page"] = index+1;
		obj["action"] = "get_itask_list";
		$.ajax({
			type: 'POST',
			url: CS.ITASK_TOOL_URL,
			data: obj,
			// contentType: 'application/JSON',
			dataType: 'json',
			async: false,
			cache: false,
			scriptCharset: 'utf-8'
		}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
			// 成功処理
			if (data["status"] != "OK") {
				CS.alert_error(data["message"]);
			} else {
				CS.vueObj.itask_list_show_file_itask_count=data["itask_count"];
				if(typeof CS.vueObj.itask_list_show_items=="undefined" || CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type].length==0){
					CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type]=[];
					CS.vueObj.itask_list_show_file_list_now=[];
					CS.vueObj.kanri_itask_format_list_have_items=false;
					CS.vueObj.itask_list_show_message="項目とテンプレートを設定してください。";
					CS.vueObj.itask_now_show_type_name=CS.vueObj.kanri_itask_now_show_type_name=CS.itask_get_show_type_name(CS.vueObj.itask_show_type);
					return;
				}
				CS.vueObj.kanri_itask_format_list_have_items=true;
				CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type]=data[CS.vueObj.itask_show_type];
				CS.vueObj.itask_list_show_file_list_now=CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type];
				
				CS.vueObj.itask_list_show_file_list_paging.limit=CS.toI(data["itask_list_show_file_list_paging_limit"]);
				CS.vueObj.itask_list_show_file_list_paging.num=CS.toI(data["itask_list_show_file_list_paging_num"]);
				CS.itask_list_show_file_list_paging_click_index=CS.vueObj.itask_list_show_file_list_paging.num-1;
				
				var r=CS.vueObj.itask_list_show_file_itask_count%CS.vueObj.itask_list_show_file_list_paging.limit;
				var t=(CS.vueObj.itask_list_show_file_itask_count-r)/CS.vueObj.itask_list_show_file_list_paging.limit;
				if(r>0){
					CS.vueObj.itask_list_show_file_list_paging.sum=t+1;
				}else{
					CS.vueObj.itask_list_show_file_list_paging.sum=t;
				}
				CS.vueObj.itask_list_show_file_list_paging.pages=[];
				for(var i=0;i<CS.vueObj.itask_list_show_file_list_paging.sum;i++){
					CS.vueObj.itask_list_show_file_list_paging.pages[i]={};
					CS.vueObj.itask_list_show_file_list_paging.pages[i].act=false;
					CS.vueObj.itask_list_show_file_list_paging.pages[i].val=i+1;
				}
				if(CS.vueObj.itask_list_show_file_list_paging.pages.length>=CS.vueObj.itask_list_show_file_list_paging.num){
					CS.vueObj.itask_list_show_file_list_paging.pages[CS.vueObj.itask_list_show_file_list_paging.num-1].act=true;
				}
				for(var i=0;i<CS.vueObj.itask_list_show_file_list_now.length;i++){
					CS.vueObj.itask_list_show_file_list_now[i].delete_flag=false;
				}
				CS.vueObj.itask_list_show_file_list_selectall_click_flag=false;
				setTimeout(function(){
					var hh=$(window).height()-($("#itask > div > div:nth-child(1)").outerHeight(true)+$("#vueObj > header > nav").outerHeight(true)+$("#vueObj > footer").outerHeight(true)+10);
					$("#itask_list_body").animate({"min-height": hh},600, "swing");
				},2000);
				setTimeout(function(){
					CS.itask_list_reset_header();
				},500);
				//CS.menu_itask_auto_refresh();
			}
		});
	}else{
		CS.itask_list_search_obj["page"] = index+1;
		CS.vueObj.itask_list_show_file_list_paging.num=CS.itask_list_search_obj["page"];
		$.ajax({
			type: 'POST',
			url: CS.ITASK_TOOL_URL,
			data: CS.itask_list_search_obj,
			// contentType: 'application/JSON',
			dataType: 'json',
			async: false,
			cache: false,
			scriptCharset: 'utf-8'
		}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
			// 成功処理
			if (data["status"] != "OK") {
				CS.alert_error(data["message"]);
			} else {
				CS.vueObj.itask_list_show_file_itask_count=data["itask_count"];
				CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type]=data[CS.vueObj.itask_show_type];
				CS.vueObj.itask_list_show_file_list_now=CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type];
				if(CS.vueObj.itask_list_show_file_list_now.length>0){
					var tempobj=CS.vueObj.itask_list_show_file_list_now[0];
					CS.vueObj.$set(CS.vueObj.itask_list_show_file_list_now, 0, tempobj);
				}
				
				
				CS.vueObj.itask_list_show_file_list_paging.limit=CS.toI(data["itask_list_show_file_list_paging_limit"]);
				var r=CS.vueObj.itask_list_show_file_itask_count%CS.vueObj.itask_list_show_file_list_paging.limit;
				var t=(CS.vueObj.itask_list_show_file_itask_count-r)/CS.vueObj.itask_list_show_file_list_paging.limit;
				if(r>0){
					CS.vueObj.itask_list_show_file_list_paging.sum=t+1;
				}else{
					CS.vueObj.itask_list_show_file_list_paging.sum=t;
				}
				CS.vueObj.itask_list_show_file_list_paging.pages=[];
				for(var i=0;i<CS.vueObj.itask_list_show_file_list_paging.sum;i++){
					CS.vueObj.itask_list_show_file_list_paging.pages[i]={};
					CS.vueObj.itask_list_show_file_list_paging.pages[i].act=false;
					CS.vueObj.itask_list_show_file_list_paging.pages[i].val=i+1;
				}
				if(CS.vueObj.itask_list_show_file_list_paging.pages.length>=CS.vueObj.itask_list_show_file_list_paging.num){
					CS.vueObj.itask_list_show_file_list_paging.pages[CS.vueObj.itask_list_show_file_list_paging.num-1].act=true;
				}
				for(var i=0;i<CS.vueObj.itask_list_show_file_list_now.length;i++){
					CS.vueObj.itask_list_show_file_list_now[i].delete_flag=false;
				}
				CS.vueObj.itask_list_show_file_list_selectall_click_flag=false;
			}
		});
	}
};
CS.itask_list_search_clear = function(){
	CS.vueObj.itask_list_search_file_name="";
	CS.vueObj.itask_list_search_member_name="";
	CS.vueObj.itask_list_search_memo="";
	CS.vueObj.itask_list_search_update_at_start="";
	CS.vueObj.itask_list_search_update_at_end="";
	for(var i=0;i<CS.vueObj.itask_list_show_items_now.length;i++){
		if(typeof CS.vueObj.itask_list_show_items_now[i]["searchText"] != "undefined"){
			CS.vueObj.itask_list_show_items_now[i]["searchText"]="";
		}
		if(typeof CS.vueObj.itask_list_show_items_now[i]["searchText2"] != "undefined"){
			CS.vueObj.itask_list_show_items_now[i]["searchText2"]="";
		}
	}
	for(var i=0;i<CS.vueObj.itask_list_show_items_search_other_items_val1.length;i++){
		CS.vueObj.itask_list_show_items_search_other_items_val1[i]="";
	}
	for(var i=0;i<CS.vueObj.itask_list_show_items_search_other_items_val2.length;i++){
		CS.vueObj.itask_list_show_items_search_other_items_val2[i]="";
	}
	CS.vueObj.itask_list_search_kojinhoujin="";
	CS.itask_list_search();
	CS.vueObj.itask_list_search_flag=false;
};
CS.itask_list_search = function(){
	var obj = {};
	var searchTextFlag=false;
	//請求書一覧を出す
	obj["type"] = CS.vueObj.itask_show_type;
	obj["file_name"] = CS.vueObj.itask_list_search_file_name;
	if(obj["file_name"]!=""){searchTextFlag=true;}
	
	obj["member_name"] = CS.vueObj.itask_list_search_member_name;
	if(obj["member_name"]!=""){searchTextFlag=true;}
	
	obj["memo"] = CS.vueObj.itask_list_search_memo;
	if(obj["memo"]!=""){searchTextFlag=true;}
	
	obj["itask_list_search_update_at_start"] = CS.vueObj.itask_list_search_update_at_start;
	if(obj["itask_list_search_update_at_start"]!=""){searchTextFlag=true;}
	
	obj["itask_list_search_update_at_end"] = CS.vueObj.itask_list_search_update_at_end;
	if(obj["itask_list_search_update_at_end"]!=""){searchTextFlag=true;}
	var itask_list_show_items_now=JSON.stringify(CS.vueObj.itask_list_show_items_now);
	obj["itask_list_search_items"] = JSON.parse(itask_list_show_items_now);
	for(var i=0;i<CS.vueObj.itask_list_show_items_now.length;i++){
		if((CS.vueObj.itask_list_show_items_now[i]["searchText"]!="" && typeof CS.vueObj.itask_list_show_items_now[i]["searchText"] != "undefined") || (CS.vueObj.itask_list_show_items_now[i]["searchText2"]!="" && typeof CS.vueObj.itask_list_show_items_now[i]["searchText2"]!="undefined")){searchTextFlag=true;}
	}
	
	var itask_list_show_items_search_other_items_val1=JSON.stringify(CS.vueObj.itask_list_show_items_search_other_items_val1);
	obj["itask_list_show_items_search_other_items_val1"] = JSON.parse(itask_list_show_items_search_other_items_val1);
	for(var i=0;i<CS.vueObj.itask_list_show_items_search_other_items_val1.length;i++){
		if(CS.vueObj.itask_list_show_items_search_other_items_val1[i]!=""){searchTextFlag=true;}
	}
	
	var itask_list_show_items_search_other_items_val2=JSON.stringify(CS.vueObj.itask_list_show_items_search_other_items_val2);
	obj["itask_list_show_items_search_other_items_val2"] = JSON.parse(itask_list_show_items_search_other_items_val2);
	for(var i=0;i<CS.vueObj.itask_list_show_items_search_other_items_val2.length;i++){
		if(CS.vueObj.itask_list_show_items_search_other_items_val2[i]!=""){searchTextFlag=true;}
	}
	if(CS.vueObj.itask_list_search_kojinhoujin!=""){searchTextFlag=true;}
	obj["kojinhoujin"] = CS.vueObj.itask_list_search_kojinhoujin;
	if(!searchTextFlag){
		CS.menu_itask_change();
		return;
	}
	
	obj["action"] = "itask_list_search";
	CS.itask_list_search_obj=obj;
	CS.itask_list_search_flag=true;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.vueObj.itask_list_show_file_itask_count=data["itask_count"];
			CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type]=data[CS.vueObj.itask_show_type];
			CS.vueObj.itask_list_show_file_list_now=CS.vueObj.itask_list_show_file_list[CS.vueObj.itask_show_type];
			if(CS.vueObj.itask_list_show_file_list_now.length>0){
				var tempobj=CS.vueObj.itask_list_show_file_list_now[0];
				CS.vueObj.$set(CS.vueObj.itask_list_show_file_list_now, 0, tempobj);
			}
			
			
			CS.vueObj.itask_list_show_file_list_paging.limit=CS.toI(data["itask_list_show_file_list_paging_limit"]);
			CS.vueObj.itask_list_show_file_list_paging.num=1;
			CS.vueObj.itask_list_show_file_list_paging.start=0;
			CS.vueObj.itask_list_show_file_list_paging.end=9999;
			var r=CS.vueObj.itask_list_show_file_itask_count%CS.vueObj.itask_list_show_file_list_paging.limit;
			var t=(CS.vueObj.itask_list_show_file_itask_count-r)/CS.vueObj.itask_list_show_file_list_paging.limit;
			if(r>0){
				CS.vueObj.itask_list_show_file_list_paging.sum=t+1;
			}else{
				CS.vueObj.itask_list_show_file_list_paging.sum=t;
			}
			CS.vueObj.itask_list_show_file_list_paging.pages=[];
			for(var i=0;i<CS.vueObj.itask_list_show_file_list_paging.sum;i++){
				CS.vueObj.itask_list_show_file_list_paging.pages[i]={};
				CS.vueObj.itask_list_show_file_list_paging.pages[i].act=false;
				CS.vueObj.itask_list_show_file_list_paging.pages[i].val=i+1;
			}
			if(CS.vueObj.itask_list_show_file_list_paging.pages.length>0){
				CS.vueObj.itask_list_show_file_list_paging.pages[0].act=true;
			}
			CS.vueObj.itask_format_list=data["itask_format_list"];
			CS.vueObj.itask_format_list_auto_select_flag=true;
			for(var i=0;i<CS.vueObj.itask_list_show_file_list_now.length;i++){
				CS.vueObj.itask_list_show_file_list_now[i].delete_flag=false;
			}
			CS.vueObj.itask_list_show_file_list_selectall_click_flag=false;
			setTimeout(CS.get_list_wiew,5);
		}
	});
};
CS.get_list_wiew = function(){
	$('html,body').animate({ scrollTop: $('.XhxcVqZU').offset().top },1000, 'swing');
	//
}
CS.itask_format_list_click = function(index){
	if(index=="auto"){
		for(var i=0;i<this.itask_format_list.length;i++){
			this.itask_format_list[i]["flag"]=false;
		}
		this.itask_format_list_auto_select_flag=true;
	}else{
		this.itask_format_list_auto_select_flag=false;
		for(var i=0;i<this.itask_format_list.length;i++){
			this.itask_format_list[i]["flag"]=false;
		}
		this.itask_format_list[index]["flag"]=true;
	}
};
CS.itask_list_show_select_all = function(){
	for(var i=0;i<this.itask_list_show_file_list_now.length;i++){
		this.itask_list_show_file_list_now[i].delete_flag=false;
	}
}
CS.itask_list_delete = function(index){
	if(!window.confirm(this.itask_list_show_file_list_now[index]["file_tree_name"]+'削除しますか？')){
		return;
	}
	var obj = {};
	//請求書一覧を出す
	obj["type"] = CS.vueObj.itask_show_type;
	obj["drive_id"] = this.itask_list_show_file_list_now[index]["n0"];
	obj["itask_id"] = this.itask_list_show_file_list_now[index]["itask_id"];
	obj["file_tree_name"] = this.itask_list_show_file_list_now[index]["file_tree_name"];
	obj["action"] = "itask_list_delete";
	CS.itask_list_delete_index=index;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.alert_worrying("削除できました",null);
			CS.vueObj.itask_list_show_file_list_now.splice(CS.itask_list_delete_index, 1);
		}
	});
}
CS.itask_list_download = function(index){
	var obj = {};
	//請求書一覧を出す
	obj["itask_id"] = this.itask_list_show_file_list_now[index]["itask_id"];
	obj["action"] = "itask_list_download";
	CS.itask_list_delete_index=index;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.itask_download(data["file_id"]);
		}
	});
}
CS.itask_download = function (id) {
	window.open(CS.DOWN_HISTORY + id + "&no=" + Date(), "A");
	return;
	var obj = {};
	obj["file_id"] = id;
	obj["action"] = "files_check_download_auth";
	$.ajax({
		type: 'POST',
		url: CS.MENU_FILES_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			window.open(CS.DOWN_HISTORY + id + "&no=" + Date(), "A");
		}
	});
};
CS.itask_list_show_edit_window_edit_click = function (col) {
	if(CS.vueObj.itask_list_show_edit_window_readonly_flag){
		return;
	}
	CS.vueObj.itask_list_show_file_list_now[CS.vueObj.itask_list_show_edit_index]["editing"+col]=true;
	CS.vueObj.$set(CS.vueObj.itask_list_show_file_list_now, CS.vueObj.itask_list_show_edit_index, CS.vueObj.itask_list_show_file_list_now[CS.vueObj.itask_list_show_edit_index]);
}
CS.itask_list_show_edit_window_edit_blur = function (col) {
	CS.vueObj.itask_list_show_file_list_now[CS.vueObj.itask_list_show_edit_index]["editing"+col]=false;
	CS.vueObj.itask_list_show_file_list_now[CS.vueObj.itask_list_show_edit_index]["showxy"+col]=false;
	CS.vueObj.$set(CS.vueObj.itask_list_show_file_list_now, CS.vueObj.itask_list_show_edit_index, CS.vueObj.itask_list_show_file_list_now[CS.vueObj.itask_list_show_edit_index]);
	var nowrecode=this.itask_list_show_file_list_now[this.itask_list_show_edit_index];
	if(nowrecode[col]!=this.itask_edit_old_info[col]){
		CS.vueObj.itask_list_show_file_list_now_xy_deletes[col]=true;
	}else{
		CS.vueObj.itask_list_show_file_list_now_xy_deletes[col]=false;
	}
}
///////////////廃棄された
itask_list_show_view_window = function (index) {
};
CS.itask_list_show_edit_window_change_checkbox = function (event) {
	if(event.target.id=="itask_list_show_edit_pana_seisa_over0"){
		if(CS.vueObj.itask_list_show_edit_pana_seisa_over0){
			CS.vueObj.itask_list_show_edit_pana_seisa_over1=true;
			CS.vueObj.itask_list_show_edit_pana_seisa_over2=true;
			CS.vueObj.itask_list_show_edit_pana_seisa_over3=true;
			CS.vueObj.itask_list_show_edit_pana_seisa_over4=true;
		}else{
			CS.vueObj.itask_list_show_edit_pana_seisa_over1=false;
			CS.vueObj.itask_list_show_edit_pana_seisa_over2=false;
			CS.vueObj.itask_list_show_edit_pana_seisa_over3=false;
			CS.vueObj.itask_list_show_edit_pana_seisa_over4=false;
		}
	}
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf('konjin')!=-1){
		if(CS.vueObj.itask_list_show_edit_pana_seisa_over1 && CS.vueObj.itask_list_show_edit_pana_seisa_over2 && CS.vueObj.itask_list_show_edit_pana_seisa_over3){
			CS.vueObj.itask_list_show_edit_pana_seisa_over0=true;
		}else{
			CS.vueObj.itask_list_show_edit_pana_seisa_over0=false;
		}
	}else{
		if(CS.vueObj.itask_list_show_edit_pana_seisa_over1 && CS.vueObj.itask_list_show_edit_pana_seisa_over2 && CS.vueObj.itask_list_show_edit_pana_seisa_over3 && CS.vueObj.itask_list_show_edit_pana_seisa_over4){
			CS.vueObj.itask_list_show_edit_pana_seisa_over0=true;
		}else{
			CS.vueObj.itask_list_show_edit_pana_seisa_over0=false;
		}
	}

	if(event.target.id=="itask_list_show_edit_pana_senen_tani0"){
		if(CS.vueObj.itask_list_show_edit_pana_senen_tani0){
			CS.vueObj.itask_list_show_edit_pana_senen_tani1=true;
			CS.vueObj.itask_list_show_edit_pana_senen_tani2=true;
			CS.vueObj.itask_list_show_edit_pana_senen_tani3=true;
			CS.vueObj.itask_list_show_edit_pana_senen_tani4=true;
		}else{
			CS.vueObj.itask_list_show_edit_pana_senen_tani1=false;
			CS.vueObj.itask_list_show_edit_pana_senen_tani2=false;
			CS.vueObj.itask_list_show_edit_pana_senen_tani3=false;
			CS.vueObj.itask_list_show_edit_pana_senen_tani4=false;
		}
	}
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf('konjin')!=-1){
		if(CS.vueObj.itask_list_show_edit_pana_senen_tani1 && CS.vueObj.itask_list_show_edit_pana_senen_tani2 && CS.vueObj.itask_list_show_edit_pana_senen_tani3){
			CS.vueObj.itask_list_show_edit_pana_senen_tani0=true;
		}else{
			CS.vueObj.itask_list_show_edit_pana_senen_tani0=false;
		}
	}else{
		if(CS.vueObj.itask_list_show_edit_pana_senen_tani1 && CS.vueObj.itask_list_show_edit_pana_senen_tani2 && CS.vueObj.itask_list_show_edit_pana_senen_tani3 && CS.vueObj.itask_list_show_edit_pana_senen_tani4){
			CS.vueObj.itask_list_show_edit_pana_senen_tani0=true;
		}else{
			CS.vueObj.itask_list_show_edit_pana_senen_tani0=false;
		}
	}
	CS.itask_list_show_edit_window_kensan(4);
}
CS.itask_list_show_edit_window_getfullimage = function () {
	$("#itask_list_show_edit_window_pana_select_square_0").css({"display": "block",
	"left":0,
	"top":0,
	"width":0,
	"height":0});
	CS.vueObj.itask_list_show_edit_window_getfullimage_show=true;
	var obj = {};
	//請求書一覧を出す
	obj["action"] = "itask_list_show_edit_window_getfullimage";
	obj["itask_pages_no"] = CS.vueObj.itask_list_show_file_list_now_imgs_index;
	obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.itask_list_show_edit_window_bakimage_src=CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index];
			CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index]=data["image"];
		}
	});
}
CS.itask_list_show_edit_window_bakfullimage = function () {
	CS.vueObj.itask_list_show_edit_window_getfullimage_show=false;
	CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index]=CS.itask_list_show_edit_window_bakimage_src;
}
CS.itask_list_show_edit_window_linking = function () {
	var kanjo_info_id_list=[];
	if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
		if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
			for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
				var item=CS.vueObj.kanjo_detail[i];
				if(item.order=='2' && parseInt(item.family,10)<40){
					if(CS.vueObj.kanjo_detail[i]["page"]!=CS.vueObj.itask_list_show_file_list_now_imgs_index){
						$("#itask_list_show_edit_window_pana_select_square_0").css("display","none");
						CS.vueObj.kanjo_detail[i]["page"]=CS.vueObj.itask_list_show_file_list_now_imgs_index;
						CS.vueObj.kanjo_detail[i]["start_x"]=0;
						CS.vueObj.kanjo_detail[i]["start_y"]=0;
						CS.vueObj.kanjo_detail[i]["end_x"]=0;
						CS.vueObj.kanjo_detail[i]["end_y"]=0;
						kanjo_info_id_list.push(CS.vueObj.kanjo_detail[i]["kanjo_info_id"]);
					}
				}
			}
		}else{
			for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
				var item=CS.vueObj.kanjo_detail[i];
				if(i>=45 && i<=94){
					if(CS.vueObj.kanjo_detail[i]["page"]!=CS.vueObj.itask_list_show_file_list_now_imgs_index){
						$("#itask_list_show_edit_window_pana_select_square_0").css("display","none");
						CS.vueObj.kanjo_detail[i]["page"]=CS.vueObj.itask_list_show_file_list_now_imgs_index;
						CS.vueObj.kanjo_detail[i]["start_x"]=0;
						CS.vueObj.kanjo_detail[i]["start_y"]=0;
						CS.vueObj.kanjo_detail[i]["end_x"]=0;
						CS.vueObj.kanjo_detail[i]["end_y"]=0;
						kanjo_info_id_list.push(CS.vueObj.kanjo_detail[i]["kanjo_info_id"]);
					}
				}
			}
		}
	}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
		if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
			for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
				var item=CS.vueObj.kanjo_detail[i];
				if(item.order=='2' && parseInt(item.family,10)>=40){
					if(CS.vueObj.kanjo_detail[i]["page"]!=CS.vueObj.itask_list_show_file_list_now_imgs_index){
						$("#itask_list_show_edit_window_pana_select_square_0").css("display","none");
						CS.vueObj.kanjo_detail[i]["page"]=CS.vueObj.itask_list_show_file_list_now_imgs_index;
						CS.vueObj.kanjo_detail[i]["start_x"]=0;
						CS.vueObj.kanjo_detail[i]["start_y"]=0;
						CS.vueObj.kanjo_detail[i]["end_x"]=0;
						CS.vueObj.kanjo_detail[i]["end_y"]=0;
						kanjo_info_id_list.push(CS.vueObj.kanjo_detail[i]["kanjo_info_id"]);
					}
				}
			}
		}else{
			for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
				var item=CS.vueObj.kanjo_detail[i];
				if(i>=0 && i<=44){
					if(CS.vueObj.kanjo_detail[i]["page"]!=CS.vueObj.itask_list_show_file_list_now_imgs_index){
						$("#itask_list_show_edit_window_pana_select_square_0").css("display","none");
						CS.vueObj.kanjo_detail[i]["page"]=CS.vueObj.itask_list_show_file_list_now_imgs_index;
						CS.vueObj.kanjo_detail[i]["start_x"]=0;
						CS.vueObj.kanjo_detail[i]["start_y"]=0;
						CS.vueObj.kanjo_detail[i]["end_x"]=0;
						CS.vueObj.kanjo_detail[i]["end_y"]=0;
						kanjo_info_id_list.push(CS.vueObj.kanjo_detail[i]["kanjo_info_id"]);
					}
				}
			}
		}
	}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
		if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
			for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
				var item=CS.vueObj.kanjo_detail[i];
				if(item.order=='1' && parseInt(item.family,10)!=99999999 && parseInt(item.tabindex,10)!=4){
					if(CS.vueObj.kanjo_detail[i]["page"]!=CS.vueObj.itask_list_show_file_list_now_imgs_index){
						$("#itask_list_show_edit_window_pana_select_square_0").css("display","none");
						CS.vueObj.kanjo_detail[i]["page"]=CS.vueObj.itask_list_show_file_list_now_imgs_index;
						CS.vueObj.kanjo_detail[i]["start_x"]=0;
						CS.vueObj.kanjo_detail[i]["start_y"]=0;
						CS.vueObj.kanjo_detail[i]["end_x"]=0;
						CS.vueObj.kanjo_detail[i]["end_y"]=0;
						kanjo_info_id_list.push(CS.vueObj.kanjo_detail[i]["kanjo_info_id"]);
					}
				}
			}
		}else{
			for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
				var item=CS.vueObj.kanjo_detail[i];
				if(i==95){
					if(CS.vueObj.kanjo_detail[i]["page"]!=CS.vueObj.itask_list_show_file_list_now_imgs_index){
						$("#itask_list_show_edit_window_pana_select_square_0").css("display","none");
						CS.vueObj.kanjo_detail[i]["page"]=CS.vueObj.itask_list_show_file_list_now_imgs_index;
						CS.vueObj.kanjo_detail[i]["start_x"]=0;
						CS.vueObj.kanjo_detail[i]["start_y"]=0;
						CS.vueObj.kanjo_detail[i]["end_x"]=0;
						CS.vueObj.kanjo_detail[i]["end_y"]=0;
						kanjo_info_id_list.push(CS.vueObj.kanjo_detail[i]["kanjo_info_id"]);
					}
				}
			}
		}
	}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==4){
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			var item=CS.vueObj.kanjo_detail[i];
			if(item.order=='1' && parseInt(item.family,10)==4 && parseInt(item.tabindex,10)==4){
				if(CS.vueObj.kanjo_detail[i]["page"]!=CS.vueObj.itask_list_show_file_list_now_imgs_index){
					$("#itask_list_show_edit_window_pana_select_square_0").css("display","none");
					CS.vueObj.kanjo_detail[i]["page"]=CS.vueObj.itask_list_show_file_list_now_imgs_index;
					CS.vueObj.kanjo_detail[i]["start_x"]=0;
					CS.vueObj.kanjo_detail[i]["start_y"]=0;
					CS.vueObj.kanjo_detail[i]["end_x"]=0;
					CS.vueObj.kanjo_detail[i]["end_y"]=0;
					kanjo_info_id_list.push(CS.vueObj.kanjo_detail[i]["kanjo_info_id"]);
				}
			}
		}
	}
	var obj = {};
	//一覧CSVダウンロード１の対応
	//obj=CS.beforitasksave(obj);
	//請求書一覧を出す
	obj["itask_list_show_edit_pana_tag_button_index"] = CS.vueObj.itask_list_show_edit_pana_tag_button_index;
	obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
	obj["kanjo_info_id_list"] = kanjo_info_id_list;
	obj["itask_pages_no"] = CS.vueObj.itask_list_show_file_list_now_imgs_index;
	obj["action"] = "itask_list_show_edit_window_linkingpage";
	obj["type"] = CS.vueObj.itask_show_type;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
				CS.vueObj.i_aitask_top_info["link1"]=CS.vueObj.itask_list_show_file_list_now_imgs_index;
			}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
				CS.vueObj.i_aitask_top_info["link2"]=CS.vueObj.itask_list_show_file_list_now_imgs_index;
			}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
				CS.vueObj.i_aitask_top_info["link3"]=CS.vueObj.itask_list_show_file_list_now_imgs_index;
			}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==4){
				CS.vueObj.i_aitask_top_info["link4"]=CS.vueObj.itask_list_show_file_list_now_imgs_index;
			}
			CS.alert_error("画像紐づけできました");
		}
	});
}
CS.itask_list_show_edit_window_pana_save_batch = function(){
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		CS.itask_list_show_edit_pana_get_pre_year_kojin();
	}else{
		CS.itask_list_show_edit_pana_get_pre_year_houjin();
	}
	var obj = {};
	obj["newflag"] = "NG";
	if(CS.itask_list_show_edit_window_batch_first_aitask_id!=null){
		obj["newflag"] = "OK";
	}
	if(CS.itask_list_show_edit_window_batch_next_aitask_id==""){
		obj["getng"] = "OK";
	}else{
		obj["getng"] = "NG";
	}
	//一覧CSVダウンロード１の対応
	obj=CS.beforitasksave(obj);
	//請求書一覧を出す
	obj["itask_list_show_edit_pana_company_code"] = CS.vueObj.itask_list_show_edit_pana_company_code;
	obj["itask_list_show_edit_pana_company_name"] = CS.vueObj.itask_list_show_edit_pana_company_name;
	obj["itask_list_show_edit_pana_kesan_date"] = CS.vueObj.itask_list_show_edit_pana_kesan_date;
	obj["itask_list_show_edit_pana_status"] = CS.vueObj.itask_list_show_edit_pana_status;
	obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
	obj["kanjo_detail"] = CS.vueObj.kanjo_detail;
	obj["itask_list_show_edit_pana_delete_kanjo_id_list"] = CS.itask_list_show_edit_pana_delete_kanjo_id_list;
	obj["action"] = "itask_list_show_edit_window_pana_save_batch";
	obj["type"] = CS.vueObj.itask_show_type;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.itask_list_show_edit_window_batch_sum++;
			console.log(data["filetreename"]+"ファイルを保存できました");
			console.log(CS.itask_list_show_edit_window_batch_sum+"個ファイルを保存できました");
			if(CS.itask_list_show_edit_window_batch_next_aitask_id!=""){
				CS.itask_list_show_edit_window_batch("A");
			}else{
				console.log("the end！");
			}
		}
	});
}
CS.itask_list_show_edit_window_pana_getredlist_batch = function(){
	//if(CS.vueObj.itask_list_show_edit_pana_tag_button_red1==3 || CS.vueObj.itask_list_show_edit_pana_tag_button_red2==3 ||CS.vueObj.itask_list_show_edit_pana_tag_button_red3==3 ||CS.vueObj.itask_list_show_edit_pana_tag_button_red4==3 ){
	if(CS.vueObj.itask_list_show_edit_pana_tag_button_red2==3){
		var statusmap={};
		statusmap["0"]="精査待";
		statusmap["1"]="一次精査済";
		statusmap["2"]="精査済";
		statusmap["3"]="対象外書式";
		statusmap["4"]="不要頁削除";
		statusmap["5"]="コード違い";
		statusmap["6"]="要確認";
		
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			var kanjo_detail=CS.vueObj.kanjo_detail[i];
			if(CS.toI(kanjo_detail["family"])>=70){
				if(CS.vueObj.kanjo_detail[i]["amount_this_year"]!="" && CS.vueObj.kanjo_detail[i]["amount_this_year"]!=null && CS.vueObj.kanjo_detail[i]["konki_keisan"]!="" && CS.vueObj.kanjo_detail[i]["konki_keisan"]!=null && CS.vueObj.kanjo_detail[i]["amount_this_year"]!=CS.vueObj.kanjo_detail[i]["konki_keisan"]){
					var str=CS.itask_list_show_edit_window_file_tree_name+","+statusmap[CS.vueObj.itask_list_show_edit_pana_status];
					console.log(str);
					if(typeof CS.misslist=="undefined"){
						CS.misslist=str+"\n";
					}else{
						CS.misslist=CS.misslist+str+"\n";
					}	
					break;
				}
			}
			
		}
	}
	// for (let key in CS.itask_tool_setedmap_sub_index) {
		// console.log(CS.vueObj.itask_list_show_edit_pana_company_code+"-"+CS.vueObj.i_aitask_top_info["closing_date_date"]+"-"+CS.vueObj.itask_list_show_edit_pana_company_name+"-code:"+key);
		// if(typeof CS.misslist=="undefined"){
			// CS.misslist=CS.vueObj.itask_list_show_edit_pana_company_code+"-"+CS.vueObj.i_aitask_top_info["closing_date_date"]+"-"+CS.vueObj.itask_list_show_edit_pana_company_name+"-code:"+key+"\n";
		// }else{
			// CS.misslist=CS.misslist+CS.vueObj.itask_list_show_edit_pana_company_code+"-"+CS.vueObj.i_aitask_top_info["closing_date_date"]+"-"+CS.vueObj.itask_list_show_edit_pana_company_name+"-code:"+key+"\n";
		// }
		// break;
	// }
	CS.itask_list_show_edit_window_batch_sum++;
	if(CS.itask_list_show_edit_window_batch_next_aitask_id!=""){
		CS.itask_list_show_edit_window_batch("B");
	}else{
		console.log(CS.misslist);
		console.log("the end！");
	}
}
CS.itask_list_show_edit_window_pana_save_batch_B = function(){
	var obj = {};
	obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
	obj["action"] = "itask_list_show_edit_window_pana_save_batch_B";
	obj["type"] = CS.vueObj.itask_show_type;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.itask_list_show_edit_window_batch_sum++;
			console.log(CS.itask_list_show_edit_window_batch_sum+"ファイルを保存できました");
		}
	});
}
CS.itask_list_show_edit_window_pana_getredlist_batch_C = function(){
	if(CS.itask_list_show_edit_window_batch_sum!=0){
		if(CS.vueObj.itask_list_show_edit_pana_tag_button_red1==3){
			console.log(CS.vueObj.itask_list_show_edit_pana_company_code+"-"+CS.vueObj.i_aitask_top_info["closing_date_date"]+"-"+CS.itask_list_show_edit_window_file_tree_name+","+CS.itask_list_show_edit_window_type);
			if(typeof CS.misslist=="undefined"){
				CS.misslist=CS.vueObj.itask_list_show_edit_pana_company_code+"-"+CS.vueObj.i_aitask_top_info["closing_date_date"]+"-"+CS.itask_list_show_edit_window_file_tree_name+","+CS.itask_list_show_edit_window_type+"\n";
			}else{
				CS.misslist=CS.misslist+CS.vueObj.itask_list_show_edit_pana_company_code+"-"+CS.vueObj.i_aitask_top_info["closing_date_date"]+"-"+CS.itask_list_show_edit_window_file_tree_name+","+CS.itask_list_show_edit_window_type+"\n";
			}
		}
	}
	CS.itask_list_show_edit_window_batch_sum++;
	if(CS.itask_list_show_edit_window_batch_next_aitask_id!=""){
		CS.itask_list_show_edit_window_batch("C");
	}else{
		console.log(CS.misslist);
		console.log("the end！");
	}
}
CS.itask_list_show_edit_window_pana_save_batch_C = function(){
	var obj = {};
	//請求書一覧を出す
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		var setflag=false;
		if((CS.vueObj.kanjo_detail[i]["amount_this_year"]=="" || CS.vueObj.kanjo_detail[i]["amount_this_year"]==null) && CS.vueObj.kanjo_detail[i]["amount_this_year"]!=CS.vueObj.kanjo_detail[i]["konki_keisan"]){
			CS.vueObj.kanjo_detail[i]["amount_this_year"]=CS.vueObj.kanjo_detail[i]["konki_keisan"];
			setflag=true;
		}
		if((CS.vueObj.kanjo_detail[i]["amount_pre_year"]=="" || CS.vueObj.kanjo_detail[i]["amount_pre_year"]==null) && CS.vueObj.kanjo_detail[i]["amount_pre_year"]!=CS.vueObj.kanjo_detail[i]["zenki_keisan"]){
			CS.vueObj.kanjo_detail[i]["amount_pre_year"]=CS.vueObj.kanjo_detail[i]["zenki_keisan"];
			setflag=true;
		}
		if(setflag){
			CS.vueObj.kanjo_detail[i]["batchflag"]="OK";
			CS.vueObj.$set(CS.vueObj.kanjo_detail, i, CS.vueObj.kanjo_detail[i]);
		}
	}
	obj["itask_list_show_edit_pana_status"] = CS.vueObj.itask_list_show_edit_pana_status;
	obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
	obj["kanjo_detail"] = CS.vueObj.kanjo_detail;
	obj["action"] = "itask_list_show_edit_window_pana_save_batch_C";
	obj["type"] = CS.vueObj.itask_show_type;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.itask_list_show_edit_window_batch_sum++;
			console.log(CS.itask_list_show_edit_window_batch_sum+"ファイルを保存できました");
		}
	});
}
CS.itask_list_show_edit_window_batch = function (flag) {
	var obj = {};
	if(typeof CS.itask_list_show_edit_window_batch_next_aitask_id == "undefined"){
		CS.itask_list_show_edit_window_batch_first_aitask_id=39625;
		CS.itask_list_show_edit_window_batch_next_aitask_id=CS.itask_list_show_edit_window_batch_first_aitask_id;
		CS.itask_list_show_edit_window_batch_sum=0;
	}else{
		CS.itask_list_show_edit_window_batch_first_aitask_id=null;
	}
	CS.itask_list_show_edit_window_batch_flag=flag;
	if(flag=="A" || flag=="C" || flag=="B"){
		console.log(CS.itask_list_show_edit_window_batch_next_aitask_id+"取得中");
	}


	//請求書一覧を出す
	obj["itask_id"] = CS.itask_list_show_edit_window_batch_next_aitask_id;
	obj["action"] = "itask_list_show_edit_window_batch";
	obj["flag"] = flag;
	obj["type"] = CS.vueObj.itask_show_type;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.itask_list_show_edit_window_type=data["type"];
			CS.itask_list_show_edit_window_file_tree_name=data["file_tree_name"];
			CS.furikae_target_conf_map=data["furikae_target_conf_map"];
			CS.pl3_zenki=undefined;
			CS.itask_list_show_edit_window_ex_map=data["itask_list_show_edit_window_ex_map"];
			CS.itask_list_show_edit_window_ex_list=data["itask_list_show_edit_window_ex_list"];
			CS.vueObj.menu_sub_title="zaiTask編集";
			CS.vueObj.itask_list_show_edit_window_readonly_flag=false;
			CS.vueObj.itask_list_show_file_list_now_imgs=data["img_list"];
			CS.vueObj.itask_list_show_file_list_now_imgs_index=0;
			CS.vueObj.aitask_points_list=data["aitask_points_list"];
			CS.vueObj.itask_list_show_file_list_now_xy_deletes={};
			CS.vueObj.itask_list_show_edit_window_table_zoom=50;
			CS.vueObj.itask_list_show_edit_pana_kensan_zenki={};
			CS.vueObj.itask_list_show_edit_pana_kensan_konki={};
			CS.houjin_eazy_inputlist_base=data["houjin_eazy_inputlist_base"];
			CS.vueObj.houjin_eazy_inputlist= JSON.parse(JSON.stringify(CS.houjin_eazy_inputlist_base));
			CS.kojin_eazy_inputlist_base=data["kojin_eazy_inputlist_base"];
			CS.vueObj.kojin_eazy_inputlist= JSON.parse(JSON.stringify(CS.kojin_eazy_inputlist_base));
			CS.kojin_kani_kotei_list=data["kojin_kani_kotei_list"];
			CS.vueObj.itask_list_show_edit_pana_houjin_input_show=false;
			CS.vueObj.itask_list_show_edit_pana_kojin_input_show=false;
			CS.itask_list_show_edit_window_batch_next_aitask_id=data["next_aitask_id"];
			if(data["kanjo_detail"].length==0){
				CS.itask_list_show_edit_window_batch(CS.itask_list_show_edit_window_batch_flag);
				return;
			}
			for(var i=0;i<40;i++){
				$("#itask_list_show_edit_window_select_square"+"_"+i).css({"display": "none",
				"left":0,
				"top":0,
				"width":0,
				"height":0});
				$("#itask_list_show_edit_window_select_square_k"+"_"+i).css({"display": "none",
				"left":0,
				"top":0,
				"width":0,
				"height":0});
			}
			CS.vueObj.itask_list_show_edit_window_getfullimage_show=false;
			CS.itask_list_show_edit_window_bakimage_src=null;
			CS.vueObj.kanjo_detail=data["kanjo_detail"];
			setTimeout(function(){
				if($('#itask_list_show_edit_window_imgtank').length){
					var itask_list_show_edit_window_imgtank_off = $('#itask_list_show_edit_window_imgtank').offset();
					var windows_height=$(window).height();
					var footer_height=$("footer").height();
					$('#itask_list_show_edit_window_imgtank').height(windows_height-itask_list_show_edit_window_imgtank_off.top-footer_height-50);
					if($('#itask_list_show_edit_window_imgctl').height()>$('#itask_list_show_edit_window_imgtank').height()+$('#itask_list_show_edit_window_table').height()){
						$('#itask_list_show_edit_window_imgtank').height($('#itask_list_show_edit_window_imgctl').height()-$('#itask_list_show_edit_window_table').height());
					}
				}
			},200);
			//pana対応///////////////////////////////////////////////////////
			CS.vueObj.itask_list_show_edit_pana_seisa_over1=(data["i_aitask_top_info"]["seisa_over1"]=="OK");
			CS.vueObj.itask_list_show_edit_pana_seisa_over2=(data["i_aitask_top_info"]["seisa_over2"]=="OK");
			CS.vueObj.itask_list_show_edit_pana_seisa_over3=(data["i_aitask_top_info"]["seisa_over3"]=="OK");
			CS.vueObj.itask_list_show_edit_pana_seisa_over4=(data["i_aitask_top_info"]["seisa_over4"]=="OK");
			CS.vueObj.itask_list_show_edit_pana_senen_tani1=(data["i_aitask_top_info"]["senen_tani1"]=="OK");
			CS.vueObj.itask_list_show_edit_pana_senen_tani2=(data["i_aitask_top_info"]["senen_tani2"]=="OK");
			CS.vueObj.itask_list_show_edit_pana_senen_tani3=(data["i_aitask_top_info"]["senen_tani3"]=="OK");
			CS.vueObj.itask_list_show_edit_pana_senen_tani4=(data["i_aitask_top_info"]["senen_tani4"]=="OK");
			
			
			
			
			CS.vueObj.i_aitask_top_info=data["i_aitask_top_info"];
			CS.vueObj.itask_list_show_edit_window_itask_type=data["i_aitask_top_info"]["type"];
			if(CS.vueObj.i_aitask_top_info["new_flag"]=="OK"){
				CS.add_kanjyo_list=data["add_kanjyo_list"];
			}

			CS.vueObj.itask_list_show_edit_pana_company_code=CS.vueObj.i_aitask_top_info["company_company_code"];
			CS.vueObj.itask_list_show_edit_pana_company_name=CS.vueObj.i_aitask_top_info["m1"];
			CS.i_aitask_top_info_company_candidate= JSON.parse(CS.vueObj.i_aitask_top_info["company_candidate"]);
			// for(var i=0;i<CS.i_aitask_top_info_company_candidate.length;i++){
				// if(CS.i_aitask_top_info_company_candidate[i]["code"]==CS.vueObj.itask_list_show_edit_pana_company_code){
					//CS.vueObj.itask_list_show_edit_pana_company_name=CS.i_aitask_top_info_company_candidate[i]["name"];
				// }
			// }
			CS.vueObj.itask_list_show_edit_pana_status=CS.vueObj.i_aitask_top_info["status"];
			CS.vueObj.itask_list_show_edit_pana_kesan_date=CS.vueObj.i_aitask_top_info["closing_date_date"];
			CS.vueObj.candidate_select_list=data["candidate_select_list"];
			CS.abc_flag_map=data["abc_flag_map"];
			for(var i=0;i<CS.vueObj.candidate_select_list.length;i++){
				CS.vueObj.kanjo_detail[i]["candidate_select_list"]=CS.vueObj.candidate_select_list[i];
				CS.vueObj.candidate_select_list_showflag[i]=false;
			}
			if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
				CS.itask_list_show_edit_pana_resort_kanjo_detail();
			}
			
			
			///////////////////////////////////////////////////////////////////////////////////////
			if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf('konjin')!=-1){
				if(CS.vueObj.itask_list_show_edit_pana_seisa_over1 && CS.vueObj.itask_list_show_edit_pana_seisa_over2 && CS.vueObj.itask_list_show_edit_pana_seisa_over3){
					CS.vueObj.itask_list_show_edit_pana_seisa_over0=true;
				}else{
					CS.vueObj.itask_list_show_edit_pana_seisa_over0=false;
				}
			}else{
				if(CS.vueObj.itask_list_show_edit_pana_seisa_over1 && CS.vueObj.itask_list_show_edit_pana_seisa_over2 && CS.vueObj.itask_list_show_edit_pana_seisa_over3 && CS.vueObj.itask_list_show_edit_pana_seisa_over4){
					CS.vueObj.itask_list_show_edit_pana_seisa_over0=true;
				}else{
					CS.vueObj.itask_list_show_edit_pana_seisa_over0=false;
				}
			}
			if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf('konjin')!=-1){
				if(CS.vueObj.itask_list_show_edit_pana_senen_tani1 && CS.vueObj.itask_list_show_edit_pana_senen_tani2 && CS.vueObj.itask_list_show_edit_pana_senen_tani3){
					CS.vueObj.itask_list_show_edit_pana_senen_tani0=true;
				}else{
					CS.vueObj.itask_list_show_edit_pana_senen_tani0=false;
				}
			}else{
				if(CS.vueObj.itask_list_show_edit_pana_senen_tani1 && CS.vueObj.itask_list_show_edit_pana_senen_tani2 && CS.vueObj.itask_list_show_edit_pana_senen_tani3 && CS.vueObj.itask_list_show_edit_pana_senen_tani4){
					CS.vueObj.itask_list_show_edit_pana_senen_tani0=true;
				}else{
					CS.vueObj.itask_list_show_edit_pana_senen_tani0=false;
				}
			}
			///////////////////////////////////////////////////////////////////////////////////////
			
			setTimeout(function(){
				if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
					$("#edit_window_left").css("max-width","");
					$("#edit_window_right").css("min-width","");
				}else{
					$("#edit_window_left").css("max-width","50%");
					$("#edit_window_right").css("min-width","50%");
				}
			},100);
			CS.itask_list_show_edit_pana_delete_kanjo_id_list=[];
			CS.vueObj.itask_list_show_edit_pana_tag_button_index=1;
			CS.itask_list_show_edit_window_getcompanyinfo();
			CS.itask_list_show_edit_window_get_def_img();
			if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
				//未出力項目追加
				if(CS.vueObj.i_aitask_top_info["new_flag"]=="OK"){
					CS.itask_list_show_edit_window_kensan(5);
					CS.itask_list_show_edit_pana_resort_kanjo_detail();
				}
				CS.itask_list_show_edit_window_kensan(2);
				CS.itask_list_show_edit_window_kensan(3);
				CS.itask_list_show_edit_pana_resort_kanjo_detail();
				for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
					var setflag=false;
					if(CS.vueObj.kanjo_detail[i]["autoaddflag"] && !CS.vueObj.kanjo_detail[i]["autochangeflag"] && CS.vueObj.kanjo_detail[i]["amount_this_year"]!=CS.vueObj.kanjo_detail[i]["konki_keisan"]){
						CS.vueObj.kanjo_detail[i]["amount_this_year"]=CS.vueObj.kanjo_detail[i]["konki_keisan"];
						setflag=true;
					}
					if(CS.vueObj.kanjo_detail[i]["autoaddflag"] && !CS.vueObj.kanjo_detail[i]["autochangeflag"] && CS.vueObj.kanjo_detail[i]["amount_pre_year"]!=CS.vueObj.kanjo_detail[i]["zenki_keisan"]){
						CS.vueObj.kanjo_detail[i]["amount_pre_year"]=CS.vueObj.kanjo_detail[i]["zenki_keisan"];
						setflag=true;
					}
					if(setflag){
						CS.vueObj.$set(CS.vueObj.kanjo_detail, i, CS.vueObj.kanjo_detail[i]);
					}
				}
			}else{
				if(CS.vueObj.i_aitask_top_info["new_flag"]=="OK"){
					CS.itask_list_show_edit_window_kensan(5);
				}else{
					CS.itask_list_show_edit_window_kensan(7);
				}
				CS.itask_list_show_edit_window_kensan(2);
				CS.itask_list_show_edit_window_kensan(3);
			}
			if(CS.itask_list_show_edit_window_batch_flag=="A"){
				console.log(CS.vueObj.itask_list_show_edit_pana_company_name+"("+CS.vueObj.itask_list_show_edit_pana_company_code+")"+"["+CS.vueObj.i_aitask_top_info["closing_date_date"]+"]");
			}
			if(CS.itask_list_show_edit_window_batch_flag=="A"){
				setTimeout(CS.itask_list_show_edit_window_pana_save_batch,500);
			}else if(CS.itask_list_show_edit_window_batch_flag=="B"){
				//setTimeout(CS.itask_list_show_edit_window_pana_getredlist_batch,500);
			}else if(CS.itask_list_show_edit_window_batch_flag=="C"){
				//setTimeout(CS.itask_list_show_edit_window_pana_getredlist_batch_C,500);
			}
			
			
		}
	});
	
};
CS.itask_list_show_edit_window_del_me = function (event) {
	var obj = {};
	obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
	obj["action"] = "itask_list_show_edit_window_del_me";
	obj["type"] = CS.vueObj.itask_show_type;
	const formData = new FormData();
	formData.append('itask_id', CS.vueObj.i_aitask_top_info["itask_id"]);
	formData.append('action', 'itask_list_show_edit_window_del_me');
	formData.append('type', CS.vueObj.itask_show_type);
	const url = CS.ITASK_TOOL_URL;
	// POSTリクエストを送信
	navigator.sendBeacon(url, new URLSearchParams(formData));
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			alert(data["message"]);
		}
	});
}
CS.itask_list_show_edit_window = function (index) {
	window.removeEventListener('beforeunload', CS.itask_list_show_edit_window_del_me);
	window.addEventListener("beforeunload", CS.itask_list_show_edit_window_del_me);	
	CS.itask_list_show_edit_window_get_me_index=index;
	var d = new Date();
	var obj = {};
	obj["itask_id"] = CS.vueObj.itask_list_show_file_list_now[index]["itask_id"];
	obj["action"] = "itask_list_show_edit_window_get_me";
	obj["type"] = CS.vueObj.itask_show_type;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL+d.getTime(),
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			alert(data["message"]);
		} else {
			CS.itask_list_show_edit_window_do(CS.itask_list_show_edit_window_get_me_index);
		}
	});
}
CS.itask_list_show_edit_window_do = function (index) {
	CS.vueObj.itask_list_show_edit_aitask_name=CS.vueObj.itask_list_show_file_list_now[index].file_tree_name;
	CS.vueObj.itask_edit_old_info=new Object();
	for(var i=0;i<140;i++){
		if(typeof CS.vueObj.itask_list_show_file_list_now[index]["n"+i] !="undefined" && CS.vueObj.itask_list_show_file_list_now[index]["n"+i]!=null){
			CS.vueObj.itask_edit_old_info["n"+i]=CS.vueObj.itask_list_show_file_list_now[index]["n"+i];
		}
		CS.vueObj.itask_list_show_file_list_now[index]["editingn"+i]=false;
		CS.vueObj.itask_list_show_file_list_now[index]["showxyn"+i]=false;
	}
	CS.vueObj.itask_list_show_edit_index=index;
	CS.vueObj.itask_list_show_edit_window_flag=true;
	CS.vueObj.itask_list_show_edit_pana_status=0;
	CS.vueObj.itask_list_show_edit_pana_status_list=[];
	CS.vueObj.itask_list_show_edit_pana_status_list[0]={};
	CS.vueObj.itask_list_show_edit_pana_status_list[0]["code"]=0;
	CS.vueObj.itask_list_show_edit_pana_status_list[0]["name"]="精査待";
	CS.vueObj.itask_list_show_edit_pana_status_list[1]={};
	CS.vueObj.itask_list_show_edit_pana_status_list[1]["code"]=1;
	CS.vueObj.itask_list_show_edit_pana_status_list[1]["name"]="一次精査済";
	CS.vueObj.itask_list_show_edit_pana_status_list[2]={};
	CS.vueObj.itask_list_show_edit_pana_status_list[2]["code"]=2;
	CS.vueObj.itask_list_show_edit_pana_status_list[2]["name"]="精査済";
	CS.vueObj.itask_list_show_edit_pana_status_list[3]={};
	CS.vueObj.itask_list_show_edit_pana_status_list[3]["code"]=3;
	CS.vueObj.itask_list_show_edit_pana_status_list[3]["name"]="対象外書式";
	CS.vueObj.itask_list_show_edit_pana_status_list[4]={};
	CS.vueObj.itask_list_show_edit_pana_status_list[4]["code"]=4;
	CS.vueObj.itask_list_show_edit_pana_status_list[4]["name"]="不要頁削除";
	CS.vueObj.itask_list_show_edit_pana_status_list[5]={};
	CS.vueObj.itask_list_show_edit_pana_status_list[5]["code"]=5;
	CS.vueObj.itask_list_show_edit_pana_status_list[5]["name"]="コード違い";
	CS.vueObj.itask_list_show_edit_pana_status_list[6]={};
	CS.vueObj.itask_list_show_edit_pana_status_list[6]["code"]=6;
	CS.vueObj.itask_list_show_edit_pana_status_list[6]["name"]="要確認";
	CS.vueObj.itask_list_show_edit_window_kensan0=false;
	CS.vueObj.itask_list_show_edit_window_kensan1=false;
	var obj = {};
	//請求書一覧を出す
	obj["itask_id"] = CS.vueObj.itask_list_show_file_list_now[index]["itask_id"];
	obj["action"] = "itask_list_show_edit_window";
	obj["type"] = CS.vueObj.itask_show_type;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.furikae_target_conf_map=data["furikae_target_conf_map"];
			CS.vueObj.itask_list_show_edit_window_tool_show=false;
			CS.vueObj.itask_list_show_edit_pana_text_mousedown_flag=false;
			document.removeEventListener("selectstart", CS.itask_list_show_edit_pana_text_preventSelection);
			CS.pl3_zenki=undefined;
			CS.itask_list_show_edit_window_ex_map=data["itask_list_show_edit_window_ex_map"];
			CS.itask_list_show_edit_window_ex_list=data["itask_list_show_edit_window_ex_list"];
			CS.vueObj.menu_sub_title="zaiTask編集";
			CS.vueObj.itask_list_show_edit_window_readonly_flag=false;
			CS.vueObj.itask_list_show_file_list_now_imgs=data["img_list"];
			CS.vueObj.itask_list_show_file_list_now_imgs_index=0;
			CS.vueObj.aitask_points_list=data["aitask_points_list"];
			CS.vueObj.itask_list_show_file_list_now_xy_deletes={};
			CS.vueObj.itask_list_show_edit_window_table_zoom=50;
			CS.vueObj.itask_list_show_edit_pana_kensan_zenki={};
			CS.vueObj.itask_list_show_edit_pana_kensan_konki={};
			CS.houjin_eazy_inputlist_base=data["houjin_eazy_inputlist_base"];
			CS.vueObj.houjin_eazy_inputlist= JSON.parse(JSON.stringify(CS.houjin_eazy_inputlist_base));
			CS.kojin_eazy_inputlist_base=data["kojin_eazy_inputlist_base"];
			CS.vueObj.kojin_eazy_inputlist= JSON.parse(JSON.stringify(CS.kojin_eazy_inputlist_base));
			CS.kojin_kani_kotei_list=data["kojin_kani_kotei_list"];
			CS.vueObj.itask_list_show_edit_pana_houjin_input_show=false;
			CS.vueObj.itask_list_show_edit_pana_kojin_input_show=false;
			for(var i=0;i<40;i++){
				$("#itask_list_show_edit_window_select_square"+"_"+i).css({"display": "none",
				"left":0,
				"top":0,
				"width":0,
				"height":0});
				$("#itask_list_show_edit_window_select_square_k"+"_"+i).css({"display": "none",
				"left":0,
				"top":0,
				"width":0,
				"height":0});
			}
			CS.vueObj.itask_list_show_edit_window_getfullimage_show=false;
			CS.vueObj.kanjo_detail=data["kanjo_detail"];
			setTimeout(function(){
				if($('#itask_list_show_edit_window_imgtank').length){
					var itask_list_show_edit_window_imgtank_off = $('#itask_list_show_edit_window_imgtank').offset();
					var windows_height=$(window).height();
					var footer_height=$("footer").height();
					$('#itask_list_show_edit_window_imgtank').height(windows_height-itask_list_show_edit_window_imgtank_off.top-footer_height-50);
					if($('#itask_list_show_edit_window_imgctl').height()>$('#itask_list_show_edit_window_imgtank').height()+$('#itask_list_show_edit_window_table').height()){
						$('#itask_list_show_edit_window_imgtank').height($('#itask_list_show_edit_window_imgctl').height()-$('#itask_list_show_edit_window_table').height());
					}
				}
			},200);
			//pana対応///////////////////////////////////////////////////////
			CS.vueObj.itask_list_show_edit_pana_seisa_over1=(data["i_aitask_top_info"]["seisa_over1"]=="OK");
			CS.vueObj.itask_list_show_edit_pana_seisa_over2=(data["i_aitask_top_info"]["seisa_over2"]=="OK");
			CS.vueObj.itask_list_show_edit_pana_seisa_over3=(data["i_aitask_top_info"]["seisa_over3"]=="OK");
			CS.vueObj.itask_list_show_edit_pana_seisa_over4=(data["i_aitask_top_info"]["seisa_over4"]=="OK");
			CS.vueObj.itask_list_show_edit_pana_senen_tani1=(data["i_aitask_top_info"]["senen_tani1"]=="OK");
			CS.vueObj.itask_list_show_edit_pana_senen_tani2=(data["i_aitask_top_info"]["senen_tani2"]=="OK");
			CS.vueObj.itask_list_show_edit_pana_senen_tani3=(data["i_aitask_top_info"]["senen_tani3"]=="OK");
			CS.vueObj.itask_list_show_edit_pana_senen_tani4=(data["i_aitask_top_info"]["senen_tani4"]=="OK");
			CS.vueObj.itask_list_show_edit_window_memo=data["i_aitask_top_info"]["memo"];
			
			
			
			CS.vueObj.i_aitask_top_info=data["i_aitask_top_info"];
			CS.vueObj.itask_list_show_edit_window_itask_type=data["i_aitask_top_info"]["type"];
			if(CS.vueObj.i_aitask_top_info["new_flag"]=="OK"){
				CS.add_kanjyo_list=data["add_kanjyo_list"];
			}
			CS.vueObj.itask_list_show_edit_pana_company_code=CS.vueObj.i_aitask_top_info["company_company_code"];
			CS.vueObj.itask_list_show_edit_pana_company_name=CS.vueObj.i_aitask_top_info["m1"];
			CS.i_aitask_top_info_company_candidate= JSON.parse(CS.vueObj.i_aitask_top_info["company_candidate"]);
			// for(var i=0;i<CS.i_aitask_top_info_company_candidate.length;i++){
				// if(CS.i_aitask_top_info_company_candidate[i]["code"]==CS.vueObj.itask_list_show_edit_pana_company_code){
					//CS.vueObj.itask_list_show_edit_pana_company_name=CS.i_aitask_top_info_company_candidate[i]["name"];
				// }
			// }
			CS.vueObj.itask_list_show_edit_pana_status=CS.vueObj.i_aitask_top_info["status"];
			CS.vueObj.itask_list_show_edit_pana_kesan_date=CS.vueObj.i_aitask_top_info["closing_date_date"];
			CS.vueObj.candidate_select_list=data["candidate_select_list"];
			CS.abc_flag_map=data["abc_flag_map"];
			for(var i=0;i<CS.vueObj.candidate_select_list.length;i++){
				CS.vueObj.kanjo_detail[i]["candidate_select_list"]=CS.vueObj.candidate_select_list[i];
				CS.vueObj.candidate_select_list_showflag[i]=false;
			}
			if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
				CS.itask_list_show_edit_pana_resort_kanjo_detail();
			}
			
			
			///////////////////////////////////////////////////////////////////////////////////////
			if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf('konjin')!=-1){
				if(CS.vueObj.itask_list_show_edit_pana_seisa_over1 && CS.vueObj.itask_list_show_edit_pana_seisa_over2 && CS.vueObj.itask_list_show_edit_pana_seisa_over3){
					CS.vueObj.itask_list_show_edit_pana_seisa_over0=true;
				}else{
					CS.vueObj.itask_list_show_edit_pana_seisa_over0=false;
				}
			}else{
				if(CS.vueObj.itask_list_show_edit_pana_seisa_over1 && CS.vueObj.itask_list_show_edit_pana_seisa_over2 && CS.vueObj.itask_list_show_edit_pana_seisa_over3 && CS.vueObj.itask_list_show_edit_pana_seisa_over4){
					CS.vueObj.itask_list_show_edit_pana_seisa_over0=true;
				}else{
					CS.vueObj.itask_list_show_edit_pana_seisa_over0=false;
				}
			}
			if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf('konjin')!=-1){
				if(CS.vueObj.itask_list_show_edit_pana_senen_tani1 && CS.vueObj.itask_list_show_edit_pana_senen_tani2 && CS.vueObj.itask_list_show_edit_pana_senen_tani3){
					CS.vueObj.itask_list_show_edit_pana_senen_tani0=true;
				}else{
					CS.vueObj.itask_list_show_edit_pana_senen_tani0=false;
				}
			}else{
				if(CS.vueObj.itask_list_show_edit_pana_senen_tani1 && CS.vueObj.itask_list_show_edit_pana_senen_tani2 && CS.vueObj.itask_list_show_edit_pana_senen_tani3 && CS.vueObj.itask_list_show_edit_pana_senen_tani4){
					CS.vueObj.itask_list_show_edit_pana_senen_tani0=true;
				}else{
					CS.vueObj.itask_list_show_edit_pana_senen_tani0=false;
				}
			}
			///////////////////////////////////////////////////////////////////////////////////////
			
			setTimeout(function(){
				if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
					$("#edit_window_left").css("max-width","");
					$("#edit_window_right").css("min-width","");
				}else{
					$("#edit_window_left").css("max-width","50%");
					$("#edit_window_right").css("min-width","50%");
				}
			},100);
			CS.itask_list_show_edit_pana_delete_kanjo_id_list=[];
			CS.vueObj.itask_list_show_edit_pana_tag_button_index=1;
			CS.itask_list_show_edit_window_getcompanyinfo();
			CS.itask_list_show_edit_window_get_def_img();
			
			CS.itask_list_show_edit_window_map_add_list=[];
			CS.itask_list_show_edit_window_map_add_list_xy=[];
			CS.vueObj.itask_list_show_edit_window_map_flag=-1;
			CS.vueObj.itask_list_show_edit_window_map_step="A";

			if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
				//未出力項目追加
				if(CS.vueObj.i_aitask_top_info["new_flag"]=="OK"){
					CS.itask_list_show_edit_window_kensan(5);
					CS.itask_list_show_edit_pana_resort_kanjo_detail();
				}
				CS.itask_list_show_edit_window_kensan(2);
				CS.itask_list_show_edit_window_kensan(3);
				CS.itask_list_show_edit_pana_resort_kanjo_detail();
				for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
					var setflag=false;
					if(CS.vueObj.kanjo_detail[i]["autoaddflag"] && !CS.vueObj.kanjo_detail[i]["autochangeflag"] && CS.vueObj.kanjo_detail[i]["amount_this_year"]!=CS.vueObj.kanjo_detail[i]["konki_keisan"]){
						CS.vueObj.kanjo_detail[i]["amount_this_year"]=CS.vueObj.kanjo_detail[i]["konki_keisan"];
						setflag=true;
					}
					if(CS.vueObj.kanjo_detail[i]["autoaddflag"] && !CS.vueObj.kanjo_detail[i]["autochangeflag"] && CS.vueObj.kanjo_detail[i]["amount_pre_year"]!=CS.vueObj.kanjo_detail[i]["zenki_keisan"]){
						CS.vueObj.kanjo_detail[i]["amount_pre_year"]=CS.vueObj.kanjo_detail[i]["zenki_keisan"];
						setflag=true;
					}
					if(setflag){
						CS.vueObj.$set(CS.vueObj.kanjo_detail, i, CS.vueObj.kanjo_detail[i]);
					}
				}
			}else{
				if(CS.vueObj.i_aitask_top_info["new_flag"]=="OK"){
					CS.itask_list_show_edit_window_kensan(5);
				}else{
					CS.itask_list_show_edit_window_kensan(7);
				}
				CS.itask_list_show_edit_window_kensan(2);
				CS.itask_list_show_edit_window_kensan(3);
			}
			if(typeof CS.itask_list_show_edit_window_set_me_time!="undefined"){
				clearInterval(CS.itask_list_show_edit_window_set_me_time);
			}
			CS.itask_list_show_edit_window_set_me();
			CS.itask_list_show_edit_window_set_me_time=setInterval(CS.itask_list_show_edit_window_set_me, 10000);
		}
	});
	
};
CS.itask_list_show_edit_window_getadditems = function(m_kanjo_code){
	var o=CS.add_kanjyo_list[m_kanjo_code];
	var addkanjyo={};
	if(typeof o=="undefined"){
		return null;
	}
	addkanjyo["amount_pre_year"]=o["amount_pre_year"];
	addkanjyo["amount_this_year"]=o["amount_this_year"];
	addkanjyo["candidate_list"]=o["candidate_list"];
	addkanjyo["end_x"]=o["end_x"];
	addkanjyo["end_y"]=o["end_y"];
	addkanjyo["family"]=o["family"];
	addkanjyo["family_name"]=o["family_name"];
	addkanjyo["genus"]=o["genus"];
	addkanjyo["genus_name"]=o["genus_name"];
	addkanjyo["autoaddflag"]=o["autoaddflag"];
	addkanjyo["m_kanjo_code"]=o["m_kanjo_code"];
	addkanjyo["m_kanjo_id"]=o["m_kanjo_id"];
	addkanjyo["order"]=o["order"];
	addkanjyo["page"]=o["page"];
	addkanjyo["property"]=o["property"];
	addkanjyo["sort"]=o["sort"];
	addkanjyo["species"]=o["species"];
	addkanjyo["species_name"]=o["species_name"];
	addkanjyo["start_x"]=o["start_x"];
	addkanjyo["start_y"]=o["start_y"];
	addkanjyo["kenzankaijyo"]=false;
	if(o.order=='2' && parseInt(o.family,10)<40){
		addkanjyo["tabindex"]=1;
	}else if(o.order=='2' && parseInt(o.family,10)>=40){
		addkanjyo["tabindex"]=2;
	}else if(o.order=='1'){
		addkanjyo["tabindex"]=3;
	}
	
	addkanjyo["variety"]=o["variety"];
	addkanjyo["variety_name"]=o["variety_name"];
	return addkanjyo;
}
CS.itask_list_show_edit_window_getaddobjlist = function(add_m_kanjo_code,px,addobjlist,setedmap_index,amountname){
	if("1_4_0_0_-3"==add_m_kanjo_code){
		if(px!="" && (typeof setedmap_index["1_4_0_0"] == "undefined" || setedmap_index["1_4_0_0"] == null)){
			var addobjlist_index=null;
			for(var i=0;i<addobjlist.length;i++){
				if(addobjlist[i]["m_kanjo_code"]=="1_4_0_0_-3"){
					addobjlist_index=i;
				}
			}
			if(addobjlist_index==null){
				var addobj={};
				addobj["m_kanjo_code"]="1_4_0_0_-3";
				addobj=CS.itask_list_show_edit_window_getadditems(addobj["m_kanjo_code"]);
				if(addobj!=null){
					addobj[amountname]=px.toLocaleString();
					if(amountname=="konki_keisan"){
						addobj["amount_this_year"]=px.toLocaleString();
					}else if(amountname=="zenki_keisan"){
						addobj["amount_pre_year"]=px.toLocaleString();
					}
					addobjlist.push(addobj);
				}
			}else{
				addobjlist[addobjlist_index][amountname]=px.toLocaleString();
				if(amountname=="konki_keisan"){
					addobjlist[addobjlist_index]["amount_this_year"]=px.toLocaleString();
				}else if(amountname=="zenki_keisan"){
					addobjlist[addobjlist_index]["amount_pre_year"]=px.toLocaleString();
				}
			}
		}
	}else if("1_4_0_0"==add_m_kanjo_code){
		if(px!="" && typeof setedmap_index[add_m_kanjo_code+"_s"] == "undefined" && setedmap_index[add_m_kanjo_code+"_s"] == null){
			var addobjlist_index=null;
			for(var i=0;i<addobjlist.length;i++){
				if(addobjlist[i]["m_kanjo_code"]==add_m_kanjo_code+"_0"){
					addobjlist_index=i;
				}
			}
			if(addobjlist_index==null){
				var addobj={};
				addobj["m_kanjo_code"]=add_m_kanjo_code+"_0";
				addobj=CS.itask_list_show_edit_window_getadditems(addobj["m_kanjo_code"]);
				if(addobj!=null){
					addobj[amountname]=px.toLocaleString();
					if(amountname=="konki_keisan"){
						addobj["amount_this_year"]=px.toLocaleString();
					}else if(amountname=="zenki_keisan"){
						addobj["amount_pre_year"]=px.toLocaleString();
					}
					addobjlist.push(addobj);
				}
			}else{
				addobjlist[addobjlist_index][amountname]=px.toLocaleString();
				if(amountname=="konki_keisan"){
					addobjlist[addobjlist_index]["amount_this_year"]=px.toLocaleString();
				}else if(amountname=="zenki_keisan"){
					addobjlist[addobjlist_index]["amount_pre_year"]=px.toLocaleString();
				}
			}
		}
	}else{
		if(px!="" && typeof setedmap_index[add_m_kanjo_code] == "undefined" && setedmap_index[add_m_kanjo_code] == null){
			var weihao="_0";
			if(add_m_kanjo_code=="1_2_2_0"){
				weihao="_-1";
			}
			var addobjlist_index=null;
			for(var i=0;i<addobjlist.length;i++){
				if(addobjlist[i]["m_kanjo_code"]==add_m_kanjo_code+weihao){
					addobjlist_index=i;
				}
			}
			if(addobjlist_index==null){
				var addobj={};
				addobj["m_kanjo_code"]=add_m_kanjo_code+weihao;
				addobj=CS.itask_list_show_edit_window_getadditems(addobj["m_kanjo_code"]);
				if(addobj!=null){
					addobj[amountname]=px.toLocaleString();
					if(amountname=="konki_keisan"){
						addobj["amount_this_year"]=px.toLocaleString();
					}else if(amountname=="zenki_keisan"){
						addobj["amount_pre_year"]=px.toLocaleString();
					}
					addobjlist.push(addobj);
				}
			}else{
				addobjlist[addobjlist_index][amountname]=px.toLocaleString();
				if(amountname=="konki_keisan"){
					addobjlist[addobjlist_index]["amount_this_year"]=px.toLocaleString();
				}else if(amountname=="zenki_keisan"){
					addobjlist[addobjlist_index]["amount_pre_year"]=px.toLocaleString();
				}
			}
		}
	}
	return addobjlist;
}

CS.itask_list_show_edit_window_getcompanyinfo = function(){
	var obj = {};
	//請求書一覧を出す
	obj["company_code"] = CS.vueObj.itask_list_show_edit_pana_company_code;
	obj["action"] = "itask_list_show_edit_window_getcompanyinfo";
	obj["type"] = CS.vueObj.itask_show_type;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: true,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.vueObj.i_aitask_top_info["m2"]=data["m2"];
			CS.vueObj.i_aitask_top_info["m3"]=data["m3"];
			CS.vueObj.i_aitask_top_info["m4"]=data["m4"];
			CS.vueObj.i_aitask_top_info["m5"]=data["m5"];
			CS.vueObj.i_aitask_top_info["m6"]=data["m6"];
		}
	});
}
CS.candidate_select_list_click = function(index){
	
}
CS.itask_list_show_edit_pana_edit_text = function(flag,index){
	for(var i=0;i<this.kanjo_detail.length;i++){
		if(index!=i && (CS.vueObj.kanjo_detail[i].edit0 || CS.vueObj.kanjo_detail[i].edit1)){
			CS.vueObj.kanjo_detail[i].edit0=false;
			CS.vueObj.kanjo_detail[i].edit1=false;
			CS.vueObj.$set(CS.vueObj.kanjo_detail, i, CS.vueObj.kanjo_detail[i]);
		}
		if(index==i && (flag==0 && CS.vueObj.kanjo_detail[i].edit1)){
			CS.vueObj.kanjo_detail[index].edit1=false;
		}
		if(index==i && (flag==1 && CS.vueObj.kanjo_detail[i].edit0)){
			CS.vueObj.kanjo_detail[index].edit0=false;
		}
	}
	if(flag==0){
		if(typeof CS.vueObj.kanjo_detail[index].edit0 != "undefined" && CS.vueObj.kanjo_detail[index].edit0){
			//CS.vueObj.kanjo_detail[index].edit0=false;
		}else{
			CS.vueObj.kanjo_detail[index].edit0=true;
			if(CS.vueObj.kanjo_detail[index].abc_flag){
				CS.vueObj.kanjo_detail[index].amount_pre_year_abc=(-1*parseInt(CS.vueObj.kanjo_detail[index].amount_pre_year.replaceAll(',', ''),10)).toLocaleString();
				if(CS.vueObj.kanjo_detail[index].amount_pre_year_abc=="NaN"){CS.vueObj.kanjo_detail[index].amount_pre_year_abc="";}
				CS.itask_list_show_edit_pana_input_name="itask_list_show_edit_pana_input0_abc_"+index;
				if(typeof CS.kanri_itask_kanjo_loading!="undefined" && CS.kanri_itask_kanjo_loading){
					CS.kanri_itask_kanjo_loading=false;
					setTimeout(function(){
						$("#"+CS.itask_list_show_edit_pana_input_name).get(0).type = 'password';
						$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
						$("#"+CS.itask_list_show_edit_pana_input_name).prop("autocomplete","off");
						$("#"+CS.itask_list_show_edit_pana_input_name).prop("name",CS.itask_list_show_edit_pana_input_name);
						$("#"+CS.itask_list_show_edit_pana_input_name).css("text-align","right");
						$("#"+CS.itask_list_show_edit_pana_input_name).css("color","white");
						//$("#"+CS.itask_list_show_edit_pana_input_name).focus();
					},100);
					setTimeout(function(){
						if(typeof $("#"+CS.itask_list_show_edit_pana_input_name).get(0) !="undefined"){
							$("#"+CS.itask_list_show_edit_pana_input_name).get(0).type = 'text';
						}
						$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
						$("#"+CS.itask_list_show_edit_pana_input_name).css("color","black");
						$("#"+CS.itask_list_show_edit_pana_input_name).focus();
					},400);
				}else{
					setTimeout(function(){
						$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
						$("#"+CS.itask_list_show_edit_pana_input_name).css("color","black");
						$("#"+CS.itask_list_show_edit_pana_input_name).focus();
					},100);
				}
			}else{
				CS.itask_list_show_edit_pana_input_name="itask_list_show_edit_pana_input0_"+index;
				if(typeof CS.kanri_itask_kanjo_loading!="undefined" && CS.kanri_itask_kanjo_loading){
					CS.kanri_itask_kanjo_loading=false;
					setTimeout(function(){
						$("#"+CS.itask_list_show_edit_pana_input_name).get(0).type = 'password';
						$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
						$("#"+CS.itask_list_show_edit_pana_input_name).prop("autocomplete","off");
						$("#"+CS.itask_list_show_edit_pana_input_name).prop("name",CS.itask_list_show_edit_pana_input_name);
						$("#"+CS.itask_list_show_edit_pana_input_name).css("text-align","right");
						$("#"+CS.itask_list_show_edit_pana_input_name).css("color","white");
						//$("#"+CS.itask_list_show_edit_pana_input_name).focus();
					},100);
					setTimeout(function(){
						if(typeof $("#"+CS.itask_list_show_edit_pana_input_name).get(0) !="undefined"){
							$("#"+CS.itask_list_show_edit_pana_input_name).get(0).type = 'text';
						}
						$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
						$("#"+CS.itask_list_show_edit_pana_input_name).css("color","black");
						$("#"+CS.itask_list_show_edit_pana_input_name).focus();
					},400);
				}else{
					setTimeout(function(){
						$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
						$("#"+CS.itask_list_show_edit_pana_input_name).css("color","black");
						$("#"+CS.itask_list_show_edit_pana_input_name).focus();
					},100);
				}
			}
		}
	}else{
		if(typeof CS.vueObj.kanjo_detail[index].edit1 != "undefined" && CS.vueObj.kanjo_detail[index].edit1){
			//CS.vueObj.kanjo_detail[index].edit1=false;
		}else{
			CS.vueObj.kanjo_detail[index].edit1=true;
			if(CS.vueObj.kanjo_detail[index].abc_flag){
				CS.itask_list_show_edit_pana_input_name="itask_list_show_edit_pana_input1_abc_"+index;
				CS.vueObj.kanjo_detail[index].amount_this_year_abc=(-1*parseInt(CS.vueObj.kanjo_detail[index].amount_this_year.replaceAll(',', ''),10)).toLocaleString();
				if(CS.vueObj.kanjo_detail[index].amount_this_year_abc=="NaN"){CS.vueObj.kanjo_detail[index].amount_this_year_abc="";}
				if(typeof CS.kanri_itask_kanjo_loading!="undefined" && CS.kanri_itask_kanjo_loading){
					CS.kanri_itask_kanjo_loading=false;
					setTimeout(function(){
						$("#"+CS.itask_list_show_edit_pana_input_name).get(0).type = 'password';
						$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
						$("#"+CS.itask_list_show_edit_pana_input_name).prop("autocomplete","off");
						$("#"+CS.itask_list_show_edit_pana_input_name).prop("name",CS.itask_list_show_edit_pana_input_name);
						$("#"+CS.itask_list_show_edit_pana_input_name).css("text-align","right");
						$("#"+CS.itask_list_show_edit_pana_input_name).css("color","white");
						//$("#"+CS.itask_list_show_edit_pana_input_name).focus();
					},100);
					setTimeout(function(){
						if(typeof $("#"+CS.itask_list_show_edit_pana_input_name).get(0) !="undefined"){
							$("#"+CS.itask_list_show_edit_pana_input_name).get(0).type = 'text';
						}
						$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
						$("#"+CS.itask_list_show_edit_pana_input_name).css("color","black");
						$("#"+CS.itask_list_show_edit_pana_input_name).focus();
					},400);
				}else{
					setTimeout(function(){
						$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
						$("#"+CS.itask_list_show_edit_pana_input_name).css("color","black");
						$("#"+CS.itask_list_show_edit_pana_input_name).focus();
					},100);
				}
			}else{
				CS.itask_list_show_edit_pana_input_name="itask_list_show_edit_pana_input1_"+index;
				if(typeof CS.kanri_itask_kanjo_loading!="undefined" && CS.kanri_itask_kanjo_loading){
					CS.kanri_itask_kanjo_loading=false;
					setTimeout(function(){
						$("#"+CS.itask_list_show_edit_pana_input_name).get(0).type = 'password';
						$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
						$("#"+CS.itask_list_show_edit_pana_input_name).prop("autocomplete","off");
						$("#"+CS.itask_list_show_edit_pana_input_name).prop("name",CS.itask_list_show_edit_pana_input_name);
						$("#"+CS.itask_list_show_edit_pana_input_name).css("text-align","right");
						$("#"+CS.itask_list_show_edit_pana_input_name).css("color","white");
						//$("#"+CS.itask_list_show_edit_pana_input_name).focus();
					},100);
					setTimeout(function(){
						if(typeof $("#"+CS.itask_list_show_edit_pana_input_name).get(0) !="undefined"){
							$("#"+CS.itask_list_show_edit_pana_input_name).get(0).type = 'text';
						}
						$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
						$("#"+CS.itask_list_show_edit_pana_input_name).css("color","black");
						$("#"+CS.itask_list_show_edit_pana_input_name).focus();
					},400);
				}else{
					setTimeout(function(){
						$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
						$("#"+CS.itask_list_show_edit_pana_input_name).css("color","black");
						$("#"+CS.itask_list_show_edit_pana_input_name).focus();
					},100);
				}
			}

		}
	}
	this.$set(CS.vueObj.kanjo_detail, index, CS.vueObj.kanjo_detail[index]);
	CS.itask_list_show_edit_pana_text_clearcorlor();
}

CS.itask_list_show_edit_pana_edit_change = function(model,index){
	for(var i=0;i<this.kanjo_detail.length;i++){
		if(index!=i && (CS.vueObj.kanjo_detail[i].edit0 || CS.vueObj.kanjo_detail[i].edit1)){
			CS.vueObj.kanjo_detail[index].edit0=false;
			CS.vueObj.kanjo_detail[index].edit1=false;
			CS.vueObj.$set(CS.vueObj.kanjo_detail, i, CS.vueObj.kanjo_detail[i]);
		}
		if(index==i && (model==0 && CS.vueObj.kanjo_detail[i].edit1)){
			CS.vueObj.kanjo_detail[index].edit1=false;
		}
		if(index==i && (model==1 && CS.vueObj.kanjo_detail[i].edit0)){
			CS.vueObj.kanjo_detail[index].edit0=false;
		}
	}
	CS.vueObj.kanjo_detail[index].changeflag=true;
	if(model==0){
		if (CS.vueObj.kanjo_detail[index]["abc_flag"]) {
			var src = normalizeNumberString(CS.vueObj.kanjo_detail[index]["amount_pre_year_abc"]);
			if (src === "-" || src === "" || isNaN(src)) {
				CS.vueObj.kanjo_detail[index]["amount_pre_year"] = "";
			} else {
				CS.vueObj.kanjo_detail[index]["amount_pre_year"] = (-1 * parseInt(src, 10)).toLocaleString();
			}
		}
		//var o=CS.vueObj.kanjo_detail[index]["amount_pre_year"].replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);});
		var o=normalizeNumberString(CS.vueObj.kanjo_detail[index]["amount_pre_year"]);
		o=o.replaceAll(",", '');
		if(!isNaN(o) && o!=""){
			CS.vueObj.kanjo_detail[index]["amount_pre_year"]=Number(o).toLocaleString();
		}else{
			CS.vueObj.kanjo_detail[index]["amount_pre_year"]="";
		}
		CS.vueObj.kanjo_detail[index].edit0=false;
	}else{
		if (CS.vueObj.kanjo_detail[index]["abc_flag"]) {
			var src = normalizeNumberString(CS.vueObj.kanjo_detail[index]["amount_this_year_abc"]);
			if (src === "-" || src === "" || isNaN(src)) {
				CS.vueObj.kanjo_detail[index]["amount_this_year"] = "";
			} else {
				CS.vueObj.kanjo_detail[index]["amount_this_year"] = (-1 * parseInt(src, 10)).toLocaleString();
			}
		}
		//var o=CS.vueObj.kanjo_detail[index]["amount_this_year"].replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);});
		var o=normalizeNumberString(CS.vueObj.kanjo_detail[index]["amount_this_year"]);
		o=o.replaceAll(",", '');
		if(!isNaN(o) && o!=""){
			CS.vueObj.kanjo_detail[index]["amount_this_year"]=Number(o).toLocaleString();
		}else{
			CS.vueObj.kanjo_detail[index]["amount_this_year"]="";
		}
		CS.vueObj.kanjo_detail[index].edit1=false;
	}
	CS.vueObj.$set(CS.vueObj.kanjo_detail, index, CS.vueObj.kanjo_detail[index]);
	if(CS.itask_list_show_edit_pana_edit_keydown_tab){
		return;
	}
	CS.itask_list_show_edit_window_kensan(4);
}
CS.candidate_select_list_dbclick = function(index){
	if(this.kanjo_detail[index]["kotei"].indexOf('kotei')!=-1){return;}
	if(CS.vueObj.kanjo_detail[index].candidate_select_list==null){
		CS.vueObj.kanjo_detail[index].candidate_select_list=[];
	}
	CS.candidate_select_list_dbclick_m_kanjo_code=this.kanjo_detail[index]["m_kanjo_code"];
	CS.candidate_select_list_dbclick_m_kanjo_id=this.kanjo_detail[index]["m_kanjo_id"];
	CS.vueObj.kanjo_detail[index].candidate_select_list_showflag=true;
	CS.vueObj.$set(CS.vueObj.kanjo_detail, index, CS.vueObj.kanjo_detail[index]);
	//this.$set(this.candidate_select_list_showflag, index, true);
}
CS.itask_list_show_edit_window_change_kaijyo_checkbox = function(index){
	CS.vueObj.kanjo_detail[index].changeflag=true;
	CS.itask_list_show_edit_window_kensan(4);
}
CS.itask_list_show_edit_window_change_goukei_checkbox = function(index){
	if(CS.vueObj.kanjo_detail[index].koteiitem=="OK"){
		CS.vueObj.kanjo_detail[index].koteiitem="NG";
		CS.vueObj.kanjo_detail[index]["koteiitemflag"]=false;
	}else if(CS.vueObj.kanjo_detail[index].koteiitem=="NG"){
		CS.vueObj.kanjo_detail[index].koteiitem="OK";
		CS.vueObj.kanjo_detail[index]["koteiitemflag"]=true;
	}else if(CS.vueObj.kanjo_detail[index]["variety"]<=0){
		CS.vueObj.kanjo_detail[index].koteiitem="NG";
		CS.vueObj.kanjo_detail[index]["koteiitemflag"]=false;
	}else{
		CS.vueObj.kanjo_detail[index].koteiitem="OK";
		CS.vueObj.kanjo_detail[index]["koteiitemflag"]=true;
	}
	
	CS.vueObj.kanjo_detail[index].changeflag=true;
	CS.itask_list_show_edit_window_kensan(4);
}
CS.candidate_select_list_kanjopop = function(index){
	CS.itask_list_show_edit_window_kanjo_index=index;
	CS.kanjo_detail_add_index=undefined;
	CS.itask_list_show_edit_window_kanjo_genus=CS.vueObj.kanjo_detail[CS.itask_list_show_edit_window_kanjo_index]["genus"];
	CS.itask_list_show_edit_window_kanjo_family=CS.vueObj.kanjo_detail[CS.itask_list_show_edit_window_kanjo_index]["family"];
	CS.kanri_itask_kanjo_show(CS.vueObj.itask_list_show_edit_pana_tag_button_index,CS.vueObj.kanri_itask_show_type,null);
}
CS.clear_kanjokamoku = function(index){
	CS.vueObj.kanjo_detail[index]["genus"];
	CS.vueObj.kanjo_detail[index]["m_kanjo_code"]="2_999_0_0_0";
	CS.vueObj.kanjo_detail[index]["order"]="2";
	CS.vueObj.kanjo_detail[index]["m_kanjo_id"]="2_999_0_0_0";
	CS.vueObj.kanjo_detail[index]["family"]="999";
	CS.vueObj.kanjo_detail[index]["family_name"]="その他";
	CS.vueObj.kanjo_detail[index]["genus"]="0";
	CS.vueObj.kanjo_detail[index]["genus_name"]="その他";
	CS.vueObj.kanjo_detail[index]["species"]="0";
	CS.vueObj.kanjo_detail[index]["species_name"]="その他";
	CS.vueObj.kanjo_detail[index]["variety"]="0";
	CS.vueObj.kanjo_detail[index]["variety_name"]="＿＿＿";
	CS.vueObj.kanjo_detail[index]["property"]="1";
	CS.vueObj.kanjo_detail[index]["abc_flag"]=false;
	CS.vueObj.kanjo_detail[index]["kenzankaijyo"]=false;
	CS.vueObj.kanjo_detail[index]["koteiitem"]="NN";
	CS.vueObj.kanjo_detail[index]["kanjo"]="";
	CS.itask_list_show_edit_window_kensan(4);
}
CS.ime_mode_inactive=function(e){
	e.target.style.imeMode="inactive";
	e.target.inputmode="inactive";
	console.log(e.target.id);
}
CS.itask_list_show_edit_pana_houjin_input = function(){
	if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
		var okflag=window.confirm("簡易入力した内容を廃棄しますか？");
		if(!okflag){
			return;
		}
		CS.vueObj.itask_list_show_edit_pana_kojin_input_show=false;
		CS.vueObj.itask_list_show_edit_pana_houjin_input_show=false;
		CS.itask_list_show_edit_window_kanjo_eazyinput_index=undefined;
		CS.itask_list_show_edit_window_kensan(4);
	}else{
		if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf('konjin')!=-1){
			CS.vueObj.itask_list_show_edit_pana_kojin_input_show=true;
		}else{
			CS.vueObj.itask_list_show_edit_pana_houjin_input_show=true;
		}
		CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index=CS.vueObj.itask_list_show_edit_pana_tag_button_index;
		if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf('konjin')!=-1){
			setTimeout(CS.itask_list_show_edit_pana_kojin_input_init, 100);
		}else{
			setTimeout(CS.itask_list_show_edit_pana_houjin_input_init, 100);
		}
		
		CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red1=2;
		CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red2=2;
		CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red3=2;
		CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red4=2;
		if(typeof CS.itask_list_show_edit_pana_eazyinput_timer=="undefined"){
			CS.itask_list_show_edit_pana_eazyinput_timer=setInterval(
				function(){
					if((CS.vueObj.itask_list_show_edit_window_itask_type.indexOf('konjin')==-1 && !CS.vueObj.itask_list_show_edit_pana_houjin_input_show) ||
						(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf('konjin')!=-1 && !CS.vueObj.itask_list_show_edit_pana_kojin_input_show)){
						clearInterval(CS.itask_list_show_edit_pana_eazyinput_timer);
						CS.itask_list_show_edit_pana_eazyinput_timer=undefined;
					}else{
						var si=$("#spreadsheet1 input");
						for(var i=0;i<si.length;i++){
							if(typeof si[i].mask!="undefined"){
								si[i].removeEventListener('focus',CS.ime_mode_inactive , false);
								si[i].addEventListener('focus',CS.ime_mode_inactive , false);
								si[i].style.imeMode="inactive";
								si[i].inputmode="inactive";
								// ★ 追加: 全角→半角の自動変換を入れる
								// 変換中は触らないため composition を考慮
								if (!si[i].__halfwidthBound) {
								let composing = false;
								const normalizeNow = (el) => {
										const before = el.value;
										const after  = normalizeNumberString(before);
										if (after !== before) {
										el.value = after;
										// jSpreadsheet にも変更を伝える
										el.dispatchEvent(new Event('input', { bubbles: true }));
										el.dispatchEvent(new Event('change', { bubbles: true }));
										}
									};
									si[i].addEventListener('compositionstart', () => { composing = true; }, true);
									si[i].addEventListener('compositionend',   (e) => { composing = false; normalizeNow(e.target); }, true);
									si[i].addEventListener('input',   (e) => { if (!composing) normalizeNow(e.target); }, true);
									si[i].addEventListener('blur',    (e) => { normalizeNow(e.target); }, true);
									si[i].__halfwidthBound = true; // 二重バインド防止
								}
								CS.itask_list_show_edit_pana_hk_input_id=("itask_list_show_edit_pana_hk_input"+performance.now()).replaceAll('.', '');
								if((si[i].style.color==null || si[i].style.color=="") && (typeof CS.kanri_itask_kanjo_loading!="undefined" && CS.kanri_itask_kanjo_loading)){
									CS.kanri_itask_kanjo_loading=false;
									
									si[i].id=CS.itask_list_show_edit_pana_hk_input_id;
									si[i].style.color="black";
									setTimeout(function(){
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0).type = 'password';
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("width","90%");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).prop("autocomplete","off");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).prop("name",CS.itask_list_show_edit_pana_hk_input_id);
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("text-align","right");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("color","white");
									},100);
									setTimeout(function(){
										if(typeof $("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0) !="undefined"){
											$("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0).type = 'text';
										}
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("width","90%");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("color","black");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).focus();
									},400);
								}else{
									setTimeout(function(){
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("width","90%");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("color","black");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).focus();
									},100);
								}
							}
						}
						si=$("#spreadsheet2 input");
						for(var i=0;i<si.length;i++){
							if(typeof si[i].mask!="undefined"){
								si[i].removeEventListener('focus',CS.ime_mode_inactive , false);
								si[i].addEventListener('focus',CS.ime_mode_inactive , false);
								si[i].style.imeMode="inactive";
								si[i].inputmode="inactive";
								// ★ 追加: 全角→半角の自動変換を入れる
								// 変換中は触らないため composition を考慮
								if (!si[i].__halfwidthBound) {
								let composing = false;
								const normalizeNow = (el) => {
										const before = el.value;
										const after  = normalizeNumberString(before);
										if (after !== before) {
										el.value = after;
										// jSpreadsheet にも変更を伝える
										el.dispatchEvent(new Event('input', { bubbles: true }));
										el.dispatchEvent(new Event('change', { bubbles: true }));
										}
									};
									si[i].addEventListener('compositionstart', () => { composing = true; }, true);
									si[i].addEventListener('compositionend',   (e) => { composing = false; normalizeNow(e.target); }, true);
									si[i].addEventListener('input',   (e) => { if (!composing) normalizeNow(e.target); }, true);
									si[i].addEventListener('blur',    (e) => { normalizeNow(e.target); }, true);
									si[i].__halfwidthBound = true; // 二重バインド防止
								}
								CS.itask_list_show_edit_pana_hk_input_id=("itask_list_show_edit_pana_hk_input"+performance.now()).replaceAll('.', '');
								if((si[i].style.color==null || si[i].style.color=="") && (typeof CS.kanri_itask_kanjo_loading!="undefined" && CS.kanri_itask_kanjo_loading)){
									CS.kanri_itask_kanjo_loading=false;
									si[i].id=CS.itask_list_show_edit_pana_hk_input_id;
									si[i].style.color="black";
									setTimeout(function(){
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0).type = 'password';
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("width","90%");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).prop("autocomplete","off");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).prop("name",CS.itask_list_show_edit_pana_hk_input_id);
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("text-align","right");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("color","white");
									},100);
									setTimeout(function(){
										if(typeof $("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0) !="undefined"){
											$("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0).type = 'text';
										}
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("width","90%");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("color","black");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).focus();
									},400);
								}else{
									setTimeout(function(){
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("width","90%");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("color","black");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).focus();
									},100);
								}
							}
						}
						si=$("#spreadsheet3 input");
						for(var i=0;i<si.length;i++){
							if(typeof si[i].mask!="undefined"){
								si[i].removeEventListener('focus',CS.ime_mode_inactive , false);
								si[i].addEventListener('focus',CS.ime_mode_inactive , false);
								si[i].style.imeMode="inactive";
								si[i].inputmode="inactive";
								// ★ 追加: 全角→半角の自動変換を入れる
								// 変換中は触らないため composition を考慮
								if (!si[i].__halfwidthBound) {
								let composing = false;
								const normalizeNow = (el) => {
										const before = el.value;
										const after  = normalizeNumberString(before);
										if (after !== before) {
										el.value = after;
										// jSpreadsheet にも変更を伝える
										el.dispatchEvent(new Event('input', { bubbles: true }));
										el.dispatchEvent(new Event('change', { bubbles: true }));
										}
									};
									si[i].addEventListener('compositionstart', () => { composing = true; }, true);
									si[i].addEventListener('compositionend',   (e) => { composing = false; normalizeNow(e.target); }, true);
									si[i].addEventListener('input',   (e) => { if (!composing) normalizeNow(e.target); }, true);
									si[i].addEventListener('blur',    (e) => { normalizeNow(e.target); }, true);
									si[i].__halfwidthBound = true; // 二重バインド防止
								}
								CS.itask_list_show_edit_pana_hk_input_id=("itask_list_show_edit_pana_hk_input"+performance.now()).replaceAll('.', '');
								if((si[i].style.color==null || si[i].style.color=="") && (typeof CS.kanri_itask_kanjo_loading!="undefined" && CS.kanri_itask_kanjo_loading)){
									CS.kanri_itask_kanjo_loading=false;
									si[i].id=CS.itask_list_show_edit_pana_hk_input_id;
									si[i].style.color="black";
									setTimeout(function(){
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0).type = 'password';
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("width","90%");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).prop("autocomplete","off");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).prop("name",CS.itask_list_show_edit_pana_hk_input_id);
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("text-align","right");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("color","white");
									},100);
									setTimeout(function(){
										if(typeof $("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0) !="undefined"){
											$("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0).type = 'text';
										}
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("width","90%");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("color","black");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).focus();
									},400);
								}else{
									setTimeout(function(){
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("width","90%");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("color","black");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).focus();
									},100);
								}
							}
						}
					}
				},500
			);
		}

	}
}
CS.itask_list_show_edit_pana_houjin_input_save = function(){
	if(typeof CS.itask_list_show_edit_window_pana_save_retry=="undefined" || !CS.itask_list_show_edit_window_pana_save_retry){
		var okflag=window.confirm("簡易入力した内容を保存しますか？\n保存すると元画面の内容がクリアされます。");
		if(!okflag){
			return;
		}
		for (var i=CS.vueObj.kanjo_detail.length-1; i>-1;i--){
			if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.kanjo_detail[i]["tabindex"]){
				CS.vueObj.kanjo_detail.splice( i, 1 );
			}
			
		}
		CS.vueObj.itask_list_show_edit_pana_houjin_input_show=false;
		CS.itask_list_show_edit_window_kanjo_eazyinput_index=undefined;
		var sdata=CS.spreadsheet1.getData();
		for(var i=0;i<CS.vueObj.houjin_eazy_inputlist.length;i++){
			for(var j=0;j<sdata.length;j++){
				if(sdata[j][8]==i){
					CS.vueObj.houjin_eazy_inputlist[i]["amount_pre_year"]=sdata[j][4];
					CS.vueObj.houjin_eazy_inputlist[i]["amount_this_year"]=sdata[j][6];
					CS.vueObj.houjin_eazy_inputlist[i]["addflag"]=true;
				}
			}
		}
		for (var i=0;i<CS.vueObj.houjin_eazy_inputlist.length;i++){
			if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.houjin_eazy_inputlist[i]["tabindex"]){
				CS.vueObj.kanjo_detail.push(CS.vueObj.houjin_eazy_inputlist[i]);
			}
		}
		for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
			if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.kanjo_detail[i]["tabindex"]){
				continue;
			}
			for (var j=CS.vueObj.houjin_eazy_inputlist.length-1;j>-1;j--){
				if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.houjin_eazy_inputlist[j]["tabindex"]){
					if(typeof CS.vueObj.kanjo_detail[i]["kanjo_info_id"] != "undefined" && CS.vueObj.kanjo_detail[i]["kanjo_info_id"]!="" && CS.vueObj.kanjo_detail[i]["kanjo_info_id"]!=null){
						if(CS.vueObj.kanjo_detail[i]["m_kanjo_code"]==CS.vueObj.houjin_eazy_inputlist[j]["m_kanjo_code"]){
							CS.itask_list_show_edit_pana_delete_kanjo_id_list.push(CS.vueObj.kanjo_detail[i]["kanjo_info_id"]);
							CS.vueObj.kanjo_detail.splice( i, 1 );
						}
					}
				}
			}
		}
		CS.vueObj.kanjo_detail= JSON.parse(JSON.stringify(CS.vueObj.kanjo_detail));
		for (var i=CS.vueObj.kanjo_detail.length-1; i>-1;i--){
			if("2_999_0_0_0"==CS.vueObj.kanjo_detail[i]["m_kanjo_code"]){
				CS.vueObj.kanjo_detail.splice( i, 1 );
			}
			
		}
	}



	var obj = {};
	if(CS.itask_list_show_edit_window_pana_save_retry){
		obj["itask_list_show_edit_window_pana_save_retry"] = "OK";
	}
	obj["itask_list_show_edit_pana_company_code"] = CS.vueObj.itask_list_show_edit_pana_company_code;
	obj["itask_list_show_edit_pana_company_name"] = CS.vueObj.itask_list_show_edit_pana_company_name;
	obj["itask_list_show_edit_pana_kesan_date"] = CS.vueObj.itask_list_show_edit_pana_kesan_date;
	obj["itask_list_show_edit_pana_status"] = CS.vueObj.itask_list_show_edit_pana_status;
	obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
	obj["delete_tabindex"] = CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index;
	obj["kanjo_detail"] = CS.vueObj.kanjo_detail;
	obj["itask_list_show_edit_pana_delete_kanjo_id_list"] = CS.itask_list_show_edit_pana_delete_kanjo_id_list;
	obj["action"] = "itask_list_show_edit_window_pana_save";
	obj["type"] = CS.vueObj.itask_show_type;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {
		alert("通信エラーが発生しました。\n一覧画面に戻ります。\nデータを保存できなかった可能性があります。\n再度保存しますか？");
		CS.itask_list_show_edit_window_pana_save_retry=true;
		CS.itask_list_show_edit_pana_houjin_input_save();
	}).done(function (data) {
		if(CS.itask_list_show_edit_window_pana_save_retry){
			CS.itask_list_show_edit_window_pana_save_retry=false;
			CS.vueObj.menu_sub_title="";
			CS.vueObj.itask_list_show_edit_window_flag=false;
			CS.menu_itask_refresh();
			return;
		}
		// 成功処理
		if (data["status"] != "OK") {
			alert("通信エラーが発生しました。\n一覧画面に戻ります。\nデータを保存できなかった可能性があります。\n再度保存しますか？");
			CS.itask_list_show_edit_window_pana_save_retry=true;
			CS.itask_list_show_edit_pana_houjin_input_save();
		} else {
			var m_kanjo_id_map=data["m_kanjo_id_map"];
			for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
				if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index!=CS.vueObj.kanjo_detail[i]["tabindex"]){
					continue;
				}
				CS.vueObj.kanjo_detail[i]["kanjo_info_id"]=m_kanjo_id_map[CS.vueObj.kanjo_detail[i]["m_kanjo_id"]];
				delete CS.vueObj.kanjo_detail[i]["addflag"];
			}
			CS.itask_list_show_edit_window_kensan(4);
			CS.itask_list_show_edit_window_change_tab(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index);
			
		}
	});
}
CS.itask_list_show_edit_pana_kojin_input_save = function(){
	if(typeof CS.itask_list_show_edit_window_pana_save_retry=="undefined" || !CS.itask_list_show_edit_window_pana_save_retry){
		var okflag=window.confirm("簡易入力した内容を保存しますか？\n保存すると元画面の内容がクリアされます。");
		if(!okflag){
			return;
		}

		for (var i=CS.vueObj.kanjo_detail.length-1; i>-1;i--){
			if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.kanjo_detail[i]["tabindex"]){
				//CS.vueObj.kanjo_detail.splice( i, 1 );
			}
			
		}
		CS.vueObj.itask_list_show_edit_pana_kojin_input_show=false;
		CS.itask_list_show_edit_window_kanjo_eazyinput_index=undefined;
		//左側データを取り込む
		var sdata=CS.spreadsheet2.getData();
		for(var i=0;i<CS.vueObj.kojin_eazy_inputlist.length;i++){
			for(var j=0;j<sdata.length;j++){
				if(sdata[j][3]==i){
					CS.vueObj.kojin_eazy_inputlist[i]["amount_pre_year"]="";
					CS.vueObj.kojin_eazy_inputlist[i]["amount_this_year"]=sdata[j][1];
					CS.vueObj.kojin_eazy_inputlist[i]["addflag"]=true;
				}
			}
		}
		if(typeof CS.spreadsheet3!="undefined"){
			var sdata2=CS.spreadsheet3.getData();
			for(var i=0;i<CS.vueObj.kojin_eazy_inputlist.length;i++){
				for(var j=0;j<sdata2.length;j++){
					if(sdata2[j][3]==i){
						CS.vueObj.kojin_eazy_inputlist[i]["amount_pre_year"]="";
						CS.vueObj.kojin_eazy_inputlist[i]["amount_this_year"]=sdata2[j][1];
						CS.vueObj.kojin_eazy_inputlist[i]["addflag"]=true;
					}
				}
			}
		}
		var deleteflag=true;
		if(CS.vueObj.kanjo_detail.length<96){
			deleteflag=false;
			//CS.vueObj.kanjo_detail.splice(0);
			for (var i=0;i<CS.vueObj.kojin_eazy_inputlist.length;i++){
					var tepobj={};
					tepobj["amount_this_year"]=CS.vueObj.kojin_eazy_inputlist[i]["amount_this_year"];
					tepobj["amount_pre_year"]="";
					tepobj["konki_keisan"]="";
					tepobj["zenki_keisan"]="";
					tepobj["m_kanjo_id"]=CS.vueObj.kojin_eazy_inputlist[i]["m_kanjo_id"];
					tepobj["order"]=CS.vueObj.kojin_eazy_inputlist[i]["order"];
					tepobj["family"]=CS.vueObj.kojin_eazy_inputlist[i]["family"];
					tepobj["genus"]=CS.vueObj.kojin_eazy_inputlist[i]["genus"];
					tepobj["variety"]=CS.vueObj.kojin_eazy_inputlist[i]["variety"];
					tepobj["variety_name"]=CS.vueObj.kojin_eazy_inputlist[i]["variety_name"];
					tepobj["m_kanjo_code"]=CS.vueObj.kojin_eazy_inputlist[i]["m_kanjo_code"];
					tepobj["start_y"]=0;
					tepobj["start_x"]=0;
					tepobj["end_x"]=0;
					tepobj["end_y"]=0;
					tepobj["page"]=-1;
					tepobj["changeflag"]=true;
					tepobj["kenzankaijyo"]=false;
					tepobj["addflag"]=true;
					if((i>=45 && i<=60) || (i>=68 && i<=75) || i==83 || i>=91 || i<=23 || (i>=30 && i<=33) || (i>=36 && i<=38) || (i>=41 && i<=44)){
						tepobj["kotei"]="kotei"
					}else{
						tepobj["kotei"]=""
					}
					if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index!=tepobj["addflag"]){
						tepobj["amount_this_year"]="";
					}
					if(i>=45 && i<=94){
						tepobj["tabindex"]=1;
					}else if(i>=0 && i<=44){
						tepobj["tabindex"]=2;
					}else if(i==95){
						tepobj["tabindex"]=3;
					}
					if(typeof CS.vueObj.kanjo_detail[i] !="undefined"){
						delete tepobj["addflag"];
						CS.vueObj.kanjo_detail[i]=tepobj;
					}else{
						CS.vueObj.kanjo_detail[i]=tepobj;
					}
			}
		}
		for (var i=0;i<CS.vueObj.kojin_eazy_inputlist.length;i++){
			if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.kojin_eazy_inputlist[i]["tabindex"]){
				if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==1){
					CS.vueObj.kanjo_detail[i]["amount_this_year"]=CS.vueObj.kojin_eazy_inputlist[i]["amount_this_year"];
					CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=CS.vueObj.kojin_eazy_inputlist[i]["m_kanjo_id"];
					CS.vueObj.kanjo_detail[i]["order"]=CS.vueObj.kojin_eazy_inputlist[i]["order"];
					CS.vueObj.kanjo_detail[i]["family"]=CS.vueObj.kojin_eazy_inputlist[i]["family"];
					CS.vueObj.kanjo_detail[i]["genus"]=CS.vueObj.kojin_eazy_inputlist[i]["genus"];
					CS.vueObj.kanjo_detail[i]["variety"]=CS.vueObj.kojin_eazy_inputlist[i]["variety"];
					CS.vueObj.kanjo_detail[i]["variety_name"]=CS.vueObj.kojin_eazy_inputlist[i]["variety_name"];
					CS.vueObj.kanjo_detail[i]["m_kanjo_code"]=CS.vueObj.kojin_eazy_inputlist[i]["m_kanjo_code"];
					CS.vueObj.kanjo_detail[i]["start_y"]=0;
					CS.vueObj.kanjo_detail[i]["start_x"]=0;
					CS.vueObj.kanjo_detail[i]["end_x"]=0;
					CS.vueObj.kanjo_detail[i]["end_y"]=0;
					CS.vueObj.kanjo_detail[i]["page"]=-1;
					CS.vueObj.kanjo_detail[i]["changeflag"]=true;
					CS.vueObj.kanjo_detail[i]["kenzankaijyo"]=false;
					if(deleteflag){
						delete CS.vueObj.kanjo_detail[i]["addflag"];
					}
				}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==2){
					CS.vueObj.kanjo_detail[i]["amount_this_year"]=CS.vueObj.kojin_eazy_inputlist[i]["amount_this_year"];
					CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=CS.vueObj.kojin_eazy_inputlist[i]["m_kanjo_id"];
					CS.vueObj.kanjo_detail[i]["order"]=CS.vueObj.kojin_eazy_inputlist[i]["order"];
					CS.vueObj.kanjo_detail[i]["family"]=CS.vueObj.kojin_eazy_inputlist[i]["family"];
					CS.vueObj.kanjo_detail[i]["genus"]=CS.vueObj.kojin_eazy_inputlist[i]["genus"];
					CS.vueObj.kanjo_detail[i]["variety"]=CS.vueObj.kojin_eazy_inputlist[i]["variety"];
					CS.vueObj.kanjo_detail[i]["variety_name"]=CS.vueObj.kojin_eazy_inputlist[i]["variety_name"];
					CS.vueObj.kanjo_detail[i]["m_kanjo_code"]=CS.vueObj.kojin_eazy_inputlist[i]["m_kanjo_code"];
					CS.vueObj.kanjo_detail[i]["start_y"]=0;
					CS.vueObj.kanjo_detail[i]["start_x"]=0;
					CS.vueObj.kanjo_detail[i]["end_x"]=0;
					CS.vueObj.kanjo_detail[i]["end_y"]=0;
					CS.vueObj.kanjo_detail[i]["page"]=-1;
					CS.vueObj.kanjo_detail[i]["changeflag"]=true;
					CS.vueObj.kanjo_detail[i]["kenzankaijyo"]=false;
					if(deleteflag){
						delete CS.vueObj.kanjo_detail[i]["addflag"];
					}
				}else{
					CS.vueObj.kanjo_detail[i]["amount_this_year"]=CS.vueObj.kojin_eazy_inputlist[i]["amount_this_year"];
					CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=CS.vueObj.kojin_eazy_inputlist[i]["m_kanjo_id"];
					CS.vueObj.kanjo_detail[i]["order"]=CS.vueObj.kojin_eazy_inputlist[i]["order"];
					CS.vueObj.kanjo_detail[i]["family"]=CS.vueObj.kojin_eazy_inputlist[i]["family"];
					CS.vueObj.kanjo_detail[i]["genus"]=CS.vueObj.kojin_eazy_inputlist[i]["genus"];
					CS.vueObj.kanjo_detail[i]["variety"]=CS.vueObj.kojin_eazy_inputlist[i]["variety"];
					CS.vueObj.kanjo_detail[i]["variety_name"]=CS.vueObj.kojin_eazy_inputlist[i]["variety_name"];
					CS.vueObj.kanjo_detail[i]["m_kanjo_code"]=CS.vueObj.kojin_eazy_inputlist[i]["m_kanjo_code"];
					CS.vueObj.kanjo_detail[i]["start_y"]=0;
					CS.vueObj.kanjo_detail[i]["start_x"]=0;
					CS.vueObj.kanjo_detail[i]["end_x"]=0;
					CS.vueObj.kanjo_detail[i]["end_y"]=0;
					CS.vueObj.kanjo_detail[i]["page"]=-1;
					CS.vueObj.kanjo_detail[i]["changeflag"]=true;
					CS.vueObj.kanjo_detail[i]["kenzankaijyo"]=false;
					if(deleteflag){
						delete CS.vueObj.kanjo_detail[i]["addflag"];
					}
				}
			}
		}
		for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
			if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.kanjo_detail[i]["tabindex"]){
				continue;
			}
			for (var j=CS.vueObj.kojin_eazy_inputlist.length-1;j>-1;j--){
				if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.kojin_eazy_inputlist[j]["tabindex"]){
					if(typeof CS.vueObj.kanjo_detail[i]["kanjo_info_id"] != "undefined" && CS.vueObj.kanjo_detail[i]["kanjo_info_id"]!="" && CS.vueObj.kanjo_detail[i]["kanjo_info_id"]!=null){
						if(CS.vueObj.kanjo_detail[i]["m_kanjo_code"]==CS.vueObj.kojin_eazy_inputlist[j]["m_kanjo_code"]){
							//CS.itask_list_show_edit_pana_delete_kanjo_id_list.push(CS.vueObj.kanjo_detail[i]["kanjo_info_id"]);
							//CS.vueObj.kanjo_detail.splice( i, 1 );
						}
					}
				}
			}
		}
		CS.vueObj.kanjo_detail= JSON.parse(JSON.stringify(CS.vueObj.kanjo_detail));
		for (var i=CS.vueObj.kanjo_detail.length-1; i>-1;i--){
			if(i>=45 && i<=94){
				CS.vueObj.kanjo_detail[i]["tabindex"]=1;
			}else if(i>=0 && i<=44){
				CS.vueObj.kanjo_detail[i]["tabindex"]=2;
			}else if(i==95){
				CS.vueObj.kanjo_detail[i]["tabindex"]=3;
			}
		}
	}

	var obj = {};
	if(CS.itask_list_show_edit_window_pana_save_retry){
		obj["itask_list_show_edit_window_pana_save_retry"] = "OK";
	}
	obj["itask_list_show_edit_pana_company_code"] = CS.vueObj.itask_list_show_edit_pana_company_code;
	obj["itask_list_show_edit_pana_company_name"] = CS.vueObj.itask_list_show_edit_pana_company_name;
	obj["itask_list_show_edit_pana_kesan_date"] = CS.vueObj.itask_list_show_edit_pana_kesan_date;
	obj["itask_list_show_edit_pana_status"] = CS.vueObj.itask_list_show_edit_pana_status;
	obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
	//obj["delete_tabindex"] = CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index;
	obj["kanjo_detail"] = CS.vueObj.kanjo_detail;
	obj["itask_list_show_edit_pana_delete_kanjo_id_list"] = CS.itask_list_show_edit_pana_delete_kanjo_id_list;
	obj["action"] = "itask_list_show_edit_window_pana_save";
	obj["type"] = CS.vueObj.itask_show_type;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {
		alert("通信エラーが発生しました。\n一覧画面に戻ります。\nデータを保存できなかった可能性があります。\n再度保存しますか？");
		CS.itask_list_show_edit_window_pana_save_retry=true;
		CS.itask_list_show_edit_pana_kojin_input_save();
	}).done(function (data) {
		if(CS.itask_list_show_edit_window_pana_save_retry){
			CS.itask_list_show_edit_window_pana_save_retry=false;
			CS.vueObj.menu_sub_title="";
			CS.vueObj.itask_list_show_edit_window_flag=false;
			CS.menu_itask_refresh();
			return;
		}
		// 成功処理
		if (data["status"] != "OK") {
			alert("通信エラーが発生しました。\n一覧画面に戻ります。\nデータを保存できなかった可能性があります。\n再度保存しますか？");
			CS.itask_list_show_edit_window_pana_save_retry=true;
			CS.itask_list_show_edit_pana_kojin_input_save();
		} else {
			for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
				delete CS.vueObj.kanjo_detail[i]["changeflag"];
				delete CS.vueObj.kanjo_detail[i]["addflag"];
				if(typeof data["m_kanjo_id_map_eazy"][i] != "undefined"){
					CS.vueObj.kanjo_detail[i]["kanjo_info_id"]=data["m_kanjo_id_map_eazy"][i];
				}
			}
			CS.itask_list_show_edit_window_kensan(4);
			CS.itask_list_show_edit_window_change_tab(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index);
			
		}
	});
}
CS.aitask_eazyinput_spreadsheet_keydown1=function(event){
	if (event.key === 'Tab') {
		event.preventDefault(); // デフォルト動作を無効化
		const currentRow = CS.aitask_eazyinput_spreadsheet_selectedCell.row; // 現在の行
		const currentCol = CS.aitask_eazyinput_spreadsheet_selectedCell.col-1; // 現在の列
		const nextRow = currentRow + 1; // 下の行に移動
		const totalRows = CS.spreadsheet1.options.data.length; // 総行数

		// 範囲内であれば移動
		if (nextRow < totalRows) {
			CS.spreadsheet1.updateSelectionFromCoords(currentCol, nextRow, currentCol, nextRow); // 次のセルをアクティブにする
			CS.aitask_eazyinput_spreadsheet_selectedCell.row = nextRow; // 現在の位置を更新
		} else {
			console.log('これ以上下に移動できません');
		}
	}
}
CS.aitask_eazyinput_spreadsheet_selectedCell = { row: 0, col: 0 };
CS.aitask_eazyinput_spreadsheet_keydown2=function(event){
	if (event.key === 'Tab') {
		event.preventDefault(); // デフォルト動作を無効化
		const currentRow = CS.aitask_eazyinput_spreadsheet_selectedCell.row; // 現在の行
		const currentCol = CS.aitask_eazyinput_spreadsheet_selectedCell.col-1; // 現在の列
		const nextRow = currentRow + 1; // 下の行に移動
		const totalRows = CS.spreadsheet2.options.data.length; // 総行数

		// 範囲内であれば移動
		if (nextRow < totalRows) {
			CS.spreadsheet2.updateSelectionFromCoords(currentCol, nextRow, currentCol, nextRow); // 次のセルをアクティブにする
			CS.aitask_eazyinput_spreadsheet_selectedCell.row = nextRow; // 現在の位置を更新
			//CS.spreadsheet2.openEditor(CS.spreadsheet2.records[nextRow][currentCol]);
		} else {
			console.log('これ以上下に移動できません');
		}
	}
}
CS.aitask_eazyinput_spreadsheet_keydown3=function(event){
	if (event.key === 'Tab') {
		event.preventDefault(); // デフォルト動作を無効化
		const currentRow = CS.aitask_eazyinput_spreadsheet_selectedCell.row; // 現在の行
		const currentCol = CS.aitask_eazyinput_spreadsheet_selectedCell.col-1; // 現在の列
		const nextRow = currentRow + 1; // 下の行に移動
		const totalRows = CS.spreadsheet3.options.data.length; // 総行数

		// 範囲内であれば移動
		if (nextRow < totalRows) {
			CS.spreadsheet3.updateSelectionFromCoords(currentCol, nextRow, currentCol, nextRow); // 次のセルをアクティブにする
			CS.aitask_eazyinput_spreadsheet_selectedCell.row = nextRow; // 現在の位置を更新
			//CS.spreadsheet3.openEditor(CS.spreadsheet3.records[nextRow][currentCol]);
		} else {
			console.log('これ以上下に移動できません');
		}
	}
}
CS.itask_list_show_edit_pana_kojin_input_init = function(){
	CS.itask_list_show_edit_pana_kojin_input_show_not_ex=true;
	CS.data=[];
	CS.data2=[];
	CS.vueObj.kojin_eazy_inputlist= JSON.parse(JSON.stringify(CS.kojin_eazy_inputlist_base));
	var o=0;
	for(var i=0;i<CS.vueObj.kojin_eazy_inputlist.length;i++){
		CS.vueObj.kojin_eazy_inputlist[i]["amount_pre_year"]="";
		CS.vueObj.kojin_eazy_inputlist[i]["zenki_keisan"]="";
		CS.vueObj.kojin_eazy_inputlist[i]["amount_this_year"]="";
		CS.vueObj.kojin_eazy_inputlist[i]["konki_keisan"]="";
		tmpobj={};
		if(CS.vueObj.kojin_eazy_inputlist[i]["m_kanjo_code"]=="2_999_0_0_0"){
			tmpobj["property"]=CS.vueObj.kojin_eazy_inputlist[i]["property"];
			tmpobj["variety"]=CS.toI(CS.vueObj.kojin_eazy_inputlist[i]["variety"]);
		}else{
			tmpobj["property"]=CS.vueObj.kojin_eazy_inputlist[i]["property"];
			tmpobj["variety"]=CS.toI(CS.vueObj.kojin_eazy_inputlist[i]["variety"]);
		}
		tmpobj["variety_name"]=CS.vueObj.kojin_eazy_inputlist[i]["variety_name"];
		tmpobj["index"]=i;
		tmpobj["amount_this_year"]="";
		tmpobj["konki_keisan"]="";
		if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.kojin_eazy_inputlist[i]["tabindex"]){
			if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==1){
				if(o<25){
					CS.data.push(tmpobj);
				}else{
					CS.data2.push(tmpobj);
				}
			}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==2){
				if(o<16){
					CS.data.push(tmpobj);
				}else{
					CS.data2.push(tmpobj);
				}
			}else{
				CS.data.push(tmpobj);
			}
			o++;
		}
	}
	CS.columns=[
			{
				type:'text',
				width:'80',
				name:'variety_name',
				title:'勘定科目',
				readOnly: true,
			},
			{
				type:'numeric',
				width:'120',
				name:'amount_this_year',
				title:'今期',
				mask:'#,##'
			},
			{
				type:'numeric',
				width:'120',
				name:'konki_keisan',
				title:'検算',
				mask:'#,##',
				readOnly: true,
			},
			{
				type:'hidden',
				width:'80',
				name:'index',
				title:'コード',
			},
			{
				type:'hidden',
				width:'80',
				name:'property',
				title:'property',
			},
			{
				type:'hidden',
				width:'80',
				name:'variety',
				title:'variety',
			},
		];
	CS.contextMenu=function(obj, x, y, e, items, section) {
         var items = [];
         if (y == null) {
         } else {
			// Copy
			items.push({
				title: T('コピー'),
				shortcut: 'Ctrl + C',
				onclick: function() {
					obj.copy(true);
				}
			});
	 
			// Paste
			if (navigator && navigator.clipboard && navigator.clipboard.readText) {
				items.push({
					title: T('貼り付け'),
					shortcut: 'Ctrl + V',
					onclick: function() {
						if (obj.selectedCell) {
							navigator.clipboard.readText().then(function(text) {
								if (text) {
									obj.paste(obj.selectedCell[0], obj.selectedCell[1], text);
								}
							});
						}
					}
				});
			}
         }
		CS.eazyinputY=(e.y-275)+window.scrollY+"px";
		CS.eazyinputX=e.x+"px";
		$('#spreadsheet2 > div.jexcel_contextmenu.jcontextmenu.jcontextmenu-focus').attr('id', 'spreadsheetmenu');
		//document.getElementById('spreadsheetmenu').style.position = 'absolute';
		setTimeout(function(){
			$('#spreadsheet2 > div.jexcel_contextmenu.jcontextmenu.jcontextmenu-focus').attr('id', 'spreadsheetmenu');
			document.getElementById('spreadsheetmenu').style.position = 'absolute';
			$('#spreadsheet2 > div.jexcel_contextmenu.jcontextmenu.jcontextmenu-focus').css({
			position:"absolute;",
			left:CS.eazyinputX,
			top:CS.eazyinputY
		})
		}, 10);
         return items;
	}
	CS.contextMenu2=function(obj, x, y, e, items, section) {
         var items = [];
         if (y == null) {
         } else {
			// Copy
			items.push({
				title: T('コピー'),
				shortcut: 'Ctrl + C',
				onclick: function() {
					obj.copy(true);
				}
			});
	 
			// Paste
			if (navigator && navigator.clipboard && navigator.clipboard.readText) {
				items.push({
					title: T('貼り付け'),
					shortcut: 'Ctrl + V',
					onclick: function() {
						if (obj.selectedCell) {
							navigator.clipboard.readText().then(function(text) {
								if (text) {
									obj.paste(obj.selectedCell[0], obj.selectedCell[1], text);
								}
							});
						}
					}
				});
			}
         }
		CS.eazyinputY=(e.y-275)+window.scrollY+"px";
		CS.eazyinputX=e.x+"px";
		$('#spreadsheet3 > div.jexcel_contextmenu.jcontextmenu.jcontextmenu-focus').attr('id', 'spreadsheetmenu');
		//document.getElementById('spreadsheetmenu').style.position = 'absolute';
		setTimeout(function(){
			$('#spreadsheet3 > div.jexcel_contextmenu.jcontextmenu.jcontextmenu-focus').attr('id', 'spreadsheetmenu');
			document.getElementById('spreadsheetmenu').style.position = 'absolute';
			$('#spreadsheet3 > div.jexcel_contextmenu.jcontextmenu.jcontextmenu-focus').css({
			position:"absolute;",
			left:CS.eazyinputX,
			top:CS.eazyinputY
		})
		}, 10);
         return items;
	}
	CS.options={
			columnSorting:false,
			allowManualInsertColumn:false,
			allowManualInsertRow:false,
			allowDeleteColumn:false,
			allowDeleteRow:false,
			allowDeletingAllRows:false,
			allowInsertColumn:false,
		} ;

	for(var i=0;i<CS.data.length;i++){
		if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
			if(CS.data[i]["property"]==-1 || CS.data[i]["property"]=="-1"){
				if(CS.data[i]["variety"]>0){
					// CS.data[i]["zenki_keisan"]="正の値を入力してください";
					// CS.data[i]["konki_keisan"]="正の値を入力してください";
				}
			}
			if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==1){
				if(i==10 || i==30){
					// CS.data[i]["zenki_keisan"]="正の値を入力してください";
					// CS.data[i]["konki_keisan"]="正の値を入力してください";
				}
			}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==2){

			}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==3){

			}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==4){

			}
		}
	}
	CS.aitask_eazyinput_onpaste=function(el, data){
		var deletecount=CS.spreadsheet1.getData().length-CS.data.length;
		var spreadsheet1data=CS.spreadsheet1.getData();
		if(deletecount>1){
			var f1_list=[];
			var h1_list=[];
			for(var i=0;i<CS.data.length;i++){
				f1_list.push(CS.spreadsheet1.getCell("F"+(i+1)).innerHTML);
				h1_list.push(CS.spreadsheet1.getCell("H"+(i+1)).innerHTML);
			}
			spreadsheet1data.splice(CS.data.length,deletecount);
			CS.spreadsheet1.setData(spreadsheet1data);
			CS.itask_list_show_edit_pana_houjin_input_show_not_ex=false;
			setTimeout(CS.itask_list_show_edit_pana_del_left_td, 10);
			setTimeout(function(){
				for(var i=0;i<CS.data.length;i++){
					CS.spreadsheet1.getCell("F"+(i+1)).innerHTML=f1_list[i];
					CS.spreadsheet1.getCell("H"+(i+1)).innerHTML=h1_list[i];
					var f1=CS.spreadsheet1.getCell("F"+(i+1)).innerHTML;
					var h1=CS.spreadsheet1.getCell("H"+(i+1)).innerHTML;
					if(typeof data[4]!=undefined && typeof f1!=undefined && data[4]!="" &&f1!="" && data[4]!=f1 && f1!="正の値を入力してください"){
						CS.spreadsheet1.getCell("F"+(i+1)).style.color="red";
					}else{
						CS.spreadsheet1.getCell("F"+(i+1)).style.color="";
					}
					if(typeof data[6]!=undefined && typeof h1!=undefined && data[6]!="" && h1!="" && data[6]!=h1 && h1!="正の値を入力してください"){
						CS.spreadsheet1.getCell("H"+(i+1)).style.color="red";
					}else{
						CS.spreadsheet1.getCell("H"+(i+1)).style.color="";
					}
				}
				CS.itask_list_show_edit_pana_houjin_input_show_not_ex=true;
			}, 100);
		}
		
	}
	CS.spreadsheet2 =jspreadsheet(document.getElementById('spreadsheet2'), {
		data:CS.data,
		columns: CS.columns,
		contextMenu:CS.contextMenu,
		columnSorting:false,
		allowManualInsertColumn:false,
		allowManualInsertRow:false,
		allowDeleteColumn:false,
		allowDeleteRow:false,
		allowDeletingAllRows:false,
		allowInsertColumn:false,
		options:CS.options,
		onpaste:CS.aitask_eazyinput_onpaste,
		onafterchanges: CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_change,
		onselection: (instance, x1, y1, x2, y2) => {
			// 選択されたセルの開始位置を記録
			CS.aitask_eazyinput_spreadsheet_selectedCell = { row: y1, col: x1 };
		}
	});
	CS.spreadsheet2.el.addEventListener('keydown', CS.aitask_eazyinput_spreadsheet_keydown2);
	
	if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index!=3){
		CS.spreadsheet3 =jspreadsheet(document.getElementById('spreadsheet3'), {
			data:CS.data2,
			columns: CS.columns,
			contextMenu:CS.contextMenu2,
			columnSorting:false,
			allowManualInsertColumn:false,
			allowManualInsertRow:false,
			allowDeleteColumn:false,
			allowDeleteRow:false,
			allowDeletingAllRows:false,
			allowInsertColumn:false,
			options:CS.options,
			onpaste:CS.aitask_eazyinput_onpaste,
			onafterchanges: CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_change,
			onselection: (instance, x1, y1, x2, y2) => {
				// 選択されたセルの開始位置を記録
				CS.aitask_eazyinput_spreadsheet_selectedCell = { row: y1, col: x1 };
			}
		});
		CS.spreadsheet3.el.addEventListener('keydown', CS.aitask_eazyinput_spreadsheet_keydown3);
	}
	setTimeout(CS.itask_list_show_edit_pana_del_left_td, 10);

}
CS.itask_list_show_edit_pana_houjin_input_init = function(){
	CS.itask_list_show_edit_pana_houjin_input_show_not_ex=true;
	CS.data=[];
	CS.vueObj.houjin_eazy_inputlist= JSON.parse(JSON.stringify(CS.houjin_eazy_inputlist_base));
	for(var i=0;i<CS.vueObj.houjin_eazy_inputlist.length;i++){
		CS.vueObj.houjin_eazy_inputlist[i]["amount_pre_year"]="";
		CS.vueObj.houjin_eazy_inputlist[i]["zenki_keisan"]="";
		CS.vueObj.houjin_eazy_inputlist[i]["amount_this_year"]="";
		CS.vueObj.houjin_eazy_inputlist[i]["konki_keisan"]="";
		tmpobj={};
		if(CS.vueObj.houjin_eazy_inputlist[i]["m_kanjo_code"]=="2_999_0_0_0"){
			tmpobj["family_name"]="";
			tmpobj["genus_name"]="";
			tmpobj["species_name"]="";
			tmpobj["property"]=CS.vueObj.houjin_eazy_inputlist[i]["property"];
			tmpobj["variety"]=CS.toI(CS.vueObj.houjin_eazy_inputlist[i]["variety"]);
		}else{
			tmpobj["family_name"]=CS.vueObj.houjin_eazy_inputlist[i]["family_name"];
			tmpobj["genus_name"]=CS.vueObj.houjin_eazy_inputlist[i]["genus_name"];
			tmpobj["species_name"]=CS.vueObj.houjin_eazy_inputlist[i]["species_name"];
			tmpobj["property"]=CS.vueObj.houjin_eazy_inputlist[i]["property"];
			tmpobj["variety"]=CS.toI(CS.vueObj.houjin_eazy_inputlist[i]["variety"]);
		}
		tmpobj["variety_name"]=CS.vueObj.houjin_eazy_inputlist[i]["variety_name"];
		tmpobj["index"]=i;
		tmpobj["amount_pre_year"]="";
		tmpobj["zenki_keisan"]="";
		tmpobj["amount_this_year"]="";
		tmpobj["konki_keisan"]="";
		if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.houjin_eazy_inputlist[i]["tabindex"]){
			CS.data.push(tmpobj);
		}
	}
	CS.columns=[
			{
				type:'text',
				width:'80',
				name:'family_name',
				title:'大分類',
				readOnly: true,
			},
			{
				type:'text',
				width:'80',
				name:'genus_name',
				title:'中分類',
				readOnly: true,
			},
			{
				type:'text',
				width:'80',
				name:'species_name',
				title:'小分類',
				readOnly: true,
			},
			{
				type:'text',
				width:'80',
				name:'variety_name',
				title:'勘定科目',
				readOnly: true,
			},
			{
				type:'numeric',
				width:'80',
				name:'amount_pre_year',
				title:'前期',
				mask:'#,##'
			},
			{
				type:'numeric',
				width:'80',
				name:'zenki_keisan',
				title:'検算',
				mask:'#,##',
				readOnly: true,
			},
			{
				type:'numeric',
				width:'80',
				name:'amount_this_year',
				title:'今期',
				mask:'#,##'
			},
			{
				type:'numeric',
				width:'80',
				name:'konki_keisan',
				title:'検算',
				mask:'#,##',
				readOnly: true,
			},
			{
				type:'hidden',
				width:'80',
				name:'index',
				title:'コード',
			},
			{
				type:'hidden',
				width:'80',
				name:'property',
				title:'property',
			},
			{
				type:'hidden',
				width:'80',
				name:'variety',
				title:'variety',
			},
		];
	CS.contextMenu=function(obj, x, y, e, items, section) {
         var items = [];
         if (y == null) {
         } else {
			// Copy
			items.push({
				title: T('コピー'),
				shortcut: 'Ctrl + C',
				onclick: function() {
					obj.copy(true);
				}
			});
	 
			// Paste
			if (navigator && navigator.clipboard && navigator.clipboard.readText) {
				items.push({
					title: T('貼り付け'),
					shortcut: 'Ctrl + V',
					onclick: function() {
						if (obj.selectedCell) {
							navigator.clipboard.readText().then(function(text) {
								if (text) {
									obj.paste(obj.selectedCell[0], obj.selectedCell[1], text);
								}
							});
						}
					}
				});
			}
         }
		CS.eazyinputY=(e.y-275)+window.scrollY+"px";
		CS.eazyinputX=e.x+"px";
		$('#spreadsheet1 > div.jexcel_contextmenu.jcontextmenu.jcontextmenu-focus').attr('id', 'spreadsheetmenu');
		//document.getElementById('spreadsheetmenu').style.position = 'absolute';
		setTimeout(function(){
			$('#spreadsheet1 > div.jexcel_contextmenu.jcontextmenu.jcontextmenu-focus').attr('id', 'spreadsheetmenu');
			document.getElementById('spreadsheetmenu').style.position = 'absolute';
			$('#spreadsheet1 > div.jexcel_contextmenu.jcontextmenu.jcontextmenu-focus').css({
			position:"absolute;",
			left:CS.eazyinputX,
			top:CS.eazyinputY
		})
		}, 10);
         return items;
	}
	CS.options={
			columnSorting:false,
			allowManualInsertColumn:false,
			allowManualInsertRow:false,
			allowDeleteColumn:false,
			allowDeleteRow:false,
			allowDeletingAllRows:false,
			allowInsertColumn:false,
		} ;

	for(var i=0;i<CS.data.length;i++){
		if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
			if(CS.data[i]["property"]==-1 || CS.data[i]["property"]=="-1"){
				if(CS.data[i]["variety"]>0){
					// CS.data[i]["zenki_keisan"]="正の値を入力してください";
					// CS.data[i]["konki_keisan"]="正の値を入力してください";
				}
			}
			if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==1){
				if(i==10 || i==30){
					CS.data[i]["zenki_keisan"]="正の値を入力してください";
					CS.data[i]["konki_keisan"]="正の値を入力してください";
				}
			}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==2){

			}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==3){

			}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==4){

			}
		}
	}
	CS.aitask_eazyinput_onpaste=function(el, data){
		var deletecount=CS.spreadsheet1.getData().length-CS.data.length;
		var spreadsheet1data=CS.spreadsheet1.getData();
		if(deletecount>1){
			var f1_list=[];
			var h1_list=[];
			for(var i=0;i<CS.data.length;i++){
				f1_list.push(CS.spreadsheet1.getCell("F"+(i+1)).innerHTML);
				h1_list.push(CS.spreadsheet1.getCell("H"+(i+1)).innerHTML);
			}
			spreadsheet1data.splice(CS.data.length,deletecount);
			CS.spreadsheet1.setData(spreadsheet1data);
			CS.itask_list_show_edit_pana_houjin_input_show_not_ex=false;
			setTimeout(CS.itask_list_show_edit_pana_del_left_td, 10);
			setTimeout(function(){
				for(var i=0;i<CS.data.length;i++){
					CS.spreadsheet1.getCell("F"+(i+1)).innerHTML=f1_list[i];
					CS.spreadsheet1.getCell("H"+(i+1)).innerHTML=h1_list[i];
					var f1=CS.spreadsheet1.getCell("F"+(i+1)).innerHTML;
					var h1=CS.spreadsheet1.getCell("H"+(i+1)).innerHTML;
					if(typeof data[4]!=undefined && typeof f1!=undefined && data[4]!="" &&f1!="" && data[4]!=f1 && f1!="正の値を入力してください"){
						CS.spreadsheet1.getCell("F"+(i+1)).style.color="red";
					}else{
						CS.spreadsheet1.getCell("F"+(i+1)).style.color="";
					}
					if(typeof data[6]!=undefined && typeof h1!=undefined && data[6]!="" && h1!="" && data[6]!=h1 && h1!="正の値を入力してください"){
						CS.spreadsheet1.getCell("H"+(i+1)).style.color="red";
					}else{
						CS.spreadsheet1.getCell("H"+(i+1)).style.color="";
					}
				}
				CS.itask_list_show_edit_pana_houjin_input_show_not_ex=true;
			}, 100);
		}
		
	}
	CS.spreadsheet1 =jspreadsheet(document.getElementById('spreadsheet1'), {
		data:CS.data,
		columns: CS.columns,
		contextMenu:CS.contextMenu,
		columnSorting:false,
		allowManualInsertColumn:false,
		allowManualInsertRow:false,
		allowDeleteColumn:false,
		allowDeleteRow:false,
		allowDeletingAllRows:false,
		allowInsertColumn:false,
		options:CS.options,
		onpaste:CS.aitask_eazyinput_onpaste,
		onafterchanges: CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_change,
		onselection: (instance, x1, y1, x2, y2) => {
			// 選択されたセルの開始位置を記録
			CS.aitask_eazyinput_spreadsheet_selectedCell = { row: y1, col: x1 };
		}
	});
	CS.spreadsheet1.el.addEventListener('keydown', CS.aitask_eazyinput_spreadsheet_keydown1);
	setTimeout(CS.itask_list_show_edit_pana_del_left_td, 10);
	
	//CS.itask_list_show_edit_window_change_eazyinput_tab(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index);
}
CS.itask_list_show_edit_pana_houjin_input_set_red= function(){
	for(var i=0;i<CS.data.length;i++){
		var data=CS.spreadsheet1.getRowData(i);
		var f1=CS.spreadsheet1.getCell("F"+(i+1)).innerHTML;
		var h1=CS.spreadsheet1.getCell("H"+(i+1)).innerHTML;
		if(typeof data[4]!=undefined && typeof f1!=undefined && data[4]!="" &&f1!="" && data[4]!=f1 && f1!="正の値を入力してください"){
			CS.spreadsheet1.getCell("F"+(i+1)).style.color="red";
		}else{
			CS.spreadsheet1.getCell("F"+(i+1)).style.color="";
		}
		if(typeof data[6]!=undefined && typeof h1!=undefined && data[6]!="" && h1!="" && data[6]!=h1 && h1!="正の値を入力してください"){
			CS.spreadsheet1.getCell("H"+(i+1)).style.color="red";
		}else{
			CS.spreadsheet1.getCell("H"+(i+1)).style.color="";
		}
	}
}
CS.itask_list_show_edit_pana_kojin_input_set_red= function(){
	var o=0;
	for(var i=0;i<CS.data.length;i++){
		if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==1){
			if(o<25){
				if(CS.spreadsheet2.getValue('D'+(o+1))==CS.data[i]["index"]){
					var data=CS.spreadsheet2.getRowData(o);
					var c1=CS.spreadsheet2.getCell("C"+(o+1)).innerHTML;
					if(typeof data[1]!=undefined && typeof c1!=undefined && data[1]!="" && c1!="" && data[1]!=c1){
						CS.spreadsheet2.getCell("C"+(o+1)).style.color="red";
					}else{
						CS.spreadsheet2.getCell("C"+(o+1)).style.color="";
					}
					o++;
				}
			}else{
				if(CS.spreadsheet3.getValue('D'+(o+1-25))==CS.data[i]["index"]){
					var data=CS.spreadsheet3.getRowData(o-25);
					var c1=CS.spreadsheet3.getCell("C"+(o+1-25)).innerHTML;
					if(typeof data[1]!=undefined && typeof c1!=undefined && data[1]!="" && c1!="" && data[1]!=c1){
						CS.spreadsheet3.getCell("C"+(o+1-25)).style.color="red";
					}else{
						CS.spreadsheet3.getCell("C"+(o+1-25)).style.color="";
					}
					o++;
				}
			}
		}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==2){
			if(o<16){
				if(CS.spreadsheet2.getValue('D'+(o+1))==CS.data[i]["index"]){
					var data=CS.spreadsheet2.getRowData(o);
					var c1=CS.spreadsheet2.getCell("C"+(o+1)).innerHTML;
					if(typeof data[1]!=undefined && typeof c1!=undefined && data[1]!="" && c1!="" && data[1]!=c1){
						CS.spreadsheet2.getCell("C"+(o+1)).style.color="red";
					}else{
						CS.spreadsheet2.getCell("C"+(o+1)).style.color="";
					}
					o++;
				}
			}else{
				if(CS.spreadsheet3.getValue('D'+(o+1-16))==CS.data[i]["index"]){
					var data=CS.spreadsheet3.getRowData(o-16);
					var c1=CS.spreadsheet3.getCell("C"+(o+1-16)).innerHTML;
					if(typeof data[1]!=undefined && typeof c1!=undefined && data[1]!="" && c1!="" && data[1]!=c1){
						CS.spreadsheet3.getCell("C"+(o+1-16)).style.color="red";
					}else{
						CS.spreadsheet3.getCell("C"+(o+1-16)).style.color="";
					}
					o++;
				}
			}
		}else{
			if(CS.spreadsheet2.getValue('D'+(o+1))==CS.data[i]["index"]){
				var data=CS.spreadsheet2.getRowData(o);
				var c1=CS.spreadsheet2.getCell("C"+(o+1)).innerHTML;
				if(typeof data[1]!=undefined && typeof c1!=undefined && data[1]!="" && c1!="" && data[1]!=c1){
					CS.spreadsheet2.getCell("C"+(o+1)).style.color="red";
				}else{
					CS.spreadsheet2.getCell("C"+(o+1)).style.color="";
				}
				o++;
			}
		}
		
	}
}
CS.itask_list_show_edit_pana_del_left_td = function(){
	if(CS.vueObj.itask_list_show_edit_pana_kojin_input_show){
		$('#spreadsheet2 > div.jexcel_content > table > thead > tr > td.jexcel_selectall').css('display','none');
		$('#spreadsheet2 > div.jexcel_content > table > colgroup > col:nth-child(1)').css('display','none');
		for(var i=0;i<300;i++){
			$('#spreadsheet2 > div.jexcel_content > table > tbody > tr:nth-child('+i+') > td.jexcel_row').css('display','none');
		}
		$('#spreadsheet3 > div.jexcel_content > table > thead > tr > td.jexcel_selectall').css('display','none');
		$('#spreadsheet3 > div.jexcel_content > table > colgroup > col:nth-child(1)').css('display','none');
		for(var i=0;i<300;i++){
			$('#spreadsheet3 > div.jexcel_content > table > tbody > tr:nth-child('+i+') > td.jexcel_row').css('display','none');
		}
		for(var i=0;i<CS.data.length;i++){
			CS.spreadsheet2.getCell("A"+(i+1)).style.color="black";
			CS.spreadsheet2.getCell("A"+(i+1)).style.background="rgb(235, 237, 242)";
			CS.spreadsheet2.getCell("A"+(i+1)).style.cursor="pointer";
			CS.spreadsheet2.getCell("B"+(i+1)).style.textAlign="right";
			CS.spreadsheet2.getCell("C"+(i+1)).style.textAlign="right";
		}
		for(var i=0;i<CS.data2.length;i++){
			if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index!=3){
			CS.spreadsheet3.getCell("A"+(i+1)).style.color="black";
			CS.spreadsheet3.getCell("A"+(i+1)).style.background="rgb(235, 237, 242)";
			CS.spreadsheet3.getCell("A"+(i+1)).style.cursor="pointer";
			
			CS.spreadsheet3.getCell("B"+(i+1)).style.textAlign="right";
			CS.spreadsheet3.getCell("C"+(i+1)).style.textAlign="right";
			}
		}
		CS.itask_list_show_edit_pana_eazyinput_kojin_set_event();
	}else{
		$('#spreadsheet1 > div.jexcel_content > table > thead > tr > td.jexcel_selectall').css('display','none');
		$('#spreadsheet1 > div.jexcel_content > table > colgroup > col:nth-child(1)').css('display','none');
		for(var i=0;i<300;i++){
			$('#spreadsheet1 > div.jexcel_content > table > tbody > tr:nth-child('+i+') > td.jexcel_row').css('display','none');
		}
		$('#spreadsheet1 > div.jexcel_content > table > thead > tr > td').css('font-size','12px');
		$('#spreadsheet1 > div.jexcel_content > table > tbody > tr > td').css('font-size','12px');
		for(var i=0;i<CS.data.length;i++){
			CS.spreadsheet1.getCell("A"+(i+1)).style.color="black";
			CS.spreadsheet1.getCell("B"+(i+1)).style.color="black";
			CS.spreadsheet1.getCell("C"+(i+1)).style.color="black";
			CS.spreadsheet1.getCell("D"+(i+1)).style.color="black";
			CS.spreadsheet1.getCell("A"+(i+1)).style.background="rgb(235, 237, 242)";
			CS.spreadsheet1.getCell("B"+(i+1)).style.background="rgb(235, 237, 242)";
			CS.spreadsheet1.getCell("C"+(i+1)).style.background="rgb(235, 237, 242)";
			CS.spreadsheet1.getCell("D"+(i+1)).style.background="rgb(235, 237, 242)";
			CS.spreadsheet1.getCell("F"+(i+1)).style.background="rgb(235, 237, 242)";
			CS.spreadsheet1.getCell("H"+(i+1)).style.background="rgb(235, 237, 242)";
			CS.spreadsheet1.getCell("D"+(i+1)).style.cursor="pointer";
			
			CS.spreadsheet1.getCell("E"+(i+1)).style.textAlign="right";
			CS.spreadsheet1.getCell("F"+(i+1)).style.textAlign="right";
			CS.spreadsheet1.getCell("G"+(i+1)).style.textAlign="right";
			CS.spreadsheet1.getCell("H"+(i+1)).style.textAlign="right";
		}
		if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show && CS.itask_list_show_edit_pana_houjin_input_show_not_ex){
			if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==1){
				CS.spreadsheet1.setMerge('A1', 1, 24);
				CS.spreadsheet1.setMerge('A25', 1, 15);
				CS.spreadsheet1.setMerge('B1', 1, 6);
				CS.spreadsheet1.setMerge('B7', 1, 6);
				CS.spreadsheet1.setMerge('B14', 1, 9);
				CS.spreadsheet1.setMerge('B25', 1, 7);
				CS.spreadsheet1.setMerge('B32', 1, 2);
				CS.spreadsheet1.setMerge('B34', 1, 5);
			}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==2){
				CS.spreadsheet1.setMerge('A1', 1, 20);
				CS.spreadsheet1.setMerge('B1', 1, 20);
				CS.spreadsheet1.setMerge('C1', 1, 4);
				CS.spreadsheet1.setMerge('C5', 1, 3);
				CS.spreadsheet1.setMerge('C8', 1, 12);
				CS.spreadsheet1.setValue('A1', "流動負債");
				CS.spreadsheet1.getCell("A1").innerHTML="流動負債";
				CS.spreadsheet1.getCell("B1").innerHTML="流動負債";
				CS.spreadsheet1.setMerge('A21', 1, 5);
				CS.spreadsheet1.setMerge('C21', 1, 4);
				CS.spreadsheet1.setMerge('B21', 1, 5);
				CS.spreadsheet1.setMerge('A27', 1, 12);
				CS.spreadsheet1.setMerge('B27', 1, 2);
				CS.spreadsheet1.setMerge('B29', 1, 10);
				CS.spreadsheet1.setMerge('C27', 1, 2);
				//CS.spreadsheet1.setMerge('C29', 1, 10);
			}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==3){
				CS.spreadsheet1.setMerge('A2', 1, 4);
				CS.spreadsheet1.setMerge('A6', 1, 6);
				CS.spreadsheet1.setMerge('A14', 1, 2);
				CS.spreadsheet1.setMerge('A18', 1, 7);
				CS.spreadsheet1.setMerge('B18', 1, 7);
				CS.spreadsheet1.setMerge('A25', 1, 7);
				CS.spreadsheet1.setMerge('B25', 1, 7);
			}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==4){
				CS.spreadsheet1.setMerge('A1', 1, 31);
			}
		}
		CS.itask_list_show_edit_pana_eazyinput_set_event();
	}

	
	

}
CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_click=function(e) {
	var targetElement = event.target || event.srcElement;
	var o=-1;
	var row=targetElement.id.split('_')[2];
	var index=targetElement.id.split('_')[3];
	for(var i=0;i<CS.vueObj.kojin_eazy_inputlist.length;i++){
		if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.kojin_eazy_inputlist[i]["tabindex"]){
			o++;
			if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==1){
				if(o<25){
				}else{
					continue;
				}
			}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==2){
				if(o<16){
				}else{
					continue;
				}
			}else{
				continue;
			}
			if(index+""==i+""){
				CS.itask_list_show_edit_window_kanjo_eazyinput_index=i;
				CS.itask_list_show_edit_window_kanjo_eazyinput_row=row;
				CS.itask_list_show_edit_window_kanjo_eazyinput_sheetNo=2;
				CS.itask_list_show_edit_window_kanjo_genus=CS.vueObj.kojin_eazy_inputlist[i]["genus"];
				CS.itask_list_show_edit_window_kanjo_family=CS.vueObj.kojin_eazy_inputlist[i]["family"];
				CS.kanri_itask_kanjo_show(CS.vueObj.itask_list_show_edit_pana_tag_button_index,CS.vueObj.kanri_itask_show_type,null);
			}
		}
	}
}
CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_click2=function(e) {
	var targetElement = event.target || event.srcElement;
	var o=-1;
	var row=targetElement.id.split('_')[2];
	var index=targetElement.id.split('_')[3];
	for(var i=0;i<CS.vueObj.kojin_eazy_inputlist.length;i++){
		if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.kojin_eazy_inputlist[i]["tabindex"]){
			o++;
			if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==1){
				if(o<25){
					continue;
				}else{
				}
			}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==2){
				if(o<16){
					continue;
				}else{
				}
			}else{
				continue;
			}
			if(index+""==i+""){
				CS.itask_list_show_edit_window_kanjo_eazyinput_index=i;
				CS.itask_list_show_edit_window_kanjo_eazyinput_row=row;
				CS.itask_list_show_edit_window_kanjo_eazyinput_sheetNo=3;
				CS.itask_list_show_edit_window_kanjo_genus=CS.vueObj.kojin_eazy_inputlist[i]["genus"];
				CS.itask_list_show_edit_window_kanjo_family=CS.vueObj.kojin_eazy_inputlist[i]["family"];
				CS.kanri_itask_kanjo_show(CS.vueObj.itask_list_show_edit_pana_tag_button_index,CS.vueObj.kanri_itask_show_type,null);
			}
		}
	}
}
CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_click3=function(e) {
	var targetElement = event.target || event.srcElement;
	var ti=0;
	for(var i=0;i<CS.vueObj.houjin_eazy_inputlist.length;i++){
		if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.houjin_eazy_inputlist[i]["tabindex"]){
			var row=targetElement.id.split('_')[2];
			if(ti+""==row){
				//alert(CS.vueObj.houjin_eazy_inputlist[i]["m_kanjo_code"]);
				CS.itask_list_show_edit_window_kanjo_eazyinput_index=i;
				CS.itask_list_show_edit_window_kanjo_eazyinput_row=row;
				CS.itask_list_show_edit_window_kanjo_eazyinput_sheetNo=1;
				CS.itask_list_show_edit_window_kanjo_genus=CS.vueObj.houjin_eazy_inputlist[i]["genus"];
				CS.itask_list_show_edit_window_kanjo_family=CS.vueObj.houjin_eazy_inputlist[i]["family"];
				CS.kanri_itask_kanjo_show(CS.vueObj.itask_list_show_edit_pana_tag_button_index,CS.vueObj.kanri_itask_show_type,null);
			}
			ti++;
		}
	}
}
CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_mouseover=function(e) {
	var targetElement = event.target || event.srcElement;
	targetElement.style.backgroundColor = 'rgb(255, 255, 224)';
}
CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_mouseleave=function(e) {
	var targetElement = event.target || event.srcElement;
	targetElement.style.backgroundColor = 'rgb(235, 237, 242)';
}
CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_change=function(e) {
	if(typeof CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_change_count == "undefined"){
		CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_change_count=0;
	}
	if(CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_change_count==0){
		CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_change_count++;
		CS.itask_list_show_edit_window_eazyinput_kensan();
	}
	setTimeout(function(){
		CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_change_count=0;
	}, 1500);
	
}
CS.itask_list_show_edit_pana_eazyinput_kojin_set_event = function(){
	for(var i=0;i<CS.data.length;i++){
		var d1=CS.spreadsheet2.getCell("A"+(i+1));
		if(typeof d1 !="undefined"){
			d1.id="s1_"+d1.getAttribute("data-x")+"_"+d1.getAttribute("data-y")+"_"+CS.spreadsheet2.getValue('D'+(i+1));
			if (CS.kojin_kani_kotei_list.indexOf(CS.toI(CS.spreadsheet2.getValue('D'+(i+1)))) === -1){
				CS.spreadsheet2.getCell("A"+(i+1)).style.cursor="auto";
				continue;
			}
			d1.removeEventListener("click",CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_click , false);
			d1.removeEventListener("mouseover",CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_mouseover , false);
			d1.removeEventListener("mouseleave",CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_mouseleave , false);
			d1.addEventListener('click',CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_click , false);
			d1.addEventListener('mouseover',CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_mouseover , false);
			d1.addEventListener('mouseleave',CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_mouseleave , false);
		}
	}
	$('#spreadsheet2 > div.jexcel_content > table > thead > tr > td:nth-child(4)').html('<input style="-webkit-appearance: unset;appearance: unset;background: #4285f4;color: white;border: unset;cursor:pointer" onclick="CS.itask_list_show_edit_window_eazyinput_kensan()" type="button" value="検算" />');
	if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index!=3){
		for(var i=0;i<CS.data2.length;i++){
			var d1=CS.spreadsheet3.getCell("A"+(i+1));
			if(typeof d1 !="undefined"){
				d1.id="s1_"+d1.getAttribute("data-x")+"_"+d1.getAttribute("data-y")+"_"+CS.spreadsheet3.getValue('D'+(i+1));
				if (CS.kojin_kani_kotei_list.indexOf(CS.toI(CS.spreadsheet3.getValue('D'+(i+1)))) === -1){
					CS.spreadsheet3.getCell("A"+(i+1)).style.cursor="auto";
					continue;
				}
			d1.removeEventListener("click",CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_click2 , false);
			d1.removeEventListener("mouseover",CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_mouseover , false);
			d1.removeEventListener("mouseleave",CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_mouseleave , false);
			d1.addEventListener('click',CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_click2 , false);
			d1.addEventListener('mouseover',CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_mouseover , false);
			d1.addEventListener('mouseleave',CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_mouseleave , false);
			}
		}
		$('#spreadsheet3 > div.jexcel_content > table > thead > tr > td:nth-child(4)').html('<input style="-webkit-appearance: unset;appearance: unset;background: #4285f4;color: white;border: unset;cursor:pointer" onclick="CS.itask_list_show_edit_window_eazyinput_kensan()" type="button" value="検算" />');
	}
}
CS.itask_list_show_edit_pana_eazyinput_set_event = function(){
	for(var i=0;i<CS.data.length;i++){
		var d1=CS.spreadsheet1.getCell("D"+(i+1));
		if(typeof d1 !="undefined"){
			d1.id="s1_"+d1.getAttribute("data-x")+"_"+d1.getAttribute("data-y");
			d1.removeEventListener("click",CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_click3 , false);
			d1.removeEventListener("mouseover",CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_mouseover , false);
			d1.removeEventListener("mouseleave",CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_mouseleave , false);
			d1.addEventListener('click',CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_click3 , false);
			d1.addEventListener('mouseover',CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_mouseover , false);
			d1.addEventListener('mouseleave',CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_mouseleave , false);
		}
	}
	$('#spreadsheet1 > div.jexcel_content > table > thead > tr > td:nth-child(7)').html('<input style="-webkit-appearance: unset;appearance: unset;background: #4285f4;color: white;border: unset;cursor:pointer" onclick="CS.itask_list_show_edit_window_eazyinput_kensan()" type="button" value="検算" />');
	$('#spreadsheet1 > div.jexcel_content > table > thead > tr > td:nth-child(9)').html('<input style="-webkit-appearance: unset;appearance: unset;background: #4285f4;color: white;border: unset;cursor:pointer" onclick="CS.itask_list_show_edit_window_eazyinput_kensan()" type="button" value="検算" />');

}
CS.itask_list_show_edit_window_eazyinput_kensan=function(){
	CS.kanjo_detail_backup= JSON.parse(JSON.stringify(CS.vueObj.kanjo_detail));
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf('konjin')!=-1){
		//個人の場合
		var sdata=CS.spreadsheet2.getData();
		for(var i=0;i<CS.vueObj.kojin_eazy_inputlist.length;i++){
			for(var j=0;j<sdata.length;j++){
				if(sdata[j][3]==i){
					CS.vueObj.kojin_eazy_inputlist[i]["amount_pre_year"]="";
					CS.vueObj.kojin_eazy_inputlist[i]["amount_this_year"]=sdata[j][1];
				}
			}
		}
		if(typeof CS.spreadsheet3!="undefined"){
			var sdata2=CS.spreadsheet3.getData();
			for(var i=0;i<CS.vueObj.kojin_eazy_inputlist.length;i++){
				for(var j=0;j<sdata2.length;j++){
					if(sdata2[j][3]==i){
						CS.vueObj.kojin_eazy_inputlist[i]["amount_pre_year"]="";
						CS.vueObj.kojin_eazy_inputlist[i]["amount_this_year"]=sdata2[j][1];
					}
				}
			}
		}
		CS.vueObj.kanjo_detail=CS.vueObj.kojin_eazy_inputlist;
		
		CS.itask_list_show_edit_window_kensan(4);
		
		CS.vueObj.kojin_eazy_inputlist= JSON.parse(JSON.stringify(CS.vueObj.kanjo_detail));
		CS.vueObj.kanjo_detail= JSON.parse(JSON.stringify(CS.kanjo_detail_backup));
		
		var sdata=CS.spreadsheet2.getData();
		CS.data=[];
		for(var i=0;i<CS.vueObj.kojin_eazy_inputlist.length;i++){
			for(var j=0;j<sdata.length;j++){
				if(sdata[j][3]==i){
					CS.vueObj.kojin_eazy_inputlist[i]["amount_pre_year"]="";
					CS.vueObj.kojin_eazy_inputlist[i]["amount_this_year"]=sdata[j][1];
				}
			}
			tmpobj={};
			tmpobj["variety_name"]=CS.vueObj.kojin_eazy_inputlist[i]["variety_name"];
			//tmpobj["variety_name"]=CS.vueObj.houjin_eazy_inputlist[i]["variety_name"]+"["+CS.vueObj.houjin_eazy_inputlist[i]["property"]+"]"+CS.vueObj.houjin_eazy_inputlist[i]["m_kanjo_code"];
			tmpobj["index"]=i;
			tmpobj["amount_this_year"]=CS.vueObj.kojin_eazy_inputlist[i]["amount_this_year"];
			tmpobj["konki_keisan"]=CS.vueObj.kojin_eazy_inputlist[i]["konki_keisan"];
			tmpobj["tabindex"]=CS.vueObj.kojin_eazy_inputlist[i]["tabindex"];
			if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.kojin_eazy_inputlist[i]["tabindex"]){
				CS.data.push(tmpobj);
			}
		}
		// $("#spreadsheet1").empty();
		var o=0;
		for(var i=0;i<CS.data.length;i++){
			if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index+""==CS.data[i]["tabindex"]+""){
				if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==1){
					if(o<25){
						if(CS.spreadsheet2.getValue('D'+(o+1))==CS.data[i]["index"]){
							CS.spreadsheet2.setValue('B'+(o+1), CS.data[i]["amount_this_year"]);
							var c1=CS.spreadsheet2.getCell("C"+(o+1));
							c1.innerHTML=CS.data[i]["konki_keisan"];
						}
					}else{
						if(CS.spreadsheet3.getValue('D'+(o+1-25))==CS.data[i]["index"]){
							CS.spreadsheet3.setValue('B'+(o+1-25), CS.data[i]["amount_this_year"]);
							var c1=CS.spreadsheet3.getCell("C"+(o+1-25));
							c1.innerHTML=CS.data[i]["konki_keisan"];
						}
					}
				}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==2){
					if(o<16){
						if(CS.spreadsheet2.getValue('D'+(o+1))==CS.data[i]["index"]){
							CS.spreadsheet2.setValue('B'+(o+1), CS.data[i]["amount_this_year"]);
							var c1=CS.spreadsheet2.getCell("C"+(o+1));
							c1.innerHTML=CS.data[i]["konki_keisan"];
						}
					}else{
						if(CS.spreadsheet3.getValue('D'+(o+1-16))==CS.data[i]["index"]){
							CS.spreadsheet3.setValue('B'+(o+1-16), CS.data[i]["amount_this_year"]);
							var c1=CS.spreadsheet3.getCell("C"+(o+1-16));
							c1.innerHTML=CS.data[i]["konki_keisan"];
						}
					}
				}else{
					if(CS.spreadsheet2.getValue('D'+(o+1))==CS.data[i]["index"]){
						CS.spreadsheet2.setValue('B'+(o+1), CS.data[i]["amount_this_year"]);
						var c1=CS.spreadsheet2.getCell("C"+(o+1));
						c1.innerHTML=CS.data[i]["konki_keisan"];
					}
				}
				o++;
			}

		}
		setTimeout(CS.itask_list_show_edit_pana_kojin_input_set_red, 20);
	}else{
		var sdata=CS.spreadsheet1.getData();
		for(var i=0;i<CS.vueObj.houjin_eazy_inputlist.length;i++){
			for(var j=0;j<sdata.length;j++){
				if(sdata[j][8]==i){
					CS.vueObj.houjin_eazy_inputlist[i]["amount_pre_year"]=sdata[j][4];
					CS.vueObj.houjin_eazy_inputlist[i]["amount_this_year"]=sdata[j][6];
				}
			}
		}
		CS.vueObj.kanjo_detail=CS.vueObj.houjin_eazy_inputlist;
		
		CS.itask_list_show_edit_window_kensan(4);
		
		CS.vueObj.houjin_eazy_inputlist= JSON.parse(JSON.stringify(CS.vueObj.kanjo_detail));
		CS.vueObj.kanjo_detail= JSON.parse(JSON.stringify(CS.kanjo_detail_backup));
		
		var sdata=CS.spreadsheet1.getData();
		CS.data=[];
		for(var i=0;i<CS.vueObj.houjin_eazy_inputlist.length;i++){
			for(var j=0;j<sdata.length;j++){
				if(sdata[j][8]==i){
					CS.vueObj.houjin_eazy_inputlist[i]["amount_pre_year"]=sdata[j][4];
					CS.vueObj.houjin_eazy_inputlist[i]["amount_this_year"]=sdata[j][6];
				}
			}
			tmpobj={};
			if(CS.vueObj.houjin_eazy_inputlist[i]["m_kanjo_code"]=="2_999_0_0_0"){
				tmpobj["family_name"]="";
				tmpobj["genus_name"]="";
				tmpobj["species_name"]="";
			}else{
				tmpobj["family_name"]=CS.vueObj.houjin_eazy_inputlist[i]["family_name"];
				tmpobj["genus_name"]=CS.vueObj.houjin_eazy_inputlist[i]["genus_name"];
				tmpobj["species_name"]=CS.vueObj.houjin_eazy_inputlist[i]["species_name"];
			}
			tmpobj["variety_name"]=CS.vueObj.houjin_eazy_inputlist[i]["variety_name"];
			//tmpobj["variety_name"]=CS.vueObj.houjin_eazy_inputlist[i]["variety_name"]+"["+CS.vueObj.houjin_eazy_inputlist[i]["property"]+"]"+CS.vueObj.houjin_eazy_inputlist[i]["m_kanjo_code"];
			tmpobj["index"]=i;
			tmpobj["amount_pre_year"]=CS.vueObj.houjin_eazy_inputlist[i]["amount_pre_year"];
			tmpobj["zenki_keisan"]=CS.vueObj.houjin_eazy_inputlist[i]["zenki_keisan"];
			tmpobj["amount_this_year"]=CS.vueObj.houjin_eazy_inputlist[i]["amount_this_year"];
			tmpobj["konki_keisan"]=CS.vueObj.houjin_eazy_inputlist[i]["konki_keisan"];
			if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.houjin_eazy_inputlist[i]["tabindex"]){
				CS.data.push(tmpobj);
			}
		}
		// $("#spreadsheet1").empty();
		for(var i=0;i<CS.data.length;i++){
			CS.spreadsheet1.setValue('E'+(i+1), CS.data[i]["amount_pre_year"]);
			CS.spreadsheet1.setValue('G'+(i+1), CS.data[i]["amount_this_year"]);
			var f1=CS.spreadsheet1.getCell("F"+(i+1));
			f1.innerHTML=CS.data[i]["zenki_keisan"];
			var h1=CS.spreadsheet1.getCell("H"+(i+1));
			h1.innerHTML=CS.data[i]["konki_keisan"];
			if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
				if(CS.data[i]["property"]==-1 || CS.data[i]["property"]=="-1"){
					if(CS.data[i]["variety"]>0){
						// CS.data[i]["zenki_keisan"]="正の値を入力してください";
						// CS.data[i]["konki_keisan"]="正の値を入力してください";
					}
				}
				if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==1){
					if(i==10 || i==30){
						var f1=CS.spreadsheet1.getCell("F"+(i+1));
						f1.innerHTML="正の値を入力してください";
						var h1=CS.spreadsheet1.getCell("H"+(i+1));
						h1.innerHTML="正の値を入力してください";
						CS.data[i]["zenki_keisan"]="正の値を入力してください";
						CS.data[i]["konki_keisan"]="正の値を入力してください";
					}
				}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==2){

				}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==3){

				}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==4){

				}
			}
		}
		setTimeout(CS.itask_list_show_edit_pana_houjin_input_set_red, 20);
	}
}
CS.itask_list_show_edit_pana_kojin_input = function(){
	if(CS.vueObj.itask_list_show_edit_pana_kojin_input_show){
		var okflag=window.confirm("簡易入力した内容を廃棄しますか？");
		if(!okflag){
			return;
		}
		CS.vueObj.itask_list_show_edit_pana_kojin_input_show=false;
		CS.vueObj.itask_list_show_edit_pana_houjin_input_show=false;
		CS.itask_list_show_edit_window_kanjo_eazyinput_index=undefined;
		CS.itask_list_show_edit_window_kensan(4);
	}else{
		////////////////////////////////////////
		//ここ以下は実際実行しない部分
		////////////////////////////////////////
		if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf('konjin')!=-1){
			CS.vueObj.itask_list_show_edit_pana_kojin_input_show=true;
		}else{
			CS.vueObj.itask_list_show_edit_pana_houjin_input_show=true;
		}
		CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index=CS.vueObj.itask_list_show_edit_pana_tag_button_index;
		if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf('konjin')!=-1){
			setTimeout(CS.itask_list_show_edit_pana_kojin_input_init, 100);
		}else{
			setTimeout(CS.itask_list_show_edit_pana_houjin_input_init, 100);
		}
		
		CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red1=2;
		CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red2=2;
		CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red3=2;
		CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red4=2;
		if(typeof CS.itask_list_show_edit_pana_eazyinput_timer=="undefined"){
			CS.itask_list_show_edit_pana_eazyinput_timer=setInterval(
				function(){
					if((CS.vueObj.itask_list_show_edit_window_itask_type.indexOf('konjin')==-1 && !CS.vueObj.itask_list_show_edit_pana_houjin_input_show) ||
						(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf('konjin')!=-1 && !CS.vueObj.itask_list_show_edit_pana_kojin_input_show)){
						clearInterval(CS.itask_list_show_edit_pana_eazyinput_timer);
						CS.itask_list_show_edit_pana_eazyinput_timer=undefined;
					}else{
						var si=$("#spreadsheet1 input");
						for(var i=0;i<si.length;i++){
							if(typeof si[i].mask!="undefined"){
								si[i].removeEventListener('focus',CS.ime_mode_inactive , false);
								si[i].addEventListener('focus',CS.ime_mode_inactive , false);
								si[i].style.imeMode="inactive";
								si[i].inputmode="inactive";
								// ★ 追加: 全角→半角の自動変換を入れる
								// 変換中は触らないため composition を考慮
								if (!si[i].__halfwidthBound) {
								let composing = false;
								const normalizeNow = (el) => {
										const before = el.value;
										const after  = normalizeNumberString(before);
										if (after !== before) {
										el.value = after;
										// jSpreadsheet にも変更を伝える
										el.dispatchEvent(new Event('input', { bubbles: true }));
										el.dispatchEvent(new Event('change', { bubbles: true }));
										}
									};
									si[i].addEventListener('compositionstart', () => { composing = true; }, true);
									si[i].addEventListener('compositionend',   (e) => { composing = false; normalizeNow(e.target); }, true);
									si[i].addEventListener('input',   (e) => { if (!composing) normalizeNow(e.target); }, true);
									si[i].addEventListener('blur',    (e) => { normalizeNow(e.target); }, true);
									si[i].__halfwidthBound = true; // 二重バインド防止
								}
								if((si[i].style.color==null || si[i].style.color=="") && (typeof CS.kanri_itask_kanjo_loading!="undefined" && CS.kanri_itask_kanjo_loading)){
									CS.kanri_itask_kanjo_loading=false;
									CS.itask_list_show_edit_pana_hk_input_id=("itask_list_show_edit_pana_hk_input"+performance.now()).replaceAll('.', '');
									si[i].id=CS.itask_list_show_edit_pana_hk_input_id;
									si[i].style.color="black";
									setTimeout(function(){
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0).type = 'password';
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("width","90%");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).prop("autocomplete","off");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).prop("name",CS.itask_list_show_edit_pana_hk_input_id);
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("text-align","right");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("color","white");
									},100);
									setTimeout(function(){
										if(typeof $("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0) !="undefined"){
											$("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0).type = 'text';
										}
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("width","90%");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("color","black");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).focus();
									},400);
								}
							}
						}
						si=$("#spreadsheet2 input");
						for(var i=0;i<si.length;i++){
							if(typeof si[i].mask!="undefined"){
								si[i].removeEventListener('focus',CS.ime_mode_inactive , false);
								si[i].addEventListener('focus',CS.ime_mode_inactive , false);
								si[i].style.imeMode="inactive";
								si[i].inputmode="inactive";
								// ★ 追加: 全角→半角の自動変換を入れる
								// 変換中は触らないため composition を考慮
								if (!si[i].__halfwidthBound) {
								let composing = false;
								const normalizeNow = (el) => {
										const before = el.value;
										const after  = normalizeNumberString(before);
										if (after !== before) {
										el.value = after;
										// jSpreadsheet にも変更を伝える
										el.dispatchEvent(new Event('input', { bubbles: true }));
										el.dispatchEvent(new Event('change', { bubbles: true }));
										}
									};
									si[i].addEventListener('compositionstart', () => { composing = true; }, true);
									si[i].addEventListener('compositionend',   (e) => { composing = false; normalizeNow(e.target); }, true);
									si[i].addEventListener('input',   (e) => { if (!composing) normalizeNow(e.target); }, true);
									si[i].addEventListener('blur',    (e) => { normalizeNow(e.target); }, true);
									si[i].__halfwidthBound = true; // 二重バインド防止
								}
								if((si[i].style.color==null || si[i].style.color=="") && (typeof CS.kanri_itask_kanjo_loading!="undefined" && CS.kanri_itask_kanjo_loading)){
									CS.kanri_itask_kanjo_loading=false;
									CS.itask_list_show_edit_pana_hk_input_id=("itask_list_show_edit_pana_hk_input"+performance.now()).replaceAll('.', '');
									si[i].id=CS.itask_list_show_edit_pana_hk_input_id;
									si[i].style.color="black";
									setTimeout(function(){
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0).type = 'password';
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("width","90%");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).prop("autocomplete","off");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).prop("name",CS.itask_list_show_edit_pana_hk_input_id);
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("text-align","right");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("color","white");
									},100);
									setTimeout(function(){
										if(typeof $("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0) !="undefined"){
											$("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0).type = 'text';
										}
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("width","90%");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("color","black");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).focus();
									},400);
								}
							}
						}
						si=$("#spreadsheet3 input");
						for(var i=0;i<si.length;i++){
							if(typeof si[i].mask!="undefined"){
								si[i].removeEventListener('focus',CS.ime_mode_inactive , false);
								si[i].addEventListener('focus',CS.ime_mode_inactive , false);
								si[i].style.imeMode="inactive";
								si[i].inputmode="inactive";
								// ★ 追加: 全角→半角の自動変換を入れる
								// 変換中は触らないため composition を考慮
								if (!si[i].__halfwidthBound) {
								let composing = false;
								const normalizeNow = (el) => {
										const before = el.value;
										const after  = normalizeNumberString(before);
										if (after !== before) {
										el.value = after;
										// jSpreadsheet にも変更を伝える
										el.dispatchEvent(new Event('input', { bubbles: true }));
										el.dispatchEvent(new Event('change', { bubbles: true }));
										}
									};
									si[i].addEventListener('compositionstart', () => { composing = true; }, true);
									si[i].addEventListener('compositionend',   (e) => { composing = false; normalizeNow(e.target); }, true);
									si[i].addEventListener('input',   (e) => { if (!composing) normalizeNow(e.target); }, true);
									si[i].addEventListener('blur',    (e) => { normalizeNow(e.target); }, true);
									si[i].__halfwidthBound = true; // 二重バインド防止
								}
								if((si[i].style.color==null || si[i].style.color=="") && (typeof CS.kanri_itask_kanjo_loading!="undefined" && CS.kanri_itask_kanjo_loading)){
									CS.kanri_itask_kanjo_loading=false;
									CS.itask_list_show_edit_pana_hk_input_id=("itask_list_show_edit_pana_hk_input"+performance.now()).replaceAll('.', '');
									si[i].id=CS.itask_list_show_edit_pana_hk_input_id;
									si[i].style.color="black";
									setTimeout(function(){
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0).type = 'password';
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("width","90%");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).prop("autocomplete","off");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).prop("name",CS.itask_list_show_edit_pana_hk_input_id);
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("text-align","right");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("color","white");
									},100);
									setTimeout(function(){
										if(typeof $("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0) !="undefined"){
											$("#"+CS.itask_list_show_edit_pana_hk_input_id).get(0).type = 'text';
										}
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("width","90%");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).css("color","black");
										$("#"+CS.itask_list_show_edit_pana_hk_input_id).focus();
									},400);
								}
							}
						}
					}
				},500
			);
		}
	}
}
CS.itask_list_show_edit_window_pana_kanjo_select = function(pop_index){
	if(!CS.vueObj.itask_list_show_edit_window_flag){
		return;
	}
	if(typeof CS.itask_list_show_edit_window_kanjo_eazyinput_index!="undefined" && (CS.vueObj.itask_list_show_edit_pana_houjin_input_show || CS.vueObj.itask_list_show_edit_pana_kojin_input_show)){
		var kanjo={};
		var pop_info=CS.vueObj.kanri_itask_kanjo_show_main_search_variety_list[pop_index];
		if(CS.itask_list_show_edit_window_kanjo_eazyinput_sheetNo==1){
			for(var i=0;i<CS.vueObj.houjin_eazy_inputlist.length;i++){
				if(pop_info["variety_code"]==CS.vueObj.houjin_eazy_inputlist[i]["m_kanjo_code"] && CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.houjin_eazy_inputlist[i]["tabindex"]){
					alert("すでに追加済勘定科目です。");
					return;
				}
			}
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["m_kanjo_code"]=pop_info["variety_code"];
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["m_kanjo_id"]=pop_info["variety_code"];
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["family"]=pop_info["family_code"];
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["family_name"]=pop_info["family"];
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["genus"]=pop_info["genus_code"];
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["genus_name"]=pop_info["genus"];
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["species"]=pop_info["species_code"];
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["species_name"]=pop_info["species"];
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["variety"]=pop_info["variety_code"].split("_")[4];
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["variety_name"]=pop_info["variety"];
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["property"]=pop_info["property"];
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["abc_flag"]=pop_info["abc_flag"];
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["sort"]=0;
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["order"]=pop_info["order"];;
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["page"]=-1;
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["candidate_select_list"]=[];
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["koteiitem"]="NN"
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["koteiitemflag"]=false;
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["addflag"]=true;
			CS.vueObj.houjin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["tabindex"]=CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index;
			var sdata=CS.spreadsheet1.getData();
			CS.data=[];
			for(var i=0;i<CS.vueObj.houjin_eazy_inputlist.length;i++){
				for(var j=0;j<sdata.length;j++){
					if(sdata[j][8]==i){
						CS.vueObj.houjin_eazy_inputlist[i]["amount_pre_year"]=sdata[j][4];
						CS.vueObj.houjin_eazy_inputlist[i]["amount_this_year"]=sdata[j][6];
					}
				}
				tmpobj={};
				if(CS.vueObj.houjin_eazy_inputlist[i]["m_kanjo_code"]=="2_999_0_0_0"){
					tmpobj["family_name"]="";
					tmpobj["genus_name"]="";
					tmpobj["species_name"]="";
				}else{
					tmpobj["family_name"]=CS.vueObj.houjin_eazy_inputlist[i]["family_name"];
					tmpobj["genus_name"]=CS.vueObj.houjin_eazy_inputlist[i]["genus_name"];
					tmpobj["species_name"]=CS.vueObj.houjin_eazy_inputlist[i]["species_name"];
				}
				tmpobj["variety_name"]=CS.vueObj.houjin_eazy_inputlist[i]["variety_name"];
				//tmpobj["variety_name"]=CS.vueObj.houjin_eazy_inputlist[i]["variety_name"]+"["+CS.vueObj.houjin_eazy_inputlist[i]["property"]+"]"+CS.vueObj.houjin_eazy_inputlist[i]["m_kanjo_code"];
				tmpobj["index"]=i;
				tmpobj["amount_pre_year"]=CS.vueObj.houjin_eazy_inputlist[i]["amount_pre_year"];
				tmpobj["zenki_keisan"]="";
				tmpobj["amount_this_year"]=CS.vueObj.houjin_eazy_inputlist[i]["amount_this_year"];
				tmpobj["konki_keisan"]="";
				if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.houjin_eazy_inputlist[i]["tabindex"]){
					CS.data.push(tmpobj);
				}
			}
			$("#spreadsheet1").empty();
			for(var i=0;i<CS.data.length;i++){
				if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
					if(CS.data[i]["property"]==-1 || CS.data[i]["property"]=="-1"){
						if(CS.data[i]["variety"]>0){
							// CS.data[i]["zenki_keisan"]="正の値を入力してください";
							// CS.data[i]["konki_keisan"]="正の値を入力してください";
						}
					}
					if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==1){
						if(i==10 || i==30){
							CS.data[i]["zenki_keisan"]="正の値を入力してください";
							CS.data[i]["konki_keisan"]="正の値を入力してください";
						}
					}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==2){

					}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==3){

					}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==4){

					}
				}
			}
			CS.spreadsheet1 =jspreadsheet(document.getElementById('spreadsheet1'), {
				data:CS.data,
				columns: CS.columns,
				contextMenu:CS.contextMenu,
				columnSorting:false,
				allowManualInsertColumn:false,
				allowManualInsertRow:false,
				allowDeleteColumn:false,
				allowDeleteRow:false,
				allowDeletingAllRows:false,
				allowInsertColumn:false,
				options:CS.options,
				onafterchanges: CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_change,
				onselection: (instance, x1, y1, x2, y2) => {
					// 選択されたセルの開始位置を記録
					CS.aitask_eazyinput_spreadsheet_selectedCell = { row: y1, col: x1 };
				}
			});
			CS.spreadsheet1.el.addEventListener('keydown', CS.aitask_eazyinput_spreadsheet_keydown1);
		}else if(CS.itask_list_show_edit_window_kanjo_eazyinput_sheetNo==2){
			for(var i=0;i<CS.vueObj.kojin_eazy_inputlist.length;i++){
				if(pop_info["variety_code"]==CS.vueObj.kojin_eazy_inputlist[i]["m_kanjo_code"] && CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.kojin_eazy_inputlist[i]["tabindex"]){
					alert("すでに追加済勘定科目です。");
					return;
				}
			}
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["m_kanjo_code"]=pop_info["variety_code"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["m_kanjo_id"]=pop_info["variety_code"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["family"]=pop_info["family_code"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["family_name"]=pop_info["family"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["genus"]=pop_info["genus_code"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["genus_name"]=pop_info["genus"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["species"]=pop_info["species_code"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["species_name"]=pop_info["species"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["variety"]=pop_info["variety_code"].split("_")[4];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["variety_name"]=pop_info["variety"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["property"]=pop_info["property"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["abc_flag"]=pop_info["abc_flag"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["sort"]=0;
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["order"]=pop_info["order"];;
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["page"]=-1;
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["candidate_select_list"]=[];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["koteiitem"]="NN"
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["koteiitemflag"]=false;
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["addflag"]=true;
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["tabindex"]=CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index;
			var sdata=CS.spreadsheet2.getData();
			CS.data=[];
			CS.data2=[];
			var o=0;
			for(var i=0;i<CS.vueObj.kojin_eazy_inputlist.length;i++){
				for(var j=0;j<sdata.length;j++){
					if(sdata[j][3]==i){
						CS.vueObj.kojin_eazy_inputlist[i]["amount_this_year"]=sdata[j][1];
					}
				}
				tmpobj={};
				tmpobj["variety_name"]=CS.vueObj.kojin_eazy_inputlist[i]["variety_name"];
				tmpobj["index"]=i;
				tmpobj["amount_this_year"]=CS.vueObj.kojin_eazy_inputlist[i]["amount_this_year"];
				tmpobj["konki_keisan"]="";
				if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.kojin_eazy_inputlist[i]["tabindex"]){
					if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==1){
						if(o<25){
							CS.data.push(tmpobj);
						}else{
							CS.data2.push(tmpobj);
						}
					}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==2){
						if(o<16){
							CS.data.push(tmpobj);
						}else{
							CS.data2.push(tmpobj);
						}
					}else{
						CS.data.push(tmpobj);
					}
					o++;
				}
			}
			$("#spreadsheet2").empty();
			for(var i=0;i<CS.data.length;i++){
				if(CS.vueObj.itask_list_show_edit_pana_kojin_input_show){
					if(CS.data[i]["property"]==-1 || CS.data[i]["property"]=="-1"){
						if(CS.data[i]["variety"]>0){
							// CS.data[i]["zenki_keisan"]="正の値を入力してください";
							// CS.data[i]["konki_keisan"]="正の値を入力してください";
						}
					}
					if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==1){
						if(i==10 || i==30){
							// CS.data[i]["zenki_keisan"]="正の値を入力してください";
							// CS.data[i]["konki_keisan"]="正の値を入力してください";
						}
					}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==2){

					}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==3){

					}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==4){

					}
				}
			}
			CS.spreadsheet2 =jspreadsheet(document.getElementById('spreadsheet2'), {
				data:CS.data,
				columns: CS.columns,
				contextMenu:CS.contextMenu,
				columnSorting:false,
				allowManualInsertColumn:false,
				allowManualInsertRow:false,
				allowDeleteColumn:false,
				allowDeleteRow:false,
				allowDeletingAllRows:false,
				allowInsertColumn:false,
				options:CS.options,
				onafterchanges: CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_change,
				onselection: (instance, x1, y1, x2, y2) => {
					// 選択されたセルの開始位置を記録
					CS.aitask_eazyinput_spreadsheet_selectedCell = { row: y1, col: x1 };
				}
			});
			CS.spreadsheet2.el.addEventListener('keydown', CS.aitask_eazyinput_spreadsheet_keydown2);
		}else if(CS.itask_list_show_edit_window_kanjo_eazyinput_sheetNo==3){
			for(var i=0;i<CS.vueObj.kojin_eazy_inputlist.length;i++){
				if(pop_info["variety_code"]==CS.vueObj.kojin_eazy_inputlist[i]["m_kanjo_code"] && CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.kojin_eazy_inputlist[i]["tabindex"]){
					alert("すでに追加済勘定科目です。");
					return;
				}
			}
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["m_kanjo_code"]=pop_info["variety_code"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["m_kanjo_id"]=pop_info["variety_code"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["family"]=pop_info["family_code"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["family_name"]=pop_info["family"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["genus"]=pop_info["genus_code"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["genus_name"]=pop_info["genus"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["species"]=pop_info["species_code"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["species_name"]=pop_info["species"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["variety"]=pop_info["variety_code"].split("_")[4];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["variety_name"]=pop_info["variety"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["property"]=pop_info["property"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["abc_flag"]=pop_info["abc_flag"];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["sort"]=0;
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["order"]=pop_info["order"];;
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["page"]=-1;
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["candidate_select_list"]=[];
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["koteiitem"]="NN"
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["koteiitemflag"]=false;
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["addflag"]=true;
			CS.vueObj.kojin_eazy_inputlist[CS.itask_list_show_edit_window_kanjo_eazyinput_index]["tabindex"]=CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index;
			var sdata=CS.spreadsheet3.getData();
			CS.data=[];
			CS.data2=[];
			var o=0;
			for(var i=0;i<CS.vueObj.kojin_eazy_inputlist.length;i++){
				for(var j=0;j<sdata.length;j++){
					if(sdata[j][3]==i){
						CS.vueObj.kojin_eazy_inputlist[i]["amount_this_year"]=sdata[j][1];
					}
				}
				tmpobj={};
				tmpobj["variety_name"]=CS.vueObj.kojin_eazy_inputlist[i]["variety_name"];
				tmpobj["index"]=i;
				tmpobj["amount_this_year"]=CS.vueObj.kojin_eazy_inputlist[i]["amount_this_year"];
				tmpobj["konki_keisan"]="";
				if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.kojin_eazy_inputlist[i]["tabindex"]){
					if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==1){
						if(o<25){
							CS.data.push(tmpobj);
						}else{
							CS.data2.push(tmpobj);
						}
					}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==2){
						if(o<16){
							CS.data.push(tmpobj);
						}else{
							CS.data2.push(tmpobj);
						}
					}else{
						CS.data.push(tmpobj);
					}
					o++;
				}
			}
			$("#spreadsheet3").empty();
			CS.spreadsheet3 =jspreadsheet(document.getElementById('spreadsheet3'), {
				data:CS.data2,
				columns: CS.columns,
				contextMenu:CS.contextMenu,
				columnSorting:false,
				allowManualInsertColumn:false,
				allowManualInsertRow:false,
				allowDeleteColumn:false,
				allowDeleteRow:false,
				allowDeletingAllRows:false,
				allowInsertColumn:false,
				options:CS.options,
				onafterchanges: CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_change,
				onselection: (instance, x1, y1, x2, y2) => {
					// 選択されたセルの開始位置を記録
					CS.aitask_eazyinput_spreadsheet_selectedCell = { row: y1, col: x1 };
				}
			});
			CS.spreadsheet3.el.addEventListener('keydown', CS.aitask_eazyinput_spreadsheet_keydown3);
		}
		
		setTimeout(CS.itask_list_show_edit_pana_del_left_td, 10);
		

		CS.kanjo_kamoku__pop_back();
		return;
	}
	if(CS.itask_list_show_edit_window_kanjo_index=="NONE" || typeof CS.kanjo_detail_add_index != "undefined"){
		var maxsort=0;
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			if(maxsort<parseInt(CS.vueObj.kanjo_detail[i]["sort"],10)){
				maxsort=parseInt(CS.vueObj.kanjo_detail[i]["sort"],10);
			}
		}
		maxsort++;
		var order=1;
		if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1 || CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
			order=2;
		}
		var kanjo={};
		var pop_info=CS.vueObj.kanri_itask_kanjo_show_main_search_variety_list[pop_index];
		kanjo["m_kanjo_code"]=pop_info["variety_code"];
		kanjo["order"]=pop_info["order"];
		kanjo["m_kanjo_id"]=pop_info["variety_code"];
		kanjo["family"]=pop_info["family_code"];
		kanjo["family_name"]=pop_info["family"];
		kanjo["genus"]=pop_info["genus_code"];
		kanjo["genus_name"]=pop_info["genus"];
		kanjo["species"]=pop_info["species_code"];
		kanjo["species_name"]=pop_info["species"];
		kanjo["variety"]=pop_info["variety_code"].split("_")[4];
		kanjo["variety_name"]=pop_info["variety"];
		kanjo["property"]=pop_info["property"];
		kanjo["abc_flag"]=pop_info["abc_flag"];
		kanjo["sort"]=maxsort;
		kanjo["order"]=order;
		kanjo["page"]=-1;
		kanjo["candidate_select_list"]=[];
		kanjo["addflag"]=true;
		kanjo["amount_this_year"]="";
		kanjo["amount_pre_year"]="";
		kanjo["kenzankaijyo"]=false;
		kanjo["koteiitem"]="NN"
		kanjo["koteiitemflag"]=false;
		for(var i=0;i<this.kanjo_detail.length;i++){
			if(kanjo["m_kanjo_code"]==this.kanjo_detail[i]["m_kanjo_code"] && CS.vueObj.itask_list_show_edit_pana_tag_button_index==this.kanjo_detail[i]["tabindex"]){
				alert("すでに追加済勘定科目です。");
				return;
			}
		}
		var dindex=this.kanjo_detail.length;
		for(var i=this.kanjo_detail.length-1;i>-1;i--){
			if(this.kanjo_detail[i]["order"]+""==kanjo["order"]+"" && this.kanjo_detail[i]["family"]+""==kanjo["family"]+"" && this.kanjo_detail[i]["genus"]+""==kanjo["genus"]+""){
				if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==4){
					if(this.kanjo_detail[i]["family"]+""=="4"){
						dindex=i+1;
						break;
					}
				}else{
					dindex=i+1;
					break;
				}
			}
		}
		if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==4 && kanjo["family"]+""=="4" && kanjo["order"]+""=="1" ){
			kanjo["tabindex"]=4;
		}else if(kanjo.order=='2' && parseInt(kanjo.family,10)<40){
			kanjo["tabindex"]=1;
		}else if(kanjo.order=='2' && parseInt(kanjo.family,10)>=40){
			kanjo["tabindex"]=2;
		}else if(kanjo.order=='1'){
			kanjo["tabindex"]=3;
		}else{
			kanjo["tabindex"]=4;
		}
		
		// 該当小分類がある場合に、
		// 　　　①移動項目は合計勘定項目の場合、その小分類の一番下に置く
		// 　　　①移動項目は普通勘定項目の場合、その小分類の普通勘定項目の一番下に置く
		// 該当小分類がない場合に、
		// 　　　①移動項目はその中分類の小分類の一番近い項目の上或いは下
		var itask_list_show_edit_pana_tag_button_index=1;
		if(parseInt(kanjo["order"],10)==2 && parseInt(kanjo["family"],10)<40){
			itask_list_show_edit_pana_tag_button_index=1;
		}else if(parseInt(kanjo["order"],10)==2 && parseInt(kanjo["family"],10)>=40){
			itask_list_show_edit_pana_tag_button_index=2;
		}else if(kanjo["tabindex"]!=4){
			itask_list_show_edit_pana_tag_button_index=3;
		}else{
			itask_list_show_edit_pana_tag_button_index=4;
		}
		
		var change_table_flag=false;
		if(itask_list_show_edit_pana_tag_button_index!=CS.vueObj.itask_list_show_edit_pana_tag_button_index){
			change_table_flag=true;
		}
		if(typeof CS.kanjo_detail_add_index == "undefined"){
			var addflag=false;
			//①移動項目は合計勘定項目の場合、その小分類の一番下に置く
			var shotkey_=kanjo["m_kanjo_code"].split('_');
			if(parseInt(shotkey_[4],10)<=0){
				for(var k=CS.vueObj.kanjo_detail.length-1;k>=0;k--){
					var rule_=CS.vueObj.kanjo_detail[k]["m_kanjo_code"].split('_');
					okflag=true;
					for(var i=0;i<4;i++){
						if(rule_[i]!=shotkey_[i]){
							okflag=false;
						}
					}
					if(okflag){
						this.kanjo_detail.splice(k+1, 0, kanjo);
						addflag=true;
						break;
					}
				}
				if(!addflag && parseInt(shotkey_[3],10)==0){
					for(var k=CS.vueObj.kanjo_detail.length-1;k>=0;k--){
						var rule_=CS.vueObj.kanjo_detail[k]["m_kanjo_code"].split('_');
						okflag=true;
						for(var i=0;i<3;i++){
							if(rule_[i]!=shotkey_[i]){
								okflag=false;
							}
						}
						if(okflag){
							this.kanjo_detail.splice(k+1, 0, kanjo);
							addflag=true;
							break;
						}
					}
				}
				if(!addflag && parseInt(shotkey_[2],10)==0){
					for(var k=CS.vueObj.kanjo_detail.length-1;k>=0;k--){
						var rule_=CS.vueObj.kanjo_detail[k]["m_kanjo_code"].split('_');
						okflag=true;
						for(var i=0;i<2;i++){
							if(rule_[i]!=shotkey_[i]){
								okflag=false;
							}
						}
						if(okflag){
							this.kanjo_detail.splice(k+1, 0, kanjo);
							addflag=true;
							break;
						}
					}
				}
			}else{
			// 　　　①移動項目は普通勘定項目の場合、その小分類の普通勘定項目の一番下に置く
				for(var k=CS.vueObj.kanjo_detail.length-1;k>=0;k--){
					var rule_=CS.vueObj.kanjo_detail[k]["m_kanjo_code"].split('_');
					okflag=true;
					for(var i=0;i<4;i++){
						if(rule_[i]!=shotkey_[i]){
							okflag=false;
						}
					}
					if(okflag){
						if(parseInt(rule_[4],10)>0){
							this.kanjo_detail.splice(k+1, 0, kanjo);
							addflag=true;
							break;
						}
					}
				}
			// 　　　①その小分類の普通勘定項目がなく、合計項目がありの場合
				if(!addflag){
					for(var k=CS.vueObj.kanjo_detail.length-1;k>=0;k--){
						var rule_=CS.vueObj.kanjo_detail[k]["m_kanjo_code"].split('_');
						okflag=true;
						for(var i=0;i<4;i++){
							if(rule_[i]!=shotkey_[i]){
								okflag=false;
							}
						}
						if(okflag){
							this.kanjo_detail.splice(k+1, 0, kanjo);
							addflag=true;
							break;
						}
					}
				}
			}
			// 該当小分類がない場合に、
			// 　　　①移動項目はその中分類の小分類の一番近い項目の上或いは下
			if(!addflag){
				//一番近い項目小分類のindexを記録する
				var iii=99999;//目標のindex
				var vvv="";//目標の小分類
				var sss=999999;//目標の小分類と挿入対象の小分類の差
				for(var k=CS.vueObj.kanjo_detail.length-1;k>=0;k--){
					var rule_=CS.vueObj.kanjo_detail[k]["m_kanjo_code"].split('_');
					okflag=true;
					for(var i=0;i<3;i++){
						if(rule_[i]!=shotkey_[i]){
							okflag=false;
						}
					}
					if(okflag){
						if(Math.abs(parseInt(rule_[3],10)-parseInt(kanjo["species"],10))<sss){
							iii=k;
							vvv=rule_[4];
							sss=Math.abs(parseInt(rule_[3],10)-parseInt(kanjo["species"],10));
						}
					}
				}
				if(iii!=99999){
					var rule_=CS.vueObj.kanjo_detail[iii]["m_kanjo_code"].split('_');
					if(parseInt(kanjo["species"],10)>parseInt(rule_[3],10)){
						iii=iii+1;
					}else{
						iii=iii-1;
					}
					this.kanjo_detail.splice(iii, 0, kanjo);
					addflag=true;
				}
			}
			if(!addflag){
				this.kanjo_detail.splice(dindex, 0, kanjo);
			}
		}else{
			var addindex=CS.kanjo_detail_add_index;
			this.kanjo_detail.splice(addindex, 0, kanjo);
			CS.kanjo_detail_add_index=undefined;
		}
		
		
		if(parseInt(kanjo["order"],10)==2 && parseInt(kanjo["family"],10)<40){
			CS.itask_list_show_edit_window_change_tab(1);
		}else if(parseInt(kanjo["order"],10)==2 && parseInt(kanjo["family"],10)>=40){
			CS.itask_list_show_edit_window_change_tab(2);
		}else if(kanjo["tabindex"]!=4){
			CS.itask_list_show_edit_window_change_tab(3);
		}else{
			CS.itask_list_show_edit_window_change_tab(4);
		}
		
	}else{
		if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
			var kanjo=CS.vueObj.kanjo_detail[CS.itask_list_show_edit_window_kanjo_index];
			var pop_info=CS.vueObj.kanri_itask_kanjo_show_main_search_variety_list[pop_index];
			kanjo["m_kanjo_code"]=pop_info["variety_code"];
			kanjo["order"]=pop_info["order"];
			kanjo["m_kanjo_id"]=pop_info["variety_code"];
			kanjo["family"]=pop_info["family_code"];
			kanjo["family_name"]=pop_info["family"];
			kanjo["genus"]=pop_info["genus_code"];
			kanjo["genus_name"]=pop_info["genus"];
			kanjo["species"]=pop_info["species_code"];
			kanjo["species_name"]=pop_info["species"];
			kanjo["variety"]=pop_info["variety_code"].split("_")[4];
			kanjo["variety_name"]=pop_info["variety"];
			kanjo["property"]=pop_info["property"];
			kanjo["abc_flag"]=pop_info["abc_flag"];
			kanjo["kenzankaijyo"]=false;
			kanjo["koteiitem"]="NN"
			kanjo["koteiitemflag"]=false;
			//kanjo["sort"]=pop_info["sort"];
			kanjo["changeflag"]=true;
			this.$set(this.kanjo_detail, CS.itask_list_show_edit_window_kanjo_index, kanjo);
			CS.itask_list_show_edit_window_kensan(5);
			CS.kanjo_kamoku__pop_back();
			return;
		}
		var kanjo=CS.vueObj.kanjo_detail[CS.itask_list_show_edit_window_kanjo_index];
		var pop_info=CS.vueObj.kanri_itask_kanjo_show_main_search_variety_list[pop_index];
		for(var i=0;i<this.kanjo_detail.length;i++){
			if(pop_info["variety_code"]==this.kanjo_detail[i]["m_kanjo_code"] && CS.vueObj.itask_list_show_edit_pana_tag_button_index==this.kanjo_detail[i]["tabindex"]){
				alert("すでに追加済勘定科目です。");
				return;
			}
		}
		kanjo["m_kanjo_code"]=pop_info["variety_code"];
		kanjo["order"]=pop_info["order"];
		kanjo["m_kanjo_id"]=pop_info["variety_code"];
		kanjo["family"]=pop_info["family_code"];
		kanjo["family_name"]=pop_info["family"];
		kanjo["genus"]=pop_info["genus_code"];
		kanjo["genus_name"]=pop_info["genus"];
		kanjo["species"]=pop_info["species_code"];
		kanjo["species_name"]=pop_info["species"];
		kanjo["variety"]=pop_info["variety_code"].split("_")[4];
		kanjo["variety_name"]=pop_info["variety"];
		kanjo["property"]=pop_info["property"];
		kanjo["abc_flag"]=pop_info["abc_flag"];
		kanjo["kenzankaijyo"]=false;
		kanjo["koteiitem"]="NN"
		kanjo["koteiitemflag"]=false;
		//kanjo["sort"]=pop_info["sort"];
		kanjo["changeflag"]=true;
		if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==4){
			kanjo["tabindex"]=4;
		}else if(kanjo.order=='2' && parseInt(kanjo.family,10)<40){
			kanjo["tabindex"]=1;
		}else if(kanjo.order=='2' && parseInt(kanjo.family,10)>=40){
			kanjo["tabindex"]=2;
		}else if(kanjo.order=='1'){
			kanjo["tabindex"]=3;
		}else{
			kanjo["tabindex"]=4;
		}
		
		// 該当小分類がある場合に、
		// 　　　①移動項目は合計勘定項目の場合、その小分類の一番下に置く
		// 　　　①移動項目は普通勘定項目の場合、その小分類の普通勘定項目の一番下に置く
		// 該当小分類がない場合に、
		// 　　　①移動項目はその中分類の小分類の一番近い項目の上或いは下
		var itask_list_show_edit_pana_tag_button_index=1;
		if(parseInt(kanjo["order"],10)==2 && parseInt(kanjo["family"],10)<40){
			itask_list_show_edit_pana_tag_button_index=1;
		}else if(parseInt(kanjo["order"],10)==2 && parseInt(kanjo["family"],10)>=40){
			itask_list_show_edit_pana_tag_button_index=2;
		}else if(kanjo["tabindex"]!=4){
			itask_list_show_edit_pana_tag_button_index=3;
		}else{
			itask_list_show_edit_pana_tag_button_index=4;
		}
		
		var change_table_flag=false;
		if(itask_list_show_edit_pana_tag_button_index!=CS.vueObj.itask_list_show_edit_pana_tag_button_index){
			change_table_flag=true;
		}
		if(change_table_flag){
			var shotkey_=kanjo["m_kanjo_code"].split('_');
			var addflag=false;
			//①移動項目は合計勘定項目の場合、その小分類の一番下に置く
			if(parseInt(shotkey_[4],10)<=0){
				for(var k=CS.vueObj.kanjo_detail.length-1;k>=0;k--){
					var rule_=CS.vueObj.kanjo_detail[k]["m_kanjo_code"].split('_');
					okflag=true;
					for(var i=0;i<4;i++){
						if(rule_[i]!=shotkey_[i]){
							okflag=false;
						}
					}
					if(okflag){
						this.kanjo_detail.splice(CS.itask_list_show_edit_window_kanjo_index,1);
						if(CS.itask_list_show_edit_window_kanjo_index<iii){
							iii--;
						}
						this.kanjo_detail.splice(k+1, 0, kanjo);
						addflag=true;
						break;
					}
				}
			}else{
			// 　　　①移動項目は普通勘定項目の場合、その小分類の普通勘定項目の一番下に置く
				for(var k=CS.vueObj.kanjo_detail.length-1;k>=0;k--){
					var rule_=CS.vueObj.kanjo_detail[k]["m_kanjo_code"].split('_');
					okflag=true;
					for(var i=0;i<4;i++){
						if(rule_[i]!=shotkey_[i]){
							okflag=false;
						}
					}
					if(okflag){
						if(parseInt(rule_[4],10)>0){
							this.kanjo_detail.splice(CS.itask_list_show_edit_window_kanjo_index,1);
							if(CS.itask_list_show_edit_window_kanjo_index<iii){
								iii--;
							}
							this.kanjo_detail.splice(k+1, 0, kanjo);
							addflag=true;
							break;
						}
					}
				}
			// 　　　①その小分類の普通勘定項目がなく、合計項目がありの場合
				if(!addflag){
					for(var k=CS.vueObj.kanjo_detail.length-1;k>=0;k--){
						var rule_=CS.vueObj.kanjo_detail[k]["m_kanjo_code"].split('_');
						okflag=true;
						for(var i=0;i<4;i++){
							if(rule_[i]!=shotkey_[i]){
								okflag=false;
							}
						}
						if(okflag){
							this.kanjo_detail.splice(CS.itask_list_show_edit_window_kanjo_index,1);
							if(CS.itask_list_show_edit_window_kanjo_index<iii){
								iii--;
							}
							this.kanjo_detail.splice(k+1, 0, kanjo);
							addflag=true;
							break;
						}
					}
				}
			}
			// 該当小分類がない場合に、
			// 　　　①移動項目はその中分類の小分類の一番近い項目の上或いは下
			if(!addflag){
				//一番近い項目小分類のindexを記録する
				var iii=99999;//目標のindex
				var vvv="";//目標の小分類
				var sss=999999;//目標の小分類と挿入対象の小分類の差
				for(var k=CS.vueObj.kanjo_detail.length-1;k>=0;k--){
					var rule_=CS.vueObj.kanjo_detail[k]["m_kanjo_code"].split('_');
					okflag=true;
					for(var i=0;i<3;i++){
						if(rule_[i]!=shotkey_[i]){
							okflag=false;
						}
					}
					if(okflag){
						if(Math.abs(parseInt(rule_[3],10)-parseInt(kanjo["species"],10))<sss){
							iii=k;
							vvv=rule_[4];
							sss=Math.abs(parseInt(rule_[3],10)-parseInt(kanjo["species"],10));
						}
					}
				}
				if(iii!=99999){
					var rule_=CS.vueObj.kanjo_detail[iii]["m_kanjo_code"].split('_');
					if(parseInt(kanjo["species"],10)>parseInt(rule_[3],10)){
						iii=iii+1;
					}else{
						iii=iii-1;
					}
					this.kanjo_detail.splice(CS.itask_list_show_edit_window_kanjo_index,1);
					if(CS.itask_list_show_edit_window_kanjo_index<iii){
						iii--;
					}
					this.kanjo_detail.splice(iii, 0, kanjo);
					addflag=true;
				}
			}
			if(!addflag){
				this.$set(this.kanjo_detail, CS.itask_list_show_edit_window_kanjo_index, kanjo);
			}
		}else{
			this.$set(this.kanjo_detail, CS.itask_list_show_edit_window_kanjo_index, kanjo);
		}
		
		if(parseInt(kanjo["order"],10)==2 && parseInt(kanjo["family"],10)<40){
			CS.itask_list_show_edit_window_change_tab(1);
		}else if(parseInt(kanjo["order"],10)==2 && parseInt(kanjo["family"],10)>=40){
			CS.itask_list_show_edit_window_change_tab(2);
		}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
			CS.itask_list_show_edit_window_change_tab(3);
		}else{
			CS.itask_list_show_edit_window_change_tab(4);
		}
		// CS.itask_list_show_edit_pana_resort_kanjo_detail();
	}
	CS.kanjo_kamoku__pop_back();
}
CS.set_itask_list_show_edit_pana_company_info = function(index){
	CS.vueObj.itask_list_show_edit_pana_company_code=CS.vueObj.kanri_itask_company_master_pop_list[index].code;
	CS.vueObj.itask_list_show_edit_pana_company_name=CS.vueObj.kanri_itask_company_master_pop_list[index].name;
	CS.kanri_itask_company_master_pop_back();
	CS.itask_list_show_edit_window_getcompanyinfo();
};
CS.itask_list_show_edit_window_pana_save_sum_list_id = function(idlist){
    //指定したspeciesのみ集計
	var count=0;
	var data=[];
    let sum_amount_this_year="A" ;let sum_amount_pre_year="A";let goukei_kingaku_param=1;let sum_count =0;let daburi_flg=0;var tmp=0;let futsuu_kamoku_flg=0;let goukei_kamoku_flg=0;//20221214
	var dedlist={};
	var dedlist_p={};
	var dedlist_t={};
	
	////////////////////////////////////////
	var loselist={};
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
    }
	////////////////////////////////////
	
	data=[];
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(typeof CS.vueObj.kanjo_detail[i]['tabindex'] !="undefined"){
			data[i]['candidate'][0]['tabindex']=parseInt(CS.vueObj.kanjo_detail[i]['tabindex'],10);
		}
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		futsuu_kamoku_flg=0;
		count==0;
		if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
			continue;
		}
		if (idlist.includes(i)){
			if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
				if(isNaN(sum_amount_pre_year)){
					sum_amount_pre_year=0;
				}
				if(isNaN(data[i]['amount_pre_year'])){
					data[i]['amount_pre_year']=0;
				}
			}
			if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
				if(isNaN(sum_amount_this_year)){
					sum_amount_this_year=0;
				}
				if(isNaN(data[i]['amount_this_year'])){
					data[i]['amount_this_year']=0;
				}
			}
			sum_amount_this_year+=parseInt(data[i]['amount_this_year'],10) * data[i]['candidate'][0]['property'];
			sum_amount_pre_year+=parseInt(data[i]['amount_pre_year'],10) * data[i]['candidate'][0]['property'];
			sum_count +=1;
			count++;
				
		}
	}
    sum_amount_this_year =  sum_amount_this_year*goukei_kingaku_param
    sum_amount_pre_year =  sum_amount_pre_year *goukei_kingaku_param
	if(count==0){
		sum_amount_this_year="";
		sum_amount_pre_year="";
	}
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
    return [sum_amount_this_year,sum_amount_pre_year]
}
CS.itask_list_show_edit_window_pana_save_sum_list = function(codelist){
    //指定したspeciesのみ集計
	var count=0;
	var data=[];
    let sum_amount_this_year="A" ;let sum_amount_pre_year="A";let goukei_kingaku_param=1;let sum_count =0;let daburi_flg=0;var tmp=0;let futsuu_kamoku_flg=0;let goukei_kamoku_flg=0;//20221214
	var dedlist={};
	var dedlist_p={};
	var dedlist_t={};
	
	////////////////////////////////////////
	var loselist={};
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
    }
	////////////////////////////////////
	
	data=[];
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(typeof CS.vueObj.kanjo_detail[i]['tabindex'] !="undefined"){
			data[i]['candidate'][0]['tabindex']=parseInt(CS.vueObj.kanjo_detail[i]['tabindex'],10);
		}
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		futsuu_kamoku_flg=0;
		count==0;
		if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
			continue;
		}
		if (codelist.includes(data[i]['m_kanjo_code'])){
			if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
				if(isNaN(sum_amount_pre_year)){
					sum_amount_pre_year=0;
				}
				if(isNaN(data[i]['amount_pre_year'])){
					data[i]['amount_pre_year']=0;
				}
			}
			if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
				if(isNaN(sum_amount_this_year)){
					sum_amount_this_year=0;
				}
				if(isNaN(data[i]['amount_this_year'])){
					data[i]['amount_this_year']=0;
				}
			}
			if(data[i]['m_kanjo_code']=="1_4_2_14_1" || data[i]['m_kanjo_code']=="1_4_1_0_2" || data[i]['m_kanjo_code']=="1_6_0_0_-4" || data[i]['m_kanjo_code']=="1_7_0_0_-4" || data[i]['m_kanjo_code']=="1_4_1_0_2"){
				sum_amount_this_year+=parseInt(data[i]['amount_this_year'],10);
				sum_amount_pre_year+=parseInt(data[i]['amount_pre_year'],10);
			}else{
				sum_amount_this_year+=parseInt(data[i]['amount_this_year'],10) * data[i]['candidate'][0]['property'];
				sum_amount_pre_year+=parseInt(data[i]['amount_pre_year'],10) * data[i]['candidate'][0]['property'];
			}

			sum_count +=1;
			count++;
				
		}
	}
    sum_amount_this_year =  sum_amount_this_year*goukei_kingaku_param
    sum_amount_pre_year =  sum_amount_pre_year *goukei_kingaku_param
	if(count==0){
		sum_amount_this_year="";
		sum_amount_pre_year="";
	}
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
    return [sum_amount_this_year,sum_amount_pre_year]
}
//合計項目を探す
CS.itask_list_show_edit_window_pana_csv_find_sum = function(order,family,genus,species){
		for (var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
				continue;
			}
			var nextflag=true;
			if(typeof order!="undefined" && order!=CS.vueObj.kanjo_detail[i]["order"]){
				continue;
			}
			if(typeof family!="undefined" && family!=CS.vueObj.kanjo_detail[i]["family"]){
				continue;
			}
			if(typeof genus!="undefined" && genus!=CS.vueObj.kanjo_detail[i]["genus"]){
				continue;
			}
			if(typeof species!="undefined" && species!=CS.vueObj.kanjo_detail[i]["species"]){
				continue;
			}
			if(parseInt(CS.vueObj.kanjo_detail[i]["variety"],10)<=0){
				return CS.vueObj.kanjo_detail[i]["amount_this_year"];
			}
		}
		return null;
}
//指定したコードを探す
CS.itask_list_show_edit_window_pana_get_one = function(order,family,genus,species,variety){
		for (var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
				continue;
			}
			var nextflag=true;
			if(typeof order!="undefined" && order!=CS.vueObj.kanjo_detail[i]["order"]){
				continue;
			}
			if(typeof family!="undefined" && family!=CS.vueObj.kanjo_detail[i]["family"]){
				continue;
			}
			if(typeof genus!="undefined" && genus!=CS.vueObj.kanjo_detail[i]["genus"]){
				continue;
			}
			if(typeof species!="undefined" && species!=CS.vueObj.kanjo_detail[i]["species"]){
				continue;
			}
			if(typeof variety!="undefined" && variety==CS.vueObj.kanjo_detail[i]["variety"]){
				return [parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10) * parseInt(CS.vueObj.kanjo_detail[i]['property'],10),parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10) * parseInt(CS.vueObj.kanjo_detail[i]['property'],10)];
			}
		}
		return [null,null];
}
CS.get_csv_kingaku = function(rule,amountname){
	if(typeof CS.itask_tool_setedmap_index !="undefined" && typeof CS.itask_tool_setedmap_index[rule] != "undefined" && CS.itask_tool_setedmap_index[rule] != null && CS.itask_tool_setedmap_index[rule] != "" ){
		if(amountname=="zenki_keisan"){
			if(CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_index[rule]]["amount_pre_year"]=="" || CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_index[rule]]["amount_pre_year"]==null){
				return null;
			}else{
				return parseInt(CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_index[rule]]["amount_pre_year"].replaceAll(',', ''),10);
			}
		}else{
			if(CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_index[rule]]["amount_this_year"]=="" || CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_index[rule]]["amount_pre_year"]==null){
				return null;
			}else{
				return parseInt(CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_index[rule]]["amount_this_year"].replaceAll(',', ''),10);
			}
		}
	}
	return null;
}
CS.set_csv_kingaku_pl = function(rule,no){
	if(CS.get_csv_kingaku(rule,"zenki_keisan")!=null && !isNaN(CS.get_csv_kingaku(rule,"zenki_keisan"))){
		CS.edit_window_kensan_pl_0[no]= CS.get_csv_kingaku(rule,"zenki_keisan");
	}
	if(CS.get_csv_kingaku(rule,"konki_keisan")!=null && !isNaN(CS.get_csv_kingaku(rule,"konki_keisan"))){
		CS.edit_window_kensan_pl_1[no]= CS.get_csv_kingaku(rule,"konki_keisan");
	}
}
CS.set_csv_kingaku_bs = function(rule,no){
	if(CS.get_csv_kingaku(rule,"zenki_keisan")!=null && !isNaN(CS.get_csv_kingaku(rule,"zenki_keisan"))){
		CS.edit_window_kensan_bs_0[no]= CS.get_csv_kingaku(rule,"zenki_keisan");
	}
	if(CS.get_csv_kingaku(rule,"konki_keisan")!=null && !isNaN(CS.get_csv_kingaku(rule,"konki_keisan"))){
		CS.edit_window_kensan_bs_1[no]= CS.get_csv_kingaku(rule,"konki_keisan");
	}
}
CS.set_senen=function(){
	var data=[];
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		
		var senenflag=false;
		if(parseInt(CS.vueObj.kanjo_detail[i]["order"],10)==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)<40 ){
			if(CS.vueObj.itask_list_show_edit_pana_senen_tani1){
				senenflag=true;
			}
		}
		if(parseInt(CS.vueObj.kanjo_detail[i]["order"],10)==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)>=40 ){
			if(CS.vueObj.itask_list_show_edit_pana_senen_tani2){
				senenflag=true;
			}
		}
		if(parseInt(CS.vueObj.kanjo_detail[i]["order"],10)==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)!=4 ){
			if(CS.vueObj.itask_list_show_edit_pana_senen_tani3){
				senenflag=true;
			}
		}
		if(parseInt(CS.vueObj.kanjo_detail[i]["order"],10)==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)==4 ){
			if(CS.vueObj.itask_list_show_edit_pana_senen_tani4){
				senenflag=true;
			}
		}
		if(senenflag){
			data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
			data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
			if(isNaN(data[i]['amount_this_year']) || data[i]['amount_this_year']==""){
				CS.vueObj.kanjo_detail[i]['amount_this_year']="";
			}else{
				CS.vueObj.kanjo_detail[i]['amount_this_year']=data[i]['amount_this_year']*1000;
				CS.vueObj.kanjo_detail[i]['amount_this_year']=CS.vueObj.kanjo_detail[i]['amount_this_year'].toLocaleString();
			}
			if(isNaN(data[i]['amount_pre_year']) || data[i]['amount_pre_year']==""){
				CS.vueObj.kanjo_detail[i]['amount_pre_year']="";
			}else{
				CS.vueObj.kanjo_detail[i]['amount_pre_year']=data[i]['amount_pre_year']*1000;
				CS.vueObj.kanjo_detail[i]['amount_pre_year']=CS.vueObj.kanjo_detail[i]['amount_pre_year'].toLocaleString();
			}
		}
    }
}
CS.unset_senen=function(){
	var data=[];
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);

		var senenflag=false;
		if(parseInt(CS.vueObj.kanjo_detail[i]["order"],10)==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)<40 ){
			if(CS.vueObj.itask_list_show_edit_pana_senen_tani1){
				senenflag=true;
			}
		}
		if(parseInt(CS.vueObj.kanjo_detail[i]["order"],10)==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)>=40 ){
			if(CS.vueObj.itask_list_show_edit_pana_senen_tani2){
				senenflag=true;
			}
		}
		if(parseInt(CS.vueObj.kanjo_detail[i]["order"],10)==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)!=4 ){
			if(CS.vueObj.itask_list_show_edit_pana_senen_tani3){
				senenflag=true;
			}
		}
		if(parseInt(CS.vueObj.kanjo_detail[i]["order"],10)==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)==4 ){
			if(CS.vueObj.itask_list_show_edit_pana_senen_tani4){
				senenflag=true;
			}
		}
		if(senenflag){
			data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
			data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
			if(isNaN(data[i]['amount_this_year']) || data[i]['amount_this_year']==""){
				CS.vueObj.kanjo_detail[i]['amount_this_year']="";
			}else{
				CS.vueObj.kanjo_detail[i]['amount_this_year']=parseInt(data[i]['amount_this_year']/1000,10);
				CS.vueObj.kanjo_detail[i]['amount_this_year']=CS.vueObj.kanjo_detail[i]['amount_this_year'].toLocaleString();
			}
			if(isNaN(data[i]['amount_pre_year']) || data[i]['amount_pre_year']==""){
				CS.vueObj.kanjo_detail[i]['amount_pre_year']="";
			}else{
				CS.vueObj.kanjo_detail[i]['amount_pre_year']=parseInt(data[i]['amount_pre_year']/1000,10);
				CS.vueObj.kanjo_detail[i]['amount_pre_year']=CS.vueObj.kanjo_detail[i]['amount_pre_year'].toLocaleString();
			}
		}
    }
}
CS.beforitasksave = function(obj){
	//千円単位実装
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
		CS.set_senen();
	}
	
	//デバッグスケジュールー＞0827
	//４．BS（貸借対照表）が無い場合に、棚卸資産にPLの期末在庫を計算しない＆青色申告特別控除前の金額を自己資本に計算しない→（経営談義と決算書情報）
	var have_bs_flag=false;
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
		//法人の場合
		for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
			if(CS.vueObj.kanjo_detail[i]['tabindex']=="1" || CS.vueObj.kanjo_detail[i]['tabindex']==1 || CS.vueObj.kanjo_detail[i]['tabindex']=="2" || CS.vueObj.kanjo_detail[i]['tabindex']==2){
				have_bs_flag=true;
			}
		}
	}else{
		//個人の場合
		for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
			data={};
			data['candidate']=[];
			data['candidate'][0]={};
			data['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
			data['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
			data['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
			data['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
			data['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
			data['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
			data['amount_this_year']=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
			data['amount_pre_year']=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
			data['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
			if(i>=45 && i<=94){
				if(!isNaN(data['amount_this_year']) && CS.vueObj.kanjo_detail[i]['amount_this_year']!="" && CS.vueObj.kanjo_detail[i]['amount_this_year']!="0" && data['m_kanjo_code'].indexOf('999')==-1){
					have_bs_flag=true;
				}
			}
		}
	}
	//振替実行>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	CS.todo_furikae();
	
	CS.itask_list_show_edit_window_kensan(8);
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
		CS.set_csv_kingaku_pl("1_1_0_0","1");
		if(CS.set_csv_kingaku_pl234_flag){
			CS.set_csv_kingaku_pl("1_2_0_0","3");
			CS.set_csv_kingaku_pl("1_3_0_0","4");
			CS.set_csv_kingaku_pl("1_4_0_0","5");
			CS.set_csv_kingaku_pl("1_4_0_0_s","5_s");
			CS.set_csv_kingaku_pl("1_5_0_0","6");
			CS.set_csv_kingaku_pl("1_6_0_0","7");
		}
		CS.set_csv_kingaku_pl("1_7_0_0","8");
		CS.set_csv_kingaku_pl("1_8_0_0","9");
		CS.set_csv_kingaku_pl("1_9_0_0","10");
		CS.set_csv_kingaku_pl("1_10_0_0","11");
		CS.set_csv_kingaku_pl("1_11_0_0","12");
		CS.set_csv_kingaku_pl("1_13_0_0","14");
		
		CS.set_csv_kingaku_bs("2_10_0_0","1");
		CS.set_csv_kingaku_bs("2_20_1_0","2");
		CS.set_csv_kingaku_bs("2_20_2_0","3");
		CS.set_csv_kingaku_bs("2_20_3_0","4");
		CS.set_csv_kingaku_bs("2_20_0_0","6");
		CS.set_csv_kingaku_bs("2_35_0_0","7");
		CS.set_csv_kingaku_bs("2_40_0_0","8");
		CS.set_csv_kingaku_bs("2_50_0_0","9");
		CS.set_csv_kingaku_bs("2_60_0_0","10");
		CS.set_csv_kingaku_bs("2_70_1_0","11");
		CS.set_csv_kingaku_bs("2_70_2_0","12");
		CS.set_csv_kingaku_bs("2_70_3_1","13");
		CS.set_csv_kingaku_bs("2_70_3_2","14");
		CS.set_csv_kingaku_bs("2_70_3_0","15");
		CS.set_csv_kingaku_bs("2_70_0_0","19");
		CS.set_csv_kingaku_bs("2_80_0_0","20");
		CS.set_csv_kingaku_bs("2_90_0_0","21");
		CS.set_csv_kingaku_bs("2_100_0_0","22");
		CS.set_csv_kingaku_bs("2_110_0_0","23");
		CS.set_csv_kingaku_bs("2_120_0_0","24");
	}


	
	//売上高
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		obj["c0"] = CS.vueObj.kanjo_detail[0]["amount_this_year"];
	}else{
		obj["c0"] = CS.edit_window_kensan_pl_1["1"].toLocaleString();
	}
	//粗利益
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		obj["c1"] = CS.vueObj.kanjo_detail[6]["amount_this_year"];
		if(typeof CS.furikae_1_4_xxx != "undefined"){
			obj["c1"]=parseInt(CS.vueObj.kanjo_detail[6]["amount_this_year"].replaceAll(',', ''),10);
			if(isNaN(obj["c1"])){
				obj["c1"]=0;
			}
			obj["c1"]=obj["c1"]-CS.furikae_1_4_xxx;
			obj["c1"]=obj["c1"].toLocaleString(); 
		}
	}else{
		obj["c1"] = CS.edit_window_kensan_pl_1["4"].toLocaleString();
	}
	var pl5=CS.edit_window_kensan_pl_1["5_s"];
	if(CS.edit_window_kensan_pl_1["5"]!=null && CS.edit_window_kensan_pl_1["5"]!="" && CS.edit_window_kensan_pl_1["5"]!="0" && CS.edit_window_kensan_pl_1["5"]!=0){
		pl5=CS.edit_window_kensan_pl_1["5"];
	}
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		var pl1_4_1=CS.itask_list_show_edit_window_pana_calc_sum_f_s(1,4,1,9999)[0];
	}else{
		var pl1_4_1=CS.itask_list_show_edit_window_pana_calc_sum_f_s_csv(1,4,1,9999)[0];
	}
	if(pl5=="" && pl1_4_1!=""){
		pl5=0;
	}
	if(pl5!="" && pl1_4_1==""){
		pl1_4_1=0;
	}
	//人件費
	if(pl1_4_1==""){
		obj["c2"] = "";
	}else{
		obj["c2"] = Math.abs(pl1_4_1).toLocaleString();//1_4_1
	}
	//管理費
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		var pl1_4=CS.itask_list_show_edit_window_pana_calc_sum4_kojin_csv(1,4)[0];
		pl1_4_1=CS.itask_list_show_edit_window_pana_calc_sum_f_s(1,4,1,9999)[0];
		if(pl1_4=="" && pl1_4_1==""){
			obj["c3"]="";
		}else{
			if(pl1_4=="" && pl1_4_1!=""){
				pl1_4=0;
			}else if(pl1_4!="" && pl1_4_1==""){
				pl1_4_1=0;
				pl1_4=pl1_4;
			}else{
				pl1_4=pl1_4;
			}
			obj["c3"]=pl1_4-Math.abs(pl1_4_1);
			obj["c3"]=obj["c3"].toLocaleString();
		}
	}else{
		if(pl5=="" && pl1_4_1==""){
			obj["c3"]="";
		}else{
			obj["c3"] = (pl5 - Math.abs(pl1_4_1)).toLocaleString();//1_4_2
		}
	}

	
	//固定費 計
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		obj["c4"] = pl1_4.toLocaleString();  //1_4
	}else{
		obj["c4"] = pl5;
	}
	//営業利益
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		//obj["c5"] = CS.vueObj.kanjo_detail[32]["amount_this_year"];
		//⑦-固定費計（1_4）
		pl6=CS.itask_list_show_edit_window_pana_save_sum_list_id([6])[0];
		if(pl6=="" && pl1_4==""){
			obj["c5"]="";
		}else{
			if(pl6=="" && pl1_4!=""){
				pl6=0;
			}else if(pl6!="" && pl1_4==""){
				pl1_4=0;
			}
			obj["c5"]=pl6-pl1_4;
			obj["c5"]=obj["c5"].toLocaleString();
			if(typeof CS.furikae_1_4_xxx != "undefined"){
				obj["c5"]=parseInt(CS.vueObj.kanjo_detail[6]["amount_this_year"].replaceAll(',', ''),10);
				if(isNaN(obj["c5"])){
					obj["c5"]=0;
				}
				obj["c5"]=obj["c5"]-CS.furikae_1_4_xxx;
				obj["c5"]=obj["c5"].toLocaleString(); 
			}
		}
	}else{
		obj["c5"] = CS.edit_window_kensan_pl_1["6"].toLocaleString();
	}
	//営業外損益
	var pl7= CS.edit_window_kensan_pl_1["7"];
	var pl8= CS.edit_window_kensan_pl_1["8"];
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		// pl4143=CS.itask_list_show_edit_window_pana_save_sum_list_id([41,43])[0];
		// pl36=CS.itask_list_show_edit_window_pana_save_sum_list_id([36])[0];
		pl1_6=CS.itask_list_show_edit_window_pana_calc_sum5(1,6,)[0];
		pl1_7=CS.itask_list_show_edit_window_pana_calc_sum5(1,7,)[0];
		if(pl1_6=="" && pl1_7==""){
			obj["c6"] = "";
		}else{
			if(pl1_6=="" && pl1_7!=""){
				pl1_6=0;
			}else if(pl1_6!="" && pl1_7==""){
				pl1_7=0;
			}
			obj["c6"]=pl1_6+pl1_7;
			obj["c6"]=obj["c6"].toLocaleString();
		}
		//振替戻り、営業利益から振替しないため>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
		CS.replace_furikae();
	}else{
		if(pl7=="" && pl8==""){
			obj["c6"]="";
		}else{
			if(pl7=="" && pl8!=""){
				pl7=0;
			}else if(pl7!="" && pl8==""){
				pl8=0;
			}
			obj["c6"] = (pl7-pl8).toLocaleString();
		}
	}

	//支払利息
	if(CS.itask_list_show_edit_window_pana_calc_sum(1,7,0,2,9999)[0]!=""){
		obj["c7"] = (CS.itask_list_show_edit_window_pana_calc_sum(1,7,0,2,9999)[0]*-1).toLocaleString();
	}else{
		obj["c7"] = "";
	}
	//税引前利益
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		obj["c8"] = CS.vueObj.kanjo_detail[42]["amount_this_year"];
		//pl1_9=CS.itask_list_show_edit_window_pana_calc_sum5(1,9,)[0];
		//pl1_10=CS.itask_list_show_edit_window_pana_calc_sum5(1,10,)[0];
		//var c8="";
		//if(obj["c5"]!=""){
		//	c8=pl6-pl1_4;
		//}
		//if(obj["c6"]!=""){
		//	if(c8!=""){
		//		c8=c8+pl7-pl8;
		//	}else{
		//		c8=pl7-pl8;
		//	}
		//}
		//if(pl1_9!=""){
		//	if(c8!=""){
		//		c8=c8+pl1_9;
		//	}else{
		//		c8=pl1_9;
		//	}
		//}
		//if(pl1_10!=""){
		//	if(c8!=""){
		//		c8=c8+pl1_10;
		//	}else{
		//		c8=pl1_10;
		//	}
		//}
		//if(c8!=""){
		//	obj["c8"] = c8.toLocaleString();
		//}
	}else{
		obj["c8"] = CS.edit_window_kensan_pl_1["12"].toLocaleString();
	}
	//c9前年売上    c10前期利益
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		obj["c9"] = CS.itask_list_show_edit_pana_pre_year_c9;
		obj["c10"] = CS.itask_list_show_edit_pana_pre_year_c10;
	}else{
		obj["c9"] = CS.edit_window_kensan_pl_0["1"].toLocaleString();
		obj["c10"] = CS.edit_window_kensan_pl_0["12".toLocaleString()];
	}
	var pl2_10_2_0_0=CS.itask_list_show_edit_window_pana_calc_sum(2,10,2,0,9999)[0];
	var pl2_10_2_2=CS.itask_list_show_edit_window_pana_calc_sum(2,10,2,2,)[0];
	if(pl2_10_2_0_0=="" && pl2_10_2_2!=""){
		pl2_10_2_0_0=0;
	}
	if(pl2_10_2_0_0!="" && pl2_10_2_2==""){
		pl2_10_2_2=0;
	}
	//売掛金
	obj["c11"] = (pl2_10_2_0_0 + pl2_10_2_2).toLocaleString();
	//棚卸高
	if(CS.itask_list_show_edit_window_pana_csv_find_sum(1,2,3,undefined)!=null){
		obj["c12"] = CS.itask_list_show_edit_window_pana_csv_find_sum(1,2,3,undefined);
	}else{
		obj["c12"] = CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,undefined,)[0].toLocaleString();
	}
	if(!have_bs_flag){
		//デバッグスケジュールー＞0827
		obj["c12"] = "0";
	}
	var pl2_40_2=CS.itask_list_show_edit_window_pana_calc_sum(2,40,2,0,)[0];
	var pl2_50_0_5=CS.itask_list_show_edit_window_pana_calc_sum(2,50,0,5,)[0];
	var pl2_50_0_9=CS.itask_list_show_edit_window_pana_calc_sum(2,50,0,9,)[0];
	if(pl2_40_2=="" && (pl2_50_0_5!="" || pl2_50_0_9!="")){
		pl2_40_2=0;
	}
	if(pl2_50_0_5=="" && (pl2_40_2!="" || pl2_50_0_9!="")){
		pl2_50_0_5=0;
	}
	if(pl2_50_0_9=="" && (pl2_40_2!="" || pl2_50_0_5!="")){
		pl2_50_0_9=0;
	}
	//借入金計(千円)
	obj["c13"] = (pl2_40_2 + pl2_50_0_5 + pl2_50_0_9).toLocaleString();
	//自己資本(千円)
	obj["c14"] = CS.edit_window_kensan_bs_1["19"].toLocaleString();
	//流動資産計
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		obj["c15"] = CS.itask_list_show_edit_window_pana_calc_sum4_kojin_csv(2,10)[0].toLocaleString();
	}else{
		obj["c15"] = CS.edit_window_kensan_bs_1["1"].toLocaleString();
	}
	//流動負債計
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		if(CS.edit_window_kensan_bs_1["8"]!=""){
			obj["c16"]=CS.itask_list_show_edit_window_pana_calc_sum4_kojin_csv(2,40)[0].toLocaleString();
		}else{
			obj["c16"] = "";
		}
	}else{
		if(CS.edit_window_kensan_bs_1["8"]!=""){
			obj["c16"] = (CS.edit_window_kensan_bs_1["8"]).toLocaleString();
		}else{
			obj["c16"] = "";
		}
	}
	//現預金
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		obj["c17"] = CS.itask_list_show_edit_window_pana_save_sum_list_id([45,46,47,48])[0].toLocaleString();
	}else{
		var bs2_10_1=CS.itask_list_show_edit_window_pana_calc_sum(2,10,1,undefined,)[0];
		obj["c17"] = bs2_10_1.toLocaleString();
		//振替戻り、外注費等を集めるため>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
		CS.replace_furikae();
	}
	
	//受取手形
	var bs2_10_2_3=CS.itask_list_show_edit_window_pana_calc_sum(2,10,2,3,)[0];
	obj["c18"] = bs2_10_2_3.toLocaleString();
	
	
	var bs1_4_2_14=CS.itask_list_show_edit_window_pana_calc_sum_f_s(1,4,2,14,9999)[0]*-1;
	//管理費内外注費
	obj["c19"] = bs1_4_2_14.toLocaleString();
	//店主貸
	obj["c20"] = CS.itask_list_show_edit_window_pana_save_sum_list(["2_10_4_0_37","2_10_4_0_38","2_10_4_0_7"])[0].toLocaleString();
	//店主借
	obj["c21"] = CS.itask_list_show_edit_window_pana_save_sum_list(["2_40_3_1_5","2_40_3_1_33","2_50_0_9_26","2_50_0_9_26","2_40_3_1_29"])[0].toLocaleString();
	//元入金
	obj["c22"] = CS.itask_list_show_edit_window_pana_save_sum_list(["2_40_3_1_6"])[0].toLocaleString();
	//青色申告特別控除前の所得金額
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		//20240724
		obj["c23"] = CS.vueObj.kanjo_detail[93]["amount_this_year"];
		if(typeof obj["c23"]=="undefined" || obj["c23"]=="" || obj["c23"]==null || isNaN(parseInt(obj["c23"].replaceAll(',', ''),10))){
			obj["c23"] = CS.vueObj.kanjo_detail[42]["amount_this_year"];
		}
	}else{
		obj["c23"] = CS.itask_list_show_edit_window_pana_save_sum_list(["2_70_3_2_9"])[0].toLocaleString();
	}
	//雑収入
	obj["c24"] = CS.itask_list_show_edit_window_pana_save_sum_list(["1_1_0_0_64","1_6_0_9_1","1_9_0_7_2"])[0].toLocaleString();
	//専従者給与
	obj["c25"] = CS.itask_list_show_edit_window_pana_save_sum_list(["1_4_1_0_2"])[0].toLocaleString();
	//組戻額等計
	obj["c26"] = CS.itask_list_show_edit_window_pana_save_sum_list(["1_6_0_0_-4"])[0].toLocaleString();
	//繰入額等計
	obj["c27"] = CS.itask_list_show_edit_window_pana_save_sum_list(["1_7_0_0_-4"])[0].toLocaleString();
	
	
	//Auto前年売上
	//obj["c28"] = CS.itask_list_show_edit_pana_pre_year_c9;
	//Auto前期利益
	//obj["c29"] = CS.itask_list_show_edit_pana_pre_year_c10;
	
	
	
	//特別利益
	obj["c28"] = CS.edit_window_kensan_pl_1["10"].toLocaleString();
	//特別損失
	obj["c29"] = CS.edit_window_kensan_pl_1["11"].toLocaleString();
	//仕入割引
	obj["c30"] = CS.itask_list_show_edit_window_pana_save_sum_list(["1_6_0_0_6","1_6_0_0_16","1_6_0_0_14"])[0].toLocaleString();
	
	/*********
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		obj["c100"] = CS.vueObj.kanjo_detail[0]["amount_this_year"];
	}else{
		obj["c100"] = CS.edit_window_kensan_pl_1["1"].toLocaleString();
	}
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		obj["c101"] = CS.vueObj.kanjo_detail[6]["amount_this_year"];
	}else{
		obj["c101"] = CS.edit_window_kensan_pl_1["4"].toLocaleString();
	}
	obj["c102"] = CS.edit_window_kensan_pl_1["5_s"].toLocaleString();
	if(obj["c102"]==""){
		obj["c102"] = CS.edit_window_kensan_pl_1["5"].toLocaleString();
	}
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		obj["c103"] = CS.vueObj.kanjo_detail[32]["amount_this_year"];
	}else{
		obj["c103"] = CS.edit_window_kensan_pl_1["6"].toLocaleString();
	}
	var pl1_7_0_2=CS.itask_list_show_edit_window_pana_calc_sum(1,7,0,2,9999)[0];
	var c104=CS.edit_window_kensan_pl_1["7"]-CS.edit_window_kensan_pl_1["8"]-pl1_7_0_2;
	if(CS.edit_window_kensan_pl_1["7"]=="" && CS.edit_window_kensan_pl_1["8"]=="" && pl1_7_0_2==""){
		c104="";
	}else if(CS.edit_window_kensan_pl_1["7"]=="" || CS.edit_window_kensan_pl_1["8"]=="" || pl1_7_0_2==""){
		if(CS.edit_window_kensan_pl_1["7"]==""){
			CS.edit_window_kensan_pl_1["7"]=0;
		}
		if(CS.edit_window_kensan_pl_1["8"]==""){
			CS.edit_window_kensan_pl_1["8"]=0;
		}
		if(pl1_7_0_2==""){
			pl1_7_0_2=0;
		}
		c104=CS.edit_window_kensan_pl_1["7"] - CS.edit_window_kensan_pl_1["8"] - pl1_7_0_2;
	}
	obj["c104"] = c104.toLocaleString();
	if(pl1_7_0_2!=""){
		obj["c105"] = (pl1_7_0_2*-1).toLocaleString();
	}else{
		obj["c105"] = "";
	}
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		obj["c106"] = CS.vueObj.kanjo_detail[44]["amount_this_year"];
	}else{
		obj["c106"] = CS.edit_window_kensan_pl_1["9"].toLocaleString();
	}
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		obj["c107"] = CS.itask_list_show_edit_window_pana_save_sum_list_id([45,46,47,48])[0].toLocaleString();
	}else{
		var bs2_10_1=CS.itask_list_show_edit_window_pana_calc_sum(2,10,1,undefined,)[0];
		obj["c107"] = bs2_10_1.toLocaleString();
	}
	var pl2_10_2_0_0=CS.itask_list_show_edit_window_pana_calc_sum(2,10,2,0,9999)[0];
	var pl2_10_2_2=CS.itask_list_show_edit_window_pana_calc_sum(2,10,2,2,)[0];
	if(pl2_10_2_0_0=="" && pl2_10_2_2!=""){
		pl2_10_2_0_0=0;
	}
	if(pl2_10_2_0_0!="" && pl2_10_2_2==""){
		pl2_10_2_2=0;
	}
	obj["c108"] = (pl2_10_2_0_0 + pl2_10_2_2).toLocaleString();
	if(CS.itask_list_show_edit_window_pana_csv_find_sum(2,10,3,undefined)!=null){
		obj["c109"] = CS.itask_list_show_edit_window_pana_csv_find_sum(2,10,3,undefined);
	}else{
		obj["c109"] = CS.itask_list_show_edit_window_pana_calc_sum(2,10,3,undefined,)[0].toLocaleString();
	}
	var pl2_40_2=CS.itask_list_show_edit_window_pana_calc_sum(2,40,2,0,0)[0];
	var pl2_50_0_5=CS.itask_list_show_edit_window_pana_calc_sum(2,50,0,5,0)[0];
	var pl2_50_0_9=CS.itask_list_show_edit_window_pana_calc_sum(2,50,0,9,0)[0];
	if(pl2_40_2=="" && (pl2_50_0_5!="" || pl2_50_0_9!="")){
		pl2_40_2=0;
	}
	if(pl2_50_0_5=="" && (pl2_40_2!="" || pl2_50_0_9!="")){
		pl2_50_0_5=0;
	}
	if(pl2_50_0_9=="" && (pl2_40_2!="" || pl2_50_0_5!="")){
		pl2_50_0_9=0;
	}
	obj["c110"] = (pl2_40_2 + pl2_50_0_5 + pl2_50_0_9).toLocaleString();
	obj["c111"] =  CS.edit_window_kensan_bs_1["19"].toLocaleString();
	obj["c112"] = CS.itask_list_show_edit_window_pana_save_sum_list(["2_10_4_0_37","2_10_4_0_38","2_10_4_0_7"])[0].toLocaleString();
	obj["c113"] = CS.itask_list_show_edit_window_pana_save_sum_list(["2_40_3_1_5","2_40_3_1_33","2_50_0_9_26","2_50_0_9_26","2_40_3_1_29"])[0].toLocaleString();
	obj["c114"] = CS.itask_list_show_edit_window_pana_save_sum_list(["2_40_3_1_6"])[0].toLocaleString();
	obj["c115"] = CS.itask_list_show_edit_window_pana_save_sum_list(["2_70_3_2_9"])[0].toLocaleString();
	obj["c116"] = CS.itask_list_show_edit_window_pana_save_sum_list(["1_1_0_0_64","1_6_0_9_1","1_9_0_7_2"])[0].toLocaleString();
	obj["c117"] = CS.itask_list_show_edit_window_pana_save_sum_list(["1_4_2_14_1"])[0].toLocaleString();
	obj["c118"] = CS.itask_list_show_edit_window_pana_save_sum_list(["1_4_1_0_2"])[0].toLocaleString();
	obj["c119"] = CS.itask_list_show_edit_window_pana_save_sum_list(["1_6_0_0_-4"])[0].toLocaleString();
	obj["c120"] = CS.itask_list_show_edit_window_pana_save_sum_list(["1_7_0_0_-4"])[0].toLocaleString();
	**************************/
	
	
	//お客様より私用変更3/13
	var tmplist=[];
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		//J-AE
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c0"]});
		tmplist.push({"flag":"-","value":CS.vueObj.kanjo_detail[95]["amount_this_year"]});//雑収入
		obj["c0"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//K-AE-AH
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c1"]});
		tmplist.push({"flag":"-","value":obj["c24"]});
		//tmplist.push({"flag":"-","value":obj["c19"]});
		obj["c1"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//L＋AA-AB
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c2"]});
		tmplist.push({"flag":"+","value":obj["c20"]});
		tmplist.push({"flag":"-","value":obj["c21"]});
		obj["c2"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//M-AH
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c3"]});
		//tmplist.push({"flag":"-","value":obj["c19"]});
		//tmplist.push({"flag":"-","value":obj["c7"]});
		obj["c3"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//N＋AA-AB＋AH＋AI
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c4"]});
		tmplist.push({"flag":"+","value":obj["c20"]});
		tmplist.push({"flag":"-","value":obj["c21"]});
		//tmplist.push({"flag":"-","value":obj["c7"]});
		//tmplist.push({"flag":"-","value":obj["c19"]});
		//tmplist.push({"flag":"+","value":obj["c25"]});
		obj["c4"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//差引金額㉝-事業主貸+事業主借-専従者給与+外注費+利子割引-雑収入+営業外収益
		tmplist=[];
		tmplist.push({"flag":"+","value":CS.vueObj.kanjo_detail[32]["amount_this_year"]});//差引金額㉝
		tmplist.push({"flag":"-","value":obj["c20"]});//事業主貸
		tmplist.push({"flag":"+","value":obj["c21"]});//事業主借
		tmplist.push({"flag":"-","value":obj["c25"]});//専従者給与
		//tmplist.push({"flag":"+","value":obj["c19"]});//外注費
		tmplist.push({"flag":"+","value":obj["c7"]});//利子割引
		tmplist.push({"flag":"-","value":obj["c24"]});//雑収入
		tmplist.push({"flag":"+","value":CS.furikae_1_6_xxx});//営業外収益
		
		obj["c5"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//営業外損益
		//P+Q-AK+(38)+AE 20240412 
		//営業外損益(組戻額等計を含む)+支払利息-繰入額等計(専従者給与は除外）+雑収入 20240412 廃棄
		//営業外損益(組戻額等計を含む)+支払利息-繰入額等計(専従者給与、貸倒引当金繰入額は除外）+雑収入 20240412 廃棄
		//営業外収益-営業外費用+特別利益-特別損失+雑収入
		tmplist=[];
		//tmplist.push({"flag":"+","value":obj["c6"]});//営業外損益(組戻額等計を含む)
		//tmplist.push({"flag":"+","value":obj["c7"]});//支払利息
		//tmplist.push({"flag":"-","value":obj["c27"]});//繰入額等計(専従者給与、貸倒引当金繰入額は除外）
		//tmplist.push({"flag":"+","value":CS.vueObj.kanjo_detail[37]["amount_this_year"]});//繰入額等計(専従者給与、貸倒引当金繰入額は除外）
		//tmplist.push({"flag":"+","value":CS.vueObj.kanjo_detail[38]["amount_this_year"]});//繰入額等計(専従者給与、貸倒引当金繰入額は除外）
		//tmplist.push({"flag":"+","value":obj["c24"]});//雑収入
		tmplist.push({"flag":"+","value":CS.itask_list_show_edit_window_pana_calc_sum4_kojin_csv_no_goukei(1,6,)[0]});
		tmplist.push({"flag":"-","value":CS.itask_list_show_edit_window_pana_calc_sum4_kojin_csv_no_goukei(1,7,)[0]});
		tmplist.push({"flag":"+","value":CS.itask_list_show_edit_window_pana_calc_sum4_kojin_csv_no_goukei(1,9,)[0]});
		tmplist.push({"flag":"-","value":CS.itask_list_show_edit_window_pana_calc_sum4_kojin_csv_no_goukei(1,10,)[0]});
		tmplist.push({"flag":"+","value":obj["c24"]});//雑収入
		tmplist.push({"flag":"+","value":obj["c7"]});//利子割引
		obj["c6"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//税引前利益
		tmplist=[];
		/*2024-08-30 c1-c4+c6-c7*/
		tmplist.push({"flag":"+","value":obj["c1"]});
		tmplist.push({"flag":"-","value":obj["c4"]});
		tmplist.push({"flag":"+","value":obj["c6"]});
		tmplist.push({"flag":"-","value":obj["c7"]});
		obj["c8"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//X（AC＋AD-AA＋AB）
		//元入金+青色申告特別控除前の所得金額-店主貸+店主借
		//自己資本
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c22"]});
		tmplist.push({"flag":"+","value":obj["c8"]});
		//20240829 PL青色申告特別控除前の所得金額を使用しない
		var obj_c23 = CS.vueObj.kanjo_detail[93]["amount_this_year"];//BS青色申告特別控除前の所得金額
		tmplist.push({"flag":"-","value":CS.vueObj.kanjo_detail[42]["amount_this_year"]});
		tmplist.push({"flag":"+","value":obj_c23});
		obj["c14"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		
		//流動資産計-事業主貸
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c15"]});
		tmplist.push({"flag":"-","value":obj["c20"]});
		obj["c15"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		
				
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c16"]});
		tmplist.push({"flag":"-","value":obj["c21"]});
		tmplist.push({"flag":"-","value":obj["c22"]});
		obj["c16"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		
		
		/******************
		//K-AA
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c100"]});
		tmplist.push({"flag":"-","value":obj["c116"]});
		obj["c100"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//L-AA-AB
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c101"]});
		tmplist.push({"flag":"-","value":obj["c116"]});
		tmplist.push({"flag":"-","value":obj["c117"]});
		obj["c101"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//M-AA-AB＋W-X+AC
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c102"]});
		tmplist.push({"flag":"-","value":obj["c116"]});
		tmplist.push({"flag":"-","value":obj["c117"]});
		tmplist.push({"flag":"+","value":obj["c112"]});
		tmplist.push({"flag":"-","value":obj["c113"]});
		tmplist.push({"flag":"+","value":obj["c118"]});
		obj["c102"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//N-AA-AB⁻W＋X-AC
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c103"]});
		tmplist.push({"flag":"-","value":obj["c116"]});
		tmplist.push({"flag":"-","value":obj["c117"]});
		tmplist.push({"flag":"-","value":obj["c112"]});
		tmplist.push({"flag":"+","value":obj["c113"]});
		tmplist.push({"flag":"-","value":obj["c118"]});
		obj["c103"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//O+P⁻W＋X-AD+AC+AE
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c104"]});
		tmplist.push({"flag":"+","value":obj["c105"]});
		tmplist.push({"flag":"-","value":obj["c112"]});
		tmplist.push({"flag":"+","value":obj["c113"]});
		tmplist.push({"flag":"-","value":obj["c119"]});
		tmplist.push({"flag":"+","value":obj["c118"]});
		tmplist.push({"flag":"+","value":obj["c120"]});
		obj["c104"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//Q⁻W＋X-AC+AD-AE
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c106"]});
		tmplist.push({"flag":"-","value":obj["c112"]});
		tmplist.push({"flag":"+","value":obj["c113"]});
		tmplist.push({"flag":"-","value":obj["c118"]});
		tmplist.push({"flag":"+","value":obj["c119"]});
		tmplist.push({"flag":"-","value":obj["c120"]});
		obj["c106"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//V（Y＋Z⁻W＋X）
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c114"]});
		tmplist.push({"flag":"+","value":obj["c115"]});
		tmplist.push({"flag":"-","value":obj["c112"]});
		tmplist.push({"flag":"+","value":obj["c113"]});
		obj["c111"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		*************/
	}else{
		//K-AH+仕入割引
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c1"]});
		//tmplist.push({"flag":"-","value":obj["c19"]});
		tmplist.push({"flag":"+","value":CS.itask_list_show_edit_window_pana_save_sum_list(["1_6_0_0_6","1_6_0_0_16","1_6_0_0_14"])[0].toLocaleString()});
		obj["c1"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//M-AH
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c3"]});
		//tmplist.push({"flag":"-","value":obj["c19"]});
		obj["c3"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//N-AH
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c4"]});
		//tmplist.push({"flag":"-","value":obj["c19"]});
		obj["c4"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//K-N
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c1"]});
		tmplist.push({"flag":"-","value":obj["c4"]});
		obj["c5"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//P+Q
		//※営業外損益+支払利息(Q列)-仕入割引("1_6_0_0_6","1_6_0_0_16","1_6_0_0_14")+特別損益(1_9-1_10）
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c6"]});
		tmplist.push({"flag":"+","value":obj["c7"]});
		tmplist.push({"flag":"-","value":CS.itask_list_show_edit_window_pana_save_sum_list(["1_6_0_0_6","1_6_0_0_16","1_6_0_0_14"])[0].toLocaleString()});
		tmplist.push({"flag":"+","value":CS.edit_window_kensan_pl_1["10"].toLocaleString()});
		tmplist.push({"flag":"-","value":CS.edit_window_kensan_pl_1["11"].toLocaleString()});
		obj["c6"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//税引前利益
		/*2024-08-30 c1-c4+c6-c7*/
		// tmplist.push({"flag":"+","value":obj["c1"]});
		// tmplist.push({"flag":"-","value":obj["c4"]});
		// tmplist.push({"flag":"+","value":obj["c6"]});
		// tmplist.push({"flag":"-","value":obj["c7"]});
		// obj["c8"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		/*********************
		//L-AB
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c101"]});
		tmplist.push({"flag":"-","value":obj["c117"]});
		obj["c101"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//M-AB
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c102"]});
		tmplist.push({"flag":"-","value":obj["c117"]});
		obj["c102"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//N-AB
		tmplist=[];
		tmplist.push({"flag":"+","value":obj["c103"]});
		tmplist.push({"flag":"-","value":obj["c117"]});
		obj["c103"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		//O+P
		//tmplist=[];
		//tmplist.push({"flag":"+","value":obj["c104"]});
		//tmplist.push({"flag":"+","value":obj["c105"]});
		//obj["c104"]=CS.itask_list_show_edit_window_pana_calc_eazy(tmplist);
		*************/
	}
	
	obj["c100"]=obj["c0"];
	obj["c101"]=obj["c1"];
	obj["c102"]=obj["c4"];//2024-07-05経営談義の管理経費は、人件費も込み⇒固定費計にしてください。
	obj["c103"]=obj["c5"];
	obj["c104"]=obj["c6"];
	obj["c105"]=obj["c7"];
	obj["c106"]=obj["c8"];//101-102+104-105   =>c1-c4+c6-c7
	obj["c107"]=obj["c17"];
	obj["c108"]=obj["c11"];
	obj["c109"]=obj["c12"];
	obj["c110"]=obj["c13"];
	obj["c111"]=obj["c14"];
	obj["c112"]=obj["c20"];
	obj["c113"]=obj["c21"];
	obj["c114"]=obj["c22"];
	obj["c115"]=obj["c23"];
	obj["c116"]=obj["c24"];
	obj["c117"]=obj["c19"];
	obj["c118"]=obj["c25"];
	obj["c119"]=obj["c26"];
	obj["c120"]=obj["c27"];
	
	//振替戻り、営業利益から振替しないため>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	CS.replace_furikae();
	CS.itask_list_show_edit_window_kensan(8);
	
	
	//if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
	if(true){
		//法人の場合画面に値があると画面の値を使います、画面に値がないと検算値を使います
		//個人の場合特別の項目（例えば売上高）は画面の値を使います、それ以外の項目は画面に検算値を使います
		if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
			CS.set_csv_kingaku_pl("1_1_0_0","1");//売上高  0
			CS.set_csv_kingaku_pl("1_2_0_0","3");//売上原価  1
			CS.set_csv_kingaku_pl("1_3_0_0","4");//売上総利益  2
			CS.set_csv_kingaku_pl("1_4_0_0","5");
			CS.set_csv_kingaku_pl("1_4_0_0_s","5_s");//販売費一般管理費  3
			CS.set_csv_kingaku_pl("1_5_0_0","6");//営業利益  4
			CS.set_csv_kingaku_pl("1_6_0_0","7");//営業外収益  5
			CS.set_csv_kingaku_pl("1_7_0_0","8");//営業外費用  6
			CS.set_csv_kingaku_pl("1_8_0_0","9");//経常利益  7
			CS.set_csv_kingaku_pl("1_9_0_0","10");//特別利益  8
			CS.set_csv_kingaku_pl("1_10_0_0","11");//特別損失  9
			CS.set_csv_kingaku_pl("1_11_0_0","12");////税引前当期利益  10
			CS.set_csv_kingaku_pl("1_13_0_0","14");
			
			CS.set_csv_kingaku_bs("2_10_0_0","1");
			CS.set_csv_kingaku_bs("2_20_1_0","2");//有形固定資産  11
			CS.set_csv_kingaku_bs("2_20_2_0","3");//無形固定資産  12
			CS.set_csv_kingaku_bs("2_20_3_0","4");//投資その他の資産  13
			CS.set_csv_kingaku_bs("2_30_0_0","5");//繰延資産  14
			CS.set_csv_kingaku_bs("2_20_0_0","6");//固定資産合計  15
			CS.set_csv_kingaku_bs("2_35_0_0","7");//資産の部合計  16
			CS.set_csv_kingaku_bs("2_40_0_0","8");//流動負債  17
			CS.set_csv_kingaku_bs("2_50_0_0","9");//固定負債  18
			CS.set_csv_kingaku_bs("2_60_0_0","10");//負債の部合計  19
			CS.set_csv_kingaku_bs("2_70_1_0","11");//資本金  20
			CS.set_csv_kingaku_bs("2_70_2_0","12");//資本剰余金  21
			CS.set_csv_kingaku_bs("2_70_3_1","13");//利益準備金  22
			CS.set_csv_kingaku_bs("2_70_3_2","14");//その他の利益剰余金  23
			CS.set_csv_kingaku_bs("2_70_3_0","15");//利益剰余金  24
			CS.set_csv_kingaku_bs("2_70_6_3","18");//自己株式  25
			CS.set_csv_kingaku_bs("2_70_0_0","19");//株主資本合計  26
			CS.set_csv_kingaku_bs("2_80_0_0","20");//評価・換算差額等  27
			CS.set_csv_kingaku_bs("2_90_0_0","21");//新株予約券  28
			CS.set_csv_kingaku_bs("2_100_0_0","22");//非支配株主持分  29
			CS.set_csv_kingaku_bs("2_110_0_0","23");//純資産合計  30
			CS.set_csv_kingaku_bs("2_120_0_0","24");//負債及び純資産合計  31
		}
		obj["o0"]=CS.edit_window_kensan_pl_1["1"]+"";
		obj["o1"]=CS.edit_window_kensan_pl_1["3"]+"";
		obj["o2"]=CS.edit_window_kensan_pl_1["4"]+"";
		obj["o3"]=CS.edit_window_kensan_pl_1["5_s"]+"";
		if(CS.edit_window_kensan_pl_1["5"]!=null && CS.edit_window_kensan_pl_1["5"]!="" && CS.edit_window_kensan_pl_1["5"]!="0" && CS.edit_window_kensan_pl_1["5"]!=0){
			obj["o3"]=CS.edit_window_kensan_pl_1["5"]+"";
		}
		obj["o4"]=CS.edit_window_kensan_pl_1["6"]+"";
		obj["o5"]=CS.edit_window_kensan_pl_1["7"]+"";
		obj["o6"]=CS.edit_window_kensan_pl_1["8"]+"";
		obj["o7"]=CS.edit_window_kensan_pl_1["9"]+"";
		obj["o8"]=CS.edit_window_kensan_pl_1["10"]+"";
		obj["o9"]=CS.edit_window_kensan_pl_1["11"]+"";
		obj["o10"]=CS.edit_window_kensan_pl_1["12"]+"";
		obj["o11"]=CS.edit_window_kensan_bs_1["2"]+"";
		obj["o12"]=CS.edit_window_kensan_bs_1["3"]+"";
		obj["o13"]=CS.edit_window_kensan_bs_1["4"]+"";
		obj["o14"]=CS.edit_window_kensan_bs_1["5"]+"";
		obj["o15"]=CS.edit_window_kensan_bs_1["6"]+"";
		obj["o16"]=CS.edit_window_kensan_bs_1["7"]+"";
		obj["o17"]=CS.edit_window_kensan_bs_1["8"]+"";
		obj["o18"]=CS.edit_window_kensan_bs_1["9"]+"";
		obj["o19"]=CS.edit_window_kensan_bs_1["10"]+"";
		obj["o20"]=CS.edit_window_kensan_bs_1["11"]+"";
		obj["o21"]=CS.edit_window_kensan_bs_1["12"]+"";
		obj["o22"]=CS.edit_window_kensan_bs_1["13"]+"";
		obj["o23"]=CS.edit_window_kensan_bs_1["14"]+"";
		obj["o24"]=CS.edit_window_kensan_bs_1["15"]+"";
		obj["o25"]=CS.edit_window_kensan_bs_1["18"]+"";
		obj["o26"]=CS.edit_window_kensan_bs_1["19"]+"";
		obj["o27"]=CS.edit_window_kensan_bs_1["20"]+"";
		obj["o28"]=CS.edit_window_kensan_bs_1["21"]+"";
		obj["o29"]=CS.edit_window_kensan_bs_1["22"]+"";
		obj["o30"]=CS.edit_window_kensan_bs_1["23"]+"";
		obj["o31"]=CS.edit_window_kensan_bs_1["24"]+"";
	}
	
	
	if(CS.vueObj.itask_list_show_edit_pana_seisa_over1){
		obj["seisa_over1"] = "OK";
	}else{
		obj["seisa_over1"] = "NG";
	}
	if(CS.vueObj.itask_list_show_edit_pana_seisa_over2){
		obj["seisa_over2"] = "OK";
	}else{
		obj["seisa_over2"] = "NG";
	}
	if(CS.vueObj.itask_list_show_edit_pana_seisa_over3){
		obj["seisa_over3"] = "OK";
	}else{
		obj["seisa_over3"] = "NG";
	}
	if(CS.vueObj.itask_list_show_edit_pana_seisa_over4){
		obj["seisa_over4"] = "OK";
	}else{
		obj["seisa_over4"] = "NG";
	}
	
	if(CS.vueObj.itask_list_show_edit_pana_senen_tani1){
		obj["senen_tani1"] = "OK";
	}else{
		obj["senen_tani1"] = "NG";
	}
	if(CS.vueObj.itask_list_show_edit_pana_senen_tani2){
		obj["senen_tani2"] = "OK";
	}else{
		obj["senen_tani2"] = "NG";
	}
	if(CS.vueObj.itask_list_show_edit_pana_senen_tani3){
		obj["senen_tani3"] = "OK";
	}else{
		obj["senen_tani3"] = "NG";
	}
	if(CS.vueObj.itask_list_show_edit_pana_senen_tani4){
		obj["senen_tani4"] = "OK";
	}else{
		obj["senen_tani4"] = "NG";
	}
	//千円単位実装
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
		CS.unset_senen();
	}
	return obj;
}
CS.itask_list_show_edit_window_pana_save = function(){
	CS.itask_list_show_edit_window_del_me();
	if(typeof CS.itask_list_show_edit_window_pana_save_retry=="undefined" || !CS.itask_list_show_edit_window_pana_save_retry){
		if(CS.vueObj.itask_list_show_edit_pana_status=='2'){
			if(CS.vueObj.itask_list_show_edit_pana_tag_button_red1==3 || CS.vueObj.itask_list_show_edit_pana_tag_button_red2==3 ||CS.vueObj.itask_list_show_edit_pana_tag_button_red3==3 ||CS.vueObj.itask_list_show_edit_pana_tag_button_red4==3 ){
				if(!window.confirm("赤いタブがある状態で精査済として保存しようとしています。")){
					return;
				}
			}
		}

		if(CS.vueObj.itask_list_show_edit_pana_status=='1' || CS.vueObj.itask_list_show_edit_pana_status=='2'){
			for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
				data={};
				data['candidate']=[];
				data['candidate'][0]={};
				data['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
				data['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
				data['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
				data['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
				data['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
				data['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
				data['amount_this_year']=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				data['amount_pre_year']=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				data['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
				if(!isNaN(data['amount_this_year']) && CS.vueObj.kanjo_detail[i]['amount_this_year']!="" && CS.vueObj.kanjo_detail[i]['amount_this_year']!="0" && data['m_kanjo_code'].indexOf('999')!=-1){
					alert("勘定科目未設定のものがあります。勘定科目を設定してから精査済として保存してください。");
					return;
				}
			}
		}

		
		
		
		if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
			CS.itask_list_show_edit_pana_get_pre_year_kojin();
		}else{
			CS.itask_list_show_edit_pana_get_pre_year_houjin();
		}
	}
	

	var obj = {};
	//一覧CSVダウンロード１の対応
	obj=CS.beforitasksave(obj);
	if(CS.itask_list_show_edit_window_pana_save_retry){
		obj["itask_list_show_edit_window_pana_save_retry"] = "OK";
	}
	//振替復旧
	//CS.furikae_target_conf_map
	//請求書一覧を出す
	obj["itask_list_show_edit_pana_company_code"] = CS.vueObj.itask_list_show_edit_pana_company_code;
	obj["itask_list_show_edit_pana_company_name"] = CS.vueObj.itask_list_show_edit_pana_company_name;
	obj["itask_list_show_edit_pana_kesan_date"] = CS.vueObj.itask_list_show_edit_pana_kesan_date;
	obj["itask_list_show_edit_pana_status"] = CS.vueObj.itask_list_show_edit_pana_status;
	obj["itask_list_show_edit_window_memo"] = CS.vueObj.itask_list_show_edit_window_memo;
	obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
	obj["other_new_flag"] = CS.vueObj.i_aitask_top_info["other_new_flag"];
	obj["kanjo_detail"] = CS.vueObj.kanjo_detail;
	
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		if(typeof CS.vueObj.kanjo_detail[i]["pkk"]=="undefined" ){
			var S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
			var N=10
			var now = new Date();
			CS.vueObj.kanjo_detail[i]["pkk"]=Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join('')+now.getTime();
		}
	}
	obj["red1"] = CS.vueObj.itask_list_show_edit_pana_tag_button_red1;
	obj["red2"] = CS.vueObj.itask_list_show_edit_pana_tag_button_red2;
	obj["red3"] = CS.vueObj.itask_list_show_edit_pana_tag_button_red3;
	obj["red4"] = CS.vueObj.itask_list_show_edit_pana_tag_button_red4;
	
	obj["itask_list_show_edit_pana_delete_kanjo_id_list"] = CS.itask_list_show_edit_pana_delete_kanjo_id_list;
	obj["action"] = "itask_list_show_edit_window_pana_save";
	obj["type"] = CS.vueObj.itask_show_type;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {
		alert("通信エラーが発生しました。\n一覧画面に戻ります。\nデータを保存できなかった可能性があります。\n再度保存しますか？");
		CS.itask_list_show_edit_window_pana_save_retry=true;
		CS.itask_list_show_edit_window_pana_save();
	}).done(function (data) {
		if(CS.itask_list_show_edit_window_pana_save_retry){
			CS.itask_list_show_edit_window_pana_save_retry=false;
			CS.vueObj.menu_sub_title="";
			CS.vueObj.itask_list_show_edit_window_flag=false;
			CS.menu_itask_refresh();
			return;
		}
		// 成功処理
		if (data["status"] != "OK") {
			alert("通信エラーが発生しました。\n一覧画面に戻ります。\nデータを保存できなかった可能性があります。\n再度保存しますか？");
			CS.itask_list_show_edit_window_pana_save_retry=true;
			CS.itask_list_show_edit_window_pana_save();
		} else {
			CS.vueObj.menu_sub_title="";
			CS.vueObj.itask_list_show_edit_window_flag=false;
			CS.menu_itask_refresh();
			CS.alert_error("保存できました");
		}
	});
}

CS.todo_furikae=function(){
	//CS.furikae_target_conf_map
	CS.furikae_1_4_xxx=0;
	CS.furikae_1_4_xxx_other=0;
	CS.furikae_1_6_xxx=0;
	var doflag=true;
	CS.furikae_did_list={};
	CS.furikae_did_list_index={};
	CS.set_csv_kingaku_pl234_flag=true;
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		if(!doflag){
			continue;
		}
		var item=CS.vueObj.kanjo_detail[i];
		var m_kanjo_code=CS.vueObj.kanjo_detail[i]["m_kanjo_code"];
		if(typeof CS.furikae_target_conf_map[m_kanjo_code] != "undefined" && CS.furikae_target_conf_map[m_kanjo_code]=="c1"){
			var keys=m_kanjo_code.split('_');
			for(var j=0;j<keys.length;j++){
				keys[j]=CS.toI(keys[j]);
			}
			
			if(keys[0]==1 && keys[2]==4 && keys[2]==2){
				keys[0]=1;
				keys[1]=2;
				keys[2]=1;
				keys[3]=0;
			}else{
				keys[0]=1;
				keys[1]=2;
				keys[2]=1;
				keys[3]=0;
			}
			

			if(keys[4]>0){
				keys[4]=keys[4]+1000+i;
			}else{
				keys[4]=keys[4]-1000-i;
			}
			var m_kanjo_code_new=keys[0]+"_"+keys[1]+"_"+keys[2]+"_"+keys[3]+"_"+keys[4];
			CS.furikae_did_list[m_kanjo_code_new]=m_kanjo_code;
			CS.vueObj.kanjo_detail[i]["m_kanjo_code"]=m_kanjo_code_new;
			CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=m_kanjo_code_new;
			CS.vueObj.kanjo_detail[i]['order']=keys[0];
			CS.vueObj.kanjo_detail[i]['family']=keys[1];
			CS.vueObj.kanjo_detail[i]['genus']=keys[2];
			CS.vueObj.kanjo_detail[i]['variety']=keys[4];
			CS.vueObj.kanjo_detail[i]['species']=keys[3];
			if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
				CS.furikae_did_list_index[m_kanjo_code_new]=CS.vueObj.kanjo_detail[i]["tabindex"];
				CS.vueObj.kanjo_detail[i]["tabindex"]=3;
			}else{
				var amount_this_year=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				if(!isNaN(amount_this_year) && m_kanjo_code.indexOf("1_4_2_14")==-1 && m_kanjo_code.indexOf("1_1_0_0_64")==-1 && m_kanjo_code.indexOf("1_6_0_9_1")==-1 && m_kanjo_code.indexOf("1_9_0_7_2")==-1){
					if(CS.vueObj.kanjo_detail[i]['property']=="1" || CS.vueObj.kanjo_detail[i]['property']==1){
						CS.furikae_1_4_xxx_other-=amount_this_year;
					}else{
						CS.furikae_1_4_xxx_other+=amount_this_year;
					}
				}
				if(!isNaN(amount_this_year)){
					if(CS.vueObj.kanjo_detail[i]['property']=="1" || CS.vueObj.kanjo_detail[i]['property']==1){
						CS.furikae_1_4_xxx-=amount_this_year;
					}else{
						CS.furikae_1_4_xxx+=amount_this_year;
					}
				}
				if(!isNaN(amount_this_year) && m_kanjo_code.substr(0,4)=="1_6_"){
					if(CS.vueObj.kanjo_detail[i]['property']=="1" || CS.vueObj.kanjo_detail[i]['property']==1){
						CS.furikae_1_6_xxx+=amount_this_year;
					}else{
						CS.furikae_1_6_xxx-=amount_this_year;
					}
				}
			}
			CS.set_csv_kingaku_pl234_flag=false;
		}
		if(typeof CS.furikae_target_conf_map[m_kanjo_code] != "undefined" && CS.furikae_target_conf_map[m_kanjo_code]=="c2"){
			var keys=m_kanjo_code.split('_');
			for(var j=0;j<keys.length;j++){
				keys[j]=CS.toI(keys[j]);
			}
			keys[0]=1;
			keys[1]=4;
			keys[2]=0;
			keys[3]=0;
			if(keys[4]>0){
				keys[4]=keys[4]+1000;
			}else{
				keys[4]=keys[4]-1000;
			}
			keys[4]=keys[4]+1000;
			var m_kanjo_code_new=keys[0]+"_"+keys[1]+"_"+keys[2]+"_"+keys[3]+"_"+keys[4];
			CS.furikae_did_list[m_kanjo_code_new]=m_kanjo_code;
			CS.vueObj.kanjo_detail[i]["m_kanjo_code"]=m_kanjo_code_new;
			CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=m_kanjo_code_new;
			CS.vueObj.kanjo_detail[i]['order']=keys[0];
			CS.vueObj.kanjo_detail[i]['family']=keys[1];
			CS.vueObj.kanjo_detail[i]['genus']=keys[2];
			CS.vueObj.kanjo_detail[i]['variety']=keys[4];
			CS.vueObj.kanjo_detail[i]['species']=keys[3];
			CS.vueObj.kanjo_detail[i]["tabindex"]=3;
		}
	}
	
}
CS.replace_furikae=function(){
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		var item=CS.vueObj.kanjo_detail[i];
		var m_kanjo_code=CS.vueObj.kanjo_detail[i]["m_kanjo_code"];
		if(typeof CS.furikae_did_list[m_kanjo_code] != "undefined"){
			var keys=CS.furikae_did_list[m_kanjo_code].split('_');
			CS.vueObj.kanjo_detail[i]["m_kanjo_code"]=CS.furikae_did_list[m_kanjo_code];
			CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=CS.furikae_did_list[m_kanjo_code];
			CS.vueObj.kanjo_detail[i]['order']=keys[0];
			CS.vueObj.kanjo_detail[i]['family']=keys[1];
			CS.vueObj.kanjo_detail[i]['genus']=keys[2];
			CS.vueObj.kanjo_detail[i]['variety']=keys[4];
			CS.vueObj.kanjo_detail[i]['species']=keys[3];
		}
		if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
			if(typeof CS.furikae_did_list_index[m_kanjo_code] != "undefined"){
				CS.vueObj.kanjo_detail[i]["tabindex"]=CS.furikae_did_list_index[m_kanjo_code];
			}
		}
	}
}
CS.deleteNaN=function(o){
	if(isNaN(o)){
		return 0;
	}else{
		return o;
	}
}
CS.itask_list_show_edit_window_pana_calc_sum_2 = function(order,family,genus,species,variety){
	var count=0;
	var data=[];
    //genusに所属する全てのspeciesを集計
    let sum_amount_this_year="A" ;let sum_amount_pre_year="A";let goukei_kingaku_param=1;let sum_count =0;let daburi_flg=0;var tmp=0;
	
	////////////////////////////////////////
	var loselist={};
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(typeof CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']] != "undefined"){
			for(var j=0;j<CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']].length;j++){
				loselist[CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']][j]]=true;
			}
		}
    }
	if(typeof CS.delete_kensan_kanjo_detail_flag=="undefined" || !CS.delete_kensan_kanjo_detail_flag){
		for(var j=0;j<CS.itask_list_show_edit_window_ex_list.length;j++){
			loselist[CS.itask_list_show_edit_window_ex_list[j]]=true;
		}
	}
	////////////////////////////////////
	var dedlist={};
	var dedlist_p={};
	var dedlist_t={};
	var goukei_this_year=NaN;
	var goukei_pre_year=NaN;
	data=[];
    for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
			continue;
		}
		if(typeof dedlist[data[i]['m_kanjo_code']] !="undefined" && dedlist_t[data[i]['m_kanjo_code']].indexOf(data[i]['amount_this_year']) && dedlist_p[data[i]['m_kanjo_code']].indexOf(data[i]['amount_pre_year'])){
			continue;
		}
		if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family && data[i]['candidate'][0]['genus'] == genus && typeof loselist[data[i]['m_kanjo_code']] == "undefined"){
			if(species!=null && data[i]['candidate'][0]['species'] != species){
				continue;
			}
			if(variety!=null && data[i]['candidate'][0]['variety'] != variety){
				continue;
			}
			////////////////////合計項目はもう計算しない
			if(CS.itask_list_show_edit_window_pana_is_goukei(data[i],CS.vueObj.kanjo_detail[i])){
				goukei_this_year=parseInt(data[i]['amount_this_year'],10);
				goukei_pre_year=parseInt(data[i]['amount_pre_year'],10);
				continue;
			}
			//2回連続していないが合計科目（variety≦0）の金額が>0の場合
			if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['variety']<=0){
				goukei_kingaku_param=0.5
			}
			if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
				if(isNaN(sum_amount_pre_year)){
					sum_amount_pre_year=0;
				}
				if(isNaN(data[i]['amount_pre_year'])){
					data[i]['amount_pre_year']=0;
				}
			}
			if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
				if(isNaN(sum_amount_this_year)){
					sum_amount_this_year=0;
				}
				if(isNaN(data[i]['amount_this_year'])){
					data[i]['amount_this_year']=0;
				}
			}
			// if(data[i]['candidate'][0]['family'] ==1 && data[i]['candidate'][0]['genus'] ==4 && data[i]['candidate'][0]['variety'] ==16){alert(data[i]['amount_this_year'])}
			sum_amount_this_year+=parseInt(data[i]['amount_this_year'],10) * data[i]['candidate'][0]['property'];
			sum_amount_pre_year+=parseInt(data[i]['amount_pre_year'],10) * data[i]['candidate'][0]['property'];
			dedlist[data[i]['m_kanjo_code']]=true;
			if(typeof dedlist_p[data[i]['m_kanjo_code']]=="undefined"){
				dedlist_p[data[i]['m_kanjo_code']]=[];
			}
			dedlist_p[data[i]['m_kanjo_code']].push(data[i]['amount_pre_year']);
			if(typeof dedlist_t[data[i]['m_kanjo_code']]=="undefined"){
				dedlist_t[data[i]['m_kanjo_code']]=[];
			}
			dedlist_t[data[i]['m_kanjo_code']].push(data[i]['amount_this_year']);
			
			sum_count +=1;
			count++;
		}
    }
	goukei_kingaku_param =1;
    if(sum_count ==1){
        goukei_kingaku_param =1;
    }else if(order==1 && family==2 && genus==3){
        goukei_kingaku_param =1;        
    }
    sum_amount_this_year =  sum_amount_this_year*goukei_kingaku_param
    sum_amount_pre_year =  sum_amount_pre_year *goukei_kingaku_param
	if(count==0){
		sum_amount_this_year=goukei_this_year;
		sum_amount_pre_year=goukei_pre_year;
	}
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
    return [sum_amount_this_year,sum_amount_pre_year]
}
//棚卸資産の合計>0で普通科目の金額>0かチェック 20221214
function tanaoroshi_check(){
	var count=0;
	var data=[];
    let tanaoroshi_flg=0;let tanaoroshi_hoka_flg=0;let sum_amount_this_year=0;let sum_amount_pre_year=0;let sum_this_year=0;let sum_pre_year=0; //20221227
    for( j=1;j<5;j++){ //小分類用
		for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
			data[i]={};
			data[i]['candidate']=[];
			data[i]['candidate'][0]={};
			data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
			data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
			data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
			data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
			data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
			data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
			data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
			data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
			if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
				continue;
			}
			if(data[i]['candidate'][0]['order'] ==2 && data[i]['candidate'][0]['family'] ==1 && data[i]['candidate'][0]['genus'] ==j ){
				sum_this_year += parseInt(data[i]['amount_this_year'],10)  //20221227
				sum_pre_year  += parseInt(data[i]['amount_pre_year'],10)   //20221227
				if(data[i]['candidate'][0]['variety'] <=0){ 
					tanaoroshi_flg +=1
				}else{
					tanaoroshi_hoka_flg =1
				}
				count++;
			}
		}
        if((tanaoroshi_flg ==1 && tanaoroshi_hoka_flg==1) || (tanaoroshi_flg >1)){
            //両方のflgが1だった場合又はtanaoroshi_flgが２以上の場合にマイナスする金額を算出
            sum_amount_this_year += -sum_this_year *0.5     //20221227
            sum_amount_pre_year  += -sum_pre_year*0.5       //20221227
        }else{
            //マイナスする金額は該当なしの場合
            sum_amount_this_year +=sum_this_year *0  //20221227
            sum_amount_pre_year  +=sum_pre_year*0    //20221227
        }
        sum_this_year=0;sum_pre_year=0;tanaoroshi_flg=0;
	}
	if(count==0){
		sum_amount_this_year="";
		sum_amount_pre_year="";
	}
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
    return [sum_amount_this_year,sum_amount_pre_year]
}
// 中分類の合計科目の有無判定用　20221221
function genus_sum(order,family){
	var count=0;
	var data=[];
    let genus_sum=0;let sum_amount_this_year=0 ;let sum_amount_pre_year=0;
    for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
			continue;
		}
		if(data[i]['candidate'][0]['order'] ==order && data[i]['candidate'][0]['family'] ==family && data[i]['candidate'][0]['genus'] ==0 ){
			sum_amount_this_year += parseInt(data[i]['amount_this_year'],10)
			sum_amount_pre_year  += parseInt(data[i]['amount_pre_year'],10)
		}
	}
    genus_sum =sum_amount_this_year + sum_amount_pre_year
	if(genus_sum == NaN){
		genus_sum=0;
	}
    return genus_sum
}
//20221214 流動資産集計用
CS.itask_list_show_edit_window_pana_calc_sum4_kojin_csv=function(order,family){
	var count=0;
	var data=[];
    //familyに所属する全てを集計 20221214
    let sum_amount_this_year="A" ;let sum_amount_pre_year="A";let goukei_kingaku_param=1;let sum_count =0;let daburi_flg=0;var tmp=0;let futsuu_kamoku_flg=0;let goukei_kamoku_flg=0;//20221214
    
	data=[];
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
        if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family){
			if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
				if(isNaN(sum_amount_pre_year)){
					sum_amount_pre_year=0;
				}
				if(isNaN(data[i]['amount_pre_year'])){
					data[i]['amount_pre_year']=0;
				}
			}
			if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
				if(isNaN(sum_amount_this_year)){
					sum_amount_this_year=0;
				}
				if(isNaN(data[i]['amount_this_year'])){
					data[i]['amount_this_year']=0;
				}
			}
			sum_amount_this_year += parseInt(data[i]['amount_this_year'],10);
			sum_amount_pre_year += parseInt(data[i]['amount_pre_year'],10);
			count++;
        }
        
    }
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
    return [sum_amount_this_year,sum_amount_pre_year]
}
CS.itask_list_show_edit_window_pana_calc_sum4_kojin_csv_no_goukei=function(order,family){
	var count=0;
	var data=[];
    //familyに所属する全てを集計 20221214
    let sum_amount_this_year="A" ;let sum_amount_pre_year="A";let goukei_kingaku_param=1;let sum_count =0;let daburi_flg=0;var tmp=0;let futsuu_kamoku_flg=0;let goukei_kamoku_flg=0;//20221214
    
	data=[];
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
        if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family && data[i]['candidate'][0]['variety']>0){
			if(CS.itask_list_show_edit_window_pana_is_goukei(data[i],CS.vueObj.kanjo_detail[i])){
			}else{
				if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
					if(isNaN(sum_amount_pre_year)){
						sum_amount_pre_year=0;
					}
					if(isNaN(data[i]['amount_pre_year'])){
						data[i]['amount_pre_year']=0;
					}
				}
				if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
					if(isNaN(sum_amount_this_year)){
						sum_amount_this_year=0;
					}
					if(isNaN(data[i]['amount_this_year'])){
						data[i]['amount_this_year']=0;
					}
				}
				sum_amount_this_year += parseInt(data[i]['amount_this_year'],10);
				sum_amount_pre_year += parseInt(data[i]['amount_pre_year'],10);
				count++;
			}
        }
        
    }
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
    return [sum_amount_this_year,sum_amount_pre_year]
}

CS.itask_list_show_edit_window_pana_get_one_goukei=function(order,family,genus,species){
	var count=0;
	var data=[];
    //familyに所属する全てを集計 20221214
    let sum_amount_this_year="A" ;let sum_amount_pre_year="A";let goukei_kingaku_param=1;let sum_count =0;let daburi_flg=0;var tmp=0;let futsuu_kamoku_flg=0;let goukei_kamoku_flg=0;//20221214
	data=[];
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
        if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family){
			if(genus!=null && data[i]['candidate'][0]['genus'] != genus){
				continue;
			}
			if(species!=null && data[i]['candidate'][0]['species'] != species){
				continue;
			}
			if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
				continue;
			}
			if(CS.itask_list_show_edit_window_pana_is_goukei(data[i],CS.vueObj.kanjo_detail[i])){
				if( !isNaN(data[i]['amount_pre_year'])){
					sum_amount_pre_year=data[i]['amount_pre_year'];
				}
				if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
					sum_amount_this_year=data[i]['amount_this_year'];
				}
			}

        }
        
    }
	sum_amount_this_year=parseInt(sum_amount_this_year,10);
	sum_amount_pre_year=parseInt(sum_amount_pre_year,10);
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
    return [sum_amount_this_year,sum_amount_pre_year]
}
CS.itask_list_show_edit_window_pana_get_one_futuu=function(order,family,genus,species){
	var count=0;
	var data=[];
    //familyに所属する全てを集計 20221214
    let sum_amount_this_year="A" ;let sum_amount_pre_year="A";let goukei_kingaku_param=1;let sum_count =0;let daburi_flg=0;var tmp=0;let futsuu_kamoku_flg=0;let goukei_kamoku_flg=0;//20221214
	data=[];
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
        if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family){
			if(genus!=null && data[i]['candidate'][0]['genus'] != genus){
				continue;
			}
			if(species!=null && data[i]['candidate'][0]['species'] != species){
				continue;
			}
			if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
				continue;
			}
			if(CS.itask_list_show_edit_window_pana_is_goukei(data[i],CS.vueObj.kanjo_detail[i])){
			}else{
				if( !isNaN(data[i]['amount_pre_year'])){
					sum_amount_pre_year=data[i]['amount_pre_year'];
				}
				if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
					sum_amount_this_year=data[i]['amount_this_year'];
				}
			}
        }
        
    }
	sum_amount_this_year=parseInt(sum_amount_this_year,10);
	sum_amount_pre_year=parseInt(sum_amount_pre_year,10);
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
    return [sum_amount_this_year,sum_amount_pre_year]
}
CS.itask_list_show_edit_window_pana_is_goukei=function(obj0,obj1){
	var m_kanjo_code=obj0["m_kanjo_code"];
	var keys=m_kanjo_code.split('_');
	for(var j=0;j<keys.length;j++){
		keys[j]=CS.toI(keys[j]);
	}
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		if(keys[4]<=0){
			return true;
		}else{
			return false;
		}
	}else{
		if((keys[4]<=0 && obj1['koteiitem']!="NG") || obj1['koteiitem']=="OK"){
			return true;
		}else{
			return false;
		}	
	}
}
CS.itask_list_show_edit_window_pana_calc_sum4_for_pl4=function(order,family){
	var count=0;
	var data=[];
    //familyに所属する全てを集計 20221214
    let sum_amount_this_year="A" ;let sum_amount_pre_year="A";let goukei_kingaku_param=1;let sum_count =0;let daburi_flg=0;var tmp=0;let futsuu_kamoku_flg=0;let goukei_kamoku_flg=0;//20221214
    
	data=[];
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
        if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family){
			if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
				continue;
			}
			if(CS.itask_list_show_edit_window_pana_is_goukei(data[i],CS.vueObj.kanjo_detail[i])){
			}else{
				if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
					if(isNaN(sum_amount_pre_year)){
						sum_amount_pre_year=0;
					}
					if(isNaN(data[i]['amount_pre_year'])){
						data[i]['amount_pre_year']=0;
					}
				}
				if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
					if(isNaN(sum_amount_this_year)){
						sum_amount_this_year=0;
					}
					if(isNaN(data[i]['amount_this_year'])){
						data[i]['amount_this_year']=0;
					}
				}
				sum_amount_this_year += parseInt(data[i]['amount_this_year'],10)*parseInt(data[i]['candidate'][0]['property'],10);
				sum_amount_pre_year += parseInt(data[i]['amount_pre_year'],10)*parseInt(data[i]['candidate'][0]['property'],10);
				count++;
			}
        }
        
    }
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
    return [sum_amount_this_year,sum_amount_pre_year]
}
//20221214 流動資産集計用
CS.itask_list_show_edit_window_pana_calc_sum4=function(order,family){
    var genusSum = genus_sum(order,family);
    var tanaoroshiCheck=tanaoroshi_check();
    tanaoroshi_this=tanaoroshiCheck[0];
    tanaoroshi_pre=tanaoroshiCheck[1];
	var count=0;
	var data=[];
    //familyに所属する全てを集計 20221214
    let sum_amount_this_year="A" ;let sum_amount_pre_year="A";let goukei_kingaku_param=1;let sum_count =0;let daburi_flg=0;var tmp=0;let futsuu_kamoku_flg=0;let goukei_kamoku_flg=0;//20221214
    
	////////////////////////////////////////
	var loselist={};
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(typeof CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']] != "undefined" && data[i]['amount_pre_year'] !="0" && data[i]['amount_this_year'] !="0"){
			for(var j=0;j<CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']].length;j++){
				if(typeof CS.delete_kensan_kanjo_detail_flag=="undefined" || !CS.delete_kensan_kanjo_detail_flag){
					loselist[CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']][j]]=true;
				}else{
					if(CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']][j]!="2_10_4_12_1"){
						loselist[CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']][j]]=true;	
					}
				}
			}
		}
    }
	if(typeof CS.delete_kensan_kanjo_detail_flag=="undefined" || !CS.delete_kensan_kanjo_detail_flag){
		for(var j=0;j<CS.itask_list_show_edit_window_ex_list.length;j++){
			loselist[CS.itask_list_show_edit_window_ex_list[j]]=true;
		}
	}
	////////////////////////////////////
	var dedlist={};
	var dedlist_p={};
	var dedlist_t={};
	var goukei_this_year=NaN;
	var goukei_pre_year=NaN;
	data=[];
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(typeof dedlist[data[i]['m_kanjo_code']] !="undefined" && dedlist_t[data[i]['m_kanjo_code']].indexOf(data[i]['amount_this_year']) && dedlist_p[data[i]['m_kanjo_code']].indexOf(data[i]['amount_pre_year'])){
			continue;
		}
		if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
			continue;
		}
        if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family && typeof loselist[data[i]['m_kanjo_code']] == "undefined"){
			////////////////////合計項目はもう計算しない
			if(CS.itask_list_show_edit_window_pana_is_goukei(data[i],CS.vueObj.kanjo_detail[i])){
				goukei_this_year=parseInt(data[i]['amount_this_year'],10);
				goukei_pre_year=parseInt(data[i]['amount_pre_year'],10);
				continue;
			}
			if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
				if(isNaN(sum_amount_pre_year)){
					sum_amount_pre_year=0;
				}
				if(isNaN(data[i]['amount_pre_year'])){
					data[i]['amount_pre_year']=0;
				}
			}
			if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
				if(isNaN(sum_amount_this_year)){
					sum_amount_this_year=0;
				}
				if(isNaN(data[i]['amount_this_year'])){
					data[i]['amount_this_year']=0;
				}
			}
            sum_count +=1;
            //2回連続していないが合計科目（variety≦0）の金額が>0の場合(合計科目variety<=0)　修正20221214
            if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['variety']<=0){
                goukei_kingaku_param=0.5
            }
            //合計科目があるか
            if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['species'] ==0 && data[i]['candidate'][0]['variety'] <= 0){
                goukei_kamoku_flg =1
            }
            //普通科目があるか
            if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['variety'] > 0){
                futsuu_kamoku_flg=1
            }

            if(data[i]['candidate'][0]['property']>=0) {
                // if(data[i]['candidate'][0]['variety']>0){
					// if(data[i]['m_kanjo_code']=="2_40_0_20_1" || data[i]['m_kanjo_code']=="2_10_1_1_8" || data[i]['m_kanjo_code']=="2_10_4_15_1"){
						sum_amount_this_year += parseInt(data[i]['amount_this_year'],10)
						sum_amount_pre_year += parseInt(data[i]['amount_pre_year'],10)
					// }else{
						// sum_amount_this_year += Math.abs(parseInt(data[i]['amount_this_year'],10))
						// sum_amount_pre_year += Math.abs(parseInt(data[i]['amount_pre_year'],10)) 
					// }
                // }else{
                    // sum_amount_this_year += parseInt(data[i]['amount_this_year'],10)
                    // sum_amount_pre_year += parseInt(data[i]['amount_pre_year'],10) 
                // }
            }else{
                //property<0 普通の科目は集計中に負の値に修正するが、合計科目及び損益科目はそのまま集計する
                // if(data[i]['candidate'][0]['variety']>=0){
                    // sum_amount_this_year -= Math.abs(parseInt(data[i]['amount_this_year'],10))
                    // sum_amount_pre_year -= Math.abs(parseInt(data[i]['amount_pre_year'],10)) 
                // }else{
                    sum_amount_this_year -= parseInt(data[i]['amount_this_year'],10)
                    sum_amount_pre_year -= parseInt(data[i]['amount_pre_year'],10)
                // }
            }
			dedlist[data[i]['m_kanjo_code']]=true;
			if(typeof dedlist_p[data[i]['m_kanjo_code']]=="undefined"){
				dedlist_p[data[i]['m_kanjo_code']]=[];
			}
			dedlist_p[data[i]['m_kanjo_code']].push(data[i]['amount_pre_year']);
			if(typeof dedlist_t[data[i]['m_kanjo_code']]=="undefined"){
				dedlist_t[data[i]['m_kanjo_code']]=[];
			}
			dedlist_t[data[i]['m_kanjo_code']].push(data[i]['amount_this_year']);
			count++;
        }
        
    }
	///////////////////////////////
	/////////////////////////////////
	if(!isNaN(sum_amount_this_year) || !isNaN(tanaoroshi_this)){
		if(isNaN(sum_amount_this_year)){
			sum_amount_this_year=0;
		}
		if(isNaN(tanaoroshi_this)){
			tanaoroshi_this=0;
		}
	}
	if(!isNaN(sum_amount_pre_year) || !isNaN(tanaoroshi_pre)){
		if(isNaN(sum_amount_pre_year)){
			sum_amount_pre_year=0;
		}
		if(isNaN(tanaoroshi_pre)){
			tanaoroshi_pre=0;
		}
	}
	///////////////////////////////
	///////////////////////////////
    sum_amount_this_year +=tanaoroshi_this
    sum_amount_pre_year +=tanaoroshi_pre
    goukei_kingaku_param =1;
    if(sum_count ==1){
        goukei_kingaku_param =1;
    }else if(order==1 && family==2 && genus==3){
        goukei_kingaku_param =1;        
    }
    if(goukei_kamoku_flg ==0){
        goukei_kingaku_param =1; //20221214
    }
    if(genusSum ==0){
        goukei_kingaku_param =1; //20221221
    }
    sum_amount_this_year =  sum_amount_this_year*goukei_kingaku_param
    sum_amount_pre_year =  sum_amount_pre_year *goukei_kingaku_param
	if(count==0){
		sum_amount_this_year=goukei_this_year;
		sum_amount_pre_year=goukei_pre_year;
	}
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
    return [sum_amount_this_year,sum_amount_pre_year]
}
//20221214 familyで集計
CS.itask_list_show_edit_window_pana_calc_sum_f = function(order,family,variety){
	var count=0;
	var data=[];
    //familyに所属する全てを集計 20221214
    let sum_amount_this_year="A" ;let sum_amount_pre_year="A";let goukei_kingaku_param=1;let sum_count =0;let daburi_flg=0;var tmp=0;let futsuu_kamoku_flg=0;let goukei_kamoku_flg=0;//20221214
	////////////////////////////////////////
	var loselist={};
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(typeof CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']] != "undefined" && data[i]['amount_pre_year'] !="0" && data[i]['amount_this_year'] !="0"){
			for(var j=0;j<CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']].length;j++){
				loselist[CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']][j]]=true;
			}
		}
    }
	if(typeof CS.delete_kensan_kanjo_detail_flag=="undefined" || !CS.delete_kensan_kanjo_detail_flag){
		for(var j=0;j<CS.itask_list_show_edit_window_ex_list.length;j++){
			loselist[CS.itask_list_show_edit_window_ex_list[j]]=true;
		}
	}
	////////////////////////////////////
    var goukei_count=0;
	var dedlist={};
	var dedlist_p={};
	var dedlist_t={};
    var goukei_this_year=NaN;
	var goukei_pre_year=NaN;
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(typeof dedlist[data[i]['m_kanjo_code']] !="undefined" && dedlist_t[data[i]['m_kanjo_code']].indexOf(data[i]['amount_this_year']) && dedlist_p[data[i]['m_kanjo_code']].indexOf(data[i]['amount_pre_year'])){
			continue;
		}
		if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
			continue;
		}
		if(typeof loselist[data[i]['m_kanjo_code']] != "undefined"){
			continue;
		}
		dedlist[data[i]['m_kanjo_code']]=true;
		if(typeof dedlist_p[data[i]['m_kanjo_code']]=="undefined"){
			dedlist_p[data[i]['m_kanjo_code']]=[];
		}
		dedlist_p[data[i]['m_kanjo_code']].push(data[i]['amount_pre_year']);
		if(typeof dedlist_t[data[i]['m_kanjo_code']]=="undefined"){
			dedlist_t[data[i]['m_kanjo_code']]=[];
		}
		if(typeof CS.vueObj.kanjo_detail[i]['tabindex'] !="undefined"){
			data[i]['candidate'][0]['tabindex']=parseInt(CS.vueObj.kanjo_detail[i]['tabindex'],10);
		}
		if(order==1 && family==4 && data[i]['candidate'][0]['tabindex']!=4){
			continue;
		}
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
        if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family ){
			////////////////////合計項目はもう計算しない
			if(CS.itask_list_show_edit_window_pana_is_goukei(data[i],CS.vueObj.kanjo_detail[i])){
				goukei_this_year=parseInt(data[i]['amount_this_year'],10);
				goukei_pre_year=parseInt(data[i]['amount_pre_year'],10);
				continue;
			}
			if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
				if(isNaN(sum_amount_pre_year)){
					sum_amount_pre_year=0;
				}
				if(isNaN(data[i]['amount_pre_year'])){
					data[i]['amount_pre_year']=0;
				}
			}
			if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
				if(isNaN(sum_amount_this_year)){
					sum_amount_this_year=0;
				}
				if(isNaN(data[i]['amount_this_year'])){
					data[i]['amount_this_year']=0;
				}
			}
            //2回連続していないが合計科目（variety≦0）の金額が>0の場合(合計科目variety<=0)　修正20221214
            if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['variety']<=0){
                goukei_kingaku_param=0.5
            }

            //普通科目があるか
            if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['variety'] > 0){
                futsuu_kamoku_flg=1
            }
            if(data[i]['candidate'][0]['property']>=0) {
                // if(data[i]['candidate'][0]['variety']>0){
				if(data[i]['candidate'][0]['order'] == 1 && data[i]['candidate'][0]['family'] == 1 && data[i]['candidate'][0]['genus'] == 1 ){
					sum_amount_this_year += Math.abs(parseInt(data[i]['amount_this_year'],10));
					sum_amount_pre_year += Math.abs(parseInt(data[i]['amount_pre_year'],10));
					sum_count +=1;
				}else{
					sum_amount_this_year += parseInt(data[i]['amount_this_year'],10);
					sum_amount_pre_year += parseInt(data[i]['amount_pre_year'],10);
					sum_count +=1;
				}
                // }else{
					// if(goukei_count<1 || goukei_kamoku_flg!=1){
						// sum_amount_this_year += parseInt(data[i]['amount_this_year'],10);
						// sum_amount_pre_year += parseInt(data[i]['amount_pre_year'],10);
						// sum_count +=1;
					// }
					// goukei_count++;
                // }
            }else{
                //property<0 普通の科目は集計中に負の値に修正するが、合計科目及び損益科目はそのまま集計する
                // if(data[i]['candidate'][0]['variety']>=0){
				if(data[i]['candidate'][0]['order'] == 1 && data[i]['candidate'][0]['family'] == 1 && data[i]['candidate'][0]['genus'] == 1 ){
					sum_amount_this_year -= Math.abs(parseInt(data[i]['amount_this_year'],10));
					sum_amount_pre_year -= Math.abs(parseInt(data[i]['amount_pre_year'],10));
					sum_count +=1;
				}else{
					sum_amount_this_year -= parseInt(data[i]['amount_this_year'],10);
					sum_amount_pre_year -= parseInt(data[i]['amount_pre_year'],10);
					sum_count +=1;
					goukei_count++;
				}
                // }else{
                    // 当期仕入に関する例外処理：当期仕入に合計行がある場合、足さずにgoukei_kingaku_param=1.0にする
                    // if(order==1 && family==2 && genus==2 && data[i]['candidate'][0]['variety'] <0){
                        // goukei_kingaku_param=1.0
                    // }else{
						// if(goukei_count<1 || goukei_kamoku_flg!=1){
							// sum_amount_this_year -= parseInt(data[i]['amount_this_year'],10);
							// sum_amount_pre_year -= parseInt(data[i]['amount_pre_year'],10);
							// sum_count +=1;
						// }
						// goukei_count++;
                    // }
                // }

            }
			//合計科目があるか
            if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['species'] ==0 && data[i]['candidate'][0]['variety'] <= 0){
                goukei_kamoku_flg =1
            }
			dedlist[data[i]['m_kanjo_code']]=true;
			count++;
        }
        
    }
	goukei_kingaku_param =1;
    if(sum_count ==1){
        goukei_kingaku_param =1;
    }else if(order==1 && family==2 && genus==3){
        goukei_kingaku_param =1;        
    }
    if(goukei_kamoku_flg ==0 && futsuu_kamoku_flg ==1 ){
        goukei_kingaku_param =1; //20221214
    }
    sum_amount_this_year =  sum_amount_this_year*goukei_kingaku_param
    sum_amount_pre_year =  sum_amount_pre_year *goukei_kingaku_param
	if(count==0){
		sum_amount_this_year=goukei_this_year;
		sum_amount_pre_year=goukei_pre_year;
	}
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
    return [sum_amount_this_year,sum_amount_pre_year]
}
CS.itask_list_show_edit_window_pana_calc_sum_f_s = function(order,family,genus,species,a){
	var count=0;
	var data=[];
	var goukei_count=0;
	////////////////////////////////////////
	var loselist={};
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(typeof CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']] != "undefined" && data[i]['amount_pre_year'] !="0" && data[i]['amount_this_year'] !="0"){
			for(var j=0;j<CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']].length;j++){
				loselist[CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']][j]]=true;
			}
		}
    }
	if(typeof CS.delete_kensan_kanjo_detail_flag=="undefined" || !CS.delete_kensan_kanjo_detail_flag){
		for(var j=0;j<CS.itask_list_show_edit_window_ex_list.length;j++){
			loselist[CS.itask_list_show_edit_window_ex_list[j]]=true;
		}
	}
	////////////////////////////////////
	var dedlist={};
	var dedlist_p={};
	var dedlist_t={};
    //familyに所属する全てを集計 20221214
    let sum_amount_this_year="A" ;let sum_amount_pre_year="A";let goukei_kingaku_param=1;let sum_count =0;let daburi_flg=0;var tmp=0;let futsuu_kamoku_flg=0;let goukei_kamoku_flg=0;//20221214
    var goukei_this_year=NaN;
	var goukei_pre_year=NaN;
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(typeof dedlist[data[i]['m_kanjo_code']] !="undefined" && dedlist_t[data[i]['m_kanjo_code']].indexOf(data[i]['amount_this_year']) && dedlist_p[data[i]['m_kanjo_code']].indexOf(data[i]['amount_pre_year'])){
			continue;
		}
		if(typeof loselist[data[i]['m_kanjo_code']] != "undefined"){
			continue;
		}
		if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
			continue;
		}
		dedlist[data[i]['m_kanjo_code']]=true;
		if(typeof dedlist_p[data[i]['m_kanjo_code']]=="undefined"){
			dedlist_p[data[i]['m_kanjo_code']]=[];
		}
		dedlist_p[data[i]['m_kanjo_code']].push(data[i]['amount_pre_year']);
		if(typeof dedlist_t[data[i]['m_kanjo_code']]=="undefined"){
			dedlist_t[data[i]['m_kanjo_code']]=[];
		}
		if(typeof CS.vueObj.kanjo_detail[i]['tabindex'] !="undefined"){
			data[i]['candidate'][0]['tabindex']=parseInt(CS.vueObj.kanjo_detail[i]['tabindex'],10);
		}
		if(typeof CS.vueObj.kanjo_detail[i]['tabindex'] !="undefined"){
			data[i]['candidate'][0]['tabindex']=parseInt(CS.vueObj.kanjo_detail[i]['tabindex'],10);
		}
		if(data[i]['candidate'][0]['tabindex']==4 && species!=9999 && a!=9999){
			continue;
		}
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
        if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family ){
			if(typeof genus !="undefined" && genus!=data[i]['candidate'][0]['genus']){
				continue;
			}
			if(typeof species !="undefined" && species!=data[i]['candidate'][0]['species'] && species!=9999){
				continue;
			}
			////////////////////合計項目はもう計算しない
			if(CS.itask_list_show_edit_window_pana_is_goukei(data[i],CS.vueObj.kanjo_detail[i])){
				goukei_this_year=parseInt(data[i]['amount_this_year'],10);
				goukei_pre_year=parseInt(data[i]['amount_pre_year'],10);
				continue;
			}
			if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
				if(isNaN(sum_amount_pre_year)){
					sum_amount_pre_year=0;
				}
				if(isNaN(data[i]['amount_pre_year'])){
					data[i]['amount_pre_year']=0;
				}
			}
			if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
				if(isNaN(sum_amount_this_year)){
					sum_amount_this_year=0;
				}
				if(isNaN(data[i]['amount_this_year'])){
					data[i]['amount_this_year']=0;
				}
			}
            sum_count +=1;
            //2回連続していないが合計科目（variety≦0）の金額が>0の場合(合計科目variety<=0)　修正20221214
            if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['variety']<=0){
                goukei_kingaku_param=0.5
            }

            //普通科目があるか
            if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['variety'] > 0){
                futsuu_kamoku_flg=1
            }

            if(data[i]['candidate'][0]['property']>=0) {
                // if(data[i]['candidate'][0]['variety']>0){
                    sum_amount_this_year += parseInt(data[i]['amount_this_year'],10)
                    sum_amount_pre_year += parseInt(data[i]['amount_pre_year'],10) 
					count++;
                // }else{
					// if(goukei_count<1 || goukei_kamoku_flg!=1){
						// sum_amount_this_year += parseInt(data[i]['amount_this_year'],10)
						// sum_amount_pre_year += parseInt(data[i]['amount_pre_year'],10) 
						// count++;
					// }
					// goukei_count++;
                // }
            }else{
                //property<0 普通の科目は集計中に負の値に修正するが、合計科目及び損益科目はそのまま集計する
                // if(data[i]['candidate'][0]['variety']>=0){
					if((goukei_count<1 && futsuu_kamoku_flg!=1) || futsuu_kamoku_flg==1){
						// sum_amount_this_year -= Math.abs(parseInt(data[i]['amount_this_year'],10))
						// sum_amount_pre_year -= Math.abs(parseInt(data[i]['amount_pre_year'],10)) 
						sum_amount_this_year -= parseInt(data[i]['amount_this_year'],10)
						sum_amount_pre_year -= parseInt(data[i]['amount_pre_year'],10) 
						count++;
					}
					if(goukei_count<1 && futsuu_kamoku_flg!=1){
						goukei_count++;
					}
                // }else{
                    // 当期仕入に関する例外処理：当期仕入に合計行がある場合、足さずにgoukei_kingaku_param=1.0にする
                    // if(order==1 && family==2 && genus==2 && data[i]['candidate'][0]['variety'] <0){
                        // goukei_kingaku_param=1.0
                    // }else{
						// if(goukei_count<1 || goukei_kamoku_flg!=1){
							// sum_amount_this_year -= parseInt(data[i]['amount_this_year'],10)
							// sum_amount_pre_year -= parseInt(data[i]['amount_pre_year'],10)
							// count++;
						// }
						// goukei_count++;
                    // }
                // }
            }
            //合計科目があるか
            if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['species'] ==0 && data[i]['candidate'][0]['variety'] <= 0){
                goukei_kamoku_flg =1
            }
        }
        
    }
	goukei_kingaku_param =1;
    if(count ==1){
        goukei_kingaku_param =1;
    }else if(order==1 && family==2 && genus==3){
        goukei_kingaku_param =1;        
    }
    if(goukei_kamoku_flg ==0 && futsuu_kamoku_flg ==1 ){
        goukei_kingaku_param =1; //20221214
    }
    sum_amount_this_year =  sum_amount_this_year*goukei_kingaku_param
    sum_amount_pre_year =  sum_amount_pre_year *goukei_kingaku_param
	if(count==0){
		sum_amount_this_year=goukei_this_year;
		sum_amount_pre_year=goukei_pre_year;
	}
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
    return [sum_amount_this_year,sum_amount_pre_year]
}
CS.itask_list_show_edit_window_pana_calc_sum_f_s_csv = function(order,family,genus,species,a){
	var count=0;
	var data=[];
	var goukei_count=0;
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	////////////////////////////////////////
	var loselist={};
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(typeof CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']] != "undefined" && data[i]['amount_pre_year'] !="0" && data[i]['amount_this_year'] !="0"){
			for(var j=0;j<CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']].length;j++){
				loselist[CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']][j]]=true;
			}
		}
    }
	if(typeof CS.delete_kensan_kanjo_detail_flag=="undefined" || !CS.delete_kensan_kanjo_detail_flag){
		for(var j=0;j<CS.itask_list_show_edit_window_ex_list.length;j++){
			loselist[CS.itask_list_show_edit_window_ex_list[j]]=true;
		}
	}
	var hastabindex4=false;
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(typeof loselist[data[i]['m_kanjo_code']] != "undefined"){
			continue;
		}
		if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
			continue;
		}
		if(typeof CS.vueObj.kanjo_detail[i]['tabindex'] !="undefined"){
			data[i]['candidate'][0]['tabindex']=parseInt(CS.vueObj.kanjo_detail[i]['tabindex'],10);
		}
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
        if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family ){
			if(typeof genus !="undefined" && genus!=data[i]['candidate'][0]['genus']){
				continue;
			}
			if(typeof species !="undefined" && species!=data[i]['candidate'][0]['species'] && species!=9999){
				continue;
			}
			if(data[i]['candidate'][0]['tabindex']==4){
				hastabindex4=true;
			}
        }
        
    }
	
	////////////////////////////////////
	var dedlist={};
	var dedlist_p={};
	var dedlist_t={};
    //familyに所属する全てを集計 20221214
    let sum_amount_this_year="A" ;let sum_amount_pre_year="A";let goukei_kingaku_param=1;let sum_count =0;let daburi_flg=0;var tmp=0;let futsuu_kamoku_flg=0;let goukei_kamoku_flg=0;//20221214
    var goukei_this_year=NaN;
	var goukei_pre_year=NaN;
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(typeof dedlist[data[i]['m_kanjo_code']] !="undefined" && dedlist_t[data[i]['m_kanjo_code']].indexOf(data[i]['amount_this_year']) && dedlist_p[data[i]['m_kanjo_code']].indexOf(data[i]['amount_pre_year'])){
			continue;
		}
		if(typeof loselist[data[i]['m_kanjo_code']] != "undefined"){
			continue;
		}
		if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
			continue;
		}

		dedlist[data[i]['m_kanjo_code']]=true;
		if(typeof dedlist_p[data[i]['m_kanjo_code']]=="undefined"){
			dedlist_p[data[i]['m_kanjo_code']]=[];
		}
		dedlist_p[data[i]['m_kanjo_code']].push(data[i]['amount_pre_year']);
		if(typeof dedlist_t[data[i]['m_kanjo_code']]=="undefined"){
			dedlist_t[data[i]['m_kanjo_code']]=[];
		}
		if(typeof CS.vueObj.kanjo_detail[i]['tabindex'] !="undefined"){
			data[i]['candidate'][0]['tabindex']=parseInt(CS.vueObj.kanjo_detail[i]['tabindex'],10);
		}
		if(hastabindex4 && data[i]['candidate'][0]['tabindex']!=4){
			continue;
		}
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
        if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family ){
			if(typeof genus !="undefined" && genus!=data[i]['candidate'][0]['genus']){
				continue;
			}
			if(typeof species !="undefined" && species!=data[i]['candidate'][0]['species'] && species!=9999){
				continue;
			}
			////////////////////合計項目はもう計算しない
			if(CS.itask_list_show_edit_window_pana_is_goukei(data[i],CS.vueObj.kanjo_detail[i])){
				goukei_this_year=parseInt(data[i]['amount_this_year'],10);
				goukei_pre_year=parseInt(data[i]['amount_pre_year'],10);
				continue;
			}
			if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
				if(isNaN(sum_amount_pre_year)){
					sum_amount_pre_year=0;
				}
				if(isNaN(data[i]['amount_pre_year'])){
					data[i]['amount_pre_year']=0;
				}
			}
			if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
				if(isNaN(sum_amount_this_year)){
					sum_amount_this_year=0;
				}
				if(isNaN(data[i]['amount_this_year'])){
					data[i]['amount_this_year']=0;
				}
			}
            sum_count +=1;
            //2回連続していないが合計科目（variety≦0）の金額が>0の場合(合計科目variety<=0)　修正20221214
            if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['variety']<=0){
                goukei_kingaku_param=0.5
            }

            //普通科目があるか
            if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['variety'] > 0){
                futsuu_kamoku_flg=1
            }

            if(data[i]['candidate'][0]['property']>=0) {
                // if(data[i]['candidate'][0]['variety']>0){
                    sum_amount_this_year += Math.abs(parseInt(data[i]['amount_this_year'],10))
                    sum_amount_pre_year += Math.abs(parseInt(data[i]['amount_pre_year'],10)) 
					count++;
                // }else{
					// if(goukei_count<1 || goukei_kamoku_flg!=1){
						// sum_amount_this_year += parseInt(data[i]['amount_this_year'],10)
						// sum_amount_pre_year += parseInt(data[i]['amount_pre_year'],10) 
						// count++;
					// }
					// goukei_count++;
                // }
            }else{
                //property<0 普通の科目は集計中に負の値に修正するが、合計科目及び損益科目はそのまま集計する
                // if(data[i]['candidate'][0]['variety']>=0){
					if((goukei_count<1 && futsuu_kamoku_flg!=1) || futsuu_kamoku_flg==1){
						sum_amount_this_year -= Math.abs(parseInt(data[i]['amount_this_year'],10))
						sum_amount_pre_year -= Math.abs(parseInt(data[i]['amount_pre_year'],10)) 
						count++;
					}
					if(goukei_count<1 && futsuu_kamoku_flg!=1){
						goukei_count++;
					}
                // }else{
                    // 当期仕入に関する例外処理：当期仕入に合計行がある場合、足さずにgoukei_kingaku_param=1.0にする
                    // if(order==1 && family==2 && genus==2 && data[i]['candidate'][0]['variety'] <0){
                        // goukei_kingaku_param=1.0
                    // }else{
						// if(goukei_count<1 || goukei_kamoku_flg!=1){
							// sum_amount_this_year -= parseInt(data[i]['amount_this_year'],10)
							// sum_amount_pre_year -= parseInt(data[i]['amount_pre_year'],10)
							// count++;
						// }
						// goukei_count++;
                    // }
                // }
            }
            //合計科目があるか
            if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['species'] ==0 && data[i]['candidate'][0]['variety'] <= 0){
                goukei_kamoku_flg =1
            }
        }
        
    }
	goukei_kingaku_param =1;
    if(count ==1){
        goukei_kingaku_param =1;
    }else if(order==1 && family==2 && genus==3){
        goukei_kingaku_param =1;        
    }
    if(goukei_kamoku_flg ==0 && futsuu_kamoku_flg ==1 ){
        goukei_kingaku_param =1; //20221214
    }
    sum_amount_this_year =  sum_amount_this_year*goukei_kingaku_param
    sum_amount_pre_year =  sum_amount_pre_year *goukei_kingaku_param
	if(count==0){
		sum_amount_this_year=goukei_this_year;
		sum_amount_pre_year=goukei_pre_year;
	}
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
    return [sum_amount_this_year,sum_amount_pre_year]
}
CS.itask_list_show_edit_window_pana_calc_sum_pattern3 = function(){
    //指定したspeciesのみ集計
	var count=0;
	var data=[];
    let sum_amount_this_year="A" ;let sum_amount_pre_year="A";let goukei_kingaku_param=1;let sum_count =0;let daburi_flg=0;var tmp=0;let futsuu_kamoku_flg=0;let goukei_kamoku_flg=0;//20221214
	var dedlist=["1_2_2_1_0","1_2_0_0_-8"];
	data=[];
	var goukei_this_year=NaN;
	var goukei_pre_year=NaN;
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
			continue;
		}
		var doflag=false;
		for(j=1;j>=0;j--){
			if(dedlist[j]==data[i]['m_kanjo_code']){
				doflag=true;
				dedlist.splice( j, 1 );
			}
		}
		if (doflag){
			data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
			data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
			data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
			data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
			////////////////////合計項目はもう計算しない
			if(CS.itask_list_show_edit_window_pana_is_goukei(data[i],CS.vueObj.kanjo_detail[i])){
				goukei_this_year=parseInt(data[i]['amount_this_year'],10);
				goukei_pre_year=parseInt(data[i]['amount_pre_year'],10);
				continue;
			}
			if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
				if(isNaN(sum_amount_pre_year)){
					sum_amount_pre_year=0;
				}
				if(isNaN(data[i]['amount_pre_year'])){
					data[i]['amount_pre_year']=0;
				}
			}
			if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
				if(isNaN(sum_amount_this_year)){
					sum_amount_this_year=0;
				}
				if(isNaN(data[i]['amount_this_year'])){
					data[i]['amount_this_year']=0;
				}
			}
			sum_amount_this_year+=parseInt(data[i]['amount_this_year'],10) ;
			sum_amount_pre_year+=parseInt(data[i]['amount_pre_year'],10) ;
			sum_count +=1;
			count++;
        }
    }
    sum_amount_this_year =  sum_amount_this_year
    sum_amount_pre_year =  sum_amount_pre_year
	if(count==0){
		sum_amount_this_year=goukei_this_year;
		sum_amount_pre_year=goukei_pre_year;
	}
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
    return [sum_amount_this_year,sum_amount_pre_year]
}
CS.itask_list_show_edit_window_pana_calc_sum = function(order,family,genus,species,variety){
    //指定したspeciesのみ集計
	var count=0;
	var data=[];
    let sum_amount_this_year="A" ;let sum_amount_pre_year="A";let goukei_kingaku_param=1;let sum_count =0;let daburi_flg=0;var tmp=0;let futsuu_kamoku_flg=0;let goukei_kamoku_flg=0;//20221214
	var dedlist={};
	var dedlist_p={};
	var dedlist_t={};
	
	////////////////////////////////////////
	var loselist={};
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(typeof CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']] != "undefined"){
			for(var j=0;j<CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']].length;j++){
				//会社コード：10172115会社名：ジャスト電器（有）案件でコメントアウトを取消りしました
				loselist[CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']][j]]=true;
			}
		}
    }
	if(typeof CS.delete_kensan_kanjo_detail_flag=="undefined" || !CS.delete_kensan_kanjo_detail_flag){
		for(var j=0;j<CS.itask_list_show_edit_window_ex_list.length;j++){
			loselist[CS.itask_list_show_edit_window_ex_list[j]]=true;
		}
	}
	////////////////////////////////////
	
	data=[];
	var goukei_this_year=NaN;
	var goukei_pre_year=NaN;
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];

		if(typeof dedlist[data[i]['m_kanjo_code']] !="undefined" && dedlist_t[data[i]['m_kanjo_code']].indexOf(data[i]['amount_this_year']) && dedlist_p[data[i]['m_kanjo_code']].indexOf(data[i]['amount_pre_year'])){
			continue;
		}
		if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
			continue;
		}
		dedlist[data[i]['m_kanjo_code']]=true;
		if(typeof dedlist_p[data[i]['m_kanjo_code']]=="undefined"){
			dedlist_p[data[i]['m_kanjo_code']]=[];
		}
		dedlist_p[data[i]['m_kanjo_code']].push(data[i]['amount_pre_year']);
		if(typeof dedlist_t[data[i]['m_kanjo_code']]=="undefined"){
			dedlist_t[data[i]['m_kanjo_code']]=[];
		}
		if(typeof CS.vueObj.kanjo_detail[i]['tabindex'] !="undefined"){
			data[i]['candidate'][0]['tabindex']=parseInt(CS.vueObj.kanjo_detail[i]['tabindex'],10);
		}
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		var exflag=false;
		if(data[i]['candidate'][0]['order'] == 1 && data[i]['candidate'][0]['family'] == 2 && data[i]['candidate'][0]['genus'] == 2 && data[i]['candidate'][0]['species'] == 2){
			exflag=true;
		}
		if(data[i]['candidate'][0]['order'] == 1 && data[i]['candidate'][0]['family'] == 2 && data[i]['candidate'][0]['genus'] == 3){
			exflag=true;
		}
		futsuu_kamoku_flg=0;
        //speciesの指定あり
        if (species>0 || variety==9999){
            if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family && data[i]['candidate'][0]['genus'] == genus &&  data[i]['candidate'][0]['species'] == species && typeof loselist[data[i]['m_kanjo_code']] == "undefined"){
				if(order==1 && family==4 && genus==0 ){
					if(data[i]['candidate'][0]['tabindex']!=4){
						continue;
					}
				}else if(order==1){
					if(data[i]['candidate'][0]['tabindex']!=4 && variety!=9999){
						continue;
					}
				}else if(order==2 && family==10 && genus==2 && species==0 && variety==9999){
					if(data[i]['m_kanjo_code']=="2_10_2_0_3"){
						continue;
					}
				}
				////////////////////合計項目はもう計算しない
				if(CS.itask_list_show_edit_window_pana_is_goukei(data[i],CS.vueObj.kanjo_detail[i])){
					if(species==-2){
						//species==-2場合のに合計項目を使わない
						continue;
					}
					if(exflag){
						goukei_this_year=Math.abs(parseInt(data[i]['amount_this_year'],10));
						goukei_pre_year=Math.abs(parseInt(data[i]['amount_pre_year'],10));
					}else{
						if((data[i]['candidate'][0]['order']==1 && data[i]['candidate'][0]['family'] == 12) ||
						(data[i]['candidate'][0]['order']==1 && data[i]['candidate'][0]['family'] == 7) ||
						(data[i]['candidate'][0]['order']==1 && data[i]['candidate'][0]['family'] == 10)){
							goukei_this_year=parseInt(data[i]['amount_this_year'],10)* data[i]['candidate'][0]['property'];
							goukei_pre_year=parseInt(data[i]['amount_pre_year'],10)* data[i]['candidate'][0]['property'];
						}else{
							goukei_this_year=parseInt(data[i]['amount_this_year'],10);
							goukei_pre_year=parseInt(data[i]['amount_pre_year'],10);
						}
					}
					continue;
				}
				if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
					if(isNaN(sum_amount_pre_year)){
						sum_amount_pre_year=0;
					}
					if(isNaN(data[i]['amount_pre_year'])){
						data[i]['amount_pre_year']=0;
					}
				}
				if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
					if(isNaN(sum_amount_this_year)){
						sum_amount_this_year=0;
					}
					if(isNaN(data[i]['amount_this_year'])){
						data[i]['amount_this_year']=0;
					}
				}
                //2回連続していないが合計科目（variety≦0）の金額が>0の場合
                if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['variety']<=0){
                    goukei_kingaku_param=0.5
                }
                // if(data[i]['candidate'][0]['family'] ==1 && data[i]['candidate'][0]['genus'] ==4 && data[i]['candidate'][0]['variety'] ==16){alert(data[i]['amount_this_year'])}
                    sum_amount_this_year+=parseInt(data[i]['amount_this_year'],10) * data[i]['candidate'][0]['property'];
                    sum_amount_pre_year+=parseInt(data[i]['amount_pre_year'],10) * data[i]['candidate'][0]['property'];
                    sum_count +=1;
					count++;
					
            }
        //varietyの指定なし
        }else{
            if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family && data[i]['candidate'][0]['genus'] == genus  && typeof loselist[data[i]['m_kanjo_code']] == "undefined"){
				if(order==1 && family==2 && genus==2 && species==0){
					if(data[i]['candidate'][0]['species']==1){
						continue;
					}
				}
				if(order==1 && family==4 && genus==0 ){
					if(data[i]['candidate'][0]['tabindex']!=4){
						continue;
					}
				}else if(order==1){
					if(data[i]['candidate'][0]['tabindex']==4){
						continue;
					}
				}
				////////////////////合計項目はもう計算しない
				if(CS.itask_list_show_edit_window_pana_is_goukei(data[i],CS.vueObj.kanjo_detail[i])){
					if(species==-2){
						//species==-2場合のに合計項目を使わない
						continue;
					}
					if(exflag){
						goukei_this_year=Math.abs(parseInt(data[i]['amount_this_year'],10));
						goukei_pre_year=Math.abs(parseInt(data[i]['amount_pre_year'],10));
					}else{
						if((data[i]['candidate'][0]['order']==1 && data[i]['candidate'][0]['family'] == 12) || 
							(data[i]['candidate'][0]['order']==1 && data[i]['candidate'][0]['family'] == 7) || 
							(data[i]['candidate'][0]['order']==1 && data[i]['candidate'][0]['family'] == 10)){
							goukei_this_year=parseInt(data[i]['amount_this_year'],10)* data[i]['candidate'][0]['property'];
							goukei_pre_year=parseInt(data[i]['amount_pre_year'],10)* data[i]['candidate'][0]['property'];
						}else{
							goukei_this_year=parseInt(data[i]['amount_this_year'],10);
							goukei_pre_year=parseInt(data[i]['amount_pre_year'],10);
						}
					}
					continue;
				}
				if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
					if(isNaN(sum_amount_pre_year)){
						sum_amount_pre_year=0;
					}
					if(isNaN(data[i]['amount_pre_year'])){
						data[i]['amount_pre_year']=0;
					}
				}
				if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
					if(isNaN(sum_amount_this_year)){
						sum_amount_this_year=0;
					}
					if(isNaN(data[i]['amount_this_year'])){
						data[i]['amount_this_year']=0;
					}
				}
				// if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family && data[i]['candidate'][0]['genus'] == genus && data[i]['candidate'][0]['species'] >= species && data[i]['candidate'][0]['variety'] >= 0){
                sum_count +=1;
               //2回連続していないが合計科目（variety≦0）の金額が>0の場合(合計科目variety<=0)　修正20221214
                if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['variety']<=0){
                    goukei_kingaku_param=0.5
                    goukei_kamoku_flg=1
                }else{
                //普通科目があるか 20221214
                    futsuu_kamoku_flg=1
                }
                if(data[i]['candidate'][0]['property']>=0) {
                    if(exflag){
                        sum_amount_this_year += Math.abs(parseInt(data[i]['amount_this_year'],10))
                        sum_amount_pre_year += Math.abs(parseInt(data[i]['amount_pre_year'],10)) 
						count++;
                    }else{
                        sum_amount_this_year += parseInt(data[i]['amount_this_year'],10)
                        sum_amount_pre_year += parseInt(data[i]['amount_pre_year'],10) 
						count++;
                    }
                }else{
                    //property<0 普通の科目は集計中に負の値に修正するが、合計科目及び損益科目はそのまま集計する
                    if(exflag){
                        sum_amount_this_year -= Math.abs(parseInt(data[i]['amount_this_year'],10))
                        sum_amount_pre_year -= Math.abs(parseInt(data[i]['amount_pre_year'],10)) 
						count++;
                    }else{
                        // 当期仕入に関する例外処理：当期仕入に合計行がある場合、足さずにgoukei_kingaku_param=1.0にする
                        // if(order==1 && family==2 && genus==2 && data[i]['candidate'][0]['variety'] <0){
                            // goukei_kingaku_param=1.0
                        // }else{
                            sum_amount_this_year -= parseInt(data[i]['amount_this_year'],10)
                            sum_amount_pre_year -= parseInt(data[i]['amount_pre_year'],10)
							count++;
                        // }
                    }
                }
            }
        }
    }
	goukei_kingaku_param =1;
    if(count ==1){
        goukei_kingaku_param =1;
    }else if(order==1 && family==2 && genus==3){
        goukei_kingaku_param =1;        
    }
    if(goukei_kamoku_flg ==0 && futsuu_kamoku_flg ==1){
        goukei_kingaku_param =1; //20221214
    }
    sum_amount_this_year =  sum_amount_this_year*goukei_kingaku_param
    sum_amount_pre_year =  sum_amount_pre_year *goukei_kingaku_param
	if(count==0){
		sum_amount_this_year=goukei_this_year;
		sum_amount_pre_year=goukei_pre_year;
	}
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
    return [sum_amount_this_year,sum_amount_pre_year]
}
//個人の数値計算用
CS.itask_list_show_edit_window_pana_calc_eazy = function(numberlist){
	var re="";
	for (var i=0; i< numberlist.length;i++){
		var v=numberlist[i]["value"];
		v=v+"";
		number=parseInt(v.replaceAll(',', ''),10);
		if(numberlist[i]["flag"]=="+"){
			if(!isNaN(number) && v!=""){
				if(re==""){
					re=number;
				}else{
					re=re+number
				}
			}
		}else if(numberlist[i]["flag"]=="-"){
			if(!isNaN(number) && v!=""){
				if(re==""){
					re=0-number;
				}else{
					re=re-number
				}
			}
		}
	}
	if(re!=""){
		return re.toLocaleString();
	}
	return re;
}
//個人の数値計算用
CS.itask_list_show_edit_window_pana_calc_sum5 = function(order,family,genus,species,variety){
    //指定したspeciesのみ集計
	var count=0;
	var data=[];
    let sum_amount_this_year="A" ;let sum_amount_pre_year="A";let goukei_kingaku_param=1;let sum_count =0;let daburi_flg=0;var tmp=0;let futsuu_kamoku_flg=0;let goukei_kamoku_flg=0;//20221214
	var dedlist={};
	var dedlist_p={};
	var dedlist_t={};
	
	////////////////////////////////////////
	var loselist={};
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(typeof CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']] != "undefined"){
			for(var j=0;j<CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']].length;j++){
				//会社コード：10172115会社名：ジャスト電器（有）案件でコメントアウトを取消りしました
				loselist[CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']][j]]=true;
			}
		}
    }
	if(typeof CS.delete_kensan_kanjo_detail_flag=="undefined" || !CS.delete_kensan_kanjo_detail_flag){
		for(var j=0;j<CS.itask_list_show_edit_window_ex_list.length;j++){
			loselist[CS.itask_list_show_edit_window_ex_list[j]]=true;
		}
	}
	////////////////////////////////////
	
	data=[];
	var goukei_this_year=NaN;
	var goukei_pre_year=NaN;
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(i==41 || i==43){
			continue;
		}
		if(typeof dedlist[data[i]['m_kanjo_code']] !="undefined" && dedlist_t[data[i]['m_kanjo_code']].indexOf(data[i]['amount_this_year']) && dedlist_p[data[i]['m_kanjo_code']].indexOf(data[i]['amount_pre_year'])){
			continue;
		}
		if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
			continue;
		}
		dedlist[data[i]['m_kanjo_code']]=true;
		if(typeof dedlist_p[data[i]['m_kanjo_code']]=="undefined"){
			dedlist_p[data[i]['m_kanjo_code']]=[];
		}
		dedlist_p[data[i]['m_kanjo_code']].push(data[i]['amount_pre_year']);
		if(typeof dedlist_t[data[i]['m_kanjo_code']]=="undefined"){
			dedlist_t[data[i]['m_kanjo_code']]=[];
		}
		if(typeof CS.vueObj.kanjo_detail[i]['tabindex'] !="undefined"){
			data[i]['candidate'][0]['tabindex']=parseInt(CS.vueObj.kanjo_detail[i]['tabindex'],10);
		}
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		var exflag=false;
		if(data[i]['candidate'][0]['order'] == 1 && data[i]['candidate'][0]['family'] == 2 && data[i]['candidate'][0]['genus'] == 2 && data[i]['candidate'][0]['species'] == 2){
			exflag=true;
		}
		if(data[i]['candidate'][0]['order'] == 1 && data[i]['candidate'][0]['family'] == 2 && data[i]['candidate'][0]['genus'] == 3){
			exflag=true;
		}
		futsuu_kamoku_flg=0;
        //speciesの指定あり
        if (species>0 || variety==9999){
            if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family && data[i]['candidate'][0]['genus'] == genus &&  data[i]['candidate'][0]['species'] == species && typeof loselist[data[i]['m_kanjo_code']] == "undefined"){
				if(order==1 && family==4 && genus==0 ){
					if(data[i]['candidate'][0]['tabindex']!=4){
						continue;
					}
				}else if(order==1){
					if(data[i]['candidate'][0]['tabindex']!=4 && variety!=9999){
						continue;
					}
				}
				////////////////////合計項目はもう計算しない
				if(CS.itask_list_show_edit_window_pana_is_goukei(data[i],CS.vueObj.kanjo_detail[i])){
					if(species==-2){
						//species==-2場合のに合計項目を使わない
						continue;
					}
					if(exflag){
						goukei_this_year=Math.abs(parseInt(data[i]['amount_this_year'],10));
						goukei_pre_year=Math.abs(parseInt(data[i]['amount_pre_year'],10));
					}else{
						goukei_this_year=parseInt(data[i]['amount_this_year'],10)* data[i]['candidate'][0]['property'];
						goukei_pre_year=parseInt(data[i]['amount_pre_year'],10)* data[i]['candidate'][0]['property'];
					}
					continue;
				}
				if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
					if(isNaN(sum_amount_pre_year)){
						sum_amount_pre_year=0;
					}
					if(isNaN(data[i]['amount_pre_year'])){
						data[i]['amount_pre_year']=0;
					}
				}
				if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
					if(isNaN(sum_amount_this_year)){
						sum_amount_this_year=0;
					}
					if(isNaN(data[i]['amount_this_year'])){
						data[i]['amount_this_year']=0;
					}
				}
                //2回連続していないが合計科目（variety≦0）の金額が>0の場合
                if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['variety']<=0){
                    goukei_kingaku_param=0.5
                }
                // if(data[i]['candidate'][0]['family'] ==1 && data[i]['candidate'][0]['genus'] ==4 && data[i]['candidate'][0]['variety'] ==16){alert(data[i]['amount_this_year'])}
                    sum_amount_this_year+=parseInt(data[i]['amount_this_year'],10) * data[i]['candidate'][0]['property'];
                    sum_amount_pre_year+=parseInt(data[i]['amount_pre_year'],10) * data[i]['candidate'][0]['property'];
                    sum_count +=1;
					count++;
					
            }
        //varietyの指定なし
        }else{
            if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family && typeof loselist[data[i]['m_kanjo_code']] == "undefined"){
				if(order==1 && family==2 && genus==2 && species==0){
					if(data[i]['candidate'][0]['species']==1){
						continue;
					}
				}
				if(order==1 && family==4 && genus==0 ){
					if(data[i]['candidate'][0]['tabindex']!=4){
						continue;
					}
				}else if(order==1){
					if(data[i]['candidate'][0]['tabindex']==4){
						continue;
					}
				}
				////////////////////合計項目はもう計算しない
				if(CS.itask_list_show_edit_window_pana_is_goukei(data[i],CS.vueObj.kanjo_detail[i])){
					if(species==-2){
						//species==-2場合のに合計項目を使わない
						continue;
					}
					if(exflag){
						goukei_this_year=Math.abs(parseInt(data[i]['amount_this_year'],10));
						goukei_pre_year=Math.abs(parseInt(data[i]['amount_pre_year'],10));
					}else{
						goukei_this_year=parseInt(data[i]['amount_this_year'],10)* data[i]['candidate'][0]['property'];
						goukei_pre_year=parseInt(data[i]['amount_pre_year'],10)* data[i]['candidate'][0]['property'];
					}
					continue;
				}
				if(typeof genus != "undefined" && data[i]['candidate'][0]['genus'] != genus){
					continue;
				}
				if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
					if(isNaN(sum_amount_pre_year)){
						sum_amount_pre_year=0;
					}
					if(isNaN(data[i]['amount_pre_year'])){
						data[i]['amount_pre_year']=0;
					}
				}
				if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
					if(isNaN(sum_amount_this_year)){
						sum_amount_this_year=0;
					}
					if(isNaN(data[i]['amount_this_year'])){
						data[i]['amount_this_year']=0;
					}
				}
				// if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family && data[i]['candidate'][0]['genus'] == genus && data[i]['candidate'][0]['species'] >= species && data[i]['candidate'][0]['variety'] >= 0){
                sum_count +=1;
               //2回連続していないが合計科目（variety≦0）の金額が>0の場合(合計科目variety<=0)　修正20221214
                if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['variety']<=0){
                    goukei_kingaku_param=0.5
                    goukei_kamoku_flg=1
                }else{
                //普通科目があるか 20221214
                    futsuu_kamoku_flg=1
                }
                if(data[i]['candidate'][0]['property']>=0) {
                    if(exflag){
                        sum_amount_this_year += Math.abs(parseInt(data[i]['amount_this_year'],10))
                        sum_amount_pre_year += Math.abs(parseInt(data[i]['amount_pre_year'],10)) 
						count++;
                    }else{
                        sum_amount_this_year += parseInt(data[i]['amount_this_year'],10)
                        sum_amount_pre_year += parseInt(data[i]['amount_pre_year'],10) 
						count++;
                    }
                }else{
                    //property<0 普通の科目は集計中に負の値に修正するが、合計科目及び損益科目はそのまま集計する
                    if(exflag){
                        sum_amount_this_year -= Math.abs(parseInt(data[i]['amount_this_year'],10))
                        sum_amount_pre_year -= Math.abs(parseInt(data[i]['amount_pre_year'],10)) 
						count++;
                    }else{
                        // 当期仕入に関する例外処理：当期仕入に合計行がある場合、足さずにgoukei_kingaku_param=1.0にする
                        // if(order==1 && family==2 && genus==2 && data[i]['candidate'][0]['variety'] <0){
                            // goukei_kingaku_param=1.0
                        // }else{
                            sum_amount_this_year -= parseInt(data[i]['amount_this_year'],10)
                            sum_amount_pre_year -= parseInt(data[i]['amount_pre_year'],10)
							count++;
                        // }
                    }
                }
            }
        }
    }
	goukei_kingaku_param =1;
    if(count ==1){
        goukei_kingaku_param =1;
    }else if(order==1 && family==2 && genus==3){
        goukei_kingaku_param =1;        
    }
    if(goukei_kamoku_flg ==0 && futsuu_kamoku_flg ==1){
        goukei_kingaku_param =1; //20221214
    }
    sum_amount_this_year =  sum_amount_this_year*goukei_kingaku_param
    sum_amount_pre_year =  sum_amount_pre_year *goukei_kingaku_param
	if(count==0){
		sum_amount_this_year=goukei_this_year;
		sum_amount_pre_year=goukei_pre_year;
	}
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
    return [sum_amount_this_year,sum_amount_pre_year]
}
//個人の数値計算用
CS.itask_list_show_edit_window_pana_calc_sum6 = function(order,family,genus,species,variety){
    //指定したspeciesのみ集計
	var count=0;
	var data=[];
    let sum_amount_this_year="A" ;let sum_amount_pre_year="A";let goukei_kingaku_param=1;let sum_count =0;let daburi_flg=0;var tmp=0;let futsuu_kamoku_flg=0;let goukei_kamoku_flg=0;//20221214
	var dedlist={};
	var dedlist_p={};
	var dedlist_t={};
	
	////////////////////////////////////////
	var loselist={};
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(typeof CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']] != "undefined"){
			for(var j=0;j<CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']].length;j++){
				//会社コード：10172115会社名：ジャスト電器（有）案件でコメントアウトを取消りしました
				loselist[CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']][j]]=true;
			}
		}
    }
	if(typeof CS.delete_kensan_kanjo_detail_flag=="undefined" || !CS.delete_kensan_kanjo_detail_flag){
		for(var j=0;j<CS.itask_list_show_edit_window_ex_list.length;j++){
			loselist[CS.itask_list_show_edit_window_ex_list[j]]=true;
		}
	}
	////////////////////////////////////
	
	data=[];
	var goukei_this_year=NaN;
	var goukei_pre_year=NaN;
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(typeof dedlist[data[i]['m_kanjo_code']] !="undefined" && dedlist_t[data[i]['m_kanjo_code']].indexOf(data[i]['amount_this_year']) && dedlist_p[data[i]['m_kanjo_code']].indexOf(data[i]['amount_pre_year'])){
			continue;
		}
		if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
			continue;
		}
		dedlist[data[i]['m_kanjo_code']]=true;
		if(typeof dedlist_p[data[i]['m_kanjo_code']]=="undefined"){
			dedlist_p[data[i]['m_kanjo_code']]=[];
		}
		dedlist_p[data[i]['m_kanjo_code']].push(data[i]['amount_pre_year']);
		if(typeof dedlist_t[data[i]['m_kanjo_code']]=="undefined"){
			dedlist_t[data[i]['m_kanjo_code']]=[];
		}
		if(typeof CS.vueObj.kanjo_detail[i]['tabindex'] !="undefined"){
			data[i]['candidate'][0]['tabindex']=parseInt(CS.vueObj.kanjo_detail[i]['tabindex'],10);
		}
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		var exflag=false;
		if(data[i]['candidate'][0]['order'] == 1 && data[i]['candidate'][0]['family'] == 2 && data[i]['candidate'][0]['genus'] == 2 && data[i]['candidate'][0]['species'] == 2){
			exflag=true;
		}
		if(data[i]['candidate'][0]['order'] == 1 && data[i]['candidate'][0]['family'] == 2 && data[i]['candidate'][0]['genus'] == 3){
			exflag=true;
		}
		futsuu_kamoku_flg=0;
        //speciesの指定あり
        if (species>0 || variety==9999){
            if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family && data[i]['candidate'][0]['genus'] == genus &&  data[i]['candidate'][0]['species'] == species && typeof loselist[data[i]['m_kanjo_code']] == "undefined"){
				if(order==1 && family==4 && genus==0 ){
					if(data[i]['candidate'][0]['tabindex']!=4){
						continue;
					}
				}else if(order==1){
					if(data[i]['candidate'][0]['tabindex']!=4 && variety!=9999){
						continue;
					}
				}
				////////////////////合計項目はもう計算しない
				if(CS.itask_list_show_edit_window_pana_is_goukei(data[i],CS.vueObj.kanjo_detail[i])){
					if(species==-2){
						//species==-2場合のに合計項目を使わない
						continue;
					}
					if(exflag){
						goukei_this_year=Math.abs(parseInt(data[i]['amount_this_year'],10));
						goukei_pre_year=Math.abs(parseInt(data[i]['amount_pre_year'],10));
					}else{
						goukei_this_year=parseInt(data[i]['amount_this_year'],10)* data[i]['candidate'][0]['property'];
						goukei_pre_year=parseInt(data[i]['amount_pre_year'],10)* data[i]['candidate'][0]['property'];
					}
					continue;
				}
				if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
					if(isNaN(sum_amount_pre_year)){
						sum_amount_pre_year=0;
					}
					if(isNaN(data[i]['amount_pre_year'])){
						data[i]['amount_pre_year']=0;
					}
				}
				if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
					if(isNaN(sum_amount_this_year)){
						sum_amount_this_year=0;
					}
					if(isNaN(data[i]['amount_this_year'])){
						data[i]['amount_this_year']=0;
					}
				}
                //2回連続していないが合計科目（variety≦0）の金額が>0の場合
                if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['variety']<=0){
                    goukei_kingaku_param=0.5
                }
                // if(data[i]['candidate'][0]['family'] ==1 && data[i]['candidate'][0]['genus'] ==4 && data[i]['candidate'][0]['variety'] ==16){alert(data[i]['amount_this_year'])}
                    sum_amount_this_year+=parseInt(data[i]['amount_this_year'],10) * data[i]['candidate'][0]['property'];
                    sum_amount_pre_year+=parseInt(data[i]['amount_pre_year'],10) * data[i]['candidate'][0]['property'];
                    sum_count +=1;
					count++;
					
            }
        //varietyの指定なし
        }else{
            if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family && typeof loselist[data[i]['m_kanjo_code']] == "undefined"){
				if(order==1 && family==2 && genus==2 && species==0){
					if(data[i]['candidate'][0]['species']==1){
						continue;
					}
				}
				if(order==1 && family==4 && genus==0 ){
					if(data[i]['candidate'][0]['tabindex']!=4){
						continue;
					}
				}else if(order==1){
					if(data[i]['candidate'][0]['tabindex']==4){
						continue;
					}
				}
				////////////////////合計項目はもう計算しない
				if(CS.itask_list_show_edit_window_pana_is_goukei(data[i],CS.vueObj.kanjo_detail[i])){
					if(species==-2){
						//species==-2場合のに合計項目を使わない
						continue;
					}
					if(exflag){
						goukei_this_year=Math.abs(parseInt(data[i]['amount_this_year'],10));
						goukei_pre_year=Math.abs(parseInt(data[i]['amount_pre_year'],10));
					}else{
						goukei_this_year=parseInt(data[i]['amount_this_year'],10)* data[i]['candidate'][0]['property'];
						goukei_pre_year=parseInt(data[i]['amount_pre_year'],10)* data[i]['candidate'][0]['property'];
					}
					continue;
				}
				if(typeof genus != "undefined" && data[i]['candidate'][0]['genus'] != genus){
					continue;
				}
				if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
					if(isNaN(sum_amount_pre_year)){
						sum_amount_pre_year=0;
					}
					if(isNaN(data[i]['amount_pre_year'])){
						data[i]['amount_pre_year']=0;
					}
				}
				if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
					if(isNaN(sum_amount_this_year)){
						sum_amount_this_year=0;
					}
					if(isNaN(data[i]['amount_this_year'])){
						data[i]['amount_this_year']=0;
					}
				}
				// if (data[i]['candidate'][0]['order'] == order && data[i]['candidate'][0]['family'] == family && data[i]['candidate'][0]['genus'] == genus && data[i]['candidate'][0]['species'] >= species && data[i]['candidate'][0]['variety'] >= 0){
                sum_count +=1;
               //2回連続していないが合計科目（variety≦0）の金額が>0の場合(合計科目variety<=0)　修正20221214
                if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['variety']<=0){
                    goukei_kingaku_param=0.5
                    goukei_kamoku_flg=1
                }else{
                //普通科目があるか 20221214
                    futsuu_kamoku_flg=1
                }
                if(data[i]['candidate'][0]['property']>=0) {
                    if(exflag){
                        sum_amount_this_year += Math.abs(parseInt(data[i]['amount_this_year'],10))
                        sum_amount_pre_year += Math.abs(parseInt(data[i]['amount_pre_year'],10)) 
						count++;
                    }else{
                        sum_amount_this_year += parseInt(data[i]['amount_this_year'],10)
                        sum_amount_pre_year += parseInt(data[i]['amount_pre_year'],10) 
						count++;
                    }
                }else{
                    //property<0 普通の科目は集計中に負の値に修正するが、合計科目及び損益科目はそのまま集計する
                    if(exflag){
                        sum_amount_this_year -= Math.abs(parseInt(data[i]['amount_this_year'],10))
                        sum_amount_pre_year -= Math.abs(parseInt(data[i]['amount_pre_year'],10)) 
						count++;
                    }else{
                        // 当期仕入に関する例外処理：当期仕入に合計行がある場合、足さずにgoukei_kingaku_param=1.0にする
                        // if(order==1 && family==2 && genus==2 && data[i]['candidate'][0]['variety'] <0){
                            // goukei_kingaku_param=1.0
                        // }else{
                            sum_amount_this_year -= parseInt(data[i]['amount_this_year'],10)
                            sum_amount_pre_year -= parseInt(data[i]['amount_pre_year'],10)
							count++;
                        // }
                    }
                }
            }
        }
    }
	goukei_kingaku_param =1;
    if(count ==1){
        goukei_kingaku_param =1;
    }else if(order==1 && family==2 && genus==3){
        goukei_kingaku_param =1;        
    }
    if(goukei_kamoku_flg ==0 && futsuu_kamoku_flg ==1){
        goukei_kingaku_param =1; //20221214
    }
    sum_amount_this_year =  sum_amount_this_year*goukei_kingaku_param
    sum_amount_pre_year =  sum_amount_pre_year *goukei_kingaku_param
	if(count==0){
		return ["",""];
	}
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
    return [sum_amount_this_year,sum_amount_pre_year];
}
//その他利益剰余金が存在>0するか判定
function sonota_rieki_jyouyokin_exist(){
    var sonota_rieki_jyouyokin_flg =0
	var data=[];
    for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
			continue;
		}
        // if(data[i]['candidate'][0]['order'] ==2 && data[i]['candidate'][0]['family'] ==7 && data[i]['candidate'][0]['genus'] ==3 && data[i]['candidate'][0]['variety'] <=0 && data[i]['amount_this_year']>0){　
        //20221214
        if(data[i]['candidate'][0]['order'] ==2 && data[i]['candidate'][0]['family'] ==70 && data[i]['candidate'][0]['genus'] ==3 && data[i]['candidate'][0]['species'] == 2　&& data[i]['candidate'][0]['variety'] <= 0 && Math.abs(parseInt(data[i]['amount_this_year'],10))>0){
            sonota_rieki_jyouyokin_flg =1;
        }
    }
    return sonota_rieki_jyouyokin_flg;
}

//その他利益剰余金の計算
function sonota_rieki_jyouyokin(){
    let sum_amount_this_year=0 ;let sum_amount_pre_year=0;
	var data=[];
	////////////////////////////////////////
	var loselist={};
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		if(typeof CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']] != "undefined"){
			for(var j=0;j<CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']].length;j++){
				loselist[CS.itask_list_show_edit_window_ex_map[data[i]['m_kanjo_code']][j]]=true;
			}
		}
    }
	if(typeof CS.delete_kensan_kanjo_detail_flag=="undefined" || !CS.delete_kensan_kanjo_detail_flag){
		for(var j=0;j<CS.itask_list_show_edit_window_ex_list.length;j++){
			loselist[CS.itask_list_show_edit_window_ex_list[j]]=true;
		}
	}
	////////////////////////////////////
	data=[];
	var sum_count=0;
	var goukei_kingaku_param=1;
	var goukei_this_year=NaN;
	var goukei_pre_year=NaN;
    for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		////////////////////合計項目はもう計算しない
		if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
			continue;
		}
        //if(data[i]['candidate'][0]['order'] ==2 && data[i]['candidate'][0]['family'] ==7 && data[i]['candidate'][0]['genus'] ==3 && data[i]['candidate'][0]['species'] == 2 ){
		if(data[i]['candidate'][0]['order'] ==2 && data[i]['candidate'][0]['family'] ==70 && data[i]['candidate'][0]['genus'] ==3 && data[i]['candidate'][0]['species'] == 2 && data[i]['candidate'][0]['variety'] != 5 && typeof loselist[data[i]['m_kanjo_code']] == "undefined"){
			if(CS.itask_list_show_edit_window_pana_is_goukei(data[i],CS.vueObj.kanjo_detail[i])){
				goukei_this_year=parseInt(data[i]['amount_this_year'],10);
				goukei_pre_year=parseInt(data[i]['amount_pre_year'],10);
				continue;
			}
			//2回連続していないが合計科目（variety≦0）の金額が>0の場合(合計科目variety<=0)　修正20221214
			if((data[i]['amount_this_year']!=0 || data[i]['amount_pre_year']!=0) && data[i]['candidate'][0]['variety']<=0){
				goukei_kingaku_param=0.5
			}
			if(!isNaN(data[i]['amount_this_year']) || !isNaN(data[i]['amount_pre_year'])){
				sum_count++;
			}
			if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
				if(isNaN(sum_amount_pre_year)){
					sum_amount_pre_year=0;
				}
				if(isNaN(data[i]['amount_pre_year'])){
					data[i]['amount_pre_year']=0;
				}
			}
			if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
				if(isNaN(sum_amount_this_year)){
					sum_amount_this_year=0;
				}
				if(isNaN(data[i]['amount_this_year'])){
					data[i]['amount_this_year']=0;
				}
			}
			
            sum_amount_this_year += parseInt(data[i]['amount_this_year'],10);
            sum_amount_pre_year += parseInt(data[i]['amount_pre_year'],10);
			
        }
    }
	if(sum_count ==1){
        goukei_kingaku_param =1;
    }
    //その他利益剰余金に金額がない場合
    if(sum_count >=1){
        var sonota_rieki_jouyokin_this_year=sum_amount_this_year*goukei_kingaku_param;
        var sonota_rieki_jouyokin_pre_year=sum_amount_pre_year*goukei_kingaku_param;
    }
	if(isNaN(sonota_rieki_jouyokin_this_year)){
		sonota_rieki_jouyokin_this_year=goukei_this_year;
	}
	if(isNaN(sonota_rieki_jouyokin_this_year)){
		sonota_rieki_jouyokin_this_year="";
	}
	if(isNaN(sonota_rieki_jouyokin_pre_year)){
		sonota_rieki_jouyokin_pre_year=goukei_pre_year;
	}
	if(isNaN(sonota_rieki_jouyokin_pre_year)){
		sonota_rieki_jouyokin_pre_year="";
	}
    return [sonota_rieki_jouyokin_this_year,sonota_rieki_jouyokin_pre_year]
}
CS.itask_list_show_edit_window_csv = function(){
	var itask_show_item=["order","order_name","family","family_name","genus","ginus_name","species","species_name","variety","variety_name","property","this_year_amount","pre_year_amount","sum_flg"];
	var csv_obj=[];
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		if(CS.vueObj.kanjo_detail[i]["variety_name"]=="青色申告特別控除額"){
			continue;
		}
		var csv_obj_temp={};
		for(var j=0;j<itask_show_item.length;j++){
			var name=itask_show_item[j];
			if(j==0){
				var value="";
				if(typeof CS.vueObj.kanjo_detail[i]["order"] != "undefined"){
					var value=CS.vueObj.kanjo_detail[i]["order"];
				}
			}
			if(j==1){
				var value="";
				if(typeof CS.vueObj.kanjo_detail[i]["order"] != "undefined"){
					if(CS.vueObj.kanjo_detail[i].order==2 && parseInt(CS.vueObj.kanjo_detail[i].family,10)<40){
						var value="借方（総資産）";
					}
					if(CS.vueObj.kanjo_detail[i].order==2 && parseInt(CS.vueObj.kanjo_detail[i].family,10)>=40){
						var value="貸方（総資本）";
					}
					if(CS.vueObj.kanjo_detail[i].order==1 && parseInt(CS.vueObj.kanjo_detail[i].family,10)!=4){
						var value="損益計算書";
					}
					if(CS.vueObj.kanjo_detail[i].order==1 && CS.vueObj.kanjo_detail[i].family==4){
						var value="販管費";
					}
				}
			}
			if(j==2){
				var value="";
				if(typeof CS.vueObj.kanjo_detail[i]["family"] != "undefined"){
					var value=CS.vueObj.kanjo_detail[i]["family"];
				}
			}
			if(j==3){
				var value="";
				if(typeof CS.vueObj.kanjo_detail[i]["family_name"] != "undefined"){
					var value=CS.vueObj.kanjo_detail[i]["family_name"];
				}
			}
			if(j==4){
				var value="";
				if(typeof CS.vueObj.kanjo_detail[i]["genus"] != "undefined"){
					var value=CS.vueObj.kanjo_detail[i]["genus"];
				}
			}
			if(j==5){
				var value="";
				if(typeof CS.vueObj.kanjo_detail[i]["genus_name"] != "undefined"){
					var value=CS.vueObj.kanjo_detail[i]["genus_name"];
				}
			}
			if(j==6){
				var value="";
				if(typeof CS.vueObj.kanjo_detail[i]["species"] != "undefined"){
					var value=CS.vueObj.kanjo_detail[i]["species"];
				}
			}
			if(j==7){
				var value="";
				if(typeof CS.vueObj.kanjo_detail[i]["species_name"] != "undefined"){
					var value=CS.vueObj.kanjo_detail[i]["species_name"];
				}
			}
			if(j==8){
				var value="";
				if(typeof CS.vueObj.kanjo_detail[i]["variety"] != "undefined"){
					var value=CS.vueObj.kanjo_detail[i]["variety"];
				}
			}
			if(j==9){
				var value="";
				if(typeof CS.vueObj.kanjo_detail[i]["variety_name"] != "undefined"){
					var value=CS.vueObj.kanjo_detail[i]["variety_name"];
				}
			}

			if(j==10){
				var value="";
				if(typeof CS.vueObj.kanjo_detail[i]["property"] != "undefined"){
					var value=CS.vueObj.kanjo_detail[i]["property"];
				}
			}
			if(j==11){
				var value="";
				if(typeof CS.vueObj.kanjo_detail[i]["amount_this_year"] != "undefined"){
					var addplusflag=false;
					if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>6 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,6)=="1_2_3_"){
						addplusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>6 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,6)=="1_2_6_"){
						addplusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>6 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,6)=="1_2_2_"){
						addplusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>6 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,6)=="1_1_4_"){
						addplusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>9 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,9)=="2_10_4_8_"){
						addplusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>9 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,9)=="2_20_3_4_"){
						addplusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>9 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,9)=="2_20_3_4_"){
						addplusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>10 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,10)=="2_50_0_10_"){
						addplusflag=true;
					}
					//　貸倒引当金（2 1 4 8 0)と(2 2 3 4 0)の２つと　減価償却累計額（2 2 1 7 0)と（2 2 1 7 1)
					//マイナス表示
					var addmanusflag=false;
					if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=="2_1_4_8_0"){
						addmanusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=="2_2_3_4_0"){
						addmanusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=="2_2_1_7_0"){
						addmanusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=="2_2_1_7_1"){
						addmanusflag=true;
					}
					var value=CS.vueObj.kanjo_detail[i]["amount_this_year"];
					if(addmanusflag){
						if(CS.vueObj.kanjo_detail[i]["amount_this_year"]!="" && CS.vueObj.kanjo_detail[i]["amount_this_year"]!=null){
							value="-"+Math.abs(parseInt(CS.vueObj.kanjo_detail[i]["amount_this_year"].replaceAll(',', ''),10)).toLocaleString();
						}
					}else if(addplusflag){
						if(CS.vueObj.kanjo_detail[i]["amount_this_year"]!="" && CS.vueObj.kanjo_detail[i]["amount_this_year"]!=null){
							value=Math.abs(parseInt(CS.vueObj.kanjo_detail[i]["amount_this_year"].replaceAll(',', ''),10)).toLocaleString();
						}
					}
				}
			}
			if(j==12){
				var value="";
				if(typeof CS.vueObj.kanjo_detail[i]["amount_pre_year"] != "undefined"){
					var addplusflag=false;
					if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>6 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,6)=="1_2_3_"){
						addplusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>6 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,6)=="1_2_6_"){
						addplusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>6 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,6)=="1_2_2_"){
						addplusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>6 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,6)=="1_1_4_"){
						addplusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>9 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,9)=="2_10_4_8_"){
						addplusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>9 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,9)=="2_20_3_4_"){
						addplusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>9 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,9)=="2_20_3_4_"){
						addplusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>10 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,10)=="2_50_0_10_"){
						addplusflag=true;
					}
					//　貸倒引当金（2 1 4 8 0)と(2 2 3 4 0)の２つと　減価償却累計額（2 2 1 7 0)と（2 2 1 7 1)
					//マイナス表示
					var addmanusflag=false;
					if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=="2_1_4_8_0"){
						addmanusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=="2_2_3_4_0"){
						addmanusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=="2_2_1_7_0"){
						addmanusflag=true;
					}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=="2_2_1_7_1"){
						addmanusflag=true;
					}
					var value=CS.vueObj.kanjo_detail[i]["amount_pre_year"];
					if(addmanusflag){
						if(CS.vueObj.kanjo_detail[i]["amount_pre_year"]!="" && CS.vueObj.kanjo_detail[i]["amount_pre_year"]!=null){
							value="-"+Math.abs(parseInt(CS.vueObj.kanjo_detail[i]["amount_pre_year"].replaceAll(',', ''),10)).toLocaleString();
						}
					}else if(addplusflag){
						if(CS.vueObj.kanjo_detail[i]["amount_pre_year"]!="" && CS.vueObj.kanjo_detail[i]["amount_pre_year"]!=null){
							value=Math.abs(parseInt(CS.vueObj.kanjo_detail[i]["amount_pre_year"].replaceAll(',', ''),10)).toLocaleString();
						}
					}
				}
			}
			if(j==13){
				var value="";
				if(CS.vueObj.kanjo_detail[i]["koteiitemflag"]==true){
					value="0";
				}else{
					value="1";
				}
			}
			csv_obj_temp[name]=value;
		}
		csv_obj.push(csv_obj_temp);
	}

	var content = jQuery.csv.fromObjects(csv_obj);
	
	var afterstr="main_data,\n";
	afterstr+="company_code,店コード,\""+CS.vueObj.i_aitask_top_info["company_company_code"]+"\"\n";
	afterstr+="company_name,正式店名,\""+CS.vueObj.i_aitask_top_info["m1"]+"\"\n";
	afterstr+="closing_date,決算期,\""+CS.vueObj.i_aitask_top_info["closing_date_date"]+"\"\n";
	afterstr+="headquarters,本部名,\""+CS.vueObj.i_aitask_top_info["m2"]+"\"\n";
	afterstr+="branch,支社名,\""+CS.vueObj.i_aitask_top_info["m3"]+"\"\n";
	afterstr+="sales_office,営業拠点名,\""+CS.vueObj.i_aitask_top_info["m4"]+"\"\n";
	afterstr+="division,部名,\""+CS.vueObj.i_aitask_top_info["m5"]+"\"\n";
	afterstr+="section,課名,\""+CS.vueObj.i_aitask_top_info["m6"]+"\"\n";
	afterstr+="sales_person,セールス名,\""+CS.vueObj.i_aitask_top_info["m7"]+"\"\n";
	afterstr+="credit_limit,与信限度額,\""+CS.vueObj.i_aitask_top_info["m8"]+"\"\n\nditail\n";
	content=afterstr+content;
	
	var str_array = Encoding.stringToCode(content);
	var sjis_array = Encoding.convert(str_array, "SJIS", "UNICODE");
	var uint8_array = new Uint8Array(sjis_array);
	filename="zaiTask詳細情報.csv";
	if(CS.vueObj.itask_list_show_edit_aitask_name.length>4){
		csvFilename = CS.vueObj.itask_list_show_edit_aitask_name.substring(0, CS.vueObj.itask_list_show_edit_aitask_name.length-4)+".csv";
	}else{
		csvFilename = "zaiTask詳細情報.csv";
	}
	var blob = new Blob([ uint8_array ], { "type" : "text/csv" })
	jQuery("<a></a>", {href: window.URL.createObjectURL(blob),
	download: csvFilename,
	target: "_blank"})[0].click();
}



CS.itask_list_show_edit_window_csv_fromlist = function(index){
	CS.vueObj.itask_list_show_edit_aitask_name=CS.vueObj.itask_list_show_file_list_now[index].file_tree_name;
	var obj = {};
	//請求書一覧を出す
	obj["itask_id"] = CS.vueObj.itask_list_show_file_list_now[index].itask_id;
	obj["action"] = "itask_list_show_edit_window_csv_fromlist";
	obj["type"] = CS.vueObj.itask_show_type;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.vueObj.kanjo_detail=data["kanjo_detail"];
			CS.vueObj.i_aitask_top_info=data["i_aitask_top_info"];
			CS.vueObj.itask_list_show_edit_window_itask_type=data["i_aitask_top_info"]["type"];
			CS.vueObj.itask_list_show_edit_pana_company_code=CS.vueObj.i_aitask_top_info["company_company_code"];
			CS.vueObj.itask_list_show_edit_pana_company_name=CS.vueObj.i_aitask_top_info["m1"];
			CS.i_aitask_top_info_company_candidate= JSON.parse(CS.vueObj.i_aitask_top_info["company_candidate"]);
			CS.vueObj.itask_list_show_edit_pana_status=CS.vueObj.i_aitask_top_info["status"];
			CS.vueObj.itask_list_show_edit_pana_kesan_date=CS.vueObj.i_aitask_top_info["closing_date_date"];
			CS.vueObj.candidate_select_list=data["candidate_select_list"];
			//if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
			//	CS.itask_list_show_edit_pana_resort_kanjo_detail();
			//}
			// CS.itask_list_show_edit_window_kensan(2);
			// CS.itask_list_show_edit_window_kensan(3);
			
			
	
	
			var itask_show_item=["order","order_name","family","family_name","genus","ginus_name","species","species_name","variety","variety_name","property","this_year_amount","pre_year_amount","sum_flg"];
			var csv_obj=[];
			for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
				if(CS.vueObj.kanjo_detail[i]["variety_name"]=="青色申告特別控除額"){
					continue;
				}
				var csv_obj_temp={};
				for(var j=0;j<itask_show_item.length;j++){
					var name=itask_show_item[j];
					if(j==0){
						var value="";
						if(typeof CS.vueObj.kanjo_detail[i]["order"] != "undefined"){
							var value=CS.vueObj.kanjo_detail[i]["order"];
						}
					}
					if(j==1){
						var value="";
						if(typeof CS.vueObj.kanjo_detail[i]["order"] != "undefined"){
							if(CS.vueObj.kanjo_detail[i].order==2 && parseInt(CS.vueObj.kanjo_detail[i].family,10)<40){
								var value="借方（総資産）";
							}
							if(CS.vueObj.kanjo_detail[i].order==2 && parseInt(CS.vueObj.kanjo_detail[i].family,10)>=40){
								var value="貸方（総資本）";
							}
							if(CS.vueObj.kanjo_detail[i].order==1 && parseInt(CS.vueObj.kanjo_detail[i].family,10)!=4){
								var value="損益計算書";
							}
							if(CS.vueObj.kanjo_detail[i].order==1 && CS.vueObj.kanjo_detail[i].family==4){
								var value="販管費";
							}
						}
					}
					if(j==2){
						var value="";
						if(typeof CS.vueObj.kanjo_detail[i]["family"] != "undefined"){
							var value=CS.vueObj.kanjo_detail[i]["family"];
						}
					}
					if(j==3){
						var value="";
						if(typeof CS.vueObj.kanjo_detail[i]["family_name"] != "undefined"){
							var value=CS.vueObj.kanjo_detail[i]["family_name"];
						}
					}
					if(j==4){
						var value="";
						if(typeof CS.vueObj.kanjo_detail[i]["genus"] != "undefined"){
							var value=CS.vueObj.kanjo_detail[i]["genus"];
						}
					}
					if(j==5){
						var value="";
						if(typeof CS.vueObj.kanjo_detail[i]["genus_name"] != "undefined"){
							var value=CS.vueObj.kanjo_detail[i]["genus_name"];
						}
					}
					if(j==6){
						var value="";
						if(typeof CS.vueObj.kanjo_detail[i]["species"] != "undefined"){
							var value=CS.vueObj.kanjo_detail[i]["species"];
						}
					}
					if(j==7){
						var value="";
						if(typeof CS.vueObj.kanjo_detail[i]["species_name"] != "undefined"){
							var value=CS.vueObj.kanjo_detail[i]["species_name"];
						}
					}
					if(j==8){
						var value="";
						if(typeof CS.vueObj.kanjo_detail[i]["variety"] != "undefined"){
							var value=CS.vueObj.kanjo_detail[i]["variety"];
						}
					}
					if(j==9){
						var value="";
						if(typeof CS.vueObj.kanjo_detail[i]["variety_name"] != "undefined"){
							var value=CS.vueObj.kanjo_detail[i]["variety_name"];
						}
					}

					if(j==10){
						var value="";
						if(typeof CS.vueObj.kanjo_detail[i]["property"] != "undefined"){
							var value=CS.vueObj.kanjo_detail[i]["property"];
						}
					}
					if(j==11){
						var value="";
						if(typeof CS.vueObj.kanjo_detail[i]["amount_this_year"] != "undefined"){
							var addplusflag=false;
							if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>6 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,6)=="1_2_3_"){
								addplusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>6 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,6)=="1_2_6_"){
								addplusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>6 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,6)=="1_2_2_"){
								addplusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>6 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,6)=="1_1_4_"){
								addplusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>9 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,9)=="2_10_4_8_"){
								addplusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>9 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,9)=="2_20_3_4_"){
								addplusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>9 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,9)=="2_20_3_4_"){
								addplusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>10 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,10)=="2_50_0_10_"){
								addplusflag=true;
							}
							//　貸倒引当金（2 1 4 8 0)と(2 2 3 4 0)の２つと　減価償却累計額（2 2 1 7 0)と（2 2 1 7 1)
							//マイナス表示
							var addmanusflag=false;
							if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=="2_1_4_8_0"){
								addmanusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=="2_2_3_4_0"){
								addmanusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=="2_2_1_7_0"){
								addmanusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=="2_2_1_7_1"){
								addmanusflag=true;
							}
							var value=CS.vueObj.kanjo_detail[i]["amount_this_year"];
							if(addmanusflag){
								if(CS.vueObj.kanjo_detail[i]["amount_this_year"]!="" && CS.vueObj.kanjo_detail[i]["amount_this_year"]!=null){
									value="-"+Math.abs(parseInt(CS.vueObj.kanjo_detail[i]["amount_this_year"].replaceAll(',', ''),10)).toLocaleString();
								}
							}else if(addplusflag){
								if(CS.vueObj.kanjo_detail[i]["amount_this_year"]!="" && CS.vueObj.kanjo_detail[i]["amount_this_year"]!=null){
									value=Math.abs(parseInt(CS.vueObj.kanjo_detail[i]["amount_this_year"].replaceAll(',', ''),10)).toLocaleString();
								}
							}
						}
					}
					if(j==12){
						var value="";
						if(typeof CS.vueObj.kanjo_detail[i]["amount_pre_year"] != "undefined"){
							var addplusflag=false;
							if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>6 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,6)=="1_2_3_"){
								addplusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>6 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,6)=="1_2_6_"){
								addplusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>6 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,6)=="1_2_2_"){
								addplusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>6 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,6)=="1_1_4_"){
								addplusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>9 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,9)=="2_10_4_8_"){
								addplusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>9 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,9)=="2_20_3_4_"){
								addplusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>9 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,9)=="2_20_3_4_"){
								addplusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"].length>10 && CS.vueObj.kanjo_detail[i]["m_kanjo_id"].substr(0,10)=="2_50_0_10_"){
								addplusflag=true;
							}
							//　貸倒引当金（2 1 4 8 0)と(2 2 3 4 0)の２つと　減価償却累計額（2 2 1 7 0)と（2 2 1 7 1)
							//マイナス表示
							var addmanusflag=false;
							if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=="2_1_4_8_0"){
								addmanusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=="2_2_3_4_0"){
								addmanusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=="2_2_1_7_0"){
								addmanusflag=true;
							}else if(CS.vueObj.kanjo_detail[i]["m_kanjo_id"]=="2_2_1_7_1"){
								addmanusflag=true;
							}
							var value=CS.vueObj.kanjo_detail[i]["amount_pre_year"];
							if(addmanusflag){
								if(CS.vueObj.kanjo_detail[i]["amount_pre_year"]!="" && CS.vueObj.kanjo_detail[i]["amount_pre_year"]!=null){
									value="-"+Math.abs(parseInt(CS.vueObj.kanjo_detail[i]["amount_pre_year"].replaceAll(',', ''),10)).toLocaleString();
								}
							}else if(addplusflag){
								if(CS.vueObj.kanjo_detail[i]["amount_pre_year"]!="" && CS.vueObj.kanjo_detail[i]["amount_pre_year"]!=null){
									value=Math.abs(parseInt(CS.vueObj.kanjo_detail[i]["amount_pre_year"].replaceAll(',', ''),10)).toLocaleString();
								}
							}
						}
					}
					if(j==13){
						var value="";
						if(CS.vueObj.kanjo_detail[i]["koteiitemflag"]==true){
							value="0";
						}else{
							value="1";
						}
					}
					csv_obj_temp[name]=value;
				}
				csv_obj.push(csv_obj_temp);
			}

			var content = jQuery.csv.fromObjects(csv_obj);
			
			var afterstr="main_data,\n";
			afterstr+="company_code,店コード,\""+CS.vueObj.i_aitask_top_info["company_company_code"]+"\"\n";
			afterstr+="company_name,正式店名,\""+CS.vueObj.i_aitask_top_info["m1"]+"\"\n";
			afterstr+="closing_date,決算期,\""+CS.vueObj.i_aitask_top_info["closing_date_date"]+"\"\n";
			afterstr+="headquarters,本部名,\""+CS.vueObj.i_aitask_top_info["m2"]+"\"\n";
			afterstr+="branch,支社名,\""+CS.vueObj.i_aitask_top_info["m3"]+"\"\n";
			afterstr+="sales_office,営業拠点名,\""+CS.vueObj.i_aitask_top_info["m4"]+"\"\n";
			afterstr+="division,部名,\""+CS.vueObj.i_aitask_top_info["m5"]+"\"\n";
			afterstr+="section,課名,\""+CS.vueObj.i_aitask_top_info["m6"]+"\"\n";
			afterstr+="sales_person,セールス名,\""+CS.vueObj.i_aitask_top_info["m7"]+"\"\n";
			afterstr+="credit_limit,与信限度額,\""+CS.vueObj.i_aitask_top_info["m8"]+"\"\n\nditail\n";
			content=afterstr+content;
			
			var str_array = Encoding.stringToCode(content);
			var sjis_array = Encoding.convert(str_array, "SJIS", "UNICODE");
			var uint8_array = new Uint8Array(sjis_array);
			filename="zaiTask詳細情報.csv";
			if(CS.vueObj.itask_list_show_edit_aitask_name.length>4){
				csvFilename = CS.vueObj.itask_list_show_edit_aitask_name.substring(0, CS.vueObj.itask_list_show_edit_aitask_name.length-4)+".csv";
			}else{
				csvFilename = "zaiTask詳細情報.csv";
			}
			var blob = new Blob([ uint8_array ], { "type" : "text/csv" })
			jQuery("<a></a>", {href: window.URL.createObjectURL(blob),
			download: csvFilename,
			target: "_blank"})[0].click();
			
			
			
		}
	});
	return;

}
CS.itask_list_show_edit_window_get_kanjyo_csv = function(){
	var vlist=CS.kanri_itask_kanjo_show_main_search_variety_list_getcsv;
	var itask_show_item=["order","order_name","family","family_name","genus","ginus_name","species","species_name","variety","variety_name","property","this_year_amount","pre_year_amount"];
	var csv_obj=[];
	for(var i=0;i<vlist.length;i++){
		var csv_obj_temp={};
		for(var j=0;j<10;j++){
			var name=itask_show_item[j];
			if(j==0){
				var value="";
				if(typeof vlist[i]["order"] != "undefined"){
					var value=vlist[i]["order"];
				}
			}
			if(j==1){
				var value="";
				if(typeof vlist[i]["order"] != "undefined"){
					if(vlist[i].order==2 && parseInt(vlist[i].family,10)<40){
						var value="借方（総資産）";
					}
					if(vlist[i].order==2 && parseInt(vlist[i].family,10)>=40){
						var value="貸方（総資本）";
					}
					if(vlist[i].order==1 && parseInt(vlist[i].family,10)!=4){
						var value="損益計算書";
					}
					if(vlist[i].order==1 && vlist[i].family==4){
						var value="販管費";
					}
				}
			}
			if(j==2){
				var value="";
				if(typeof vlist[i]["family_code"] != "undefined"){
					var value=vlist[i]["family_code"];
				}
			}
			if(j==3){
				var value="";
				if(typeof vlist[i]["family"] != "undefined"){
					var value=vlist[i]["family"];
				}
			}
			if(j==4){
				var value="";
				if(typeof vlist[i]["genus_code"] != "undefined"){
					var value=vlist[i]["genus_code"];
				}
			}
			if(j==5){
				var value="";
				if(typeof vlist[i]["genus"] != "undefined"){
					var value=vlist[i]["genus"];
				}
			}
			if(j==6){
				var value="";
				if(typeof vlist[i]["species_code"] != "undefined"){
					var value=vlist[i]["species_code"];
				}
			}
			if(j==7){
				var value="";
				if(typeof vlist[i]["species"] != "undefined"){
					var value=vlist[i]["species"];
				}
			}
			if(j==8){
				var value="";
				if(typeof vlist[i]["variety_code"] != "undefined"){
					var value=vlist[i]["variety_code"];
				}
			}
			if(j==9){
				var value="";
				if(typeof vlist[i]["variety"] != "undefined"){
					var value=vlist[i]["variety"];
				}
			}

			csv_obj_temp[name]=value;
		}
		csv_obj.push(csv_obj_temp);
	}

	var content = jQuery.csv.fromObjects(csv_obj);
	
	var afterstr="";
	afterstr+="オーダー,オーダーコード,";
	afterstr+="大分類,大分類コード,";
	afterstr+="中分類,中分類コード,";
	afterstr+="小分類,小分類コード,";
	afterstr+="勘定科目,勘定科目コード\n";
	content=afterstr+content;
	
	var str_array = Encoding.stringToCode(content);
	var sjis_array = Encoding.convert(str_array, "SJIS", "UNICODE");
	var uint8_array = new Uint8Array(sjis_array);
		
	var blob = new Blob([ uint8_array ], { "type" : "text/csv" })
	jQuery("<a></a>", {href: window.URL.createObjectURL(blob),
	download: "勘定科目マスター.csv",
	target: "_blank"})[0].click();
}

CS.itask_list_show_edit_pana_showerea = function(flag){
	if(flag==-1){
		if(parseInt(CS.vueObj.i_aitask_top_info["company_page"],10)<0){
			return;
		}
		var widthpx=(CS.vueObj.i_aitask_top_info["company_end_x"]-CS.vueObj.i_aitask_top_info["company_start_x"])+"px";
		var heightpx=(CS.vueObj.i_aitask_top_info["company_end_y"]-CS.vueObj.i_aitask_top_info["company_start_y"])+"px";
		$("#itask_list_show_edit_window_pana_select_square_0").css("display","");
		CS.vueObj.itask_list_show_file_list_now_imgs_index=parseInt(CS.vueObj.i_aitask_top_info["company_page"],10);
		CS.vueObj.itask_list_show_file_list_now_xy_page=parseInt(CS.vueObj.i_aitask_top_info["company_page"],10);
		CS.itask_list_show_edit_pana_showerea_data={};
		CS.itask_list_show_edit_pana_showerea_data.startx=parseInt(CS.vueObj.i_aitask_top_info["company_start_x"],10);
		CS.itask_list_show_edit_pana_showerea_data.starty=parseInt(CS.vueObj.i_aitask_top_info["company_start_y"],10);
		CS.itask_list_show_edit_pana_showerea_data.endx=parseInt(CS.vueObj.i_aitask_top_info["company_end_x"],10);
		CS.itask_list_show_edit_pana_showerea_data.endy=parseInt(CS.vueObj.i_aitask_top_info["company_end_y"],10);
	}
	if(flag==-2){
		if(parseInt(CS.vueObj.i_aitask_top_info["closing_date_page"],10)<0){
			return;
		}
		$("#itask_list_show_edit_window_pana_select_square_0").css("display","");
		CS.vueObj.itask_list_show_file_list_now_imgs_index=parseInt(CS.vueObj.i_aitask_top_info["closing_date_page"],10);
		CS.vueObj.itask_list_show_file_list_now_xy_page=parseInt(CS.vueObj.i_aitask_top_info["closing_date_page"],10);
		CS.itask_list_show_edit_pana_showerea_data={};
		CS.itask_list_show_edit_pana_showerea_data.startx=parseInt(CS.vueObj.i_aitask_top_info["closing_date_start_x"],10);
		CS.itask_list_show_edit_pana_showerea_data.starty=parseInt(CS.vueObj.i_aitask_top_info["closing_date_start_y"],10);
		CS.itask_list_show_edit_pana_showerea_data.endx=parseInt(CS.vueObj.i_aitask_top_info["closing_date_end_x"],10);
		CS.itask_list_show_edit_pana_showerea_data.endy=parseInt(CS.vueObj.i_aitask_top_info["closing_date_end_y"],10);
	}
	if(flag>-1){
		if(parseInt(CS.vueObj.kanjo_detail[flag]["page"],10)<0){
			return;
		}
		$("#itask_list_show_edit_window_pana_select_square_0").css("display","");
		CS.vueObj.itask_list_show_file_list_now_imgs_index=parseInt(CS.vueObj.kanjo_detail[flag]["page"],10);
		CS.vueObj.itask_list_show_file_list_now_xy_page=parseInt(CS.vueObj.kanjo_detail[flag]["page"],10);
		CS.itask_list_show_edit_pana_showerea_data={};
		CS.itask_list_show_edit_pana_showerea_data.startx=parseInt(CS.vueObj.kanjo_detail[flag]["start_x"],10);
		CS.itask_list_show_edit_pana_showerea_data.starty=parseInt(CS.vueObj.kanjo_detail[flag]["start_y"],10);
		CS.itask_list_show_edit_pana_showerea_data.endx=parseInt(CS.vueObj.kanjo_detail[flag]["end_x"],10);
		CS.itask_list_show_edit_pana_showerea_data.endy=parseInt(CS.vueObj.kanjo_detail[flag]["end_y"],10);
		var setdetail=CS.vueObj.kanjo_detail[flag];
		setdetail.selectedflag=true;
		CS.vueObj.$set(CS.vueObj.kanjo_detail, flag, setdetail);
		for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
			if(flag!=i && CS.vueObj.kanjo_detail[i].selectedflag){
				CS.vueObj.kanjo_detail[i].selectedflag=false;
				CS.vueObj.$set(CS.vueObj.kanjo_detail, i, CS.vueObj.kanjo_detail[i]);
			}
		
		}
	}
	CS.itask_list_show_edit_window_pana_set_xy_2();

};
window.onresize = function(e){
	if($('#itask_list_show_edit_window_imgtank').length){
		var itask_list_show_edit_window_imgtank_off = $('#itask_list_show_edit_window_imgtank').offset();
		var windows_height=$(window).height();
		var footer_height=$("footer").height();
		$('#itask_list_show_edit_window_imgtank').height(windows_height-itask_list_show_edit_window_imgtank_off.top-footer_height-50);
		if($('#itask_list_show_edit_window_imgctl').height()>$('#itask_list_show_edit_window_imgtank').height()+$('#itask_list_show_edit_window_table').height()){
			$('#itask_list_show_edit_window_imgtank').height($('#itask_list_show_edit_window_imgctl').height()-$('#itask_list_show_edit_window_table').height());
		}
	}
};
CS.itask_list_show_edit_window_table_zoom_change = function(){
	var persent=50+CS.toI(CS.vueObj.itask_list_show_edit_window_table_zoom);
	if(CS.toI(CS.vueObj.itask_list_show_edit_window_table_zoom)>50){
		persent=50+CS.toI(CS.vueObj.itask_list_show_edit_window_table_zoom);
	}
	$('#itask_list_show_edit_window_img').width(persent+"%");
	$('#itask_list_show_edit_window_img').css('max-width',persent+"%");
	setTimeout(function(){
		CS.itask_list_show_edit_window_pana_set_xy_2();
	},300);
};
CS.itask_list_show_history = function (index) {
	CS.vueObj.itask_list_show_history_index=index;
	CS.vueObj.itask_list_show_history_flag=true;
	CS.vueObj.itask_now_name = CS.vueObj.itask_list_show_file_list_now[index]["file_tree_name"];
	var obj = {};
	//請求書一覧を出す
	obj["itask_id"] = CS.vueObj.itask_list_show_file_list_now[index]["itask_id"];
	obj["action"] = "itask_list_show_history";
	obj["type"] = CS.vueObj.itask_show_type;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.vueObj.itask_now_history=data["tree_info"]["history"];
		}
	});
};
//履歴画面を閉じる
CS.itask_list_history_back = function () {
	this.itask_list_show_history_flag=false;
};
CS.itask_history_do_property = function (index) {
	for(var i=0;i<CS.vueObj.itask_now_history.length;i++){
		if (index!=i) {
			var obj=this.itask_now_history[i];
			obj.show_property=false;
			this.$set(this.itask_now_history, i, obj);
		}
	}
	if (CS.vueObj.itask_now_history[index].show_property) {
		var obj=this.itask_now_history[index];
		obj.show_property=false;
		this.$set(this.itask_now_history, index, obj);
	} else {
		var obj=this.itask_now_history[index];
		obj.show_property=true;
		this.$set(this.itask_now_history, index, obj);
	}
};
CS.itask_downloadhistory = function (id) {
	window.open(CS.DOWN_ITASK_HISTORY + id + "&no=" + Date(), "A");
};
CS.itask_deletehistory = function (id) {
	var obj = {};
	obj["id"] = id;
	obj["action"] = "delete_itask_history";
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			if (data["do"] == "back") {
				CS.itask_list_history_back();
			} else {
				CS.itask_list_show_history(CS.vueObj.itask_list_show_history_index);
			}
			CS.alert_error("履歴を削除できました。");
		}
	});
};
//itask新規画面の項目一覧画面のドキュメントビューを前ページに遷移する
CS.itask_list_show_file_list_now_imgs_prevpage = function (e) {
	if(CS.vueObj.itask_list_show_edit_window_map_step=='B'){
		if(CS.vueObj.itask_list_show_file_list_now_imgs_index>0){
			CS.vueObj.itask_list_show_file_list_now_imgs_index--;
			
			CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
			CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
			$("#itask_list_show_edit_window_canvas_div").empty();

			//画像をcanvasに設定
			CS.itask_list_show_edit_window_canvas_tmp_img.onload = function(){
				CS.itask_list_show_edit_window_canvas_ctx.drawImage(CS.itask_list_show_edit_window_canvas_tmp_img, 0, 0, CS.itask_list_show_edit_window_map_KVN_width, CS.itask_list_show_edit_window_map_KVN_height);
				CS.itask_list_show_edit_window_map_KVN_sample(false);
				CS.itask_list_show_edit_window_map_restoration();
			}
		}
		setTimeout(function(){
			CS.itask_list_show_edit_window_map_rotate();
		},100);
		return;
	}else if(CS.vueObj.itask_list_show_edit_window_map_step=='C'){
		if(CS.vueObj.itask_list_show_file_list_now_imgs_index>0){
			CS.vueObj.itask_list_show_file_list_now_imgs_index--;
			CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
			CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
			$("#itask_list_show_edit_window_canvas_div").empty();

			//画像をcanvasに設定
			CS.itask_list_show_edit_window_canvas_tmp_img.onload = function(){
				CS.itask_list_show_edit_window_canvas_ctx.drawImage(CS.itask_list_show_edit_window_canvas_tmp_img, 0, 0, CS.itask_list_show_edit_window_map_KVN_width, CS.itask_list_show_edit_window_map_KVN_height);
				CS.itask_list_show_edit_window_canvas_ctx.fillStyle = '#fff';
				for(var i=0;i<CS.itask_list_show_edit_window_map_KVN_width;i++){
					for(var j=0;j<CS.itask_list_show_edit_window_map_KVN_height;j++){
						var dodelflag=true;
						for(var t=0;t<CS.itask_list_show_edit_window_map_add_list_xy.length;t++){
							if(CS.itask_list_show_edit_window_map_add_list_xy[t].imgs_index==CS.vueObj.itask_list_show_file_list_now_imgs_index){
								var x=CS.itask_list_show_edit_window_map_add_list_xy[t].x;
								var y=CS.itask_list_show_edit_window_map_add_list_xy[t].y;
								var w=CS.itask_list_show_edit_window_map_add_list_xy[t].w;
								var h=CS.itask_list_show_edit_window_map_add_list_xy[t].h;
								
								if(x<=i && x+w>=i && y<=j && y+h>=j){
									dodelflag=false;
								}
							}
						}
						if(dodelflag && CS.itask_list_show_edit_window_map_add_list_xy.length>0){
							CS.itask_list_show_edit_window_canvas_ctx.fillRect(i, j, 1, 1);
						}
					}
				}
			}
		}
		return;
	}
	if(CS.vueObj.itask_list_show_edit_window_getfullimage_show){
		CS.vueObj.itask_list_show_edit_window_getfullimage_show=false;
		CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0]=CS.itask_list_show_edit_window_bakimage_src;
	}
	if(CS.vueObj.itask_list_show_file_list_now_imgs_index>0){
		CS.vueObj.itask_list_show_file_list_now_imgs_index--;
	}
	setTimeout(function(){
		CS.itask_list_show_edit_window_pana_set_xy_2();
	},300);
};
//itask新規画面の項目一覧画面のドキュメントビューを次ページに遷移する
CS.itask_list_show_file_list_now_imgs_nextpage = function (e) {
	if(CS.vueObj.itask_list_show_edit_window_map_step=='B'){
		if(CS.vueObj.itask_list_show_file_list_now_imgs_index<CS.vueObj.itask_list_show_file_list_now_imgs.length-1){
			CS.vueObj.itask_list_show_file_list_now_imgs_index++;
			
			CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
			CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
			$("#itask_list_show_edit_window_canvas_div").empty();

			//画像をcanvasに設定
			CS.itask_list_show_edit_window_canvas_tmp_img.onload = function(){
				CS.itask_list_show_edit_window_canvas_ctx.drawImage(CS.itask_list_show_edit_window_canvas_tmp_img, 0, 0, CS.itask_list_show_edit_window_map_KVN_width, CS.itask_list_show_edit_window_map_KVN_height);
				CS.itask_list_show_edit_window_map_KVN_sample(false);
				
				CS.itask_list_show_edit_window_map_restoration();
			}
		}
		setTimeout(function(){
			CS.itask_list_show_edit_window_map_rotate();
		},100);
		return;
	}else if(CS.vueObj.itask_list_show_edit_window_map_step=='C'){
		if(CS.vueObj.itask_list_show_file_list_now_imgs_index<CS.vueObj.itask_list_show_file_list_now_imgs.length-1){
			CS.vueObj.itask_list_show_file_list_now_imgs_index++;
			
			CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
			CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
			$("#itask_list_show_edit_window_canvas_div").empty();

			//画像をcanvasに設定
			CS.itask_list_show_edit_window_canvas_tmp_img.onload = function(){
				CS.itask_list_show_edit_window_canvas_ctx.drawImage(CS.itask_list_show_edit_window_canvas_tmp_img, 0, 0, CS.itask_list_show_edit_window_map_KVN_width, CS.itask_list_show_edit_window_map_KVN_height);
				CS.itask_list_show_edit_window_canvas_ctx.fillStyle = '#fff';
				for(var i=0;i<CS.itask_list_show_edit_window_map_KVN_width;i++){
					for(var j=0;j<CS.itask_list_show_edit_window_map_KVN_height;j++){
						var dodelflag=true;
						for(var t=0;t<CS.itask_list_show_edit_window_map_add_list_xy.length;t++){
							if(CS.itask_list_show_edit_window_map_add_list_xy[t].imgs_index==CS.vueObj.itask_list_show_file_list_now_imgs_index){
								var x=CS.itask_list_show_edit_window_map_add_list_xy[t].x;
								var y=CS.itask_list_show_edit_window_map_add_list_xy[t].y;
								var w=CS.itask_list_show_edit_window_map_add_list_xy[t].w;
								var h=CS.itask_list_show_edit_window_map_add_list_xy[t].h;
								
								if(x<=i && x+w>=i && y<=j && y+h>=j){
									dodelflag=false;
								}
							}
						}
						if(dodelflag && CS.itask_list_show_edit_window_map_add_list_xy.length>0){
							CS.itask_list_show_edit_window_canvas_ctx.fillRect(i, j, 1, 1);
						}
					}
				}
			}
		}
		return;
	}
	if(CS.vueObj.itask_list_show_edit_window_getfullimage_show){
		CS.vueObj.itask_list_show_edit_window_getfullimage_show=false;
		CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0]=CS.itask_list_show_edit_window_bakimage_src;
	}
	if(CS.vueObj.itask_list_show_file_list_now_imgs_index<CS.vueObj.itask_list_show_file_list_now_imgs.length-1){
		CS.vueObj.itask_list_show_file_list_now_imgs_index++;
	}
	setTimeout(function(){
		CS.itask_list_show_edit_window_pana_set_xy_2();
	},300);
};
//itask新規画面の項目一覧画面のドキュメントビューを次ページに遷移する
CS.itask_list_show_file_list_now_imgs_rotate_right = function (e) {
	if(CS.vueObj.itask_list_show_edit_window_getfullimage_show){
		var imgdata=CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index];
		var img = new Image();
		img.src = $('#itask_list_show_edit_window_img').attr('src');
		var width  = img.width;  // 幅
		var height = img.height; // 高さ
		CS.ImgB64Resize(imgdata, width, height, 90, 
			function(img_b64) {
				// Destination Image
				CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index] = img_b64;
				setTimeout(function(){
					CS.vueObj.itask_list_show_edit_window_display_image=false;
				},100);
				setTimeout(function(){
					CS.vueObj.itask_list_show_edit_window_display_image=true;
				},200);
				setTimeout(function(){
					CS.vueObj.itask_list_show_edit_window_display_image=true;
				},500);
			}
		);
		return;
	}
	var imgdata=CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index];
	var img = new Image();
	img.src = $('#itask_list_show_edit_window_img').attr('src');
	var width  = img.width;  // 幅
	var height = img.height; // 高さ
	CS.ImgB64Resize(imgdata, width, height, 90, 
        function(img_b64) {
            // Destination Image
            CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index] = img_b64;
			var imgstr=img_b64.replaceAll('data:image/jpeg;base64,', '');
			var obj = {};
			obj["itask_pages_str"] = imgstr;
			obj["itask_pages_no"] = CS.vueObj.itask_list_show_file_list_now_imgs_index+1;
			obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
			obj["action"] = "itask_list_show_edit_window_save_img";
			$.ajax({
				type: 'POST',
				url: CS.ITASK_TOOL_URL,
				data: obj,
				// contentType: 'application/JSON',
				dataType: 'json',
				async: false,
				cache: false,
				scriptCharset: 'utf-8'
			}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
				// 成功処理
				if (data["status"] != "OK") {
					CS.alert_error(data["message"]);
				} else {
				}
			});
			setTimeout(function(){
				CS.vueObj.itask_list_show_edit_window_display_image=false;
			},100);
			setTimeout(function(){
				CS.vueObj.itask_list_show_edit_window_display_image=true;
			},200);
			setTimeout(function(){
				CS.vueObj.itask_list_show_edit_window_display_image=true;
			},500);
        }
    );
	setTimeout(function(){
		CS.itask_list_show_edit_window_pana_set_xy_2();
	},500);
};
//itask新規画面の項目一覧画面のドキュメントビューを次ページに遷移する
CS.itask_list_show_file_list_now_imgs_rotate_left = function (e) {
	if(CS.vueObj.itask_list_show_edit_window_getfullimage_show){
		var imgdata=CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index];
		var img = new Image();
		img.src = $('#itask_list_show_edit_window_img').attr('src');
		var width  = img.width;  // 幅
		var height = img.height; // 高さ
		CS.ImgB64Resize(imgdata, width, height, 270, 
			function(img_b64) {
				// Destination Image
				CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index] = img_b64;
				setTimeout(function(){
					CS.vueObj.itask_list_show_edit_window_display_image=false;
				},100);
				setTimeout(function(){
					CS.vueObj.itask_list_show_edit_window_display_image=true;
				},200);
				setTimeout(function(){
					CS.vueObj.itask_list_show_edit_window_display_image=true;
				},500);
			}
		);
		return;
	}
	var imgdata=CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index];
	var img = new Image();
	img.src = $('#itask_list_show_edit_window_img').attr('src');
	var width  = img.width;  // 幅
	var height = img.height; // 高さ
	CS.ImgB64Resize(imgdata, width, height, 270, 
        function(img_b64) {
            // Destination Image
            CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index] = img_b64;
			var imgstr=img_b64.replaceAll('data:image/jpeg;base64,', '');
			var obj = {};
			obj["itask_pages_str"] = imgstr;
			obj["itask_pages_no"] = CS.vueObj.itask_list_show_file_list_now_imgs_index+1;
			obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
			obj["action"] = "itask_list_show_edit_window_save_img";
			$.ajax({
				type: 'POST',
				url: CS.ITASK_TOOL_URL,
				data: obj,
				// contentType: 'application/JSON',
				dataType: 'json',
				async: false,
				cache: false,
				scriptCharset: 'utf-8'
			}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
				// 成功処理
				if (data["status"] != "OK") {
					CS.alert_error(data["message"]);
				} else {
				}
			});
			setTimeout(function(){
				CS.vueObj.itask_list_show_edit_window_display_image=false;
			},100);
			setTimeout(function(){
				CS.vueObj.itask_list_show_edit_window_display_image=true;
			},200);
			setTimeout(function(){
				CS.vueObj.itask_list_show_edit_window_display_image=true;
			},500);
        }
    );
	setTimeout(function(){
		CS.itask_list_show_edit_window_pana_set_xy_2();
	},500);
};
CS.itask_list_show_file_list_now_xy_selecte = function (col) {
	for(var i=0;i<140;i++){
		if(typeof CS.vueObj.itask_list_show_file_list_now[CS.vueObj.itask_list_show_edit_index]["showxyn"+i] !="undefined" && CS.vueObj.itask_list_show_file_list_now[CS.vueObj.itask_list_show_edit_index]["showxyn"+i]!=null){
			CS.vueObj.itask_list_show_file_list_now[CS.vueObj.itask_list_show_edit_index]["showxyn"+i]=false;
		}
	}
	if(this.itask_list_show_file_list_now_xy_deletes[col]==true){
		for(var i=0;i<40;i++){
			$("#itask_list_show_edit_window_select_square"+"_"+i).css({"display": "none",
			"left":0,
			"top":0,
			"width":0,
			"height":0});
			$("#itask_list_show_edit_window_select_square_k"+"_"+i).css({"display": "none",
			"left":0,
			"top":0,
			"width":0,
			"height":0});
		}
		CS.vueObj.$set(CS.vueObj.itask_list_show_file_list_now, CS.vueObj.itask_list_show_edit_index, CS.vueObj.itask_list_show_file_list_now[CS.vueObj.itask_list_show_edit_index]);
		return;
	}
	CS.vueObj.itask_list_show_file_list_now_xy=CS.vueObj.aitask_points_list[col];
	CS.vueObj.$set(CS.vueObj.itask_list_show_file_list_now, CS.vueObj.itask_list_show_edit_index, CS.vueObj.itask_list_show_file_list_now[CS.vueObj.itask_list_show_edit_index]);
	var notselectflag=true;
	for(var i=0;i<40;i++){
		$("#itask_list_show_edit_window_select_square"+"_"+i).css({"display": "none",
		"left":0,
		"top":0,
		"width":0,
		"height":0});
		$("#itask_list_show_edit_window_select_square_k"+"_"+i).css({"display": "none",
		"left":0,
		"top":0,
		"width":0,
		"height":0});
	}
	for(var i=0;i<CS.vueObj.itask_list_show_file_list_now_xy.length;i++){
		if(CS.vueObj.itask_list_show_file_list_now_xy[i].ey==99999){
			$("#itask_list_show_edit_window_select_square"+"_"+i).css({"display": "none",
			"left":0,
			"top":0,
			"width":0,
			"height":0});
			$("#itask_list_show_edit_window_select_square_k"+"_"+i).css({"display": "none",
			"left":0,
			"top":0,
			"width":0,
			"height":0});
			continue;
		}else{
			notselectflag=false;
			CS.vueObj.itask_list_show_file_list_now_xy_page=CS.vueObj.itask_list_show_file_list_now_xy[i].page-1;
			CS.vueObj.itask_list_show_file_list_now_imgs_index=CS.vueObj.itask_list_show_file_list_now_xy[i].page-1;
		}
	}
	if(!notselectflag){
		setTimeout(function(){
			CS.itask_list_show_edit_window_set_xy();
		},300);
		CS.vueObj.itask_list_show_file_list_now[CS.vueObj.itask_list_show_edit_index]["showxy"+col]=true;
	}
};
CS.itask_list_show_edit_window_set_xy = function () {
	if(CS.vueObj.itask_list_show_edit_window_getfullimage_show){
		$("#itask_list_show_edit_window_pana_select_square_0").css({"display": "block",
		"left":0,
		"top":0,
		"width":0,
		"height":0});
		return;
	}
	var o1 = document.getElementById("itask_list_show_edit_window_img");
	var o1_naturalHeight=o1.naturalHeight;
	var o1_naturalWidth=o1.naturalWidth;
	var o1_width=o1.width;
	var o1_height=o1.height;
	var mintop=null;
	$("#itask_list_show_edit_window_select_square_k").css({"top": "-"+o1_height+"px"});
	$("#itask_list_show_edit_window_select_square").css({"top": "-"+o1_height+"px"});
	for(var i=0;i<CS.vueObj.itask_list_show_file_list_now_xy.length;i++){
		var ey=CS.vueObj.itask_list_show_file_list_now_xy[i].ey;
		var sy=CS.vueObj.itask_list_show_file_list_now_xy[i].sy;
		var ex=CS.vueObj.itask_list_show_file_list_now_xy[i].ex;
		var sx=CS.vueObj.itask_list_show_file_list_now_xy[i].sx;
		
		var key=CS.vueObj.itask_list_show_file_list_now_xy[i].key;
		var ksy=CS.vueObj.itask_list_show_file_list_now_xy[i].ksy;
		var kex=CS.vueObj.itask_list_show_file_list_now_xy[i].kex;
		var ksx=CS.vueObj.itask_list_show_file_list_now_xy[i].ksx;
		if(ey==99999){
			$("#itask_list_show_edit_window_select_square"+"_"+i).css({"display": "none",
			"left":0,
			"top":0,
			"width":0,
			"height":0});
			$("#itask_list_show_edit_window_select_square_k"+"_"+i).css({"display": "none",
			"left":0,
			"top":0,
			"width":0,
			"height":0});
		}else{
			var h =ey-sy;
			var w =ex-sx;
			H=o1_height*h/o1_naturalHeight;
			W=o1_width*w/o1_naturalWidth;
			
			T=sy*o1_height/o1_naturalHeight;
			L=sx*o1_width/o1_naturalWidth;
			
			var o0 = $('#itask_list_show_edit_window_table');
			/*
			$("#itask_list_show_edit_window_select_square"+"_"+i).css({"display": "block",
			"left":L,
			"top":o0.outerHeight(true)+T,
			"width":W,
			"height":H});
			*/
			
			$("#itask_list_show_edit_window_select_square"+"_"+i).css({"display": "block",
			"left":L,
			"top":T,
			"width":W,
			"height":H});
			
			CS.vueObj.itask_list_show_file_list_now_xy_page=CS.vueObj.itask_list_show_file_list_now_xy[i].page-1;
			CS.vueObj.itask_list_show_file_list_now_imgs_index=CS.vueObj.itask_list_show_file_list_now_xy[i].page-1;
			
			if(i==0){
				mintop=o0.outerHeight(true)+T;
			}else{
				if(o0.outerHeight(true)+T<mintop){
					mintop=o0.outerHeight(true)+T;
				}
			}
			
			if(i==0){
				minleft=L;
			}else{
				if(L<minleft){
					minleft=L;
				}
			}
			
			
			var kh =key-ksy;
			var kw =kex-ksx;
			KH=o1_height*kh/o1_naturalHeight;
			KW=o1_width*kw/o1_naturalWidth;
			
			KT=ksy*o1_height/o1_naturalHeight;
			KL=ksx*o1_width/o1_naturalWidth;
			
			/*
			$("#itask_list_show_edit_window_select_square_k"+"_"+i).css({"display": "block",
			"left":KL,
			"top":o0.outerHeight(true)+KT,
			"width":KW,
			"height":KH});
			*/
			$("#itask_list_show_edit_window_select_square_k"+"_"+i).css({"display": "block",
			"left":KL,
			"top":KT,
			"width":KW,
			"height":KH});
		}
		console.log($(window).scrollTop());
		//$(window).scrollTop(mintop+20);
		if(mintop!=null || minleft!=null){
			var position=mintop-70;
			CS.mintop=mintop;
			//$("html,body").animate({scrollTop:position},600);
			$("#itask_list_show_edit_window_imgtank").animate({scrollTop:position,scrollLeft:(minleft-20)},600);
			setTimeout(function(){
				if(220+CS.mintop>document.documentElement.clientHeight){
					var windowscroll=220+CS.mintop+70-document.documentElement.clientHeight;
					$("html,body").animate({scrollTop:windowscroll},600);
				}
			},300);
		}
	}
};
CS.itask_list_show_edit_window_set_xy_2 = function () {
	if(CS.vueObj.itask_list_show_file_list_now_xy_page!=CS.vueObj.itask_list_show_file_list_now_imgs_index){
		return;
	}
	var o1 = document.getElementById("itask_list_show_edit_window_img");
	var o1_naturalHeight=o1.naturalHeight;
	var o1_naturalWidth=o1.naturalWidth;
	var o1_width=o1.width;
	var o1_height=o1.height;
	$("#itask_list_show_edit_window_select_square_k").css({"top": "-"+o1_height+"px"});
	$("#itask_list_show_edit_window_select_square").css({"top": "-"+o1_height+"px"});
	for(var i=0;i<CS.vueObj.itask_list_show_file_list_now_xy.length;i++){
		var ey=CS.vueObj.itask_list_show_file_list_now_xy[i].ey;
		var sy=CS.vueObj.itask_list_show_file_list_now_xy[i].sy;
		var ex=CS.vueObj.itask_list_show_file_list_now_xy[i].ex;
		var sx=CS.vueObj.itask_list_show_file_list_now_xy[i].sx;
		
		var key=CS.vueObj.itask_list_show_file_list_now_xy[i].key;
		var ksy=CS.vueObj.itask_list_show_file_list_now_xy[i].ksy;
		var kex=CS.vueObj.itask_list_show_file_list_now_xy[i].kex;
		var ksx=CS.vueObj.itask_list_show_file_list_now_xy[i].ksx;
		if(ey==99999){
			$("#itask_list_show_edit_window_select_square"+"_"+i).css({"display": "none",
			"left":0,
			"top":0,
			"width":0,
			"height":0});
			$("#itask_list_show_edit_window_select_square_k"+"_"+i).css({"display": "none",
			"left":0,
			"top":0,
			"width":0,
			"height":0});
		}else{
			var h =ey-sy;
			var w =ex-sx;
			H=o1_height*h/o1_naturalHeight;
			W=o1_width*w/o1_naturalWidth;
			
			T=sy*o1_height/o1_naturalHeight;
			L=sx*o1_width/o1_naturalWidth;
			var o0 = $('#itask_list_show_edit_window_table');
			/*
			$("#itask_list_show_edit_window_select_square"+"_"+i).css({"display": "block",
			"left":L,
			"top":o0.outerHeight(true)+T,
			"width":W,
			"height":H});
			*/
			$("#itask_list_show_edit_window_select_square"+"_"+i).css({"display": "block",
			"left":L,
			"top":T,
			"width":W,
			"height":H});
			
			var kh =key-ksy;
			var kw =kex-ksx;
			KH=o1_height*kh/o1_naturalHeight;
			KW=o1_width*kw/o1_naturalWidth;
			
			KT=ksy*o1_height/o1_naturalHeight;
			KL=ksx*o1_width/o1_naturalWidth;
			
			/*
			$("#itask_list_show_edit_window_select_square_k"+"_"+i).css({"display": "block",
			"left":KL,
			"top":o0.outerHeight(true)+KT,
			"width":KW,
			"height":KH});
			*/
			$("#itask_list_show_edit_window_select_square_k"+"_"+i).css({"display": "block",
			"left":KL,
			"top":KT,
			"width":KW,
			"height":KH});
		}
	}
};
CS.itask_list_show_edit_window_pana_set_xy_2 = function () {
	if(CS.vueObj.itask_list_show_edit_window_getfullimage_show){
		$("#itask_list_show_edit_window_pana_select_square_0").css({"display": "block",
		"left":0,
		"top":0,
		"width":0,
		"height":0});
		return;
	}
	setTimeout(function(){
		var o=CS.itask_list_show_edit_pana_showerea_data
		var o1 = document.getElementById("itask_list_show_edit_window_img");
		if(typeof o1 == "undefined"){return;}
		var o1_naturalHeight=o1.naturalHeight;
		var o1_naturalWidth=o1.naturalWidth;
		var o1_width=o1.width;
		var o1_height=o1.height;
		if(typeof o =="undefined"){
			return;
		}
		var ey=o.endy;
		var sy=o.starty;
		var ex=o.endx;
		var sx=o.startx;
		
		var h =ey-sy;
		var w =ex-sx;
		H=o1_height*h/o1_naturalHeight;
		W=o1_width*w/o1_naturalWidth;
		
		T=sy*o1_height/o1_naturalHeight;
		L=sx*o1_width/o1_naturalWidth;
		$("#itask_list_show_edit_window_pana_select_square_0").css({"display": "block",
		"left":L,
		"top":T,
		"width":W,
		"height":H});
	},300);

};
CS.itask_list_show_edit_window_back = function () {
	
	//if(CS.vueObj.itask_list_show_edit_pana_kojin_input_show || CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
		var okflag=window.confirm("保存しないまま戻っても大丈夫でしょうか？");
		if(!okflag){
			return;
		}
	//}
	CS.itask_list_show_edit_window_del_me();
	this.itask_list_show_edit_window_flag=false;
	this.menu_sub_title="";
	if(CS.itask_list_show_edit_window_for_link_flag){
		CS.itask_list_show_edit_window_for_link_flag=false;
		CS.menu_itask_refresh();
	}
	CS.vueObj.itask_list_show_file_list_now_have_alert=false;
};
CS.itask_list_show_edit_window_save = function () {
	var obj = {};
	//itask詳細情報を変更する
	var nowrecode=this.itask_list_show_file_list_now[this.itask_list_show_edit_index];
	for(var i=0;i<this.itask_list_show_items[this.itask_show_type].length;i++){
		var colname=this.itask_list_show_items[this.itask_show_type][i]["col"];
		if(colname.substr(0, 1)=='n'){
			obj[colname] = nowrecode[colname];
			obj["OLD_"+colname] = this.itask_edit_old_info[colname];
			obj["DEL_"+colname] = this.itask_list_show_file_list_now_xy_deletes[colname];
		}
	}
	obj["alert_time"] = this.itask_list_show_file_list_now[this.itask_list_show_edit_index]["alert_time"];
	if(obj["alert_time"]==null){
		obj["have_alert"] = "NG";
	}else{
		obj["have_alert"] = "OK";
	}
	
	obj["itask_id"] = nowrecode["itask_id"];
	obj["action"] = "itask_list_show_edit_window_save";
	obj["type"] = this.itask_show_type;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.vueObj.menu_sub_title="";
			CS.vueObj.itask_list_show_edit_window_flag=false;
			CS.menu_itask_refresh();
		}
	});
};
//itaskの表示項目の設定画面を開く
CS.itask_list_show_option = function(){
	if(this.itask_show_items_setting_flag){
		this.itask_show_items_setting_flag=false;
	}else{
		//表示項目の設定画面を表示するか
		this.itask_show_items_setting_flag=true;
		//itask検索条件を表示フラグ
		this.itask_list_search_flag=false;
		//アップロードファイルのテンプレートを表示フラグ
		this.itask_list_format_flag=false;
		//分析ページを選択するフラグ
		this.itask_show_coke_pages_flag=false;
	}
}
//itaskの検索条件画面を開く
CS.itask_list_show_search = function(){
	if(this.itask_list_search_flag){
		//itask検索条件を表示フラグ
		this.itask_list_search_flag=false;
	}else{
		//表示項目の設定画面を表示するか
		this.itask_show_items_setting_flag=false;
		//itask検索条件を表示フラグ
		this.itask_list_search_flag=true;
		//アップロードファイルのテンプレートを表示フラグ
		this.itask_list_format_flag=false;
		//分析ページを選択するフラグ
		this.itask_show_coke_pages_flag=false;
	}
}
//itaskのアップロードファイルのテンプレーの設定画面を開く
CS.itask_list_show_format_list = function(){
	if(this.itask_list_format_flag){
		//itask検索条件を表示フラグ
		this.itask_list_format_flag=false;
	}else{
		//表示項目の設定画面を表示するか
		this.itask_show_items_setting_flag=false;
		//itask検索条件を表示フラグ
		this.itask_list_search_flag=false;
		//アップロードファイルのテンプレートを表示フラグ
		this.itask_list_format_flag=true;
		//分析ページを選択するフラグ
		this.itask_show_coke_pages_flag=false;
	}
}
//itaskの表示項目の設定画面を変更する
CS.itask_list_show_items_change = function(index){
	if(this.itask_list_show_items_now[index]["flag"]){
		var count=0;
		for(var i=0;i<this.itask_list_show_items_now.length;i++){
			if(this.itask_list_show_items_now[i]["flag"]){
				count++;
			}
		}
		//もし少なくとも2項目以上選択されたら、現在項目をOFFする
		if(count>1){
			this.itask_list_show_items_now[index]["flag"]=false;
		}
	}else{
		this.itask_list_show_items_now[index]["flag"]=true;
	}
	CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type]=this.itask_list_show_items_now;
	var typelist=["tm","jt","sk","nk","kh","sh"];
	typelist=[];
	for(var i=0;i<CS.vueObj.itask_sub_type_list.length;i++){
		typelist[i]=CS.vueObj.itask_sub_type_list[i]["itask_type"];
	}
	var count = new Date('2999/12/31 00:00');
	var set_itask_list_show_items={};
	for(var i=0;i<typelist.length;i++){
		if(typeof CS.vueObj.itask_list_show_items[typelist[i]] != "undefined"){
			set_itask_list_show_items[typelist[i]]=[];
			for(var j=0;j<CS.vueObj.itask_list_show_items[typelist[i]].length;j++){
				set_itask_list_show_items[typelist[i]][j]=Object.assign({}, CS.vueObj.itask_list_show_items[typelist[i]][j]);
			}
		}
	}
	for(var i=0;i<typelist.length;i++){
		if(typeof set_itask_list_show_items[typelist[i]] != "undefined"){
			for(var j=0;j<set_itask_list_show_items[typelist[i]].length;j++){
				//余計な属性を除く
				delete set_itask_list_show_items[typelist[i]][j]["name"];
				delete set_itask_list_show_items[typelist[i]][j]["sort_flag"];
				delete set_itask_list_show_items[typelist[i]][j]["dw"];
				delete set_itask_list_show_items[typelist[i]][j]["up"];
			}
		}
	}
	this.$set(this.itask_list_show_items_now, index, this.itask_list_show_items_now[index]);
	document.cookie = 'itask_show_items='+JSON.stringify(set_itask_list_show_items)+'; expires=' + count.toUTCString();
	setTimeout(function(){
		CS.itask_list_reset_header();
	},500);
}
CS.itask_list_set_items = function (itask_list_show_items) {
	var typelist=["tm","jt","sk","nk","kh","sh"];
	typelist=[];
	for(var i=0;i<CS.vueObj.itask_sub_type_list.length;i++){
		typelist[i]=CS.vueObj.itask_sub_type_list[i]["itask_type"];
	}
	for(var i=0;i<typelist.length;i++){
		if(typeof itask_list_show_items[typelist[i]] != "undefined" && typeof CS.vueObj.itask_list_show_items[typelist[i]] != "undefined"){
			for(var j=0;j<CS.vueObj.itask_list_show_items[typelist[i]].length;j++){
				for(var t=0;t<itask_list_show_items[typelist[i]].length;t++){
					var lo=CS.vueObj.itask_list_show_items[typelist[i]][j];
					var ro=itask_list_show_items[typelist[i]][t];
					if(lo["col"]==ro["col"]){
						CS.vueObj.itask_list_show_items[typelist[i]][j].flag=ro.flag;
					}
				}
			}
		}
	}
	CS.vueObj.itask_list_show_items_now=CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type];
}
CS.itask_list_show_graph = function () {
	if(this.itask_list_show_graph_flag){
		this.itask_list_show_graph_flag=false;
		return;
	}else{
		this.itask_list_show_graph_flag=true;
	}
	var obj = {};
	obj["action"] = "itask_list_search_forgraph";
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: true,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.vueObj.itask_list_show_edit_window_flag=false;
			CS.menu_itask_refresh();
		}
	});
	setTimeout(function(){
		CS.itask_list_drawing_graph();
	},300);
}
CS.itask_list_drawing_graph = function () {
	//line
	var ctxL = document.getElementById("itask_list_graph").getContext('2d');
	var myLineChart = new Chart(ctxL, {
		type: 'line',
		data: {
		  labels: ["2010年", "2011年", "2012年", "2013年", "2014年", "2015年", "2016年", "2017年", "2018年"],
		  datasets: [
			{
			  label: "請求金額(JPY)",
			  data: [70, 72, 74, 78, 82, 85, 88, 85, 82],
			  backgroundColor: [
				'#33b5e54a',
			  ],
			  borderColor: [
				'#33b5e5',
			  ],
			  borderWidth: 2
			}
		  ]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			},
			responsive: true
		}
	});
	
}
CS.itask_list_search_forgraph = function () {
	
}
CS.utf8_2_sjis=function(str){
	var array = [],i,il=str.length;
	for(i=0;i<il;i++) array.push(str.charCodeAt(i));
	var sjis_array = Encoding.convert(array, "SJIS", "UNICODE");
	var sjis = Encoding.codeToString( sjis_array );
	return sjis;
}
CS.itask_list_get_csv = function () {
	// var itask_show_item=CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type];
	// var csv_obj=[];
	// for(var i=0;i<CS.vueObj.itask_list_show_file_list_now.length;i++){
		// var csv_obj_temp={};
		// for(var j=1;j<itask_show_item.length;j++){
			// if(typeof CS.vueObj.itask_list_show_file_list_now[i][itask_show_item[j].col] != "undefined"){
				// var name=itask_show_item[j].name;
				// var value=CS.vueObj.itask_list_show_file_list_now[i][itask_show_item[j].col];
				// csv_obj_temp[name]=value;
			// }
		// }
		// csv_obj.push(csv_obj_temp);
	// }

	// var content = jQuery.csv.fromObjects(csv_obj);
	
	// var str_array = Encoding.stringToCode(content);
	// var sjis_array = Encoding.convert(str_array, "SJIS", "UNICODE");
	// var uint8_array = new Uint8Array(sjis_array);
		
	// var blob = new Blob([ uint8_array ], { "type" : "text/csv" })
	// jQuery("<a></a>", {href: window.URL.createObjectURL(blob),
	// download: "iTask情報.csv",
	// target: "_blank"})[0].click();
	
	
	if(!CS.itask_list_search_flag){
		var obj = {};
		obj["type"] = CS.vueObj.itask_show_type;
		if(typeof CS.itask_list_show_file_itask_csv_page=="undefined"){
			CS.itask_list_show_file_itask_csv_page=1;
		}
		if(CS.itask_list_show_file_itask_csv_page==1){
			CS.itask_list_show_file_list_now=[];
			CS.vueObj.itask_list_show_file_itask_csv_show=false;
		}
		obj["page"] = CS.itask_list_show_file_itask_csv_page;
		obj["action"] = "get_itask_list";
		$.ajax({
			type: 'POST',
			url: CS.ITASK_TOOL_URL,
			data: obj,
			// contentType: 'application/JSON',
			dataType: 'json',
			async: false,
			cache: false,
			scriptCharset: 'utf-8'
		}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
			// 成功処理
			if (data["status"] != "OK") {
				CS.alert_error(data["message"]);
			} else {
				if(typeof CS.vueObj.itask_list_show_items=="undefined" || CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type].length==0){
					return;
				}
				CS.itask_list_show_file_itask_csv_count=data["itask_count"];
				CS.itask_list_show_file_list_now=CS.itask_list_show_file_list_now.concat(data[CS.vueObj.itask_show_type]);
				
				CS.itask_list_show_file_list_csv_limit=CS.toI(data["itask_list_show_file_list_paging_limit"]);
				CS.itask_list_show_file_itask_csv_page=CS.toI(data["itask_list_show_file_list_paging_num"]);
				
				var r=CS.itask_list_show_file_itask_csv_count%CS.itask_list_show_file_list_csv_limit;
				var t=(CS.itask_list_show_file_itask_csv_count-r)/CS.itask_list_show_file_list_csv_limit;
				if(r>0){
					CS.itask_list_show_file_itask_csv_sum=t+1;
				}else{
					CS.itask_list_show_file_itask_csv_sum=t;
				}
				if(CS.itask_list_show_file_itask_csv_page<CS.itask_list_show_file_itask_csv_sum){
					CS.itask_list_show_file_itask_csv_page++;
					CS.itask_list_get_csv();
				}else{
					var itask_show_item=CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type];
					var csv_obj=[];
					for(var i=0;i<CS.itask_list_show_file_list_now.length;i++){
						var csv_obj_temp={};
						for(var j=1;j<itask_show_item.length;j++){
							if(typeof CS.itask_list_show_file_list_now[i][itask_show_item[j].col] != "undefined"){
								var name=itask_show_item[j].name;
								var value=CS.itask_list_show_file_list_now[i][itask_show_item[j].col];
								csv_obj_temp[name]=value;
							}
						}
						for(var j=0;j<CS.vueObj.itask_list_show_items_search_other_items.length;j++){
							if(typeof CS.itask_list_show_file_list_now[i]["o"+j] != "undefined"){
								var name=CS.vueObj.itask_list_show_items_search_other_items[j];
								var value=CS.itask_list_show_file_list_now[i]["o"+j];
								csv_obj_temp[name]=value;
							}
						}
						var name="create_at";
						var value=CS.itask_list_show_file_list_now[i]["create_at"];
						csv_obj_temp[name]=value;
						csv_obj.push(csv_obj_temp);
						if(typeof CS.itask_list_show_file_list_now[i]["memo"] != "undefined"){
							var name="メモ";
							var value=CS.itask_list_show_file_list_now[i]["memo"];
							csv_obj_temp[name]=value;
						}
					}
					var content = jQuery.csv.fromObjects(csv_obj);
					
					var str_array = Encoding.stringToCode(content);
					var sjis_array = Encoding.convert(str_array, "SJIS", "UNICODE");
					var uint8_array = new Uint8Array(sjis_array);
						
					var blob = new Blob([ uint8_array ], { "type" : "text/csv" })
					jQuery("<a></a>", {href: window.URL.createObjectURL(blob),
					download: "iTask情報.csv",
					target: "_blank"})[0].click();
					
					CS.vueObj.itask_list_show_file_itask_csv_show=true;
					CS.itask_list_show_file_itask_csv_page=1;
				}
			}
		});
	}else{
		if(typeof CS.itask_list_show_file_itask_csv_page=="undefined"){
			CS.itask_list_show_file_itask_csv_page=1;
		}
		if(CS.itask_list_show_file_itask_csv_page==1){
			CS.itask_list_show_file_list_now=[];
			CS.vueObj.itask_list_show_file_itask_csv_show=false;
		}
		CS.itask_list_search_obj["page"] = CS.itask_list_show_file_itask_csv_page;
		$.ajax({
			type: 'POST',
			url: CS.ITASK_TOOL_URL,
			data: CS.itask_list_search_obj,
			// contentType: 'application/JSON',
			dataType: 'json',
			async: false,
			cache: false,
			scriptCharset: 'utf-8'
		}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
			// 成功処理
			if (data["status"] != "OK") {
				CS.alert_error(data["message"]);
			} else {
				if(typeof CS.vueObj.itask_list_show_items=="undefined" || CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type].length==0){
					return;
				}
				CS.itask_list_show_file_itask_csv_count=data["itask_count"];
				CS.itask_list_show_file_list_now=CS.itask_list_show_file_list_now.concat(data[CS.vueObj.itask_show_type]);
				CS.itask_list_show_file_list_csv_limit=CS.toI(data["itask_list_show_file_list_paging_limit"]);
				CS.itask_list_show_file_itask_csv_page=CS.toI(data["itask_list_show_file_list_paging_num"]);
				
				var r=CS.itask_list_show_file_itask_csv_count%CS.itask_list_show_file_list_csv_limit;
				var t=(CS.itask_list_show_file_itask_csv_count-r)/CS.itask_list_show_file_list_csv_limit;
				if(r>0){
					CS.itask_list_show_file_itask_csv_sum=t+1;
				}else{
					CS.itask_list_show_file_itask_csv_sum=t;
				}
				if(CS.itask_list_show_file_itask_csv_page<CS.itask_list_show_file_itask_csv_sum){
					CS.itask_list_show_file_itask_csv_page++;
					CS.itask_list_get_csv();
				}else{
					
					var itask_show_item=CS.vueObj.itask_list_show_items[CS.vueObj.itask_show_type];
					var csv_obj=[];
					for(var i=0;i<CS.itask_list_show_file_list_now.length;i++){
						var csv_obj_temp={};
						for(var j=1;j<itask_show_item.length;j++){
							if(typeof CS.itask_list_show_file_list_now[i][itask_show_item[j].col] != "undefined"){
								var name=itask_show_item[j].name;
								var value=CS.itask_list_show_file_list_now[i][itask_show_item[j].col];
								csv_obj_temp[name]=value;
							}
						}
						for(var j=0;j<CS.vueObj.itask_list_show_items_search_other_items.length;j++){
							if(typeof CS.itask_list_show_file_list_now[i]["o"+j] != "undefined"){
								var name=CS.vueObj.itask_list_show_items_search_other_items[j];
								var value=CS.itask_list_show_file_list_now[i]["o"+j];
								csv_obj_temp[name]=value;
							}
						}
						var name="create_at";
						var value=CS.itask_list_show_file_list_now[i]["create_at"];
						csv_obj_temp[name]=value;
						csv_obj.push(csv_obj_temp);
						if(typeof CS.itask_list_show_file_list_now[i]["memo"] != "undefined"){
							var name="メモ";
							var value=CS.itask_list_show_file_list_now[i]["memo"];
							csv_obj_temp[name]=value;
						}
					}
					var content = jQuery.csv.fromObjects(csv_obj);
					
					var str_array = Encoding.stringToCode(content);
					var sjis_array = Encoding.convert(str_array, "SJIS", "UNICODE");
					var uint8_array = new Uint8Array(sjis_array);
						
					var blob = new Blob([ uint8_array ], { "type" : "text/csv" })
					jQuery("<a></a>", {href: window.URL.createObjectURL(blob),
					download: "iTask情報.csv",
					target: "_blank"})[0].click();
					
					CS.vueObj.itask_list_show_file_itask_csv_show=true;
					CS.itask_list_show_file_itask_csv_page=1;
				}
			}
		});
	}
	
	
}
CS.itask_list_get_csv1=function(){
	var okflag=false;
	var file_tree_id_list=[];
	var itask_id_list=[];
	CS.itask_list_get_csv2_file_tree_name_list=[];
	var drive_id_list=[];
	var obj = {};
	if(CS.vueObj.itask_list_show_edit_window_flag){
		itask_id_list.push(CS.vueObj.i_aitask_top_info["itask_id"]);
	}else{
		for(var i=0;i<CS.vueObj.itask_list_show_file_list_now.length;i++){
			if(CS.vueObj.itask_list_show_file_list_now[i].delete_flag){
				file_tree_id_list.push(this.itask_list_show_file_list_now[i]["file_tree_id"]);
				itask_id_list.push(this.itask_list_show_file_list_now[i]["itask_id"]);
				CS.itask_list_get_csv2_file_tree_name_list.push(this.itask_list_show_file_list_now[i]["file_tree_name"]);
				drive_id_list.push(this.itask_list_show_file_list_now[i]["n0"]);
				okflag=true;
			}
		}
		if(!okflag && !CS.vueObj.itask_list_show_file_list_selectall_click_flag){
			alert("ダウンロードしたい行を選択してください");
			return;
		}
		if(CS.vueObj.itask_list_show_file_list_selectall_click_flag){
			obj["selectall"] = "OK";
			var searchTextFlag=false;
			//請求書一覧を出す
			obj["type"] = CS.vueObj.itask_show_type;
			obj["file_name"] = CS.vueObj.itask_list_search_file_name;
			if(obj["file_name"]!=""){searchTextFlag=true;}
			
			obj["member_name"] = CS.vueObj.itask_list_search_member_name;
			if(obj["member_name"]!=""){searchTextFlag=true;}
			
			obj["memo"] = CS.vueObj.itask_list_search_memo;
			if(obj["memo"]!=""){searchTextFlag=true;}
			
			obj["itask_list_search_update_at_start"] = CS.vueObj.itask_list_search_update_at_start;
			if(obj["itask_list_search_update_at_start"]!=""){searchTextFlag=true;}
			
			obj["itask_list_search_update_at_end"] = CS.vueObj.itask_list_search_update_at_end;
			if(obj["itask_list_search_update_at_end"]!=""){searchTextFlag=true;}
			var itask_list_show_items_now=JSON.stringify(CS.vueObj.itask_list_show_items_now);
			obj["itask_list_search_items"] = JSON.parse(itask_list_show_items_now);
			for(var i=0;i<CS.vueObj.itask_list_show_items_now.length;i++){
				if((CS.vueObj.itask_list_show_items_now[i]["searchText"]!="" && typeof CS.vueObj.itask_list_show_items_now[i]["searchText"] != "undefined") || (CS.vueObj.itask_list_show_items_now[i]["searchText2"]!="" && typeof CS.vueObj.itask_list_show_items_now[i]["searchText2"]!="undefined")){searchTextFlag=true;}
			}
			
			var itask_list_show_items_search_other_items_val1=JSON.stringify(CS.vueObj.itask_list_show_items_search_other_items_val1);
			obj["itask_list_show_items_search_other_items_val1"] = JSON.parse(itask_list_show_items_search_other_items_val1);
			for(var i=0;i<CS.vueObj.itask_list_show_items_search_other_items_val1.length;i++){
				if(CS.vueObj.itask_list_show_items_search_other_items_val1[i]!=""){searchTextFlag=true;}
			}
			
			var itask_list_show_items_search_other_items_val2=JSON.stringify(CS.vueObj.itask_list_show_items_search_other_items_val2);
			obj["itask_list_show_items_search_other_items_val2"] = JSON.parse(itask_list_show_items_search_other_items_val2);
			for(var i=0;i<CS.vueObj.itask_list_show_items_search_other_items_val2.length;i++){
				if(CS.vueObj.itask_list_show_items_search_other_items_val2[i]!=""){searchTextFlag=true;}
			}
			if(CS.vueObj.itask_list_search_kojinhoujin!=""){searchTextFlag=true;}
			obj["kojinhoujin"] = CS.vueObj.itask_list_search_kojinhoujin;
			if(!searchTextFlag){
				obj["search"] = "NG";
			}else{
				obj["search"] = "OK";
			}
		}else{
			obj["selectall"] = "NG";
		}
	}
	
	
	
	
	//請求書一覧を出す
	obj["type"] = CS.vueObj.itask_show_type;
	obj["drive_id_list"] = drive_id_list.join(",");
	obj["file_tree_id_list"] = file_tree_id_list.join(",");
	obj["itask_id_list"] = itask_id_list.join(",");
	obj["file_tree_name_list"] = CS.itask_list_get_csv2_file_tree_name_list.join(",");
	obj["action"] = "itask_list_csv1";
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			var itask_csv_item_name=data["itask_csv_item_name"];
			var i_aitask_top_info_list=data["i_aitask_top_info_list"];
			var csv_obj=[];
			for(var i=0;i<i_aitask_top_info_list.length;i++){
				var csv_obj_temp={};
				for(var j=0;j<itask_csv_item_name.length;j++){
					var name=itask_csv_item_name[j];
					var value=i_aitask_top_info_list[i][j];
					csv_obj_temp[name]=value;
				}
				csv_obj.push(csv_obj_temp);
			}
			var content = jQuery.csv.fromObjects(csv_obj);
			
			var str_array = Encoding.stringToCode(content);
			var sjis_array = Encoding.convert(str_array, "SJIS", "UNICODE");
			var uint8_array = new Uint8Array(sjis_array);
			var filename="決算書情報一覧.csv";
			if(CS.vueObj.itask_list_show_edit_window_flag){
				filename="決算書情報@"+CS.vueObj.itask_list_show_edit_aitask_name.replaceAll('.pdf', '')+".csv";
			}else if(CS.itask_list_get_csv2_file_tree_name_list.length==1){
				filename="決算書情報@"+CS.itask_list_get_csv2_file_tree_name_list[0].replaceAll('.pdf', '')+".csv";
			}
			var blob = new Blob([ uint8_array ], { "type" : "text/csv" })
			jQuery("<a></a>", {href: window.URL.createObjectURL(blob),
			download: filename,
			target: "_blank"})[0].click();
		}
	});
};
CS.itask_list_get_csv2=function(){
	var okflag=false;
	var file_tree_id_list=[];
	var itask_id_list=[];
	CS.itask_list_get_csv2_file_tree_name_list=[];
	var drive_id_list=[];
	
	var obj = {};
	if(CS.vueObj.itask_list_show_edit_window_flag){
		itask_id_list.push(CS.vueObj.i_aitask_top_info["itask_id"]);
	}else{
		for(var i=0;i<CS.vueObj.itask_list_show_file_list_now.length;i++){
			if(CS.vueObj.itask_list_show_file_list_now[i].delete_flag){
				file_tree_id_list.push(this.itask_list_show_file_list_now[i]["file_tree_id"]);
				itask_id_list.push(this.itask_list_show_file_list_now[i]["itask_id"]);
				CS.itask_list_get_csv2_file_tree_name_list.push(this.itask_list_show_file_list_now[i]["file_tree_name"]);
				drive_id_list.push(this.itask_list_show_file_list_now[i]["n0"]);
				okflag=true;
			}
		}
		if(!okflag && !CS.vueObj.itask_list_show_file_list_selectall_click_flag){
			alert("ダウンロードしたい行を選択してください");
			return;
		}

		if(CS.vueObj.itask_list_show_file_list_selectall_click_flag){
			obj["selectall"] = "OK";
			var searchTextFlag=false;
			//請求書一覧を出す
			obj["type"] = CS.vueObj.itask_show_type;
			obj["file_name"] = CS.vueObj.itask_list_search_file_name;
			if(obj["file_name"]!=""){searchTextFlag=true;}
			
			obj["member_name"] = CS.vueObj.itask_list_search_member_name;
			if(obj["member_name"]!=""){searchTextFlag=true;}
			
			obj["memo"] = CS.vueObj.itask_list_search_memo;
			if(obj["memo"]!=""){searchTextFlag=true;}
			
			obj["itask_list_search_update_at_start"] = CS.vueObj.itask_list_search_update_at_start;
			if(obj["itask_list_search_update_at_start"]!=""){searchTextFlag=true;}
			
			obj["itask_list_search_update_at_end"] = CS.vueObj.itask_list_search_update_at_end;
			if(obj["itask_list_search_update_at_end"]!=""){searchTextFlag=true;}
			var itask_list_show_items_now=JSON.stringify(CS.vueObj.itask_list_show_items_now);
			obj["itask_list_search_items"] = JSON.parse(itask_list_show_items_now);
			for(var i=0;i<CS.vueObj.itask_list_show_items_now.length;i++){
				if((CS.vueObj.itask_list_show_items_now[i]["searchText"]!="" && typeof CS.vueObj.itask_list_show_items_now[i]["searchText"] != "undefined") || (CS.vueObj.itask_list_show_items_now[i]["searchText2"]!="" && typeof CS.vueObj.itask_list_show_items_now[i]["searchText2"]!="undefined")){searchTextFlag=true;}
			}
			
			var itask_list_show_items_search_other_items_val1=JSON.stringify(CS.vueObj.itask_list_show_items_search_other_items_val1);
			obj["itask_list_show_items_search_other_items_val1"] = JSON.parse(itask_list_show_items_search_other_items_val1);
			for(var i=0;i<CS.vueObj.itask_list_show_items_search_other_items_val1.length;i++){
				if(CS.vueObj.itask_list_show_items_search_other_items_val1[i]!=""){searchTextFlag=true;}
			}
			
			var itask_list_show_items_search_other_items_val2=JSON.stringify(CS.vueObj.itask_list_show_items_search_other_items_val2);
			obj["itask_list_show_items_search_other_items_val2"] = JSON.parse(itask_list_show_items_search_other_items_val2);
			for(var i=0;i<CS.vueObj.itask_list_show_items_search_other_items_val2.length;i++){
				if(CS.vueObj.itask_list_show_items_search_other_items_val2[i]!=""){searchTextFlag=true;}
			}
			if(CS.vueObj.itask_list_search_kojinhoujin!=""){searchTextFlag=true;}
			obj["kojinhoujin"] = CS.vueObj.itask_list_search_kojinhoujin;
			if(!searchTextFlag){
				obj["search"] = "NG";
			}else{
				obj["search"] = "OK";
			}
		}else{
			obj["selectall"] = "NG";
		}
	}

	//請求書一覧を出す
	obj["type"] = CS.vueObj.itask_show_type;
	obj["drive_id_list"] = drive_id_list.join(",");
	obj["file_tree_id_list"] = file_tree_id_list.join(",");
	obj["itask_id_list"] = itask_id_list.join(",");
	obj["file_tree_name_list"] = CS.itask_list_get_csv2_file_tree_name_list.join(",");
	obj["action"] = "itask_list_csv2";
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			var itask_csv_item_name=data["itask_csv_item_name"];
			var i_aitask_top_info_list=data["i_aitask_top_info_list"];
			var csv_obj=[];
			for(var i=0;i<i_aitask_top_info_list.length;i++){
				var csv_obj_temp={};
				for(var j=0;j<itask_csv_item_name.length;j++){
					var name=itask_csv_item_name[j];
					var value=i_aitask_top_info_list[i][j];
					csv_obj_temp[name]=value;
				}
				csv_obj.push(csv_obj_temp);
			}
			var content = jQuery.csv.fromObjects(csv_obj);
			
			var str_array = Encoding.stringToCode(content);
			var sjis_array = Encoding.convert(str_array, "SJIS", "UNICODE");
			var uint8_array = new Uint8Array(sjis_array);
			var filename="経営談義一覧.csv";
			if(CS.vueObj.itask_list_show_edit_window_flag){
				filename="経営談義@"+CS.vueObj.itask_list_show_edit_aitask_name.replaceAll('.pdf', '')+".csv";
			}else if(CS.itask_list_get_csv2_file_tree_name_list.length==1){
				filename="経営談義@"+CS.itask_list_get_csv2_file_tree_name_list[0].replaceAll('.pdf', '')+".csv";
			}
			var blob = new Blob([ uint8_array ], { "type" : "text/csv" })
			jQuery("<a></a>", {href: window.URL.createObjectURL(blob),
			download: filename,
			target: "_blank"})[0].click();
		}
	});
};
//分析ページを選択する
CS.itask_show_coke_pages = function () {
	if(this.itask_show_coke_pages_flag){
		//itask検索条件を表示フラグ
		this.itask_show_coke_pages_flag=false;
	}else{
		//表示項目の設定画面を表示するか
		this.itask_show_items_setting_flag=false;
		//itask検索条件を表示フラグ
		this.itask_list_search_flag=false;
		//アップロードファイルのテンプレートを表示フラグ
		this.itask_list_format_flag=false;
		//分析ページを選択するフラグ
		this.itask_show_coke_pages_flag=true;
	}
}
//全部のページを分析するかを設定する
CS.itask_show_coke_pages_all_change = function () {
	if(this.itask_show_coke_pages_str!=""){
		this.itask_show_coke_pages_str="";
	}
}
//ページ設定の文字を修正した場合
CS.itask_show_coke_pages_str_change = function() {
	// CS.vueObj.itask_show_coke_pages_all_flag=false;
	//alert(CS.vueObj.itask_show_coke_pages_strs[CS.vueObj.itask_show_type]);
	var itask_show_coke_pages_str = CS.vueObj.itask_show_coke_pages_str.split(",");
	for(var i=itask_show_coke_pages_str.length-1;i>=0;i--){
		itask_show_coke_pages_str_sub=itask_show_coke_pages_str[i].split("-");
		for(var j=itask_show_coke_pages_str_sub.length-1;j>=0;j--){
			itask_show_coke_pages_str_sub[j]=parseInt(itask_show_coke_pages_str_sub[j],10);
			if(isNaN(itask_show_coke_pages_str_sub[j])){
				itask_show_coke_pages_str_sub.splice(j, 1);
			}
		}
		if(itask_show_coke_pages_str_sub.length>2){
			itask_show_coke_pages_str.splice(2, itask_show_coke_pages_str_sub.length-2);
			if(itask_show_coke_pages_str[0]>itask_show_coke_pages_str[1]){
				var temp=itask_show_coke_pages_str[0];
				itask_show_coke_pages_str[0]=itask_show_coke_pages_str[1];
				itask_show_coke_pages_str[1]=temp;
			}
		}
		itask_show_coke_pages_str[i]=itask_show_coke_pages_str_sub.join('-');
		if(itask_show_coke_pages_str[i]==""){
			itask_show_coke_pages_str.splice(i, 1);
		}
	}
	itask_show_coke_pages_str=itask_show_coke_pages_str.join(',');
	CS.vueObj.itask_show_coke_pages_str=itask_show_coke_pages_str;
	CS.vueObj.itask_show_coke_pages_strs[CS.vueObj.itask_show_type]=CS.vueObj.itask_show_coke_pages_str;
	var count = new Date('2999/12/31 00:00');
	document.cookie = 'itask_show_coke_pages_strs='+JSON.stringify(CS.vueObj.itask_show_coke_pages_strs)+'; expires=' + count.toUTCString();
}
CS.itask_list_set_coke_pages_strs = function(itask_show_coke_pages_strs) {
	var typelist=["tm","jt","sk","nk","kh","sh"];
	typelist=[];
	for(var i=0;i<CS.vueObj.itask_sub_type_list.length;i++){
		typelist[i]=CS.vueObj.itask_sub_type_list[i]["itask_type"];
	}
	for(var i=0;i<typelist.length;i++){
		if(typeof itask_show_coke_pages_strs[typelist[i]] != "undefined"){
			CS.vueObj.itask_show_coke_pages_strs[typelist[i]]=itask_show_coke_pages_strs[typelist[i]];
		}
	}
}
CS.itask_list_clear_btn = function(itask_index) {
	CS.itask_index=itask_index;
	var alert_time=CS.vueObj.itask_list_show_file_list_now[itask_index]["alert_time"];
	var alert_time_date=CS.vueObj.itask_list_show_file_list_now[itask_index]["alert_time_date"];
	var alert_time_time=CS.vueObj.itask_list_show_file_list_now[itask_index]["alert_time_time"];
	if(CS.vueObj.itask_list_show_file_list_now[itask_index]["alert_time"]==null){
		var now = new Date();
		var target = document.getElementById("DateTimeDisp");
		var Year = now.getFullYear();
		var Month = now.getMonth()+1;
		var Date_ = now.getDate();
		var Hour = now.getHours();
		var Min = now.getMinutes();
		var Sec = now.getSeconds();
		
		Month = ( '00' + Month ).slice( -2 );
		Date_ = ( '00' + Date_ ).slice( -2 );
		Hour = ( '00' + Hour ).slice( -2 );
		Min = ( '00' + Min ).slice( -2 );
		Sec = ( '00' + Sec ).slice( -2 );
		alert_time=Year+"-"+Month+"-"+Date_+"T"+Hour+":"+Min;
		alert_time_date=Year+"-"+Month+"-"+Date_;
		alert_time_time=Hour+":"+Min;
	}else{
		alert_time=null;
		alert_time_date=null;
		alert_time_time=null;
	}
	CS.vueObj.itask_list_show_file_list_now[itask_index]["alert_time"]=alert_time;
	CS.vueObj.itask_list_show_file_list_now[itask_index]["alert_time_date"]=alert_time_date;
	CS.vueObj.itask_list_show_file_list_now[itask_index]["alert_time_time"]=alert_time_time;
	
	var obj = {};
	//itask詳細情報を変更する
	var nowrecode=this.itask_list_show_file_list_now[itask_index];

	obj["alert_time"] = alert_time;
	if(obj["alert_time"]==null){
		obj["have_alert"] = "NG";
	}else{
		obj["have_alert"] = "OK";
	}
	
	obj["itask_id"] = nowrecode["itask_id"];
	obj["action"] = "itask_list_show_alert_time_save";
	obj["type"] = this.itask_show_type;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.vueObj.itask_list_show_file_list_now[CS.itask_index]["actie_alert"]=data["actie_alert"];
			// CS.vueObj.itask_list_show_edit_window_flag=false;
			// CS.menu_itask_refresh();
		}
	});
}
CS.itask_list_change_memo = function(itask_index) {
	var obj = {};
	if(CS.vueObj.itask_list_show_edit_window_flag){
		obj["memo"] = CS.vueObj.itask_list_show_edit_window_memo;
		obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
	}else{
		var memo=CS.vueObj.itask_list_show_file_list_now[itask_index]["memo"];
		//itask詳細情報を変更する
		var nowrecode=this.itask_list_show_file_list_now[itask_index];
		obj["memo"] = memo;
		obj["itask_id"] = nowrecode["itask_id"];
	}

	obj["action"] = "itask_list_change_memo";
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.alert_error("メモを保存できました");
			if(CS.vueObj.itask_list_show_edit_window_flag){
				CS.vueObj.itask_list_show_file_list_now[CS.vueObj.itask_list_show_edit_index]["memo"]=CS.vueObj.itask_list_show_edit_window_memo;
			}
		}
	});
}
CS.itask_list_change_alert = function(itask_index) {
	CS.itask_index=itask_index;
	var have_alert="OK";
	var alert_time=CS.vueObj.itask_list_show_file_list_now[itask_index]["alert_time"];
	if(this.browser_flag=="firefox"){
		if(CS.vueObj.itask_list_show_file_list_now[itask_index]["alert_time_date"]==""){
			alert_time=null
			have_alert = "NG";
		}else{
			if(CS.vueObj.itask_list_show_file_list_now[itask_index]["alert_time_time"]==""){
				CS.vueObj.itask_list_show_file_list_now[itask_index]["alert_time_time"]="00:00";
			}
			alert_time=CS.vueObj.itask_list_show_file_list_now[itask_index]["alert_time_date"]+"T"+CS.vueObj.itask_list_show_file_list_now[itask_index]["alert_time_time"];
		}
	}
	CS.vueObj.itask_list_show_file_list_now[itask_index]["alert_time"]=alert_time;
	var obj = {};
	//itask詳細情報を変更する
	var nowrecode=this.itask_list_show_file_list_now[itask_index];

	obj["alert_time"] = alert_time;
	obj["have_alert"] = have_alert;
	obj["itask_id"] = nowrecode["itask_id"];
	obj["action"] = "itask_list_show_alert_time_save";
	obj["type"] = this.itask_show_type;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.vueObj.itask_list_show_file_list_now[CS.itask_index]["actie_alert"]=data["actie_alert"];
			// CS.vueObj.itask_list_show_edit_window_flag=false;
			// CS.menu_itask_refresh();
		}
	});
}
CS.get_itask_alert_list = function() {
	var obj = {};
	if(CS.ITASK_TOOL_URL==null || CS.ITASK_TOOL_URL==""){return;}
	obj["action"] = "get_itask_alert_list";
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.vueObj.itask_alert_list=data["alert_list"];
			// CS.menu_itask_refresh();
		}
	});
}
CS.itask_list_show_file_list_select_click = function(index) {
}
CS.itask_list_show_file_list_selectall_click = function() {
	if(CS.vueObj.itask_list_show_file_list_selectall_click_flag){
		for(var i=0;i<CS.vueObj.itask_list_show_file_list_now.length;i++){
			CS.vueObj.itask_list_show_file_list_now[i].delete_flag=false;
		}
		CS.vueObj.itask_list_show_file_list_selectall_click_flag=false;
	}else{
		for(var i=0;i<CS.vueObj.itask_list_show_file_list_now.length;i++){
			CS.vueObj.itask_list_show_file_list_now[i].delete_flag=true;
		}
		CS.vueObj.itask_list_show_file_list_selectall_click_flag=true;
	}

}
CS.itask_list_delete_all = function(){
	var okflag=false;
	var file_tree_id_list=[];
	var itask_id_list=[];
	var file_tree_name_list=[];
	var drive_id_list=[];
	for(var i=0;i<CS.vueObj.itask_list_show_file_list_now.length;i++){
		if(CS.vueObj.itask_list_show_file_list_now[i].delete_flag){
			file_tree_id_list.push(this.itask_list_show_file_list_now[i]["file_tree_id"]);
			itask_id_list.push(this.itask_list_show_file_list_now[i]["itask_id"]);
			file_tree_name_list.push(this.itask_list_show_file_list_now[i]["file_tree_name"]);
			drive_id_list.push(this.itask_list_show_file_list_now[i]["n0"]);
			okflag=true;
		}
	}
	if(!okflag){
		alert("削除したい行を選択してください");
		return;
	}
	if(!window.confirm('選択した行を削除しますか？')){
		return;
	}
	var obj = {};
	//請求書一覧を出す
	obj["type"] = CS.vueObj.itask_show_type;
	obj["drive_id_list"] = drive_id_list.join(",");
	obj["file_tree_id_list"] = file_tree_id_list.join(",");
	obj["itask_id_list"] = itask_id_list.join(",");
	obj["file_tree_name_list"] = file_tree_name_list.join(",");
	obj["action"] = "itask_list_delete_all";
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.alert_worrying("削除できました",null);
			CS.menu_itask_refresh();
		}
	});
}
CS.itask_list_reset_header = function(){
}
CS.itask_kanjo_edit_show=function(){
	var obj = {};
	obj["action"] = "itask_kanjo_edit_show";
	$.ajax({
		type: 'POST',
		url: CS.KANRI_ITASK_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			CS.vueObj.itask_kanjo_edit_info_list=data["itask_kanjo_edit_info_list"];
		}
	});
}
CS.itask_list_show_edit_window_change_eazyinput_tab=function(tabindex){
	if(tabindex==9){
		return;
	}
	CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index=tabindex;
	var sdata=CS.spreadsheet1.getData();
	CS.data=[];
	for(var i=0;i<CS.vueObj.houjin_eazy_inputlist.length;i++){
		for(var j=0;j<sdata.length;j++){
			if(sdata[j][8]==i){
				CS.vueObj.houjin_eazy_inputlist[i]["amount_pre_year"]=sdata[j][4];
				CS.vueObj.houjin_eazy_inputlist[i]["amount_this_year"]=sdata[j][6];
			}
		}
		tmpobj={};
		if(CS.vueObj.houjin_eazy_inputlist[i]["m_kanjo_code"]=="2_999_0_0_0"){
			tmpobj["family_name"]="";
			tmpobj["genus_name"]="";
			tmpobj["species_name"]="";
		}else{
			tmpobj["family_name"]=CS.vueObj.houjin_eazy_inputlist[i]["family_name"];
			tmpobj["genus_name"]=CS.vueObj.houjin_eazy_inputlist[i]["genus_name"];
			tmpobj["species_name"]=CS.vueObj.houjin_eazy_inputlist[i]["species_name"];
		}
		tmpobj["variety_name"]=CS.vueObj.houjin_eazy_inputlist[i]["variety_name"];
		tmpobj["index"]=i;
		tmpobj["amount_pre_year"]=CS.vueObj.houjin_eazy_inputlist[i]["amount_pre_year"];
		tmpobj["zenki_keisan"]="";
		tmpobj["amount_this_year"]=CS.vueObj.houjin_eazy_inputlist[i]["amount_this_year"];
		tmpobj["konki_keisan"]="";
		tmpobj["kenzankaijyo"]=false;
		if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==CS.vueObj.houjin_eazy_inputlist[i]["tabindex"]){
			CS.data.push(tmpobj);
		}
	}
	$("#spreadsheet1").empty();
	for(var i=0;i<CS.data.length;i++){
		if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
			if(CS.data[i]["property"]==-1 || CS.data[i]["property"]=="-1"){
				if(CS.data[i]["variety"]>0){
					// CS.data[i]["zenki_keisan"]="正の値を入力してください";
					// CS.data[i]["konki_keisan"]="正の値を入力してください";
				}
			}
			if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==1){
				if(i==10 || i==30){
					CS.data[i]["zenki_keisan"]="正の値を入力してください";
					CS.data[i]["konki_keisan"]="正の値を入力してください";
				}
			}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==2){

			}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==3){

			}else if(CS.vueObj.itask_list_show_edit_pana_eazyinput_tag_index==4){

			}
		}
	}
	CS.spreadsheet1 =jspreadsheet(document.getElementById('spreadsheet1'), {
		data:CS.data,
		columns: CS.columns,
		contextMenu:CS.contextMenu,
		columnSorting:false,
		allowManualInsertColumn:false,
		allowManualInsertRow:false,
		allowDeleteColumn:false,
		allowDeleteRow:false,
		allowDeletingAllRows:false,
		allowInsertColumn:false,
		options:CS.options,
		onafterchanges: CS.itask_list_show_edit_pana_eazyinput_kojin_set_event_change,
		onselection: (instance, x1, y1, x2, y2) => {
			// 選択されたセルの開始位置を記録
			CS.aitask_eazyinput_spreadsheet_selectedCell = { row: y1, col: x1 };
		}
	});
	CS.spreadsheet1.el.addEventListener('keydown', CS.aitask_eazyinput_spreadsheet_keydown1);
	setTimeout(CS.itask_list_show_edit_pana_del_left_td, 10);
}
CS.itask_list_show_edit_window_change_tab=function(tabindex){
	CS.vueObj.itask_list_show_edit_pana_tag_button_index=tabindex;
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		var setdetail=CS.vueObj.kanjo_detail[i];
		if(setdetail.selectedflag){
			setdetail.selectedflag=false;
			CS.vueObj.$set(CS.vueObj.kanjo_detail, i, setdetail);
		}
	}
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){}else{
		CS.itask_list_show_edit_pana_resort_kanjo_detail();
	}
	var itask_list_show_file_list_now_imgs_index=CS.vueObj.itask_list_show_file_list_now_imgs_index+0;
	CS.itask_list_show_edit_window_get_def_img();
	if(CS.vueObj.itask_list_show_file_list_now_imgs_index!=itask_list_show_file_list_now_imgs_index && CS.vueObj.itask_list_show_edit_window_getfullimage_show && CS.itask_list_show_edit_window_bakimage_src!=null){
		CS.vueObj.itask_list_show_edit_window_getfullimage_show=false;
		CS.vueObj.itask_list_show_file_list_now_imgs[itask_list_show_file_list_now_imgs_index+0]=CS.itask_list_show_edit_window_bakimage_src;
	}
	CS.itask_list_show_edit_pana_text_clearcorlor();
}
CS.itask_list_show_edit_window_change_tab_konjin=function(tabindex){
	CS.vueObj.itask_list_show_edit_pana_tag_button_index=tabindex;
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1 && tabindex==3){
		console.log("CS.vueObj.kanjo_detail.length:::"+CS.vueObj.kanjo_detail.length);
		// 95件ちょうどのとき末尾にオブジェクトを追加
		if (CS.vueObj.kanjo_detail.length === 95) {
		  const obj = {
			kanjo_info_id: null,
			candidate_list: "[{\"order\":1,\"family\":1,\"genus\":0,\"species\":0,\"variety\":64,\"property\":1,\"variety_name\":\"雑収入\",\"abc_flag\":\"0\",\"sort\":\"1000362\"}]",
			m_kanjo_id: "1_1_0_0_64",
			tabindex: "3",
			order: "1",
			family: "1",
			genus: "0",
			species: "0",
			variety: "64",
			kotei: "kotei95",
			sort: "95",
			addflag: true,
			amount_pre_year: "",
			amount_this_year: "",
			db_exist: "1.00",
			page: "-1",
			start_x: "0",
			start_y: "0",
			end_x: "0",
			end_y: "0",
			kenzankaijyo: false,
			koteiitem: "NN",
			m_kanjo_code: "1_1_0_0_64",
			family_name: "売上高",
			genus_name: "純売上高",
			species_name: "売上高",
			variety_name: "雑収入",
			property: "1",
			abc_flag: false,
			kanjo: "損益",
			family_rowspan: 1,
			genus_rowspan: 1,
			species_rowspan: 1,
			kanjo_rowspan: 1,
			candidate_select_list: [
			  {
				family: 1,
				genus: 0,
				species: 0,
				order: 1,
				property: 1,
				variety: 64,
				variety_name: "雑収入",
				sort: "1000362",
				code: "1_1_0_0_64"
			  }
			],
			konki_keisan: "",
			konki_sagaku: null,
			selectedflag: false
		  };

		  CS.vueObj.kanjo_detail.push(obj);
		}
	}
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		var setdetail=CS.vueObj.kanjo_detail[i];
		if(setdetail.selectedflag){
			setdetail.selectedflag=false;
			CS.vueObj.$set(CS.vueObj.kanjo_detail, i, setdetail);
		}
	}
	var itask_list_show_file_list_now_imgs_index=CS.vueObj.itask_list_show_file_list_now_imgs_index+0;
	CS.itask_list_show_edit_window_get_def_img();
	if(CS.vueObj.itask_list_show_file_list_now_imgs_index!=itask_list_show_file_list_now_imgs_index && CS.vueObj.itask_list_show_edit_window_getfullimage_show && CS.itask_list_show_edit_window_bakimage_src!=null){
		CS.vueObj.itask_list_show_edit_window_getfullimage_show=false;
		CS.vueObj.itask_list_show_file_list_now_imgs[itask_list_show_file_list_now_imgs_index+0]=CS.itask_list_show_edit_window_bakimage_src;
	}
	if(tabindex==3 && CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		CS.vueObj.i_aitask_top_info["other_new_flag"]="NG";
	}
	CS.itask_list_show_edit_pana_text_clearcorlor();
}
CS.candidate_select_list_x_click=function(index){
	CS.vueObj.kanjo_detail[index].candidate_select_list_showflag=false;
	this.$set(this.kanjo_detail, index, CS.vueObj.kanjo_detail[index]);
}
CS.candidate_select_list_change=function(index){
	for(var i=0;i<CS.vueObj.kanjo_detail[index]["candidate_select_list"].length;i++){
		var selectobj=CS.vueObj.kanjo_detail[index]["candidate_select_list"];
		if(CS.vueObj.kanjo_detail[index]["m_kanjo_id"]==selectobj[i]["code"]){
			var temp=CS.vueObj.kanjo_detail[index];
			var count=0;
			for(var j=0;j<this.kanjo_detail.length;j++){
				if(temp["m_kanjo_id"]==this.kanjo_detail[j]["m_kanjo_id"] && temp["tabindex"]==this.kanjo_detail[i]["tabindex"]){
					count++;
				}
				if(count>1){
					temp["m_kanjo_id"]=CS.candidate_select_list_dbclick_m_kanjo_id;
					temp["m_kanjo_code"]=CS.candidate_select_list_dbclick_m_kanjo_code;
					CS.vueObj.$set(CS.vueObj.kanjo_detail, index, temp);
					alert("すでに追加済勘定科目です。");
					return;
				}
			}
			temp["m_kanjo_id"]=selectobj[i]["code"];
			temp["m_kanjo_code"]=selectobj[i]["code"];
			temp["family"]=selectobj[i]["family"];
			temp["genus"]=selectobj[i]["genus"];
			temp["species"]=selectobj[i]["species"];
			temp["order"]=selectobj[i]["order"];
			if(typeof CS.abc_flag_map[temp["m_kanjo_code"]] !="undefined"){
				temp["abc_flag"]=true;
			}else{
				temp["abc_flag"]=false;
			}
			
			if(selectobj[i]["property"]!=1 && selectobj[i]["property"]!="1" && selectobj[i]["property"]!=-1 && selectobj[i]["property"]!="-1"){
				temp["property"]=1;
			}else{
				temp["property"]=selectobj[i]["property"];
			}
			temp["variety"]=selectobj[i]["variety"];
			//temp["sort"]=selectobj[i]["sort"];
			temp["variety_name"]=selectobj[i]["variety_name"];
			CS.vueObj.$set(CS.vueObj.kanjo_detail, index, temp);
			CS.vueObj.kanjo_detail[index].changeflag=true;
		}
	}
	CS.vueObj.kanjo_detail[index].candidate_select_list_showflag=false;
	CS.vueObj.$set(CS.vueObj.kanjo_detail, index, CS.vueObj.kanjo_detail[index]);
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
		CS.itask_list_show_edit_pana_resort_kanjo_detail();
	}
}
CS.itask_list_show_edit_pana_kanjo_add=function(){
	CS.itask_list_show_edit_window_kanjo_index="NONE";
	CS.itask_list_show_edit_window_kanjo_genus="NONE";
	CS.itask_list_show_edit_window_kanjo_family="NONE";
	CS.kanri_itask_kanjo_show(CS.vueObj.itask_list_show_edit_pana_tag_button_index,CS.vueObj.kanri_itask_show_type,"OK");
}
CS.itask_list_show_edit_pana_resort_kanjo_detail=function(){
	var family_rowspan=0;
	var genus_rowspan=0;
	var species_rowspan=0;
	
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		CS.vueObj.kanjo_detail[i]["family"]=parseInt(CS.vueObj.kanjo_detail[i]["family"],10);
		CS.vueObj.kanjo_detail[i]["genus"]=parseInt(CS.vueObj.kanjo_detail[i]["genus"],10);
		CS.vueObj.kanjo_detail[i]["species"]=parseInt(CS.vueObj.kanjo_detail[i]["species"],10);
		CS.vueObj.kanjo_detail[i]["order"]=parseInt(CS.vueObj.kanjo_detail[i]["order"],10);
		CS.vueObj.kanjo_detail[i]["variety"]=parseInt(CS.vueObj.kanjo_detail[i]["variety"],10);
		CS.vueObj.kanjo_detail[i]["sort"]=parseInt(CS.vueObj.kanjo_detail[i]["sort"],10);
		CS.vueObj.kanjo_detail[i]["tabindex"]=parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10);
	}
	CS.vueObj.kanjo_detail.sort(function (a, b) {
		if (a["order"] < b["order"])
			return -1;
		if (a["order"] > b["order"])
			return 1;
		return 0;
	});
	//tmp_kanjo_detail[order]->sozai
	//                       ->data[family]->sozai
	//                                     ->data[genus]->sozai
	//                                                  ->data[variety]
	var tmp_kanjo_detail=[];
	var temporder=[];
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		temporder.push(CS.vueObj.kanjo_detail[i]);
		if(i==CS.vueObj.kanjo_detail.length-1 || CS.vueObj.kanjo_detail[i]["order"]!=CS.vueObj.kanjo_detail[i+1]["order"]){
			var order={};
			order.sozai=temporder;
			tmp_kanjo_detail.push(order);
			temporder=[];
		}
		
	}
	//ファミリのソートをやめる
	//var tempfamily=[];
	//for(var i=0;i<tmp_kanjo_detail.length;i++){
	//	tmp_kanjo_detail[i].data=[];
	//	tmp_kanjo_detail[i].sozai.sort(function (a, b) {
	//		if (a["family"] < b["family"])
	//			return -1;
	//		if (a["family"] > b["family"])
	//			return 1;
	//		return 0;
	//	});
	//	for(var j=0;j<tmp_kanjo_detail[i].sozai.length;j++){
	//		tempfamily.push(tmp_kanjo_detail[i].sozai[j]);
	//		if(j==tmp_kanjo_detail[i].sozai.length-1 || tmp_kanjo_detail[i].sozai[j]["family"]!=tmp_kanjo_detail[i].sozai[j+1]["family"]){
	//			var family={};
	//			family.sozai=tempfamily;
	//			tmp_kanjo_detail[i].data.push(family);
	//			tempfamily=[];
	//		}
	//	}
	//}
	//var set_kanjo_detail=[];
	//for(var i=0;i<tmp_kanjo_detail.length;i++){
	//	for(var j=0;j<tmp_kanjo_detail[i].data.length;j++){
	//		for(var t=0;t<tmp_kanjo_detail[i].data[j].sozai.length;t++){
	//			set_kanjo_detail.push(tmp_kanjo_detail[i].data[j].sozai[t]);
	//		}
	//	}
	//}
	
	var set_kanjo_detail=[];
	for(var i=0;i<tmp_kanjo_detail.length;i++){
		for(var j=0;j<tmp_kanjo_detail[i].sozai.length;j++){
			set_kanjo_detail.push(tmp_kanjo_detail[i].sozai[j]);
		}
	}
	for(var i=set_kanjo_detail.length-1;i>-1;i--){
		family_rowspan++;
		genus_rowspan++;
		species_rowspan++;
		if(i==0 || set_kanjo_detail[i]["order"]!=set_kanjo_detail[i-1]["order"] || set_kanjo_detail[i]["family"]!=set_kanjo_detail[i-1]["family"]){
			set_kanjo_detail[i]["family_rowspan"]=family_rowspan;
			family_rowspan=0;
		}else{
			set_kanjo_detail[i]["family_rowspan"]=0;
		}
		if(i==0 || set_kanjo_detail[i]["order"]!=set_kanjo_detail[i-1]["order"] || set_kanjo_detail[i]["family"]!=set_kanjo_detail[i-1]["family"] || set_kanjo_detail[i]["genus"]!=set_kanjo_detail[i-1]["genus"]){
			set_kanjo_detail[i]["genus_rowspan"]=genus_rowspan;
			genus_rowspan=0;
		}else{
			set_kanjo_detail[i]["genus_rowspan"]=0;
		}
		if(i==0 || set_kanjo_detail[i]["order"]!=set_kanjo_detail[i-1]["order"] || set_kanjo_detail[i]["family"]!=set_kanjo_detail[i-1]["family"] || set_kanjo_detail[i]["genus"]!=set_kanjo_detail[i-1]["genus"] || set_kanjo_detail[i]["species"]!=set_kanjo_detail[i-1]["species"]){
			set_kanjo_detail[i]["species_rowspan"]=species_rowspan;
			species_rowspan=0;
		}else{
			set_kanjo_detail[i]["species_rowspan"]=0;
		}
	}
	
	CS.vueObj.kanjo_detail=set_kanjo_detail;
	
	
	set_kanjo_detail_2=[];
	set_kanjo_detail_2_variety_name=[];
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		var subdata=CS.vueObj.kanjo_detail[i];
		if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
			if(subdata.order==2 && subdata.family<40){
				subdata["motoindex"]=i;
				set_kanjo_detail_2.push(subdata);
			}
		}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
			if(subdata.order==2 && subdata.family>=40){
				subdata["motoindex"]=i;
				set_kanjo_detail_2.push(subdata);
			}
		}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
			if(subdata.order==1 && subdata.tabindex!=4){
				subdata["motoindex"]=i;
				set_kanjo_detail_2.push(subdata);
				set_kanjo_detail_2_variety_name.push(subdata["variety_name"]);
			}
		}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==4){
			if(subdata.order==1 && subdata.tabindex==4){
				subdata["motoindex"]=i;
				set_kanjo_detail_2.push(subdata);
				set_kanjo_detail_2_variety_name.push(subdata["variety_name"]);
			}
		}
	}
	for(var i=set_kanjo_detail_2.length-1;i>-1;i--){
		family_rowspan++;
		genus_rowspan++;
		species_rowspan++;
		if(i==0 || set_kanjo_detail_2[i]["order"]!=set_kanjo_detail_2[i-1]["order"] || set_kanjo_detail_2[i]["family"]!=set_kanjo_detail_2[i-1]["family"]){
			set_kanjo_detail_2[i]["family_rowspan"]=family_rowspan+0;
			family_rowspan=0;
		}else{
			set_kanjo_detail_2[i]["family_rowspan"]=0;
		}
		if(i==0 || set_kanjo_detail_2[i]["order"]!=set_kanjo_detail_2[i-1]["order"] || set_kanjo_detail_2[i]["family"]!=set_kanjo_detail_2[i-1]["family"] || set_kanjo_detail_2[i]["genus"]!=set_kanjo_detail_2[i-1]["genus"]){
			set_kanjo_detail_2[i]["genus_rowspan"]=genus_rowspan+0;
			genus_rowspan=0;
		}else{
			set_kanjo_detail_2[i]["genus_rowspan"]=0;
		}
		if(i==0 || set_kanjo_detail_2[i]["order"]!=set_kanjo_detail_2[i-1]["order"] || set_kanjo_detail_2[i]["family"]!=set_kanjo_detail_2[i-1]["family"] || set_kanjo_detail_2[i]["genus"]!=set_kanjo_detail_2[i-1]["genus"] || set_kanjo_detail_2[i]["species"]!=set_kanjo_detail_2[i-1]["species"]){
			set_kanjo_detail_2[i]["species_rowspan"]=species_rowspan+0;
			species_rowspan=0;
		}else{
			set_kanjo_detail_2[i]["species_rowspan"]=0;
		}
	}
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		for(var j=0;j<set_kanjo_detail_2.length;j++){
			if((typeof set_kanjo_detail_2[j]["kanjo_info_id"]!="undefined" && set_kanjo_detail_2[j]["kanjo_info_id"]==CS.vueObj.kanjo_detail[i]["kanjo_info_id"]) || (typeof set_kanjo_detail_2[j]["kanjo_info_id"]=="undefined" && set_kanjo_detail_2[j]["m_kanjo_code"]==CS.vueObj.kanjo_detail[i]["m_kanjo_code"])){
				if((CS.vueObj.kanjo_detail[i]["tabindex"]==4 || CS.vueObj.kanjo_detail[i]["tabindex"]==3) && CS.vueObj.kanjo_detail[i]["tabindex"]!=set_kanjo_detail_2[j]["tabindex"]){
					continue;
				}
				if(set_kanjo_detail_2[j]["motoindex"]!=i){
					continue;
				}
				CS.vueObj.kanjo_detail[i]=set_kanjo_detail_2[j];
				CS.vueObj.$set(CS.vueObj.kanjo_detail, i, CS.vueObj.kanjo_detail[i]);
			}
		}
	}
	CS.itask_list_show_edit_window_kensan(4);
}
CS.kanjo_detail_delete=function(index){
	if(typeof CS.vueObj.kanjo_detail[index]["kanjo_info_id"] != "undefined" && CS.vueObj.kanjo_detail[index]["kanjo_info_id"]!="" && CS.vueObj.kanjo_detail[index]["kanjo_info_id"]!=null){
		CS.itask_list_show_edit_pana_delete_kanjo_id_list.push(CS.vueObj.kanjo_detail[index]["kanjo_info_id"]);
	}
	CS.vueObj.kanjo_detail.splice(index,1);
	CS.itask_list_show_edit_pana_resort_kanjo_detail();
}
CS.eqles_shotkey=function(shotkey,rule){
	var shotkey_=shotkey.split('_');
	var rule_=rule.split('_');
	var okflag=true;
	for(var i=0;i<rule_.length;i++){
		if(rule_[i]!="A" && rule_[i]!="s"){
			if(rule_[i]!=shotkey_[i]){
				okflag=false;
			}
		}
	}
	return okflag;
}
//合計しない科目の確認、適用
CS.delete_kensan_kanjo_detail=function(rule,i){
	//for (let key in CS.itask_tool_setedmap_index) {
		if(CS.itask_tool_setedmap_index[rule]==i){
			return true;
		}
	//}
	return false;
}
CS.set_kensan_kanjo_kensan_target=function(shotkey,rule,kanjo_detail,variety,i){
	var o=0;
	if(rule=="1_2_2_0"){
		o=-1;
	}
	if(CS.eqles_shotkey(shotkey,rule)){
		if((variety<=o && kanjo_detail['koteiitem']!="NG") || kanjo_detail['koteiitem']=="OK"){
			var rule_=rule.split('_');
			if((typeof rule_[4] == "undefined" && rule!="1_4_0_0") || (typeof rule_[4] == "undefined" && rule=="1_4_0_0" && parseInt(kanjo_detail["tabindex"],10)==4) || (rule_[4]=="s" && parseInt(kanjo_detail["tabindex"],10)!=4)){
				if(typeof CS.itask_tool_kensan_kanjo_kensan_target[rule] == "undefined" || CS.itask_tool_kensan_kanjo_kensan_target[rule]>variety){
					CS.itask_tool_kensan_kanjo_kensan_target_index[rule]=i;
					CS.itask_tool_kensan_kanjo_kensan_target[rule]=variety;
				}
			}
			if(rule=="1_2_0_0_0"){
				if(typeof CS.itask_tool_kensan_kanjo_kensan_target[rule] == "undefined" || CS.itask_tool_kensan_kanjo_kensan_target[rule]>variety){
					CS.itask_tool_kensan_kanjo_kensan_target_index[rule]=i;
					CS.itask_tool_kensan_kanjo_kensan_target[rule]=variety;
				}
			}
		}
	}
	return kanjo_detail;
}
CS.get_kensan_kanjo_detail=function(shotkey,rule,px,kanjo_detail,variety,i,amountname){
	var o=0;
	if(rule=="1_2_2_0"){
		o=-1;
	}
	if(CS.eqles_shotkey(shotkey,rule)){
		if((variety<=o && kanjo_detail['koteiitem']!="NG") || kanjo_detail['koteiitem']=="OK"){
			var rule_=rule.split('_');
			if((typeof rule_[4] == "undefined" && rule!="1_4_0_0") || (typeof rule_[4] == "undefined" && rule=="1_4_0_0" && parseInt(kanjo_detail["tabindex"],10)==4) || (rule_[4]=="s" && parseInt(kanjo_detail["tabindex"],10)!=4)){
				//if(typeof CS.itask_tool_setedmap[rule] == "undefined" || CS.itask_tool_setedmap[rule]>variety){
				//2023/07/05 12:03のメールを対応するため
				if(true){
					if(typeof px == "undefined" || px == NaN){
						px="";
					}
					if(typeof CS.itask_tool_setedmap_index[rule] != "undefined"){
						if(amountname=="zenki_keisan"){
							if(CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_index[rule]]["amount_pre_year"].toLocaleString()==px.toLocaleString()){
								return kanjo_detail;
							}
						}else{
							if(CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_index[rule]]["amount_this_year"].toLocaleString()==px.toLocaleString()){
								return kanjo_detail;
							}
						}
						CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_index[rule]][amountname]="";
					}
					CS.itask_tool_setedmap_index[rule]=i;
					//売上高合計
					kanjo_detail[amountname]=px.toLocaleString();
					CS.itask_tool_setedmap[rule]=variety;
				}
			}
		}
	}
	return kanjo_detail;
}
CS.itask_list_show_edit_window_pana_getvalue_forcode=function(kanjo_detail_list,target,pre_or_this,mf){
	var value=null;
	var oldvalue=null;
	for(var i=0;i<kanjo_detail_list.length;i++){
		var kanjo_detail=kanjo_detail_list[i];
		if(kanjo_detail["m_kanjo_code"]==target){
			if(kanjo_detail["amount_"+pre_or_this+"_year"].substr(0,1)=="4"){
				oldvalue = kanjo_detail["amount_"+pre_or_this+"_year"];
				value = kanjo_detail["amount_"+pre_or_this+"_year"].substr(1);
				if(mf){
					value = "-"+value;
				}
				
			}
		}
	}
	return [value,oldvalue];
}
CS.itask_list_show_edit_window_pana_setvalue_forcode=function(kanjo_detail_list,target,pre_or_this,value,changeflag){
	for(var i=0;i<kanjo_detail_list.length;i++){
		if(kanjo_detail_list[i]["m_kanjo_code"]==target){
			kanjo_detail_list[i]["amount_"+pre_or_this+"_year"]=value;
			if(changeflag){
				CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
			}else{
				CS.vueObj.kanjo_detail[i]["autochangeflag"]=null;
			}
		}
	}
	return kanjo_detail_list;
}
CS.itask_list_show_edit_window_pana_set_newgoukei=function(bs1,bs1_new,pre_or_this,rule,amountname,target){
	if(bs1!=bs1_new){
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			var kanjo_detail=CS.vueObj.kanjo_detail[i];
			var key=kanjo_detail["order"]+"_"+kanjo_detail["family"]+"_"+kanjo_detail["genus"]+"_"+kanjo_detail["variety"];
			var shotkey=kanjo_detail["order"]+"_"+kanjo_detail["family"]+"_"+kanjo_detail["genus"]+"_"+kanjo_detail["species"];
			var variety=parseInt(kanjo_detail["variety"],10);
			kanjo_detail[amountname]="";
			CS.get_kensan_kanjo_detail(shotkey,rule,bs1,kanjo_detail,variety,i,amountname);
		}
		if(typeof CS.itask_tool_setedmap_index[rule] != "undefined"){
			var setindex=CS.itask_tool_setedmap_index[rule];
			var oldnumber=parseInt(CS.vueObj.kanjo_detail[setindex]["amount_"+pre_or_this+"_year"].replaceAll(',', ''),10);
			var newnumber=bs1_new;
			var oldtext=oldnumber+"";
			var newtext=newnumber+"";
			if(Math.abs(newnumber)==Math.abs(oldnumber)){
				bs1=bs1_new;
			}else if(oldtext.substr(0,1)=="4" && Math.abs(parseInt(oldtext.substr(1),10)) == Math.abs(parseInt(newtext),10)){
				bs1=bs1_new;
			}
		}
		
	}
	return bs1;
}
CS.itask_list_show_edit_window_kensan_konjin=function(kikan){
	if(kikan==2){
		for(var i=1;i<5;i++){
			CS.vueObj.$set(CS.vueObj.itask_list_show_edit_pana_kensan_zenki, "a"+i, false);
		}
		return;
	}
	if(kikan==3){
		for(var i=1;i<5;i++){
			CS.vueObj.$set(CS.vueObj.itask_list_show_edit_pana_kensan_konki, "a"+i, false);
		}
		return;
	}
	if(kikan==0){
		//前期
		for(var i=1;i<5;i++){
			if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==i){
				CS.vueObj.$set(CS.vueObj.itask_list_show_edit_pana_kensan_zenki, "a"+i, true);
			}else{
				CS.vueObj.$set(CS.vueObj.itask_list_show_edit_pana_kensan_zenki, "a"+i, false);
			}
		}
	}else if(kikan==1){
		//今期
		for(var i=1;i<5;i++){
			if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==i){
				CS.vueObj.$set(CS.vueObj.itask_list_show_edit_pana_kensan_konki, "a"+i, true);
			}else{
				CS.vueObj.$set(CS.vueObj.itask_list_show_edit_pana_kensan_konki, "a"+i, false);
			}
		}
	}
	
	
	if(typeof CS.itask_list_show_edit_window_batch_B_flag == "undefined"){
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			CS.vueObj.kanjo_detail[i]["kanjyo_error"]=undefined;
			if(CS.vueObj.kanjo_detail[i]["genus"]=="999" || CS.vueObj.kanjo_detail[i]["genus"]==999 || CS.vueObj.kanjo_detail[i]["family"]=="999" || CS.vueObj.kanjo_detail[i]["family"]==999 || CS.vueObj.kanjo_detail[i]["variety"]=="999" || CS.vueObj.kanjo_detail[i]["variety"]==999){
				if(CS.vueObj.kanjo_detail[i]['amount_this_year']!=null && CS.vueObj.kanjo_detail[i]['amount_this_year']!="" && CS.vueObj.kanjo_detail[i]['amount_this_year']!="0"){
					CS.vueObj.kanjo_detail[i]["kanjyo_error"]="NG";
				}else{
					CS.vueObj.kanjo_detail[i]["kanjyo_error"]=undefined;
				}
			}
		}
		
	}

	
	
	CS.vueObj.itask_list_show_edit_pana_tag_button_red1=2;
	CS.vueObj.itask_list_show_edit_pana_tag_button_red2=2;
	CS.vueObj.itask_list_show_edit_pana_tag_button_red3=2;
	CS.vueObj.itask_list_show_edit_pana_tag_button_red4=2;
	CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red1=2;
	CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red2=2;
	CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red3=2;
	CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red4=2;
	CS.itask_tool_kensan_kanjo_kensan_target={};
	CS.itask_tool_kensan_kanjo_kensan_target_index={};
	
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		if(i>=24 && i<=29){
			CS.vueObj.kanjo_detail[i]["kotei"]="";
		}else if(i>=34 && i<=35){
			CS.vueObj.kanjo_detail[i]["kotei"]="";
		}else if(i>=39 && i<=40){
			CS.vueObj.kanjo_detail[i]["kotei"]="";
		}else if(i>=61 && i<=67){
			CS.vueObj.kanjo_detail[i]["kotei"]="";
		}else if(i>=76 && i<=82){
			CS.vueObj.kanjo_detail[i]["kotei"]="";
		}else if(i>=84 && i<=90){
			CS.vueObj.kanjo_detail[i]["kotei"]="";
		}else{
			CS.vueObj.kanjo_detail[i]["kotei"]="kotei"+i;
		}
		CS.vueObj.kanjo_detail[i]["konki_keisan"]="";
		CS.vueObj.kanjo_detail[i]["konki_sagaku"]="";
	}
	//売上原価小計
	var p1= CS.itask_list_show_edit_window_kensan_konjin_sum(1,2,NaN,NaN,NaN,2);
	if(typeof p1[0]!="undefined" && !isNaN(p1[0])){
		CS.vueObj.kanjo_detail[3]["konki_keisan"]=p1[0].toLocaleString();
	}else{
		CS.vueObj.kanjo_detail[3]["konki_keisan"]="";
	}
	//差引原価
	var p2= CS.itask_list_show_edit_window_kensan_konjin_sum(4,4,NaN,NaN,p1[0],2);
	if(typeof p2[0]!="undefined" && !isNaN(p2[0])){
		CS.vueObj.kanjo_detail[5]["konki_keisan"]=p2[0].toLocaleString();
	}else{
		CS.vueObj.kanjo_detail[5]["konki_keisan"]="";
	}
	//差引金額
	var p3= CS.itask_list_show_edit_window_kensan_konjin_sum(0,0,NaN,p2[0],NaN,2);
	if(typeof p3[0]!="undefined" && !isNaN(p3[0])){
		CS.vueObj.kanjo_detail[6]["konki_keisan"]=p3[0].toLocaleString();
	}else{
		CS.vueObj.kanjo_detail[6]["konki_keisan"]="";
	}
	//経費の計
	var p4= CS.itask_list_show_edit_window_kensan_konjin_sum(7,30,NaN,NaN,NaN,2);
	if(typeof p4[0]!="undefined" && !isNaN(p4[0])){
		CS.vueObj.kanjo_detail[31]["konki_keisan"]=p4[0].toLocaleString();
	}else{
		CS.vueObj.kanjo_detail[31]["konki_keisan"]="";
	}
	//経費の差し替え金額
	var p5= CS.itask_list_show_edit_window_kensan_konjin_sum(-1,-1,NaN,p4[0],p3[0],2);
	if(typeof p5[0]!="undefined" && !isNaN(p5[0])){
		CS.vueObj.kanjo_detail[32]["konki_keisan"]=p5[0].toLocaleString();
	}else{
		CS.vueObj.kanjo_detail[32]["konki_keisan"]="";
	}
	//繰戻額等の計
	var p6= CS.itask_list_show_edit_window_kensan_konjin_sum(33,35,NaN,NaN,NaN,2);
	if(typeof p6[0]!="undefined" && !isNaN(p6[0])){
		CS.vueObj.kanjo_detail[36]["konki_keisan"]=p6[0].toLocaleString();
	}else{
		CS.vueObj.kanjo_detail[36]["konki_keisan"]="";
	}
	//繰入額等の計
	var p7= CS.itask_list_show_edit_window_kensan_konjin_sum(37,40,NaN,NaN,NaN,2);
	if(typeof p7[0]!="undefined" && !isNaN(p7[0])){
		CS.vueObj.kanjo_detail[41]["konki_keisan"]=p7[0].toLocaleString();
	}else{
		CS.vueObj.kanjo_detail[41]["konki_keisan"]="";
	}
	//青色申告特別控除前の所得金額
	var p8= CS.itask_list_show_edit_window_kensan_konjin_sum(-1,-1,p5[0],NaN,p6[0],2);
	var p9= CS.itask_list_show_edit_window_kensan_konjin_sum(-1,-1,NaN,p7[0],p8[0],2);
	if(typeof p9[0]!="undefined" && !isNaN(p9[0])){
		CS.vueObj.kanjo_detail[42]["konki_keisan"]=p9[0].toLocaleString();
	}else{
		CS.vueObj.kanjo_detail[42]["konki_keisan"]="";
	}
	//所得金額
	var p10= CS.itask_list_show_edit_window_kensan_konjin_sum(43,43,NaN,NaN,p9[0],2);
	if(typeof p10[0]!="undefined" && !isNaN(p10[0])){
		CS.vueObj.kanjo_detail[44]["konki_keisan"]=p10[0].toLocaleString();
	}else{
		CS.vueObj.kanjo_detail[44]["konki_keisan"]="";
	}
	//純資産の部合計
	var p11= CS.itask_list_show_edit_window_kensan_konjin_sum(45-45,68-45,NaN,NaN,NaN,1);
	if(typeof p11[0]!="undefined" && !isNaN(p11[0])){
		CS.vueObj.kanjo_detail[69]["konki_keisan"]=p11[0].toLocaleString();
	}else{
		CS.vueObj.kanjo_detail[69]["konki_keisan"]="";
	}
	//負債・純資産の部合計
	var p12= CS.itask_list_show_edit_window_kensan_konjin_sum(70-45,93-45,NaN,NaN,NaN,1);
	if(typeof p11[0]!="undefined" && !isNaN(p11[0])){
		CS.vueObj.kanjo_detail[94]["konki_keisan"]=p12[0].toLocaleString();
	}else{
		CS.vueObj.kanjo_detail[94]["konki_keisan"]="";
	}
	var amount="amount_this_year";
	var keisan="konki_keisan";
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		if(typeof CS.vueObj.kanjo_detail[i]["konki_keisan"]!="undefined" && CS.vueObj.kanjo_detail[i]["konki_keisan"]!=null && CS.vueObj.kanjo_detail[i]["konki_keisan"]!="" && CS.vueObj.kanjo_detail[i]["amount_this_year"]!=CS.vueObj.kanjo_detail[i]["konki_keisan"]){
			CS.vueObj.kanjo_detail[i]["konki_sagaku"]=parseInt(CS.vueObj.kanjo_detail[i]["konki_keisan"].replaceAll(',', ''))-parseInt(CS.vueObj.kanjo_detail[i]["amount_this_year"].replaceAll(',', ''));
			if(isNaN(CS.vueObj.kanjo_detail[i]["konki_sagaku"]) && (CS.vueObj.kanjo_detail[i]["amount_this_year"]=="" || CS.vueObj.kanjo_detail[i]["amount_this_year"]==null)){
				CS.vueObj.kanjo_detail[i]["konki_sagaku"]=0-parseInt(CS.vueObj.kanjo_detail[i]["konki_keisan"].replaceAll(',', ''));
			}else{
				if(CS.vueObj.kanjo_detail[i]["konki_sagaku"]>0){
					CS.vueObj.kanjo_detail[i]["konki_sagaku"]="+"+CS.vueObj.kanjo_detail[i]["konki_sagaku"].toLocaleString();
				}else{
					CS.vueObj.kanjo_detail[i]["konki_sagaku"]=CS.vueObj.kanjo_detail[i]["konki_sagaku"].toLocaleString();
				}
			}
			if(CS.vueObj.kanjo_detail[i]["konki_sagaku"]==0 || CS.vueObj.kanjo_detail[i]["konki_sagaku"]=="0"){
				if(CS.vueObj.kanjo_detail[i]["amount_this_year"]=="" || CS.vueObj.kanjo_detail[i]["amount_this_year"]==null){
					delete CS.vueObj.kanjo_detail[i]["konki_sagaku"];
					//delete CS.vueObj.kanjo_detail[i]["konki_keisan"];
				}
			}
			if(i<45){
				CS.vueObj.itask_list_show_edit_pana_tag_button_red2=3;
			}else if(i<95){
				CS.vueObj.itask_list_show_edit_pana_tag_button_red1=3;
			}else{
				CS.vueObj.itask_list_show_edit_pana_tag_button_red3=3;
			}
		}else{
			CS.vueObj.kanjo_detail[i]["konki_sagaku"]=null;
		}
		if(typeof CS.vueObj.kanjo_detail[i]["kanjyo_error"] !="undefined"){
			if(i<45){
				CS.vueObj.itask_list_show_edit_pana_tag_button_red2=3;
			}else if(i<95){
				CS.vueObj.itask_list_show_edit_pana_tag_button_red1=3;
			}else{
				CS.vueObj.itask_list_show_edit_pana_tag_button_red3=3;
			}
		}
		CS.vueObj.kanjo_detail[i][amount]=CS.vueObj.kanjo_detail[i][amount]+"";
		if(!isNaN(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10))){
			if(kikan==5){
				CS.vueObj.kanjo_detail[i][amount]=parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10).toLocaleString();
				if(typeof CS.vueObj.kanjo_detail[i][keisan]!="undefined" && CS.vueObj.kanjo_detail[i][keisan]!=null && CS.vueObj.kanjo_detail[i][keisan]!=""){
					var oldnumber=parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10);
					var newnumber=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10);
					if(oldnumber == -1*newnumber){
						CS.vueObj.kanjo_detail[i][amount]=newnumber.toLocaleString();
						CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
					}
				}
			}
		}
		CS.vueObj.$set(CS.vueObj.kanjo_detail, i, CS.vueObj.kanjo_detail[i]);
	}
	if(CS.vueObj.itask_list_show_edit_pana_seisa_over1){
		CS.vueObj.itask_list_show_edit_pana_tag_button_red1=4;
	}
	if(CS.vueObj.itask_list_show_edit_pana_seisa_over2){
		CS.vueObj.itask_list_show_edit_pana_tag_button_red2=4;
	}
	if(CS.vueObj.itask_list_show_edit_pana_seisa_over3){
		CS.vueObj.itask_list_show_edit_pana_tag_button_red3=4;
	}
}
CS.itask_list_show_edit_window_kensan_konjin_sum=function(from,to,add,del,big,targetTabinde){
	let sum_amount_this_year="A" ;let sum_amount_pre_year="A";let goukei_kingaku_param=1;let sum_count =0;let daburi_flg=0;var tmp=0;let futsuu_kamoku_flg=0;let goukei_kamoku_flg=0;
	data=[];
	o=-1;
	for (var i=0; i< CS.vueObj.kanjo_detail.length;i++){
		if(targetTabinde+"" != CS.vueObj.kanjo_detail[i]['tabindex']){
			continue;
		}
		if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
			continue;
		}
		o++;
		if(o<from | o>to){
			continue;
		}
		data[i]={};
		data[i]['candidate']=[];
		data[i]['candidate'][0]={};
		data[i]['candidate'][0]['order']=parseInt(CS.vueObj.kanjo_detail[i]['order'],10);
		data[i]['candidate'][0]['family']=parseInt(CS.vueObj.kanjo_detail[i]['family'],10);
		data[i]['candidate'][0]['genus']=parseInt(CS.vueObj.kanjo_detail[i]['genus'],10);
		data[i]['candidate'][0]['variety']=parseInt(CS.vueObj.kanjo_detail[i]['variety'],10);
		data[i]['candidate'][0]['species']=parseInt(CS.vueObj.kanjo_detail[i]['species'],10);
		data[i]['candidate'][0]['property']=parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
		data[i]['m_kanjo_code']=CS.vueObj.kanjo_detail[i]['m_kanjo_code'];
		data[i]['amount_this_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_this_year']+"").replaceAll(',', ''),10);
		data[i]['amount_pre_year']=parseInt((CS.vueObj.kanjo_detail[i]['amount_pre_year']+"").replaceAll(',', ''),10);
		sum_amount_this_year=parseInt(sum_amount_this_year,10) ;
		if(!isNaN(sum_amount_pre_year) || !isNaN(data[i]['amount_pre_year'])){
			if(isNaN(sum_amount_pre_year)){
				sum_amount_pre_year=0;
			}
			if(isNaN(data[i]['amount_pre_year'])){
				data[i]['amount_pre_year']=0;
			}
		}
		if(!isNaN(sum_amount_this_year) || !isNaN(data[i]['amount_this_year'])){
			if(isNaN(sum_amount_this_year)){
				sum_amount_this_year=0;
			}
			if(isNaN(data[i]['amount_this_year'])){
				data[i]['amount_this_year']=0;
			}
		}
		var sankaku=[];
		sankaku.push('2_10_4_8_1');
		sankaku.push('2_20_3_4_1');
		sankaku.push('2_20_1_7_2');
		sankaku.push('2_10_2_0_3');
		if(CS.vueObj.kanjo_detail[i]["kotei"].indexOf('kotei')==-1 && sankaku.indexOf(data[i]['m_kanjo_code'])!=-1 && i!=83){
			sum_amount_this_year-=Math.abs(parseInt(data[i]['amount_this_year'],10)) ;
			sum_amount_pre_year-=Math.abs(parseInt(data[i]['amount_pre_year'],10)) ;
		}else if((i<70 || i>94) && data[i]['m_kanjo_code']=="2_20_1_7_1"){
			sum_amount_this_year-=Math.abs(parseInt(data[i]['amount_this_year'],10)) ;
			sum_amount_pre_year-=Math.abs(parseInt(data[i]['amount_pre_year'],10)) ;
		}else{
			sum_amount_this_year+=parseInt(data[i]['amount_this_year'],10) ;
			sum_amount_pre_year+=parseInt(data[i]['amount_pre_year'],10) ;
		}
		
		sum_count +=1;
    }
	if(sum_count==0){
		sum_amount_this_year="";
		sum_amount_pre_year="";
	}
	if(isNaN(sum_amount_this_year)){
		sum_amount_this_year="";
	}
	if(isNaN(sum_amount_pre_year)){
		sum_amount_pre_year="";
	}
	if(!isNaN(big) && big!=""){
		if(isNaN(sum_amount_this_year) || sum_amount_this_year==""){
			sum_amount_this_year=big;
		}else{
			sum_amount_this_year=big-sum_amount_this_year;
		}
	}else if(!isNaN(big)){
		if(isNaN(sum_amount_this_year) || sum_amount_this_year==""){
			sum_amount_this_year="";
		}else{
			sum_amount_this_year=0-sum_amount_this_year;
		}
	}
	if(!isNaN(add) && add!=""){
		if(isNaN(sum_amount_this_year) || sum_amount_this_year==""){
			sum_amount_this_year=add;
		}else{
			sum_amount_this_year+=add;
		}
	}
	if(!isNaN(del) && del!=""){
		if(isNaN(sum_amount_this_year) || sum_amount_this_year==""){
			sum_amount_this_year=0-del;
		}else{
			sum_amount_this_year-=del;
		}
	}
    return [sum_amount_this_year,sum_amount_pre_year]
}
CS.itask_list_show_edit_window_irekae=function(){
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		var doflag=false;
		if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
			if(CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)<40 ){
				if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
					doflag=true;
				}
			}
			if(CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)>=40 ){
				if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
					doflag=true;
				}
			}
			if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)!=4 ){
				if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
					doflag=true;
				}
			}
			if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)==4 ){
				if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==4){
					doflag=true;
				}
			}
		}else{
			if(i<45){
				if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
					doflag=true;
				}
			}else if(i<95){
				if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
					doflag=true;
				}
			}else{
				if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
					doflag=true;
				}
			}
		}
		if(doflag){
			var amount_pre_year=CS.vueObj.kanjo_detail[i]['amount_pre_year'];
			CS.vueObj.kanjo_detail[i]['amount_pre_year']=CS.vueObj.kanjo_detail[i]['amount_this_year'];
			CS.vueObj.kanjo_detail[i]['amount_this_year']=amount_pre_year;
			CS.vueObj.kanjo_detail[i]["changeflag"]=true;
		}
	}
	CS.itask_list_show_edit_window_kensan(5);
}
CS.get_itask_tool_setedmap_index=function(shotkey,rule,px,kanjo_detail,variety,i){
	var o=0;
	if(rule=="1_2_2_0"){
		o=-1;
	}
	if(CS.eqles_shotkey(shotkey,rule)){
		if((variety<=o && kanjo_detail['koteiitem']!="NG") || kanjo_detail['koteiitem']=="OK"){
			var rule_=rule.split('_');
			if((typeof rule_[4] == "undefined" && rule!="1_4_0_0") || (typeof rule_[4] == "undefined" && rule=="1_4_0_0" && parseInt(kanjo_detail["tabindex"],10)==4) || (rule_[4]=="s" && parseInt(kanjo_detail["tabindex"],10)!=4)){
				CS.itask_tool_setedmap_index[rule]=i;
			}
		}
	}
}
CS.get_itask_tool_setedmap_sub_index=function(shotkey,rule,px,kanjo_detail,variety,i){
	var exlist=[];
	exlist.push("2_70_3_1");
	exlist.push("2_70_3_2");
	exlist.push("2_20_1_0");
	exlist.push("2_20_2_0");
	exlist.push("2_20_3_0");
	if(exlist.includes(shotkey)){
		return;
	}
	var shotkey_=shotkey.split('_');
	var doflag=false;
	if(CS.toI(shotkey_[3])>0 && CS.itask_list_show_edit_window_pana_is_goukei(CS.vueObj.kanjo_detail[i],CS.vueObj.kanjo_detail[i])){
		doflag=true;
	}
	//20241127　検算除外項目は合計項目として認めない
	if(CS.vueObj.kanjo_detail[i]['kenzankaijyo']){
		doflag=false;
	}
	if(doflag){
		if(typeof CS.itask_tool_setedmap_sub_index[shotkey] != "undefined" && CS.itask_tool_setedmap_sub_index[shotkey]!=null){
			CS.vueObj.exmessage_flag1="01";
		}
		CS.itask_tool_setedmap_sub_index[shotkey]=i;
	}
}
//検算メソッド
CS.itask_list_show_edit_window_kensan=function(kikan){
	CS.vueObj.exmessage_flag1=undefined;
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		CS.itask_tool_setedmap_index={};
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			var kanjo_detail=CS.vueObj.kanjo_detail[i];
			var key=kanjo_detail["order"]+"_"+kanjo_detail["family"]+"_"+kanjo_detail["genus"]+"_"+kanjo_detail["variety"];
			var shotkey=kanjo_detail["order"]+"_"+kanjo_detail["family"]+"_"+kanjo_detail["genus"]+"_"+kanjo_detail["species"];
			var variety=parseInt(kanjo_detail["variety"],10);
			//損益計算書
			CS.get_itask_tool_setedmap_index(shotkey,"1_1_0_0",pl1,kanjo_detail,variety,i);
			//CS.get_itask_tool_setedmap_index(shotkey,"1_2_2_0",pl2,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"1_2_0_0",pl3,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"1_3_0_0",pl4,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"1_4_0_0",pl5,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"1_4_0_0_s",pl5_s,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"1_5_0_0",pl6,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"1_6_0_0",pl7,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"1_7_0_0",pl8,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"1_8_0_0",pl9,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"1_9_0_0",pl10,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"1_10_0_0",pl11,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"1_11_0_0",pl12,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"1_12_0_0",pl13,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"1_13_0_0",pl14,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_10_0_0",bs1,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_20_1_0",bs2,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_20_2_0",bs3,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_20_3_0",bs4,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_30_0_0",bs5,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_20_0_0",bs6,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_35_0_0",bs7,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_40_0_0",bs8,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_50_0_0",bs9,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_60_0_0",bs10,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_70_1_0",bs11,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_70_2_0",bs12,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_70_3_1",bs13,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_70_3_2",bs14,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_70_3_0",bs15,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_70_6_3",bs18,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_70_0_0",bs19,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_80_0_0",bs20,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_90_0_0",bs21,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_100_0_0",bs22,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_110_0_0",bs23,kanjo_detail,variety,i);
			CS.get_itask_tool_setedmap_index(shotkey,"2_120_0_0",bs24,kanjo_detail,variety,i);
		}
	}else{
		CS.itask_tool_setedmap_sub_index={};
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			var kanjo_detail=CS.vueObj.kanjo_detail[i];
			var key=kanjo_detail["order"]+"_"+kanjo_detail["family"]+"_"+kanjo_detail["genus"]+"_"+kanjo_detail["variety"];
			var shotkey=kanjo_detail["order"]+"_"+kanjo_detail["family"]+"_"+kanjo_detail["genus"]+"_"+kanjo_detail["species"];
			var variety=parseInt(kanjo_detail["variety"],10);
			CS.get_itask_tool_setedmap_sub_index(shotkey,null,null,kanjo_detail,variety,i);
		}
	}

	
	
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1 && kikan!=8 ){
		CS.itask_list_show_edit_window_kensan_konjin(kikan);
		return;
	}
	
	if(typeof CS.itask_list_show_edit_window_batch_B_flag == "undefined"){
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			CS.vueObj.kanjo_detail[i]["kanjyo_error"]=undefined;
			if(CS.vueObj.kanjo_detail[i]["genus"]=="999" || CS.vueObj.kanjo_detail[i]["genus"]==999 || CS.vueObj.kanjo_detail[i]["family"]=="999" || CS.vueObj.kanjo_detail[i]["family"]==999 || CS.vueObj.kanjo_detail[i]["variety"]=="999" || CS.vueObj.kanjo_detail[i]["variety"]==999){
				if(CS.vueObj.kanjo_detail[i]['amount_pre_year']!=null && CS.vueObj.kanjo_detail[i]['amount_pre_year']!="" && CS.vueObj.kanjo_detail[i]['amount_pre_year']!="0"){
					CS.vueObj.kanjo_detail[i]["kanjyo_error"]="NG";
				}else if(CS.vueObj.kanjo_detail[i]['amount_this_year']!=null && CS.vueObj.kanjo_detail[i]['amount_this_year']!="" && CS.vueObj.kanjo_detail[i]['amount_this_year']!="0"){
					CS.vueObj.kanjo_detail[i]["kanjyo_error"]="NG";
				}
			}
		}
	}

	
	
	
	
	
	var amout="amount_pre_year";
	if(kikan==2){
		for(var i=1;i<5;i++){
			CS.vueObj.$set(CS.vueObj.itask_list_show_edit_pana_kensan_zenki, "a"+i, false);
		}
		var konkiflag=false;
		for(var i=1;i<5;i++){
			if(CS.vueObj.itask_list_show_edit_pana_kensan_konki["a"+i]){
				konkiflag=true;
			}
		}
		if(konkiflag){
			CS.vueObj.itask_list_show_edit_pana_irekae_number=3;
		}else{
			CS.vueObj.itask_list_show_edit_pana_irekae_number=2;
		}
		return;
	}
	if(kikan==3){
		for(var i=1;i<5;i++){
			CS.vueObj.$set(CS.vueObj.itask_list_show_edit_pana_kensan_konki, "a"+i, false);
		}
		var zenkiflag=false;
		for(var i=1;i<5;i++){
			if(CS.vueObj.itask_list_show_edit_pana_kensan_zenki["a"+i]){
				zenkiflag=true;
			}
		}
		if(zenkiflag){
			CS.vueObj.itask_list_show_edit_pana_irekae_number=3;
		}else{
			CS.vueObj.itask_list_show_edit_pana_irekae_number=2;
		}
		return;
	}
	if(kikan==0){
		//前期
		for(var i=1;i<5;i++){
			if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==i){
				CS.vueObj.$set(CS.vueObj.itask_list_show_edit_pana_kensan_zenki, "a"+i, true);
			}else{
				CS.vueObj.$set(CS.vueObj.itask_list_show_edit_pana_kensan_zenki, "a"+i, false);
			}
		}
		var konkiflag=false;
		for(var i=1;i<5;i++){
			if(CS.vueObj.itask_list_show_edit_pana_kensan_konki["a"+i]){
				konkiflag=true;
			}
		}
		if(konkiflag){
			CS.vueObj.itask_list_show_edit_pana_irekae_number=4;
		}else{
			CS.vueObj.itask_list_show_edit_pana_irekae_number=3;
		}
	}else if(kikan==1){
		//今期
		for(var i=1;i<5;i++){
			if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==i){
				CS.vueObj.$set(CS.vueObj.itask_list_show_edit_pana_kensan_konki, "a"+i, true);
			}else{
				CS.vueObj.$set(CS.vueObj.itask_list_show_edit_pana_kensan_konki, "a"+i, false);
			}
		}
		var zenkiflag=false;
		for(var i=1;i<5;i++){
			if(CS.vueObj.itask_list_show_edit_pana_kensan_zenki["a"+i]){
				zenkiflag=true;
			}
		}
		if(zenkiflag){
			CS.vueObj.itask_list_show_edit_pana_irekae_number=4;
		}else{
			CS.vueObj.itask_list_show_edit_pana_irekae_number=3;
		}
	}
	
	CS.itask_tool_kensan_kanjo_kensan_target={};
	CS.itask_tool_kensan_kanjo_kensan_target_index={};
	// （パターン３）売上原価＝商品売上原価＋製品売上原価 2023/07/05 12:03 メール
	var patton3flag=0;
	var dedlist=["1_2_2_1_0","1_2_0_0_-8"];
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		if((CS.vueObj.kanjo_detail[i]["variety"]<=0 && CS.vueObj.kanjo_detail[i]["koteiitem"]!='NG') || CS.vueObj.kanjo_detail[i]["koteiitem"]=='OK'){
			CS.vueObj.kanjo_detail[i]["koteiitemflag"]=true;
		}else{
			CS.vueObj.kanjo_detail[i]["koteiitemflag"]=false;
		}
		var kanjo_detail=CS.vueObj.kanjo_detail[i];
		var key=kanjo_detail["order"]+"_"+kanjo_detail["family"]+"_"+kanjo_detail["genus"]+"_"+kanjo_detail["species"]+"_"+kanjo_detail["variety"];
		var shotkey=kanjo_detail["order"]+"_"+kanjo_detail["family"]+"_"+kanjo_detail["genus"]+"_"+kanjo_detail["species"];
		var variety=parseInt(kanjo_detail["variety"],10);
		for(j=1;j>=0;j--){
			if(dedlist[j]==key){
				patton3flag++;
				dedlist.splice( j, 1 );
			}
		}
		//損益計算書
		CS.set_kensan_kanjo_kensan_target(shotkey,"1_1_0_0",kanjo_detail,variety,i);
		//CS.set_kensan_kanjo_kensan_target(shotkey,"1_2_2_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"1_2_4_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"1_2_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(key,"1_2_0_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"1_3_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"1_4_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"1_4_0_0_s",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"1_5_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"1_6_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"1_7_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"1_8_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"1_9_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"1_10_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"1_11_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"1_13_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_10_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_20_1_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_20_2_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_20_3_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_30_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_20_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_35_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_40_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_50_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_60_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_70_1_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_70_2_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_70_3_1",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_70_3_2",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_70_3_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_70_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_80_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_90_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_100_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_110_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_120_0_0",kanjo_detail,variety,i);
		CS.set_kensan_kanjo_kensan_target(shotkey,"2_10_1_1",kanjo_detail,variety,i);
	}
	
	
	var autochangeflag=false;
	var zenki_kanjo_detail={};
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		var kanjo_detail=CS.vueObj.kanjo_detail[i];
		var key=kanjo_detail["order"]+"_"+kanjo_detail["family"]+"_"+kanjo_detail["genus"]+"_"+kanjo_detail["variety"];
		zenki_kanjo_detail[key]=i;
		if(CS.vueObj.kanjo_detail[i]['abc_flag']){
			// CS.vueObj.kanjo_detail[i]['amount_this_year']=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
			// CS.vueObj.kanjo_detail[i]['amount_pre_year']=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
			// if(!isNaN(CS.vueObj.kanjo_detail[i]['amount_this_year'])){
				// CS.vueObj.kanjo_detail[i]['amount_this_year']=-1*Math.abs(CS.vueObj.kanjo_detail[i]['amount_this_year']);
				// CS.vueObj.kanjo_detail[i]['amount_this_year']=CS.vueObj.kanjo_detail[i]['amount_this_year'].toLocaleString();
			// }else{
				// CS.vueObj.kanjo_detail[i]['amount_this_year']="";
			// }
			// if(!isNaN(CS.vueObj.kanjo_detail[i]['amount_pre_year'])){
				// CS.vueObj.kanjo_detail[i]['amount_pre_year']=-1*Math.abs(CS.vueObj.kanjo_detail[i]['amount_pre_year']);
				// CS.vueObj.kanjo_detail[i]['amount_pre_year']=CS.vueObj.kanjo_detail[i]['amount_pre_year'].toLocaleString();
			// }else{
				// CS.vueObj.kanjo_detail[i]['amount_pre_year']="";
			// }
		}
		if(CS.vueObj.kanjo_detail[i]['m_kanjo_code']=='2_10_4_8_1' || CS.vueObj.kanjo_detail[i]['m_kanjo_code']=='2_20_3_4_1' || CS.vueObj.kanjo_detail[i]['m_kanjo_code']=='2_20_1_7_2' || CS.vueObj.kanjo_detail[i]['m_kanjo_code']=='2_20_1_7_1' ){
			CS.vueObj.kanjo_detail[i]['amount_this_year']=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
			CS.vueObj.kanjo_detail[i]['amount_pre_year']=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
			if(!isNaN(CS.vueObj.kanjo_detail[i]['amount_this_year']) && CS.vueObj.kanjo_detail[i]['amount_this_year']!=""){
				CS.vueObj.kanjo_detail[i]['amount_this_year']=Math.abs(CS.vueObj.kanjo_detail[i]['amount_this_year']);
				CS.vueObj.kanjo_detail[i]['amount_this_year']=CS.vueObj.kanjo_detail[i]['amount_this_year'].toLocaleString();
			}else{
				CS.vueObj.kanjo_detail[i]['amount_this_year']="";
			}
			if(!isNaN(CS.vueObj.kanjo_detail[i]['amount_pre_year']) && CS.vueObj.kanjo_detail[i]['amount_pre_year']!=""){
				CS.vueObj.kanjo_detail[i]['amount_pre_year']=Math.abs(CS.vueObj.kanjo_detail[i]['amount_pre_year']);
				CS.vueObj.kanjo_detail[i]['amount_pre_year']=CS.vueObj.kanjo_detail[i]['amount_pre_year'].toLocaleString();
			}else{
				CS.vueObj.kanjo_detail[i]['amount_pre_year']="";
			}
		}
	}
	//貸倒引当金2_10_4_8_1の先頭が4で、流動資産の検算に差額が出ている場合、その4を削除して検算が〇になれば、4を削除
	var pre_or_this="pre";
	var amountname="zenki_keisan";
	/////////////////////////////////////////////////////////////
	var pppppp=1;
	var T1_2_4_0="";
	if(typeof CS.itask_tool_kensan_kanjo_kensan_target_index["1_2_4_0"]!="undefined"){
		T1_2_4_0=CS.vueObj.kanjo_detail[CS.itask_tool_kensan_kanjo_kensan_target_index["1_2_4_0"]]['amount_'+pre_or_this+'_year'];
		T1_2_4_0=CS.toI(T1_2_4_0);
		if(isNaN(T1_2_4_0)){
			T1_2_4_0="";
		}
	}
	var T1_2_0_0_0="";
	if(typeof CS.itask_tool_kensan_kanjo_kensan_target_index["1_2_0_0_0"]!="undefined"){
		T1_2_0_0_0=CS.vueObj.kanjo_detail[CS.itask_tool_kensan_kanjo_kensan_target_index["1_2_0_0_0"]]['amount_'+pre_or_this+'_year'];
		T1_2_0_0_0=CS.toI(T1_2_0_0_0);
		if(isNaN(T1_2_0_0_0)){
			T1_2_0_0_0="";
		}
	}
	CS.edit_window_kensan_pl_0={};
	// 完成工事売上高: 1_1_2%
	// 兼業事業売上高:1_1_0_5%
	// 兼業事業売上原価:1_2_6%
	// 完成工事原価:1_2_7_0_0
	//損益計算書
	var pl1=CS.itask_list_show_edit_window_pana_calc_sum_f(1,1,)[pppppp];
	// 売上原価　＝　通常の売上原価＋完成工事原価+　兼業事業売上原価
	var pl2= - CS.itask_list_show_edit_window_pana_calc_sum(1,2,0,-2,)[pppppp] - CS.itask_list_show_edit_window_pana_get_one(1,2,7,0,0)[pppppp]  - CS.itask_list_show_edit_window_pana_calc_sum(1,2,6,0,)[pppppp] - CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,-1,)[pppppp] - CS.itask_list_show_edit_window_pana_calc_sum(1,2,5,0,)[pppppp];//合計            番号:1_2_2_-1  
	var pl2_2= - CS.itask_list_show_edit_window_pana_calc_sum(1,2,0,-2,)[pppppp] -CS.itask_list_show_edit_window_pana_calc_sum(1,2,1,0,)[pppppp] - CS.itask_list_show_edit_window_pana_get_one(1,2,7,0,0)[pppppp]  - CS.itask_list_show_edit_window_pana_calc_sum(1,2,6,0,)[pppppp] - CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,-1,)[pppppp] - CS.itask_list_show_edit_window_pana_calc_sum(1,2,5,0,)[pppppp];//合計            番号:1_2_2_-1  
	var T5=CS.itask_list_show_edit_window_pana_calc_sum(1,2,1,0,)[pppppp];
	var T6=CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,-1,)[pppppp];
	var T6_2=CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,-1,)[pppppp];
	var T7=CS.itask_list_show_edit_window_pana_calc_sum(1,2,6,0,)[pppppp];
	var T8=CS.itask_list_show_edit_window_pana_get_one(1,2,7,0,0)[pppppp];
	var T9=CS.itask_list_show_edit_window_pana_calc_sum(1,2,0,-2,)[pppppp];
	var T10=CS.itask_list_show_edit_window_pana_calc_sum(1,2,5,0,)[pppppp]
	
	if(T6=="" && T7=="" && T8=="" && T9=="" && T10==""){
		pl2="";
	}else if(T6=="" || T7=="" || T8=="" || T9=="" || T10==""){
		if(T6==""){
			T6=0;
		}
		if(T7==""){
			T7=0;
		}
		if(T8==""){
			T8=0;
		}
		if(T9==""){
			T9=0;
		}
		if(T10==""){
			T10=0;
		}
		pl2=0 - T6 - T7 - T8 - T9 - T10;
	}
	if(T5=="" && T6=="" && T7=="" && T8=="" && T9==""){
		pl2_2="";
	}else if(T5=="" || T6_2=="" || T7=="" || T8=="" || T9==""){
		if(T5==""){
			T5=0;
		}
		if(T6_2==""){
			T6_2=0;
		}
		if(T7==""){
			T7=0;
		}
		if(T8==""){
			T8=0;
		}
		if(T9==""){
			T9=0;
		}
		if(T10==""){
			T10=0;
		}
		pl2_2=0 - T5 - T6_2 - T7 - T8 - T9 - T10;
	}
	if(patton3flag>1){
		pl2_2="";
		var pl3=CS.itask_list_show_edit_window_pana_calc_sum_pattern3()[pppppp];
	}else{
		// 売上原価　＝　通常の売上原価＋完成工事原価+　兼業事業売上原価
		var pl3=pl2_2 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp];//売上原価                           番号:1_2_0_0
		if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp]=="" && pl2_2==""){
			pl3="";
		}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp]!="" && pl2_2==""){
			pl3=0 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp];
		}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp]=="" && pl2_2!=""){
			pl3=pl2_2;
		}
		
		var target="1_2_3_0_5";
		var rule="1_2_0_0";
		if(kikan==5){
			//４を消した数字、古い数字
			var another_value = CS.itask_list_show_edit_window_pana_getvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,false);
			if(another_value[0]!=null){
				CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[0],true);
				//新しいbs1値
				var bs_new=pl2_2 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp];//売上原価                           番号:1_2_0_0
				if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp]=="" && pl2_2==""){
					bs_new="";
				}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp]!="" && pl2_2==""){
					bs_new=0 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp];
				}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp]=="" && pl2_2!=""){
					bs_new=pl2_2;
				}
				pl3=CS.itask_list_show_edit_window_pana_set_newgoukei(bs1,bs1_new,pre_or_this,rule,amountname,target);
				if(bs_new!=pl3){
					CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[1],false);
				}else{
					autochangeflag=true;
				}
			}
		}
	}
	if(kikan!=6 && kikan!=7){
		CS.pl3_zenki=undefined;
	}else if(typeof CS.pl3_zenki!="undefined"){
		//pl3=CS.pl3_zenki;
		if(isNaN(pl3)){
			pl3="";
		}
	}
	
	CS.itask_list_show_edit_window_kensan_furikaeing_flag=false;
	var furikae_value=0;
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		var m_kanjo_code=CS.vueObj.kanjo_detail[i]["m_kanjo_code"];
		var keys=m_kanjo_code.split('_');
		for(var j=0;j<keys.length;j++){
			keys[j]=CS.toI(keys[j]);
		}
		if(keys[4]>=1000 || keys[4]<=-1000){
			CS.itask_list_show_edit_window_kensan_furikaeing_flag=true;
			if(keys[0]==1 && keys[1]==2 && keys[2]==1 && keys[3]==0){
				if(CS.vueObj.kanjo_detail[i][amout]!=null && CS.vueObj.kanjo_detail[i][amout]!=""){
					furikae_value=furikae_value-parseInt(CS.vueObj.kanjo_detail[i][amout].replaceAll(',', ''),10)*parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
				}
			}
		}
	}
	if(!CS.itask_list_show_edit_window_kensan_furikaeing_flag){
		CS.itask_list_show_edit_window_kensan_pl3_eq0_flag=false;
	}
	
	
	
	
	if(pl3==""){
		if(typeof CS.itask_tool_kensan_kanjo_kensan_target_index["1_2_0_0"]!="undefined"){
			var ti=CS.itask_tool_kensan_kanjo_kensan_target_index["1_2_0_0"];
			if(CS.vueObj.kanjo_detail[ti][amout]!=null && CS.vueObj.kanjo_detail[ti][amout]!=""){
				pl3=parseInt(CS.vueObj.kanjo_detail[ti][amout].replaceAll(',', ''),10);
				if(!CS.itask_list_show_edit_window_kensan_furikaeing_flag){
					CS.itask_list_show_edit_window_kensan_pl3_eq0_flag=true;
				}
			}
		}
	}
	if(patton3flag>1){
		pl3=CS.itask_list_show_edit_window_pana_calc_sum_pattern3()[pppppp]+furikae_value;
	}else if(CS.itask_list_show_edit_window_kensan_pl3_eq0_flag && CS.itask_list_show_edit_window_kensan_furikaeing_flag){
		if(typeof CS.itask_tool_kensan_kanjo_kensan_target_index["1_2_0_0"]!="undefined"){
			var ti=CS.itask_tool_kensan_kanjo_kensan_target_index["1_2_0_0"];
			if(CS.vueObj.kanjo_detail[ti][amout]!=null && CS.vueObj.kanjo_detail[ti][amout]!=""){
				if(pl3==null || pl3==""){
					pl3=0;
				}
				pl3=parseInt(CS.vueObj.kanjo_detail[ti][amout].replaceAll(',', ''),10)+parseInt(pl3,10);
			}
		}
	}
	
	//売上総利益＝通常の売上総利益＋完成工事総利益＋兼業事業総利益
	var pl4=pl1 - pl3 - T1_2_4_0;//売上総利益                                          番号:1_3_0_-1
	if(pl1=="" && pl3=="" && T1_2_4_0==""){
		pl4="";
	}else if(pl1=="" || pl3=="" || T1_2_4_0==""){
		if(pl1==""){
			pl1=0;
		}
		if(pl3==""){
			pl3=0;
		}
		if(T1_2_4_0==""){
			T1_2_4_0=0;
		}
		pl4=pl1 - pl3 - T1_2_4_0;
	}
	var ex1_3=CS.itask_list_show_edit_window_pana_calc_sum4_for_pl4(1,3)[pppppp];
	if(ex1_3!=""){
		pl4=ex1_3;
	}
	
	
	//販管費科目
	var pl5=Math.abs(CS.itask_list_show_edit_window_pana_calc_sum_f(1,4,)[pppppp]);//販売費及び一般管理費合計                    番号:1_4_0_-1
	if(CS.itask_list_show_edit_window_pana_calc_sum_f(1,4,)[pppppp]==""){
		pl5="";
	}
	//普通科目
	var pl5_s=Math.abs(CS.itask_list_show_edit_window_pana_calc_sum_f_s(1,4,)[pppppp]);//販売費及び一般管理費合計                    番号:1_4_0_-1
	if(CS.itask_list_show_edit_window_pana_calc_sum_f_s(1,4,)[pppppp]==""){
		pl5_s="";
	}
	var pl6=pl4 - pl5_s;//営業利益                                            番号:1_5_0_-2
	if(pl4=="" && pl5_s==""){
		pl6="";
	}else if(pl4==""){
		pl6=0 - pl5_s;
	}else if(pl5_s==""){
		pl6=pl4;
	}

	var pl7=CS.itask_list_show_edit_window_pana_calc_sum(1,6,0,0,)[pppppp];//営業外収益                               番号:1_6_0_0

	var pl8=-CS.itask_list_show_edit_window_pana_calc_sum(1,7,0,0,)[pppppp];//営業外費用                              番号:1_7_0_0
	if(CS.itask_list_show_edit_window_pana_calc_sum(1,7,0,0,)[pppppp]==""){
		pl8="";
	}

	var pl9=pl6 + pl7 - pl8;//経常利益                                      番号:1_8_0_2
	if(pl6=="" && pl7=="" && pl8==""){
		pl9="";
	}else if(pl6=="" || pl7=="" || pl8==""){
		if(pl6==""){
			pl6=0;
		}
		if(pl7==""){
			pl7=0;
		}
		if(pl8==""){
			pl8=0;
		}
		pl9=pl6 + pl7 - pl8;
	}
    //20231112 mizuno修正 
	//var pl10=CS.itask_list_show_edit_window_pana_calc_sum(1,9,0,0)[pppppp];//特別利益 
	var pl10=CS.itask_list_show_edit_window_pana_calc_sum_f(1,9,)[pppppp];//特別利益                                番号:1_9_
	var pl11=-CS.itask_list_show_edit_window_pana_calc_sum(1,10,0,0,)[pppppp];//特別損失                              番号:1_10_0_0
	if(CS.itask_list_show_edit_window_pana_calc_sum(1,10,0,0,)[pppppp]==""){
		pl11="";
	}


	var pl12=pl9 + pl10 - pl11;//税引前当期純利益                             番号:1_11_0_-1
	if(pl9=="" && pl10=="" && pl11==""){
		pl12="";
	}else if(pl9=="" || pl10=="" || pl11==""){
		if(pl9==""){
			pl9=0;
		}
		if(pl10==""){
			pl10=0;
		}
		if(pl11==""){
			pl11=0;
		}
		pl12=pl9 + pl10 - pl11;
	}
	
	if(furikae_value!="" && furikae_value!=null && furikae_value!=0 ){
		pl12=pl12+furikae_value;
	}
	
	
	var pl13=-CS.itask_list_show_edit_window_pana_calc_sum(1,12,0,0,)[pppppp];//法人税、住民税及び事業税                  番号:1_12_0_0
	if(CS.itask_list_show_edit_window_pana_calc_sum(1,12,0,0,)[pppppp]==""){
		pl13="";
	}

	var pl14=pl12-pl13;//当期純利益
	if(pl12=="" && pl13==""){
		pl14="";
	}else if(pl12=="" || pl13==""){
		if(pl12==""){
			pl12=0;
		}
		if(pl13==""){
			pl13=0;
		}
		pl14=pl12 - pl13;
	}
	CS.edit_window_kensan_pl_0["1"]=pl1;
	CS.edit_window_kensan_pl_0["2"]=pl2;
	CS.edit_window_kensan_pl_0["3"]=pl3;
	CS.edit_window_kensan_pl_0["4"]=pl4;
	CS.edit_window_kensan_pl_0["5"]=pl5;
	CS.edit_window_kensan_pl_0["5_s"]=pl5_s;
	CS.edit_window_kensan_pl_0["6"]=pl6;
	CS.edit_window_kensan_pl_0["7"]=pl7;
	CS.edit_window_kensan_pl_0["8"]=pl8;
	CS.edit_window_kensan_pl_0["9"]=pl9;
	CS.edit_window_kensan_pl_0["10"]=pl10;
	CS.edit_window_kensan_pl_0["11"]=pl11;
	CS.edit_window_kensan_pl_0["12"]=pl12;
	CS.edit_window_kensan_pl_0["13"]=pl13;
	CS.edit_window_kensan_pl_0["14"]=pl14;
	CS.edit_window_kensan_bs_0={};
	//貸借対照表
	var bs1=CS.itask_list_show_edit_window_pana_calc_sum4(2,10,)[pppppp];//流動資産合計　20221214
	
	
	
	var target="2_10_4_8_1";
	var rule="2_10_0_0";
	if(kikan==5){
		//４を消した数字、古い数字
		var another_value = CS.itask_list_show_edit_window_pana_getvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,false);
		if(another_value[0]!=null){
			CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[0],true);
			//新しいbs1値
			var bs1_new=CS.itask_list_show_edit_window_pana_calc_sum4(2,10,)[pppppp];
			bs1=CS.itask_list_show_edit_window_pana_set_newgoukei(bs1,bs1_new,pre_or_this,rule,amountname,target);
			if(bs1_new!=bs1){
				CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[1],false);
			}else{
				autochangeflag=true;
			}
		}
	}

	
	
	
	var bs2=CS.itask_list_show_edit_window_pana_calc_sum(2,20,1,0,)[pppppp];//有形固定資産合計                  番号:2_2_1_-1
	if(kikan==5){
		target="2_20_1_7_1";
		rule="2_20_1_0";
		another_value = CS.itask_list_show_edit_window_pana_getvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,false);
		if(another_value[0]!=null){
			CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[0],true);
			var bs_new=CS.itask_list_show_edit_window_pana_calc_sum(2,20,1,0,)[pppppp];
			bs2=CS.itask_list_show_edit_window_pana_set_newgoukei(bs1,bs_new,pre_or_this,rule,amountname,target);
			if(bs_new!=bs2){
				CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[1],false);
			}else{
				autochangeflag=true;
			}
		}
		target="2_20_1_7_2";
		rule="2_20_1_0";
		another_value = CS.itask_list_show_edit_window_pana_getvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,false);
		if(another_value[0]!=null){
			CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[0],true);
			var bs_new=CS.itask_list_show_edit_window_pana_calc_sum(2,20,1,0,)[pppppp];
			bs2=CS.itask_list_show_edit_window_pana_set_newgoukei(bs1,bs_new,pre_or_this,rule,amountname,target);
			if(bs_new!=bs2){
				CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[1],false);
			}else{
				autochangeflag=true;
			}
		}
	}

	
	var bs3=CS.itask_list_show_edit_window_pana_calc_sum(2,20,2,0,)[pppppp];//無形固定資産合計                  番号:2_2_2_-1
	var bs4=CS.itask_list_show_edit_window_pana_calc_sum(2,20,3,0,)[pppppp];//投資その他の資産合計                番号:2_2_3_-1
	if(kikan==5){
		target="2_20_3_4_0";
		rule="2_20_3_0";
		another_value = CS.itask_list_show_edit_window_pana_getvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,false);
		if(another_value[0]!=null){
			CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[0],true);
			var bs_new=CS.itask_list_show_edit_window_pana_calc_sum(2,20,3,0,)[pppppp];
			bs4=CS.itask_list_show_edit_window_pana_set_newgoukei(bs1,bs_new,pre_or_this,rule,amountname,target);
			if(bs_new!=bs4){
				CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[1],false);
			}else{
				autochangeflag=true;
			}
		}
	}

	
	
	var bs5=CS.itask_list_show_edit_window_pana_calc_sum(2,30,0,0,)[pppppp];//繰延資産合計                     番号:2_2_4_0

	var bs6=bs2 + bs3 + bs4;//固定資産合計                    番号:2_2_0_-1
	if(bs2=="" && bs3=="" && bs4==""){
		bs6="";
	}else if(bs2=="" || bs3=="" || bs4==""){
		if(bs2==""){
			bs2=0;
		}
		if(bs3==""){
			bs3=0;
		}
		if(bs4==""){
			bs4=0;
		}
		bs6=bs2 + bs3 + bs4;
	}

	var bs7=bs1 + bs5 + bs6;//資産の部合計                                番号:2_3_5_0
	if(bs1=="" && bs5=="" && bs6==""){
		bs7="";
	}else if(bs1=="" || bs5=="" || bs6==""){
		if(bs1==""){
			bs1=0;
		}
		if(bs5==""){
			bs5=0;
		}
		if(bs6==""){
			bs6=0;
		}
		bs7=bs1 + bs5 + bs6;
	}
	var bs8=CS.itask_list_show_edit_window_pana_calc_sum4(2,40,0,0,)[pppppp];//流動負債合計                     番号:2_4_0_-1
	var bs9=CS.itask_list_show_edit_window_pana_calc_sum4(2,50,0,0,)[pppppp];//固定負債合計                     番号:2_5_0_-1

	var bs10=bs8 + bs9; //負債の部合計                              番号:2_6_0_-1
	if(bs8=="" && bs9==""){
		bs10="";
	}else if(bs8=="" || bs9==""){
		if(bs8==""){
			bs8=0;
		}
		if(bs9==""){
			bs9=0;
		}
		bs10=bs8 + bs9;
	}

	var bs11=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,1,0,null)[pppppp];//資本金                         番号:2_7_1_0
	var bs12=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,2,0,null)[pppppp];//資本剰余金                      番号:2_7_2_0
	var bs13=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,3,1,null)[pppppp];//利益準備金                      番号:2_7_4_1
	var bs13_1=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,2,2,1)[pppppp];//②資本準備金
	var bs13_2=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,3,0,null)[pppppp];//③利益剰余金
	var bs13_3=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,3,1,null)[pppppp];//④利益準備金
	var bs13_4=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,3,2,null)[pppppp];//⑤その他利益剰余金
	CS.sonota_rieki_jyouyokin_flg=sonota_rieki_jyouyokin_exist()

	bs13_1=CS.itask_list_show_edit_window_pana_get_one_goukei(2,70,2,null)[pppppp];
	if(bs13_1==""){
		bs13_1=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,2,null,null)[pppppp];//②資本準備金
	}

	var bs14=sonota_rieki_jyouyokin()[pppppp];//その他の利益剰余金
	if(kikan==5){
		target="2_70_3_2_2";
		rule="2_70_3_2";
		another_value = CS.itask_list_show_edit_window_pana_getvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,true);
		if(another_value[0]!=null){
			CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[0],true);
			var bs_new=sonota_rieki_jyouyokin()[pppppp];
			bs14=CS.itask_list_show_edit_window_pana_set_newgoukei(bs1,bs_new,pre_or_this,rule,amountname,target);
			if(bs_new!=bs14){
				CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[1],false);
			}else{
				autochangeflag=true;
			}
		}
	}
	var bs2_70_3_0=CS.itask_list_show_edit_window_pana_get_one_futuu(2,70,3,0)[pppppp];
	var bs15="";
	if(bs13=="" && bs14=="" && bs2_70_3_0==""){
		bs15="";
	}else if(bs13=="" || bs14=="" ||  bs2_70_3_0==""){
		if(bs13==""){
			bs13=0;
		}
		if(bs14==""){
			bs14=0;
		}
		if(bs2_70_3_0==""){
			bs2_70_3_0=0;
		}
		bs15=bs13+bs14+bs2_70_3_0;//利益剰余金
	}else{
		bs15=bs13+bs14+bs2_70_3_0;//利益剰余金
	}

	var bs18=CS.itask_list_show_edit_window_pana_calc_sum(2,70,6,0,0)[pppppp];//自己株式                       番号:2_7_6_0


	//株主資本（2_70_0_0）を計算する式	 bs19	
	//①資本金	2_70_1_0  bs11	
	//②資本準備金	2_70_2_2_1	bs13_1
	//if 2_70_2_2_1 ない
	//   ②=2_70_2
	//③利益剰余金	2_70_3_0   bs13_2
	//　④利益準備金	2_70_3_1   bs13_3	
	//　　株主資本（2_70_0_0）＝　①＋②＋利益剰余金(bs15)	-Math.abs(bs18) 2024-12-21
	
	
	if(bs13_1==""){
		//if 2_70_2_2_1 ない
		//   ②=2_70_2
		bs13_1=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,2,null,null)[pppppp];
	}
	
	var bs19="";//株主資本合計            番号:2_7_0_-1
	bs19=bs11+bs13_1+bs15-Math.abs(bs18);//株主資本合計
	if(bs11=="" && bs13_1=="" && bs15=="" && bs18==""){
		bs19="";
	}else if(bs11=="" || bs13_1=="" || bs15=="" || bs18==""){
		if(bs11==""){
			bs11=0;
		}
		if(bs13_1==""){
			bs13_1=0;
		}
		if(bs15==""){
			bs15=0;
		}
		if(bs18==""){
			bs18=0;
		}
		bs19=bs11+bs13_1+bs15-Math.abs(bs18);;
	}
	
	
	//2_70_1_  2_70_2_とかない場合
	//普通項目１個しかない場合　　普通項目を合計値にする
	//普通項目１個　と　合計項目１個　がある場合に合項目を優先として出す
	//合計項目１個しかない場合　　合計項目を合計値にする
	//
	if(bs19==""){
		bs19goukei=CS.itask_list_show_edit_window_pana_get_one_goukei(2,70,0,null)[pppppp];
		bs19futuu=CS.itask_list_show_edit_window_pana_get_one_futuu(2,70,0,null)[pppppp];
		if(bs19goukei!=""){
			bs19=bs19goukei;
		}else{
			bs19=bs19futuu;
		}
	}
	
	var bs20=CS.itask_list_show_edit_window_pana_calc_sum(2,80,0,0,0)[pppppp];//評価・換算差額等                  番号:2_8_0_0
	var bs21=CS.itask_list_show_edit_window_pana_calc_sum(2,90,0,0,0)[pppppp];//新株予約券                      番号:2_9_0_0
	var bs22=CS.itask_list_show_edit_window_pana_calc_sum(2,100,0,0,0)[pppppp];//非支配株主持ち分                 番号:2_10_0_0

	//var bs23=bs19+bs20+bs21+bs22+bs2_70_3_0;//純資産の部合計                    番号:2_11_0_0
	var bs23=bs19+bs20+bs21+bs22;//純資産の部合計                    番号:2_11_0_0 修正：20241220
	if(bs19=="" && bs20=="" && bs21=="" && bs22==""){
		bs23="";
	}else if(bs19=="" || bs20=="" || bs21=="" || bs22==""){
		if(bs19==""){
			bs19=0;
		}
		if(bs20==""){
			bs20=0;
		}
		if(bs21==""){
			bs21=0;
		}
		if(bs22==""){
			bs22=0;
		}
		if(bs2_70_3_0==""){
			bs2_70_3_0=0;
		}
		bs23=bs19+bs20+bs21+bs22;
	}
	var bs24=bs10+bs23;//負債及び純資産合計                           番号:2_12_0_0
	if(bs10=="" && bs10==""){
		bs24="";
	}else if(bs10=="" || bs23==""){
		if(bs10==""){
			bs10=0;
		}
		if(bs23==""){
			bs23=0;
		}
		bs24=bs10+bs23;
	}
	CS.edit_window_kensan_bs_0["1"]=bs1;
	CS.edit_window_kensan_bs_0["2"]=bs2;
	CS.edit_window_kensan_bs_0["3"]=bs3;
	CS.edit_window_kensan_bs_0["4"]=bs4;
	CS.edit_window_kensan_bs_0["5"]=bs5;
	CS.edit_window_kensan_bs_0["6"]=bs6;
	CS.edit_window_kensan_bs_0["7"]=bs7;
	CS.edit_window_kensan_bs_0["8"]=bs8;
	CS.edit_window_kensan_bs_0["9"]=bs9;
	CS.edit_window_kensan_bs_0["10"]=bs10;
	CS.edit_window_kensan_bs_0["11"]=bs11;
	CS.edit_window_kensan_bs_0["12"]=bs12;
	CS.edit_window_kensan_bs_0["13"]=bs13;
	CS.edit_window_kensan_bs_0["14"]=bs14;
	CS.edit_window_kensan_bs_0["15"]=bs15;
	CS.edit_window_kensan_bs_0["18"]=bs18;
	CS.edit_window_kensan_bs_0["19"]=bs19;
	CS.edit_window_kensan_bs_0["10"]=bs10;
	CS.edit_window_kensan_bs_0["11"]=bs11;
	CS.edit_window_kensan_bs_0["12"]=bs12;
	CS.edit_window_kensan_bs_0["13"]=bs13;
	CS.edit_window_kensan_bs_0["14"]=bs14;
	CS.edit_window_kensan_bs_0["15"]=bs15;
	CS.edit_window_kensan_bs_0["18"]=bs18;
	CS.edit_window_kensan_bs_0["19"]=bs19;
	CS.edit_window_kensan_bs_0["20"]=bs20;
	CS.edit_window_kensan_bs_0["21"]=bs21;
	CS.edit_window_kensan_bs_0["22"]=bs22;
	CS.edit_window_kensan_bs_0["23"]=bs23;
	CS.edit_window_kensan_bs_0["24"]=bs24;
	var amountname="zenki_keisan";
	CS.itask_tool_setedmap={};
	var setedmap={};
	var setedmap_index={};
	if(kikan!=8){
		CS.itask_tool_setedmap_index={};
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			var kanjo_detail=CS.vueObj.kanjo_detail[i];
			var key=kanjo_detail["order"]+"_"+kanjo_detail["family"]+"_"+kanjo_detail["genus"]+"_"+kanjo_detail["variety"];
			var shotkey=kanjo_detail["order"]+"_"+kanjo_detail["family"]+"_"+kanjo_detail["genus"]+"_"+kanjo_detail["species"];
			var variety=parseInt(kanjo_detail["variety"],10);
			kanjo_detail[amountname]="";
			//損益計算書
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_1_0_0",pl1,kanjo_detail,variety,i,amountname);
			//kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_2_2_0",pl2,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_2_0_0",pl3,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_3_0_0",pl4,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_4_0_0",pl5,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_4_0_0_s",pl5_s,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_5_0_0",pl6,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_6_0_0",pl7,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_7_0_0",pl8,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_8_0_0",pl9,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_9_0_0",pl10,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_10_0_0",pl11,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_11_0_0",pl12,kanjo_detail,variety,i,amountname);
			//kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_12_0_0",pl13,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_13_0_0",pl14,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_10_0_0",bs1,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_20_1_0",bs2,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_20_2_0",bs3,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_20_3_0",bs4,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_30_0_0",bs5,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_20_0_0",bs6,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_35_0_0",bs7,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_40_0_0",bs8,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_50_0_0",bs9,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_60_0_0",bs10,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_70_1_0",bs11,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_70_2_0",bs12,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_70_3_1",bs13,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_70_3_2",bs14,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_70_3_0",bs15,kanjo_detail,variety,i,amountname);
			//kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_70_6_3",bs18,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_70_0_0",bs19,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_80_0_0",bs20,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_90_0_0",bs21,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_100_0_0",bs22,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_110_0_0",bs23,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_120_0_0",bs24,kanjo_detail,variety,i,amountname);
			
			CS.vueObj.kanjo_detail[i] = kanjo_detail;
		}
	}

	var addobjlist=[];
	if(kikan==5){
		////////////////////////////////////////////
		//未出力追加２
		////////////////////////////////////////////
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_1_0_0",pl1,addobjlist,CS.itask_tool_setedmap_index,amountname);
		//addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_2_2_0",pl2,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_2_0_0",pl3,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_3_0_0",pl4,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_4_0_0_-3",pl5,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_4_0_0",pl5_s,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_5_0_0",pl6,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_6_0_0",pl7,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_7_0_0",pl8,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_8_0_0",pl9,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_9_0_0",pl10,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_10_0_0",pl11,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_11_0_0",pl12,addobjlist,CS.itask_tool_setedmap_index,amountname);
		//addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_12_0_0",pl13,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_13_0_0",pl14,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_10_0_0",bs1,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_20_1_0",bs2,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_20_2_0",bs3,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_20_3_0",bs4,addobjlist,CS.itask_tool_setedmap_index,amountname);
		//addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_30_0_0",bs5,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_20_0_0",bs6,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_35_0_0",bs7,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_40_0_0",bs8,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_50_0_0",bs9,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_60_0_0",bs10,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_70_1_0",bs11,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_70_2_0",bs12,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_70_3_1",bs13,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_70_3_2",bs14,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_70_3_0",bs15,addobjlist,CS.itask_tool_setedmap_index,amountname);
		//addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_70_6_0",bs18,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_70_0_0",bs19,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_80_0_0",bs20,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_90_0_0",bs21,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_100_0_0",bs22,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_110_0_0",bs23,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_120_0_0",bs24,addobjlist,CS.itask_tool_setedmap_index,amountname);
	}

	for (let key in CS.itask_tool_setedmap_sub_index) {
		var shotkey_=key.split('_');
		var bs25=CS.itask_list_show_edit_window_pana_calc_sum6(CS.toI(shotkey_[0]),CS.toI(shotkey_[1]),CS.toI(shotkey_[2]),CS.toI(shotkey_[3]),null)[pppppp];
		if(typeof bs25 == "undefined" || bs25 ==null || bs25==""){
			CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_sub_index[key]][amountname]="";
		}else{
			CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_sub_index[key]][amountname]=bs25.toLocaleString();
		}
		if(CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_sub_index[key]]["m_kanjo_code"]=="2_10_1_1_-4"){
			var bs25_1=CS.itask_list_show_edit_window_pana_calc_sum6(CS.toI(shotkey_[0]),CS.toI(shotkey_[1]),CS.toI(shotkey_[2]),CS.toI(shotkey_[3]),null)[pppppp];
			var bs25_2=CS.itask_list_show_edit_window_pana_calc_sum6(2,10,2,0,null)[pppppp];
			if(typeof bs25_1 != "undefined" || bs25_1 !=null || bs25_1!="" || typeof bs25_2 != "undefined" || bs25_2 !=null || bs25_2!=""){
				if(bs25_1==""){
					bs25_1=0;
				}
				if(bs25_2==""){
					bs25_2=0;
				}
				CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_sub_index[key]][amountname]=(bs25_1+bs25_2).toLocaleString();;
			}else{
				CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_sub_index[key]][amountname]="";
			}
		}
	}

	//////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	//今期今期今期今期今期今期今期今期今期今期今期今期今期今期今期今期今期今期今期今期今期今期今期今期今期今期
	//////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	amout="amount_this_year";
	//貸倒引当金2_10_4_8_1の先頭が4で、流動資産の検算に差額が出ている場合、その4を削除して検算が〇になれば、4を削除
	var pre_or_this="this";
	var amountname="konki_keisan";
	/////////////////////////////////////////////////////////////
	
	var konki_kanjo_detail={};
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		var kanjo_detail=CS.vueObj.kanjo_detail[i];
		var key=kanjo_detail["order"]+"_"+kanjo_detail["family"]+"_"+kanjo_detail["genus"]+"_"+kanjo_detail["variety"];
		konki_kanjo_detail[key]=i;
	}
	var pppppp=0;
	var T1_2_4_0="";
	if(typeof CS.itask_tool_kensan_kanjo_kensan_target_index["1_2_4_0"]!="undefined"){
		T1_2_4_0=CS.vueObj.kanjo_detail[CS.itask_tool_kensan_kanjo_kensan_target_index["1_2_4_0"]]['amount_'+pre_or_this+'_year'];
		T1_2_4_0=CS.toI(T1_2_4_0);
		if(isNaN(T1_2_4_0)){
			T1_2_4_0="";
		}
	}
	var T1_2_0_0_0="";
	if(typeof CS.itask_tool_kensan_kanjo_kensan_target_index["1_2_0_0_0"]!="undefined"){
		T1_2_0_0_0=CS.vueObj.kanjo_detail[CS.itask_tool_kensan_kanjo_kensan_target_index["1_2_0_0_0"]]['amount_'+pre_or_this+'_year'];
		T1_2_0_0_0=CS.toI(T1_2_0_0_0);
		if(isNaN(T1_2_0_0_0)){
			T1_2_0_0_0="";
		}
	}
	// 完成工事売上高: 1_1_2%
	// 兼業事業売上高:1_1_0_5%
	// 兼業事業売上原価:1_2_6%
	//売上高　＝　　通常の売上高＋完成工事売上高＋兼業事業売上高
	//損益計算書
	var pl1=CS.itask_list_show_edit_window_pana_calc_sum_f(1,1,)[pppppp];
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1 ){
		//CSV全項目出力のため
		if(CS.vueObj.kanjo_detail[0]["amount_this_year"]!=null && CS.vueObj.kanjo_detail[0]["amount_this_year"]!=""){
			pl1=parseInt(CS.vueObj.kanjo_detail[0][amout].replaceAll(',', ''),10);
		}else{
			pl1="";
		}
	}
	// 売上原価　＝　通常の売上原価＋完成工事原価+　兼業事業売上原価
	var pl2= - CS.itask_list_show_edit_window_pana_calc_sum(1,2,0,-2,)[pppppp] - CS.itask_list_show_edit_window_pana_get_one(1,2,7,0,0)[pppppp]  - CS.itask_list_show_edit_window_pana_calc_sum(1,2,6,0,)[pppppp] - CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,-1,)[pppppp] - CS.itask_list_show_edit_window_pana_calc_sum(1,2,5,0,)[pppppp];//合計            番号:1_2_2_-1  
	var pl2_2= - CS.itask_list_show_edit_window_pana_calc_sum(1,2,0,-2,)[pppppp] -CS.itask_list_show_edit_window_pana_calc_sum(1,2,1,0,)[pppppp] - CS.itask_list_show_edit_window_pana_get_one(1,2,7,0,0)[pppppp]  - CS.itask_list_show_edit_window_pana_calc_sum(1,2,6,0,)[pppppp] - CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,-1,)[pppppp] - CS.itask_list_show_edit_window_pana_calc_sum(1,2,5,0,)[pppppp];//合計            番号:1_2_2_-1  
	var T5=CS.itask_list_show_edit_window_pana_calc_sum(1,2,1,0,)[pppppp];
	var T6=CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,-1,)[pppppp];
	var T6_2=CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,-1,)[pppppp];
	var T7=CS.itask_list_show_edit_window_pana_calc_sum(1,2,6,0,)[pppppp];
	var T8=CS.itask_list_show_edit_window_pana_get_one(1,2,7,0,0)[pppppp];
	var T9=CS.itask_list_show_edit_window_pana_calc_sum(1,2,0,-2,)[pppppp];
	var T10=CS.itask_list_show_edit_window_pana_calc_sum(1,2,5,0,)[pppppp]
	
	if(T6=="" && T7=="" && T8=="" && T9=="" && T10==""){
		pl2="";
	}else if(T6=="" || T7=="" || T8=="" || T9=="" || T10==""){
		if(T6==""){
			T6=0;
		}
		if(T7==""){
			T7=0;
		}
		if(T8==""){
			T8=0;
		}
		if(T9==""){
			T9=0;
		}
		if(T10==""){
			T10=0;
		}
		pl2=0 - T6 - T7 - T8 - T9 - T10;
	}
	if(T5=="" && T6=="" && T7=="" && T8=="" && T9=="" && T10==""){
		pl2_2="";
	}else if(T5=="" || T6_2=="" || T7=="" || T8=="" || T9=="" || T10==""){
		if(T5==""){
			T5=0;
		}
		if(T6_2==""){
			T6_2=0;
		}
		if(T7==""){
			T7=0;
		}
		if(T8==""){
			T8=0;
		}
		if(T9==""){
			T9=0;
		}
		if(T10==""){
			T10=0;
		}
		pl2_2=0 - T5 - T6_2 - T7 - T8 - T9 - T10;
	}

	if(patton3flag>1){
		pl2="";
		var pl3=CS.itask_list_show_edit_window_pana_calc_sum_pattern3()[pppppp];
	}else{
		var pl3=pl2_2 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp];//売上原価                           番号:1_2_0_0
		if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp]=="" && pl2_2==""){
			pl3="";
		}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp]!="" && pl2_2==""){
			pl3=0 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp];
		}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp]=="" && pl2_2!=""){
			pl3=pl2_2;
		}
		
		var target="1_2_3_0_5";
		var rule="1_2_0_0";
		if(kikan==5){
			//４を消した数字、古い数字
			var another_value = CS.itask_list_show_edit_window_pana_getvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,false);
			if(another_value[0]!=null){
				CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[0],true);
				//新しいbs1値
				var bs_new=pl2_2 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp];//売上原価                           番号:1_2_0_0
				if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp]=="" && pl2_2==""){
					bs_new="";
				}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp]!="" && pl2_2==""){
					bs_new=0 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp];
				}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[pppppp]=="" && pl2_2!=""){
					bs_new=pl2_2;
				}
				pl3=CS.itask_list_show_edit_window_pana_set_newgoukei(bs1,bs1_new,pre_or_this,rule,amountname,target);
				if(bs_new!=pl3){
					CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[1],false);
				}else{
					autochangeflag=true;
				}
			}
		}
	}
	if(kikan!=6 && kikan!=7){
		CS.pl3_zenki=undefined;
	}else if(typeof CS.pl3_zenki!="undefined"){
		//pl3=CS.pl3_konki;
		if(isNaN(pl3)){
			pl3="";
		}
	}
	
	CS.itask_list_show_edit_window_kensan_furikaeing_flag=false;
	var furikae_value=0;
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		var m_kanjo_code=CS.vueObj.kanjo_detail[i]["m_kanjo_code"];
		var keys=m_kanjo_code.split('_');
		for(var j=0;j<keys.length;j++){
			keys[j]=CS.toI(keys[j]);
		}
		if(keys[4]>=1000 || keys[4]<=-1000){
			CS.itask_list_show_edit_window_kensan_furikaeing_flag=true;
			if(keys[0]==1 && keys[1]==2 && keys[2]==1 && keys[3]==0){
				if(CS.vueObj.kanjo_detail[i][amout]!=null && CS.vueObj.kanjo_detail[i][amout]!=""){
					furikae_value=furikae_value-parseInt(CS.vueObj.kanjo_detail[i][amout].replaceAll(',', ''),10)*parseInt(CS.vueObj.kanjo_detail[i]['property'],10);
				}
			}
		}
	}
	if(!CS.itask_list_show_edit_window_kensan_furikaeing_flag){
		CS.itask_list_show_edit_window_kensan_pl3_eq0_flag=false;
	}
	
	
	
	
	if(pl3==""){
		if(typeof CS.itask_tool_kensan_kanjo_kensan_target_index["1_2_0_0"]!="undefined"){
			var ti=CS.itask_tool_kensan_kanjo_kensan_target_index["1_2_0_0"];
			if(CS.vueObj.kanjo_detail[ti][amout]!=null && CS.vueObj.kanjo_detail[ti][amout]!=""){
				pl3=parseInt(CS.vueObj.kanjo_detail[ti][amout].replaceAll(',', ''),10);
				if(!CS.itask_list_show_edit_window_kensan_furikaeing_flag){
					CS.itask_list_show_edit_window_kensan_pl3_eq0_flag=true;
				}
			}
		}
	}
	if(patton3flag>1){
		pl3=CS.itask_list_show_edit_window_pana_calc_sum_pattern3()[pppppp]+furikae_value;
	}else if(CS.itask_list_show_edit_window_kensan_pl3_eq0_flag && CS.itask_list_show_edit_window_kensan_furikaeing_flag){
		if(typeof CS.itask_tool_kensan_kanjo_kensan_target_index["1_2_0_0"]!="undefined"){
			var ti=CS.itask_tool_kensan_kanjo_kensan_target_index["1_2_0_0"];
			if(CS.vueObj.kanjo_detail[ti][amout]!=null && CS.vueObj.kanjo_detail[ti][amout]!=""){
				if(pl3==null || pl3==""){
					pl3=0;
				}
				pl3=parseInt(CS.vueObj.kanjo_detail[ti][amout].replaceAll(',', ''),10)+parseInt(pl3,10);
			}
		}
	}
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		//CSV全項目出力のため
		if(CS.vueObj.kanjo_detail[5][amout]!=null && CS.vueObj.kanjo_detail[0][amout]!=""){
			pl3=parseInt(CS.vueObj.kanjo_detail[5][amout].replaceAll(',', ''),10);
		}else{
			pl3="";
		}
	}
	var pl4=pl1 - pl3 - T1_2_4_0;//売上総利益                                          番号:1_3_0_-1
	if(pl1=="" && pl3=="" && T1_2_4_0==""){
		pl4="";
	}else if(pl1=="" || pl3=="" || T1_2_4_0==""){
		if(pl1==""){
			pl1=0;
		}
		if(pl3==""){
			pl3=0;
		}
		if(T1_2_4_0==""){
			T1_2_4_0=0;
		}
		pl4=pl1 - pl3 - T1_2_4_0;
	}
	var ex1_3=CS.itask_list_show_edit_window_pana_calc_sum4_for_pl4(1,3)[pppppp];
	if(ex1_3!=""){
		pl4=ex1_3;
	}
	//販管費科目
	var pl5=Math.abs(CS.itask_list_show_edit_window_pana_calc_sum_f(1,4,)[pppppp]);//販売費及び一般管理費合計                    番号:1_4_0_-1
	if(CS.itask_list_show_edit_window_pana_calc_sum_f(1,4,)[pppppp]==""){
		pl5="";
	}
	//普通科目
	var pl5_s=Math.abs(CS.itask_list_show_edit_window_pana_calc_sum_f_s(1,4,)[pppppp]);//販売費及び一般管理費合計                    番号:1_4_0_-1
	if(CS.itask_list_show_edit_window_pana_calc_sum_f_s(1,4,)[pppppp]==""){
		pl5_s="";
	}
	
	var pl6=pl4 - pl5_s;//営業利益                                            番号:1_5_0_-2
	if(pl4=="" && pl5_s==""){
		pl6="";
	}else if(pl4==""){
		pl6=0 - pl5_s;
	}else if(pl5_s==""){
		pl6=pl4;
	}

	var pl7=CS.itask_list_show_edit_window_pana_calc_sum(1,6,0,0,)[pppppp];//営業外収益                               番号:1_6_0_0

	var pl8=-CS.itask_list_show_edit_window_pana_calc_sum(1,7,0,0,)[pppppp];//営業外費用                              番号:1_7_0_0
	if(CS.itask_list_show_edit_window_pana_calc_sum(1,7,0,0,)[pppppp]==""){
		pl8="";
	}

	var pl9=pl6 + pl7 - pl8;//経常利益                                      番号:1_8_0_2
	if(pl6=="" && pl7=="" && pl8==""){
		pl9="";
	}else if(pl6=="" || pl7=="" || pl8==""){
		if(pl6==""){
			pl6=0;
		}
		if(pl7==""){
			pl7=0;
		}
		if(pl8==""){
			pl8=0;
		}
		pl9=pl6 + pl7 - pl8;
	}
	//20231112mizuno
	//var pl10=CS.itask_list_show_edit_window_pana_calc_sum(1,9,0,0,)[pppppp];//特別利益                                番号:1_9_0_0
	var pl10=CS.itask_list_show_edit_window_pana_calc_sum_f(1,9,)[pppppp];//特別利益                                番号:1_9_0_0
	var pl11=-CS.itask_list_show_edit_window_pana_calc_sum(1,10,0,0,)[pppppp];//特別損失                              番号:1_10_0_0
	if(CS.itask_list_show_edit_window_pana_calc_sum(1,10,0,0,)[pppppp]==""){
		pl11="";
	}


	var pl12=pl9 + pl10 - pl11;//税引前当期純利益                             番号:1_11_0_-1
	if(pl9=="" && pl10=="" && pl11==""){
		pl12="";
	}else if(pl9=="" || pl10=="" || pl11==""){
		if(pl9==""){
			pl9=0;
		}
		if(pl10==""){
			pl10=0;
		}
		if(pl11==""){
			pl11=0;
		}
		pl12=pl9 + pl10 - pl11;
	}
	if(furikae_value!="" && furikae_value!=null && furikae_value!=0 ){
		pl12=pl12+furikae_value;
	}
	var pl13=-CS.itask_list_show_edit_window_pana_calc_sum(1,12,0,0,)[pppppp];//法人税、住民税及び事業税                  番号:1_12_0_0
	if(CS.itask_list_show_edit_window_pana_calc_sum(1,12,0,0,)[pppppp]==""){
		pl13="";
	}

	var pl14=pl12-pl13;//当期純利益
	if(pl12=="" && pl13==""){
		pl14="";
	}else if(pl12=="" || pl13==""){
		if(pl12==""){
			pl12=0;
		}
		if(pl13==""){
			pl13=0;
		}
		pl14=pl12 - pl13;
	}
	//貸借対照表
	var bs1=CS.itask_list_show_edit_window_pana_calc_sum4(2,10,)[pppppp];//流動資産合計　20221214
	
	

	
	var target="2_10_4_8_1";
	var rule="2_10_0_0";
	if(kikan==5){
		//４を消した数字、古い数字
		var another_value = CS.itask_list_show_edit_window_pana_getvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,false);
		if(another_value[0]!=null){
			CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[0],true);
			//新しいbs1値
			var bs1_new=CS.itask_list_show_edit_window_pana_calc_sum4(2,10,)[pppppp];
			bs1=CS.itask_list_show_edit_window_pana_set_newgoukei(bs1,bs1_new,pre_or_this,rule,amountname,target);
			if(bs1_new!=bs1){
				CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[1],false);
			}else{
				autochangeflag=true;
			}
		}
	}

	
	
	
	var bs2=CS.itask_list_show_edit_window_pana_calc_sum(2,20,1,0,)[pppppp];//有形固定資産合計                  番号:2_2_1_-1
	if(kikan==5){
		target="2_20_1_7_1";
		rule="2_20_1_0";
		another_value = CS.itask_list_show_edit_window_pana_getvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,false);
		if(another_value[0]!=null){
			CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[0],true);
			var bs_new=CS.itask_list_show_edit_window_pana_calc_sum(2,20,1,0,)[pppppp];
			bs2=CS.itask_list_show_edit_window_pana_set_newgoukei(bs1,bs_new,pre_or_this,rule,amountname,target);
			if(bs_new!=bs2){
				CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[1],false);
			}else{
				autochangeflag=true;
			}
		}
		target="2_20_1_7_2";
		rule="2_20_1_0";
		another_value = CS.itask_list_show_edit_window_pana_getvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,false);
		if(another_value[0]!=null){
			CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[0],true);
			var bs_new=CS.itask_list_show_edit_window_pana_calc_sum(2,20,1,0,)[pppppp];
			bs2=CS.itask_list_show_edit_window_pana_set_newgoukei(bs1,bs_new,pre_or_this,rule,amountname,target);
			if(bs_new!=bs2){
				CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[1],false);
			}else{
				autochangeflag=true;
			}
		}
	}

	
	var bs3=CS.itask_list_show_edit_window_pana_calc_sum(2,20,2,0,)[pppppp];//無形固定資産合計                  番号:2_2_2_-1
	var bs4=CS.itask_list_show_edit_window_pana_calc_sum(2,20,3,0,)[pppppp];//投資その他の資産合計                番号:2_2_3_-1
	if(kikan==5){
		target="2_20_3_4_0";
		rule="2_20_3_0";
		another_value = CS.itask_list_show_edit_window_pana_getvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,false);
		if(another_value[0]!=null){
			CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[0],true);
			var bs_new=CS.itask_list_show_edit_window_pana_calc_sum(2,20,3,0,)[pppppp];
			bs4=CS.itask_list_show_edit_window_pana_set_newgoukei(bs1,bs_new,pre_or_this,rule,amountname,target);
			if(bs_new!=bs4){
				CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[1],false);
			}else{
				autochangeflag=true;
			}
		}
	}

	
	
	var bs5=CS.itask_list_show_edit_window_pana_calc_sum(2,30,0,0,)[pppppp];//繰延資産合計                     番号:2_2_4_0

	var bs6=bs2 + bs3 + bs4;//固定資産合計                    番号:2_2_0_-1
	if(bs2=="" && bs3=="" && bs4==""){
		bs6="";
	}else if(bs2=="" || bs3=="" || bs4==""){
		if(bs2==""){
			bs2=0;
		}
		if(bs3==""){
			bs3=0;
		}
		if(bs4==""){
			bs4=0;
		}
		bs6=bs2 + bs3 + bs4;
	}

	var bs7=bs1 + bs5 + bs6;//資産の部合計                                番号:2_3_5_0
	if(bs1=="" && bs5=="" && bs6==""){
		bs7="";
	}else if(bs1=="" || bs5=="" || bs6==""){
		if(bs1==""){
			bs1=0;
		}
		if(bs5==""){
			bs5=0;
		}
		if(bs6==""){
			bs6=0;
		}
		bs7=bs1 + bs5 + bs6;
	}
	var bs8=CS.itask_list_show_edit_window_pana_calc_sum4(2,40,0,0,)[pppppp];//流動負債合計                     番号:2_4_0_-1
	var bs9=CS.itask_list_show_edit_window_pana_calc_sum4(2,50,0,0,)[pppppp];//固定負債合計                     番号:2_5_0_-1

	var bs10=bs8 + bs9; //負債の部合計                              番号:2_6_0_-1
	if(bs8=="" && bs9==""){
		bs10="";
	}else if(bs8=="" || bs9==""){
		if(bs8==""){
			bs8=0;
		}
		if(bs9==""){
			bs9=0;
		}
		bs10=bs8 + bs9;
	}

	var bs11=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,1,0,null)[pppppp];//資本金                         番号:2_7_1_0
	var bs12=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,2,0,null)[pppppp];//資本剰余金                      番号:2_7_2_0
	var bs13=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,3,1,null)[pppppp];//利益準備金                      番号:2_7_4_1
	var bs13_1=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,2,2,1)[pppppp];//②資本準備金
	var bs13_2=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,3,0,null)[pppppp];//③利益剰余金
	var bs13_3=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,3,1,null)[pppppp];//④利益準備金
	var bs13_4=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,3,2,null)[pppppp];//⑤その他利益剰余金
	CS.sonota_rieki_jyouyokin_flg=sonota_rieki_jyouyokin_exist()

	bs13_1=CS.itask_list_show_edit_window_pana_get_one_goukei(2,70,2,null)[pppppp];
	if(bs13_1==""){
		bs13_1=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,2,null,null)[pppppp];//②資本準備金
	}


	var bs14=sonota_rieki_jyouyokin()[pppppp];//その他の利益剰余金
	if(kikan==5){
		target="2_70_3_2_2";
		rule="2_70_3_2";
		another_value = CS.itask_list_show_edit_window_pana_getvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,true);
		if(another_value[0]!=null){
			CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[0],true);
			var bs_new=sonota_rieki_jyouyokin()[pppppp];
			bs14=CS.itask_list_show_edit_window_pana_set_newgoukei(bs1,bs_new,pre_or_this,rule,amountname,target);
			if(bs_new!=bs14){
				CS.vueObj.kanjo_detail=CS.itask_list_show_edit_window_pana_setvalue_forcode(CS.vueObj.kanjo_detail,target,pre_or_this,another_value[1],false);
			}else{
				autochangeflag=true;
			}
		}
	}
	var bs2_70_3_0=CS.itask_list_show_edit_window_pana_get_one_futuu(2,70,3,0)[pppppp];
	var bs15="";
	if(bs13=="" && bs14=="" && bs2_70_3_0==""){
		bs15="";
	}else if(bs13=="" || bs14=="" ||  bs2_70_3_0==""){
		if(bs13==""){
			bs13=0;
		}
		if(bs14==""){
			bs14=0;
		}
		if(bs2_70_3_0==""){
			bs2_70_3_0=0;
		}
		bs15=bs13+bs14+bs2_70_3_0;//利益剰余金
	}else{
		bs15=bs13+bs14+bs2_70_3_0;//利益剰余金
	}

	var bs18=CS.itask_list_show_edit_window_pana_calc_sum(2,70,6,0,0)[pppppp];//自己株式                       番号:2_7_6_0


		//株主資本（2_70_0_0）を計算する式	 bs19	
	//①資本金	2_70_1_0  bs11	
	//②資本準備金	2_70_2_2_1	bs13_1
	//if 2_70_2_2_1 ない
	//   ②=2_70_2
	//③利益剰余金	2_70_3_0   bs13_2
	//　④利益準備金	2_70_3_1   bs13_3	
	//　⑤その他利益剰余金	2_70_3_2   bs13_4
	
	//　　株主資本（2_70_0_0）＝　①＋②＋利益剰余金(bs15)	-Math.abs(bs18) 2024-12-21
	
	
	if(bs13_1==""){
		//if 2_70_2_2_1 ない
		//   ②=2_70_2
		bs13_1=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,2,null,null)[pppppp];
	}
	
	var bs19="";//株主資本合計            番号:2_7_0_-1
	bs19=bs11+bs13_1+bs15-Math.abs(bs18);//株主資本合計
	if(bs11=="" && bs13_1=="" && bs15=="" && bs18==""){
		bs19="";
	}else if(bs11=="" || bs13_1=="" || bs15=="" || bs18==""){
		if(bs11==""){
			bs11=0;
		}
		if(bs13_1==""){
			bs13_1=0;
		}
		if(bs15==""){
			bs15=0;
		}
		if(bs18==""){
			bs18=0;
		}
		bs19=bs11+bs13_1+bs15-Math.abs(bs18);;
	}
	/*
	bs19=bs11+bs13_1+bs13_2-Math.abs(bs18);//株主資本合計            番号:2_7_0_-1
	if(bs11=="" && bs13_1=="" && bs13_2=="" && bs18==""){
		bs19="";
	}else if(bs11=="" || bs13_1=="" || bs13_2=="" || bs18==""){
		if(bs11==""){
			bs11=0;
		}
		if(bs13_1==""){
			bs13_1=0;
		}
		if(bs13_2==""){
			bs13_2=0;
		}
		if(bs18==""){
			bs18=0;
		}
		bs19=bs11+bs13_1+bs13_2-Math.abs(bs18);;
	}
	
	//　　株主資本（2_70_0_0）＝　①＋②＋④＋⑤ -Math.abs(bs18)
	bs19_2=bs11+bs13_1+bs13_3+bs13_4-Math.abs(bs18);//株主資本合計            番号:2_7_0_-1
	if(bs11=="" && bs13_1=="" && bs13_3=="" && bs13_4=="" && bs18==""){
		bs19_2="";
	}else if(bs11=="" || bs13_1=="" || bs13_3=="" || bs13_4=="" || bs18==""){
		if(bs11==""){
			bs11=0;
		}
		if(bs13_1==""){
			bs13_1=0;
		}
		if(bs13_3==""){
			bs13_3=0;
		}
		if(bs13_4==""){
			bs13_4=0;
		}
		if(bs18==""){
			bs18=0;
		}
		bs19_2=bs11+bs13_1+bs13_3+bs13_4-Math.abs(bs18);//株主資本合計            番号:2_7_0_-1
	}
	//if(bs19=="" || (bs19_2!="" && bs19_2>bs19) || (bs13_4!=0 && bs13_4!="")){ //20241220　bs19_2とbs19比較ロジックを外す
	if(bs13_2==0 || bs13_2==""){
		if(bs19=="" || (bs13_3!=0 && bs13_3!="") || (bs13_4!=0 && bs13_4!="")){
			bs19=bs19_2;
		}
	}
	*/
	
	
	//2_70_1_  2_70_2_とかない場合
	//普通項目１個しかない場合　　普通項目を合計値にする
	//普通項目１個　と　合計項目１個　がある場合に合項目を優先として出す
	//合計項目１個しかない場合　　合計項目を合計値にする
	//
	if(bs19==""){
		bs19goukei=CS.itask_list_show_edit_window_pana_get_one_goukei(2,70,0,null)[pppppp];
		bs19futuu=CS.itask_list_show_edit_window_pana_get_one_futuu(2,70,0,null)[pppppp];
		if(bs19goukei!=""){
			bs19=bs19goukei;
		}else{
			bs19=bs19futuu;
		}
	}
	var bs20=CS.itask_list_show_edit_window_pana_calc_sum(2,80,0,0,0)[pppppp];//評価・換算差額等                  番号:2_8_0_0
	var bs21=CS.itask_list_show_edit_window_pana_calc_sum(2,90,0,0,0)[pppppp];//新株予約券                      番号:2_9_0_0
	var bs22=CS.itask_list_show_edit_window_pana_calc_sum(2,100,0,0,0)[pppppp];//非支配株主持ち分                 番号:2_10_0_0

	//var bs23=bs19+bs20+bs21+bs22+bs2_70_3_0;//純資産の部合計                    番号:2_11_0_0
	var bs23=bs19+bs20+bs21+bs22;//純資産の部合計                    番号:2_11_0_0 修正：20241220
	if(bs19=="" && bs20=="" && bs21=="" && bs22==""){
		bs23="";
	}else if(bs19=="" || bs20=="" || bs21=="" || bs22==""){
		if(bs19==""){
			bs19=0;
		}
		if(bs20==""){
			bs20=0;
		}
		if(bs21==""){
			bs21=0;
		}
		if(bs22==""){
			bs22=0;
		}
		if(bs2_70_3_0==""){
			bs2_70_3_0=0;
		}
		bs23=bs19+bs20+bs21+bs22;
	}
	var bs24=bs10+bs23;//負債及び純資産合計                           番号:2_12_0_0
	if(bs10=="" && bs10==""){
		bs24="";
	}else if(bs10=="" || bs23==""){
		if(bs10==""){
			bs10=0;
		}
		if(bs23==""){
			bs23=0;
		}
		bs24=bs10+bs23;
	}
	CS.edit_window_kensan_pl_1={};
	CS.edit_window_kensan_pl_1["1"]=pl1;
	CS.edit_window_kensan_pl_1["2"]=pl2;
	CS.edit_window_kensan_pl_1["3"]=pl3;
	CS.edit_window_kensan_pl_1["4"]=pl4;
	CS.edit_window_kensan_pl_1["5"]=pl5;
	CS.edit_window_kensan_pl_1["5_s"]=pl5_s;
	CS.edit_window_kensan_pl_1["6"]=pl6;
	CS.edit_window_kensan_pl_1["7"]=pl7;
	CS.edit_window_kensan_pl_1["8"]=pl8;
	CS.edit_window_kensan_pl_1["9"]=pl9;
	CS.edit_window_kensan_pl_1["10"]=pl10;
	CS.edit_window_kensan_pl_1["11"]=pl11;
	CS.edit_window_kensan_pl_1["12"]=pl12;
	CS.edit_window_kensan_pl_1["13"]=pl13;
	CS.edit_window_kensan_pl_1["14"]=pl14;
	CS.edit_window_kensan_bs_1={};
	CS.edit_window_kensan_bs_1["1"]=bs1;
	CS.edit_window_kensan_bs_1["2"]=bs2;
	CS.edit_window_kensan_bs_1["3"]=bs3;
	CS.edit_window_kensan_bs_1["4"]=bs4;
	CS.edit_window_kensan_bs_1["5"]=bs5;
	CS.edit_window_kensan_bs_1["6"]=bs6;
	CS.edit_window_kensan_bs_1["7"]=bs7;
	CS.edit_window_kensan_bs_1["8"]=bs8;
	CS.edit_window_kensan_bs_1["9"]=bs9;
	CS.edit_window_kensan_bs_1["10"]=bs10;
	CS.edit_window_kensan_bs_1["11"]=bs11;
	CS.edit_window_kensan_bs_1["12"]=bs12;
	CS.edit_window_kensan_bs_1["13"]=bs13;
	CS.edit_window_kensan_bs_1["14"]=bs14;
	CS.edit_window_kensan_bs_1["15"]=bs15;
	CS.edit_window_kensan_bs_1["18"]=bs18;
	CS.edit_window_kensan_bs_1["19"]=bs19;
	CS.edit_window_kensan_bs_1["10"]=bs10;
	CS.edit_window_kensan_bs_1["11"]=bs11;
	CS.edit_window_kensan_bs_1["12"]=bs12;
	CS.edit_window_kensan_bs_1["13"]=bs13;
	CS.edit_window_kensan_bs_1["14"]=bs14;
	CS.edit_window_kensan_bs_1["15"]=bs15;
	CS.edit_window_kensan_bs_1["18"]=bs18;
	CS.edit_window_kensan_bs_1["19"]=bs19;
	CS.edit_window_kensan_bs_1["20"]=bs20;
	CS.edit_window_kensan_bs_1["21"]=bs21;
	CS.edit_window_kensan_bs_1["22"]=bs22;
	CS.edit_window_kensan_bs_1["23"]=bs23;
	CS.edit_window_kensan_bs_1["24"]=bs24;
	if(kikan==8){
		return;
	}
	amountname="konki_keisan";
	CS.itask_tool_setedmap={};
	setedmap={};
	setedmap_index={};
	if(kikan!=8){
		CS.itask_tool_setedmap_index={};
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			var kanjo_detail=CS.vueObj.kanjo_detail[i];
			var key=kanjo_detail["order"]+"_"+kanjo_detail["family"]+"_"+kanjo_detail["genus"]+"_"+kanjo_detail["variety"];
			var shotkey=kanjo_detail["order"]+"_"+kanjo_detail["family"]+"_"+kanjo_detail["genus"]+"_"+kanjo_detail["species"];
			var variety=parseInt(kanjo_detail["variety"],10);
			kanjo_detail[amountname]="";
			//損益計算書
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_1_0_0",pl1,kanjo_detail,variety,i,amountname);
			//kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_2_2_0",pl2,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_2_0_0",pl3,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_3_0_0",pl4,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_4_0_0",pl5,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_4_0_0_s",pl5_s,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_5_0_0",pl6,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_6_0_0",pl7,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_7_0_0",pl8,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_8_0_0",pl9,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_9_0_0",pl10,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_10_0_0",pl11,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_11_0_0",pl12,kanjo_detail,variety,i,amountname);
			//kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_12_0_0",pl13,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"1_13_0_0",pl14,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_10_0_0",bs1,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_20_1_0",bs2,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_20_2_0",bs3,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_20_3_0",bs4,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_30_0_0",bs5,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_20_0_0",bs6,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_35_0_0",bs7,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_40_0_0",bs8,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_50_0_0",bs9,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_60_0_0",bs10,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_70_1_0",bs11,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_70_2_0",bs12,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_70_3_1",bs13,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_70_3_2",bs14,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_70_3_0",bs15,kanjo_detail,variety,i,amountname);
			//kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_70_6_3",bs18,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_70_0_0",bs19,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_80_0_0",bs20,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_90_0_0",bs21,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_100_0_0",bs22,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_110_0_0",bs23,kanjo_detail,variety,i,amountname);
			kanjo_detail=CS.get_kensan_kanjo_detail(shotkey,"2_120_0_0",bs24,kanjo_detail,variety,i,amountname);
			
			CS.vueObj.kanjo_detail[i] = kanjo_detail;
		}
	}

	if(kikan==5){
		////////////////////////////////////////////
		//未出力追加２
		////////////////////////////////////////////
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_1_0_0",pl1,addobjlist,CS.itask_tool_setedmap_index,amountname);
		//addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_2_2_0",pl2,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_2_0_0",pl3,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_3_0_0",pl4,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_4_0_0_-3",pl5,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_4_0_0",pl5_s,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_5_0_0",pl6,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_6_0_0",pl7,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_7_0_0",pl8,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_8_0_0",pl9,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_9_0_0",pl10,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_10_0_0",pl11,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_11_0_0",pl12,addobjlist,CS.itask_tool_setedmap_index,amountname);
		//addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_12_0_0",pl13,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("1_13_0_0",pl14,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_10_0_0",bs1,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_20_1_0",bs2,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_20_2_0",bs3,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_20_3_0",bs4,addobjlist,CS.itask_tool_setedmap_index,amountname);
		//addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_30_0_0",bs5,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_20_0_0",bs6,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_35_0_0",bs7,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_40_0_0",bs8,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_50_0_0",bs9,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_60_0_0",bs10,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_70_1_0",bs11,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_70_2_0",bs12,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_70_3_1",bs13,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_70_3_2",bs14,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_70_3_0",bs15,addobjlist,CS.itask_tool_setedmap_index,amountname);
		//addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_70_6_0",bs18,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_70_0_0",bs19,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_80_0_0",bs20,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_90_0_0",bs21,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_100_0_0",bs22,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_110_0_0",bs23,addobjlist,CS.itask_tool_setedmap_index,amountname);
		addobjlist=CS.itask_list_show_edit_window_getaddobjlist("2_120_0_0",bs24,addobjlist,CS.itask_tool_setedmap_index,amountname);

		for(var i=0;i<addobjlist.length;i++){
			var have1_2_2_count=0;
			if(addobjlist[i]["m_kanjo_code"]=="1_2_2_0_-1"){
				for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
					if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],"1_2_2")){
						have1_2_2_count++;
					}
				}
				if(have1_2_2_count<=1){
					continue;
				}else{
					for(var j=CS.vueObj.kanjo_detail.length-1;j>=0;j--){
						if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],"1_2_2")){
							CS.vueObj.kanjo_detail.splice(j+1, 0, addobjlist[i]);
							break;
						}
					}
				}
			}else if(addobjlist[i]["m_kanjo_code"]=="2_110_0_0_0"){
				var have2_110_count=0;
				for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
					if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],"2_110")){
						have2_110_count++;
					}
				}
				if(have2_110_count>0){
					continue;
				}else{
					for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
						if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],"2_120")){
							CS.vueObj.kanjo_detail.splice(j-1, 0, addobjlist[i]);
							break;
						}
					}
				}
			}else{
				var m_kanjo_code_list=addobjlist[i]["m_kanjo_code"].split("_");
				if(m_kanjo_code_list[3]!="0"){
					var dedflag=false;
					for(var j=CS.vueObj.kanjo_detail.length-1;j>=0;j--){
						if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],m_kanjo_code_list[0]+"_"+m_kanjo_code_list[1]+"_"+m_kanjo_code_list[2]+"_"+m_kanjo_code_list[3])){
							CS.vueObj.kanjo_detail.splice(j+1, 0, addobjlist[i]);
							dedflag=true;
							break;
						}
					}
					if(!dedflag){
						for(var t=1;t<30;t++){
							for(var j=CS.vueObj.kanjo_detail.length-1;j>=0;j--){
								if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],m_kanjo_code_list[0]+"_"+m_kanjo_code_list[1]+"_"+m_kanjo_code_list[2]+"_"+(CS.toI(m_kanjo_code_list[3])-t))){
									CS.vueObj.kanjo_detail.splice(j+1, 0, addobjlist[i]);
									dedflag=true;
									break;
								}
							}
							if(dedflag){break;}
						}
					}
					if(!dedflag){
						for(var t=1;t<30;t++){
							for(var j=CS.vueObj.kanjo_detail.length-1;j>=0;j--){
								if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],m_kanjo_code_list[0]+"_"+m_kanjo_code_list[1]+"_"+(CS.toI(m_kanjo_code_list[2])-t))){
									CS.vueObj.kanjo_detail.splice(j+1, 0, addobjlist[i]);
									dedflag=true;
									break;
								}
							}
							if(dedflag){break;}
						}
					}
					if(!dedflag){
						CS.vueObj.kanjo_detail.push(addobjlist[i]);
					}
				}else{
					var dedflag=false;
					for(var j=CS.vueObj.kanjo_detail.length-1;j>=0;j--){
						if(m_kanjo_code_list[3]=="0" && m_kanjo_code_list[2]=="0"){
							if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],m_kanjo_code_list[0]+"_"+m_kanjo_code_list[1])){
								CS.vueObj.kanjo_detail.splice(j+1, 0, addobjlist[i]);
								dedflag=true;
								break;
							}
						}else if(m_kanjo_code_list[3]=="0"){
							if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],m_kanjo_code_list[0]+"_"+m_kanjo_code_list[1]+"_"+m_kanjo_code_list[2])){
								CS.vueObj.kanjo_detail.splice(j+1, 0, addobjlist[i]);
								dedflag=true;
								break;
							}
						}
					}
					if(!dedflag){
						for(var t=1;t<30;t++){
							for(var j=CS.vueObj.kanjo_detail.length-1;j>=0;j--){
								if(m_kanjo_code_list[3]=="0" && m_kanjo_code_list[2]=="0"){
									if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],m_kanjo_code_list[0]+"_"+(CS.toI(m_kanjo_code_list[1])-t))){
										CS.vueObj.kanjo_detail.splice(j+1, 0, addobjlist[i]);
										dedflag=true;
										break;
									}
								}else if(m_kanjo_code_list[3]=="0"){
									if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],m_kanjo_code_list[0]+"_"+m_kanjo_code_list[1]+"_"+(CS.toI(m_kanjo_code_list[2])-t))){
										CS.vueObj.kanjo_detail.splice(j+1, 0, addobjlist[i]);
										dedflag=true;
										break;
									}
								}
							}
							if(dedflag){break;}
						}

					}
					if(!dedflag){
						CS.vueObj.kanjo_detail.push(addobjlist[i]);
					}
				}
			}
		}
	}
	for (let key in CS.itask_tool_setedmap_sub_index) {
		var shotkey_=key.split('_');
		var bs25=CS.itask_list_show_edit_window_pana_calc_sum6(CS.toI(shotkey_[0]),CS.toI(shotkey_[1]),CS.toI(shotkey_[2]),CS.toI(shotkey_[3]),null)[pppppp];
		if(typeof bs25 == "undefined" || bs25 ==null || bs25==""){
			CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_sub_index[key]][amountname]="";
		}else{
			CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_sub_index[key]][amountname]=bs25.toLocaleString();
		}
		if(CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_sub_index[key]]["m_kanjo_code"]=="2_10_1_1_-4"){
			var bs25_1=CS.itask_list_show_edit_window_pana_calc_sum6(CS.toI(shotkey_[0]),CS.toI(shotkey_[1]),CS.toI(shotkey_[2]),CS.toI(shotkey_[3]),null)[pppppp];
			var bs25_2=CS.itask_list_show_edit_window_pana_calc_sum6(2,10,2,0,null)[pppppp];
			if(typeof bs25_1 != "undefined" || bs25_1 !=null || bs25_1!="" || typeof bs25_2 != "undefined" || bs25_2 !=null || bs25_2!=""){
				if(bs25_1==""){
					bs25_1=0;
				}
				if(bs25_2==""){
					bs25_2=0;
				}
				CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_sub_index[key]][amountname]=(bs25_1+bs25_2).toLocaleString();;
			}else{
				CS.vueObj.kanjo_detail[CS.itask_tool_setedmap_sub_index[key]][amountname]="";
			}
		}
	}
	CS.vueObj.itask_list_show_edit_pana_tag_button_red1=2;
	CS.vueObj.itask_list_show_edit_pana_tag_button_red2=2;
	CS.vueObj.itask_list_show_edit_pana_tag_button_red3=2;
	CS.vueObj.itask_list_show_edit_pana_tag_button_red4=2;
	CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red1=2;
	CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red2=2;
	CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red3=2;
	CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red4=2;
	var amount="amount_pre_year";
	var keisan="zenki_keisan";
	CS.pl2_zenki="";
	CS.pl2_konki="";
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		amount="amount_pre_year";
		keisan="zenki_keisan";
		if(CS.vueObj.kanjo_detail[i][amount]=="" && CS.vueObj.kanjo_detail[i][keisan]=="0"){
			CS.vueObj.kanjo_detail[i][keisan]="";
		}
		CS.vueObj.kanjo_detail[i][amount]=CS.vueObj.kanjo_detail[i][amount]+"";
		if(!isNaN(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10))){
			if(kikan==5){
				CS.vueObj.kanjo_detail[i][amount]=parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10).toLocaleString();
				if(typeof CS.vueObj.kanjo_detail[i][keisan]!="undefined" && CS.vueObj.kanjo_detail[i][keisan]!=null && CS.vueObj.kanjo_detail[i][keisan]!=""){
					var oldnumber=parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10);
					var newnumber=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10);
					if(oldnumber != newnumber){
						var nextflag=true;
						// CS.vueObj.kanjo_detail[i][amount]=(oldnumber*-1).toLocaleString();
						// if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
							// CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
						// }else{
							// CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
							// CS.itask_list_show_edit_window_kensan(6);
							// autochangeflag=true;
							// nextflag=false;
						// }
						if(nextflag){
							var oldtext=oldnumber+"";
							var newtext=newnumber+"";
							if(oldtext.substr(0,1)=="4"){
								CS.vueObj.kanjo_detail[i][amount]=(-1*parseInt(oldtext.substr(1),10)).toLocaleString();
								CS.itask_list_show_edit_window_kensan(6);
								if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
									CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
								}else{
									CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
									autochangeflag=true;
									nextflag=false;
								}
							}
						}
						if(nextflag){
							for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
								if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10))){
									var d=newnumber<oldnumber;
									var oldtargetnumber=parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10);
									if(d<0){
										if(Math.abs(d/4.5)==oldtargetnumber){
											CS.vueObj.kanjo_detail[j][amount]=(oldtargetnumber*10).toLocaleString();
											CS.itask_list_show_edit_window_kensan(6);
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}else if(d>0){
										if(d/4.5==oldtargetnumber){
											CS.vueObj.kanjo_detail[j][amount]=(oldtargetnumber/10).toLocaleString();
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}else if(d/4.5*1.05>=oldtargetnumber){
										if(d/4.5==oldtargetnumber){
											CS.vueObj.kanjo_detail[j][keisan+"_yellow"]=true;
										}
									}
								}
							}
						}
						if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[i]["m_kanjo_code"],"1_1_0_0")){
							for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
								if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_1_0_4")){
									var oldtargetnumber=parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10);
									var oldtargettext=oldtargetnumber+"";
									CS.vueObj.kanjo_detail[j]["oldtargettext"]=oldtargettext;
									if(oldtargettext.substr(0,1)=="4"){
										CS.vueObj.kanjo_detail[j][amount]=(-1*parseInt(oldtargettext.substr(1),10)).toLocaleString();
									}
								}
							}
							CS.itask_list_show_edit_window_kensan(6);
							if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_1_0_4")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											CS.vueObj.kanjo_detail[j][amount]=CS.vueObj.kanjo_detail[j]["oldtargettext"];
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
										}
									}
								}
								CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
							}else{
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_1_0_4")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}
								}
								// CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
								// autochangeflag=true;
								// nextflag=false;
							}
						}
						if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[i]["m_kanjo_code"],"1_7_0_0")){
							for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
								if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
									var oldtargetnumber=parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10);
									var oldtargettext=oldtargetnumber+"";
									CS.vueObj.kanjo_detail[j]["oldtargettext"]=oldtargettext;
									if(oldtargettext.substr(0,1)=="4"){
										CS.vueObj.kanjo_detail[j][amount]=(-1*parseInt(oldtargettext.substr(1),10)).toLocaleString();
									}
								}
							}
							CS.itask_list_show_edit_window_kensan(6);
							if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											CS.vueObj.kanjo_detail[j][amount]=CS.vueObj.kanjo_detail[j]["oldtargettext"];
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
										}
									}
								}
								CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
							}else{
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}
								}
								// CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
								// autochangeflag=true;
								// nextflag=false;
							}
						}
						if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[i]["m_kanjo_code"],"1_8_0_0")){
							for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
								if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
									var oldtargetnumber=parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10);
									var oldtargettext=oldtargetnumber+"";
									CS.vueObj.kanjo_detail[j]["oldtargettext"]=oldtargettext;
									if(oldtargettext.substr(0,1)=="4"){
										CS.vueObj.kanjo_detail[j][amount]=(-1*parseInt(oldtargettext.substr(1),10)).toLocaleString();
									}
								}
							}
							CS.itask_list_show_edit_window_kensan(6);
							if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											CS.vueObj.kanjo_detail[j][amount]=CS.vueObj.kanjo_detail[j]["oldtargettext"];
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
										}
									}
								}
								CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
							}else{
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}
								}
								// CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
								// autochangeflag=true;
								// nextflag=false;
							}
						}
						if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[i]["m_kanjo_code"],"1_9_0_0")){
							for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
								if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_9_0_0")){
									var oldtargetnumber=parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10);
									var oldtargettext=oldtargetnumber+"";
									CS.vueObj.kanjo_detail[j]["oldtargettext"]=oldtargettext;
									if(oldtargettext.substr(0,1)=="4"){
										CS.vueObj.kanjo_detail[j][amount]=(-1*parseInt(oldtargettext.substr(1),10)).toLocaleString();
									}
								}
							}
							CS.itask_list_show_edit_window_kensan(6);
							if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_9_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											CS.vueObj.kanjo_detail[j][amount]=CS.vueObj.kanjo_detail[j]["oldtargettext"];
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
										}
									}
								}
								CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
							}else{
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_9_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}
								}
								// CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
								// autochangeflag=true;
								// nextflag=false;
							}
						}
						if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[i]["m_kanjo_code"],"1_10_0_0")){
							for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
								if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
									var oldtargetnumber=parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10);
									var oldtargettext=oldtargetnumber+"";
									CS.vueObj.kanjo_detail[j]["oldtargettext"]=oldtargettext;
									if(oldtargettext.substr(0,1)=="4"){
										CS.vueObj.kanjo_detail[j][amount]=(-1*parseInt(oldtargettext.substr(1),10)).toLocaleString();
									}
								}
							}
							CS.itask_list_show_edit_window_kensan(6);
							if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											CS.vueObj.kanjo_detail[j][amount]=CS.vueObj.kanjo_detail[j]["oldtargettext"];
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
										}
									}
								}
								CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
							}else{
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}
								}
								// CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
								// autochangeflag=true;
								// nextflag=false;
							}
						}
						if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[i]["m_kanjo_code"],"1_11_0_0")){
							for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
								if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
									var oldtargetnumber=parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10);
									var oldtargettext=oldtargetnumber+"";
									CS.vueObj.kanjo_detail[j]["oldtargettext"]=oldtargettext;
									if(oldtargettext.substr(0,1)=="4"){
										CS.vueObj.kanjo_detail[j][amount]=(-1*parseInt(oldtargettext.substr(1),10)).toLocaleString();
									}
								}
							}
							CS.itask_list_show_edit_window_kensan(6);
							if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											CS.vueObj.kanjo_detail[j][amount]=CS.vueObj.kanjo_detail[j]["oldtargettext"];
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
										}
									}
								}
								CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
							}else{
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}
								}
								// CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
								// autochangeflag=true;
								// nextflag=false;
							}
						}
						if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[i]["m_kanjo_code"],"1_13_0_0")){
							for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
								if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
									var oldtargetnumber=parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10);
									var oldtargettext=oldtargetnumber+"";
									CS.vueObj.kanjo_detail[j]["oldtargettext"]=oldtargettext;
									if(oldtargettext.substr(0,1)=="4"){
										CS.vueObj.kanjo_detail[j][amount]=(-1*parseInt(oldtargettext.substr(1),10)).toLocaleString();
									}
								}
							}
							CS.itask_list_show_edit_window_kensan(6);
							if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											CS.vueObj.kanjo_detail[j][amount]=CS.vueObj.kanjo_detail[j]["oldtargettext"];
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
										}
									}
								}
								CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
							}else{
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}
								}
								// CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
								// autochangeflag=true;
								// nextflag=false;
							}
						}
					}
				}
			}
			
			if(typeof CS.vueObj.kanjo_detail[i]["zenki_keisan"]!="undefined" && CS.vueObj.kanjo_detail[i]["zenki_keisan"]!=null && CS.vueObj.kanjo_detail[i]["zenki_keisan"]!="" && CS.vueObj.kanjo_detail[i]["amount_pre_year"]!=CS.vueObj.kanjo_detail[i]["zenki_keisan"]){
				CS.vueObj.kanjo_detail[i]["zenki_sagaku"]=parseInt(CS.vueObj.kanjo_detail[i]["zenki_keisan"].replaceAll(',', ''))-parseInt(CS.vueObj.kanjo_detail[i]["amount_pre_year"].replaceAll(',', ''));
				if(CS.vueObj.kanjo_detail[i]["zenki_sagaku"]>0){
					CS.vueObj.kanjo_detail[i]["zenki_sagaku"]="+"+CS.vueObj.kanjo_detail[i]["zenki_sagaku"].toLocaleString();
				}else{
					CS.vueObj.kanjo_detail[i]["zenki_sagaku"]=CS.vueObj.kanjo_detail[i]["zenki_sagaku"].toLocaleString();
				}
				if(CS.vueObj.kanjo_detail[i]["order"]=="2" && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)<40 ){
					if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
						CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red1=3;
					}else{
						CS.vueObj.itask_list_show_edit_pana_tag_button_red1=3;
					}
				}
				if(CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)>=40 ){
					if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
						CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red2=3;
					}else{
						CS.vueObj.itask_list_show_edit_pana_tag_button_red2=3;
					}
				}
				if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)!=4 ){
					if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
						CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red3=3;
					}else{
						CS.vueObj.itask_list_show_edit_pana_tag_button_red3=3;
					}
				}
				if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)==4 ){
					if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
						CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red4=3;
					}else{
						CS.vueObj.itask_list_show_edit_pana_tag_button_red4=3;
					}
				}
			}else{
				CS.vueObj.kanjo_detail[i]["zenki_sagaku"]=null;
			}
		}
		amount="amount_this_year";
		keisan="konki_keisan";
		if(CS.vueObj.kanjo_detail[i][amount]=="" && CS.vueObj.kanjo_detail[i][keisan]=="0"){
			CS.vueObj.kanjo_detail[i][keisan]="";
		}
		CS.vueObj.kanjo_detail[i][amount]=CS.vueObj.kanjo_detail[i][amount]+"";
		if(!isNaN(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10))){
			if(kikan==5){
				CS.vueObj.kanjo_detail[i][amount]=parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10).toLocaleString();
				if(typeof CS.vueObj.kanjo_detail[i][keisan]!="undefined" && CS.vueObj.kanjo_detail[i][keisan]!=null && CS.vueObj.kanjo_detail[i][keisan]!=""){
					var oldnumber=parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10);
					var newnumber=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10);
					if(oldnumber != newnumber){
						var nextflag=true;
						CS.vueObj.kanjo_detail[i][amount]=(oldnumber*-1).toLocaleString();
						if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
							CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
						}else{
							CS.itask_list_show_edit_window_kensan(6);
							CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
							autochangeflag=true;
							nextflag=false;
						}
						if(nextflag){
							var oldtext=oldnumber+"";
							var newtext=newnumber+"";
							if(oldtext.substr(0,1)=="4"){
								CS.vueObj.kanjo_detail[i][amount]=(-1*parseInt(oldtext.substr(1),10)).toLocaleString();
								CS.itask_list_show_edit_window_kensan(6);
								if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
									CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
								}else{
									CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
									autochangeflag=true;
									nextflag=false;
								}
							}
						}
						if(nextflag){
							for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
								if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10))){
									var d=newnumber<oldnumber;
									var oldtargetnumber=parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10);
									if(d<0){
										if(Math.abs(d/4.5)==oldtargetnumber){
											CS.vueObj.kanjo_detail[j][amount]=(oldtargetnumber*10).toLocaleString();
											CS.itask_list_show_edit_window_kensan(6);
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}else if(d>0){
										if(d/4.5==oldtargetnumber){
											CS.vueObj.kanjo_detail[j][amount]=(oldtargetnumber/10).toLocaleString();
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}else if(d/4.5*1.05>=oldtargetnumber){
										if(d/4.5==oldtargetnumber){
											CS.vueObj.kanjo_detail[j][keisan+"_yellow"]=true;
										}
									}
								}
							}
						}
						if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[i]["m_kanjo_code"],"1_1_0_0")){
							for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
								if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],"1_1_0_4")){
									var oldtargetnumber=parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10);
									var oldtargettext=oldtargetnumber+"";
									CS.vueObj.kanjo_detail[j]["oldtargettext"]=oldtargettext;
									if(oldtargettext.substr(0,1)=="4"){
										CS.vueObj.kanjo_detail[j][amount]=(-1*parseInt(oldtargettext.substr(1),10)).toLocaleString();
									}
								}
							}
							CS.itask_list_show_edit_window_kensan(6);
							if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],"1_1_0_4")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											CS.vueObj.kanjo_detail[j][amount]=CS.vueObj.kanjo_detail[j]["oldtargettext"];
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
										}
									}
								}
								CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
							}else{
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],"1_1_0_4")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}
								}
								// CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
								// autochangeflag=true;
								// nextflag=false;
							}
						}
						if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[i]["m_kanjo_code"],"1_7_0_0")){
							for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
								if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],"1_7_0_0")){
									var oldtargetnumber=parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10);
									var oldtargettext=oldtargetnumber+"";
									CS.vueObj.kanjo_detail[j]["oldtargettext"]=oldtargettext;
									if(oldtargettext.substr(0,1)=="4"){
										CS.vueObj.kanjo_detail[j][amount]=(-1*parseInt(oldtargettext.substr(1),10)).toLocaleString();
									}
								}
							}
							CS.itask_list_show_edit_window_kensan(6);
							if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											CS.vueObj.kanjo_detail[j][amount]=CS.vueObj.kanjo_detail[j]["oldtargettext"];
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
										}
									}
								}
								CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
							}else{
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}
								}
								//CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
								//autochangeflag=true;
								//nextflag=false;
							}
						}
						if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[i]["m_kanjo_code"],"1_8_0_0")){
							for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
								if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
									var oldtargetnumber=parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10);
									var oldtargettext=oldtargetnumber+"";
									CS.vueObj.kanjo_detail[j]["oldtargettext"]=oldtargettext;
									if(oldtargettext.substr(0,1)=="4"){
										CS.vueObj.kanjo_detail[j][amount]=(-1*parseInt(oldtargettext.substr(1),10)).toLocaleString();
									}
								}
							}
							CS.itask_list_show_edit_window_kensan(6);
							if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											CS.vueObj.kanjo_detail[j][amount]=CS.vueObj.kanjo_detail[j]["oldtargettext"];
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
										}
									}
								}
								CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
							}else{
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}
								}
								// CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
								// autochangeflag=true;
								// nextflag=false;
							}
						}
						if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[i]["m_kanjo_code"],"1_9_0_0")){
							for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
								if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],"1_9_0_0")){
									var oldtargetnumber=parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10);
									var oldtargettext=oldtargetnumber+"";
									CS.vueObj.kanjo_detail[j]["oldtargettext"]=oldtargettext;
									if(oldtargettext.substr(0,1)=="4"){
										CS.vueObj.kanjo_detail[j][amount]=(-1*parseInt(oldtargettext.substr(1),10)).toLocaleString();
									}
								}
							}
							CS.itask_list_show_edit_window_kensan(6);
							if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],"1_9_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											CS.vueObj.kanjo_detail[j][amount]=CS.vueObj.kanjo_detail[j]["oldtargettext"];
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
										}
									}
								}
								CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
							}else{
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[j]["m_kanjo_code"],"1_9_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}
								}
								//CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
								//autochangeflag=true;
								//nextflag=false;
							}
						}
						if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[i]["m_kanjo_code"],"1_10_0_0")){
							for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
								if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
									var oldtargetnumber=parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10);
									var oldtargettext=oldtargetnumber+"";
									CS.vueObj.kanjo_detail[j]["oldtargettext"]=oldtargettext;
									if(oldtargettext.substr(0,1)=="4"){
										CS.vueObj.kanjo_detail[j][amount]=(-1*parseInt(oldtargettext.substr(1),10)).toLocaleString();
									}
								}
							}
							CS.itask_list_show_edit_window_kensan(6);
							if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											CS.vueObj.kanjo_detail[j][amount]=CS.vueObj.kanjo_detail[j]["oldtargettext"];
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
										}
									}
								}
								CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
							}else{
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}
								}
								// CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
								// autochangeflag=true;
								// nextflag=false;
							}
						}
						if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[i]["m_kanjo_code"],"1_11_0_0")){
							for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
								if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
									var oldtargetnumber=parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10);
									var oldtargettext=oldtargetnumber+"";
									CS.vueObj.kanjo_detail[j]["oldtargettext"]=oldtargettext;
									if(oldtargettext.substr(0,1)=="4"){
										CS.vueObj.kanjo_detail[j][amount]=(-1*parseInt(oldtargettext.substr(1),10)).toLocaleString();
									}
								}
							}
							CS.itask_list_show_edit_window_kensan(6);
							if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											CS.vueObj.kanjo_detail[j][amount]=CS.vueObj.kanjo_detail[j]["oldtargettext"];
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
										}
									}
								}
								CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
							}else{
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}
								}
								// CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
								// autochangeflag=true;
								// nextflag=false;
							}
						}
						if(CS.eqles_shotkey(CS.vueObj.kanjo_detail[i]["m_kanjo_code"],"1_13_0_0")){
							for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
								if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
									var oldtargetnumber=parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10);
									var oldtargettext=oldtargetnumber+"";
									CS.vueObj.kanjo_detail[j]["oldtargettext"]=oldtargettext;
									if(oldtargettext.substr(0,1)=="4"){
										CS.vueObj.kanjo_detail[j][amount]=(-1*parseInt(oldtargettext.substr(1),10)).toLocaleString();
									}
								}
							}
							CS.itask_list_show_edit_window_kensan(6);
							if(parseInt(CS.vueObj.kanjo_detail[i][amount].replaceAll(',', ''),10)!=parseInt(CS.vueObj.kanjo_detail[i][keisan].replaceAll(',', ''),10)){
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											CS.vueObj.kanjo_detail[j][amount]=CS.vueObj.kanjo_detail[j]["oldtargettext"];
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
										}
									}
								}
								CS.vueObj.kanjo_detail[i][amount]=oldnumber.toLocaleString();
							}else{
								for(var j=0;j<CS.vueObj.kanjo_detail.length;j++){
									if(!isNaN(parseInt(CS.vueObj.kanjo_detail[j][amount].replaceAll(',', ''),10)) && CS.eqles_shotkey(CS.vueObj.kanjo_detail[i][amount],"1_7_0_0")){
										if(typeof CS.vueObj.kanjo_detail[j]["oldtargettext"] != "undefined"){
											delete CS.vueObj.kanjo_detail[j]["oldtargettext"];
											CS.vueObj.kanjo_detail[j]["autochangeflag"]=true;
											autochangeflag=true;
											nextflag=false;
										}
									}
								}
								// CS.vueObj.kanjo_detail[i]["autochangeflag"]=true;
								// autochangeflag=true;
								// nextflag=false;
							}
						}
					}
				}
			}
			//足さないケース
			//①期首棚卸高と足す場合
			//②期首棚卸高を足さない場合
			//の両方を計算し、①と②のどちらかが読みとり金額と合致していたら
			//それを検算結果に採用する
			
			if(typeof CS.vueObj.kanjo_detail[i]['zenki_keisan']=="undefined"){
				CS.vueObj.kanjo_detail[i]['zenki_keisan']="";
			}
			if(typeof CS.vueObj.kanjo_detail[i]['konki_keisan']=="undefined"){
				CS.vueObj.kanjo_detail[i]['konki_keisan']="";
			}
			//pl1
			if(CS.delete_kensan_kanjo_detail("1_1_0_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var t_zenki_2=parseInt(CS.itask_list_show_edit_window_pana_calc_sum_f(1,1,)[1],10);
					var t_konki_2=parseInt(CS.itask_list_show_edit_window_pana_calc_sum_f(1,1,)[0],10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
				t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				CS.pl1_zenki=t_zenki;
				CS.pl1_konki=t_konki;
			}
			//pl2
			if(CS.delete_kensan_kanjo_detail("1_2_2_0",i)){
				/**var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				CS.pl2_zenki=t_zenki;
				CS.pl2_konki=t_konki;
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=-CS.itask_list_show_edit_window_pana_calc_sum(1,2,1,0,)[1] - CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,0,)[1];
					var T5=CS.itask_list_show_edit_window_pana_calc_sum(1,2,1,0,)[1];
					var T6=CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,0,)[1];

					if(T5=="" && T6==""){
						zenki="";
					}else if(T5=="" || T6==""){
						if(T5==""){
							T5=0;
						}
						if(T6==""){
							T6=0;
						}
						zenki=0 - T5 - T6;
					}
					var konki=-CS.itask_list_show_edit_window_pana_calc_sum(1,2,1,0,)[0] - CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,0,)[0];
					var T5=CS.itask_list_show_edit_window_pana_calc_sum(1,2,1,0,)[0];
					var T6=CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,0,)[0];

					if(T5=="" && T6==""){
						konki="";
					}else if(T5=="" || T6==""){
						if(T5==""){
							T5=0;
						}
						if(T6==""){
							T6=0;
						}
						konki=0 - T5 - T6;
					}
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;**/
			}
			//pl3
			if(CS.delete_kensan_kanjo_detail("1_2_0_0",i)){
				/**var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=CS.pl2_zenki - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[1];
					if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[1]=="" && CS.pl2_zenki==""){
						zenki="";
					}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[1]!="" && CS.pl2_zenki==""){
						zenki=0 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[1];
					}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[1]=="" && CS.pl2_zenki!=""){
						zenki=CS.pl2_zenki;
					}
					var konki=CS.pl2_konki - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[0];
					if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[0]=="" && CS.pl2_konki==""){
						konki="";
					}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[0]!="" && CS.pl2_konki==""){
						konki=0 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[0];
					}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[0]=="" && CS.pl2_konki!=""){
						konki=CS.pl2_konki;
					}
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					var p13nextflag=true;
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						p13nextflag=false;
					}

					if(p13nextflag){
						CS.delete_kensan_kanjo_detail_flag=true;
						var zenki=-CS.itask_list_show_edit_window_pana_calc_sum(1,2,1,0,)[1] - CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,0,)[1];
						var T5=CS.itask_list_show_edit_window_pana_calc_sum(1,2,1,0,)[1];
						var T6=CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,0,)[1];

						if(T5=="" && T6==""){
							zenki="";
						}else if(T5=="" || T6==""){
							if(T5==""){
								T5=0;
							}
							if(T6==""){
								T6=0;
							}
							zenki=0 - T5 - T6;
						}
						var konki=-CS.itask_list_show_edit_window_pana_calc_sum(1,2,1,0,)[0] - CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,0,)[0];
						var T5=CS.itask_list_show_edit_window_pana_calc_sum(1,2,1,0,)[0];
						var T6=CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,0,)[0];

						if(T5=="" && T6==""){
							konki="";
						}else if(T5=="" || T6==""){
							if(T5==""){
								T5=0;
							}
							if(T6==""){
								T6=0;
							}
							konki=0 - T5 - T6;
						}
						var t_zenki_2_p12=parseInt(zenki,10);
						var t_konki_2_p12=parseInt(konki,10);
						if(isNaN(t_zenki_2_p12)){
							t_zenki_2_p12="";
						}
						if(isNaN(t_konki_2_p12)){
							t_konki_2_p12="";
						}
						CS.delete_kensan_kanjo_detail_flag=true;
						var zenki=t_zenki_2_p12 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[1];
						if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[1]=="" && t_zenki_2_p12==""){
							zenki="";
						}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[1]!="" && t_zenki_2_p12==""){
							zenki=0 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[1];
						}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[1]=="" && t_zenki_2_p12!=""){
							zenki=t_zenki_2_p12;
						}
						var konki=t_konki_2_p12 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[0];
						if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[0]=="" && t_konki_2_p12==""){
							konki="";
						}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[0]!="" && t_konki_2_p12==""){
							konki=0 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[0];
						}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[0]=="" && t_konki_2_p12!=""){
							konki=t_konki_2_p12;
						}
						var t_zenki_2=parseInt(zenki,10);
						var t_konki_2=parseInt(konki,10);
						if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
							if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
								CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
							}
							if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
								CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
							}
							p13nextflag=false;
						}
					}
					if(p13nextflag){
						CS.delete_kensan_kanjo_detail_flag=false;
						var zenki=-CS.itask_list_show_edit_window_pana_calc_sum(1,2,1,0,)[1] - CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,0,)[1];
						var T5=CS.itask_list_show_edit_window_pana_calc_sum(1,2,1,0,)[1];
						var T6=CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,0,)[1];

						if(T5=="" && T6==""){
							zenki="";
						}else if(T5=="" || T6==""){
							if(T5==""){
								T5=0;
							}
							if(T6==""){
								T6=0;
							}
							zenki=0 - T5 - T6;
						}
						var konki=-CS.itask_list_show_edit_window_pana_calc_sum(1,2,1,0,)[0] - CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,0,)[0];
						var T5=CS.itask_list_show_edit_window_pana_calc_sum(1,2,1,0,)[0];
						var T6=CS.itask_list_show_edit_window_pana_calc_sum(1,2,2,0,)[0];

						if(T5=="" && T6==""){
							konki="";
						}else if(T5=="" || T6==""){
							if(T5==""){
								T5=0;
							}
							if(T6==""){
								T6=0;
							}
							konki=0 - T5 - T6;
						}
						var t_zenki_2_p12=parseInt(zenki,10);
						var t_konki_2_p12=parseInt(konki,10);
						if(isNaN(t_zenki_2_p12)){
							t_zenki_2_p12="";
						}
						if(isNaN(t_konki_2_p12)){
							t_konki_2_p12="";
						}
						CS.delete_kensan_kanjo_detail_flag=true;
						var zenki=t_zenki_2_p12 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[1];
						if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[1]=="" && t_zenki_2_p12==""){
							zenki="";
						}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[1]!="" && t_zenki_2_p12==""){
							zenki=0 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[1];
						}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[1]=="" && t_zenki_2_p12!=""){
							zenki=t_zenki_2_p12;
						}
						var konki=t_konki_2_p12 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[0];
						if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[0]=="" && t_konki_2_p12==""){
							konki="";
						}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[0]!="" && t_konki_2_p12==""){
							konki=0 - CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[0];
						}else if(CS.itask_list_show_edit_window_pana_calc_sum(1,2,3,0,)[0]=="" && t_konki_2_p12!=""){
							konki=t_konki_2_p12;
						}
						var t_zenki_2=parseInt(zenki,10);
						var t_konki_2=parseInt(konki,10);
						if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
							if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
								CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
							}
							if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
								CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
							}
							p13nextflag=false;
							
						}
					}
					if(!p13nextflag){
						t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
						t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
						CS.pl3_zenki=t_zenki;
						CS.pl3_konki=t_konki;
						if(kikan!=7 && kikan!=6){
							CS.p13nextflag=0;
						}else{
							CS.p13nextflag++;
						}
						if(CS.p13nextflag<15){
							CS.itask_list_show_edit_window_kensan(7);
						}
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;**/
			}
			if(typeof CS.vueObj.kanjo_detail[i]['zenki_keisan'] =="undefined"){
				CS.vueObj.kanjo_detail[i]['zenki_keisan']="";
			}
			if(typeof CS.vueObj.kanjo_detail[i]['konki_keisan'] =="undefined"){
				CS.vueObj.kanjo_detail[i]['konki_keisan']="";
			}
			//pl5
			if(CS.delete_kensan_kanjo_detail("1_4_0_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=Math.abs(CS.itask_list_show_edit_window_pana_calc_sum_f(1,4,)[1]);
					var konki=Math.abs(CS.itask_list_show_edit_window_pana_calc_sum_f(1,4,)[0]);
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//pl5_s
			if(CS.delete_kensan_kanjo_detail("1_4_0_0_s",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=Math.abs(CS.itask_list_show_edit_window_pana_calc_sum_f_s(1,4,)[1]);
					var konki=Math.abs(CS.itask_list_show_edit_window_pana_calc_sum_f_s(1,4,)[0]);
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//pl7
			if(CS.delete_kensan_kanjo_detail("1_6_0_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=CS.itask_list_show_edit_window_pana_calc_sum(1,6,0,0,)[1];
					var konki=CS.itask_list_show_edit_window_pana_calc_sum(1,6,0,0,)[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//pl8
			if(CS.delete_kensan_kanjo_detail("1_7_0_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=-CS.itask_list_show_edit_window_pana_calc_sum(1,7,0,0,)[1];
					var konki=-CS.itask_list_show_edit_window_pana_calc_sum(1,7,0,0,)[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//pl10
			if(CS.delete_kensan_kanjo_detail("1_9_0_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=CS.itask_list_show_edit_window_pana_calc_sum(1,9,0,0,)[1];
					var konki=CS.itask_list_show_edit_window_pana_calc_sum(1,9,0,0,)[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//pl11
			if(CS.delete_kensan_kanjo_detail("1_10_0_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=-CS.itask_list_show_edit_window_pana_calc_sum(1,10,0,0,)[1];
					var konki=-CS.itask_list_show_edit_window_pana_calc_sum(1,10,0,0,)[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//pl13
			if(CS.delete_kensan_kanjo_detail("1_12_0_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=-CS.itask_list_show_edit_window_pana_calc_sum(1,12,0,0,)[1];
					var konki=-CS.itask_list_show_edit_window_pana_calc_sum(1,12,0,0,)[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//bs1
			if(CS.delete_kensan_kanjo_detail("2_10_0_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=CS.itask_list_show_edit_window_pana_calc_sum4(2,10,)[1];
					var konki=CS.itask_list_show_edit_window_pana_calc_sum4(2,10,)[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//bs2
			if(CS.delete_kensan_kanjo_detail("2_20_1_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=CS.itask_list_show_edit_window_pana_calc_sum(2,20,1,0,)[1];
					var konki=CS.itask_list_show_edit_window_pana_calc_sum(2,20,1,0,)[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//bs3
			if(CS.delete_kensan_kanjo_detail("2_20_2_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=CS.itask_list_show_edit_window_pana_calc_sum(2,20,2,0,)[1];
					var konki=CS.itask_list_show_edit_window_pana_calc_sum(2,20,2,0,)[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//bs4
			if(CS.delete_kensan_kanjo_detail("2_20_3_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=CS.itask_list_show_edit_window_pana_calc_sum(2,20,3,0,)[1];
					var konki=CS.itask_list_show_edit_window_pana_calc_sum(2,20,3,0,)[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//bs5
			if(CS.delete_kensan_kanjo_detail("2_30_0_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=CS.itask_list_show_edit_window_pana_calc_sum(2,30,0,0,)[1];
					var konki=CS.itask_list_show_edit_window_pana_calc_sum(2,30,0,0,)[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//bs8
			if(CS.delete_kensan_kanjo_detail("2_40_0_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=CS.itask_list_show_edit_window_pana_calc_sum4(2,40,0,0,)[1];
					var konki=CS.itask_list_show_edit_window_pana_calc_sum4(2,40,0,0,)[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//bs9
			if(CS.delete_kensan_kanjo_detail("2_50_0_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=CS.itask_list_show_edit_window_pana_calc_sum4(2,50,0,0,)[1];
					var konki=CS.itask_list_show_edit_window_pana_calc_sum4(2,50,0,0,)[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//bs11
			if(CS.delete_kensan_kanjo_detail("2_70_1_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=CS.itask_list_show_edit_window_pana_calc_sum(2,70,1,0,0)[1];
					var konki=CS.itask_list_show_edit_window_pana_calc_sum(2,70,1,0,0)[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//bs12
			if(CS.delete_kensan_kanjo_detail("2_70_2_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=CS.itask_list_show_edit_window_pana_calc_sum(2,70,2,0,0)[1];
					var konki=CS.itask_list_show_edit_window_pana_calc_sum(2,70,2,0,0)[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//bs13
			// if(CS.delete_kensan_kanjo_detail("2_70_3_1",i)){
				// var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				// var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				// var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				// var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				// if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					// CS.delete_kensan_kanjo_detail_flag=true;
					// var zenki=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,3,1,0)[1];
					// var konki=CS.itask_list_show_edit_window_pana_calc_sum_2(2,70,3,1,0)[0];
					// var t_zenki_2=parseInt(zenki,10);
					// var t_konki_2=parseInt(konki,10);
					// if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						// if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							// CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						// }
						// if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							// CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						// }
					// }
				// }
				// CS.delete_kensan_kanjo_detail_flag=false;
			// }
			//bs14
			if(CS.delete_kensan_kanjo_detail("2_70_3_2",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=sonota_rieki_jyouyokin()[1];
					var konki=sonota_rieki_jyouyokin()[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//bs18
			// if(CS.delete_kensan_kanjo_detail("2_70_6_3",i)){
				// var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				// var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				// var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				// var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				// if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					// CS.delete_kensan_kanjo_detail_flag=true;
					// var zenki=CS.itask_list_show_edit_window_pana_calc_sum(2,70,6,0,0)[1];
					// var konki=CS.itask_list_show_edit_window_pana_calc_sum(2,70,6,0,0)[0];
					// var t_zenki_2=parseInt(zenki,10);
					// var t_konki_2=parseInt(konki,10);
					// if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						// if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							// CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						// }
						// if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							// CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						// }
					// }
				// }
				// CS.delete_kensan_kanjo_detail_flag=false;
			// }
			//bs20
			if(CS.delete_kensan_kanjo_detail("2_80_0_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=CS.itask_list_show_edit_window_pana_calc_sum(2,80,0,0,0)[1];
					var konki=CS.itask_list_show_edit_window_pana_calc_sum(2,80,0,0,0)[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//bs21
			if(CS.delete_kensan_kanjo_detail("2_90_0_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=CS.itask_list_show_edit_window_pana_calc_sum(2,90,0,0,0)[1];
					var konki=CS.itask_list_show_edit_window_pana_calc_sum(2,90,0,0,0)[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			//bs22
			if(CS.delete_kensan_kanjo_detail("2_100_0_0",i)){
				var t_apy=parseInt(CS.vueObj.kanjo_detail[i]['amount_pre_year'].replaceAll(',', ''),10);
				var t_tpy=parseInt(CS.vueObj.kanjo_detail[i]['amount_this_year'].replaceAll(',', ''),10);
				var t_zenki=parseInt(CS.vueObj.kanjo_detail[i]['zenki_keisan'].replaceAll(',', ''),10);
				var t_konki=parseInt(CS.vueObj.kanjo_detail[i]['konki_keisan'].replaceAll(',', ''),10);
				if((!isNaN(t_apy) && t_apy!=t_zenki) || (!isNaN(t_tpy) && t_tpy!=t_konki)){
					CS.delete_kensan_kanjo_detail_flag=true;
					var zenki=CS.itask_list_show_edit_window_pana_calc_sum(2,100,0,0,0)[1];
					var konki=CS.itask_list_show_edit_window_pana_calc_sum(2,100,0,0,0)[0];
					var t_zenki_2=parseInt(zenki,10);
					var t_konki_2=parseInt(konki,10);
					if((isNaN(t_zenki_2) || t_apy==t_zenki_2) && (isNaN(t_konki_2) || t_tpy==t_konki_2)){
						if(typeof t_apy!="undefined" && !isNaN(t_zenki_2)){
							CS.vueObj.kanjo_detail[i]['zenki_keisan']=t_zenki_2.toLocaleString();
						}
						if(typeof t_tpy!="undefined" && !isNaN(t_konki_2)){
							CS.vueObj.kanjo_detail[i]['konki_keisan']=t_konki_2.toLocaleString();
						}
						//CS.itask_list_show_edit_window_kensan(6);
					}
				}
				CS.delete_kensan_kanjo_detail_flag=false;
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			if(typeof CS.vueObj.kanjo_detail[i]["konki_keisan"]!="undefined" && CS.vueObj.kanjo_detail[i]["konki_keisan"]!=null && CS.vueObj.kanjo_detail[i]["konki_keisan"]!="" && CS.vueObj.kanjo_detail[i]["amount_this_year"]!=CS.vueObj.kanjo_detail[i]["konki_keisan"]){
				CS.vueObj.kanjo_detail[i]["konki_sagaku"]=parseInt(CS.vueObj.kanjo_detail[i]["konki_keisan"].replaceAll(',', ''))-parseInt(CS.vueObj.kanjo_detail[i]["amount_this_year"].replaceAll(',', ''));
				if(CS.vueObj.kanjo_detail[i]["konki_sagaku"]>0){
					CS.vueObj.kanjo_detail[i]["konki_sagaku"]="+"+CS.vueObj.kanjo_detail[i]["konki_sagaku"].toLocaleString();
				}else{
					CS.vueObj.kanjo_detail[i]["konki_sagaku"]=CS.vueObj.kanjo_detail[i]["konki_sagaku"].toLocaleString();
				}
				if(CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)<40 ){
					if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
						CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red1=3;
					}else{
						CS.vueObj.itask_list_show_edit_pana_tag_button_red1=3;
					}
				}
				if(CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)>=40 ){
					if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
						CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red2=3;
					}else{
						CS.vueObj.itask_list_show_edit_pana_tag_button_red2=3;
					}
				}
				if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)!=4 ){
					if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
						CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red3=3;
					}else{
						CS.vueObj.itask_list_show_edit_pana_tag_button_red3=3;
					}
				}
				if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)==4 ){
					if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
						CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red4=3;
					}else{
						CS.vueObj.itask_list_show_edit_pana_tag_button_red4=3;
					}
				}
			}else{
				CS.vueObj.kanjo_detail[i]["konki_sagaku"]=null;
			}
		}
		var setSpeasRed=false;
		if(parseInt(CS.vueObj.kanjo_detail[i]["order"],10)==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)==35){
			setSpeasRed=true;
		}
		if(parseInt(CS.vueObj.kanjo_detail[i]["order"],10)==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)==120){
			setSpeasRed=true;
		}
		if(parseInt(CS.vueObj.kanjo_detail[i]["order"],10)==1 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)==13){
			setSpeasRed=true;
		}
		setSpeasRed=true;
		if(CS.vueObj.kanjo_detail[i]["amount_pre_year"]=="" && setSpeasRed){
			if(typeof CS.vueObj.kanjo_detail[i]["zenki_keisan"]!="undefined" && CS.vueObj.kanjo_detail[i]["zenki_keisan"]!=null && !isNaN(CS.vueObj.kanjo_detail[i]["zenki_keisan"]) && CS.vueObj.kanjo_detail[i]["zenki_keisan"]!="" && CS.vueObj.kanjo_detail[i]["amount_pre_year"]!=CS.vueObj.kanjo_detail[i]["zenki_keisan"]){
				if(CS.vueObj.kanjo_detail[i]["order"]=="2" && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)<40 ){
					if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
						CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red1=3;
					}else{
						CS.vueObj.itask_list_show_edit_pana_tag_button_red1=3;
					}
				}
				if(CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)>=40 ){
					if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
						CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red2=3;
					}else{
						CS.vueObj.itask_list_show_edit_pana_tag_button_red2=3;
					}
				}
				if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)!=4 ){
					if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
						CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red3=3;
					}else{
						CS.vueObj.itask_list_show_edit_pana_tag_button_red3=3;
					}
				}
				if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)==4 ){
					if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
						CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red4=3;
					}else{
						CS.vueObj.itask_list_show_edit_pana_tag_button_red4=3;
					}
				}
			}
		}
		if(CS.vueObj.kanjo_detail[i]["amount_this_year"]=="" && setSpeasRed){
			if(typeof CS.vueObj.kanjo_detail[i]["konki_keisan"]!="undefined" && CS.vueObj.kanjo_detail[i]["konki_keisan"]!=null && !isNaN(CS.vueObj.kanjo_detail[i]["konki_keisan"]) && CS.vueObj.kanjo_detail[i]["konki_keisan"]!="" && CS.vueObj.kanjo_detail[i]["amount_this_year"]!=CS.vueObj.kanjo_detail[i]["konki_keisan"]){
				if(CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)<40 ){
					if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
						CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red1=3;
					}else{
						CS.vueObj.itask_list_show_edit_pana_tag_button_red1=3;
					}
				}
				if(CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)>=40 ){
					if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
						CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red2=3;
					}else{
						CS.vueObj.itask_list_show_edit_pana_tag_button_red2=3;
					}
				}
				if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)!=4 ){
					if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
						CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red3=3;
					}else{
						CS.vueObj.itask_list_show_edit_pana_tag_button_red3=3;
					}
				}
				if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)==4 ){
					if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
						CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red4=3;
					}else{
						CS.vueObj.itask_list_show_edit_pana_tag_button_red4=3;
					}
				}
			}
		}
		if(CS.vueObj.kanjo_detail[i]["zenki_keisan"]!=null && typeof CS.vueObj.kanjo_detail[i]["zenki_keisan"]!="undefined" && isNaN(parseInt((CS.vueObj.kanjo_detail[i]["zenki_keisan"]+"").replaceAll(',', ''),10))){
			CS.vueObj.kanjo_detail[i]["zenki_keisan"]="";
		}
		if(CS.vueObj.kanjo_detail[i]["konki_keisan"]!=null && typeof CS.vueObj.kanjo_detail[i]["konki_keisan"]!="undefined" && isNaN(parseInt((CS.vueObj.kanjo_detail[i]["konki_keisan"]+"").replaceAll(',', ''),10))){
			CS.vueObj.kanjo_detail[i]["konki_keisan"]="";
		}
		if(typeof CS.vueObj.kanjo_detail[i]["kanjyo_error"] !="undefined"){
			if(CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)<40 ){
				if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
				}else{
					CS.vueObj.itask_list_show_edit_pana_tag_button_red1=3;
				}
			}
			if(CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)>=40 ){
				if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
				}else{
					CS.vueObj.itask_list_show_edit_pana_tag_button_red2=3;
				}
			}
			if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)!=4 ){
				if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
				}else{
					CS.vueObj.itask_list_show_edit_pana_tag_button_red3=3;
				}
			}
			if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)==4 ){
				if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
				}else{
					CS.vueObj.itask_list_show_edit_pana_tag_button_red4=3;
				}
			}
		}
		CS.vueObj.$set(CS.vueObj.kanjo_detail, i, CS.vueObj.kanjo_detail[i]);
	}
	var havetab4=false;
	var havetab4goukei=false;
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)==4 ){
			havetab4=true;
			if(CS.itask_list_show_edit_window_pana_is_goukei(CS.vueObj.kanjo_detail[i],CS.vueObj.kanjo_detail[i])){
				havetab4goukei=true;
			}
		}
	}
	if(havetab4 && !havetab4goukei){
		if(CS.vueObj.itask_list_show_edit_pana_houjin_input_show){
			CS.vueObj.itask_list_show_edit_pana_tag_button_eazyinput_red4=3;
		}else{
			CS.vueObj.itask_list_show_edit_pana_tag_button_red4=3;
		}
	}
	if(CS.vueObj.itask_list_show_edit_pana_seisa_over1){
		CS.vueObj.itask_list_show_edit_pana_tag_button_red1=4;
	}
	if(CS.vueObj.itask_list_show_edit_pana_seisa_over2){
		CS.vueObj.itask_list_show_edit_pana_tag_button_red2=4;
	}
	if(CS.vueObj.itask_list_show_edit_pana_seisa_over3){
		CS.vueObj.itask_list_show_edit_pana_tag_button_red3=4;
	}
	if(CS.vueObj.itask_list_show_edit_pana_seisa_over4){
		CS.vueObj.itask_list_show_edit_pana_tag_button_red4=4;
	}
	CS.vueObj.exmessage_flag=null;
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		if(typeof CS.vueObj.kanjo_detail[i]["amount_pre_year"]!="undefined" && CS.vueObj.kanjo_detail[i]["amount_pre_year"]!=null && CS.vueObj.kanjo_detail[i]["amount_pre_year"]!=""){
			CS.vueObj.kanjo_detail[i]["amount_pre_year"]=parseInt(CS.vueObj.kanjo_detail[i]["amount_pre_year"].replaceAll(',', ''),10).toLocaleString();
		}else if(typeof CS.vueObj.kanjo_detail[i]["amount_this_year"]!="undefined" && CS.vueObj.kanjo_detail[i]["amount_this_year"]!=null && CS.vueObj.kanjo_detail[i]["amount_this_year"]!=""){
			CS.vueObj.kanjo_detail[i]["amount_this_year"]=parseInt(CS.vueObj.kanjo_detail[i]["amount_this_year"].replaceAll(',', ''),10).toLocaleString();
		}
		var kanjo_detail=CS.vueObj.kanjo_detail[i];
		//if(kanjo_detail["variety_name"].substr(0,2)=="うち" || kanjo_detail["variety_name"].substr(1,2)=="うち" || (kanjo_detail["variety_name"].indexOf('当期')!=-1 && kanjo_detail["variety_name"].indexOf('利益')!=-1 && CS.vueObj.kanjo_detail[i]["order"]==2) ){
		var todoflag=false;
		if(typeof kanjo_detail["variety_name"] != "undefined"){
			if(kanjo_detail["variety_name"].substr(0,2)=="うち" || kanjo_detail["variety_name"].substr(1,2)=="うち"){
				if(kanjo_detail["variety_name"].substr(0,2)!="ゆう"){
					todoflag=true;
				}
			}
			if(kanjo_detail["variety_name"].indexOf('当期')!=-1 && kanjo_detail["variety_name"].indexOf('利益')!=-1 && CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)==70){
				todoflag=true;
			}
			if(kanjo_detail["variety_name"].indexOf('前期繰越')!=-1 && CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)==70){
				todoflag=true;
			}
		}

		if(todoflag){
			if(kanjo_detail["koteiitemflag"]!=false && kanjo_detail["kenzankaijyo"]!=true){
				CS.vueObj.exmessage_flag="01"+kanjo_detail["variety_name"];
			}else if(kanjo_detail["koteiitemflag"]!=false){
				CS.vueObj.exmessage_flag="02"+kanjo_detail["variety_name"];
			}else if(kanjo_detail["kenzankaijyo"]!=true){
				CS.vueObj.exmessage_flag="03"+kanjo_detail["variety_name"];
			}
		}
	}
	if(autochangeflag){
		if(kikan==5){
			CS.kikannextflag++;
		}else if(kikan==2){
			CS.kikannextflag=0;
		}
		if(CS.kikannextflag<15){
			CS.itask_list_show_edit_window_kensan(kikan);
		}
	}
}
CS.dhp_show_list = function() {
	var obj = {};
	obj["action"] = "dhp_show_list";
	$.ajax({
		type: 'POST',
		url: CS.MENU_KANRI_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			
		}
	});
}
CS.kanjo_detail_addup = function(index) {
	CS.kanjo_detail_add_index=index;
	if(CS.kanjo_detail_add_index<0){
		CS.kanjo_detail_add_index=0;
	}
	CS.itask_list_show_edit_pana_kanjo_add();
}
CS.kanjo_detail_adddown = function(index) {
	CS.kanjo_detail_add_index=index+1;
	CS.itask_list_show_edit_pana_kanjo_add();
}
CS.kanjo_detail_up = function(index) {
	var sindex=null;
	if(index>0){
		for(var i=CS.vueObj.kanjo_detail.length-1;i>-1;i--){
			var doflag=false;
			if(CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)<40 && CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
				doflag=true;
			}
			if(CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)>=40 && CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
				doflag=true;
			}
			if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)!=4 && CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
				doflag=true;
			}
			if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)==4 && CS.vueObj.itask_list_show_edit_pana_tag_button_index==4){
				doflag=true;
			}
			if(doflag){
				if(i<index){
					sindex=i;
					break;
				}
			}
		}
		if(sindex==null){return;}
		[CS.vueObj.kanjo_detail[sindex], CS.vueObj.kanjo_detail[index]] = [CS.vueObj.kanjo_detail[index], CS.vueObj.kanjo_detail[sindex]];
		CS.aitask_edit_pikapika_index=sindex;
		CS.vueObj.kanjo_detail[CS.aitask_edit_pikapika_index].pikapika=true;
		setTimeout(function(){
			CS.vueObj.kanjo_detail[CS.aitask_edit_pikapika_index].pikapika=false;
			CS.vueObj.$set(CS.vueObj.kanjo_detail, CS.aitask_edit_pikapika_index, CS.vueObj.kanjo_detail[CS.aitask_edit_pikapika_index]);
		},300);
		CS.vueObj.$set(CS.vueObj.kanjo_detail, index, CS.vueObj.kanjo_detail[index]);
		CS.vueObj.$set(CS.vueObj.kanjo_detail, sindex, CS.vueObj.kanjo_detail[sindex]);
	}
	CS.itask_list_show_edit_pana_resort_kanjo_detail();
}
CS.kanjo_detail_down = function(index) {
	var sindex=null;	// 宣言漏れ(前回の値が残る・初回はエラー)のため追加
	if(index<CS.vueObj.kanjo_detail.length-1){
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			var doflag=false;
			if(CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)<40 && CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
				doflag=true;
			}
			if(CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)>=40 && CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
				doflag=true;
			}
			if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)!=4 && CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
				doflag=true;
			}
			if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)==4 && CS.vueObj.itask_list_show_edit_pana_tag_button_index==4){
				doflag=true;
			}
			if(doflag){
				if(i>index){
					sindex=i;
					break;
				}
			}
		}
		if(sindex==null){return;}
		[CS.vueObj.kanjo_detail[sindex], CS.vueObj.kanjo_detail[index]] = [CS.vueObj.kanjo_detail[index], CS.vueObj.kanjo_detail[sindex]];
		CS.aitask_edit_pikapika_index=sindex;
		CS.vueObj.kanjo_detail[CS.aitask_edit_pikapika_index].pikapika=true;
		setTimeout(function(){
			CS.vueObj.kanjo_detail[CS.aitask_edit_pikapika_index].pikapika=false;
			CS.vueObj.$set(CS.vueObj.kanjo_detail, CS.aitask_edit_pikapika_index, CS.vueObj.kanjo_detail[CS.aitask_edit_pikapika_index]);
		},300);
		CS.vueObj.$set(CS.vueObj.kanjo_detail, index, CS.vueObj.kanjo_detail[index]);
		CS.vueObj.$set(CS.vueObj.kanjo_detail, sindex, CS.vueObj.kanjo_detail[sindex]);
	}
	CS.itask_list_show_edit_pana_resort_kanjo_detail();
}
CS.itask_list_show_edit_pana_get_pre_year_houjin = function() {
	var obj = {};
	obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
	obj["closing_date_date"] = CS.vueObj.i_aitask_top_info["closing_date_date"];
	obj["company_company_code"] = CS.vueObj.i_aitask_top_info["company_company_code"];
	obj["action"] = "itask_list_show_edit_pana_get_pre_year";
	CS.itask_list_show_edit_pana_pre_year_c9 = "";
	CS.itask_list_show_edit_pana_pre_year_c10 = "";
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			if (typeof data["message"] != "undefined") {
				// if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
					// CS.alert_error(data["message"]);
				// }
				return;
			}
			//前年度データ
			CS.itask_list_show_edit_pana_pre_year=data["json6"];
			CS.itask_list_show_edit_pana_pre_year_code_map={};
			CS.itask_list_show_edit_pana_pre_year_tabindex_map={};
			
			var kanjo_detail=CS.vueObj.kanjo_detail;
			CS.vueObj.kanjo_detail=CS.itask_list_show_edit_pana_pre_year;
			CS.itask_list_show_edit_window_kensan(4);
			CS.itask_list_show_edit_pana_pre_year_c9 = CS.edit_window_kensan_pl_1["1"].toLocaleString();
			CS.itask_list_show_edit_pana_pre_year_c10 = CS.edit_window_kensan_pl_1["12"].toLocaleString();
			CS.vueObj.kanjo_detail=kanjo_detail;
			CS.itask_list_show_edit_window_kensan(4);
		}
	});
}
CS.itask_list_show_edit_pana_get_pre_year_kojin = function() {
	var obj = {};
	obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
	obj["closing_date_date"] = CS.vueObj.i_aitask_top_info["closing_date_date"];
	obj["company_company_code"] = CS.vueObj.i_aitask_top_info["company_company_code"];
	obj["action"] = "itask_list_show_edit_pana_get_pre_year";
	CS.itask_list_show_edit_pana_pre_year_c9 = "";
	CS.itask_list_show_edit_pana_pre_year_c10 = "";
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: false,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			if (typeof data["message"] != "undefined") {
				// if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")==-1){
					// CS.alert_error(data["message"]);
				// }
				return;
			}
			//前年度データ
			CS.itask_list_show_edit_pana_pre_year=data["json6"];
			CS.itask_list_show_edit_pana_pre_year_code_map={};
			CS.itask_list_show_edit_pana_pre_year_tabindex_map={};
			var kanjo_detail=CS.vueObj.kanjo_detail;
			CS.vueObj.kanjo_detail=CS.itask_list_show_edit_pana_pre_year;
			CS.itask_list_show_edit_window_kensan(4);
			var obj={}
			obj=CS.beforitasksave(obj);
			CS.itask_list_show_edit_pana_pre_year_c9 = obj["c0"];
			CS.itask_list_show_edit_pana_pre_year_c10 = obj["c8"];
			CS.vueObj.kanjo_detail=kanjo_detail;
			CS.itask_list_show_edit_window_kensan(4);
		}
	});
}
CS.itask_list_show_edit_pana_add_pre_year = function(item_p) {
	item_p["amount_pre_year"]=item_p["amount_this_year"];
	item_p["amount_this_year"]="";
	item_p["kenzankaijyo"]=false;
	item_p["koteiitem"]="NN";
	item_p["koteiitemflag"]=false;
	item_p["addflag"]=true;
	var p_code_list=item_p["m_kanjo_id"].split("_");
	//species検索
	var nextflag=true;
	for(var i=CS.vueObj.kanjo_detail.length-1;i>=0;i--){
		var item=CS.vueObj.kanjo_detail[i];
		var code_list=item["m_kanjo_id"].split("_");
		if(code_list[0] == p_code_list[0] && code_list[1] == p_code_list[1] && code_list[2] == p_code_list[2] && code_list[3] == p_code_list[3]){
			if((typeof item_p["tabindex"] != "undefined" && item_p["tabindex"] != "" && item_p["tabindex"] != null && item_p["tabindex"] == item["tabindex"]) || typeof item_p["tabindex"] == "undefined" || item_p["tabindex"] == "" || item_p["tabindex"] == null){
				if(parseInt(code_list[4],10)>0){
					CS.vueObj.kanjo_detail.splice(i+1, 0, item_p);
					nextflag=false;
					break;
				}
			}
		}
	}
	if(nextflag){
		for(var i=CS.vueObj.kanjo_detail.length-1;i>=0;i--){
			var item=CS.vueObj.kanjo_detail[i];
			var code_list=item["m_kanjo_id"].split("_");
			if(code_list[0] == p_code_list[0] && code_list[1] == p_code_list[1] && code_list[2] == p_code_list[2] && code_list[3] == p_code_list[3]){
				if((typeof item_p["tabindex"] != "undefined" && item_p["tabindex"] != "" && item_p["tabindex"] != null && item_p["tabindex"] == item["tabindex"]) || typeof item_p["tabindex"] == "undefined" || item_p["tabindex"] == "" || item_p["tabindex"] == null){
					CS.vueObj.kanjo_detail.splice(i+1, 0, item_p);
					nextflag=false;
					break;
				}
			}
		}
	}
	//genus検索
	if(nextflag){
		for(var i=CS.vueObj.kanjo_detail.length-1;i>=0;i--){
			var item=CS.vueObj.kanjo_detail[i];
			var code_list=item["m_kanjo_id"].split("_");
			if(code_list[0] == p_code_list[0] && code_list[1] == p_code_list[1] && code_list[2] == p_code_list[2]){
				if((typeof item_p["tabindex"] != "undefined" && item_p["tabindex"] != "" && item_p["tabindex"] != null && item_p["tabindex"] == item["tabindex"]) || typeof item_p["tabindex"] == "undefined" || item_p["tabindex"] == "" || item_p["tabindex"] == null){
					if(parseInt(code_list[4],10)>0){
						CS.vueObj.kanjo_detail.splice(i+1, 0, item_p);
						nextflag=false;
						break;
					}
				}
			}
		}
	}
	if(nextflag){
		for(var i=CS.vueObj.kanjo_detail.length-1;i>=0;i--){
			var item=CS.vueObj.kanjo_detail[i];
			var code_list=item["m_kanjo_id"].split("_");
			if(code_list[0] == p_code_list[0] && code_list[1] == p_code_list[1] && code_list[2] == p_code_list[2]){
				if((typeof item_p["tabindex"] != "undefined" && item_p["tabindex"] != "" && item_p["tabindex"] != null && item_p["tabindex"] == item["tabindex"]) || typeof item_p["tabindex"] == "undefined" || item_p["tabindex"] == "" || item_p["tabindex"] == null){
					CS.vueObj.kanjo_detail.splice(i+1, 0, item_p);
					nextflag=false;
					break;
				}
			}
		}
	}
	//family検索
	if(nextflag){
		for(var i=CS.vueObj.kanjo_detail.length-1;i>=0;i--){
			var item=CS.vueObj.kanjo_detail[i];
			var code_list=item["m_kanjo_id"].split("_");
			if(code_list[0] == p_code_list[0] && code_list[1] == p_code_list[1]){
				if((typeof item_p["tabindex"] != "undefined" && item_p["tabindex"] != "" && item_p["tabindex"] != null && item_p["tabindex"] == item["tabindex"]) || typeof item_p["tabindex"] == "undefined" || item_p["tabindex"] == "" || item_p["tabindex"] == null){
					if(parseInt(code_list[4],10)>0){
						CS.vueObj.kanjo_detail.splice(i+1, 0, item_p);
						nextflag=false;
						break;
					}
				}
			}
		}
	}
	if(nextflag){
		for(var i=CS.vueObj.kanjo_detail.length-1;i>=0;i--){
			var item=CS.vueObj.kanjo_detail[i];
			var code_list=item["m_kanjo_id"].split("_");
			if(code_list[0] == p_code_list[0] && code_list[1] == p_code_list[1]){
				if((typeof item_p["tabindex"] != "undefined" && item_p["tabindex"] != "" && item_p["tabindex"] != null && item_p["tabindex"] == item["tabindex"]) || typeof item_p["tabindex"] == "undefined" || item_p["tabindex"] == "" || item_p["tabindex"] == null){
					CS.vueObj.kanjo_detail.splice(i+1, 0, item_p);
					nextflag=false;
					break;
				}
			}
		}
	}
	//order検索
	if(nextflag){
		for(var i=CS.vueObj.kanjo_detail.length-1;i>=0;i--){
			var item=CS.vueObj.kanjo_detail[i];
			var code_list=item["m_kanjo_id"].split("_");
			if(code_list[0] == p_code_list[0]){
				if((typeof item_p["tabindex"] != "undefined" && item_p["tabindex"] != "" && item_p["tabindex"] != null && item_p["tabindex"] == item["tabindex"]) || typeof item_p["tabindex"] == "undefined" || item_p["tabindex"] == "" || item_p["tabindex"] == null){
					if(parseInt(code_list[4],10)>0){
						CS.vueObj.kanjo_detail.splice(i+1, 0, item_p);
						nextflag=false;
						break;
					}
				}
			}
		}
	}
	if(nextflag){
		for(var i=CS.vueObj.kanjo_detail.length-1;i>=0;i--){
			var item=CS.vueObj.kanjo_detail[i];
			var code_list=item["m_kanjo_id"].split("_");
			if(code_list[0] == p_code_list[0]){
				if((typeof item_p["tabindex"] != "undefined" && item_p["tabindex"] != "" && item_p["tabindex"] != null && item_p["tabindex"] == item["tabindex"]) || typeof item_p["tabindex"] == "undefined" || item_p["tabindex"] == "" || item_p["tabindex"] == null){
					CS.vueObj.kanjo_detail.splice(i+1, 0, item_p);
					nextflag=false;
					break;
				}
			}
		}
	}
	if(nextflag){
		var item_pStr = JSON.stringify(item_p);
		CS.vueObj.kanjo_detail.push(JSON.parse(item_pStr));
	}
	
}
CS.ImgB64Resize = function(imgB64_src, width, height, rotate, callback) {
    // Image Type
    var img_type = imgB64_src.substring(5, imgB64_src.indexOf(";"));
    // Source Image
    var img = new Image();
    img.onload = function() {
        // New Canvas
        var canvas = document.createElement('canvas');
        if(rotate == 90 || rotate == 270) {
            // swap w <==> h
            canvas.width = height;
            canvas.height = width;
        } else {
            canvas.width = width;
            canvas.height = height;
        }
        // Draw (Resize)
        var ctx = canvas.getContext('2d');
        if(0 < rotate && rotate < 360) {
            ctx.rotate(rotate * Math.PI / 180);
            if(rotate == 90)
                ctx.translate(0, -height);
            else if(rotate == 180)
                ctx.translate(-width, -height);
            else if(rotate == 270)
                ctx.translate(-width, 0);
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Destination Image
        var imgB64_dst = canvas.toDataURL(img_type);
        callback(imgB64_dst);
    };
    img.src = imgB64_src;
}
CS.itask_list_show_edit_window_get_def_img_kojin = function() {
	//(itask_list_show_edit_pana_tag_button_index==1 && item.order=='2' && parseInt(item.family,10)<40) || (itask_list_show_edit_pana_tag_button_index==2 && item.order=='2' && parseInt(item.family,10)>=40) || (itask_list_show_edit_pana_tag_button_index==3 && item.order=='1' && parseInt(item.family,10)!=99999999) || (itask_list_show_edit_pana_tag_button_index==4 && item.order=='1' && item.family=='4')
	if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
		if(typeof CS.vueObj.i_aitask_top_info["link1"] != "undefined" && CS.vueObj.i_aitask_top_info["link1"] != -1){
			CS.vueObj.itask_list_show_file_list_now_imgs_index=CS.vueObj.i_aitask_top_info["link1"];
			return;
		}
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			var item=CS.vueObj.kanjo_detail[i];
			if(i>=45 && i<=94){
				$("#itask_list_show_edit_window_pana_select_square_0").css("display","none");
				if(parseInt(item["page"],10)>-1){
					CS.vueObj.itask_list_show_file_list_now_imgs_index=parseInt(item["page"],10);
					break;
				}else{
					CS.vueObj.itask_list_show_file_list_now_imgs_index=0;
				}
			}
		}
	}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
		if(typeof CS.vueObj.i_aitask_top_info["link2"] != "undefined" && CS.vueObj.i_aitask_top_info["link2"] != -1){
			CS.vueObj.itask_list_show_file_list_now_imgs_index=CS.vueObj.i_aitask_top_info["link2"];
			return;
		}
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			var item=CS.vueObj.kanjo_detail[i];
			if(i>=0 && i<=44){
				$("#itask_list_show_edit_window_pana_select_square_0").css("display","none");
				if(parseInt(item["page"],10)>-1){
					CS.vueObj.itask_list_show_file_list_now_imgs_index=parseInt(item["page"],10);
					break;
				}else{
					CS.vueObj.itask_list_show_file_list_now_imgs_index=0;
				}
			}
		}
	}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
		if(typeof CS.vueObj.i_aitask_top_info["link3"] != "undefined" && CS.vueObj.i_aitask_top_info["link3"] != -1){
			CS.vueObj.itask_list_show_file_list_now_imgs_index=CS.vueObj.i_aitask_top_info["link3"];
			return;
		}
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			var item=CS.vueObj.kanjo_detail[i];
			if(i==95){
				$("#itask_list_show_edit_window_pana_select_square_0").css("display","none");
				if(parseInt(item["page"],10)>-1){
					CS.vueObj.itask_list_show_file_list_now_imgs_index=parseInt(item["page"],10);
					break;
				}else{
					CS.vueObj.itask_list_show_file_list_now_imgs_index=0;
				}
			}
		}
	}
}
CS.itask_list_show_edit_window_get_def_img = function() {
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("konjin")!=-1){
		CS.itask_list_show_edit_window_get_def_img_kojin();
		return;
	}
	//(itask_list_show_edit_pana_tag_button_index==1 && item.order=='2' && parseInt(item.family,10)<40) || (itask_list_show_edit_pana_tag_button_index==2 && item.order=='2' && parseInt(item.family,10)>=40) || (itask_list_show_edit_pana_tag_button_index==3 && item.order=='1' && parseInt(item.family,10)!=99999999) || (itask_list_show_edit_pana_tag_button_index==4 && item.order=='1' && item.family=='4')
	if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
		if(typeof CS.vueObj.i_aitask_top_info["link1"] != "undefined" && CS.vueObj.i_aitask_top_info["link1"] != -1){
			CS.vueObj.itask_list_show_file_list_now_imgs_index=CS.vueObj.i_aitask_top_info["link1"];
			return;
		}
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			var item=CS.vueObj.kanjo_detail[i];
			if(item.order=='2' && parseInt(item.family,10)<40){
				$("#itask_list_show_edit_window_pana_select_square_0").css("display","none");
				if(parseInt(item["page"],10)>-1){
					CS.vueObj.itask_list_show_file_list_now_imgs_index=parseInt(item["page"],10);
					break;
				}else{
					CS.vueObj.itask_list_show_file_list_now_imgs_index=0;
				}
			}
		}
	}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
		if(typeof CS.vueObj.i_aitask_top_info["link2"] != "undefined" && CS.vueObj.i_aitask_top_info["link2"] != -1){
			CS.vueObj.itask_list_show_file_list_now_imgs_index=CS.vueObj.i_aitask_top_info["link2"];
			return;
		}
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			var item=CS.vueObj.kanjo_detail[i];
			if(item.order=='2' && parseInt(item.family,10)>=40){
				$("#itask_list_show_edit_window_pana_select_square_0").css("display","none");
				if(parseInt(item["page"],10)>-1){
					CS.vueObj.itask_list_show_file_list_now_imgs_index=parseInt(item["page"],10);
					break;
				}else{
					CS.vueObj.itask_list_show_file_list_now_imgs_index=0;
				}
			}
		}
	}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
		if(typeof CS.vueObj.i_aitask_top_info["link3"] != "undefined" && CS.vueObj.i_aitask_top_info["link3"] != -1){
			CS.vueObj.itask_list_show_file_list_now_imgs_index=CS.vueObj.i_aitask_top_info["link3"];
			return;
		}
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			var item=CS.vueObj.kanjo_detail[i];
			if(item.order=='1' && parseInt(item.family,10)!=99999999 && parseInt(item.tabindex,10)!=4){
				$("#itask_list_show_edit_window_pana_select_square_0").css("display","none");
				if(parseInt(item["page"],10)>-1){
					CS.vueObj.itask_list_show_file_list_now_imgs_index=parseInt(item["page"],10);
					break;
				}else{
					CS.vueObj.itask_list_show_file_list_now_imgs_index=0;
				}
			}
		}
	}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==4){
		if(typeof CS.vueObj.i_aitask_top_info["link4"] != "undefined" && CS.vueObj.i_aitask_top_info["link4"] != -1){
			CS.vueObj.itask_list_show_file_list_now_imgs_index=CS.vueObj.i_aitask_top_info["link4"];
			return;
		}
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			var item=CS.vueObj.kanjo_detail[i];
			if(item.order=='1' && parseInt(item.family,10)==4 && parseInt(item.tabindex,10)==4){
				$("#itask_list_show_edit_window_pana_select_square_0").css("display","none");
				if(parseInt(item["page"],10)>-1){
					CS.vueObj.itask_list_show_file_list_now_imgs_index=parseInt(item["page"],10);
					break;
				}else{
					CS.vueObj.itask_list_show_file_list_now_imgs_index=0;
				}
			}
		}
	}
}
CS.itask_list_show_edit_window_show_tool = function() {
	if(CS.vueObj.itask_list_show_edit_window_tool_show){
		CS.vueObj.itask_list_show_edit_window_tool_show=false;
	}else{
		CS.vueObj.itask_list_show_edit_window_tool_show=true;
	}
}
CS.itask_list_show_edit_window_tool_soneki0 = function() {
	var obj = {};
	obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
	obj["closing_date_date"] = CS.vueObj.i_aitask_top_info["closing_date_date"];
	obj["company_company_code"] = CS.vueObj.i_aitask_top_info["company_company_code"];
	obj["image"] = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0].replaceAll('data:image/jpeg;base64,', '');
	obj["action"] = "itask_list_show_edit_window_tool_soneki0";
	obj["pageNumber"] = CS.vueObj.itask_list_show_file_list_now_imgs_index+0;
	CS.itask_list_show_edit_pana_pre_year_c9 = "";
	CS.itask_list_show_edit_pana_pre_year_c10 = "";
	CS.vueObj.itaskloadnig="aitask_pop_main";
	CS.vueObj.aitask_common_pop_ac=true;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: true,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			if (typeof data["message"] != "undefined") {
				CS.alert_error(data["message"]);
				CS.vueObj.itaskloadnig="";
				CS.vueObj.aitask_common_pop_ac=false;
				return;
			}
			var kanri_itask_kanjo_family_map = data["kanri_itask_kanjo_family_map"];
			var kanri_itask_kanjo_genus_map = data["kanri_itask_kanjo_genus_map"];
			var kanri_itask_kanjo_species_map = data["kanri_itask_kanjo_species_map"];
			var kanri_itask_kanjo_variety_map = data["kanri_itask_kanjo_variety_map"];
			var property_map = data["property_map"];
			var abc_flag_map = data["abc_flag_map"];
			//書式外情報リスト
			var ssglist=data["jsoncode"];
			if(typeof ssglist["format_info"] !="undefined"
			&& typeof ssglist["format_info"]["cols"] !="undefined"
			&& typeof ssglist["format_info"]["cols"][0] !="undefined"
			&& typeof ssglist["format_info"]["cols"][0]["block_result"] !="undefined"
			&& typeof ssglist["format_info"]["cols"][0]["block_result"]["detail"] !="undefined"){
				ssglist=ssglist["format_info"]["cols"][0]["block_result"]["detail"];
				for(var i=0;i<ssglist.length;i++){
					if(i>44){continue;}
					if(ssglist[i]["amount_this_year"]!=null && ssglist[i]["amount_this_year"]!=""){
						ssglist[i]["amount_this_year"]=parseInt(ssglist[i]["amount_this_year"].replaceAll(',', ''),10).toLocaleString();
						ssglist[i]["amount_pre_year"]=parseInt(ssglist[i]["amount_pre_year"].replaceAll(',', ''),10).toLocaleString();
					}else{
						ssglist[i]["amount_this_year"]="";
						ssglist[i]["amount_pre_year"]="";
					}

					if(typeof CS.vueObj.kanjo_detail[i] =="undefined"){
						CS.vueObj.kanjo_detail[i]=ssglist[i];
						CS.vueObj.kanjo_detail[i]["m_kanjo_id"] = CS.vueObj.kanjo_detail[i]["m_kanjo_code"];
						CS.vueObj.kanjo_detail[i]["family_name"] = kanri_itask_kanjo_family_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
						CS.vueObj.kanjo_detail[i]["genus_name"] = kanri_itask_kanjo_genus_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
						CS.vueObj.kanjo_detail[i]["species_name"] = kanri_itask_kanjo_species_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
						CS.vueObj.kanjo_detail[i]["variety_name"] = kanri_itask_kanjo_variety_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
						CS.vueObj.kanjo_detail[i]["property"] = property_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
						if(typeof abc_flag_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]] !="undefined"){
							CS.vueObj.kanjo_detail[i]["abc_flag"] = true;
						}else{
							CS.vueObj.kanjo_detail[i]["abc_flag"] = false;
						}
						
					}else{
						if(ssglist[i]["kotei"].indexOf('kotei')!=-1){
							CS.vueObj.kanjo_detail[i]["amount_this_year"]=ssglist[i]["amount_this_year"];
							CS.vueObj.kanjo_detail[i]["amount_pre_year"]=ssglist[i]["amount_pre_year"];
						}else{
							CS.vueObj.kanjo_detail[i]["amount_this_year"]=ssglist[i]["amount_this_year"];
							CS.vueObj.kanjo_detail[i]["amount_pre_year"]=ssglist[i]["amount_pre_year"];
							
							CS.vueObj.kanjo_detail[i]["m_kanjo_id"] = CS.vueObj.kanjo_detail[i]["m_kanjo_code"];
							CS.vueObj.kanjo_detail[i]["family_name"] = kanri_itask_kanjo_family_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
							CS.vueObj.kanjo_detail[i]["genus_name"] = kanri_itask_kanjo_genus_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
							CS.vueObj.kanjo_detail[i]["species_name"] = kanri_itask_kanjo_species_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
							CS.vueObj.kanjo_detail[i]["variety_name"] = kanri_itask_kanjo_variety_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
							CS.vueObj.kanjo_detail[i]["property"] = property_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
							if(typeof abc_flag_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]] !="undefined"){
								CS.vueObj.kanjo_detail[i]["abc_flag"] = true;
							}else{
								CS.vueObj.kanjo_detail[i]["abc_flag"] = false;
							}
						}
					}
					CS.vueObj.kanjo_detail[i]["koteiitem"]="NN";
					CS.vueObj.kanjo_detail[i]["kenzankaijyo"]=false;
					CS.vueObj.kanjo_detail[i]["candidate_list"]=ssglist[i]["candidate"];
					CS.vueObj.kanjo_detail[i]["candidate_select_list"]=[];
					CS.vueObj.kanjo_detail[i]["start_x"]=ssglist[i]["start_x"];
					CS.vueObj.kanjo_detail[i]["end_x"]=ssglist[i]["end_x"];
					CS.vueObj.kanjo_detail[i]["start_y"]=ssglist[i]["start_y"];
					CS.vueObj.kanjo_detail[i]["end_y"]=ssglist[i]["end_y"];
					//CS.vueObj.kanjo_detail[i]["tabindex"]=2;
					CS.vueObj.kanjo_detail[i]["changeflag"]=true;
					CS.vueObj.kanjo_detail[i]["page"]=CS.vueObj.itask_list_show_file_list_now_imgs_index+0;
				}
			}else{
				CS.alert_error("書式を識別できなかった");
				CS.vueObj.itaskloadnig="";
				CS.vueObj.aitask_common_pop_ac=false;
				return;
			}
			CS.itask_list_show_edit_window_kensan(4);
			CS.alert_error("読み取りできました、保存してください");
			CS.vueObj.itaskloadnig="";
			CS.vueObj.aitask_common_pop_ac=false;
		}
	});
}
CS.itask_list_show_edit_pana_text_keydown2 = function(event) {
	console.log(event.key);
	if(CS.vueObj.itask_list_show_edit_window_flag && !CS.vueObj.itask_list_show_edit_pana_houjin_input_show && !CS.vueObj.itask_list_show_edit_pana_kojin_input_show && event.key=='Delete') {
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			if($("#itask_list_show_edit_pana_inputmain0_"+i).css("background-color")=="lightblue" || $("#itask_list_show_edit_pana_inputmain0_"+i).css("background-color")=="rgb(173, 216, 230)"){
				CS.vueObj.kanjo_detail[i]["amount_pre_year"]="";
				CS.vueObj.$set(CS.vueObj.kanjo_detail, i, CS.vueObj.kanjo_detail[i]);
				CS.vueObj.kanjo_detail[i].changeflag=true;
			}
			if($("#itask_list_show_edit_pana_inputmain0_"+i+" .vBtbKXAC").css("background-color")=="lightblue" || $("#itask_list_show_edit_pana_inputmain0_"+i+" .vBtbKXAC").css("background-color")=="rgb(173, 216, 230)"){
				CS.vueObj.kanjo_detail[i]["amount_pre_year"]="";
				CS.vueObj.$set(CS.vueObj.kanjo_detail, i, CS.vueObj.kanjo_detail[i]);
				CS.vueObj.kanjo_detail[i].changeflag=true;
			}
			if($("#itask_list_show_edit_pana_inputmain1_"+i).css("background-color")=="lightblue" || $("#itask_list_show_edit_pana_inputmain1_"+i).css("background-color")=="rgb(173, 216, 230)"){
				CS.vueObj.kanjo_detail[i]["amount_this_year"]="";
				CS.vueObj.$set(CS.vueObj.kanjo_detail, i, CS.vueObj.kanjo_detail[i]);
				CS.vueObj.kanjo_detail[i].changeflag=true;
			}
			if($("#itask_list_show_edit_pana_inputmain1_"+i+" .vBtbKXAC").css("background-color")=="lightblue" || $("#itask_list_show_edit_pana_inputmain1_"+i+" .vBtbKXAC").css("background-color")=="rgb(173, 216, 230)"){
				CS.vueObj.kanjo_detail[i]["amount_this_year"]="";
				CS.vueObj.$set(CS.vueObj.kanjo_detail, i, CS.vueObj.kanjo_detail[i]);
				CS.vueObj.kanjo_detail[i].changeflag=true;
			}
		}
		for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
			$("#itask_list_show_edit_pana_inputmain0_"+i).css("background-color", "");
			$("#itask_list_show_edit_pana_inputmain0_"+i+" div").css("background-color", "");
			$("#itask_list_show_edit_pana_inputmain1_"+i).css("background-color", "");
			$("#itask_list_show_edit_pana_inputmain1_"+i+" div").css("background-color", "");
		}
		//CS.itask_list_show_edit_window_kensan(4);
	}
}
CS.itask_list_show_edit_pana_text_keydown = function(flag,index) {
	CS.vueObj.itask_list_show_edit_pana_text_mousedown_flag=true;
	document.addEventListener("selectstart", CS.itask_list_show_edit_pana_text_preventSelection);
	$("#itask_list_show_edit_pana_inputmain"+flag+"_"+index).css("background-color", "lightblue");
	console.log('mousedown');
}
CS.itask_list_show_edit_pana_text_clearcorlor = function() {
	for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
		$("#itask_list_show_edit_pana_inputmain0_"+i).css("background-color", "");
		$("#itask_list_show_edit_pana_inputmain0_"+i+" div").css("background-color", "");
		$("#itask_list_show_edit_pana_inputmain1_"+i).css("background-color", "");
		$("#itask_list_show_edit_pana_inputmain1_"+i+" div").css("background-color", "");
	}
}
CS.itask_list_show_edit_pana_text_preventSelection = function(event) {
    event.preventDefault();
}
CS.itask_list_show_edit_pana_text_mouseover = function(event) {
	if(CS.vueObj.itask_list_show_edit_pana_text_mousedown_flag){
		event.target.style.backgroundColor = "lightblue";
	}
}
CS.itask_list_show_edit_pana_edit_keydown = function(event) {
	if (event.key === 'Tab') {
		CS.itask_list_show_edit_pana_edit_keydown_tab=true;
		event.preventDefault(); // デフォルトのTab動作を防ぐ（必要に応じて）
		console.log('Tabキーが押されました');
		// すべてのチェックボックスを取得し非アクティブ化
		$("input[type='checkbox']").prop("disabled", true);
		// 2秒後にアクティブ化
		if(typeof CS.itask_list_show_edit_pana_edit_keydown_set_timeout=="undefined" || CS.itask_list_show_edit_pana_edit_keydown_set_timeout){
			CS.itask_list_show_edit_pana_edit_keydown_set_timeout=false;
			setTimeout(() => {
				CS.itask_list_show_edit_pana_edit_keydown_set_timeout=true;
				$("input[type='checkbox']").prop("disabled", false);
			}, 800);
		}
		if(event.target.id.indexOf("itask_list_show_edit_pana_input1_")!=-1){
			var index=CS.toI(event.target.id.split("itask_list_show_edit_pana_input1_")[1]);
			if(event.target.id.indexOf("itask_list_show_edit_pana_input1_abc_")!=-1){
				index=CS.toI(event.target.id.split("itask_list_show_edit_pana_input1_abc_")[1]);
			}
			for(var i=index+1;i<CS.vueObj.kanjo_detail.length;i++){
				var item = document.getElementById("itask_list_show_edit_pana_inputmain1_"+i);
				if(item){
					CS.vueObj.kanjo_detail[index].edit0=false;
					CS.vueObj.kanjo_detail[index].edit1=false;
					CS.vueObj.$set(CS.vueObj.kanjo_detail, index, CS.vueObj.kanjo_detail[index]);
					if(typeof CS.vueObj.kanjo_detail[i].edit1 != "undefined" && CS.vueObj.kanjo_detail[i].edit1){
						//CS.vueObj.kanjo_detail[index].edit1=false;
					}else{
						CS.vueObj.kanjo_detail[i].edit1=true;
						if(CS.vueObj.kanjo_detail[i].abc_flag){
							CS.itask_list_show_edit_pana_input_name="itask_list_show_edit_pana_input1_abc_"+i;
							CS.vueObj.kanjo_detail[i].amount_this_year_abc=(-1*parseInt(CS.vueObj.kanjo_detail[i].amount_this_year.replaceAll(',', ''),10)).toLocaleString();
							if(CS.vueObj.kanjo_detail[i].amount_this_year_abc=="NaN"){CS.vueObj.kanjo_detail[i].amount_this_year_abc="";}
							if(typeof CS.kanri_itask_kanjo_loading!="undefined" && CS.kanri_itask_kanjo_loading){
								CS.kanri_itask_kanjo_loading=false;
								setTimeout(function(){
									//CS.itask_list_show_edit_pana_edit_keydown_tab=false;
									$("#"+CS.itask_list_show_edit_pana_input_name).get(0).type = 'password';
									$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
									$("#"+CS.itask_list_show_edit_pana_input_name).prop("autocomplete","off");
									$("#"+CS.itask_list_show_edit_pana_input_name).prop("name",CS.itask_list_show_edit_pana_input_name);
									$("#"+CS.itask_list_show_edit_pana_input_name).css("text-align","right");
									$("#"+CS.itask_list_show_edit_pana_input_name).css("color","white");
									//$("#"+CS.itask_list_show_edit_pana_input_name).focus();
								},10);
								setTimeout(function(){
									//CS.itask_list_show_edit_pana_edit_keydown_tab=false;
									if(typeof $("#"+CS.itask_list_show_edit_pana_input_name).get(0) !="undefined"){
										$("#"+CS.itask_list_show_edit_pana_input_name).get(0).type = 'text';
									}
									$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
									$("#"+CS.itask_list_show_edit_pana_input_name).css("color","black");
									$("#"+CS.itask_list_show_edit_pana_input_name).focus();
								},40);
							}else{
								setTimeout(function(){
									//CS.itask_list_show_edit_pana_edit_keydown_tab=false;
									$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
									$("#"+CS.itask_list_show_edit_pana_input_name).css("color","black");
									$("#"+CS.itask_list_show_edit_pana_input_name).focus();
								},10);
							}
						}else{
							CS.itask_list_show_edit_pana_input_name="itask_list_show_edit_pana_input1_"+i;
							if(typeof CS.kanri_itask_kanjo_loading!="undefined" && CS.kanri_itask_kanjo_loading){
								CS.kanri_itask_kanjo_loading=false;
								setTimeout(function(){
									//CS.itask_list_show_edit_pana_edit_keydown_tab=false;
									$("#"+CS.itask_list_show_edit_pana_input_name).get(0).type = 'password';
									$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
									$("#"+CS.itask_list_show_edit_pana_input_name).prop("autocomplete","off");
									$("#"+CS.itask_list_show_edit_pana_input_name).prop("name",CS.itask_list_show_edit_pana_input_name);
									$("#"+CS.itask_list_show_edit_pana_input_name).css("text-align","right");
									$("#"+CS.itask_list_show_edit_pana_input_name).css("color","white");
									//$("#"+CS.itask_list_show_edit_pana_input_name).focus();
								},10);
								setTimeout(function(){
									//CS.itask_list_show_edit_pana_edit_keydown_tab=false;
									if(typeof $("#"+CS.itask_list_show_edit_pana_input_name).get(0) !="undefined"){
										$("#"+CS.itask_list_show_edit_pana_input_name).get(0).type = 'text';
									}
									$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
									$("#"+CS.itask_list_show_edit_pana_input_name).css("color","black");
									$("#"+CS.itask_list_show_edit_pana_input_name).focus();
								},40);
							}else{
								//CS.itask_list_show_edit_pana_edit_keydown_tab=false;
								setTimeout(function(){
									$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
									$("#"+CS.itask_list_show_edit_pana_input_name).css("color","black");
									$("#"+CS.itask_list_show_edit_pana_input_name).focus();
								},10);
							}
						}
						this.$set(CS.vueObj.kanjo_detail, i, CS.vueObj.kanjo_detail[i]);
					}
					break;
				}
			}
			
		}else if(event.target.id.indexOf("itask_list_show_edit_pana_input0_")!=-1){
			var index=CS.toI(event.target.id.split("itask_list_show_edit_pana_input0_")[1]);
			if(event.target.id.indexOf("itask_list_show_edit_pana_input0_abc_")!=-1){
				index=CS.toI(event.target.id.split("itask_list_show_edit_pana_input0_abc_")[1]);
			}
			for(var i=index+1;i<CS.vueObj.kanjo_detail.length;i++){
				var item = document.getElementById("itask_list_show_edit_pana_inputmain0_"+i);
				if(item){
					CS.vueObj.kanjo_detail[index].edit0=false;
					CS.vueObj.kanjo_detail[index].edit1=false;
					CS.vueObj.$set(CS.vueObj.kanjo_detail, index, CS.vueObj.kanjo_detail[index]);
					if(typeof CS.vueObj.kanjo_detail[i].edit0 != "undefined" && CS.vueObj.kanjo_detail[i].edit0){
						//CS.vueObj.kanjo_detail[index].edit0=false;
					}else{
						CS.vueObj.kanjo_detail[i].edit0=true;
						if(CS.vueObj.kanjo_detail[i].abc_flag){
							CS.itask_list_show_edit_pana_input_name="itask_list_show_edit_pana_input0_abc_"+i;
							CS.vueObj.kanjo_detail[i].amount_pre_year_abc=(-1*parseInt(CS.vueObj.kanjo_detail[i].amount_pre_year.replaceAll(',', ''),10)).toLocaleString();
							if(CS.vueObj.kanjo_detail[i].amount_pre_year_abc=="NaN"){CS.vueObj.kanjo_detail[i].amount_pre_year_abc="";}
							if(typeof CS.kanri_itask_kanjo_loading!="undefined" && CS.kanri_itask_kanjo_loading){
								CS.kanri_itask_kanjo_loading=false;
								setTimeout(function(){
									//CS.itask_list_show_edit_pana_edit_keydown_tab=false;
									$("#"+CS.itask_list_show_edit_pana_input_name).get(0).type = 'password';
									$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
									$("#"+CS.itask_list_show_edit_pana_input_name).prop("autocomplete","off");
									$("#"+CS.itask_list_show_edit_pana_input_name).prop("name",CS.itask_list_show_edit_pana_input_name);
									$("#"+CS.itask_list_show_edit_pana_input_name).css("text-align","right");
									$("#"+CS.itask_list_show_edit_pana_input_name).css("color","white");
									//$("#"+CS.itask_list_show_edit_pana_input_name).focus();
								},10);
								setTimeout(function(){
									//CS.itask_list_show_edit_pana_edit_keydown_tab=false;
									if(typeof $("#"+CS.itask_list_show_edit_pana_input_name).get(0) !="undefined"){
										$("#"+CS.itask_list_show_edit_pana_input_name).get(0).type = 'text';
									}
									$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
									$("#"+CS.itask_list_show_edit_pana_input_name).css("color","black");
									$("#"+CS.itask_list_show_edit_pana_input_name).focus();
								},40);
							}else{
								setTimeout(function(){
									//CS.itask_list_show_edit_pana_edit_keydown_tab=false;
									$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
									$("#"+CS.itask_list_show_edit_pana_input_name).css("color","black");
									$("#"+CS.itask_list_show_edit_pana_input_name).focus();
								},10);
							}
						}else{
							CS.itask_list_show_edit_pana_input_name="itask_list_show_edit_pana_input0_"+i;
							if(typeof CS.kanri_itask_kanjo_loading!="undefined" && CS.kanri_itask_kanjo_loading){
								CS.kanri_itask_kanjo_loading=false;
								setTimeout(function(){
									//CS.itask_list_show_edit_pana_edit_keydown_tab=false;
									$("#"+CS.itask_list_show_edit_pana_input_name).get(0).type = 'password';
									$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
									$("#"+CS.itask_list_show_edit_pana_input_name).prop("autocomplete","off");
									$("#"+CS.itask_list_show_edit_pana_input_name).prop("name",CS.itask_list_show_edit_pana_input_name);
									$("#"+CS.itask_list_show_edit_pana_input_name).css("text-align","right");
									$("#"+CS.itask_list_show_edit_pana_input_name).css("color","white");
									//$("#"+CS.itask_list_show_edit_pana_input_name).focus();
								},10);
								setTimeout(function(){
									//CS.itask_list_show_edit_pana_edit_keydown_tab=false;
									if(typeof $("#"+CS.itask_list_show_edit_pana_input_name).get(0) !="undefined"){
										$("#"+CS.itask_list_show_edit_pana_input_name).get(0).type = 'text';
									}
									$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
									$("#"+CS.itask_list_show_edit_pana_input_name).css("color","black");
									$("#"+CS.itask_list_show_edit_pana_input_name).focus();
								},40);
							}else{
								setTimeout(function(){
									//CS.itask_list_show_edit_pana_edit_keydown_tab=false;
									$("#"+CS.itask_list_show_edit_pana_input_name).css("width","100%");
									$("#"+CS.itask_list_show_edit_pana_input_name).css("color","black");
									$("#"+CS.itask_list_show_edit_pana_input_name).focus();
								},10);
							}
						}
						this.$set(CS.vueObj.kanjo_detail, i, CS.vueObj.kanjo_detail[i]);
					}
					break;
				}
			}
			
		}
		setTimeout(function(){
			CS.itask_list_show_edit_pana_edit_keydown_tab=false;
			CS.itask_list_show_edit_window_kensan(4);
		},100);
		// カスタム処理をここに記述
	}
}
CS.itask_list_show_edit_window_tool_soneki1 = function() {
	var obj = {};
	obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
	obj["closing_date_date"] = CS.vueObj.i_aitask_top_info["closing_date_date"];
	obj["company_company_code"] = CS.vueObj.i_aitask_top_info["company_company_code"];
	obj["image"] = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0].replaceAll('data:image/jpeg;base64,', '');
	obj["action"] = "itask_list_show_edit_window_tool_soneki0";
	obj["flag"] = "itask_list_show_edit_window_tool_soneki1";
	obj["pageNumber"] = CS.vueObj.itask_list_show_file_list_now_imgs_index+0;
	CS.itask_list_show_edit_pana_pre_year_c9 = "";
	CS.itask_list_show_edit_pana_pre_year_c10 = "";
	CS.vueObj.itaskloadnig="aitask_pop_main";
	CS.vueObj.aitask_common_pop_ac=true;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: true,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			if (typeof data["message"] != "undefined") {
				CS.alert_error(data["message"]);
				CS.vueObj.itaskloadnig="";
				CS.vueObj.aitask_common_pop_ac=false;
				return;
			}
			var kanri_itask_kanjo_family_map = data["kanri_itask_kanjo_family_map"];
			var kanri_itask_kanjo_genus_map = data["kanri_itask_kanjo_genus_map"];
			var kanri_itask_kanjo_species_map = data["kanri_itask_kanjo_species_map"];
			var kanri_itask_kanjo_variety_map = data["kanri_itask_kanjo_variety_map"];
			var property_map = data["property_map"];
			var abc_flag_map = data["abc_flag_map"];
			//書式外情報リスト
			var ssglist=data["jsoncode"];
			if(typeof ssglist["format_info"] !="undefined"
			&& typeof ssglist["format_info"]["cols"] !="undefined"
			&& typeof ssglist["format_info"]["cols"][0] !="undefined"
			&& typeof ssglist["format_info"]["cols"][0]["block_result"] !="undefined"
			&& typeof ssglist["format_info"]["cols"][0]["block_result"]["detail"] !="undefined"){
				ssglist=ssglist["format_info"]["cols"][0]["block_result"]["detail"];
				for(var i=0;i<ssglist.length;i++){
					if(i>44){continue;}
					if(ssglist[i]["amount_this_year"]!=null && ssglist[i]["amount_this_year"]!=""){
						ssglist[i]["amount_this_year"]=parseInt(ssglist[i]["amount_this_year"].replaceAll(',', ''),10).toLocaleString();
						ssglist[i]["amount_pre_year"]=parseInt(ssglist[i]["amount_pre_year"].replaceAll(',', ''),10).toLocaleString();
					}else{
						ssglist[i]["amount_this_year"]="";
						ssglist[i]["amount_pre_year"]="";
					}

					if(typeof CS.vueObj.kanjo_detail[i] =="undefined"){
						CS.vueObj.kanjo_detail[i]=ssglist[i];
						CS.vueObj.kanjo_detail[i]["m_kanjo_id"] = CS.vueObj.kanjo_detail[i]["m_kanjo_code"];
						CS.vueObj.kanjo_detail[i]["family_name"] = kanri_itask_kanjo_family_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
						CS.vueObj.kanjo_detail[i]["genus_name"] = kanri_itask_kanjo_genus_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
						CS.vueObj.kanjo_detail[i]["species_name"] = kanri_itask_kanjo_species_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
						CS.vueObj.kanjo_detail[i]["variety_name"] = kanri_itask_kanjo_variety_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
						CS.vueObj.kanjo_detail[i]["property"] = property_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
						if(typeof abc_flag_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]] !="undefined"){
							CS.vueObj.kanjo_detail[i]["abc_flag"] = true;
						}else{
							CS.vueObj.kanjo_detail[i]["abc_flag"] = false;
						}
						
					}else{
						if(ssglist[i]["kotei"].indexOf('kotei')!=-1){
							CS.vueObj.kanjo_detail[i]["amount_this_year"]=ssglist[i]["amount_this_year"];
							CS.vueObj.kanjo_detail[i]["amount_pre_year"]=ssglist[i]["amount_pre_year"];
						}else{
							CS.vueObj.kanjo_detail[i]["amount_this_year"]=ssglist[i]["amount_this_year"];
							CS.vueObj.kanjo_detail[i]["amount_pre_year"]=ssglist[i]["amount_pre_year"];
							
							CS.vueObj.kanjo_detail[i]["m_kanjo_id"] = CS.vueObj.kanjo_detail[i]["m_kanjo_code"];
							CS.vueObj.kanjo_detail[i]["family_name"] = kanri_itask_kanjo_family_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
							CS.vueObj.kanjo_detail[i]["genus_name"] = kanri_itask_kanjo_genus_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
							CS.vueObj.kanjo_detail[i]["species_name"] = kanri_itask_kanjo_species_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
							CS.vueObj.kanjo_detail[i]["variety_name"] = kanri_itask_kanjo_variety_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
							CS.vueObj.kanjo_detail[i]["property"] = property_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
							if(typeof abc_flag_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]] !="undefined"){
								CS.vueObj.kanjo_detail[i]["abc_flag"] = true;
							}else{
								CS.vueObj.kanjo_detail[i]["abc_flag"] = false;
							}
						}
					}
					CS.vueObj.kanjo_detail[i]["koteiitem"]="NN";
					CS.vueObj.kanjo_detail[i]["kenzankaijyo"]=false;
					CS.vueObj.kanjo_detail[i]["candidate_list"]=ssglist[i]["candidate"];
					CS.vueObj.kanjo_detail[i]["candidate_select_list"]=[];
					CS.vueObj.kanjo_detail[i]["start_x"]=ssglist[i]["start_x"];
					CS.vueObj.kanjo_detail[i]["end_x"]=ssglist[i]["end_x"];
					CS.vueObj.kanjo_detail[i]["start_y"]=ssglist[i]["start_y"];
					CS.vueObj.kanjo_detail[i]["end_y"]=ssglist[i]["end_y"];
					//CS.vueObj.kanjo_detail[i]["tabindex"]=2;
					CS.vueObj.kanjo_detail[i]["changeflag"]=true;
					CS.vueObj.kanjo_detail[i]["page"]=CS.vueObj.itask_list_show_file_list_now_imgs_index+0;
				}
			}else{
				CS.alert_error("書式を識別できなかった");
				CS.vueObj.itaskloadnig="";
				CS.vueObj.aitask_common_pop_ac=false;
				return;
			}
			CS.itask_list_show_edit_window_kensan(4);
			CS.alert_error("読み取りできました、保存してください");
			CS.vueObj.itaskloadnig="";
			CS.vueObj.aitask_common_pop_ac=false;
		}
	});
}

CS.itask_list_show_edit_window_tool_ex_analysis = function() {
	var obj = {};
	obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
	obj["closing_date_date"] = CS.vueObj.i_aitask_top_info["closing_date_date"];
	obj["company_company_code"] = CS.vueObj.i_aitask_top_info["company_company_code"];
	obj["image"] = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0].replaceAll('data:image/jpeg;base64,', '');
	obj["action"] = "itask_list_show_edit_window_tool_soneki0";
	obj["flag"] = "itask_list_show_edit_window_tool_soneki1";
	obj["pageNumber"] = CS.vueObj.itask_list_show_file_list_now_imgs_index+0;
	CS.itask_list_show_edit_pana_pre_year_c9 = "";
	CS.itask_list_show_edit_pana_pre_year_c10 = "";
	CS.vueObj.itaskloadnig="aitask_pop_main";
	CS.vueObj.aitask_common_pop_ac=true;
	$.ajax({
		type: 'POST',
		url: CS.ITASK_TOOL_URL,
		data: obj,
		// contentType: 'application/JSON',
		dataType: 'json',
		async: true,
		cache: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {CS.alert_error(null);}).done(function (data) {
		// 成功処理
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
		} else {
			if (typeof data["message"] != "undefined") {
				CS.alert_error(data["message"]);
				CS.vueObj.itaskloadnig="";
				CS.vueObj.aitask_common_pop_ac=false;
				return;
			}
			var kanri_itask_kanjo_family_map = data["kanri_itask_kanjo_family_map"];
			var kanri_itask_kanjo_genus_map = data["kanri_itask_kanjo_genus_map"];
			var kanri_itask_kanjo_species_map = data["kanri_itask_kanjo_species_map"];
			var kanri_itask_kanjo_variety_map = data["kanri_itask_kanjo_variety_map"];
			var property_map = data["property_map"];
			var abc_flag_map = data["abc_flag_map"];
			//書式外情報リスト
			var ssglist=data["jsoncode"];
			if(typeof ssglist !="undefined"
			&& typeof ssglist["format_info"] !="undefined"
			&& typeof ssglist["format_info"]["cols"] !="undefined"
			&& typeof ssglist["format_info"]["cols"][0] !="undefined"
			&& typeof ssglist["format_info"]["cols"][0]["block_result"] !="undefined"
			&& typeof ssglist["format_info"]["cols"][0]["block_result"]["detail"] !="undefined"){
				ssglist=ssglist["format_info"]["cols"][0]["block_result"]["detail"];
				for(var i=0;i<ssglist.length;i++){
					if(i>44){continue;}
					if(ssglist[i]["amount_this_year"]!=null && ssglist[i]["amount_this_year"]!=""){
						ssglist[i]["amount_this_year"]=parseInt(ssglist[i]["amount_this_year"].replaceAll(',', ''),10).toLocaleString();
						ssglist[i]["amount_pre_year"]=parseInt(ssglist[i]["amount_pre_year"].replaceAll(',', ''),10).toLocaleString();
					}else{
						ssglist[i]["amount_this_year"]="";
						ssglist[i]["amount_pre_year"]="";
					}

					if(typeof CS.vueObj.kanjo_detail[i] =="undefined"){
						CS.vueObj.kanjo_detail[i]=ssglist[i];
						CS.vueObj.kanjo_detail[i]["m_kanjo_id"] = CS.vueObj.kanjo_detail[i]["m_kanjo_code"];
						CS.vueObj.kanjo_detail[i]["family_name"] = kanri_itask_kanjo_family_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
						CS.vueObj.kanjo_detail[i]["genus_name"] = kanri_itask_kanjo_genus_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
						CS.vueObj.kanjo_detail[i]["species_name"] = kanri_itask_kanjo_species_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
						CS.vueObj.kanjo_detail[i]["variety_name"] = kanri_itask_kanjo_variety_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
						CS.vueObj.kanjo_detail[i]["property"] = property_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
						if(typeof abc_flag_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]] !="undefined"){
							CS.vueObj.kanjo_detail[i]["abc_flag"] = true;
						}else{
							CS.vueObj.kanjo_detail[i]["abc_flag"] = false;
						}
						
					}else{
						if(ssglist[i]["kotei"].indexOf('kotei')!=-1){
							CS.vueObj.kanjo_detail[i]["amount_this_year"]=ssglist[i]["amount_this_year"];
							CS.vueObj.kanjo_detail[i]["amount_pre_year"]=ssglist[i]["amount_pre_year"];
						}else{
							CS.vueObj.kanjo_detail[i]["amount_this_year"]=ssglist[i]["amount_this_year"];
							CS.vueObj.kanjo_detail[i]["amount_pre_year"]=ssglist[i]["amount_pre_year"];
							
							CS.vueObj.kanjo_detail[i]["m_kanjo_id"] = CS.vueObj.kanjo_detail[i]["m_kanjo_code"];
							CS.vueObj.kanjo_detail[i]["family_name"] = kanri_itask_kanjo_family_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
							CS.vueObj.kanjo_detail[i]["genus_name"] = kanri_itask_kanjo_genus_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
							CS.vueObj.kanjo_detail[i]["species_name"] = kanri_itask_kanjo_species_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
							CS.vueObj.kanjo_detail[i]["variety_name"] = kanri_itask_kanjo_variety_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
							CS.vueObj.kanjo_detail[i]["property"] = property_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]];
							if(typeof abc_flag_map[CS.vueObj.kanjo_detail[i]["m_kanjo_code"]] !="undefined"){
								CS.vueObj.kanjo_detail[i]["abc_flag"] = true;
							}else{
								CS.vueObj.kanjo_detail[i]["abc_flag"] = false;
							}
						}
					}
					CS.vueObj.kanjo_detail[i]["koteiitem"]="NN";
					CS.vueObj.kanjo_detail[i]["kenzankaijyo"]=false;
					CS.vueObj.kanjo_detail[i]["candidate_list"]=ssglist[i]["candidate"];
					CS.vueObj.kanjo_detail[i]["candidate_select_list"]=[];
					CS.vueObj.kanjo_detail[i]["start_x"]=ssglist[i]["start_x"];
					CS.vueObj.kanjo_detail[i]["end_x"]=ssglist[i]["end_x"];
					CS.vueObj.kanjo_detail[i]["start_y"]=ssglist[i]["start_y"];
					CS.vueObj.kanjo_detail[i]["end_y"]=ssglist[i]["end_y"];
					//CS.vueObj.kanjo_detail[i]["tabindex"]=2;
					CS.vueObj.kanjo_detail[i]["changeflag"]=true;
					CS.vueObj.kanjo_detail[i]["page"]=CS.vueObj.itask_list_show_file_list_now_imgs_index+0;
				}
			}else{
				CS.alert_error("書式を識別できなかった");
				CS.vueObj.itaskloadnig="";
				CS.vueObj.aitask_common_pop_ac=false;
				return;
			}
			CS.itask_list_show_edit_window_kensan(4);
			CS.alert_error("読み取りできました、保存してください");
			CS.vueObj.itaskloadnig="";
			CS.vueObj.aitask_common_pop_ac=false;
		}
	});
}
function normalizeNumberString(s) {
  if (s == null) return "";
  // 全角英数→半角
  s = s.replace(/[Ａ-Ｚａ-ｚ０-９]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0));
  // 全角小数点・読点も半角に/除去
  s = s.replace(/\uFF0E/g, '.');         // ． → .
  s = s.replace(/[,\uFF0C]/g, '');       // ,， → (削除)

  // あり得る「マイナスっぽい記号」をASCIIハイフンに統一
  // U+2212(−), U+FF0D(－), U+30FC(ー 長音), U+FF70(ｰ 半濁点記号), U+2010–2015(各種ダッシュ), ほか数種
  s = s.replace(/^[\u2212\uFF0D\u30FC\uFF70\u2010-\u2015\uFE63\u02D7\u2043]+/, '-');

  // 先頭以外のハイフンは削除（マイナスは先頭のみ許容）
  s = s.replace(/(?!^)-/g, '');

  return s.trim();
}