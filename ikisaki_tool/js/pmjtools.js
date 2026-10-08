CS.itask_list_show_edit_window_manual_analysis_close = function() {
	CS.vueObj.itask_list_show_edit_window_map_flag=-1;
	CS.vueObj.itask_list_show_edit_window_map_step="A";
}
CS.itask_list_show_edit_window_manual_analysis_back= function() {
	CS.vueObj.itask_list_show_edit_window_map_step="B";
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
CS.itask_list_show_edit_window_ma_return = function() {
	var mapstep=["A","B","C"];
	var okflag=true;
	for(var i=0;i<CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.length;i++){
		if(typeof CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=="undefined"){
			okflag=false;
		}else if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]==null){
			okflag=false;
		}else if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length==0){
			okflag=false;
		}
	}
	if(!okflag){
		var okflag=window.confirm("勘定科目が選択されていない項目を保存しなくてもよろしいでしょうか？");
	}
	if(!okflag){
		return;
	}
	window.opener.CS.itask_list_show_edit_window_ma_savepage();
	CS.vueObj.kanjo_detail=window.opener.CS.vueObj.kanjo_detail;
	
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("houjin")==-1){
		CS.itask_list_show_edit_pana_delete_kanjo_id_list=[];
		if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
			//新しいリストを後ろに挿入
			for(var i=0;i<CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.length;i++){
				if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length==0){
					continue;
				}
				var kinfo=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]];
				var kanjo={};
				kanjo["m_kanjo_code"]=kinfo["m_kanjo_code"];
				kanjo["order"]=kinfo["order_code"];
				kanjo["m_kanjo_id"]=kinfo["m_kanjo_code"];
				kanjo["family"]=kinfo["family_code"];
				kanjo["family_name"]=kinfo["family_name"];
				kanjo["genus"]=kinfo["genus_code"];
				kanjo["genus_name"]=kinfo["genus_name"];
				kanjo["species"]=kinfo["species_code"];
				kanjo["species_name"]=kinfo["species_name"];
				kanjo["variety"]=CS.toI(kinfo["variety"]);
				kanjo["variety_name"]=kinfo["m_kanjo_name"];
				kanjo["property"]=CS.toI(kinfo["property"]);
				kanjo["abc_flag"]=CS.toI(kinfo["abc_flag"]);
				kanjo["sort"]=i;
				kanjo["page"]=-1;
				kanjo["candidate_select_list"]=[];
				kanjo["changeflag"]=true;
				kanjo["amount_this_year"]=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki[i];
				kanjo["amount_pre_year"]="";
				kanjo["kenzankaijyo"]=false;
				if((i>=16 && i<=22) || (i>=31 && i<=37) || (i>=39 && i<=45)){
					kanjo["koteiitem"]="NN";
					kanjo["koteiitemflag"]=false;
				}else{
					kanjo["koteiitem"]="OK";
					kanjo["koteiitemflag"]=true;
				}
				kanjo["konki_keisan"]="";
				kanjo["zenki_keisan"]="";
				kanjo["tabindex"]=CS.vueObj.itask_list_show_edit_pana_tag_button_index;
				kanjo["page"]=-1;
				kanjo["start_x"]=0;
				kanjo["start_y"]=0;
				kanjo["end_x"]=0;
				kanjo["end_y"]=0;
				kanjo["kanjo_info_id"]=CS.vueObj.kanjo_detail[i+45]["kanjo_info_id"];
				CS.vueObj.kanjo_detail[i+45]=kanjo;
			}

			window.opener.CS.set_kanjo_detail(CS.vueObj.kanjo_detail,CS.itask_list_show_edit_pana_delete_kanjo_id_list);
		}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
			//新しいリストを後ろに挿入
			for(var i=0;i<CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.length;i++){
				if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length==0){
					continue;
				}
				var kinfo=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]];
				var kanjo={};
				kanjo["m_kanjo_code"]=kinfo["m_kanjo_code"];
				kanjo["order"]=kinfo["order_code"];
				kanjo["m_kanjo_id"]=kinfo["m_kanjo_code"];
				kanjo["family"]=kinfo["family_code"];
				kanjo["family_name"]=kinfo["family_name"];
				kanjo["genus"]=kinfo["genus_code"];
				kanjo["genus_name"]=kinfo["genus_name"];
				kanjo["species"]=kinfo["species_code"];
				kanjo["species_name"]=kinfo["species_name"];
				kanjo["variety"]=CS.toI(kinfo["variety"]);
				kanjo["variety_name"]=kinfo["m_kanjo_name"];
				kanjo["property"]=CS.toI(kinfo["property"]);
				kanjo["abc_flag"]=CS.toI(kinfo["abc_flag"]);
				kanjo["sort"]=i;
				kanjo["page"]=-1;
				kanjo["candidate_select_list"]=[];
				kanjo["changeflag"]=true;
				kanjo["amount_this_year"]=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki[i];
				kanjo["amount_pre_year"]="";
				kanjo["kenzankaijyo"]=false;
				if((i>=24 && i<=29) || (i>=34 && i<=35) || (i>=39 && i<=40)){
					kanjo["koteiitem"]="NN";
					kanjo["koteiitemflag"]=false;
				}else{
					kanjo["koteiitem"]="OK";
					kanjo["koteiitemflag"]=true;
				}
				kanjo["tabindex"]=CS.vueObj.itask_list_show_edit_pana_tag_button_index;
				kanjo["page"]=-1;
				kanjo["start_x"]=0;
				kanjo["start_y"]=0;
				kanjo["end_x"]=0;
				kanjo["end_y"]=0;
				kanjo["konki_keisan"]="";
				kanjo["zenki_keisan"]="";
				kanjo["kanjo_info_id"]=CS.vueObj.kanjo_detail[i]["kanjo_info_id"];
				CS.vueObj.kanjo_detail[i]=kanjo;
			}

			window.opener.CS.set_kanjo_detail(CS.vueObj.kanjo_detail,CS.itask_list_show_edit_pana_delete_kanjo_id_list);
		}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
			//新しいリストを後ろに挿入
			for(var i=0;i<CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.length;i++){
				if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length==0){
					continue;
				}
				var kinfo=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]];
				var kanjo={};
				kanjo["m_kanjo_code"]=kinfo["m_kanjo_code"];
				kanjo["order"]=kinfo["order_code"];
				kanjo["m_kanjo_id"]=kinfo["m_kanjo_code"];
				kanjo["family"]=kinfo["family_code"];
				kanjo["family_name"]=kinfo["family_name"];
				kanjo["genus"]=kinfo["genus_code"];
				kanjo["genus_name"]=kinfo["genus_name"];
				kanjo["species"]=kinfo["species_code"];
				kanjo["species_name"]=kinfo["species_name"];
				kanjo["variety"]=CS.toI(kinfo["variety"]);
				kanjo["variety_name"]=kinfo["m_kanjo_name"];
				kanjo["property"]=CS.toI(kinfo["property"]);
				kanjo["abc_flag"]=CS.toI(kinfo["abc_flag"]);
				kanjo["sort"]=i;
				kanjo["page"]=-1;
				kanjo["candidate_select_list"]=[];
				kanjo["changeflag"]=true;
				kanjo["amount_this_year"]=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki[i];
				kanjo["amount_pre_year"]="";
				kanjo["kenzankaijyo"]=false;
				if((i>=24 && i<=29) || (i>=34 && i<=35) || (i>=39 && i<=40)){
					kanjo["koteiitem"]="NN";
					kanjo["koteiitemflag"]=false;
				}else{
					kanjo["koteiitem"]="OK";
					kanjo["koteiitemflag"]=true;
				}
				kanjo["tabindex"]=CS.vueObj.itask_list_show_edit_pana_tag_button_index;
				kanjo["page"]=-1;
				kanjo["start_x"]=0;
				kanjo["start_y"]=0;
				kanjo["end_x"]=0;
				kanjo["end_y"]=0;
				kanjo["konki_keisan"]="";
				kanjo["zenki_keisan"]="";
				kanjo["kanjo_info_id"]=CS.vueObj.kanjo_detail[95]["kanjo_info_id"];
				CS.vueObj.kanjo_detail[95]=kanjo;
			}

			window.opener.CS.set_kanjo_detail(CS.vueObj.kanjo_detail,CS.itask_list_show_edit_pana_delete_kanjo_id_list);
		}

		CS.aitask_image_edit_closewindow_call();
		return;
	}
	
	
	
	CS.itask_list_show_edit_pana_delete_kanjo_id_list=[];
	//元リストを消す
	for(var i=CS.vueObj.kanjo_detail.length-1;i>=0;i--){
		if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
			if(CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)<40 && CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
				if(CS.vueObj.kanjo_detail[i]["kanjo_info_id"]!=null && CS.vueObj.kanjo_detail[i]["kanjo_info_id"]!=""){
					CS.itask_list_show_edit_pana_delete_kanjo_id_list.push(CS.vueObj.kanjo_detail[i]["kanjo_info_id"]);
				}
				CS.vueObj.kanjo_detail.splice(i, 1);
			}
		}if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
			if(CS.vueObj.kanjo_detail[i]["order"]==2 && parseInt(CS.vueObj.kanjo_detail[i]["family"],10)>=40 && CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
				if(CS.vueObj.kanjo_detail[i]["kanjo_info_id"]!=null && CS.vueObj.kanjo_detail[i]["kanjo_info_id"]!=""){
					CS.itask_list_show_edit_pana_delete_kanjo_id_list.push(CS.vueObj.kanjo_detail[i]["kanjo_info_id"]);
				}
				CS.vueObj.kanjo_detail.splice(i, 1);
			}
		}if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
			if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)!=4 && CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
				if(CS.vueObj.kanjo_detail[i]["kanjo_info_id"]!=null && CS.vueObj.kanjo_detail[i]["kanjo_info_id"]!=""){
					CS.itask_list_show_edit_pana_delete_kanjo_id_list.push(CS.vueObj.kanjo_detail[i]["kanjo_info_id"]);
				}
				CS.vueObj.kanjo_detail.splice(i, 1);
			}
		}if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==4){
			if(CS.vueObj.kanjo_detail[i]["order"]==1 && typeof CS.vueObj.kanjo_detail[i]["tabindex"] !="undefined" && parseInt(CS.vueObj.kanjo_detail[i]["tabindex"],10)==4 && CS.vueObj.itask_list_show_edit_pana_tag_button_index==4){
				if(CS.vueObj.kanjo_detail[i]["kanjo_info_id"]!=null && CS.vueObj.kanjo_detail[i]["kanjo_info_id"]!=""){
					CS.itask_list_show_edit_pana_delete_kanjo_id_list.push(CS.vueObj.kanjo_detail[i]["kanjo_info_id"]);
				}
				CS.vueObj.kanjo_detail.splice(i, 1);
			}
		}
	}
	//新しいリストを後ろに挿入
	for(var i=0;i<CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.length;i++){
		if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length==0){
			continue;
		}
		var kinfo=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]];
		var kanjo={};
		kanjo["m_kanjo_code"]=kinfo["m_kanjo_code"];
		kanjo["order"]=kinfo["order_code"];
		kanjo["m_kanjo_id"]=kinfo["m_kanjo_code"];
		kanjo["family"]=kinfo["family_code"];
		kanjo["family_name"]=kinfo["family_name"];
		kanjo["genus"]=kinfo["genus_code"];
		kanjo["genus_name"]=kinfo["genus_name"];
		kanjo["species"]=kinfo["species_code"];
		kanjo["species_name"]=kinfo["species_name"];
		kanjo["variety"]=CS.toI(kinfo["variety"]);
		kanjo["variety_name"]=kinfo["m_kanjo_name"];
		kanjo["property"]=CS.toI(kinfo["property"]);
		kanjo["abc_flag"]=CS.toI(kinfo["abc_flag"]);
		kanjo["sort"]=i;
		kanjo["page"]=-1;
		kanjo["candidate_select_list"]=[];
		kanjo["addflag"]=true;
		kanjo["amount_this_year"]=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki[i];
		kanjo["amount_pre_year"]=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_zenki[i];
		kanjo["kenzankaijyo"]=false;
		kanjo["koteiitem"]="NN"
		kanjo["koteiitemflag"]=false;
		kanjo["tabindex"]=CS.vueObj.itask_list_show_edit_pana_tag_button_index;
		kanjo["page"]=-1;
		kanjo["start_x"]=0;
		kanjo["start_y"]=0;
		kanjo["end_x"]=0;
		kanjo["end_y"]=0;
		if(typeof CS.itask_list_show_edit_window_map_a_kanjyo_xyl[i] != "undefined" && typeof CS.itask_list_show_edit_window_map_a_kanjyo_xyl[i][0] != "undefined" && CS.itask_list_show_edit_window_map_a_kanjyo_xyl[i][0].length>6){
			kanjo["page"]=CS.itask_list_show_edit_window_map_a_kanjyo_xyl[i][0][6];
			kanjo["start_x"]=CS.itask_list_show_edit_window_map_a_kanjyo_xyl[i][0][1];
			kanjo["start_y"]=CS.itask_list_show_edit_window_map_a_kanjyo_xyl[i][0][2];
			kanjo["end_x"]=CS.itask_list_show_edit_window_map_a_kanjyo_xyl[i][CS.itask_list_show_edit_window_map_a_kanjyo_xyl[i].length-1][3];
			kanjo["end_y"]=CS.itask_list_show_edit_window_map_a_kanjyo_xyl[i][CS.itask_list_show_edit_window_map_a_kanjyo_xyl[i].length-1][4];
		}

		CS.vueObj.kanjo_detail.push(kanjo);
	}

	window.opener.CS.set_kanjo_detail(CS.vueObj.kanjo_detail,CS.itask_list_show_edit_pana_delete_kanjo_id_list);
	CS.aitask_image_edit_closewindow_call();
}

CS.itask_list_show_edit_window_ma_savepage=function(){
	var linknumber=null;
	if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
		//リンクがある場合なにもしない
		if(typeof CS.vueObj.i_aitask_top_info["link1"] != "undefined" && CS.vueObj.i_aitask_top_info["link1"] != -1){
			return;
		}else{
		//リンクがない場合リンクをセットする
			for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
				var item=CS.vueObj.kanjo_detail[i];
				if(item.order=='2' && parseInt(item.family,10)<40){
					if(parseInt(item["page"],10)>-1){
						linknumber=parseInt(item["page"],10);
						break;
					}else{
						linknumber=0;
					}
				}
			}
		}
	}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
		//リンクがある場合なにもしない
		if(typeof CS.vueObj.i_aitask_top_info["link2"] != "undefined" && CS.vueObj.i_aitask_top_info["link2"] != -1){
			return;
		}else{
		//リンクがない場合リンクをセットする
			for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
				var item=CS.vueObj.kanjo_detail[i];
				if(item.order=='2' && parseInt(item.family,10)>=40){
					if(parseInt(item["page"],10)>-1){
						linknumber=parseInt(item["page"],10);
						break;
					}else{
						linknumber=parseInt(item["page"],10);
					}
				}
			}
		}
	}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
		//リンクがある場合なにもしない
		if(typeof CS.vueObj.i_aitask_top_info["link3"] != "undefined" && CS.vueObj.i_aitask_top_info["link3"] != -1){
			return;
		}else{
		//リンクがない場合リンクをセットする
			for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
				var item=CS.vueObj.kanjo_detail[i];
				if(item.order=='1' && parseInt(item.family,10)!=99999999 && parseInt(item.tabindex,10)!=4){
					if(parseInt(item["page"],10)>-1){
						linknumber=parseInt(item["page"],10);
						break;
					}else{
						linknumber=parseInt(item["page"],10);
					}
				}
			}
		}
	}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==4){
		//リンクがある場合なにもしない
		if(typeof CS.vueObj.i_aitask_top_info["link4"] != "undefined" && CS.vueObj.i_aitask_top_info["link4"] != -1){
			return;
		}else{
		//リンクがない場合リンクをセットする
			for(var i=0;i<CS.vueObj.kanjo_detail.length;i++){
				var item=CS.vueObj.kanjo_detail[i];
				if(item.order=='1' && parseInt(item.family,10)==4 && parseInt(item.tabindex,10)==4){
					if(parseInt(item["page"],10)>-1){
						linknumber=parseInt(item["page"],10);
						break;
					}else{
						linknumber=parseInt(item["page"],10);
					}
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
	obj["kanjo_info_id_list"] = [-1];
	obj["itask_pages_no"] = linknumber;
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
		}
	});
}
CS.set_kanjo_detail=function(kanjo_detail,itask_list_show_edit_pana_delete_kanjo_id_list){
	CS.vueObj.kanjo_detail=[];
	for(var i=0;i<kanjo_detail.length;i++){
		var kinfo=kanjo_detail[i];
		CS.vueObj.kanjo_detail.push(kinfo);
	}
	for(var i=0;i<itask_list_show_edit_pana_delete_kanjo_id_list.length;i++){
		CS.itask_list_show_edit_pana_delete_kanjo_id_list.push(itask_list_show_edit_pana_delete_kanjo_id_list[i]);
	}
	
	CS.itask_list_show_edit_window_change_tab(CS.vueObj.itask_list_show_edit_pana_tag_button_index);
	CS.itask_list_show_edit_window_kensan(4);
}
CS.itask_list_show_edit_window_ma_close = function() {
	var mapstep=["A","B","C"];
}
//手動分析メイン
CS.itask_list_show_edit_window_manual_analysis_preparation = function() {
	var mapstep=["A","B","C","D"];
	if(CS.vueObj.itask_list_show_edit_window_map_flag===-1 || mapstep.includes(CS.vueObj.itask_list_show_edit_window_map_step)){
		//手動分析準備
		if(CS.vueObj.itask_list_show_edit_window_map_step=="A" || CS.vueObj.itask_list_show_edit_window_map_step=="D"){
			
			const today = new Date();
			const milliseconds = today.getTime();
			let form_id = 'aitask_image_edit'+milliseconds;
			let window_name = 'aitask_image_edit'+milliseconds;
			window_name = 'aitask_image_edit';
			var option =
				',width=' + 1024 +
				',height=' + 768 +
				',popup=' + 1 +
				',menubar=' + "no" +
				',noopener=' + "_top" +
				',toolbar=' + "no" +
				',location=' + "no" +
				',noopener=' + "no" +
				',status=' + "no" ;
			CS.aitask_image_edit=window.open('', window_name, option); //新しいタブを開く
			
			let form = document.createElement('form'); // フォーム要素を宣言
			form.action = '/?aitask_image_edit'; // 投げる先のURLを設定
			form.method = 'post'; // GETかPOST、今回はデータを送りたいのでpost
			form.style.display = 'none'; // 要素を画面に表示しない
			form.target = window_name; // 新しいタブがターゲット
			form.id = form_id; // 後で消すためにID指定
			document.body.appendChild(form); // HTMLのbody要素に作ったform要素を追加
			/**
			//input要素作成、今回は2つ作る
			let input1 = document.createElement('input'), input2 = document.createElement('input');
			input1.type = input2.type = 'hidden';
			//要素名と値を追加
			input1.name = 'hoge';
			input1.value = 'fuga';
			input2.name = 'hello';
			input2.value = 'world';
			//form要素に作ったinput要素を追加
			form.appendChild(input1);
			form.appendChild(input2);
			**/
			// 送信
			form.submit();
			CS.vueObj.aitask_common_pop_ac=true;
			// 後始末で削除
			document.getElementById(form_id).remove();
			
			// 親画面にシェードをかける処理を実施
			// １秒間隔で子画面の状態を監視
			CS.interval = setInterval(function()
			{
				// 子画面が閉じていたら
				if(!CS.aitask_image_edit || CS.aitask_image_edit.closed)
				{
					// 親画面のシェードを外す処理
					// Intervalを破棄
					clearInterval(CS.interval);
					CS.vueObj.aitask_common_pop_ac=false;
				// 画面が起動していたら
				}
				else
				{
					// 子画面にフォーカスを当てる
					if(!CS.aitask_image_edit.document.hasFocus())
					{
						CS.aitask_image_edit.focus();
					}
				}
			},500);
			
			return;
		}else if(CS.vueObj.itask_list_show_edit_window_map_step=="B"){
			var xyl=0;
			for(var i=CS.itask_list_show_edit_window_map_add_list_xy.length-1;i>=0;i--){
				if(CS.itask_list_show_edit_window_map_add_list_xy[i].w!=0){
					xyl++;
				}
			}
			if(xyl==0){
				alert("エリアを指定してください");
				return;
			}
			CS.itask_list_show_edit_window_map_draw_fff(CS.vueObj.itask_list_show_file_list_now_imgs_index);
			CS.vueObj.itask_list_show_edit_window_map_step="C";
		}else if(CS.vueObj.itask_list_show_edit_window_map_step=="C"){
			var xyl=0;
			for(var i=CS.itask_list_show_edit_window_map_add_list_xy.length-1;i>=0;i--){
				if(CS.itask_list_show_edit_window_map_add_list_xy[i].w!=0){
					xyl++;
				}
			}
			if(xyl==0){
				alert("エリアを指定してください");
				return;
			}
			CS.itask_list_show_edit_window_map_canvas_src=[];
			CS.del_line_str_right=[];
			CS.itask_list_show_edit_window_map_kara_list=[];
			CS.vueObj.itaskloadnig="aitask_pop_main";
			CS.vueObj.aitask_common_pop_ac=true;
			CS.itask_list_show_edit_window_map_make_canvas_src(0);
		}else{
			CS.vueObj.itask_list_show_edit_window_map_flag=CS.vueObj.itask_list_show_edit_pana_tag_button_index;
		}
	}else{
		//手動分析実施
		CS.vueObj.itask_list_show_edit_window_map_flag=-1;
		CS.vueObj.itask_list_show_edit_window_map_step="A";
	}
}
CS.itask_list_show_edit_window_map_draw_fff_formake=function(imgs_index,xy_index){
	//比率
	var hihituw=CS.itask_list_show_edit_window_map_make_canvas_src_W/CS.itask_list_show_edit_window_map_KVN_width;
	var hihituh=CS.itask_list_show_edit_window_map_make_canvas_src_H/CS.itask_list_show_edit_window_map_KVN_height;
	
	CS.itask_list_show_edit_window_canvas_ctx.fillStyle = '#fff';
	for(var j=0;j<CS.itask_list_show_edit_window_map_make_canvas_src_H;j++){
		var fs=null;
		var fe=null;
		for(var i=0;i<CS.itask_list_show_edit_window_map_make_canvas_src_W;i++){
			var dodelflag=true;
			for(var t=0;t<CS.itask_list_show_edit_window_map_add_list_xy.length;t++){
				if(CS.itask_list_show_edit_window_map_add_list_xy[t].imgs_index==imgs_index && xy_index==t){
					var x=CS.itask_list_show_edit_window_map_add_list_xy[t].x*hihituw;
					var y=CS.itask_list_show_edit_window_map_add_list_xy[t].y*hihituh;
					var w=CS.itask_list_show_edit_window_map_add_list_xy[t].w*hihituw;
					var h=CS.itask_list_show_edit_window_map_add_list_xy[t].h*hihituh;
					
					if(x<=i && x+w>=i && y<=j && y+h>=j){
						dodelflag=false;
					}
				}
			}
			if(fs==null){
				if(dodelflag){
					fs=i;
				}
			}else{
				if(!dodelflag){
					fe=i;
				}else if(i==CS.itask_list_show_edit_window_map_make_canvas_src_W-1){
					fe=i;
				}
			}
			if(CS.itask_list_show_edit_window_map_add_list_xy.length>0){
				if(fs!=null && fe!=null){
					CS.itask_list_show_edit_window_canvas_ctx.fillRect(fs, j, fe-fs, 1);
					fs=null;
					fe=null;
				}
			}
		}
	}
	for(var t=0;t<CS.itask_list_show_edit_window_map_add_list_xy.length;t++){
		if(CS.itask_list_show_edit_window_map_add_list_xy[t].imgs_index==imgs_index){
			var x=CS.itask_list_show_edit_window_map_add_list_xy[t].x;
			var y=CS.itask_list_show_edit_window_map_add_list_xy[t].y;
			var w=CS.itask_list_show_edit_window_map_add_list_xy[t].w;
			var h=CS.itask_list_show_edit_window_map_add_list_xy[t].h;
			//CS.itask_list_show_edit_window_map_draw_fff_delete_yokotate(CS.itask_list_show_edit_window_canvas,h*hihituh);
		}
	}
}
CS.itask_list_show_edit_window_map_draw_fff_delete_yokotate=function(canvas,h){
	const ctx = canvas.getContext('2d', { willReadFrequently: true });
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;

	// 閾値：色の差が一定以下であれば同じ色とみなす
	const colorThreshold = 250;

	// 横方向の線を検出して白色に置き換え
	// for (let y = 0; y < canvas.height; y++) {
		// let isLine = true;
		// for (let x = 1; x < canvas.width; x++) {
			// const i1 = (y * canvas.width + (x - 1)) * 4;
			// const i2 = (y * canvas.width + x) * 4;

			// if (!isSimilarColor(data, i1, i2, colorThreshold)) {
				// isLine = false;
				// break;
			// }
		// }
		// if (isLine) {
			// for (let x = 0; x < canvas.width; x++) {
				// const index = (y * canvas.width + x) * 4;
				// data[index] = 255;     // 赤成分
				// data[index + 1] = 255; // 緑成分
				// data[index + 2] = 255; // 青成分
			// }
		// }
	// }

	// 縦方向の線を検出して白色に置き換え
	for (let x = 0; x < canvas.width; x++) {
		let isLine = true;
		var dodo=0;
		for (let y = 1; y < canvas.height; y++) {
			const i1 = ((y - 1) * canvas.width + x) * 4;
			const i2 = (y * canvas.width + x) * 4;
			
			if(data[i2]<150 && data[i2 + 1]<150 && data[i2 + 2]<150){
				// data[i2] = 255;     // 赤成分
				// data[i2 + 1] = 0; // 緑成分
				// data[i2 + 2] = 0; // 青成分
				dodo++;
			}
			

			if (!isSimilarColor(data, i1, i2, colorThreshold)) {
				//isLine = false;
				//break;
			}
		}
		if(dodo/h<0.5){
			isLine = false;
		}
		if (isLine) {
			for (var t = 0; t < 3; t++) {
				for (let y = 0; y < canvas.height; y++) {
					const index = (y * canvas.width + x) * 4;
					data[index] = 255;     // 赤成分
					data[index + 1] = 255; // 緑成分
					data[index + 2] = 255; // 青成分
				}
			}

		}
	}

	// ピクセルの類似度をチェックする関数
	function isSimilarColor(data, index1, index2, threshold) {
		const rDiff = Math.abs(data[index1] - data[index2]);
		const gDiff = Math.abs(data[index1 + 1] - data[index2 + 1]);
		const bDiff = Math.abs(data[index1 + 2] - data[index2 + 2]);
		return rDiff < threshold && gDiff < threshold && bDiff < threshold;
	}

	ctx.putImageData(imageData, 0, 0);
}
CS.itask_list_show_edit_window_map_draw_fff=function(imgs_index){
	CS.itask_list_show_edit_window_canvas_ctx.fillStyle = '#fff';
	for(var i=0;i<CS.itask_list_show_edit_window_map_KVN_width;i++){
		for(var j=0;j<CS.itask_list_show_edit_window_map_KVN_height;j++){
			var dodelflag=true;
			for(var t=0;t<CS.itask_list_show_edit_window_map_add_list_xy.length;t++){
				if(CS.itask_list_show_edit_window_map_add_list_xy[t].imgs_index==imgs_index){
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
	for(var t=0;t<CS.itask_list_show_edit_window_map_add_list_xy.length;t++){
		if(CS.itask_list_show_edit_window_map_add_list_xy[t].imgs_index==imgs_index){
			var x=CS.itask_list_show_edit_window_map_add_list_xy[t].x;
			var y=CS.itask_list_show_edit_window_map_add_list_xy[t].y;
			var w=CS.itask_list_show_edit_window_map_add_list_xy[t].w;
			var h=CS.itask_list_show_edit_window_map_add_list_xy[t].h;
			//CS.itask_list_show_edit_window_map_draw_fff_delete_yokotate(CS.itask_list_show_edit_window_canvas,h);
		}
	}

	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("houjin")==-1){
		if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
			for(var t=0;t<CS.itask_list_show_edit_window_map_add_list_xy.length;t++){
				if(CS.itask_list_show_edit_window_map_add_list_xy[t].imgs_index==imgs_index){
					var x=CS.itask_list_show_edit_window_map_add_list_xy[t].x;
					var y=CS.itask_list_show_edit_window_map_add_list_xy[t].y;
					var w=CS.itask_list_show_edit_window_map_add_list_xy[t].w;
					var h=CS.itask_list_show_edit_window_map_add_list_xy[t].h;
					hhh=h/26;
					for(k=0;k<26;k++){
						CS.itask_list_show_edit_window_canvas_ctx.fillStyle = '#fff374';
						CS.itask_list_show_edit_window_canvas_ctx.fillRect(x, y+hhh*(k+1), w,2);
					}
				}
			}
		}
	}
}
CS.itask_list_show_edit_window_map_make_canvas_src=function(xy_index){
	var imgs_index=CS.itask_list_show_edit_window_map_add_list_xy[xy_index].imgs_index
	if(CS.itask_list_show_edit_window_map_add_list_xy[xy_index]["color"]=="red"){
		CS.del_line_str_right.push(xy_index);
	}
	if(CS.itask_list_show_edit_window_map_add_list_xy[xy_index]["w"]==0){
		CS.itask_list_show_edit_window_map_kara_list.push(xy_index);
	}
	CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
	CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[imgs_index];
	CS.itask_list_show_edit_window_canvas_tmp_img.onload = function(){
		console.log(CS.itask_list_show_edit_window_canvas_tmp_img.naturalWidth );
		CS.itask_list_show_edit_window_map_make_canvas_src_W=CS.itask_list_show_edit_window_canvas_tmp_img.naturalWidth;
		CS.itask_list_show_edit_window_map_make_canvas_src_H=CS.itask_list_show_edit_window_canvas_tmp_img.naturalHeight;
		$('#itask_list_show_edit_window_canvas').attr('width' , CS.itask_list_show_edit_window_map_make_canvas_src_W);
		$('#itask_list_show_edit_window_canvas').attr('height',CS.itask_list_show_edit_window_map_make_canvas_src_H);
		if(CS.itask_list_show_edit_window_map_add_list_xy[xy_index]["w"]==0){
			$('#itask_list_show_edit_window_canvas').attr('width' , 400);
			$('#itask_list_show_edit_window_canvas').attr('height',400);
		}
		CS.itask_list_show_edit_window_canvas_ctx.drawImage(CS.itask_list_show_edit_window_canvas_tmp_img, 0, 0, CS.itask_list_show_edit_window_map_make_canvas_src_W, CS.itask_list_show_edit_window_map_make_canvas_src_H);
		CS.itask_list_show_edit_window_map_draw_fff_formake(imgs_index,xy_index);
		CS.itask_list_show_edit_window_map_canvas_src.push(document.getElementById('itask_list_show_edit_window_canvas').toDataURL('image/jpeg').replaceAll('data:image/jpeg;base64,', ''));
		if(xy_index+1<CS.itask_list_show_edit_window_map_add_list_xy.length){
			CS.itask_list_show_edit_window_map_make_canvas_src(xy_index+1);
		}else{
			setTimeout(function(){
				CS.itask_list_show_edit_window_map_do();
				$('#itask_list_show_edit_window_canvas').attr('width' , CS.itask_list_show_edit_window_map_KVN_width);
				$('#itask_list_show_edit_window_canvas').attr('height',CS.itask_list_show_edit_window_map_KVN_height);
			},100);
		}
	}
}
CS.itask_list_show_edit_window_map_backtoanser=function(){
	CS.vueObj.itask_list_show_edit_window_map_step="D";
}
CS.itask_list_show_edit_window_map_rotate=function(){
	if(CS.vueObj.itask_list_show_edit_window_map_kakudo[CS.vueObj.itask_list_show_file_list_now_imgs_index]==0){
		return;
	}
	//背景画像をセットする
	CS.itask_list_show_edit_window_map_KVN_layer0.destroyChildren();
	//背景画像
	CS.itask_list_show_edit_window_map_KVN_hk_img = new Konva.Image({
		x: CS.itask_list_show_edit_window_map_KVN_width / 2,
		y: CS.itask_list_show_edit_window_map_KVN_height / 2,
		image: CS.itask_list_show_edit_window_canvas_tmp_img,
		width: CS.itask_list_show_edit_window_map_KVN_width,
		height: CS.itask_list_show_edit_window_map_KVN_height,
		// 画像の中心を基準点にする
		offsetX: CS.itask_list_show_edit_window_map_KVN_width / 2, 
		offsetY: CS.itask_list_show_edit_window_map_KVN_height / 2
	});
	CS.itask_list_show_edit_window_map_KVN_hk_img.rotation(CS.vueObj.itask_list_show_edit_window_map_kakudo[CS.vueObj.itask_list_show_file_list_now_imgs_index]); 
	CS.itask_list_show_edit_window_map_KVN_layer0.add(CS.itask_list_show_edit_window_map_KVN_hk_img);
	CS.itask_list_show_edit_window_map_KVN_layer0.draw();
}
CS.itask_list_show_edit_window_map_settxxlist_2=function(txxlist,h,hihituh,color){
	for(var t=0;t<CS.itask_list_show_edit_window_map_add_list_xy.length;t++){
		if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==color){
			if(CS.itask_list_show_edit_window_map_add_list_xy[t].w>50 && CS.itask_list_show_edit_window_map_add_list_xy[t].h>50){
				//分析座標縦幅/相対座標縦幅
				var hhh=CS.itask_list_show_edit_window_map_add_list_xy[t].h*hihituh/(txxlist.length+1);
				//各項目の絶対ｙ座標
				for(var i=0;i<txxlist.length;i++){
					txxlist[i]=(i+1)*hhh+CS.itask_list_show_edit_window_map_add_list_xy[t].y*hihituh+hhh/3;
				}
			}
		}
	}
	return txxlist;
}
CS.itask_list_show_edit_window_map_settxxlist_3=function(txxlist,h,hihituh,color){
	for(var t=0;t<CS.itask_list_show_edit_window_map_add_list_xy.length;t++){
		if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==color){
			if(CS.itask_list_show_edit_window_map_add_list_xy[t].w>50 && CS.itask_list_show_edit_window_map_add_list_xy[t].h>50){
				//分析座標縦幅/相対座標縦幅
				var hhh=CS.itask_list_show_edit_window_map_add_list_xy[t].h*hihituh/(txxlist.length+1);
				//各項目の絶対ｙ座標
				for(var i=0;i<txxlist.length-1;i++){
					
					if(i==txxlist.length-2){
						txxlist[i]=(i+1)*hhh+CS.itask_list_show_edit_window_map_add_list_xy[t].y*hihituh+hhh*2/3;
					}else{
						txxlist[i]=(i+1)*hhh+CS.itask_list_show_edit_window_map_add_list_xy[t].y*hihituh+hhh/3;
					}
				}
			}
		}
	}
	txxlist.splice(12,1);
	return txxlist;
}
CS.itask_list_show_edit_window_map_settxxlist=function(txxlist,h,hihituh,color){
	for(var t=0;t<CS.itask_list_show_edit_window_map_add_list_xy.length;t++){
		if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==color){
			if(CS.itask_list_show_edit_window_map_add_list_xy[t].w>50 && CS.itask_list_show_edit_window_map_add_list_xy[t].h>50){
				//分析座標縦幅/相対座標縦幅
				var hhh=CS.itask_list_show_edit_window_map_add_list_xy[t].h*hihituh/h;
				//各項目の絶対ｙ座標
				for(var i=0;i<txxlist.length;i++){
					txxlist[i]=txxlist[i]*hhh+CS.itask_list_show_edit_window_map_add_list_xy[t].y*hihituh;
				}
			}
		}
	}
	return txxlist;
}

CS.itask_list_show_edit_window_map_do=function(){
	var obj = {};
	obj["canvas_src"] = CS.itask_list_show_edit_window_map_canvas_src;
	obj["action"] = "itask_list_show_edit_window_map_do";
	if(typeof CS.itask_list_show_edit_window_ana2_flag != "undefined" && CS.itask_list_show_edit_window_ana2_flag){
		obj["action"] = "itask_list_show_edit_window_ana2";
	}
	obj["del_line_str_right"] = CS.del_line_str_right.join(',');
	obj["kara_list"] = CS.itask_list_show_edit_window_map_kara_list.join(',');
	obj["map_add_list_xy"] = CS.itask_list_show_edit_window_map_add_list_xy;

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
			CS.vueObj.itaskloadnig="";
			CS.vueObj.aitask_common_pop_ac=false;
		} else {
			CS.itask_list_show_edit_window_map_do_find_init="init";
			var page_codes=data["jsoncode"]["recode"]["page_codes"];
			if(typeof page_codes == "undefined" || page_codes==null || page_codes.length==0){
				page_codes=[];
				page_codes[0]=[];
				page_codes[0][0]=[" ",0,0,0,0,0];
			}
			if(typeof CS.itask_list_show_edit_window_ana2_flag != "undefined" && CS.itask_list_show_edit_window_ana2_flag){
				for(var i = 0;i < page_codes.length;i++){
					for(var j = 0;j < page_codes[i].length;j++){
						page_codes[i][j][2]=page_codes[i][j][5];
					}
				}
			}
			
			var hihituw=CS.itask_list_show_edit_window_map_make_canvas_src_W/CS.itask_list_show_edit_window_map_KVN_width;
			var hihituh=CS.itask_list_show_edit_window_map_make_canvas_src_H/CS.itask_list_show_edit_window_map_KVN_height;
			
			if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("houjin")==-1){
				///////////////////////////////
				//個人//////////////////////////
				///////////////////////////////
				CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list=[];
				CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_readonly=[];
				CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki=[];
				CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index=[];
				CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index_code=[];
				CS.itask_list_show_edit_window_map_kanjyo_list_base=[];//勘定科目
				CS.itask_list_show_edit_window_map_konki_list_base=[];//今期
				CS.itask_list_show_edit_window_map_zenki_list_base=[];//前期
				
				
				CS.vueObj.itask_list_show_edit_window_map_a_kanjyo=[];
				CS.itask_list_show_edit_window_map_a_kanjyo_tmp=[];
				CS.vueObj.itask_list_show_edit_window_map_a_konki=[];
				CS.vueObj.itask_list_show_edit_window_map_a_zenki=[];
				CS.itask_list_show_edit_window_map_a_kanjyo_xy=[];
				CS.itask_list_show_edit_window_map_a_zenki_xy=[];
				CS.itask_list_show_edit_window_map_a_konki_xy=[];
				//2列パターンを対応するため、各文字の座標をメモする
				CS.itask_list_show_edit_window_map_a_kanjyo_xyl=[];
				CS.itask_list_show_edit_window_map_a_zenki_xyl=[];
				CS.itask_list_show_edit_window_map_a_konki_xyl=[];
				
				var kanjyo_map={};
				var zenki_map={};
				var konki_map={};
				var list_xy=[];
				
				//勘定科目選択リストを洗い出し
				CS.itask_list_show_edit_window_map_kanjo_view=data["m_kanjo_view_list"];
				console.log("kanjyo_view:"+CS.itask_list_show_edit_window_map_kanjo_view.length);
				for(var i=CS.itask_list_show_edit_window_map_kanjo_view.length-1;i>=0;i--){
					var order=CS.toI(CS.itask_list_show_edit_window_map_kanjo_view[i]["order_code"]);
					var family=CS.toI(CS.itask_list_show_edit_window_map_kanjo_view[i]["family_code"]);
					if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
						if(order==2){
						}else{
							CS.itask_list_show_edit_window_map_kanjo_view.splice( i, 1 );
						}
					}
					if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
						if(order==1){
						}else{
							CS.itask_list_show_edit_window_map_kanjo_view.splice( i, 1 );
						}
					}
					if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
						if(order==1){
						}else{
							CS.itask_list_show_edit_window_map_kanjo_view.splice( i, 1 );
						}
					}
				}
				
				if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
					CS.itask_list_show_edit_window_map_kanjyo_list_base=[];//勘定科目
					CS.itask_list_show_edit_window_map_konki_list_base=[];//今期
					//選択リスト作成
					for(var i=0;i<CS.vueObj.kojin_eazy_inputlist.length;i++){
						if(i<45){
							CS.itask_list_show_edit_window_map_kanjyo_list_base.push(CS.vueObj.kojin_eazy_inputlist[i]);
						}
					}
					//原始の勘定科目を準備
					for(var i=0;i<CS.itask_list_show_edit_window_map_kanjyo_list_base.length;i++){
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.push(CS.itask_list_show_edit_window_map_kanjyo_list_base[i]["variety_name"]);
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index_code.push(CS.itask_list_show_edit_window_map_kanjyo_list_base[i]["m_kanjo_code"]);
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.push(CS.itask_list_show_edit_window_map_do_find(CS.itask_list_show_edit_window_map_kanjyo_list_base[i]["variety_name"],"="+CS.itask_list_show_edit_window_map_kanjyo_list_base[i]["m_kanjo_code"]));
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index.push(0);
						if(CS.itask_list_show_edit_window_map_kanjyo_list_base[i]["m_kanjo_code"].indexOf("999")!=-1){
							CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_readonly.push("readonly");
						}else{
							CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_readonly.push("none");
						}
					}
					//左側相対座標
					//相対座標
					var t2lh=1900;
					var t2llist=[187,335,435,542,645,740,890,1040,1140,1238,1337,1441,1535,1639,1738,1837];
					//左側金額位置の予想
					t2llist=CS.itask_list_show_edit_window_map_settxxlist(t2llist,t2lh,hihituh,CS.aitask_image_edit_lkin);
					//真中相対座標
					//相対座標
					var t2mh=1900;
					var t2mlist=[145,248,340,436,542,636,736,836,942,1040,1140,1238,1337,1441,1535,1639,1763];
					//真中項目位置の予想
					t2mlist=CS.itask_list_show_edit_window_map_settxxlist(t2mlist,t2mh,hihituh,CS.aitask_image_edit_mkam);
					//真中相対座標
					//相対座標
					var t2rh=1400;
					var t2rlist=[145,248,340,436,542,636,736,836,942,1040,1140,1300,1300];
					//真中項目位置の予想
					t2rlist=CS.itask_list_show_edit_window_map_settxxlist_3(t2rlist,t2rh,hihituh,CS.aitask_image_edit_rkam);
					//左側金額整理
					for(var i = 0;i < page_codes.length;i++){
						for(var j = 0;j < page_codes[i].length;j++){
							for(var t=0;t<CS.itask_list_show_edit_window_map_add_list_xy.length;t++){
								var tmpt=CS.itask_list_show_edit_window_map_add_list_xy[t];
								if(tmpt.x*hihituw <= page_codes[i][j][1] && tmpt.y*hihituh <= page_codes[i][j][2] && tmpt.x*hihituw+tmpt.w*hihituw >= page_codes[i][j][3] && tmpt.y*hihituh+tmpt.h*hihituh >= page_codes[i][j][4] ){
								}else{
									continue;
								}
								if(i!=t){
									continue;
								}
								var wranlist=["[","]","(",")","【","】","（","）","<",">","＜","＞"];
								if(wranlist.includes(page_codes[i][j][0])){
									continue;
								}
								page_codes[i][j][7]=t;
								page_codes[i][j][6]=tmpt["imgs_index"];
								page_codes[i][j][8]=tmpt["grp_no"];
								
								if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_lkin){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_konki_list_base.push(page_codes[i][j]);
								}else if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_mkin){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_konki_list_base.push(page_codes[i][j]);
								}else if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_rkin){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_konki_list_base.push(page_codes[i][j]);
								}else if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_lkam){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_kanjyo_list_base.push(page_codes[i][j]);
								}else if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_mkam){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_kanjyo_list_base.push(page_codes[i][j]);
								}else if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_rkam){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_kanjyo_list_base.push(page_codes[i][j]);
								}
							}
						}
					}
				}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
					CS.itask_list_show_edit_window_map_kanjyo_list_base=[];//勘定科目
					CS.itask_list_show_edit_window_map_konki_list_base=[];//今期
					//選択リスト作成
					for(var i=0;i<CS.vueObj.kojin_eazy_inputlist.length;i++){
						if(i>=45 && i<=94){
							CS.itask_list_show_edit_window_map_kanjyo_list_base.push(CS.vueObj.kojin_eazy_inputlist[i]);
						}
					}
					//原始の勘定科目を準備
					for(var i=0;i<CS.itask_list_show_edit_window_map_kanjyo_list_base.length;i++){
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.push(CS.itask_list_show_edit_window_map_kanjyo_list_base[i]["variety_name"]);
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index_code.push(CS.itask_list_show_edit_window_map_kanjyo_list_base[i]["m_kanjo_code"]);
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.push(CS.itask_list_show_edit_window_map_do_find(CS.itask_list_show_edit_window_map_kanjyo_list_base[i]["variety_name"],"="+CS.itask_list_show_edit_window_map_kanjyo_list_base[i]["m_kanjo_code"]));
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index.push(0);
						if(CS.itask_list_show_edit_window_map_kanjyo_list_base[i]["m_kanjo_code"].indexOf("999")!=-1){
							CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_readonly.push("readonly");
						}else{
							CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_readonly.push("none");
						}
					}
					//左側相対座標
					//相対座標
					var t2lh=2512;
					var t2llist=[141,237,336,426,528,618,717,812,909,1002,1103,1193,1289,1385,1482,1577,1680,1775,1866,1961,2055,2154,2250,2345,2440];
					//左側金額位置の予想
					t2llist=CS.itask_list_show_edit_window_map_settxxlist_2(t2llist,t2lh,hihituh,CS.aitask_image_edit_lkam)
					//相対座標
					var t2rh=2512;
					var t2rlist=[141,237,336,426,528,618,717,812,909,1002,1103,1193,1289,1385,1482,1577,1680,1775,1866,1961,2055,2154,2250,2345,2440];
					//真中項目位置の予想
					t2rlist=CS.itask_list_show_edit_window_map_settxxlist_2(t2rlist,t2rh,hihituh,CS.aitask_image_edit_rkam);
					//左側金額整理
					for(var i = 0;i < page_codes.length;i++){
						for(var j = 0;j < page_codes[i].length;j++){
							for(var t=0;t<CS.itask_list_show_edit_window_map_add_list_xy.length;t++){
								var tmpt=CS.itask_list_show_edit_window_map_add_list_xy[t];
								if(tmpt.x*hihituw <= page_codes[i][j][1] && tmpt.y*hihituh <= page_codes[i][j][2] && tmpt.x*hihituw+tmpt.w*hihituw >= page_codes[i][j][3] && tmpt.y*hihituh+tmpt.h*hihituh >= page_codes[i][j][4] ){
								}else{
									continue;
								}
								if(i!=t){
									continue;
								}
								var wranlist=["[","]","(",")","【","】","（","）","<",">","＜","＞"];
								if(wranlist.includes(page_codes[i][j][0])){
									continue;
								}
								page_codes[i][j][7]=t;
								page_codes[i][j][6]=tmpt["imgs_index"];
								page_codes[i][j][8]=tmpt["grp_no"];
								
								if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_lkin){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_konki_list_base.push(page_codes[i][j]);
								}else if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_mkin){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_konki_list_base.push(page_codes[i][j]);
								}else if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_rkin){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_konki_list_base.push(page_codes[i][j]);
								}else if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_lkam){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_kanjyo_list_base.push(page_codes[i][j]);
								}else if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_mkam){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_kanjyo_list_base.push(page_codes[i][j]);
								}else if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_rkam){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_kanjyo_list_base.push(page_codes[i][j]);
								}
							}
						}
					}
				}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
					CS.itask_list_show_edit_window_map_kanjyo_list_base=[];//勘定科目
					CS.itask_list_show_edit_window_map_konki_list_base=[];//今期
					//選択リスト作成
					for(var i=0;i<CS.vueObj.kojin_eazy_inputlist.length;i++){
						if(i==95){
							CS.itask_list_show_edit_window_map_kanjyo_list_base.push(CS.vueObj.kojin_eazy_inputlist[i]);
						}
					}
					//原始の勘定科目を準備
					for(var i=0;i<CS.itask_list_show_edit_window_map_kanjyo_list_base.length;i++){
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.push(CS.itask_list_show_edit_window_map_kanjyo_list_base[i]["variety_name"]);
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index_code.push(CS.itask_list_show_edit_window_map_kanjyo_list_base[i]["m_kanjo_code"]);
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.push(CS.itask_list_show_edit_window_map_do_find(CS.itask_list_show_edit_window_map_kanjyo_list_base[i]["variety_name"],"="+CS.itask_list_show_edit_window_map_kanjyo_list_base[i]["m_kanjo_code"]));
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index.push(0);
						if(CS.itask_list_show_edit_window_map_kanjyo_list_base[i]["m_kanjo_code"].indexOf("999")!=-1){
							CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_readonly.push("readonly");
						}else{
							CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_readonly.push("none");
						}
					}
					//左側相対座標
					//相対座標
					var t2lh=2512;
					var t2llist=[141];
					//左側金額位置の予想
					t2llist=CS.itask_list_show_edit_window_map_settxxlist(t2llist,t2lh,hihituh,CS.aitask_image_edit_lkam)
					//左側金額整理
					for(var i = 0;i < page_codes.length;i++){
						for(var j = 0;j < page_codes[i].length;j++){
							for(var t=0;t<CS.itask_list_show_edit_window_map_add_list_xy.length;t++){
								var tmpt=CS.itask_list_show_edit_window_map_add_list_xy[t];
								if(tmpt.x*hihituw <= page_codes[i][j][1] && tmpt.y*hihituh <= page_codes[i][j][2] && tmpt.x*hihituw+tmpt.w*hihituw >= page_codes[i][j][3] && tmpt.y*hihituh+tmpt.h*hihituh >= page_codes[i][j][4] ){
								}else{
									continue;
								}
								if(i!=t){
									continue;
								}
								var wranlist=["[","]","(",")","【","】","（","）","<",">","＜","＞"];
								if(wranlist.includes(page_codes[i][j][0])){
									continue;
								}
								page_codes[i][j][7]=t;
								page_codes[i][j][6]=tmpt["imgs_index"];
								page_codes[i][j][8]=tmpt["grp_no"];
								
								if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_lkin){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_konki_list_base.push(page_codes[i][j]);
								}else if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_mkin){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_konki_list_base.push(page_codes[i][j]);
								}else if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_rkin){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_konki_list_base.push(page_codes[i][j]);
								}else if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_lkam){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_kanjyo_list_base.push(page_codes[i][j]);
								}else if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_mkam){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_kanjyo_list_base.push(page_codes[i][j]);
								}else if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]==CS.aitask_image_edit_rkam){
									page_codes[i][j][9]=CS.itask_list_show_edit_window_map_add_list_xy[t]["color"];
									CS.itask_list_show_edit_window_map_kanjyo_list_base.push(page_codes[i][j]);
								}
							}
						}
					}
				}
				
				//各「base」から、同じy座標のやつを１行にする　勘定科目
				for(var i=0;i<CS.itask_list_show_edit_window_map_kanjyo_list_base.length;i++){
					var thiskey=0;
					for(let key in kanjyo_map) {
						key=CS.toI(key.split("_")[2]);
						if(CS.itask_list_show_edit_window_map_kanjyo_list_base[i][2]-10<key && CS.itask_list_show_edit_window_map_kanjyo_list_base[i][2]+10>key){
							thiskey=key;
						}
					}
					if(thiskey==0){
						thiskey=CS.itask_list_show_edit_window_map_kanjyo_list_base[i][2];
					}
					CS.itask_list_show_edit_window_map_kanjyo_list_base[i][5]=thiskey;
					var pageindex=CS.itask_list_show_edit_window_map_kanjyo_list_base[i][6];
					var xyt=CS.itask_list_show_edit_window_map_kanjyo_list_base[i][7];
					if(typeof kanjyo_map[pageindex+"_"+xyt+"_"+thiskey] == "undefined"){
						kanjyo_map[pageindex+"_"+xyt+"_"+thiskey]=[];
					}
					kanjyo_map[pageindex+"_"+xyt+"_"+thiskey].push(CS.itask_list_show_edit_window_map_kanjyo_list_base[i]);
				}
				
				
				
				
				//各「base」から、同じy座標　今期
				for(var i=0;i<CS.itask_list_show_edit_window_map_konki_list_base.length;i++){
					var thiskey=0;
					for(let key in konki_map) {
						key=CS.toI(key.split("_")[2]);
						if(CS.itask_list_show_edit_window_map_konki_list_base[i][2]-10<key && CS.itask_list_show_edit_window_map_konki_list_base[i][2]+10>key){
							thiskey=key;
						}
					}
					if(thiskey==0){
						thiskey=CS.itask_list_show_edit_window_map_konki_list_base[i][2];
					}
					CS.itask_list_show_edit_window_map_konki_list_base[i][5]=thiskey;
					var pageindex=CS.itask_list_show_edit_window_map_konki_list_base[i][6];
					var xyt=CS.itask_list_show_edit_window_map_konki_list_base[i][7];
					if(typeof konki_map[pageindex+"_"+xyt+"_"+thiskey] == "undefined"){
						konki_map[pageindex+"_"+xyt+"_"+thiskey]=[];
					}
					konki_map[pageindex+"_"+xyt+"_"+thiskey].push(CS.itask_list_show_edit_window_map_konki_list_base[i]);
				}
				//今期
				for(let key in konki_map) {
					var tempobj=konki_map[key];
					tempobj.sort(function(a,b){return(a[1] - b[1]);});
					var in_text="";
					var tmpchar="";
					var xy_list=[];
					for(var i=0;i<tempobj.length;i++){
						if(tmpchar==tempobj[i][0]){
							//continue;
						}
						if(i>0){
							if(Math.abs(tempobj[i][1]-tempobj[i-1][1])<10){
								continue;
							}
						}
						in_text=in_text+tempobj[i][0];
						xy_list.push(tempobj[i]);
						tmpchar=tempobj[i][0];
					}
					CS.itask_list_show_edit_window_map_a_konki_xyl.push(xy_list);
					CS.itask_list_show_edit_window_map_a_konki_xy.push(tempobj[0]);
					in_text=CS.itask_list_show_edit_window_map_do_clear_text(in_text);
					CS.vueObj.itask_list_show_edit_window_map_a_konki.push(in_text);
				}
				
				
				//各行の文字をくっ付けって、文字列にする　＆　各文字列の座標をメモする、後ほど、勘定科目と金額をマージする
				//勘定科目
				for(let key in kanjyo_map) {
					var tempobj=kanjyo_map[key];
					tempobj.sort(function(a,b){return(a[1] - b[1]);});
					var in_text="";
					var tmpchar="";
					var xy_list=[];
					for(var i=0;i<tempobj.length;i++){
						if(tmpchar==tempobj[i][0]){
							continue;
						}
						in_text=in_text+tempobj[i][0];
						xy_list.push(tempobj[i]);
						tmpchar=tempobj[i][0];
					}
					CS.itask_list_show_edit_window_map_a_kanjyo_xyl.push(xy_list);
					CS.itask_list_show_edit_window_map_a_kanjyo_xy.push(tempobj[0]);
					CS.itask_list_show_edit_window_map_a_kanjyo_tmp.push(in_text);
				}
				
				
				if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
					//左側金額をマージする
					for(var i=0;i<t2llist.length;i++){
						var insertflag=false;
						for(var j=0;j<CS.itask_list_show_edit_window_map_a_konki_xy.length;j++){
							var y=CS.itask_list_show_edit_window_map_a_konki_xy[j][2];
							if(t2llist[i]+50>y && t2llist[i]-30<y && CS.itask_list_show_edit_window_map_a_konki_xy[j][9]==CS.aitask_image_edit_lkin){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki.push(CS.vueObj.itask_list_show_edit_window_map_a_konki[j]);
								insertflag=true;
								break;
							}
						}
						if(!insertflag){
							CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki.push("");
						}
					}
					//右側金額をマージする
					for(var i=0;i<t2rlist.length;i++){
						var insertflag=false;
						for(var j=0;j<CS.itask_list_show_edit_window_map_a_konki_xy.length;j++){
							var y=CS.itask_list_show_edit_window_map_a_konki_xy[j][2];
							if(t2rlist[i]+50>y && t2rlist[i]-30<y && CS.itask_list_show_edit_window_map_a_konki_xy[j][9]==CS.aitask_image_edit_rkin){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki.push(CS.vueObj.itask_list_show_edit_window_map_a_konki[j]);
								insertflag=true;
								break;
							}
						}
						if(!insertflag){
							CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki.push("");
						}
					}
					//左勘定科目をマージする
					for(var i=0;i<t2llist.length;i++){
						if(i<=22 && i>=16){
						}else{
							continue;
						}
						var insertflag=false;
						for(var j=0;j<CS.itask_list_show_edit_window_map_a_kanjyo_xy.length;j++){
							var y=CS.itask_list_show_edit_window_map_a_kanjyo_xy[j][2];
							if(t2llist[i]+50>y && t2llist[i]-30<y && CS.itask_list_show_edit_window_map_a_kanjyo_xy[j][9]==CS.aitask_image_edit_lkam){
								var str=CS.itask_list_show_edit_window_map_a_kanjyo_tmp[j];
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo[i]=str;
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=CS.itask_list_show_edit_window_map_do_find(str,null);
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=0;
								insertflag=true;
								break;
							}
						}
					}
					//右勘定科目をマージする
					for(var i=0;i<t2rlist.length;i++){
						if((i>=6 && i<=12) || (i>=14 && i<=20)){
						}else{
							continue;
						}
						var insertflag=false;
						for(var j=0;j<CS.itask_list_show_edit_window_map_a_kanjyo_xy.length;j++){
							var y=CS.itask_list_show_edit_window_map_a_kanjyo_xy[j][2];
							if(t2rlist[i]+50>y && t2rlist[i]-30<y && CS.itask_list_show_edit_window_map_a_kanjyo_xy[j][9]==CS.aitask_image_edit_rkam){
								var str=CS.itask_list_show_edit_window_map_a_kanjyo_tmp[j];
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo[25+i]=str;
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[25+i]=CS.itask_list_show_edit_window_map_do_find(str,null);
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[25+i]=0;
								insertflag=true;
								break;
							}
						}
					}
				}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
					//左側金額をマージする
					for(var i=0;i<t2llist.length;i++){
						var insertflag=false;
						for(var j=0;j<CS.itask_list_show_edit_window_map_a_konki_xy.length;j++){
							var y=CS.itask_list_show_edit_window_map_a_konki_xy[j][2];
							if(t2llist[i]+50>y && t2llist[i]-30<y && CS.itask_list_show_edit_window_map_a_konki_xy[j][9]==CS.aitask_image_edit_lkin){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki.push(CS.vueObj.itask_list_show_edit_window_map_a_konki[j]);
								insertflag=true;
								break;
							}
						}
						if(!insertflag){
							CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki.push("");
						}
					}
					//真中金額をマージする
					for(var i=0;i<t2mlist.length;i++){
						var insertflag=false;
						for(var j=0;j<CS.itask_list_show_edit_window_map_a_konki_xy.length;j++){
							var y=CS.itask_list_show_edit_window_map_a_konki_xy[j][2];
							if(t2mlist[i]+50>y && t2mlist[i]-30<y && CS.itask_list_show_edit_window_map_a_konki_xy[j][9]==CS.aitask_image_edit_mkin){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki.push(CS.vueObj.itask_list_show_edit_window_map_a_konki[j]);
								insertflag=true;
								break;
							}
						}
						if(!insertflag){
							CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki.push("");
						}
					}
					//右側金額をマージする
					for(var i=0;i<t2rlist.length;i++){
						var insertflag=false;
						for(var j=0;j<CS.itask_list_show_edit_window_map_a_konki_xy.length;j++){
							var y=CS.itask_list_show_edit_window_map_a_konki_xy[j][2];
							if(t2rlist[i]+50>y && t2rlist[i]-30<y && CS.itask_list_show_edit_window_map_a_konki_xy[j][9]==CS.aitask_image_edit_rkin){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki.push(CS.vueObj.itask_list_show_edit_window_map_a_konki[j]);
								insertflag=true;
								break;
							}
						}
						if(!insertflag){
							CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki.push("");
						}
					}
					//真中勘定科目をマージする
					for(var i=0;i<t2mlist.length;i++){
						if(i<8 || i>13){
							continue;
						}
						var insertflag=false;
						for(var j=0;j<CS.itask_list_show_edit_window_map_a_kanjyo_xy.length;j++){
							var y=CS.itask_list_show_edit_window_map_a_kanjyo_xy[j][2];
							if(t2mlist[i]+50>y && t2mlist[i]-30<y && CS.itask_list_show_edit_window_map_a_kanjyo_xy[j][9]==CS.aitask_image_edit_mkam){
								var str=CS.itask_list_show_edit_window_map_a_kanjyo_tmp[j];
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo[16+i]=str;
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[16+i]=CS.itask_list_show_edit_window_map_do_find(str,"IN2,7,4,10");
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[16+i]=0;
								insertflag=true;
								break;
							}
						}
					}
					//右勘定科目をマージする
					for(var i=0;i<t2rlist.length;i++){
						if(i==0 || (i>=3&&i<=5) || i>=8){
							continue;
						}
						var insertflag=false;
						for(var j=0;j<CS.itask_list_show_edit_window_map_a_kanjyo_xy.length;j++){
							var y=CS.itask_list_show_edit_window_map_a_kanjyo_xy[j][2];
							if(t2rlist[i]+50>y && t2rlist[i]-30<y && CS.itask_list_show_edit_window_map_a_kanjyo_xy[j][9]==CS.aitask_image_edit_rkam){
								var str=CS.itask_list_show_edit_window_map_a_kanjyo_tmp[j];
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo[33+i]=str;
								if(i>=1 && i<=2){
									CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[33+i]=CS.itask_list_show_edit_window_map_do_find(str,"IN6,9");
								}else if(i>=6 && i<=7){
									CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[33+i]=CS.itask_list_show_edit_window_map_do_find(str,"IN7,10");
								}else{
									CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[33+i]=CS.itask_list_show_edit_window_map_do_find(str,null);
								}
								
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[33+i]=0;
								insertflag=true;
								break;
							}
						}
					}
				}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
					//左側金額をマージする
					for(var i=0;i<t2llist.length;i++){
						var insertflag=false;
						for(var j=0;j<CS.itask_list_show_edit_window_map_a_konki_xy.length;j++){
							var y=CS.itask_list_show_edit_window_map_a_konki_xy[j][2];
							if(CS.itask_list_show_edit_window_map_a_konki_xy[j][9]==CS.aitask_image_edit_lkin){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki.push(CS.vueObj.itask_list_show_edit_window_map_a_konki[j]);
								insertflag=true;
								break;
							}
						}
						if(!insertflag){
							CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki.push("");
						}
					}
				}

				//素材金額を準備する
				CS.vueObj.itask_list_show_edit_window_map_a_konki_copy=[];
				CS.vueObj.itask_list_show_edit_window_map_a_zenki_copy=[];
				for(var i=0;i<CS.vueObj.itask_list_show_edit_window_map_a_konki.length;i++){
					CS.vueObj.itask_list_show_edit_window_map_a_konki_copy.push(CS.vueObj.itask_list_show_edit_window_map_a_konki[i]);
				};
			}else{
				///////////////////////////////
				//法人//////////////////////////
				///////////////////////////////
				CS.excodelist=data["excodelist"];//勘定科目
				CS.itask_list_show_edit_window_map_kanjyo_list_base=[];//勘定科目
				CS.itask_list_show_edit_window_map_konki_list_base=[];//今期
				CS.itask_list_show_edit_window_map_zenki_list_base=[];//前期
				
				
				CS.vueObj.itask_list_show_edit_window_map_a_kanjyo=[];
				CS.vueObj.itask_list_show_edit_window_map_a_konki=[];
				CS.vueObj.itask_list_show_edit_window_map_a_zenki=[];
				CS.itask_list_show_edit_window_map_a_kanjyo_xy=[];
				CS.itask_list_show_edit_window_map_a_zenki_xy=[];
				CS.itask_list_show_edit_window_map_a_konki_xy=[];
				//2列パターンを対応するため、各文字の座標をメモする
				CS.itask_list_show_edit_window_map_a_kanjyo_xyl=[];
				CS.itask_list_show_edit_window_map_a_zenki_xyl=[];
				CS.itask_list_show_edit_window_map_a_konki_xyl=[];
				
				var kanjyo_map={};
				var zenki_map={};
				var konki_map={};
				var list_xy=[];
				for(var i=0;i<CS.itask_list_show_edit_window_map_add_list_xy.length;i++){
					var tmpobj={};
					tmpobj["i"]=i;
					tmpobj["w"]=CS.itask_list_show_edit_window_map_add_list_xy[i].w;
					tmpobj["x"]=CS.itask_list_show_edit_window_map_add_list_xy[i].x;
					tmpobj["color"]=CS.itask_list_show_edit_window_map_add_list_xy[i].color;
					tmpobj["imgs_index"]=CS.itask_list_show_edit_window_map_add_list_xy[i].imgs_index;
					list_xy.push(tmpobj);
				}
				list_xy.sort(function(a, b) {
					if (a.imgs_index === b.imgs_index) {
						return a.x - b.x; // imgs_index が同じ場合は x で昇順ソート
					}
					return a.imgs_index - b.imgs_index; // imgs_index で昇順ソート
				});
				
				var grp_no=0;
				var grp_no_map={};
				for(var i=0;i<list_xy.length;i++){
					if(list_xy[i].color=="red"){
						if(list_xy[i].w>10 && i>0 && (list_xy[i-1].color!="red" || list_xy[i-1].imgs_index!=list_xy[i].imgs_index)){
							grp_no++;
						}
					}
					grp_no_map[i]=grp_no;
				}
				for(var i=0;i<CS.itask_list_show_edit_window_map_add_list_xy.length;i++){
					CS.itask_list_show_edit_window_map_add_list_xy[i].grp_no=grp_no_map[i];
				}
				var list_xy_map={};
				//コードをサーバから取得(xxxxxx_base)
				for(var i = 0;i < page_codes.length;i++){
					for(var j = 0;j < page_codes[i].length;j++){
						for(var t=0;t<CS.itask_list_show_edit_window_map_add_list_xy.length;t++){
							var tmpt=CS.itask_list_show_edit_window_map_add_list_xy[t];
							if(tmpt.x*hihituw <= page_codes[i][j][1] && tmpt.y*hihituh <= page_codes[i][j][2] && tmpt.x*hihituw+tmpt.w*hihituw >= page_codes[i][j][3] && tmpt.y*hihituh+tmpt.h*hihituh >= page_codes[i][j][4] ){
							}else{
								continue;
							}
							if(i!=t){
								continue;
							}
							var wranlist=["[","]","(",")","【","】","（","）","<",">","＜","＞"];
							if(wranlist.includes(page_codes[i][j][0])){
								continue;
							}
							page_codes[i][j][7]=t;
							page_codes[i][j][6]=tmpt["imgs_index"];
							page_codes[i][j][8]=tmpt["grp_no"];
							if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]=="red"){
								CS.itask_list_show_edit_window_map_kanjyo_list_base.push(page_codes[i][j]);
							}else if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]=="blue"){
								CS.itask_list_show_edit_window_map_konki_list_base.push(page_codes[i][j]);
							}else if(CS.itask_list_show_edit_window_map_add_list_xy[t]["color"]=="yellow"){
								CS.itask_list_show_edit_window_map_zenki_list_base.push(page_codes[i][j]);
							}
						}
					}
				}
				//各「base」から、同じy座標のやつを１行にする　勘定科目
				for(var i=0;i<CS.itask_list_show_edit_window_map_kanjyo_list_base.length;i++){
					var thiskey=0;
					for(let key in kanjyo_map) {
						key=CS.toI(key.split("_")[2]);
						if(CS.itask_list_show_edit_window_map_kanjyo_list_base[i][2]-10<key && CS.itask_list_show_edit_window_map_kanjyo_list_base[i][2]+10>key){
							thiskey=key;
						}
					}
					if(thiskey==0){
						thiskey=CS.itask_list_show_edit_window_map_kanjyo_list_base[i][2];
					}
					CS.itask_list_show_edit_window_map_kanjyo_list_base[i][5]=thiskey;
					var pageindex=CS.itask_list_show_edit_window_map_kanjyo_list_base[i][6];
					var xyt=CS.itask_list_show_edit_window_map_kanjyo_list_base[i][7];
					if(typeof kanjyo_map[pageindex+"_"+xyt+"_"+thiskey] == "undefined"){
						kanjyo_map[pageindex+"_"+xyt+"_"+thiskey]=[];
					}
					kanjyo_map[pageindex+"_"+xyt+"_"+thiskey].push(CS.itask_list_show_edit_window_map_kanjyo_list_base[i]);
				}
				//各「base」から、同じy座標　今期
				for(var i=0;i<CS.itask_list_show_edit_window_map_konki_list_base.length;i++){
					var thiskey=0;
					for(let key in konki_map) {
						key=CS.toI(key.split("_")[2]);
						if(CS.itask_list_show_edit_window_map_konki_list_base[i][2]-10<key && CS.itask_list_show_edit_window_map_konki_list_base[i][2]+10>key){
							thiskey=key;
						}
					}
					if(thiskey==0){
						thiskey=CS.itask_list_show_edit_window_map_konki_list_base[i][2];
					}
					CS.itask_list_show_edit_window_map_konki_list_base[i][5]=thiskey;
					var pageindex=CS.itask_list_show_edit_window_map_konki_list_base[i][6];
					var xyt=CS.itask_list_show_edit_window_map_konki_list_base[i][7];
					if(typeof konki_map[pageindex+"_"+xyt+"_"+thiskey] == "undefined"){
						konki_map[pageindex+"_"+xyt+"_"+thiskey]=[];
					}
					konki_map[pageindex+"_"+xyt+"_"+thiskey].push(CS.itask_list_show_edit_window_map_konki_list_base[i]);
				}
				//各「base」から、同じy座標　前期
				for(var i=0;i<CS.itask_list_show_edit_window_map_zenki_list_base.length;i++){
					var thiskey=0;
					for(let key in zenki_map) {
						key=CS.toI(key.split("_")[2]);
						if(CS.itask_list_show_edit_window_map_zenki_list_base[i][2]-10<key && CS.itask_list_show_edit_window_map_zenki_list_base[i][2]+10>key){
							thiskey=key;
						}
					}
					if(thiskey==0){
						thiskey=CS.itask_list_show_edit_window_map_zenki_list_base[i][2];
					}
					
					CS.itask_list_show_edit_window_map_zenki_list_base[i][5]=thiskey;
					var pageindex=CS.itask_list_show_edit_window_map_zenki_list_base[i][6];
					var xyt=CS.itask_list_show_edit_window_map_zenki_list_base[i][7];
					if(typeof zenki_map[pageindex+"_"+xyt+"_"+thiskey] == "undefined"){
						zenki_map[pageindex+"_"+xyt+"_"+thiskey]=[];
					}
					zenki_map[pageindex+"_"+xyt+"_"+thiskey].push(CS.itask_list_show_edit_window_map_zenki_list_base[i]);
				}
				
				//各行の文字をくっ付けって、文字列にする　＆　各文字列の座標をメモする、後ほど、勘定科目と金額をマージする
				//勘定科目
				for(let key in kanjyo_map) {
					var tempobj=kanjyo_map[key];
					tempobj.sort(function(a,b){return(a[1] - b[1]);});
					var in_text="";
					var tmpchar="";
					var xy_list=[];
					for(var i=0;i<tempobj.length;i++){
						if(tmpchar==tempobj[i][0]){
							continue;
						}
						in_text=in_text+tempobj[i][0];
						xy_list.push(tempobj[i]);
						tmpchar=tempobj[i][0];
					}
					CS.itask_list_show_edit_window_map_a_kanjyo_xyl.push(xy_list);
					CS.itask_list_show_edit_window_map_a_kanjyo_xy.push(tempobj[0]);
					CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.push(in_text);
				}
				//今期
				for(let key in konki_map) {
					var tempobj=konki_map[key];
					tempobj.sort(function(a,b){return(a[1] - b[1]);});
					var in_text="";
					var tmpchar="";
					var xy_list=[];
					for(var i=0;i<tempobj.length;i++){
						if(tmpchar==tempobj[i][0]){
							//continue;
						}
						if(i>0){
							if(Math.abs(tempobj[i][1]-tempobj[i-1][1])<10){
								//continue;
							}
						}
						in_text=in_text+tempobj[i][0];
						xy_list.push(tempobj[i]);
						tmpchar=tempobj[i][0];
					}
					CS.itask_list_show_edit_window_map_a_konki_xyl.push(xy_list);
					CS.itask_list_show_edit_window_map_a_konki_xy.push(tempobj[0]);
					in_text=CS.itask_list_show_edit_window_map_do_clear_text(in_text);
					CS.vueObj.itask_list_show_edit_window_map_a_konki.push(in_text);
				}
				//前期
				for(let key in zenki_map) {
					var tempobj=zenki_map[key];
					tempobj.sort(function(a,b){return(a[1] - b[1]);});
					var in_text="";
					var tmpchar="";
					var xy_list=[];
					for(var i=0;i<tempobj.length;i++){
						if(tmpchar==tempobj[i][0]){
							//continue;
						}
						if(i>0){
							if(Math.abs(tempobj[i][1]-tempobj[i-1][1])<10){
								//continue;
							}
						}
						in_text=in_text+tempobj[i][0];
						xy_list.push(tempobj[i]);
						tmpchar=tempobj[i][0];
					}
					CS.itask_list_show_edit_window_map_a_zenki_xyl.push(xy_list);
					CS.itask_list_show_edit_window_map_a_zenki_xy.push(tempobj[0]);
					in_text=CS.itask_list_show_edit_window_map_do_clear_text(in_text);
					CS.vueObj.itask_list_show_edit_window_map_a_zenki.push(in_text);
				}
				//勘定科目選択リストを洗い出し
				CS.itask_list_show_edit_window_map_kanjo_view=data["m_kanjo_view_list"];
				console.log("kanjyo_view:"+CS.itask_list_show_edit_window_map_kanjo_view.length);
				for(var i=CS.itask_list_show_edit_window_map_kanjo_view.length-1;i>=0;i--){
					if(CS.excodelist.includes(CS.itask_list_show_edit_window_map_kanjo_view[i]["m_kanjo_code"])){
						CS.itask_list_show_edit_window_map_kanjo_view.splice( i, 1 );
						continue;
					}
					var order=CS.toI(CS.itask_list_show_edit_window_map_kanjo_view[i]["order_code"]);
					var family=CS.toI(CS.itask_list_show_edit_window_map_kanjo_view[i]["family_code"]);
					if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
						if(order==2 && family<40){
						}else{
							CS.itask_list_show_edit_window_map_kanjo_view.splice( i, 1 );
						}
					}
					if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
						if(order==2 && family>=40){
						}else{
							CS.itask_list_show_edit_window_map_kanjo_view.splice( i, 1 );
						}
					}
					if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
						if(order==1){
						}else{
							CS.itask_list_show_edit_window_map_kanjo_view.splice( i, 1 );
						}
					}
					if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==4){
						if(order==1 && family==4){
						}else{
							CS.itask_list_show_edit_window_map_kanjo_view.splice( i, 1 );
						}
					}
				}

				//金額と勘定科目をマージする
				CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list=[];
				CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki=[];
				CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_zenki=[];
				CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index=[];
				var koteisu=0;
				var tousi_sonota_sisan=0;//投資その他の資産
				var konki_xyl_copy=[];//今期のXY座標をメモする、この後、一行に2金額がある場合の対応に使う
				for(var i=0;i<CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.length;i++){
					konki_xyl_copy[i]=null;
					//Y座標で今期金額をマージする
					for(var j=0;j<CS.itask_list_show_edit_window_map_a_konki_xy.length;j++){
						if(CS.itask_list_show_edit_window_map_a_kanjyo_xy[i][2]+50>CS.itask_list_show_edit_window_map_a_konki_xy[j][2]){
							if(CS.itask_list_show_edit_window_map_a_kanjyo_xy[i][2]-50<CS.itask_list_show_edit_window_map_a_konki_xy[j][2]){
								if(CS.itask_list_show_edit_window_map_a_kanjyo_xy[i][6]==CS.itask_list_show_edit_window_map_a_konki_xy[j][6]){
									//ページが同じ
									if(CS.itask_list_show_edit_window_map_a_kanjyo_xy[i][8]==CS.itask_list_show_edit_window_map_a_konki_xy[j][8]){
										//グループが同じ
										CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki[i]=CS.vueObj.itask_list_show_edit_window_map_a_konki[j];
										konki_xyl_copy[i]=CS.itask_list_show_edit_window_map_a_konki_xyl[j];
										CS.itask_list_show_edit_window_map_a_kanjyo_xyl[i].push(CS.itask_list_show_edit_window_map_a_konki_xyl[j][CS.itask_list_show_edit_window_map_a_konki_xyl[j].length-1]);
									}

								}
							}
						}
					}
					if(typeof CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki[i]=="undefined"){
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki[i]="";
					}
					//Y座標で前期金額をマージする
					for(var j=0;j<CS.itask_list_show_edit_window_map_a_zenki_xy.length;j++){
						if(CS.itask_list_show_edit_window_map_a_kanjyo_xy[i][2]+50>CS.itask_list_show_edit_window_map_a_zenki_xy[j][2]){
							if(CS.itask_list_show_edit_window_map_a_kanjyo_xy[i][2]-50<CS.itask_list_show_edit_window_map_a_zenki_xy[j][2]){
								if(CS.itask_list_show_edit_window_map_a_kanjyo_xy[i][6]==CS.itask_list_show_edit_window_map_a_zenki_xy[j][6]){
									//ページが同じ
									if(CS.itask_list_show_edit_window_map_a_kanjyo_xy[i][8]==CS.itask_list_show_edit_window_map_a_zenki_xy[j][8]){
										//グループが同じ
										CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_zenki[i]=CS.vueObj.itask_list_show_edit_window_map_a_zenki[j];
										CS.itask_list_show_edit_window_map_a_kanjyo_xyl[i].push(CS.itask_list_show_edit_window_map_a_zenki_xyl[j][CS.itask_list_show_edit_window_map_a_zenki_xyl[j].length-1]);
									}
								}
							}
						}
					}
					if(typeof CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_zenki[i]=="undefined"){
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_zenki[i]="";
					}
					var str=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo[i];
					//固定資産が連続3回以上がある場合、その以後も固定資産にする
					if(koteisu>2 && CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.push(CS.itask_list_show_edit_window_map_do_find(str,"2_20"));
						
						if(tousi_sonota_sisan>0){
							if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length>0){
								if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][0]["m_kanjo_name"]=="資金"){
									CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][0]["m_kanjo_name"]="出資金";
								}
							}
							if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length>0 && ["出資金","リサイクル預託金","長期前払費用"].includes(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][0]["m_kanjo_name"])){
								var copyrelist=[];
								var relist = CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i];
								for(var o=0;o<relist.length;o++){
									if(relist[o]["m_kanjo_code"].substr(0,6)=="2_20_3"){
										copyrelist.push(relist[o]);
									}
								}
								for(var o=0;o<relist.length;o++){
									if(relist[o]["m_kanjo_code"].substr(0,6)=="2_20_3"){
									}else{
										copyrelist.push(relist[o]);
									}
								}
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=copyrelist;
							}
						}
						
					}else{
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.push(CS.itask_list_show_edit_window_map_do_find(str,"init"));
					}
					if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length>0){
						if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][0]["m_kanjo_name"]=="雑収入"){
							if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i-1].length>0 && CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i-1][0]["m_kanjo_code"].substr(0,6)=="1_6_0_"){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=CS.itask_list_show_edit_window_map_do_find(str,"1_6_0_9_1");
							}
						}
					}
					if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
						if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length>0 && CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][0]["family_code"]=="20"){
							koteisu++;
						}
					}
					//小分類（species_name）は投資その他の資産の場合その以後の要素の内の出資金、リサイクル預託金、長期前払費用を投資固定資産にする
					if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
						if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length>0 && CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][0]["m_kanjo_code"].substr(0,8)=="2_20_3_0"){
							tousi_sonota_sisan++;
						}
					}
					if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length>0){
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=0;
					}
					
				}
				
				CS.itask_list_show_edit_window_map_a_konki_xyl=konki_xyl_copy;
				CS.itask_list_show_edit_window_map_a_kanjyo_wakeflag=[];//分けるフラグ
				for(var i=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.length-1;i>=0;i--){
					//①まず、2列かどうか判定する。（文字の大きさの3文字以上離れていた場合を想定）
					var onefontsize=0;//1文字のサイズ
					var wakeindex=null;//文字を分ける位置（B列文字一番左側）
					if(CS.itask_list_show_edit_window_map_a_konki_xyl[i]==null){
						continue;
					}
					for(var j=0;j<CS.itask_list_show_edit_window_map_a_konki_xyl[i].length;j++){
						var xyl=CS.itask_list_show_edit_window_map_a_konki_xyl[i][j]
						if(j==0){
							onefontsize=xyl[3]-xyl[1];
						}else{
							var after_xyl=CS.itask_list_show_edit_window_map_a_konki_xyl[i][j-1];
							if(xyl[1]-after_xyl[1]>onefontsize*3){
								wakeindex=j;
							}
						}
					}
					CS.itask_list_show_edit_window_map_a_kanjyo_wakeflag[i]=false;
					//文字を分ける、座標を分ける
					if(wakeindex!=null){
						if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki[i].length>wakeindex){
							var nexttext=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki[i].substr(wakeindex);
							CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki[i]=CS.itask_list_show_edit_window_map_do_clear_text(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki[i].substr(0,wakeindex));
							CS.itask_list_show_edit_window_map_a_kanjyo_wakeflag[i]=true;
							var next_kanjyo_text="あああ";
							if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length!=0 && CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][0]["m_kanjo_code"].substr(0,6)=="1_1_0_"){
								next_kanjyo_text="売上高";
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.splice(i+1, 0, next_kanjyo_text);
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.splice(i+1, 0, CS.itask_list_show_edit_window_map_do_find(next_kanjyo_text,"1_1_0_0_0"));
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index.splice(i+1, 0, 0);
							}else if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length!=0 && CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][0]["m_kanjo_code"].substr(0,6)=="1_2_0_"){
								next_kanjyo_text="売上原価";
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.splice(i+1, 0, next_kanjyo_text);
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.splice(i+1, 0, CS.itask_list_show_edit_window_map_do_find(next_kanjyo_text,"1_2_0_0_0"));
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index.splice(i+1, 0, 0);
							}else if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length!=0 && typeof CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i+1]!="undefined" && CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i+1].length>0 && CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i+1][0]["m_kanjo_code"]=="1_3_0_0_0"){
								next_kanjyo_text="売上原価";
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.splice(i+1, 0, next_kanjyo_text);
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.splice(i+1, 0, CS.itask_list_show_edit_window_map_do_find(next_kanjyo_text,"1_2_0_0_0"));
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index.splice(i+1, 0, 0);
							}else if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length!=0 && CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][0]["m_kanjo_code"].substr(0,6)=="1_4_0_"){
								next_kanjyo_text="販売費及び一般管理費";
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.splice(i+1, 0, next_kanjyo_text);
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.splice(i+1, 0, CS.itask_list_show_edit_window_map_do_find(next_kanjyo_text,"1_4_0_0_0"));
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index.splice(i+1, 0, 0);
							}else if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length!=0 && CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][0]["m_kanjo_code"].substr(0,6)=="1_6_0_"){
								next_kanjyo_text="営業外収益";
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.splice(i+1, 0, next_kanjyo_text);
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.splice(i+1, 0, CS.itask_list_show_edit_window_map_do_find(next_kanjyo_text,"1_6_0_0_0"));
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index.splice(i+1, 0, 0);
							}else if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length!=0 && CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][0]["m_kanjo_code"].substr(0,6)=="1_7_0_"){
								next_kanjyo_text="営業外費用";
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.splice(i+1, 0, next_kanjyo_text);
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.splice(i+1, 0, CS.itask_list_show_edit_window_map_do_find(next_kanjyo_text,"1_7_0_0_0"));
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index.splice(i+1, 0, 0);
							}else if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length!=0 && CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][0]["m_kanjo_code"].substr(0,6)=="1_9_0_"){
								next_kanjyo_text="特別利益";
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.splice(i+1, 0, next_kanjyo_text);
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.splice(i+1, 0, CS.itask_list_show_edit_window_map_do_find(next_kanjyo_text,"1_9_0_0_0"));
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index.splice(i+1, 0, 0);
							}else if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length!=0 && CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][0]["m_kanjo_code"].substr(0,7)=="1_10_0_"){
								next_kanjyo_text="特別損失";
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.splice(i+1, 0, next_kanjyo_text);
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.splice(i+1, 0, CS.itask_list_show_edit_window_map_do_find(next_kanjyo_text,"1_10_0_0_0"));
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index.splice(i+1, 0, 0);
							}else{
								// CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.splice(i+1, 0, next_kanjyo_text);
								// CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.splice(i+1, 0, CS.itask_list_show_edit_window_map_do_find(next_kanjyo_text,null));
								// CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index.splice(i+1, 0, 0);
							}
							if(next_kanjyo_text!="あああ"){
								nexttext=CS.itask_list_show_edit_window_map_do_clear_text(nexttext);
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki.splice(i+1, 0, nexttext);
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_zenki.splice(i+1, 0, "");
								CS.itask_list_show_edit_window_map_a_konki_xyl.splice(i+1, 0, CS.itask_list_show_edit_window_map_a_konki_xyl[i]);
							}
							CS.itask_list_show_edit_window_map_a_kanjyo_wakeflag[i+1]=true;
						}
					}
				}
				for(var i=0;i<CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki.length;i++){
					if(typeof CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=="undefined" || CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]==null){
						CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=0;
					}
				}
				var have_2_10=false;
				var have_2_20=false;
				var have_2_30=false;
				var have_2_40=false;
				var have_2_50=false;
				var have_2_60=false;
				var have_2_70=false;
				var have_2_80=false;
				var have_2_90=false;
				var have_1_3=false;
				var have_1_4=false;
				var have_1_5=false;
				var have_1_6=false;
				var have_1_7=false;
				var have_1_8=false;
				var have_1_9=false;
				var have_1_10=false;
				if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
					for(var i=0;i<CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.length;i++){
						var this_code=null;
						var this_family_code=null;
						var this_order_code=null;
						if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length>0){
							var iii=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i];
							this_code=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][iii]["m_kanjo_code"];
							this_family_code=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][iii]["family_code"];
							this_order_code=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][iii]["order_code"];
							this_family_code=CS.toI(this_family_code);
							this_order_code=CS.toI(this_order_code);
						}
						if(this_order_code==2 && this_family_code==10){
							have_2_10=true;
						}
						if(this_order_code==2 && this_family_code==20){
							have_2_20=true;
						}
						if(this_order_code==2 && this_family_code==30){
							have_2_20=true;
						}
						if(have_2_30){
							if(this_family_code<30){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=CS.itask_list_show_edit_window_map_do_find(str,">30");
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=0;
							}
						}else if(have_2_20){
							if(this_family_code<20){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=CS.itask_list_show_edit_window_map_do_find(str,"2_20");
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=0;
							}
						}
					}
				}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
					for(var i=0;i<CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.length;i++){
						var this_code=null;
						var this_family_code=null;
						var this_order_code=null;
						if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length>0){
							var iii=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i];
							this_code=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][iii]["m_kanjo_code"];
							this_family_code=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][iii]["family_code"];
							this_order_code=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][iii]["order_code"];
							this_family_code=CS.toI(this_family_code);
							this_order_code=CS.toI(this_order_code);
						}
						if(this_order_code==2 && this_family_code==40){
							have_2_40=true;
						}
						if(this_order_code==2 && this_family_code==50){
							have_2_50=true;
						}
						if(this_order_code==2 && this_family_code==60){
							have_2_60=true;
						}
						if(this_order_code==2 && this_family_code==70){
							have_2_70=true;
						}
						if(this_order_code==2 && this_family_code==80){
							have_2_80=true;
						}
						if(this_order_code==2 && this_family_code==90){
							have_2_90=true;
						}
						if(have_2_90){
							if(this_family_code<90){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=CS.itask_list_show_edit_window_map_do_find(str,">90");
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=0;
							}
						}else if(have_2_80){
							if(this_family_code<80){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=CS.itask_list_show_edit_window_map_do_find(str,">80");
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=0;
							}
						}else if(have_2_70){
							if(this_family_code<70){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=CS.itask_list_show_edit_window_map_do_find(str,">70");
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=0;
							}
						}else if(have_2_50){
							if(this_family_code<50){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=CS.itask_list_show_edit_window_map_do_find(str,">50");
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=0;
							}
						}else if(have_2_40){
							if(this_family_code<40){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=CS.itask_list_show_edit_window_map_do_find(str,">40");
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=0;
							}
						}
					}
				}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
					for(var i=0;i<CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.length;i++){
						var this_code=null;
						var this_family_code=null;
						var this_order_code=null;
						if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i].length>0){
							var iii=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i];
							this_code=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][iii]["m_kanjo_code"];
							this_family_code=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][iii]["family_code"];
							this_order_code=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i][iii]["order_code"];
							this_family_code=CS.toI(this_family_code);
							this_order_code=CS.toI(this_order_code);
						}
						if(this_order_code==1 && this_family_code==3){
							have_1_3=true;
						}
						if(this_order_code==1 && this_family_code==4){
							have_1_4=true;
						}
						if(this_order_code==1 && this_family_code==5){
							have_1_5=true;
						}
						if(this_order_code==1 && this_family_code==6){
							have_1_6=true;
						}
						if(this_order_code==1 && this_family_code==7){
							have_1_7=true;
						}
						if(this_order_code==1 && this_family_code==8){
							have_1_8=true;
						}
						if(this_order_code==1 && this_family_code==9){
							have_1_9=true;
						}
						if(this_order_code==1 && this_family_code==10){
							have_1_10=true;
						}
						if(have_1_10){
							if(this_family_code<10){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=CS.itask_list_show_edit_window_map_do_find(str,">10");
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=0;
							}
						}else if(have_1_9){
							if(this_family_code<9){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=CS.itask_list_show_edit_window_map_do_find(str,">9");
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=0;
							}
						}else if(have_1_8){
							if(this_family_code<8){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=CS.itask_list_show_edit_window_map_do_find(str,">8");
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=0;
							}
						}else if(have_1_7){
							if(this_family_code<7){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=CS.itask_list_show_edit_window_map_do_find(str,">7");
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=0;
							}
						}else if(have_1_6){
							if(this_family_code<6){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=CS.itask_list_show_edit_window_map_do_find(str,">6");
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=0;
							}
						}else if(have_1_5){
							if(this_family_code<5){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=CS.itask_list_show_edit_window_map_do_find(str,">5");
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=0;
							}
						}else if(have_1_4){
							if(this_family_code<4){
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list[i]=CS.itask_list_show_edit_window_map_do_find(str,">4");
								CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index[i]=0;
							}
						}
					}
				}

				//素材金額を準備する
				CS.vueObj.itask_list_show_edit_window_map_a_konki_copy=[];
				CS.vueObj.itask_list_show_edit_window_map_a_zenki_copy=[];
				for(var i=0;i<CS.vueObj.itask_list_show_edit_window_map_a_konki.length;i++){
					CS.vueObj.itask_list_show_edit_window_map_a_konki_copy.push(CS.vueObj.itask_list_show_edit_window_map_a_konki[i]);
				};
				for(var i=0;i<CS.vueObj.itask_list_show_edit_window_map_a_zenki.length;i++){
					CS.vueObj.itask_list_show_edit_window_map_a_zenki_copy.push(CS.vueObj.itask_list_show_edit_window_map_a_zenki[i]);
				};
			}
			if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("houjin")!=-1){
				for(var i=CS.itask_list_show_edit_window_map_kanjo_view.length-1;i>=0;i--){
					var order=CS.toI(CS.itask_list_show_edit_window_map_kanjo_view[i]["order_code"]);
					var family=CS.toI(CS.itask_list_show_edit_window_map_kanjo_view[i]["family_code"]);
					if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
						if(order==2 && family<40){
						}else{
							CS.itask_list_show_edit_window_map_kanjo_view.splice( i, 1 );
						}
					}
					if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
						if(order==2 && family>=40){
						}else{
							CS.itask_list_show_edit_window_map_kanjo_view.splice( i, 1 );
						}
					}
					if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==3){
						if(order==1){
						}else{
							CS.itask_list_show_edit_window_map_kanjo_view.splice( i, 1 );
						}
					}
					if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==4){
						if(order==1 && family==4){
						}else{
							CS.itask_list_show_edit_window_map_kanjo_view.splice( i, 1 );
						}
					}
				}
			}

			CS.vueObj.itask_list_show_edit_window_map_a_movetarget_index=null;
			CS.vueObj.itask_list_show_edit_window_map_step="D";
			CS.vueObj.itaskloadnig="";
			CS.vueObj.aitask_common_pop_ac=false;
			CS.itask_list_show_edit_window_map_do_find_init=null;
			CS.itask_list_show_edit_window_ana2_flag=false;
		}
		
	});
}
CS.itask_list_show_edit_window_map_do_clear_text=function(str){
	if(typeof str=="undefined" || str==null || str==""){
		return "";
	}
	str=str+"";
	// 全角数字と半角数字以外を削除
	var cleaned = str.replace(/[^\d０-９]/g, '');
	// 全角数字を半角数字に変換
	var converted = cleaned.replace(/[０-９]/g, function(s) {
		return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
	});
	converted=CS.toI(converted).toLocaleString();
	return converted;
}
CS.itask_list_show_edit_window_map_a_addup=function(index){
	if(index!=0){
		//index--;
	}
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_zenki.splice(index, 0, "");
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki.splice(index, 0, "");
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.splice(index, 0, "");
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.splice(index, 0, CS.itask_list_show_edit_window_map_do_find("",null));
	CS.itask_list_show_edit_window_map_a_kanjyo_xy.splice(index, 0, [["",0,0,0,0,0,-1]]);
	CS.itask_list_show_edit_window_map_a_kanjyo_xyl.splice(index, 0, [["",0,0,0,0,0,-1]]);
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index.splice(index, 0, "");
}
CS.itask_list_show_edit_window_map_a_adddown=function(index){
	if(index<CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.length){
		index++;
	}
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_zenki.splice(index, 0, "");
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki.splice(index, 0, "");
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.splice(index, 0, "");
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.splice(index, 0, CS.itask_list_show_edit_window_map_do_find("",null));
	CS.itask_list_show_edit_window_map_a_kanjyo_xy.splice(index, 0, [["",0,0,0,0,0,-1]]);
	CS.itask_list_show_edit_window_map_a_kanjyo_xyl.splice(index, 0, [["",0,0,0,0,0,-1]]);
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index.splice(index, 0, "");
}
CS.itask_list_show_edit_window_map_a_delete=function(index){
	if(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo==1){
		alert("最低限1行が必要です");
		return;
	}
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_zenki.splice(index, 1);
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki.splice(index, 1);
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo.splice(index, 1);
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list.splice(index, 1);
	CS.itask_list_show_edit_window_map_a_kanjyo_xy.splice(index, 1);
	CS.itask_list_show_edit_window_map_a_kanjyo_xyl.splice(index, 1);
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index.splice(index, 1);
}
CS.itask_list_show_edit_window_map_a_gettarget=function(index){
	CS.vueObj.itask_list_show_edit_window_map_a_movetarget_index=index;
}
CS.itask_list_show_edit_window_map_a_settarget=function(index,updw){
	fromIndex=CS.vueObj.itask_list_show_edit_window_map_a_movetarget_index;
	toIndex=index;
	
	if(fromIndex>toIndex && updw=="dw"){
		toIndex=index+1;
	}
	
	if(fromIndex<toIndex && updw=="up"){
		toIndex=index-1;
	}
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_zenki=CS.itask_list_show_edit_window_map_a_moveElement(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_zenki, fromIndex, toIndex);
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki=CS.itask_list_show_edit_window_map_a_moveElement(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki, fromIndex, toIndex);
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo=CS.itask_list_show_edit_window_map_a_moveElement(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo, fromIndex, toIndex);
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list=CS.itask_list_show_edit_window_map_a_moveElement(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list, fromIndex, toIndex);
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index=CS.itask_list_show_edit_window_map_a_moveElement(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_index, fromIndex, toIndex);
	CS.vueObj.itask_list_show_edit_window_map_a_movetarget_index=null;
}
CS.itask_list_show_edit_window_map_a_moveElement=function(array, fromIndex, toIndex) {
  // 配列の境界をチェック
  if (fromIndex < 0 || fromIndex >= array.length || toIndex < 0 || toIndex >= array.length) {
    return array;
  }

  // 指定されたインデックスから要素を取り出す
  const element = array.splice(fromIndex, 1)[0];
  
  // 取り出した要素を新しい位置に挿入する
  array.splice(toIndex, 0, element);
  
  return array;
}

CS.levenshteinDistance=function(a, b) {
    const matrix = [];

    // 初期化
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // 行列を埋める
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b[i - 1] === a[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,  // 置換
                    matrix[i][j - 1] + 1,      // 挿入
                    matrix[i - 1][j] + 1       // 削除
                );
            }
        }
    }

    return matrix[b.length][a.length];
}
CS.itask_list_show_edit_window_map_do_find=function(str,param){
	var relist=[];
	for(var i=0;i<CS.itask_list_show_edit_window_map_kanjo_view.length;i++){
		if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("houjin")!=-1 && CS.itask_list_show_edit_window_map_do_find_init=="init" && CS.excodelist.includes(CS.itask_list_show_edit_window_map_kanjo_view[i]["m_kanjo_code"])){
			continue;
		}
		if(str==""){
			relist.push(CS.itask_list_show_edit_window_map_kanjo_view[i]);
			continue;
		}
		var arr = Array.from(str);
		var okm=0;
		for(var j=0;j<arr.length;j++){
			if(CS.itask_list_show_edit_window_map_kanjo_view[i]["m_kanjo_name"].indexOf(arr[j])!=-1){
				okm++;
			}
		}
		var addflag=false;
		if(arr.length==1){
			if(okm>0){
				addflag=true;
			}
		}else if(arr.length==2){
			if(okm==2){
				addflag=true;
			}
		}else if(arr.length>2){
			if(okm/arr.length>0.6){
				addflag=true;
			}
		}
		var arrn = CS.itask_list_show_edit_window_map_kanjo_view[i]["m_kanjo_name"];
		var okm=CS.levenshteinDistance(str,arrn);
		CS.itask_list_show_edit_window_map_kanjo_view[i]["okm"]=okm;
		if(addflag){
			relist.push(CS.itask_list_show_edit_window_map_kanjo_view[i]);
		}
	}
	relist.sort(function(a,b){return( a["okm"] - b["okm"] );});
	var copyrelist=[];
	
	if(param!=null && param=="2_20"){
		for(var i=0;i<relist.length;i++){
			if(CS.toI(relist[i]["family_code"])>=20){
				copyrelist.push(relist[i]);
			}
		}
		for(var i=0;i<relist.length;i++){
			if(CS.toI(relist[i]["family_code"])>=20){
			}else{
				copyrelist.push(relist[i]);
			}
		}
		relist=copyrelist;
		copyrelist=[];
	}

	for(var i=0;i<relist.length;i++){
		if(str==relist[i]["m_kanjo_name"]){
			copyrelist.push(relist[i]);
		}
	}
	for(var i=0;i<relist.length;i++){
		if(str==relist[i]["m_kanjo_name"]){
		}else{
			copyrelist.push(relist[i]);
		}
	}
	if(param!=null && param.split("IN").length>1){
		var invlist=param.split("IN")[1];
		invlist=invlist.split(",");
		for(var i=0;i<relist.length;i++){
			if(relist[i]["family_code"] in invlist){
				copyrelist.push(relist[i]);
			}
		}
		for(var i=0;i<relist.length;i++){
			if(relist[i]["family_code"] in invlist){
				copyrelist.push(relist[i]);
			}else{
				copyrelist.push(relist[i]);
			}
		}
		relist=copyrelist;
		copyrelist=[];
		for(var i=0;i<relist.length;i++){
			if(str==relist[i]["m_kanjo_name"]){
				copyrelist.push(relist[i]);
			}
		}
		for(var i=0;i<relist.length;i++){
			if(str==relist[i]["m_kanjo_name"]){
			}else{
				copyrelist.push(relist[i]);
			}
		}
	}
	if(param!=null && param.split(">").length>1){
		for(var i=0;i<relist.length;i++){
			if(CS.toI(relist[i]["family_code"])>=CS.toI(param.split(">")[1])){
				copyrelist.push(relist[i]);
			}
		}
		for(var i=0;i<relist.length;i++){
			if(CS.toI(relist[i]["family_code"])>=CS.toI(param.split(">")[1])){
			}else{
				copyrelist.push(relist[i]);
			}
		}
		relist=copyrelist;
		copyrelist=[];
		for(var i=0;i<relist.length;i++){
			if(str==relist[i]["m_kanjo_name"]){
				copyrelist.push(relist[i]);
			}
		}
		for(var i=0;i<relist.length;i++){
			if(str==relist[i]["m_kanjo_name"]){
			}else{
				copyrelist.push(relist[i]);
			}
		}
	}
	if(param!=null && param.split("=").length>1){
		for(var i=0;i<relist.length;i++){
			if(relist[i]["m_kanjo_code"]==CS.toI(param.split("=")[1])){
				copyrelist.push(relist[i]);
			}
		}
		for(var i=0;i<relist.length;i++){
			if(relist[i]["m_kanjo_code"]==CS.toI(param.split("=")[1])){
			}else{
				copyrelist.push(relist[i]);
			}
		}
		relist=copyrelist;
		copyrelist=[];
		for(var i=0;i<relist.length;i++){
			if(str==relist[i]["m_kanjo_name"]){
				copyrelist.push(relist[i]);
			}
		}
		for(var i=0;i<relist.length;i++){
			if(str==relist[i]["m_kanjo_name"]){
			}else{
				copyrelist.push(relist[i]);
			}
		}
	}
	if(param!=null && param!="2_20"){
		relist=copyrelist;
		copyrelist=[];
		for(var i=0;i<relist.length;i++){
			if(relist[i]["m_kanjo_code"]==param){
				copyrelist.push(relist[i]);
			}
		}
		for(var i=0;i<relist.length;i++){
			if(relist[i]["m_kanjo_code"]==param){
			}else{
				copyrelist.push(relist[i]);
			}
		}
	}
	
	return copyrelist;
}
CS.itask_list_show_edit_window_map_a_kanjyo_keyword_change=function(index,item111){
	CS.vueObj.itask_list_show_edit_window_map_a_kanjyo[index]=item111;
	var inval=CS.itask_list_show_edit_window_map_do_find(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo[index]);
	CS.vueObj.$set(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo, index, item111);
	CS.vueObj.$set(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list, index, inval);
}
CS.itask_list_show_edit_window_map_KVN_onlyback=function(initflag){
	CS.itask_list_show_edit_window_map_KVN_stage.destroyChildren();
	CS.itask_list_show_edit_window_map_KVN_stage = new Konva.Stage({
		container: 'itask_list_show_edit_window_canvas_div',
		width: CS.itask_list_show_edit_window_map_KVN_width,
		height: CS.itask_list_show_edit_window_map_KVN_height,
		id: "itask_list_show_edit_window_map_KVN_sample",
	});
	
	//背景画像をセットする
	CS.itask_list_show_edit_window_map_KVN_layer0 = new Konva.Layer();
	//背景画像
	CS.itask_list_show_edit_window_map_KVN_hk_img = new Konva.Image({
	  x: 0,
	  y: 0,
	  image: CS.itask_list_show_edit_window_canvas_tmp_img,
	  width: CS.itask_list_show_edit_window_map_KVN_width,
	  height: CS.itask_list_show_edit_window_map_KVN_height,
	});

	// add the shape to the layer
	CS.itask_list_show_edit_window_map_KVN_layer0.add(CS.itask_list_show_edit_window_map_KVN_hk_img);
	CS.itask_list_show_edit_window_map_KVN_stage.add(CS.itask_list_show_edit_window_map_KVN_layer0);
	CS.itask_list_show_edit_window_map_KVN_layer1 = new Konva.Layer();
	CS.itask_list_show_edit_window_map_KVN_stage.add(CS.itask_list_show_edit_window_map_KVN_layer1);
	if(initflag){
		if(typeof CS.itask_list_show_edit_window_map_add_list=="undefined"){
			CS.itask_list_show_edit_window_map_add_list=[];
		}else{
			CS.itask_list_show_edit_window_map_add_list.splice(0);
		}
	}

	
	CS.menuNode = document.getElementById('menu');
	document.getElementById('delete-button').addEventListener('click', () => {
		CS.deltarget.destroy();
		if(CS.deltarget.getId().split("edit_window_map_rect").length>1){
			var delname="edit_window_map_rect_transfor"+CS.deltarget.getId().split("edit_window_map_rect")[1];
			CS.itask_list_show_edit_window_map_added_list[delname].destroy();
		}
		if(CS.deltarget.getId().split("edit_window_map_rect_transfor").length>1){
			var delname="edit_window_map_rect"+CS.deltarget.getId().split("edit_window_map_rect_transfor")[1];
			CS.itask_list_show_edit_window_map_added_list[delname].destroy();
		}
		if(CS.deltarget.getId().split("_").length>1){
			var ai=parseInt(CS.deltarget.getId().split("_")[CS.deltarget.getId().split("_").length-1],10);
			CS.itask_list_show_edit_window_map_add_list_xy[ai].x=0;
			CS.itask_list_show_edit_window_map_add_list_xy[ai].y=0;
			CS.itask_list_show_edit_window_map_add_list_xy[ai].w=0;
			CS.itask_list_show_edit_window_map_add_list_xy[ai].h=0;
			//CS.itask_list_show_edit_window_map_add_list_xy.splice(ai, 1);
		}
	});
	window.addEventListener('click', () => {
		// hide menu
		CS.menuNode.style.display = 'none';
	});
	
	CS.itask_list_show_edit_window_map_KVN_stage.on('contextmenu', function (e) {
		// prevent default behavior
		e.evt.preventDefault();
		if(typeof e.target.attrs.id=="undefined" || e.target.attrs.id==null){
			return;
		}
		if (e.target === CS.itask_list_show_edit_window_map_KVN_stage) {
		  // if we are on empty place of the stage we will do nothing
		  return;
		}
		if(CS.vueObj.itask_list_show_edit_window_map_brightness_flag=='A' || CS.vueObj.itask_list_show_edit_window_map_brightness_flag=='C'){
			return;
		}
		CS.deltarget = e.target;
		// show menu
		CS.menuNode.style.display = 'initial';
		var containerRect = CS.itask_list_show_edit_window_map_KVN_stage.container().getBoundingClientRect();
		CS.menuNode.style.top = containerRect.top + CS.itask_list_show_edit_window_map_KVN_stage.getPointerPosition().y + 4 + 'px';
		CS.menuNode.style.left = containerRect.left + CS.itask_list_show_edit_window_map_KVN_stage.getPointerPosition().x + 4 + 'px';
	});
}
CS.itask_list_show_edit_window_map_KVN_sample=function(initflag){
		CS.itask_list_show_edit_window_map_KVN_stage = new Konva.Stage({
			container: 'itask_list_show_edit_window_canvas_div',
			width: CS.itask_list_show_edit_window_map_KVN_width,
			height: CS.itask_list_show_edit_window_map_KVN_height,
			id: "itask_list_show_edit_window_map_KVN_sample",
		});
		
		//背景画像をセットする
		CS.itask_list_show_edit_window_map_KVN_layer0 = new Konva.Layer();
		//背景画像
		CS.itask_list_show_edit_window_map_KVN_hk_img = new Konva.Image({
          x: 0,
          y: 0,
          image: CS.itask_list_show_edit_window_canvas_tmp_img,
          width: CS.itask_list_show_edit_window_map_KVN_width,
          height: CS.itask_list_show_edit_window_map_KVN_height,
        });

        // add the shape to the layer
        CS.itask_list_show_edit_window_map_KVN_layer0.add(CS.itask_list_show_edit_window_map_KVN_hk_img);
		CS.itask_list_show_edit_window_map_KVN_stage.add(CS.itask_list_show_edit_window_map_KVN_layer0);
		
		
		
		CS.itask_list_show_edit_window_map_KVN_layer1 = new Konva.Layer();
		CS.itask_list_show_edit_window_map_KVN_stage.add(CS.itask_list_show_edit_window_map_KVN_layer1);
		if(initflag){
			if(typeof CS.itask_list_show_edit_window_map_add_list=="undefined"){
				CS.itask_list_show_edit_window_map_add_list=[];
			}else{
				CS.itask_list_show_edit_window_map_add_list.splice(0);
			}
		}

		
		CS.menuNode = document.getElementById('menu');
		document.getElementById('delete-button').addEventListener('click', () => {
			CS.deltarget.destroy();
			if(CS.deltarget.getId().split("edit_window_map_rect").length>1){
				var delname="edit_window_map_rect_transfor"+CS.deltarget.getId().split("edit_window_map_rect")[1];
				CS.itask_list_show_edit_window_map_added_list[delname].destroy();
			}
			if(CS.deltarget.getId().split("edit_window_map_rect_transfor").length>1){
				var delname="edit_window_map_rect"+CS.deltarget.getId().split("edit_window_map_rect_transfor")[1];
				CS.itask_list_show_edit_window_map_added_list[delname].destroy();
			}
			if(CS.deltarget.getId().split("_").length>1){
				var ai=parseInt(CS.deltarget.getId().split("_")[CS.deltarget.getId().split("_").length-1],10);
				CS.itask_list_show_edit_window_map_add_list_xy[ai].x=0;
				CS.itask_list_show_edit_window_map_add_list_xy[ai].y=0;
				CS.itask_list_show_edit_window_map_add_list_xy[ai].w=0;
				CS.itask_list_show_edit_window_map_add_list_xy[ai].h=0;
				//CS.itask_list_show_edit_window_map_add_list_xy.splice(ai, 1);
			}
		});
		window.addEventListener('click', () => {
			// hide menu
			CS.menuNode.style.display = 'none';
		});
		
		CS.itask_list_show_edit_window_map_KVN_stage.on('contextmenu', function (e) {
			// prevent default behavior
			e.evt.preventDefault();
			if(typeof e.target.attrs.id=="undefined" || e.target.attrs.id==null){
				return;
			}
			if (e.target === CS.itask_list_show_edit_window_map_KVN_stage) {
			  // if we are on empty place of the stage we will do nothing
			  return;
			}
			if(CS.vueObj.itask_list_show_edit_window_map_brightness_flag=='A' || CS.vueObj.itask_list_show_edit_window_map_brightness_flag=='C'){
				return;
			}
			CS.deltarget = e.target;
			// show menu
			CS.menuNode.style.display = 'initial';
			var containerRect = CS.itask_list_show_edit_window_map_KVN_stage.container().getBoundingClientRect();
			CS.menuNode.style.top = containerRect.top + CS.itask_list_show_edit_window_map_KVN_stage.getPointerPosition().y + 4 + 'px';
			CS.menuNode.style.left = containerRect.left + CS.itask_list_show_edit_window_map_KVN_stage.getPointerPosition().x + 4 + 'px';
		});
		
		
		
		
		



}
//四角を復元する
CS.itask_list_show_edit_window_map_restoration=function(){
	for(var i=0;i<CS.itask_list_show_edit_window_map_add_list_xy.length;i++){
		if(typeof CS.itask_list_show_edit_window_map_added_list["edit_window_map_rect"+"_"+CS.vueObj.itask_list_show_file_list_now_imgs_index+"_"+i] != "undefined"){
			var x=CS.itask_list_show_edit_window_map_add_list_xy[i].x;
			var y=CS.itask_list_show_edit_window_map_add_list_xy[i].y;
			var w=CS.itask_list_show_edit_window_map_add_list_xy[i].w;
			var h=CS.itask_list_show_edit_window_map_add_list_xy[i].h;
			var color=CS.itask_list_show_edit_window_map_add_list_xy[i].color;
			CS.itask_list_show_edit_window_map_add_rect_xy(x,y,w,h,i,color);
		}
	}
}
CS.itask_list_show_edit_window_map_add_rect_xy=function(inx,iny,inw,inh,listindex,color){
      // define several math function
      function getCorner(pivotX, pivotY, diffX, diffY, angle) {
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);

        /// find angle from pivot to corner
        angle += Math.atan2(diffY, diffX);

        /// get new x and y and round it off to integer
        const x = pivotX + distance * Math.cos(angle);
        const y = pivotY + distance * Math.sin(angle);

        return { x: x, y: y };
      }
      function getClientRect(rotatedBox) {
        const { x, y, width, height } = rotatedBox;
        const rad = rotatedBox.rotation;

        const p1 = getCorner(x, y, 0, 0, rad);
        const p2 = getCorner(x, y, width, 0, rad);
        const p3 = getCorner(x, y, width, height, rad);
        const p4 = getCorner(x, y, 0, height, rad);

        const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
        const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
        const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
        const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

        return {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY,
        };
      }

      function getTotalBox(boxes) {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        boxes.forEach((box) => {
          minX = Math.min(minX, box.x);
          minY = Math.min(minY, box.y);
          maxX = Math.max(maxX, box.x + box.width);
          maxY = Math.max(maxY, box.y + box.height);
        });
        return {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY,
        };
      }
	
	var i=listindex;
	CS.itask_list_show_edit_window_map_add_list[i] = new Konva.Rect({
		x: inx,
		y: iny,
		width: inw,
		height: inh,
		fill: color,
		opacity:0.5,
		draggable: true,
		id: "edit_window_map_rect"+"_"+CS.vueObj.itask_list_show_file_list_now_imgs_index+"_"+i,
	});
	
	CS.itask_list_show_edit_window_map_added_list["edit_window_map_rect"+"_"+CS.vueObj.itask_list_show_file_list_now_imgs_index+"_"+i]=CS.itask_list_show_edit_window_map_add_list[i];
	
	CS.itask_list_show_edit_window_map_KVN_layer1.add(CS.itask_list_show_edit_window_map_add_list[i]);
	CS.itask_list_show_edit_window_map_add_list_xy[i]={};
	CS.itask_list_show_edit_window_map_add_list_xy[i].x=inx;
	CS.itask_list_show_edit_window_map_add_list_xy[i].y=iny;
	CS.itask_list_show_edit_window_map_add_list_xy[i].w=inw;
	CS.itask_list_show_edit_window_map_add_list_xy[i].h=inh;
	CS.itask_list_show_edit_window_map_add_list_xy[i].color=color;
	CS.itask_list_show_edit_window_map_add_list_xy[i].imgs_index=CS.vueObj.itask_list_show_file_list_now_imgs_index;
	// const shape2 = shape1.clone({
		// x: CS.itask_list_show_edit_window_map_KVN_stage.width() / 2 + 10,
		// y: CS.itask_list_show_edit_window_map_KVN_stage.height() / 2 + 10,
		// fill: 'green',
	// });
	// CS.itask_list_show_edit_window_map_KVN_layer1.add(shape2);
	
	
	
	const tr = new Konva.Transformer({
	id: "edit_window_map_rect_transfor"+"_"+CS.vueObj.itask_list_show_file_list_now_imgs_index+"_"+i,
	nodes: [CS.itask_list_show_edit_window_map_add_list[i]],
	boundBoxFunc: (oldBox, newBox) => {
		const box = getClientRect(newBox);
		const isOut =
		box.x < 0 ||
		box.y < 0 ||
		box.x + box.width > CS.itask_list_show_edit_window_map_KVN_stage.width() ||
		box.y + box.height > CS.itask_list_show_edit_window_map_KVN_stage.height();
		if (isOut) {
			return oldBox;
		}
		CS.itask_list_show_edit_window_map_add_list_xy[i].x=box.x;
		CS.itask_list_show_edit_window_map_add_list_xy[i].y=box.y;
		CS.itask_list_show_edit_window_map_add_list_xy[i].w=box.width;
		CS.itask_list_show_edit_window_map_add_list_xy[i].h=box.height;
		return newBox;
	},
	});
	
	CS.itask_list_show_edit_window_map_added_list["edit_window_map_rect_transfor"+"_"+CS.vueObj.itask_list_show_file_list_now_imgs_index+"_"+i]=tr;
	
	CS.itask_list_show_edit_window_map_KVN_layer1.add(tr);
	tr.on('dragmove', () => {
	const boxes = tr.nodes().map((node) => node.getClientRect());
	const box = getTotalBox(boxes);
	tr.nodes().forEach((shape) => {
		const absPos = shape.getAbsolutePosition();
		const offsetX = box.x - absPos.x;
		const offsetY = box.y - absPos.y;
		const newAbsPos = { ...absPos };
		if (box.x < 0) {
			newAbsPos.x = -offsetX;
		}
		if (box.y < 0) {
			newAbsPos.y = -offsetY;
		}
		if (box.x + box.width > CS.itask_list_show_edit_window_map_KVN_stage.width()) {
			newAbsPos.x = CS.itask_list_show_edit_window_map_KVN_stage.width() - box.width - offsetX;
		}
		if (box.y + box.height > CS.itask_list_show_edit_window_map_KVN_stage.height()) {
			newAbsPos.y = CS.itask_list_show_edit_window_map_KVN_stage.height() - box.height - offsetY;
		}
		CS.itask_list_show_edit_window_map_add_list_xy[i].x=newAbsPos.x;
		CS.itask_list_show_edit_window_map_add_list_xy[i].y=newAbsPos.y;
		CS.itask_list_show_edit_window_map_add_list_xy[i].w=box.width;
		CS.itask_list_show_edit_window_map_add_list_xy[i].h=box.height;
		shape.setAbsolutePosition(newAbsPos);
		});
	});
}
CS.itask_list_show_edit_window_map_redaction_back=function(flag){
	CS.vueObj.itask_list_show_edit_window_map_brightness_flag="A";
	if(flag==-9){
		CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0]=CS.itask_list_show_edit_window_map_add_redaction_old;
	}
	CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
	CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
	//画像をcanvasに設定
	CS.itask_list_show_edit_window_canvas_tmp_img.onload = function(){
		CS.itask_list_show_edit_window_map_KVN_onlyback();
	}
}
CS.itask_list_show_edit_window_map_redaction_do=function(){
	CS.itask_list_show_edit_window_map_add_roline_canvas = document.createElement('canvas');
	CS.itask_list_show_edit_window_map_add_roline_ctx = CS.itask_list_show_edit_window_map_add_roline_canvas.getContext("2d");

	// Canvasのサイズを設定（必要に応じて変更）
	CS.itask_list_show_edit_window_map_add_roline_canvas.width = CS.itask_list_show_edit_window_map_ro_do_width_full;
	CS.itask_list_show_edit_window_map_add_roline_canvas.height = CS.itask_list_show_edit_window_map_ro_do_height_full;	
	CS.itask_list_show_edit_window_map_add_roline_image = new Image();
	CS.itask_list_show_edit_window_map_add_roline_image.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
	//imageをロードする目的はimageをitask_list_show_edit_window_map_add_roline_ctxに書き込み
	CS.itask_list_show_edit_window_map_add_roline_image.onload = function () {
		CS.itask_list_show_edit_window_map_add_roline_ctx.drawImage(CS.itask_list_show_edit_window_map_add_roline_image, 0, 0, CS.itask_list_show_edit_window_map_ro_do_width_full, CS.itask_list_show_edit_window_map_ro_do_height_full);
		CS.itask_list_show_edit_window_map_add_roline_ctx.fillStyle = '#fff';
		var hihituw=CS.itask_list_show_edit_window_map_ro_do_width_full/CS.itask_list_show_edit_window_map_KVN_width;
		var dodelflag=false;
		var x = CS.itask_list_show_edit_window_map_add_tz_area_rc.getX()*hihituw;
		var w = CS.itask_list_show_edit_window_map_add_tz_area_rc_size.w*hihituw;
		var hihituh=CS.itask_list_show_edit_window_map_ro_do_height_full/CS.itask_list_show_edit_window_map_KVN_height;
		var y = CS.itask_list_show_edit_window_map_add_tz_area_rc.getY()*hihituw;
		var h = CS.itask_list_show_edit_window_map_add_tz_area_rc_size.h*hihituw;
			CS.itask_list_show_edit_window_map_add_roline_ctx.fillRect(x, y, w, h);
		// for(var j=0;j<CS.itask_list_show_edit_window_map_ro_do_height_full;j++){
			// for(var i=0;i<CS.itask_list_show_edit_window_map_ro_do_width_full;i++){
				// var hihituw=CS.itask_list_show_edit_window_map_ro_do_width_full/CS.itask_list_show_edit_window_map_KVN_width;
				// var dodelflag=false;
				// var x = CS.itask_list_show_edit_window_map_add_tz_area_rc.getX()*hihituw;
				// var w = CS.itask_list_show_edit_window_map_add_tz_area_rc.getWidth()*hihituw;
				// var hihituh=CS.itask_list_show_edit_window_map_ro_do_height_full/CS.itask_list_show_edit_window_map_KVN_height;
				// var y = CS.itask_list_show_edit_window_map_add_tz_area_rc.getY()*hihituw;
				// var h = CS.itask_list_show_edit_window_map_add_tz_area_rc.getHeight()*hihituw;
				// if(x<=i && x+w>=i && y<=j && y+h>=j){
					// dodelflag=true;
				// }
				// if(dodelflag){
					// CS.itask_list_show_edit_window_map_add_roline_ctx.fillRect(i, j, 1, 1);
				// }
			// }
		// }
		
		
		
		CS.itask_list_show_edit_window_map_KVN_layer1.destroyChildren();
		CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0]=CS.itask_list_show_edit_window_map_add_roline_canvas.toDataURL("image/jpeg");
		CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
		CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
		//背景画像
		CS.itask_list_show_edit_window_map_KVN_hk_img = new Konva.Image({
		  x: 0,
		  y: 0,
		  image: CS.itask_list_show_edit_window_canvas_tmp_img,
		  width: CS.itask_list_show_edit_window_map_KVN_width,
		  height: CS.itask_list_show_edit_window_map_KVN_height,
		});
		// add the shape to the layer
		CS.itask_list_show_edit_window_map_KVN_layer1.add(CS.itask_list_show_edit_window_map_KVN_hk_img);
		CS.itask_list_show_edit_window_map_redaction_after(false,CS.itask_list_show_edit_window_map_add_tz_area_rc.getX(),CS.itask_list_show_edit_window_map_add_tz_area_rc.getY(),CS.itask_list_show_edit_window_map_add_tz_area_rc_size.w,CS.itask_list_show_edit_window_map_add_tz_area_rc_size.h);
		CS.itask_list_show_edit_window_map_KVN_layer1.draw();
	}
}
//墨消用
CS.itask_list_show_edit_window_map_redaction_after=function(initflag,xx,yy,ww,hh){
	function getCorner(pivotX, pivotY, diffX, diffY, angle) {
	  const distance = Math.sqrt(diffX * diffX + diffY * diffY);
	
	  /// find angle from pivot to corner
	  angle += Math.atan2(diffY, diffX);
	
	  /// get new x and y and round it off to integer
	  const x = pivotX + distance * Math.cos(angle);
	  const y = pivotY + distance * Math.sin(angle);
	
	  return { x: x, y: y };
	}
	function getClientRect(rotatedBox) {
	  const { x, y, width, height } = rotatedBox;
	  const rad = rotatedBox.rotation;
	
	  const p1 = getCorner(x, y, 0, 0, rad);
	  const p2 = getCorner(x, y, width, 0, rad);
	  const p3 = getCorner(x, y, width, height, rad);
	  const p4 = getCorner(x, y, 0, height, rad);
	
	  const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
	  const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
	  const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
	  const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);
	
	  return {
		x: minX,
		y: minY,
		width: maxX - minX,
		height: maxY - minY,
	  };
	}
	
	function getTotalBox(boxes) {
	  let minX = Infinity;
	  let minY = Infinity;
	  let maxX = -Infinity;
	  let maxY = -Infinity;
	
	  boxes.forEach((box) => {
		minX = Math.min(minX, box.x);
		minY = Math.min(minY, box.y);
		maxX = Math.max(maxX, box.x + box.width);
		maxY = Math.max(maxY, box.y + box.height);
	  });
	  return {
		x: minX,
		y: minY,
		width: maxX - minX,
		height: maxY - minY,
	  };
	}
	CS.itask_list_show_edit_window_map_add_tz_area_rc_size={};
	if(initflag){
		CS.itask_list_show_edit_window_map_add_tz_area_rc = new Konva.Rect({
			x: 100,
			y: 100,
			width: 100,
			height: 100,
			fill: "white",
			opacity:0.8,
			draggable: true,
			id: "map_add_tz_area_rc",
		});
		CS.itask_list_show_edit_window_map_add_tz_area_rc_size.w=100;
		CS.itask_list_show_edit_window_map_add_tz_area_rc_size.h=100;
	}else{
		CS.itask_list_show_edit_window_map_add_tz_area_rc = new Konva.Rect({
			x: xx,
			y: yy,
			width: ww,
			height: hh,
			fill: "white",
			opacity:0.8,
			draggable: true,
			id: "map_add_tz_area_rc",
		});
		CS.itask_list_show_edit_window_map_add_tz_area_rc_size.w=ww;
		CS.itask_list_show_edit_window_map_add_tz_area_rc_size.h=hh;
	}

	CS.itask_list_show_edit_window_map_KVN_layer1.add(CS.itask_list_show_edit_window_map_add_tz_area_rc);
	//コントロール機器追加
	const tr = new Konva.Transformer({
	id: "edit_window_map_rect_transfor",
	nodes: [CS.itask_list_show_edit_window_map_add_tz_area_rc],
	boundBoxFunc: (oldBox, newBox) => {
		const box = getClientRect(newBox);
		const isOut =
		box.x < 0 ||
		box.y < 0 ||
		box.x + box.width > CS.itask_list_show_edit_window_map_KVN_stage.width() ||
		box.y + box.height > CS.itask_list_show_edit_window_map_KVN_stage.height();
		if (isOut) {
			return oldBox;
		}
		CS.itask_list_show_edit_window_map_add_tz_area_rc_size.w=box.width;
		CS.itask_list_show_edit_window_map_add_tz_area_rc_size.h=box.height;
		return newBox;
	},
	});
	CS.itask_list_show_edit_window_map_KVN_layer1.add(tr);
	tr.on('dragmove', () => {
	const boxes = tr.nodes().map((node) => node.getClientRect());
	const box = getTotalBox(boxes);
	tr.nodes().forEach((shape) => {
		const absPos = shape.getAbsolutePosition();
		const offsetX = box.x - absPos.x;
		const offsetY = box.y - absPos.y;
		const newAbsPos = { ...absPos };
		if (box.x < 0) {
			newAbsPos.x = -offsetX;
		}
		if (box.y < 0) {
			newAbsPos.y = -offsetY;
		}
		if (box.x + box.width > CS.itask_list_show_edit_window_map_KVN_stage.width()) {
			newAbsPos.x = CS.itask_list_show_edit_window_map_KVN_stage.width() - box.width - offsetX;
		}
		if (box.y + box.height > CS.itask_list_show_edit_window_map_KVN_stage.height()) {
			newAbsPos.y = CS.itask_list_show_edit_window_map_KVN_stage.height() - box.height - offsetY;
		}
		shape.setAbsolutePosition(newAbsPos);
		});
	});
}
CS.itask_list_show_edit_window_map_redaction=function(){
	CS.vueObj.itask_list_show_edit_window_map_brightness_flag="C";
	CS.itask_list_show_edit_window_map_add_redaction_old=CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0]+"";
	CS.itask_list_show_edit_window_map_KVN_onlyback();
	var image = new Image();
	image.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
	// 画像が読み込まれた後にサイズを取得
	image.onload = function () {
		CS.itask_list_show_edit_window_map_ro_do_width_full = image.width;
		CS.itask_list_show_edit_window_map_ro_do_height_full = image.height;
	};
	setTimeout(CS.itask_list_show_edit_window_map_redaction_after(true,null,null,null,null),500);
}

CS.itask_list_show_edit_window_map_keystone_after=function(initflag,x1,y1,x2,y2,x3,y3,x4,y4){
	if(initflag){// 初期頂点座標
		CS.itask_list_show_edit_window_map_add_tz_area_points = [
			{ x: x1, y: y1 }, // 頂点1
			{ x: x2, y: y2 }, // 頂点2
			{ x: x3, y: y3 }, // 頂点3
			{ x: x4, y: y4 }  // 頂点4
		];
		// 四辺形を描画
		CS.itask_list_show_edit_window_map_add_tz_area_polygon = new Konva.Line({
			points: CS.itask_list_show_edit_window_map_add_tz_area_points.flatMap(point => [point.x, point.y]),
			stroke: 'blue',
			strokeWidth: 2,
			closed: true,
		});
		// レイヤーに四辺形を追加
        CS.itask_list_show_edit_window_map_KVN_layer1.add(CS.itask_list_show_edit_window_map_add_tz_area_polygon);
        // 辺の交差判定
        function checkIntersection(p1, p2, p3, p4) {
            function ccw(a, b, c) {
                return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
            }
            return (
                ccw(p1, p3, p4) !== ccw(p2, p3, p4) &&
                ccw(p1, p2, p3) !== ccw(p1, p2, p4)
            );
        }

        // ドラッグ可能な頂点を作成
        var handles = CS.itask_list_show_edit_window_map_add_tz_area_points.map((point, index) => {
            var circle = new Konva.Circle({
                x: point.x,
                y: point.y,
                radius: 8,
                fill: 'blue',
                draggable: true,
            });

            circle.on('dragmove', function () {
                // 新しい位置を仮に設定
                var newPoint = { x: circle.x(), y: circle.y() };
                var tempPoints = [...CS.itask_list_show_edit_window_map_add_tz_area_points];
                tempPoints[index] = newPoint;

                // 辺同士が交差しないか確認
                var isValid = true;
                for (let i = 0; i < 4; i++) {
                    let nextI = (i + 1) % 4;
                    for (let j = i + 2; j < 4; j++) {
                        let nextJ = (j + 1) % 4;
                        if (nextJ !== i && checkIntersection(
                            tempPoints[i], tempPoints[nextI],
                            tempPoints[j], tempPoints[nextJ]
                        )) {
                            isValid = false;
                            break;
                        }
                    }
                }
                if(newPoint.x<0 || newPoint.x>CS.itask_list_show_edit_window_map_KVN_width){
                    isValid = false;
                }
                if(newPoint.y<0 || newPoint.y>CS.itask_list_show_edit_window_map_KVN_height){
                    isValid = false;
                }
                // 無効な移動の場合、ドラッグをキャンセル
                if (!isValid) {
                    circle.x(CS.itask_list_show_edit_window_map_add_tz_area_points[index].x);
                    circle.y(CS.itask_list_show_edit_window_map_add_tz_area_points[index].y);
                } else {
                    // 有効な場合、四辺形を更新
                    CS.itask_list_show_edit_window_map_add_tz_area_points[index] = newPoint;
                    CS.itask_list_show_edit_window_map_add_tz_area_polygon.points(CS.itask_list_show_edit_window_map_add_tz_area_points.flatMap(p => [p.x, p.y]));
                    CS.itask_list_show_edit_window_map_KVN_layer1.batchDraw();
                }
            });

            CS.itask_list_show_edit_window_map_KVN_layer1.add(circle);
            return circle;
        });

        CS.itask_list_show_edit_window_map_KVN_layer1.draw();
		CS.itask_list_show_edit_window_map_add_tz_area_rc_size.w=100;
		CS.itask_list_show_edit_window_map_add_tz_area_rc_size.h=100;
	}else{
		CS.itask_list_show_edit_window_map_add_tz_area_points = [
			{ x: 100, y: 100 }, // 頂点1
			{ x: 300, y: 100 }, // 頂点2
			{ x: 300, y: 300 }, // 頂点3
			{ x: 100, y: 300 }  // 頂点4
		];
		// 四辺形を描画
		CS.itask_list_show_edit_window_map_add_tz_area_polygon = new Konva.Line({
			points: CS.itask_list_show_edit_window_map_add_tz_area_points.flatMap(point => [point.x, point.y]),
			stroke: 'blue',
			strokeWidth: 2,
			closed: true,
		});
		// レイヤーに四辺形を追加
        CS.itask_list_show_edit_window_map_KVN_layer1.add(CS.itask_list_show_edit_window_map_add_tz_area_polygon);
        // 辺の交差判定
        function checkIntersection(p1, p2, p3, p4) {
            function ccw(a, b, c) {
                return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
            }
            return (
                ccw(p1, p3, p4) !== ccw(p2, p3, p4) &&
                ccw(p1, p2, p3) !== ccw(p1, p2, p4)
            );
        }

        // ドラッグ可能な頂点を作成
        var handles = CS.itask_list_show_edit_window_map_add_tz_area_points.map((point, index) => {
            var circle = new Konva.Circle({
                x: point.x,
                y: point.y,
                radius: 8,
                fill: 'blue',
                draggable: true,
            });

            circle.on('dragmove', function () {
                // 新しい位置を仮に設定
                var newPoint = { x: circle.x(), y: circle.y() };
                var tempPoints = [...CS.itask_list_show_edit_window_map_add_tz_area_points];
                tempPoints[index] = newPoint;

                // 辺同士が交差しないか確認
                var isValid = true;
                for (let i = 0; i < 4; i++) {
                    let nextI = (i + 1) % 4;
                    for (let j = i + 2; j < 4; j++) {
                        let nextJ = (j + 1) % 4;
                        if (nextJ !== i && checkIntersection(
                            tempPoints[i], tempPoints[nextI],
                            tempPoints[j], tempPoints[nextJ]
                        )) {
                            isValid = false;
                            break;
                        }
                    }
                }
                if(newPoint.x<0 || newPoint.x>CS.itask_list_show_edit_window_map_KVN_width){
                    isValid = false;
                }
                if(newPoint.y<0 || newPoint.y>CS.itask_list_show_edit_window_map_KVN_height){
                    isValid = false;
                }
                // 無効な移動の場合、ドラッグをキャンセル
                if (!isValid) {
                    circle.x(CS.itask_list_show_edit_window_map_add_tz_area_points[index].x);
                    circle.y(CS.itask_list_show_edit_window_map_add_tz_area_points[index].y);
                } else {
                    // 有効な場合、四辺形を更新
                    CS.itask_list_show_edit_window_map_add_tz_area_points[index] = newPoint;
                    CS.itask_list_show_edit_window_map_add_tz_area_polygon.points(CS.itask_list_show_edit_window_map_add_tz_area_points.flatMap(p => [p.x, p.y]));
                    CS.itask_list_show_edit_window_map_KVN_layer1.batchDraw();
                }
            });

            CS.itask_list_show_edit_window_map_KVN_layer1.add(circle);
            return circle;
        });

        CS.itask_list_show_edit_window_map_KVN_layer1.draw();
		CS.itask_list_show_edit_window_map_add_tz_area_rc_size.w=100;
		CS.itask_list_show_edit_window_map_add_tz_area_rc_size.h=100;
	}
}
CS.itask_list_show_edit_window_map_keystone_do=function(){
	var obj = {};
	obj["canvas_src"] = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index].replaceAll('data:image/jpeg;base64,', '');
	obj["action"] = "itask_list_show_edit_window_map_keystone_do";
	var hihituw=CS.itask_list_show_edit_window_map_make_canvas_src_W/CS.itask_list_show_edit_window_map_KVN_width;
	var hihituh=CS.itask_list_show_edit_window_map_make_canvas_src_H/CS.itask_list_show_edit_window_map_KVN_height;
	
	
	obj["x1"] = CS.itask_list_show_edit_window_map_add_tz_area_points[0].x*hihituw;
	obj["y1"] = CS.itask_list_show_edit_window_map_add_tz_area_points[0].y*hihituh;
	obj["x2"] = CS.itask_list_show_edit_window_map_add_tz_area_points[1].x*hihituw;
	obj["y2"] = CS.itask_list_show_edit_window_map_add_tz_area_points[1].y*hihituh;
	obj["x3"] = CS.itask_list_show_edit_window_map_add_tz_area_points[2].x*hihituw;
	obj["y3"] = CS.itask_list_show_edit_window_map_add_tz_area_points[2].y*hihituh;
	obj["x4"] = CS.itask_list_show_edit_window_map_add_tz_area_points[3].x*hihituw;
	obj["y4"] = CS.itask_list_show_edit_window_map_add_tz_area_points[3].y*hihituh;
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
			var hihituw=CS.itask_list_show_edit_window_map_make_canvas_src_W/CS.itask_list_show_edit_window_map_KVN_width;
			var hihituh=CS.itask_list_show_edit_window_map_make_canvas_src_H/CS.itask_list_show_edit_window_map_KVN_height;
			CS.itask_list_show_edit_window_map_keystone_init_x1=data["contents"]["x1"]/hihituw;
			CS.itask_list_show_edit_window_map_keystone_init_y1=data["contents"]["y1"]/hihituh;
			CS.itask_list_show_edit_window_map_keystone_init_x2=data["contents"]["x2"]/hihituw;
			CS.itask_list_show_edit_window_map_keystone_init_y2=data["contents"]["y2"]/hihituh;
			CS.itask_list_show_edit_window_map_keystone_init_x3=data["contents"]["x3"]/hihituw;
			CS.itask_list_show_edit_window_map_keystone_init_y3=data["contents"]["y3"]/hihituh;
			CS.itask_list_show_edit_window_map_keystone_init_x4=data["contents"]["x4"]/hihituw;
			CS.itask_list_show_edit_window_map_keystone_init_y4=data["contents"]["y4"]/hihituh;
			CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index]=data["image"];
			CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
			CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
			CS.itask_list_show_edit_window_canvas_tmp_img.onload = function () {
				CS.itask_list_show_edit_window_map_ro_do_width_full = CS.itask_list_show_edit_window_canvas_tmp_img.width;
				CS.itask_list_show_edit_window_map_ro_do_height_full = CS.itask_list_show_edit_window_canvas_tmp_img.height;
				CS.itask_list_show_edit_window_map_KVN_onlyback();
				var x1=CS.itask_list_show_edit_window_map_keystone_init_x1;
				var y1=CS.itask_list_show_edit_window_map_keystone_init_y1;
				var x2=CS.itask_list_show_edit_window_map_keystone_init_x2;
				var y2=CS.itask_list_show_edit_window_map_keystone_init_y2;
				var x3=CS.itask_list_show_edit_window_map_keystone_init_x3;
				var y3=CS.itask_list_show_edit_window_map_keystone_init_y3;
				var x4=CS.itask_list_show_edit_window_map_keystone_init_x4;
				var y4=CS.itask_list_show_edit_window_map_keystone_init_y4;
				setTimeout(CS.itask_list_show_edit_window_map_keystone_after(true,x1,y1,x2,y2,x3,y3,x4,y4),500);
			};
		}
	});
}
CS.itask_list_show_edit_window_map_keystone_init=function(){
	var obj = {};
	obj["canvas_src"] = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index].replaceAll('data:image/jpeg;base64,', '');
	obj["action"] = "itask_list_show_edit_window_map_keystone_do";
	var hihituw=CS.itask_list_show_edit_window_map_make_canvas_src_W/CS.itask_list_show_edit_window_map_KVN_width;
	var hihituh=CS.itask_list_show_edit_window_map_make_canvas_src_H/CS.itask_list_show_edit_window_map_KVN_height;
	obj["x1"] = 99999;
	obj["y1"] = 99999;
	obj["x2"] = 99999;
	obj["y2"] = 99999;
	obj["x3"] = 99999;
	obj["y3"] = 99999;
	obj["x4"] = 99999;
	obj["y4"] = 99999;
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
			var hihituw=CS.itask_list_show_edit_window_map_make_canvas_src_W/CS.itask_list_show_edit_window_map_KVN_width;
			var hihituh=CS.itask_list_show_edit_window_map_make_canvas_src_H/CS.itask_list_show_edit_window_map_KVN_height;
			CS.itask_list_show_edit_window_map_keystone_init_x1=data["contents"]["x1"]/hihituw;
			CS.itask_list_show_edit_window_map_keystone_init_y1=data["contents"]["y1"]/hihituh;
			CS.itask_list_show_edit_window_map_keystone_init_x2=data["contents"]["x2"]/hihituw;
			CS.itask_list_show_edit_window_map_keystone_init_y2=data["contents"]["y2"]/hihituh;
			CS.itask_list_show_edit_window_map_keystone_init_x3=data["contents"]["x3"]/hihituw;
			CS.itask_list_show_edit_window_map_keystone_init_y3=data["contents"]["y3"]/hihituh;
			CS.itask_list_show_edit_window_map_keystone_init_x4=data["contents"]["x4"]/hihituw;
			CS.itask_list_show_edit_window_map_keystone_init_y4=data["contents"]["y4"]/hihituh;
			
			CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index]=data["image"];
			CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
			CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
			CS.itask_list_show_edit_window_canvas_tmp_img.onload = function () {
				CS.itask_list_show_edit_window_map_ro_do_width_full = CS.itask_list_show_edit_window_canvas_tmp_img.width;
				CS.itask_list_show_edit_window_map_ro_do_height_full = CS.itask_list_show_edit_window_canvas_tmp_img.height;
				CS.itask_list_show_edit_window_map_KVN_onlyback();
				var x1=CS.itask_list_show_edit_window_map_keystone_init_x1;
				var y1=CS.itask_list_show_edit_window_map_keystone_init_y1;
				var x2=CS.itask_list_show_edit_window_map_keystone_init_x2;
				var y2=CS.itask_list_show_edit_window_map_keystone_init_y2;
				var x3=CS.itask_list_show_edit_window_map_keystone_init_x3;
				var y3=CS.itask_list_show_edit_window_map_keystone_init_y3;
				var x4=CS.itask_list_show_edit_window_map_keystone_init_x4;
				var y4=CS.itask_list_show_edit_window_map_keystone_init_y4;
				setTimeout(CS.itask_list_show_edit_window_map_keystone_after(true,x1,y1,x2,y2,x3,y3,x4,y4),500);
			};
		}
	});
	//setTimeout(CS.itask_list_show_edit_window_map_keystone_after(true,null,null,null,null,null,null,null,null),500);
}
CS.itask_list_show_edit_window_map_keystone=function(){
	CS.vueObj.itask_list_show_edit_window_map_brightness_flag="D";
	CS.itask_list_show_edit_window_map_add_redaction_old=CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0]+"";
	CS.itask_list_show_edit_window_map_KVN_onlyback();
	CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
	CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
	// 画像が読み込まれた後にサイズを取得
	CS.itask_list_show_edit_window_canvas_tmp_img.onload = function () {
		CS.itask_list_show_edit_window_map_ro_do_width_full = CS.itask_list_show_edit_window_canvas_tmp_img.width;
		CS.itask_list_show_edit_window_map_ro_do_height_full = CS.itask_list_show_edit_window_canvas_tmp_img.height;
	};
	CS.itask_list_show_edit_window_map_add_tz_area_rc_size={};
	setTimeout(CS.itask_list_show_edit_window_map_keystone_init(true,null,null,null,null,null,null,null,null),500);
}
CS.itask_list_show_edit_window_map_add_roline_after=function(){
	// 始点と終点の円を定義
	CS.itask_list_show_edit_window_map_add_roline_startPoint = new Konva.Circle({
		x: 100,
		y: 100,
		radius: 8,
		fill: 'blue',
		draggable: true,
	});

	CS.itask_list_show_edit_window_map_add_roline_endPoint = new Konva.Circle({
		x: 300,
		y: 100,
		radius: 8,
		fill: 'blue',
		draggable: true,
	});

	// 始点と終点をつなぐ線を作成
	CS.itask_list_show_edit_window_map_roline = new Konva.Line({
		points: [CS.itask_list_show_edit_window_map_add_roline_startPoint.x(), CS.itask_list_show_edit_window_map_add_roline_startPoint.y(), CS.itask_list_show_edit_window_map_add_roline_endPoint.x(), CS.itask_list_show_edit_window_map_add_roline_endPoint.y()],
		stroke: 'blue',
		strokeWidth: 2,
	});

	// 始点と終点の位置に合わせて線を更新する関数
	function updateLine() {
		if(CS.itask_list_show_edit_window_map_add_roline_startPoint.x()<0){
			CS.itask_list_show_edit_window_map_add_roline_startPoint.x(0);
		}
		if(CS.itask_list_show_edit_window_map_add_roline_startPoint.x()>CS.itask_list_show_edit_window_map_KVN_width){
			CS.itask_list_show_edit_window_map_add_roline_startPoint.x(CS.itask_list_show_edit_window_map_KVN_width);
		}
		if(CS.itask_list_show_edit_window_map_add_roline_startPoint.y()<0){
			CS.itask_list_show_edit_window_map_add_roline_startPoint.y(0);
		}
		if(CS.itask_list_show_edit_window_map_add_roline_startPoint.y()>CS.itask_list_show_edit_window_map_KVN_height){
			CS.itask_list_show_edit_window_map_add_roline_startPoint.y(CS.itask_list_show_edit_window_map_KVN_height);
		}
		if(CS.itask_list_show_edit_window_map_add_roline_endPoint.x()<0){
			CS.itask_list_show_edit_window_map_add_roline_endPoint.x(0);
		}
		if(CS.itask_list_show_edit_window_map_add_roline_endPoint.x()>CS.itask_list_show_edit_window_map_KVN_width){
			CS.itask_list_show_edit_window_map_add_roline_endPoint.x(CS.itask_list_show_edit_window_map_KVN_width);
		}
		if(CS.itask_list_show_edit_window_map_add_roline_endPoint.y()<0){
			CS.itask_list_show_edit_window_map_add_roline_endPoint.y(0);
		}
		if(CS.itask_list_show_edit_window_map_add_roline_endPoint.y()>CS.itask_list_show_edit_window_map_KVN_height){
			CS.itask_list_show_edit_window_map_add_roline_endPoint.y(CS.itask_list_show_edit_window_map_KVN_height);
		}
		CS.itask_list_show_edit_window_map_roline.points([CS.itask_list_show_edit_window_map_add_roline_startPoint.x(), CS.itask_list_show_edit_window_map_add_roline_startPoint.y(), CS.itask_list_show_edit_window_map_add_roline_endPoint.x(), CS.itask_list_show_edit_window_map_add_roline_endPoint.y()]);
		CS.itask_list_show_edit_window_map_KVN_layer1.draw();
	}

	// 始点と終点のドラッグイベントにリスナーを追加
	CS.itask_list_show_edit_window_map_add_roline_startPoint.on('dragmove', updateLine);
	CS.itask_list_show_edit_window_map_add_roline_endPoint.on('dragmove', updateLine);

	// レイヤーに要素を追加
	CS.itask_list_show_edit_window_map_KVN_layer1.add(CS.itask_list_show_edit_window_map_roline);
	CS.itask_list_show_edit_window_map_KVN_layer1.add(CS.itask_list_show_edit_window_map_add_roline_startPoint);
	CS.itask_list_show_edit_window_map_KVN_layer1.add(CS.itask_list_show_edit_window_map_add_roline_endPoint);

	// レイヤーを描画
	CS.itask_list_show_edit_window_map_KVN_layer1.draw();
}
CS.itask_list_show_edit_window_map_add_roline=function(){
	CS.vueObj.itask_list_show_edit_window_map_brightness_flag="B";
	CS.itask_list_show_edit_window_map_add_roline_old=CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0]+"";
	
	var image = new Image();
	image.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];

	// 画像が読み込まれた後にサイズを取得
	image.onload = function () {
		CS.itask_list_show_edit_window_map_ro_do_width_full = image.width;
		CS.itask_list_show_edit_window_map_ro_do_height_full = image.height;
	};
	CS.itask_list_show_edit_window_map_KVN_onlyback();
	setTimeout(CS.itask_list_show_edit_window_map_add_roline_after,500);
}
CS.itask_list_show_edit_window_map_ro_back=function(flag){
	CS.vueObj.itask_list_show_edit_window_map_brightness_flag="A";
	if(flag==-9){
		CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0]=CS.itask_list_show_edit_window_map_add_roline_old;
	}
	CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
	CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];

	//画像をcanvasに設定
	CS.itask_list_show_edit_window_canvas_tmp_img.onload = function(){
		CS.itask_list_show_edit_window_map_KVN_onlyback();
	}
}
CS.itask_list_show_edit_window_map_ro_do=function(){
    var points = CS.itask_list_show_edit_window_map_roline.points();
	var x1 = points[0], y1 = points[1];
	var x2 = points[2], y2 = points[3];

	// 1. 中心点を計算
	var centerX = (x1 + x2) / 2;
	var centerY = (y1 + y2) / 2;
	CS.itask_list_show_edit_window_map_ro_do_center = { x: centerX, y: centerY };
	console.log("Center Point:", CS.itask_list_show_edit_window_map_ro_do_center);

	// 2. 角度を計算
	var deltaX = x2 - x1;
	var deltaY = y2 - y1;
	CS.itask_list_show_edit_window_map_ro_do_angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // ラジアンを度に変換
	console.log("Center Point:", CS.itask_list_show_edit_window_map_ro_do_angle);
	
	
	if(CS.itask_list_show_edit_window_map_ro_do_angle<-90){
		CS.itask_list_show_edit_window_map_ro_do_angle=180+CS.itask_list_show_edit_window_map_ro_do_angle;
	}else if(CS.itask_list_show_edit_window_map_ro_do_angle<0){
		CS.itask_list_show_edit_window_map_ro_do_angle=CS.itask_list_show_edit_window_map_ro_do_angle;
	}else if(CS.itask_list_show_edit_window_map_ro_do_angle<90){
		CS.itask_list_show_edit_window_map_ro_do_angle=CS.itask_list_show_edit_window_map_ro_do_angle;
	}else{
		CS.itask_list_show_edit_window_map_ro_do_angle=-1*(180-CS.itask_list_show_edit_window_map_ro_do_angle);
	}
	CS.itask_list_show_edit_window_map_ro_do_angle=CS.itask_list_show_edit_window_map_ro_do_angle*-1;
	console.log("Center Point:", CS.itask_list_show_edit_window_map_ro_do_angle);
	
	
	CS.itask_list_show_edit_window_map_ro_do_center.x=CS.itask_list_show_edit_window_map_ro_do_center.x*CS.itask_list_show_edit_window_map_ro_do_width_full/CS.itask_list_show_edit_window_map_KVN_width;
	CS.itask_list_show_edit_window_map_ro_do_center.y=CS.itask_list_show_edit_window_map_ro_do_center.y*CS.itask_list_show_edit_window_map_ro_do_height_full/CS.itask_list_show_edit_window_map_KVN_height;
	
	// Canvasの設定
	//CS.itask_list_show_edit_window_map_add_roline_canvas = document.getElementById("itask_list_show_edit_window_canvas_b");
	CS.itask_list_show_edit_window_map_add_roline_canvas = document.createElement('canvas');
	CS.itask_list_show_edit_window_map_add_roline_ctx = CS.itask_list_show_edit_window_map_add_roline_canvas.getContext("2d");

	// Canvasのサイズを設定（必要に応じて変更）
	CS.itask_list_show_edit_window_map_add_roline_canvas.width = CS.itask_list_show_edit_window_map_ro_do_width_full;
	CS.itask_list_show_edit_window_map_add_roline_canvas.height = CS.itask_list_show_edit_window_map_ro_do_height_full;
	CS.itask_list_show_edit_window_map_add_roline_image = new Image();
	CS.itask_list_show_edit_window_map_add_roline_image.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
	CS.itask_list_show_edit_window_map_add_roline_image.onload = function () {
		// 回転を開始
		//CS.itask_list_show_edit_window_map_add_roline_ctx.clearRect(0, 0, CS.itask_list_show_edit_window_map_add_roline_canvas.width, CS.itask_list_show_edit_window_map_add_roline_canvas.height); // Canvasをクリア
		CS.itask_list_show_edit_window_map_add_roline_ctx.fillStyle = "white";
		CS.itask_list_show_edit_window_map_add_roline_ctx.fillRect(0, 0, CS.itask_list_show_edit_window_map_add_roline_canvas.width, CS.itask_list_show_edit_window_map_add_roline_canvas.height);
		CS.itask_list_show_edit_window_map_add_roline_ctx.save(); // 現在のCanvas状態を保存

		// 回転の中心点を移動し、回転を適用
		CS.itask_list_show_edit_window_map_add_roline_ctx.translate(CS.itask_list_show_edit_window_map_ro_do_width_full/2, CS.itask_list_show_edit_window_map_ro_do_height_full/2); // 中心点を移動
		CS.itask_list_show_edit_window_map_add_roline_ctx.rotate((CS.itask_list_show_edit_window_map_ro_do_angle * Math.PI) / 180); // 角度をラジアンに変換して回転

		// 画像を描画（中心点からずれないように、画像の半分の幅と高さで補正）
		CS.itask_list_show_edit_window_map_add_roline_ctx.drawImage(CS.itask_list_show_edit_window_map_add_roline_image, -(CS.itask_list_show_edit_window_map_ro_do_width_full/2), -(CS.itask_list_show_edit_window_map_ro_do_height_full/2));
		CS.itask_list_show_edit_window_map_add_roline_ctx.restore();
		CS.itask_list_show_edit_window_map_KVN_layer0.destroyChildren();
		CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0]=CS.itask_list_show_edit_window_map_add_roline_canvas.toDataURL("image/jpeg");
		CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
		CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
		//背景画像
		CS.itask_list_show_edit_window_map_KVN_hk_img = new Konva.Image({
		  x: 0,
		  y: 0,
		  image: CS.itask_list_show_edit_window_canvas_tmp_img,
		  width: CS.itask_list_show_edit_window_map_KVN_width,
		  height: CS.itask_list_show_edit_window_map_KVN_height,
		});

		// add the shape to the layer
		CS.itask_list_show_edit_window_map_KVN_layer0.add(CS.itask_list_show_edit_window_map_KVN_hk_img);
		CS.itask_list_show_edit_window_map_KVN_layer0.draw();
	}
	
}
CS.itask_list_show_edit_window_map_add_roline_do=function(color){
	
}
//
CS.itask_list_show_edit_window_mab_area_on=function(){
	CS.vueObj.itask_list_show_edit_window_mab_area_flag=true;
	CS.itask_list_show_edit_window_map_add_tz_area("blue",10,10,100,100);
}
CS.itask_list_show_edit_window_mab_area_off=function(){
	CS.vueObj.itask_list_show_edit_window_mab_area_flag=false;
	CS.itask_list_show_edit_window_map_KVN_onlyback();
}
//部分明るく用四辺形追加->左上、右上、右下、左下
CS.itask_list_show_edit_window_map_add_tz_area=function(color,x1,y1,x2,y2){
	/**
	// 四辺形の初期頂点座標
	var points = [
		{ x: 100, y: 100 },
		{ x: 300, y: 100 },
		{ x: 300, y: 200 },
		{ x: 100, y: 200 }
	];

	// 四辺形のラインを作成
	CS.itask_list_show_edit_window_map_add_tz_area_polygon = new Konva.Line({
		points: points.flatMap(point => [point.x, point.y]),
		stroke: 'blue',
		strokeWidth: 2,
		closed: true, // 四辺形を閉じる
	});
	CS.itask_list_show_edit_window_map_KVN_layer1.add(CS.itask_list_show_edit_window_map_add_tz_area_polygon);
	// 頂点を表すドラッグ可能な円を作成
	var handles = points.map((point, index) => {
		var circle = new Konva.Circle({
			x: point.x,
			y: point.y,
			radius: 8,
			fill: 'blue',
			draggable: true,
		});

		// ドラッグ時にラインを更新
		circle.on('dragmove', function () {
			points[index] = { x: circle.x(), y: circle.y() };
			CS.itask_list_show_edit_window_map_add_tz_area_polygon.points(points.flatMap(p => [p.x, p.y]));
			CS.itask_list_show_edit_window_map_KVN_layer1.draw();
		});

		CS.itask_list_show_edit_window_map_KVN_layer1.add(circle);
		return circle;
	});
	CS.itask_list_show_edit_window_map_KVN_layer1.draw();
	**/
	// define several math function
	function getCorner(pivotX, pivotY, diffX, diffY, angle) {
	  const distance = Math.sqrt(diffX * diffX + diffY * diffY);
	
	  /// find angle from pivot to corner
	  angle += Math.atan2(diffY, diffX);
	
	  /// get new x and y and round it off to integer
	  const x = pivotX + distance * Math.cos(angle);
	  const y = pivotY + distance * Math.sin(angle);
	
	  return { x: x, y: y };
	}
	function getClientRect(rotatedBox) {
	  const { x, y, width, height } = rotatedBox;
	  const rad = rotatedBox.rotation;
	
	  const p1 = getCorner(x, y, 0, 0, rad);
	  const p2 = getCorner(x, y, width, 0, rad);
	  const p3 = getCorner(x, y, width, height, rad);
	  const p4 = getCorner(x, y, 0, height, rad);
	
	  const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
	  const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
	  const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
	  const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);
	
	  return {
		x: minX,
		y: minY,
		width: maxX - minX,
		height: maxY - minY,
	  };
	}
	
	function getTotalBox(boxes) {
	  let minX = Infinity;
	  let minY = Infinity;
	  let maxX = -Infinity;
	  let maxY = -Infinity;
	
	  boxes.forEach((box) => {
		minX = Math.min(minX, box.x);
		minY = Math.min(minY, box.y);
		maxX = Math.max(maxX, box.x + box.width);
		maxY = Math.max(maxY, box.y + box.height);
	  });
	  return {
		x: minX,
		y: minY,
		width: maxX - minX,
		height: maxY - minY,
	  };
	}
	CS.itask_list_show_edit_window_map_add_tz_area_rc = new Konva.Rect({
		x: x1,
		y: y1,
		width: x2-x1,
		height: y2-y1,
		fill: color,
		opacity:0.5,
		draggable: true,
		id: "map_add_tz_area_rc",
	});
	CS.itask_list_show_edit_window_map_KVN_layer1.add(CS.itask_list_show_edit_window_map_add_tz_area_rc);
	//コントロール機器追加
	const tr = new Konva.Transformer({
	id: "edit_window_map_rect_transfor",
	nodes: [CS.itask_list_show_edit_window_map_add_tz_area_rc],
	boundBoxFunc: (oldBox, newBox) => {
		const box = getClientRect(newBox);
		const isOut =
		box.x < 0 ||
		box.y < 0 ||
		box.x + box.width > CS.itask_list_show_edit_window_map_KVN_stage.width() ||
		box.y + box.height > CS.itask_list_show_edit_window_map_KVN_stage.height();
		if (isOut) {
			return oldBox;
		}
		return newBox;
	},
	});
	CS.itask_list_show_edit_window_map_KVN_layer1.add(tr);
	tr.on('dragmove', () => {
	const boxes = tr.nodes().map((node) => node.getClientRect());
	const box = getTotalBox(boxes);
	tr.nodes().forEach((shape) => {
		const absPos = shape.getAbsolutePosition();
		const offsetX = box.x - absPos.x;
		const offsetY = box.y - absPos.y;
		const newAbsPos = { ...absPos };
		if (box.x < 0) {
			newAbsPos.x = -offsetX;
		}
		if (box.y < 0) {
			newAbsPos.y = -offsetY;
		}
		if (box.x + box.width > CS.itask_list_show_edit_window_map_KVN_stage.width()) {
			newAbsPos.x = CS.itask_list_show_edit_window_map_KVN_stage.width() - box.width - offsetX;
		}
		if (box.y + box.height > CS.itask_list_show_edit_window_map_KVN_stage.height()) {
			newAbsPos.y = CS.itask_list_show_edit_window_map_KVN_stage.height() - box.height - offsetY;
		}
		shape.setAbsolutePosition(newAbsPos);
		});
	});
}
//■■■■■■■■■■■■■■■■konvajs■■■■■■■■■■■■■■■■
CS.itask_list_show_edit_window_map_add_rect=function(color){
      // define several math function
      function getCorner(pivotX, pivotY, diffX, diffY, angle) {
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);

        /// find angle from pivot to corner
        angle += Math.atan2(diffY, diffX);

        /// get new x and y and round it off to integer
        const x = pivotX + distance * Math.cos(angle);
        const y = pivotY + distance * Math.sin(angle);

        return { x: x, y: y };
      }
      function getClientRect(rotatedBox) {
        const { x, y, width, height } = rotatedBox;
        const rad = rotatedBox.rotation;

        const p1 = getCorner(x, y, 0, 0, rad);
        const p2 = getCorner(x, y, width, 0, rad);
        const p3 = getCorner(x, y, width, height, rad);
        const p4 = getCorner(x, y, 0, height, rad);

        const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
        const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
        const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
        const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

        return {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY,
        };
      }

      function getTotalBox(boxes) {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        boxes.forEach((box) => {
          minX = Math.min(minX, box.x);
          minY = Math.min(minY, box.y);
          maxX = Math.max(maxX, box.x + box.width);
          maxY = Math.max(maxY, box.y + box.height);
        });
        return {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY,
        };
      }
	
	if(isNaN(parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_x,10))){
		CS.vueObj.itask_list_show_edit_window_map_add_rect_x=CS.itask_list_show_edit_window_map_KVN_stage.width() / 2 - 60;
	}else{
		CS.vueObj.itask_list_show_edit_window_map_add_rect_x=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_x,10);
	}
	if(isNaN(parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_y,10))){
		CS.vueObj.itask_list_show_edit_window_map_add_rect_y=CS.itask_list_show_edit_window_map_KVN_stage.height() / 2 - 60;
	}else{
		CS.vueObj.itask_list_show_edit_window_map_add_rect_y=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_y,10);
	}
	if(isNaN(parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_w,10))){
		CS.vueObj.itask_list_show_edit_window_map_add_rect_w=50;
	}else{
		CS.vueObj.itask_list_show_edit_window_map_add_rect_w=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_w,10);
	}
	if(isNaN(parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_h,10))){
		CS.vueObj.itask_list_show_edit_window_map_add_rect_h=50;
	}else{
		CS.vueObj.itask_list_show_edit_window_map_add_rect_h=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_h,10);
	}
	//個人場合の四方形初期座標
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("houjin")==-1){
		if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
			var onew=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.width()/12);
			
			if(color==CS.aitask_image_edit_lkam){
				//左科目
				CS.itask_list_show_edit_window_map_add_rect_type=0;
				CS.vueObj.itask_list_show_edit_window_map_add_rect_x=onew;
				CS.vueObj.itask_list_show_edit_window_map_add_rect_y=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()/8)+18;
				CS.vueObj.itask_list_show_edit_window_map_add_rect_w=onew;
				CS.vueObj.itask_list_show_edit_window_map_add_rect_h=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height())-CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()/4);
			}else if(color==CS.aitask_image_edit_lkin){
				//左金額
				CS.vueObj.itask_list_show_edit_window_map_add_rect_x=onew*3+10;
				if(typeof CS.itask_list_show_edit_window_map_add_rect_type != "undefined"){
					CS.vueObj.itask_list_show_edit_window_map_add_rect_y=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_y,10);
				}else{
					CS.vueObj.itask_list_show_edit_window_map_add_rect_y=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()/8)+18;
					CS.vueObj.itask_list_show_edit_window_map_add_rect_h=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height())-CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()/4);
				}
				CS.vueObj.itask_list_show_edit_window_map_add_rect_w=onew;
			}else if(color==CS.aitask_image_edit_rkam){
				//右側科目
				CS.itask_list_show_edit_window_map_add_rect_type=2;
				CS.vueObj.itask_list_show_edit_window_map_add_rect_x=onew*4.5;
				if(typeof CS.itask_list_show_edit_window_map_add_rect_type != "undefined"){
					CS.vueObj.itask_list_show_edit_window_map_add_rect_y=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_y,10);
				}else{
					CS.vueObj.itask_list_show_edit_window_map_add_rect_y=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()/8)+18;
					CS.vueObj.itask_list_show_edit_window_map_add_rect_h=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height())-CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()/4);
				}
				CS.vueObj.itask_list_show_edit_window_map_add_rect_w=onew+10;
			}else if(color==CS.aitask_image_edit_rkin){
				//右側金額
				CS.vueObj.itask_list_show_edit_window_map_add_rect_x=onew*7;
				if(typeof CS.itask_list_show_edit_window_map_add_rect_type != "undefined"){
					CS.vueObj.itask_list_show_edit_window_map_add_rect_y=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_y,10);
				}else{
					CS.vueObj.itask_list_show_edit_window_map_add_rect_y=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()/8)+18;
					CS.vueObj.itask_list_show_edit_window_map_add_rect_h=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height())-CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()/4);
				}
				CS.vueObj.itask_list_show_edit_window_map_add_rect_w=onew+10;
			}
		}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
			var onew=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.width()/7);
			
			if(color==CS.aitask_image_edit_lkam){
				//左科目
				CS.itask_list_show_edit_window_map_add_rect_type=0;
				CS.vueObj.itask_list_show_edit_window_map_add_rect_x=onew/2;
				CS.vueObj.itask_list_show_edit_window_map_add_rect_y=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()/3);
				CS.vueObj.itask_list_show_edit_window_map_add_rect_w=onew-30;
				CS.vueObj.itask_list_show_edit_window_map_add_rect_h=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()*2/3)-50;
			}else if(color==CS.aitask_image_edit_lkin){
				//左金額
				CS.vueObj.itask_list_show_edit_window_map_add_rect_x=onew*3/2;
				if(typeof CS.itask_list_show_edit_window_map_add_rect_type != "undefined"){
					CS.vueObj.itask_list_show_edit_window_map_add_rect_y=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_y,10);
				}else{
					CS.vueObj.itask_list_show_edit_window_map_add_rect_y=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()/3);
					CS.vueObj.itask_list_show_edit_window_map_add_rect_h=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()*2/3)-50;
				}
				CS.vueObj.itask_list_show_edit_window_map_add_rect_w=onew;
			}else if(color==CS.aitask_image_edit_mkam){
				//中央科目
				CS.itask_list_show_edit_window_map_add_rect_type=2;
				CS.vueObj.itask_list_show_edit_window_map_add_rect_x=onew*5/2+20;
				if(typeof CS.itask_list_show_edit_window_map_add_rect_type != "undefined"){
					CS.vueObj.itask_list_show_edit_window_map_add_rect_y=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_y,10);
				}else{
					CS.vueObj.itask_list_show_edit_window_map_add_rect_y=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()/3);
					CS.vueObj.itask_list_show_edit_window_map_add_rect_h=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()*2/3)-50;
				}
				CS.vueObj.itask_list_show_edit_window_map_add_rect_w=onew-40;
			}else if(color==CS.aitask_image_edit_mkin){
				//中央科目
				CS.vueObj.itask_list_show_edit_window_map_add_rect_x=onew*7/2+20;
				if(typeof CS.itask_list_show_edit_window_map_add_rect_type != "undefined"){
					CS.vueObj.itask_list_show_edit_window_map_add_rect_y=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_y,10);
				}else{
					CS.vueObj.itask_list_show_edit_window_map_add_rect_y=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()/3);
					CS.vueObj.itask_list_show_edit_window_map_add_rect_h=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()*2/3)-50;
				}
				CS.vueObj.itask_list_show_edit_window_map_add_rect_w=onew-20;
			}else if(color==CS.aitask_image_edit_rkam){
				//中央科目
				CS.itask_list_show_edit_window_map_add_rect_type=4;
				CS.vueObj.itask_list_show_edit_window_map_add_rect_x=onew*9/2+20;
				if(typeof CS.itask_list_show_edit_window_map_add_rect_type != "undefined"){
					CS.vueObj.itask_list_show_edit_window_map_add_rect_y=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_y,10);
				}else{
					CS.vueObj.itask_list_show_edit_window_map_add_rect_y=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()/3);
				}
				CS.vueObj.itask_list_show_edit_window_map_add_rect_w=onew-20;
				CS.vueObj.itask_list_show_edit_window_map_add_rect_h=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()*2/3)-150;
			}else if(color==CS.aitask_image_edit_rkin){
				//中央科目
				CS.vueObj.itask_list_show_edit_window_map_add_rect_x=onew*11/2+20;
				if(typeof CS.itask_list_show_edit_window_map_add_rect_type != "undefined" && CS.itask_list_show_edit_window_map_add_rect_type==4){
					CS.vueObj.itask_list_show_edit_window_map_add_rect_y=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_y,10);
				}else{
					CS.vueObj.itask_list_show_edit_window_map_add_rect_y=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()/3);
					CS.vueObj.itask_list_show_edit_window_map_add_rect_h=CS.toI(CS.itask_list_show_edit_window_map_KVN_stage.height()*2/3)-150;
				}
				CS.vueObj.itask_list_show_edit_window_map_add_rect_w=onew;
			}
		}
	}

		// CS.aitask_image_edit_lkam="#fb7373";
		// CS.aitask_image_edit_lkin="#7391fb";
		// CS.aitask_image_edit_mkam="#f442dc";
		// CS.aitask_image_edit_mkin="#42f2f4";
		// CS.aitask_image_edit_rkam="#f4b442";
		// CS.aitask_image_edit_rkin="#42f45c";
	
	
	
	
	//当ページにすでに勘定科目枠（赤色）があるかを確認する
	if(color!="red"){
		for(var i=0;i<CS.itask_list_show_edit_window_map_add_list_xy.length;i++){
			if(CS.itask_list_show_edit_window_map_add_list_xy[i].w==0){
				continue;
			}
			if(CS.itask_list_show_edit_window_map_add_list_xy[i].imgs_index==CS.vueObj.itask_list_show_file_list_now_imgs_index){
				if(CS.itask_list_show_edit_window_map_add_list_xy[i].color=="red"){
					var bw=CS.itask_list_show_edit_window_map_KVN_stage.width();
					var ll=CS.itask_list_show_edit_window_map_add_list_xy[i].x+CS.itask_list_show_edit_window_map_add_list_xy[i].w;
					if(ll+100<bw){
						CS.vueObj.itask_list_show_edit_window_map_add_rect_x=ll;
					}else{
						CS.vueObj.itask_list_show_edit_window_map_add_rect_x=CS.itask_list_show_edit_window_map_add_list_xy[i].x-120;
					}
					
				}
			}
			
		}
	}
	for(var i=0;i<CS.itask_list_show_edit_window_map_add_list_xy.length;i++){
		if(CS.itask_list_show_edit_window_map_add_list_xy[i].w==0){
			continue;
		}
		if(CS.itask_list_show_edit_window_map_add_list_xy[i].imgs_index==CS.vueObj.itask_list_show_file_list_now_imgs_index){
			if(CS.itask_list_show_edit_window_map_add_list_xy[i].color==color){
				var bw=CS.itask_list_show_edit_window_map_KVN_stage.width();
				var ll=CS.itask_list_show_edit_window_map_add_list_xy[i].x+CS.itask_list_show_edit_window_map_add_list_xy[i].w;
				if(CS.itask_list_show_edit_window_map_add_list_xy[i].x+3>CS.vueObj.itask_list_show_edit_window_map_add_rect_x){
					if(CS.itask_list_show_edit_window_map_add_list_xy[i].x-3<CS.vueObj.itask_list_show_edit_window_map_add_rect_x){
						CS.vueObj.itask_list_show_edit_window_map_add_rect_x=CS.itask_list_show_edit_window_map_add_list_xy[i].x+15;
					}
				}
			}
		}
		
	}
	var i=CS.itask_list_show_edit_window_map_add_list.length;
	CS.itask_list_show_edit_window_map_add_list[i] = new Konva.Rect({
		x: CS.vueObj.itask_list_show_edit_window_map_add_rect_x,
		y: CS.vueObj.itask_list_show_edit_window_map_add_rect_y,
		width: CS.vueObj.itask_list_show_edit_window_map_add_rect_w,
		height: CS.vueObj.itask_list_show_edit_window_map_add_rect_h,
		fill: color,
		opacity:0.5,
		draggable: true,
		id: "edit_window_map_rect"+"_"+CS.vueObj.itask_list_show_file_list_now_imgs_index+"_"+i,
	});
	
	CS.itask_list_show_edit_window_map_added_list["edit_window_map_rect"+"_"+CS.vueObj.itask_list_show_file_list_now_imgs_index+"_"+i]=CS.itask_list_show_edit_window_map_add_list[i];
	//枠追加
	CS.itask_list_show_edit_window_map_KVN_layer1.add(CS.itask_list_show_edit_window_map_add_list[CS.itask_list_show_edit_window_map_add_list.length-1]);
	CS.itask_list_show_edit_window_map_add_list_xy[i]={};
	CS.itask_list_show_edit_window_map_add_list_xy[i].x=CS.vueObj.itask_list_show_edit_window_map_add_rect_x;
	CS.itask_list_show_edit_window_map_add_list_xy[i].y=CS.vueObj.itask_list_show_edit_window_map_add_rect_y;
	CS.itask_list_show_edit_window_map_add_list_xy[i].w=CS.vueObj.itask_list_show_edit_window_map_add_rect_w;
	CS.itask_list_show_edit_window_map_add_list_xy[i].h=CS.vueObj.itask_list_show_edit_window_map_add_rect_h;
	CS.itask_list_show_edit_window_map_add_list_xy[i].imgs_index=CS.vueObj.itask_list_show_file_list_now_imgs_index;
	CS.itask_list_show_edit_window_map_add_list_xy[i].color=color;
	// const shape2 = shape1.clone({
		// x: CS.itask_list_show_edit_window_map_KVN_stage.width() / 2 + 10,
		// y: CS.itask_list_show_edit_window_map_KVN_stage.height() / 2 + 10,
		// fill: 'green',
	// });
	// CS.itask_list_show_edit_window_map_KVN_layer1.add(shape2);
	
	
	//コントロール機器追加
	const tr = new Konva.Transformer({
	id: "edit_window_map_rect_transfor"+"_"+CS.vueObj.itask_list_show_file_list_now_imgs_index+"_"+i,
	nodes: [CS.itask_list_show_edit_window_map_add_list[CS.itask_list_show_edit_window_map_add_list.length-1]],
	boundBoxFunc: (oldBox, newBox) => {
		const box = getClientRect(newBox);
		const isOut =
		box.x < 0 ||
		box.y < 0 ||
		box.x + box.width > CS.itask_list_show_edit_window_map_KVN_stage.width() ||
		box.y + box.height > CS.itask_list_show_edit_window_map_KVN_stage.height();
		if (isOut) {
			return oldBox;
		}
		CS.itask_list_show_edit_window_map_add_list_xy[i].x=box.x;
		CS.itask_list_show_edit_window_map_add_list_xy[i].y=box.y;
		CS.itask_list_show_edit_window_map_add_list_xy[i].w=box.width;
		CS.itask_list_show_edit_window_map_add_list_xy[i].h=box.height;
		
		CS.vueObj.itask_list_show_edit_window_map_add_rect_x=CS.itask_list_show_edit_window_map_add_list_xy[i].x;
		CS.vueObj.itask_list_show_edit_window_map_add_rect_y=CS.itask_list_show_edit_window_map_add_list_xy[i].y;
		CS.vueObj.itask_list_show_edit_window_map_add_rect_w=CS.itask_list_show_edit_window_map_add_list_xy[i].w;
		CS.vueObj.itask_list_show_edit_window_map_add_rect_h=CS.itask_list_show_edit_window_map_add_list_xy[i].h;
		
		CS.vueObj.itask_list_show_edit_window_map_add_rect_x=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_x,10);
		if(isNaN(CS.vueObj.itask_list_show_edit_window_map_add_rect_x)){
			CS.vueObj.itask_list_show_edit_window_map_add_rect_x=0;
		}
		CS.vueObj.itask_list_show_edit_window_map_add_rect_y=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_y,10);
		if(isNaN(CS.vueObj.itask_list_show_edit_window_map_add_rect_y)){
			CS.vueObj.itask_list_show_edit_window_map_add_rect_y=0;
		}
		CS.vueObj.itask_list_show_edit_window_map_add_rect_w=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_w,10);
		if(isNaN(CS.vueObj.itask_list_show_edit_window_map_add_rect_w)){
			CS.vueObj.itask_list_show_edit_window_map_add_rect_w=50;
		}
		CS.vueObj.itask_list_show_edit_window_map_add_rect_h=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_h,10);
		if(isNaN(CS.vueObj.itask_list_show_edit_window_map_add_rect_h)){
			CS.vueObj.itask_list_show_edit_window_map_add_rect_h=50;
		}
		
		return newBox;
	},
	});
	
	CS.itask_list_show_edit_window_map_added_list["edit_window_map_rect_transfor"+"_"+CS.vueObj.itask_list_show_file_list_now_imgs_index+"_"+i]=tr;
	
	CS.itask_list_show_edit_window_map_KVN_layer1.add(tr);
	tr.on('dragmove', () => {
	const boxes = tr.nodes().map((node) => node.getClientRect());
	const box = getTotalBox(boxes);
	tr.nodes().forEach((shape) => {
		const absPos = shape.getAbsolutePosition();
		const offsetX = box.x - absPos.x;
		const offsetY = box.y - absPos.y;
		const newAbsPos = { ...absPos };
		if (box.x < 0) {
			newAbsPos.x = -offsetX;
		}
		if (box.y < 0) {
			newAbsPos.y = -offsetY;
		}
		if (box.x + box.width > CS.itask_list_show_edit_window_map_KVN_stage.width()) {
			newAbsPos.x = CS.itask_list_show_edit_window_map_KVN_stage.width() - box.width - offsetX;
		}
		if (box.y + box.height > CS.itask_list_show_edit_window_map_KVN_stage.height()) {
			newAbsPos.y = CS.itask_list_show_edit_window_map_KVN_stage.height() - box.height - offsetY;
		}
		CS.itask_list_show_edit_window_map_add_list_xy[i].x=newAbsPos.x;
		CS.itask_list_show_edit_window_map_add_list_xy[i].y=newAbsPos.y;
		CS.itask_list_show_edit_window_map_add_list_xy[i].w=box.width;
		CS.itask_list_show_edit_window_map_add_list_xy[i].h=box.height;
		CS.vueObj.itask_list_show_edit_window_map_add_rect_x=CS.itask_list_show_edit_window_map_add_list_xy[i].x;
		CS.vueObj.itask_list_show_edit_window_map_add_rect_y=CS.itask_list_show_edit_window_map_add_list_xy[i].y;
		CS.vueObj.itask_list_show_edit_window_map_add_rect_w=CS.itask_list_show_edit_window_map_add_list_xy[i].w;
		CS.vueObj.itask_list_show_edit_window_map_add_rect_h=CS.itask_list_show_edit_window_map_add_list_xy[i].h;
		
		CS.vueObj.itask_list_show_edit_window_map_add_rect_x=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_x,10);
		if(isNaN(CS.vueObj.itask_list_show_edit_window_map_add_rect_x)){
			CS.vueObj.itask_list_show_edit_window_map_add_rect_x=0;
		}
		CS.vueObj.itask_list_show_edit_window_map_add_rect_y=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_y,10);
		if(isNaN(CS.vueObj.itask_list_show_edit_window_map_add_rect_y)){
			CS.vueObj.itask_list_show_edit_window_map_add_rect_y=0;
		}
		CS.vueObj.itask_list_show_edit_window_map_add_rect_w=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_w,10);
		if(isNaN(CS.vueObj.itask_list_show_edit_window_map_add_rect_w)){
			CS.vueObj.itask_list_show_edit_window_map_add_rect_w=50;
		}
		CS.vueObj.itask_list_show_edit_window_map_add_rect_h=parseInt(CS.vueObj.itask_list_show_edit_window_map_add_rect_h,10);
		if(isNaN(CS.vueObj.itask_list_show_edit_window_map_add_rect_h)){
			CS.vueObj.itask_list_show_edit_window_map_add_rect_h=50;
		}
		shape.setAbsolutePosition(newAbsPos);
		});
	});
}
CS.f_analysis=function(){
	var okflag=0;
	var file_tree_id_list=[];
	var itask_id_list=[];
	CS.itask_list_get_csv2_file_tree_name_list=[];
	var drive_id_list=[];
	var obj = {};
	for(var i=0;i<CS.vueObj.itask_list_show_file_list_now.length;i++){
		if(CS.vueObj.itask_list_show_file_list_now[i].delete_flag){
			file_tree_id_list.push(this.itask_list_show_file_list_now[i]["file_tree_id"]);
			itask_id_list.push(this.itask_list_show_file_list_now[i]["itask_id"]);
			CS.itask_list_get_csv2_file_tree_name_list.push(this.itask_list_show_file_list_now[i]["file_tree_name"]);
			drive_id_list.push(this.itask_list_show_file_list_now[i]["n0"]);
			okflag++;
		}
	}
	if(okflag<2 || okflag>3){
		alert("２～３行を選らんでください");
		return;
	}
	alert("工事中。。。");
}
CS.aitask_image_edit=function(){
	console.log("aitask_image_edit is run...");
	window.opener.CS.aitask_image_edit_putimages();
}
CS.aitask_image_edit2=function(){
	console.log("aitask_image_edit2 is run...");
	window.opener.CS.aitask_image_edit_putimages2();
}
CS.itask_list_show_edit_window_map_kingaku_change=function(konzenflag,index){
	if(konzenflag=="kon"){
		CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki[index]=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki[index].replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);});
		CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki[index]=(parseInt(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki[index].replaceAll(',', ''),10)).toLocaleString();
		CS.vueObj.$set(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki, index, CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_konki[index]);
	}else if(konzenflag=="zen"){
		CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_zenki[index]=CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_zenki[index].replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);});
		CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_zenki[index]=(parseInt(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_zenki[index].replaceAll(',', ''),10)).toLocaleString();
		CS.vueObj.$set(CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_zenki, index, CS.vueObj.itask_list_show_edit_window_map_a_kanjyo_list_zenki[index]);
	}
}
CS.aitask_image_edit_putimages2=function(){
	console.log("aitask_image_edit_putimages is run...");
	var param={};
	param["itask_list_show_file_list_now_imgs_index"]=CS.vueObj.itask_list_show_file_list_now_imgs_index;
	param["itask_list_show_file_list_now_imgs"]=CS.vueObj.itask_list_show_file_list_now_imgs;
	param["all_width"]=$("#itask_list_show_edit_window_img").width();
	param["all_height"]=$("#itask_list_show_edit_window_img").height();
	param["itask_list_show_edit_pana_tag_button_index"]=CS.vueObj.itask_list_show_edit_pana_tag_button_index;
	param["itask_list_show_edit_window_itask_type"]=CS.vueObj.itask_list_show_edit_window_itask_type;
	param["i_aitask_top_info"]=CS.vueObj.i_aitask_top_info;
	param["houjin_api_response"]=CS.itask_list_show_edit_window_manual_analyze_gemini_houjin_api_response;
	param["kojin_eazy_inputlist"]=CS.vueObj.kojin_eazy_inputlist;
	CS.aitask_image_edit.CS.aitask_image_edit_getimages(param);
}
CS.aitask_image_edit_putimages=function(){
	console.log("aitask_image_edit_putimages is run...");
	var param={};
	param["itask_list_show_file_list_now_imgs_index"]=CS.vueObj.itask_list_show_file_list_now_imgs_index;
	param["itask_list_show_file_list_now_imgs"]=CS.vueObj.itask_list_show_file_list_now_imgs;
	param["all_width"]=$("#itask_list_show_edit_window_img").width();
	param["all_height"]=$("#itask_list_show_edit_window_img").height();
	param["itask_list_show_edit_pana_tag_button_index"]=CS.vueObj.itask_list_show_edit_pana_tag_button_index;
	param["itask_list_show_edit_window_itask_type"]=CS.vueObj.itask_list_show_edit_window_itask_type;
	param["i_aitask_top_info"]=CS.vueObj.i_aitask_top_info;
	param["kojin_eazy_inputlist"]=CS.vueObj.kojin_eazy_inputlist;
	CS.aitask_image_edit.CS.aitask_image_edit_getimages(param);
}
CS.aitask_image_edit_getimages=function(param){
	console.log("aitask_image_edit_getimages is run...");
	CS.vueObj.itask_list_show_edit_window_tool_show=true;
	CS.vueObj.i_aitask_top_info=param["i_aitask_top_info"];
	CS.vueObj.itask_list_show_edit_pana_tag_button_index=param["itask_list_show_edit_pana_tag_button_index"];
	CS.vueObj.itask_list_show_edit_window_itask_type=param["itask_list_show_edit_window_itask_type"];
	CS.vueObj.itask_list_show_edit_window_map_flag=CS.vueObj.itask_list_show_edit_pana_tag_button_index;
	CS.vueObj.itask_list_show_edit_window_map_step="B";
	if(CS.vueObj.itask_list_show_edit_window_itask_type.indexOf("houjin")==-1){
		CS.aitask_image_edit_lkam="#fb7373";
		CS.aitask_image_edit_lkin="#7391fb";
		CS.aitask_image_edit_mkam="#f442dc";
		CS.aitask_image_edit_mkin="#42f2f4";
		CS.aitask_image_edit_rkam="#f4b442";
		CS.aitask_image_edit_rkin="#42f45c";
	}
	

	CS.itask_list_show_edit_window_map_add_list=[];
	CS.itask_list_show_edit_window_map_add_list_xy=[];
	CS.itask_list_show_edit_window_map_added_list={};
	CS.vueObj.itask_list_show_file_list_now_imgs_index=param["itask_list_show_file_list_now_imgs_index"];
	CS.vueObj.kojin_eazy_inputlist=param["kojin_eazy_inputlist"];
	CS.vueObj.itask_list_show_file_list_now_imgs=[];
	for(var i=0;i<param["itask_list_show_file_list_now_imgs"].length;i++){
		CS.vueObj.itask_list_show_file_list_now_imgs[i]=param["itask_list_show_file_list_now_imgs"][i];
	}
	CS.vueObj.itask_list_show_edit_window_map_kakudo=[];
	for(var i=0;i<CS.vueObj.itask_list_show_file_list_now_imgs.length;i++){
		CS.vueObj.itask_list_show_edit_window_map_kakudo[i]=0;
	}
	CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
	CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index];
	CS.itask_list_show_edit_window_canvas_tmp_img.onload = function(){
		param["all_width"]=CS.itask_list_show_edit_window_canvas_tmp_img.naturalWidth;
		param["all_height"]=CS.itask_list_show_edit_window_canvas_tmp_img.naturalHeight;
		if(param["all_width"]>window.innerWidth){
			var hiritu=window.innerWidth/param["all_width"];
			param["all_width"]=window.innerWidth;
			param["all_height"]=CS.toI(param["all_height"]*hiritu);
		}
		toph=window.innerHeight-120;
		if(param["all_height"]>toph){
			var hiritu=toph/param["all_height"];
			param["all_height"]=toph;
			param["all_width"]=CS.toI(param["all_width"]*hiritu);
		}
		CS.itask_list_show_edit_window_map_KVN_width=param["all_width"];
		CS.itask_list_show_edit_window_map_KVN_height=param["all_height"];
		$("#itask_list_show_edit_window_canvas").prop('width',CS.itask_list_show_edit_window_map_KVN_width);
		$("#itask_list_show_edit_window_canvas").prop('height',CS.itask_list_show_edit_window_map_KVN_height);
		CS.itask_list_show_edit_window_canvas = document.getElementById('itask_list_show_edit_window_canvas');
		CS.itask_list_show_edit_window_canvas_ctx= CS.itask_list_show_edit_window_canvas.getContext('2d');		
		CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
		CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
		$("#itask_list_show_edit_window_canvas_div").empty();
		//画像をcanvasに設定
		CS.itask_list_show_edit_window_canvas_tmp_img.onload = function(){
			CS.itask_list_show_edit_window_canvas_ctx.drawImage(CS.itask_list_show_edit_window_canvas_tmp_img, 0, 0, CS.itask_list_show_edit_window_map_KVN_width, CS.itask_list_show_edit_window_map_KVN_height);
			CS.itask_list_show_edit_window_map_KVN_sample(false);
			// Gemini法人分析結果がある場合はステップDを自動表示（gemini_houjin_result.js）
			if (typeof CS.gemini_houjin_result_start === "function" && param["houjin_api_response"] && param["houjin_api_response"]["status"] === "OK") {
				CS.gemini_houjin_result_start(param["houjin_api_response"]);
			}
		}

	}
	
	
	

}
CS.aitask_image_edit_closewindow_call=function(){
	window.opener.CS.aitask_image_edit_closewindow();
}
CS.aitask_exlist_closewindow_call=function(){
	window.opener.CS.aitask_exlist_closewindow();
}
CS.aitask_exlist_closewindow=function(){
	if(typeof CS.aitask_exlist != "undefined" && CS.aitask_exlist != null){
		CS.aitask_exlist.close();
	}
}
CS.aitask_image_edit_closewindow=function(){
	if(typeof CS.aitask_image_edit != "undefined" && CS.aitask_image_edit != null){
		CS.aitask_image_edit.close();
	}
}
CS.aitask_exlist_show=function(){
	var obj = {};
	obj["action"] = "itask_getexlist";

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
			CS.vueObj.aitask_exlist=data["aitask_exlist"];
			CS.vueObj.aitask_exlist_kanjo_view_list=data["m_kanjo_view_list"];
			CS.vueObj.aitask_exlist_kanjo_view_list_from = JSON.parse(JSON.stringify(CS.vueObj.aitask_exlist_kanjo_view_list));
			CS.vueObj.aitask_exlist_kanjo_view_list_to = JSON.parse(JSON.stringify(CS.vueObj.aitask_exlist_kanjo_view_list));
		}
	});
}
CS.aitask_exlist_open=function(){
	const today = new Date();
	const milliseconds = today.getTime();
	let form_id = 'aitask_exlist'+milliseconds;
	let window_name = 'aitask_exlist'+milliseconds;
	window_name = 'aitask_exlist';
	var option =
		',width=' + 1024 +
		',height=' + 768 +
		',popup=' + 1 +
		',menubar=' + "no" +
		',noopener=' + "_top" +
		',toolbar=' + "no" +
		',location=' + "no" +
		',noopener=' + "no" +
		',status=' + "no" ;
	CS.aitask_exlist=window.open('', window_name, option); //新しいタブを開く
	
	let form = document.createElement('form'); // フォーム要素を宣言
	form.action = '/?aitask_exlist'; // 投げる先のURLを設定
	form.method = 'post'; // GETかPOST、今回はデータを送りたいのでpost
	form.style.display = 'none'; // 要素を画面に表示しない
	form.target = window_name; // 新しいタブがターゲット
	form.id = form_id; // 後で消すためにID指定
	document.body.appendChild(form); // HTMLのbody要素に作ったform要素を追加
	/**
	//input要素作成、今回は2つ作る
	let input1 = document.createElement('input'), input2 = document.createElement('input');
	input1.type = input2.type = 'hidden';
	//要素名と値を追加
	input1.name = 'hoge';
	input1.value = 'fuga';
	input2.name = 'hello';
	input2.value = 'world';
	//form要素に作ったinput要素を追加
	form.appendChild(input1);
	form.appendChild(input2);
	**/
	// 送信
	form.submit();
	CS.vueObj.aitask_common_pop_ac=true;
	// 後始末で削除
	document.getElementById(form_id).remove();
	
	// 親画面にシェードをかける処理を実施
	// １秒間隔で子画面の状態を監視
	CS.interval = setInterval(function()
	{
		// 子画面が閉じていたら
		if(!CS.aitask_exlist || CS.aitask_exlist.closed)
		{
			// 親画面のシェードを外す処理
			// Intervalを破棄
			clearInterval(CS.interval);
			CS.vueObj.aitask_common_pop_ac=false;
		// 画面が起動していたら
		}
		else
		{
			// 子画面にフォーカスを当てる
			if(!CS.aitask_exlist.document.hasFocus())
			{
				CS.aitask_exlist.focus();
			}
		}
	},500);
}
CS.aitask_exlist_find=function(str){
	var relist=[];
	for(var i=0;i<CS.vueObj.aitask_exlist_kanjo_view_list.length;i++){
		if(str==""){
			relist.push(CS.vueObj.aitask_exlist_kanjo_view_list[i]);
			continue;
		}
		var arr = Array.from(str);
		var okm=0;
		for(var j=0;j<arr.length;j++){
			if(CS.vueObj.aitask_exlist_kanjo_view_list[i]["m_kanjo_name"].indexOf(arr[j])!=-1){
				okm++;
			}
		}
		var addflag=false;
		if(arr.length==1){
			if(okm>0){
				addflag=true;
			}
		}else if(arr.length==2){
			if(okm==2){
				addflag=true;
			}
		}else if(arr.length>2){
			if(okm/arr.length>0.6){
				addflag=true;
			}
		}
		var arrn = CS.vueObj.aitask_exlist_kanjo_view_list[i]["m_kanjo_name"];
		var okm=CS.levenshteinDistance(str,arrn);
		CS.vueObj.aitask_exlist_kanjo_view_list[i]["okm"]=okm;
		if(addflag){
			relist.push(CS.vueObj.aitask_exlist_kanjo_view_list[i]);
		}
	}
	relist.sort(function(a,b){return( a["okm"] - b["okm"] );});
	var copyrelist=[];

	for(var i=0;i<relist.length;i++){
		if(str==relist[i]["m_kanjo_name"]){
			copyrelist.push(relist[i]);
		}
	}
	for(var i=0;i<relist.length;i++){
		if(str==relist[i]["m_kanjo_name"]){
		}else{
			copyrelist.push(relist[i]);
		}
	}
	
	return copyrelist;
}
CS.aitask_exlist_kanjo_keyword_change=function(){
	CS.vueObj.aitask_exlist_kanjo_view_list_from=CS.aitask_exlist_find(CS.vueObj.aitask_exlist_kanjo_from_kanjo_name);
	CS.vueObj.aitask_exlist_kanjo_view_list_to=CS.aitask_exlist_find(CS.vueObj.aitask_exlist_kanjo_to_kanjo_name)
}
CS.aitask_exlist_add=function(){
	var obj = {};
	obj["action"] = "aitask_exlist_add";
	obj["from_kanjo_code"] = CS.vueObj.aitask_exlist_kanjo_from_kanjo_code;
	obj["to_kanjo_code"] = CS.vueObj.aitask_exlist_kanjo_to_kanjo_code;

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
			CS.vueObj.aitask_exlist=data["aitask_exlist"];
		}
	});
}
CS.aitask_exlist_del=function(from_kanjo_code,to_kanjo_code){
	var obj = {};
	obj["action"] = "aitask_exlist_del";
	obj["from_kanjo_code"] = from_kanjo_code;
	obj["to_kanjo_code"] = to_kanjo_code;

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
			CS.vueObj.aitask_exlist=data["aitask_exlist"];
		}
	});
}
CS.itask_list_show_edit_window_map_process_img=function(){
	CS.vueObj.itask_list_show_edit_window_mab_area_flag=false;
	CS.vueObj.itask_list_show_edit_window_map_brightness_list=[];
	CS.vueObj.itask_list_show_edit_window_map_brightness_list.push({"value":-20,"name":"-1"});
	CS.vueObj.itask_list_show_edit_window_map_brightness_list.push({"value":40,"name":"1"});
	CS.vueObj.itask_list_show_edit_window_map_brightness_list.push({"value":60,"name":"2"});
	CS.vueObj.itask_list_show_edit_window_map_brightness_list.push({"value":80,"name":"3"});
	CS.vueObj.itask_list_show_edit_window_map_brightness_list.push({"value":100,"name":"4"});
	CS.vueObj.itask_list_show_edit_window_map_brightness_list.push({"value":120,"name":"5"});
	CS.vueObj.itask_list_show_edit_window_map_brightness_flag="A";
	CS.itask_list_show_edit_window_map_oldimgs=[];
	for(var i=0;i<CS.vueObj.itask_list_show_file_list_now_imgs.length;i++){
		CS.itask_list_show_edit_window_map_oldimgs[i]=CS.vueObj.itask_list_show_file_list_now_imgs[i]+"";
	}
	
	CS.itask_list_show_edit_window_map_add_rect_flag=true;
	CS.itask_list_show_edit_window_map_get_fullimg();
	
	//CS.itask_list_show_edit_window_map_KVN_onlyback();
}
CS.itask_list_show_edit_window_map_process_img_add_rect=function(){
	return;
	CS.itask_list_show_edit_window_map_add_list_xy[i]={};
	CS.itask_list_show_edit_window_map_add_list_xy[i].x=CS.vueObj.itask_list_show_edit_window_map_add_rect_x;
	CS.itask_list_show_edit_window_map_add_list_xy[i].y=CS.vueObj.itask_list_show_edit_window_map_add_rect_y;
	CS.itask_list_show_edit_window_map_add_list_xy[i].w=CS.vueObj.itask_list_show_edit_window_map_add_rect_w;
	CS.itask_list_show_edit_window_map_add_list_xy[i].h=CS.vueObj.itask_list_show_edit_window_map_add_rect_h;
	CS.itask_list_show_edit_window_map_add_list_xy[i].imgs_index=CS.vueObj.itask_list_show_file_list_now_imgs_index;
	CS.itask_list_show_edit_window_map_add_list_xy[i].color=color;
}
CS.itask_list_show_edit_window_map_get_fullimg=function(){
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
			CS.itask_list_show_edit_window_map_bakimage_src=CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index];
			CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index]=data["image"];
			CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
			CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index];
			CS.itask_list_show_edit_window_canvas_tmp_img.onload = function(){
				var param = {};
				param["all_width"]=CS.itask_list_show_edit_window_canvas_tmp_img.naturalWidth;
				param["all_height"]=CS.itask_list_show_edit_window_canvas_tmp_img.naturalHeight;
				if(param["all_width"]>window.innerWidth){
					var hiritu=window.innerWidth/param["all_width"];
					param["all_width"]=window.innerWidth;
					param["all_height"]=CS.toI(param["all_height"]*hiritu);
				}
				toph=window.innerHeight-120;
				if(param["all_height"]>toph){
					var hiritu=toph/param["all_height"];
					param["all_height"]=toph;
					param["all_width"]=CS.toI(param["all_width"]*hiritu);
				}
				CS.itask_list_show_edit_window_map_KVN_width=param["all_width"];
				CS.itask_list_show_edit_window_map_KVN_height=param["all_height"];
				$("#itask_list_show_edit_window_canvas").prop('width',CS.itask_list_show_edit_window_map_KVN_width);
				$("#itask_list_show_edit_window_canvas").prop('height',CS.itask_list_show_edit_window_map_KVN_height);
				CS.itask_list_show_edit_window_canvas = document.getElementById('itask_list_show_edit_window_canvas');
				CS.itask_list_show_edit_window_canvas_ctx= CS.itask_list_show_edit_window_canvas.getContext('2d');
				CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
				CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
				$("#itask_list_show_edit_window_canvas_div").empty();

				//画像をcanvasに設定
				CS.itask_list_show_edit_window_canvas_tmp_img.onload = function(){
					CS.itask_list_show_edit_window_canvas_ctx.drawImage(CS.itask_list_show_edit_window_canvas_tmp_img, 0, 0, CS.itask_list_show_edit_window_map_KVN_width, CS.itask_list_show_edit_window_map_KVN_height);
					CS.itask_list_show_edit_window_map_KVN_onlyback(false);
					CS.alert_error("元画像を取得できました");
					if(CS.itask_list_show_edit_window_map_add_rect_flag){
						CS.vueObj.itask_list_show_edit_window_mab_area_flag=false;
						CS.itask_list_show_edit_window_map_KVN_onlyback();
						CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
						CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index];
						CS.itask_list_show_edit_window_canvas_tmp_img.onload = function(){
							CS.itask_list_show_edit_window_map_make_canvas_src_W=CS.itask_list_show_edit_window_canvas_tmp_img.naturalWidth;
							CS.itask_list_show_edit_window_map_make_canvas_src_H=CS.itask_list_show_edit_window_canvas_tmp_img.naturalHeight;
						}
					}
				}
				
			}
		}
	});
}
//画像調整結果を保存せずに閉じる
CS.itask_list_show_edit_window_map_brightness_close=function(){
	CS.vueObj.itask_list_show_edit_window_map_brightness_flag=null;
	for(var i=0;i<CS.itask_list_show_edit_window_map_oldimgs.length;i++){
		CS.vueObj.itask_list_show_file_list_now_imgs[i]=CS.itask_list_show_edit_window_map_oldimgs[i];
	}

	CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
	CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
	$("#itask_list_show_edit_window_canvas_div").empty();

	//画像をcanvasに設定
	CS.itask_list_show_edit_window_canvas_tmp_img.onload = function(){
		CS.itask_list_show_edit_window_canvas_ctx.drawImage(CS.itask_list_show_edit_window_canvas_tmp_img, 0, 0, CS.itask_list_show_edit_window_map_KVN_width, CS.itask_list_show_edit_window_map_KVN_height);
		CS.itask_list_show_edit_window_map_KVN_sample(false);
		CS.itask_list_show_edit_window_map_restoration();
	}
	setTimeout(function(){
		CS.itask_list_show_edit_window_map_rotate();
	},100);
}
//画像調整結果を保存する
CS.itask_list_show_edit_window_map_brightness_save=function(){
	CS.vueObj.itask_list_show_edit_window_map_brightness_flag=null;
	//for(var i=0;i<CS.itask_list_show_edit_window_map_oldimgs.length;i++){
		//CS.vueObj.itask_list_show_file_list_now_imgs[i]=CS.itask_list_show_edit_window_map_oldimgs[i];
	//}
	CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
	CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
	$("#itask_list_show_edit_window_canvas_div").empty();

	//画像をcanvasに設定
	CS.itask_list_show_edit_window_canvas_tmp_img.onload = function(){
		CS.itask_list_show_edit_window_canvas_ctx.drawImage(CS.itask_list_show_edit_window_canvas_tmp_img, 0, 0, CS.itask_list_show_edit_window_map_KVN_width, CS.itask_list_show_edit_window_map_KVN_height);
		CS.itask_list_show_edit_window_map_KVN_sample(false);
		CS.itask_list_show_edit_window_map_restoration();
	}
	setTimeout(function(){
		CS.itask_list_show_edit_window_map_rotate();
	},100);
	var obj = {};
	obj["itask_pages_str"] = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0].replaceAll('data:image/jpeg;base64,', '');
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
			window.opener.CS.itask_list_show_edit_window_map_brightness_save_opener(CS.vueObj.itask_list_show_file_list_now_imgs_index+0,CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0]);
		}
	});
}
CS.itask_list_show_edit_window_map_brightness_save_opener=function(index,pagestr){
	CS.vueObj.itask_list_show_file_list_now_imgs[index]=pagestr;
}
//明るさ調整
CS.itask_list_show_edit_window_map_adjust_brightness=function(){
	var obj = {};
	obj["canvas_src"] = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index].replaceAll('data:image/jpeg;base64,', '');
	obj["adjust"] = CS.vueObj.itask_list_show_edit_window_map_adjust;
	obj["brightness"] = CS.vueObj.itask_list_show_edit_window_map_brightness;
	obj["action"] = "itask_list_show_edit_window_map_adjust_brightness";
	if(CS.vueObj.itask_list_show_edit_window_mab_area_flag){
		var cr=CS.itask_list_show_edit_window_map_add_tz_area_rc.getClientRect();
		var hihituw=CS.itask_list_show_edit_window_map_make_canvas_src_W/CS.itask_list_show_edit_window_map_KVN_width;
		obj["rx"] = CS.itask_list_show_edit_window_map_add_tz_area_rc.getX()*hihituw;
		obj["rw"] = cr.width*hihituw;
		var hihituh=CS.itask_list_show_edit_window_map_make_canvas_src_H/CS.itask_list_show_edit_window_map_KVN_height;
		obj["ry"] = CS.itask_list_show_edit_window_map_add_tz_area_rc.getY()*hihituw;
		obj["rh"] = cr.height*hihituw;
	}else{
		obj["rx"] = 0;
		obj["rw"] = CS.itask_list_show_edit_window_map_make_canvas_src_W;
		obj["ry"] = 0;
		obj["rh"] = CS.itask_list_show_edit_window_map_make_canvas_src_H;
	}
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
			CS.itask_list_show_edit_window_map_bakimage_src=CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index];
			CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index]=data["image"];
			CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
			CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index];
			CS.itask_list_show_edit_window_canvas_tmp_img.onload = function(){
				var param = {};
				param["all_width"]=CS.itask_list_show_edit_window_canvas_tmp_img.naturalWidth;
				param["all_height"]=CS.itask_list_show_edit_window_canvas_tmp_img.naturalHeight;
				if(param["all_width"]>window.innerWidth){
					var hiritu=window.innerWidth/param["all_width"];
					param["all_width"]=window.innerWidth;
					param["all_height"]=CS.toI(param["all_height"]*hiritu);
				}
				toph=window.innerHeight-120;
				if(param["all_height"]>toph){
					var hiritu=toph/param["all_height"];
					param["all_height"]=toph;
					param["all_width"]=CS.toI(param["all_width"]*hiritu);
				}
				CS.itask_list_show_edit_window_map_KVN_width=param["all_width"];
				CS.itask_list_show_edit_window_map_KVN_height=param["all_height"];
				$("#itask_list_show_edit_window_canvas").prop('width',CS.itask_list_show_edit_window_map_KVN_width);
				$("#itask_list_show_edit_window_canvas").prop('height',CS.itask_list_show_edit_window_map_KVN_height);
				CS.itask_list_show_edit_window_canvas = document.getElementById('itask_list_show_edit_window_canvas');
				CS.itask_list_show_edit_window_canvas_ctx= CS.itask_list_show_edit_window_canvas.getContext('2d');
				CS.itask_list_show_edit_window_canvas_tmp_img = new Image();
				CS.itask_list_show_edit_window_canvas_tmp_img.src = CS.vueObj.itask_list_show_file_list_now_imgs[CS.vueObj.itask_list_show_file_list_now_imgs_index+0];
				$("#itask_list_show_edit_window_canvas_div").empty();

				//画像をcanvasに設定
				CS.itask_list_show_edit_window_canvas_tmp_img.onload = function(){
					CS.itask_list_show_edit_window_canvas_ctx.drawImage(CS.itask_list_show_edit_window_canvas_tmp_img, 0, 0, CS.itask_list_show_edit_window_map_KVN_width, CS.itask_list_show_edit_window_map_KVN_height);
					CS.vueObj.itask_list_show_edit_window_mab_area_flag=false;
					CS.itask_list_show_edit_window_map_KVN_onlyback(false);
					CS.alert_error("明るさとコントラスト調整できました");
				}
			}
			
		}
	});
}
CS.aitask_pop_main_keydown=function(){
	console.log("aitask_pop_main_keydown");
	console.log($("#aitask_pop_main").outerWidth(true));
	console.log($("#aitask_pop_main").outerHeight(true));
	CS.aitask_pop_main_W=$("#aitask_pop_main").outerWidth(true);
	CS.aitask_pop_main_H=$("#aitask_pop_main").outerHeight(true);
	CS.aitask_pop_main_startx=event.pageX;
	CS.aitask_pop_main_starty=event.pageY;
	var  element = document.getElementById('aitask_pop_main');
	var rect = element.getBoundingClientRect();
	CS.aitask_pop_main_rectx=rect.left;
	CS.aitask_pop_main_recty=rect.top;
	CS.aitask_pop_main_keydown_flag=true;

}
CS.aitask_pop_main_mouseup=function(){
	CS.aitask_pop_main_keydown_flag=false;
}
CS.aitask_pop_main_mousemove=function(){
	if(CS.aitask_pop_main_keydown_flag){
		var  element = document.getElementById('aitask_pop_main');
		var rect = element.getBoundingClientRect();
		var kyoriw=event.pageX-CS.aitask_pop_main_startx;
		var kyorih=event.pageY-CS.aitask_pop_main_starty;
		// return;
		$("#aitask_pop_main").css({
			left: ($("#aitask_pop_main").outerWidth(true)/2+CS.aitask_pop_main_rectx+kyoriw)+'px', // X座標
			top: ($("#aitask_pop_main").outerHeight(true)/2+CS.aitask_pop_main_recty+kyorih)+'px' // Y座標
		});
	}
}
CS.itask_list_show_edit_window_set_me=function(){
	if(CS.vueObj.itask_list_show_edit_window_flag){
		var obj = {};
		obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
		obj["action"] = "itask_list_show_edit_window_set_me";
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
			}
		});
	}
}
CS.itask_list_show_edit_window_map_manual=function(){
	const today = new Date();
	const milliseconds = today.getTime();
	let window_name = 'mapmantag';
	let form_id = 'mapmantag';
	if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==1){
		var option =
			',width=' + 1024 +
			',height=' + 768 +
			',popup=' + 1 +
			',menubar=' + "no" +
			',noopener=' + "_top" +
			',toolbar=' + "no" +
			',location=' + "no" +
			',noopener=' + "no" +
			',status=' + "no" ;
		window.open('', window_name, option);
		let form = document.createElement('form'); // フォーム要素を宣言
		form.action = '/img/mapmantag1.jpg?t='+milliseconds; // 投げる先のURLを設定
		form.method = 'post'; // GETかPOST、今回はデータを送りたいのでpost
		form.style.display = 'none'; // 要素を画面に表示しない
		form.target = window_name; // 新しいタブがターゲット
		form.id = form_id; // 後で消すためにID指定
		document.body.appendChild(form); // HTMLのbody要素に作ったform要素を追加
		form.submit();
	}else if(CS.vueObj.itask_list_show_edit_pana_tag_button_index==2){
		var option =
			',width=' + 1024 +
			',height=' + 768 +
			',popup=' + 1 +
			',menubar=' + "no" +
			',noopener=' + "_top" +
			',toolbar=' + "no" +
			',location=' + "no" +
			',noopener=' + "no" +
			',status=' + "no" ;
		window.open('', window_name, option);
		let form = document.createElement('form'); // フォーム要素を宣言
		form.action = '/img/mapmantag2.jpg?t='+milliseconds; // 投げる先のURLを設定
		form.method = 'post'; // GETかPOST、今回はデータを送りたいのでpost
		form.style.display = 'none'; // 要素を画面に表示しない
		form.target = window_name; // 新しいタブがターゲット
		form.id = form_id; // 後で消すためにID指定
		document.body.appendChild(form); // HTMLのbody要素に作ったform要素を追加
		form.submit();
	}
}


CS.itask_list_show_edit_window_ana2 = function() {
	var mapstep=["A","B","C","D"];
	if(CS.vueObj.itask_list_show_edit_window_map_flag===-1 || mapstep.includes(CS.vueObj.itask_list_show_edit_window_map_step)){
		//手動分析準備
		if(CS.vueObj.itask_list_show_edit_window_map_step=="A" || CS.vueObj.itask_list_show_edit_window_map_step=="D"){
			
			const today = new Date();
			const milliseconds = today.getTime();
			let form_id = 'aitask_image_edit'+milliseconds;
			let window_name = 'aitask_image_edit'+milliseconds;
			window_name = 'aitask_image_edit';
			var option =
				',width=' + 1024 +
				',height=' + 768 +
				',popup=' + 1 +
				',menubar=' + "no" +
				',noopener=' + "_top" +
				',toolbar=' + "no" +
				',location=' + "no" +
				',noopener=' + "no" +
				',status=' + "no" ;
			CS.aitask_image_edit=window.open('', window_name, option); //新しいタブを開く
			
			let form = document.createElement('form'); // フォーム要素を宣言
			form.action = '/?aitask_image_edit'; // 投げる先のURLを設定
			form.method = 'post'; // GETかPOST、今回はデータを送りたいのでpost
			form.style.display = 'none'; // 要素を画面に表示しない
			form.target = window_name; // 新しいタブがターゲット
			form.id = form_id; // 後で消すためにID指定
			document.body.appendChild(form); // HTMLのbody要素に作ったform要素を追加
			/**
			//input要素作成、今回は2つ作る
			let input1 = document.createElement('input'), input2 = document.createElement('input');
			input1.type = input2.type = 'hidden';
			//要素名と値を追加
			input1.name = 'hoge';
			input1.value = 'fuga';
			input2.name = 'hello';
			input2.value = 'world';
			//form要素に作ったinput要素を追加
			form.appendChild(input1);
			form.appendChild(input2);
			**/
			// 送信
			form.submit();
			CS.vueObj.aitask_common_pop_ac=true;
			// 後始末で削除
			document.getElementById(form_id).remove();
			
			// 親画面にシェードをかける処理を実施
			// １秒間隔で子画面の状態を監視
			CS.interval = setInterval(function()
			{
				// 子画面が閉じていたら
				if(!CS.aitask_image_edit || CS.aitask_image_edit.closed)
				{
					// 親画面のシェードを外す処理
					// Intervalを破棄
					clearInterval(CS.interval);
					CS.vueObj.aitask_common_pop_ac=false;
				// 画面が起動していたら
				}
				else
				{
					// 子画面にフォーカスを当てる
					if(!CS.aitask_image_edit.document.hasFocus())
					{
						CS.aitask_image_edit.focus();
					}
				}
			},500);
			
			return;
		}else if(CS.vueObj.itask_list_show_edit_window_map_step=="B"){
			var xyl=0;
			for(var i=CS.itask_list_show_edit_window_map_add_list_xy.length-1;i>=0;i--){
				if(CS.itask_list_show_edit_window_map_add_list_xy[i].w!=0){
					xyl++;
				}
			}
			if(xyl==0){
				alert("エリアを指定してください");
				return;
			}
			CS.itask_list_show_edit_window_map_draw_fff(CS.vueObj.itask_list_show_file_list_now_imgs_index);
			CS.vueObj.itask_list_show_edit_window_map_step="C";
		}else if(CS.vueObj.itask_list_show_edit_window_map_step=="C"){
			var xyl=0;
			for(var i=CS.itask_list_show_edit_window_map_add_list_xy.length-1;i>=0;i--){
				if(CS.itask_list_show_edit_window_map_add_list_xy[i].w!=0){
					xyl++;
				}
			}
			if(xyl==0){
				alert("エリアを指定してください");
				return;
			}
			CS.itask_list_show_edit_window_map_canvas_src=[];
			CS.del_line_str_right=[];
			CS.itask_list_show_edit_window_map_kara_list=[];
			CS.vueObj.itaskloadnig="aitask_pop_main";
			CS.vueObj.aitask_common_pop_ac=true;
			CS.itask_list_show_edit_window_ana2_flag=true;
			CS.itask_list_show_edit_window_map_make_canvas_src(0);
		}else{
			CS.vueObj.itask_list_show_edit_window_map_flag=CS.vueObj.itask_list_show_edit_pana_tag_button_index;
		}
	}else{
		//手動分析実施
		CS.vueObj.itask_list_show_edit_window_map_flag=-1;
		CS.vueObj.itask_list_show_edit_window_map_step="A";
	}
}
CS.itask_list_show_edit_window_ana2_do=function(){
	var obj = {};
	obj["itask_id"] = CS.vueObj.i_aitask_top_info["itask_id"];
	obj["action"] = "itask_list_show_edit_window_ana2";
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
			console.log("itask_list_show_edit_window_ana2 is complete" );
		}
	});
}
function toHalfWidthNormalized(value, numericOnly) {
  if (value == null) return '';
  let s = String(value).normalize('NFKC');
  if (numericOnly) s = s.replace(/[^0-9.\-]/g, '');
  return s;
}

// 子孫 input をまとめて面倒みる v-halfwidth-scope
// 使い方例： v-halfwidth-scope="{ idPattern: '^itask_list_show_edit_pana_input0_.+', numeric: true }"
Vue.directive('halfwidth-scope', {
  bind(el, binding) {
    const opts = binding.value || {};
    const regex = new RegExp(opts.idPattern || '.*'); // IDで絞り込み
    const numericOnly = !!opts.numeric;

    let composingSet = new WeakSet();

    const normalizeNow = (inputEl) => {
      const old = inputEl.value;
      const normalized = toHalfWidthNormalized(old, numericOnly);
      if (normalized !== old) {
        const start = inputEl.selectionStart, end = inputEl.selectionEnd;
        inputEl.value = normalized;
        inputEl.dispatchEvent(new Event('input', { bubbles: true }));
        if (start != null && end != null) {
          const shift = normalized.length - old.length;
          inputEl.setSelectionRange(start + shift, end + shift);
        }
      }
    };

    const onCompStart = (e) => {
      if (!(e.target instanceof HTMLInputElement)) return;
      if (!regex.test(e.target.id)) return;
      composingSet.add(e.target);
    };

    const onCompEnd = (e) => {
      if (!(e.target instanceof HTMLInputElement)) return;
      if (!regex.test(e.target.id)) return;
      composingSet.delete(e.target);
      normalizeNow(e.target);
    };

    const onInput = (e) => {
      if (!(e.target instanceof HTMLInputElement)) return;
      if (!regex.test(e.target.id)) return;
      if (composingSet.has(e.target)) return; // 変換確定後に
      normalizeNow(e.target);
    };

    const onFocus = (e) => {
      if (e.target instanceof HTMLInputElement && regex.test(e.target.id)) {
        normalizeNow(e.target);
      }
    };
    const onBlur = onFocus;

    // 親1か所にキャプチャで付与（子孫の input に効く）
    el.addEventListener('compositionstart', onCompStart, true);
    el.addEventListener('compositionend', onCompEnd, true);
    el.addEventListener('input', onInput, true);
    el.addEventListener('focus', onFocus, true);
    el.addEventListener('blur', onBlur, true);
  }
});
// 半角→全角（ASCIIとスペースを全角化、半角ｶﾀｶﾅ等はNFKCで全角化）
function toFullWidthOnly(s) {
  if (s == null) return '';
  // まずNFKCで半角カナ等を全角へ
  s = String(s).normalize('NFKC');
  // ASCII(0x20-0x7E)を全角へ、空白は全角スペースへ
  return s.replace(/[\u0020-\u007E]/g, ch => {
    if (ch === ' ') return '\u3000';               // 全角スペース
    return String.fromCharCode(ch.charCodeAt(0) + 0xFEE0);
  });
}

// v-fullwidth-only：入力/確定/フォーカスアウトで常に全角化（貼り付けも）
Vue.directive('fullwidth-only', {
  bind(el) {
    let composing = false;
    const normalizeNow = (el) => {
      const before = el.value;
      const after  = toFullWidthOnly(before);
      if (after !== before) {
        const s = el.selectionStart, e = el.selectionEnd;
        el.value = after;
        // v-modelへ反映
        el.dispatchEvent(new Event('input', { bubbles: true }));
        // キャレット維持できる範囲で復元
        if (s != null && e != null) {
          const diff = after.length - before.length;
          el.setSelectionRange(s + diff, e + diff);
        }
      }
    };

    el.addEventListener('compositionstart', () => { composing = true; }, true);
    el.addEventListener('compositionend',   (e) => { composing = false; normalizeNow(e.target); }, true);
    el.addEventListener('input',            (e) => { if (!composing) normalizeNow(e.target); }, true);
    el.addEventListener('blur',             (e) => { normalizeNow(e.target); }, true);

    // 貼り付け時も全角化
    el.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text');
      const fw = toFullWidthOnly(text);
      const { selectionStart: s, selectionEnd: epos, value } = el;
      el.value = value.slice(0, s) + fw + value.slice(epos);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      const pos = s + fw.length;
      el.setSelectionRange(pos, pos);
    }, true);
  }
});
CS.itask_list_show_edit_window_gemini_window_open = function() {
	const today = new Date();
	const milliseconds = today.getTime();
	let form_id = 'aitask_image_edit'+milliseconds;
	let window_name = 'aitask_image_edit'+milliseconds;
	window_name = 'aitask_image_edit';
	var option =
		',width=' + 1024 +
		',height=' + 768 +
		',popup=' + 1 +
		',menubar=' + "no" +
		',noopener=' + "_top" +
		',toolbar=' + "no" +
		',location=' + "no" +
		',noopener=' + "no" +
		',status=' + "no" ;
	CS.aitask_image_edit=window.open('', window_name, option); //新しいタブを開く
	
	let form = document.createElement('form'); // フォーム要素を宣言
	form.action = '/?aitask_image_edit2'; // 投げる先のURLを設定
	form.method = 'post'; // GETかPOST、今回はデータを送りたいのでpost
	form.style.display = 'none'; // 要素を画面に表示しない
	form.target = window_name; // 新しいタブがターゲット
	form.id = form_id; // 後で消すためにID指定
	document.body.appendChild(form); // HTMLのbody要素に作ったform要素を追加
	/**
	//input要素作成、今回は2つ作る
	let input1 = document.createElement('input'), input2 = document.createElement('input');
	input1.type = input2.type = 'hidden';
	//要素名と値を追加
	input1.name = 'hoge';
	input1.value = 'fuga';
	input2.name = 'hello';
	input2.value = 'world';
	//form要素に作ったinput要素を追加
	form.appendChild(input1);
	form.appendChild(input2);
	**/
	// 送信
	form.submit();
	CS.vueObj.aitask_common_pop_ac=true;
	// 後始末で削除
	document.getElementById(form_id).remove();
	
	// 親画面にシェードをかける処理を実施
	// １秒間隔で子画面の状態を監視
	CS.interval = setInterval(function()
	{
		// 子画面が閉じていたら
		if(!CS.aitask_image_edit || CS.aitask_image_edit.closed)
		{
			// 親画面のシェードを外す処理
			// Intervalを破棄
			clearInterval(CS.interval);
			CS.vueObj.aitask_common_pop_ac=false;
		// 画面が起動していたら
		}
		else
		{
			// 子画面にフォーカスを当てる
			if(!CS.aitask_image_edit.document.hasFocus())
			{
				CS.aitask_image_edit.focus();
			}
		}
	},500);
	
	return;
}