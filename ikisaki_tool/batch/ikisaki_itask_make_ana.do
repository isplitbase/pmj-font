<?php
/*
 * 強力分析バッチ (cron から毎分実行)
 *
 *   一覧の「強力分析」(itask_ana_request.do) で登録されたキュー i_itask_queue_ana を1件ずつ処理する。
 *     ページ画像 → door(-real) → pmj-ana(-real) /analyze (Analygent と同じ方式で読み取り + 勘定科目マスタ照合)
 *     → 勘定科目(i_kanjo_info)を置き換え、決算日を上書き、精査ステータスを 0(精査待) にする
 *   ステータス: 分析中 m_itask.status=1(登録時) / 成功 9 / 失敗 2(要確認)
 *
 *   ikisaki_itask_make.do は変更していない。後処理(勘定科目の組み立て・DB 書き込み)は
 *   ikisaki_itask_make.do の次の部分の写しで、変更箇所には [make_ana] を付けている。
 *     - change_wrong_kanjyo            (make.do 146-252)
 *     - itask_coke_pana の後処理       (make.do 1330-2170) → ana_build_kanjo()
 *   写さなかったもの: 画像化・ページ画像/機密情報の削除と再登録、決算日のロジック(再分析で壊れる)、
 *   i_aitask_top_info.type の全行 UPDATE。会社コードは今の値を残す。
 *
 *   door の URL は itask_aitext_analyze.do と同じ(/data/hosei_door.conf。無ければ本番 pmj-door-real)。
 *   ログ: /data/pmj_cron/ikisaki_itask_make_ana.log
 */
chdir("/var/www/html/ikisaki_tool/batch/");
include '../../apis/common.php';
// ID トークン取得(get_cloud_run_id_token_keieidangi)・KEIEIDANGI_SA_JSON
require_once '../ikisaki_itask_tool/keieidangi_call_ai.do';
// AITEXT_DOOR_URL・ページ画像の読み込み(itask_aitext_page_images / itask_aitext_page_raw)
require_once '../ikisaki_itask_tool/itask_aitext_analyze.do';
if (!$link) { exit(); }

// ---- make.do 146-252 の写し ----
function change_wrong_kanjyo($kanjo_code,$m_kanjo_name,$kanjo_list,$oder,$family){
	$okflag=false;
	$kanjo_code_list=array();
	if($kanjo_code!=null){
		$kanjo_code_list=explode("_",$kanjo_code);
	}
	if(count($kanjo_code_list)>4){
		if($oder=1 and $family=3){
			if(intval($kanjo_code_list[0])==$oder and intval($kanjo_code_list[1])>=$family){
				$okflag=true;
			}
		}
		if($oder=1 and $family=4){
			if(intval($kanjo_code_list[0])==$oder and intval($kanjo_code_list[1])>=$family){
				$okflag=true;
			}
		}
		if($oder=1 and $family=5){
			if(intval($kanjo_code_list[0])==$oder and intval($kanjo_code_list[1])>=$family){
				$okflag=true;
			}
		}
		if($oder=1 and $family=8){
			if(intval($kanjo_code_list[0])==$oder and intval($kanjo_code_list[1])>=$family){
				$okflag=true;
			}
		}
	}
	if($okflag){
		return null;
	}
	
	for($i=0;$i<count($kanjo_list);$i++){
		if($m_kanjo_name==$kanjo_list[$i]["m_kanjo_name"]){
			if($oder=1 and $family=3){
				$kanjo_code_list=explode("_",$kanjo_list[$i]["m_kanjo_code"]);
				if(intval($kanjo_code_list[0])==$oder and intval($kanjo_code_list[1])>=$family){
					return $kanjo_list[$i];
				}
			}
			if($oder=1 and $family=4){
				$kanjo_code_list=explode("_",$kanjo_list[$i]["m_kanjo_code"]);
				if(intval($kanjo_code_list[0])==$oder and intval($kanjo_code_list[1])>=$family){
					return $kanjo_list[$i];
				}
			}
			if($oder=1 and $family=5){
				$kanjo_code_list=explode("_",$kanjo_list[$i]["m_kanjo_code"]);
				if(intval($kanjo_code_list[0])==$oder and intval($kanjo_code_list[1])>=$family){
					return $kanjo_list[$i];
				}
			}
			if($oder=1 and $family=8){
				$kanjo_code_list=explode("_",$kanjo_list[$i]["m_kanjo_code"]);
				if(intval($kanjo_code_list[0])==$oder and intval($kanjo_code_list[1])>=$family){
					return $kanjo_list[$i];
				}
			}
		}
	}
	for($i=0;$i<count($kanjo_list);$i++){
		$nextflag=false;
		if($oder=1 and $family=3){
			$kanjo_code_list=explode("_",$kanjo_list[$i]["m_kanjo_code"]);
			if(intval($kanjo_code_list[0])==$oder and intval($kanjo_code_list[1])>=$family){
				$nextflag=true;
			}
		}
		if($oder=1 and $family=4){
			$kanjo_code_list=explode("_",$kanjo_list[$i]["m_kanjo_code"]);
			if(intval($kanjo_code_list[0])==$oder and intval($kanjo_code_list[1])>=$family){
				$nextflag=true;
			}
		}
		if($oder=1 and $family=5){
			$kanjo_code_list=explode("_",$kanjo_list[$i]["m_kanjo_code"]);
			if(intval($kanjo_code_list[0])==$oder and intval($kanjo_code_list[1])>=$family){
				$nextflag=true;
			}
		}
		if($oder=1 and $family=8){
			$kanjo_code_list=explode("_",$kanjo_list[$i]["m_kanjo_code"]);
			if(intval($kanjo_code_list[0])==$oder and intval($kanjo_code_list[1])>=$family){
				$nextflag=true;
			}
		}
		if($nextflag){
			$sim = similar_text($kanjo_list[$i]["m_kanjo_name"], $m_kanjo_name, $perc);
			if(mb_strlen($m_kanjo_name)==1){
				if($sim>0){
					return $kanjo_list[$i];
				}
			}
			if(mb_strlen($m_kanjo_name)==2){
				if($sim>1){
					return $kanjo_list[$i];
				}
			}
			if(mb_strlen($m_kanjo_name)>2){
				if($perc>60){
					return $kanjo_list[$i];
				}
			}
		}
	}
	return null;
}

// ---- make.do 1330-2170 (itask_coke_pana の後処理) の写し ----
//   $jsoncode : pmj-ana の result(v2ac と同じ形)。個人は document_judgment_flag="kojin"
//   返り値    : {"bad": "bad" | "", "rows": 書き込んだ行数, "insert_error": 失敗時のメッセージ}
function ana_build_kanjo($jsoncode, $itask_id){
	global $link;
	$putmobj=array();
	$time_start=microtime(true);
	ob_start();     // 元の処理のデバッグ出力(echo / var_dump)は捨てる
	$detail_list=$jsoncode["format_info"]["cols"][0]["block_result"]["detail"];
	echo "\n count detail_list is :".count($detail_list)."\n";
	$kanjo_code_list=array();
	for($i=0;$i<count($detail_list);$i++){
		$detail=$detail_list[$i];
		if(count($detail["candidate"])>0){
			for($j=0;$j<count($detail["candidate"]);$j++){
				if($detail_list[$i]["tabindex"]==4 or $detail_list[$i]["tabindex"]=="4"){
					$detail_list[$i]["candidate"][$j]["order"]=1;
					$detail_list[$i]["candidate"][$j]["tabindex"]=4;
				}
				$kanjo_code=$detail["candidate"][$j]["order"]."_".$detail["candidate"][$j]["family"]."_".$detail["candidate"][$j]["genus"]."_".$detail["candidate"][$j]["variety"];
				array_push($kanjo_code_list,"'".$kanjo_code."'");
			}
		}
	}
	$sortmap=array();
	$kanjo_list=array();
	if(count($kanjo_code_list)>0){
		$sqlstr="SELECT * FROM m_kanjo_view;";
		$rs=runsql(__FILE__,$sqlstr);
		while($row=mysql_fetch_assoc($rs)) {
			$sortmap[$row["m_kanjo_code"]]=$row["sort"];
			$tmpobj=array();
			$tmpobj["m_kanjo_code"]=$row["m_kanjo_code"];
			$tmpobj["m_kanjo_name"]=$row["m_kanjo_name"];
			$tmpobj["property"]=$row["property"];
			$tmpobj["abc_flag"]=$row["abc_flag"];
			$kanjo_code_list=explode("_",$row["m_kanjo_code"]);
			$tmpobj["order_code"]=$kanjo_code_list[0];
			$tmpobj["family_code"]=$kanjo_code_list[1];
			$tmpobj["genus_code"]=$kanjo_code_list[2];
			$tmpobj["species_code"]=$kanjo_code_list[3];
			$tmpobj["variety_code"]=$kanjo_code_list[4];
			array_push($kanjo_list,$tmpobj);
		}
	}
	runsql(__FILE__,"DELETE FROM i_kanjo_info WHERE aitask_id=$itask_id;");
	
	
	
	$itask_list_show_items_search_other_items=array();
	$itask_list_show_items_search_other_items["売上高"]="o0";
	$itask_list_show_items_search_other_items["売上原価"]="o1";
	$itask_list_show_items_search_other_items["売上総利益"]="o2";
	$itask_list_show_items_search_other_items["販売費一般管理費"]="o3";
	$itask_list_show_items_search_other_items["営業利益"]="o4";
	$itask_list_show_items_search_other_items["営業外収益"]="o5";
	$itask_list_show_items_search_other_items["営業外費用"]="o6";
	$itask_list_show_items_search_other_items["経常利益"]="o7";
	$itask_list_show_items_search_other_items["特別利益"]="o8";
	$itask_list_show_items_search_other_items["特別損失"]="o9";
	$itask_list_show_items_search_other_items["税引前当期利益"]="o10";
	$itask_list_show_items_search_other_items["有形固定資産"]="o11";
	$itask_list_show_items_search_other_items["無形固定資産"]="o12";
	$itask_list_show_items_search_other_items["投資その他の資産"]="o13";
	$itask_list_show_items_search_other_items["繰延資産"]="o14";
	$itask_list_show_items_search_other_items["固定資産合計"]="o15";
	$itask_list_show_items_search_other_items["資産の部合計"]="o16";
	$itask_list_show_items_search_other_items["流動負債"]="o17";
	$itask_list_show_items_search_other_items["固定負債"]="o18";
	$itask_list_show_items_search_other_items["負債の部合計"]="o19";
	$itask_list_show_items_search_other_items["資本金"]="o20";
	$itask_list_show_items_search_other_items["資本剰余金"]="o21";
	$itask_list_show_items_search_other_items["利益準備金"]="o22";
	$itask_list_show_items_search_other_items["その他の利益剰余金"]="o23";
	$itask_list_show_items_search_other_items["利益剰余金"]="o24";
	$itask_list_show_items_search_other_items["自己株式"]="o25";
	$itask_list_show_items_search_other_items["株主資本合計"]="o26";
	$itask_list_show_items_search_other_items["評価換算差額等"]="o27";
	$itask_list_show_items_search_other_items["新株予約権"]="o28";
	$itask_list_show_items_search_other_items["非支配株主持分"]="o29";
	$itask_list_show_items_search_other_items["純資産合計"]="o30";
	$itask_list_show_items_search_other_items["負債及び純資産合計"]="o31";
	$itask_list_show_items_search_other_items_code=array();
	$itask_list_show_items_search_other_items_code[0]="1_1_0_0_o0";//売上高
	$itask_list_show_items_search_other_items_code[1]="1_2_0_0_o1";//売上原価
	$itask_list_show_items_search_other_items_code[2]="1_3_0_0_o2";//売上総利益
	$itask_list_show_items_search_other_items_code[3]="1_4_0_0_o3";//販売費一般管理費
	$itask_list_show_items_search_other_items_code[4]="1_5_0_0_o4";//営業利益
	$itask_list_show_items_search_other_items_code[5]="1_6_0_0_o5";//営業外収益
	$itask_list_show_items_search_other_items_code[6]="1_7_0_0_o6";//営業外費用
	$itask_list_show_items_search_other_items_code[7]="1_8_0_0_o7";//経常利益
	$itask_list_show_items_search_other_items_code[8]="1_9_0_0_o8";//特別利益
	$itask_list_show_items_search_other_items_code[9]="1_10_0_0_o9";//特別損失
	$itask_list_show_items_search_other_items_code[10]="1_11_0_0_o10";//税引前当期利益
	$itask_list_show_items_search_other_items_code[11]="2_20_1_0_o11";//有形固定資産
	$itask_list_show_items_search_other_items_code[12]="2_20_2_0_o12";//無形固定資産
	$itask_list_show_items_search_other_items_code[13]="2_20_3_0_o13";//投資その他の資産
	$itask_list_show_items_search_other_items_code[14]="2_30_0_0_o14";//繰延資産
	$itask_list_show_items_search_other_items_code[15]="2_20_0_0_o15";//固定資産合計
	$itask_list_show_items_search_other_items_code[16]="2_35_0_0_o16";//資産の部合計
	$itask_list_show_items_search_other_items_code[17]="2_40_0_0_o17";//流動負債
	$itask_list_show_items_search_other_items_code[18]="2_50_0_0_o18";//固定負債
	$itask_list_show_items_search_other_items_code[19]="2_60_0_0_o19";//負債の部合計
	$itask_list_show_items_search_other_items_code[20]="2_70_1_0_o20";//資本金
	$itask_list_show_items_search_other_items_code[21]="2_70_2_0_o21";//資本剰余金
	$itask_list_show_items_search_other_items_code[22]="2_70_3_1_o22";//利益準備金
	$itask_list_show_items_search_other_items_code[23]="2_70_3_2_o23";//その他の利益剰余金
	$itask_list_show_items_search_other_items_code[24]="2_70_3_0_o24";//利益剰余金
	$itask_list_show_items_search_other_items_code[25]="2_70_6_3_o25";//自己株式
	$itask_list_show_items_search_other_items_code[26]="2_70_0_0_o26";//株主資本合計
	$itask_list_show_items_search_other_items_code[27]="2_80_0_0_o27";//評価・換算差額等
	$itask_list_show_items_search_other_items_code[28]="2_90_0_0_o28";//新株予約券
	$itask_list_show_items_search_other_items_code[29]="2_100_0_0_o29";//非支配株主持分
	$itask_list_show_items_search_other_items_code[30]="2_110_0_0_o30";//純資産合計
	$itask_list_show_items_search_other_items_code[31]="2_120_0_0_o31";//負債及び純資産合計
	$itask_list_show_items_search_other_items_values=array();
	
	$sqlstr="INSERT INTO i_kanjo_info( aitask_id, candidate_list, m_kanjo_id, amount_pre_year, amount_this_year, db_exist, page, start_x, start_y, end_x, end_y,order_code,family_code,genus_code,species_code, sort,tabindex,kotei) VALUES ";
	
	$have1_13=false;
	$have2_12=false;
	$havetabindex4=false;
	$have2_10_1_1_9count=0;
	$i1183=0;
	$havetabX=true;
	$havetab1=false;
	$havetab2=false;
	$havetab3=false;
	$have1_3=false;
	$have1_4=false;
	$have1_5=false;
	$have1_6=false;
	$have1_7=false;
	$have1_8=false;
	$have1_9=false;
	$have1_10=false;
	//20240822 タブ４の最後の項目を合計項目にする
	$sumtabindex=0;
	for($i=0;$i<count($detail_list);$i++){
		$detail=$detail_list[$i];
		if($detail["amount_pre_year"]===""){
			$detail["amount_pre_year"]="NULL";
		}
		if($detail["amount_this_year"]===""){
			$detail["amount_this_year"]="NULL";
		}
		if($detail["db_exist"]===""){
			$detail["db_exist"]="NULL";
		}
		if($detail["page"]===""){
			$detail["page"]="NULL";
		}
		if($detail["start_x"]===""){
			$detail["start_x"]="NULL";
		}
		if($detail["start_y"]===""){
			$detail["start_y"]="NULL";
		}
		if($detail["end_x"]===""){
			$detail["end_x"]="NULL";
		}
		if($detail["end_y"]===""){
			$detail["end_y"]="NULL";
		}
		$kanjo_code="";
		$order_code="";
		$family_code="";
		$genus_code="";
		$species_code="";


		if(count($detail["candidate"])>0){
			
			
			if(isset($detail["candidate"][0]["tabindex"])){
				$tabindex=$detail["candidate"][0]["tabindex"]+0;
			}else if(isset($detail["tabindex"])){
				$tabindex=$detail["tabindex"]+0;
			}
		
			echo "\n1352::::::::::::";
			echo $detail["candidate"][0]["order"]."_".$detail["candidate"][0]["family"]."_".$detail["candidate"][0]["genus"]."_".$detail["candidate"][0]["species"]."_".$detail["candidate"][0]["variety"];
			echo $detail["candidate"][0]["variety_name"]."\n";
			
			
			if($tabindex===4){
				$new_candidate=array();
				for($j=0;$j<count($detail["candidate"]);$j++){
					if(($detail["candidate"][$j]["order"]==1 or $detail["candidate"][$j]["order"]=="1") and($detail["candidate"][$j]["family"]==4 or $detail["candidate"][$j]["family"]=="4") ){
						array_push($new_candidate,$detail["candidate"][$j]);
					}
				}
				if(count($new_candidate)>0){
					$detail["candidate"]=$new_candidate;
				}
			}
			
			//外注修繕費ー＞修繕費
			$new_candidate=array();
			if($tabindex===4 or $tabindex===3){
				for($j=0;$j<count($detail["candidate"]);$j++){
					if(($detail["candidate"][$j]["order"]==1 or $detail["candidate"][$j]["order"]=="1") and($detail["candidate"][$j]["family"]==2 or $detail["candidate"][$j]["family"]=="2") ){
						if(($detail["candidate"][$j]["genus"]==2 or $detail["candidate"][$j]["genus"]=="2") and($detail["candidate"][$j]["species"]==1 or $detail["candidate"][$j]["species"]=="1") ){
							if($detail["candidate"][$j]["variety"]==31 or $detail["candidate"][$j]["variety"]=="31"){
								$detail["candidate"][$j]["order"]=1;
								$detail["candidate"][$j]["family"]=4;
								$detail["candidate"][$j]["genus"]=2;
								$detail["candidate"][$j]["species"]=8;
								$detail["candidate"][$j]["variety"]=1;
								$detail["candidate"][$j]["variety_name"]="修繕費";
							}
						}
					}
					array_push($new_candidate,$detail["candidate"][$j]);
				}
				if(count($new_candidate)>0){
					$detail["candidate"]=$new_candidate;
				}
			}
			echo "1519###############".$detail["candidate"][0]["variety_name"].";-index:".$detail["tabindex"]."\n";
			for($iii=count($detail["candidate"])-1;$iii>=0;$iii--){
				if((strpos($jsoncode["document_judgment_flag"], "konjin")===false and strpos($jsoncode["document_judgment_flag"], "kojin")===false)){
					
				}else{
					if($i>=24 && $i<=29){
						$okflag=false;
						if($detail["candidate"][$iii]["order"]==1 and $detail["candidate"][$iii]["family"]==2){
							$detail["candidate"][$iii]["exsort"]=2;
							$okflag=true;
						}
						if($detail["candidate"][$iii]["order"]==1 and $detail["candidate"][$iii]["family"]==4){
							$detail["candidate"][$iii]["exsort"]=1;
							$okflag=true;
						}
						if($detail["candidate"][$iii]["order"]==1 and $detail["candidate"][$iii]["family"]==7){
							$detail["candidate"][$iii]["exsort"]=3;
							$okflag=true;
						}
						if($detail["candidate"][$iii]["order"]==1 and $detail["candidate"][$iii]["family"]==10){
							$detail["candidate"][$iii]["exsort"]=4;
							$okflag=true;
						}
						if($detail["candidate"][0]["variety"]<=0){
							$okflag=false;
						}
						if($detail["candidate"][$iii]["family"]==999){
							$okflag=true;
						}
						if($okflag===false){
							unset($detail["candidate"][$iii]);
						}
					}
					if($i>=34 && $i<=35){
						$okflag=false;
						if($detail["candidate"][$iii]["order"]==1 and $detail["candidate"][$iii]["family"]==6){
							$okflag=true;
						}
						if($detail["candidate"][$iii]["order"]==1 and $detail["candidate"][$iii]["family"]==9){
							$okflag=true;
						}
						if($detail["candidate"][0]["variety"]<=0){
							$okflag=false;
						}
						if($detail["candidate"][$iii]["family"]==999){
							$okflag=true;
						}
						if($okflag===false){
							unset($detail["candidate"][$iii]);
						}
					}
					if($i>=39 && $i<=40){
						$okflag=false;
						if($detail["candidate"][$iii]["order"]==1 and $detail["candidate"][$iii]["family"]==7){
							$okflag=true;
						}
						if($detail["candidate"][$iii]["order"]==1 and $detail["candidate"][$iii]["family"]==10){
							$okflag=true;
						}
						if($detail["candidate"][0]["variety"]<=0){
							$okflag=false;
						}
						if($detail["candidate"][$iii]["family"]==999){
							$okflag=true;
						}
						if($okflag===false){
							unset($detail["candidate"][$iii]);
						}
					}
					if($i>=45 && $i<=94){
						if($detail["candidate"][$iii]["order"]==1){
							unset($detail["candidate"][$iii]);
						}
					}
				}
			}
			if((strpos($jsoncode["document_judgment_flag"], "konjin")===false and strpos($jsoncode["document_judgment_flag"], "kojin")===false)){
				
			}else{
				//2024-08-28
				$standard_key_array=array();
				$none_key_array=array();
				$none_key=0;
				foreach ($detail["candidate"] as $key => $value) {
					$standard_key_array[$key] = $value["exsort"];
					$none_key_array[$key] = $none_key;
					$none_key++;
				}
				array_multisort($standard_key_array, SORT_ASC,$none_key_array, SORT_ASC,$detail["candidate"]);
			}
			echo "1603###############".$detail["candidate"][0]["variety_name"].";-index:".$detail["tabindex"]."\n";

			if($detail["amount_this_year"] != null){
				$detail["amount_this_year"]=str_replace(",","",$detail["amount_this_year"]);
				$detail["amount_pre_year"]=str_replace(",","",$detail["amount_pre_year"]);
			}
			$kanjo_code=$detail["candidate"][0]["order"]."_".$detail["candidate"][0]["family"]."_".$detail["candidate"][0]["genus"]."_".$detail["candidate"][0]["species"]."_".$detail["candidate"][0]["variety"];
			$order_code=$detail["candidate"][0]["order"];
			$family_code=$detail["candidate"][0]["family"];
			$genus_code=$detail["candidate"][0]["genus"];
			$species_code=$detail["candidate"][0]["species"];
			$variety_code=$detail["candidate"][0]["variety"];
			if(!isset($species_code) or $species_code===null or $species_code==="" ){
				$countsub=0;
				$detail["candidate"]=array();
				$rssub=runsql(__FILE__,"SELECT * FROM m_kanjo_view WHERE order_code=$order_code AND family_code=$family_code AND genus_code=$genus_code");
				while($rowsub=mysql_fetch_assoc($rssub)) {
					$tmpsub=array();
					$tmpsub["order"]=$rowsub["order_code"];
					$tmpsub["family"]=$rowsub["family_code"];
					$tmpsub["genus"]=$rowsub["genus_code"];
					$tmpsub["species"]=$rowsub["species_code"];
					$tmpsub["variety"]=explode("_",$rowsub["m_kanjo_code"])[4];
					$tmpsub["variety_name"]=$rowsub["m_kanjo_name"];
					$tmpsub["sort"]=$rowsub["sort"];
					$tmpsub["abc_flag"]=$rowsub["abc_flag"];
					$tmpsub["property"]=$rowsub["property"];
					array_push($detail["candidate"],$tmpsub);
					if($countsub>30){break;}
					$countsub++;
				}
			}else if(!isset($variety_code) or $variety_code===null or $variety_code===""){
				$detail["candidate"]=array();
				$rssub=runsql(__FILE__,"SELECT * FROM m_kanjo_view WHERE order_code=$order_code AND family_code=$family_code AND genus_code=$genus_code AND species_code=$species_code");
				$countsub=0;
				while($rowsub=mysql_fetch_assoc($rssub)) {
					$tmpsub=array();
					$tmpsub["order"]=$rowsub["order_code"];
					$tmpsub["family"]=$rowsub["family_code"];
					$tmpsub["genus"]=$rowsub["genus_code"];
					$tmpsub["species"]=$rowsub["species_code"];
					$tmpsub["variety"]=explode("_",$rowsub["m_kanjo_code"])[4];
					$tmpsub["variety_name"]=$rowsub["m_kanjo_name"];
					$tmpsub["sort"]=$rowsub["sort"];
					$tmpsub["abc_flag"]=$rowsub["abc_flag"];
					$tmpsub["property"]=$rowsub["property"];
					array_push($detail["candidate"],$tmpsub);
					if($countsub>30){break;}
					$countsub++;
				}
			}else{
				$rssub=runsql(__FILE__,"SELECT * FROM m_kanjo_view WHERE m_kanjo_code='$kanjo_code'");
				while($rowsub=mysql_fetch_assoc($rssub)) {
					$detail["candidate"][0]["abc_flag"]=$rowsub["abc_flag"];
				}
			}

			echo "139713971397###############".$detail["candidate"][0]["variety_name"].";-index:".$detail["tabindex"]."\n";

			$abc_flag=$detail["candidate"][0]["abc_flag"];
			$kanjo_code=$detail["candidate"][0]["order"]."_".$detail["candidate"][0]["family"]."_".$detail["candidate"][0]["genus"]."_".$detail["candidate"][0]["species"]."_".$detail["candidate"][0]["variety"];
			
			
			$order_code=$detail["candidate"][0]["order"];
			$family_code=$detail["candidate"][0]["family"];
			$genus_code=$detail["candidate"][0]["genus"];
			$species_code=$detail["candidate"][0]["species"];
			$variety_code=$detail["candidate"][0]["variety"];
			
			
			//20240326水野さん仕様
			if($abc_flag===1 or $abc_flag==="1"){
				if($detail["amount_pre_year"]!="NULL"){
					$detail["amount_pre_year"]=-1*intval(str_replace(",","",$detail["amount_pre_year"]));
				}
				if($detail["amount_this_year"]!="NULL"){
					$detail["amount_this_year"]=-1*intval(str_replace(",","",$detail["amount_this_year"]));
				}
			}
			for($j=0;$j<count($detail["candidate"]);$j++){
				// $detail["candidate"][$j]["species"]=0;
				$kanjo_code=$detail["candidate"][$j]["order"]."_".$detail["candidate"][$j]["family"]."_".$detail["candidate"][$j]["genus"]."_".$detail["candidate"][$j]["species"]."_".$detail["candidate"][$j]["variety"];
				if(isset($sortmap[$kanjo_code])){
					$detail["candidate"][$j]["sort"]=$sortmap[$kanjo_code];
				}else{
					$detail["candidate"][$j]["sort"]=0;
				}
				break;
			}
			if($kanjo_code=="2_10_1_1_9"){
				if($have2_10_1_1_9count>0){
					$next_variety_code=21+$have2_10_1_1_9count;
					$kanjo_code="2_10_1_1_".$next_variety_code;
					$order_code=$detail["candidate"][0]["order"];
					$family_code=$detail["candidate"][0]["family"];
					$genus_code=$detail["candidate"][0]["genus"];
					$species_code=$detail["candidate"][0]["species"];
					$variety_code=$next_variety_code;
				}
				$have2_10_1_1_9count++;
			}
			$changeabsflag=false;
			//20230316 7:21 メール
			//(item.m_kanjo_code=='2_10_4_8_1' || item.m_kanjo_code=='2_20_3_4_1' || item.m_kanjo_code=='2_20_1_7_2'
			if($detail["candidate"][0]["order"].""=="2" and $detail["candidate"][0]["family"].""=="10" and $detail["candidate"][0]["genus"].""=="4" and $detail["candidate"][0]["species"].""=="8" and $detail["candidate"][0]["variety"].""=="1"){
				$changeabsflag=true;
			}
			if($detail["candidate"][0]["order"].""=="2" and $detail["candidate"][0]["family"].""=="20" and $detail["candidate"][0]["genus"].""=="3" and $detail["candidate"][0]["species"].""=="4" and $detail["candidate"][0]["variety"].""=="0"){
				$changeabsflag=true;
			}
			if($detail["candidate"][0]["order"].""=="2" and $detail["candidate"][0]["family"].""=="20" and $detail["candidate"][0]["genus"].""=="1" and $detail["candidate"][0]["species"].""=="7" and $detail["candidate"][0]["variety"].""=="2"){
				$changeabsflag=true;
			}
			if($detail["candidate"][0]["order"].""=="2" and $detail["candidate"][0]["family"].""=="20" and $detail["candidate"][0]["genus"].""=="1" and $detail["candidate"][0]["species"].""=="7" and $detail["candidate"][0]["variety"].""=="1"){
				$changeabsflag=true;
			}
			//3月15日(金) 2:49 (3 日前)のメール
			//2_10_2_0_3
			$templist=array();
			array_push($templist,"2_10_2_0_3");
			array_push($templist,"2_10_4_8_1");
			array_push($templist,"2_20_3_4_1");
			array_push($templist,"2_50_0_10_2");
			array_push($templist,"2_40_3_1_31");
			$kanjyoucode=$detail["candidate"][0]["order"]."_".$detail["candidate"][0]["family"]."_".$detail["candidate"][0]["genus"]."_".$detail["candidate"][0]["species"]."_".$detail["candidate"][0]["variety"];
			if (in_array($kanjyoucode, $templist)) {
				$changeabsflag=true;
			}
			if($changeabsflag){
				if($detail["amount_pre_year"]!="NULL"){
					$detail["amount_pre_year"]=abs(intval(str_replace(",","",$detail["amount_pre_year"])));
				}
				if($detail["amount_this_year"]!="NULL"){
					$detail["amount_this_year"]=abs(intval(str_replace(",","",$detail["amount_this_year"])));
				}
			}
			$top_info_col_name=null;
			for($j=0;$j<count($itask_list_show_items_search_other_items_code);$j++){
				$top_info_col_code=$itask_list_show_items_search_other_items_code[$j];
				$top_info_col_code=explode("_",$top_info_col_code);
				if($top_info_col_code[0]=="" or (isset($top_info_col_code[0]) and $top_info_col_code[0]==$detail["candidate"][0]["order"]."")){
				if($top_info_col_code[1]=="" or (isset($top_info_col_code[1]) and $top_info_col_code[1]==$detail["candidate"][0]["family"]."")){
				if($top_info_col_code[2]=="" or (isset($top_info_col_code[2]) and $top_info_col_code[2]==$detail["candidate"][0]["genus"]."")){
				if($top_info_col_code[3]=="" or (isset($top_info_col_code[3]) and $top_info_col_code[3]==$detail["candidate"][0]["species"]."")){
				if($top_info_col_code[4]=="o21" or $top_info_col_code[4]=="o22" or $top_info_col_code[4]=="o23"){
					if(intval($detail["candidate"][0]["variety"])==0){
						$top_info_col_name=$top_info_col_code[4];
						$itask_list_show_items_search_other_items_code[$j]="A_A_A_A_A";
					}
				}else if(intval($detail["candidate"][0]["variety"])<=0){
					$top_info_col_name=$top_info_col_code[4];
					$itask_list_show_items_search_other_items_code[$j]="A_A_A_A_A";
				}
				}
				}
				}
				}
			}
			if($top_info_col_name!=null){
				$kingakuup=str_replace(",","",$detail["amount_this_year"]);
				if($kingakuup==="" or $kingakuup===null){
					$kingakuup="NULL";
				}
				array_push($itask_list_show_items_search_other_items_values," $top_info_col_name=".$kingakuup." ");
			}
			
			if($order_code===1 and $family_code===13){
				$have1_13=true;
			}
			if($order_code===2 and $family_code===12){
				$have2_12=true;
			}
			if($tabindex===4){
				$havetabindex4=true;
			}
			//20240822 タブ４の最後の項目を合計項目にする
			if($detail["amount_this_year"]!="NULL" and $i<count($detail_list)-1 and $tabindex===4){
				if($detail["candidate"][0]["variety"]<=0){
					$sumtabindex=1000000000000;
				}else{
					$sumtabindex=$sumtabindex+intval(str_replace(",","",$detail["amount_this_year"]));
				}
			}
			
			$nextNotTabindex4Flag=false;
			if($i<count($detail_list)-1){
				$nextTabindex=4;
				if(isset($detail_list[$i+1]["candidate"][0]["tabindex"])){
					$nextTabindex=$detail["candidate"][0]["tabindex"]+0;
				}else if(isset($detail_list[$i+1]["tabindex"])){
					$nextTabindex=$detail["tabindex"]+0;
				}
				if($nextTabindex!=4 and $sumtabindex>0){
					$nextNotTabindex4Flag=true;
				}
			}


			
			if($detail["amount_this_year"]!="NULL" and ($i==count($detail_list)-1 or $nextNotTabindex4Flag) and $tabindex===4){
				echo "\n 1525########".intval(str_replace(",","",$detail["amount_this_year"]))."\n";
				echo "\n 1525########".($sumtabindex/2)."\n";
				if(intval(str_replace(",","",$detail["amount_this_year"]))>$sumtabindex/2){
					$detail["candidate"][0]["order"]=1;
					$detail["candidate"][0]["family"]=4;
					$detail["candidate"][0]["genus"]=0;
					$detail["candidate"][0]["species"]=0;
					$detail["candidate"][0]["variety"]=-3;
					$detail["candidate"][0]["variety_name"]="販売費及び一般管理費合計";
					$detail["candidate"][0]["property"]=-1;
					
					
					$order_code=1;
					$family_code=4;
					$genus_code=0;
					$species_code=0;
					$variety_code=-3;
					$kanjo_code=$detail["candidate"][0]["order"]."_".$detail["candidate"][0]["family"]."_".$detail["candidate"][0]["genus"]."_".$detail["candidate"][0]["species"]."_".$detail["candidate"][0]["variety"];
					echo "\n 1536########".$detail_list[$i]["candidate"][0]["variety_name"]."\n";
					var_dump($detail);
				}
			}
			if (isset($detail["realtext"]) and isset($detail["candidate"][0])){
				if($detail["candidate"][0]["variety_name"]!=$detail["realtext"]){
					echo $detail["realtext"]."\n";
					for($jjj=0;$jjj<count($detail["candidate"]);$jjj++){
						echo $detail["candidate"][$jjj]["variety_name"]." <> ".$detail["realtext"]."\n";
						if($detail["candidate"][$jjj]["variety_name"]==$detail["realtext"]){
							$rv=$detail["candidate"][$jjj];
							unset($detail["candidate"][$jjj]);
							array_unshift($detail["candidate"],$rv);
							echo "change to ".$detail["candidate"][$jjj]["variety_name"]."\n";
							break;
						}
					}
				}
			}
		}
		if((strpos($jsoncode["document_judgment_flag"], "konjin")===false and strpos($jsoncode["document_judgment_flag"], "kojin")===false)){
			//法人の場合
			if($detail["candidate"][0]["order"].""=="2" and intval($detail["candidate"][0]["family"])<40 ){
				$havetab1=true;
			}
			if($detail["candidate"][0]["order"].""=="2" and intval($detail["candidate"][0]["family"])>=40 ){
				$havetab2=true;
			}
			if($detail["candidate"][0]["order"].""=="1" && $tabindex."" != "4" && $tabindex."" != "0" ){
				$havetab3=true;
			}
		}else{
			if($detail["candidate"][0]["order"].""=="2" and $detail["candidate"][0]["family"].""=="10" and $detail["candidate"][0]["genus"].""=="1" and $detail["candidate"][0]["species"].""=="1" and $detail["candidate"][0]["variety"].""=="6" ){
				$havetab1=true;
			}
			if($detail["candidate"][0]["order"].""=="1" and $detail["candidate"][0]["family"].""=="1" and $detail["candidate"][0]["genus"].""=="0" and $detail["candidate"][0]["species"].""=="0" and $detail["candidate"][0]["variety"].""=="0" ){
				$havetab2=true;
			}
			if($detail["candidate"][0]["order"].""=="1" and $detail["candidate"][0]["family"].""=="1" and $detail["candidate"][0]["genus"].""=="0" and $detail["candidate"][0]["species"].""=="0" and $detail["candidate"][0]["variety"].""=="64" ){
				$havetab3=true;
			}
		}
		if(intval(str_replace(",","",$detail["amount_pre_year"]))>9999999999 or intval(str_replace(",","",$detail["amount_this_year"]))>9999999999){
			$havetabX=false;
		}

		if($tabindex."" == "3" and (strpos($jsoncode["document_judgment_flag"], "konjin")===false and strpos($jsoncode["document_judgment_flag"], "kojin")===false)){
			// PLの勘定科目もロジックを見直す必要があります
			// 6600行あたりで処理していますが、根本的な改善が必要です
			// 売上高
			// 売上原価
			if($detail["candidate"][0]["order"].""=="1" and intval($detail["candidate"][0]["family"])==3 ){
				$have1_3=true;
			}
			if($detail["candidate"][0]["order"].""=="1" and intval($detail["candidate"][0]["family"])==4 ){
				$have1_4=true;
			}
			if($detail["candidate"][0]["order"].""=="1" and intval($detail["candidate"][0]["family"])==5 ){
				$have1_5=true;
			}
			if($detail["candidate"][0]["order"].""=="1" and intval($detail["candidate"][0]["family"])==6 ){
				$have1_6=true;
			}
			if($detail["candidate"][0]["order"].""=="1" and intval($detail["candidate"][0]["family"])==7 ){
				$have1_7=true;
			}
			if($detail["candidate"][0]["order"].""=="1" and intval($detail["candidate"][0]["family"])==8 ){
				$have1_8=true;
			}
			if($detail["candidate"][0]["order"].""=="1" and intval($detail["candidate"][0]["family"])==9 ){
				$have1_9=true;
			}
			if($detail["candidate"][0]["order"].""=="1" and intval($detail["candidate"][0]["family"])==10 ){
				$have1_10=true;
			}
			// 経常利益（1_8系）←1_8系が出たかどうかをキー貸倒引当金戻入
			// 特別利益（1_9系）雑収入（売上高1_1系）1_9_999　勘定科目要選択
			// 特別損失（1_10系）雑費（販売費及び一般管理費1_4系）1_10_999　勘定科目要選択
			if($have1_8 or $have1_9 or $have1_10){
				$kanjo_info=change_wrong_kanjyo($kanjo_code,$detail["candidate"][0]["variety_name"],$kanjo_list,1,8);
				if($kanjo_info!=null){
					if($detail["tabindex"]==2 or $detail["tabindex"]==1){
						$detail["tabindex"]=3;
					}
					if($kanjo_info==999){
						if($have1_10){
							$kanjo_code="1_10_0_0_999";
							$order_code="1";
							$family_code="10";
							$genus_code="0";
							$species_code="0";
							$variety_code="999";
						}else if($have1_9){
							$kanjo_code="1_9_0_0_999";
							$order_code="1";
							$family_code="9";
							$genus_code="0";
							$species_code="0";
							$variety_code="999";
						}else{
							$kanjo_code="1_9_0_0_999";
							$order_code="1";
							$family_code="9";
							$genus_code="0";
							$species_code="0";
							$variety_code="999";
						}
					}else{
						$kanjo_code=$kanjo_info["m_kanjo_code"];
						$order_code=$kanjo_info["order_code"];
						$family_code=$kanjo_info["family_code"];
						$genus_code=$kanjo_info["genus_code"];
						$species_code=$kanjo_info["species_code"];
						$variety_code=$kanjo_info["variety_code"];
					}
				}
			}else if($have1_5 or $have1_6 or $have1_7){
				// 営業利益（1_5）←1_5系が出たかどうかをキーif 1_5以降1_8
				// 営業外収益（1_6系）雑収入（売上高1_1系）1_6_999　勘定科目要選択
				// 営業外費用（1_7系）雑費（販売費及び一般管理費1_4系）貸倒引当金繰入1_7_999　勘定科目要選択
				$kanjo_info=change_wrong_kanjyo($kanjo_code,$detail["candidate"][0]["variety_name"],$kanjo_list,1,5);
				if($kanjo_info!=null){
					if($detail["tabindex"]==2 or $detail["tabindex"]==1){
						$detail["tabindex"]=3;
					}
					if($kanjo_info==999){
						if($have1_7){
							$kanjo_code="1_7_0_0_999";
							$order_code="1";
							$family_code="7";
							$genus_code="0";
							$species_code="0";
							$variety_code="999";
						}else if($have1_6){
							$kanjo_code="1_6_0_0_999";
							$order_code="1";
							$family_code="6";
							$genus_code="0";
							$species_code="0";
							$variety_code="999";
						}else{
							$kanjo_code="1_6_0_0_999";
							$order_code="1";
							$family_code="6";
							$genus_code="0";
							$species_code="0";
							$variety_code="999";
						}
					}else{
						$kanjo_code=$kanjo_info["m_kanjo_code"];
						$order_code=$kanjo_info["order_code"];
						$family_code=$kanjo_info["family_code"];
						$genus_code=$kanjo_info["genus_code"];
						$species_code=$kanjo_info["species_code"];
						$variety_code=$kanjo_info["variety_code"];
					}
				}
			}else if($have1_4){
				// 販売費及び一般管理費（1_4)1_4系の後には、1_1系、1_2系はこない1_4_999　勘定科目要選択
				$kanjo_info=change_wrong_kanjyo($kanjo_code,$detail["candidate"][0]["variety_name"],$kanjo_list,1,4);
				if($kanjo_info!=null){
					if($detail["tabindex"]==2 or $detail["tabindex"]==1){
						$detail["tabindex"]=3;
					}
					if($kanjo_info==999){
						$kanjo_code="1_4_0_0_999";
						$order_code="1";
						$family_code="4";
						$genus_code="0";
						$species_code="0";
						$variety_code="999";
					}else{
						$kanjo_code=$kanjo_info["m_kanjo_code"];
						$order_code=$kanjo_info["order_code"];
						$family_code=$kanjo_info["family_code"];
						$genus_code=$kanjo_info["genus_code"];
						$species_code=$kanjo_info["species_code"];
						$variety_code=$kanjo_info["variety_code"];
					}
				}
			}else if($have1_3){
				// 売上総利益1_3系の後には1_1系、1_2系はこない
				$kanjo_info=change_wrong_kanjyo($kanjo_code,$detail["candidate"][0]["variety_name"],$kanjo_list,1,3);
				if($kanjo_info!=null){
					if($detail["tabindex"]==2 or $detail["tabindex"]==1){
						$detail["tabindex"]=3;
					}
					$kanjo_code=$kanjo_info["m_kanjo_code"];
					$order_code=$kanjo_info["order_code"];
					$family_code=$kanjo_info["family_code"];
					$genus_code=$kanjo_info["genus_code"];
					$species_code=$kanjo_info["species_code"];
					$variety_code=$kanjo_info["variety_code"];
				}
			}
			// 税引前当期利益（1_11系）
			// 法人税等（1_12系）
			// 税引き後当期利益（1_13系）
		}
		
		
		
		if((strpos($jsoncode["document_judgment_flag"], "konjin")!==false or strpos($jsoncode["document_judgment_flag"], "kojin")!==false)){
			//個人の貸倒引当金繰入額を1_7_0_6_5にする
			if($kanjo_code=="1_4_2_36_1" or $kanjo_code=="1_10_0_3_3"){
				$kanjo_code="1_7_0_6_5";
				$order_code=1;
				$family_code=7;
				$genus_code=0;
				$species_code=6;
				$variety_code=5;
			}
			if($kanjo_code=="____"){
				$kanjo_code="2_999_0_0_0";
				$order_code=2;
				$family_code=999;
				$genus_code=0;
				$species_code=0;
				$variety_code=0;
			}
		}
		if((strpos($jsoncode["document_judgment_flag"], "konjin")===false and strpos($jsoncode["document_judgment_flag"], "kojin")===false)){
			$sqlstr2028="SELECT * FROM exlist WHERE from_kanjo_code='$kanjo_code' order by to_kanjo_code,from_kanjo_code";
			$rs2028=runsql(__FILE__,$sqlstr2028);
			while($row2028=mysql_fetch_assoc($rs2028)) {
				if($kanjo_code==$row2028["from_kanjo_code"]){
					$kanjo_code=$row2028["to_kanjo_code"];
					$order_code=explode("_",$kanjo_code)[0];
					$family_code=explode("_",$kanjo_code)[1];
					$genus_code=explode("_",$kanjo_code)[2];
					$species_code=explode("_",$kanjo_code)[3];
					$variety_code=explode("_",$kanjo_code)[4];
				}
			}
		}

		$inttabindex=$detail["tabindex"]+0;
		if($have1_13 and $have2_12 and $havetabindex4 and ($order_code!==1 || $family_code!==4) ){
		}else if(false){ // [make_ana] 元: 法人で座標が全部 0 の行は捨てる → ana には読み取り位置が無いので捨てない
			echo "\n###### x y is 0#########\n";
		}else if($inttabindex===0){
			echo "\n###### none1 tabindex 0#########\n";
		}else{
			if($i1183!=0){
				$sqlstr=$sqlstr.",";
			}
			$kanjo_code=$detail["candidate"][0]["order"]."_".$detail["candidate"][0]["family"]."_".$detail["candidate"][0]["genus"]."_".$detail["candidate"][0]["species"]."_".$detail["candidate"][0]["variety"];
			$order_code=intval($detail["candidate"][0]["order"]);
			$family_code=intval($detail["candidate"][0]["family"]);
			$genus_code=intval($detail["candidate"][0]["genus"]);
			$species_code=intval($detail["candidate"][0]["species"]);
			$variety_code=intval($detail["candidate"][0]["variety"]);
				echo "\n\n\n\n\n\n################################";
				echo $detail["amount_this_year"]."\n";
				echo number_format($detail["amount_this_year"]."");
				echo "\n\n\n\n\n\n";

			$sqlstr=$sqlstr."\n($itask_id";
			$sqlstr=$sqlstr.",'".mysqli_real_escape_string($link, json_encode($detail["candidate"],JSON_UNESCAPED_UNICODE))."'"; // [make_ana] エスケープ
			$sqlstr=$sqlstr.",'$kanjo_code'";
			$sqlstr=$sqlstr.",'".number_format($detail["amount_pre_year"])."'";
			$sqlstr=$sqlstr.",'".number_format($detail["amount_this_year"])."'";
			$sqlstr=$sqlstr.",".$detail["db_exist"]."";
			$sqlstr=$sqlstr.",".$detail["page"]."";
			if((strpos($jsoncode["document_judgment_flag"], "konjin")!==false or strpos($jsoncode["document_judgment_flag"], "kojin")!==false) and $detail["start_x"]=="" or $detail["start_x"]==0){
				$sqlstr=$sqlstr.",0";
			}else{
				$sqlstr=$sqlstr.",".$detail["start_x"]."";
			}
			if((strpos($jsoncode["document_judgment_flag"], "konjin")!==false or strpos($jsoncode["document_judgment_flag"], "kojin")!==false) and $detail["start_y"]=="" or $detail["start_y"]==0){
				$sqlstr=$sqlstr.",0";
			}else{
				$sqlstr=$sqlstr.",".$detail["start_y"]."";
			}
			if((strpos($jsoncode["document_judgment_flag"], "konjin")!==false or strpos($jsoncode["document_judgment_flag"], "kojin")!==false) and $detail["end_x"]=="" or $detail["end_x"]==0){
				$sqlstr=$sqlstr.",0";
			}else{
				$sqlstr=$sqlstr.",".$detail["end_x"]."";
			}
			if((strpos($jsoncode["document_judgment_flag"], "konjin")!==false or strpos($jsoncode["document_judgment_flag"], "kojin")!==false) and $detail["end_y"]=="" or $detail["end_y"]==0){
				$sqlstr=$sqlstr.",0";
			}else{
				$sqlstr=$sqlstr.",".$detail["end_y"]."";
			}
			$sqlstr=$sqlstr.",".$order_code."";
			$sqlstr=$sqlstr.",".$family_code."";
			$sqlstr=$sqlstr.",".$genus_code."";
			$sqlstr=$sqlstr.",".$species_code."";
			$sqlstr=$sqlstr.",".$i;
			$sqlstr=$sqlstr.",$tabindex";
			$sqlstr=$sqlstr.",'".$detail["kotei"]."')\n";
			$i1183++;
		}
		
	}
	$sqlstr=$sqlstr.";";
	echo "\n\n  init insert sql::::::::::::::::::::: $sqlstr   \n\n";
	if($i1183>0){
		$rs=runsql(__FILE__,$sqlstr);
		if(!$rs){
			echo "#########################################################################\n";
			echo "##############Error message: ".mysqli_error($link)."#######################\n";
			$putmobj["insert_error"]=mysqli_error($link); // [make_ana]
		}
	}
	
	
	
	// [make_ana] o0〜o31 を先に空にする
	$clear_o=array();
	for($oi=0;$oi<=31;$oi++){ $clear_o[]="o".$oi."=NULL"; }
	runsql(__FILE__,"UPDATE i_aitask_top_info SET ".implode(",",$clear_o)." WHERE itask_id = $itask_id");
	$sqlstr="UPDATE i_aitask_top_info SET ";
	$sqlstr=$sqlstr.implode(",",$itask_list_show_items_search_other_items_values);
	$sqlstr=$sqlstr." WHERE itask_id = $itask_id";
	if(count($itask_list_show_items_search_other_items_values)>0){
		runsql(__FILE__,$sqlstr);
	}
	echo "\n########################## detail insert ".(microtime(true) - $time_start)."\n$sqlstr\n";
	
	echo "\n########################## havetab1   $havetab1 ".(microtime(true) - $time_start)."\n\n";
	echo "\n########################## havetab2   $havetab2 ".(microtime(true) - $time_start)."\n\n";
	echo "\n########################## havetab3   $havetab3 ".(microtime(true) - $time_start)."\n\n";
	if(!$havetab1 or !$havetab2 or !$havetab3 or !$havetabX){
		$putmobj["bad"]="bad";
	}else{
		$putmobj["bad"]="";
	}
	
	$putmobj["didflag"]="OK";
	$putmobj["jsoncode"]=$jsoncode;
	ob_end_clean();
	$putmobj["rows"]=$i1183;
	return $putmobj;
}

//===============================================================
// ここから本体(キューを1件処理する)
//===============================================================
$ANA_LOG  = "/data/pmj_cron/ikisaki_itask_make_ana.log";
$ANA_LOCK = "/data/pmj_cron/ikisaki_itask_make_ana.lock";
$ANA_TMP  = "/data/pmj_cron/tmp";       // 元 PDF の作業場所(Web 公開領域の外)
$ANA_STALE_MIN = 70;          // これより長く「処理中」のままなら失敗にする(door/pmj-ana の上限 3600 秒 + 余裕)
$ANA_MAX_SEND_BYTES = 18 * 1024 * 1024;   // 元 PDF の画像の合計がこれを超えたら縮小する(door の上限 32MB に対して余裕を持たせる)

function ana_log($msg){
	global $ANA_LOG;
	@file_put_contents($ANA_LOG, date("Y-m-d H:i:s")." ".$msg."\n", FILE_APPEND | LOCK_EX);
}
function ana_esc($s){
	global $link;
	return mysqli_real_escape_string($link, (string)$s);
}
// 失敗: キューを NG、m_itask.status=2(要確認)
function ana_fail($qid, $itask_id, $msg){
	runsql(__FILE__, "UPDATE i_itask_queue_ana SET status='NG', end_at=NOW(), error_message='".ana_esc(mb_substr($msg,0,1000))."' WHERE id=".intval($qid));
	runsql(__FILE__, "UPDATE m_itask SET status=2, update_at=now() WHERE itask_id=".intval($itask_id));
	ana_log("NG itask=$itask_id queue=$qid ".$msg);
}
// door 経由で pmj-ana の /analyze を呼ぶ
function ana_call($payload){
	$token = get_cloud_run_id_token_keieidangi(KEIEIDANGI_SA_JSON, AITEXT_DOOR_URL);
	$body = json_encode(array("target"=>"ana", "path"=>"/analyze", "payload"=>$payload), JSON_UNESCAPED_UNICODE);
	$ch = curl_init(AITEXT_DOOR_URL."/call");
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json", "Authorization: Bearer ".$token));
	curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
	curl_setopt($ch, CURLOPT_TIMEOUT, 3700);         // door / pmj-ana の上限 3600 秒より少し長く
	$res  = curl_exec($ch);
	$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	$err  = curl_error($ch);
	curl_close($ch);
	if ($res === false) { throw new Exception("door 通信エラー: ".$err); }
	$j = json_decode($res, true);
	if (!is_array($j)) { throw new Exception("HTTP ".$code." JSON ではない応答: ".mb_substr(preg_replace('/\s+/',' ',$res),0,300)); }
	if (!isset($j["status"]) || $j["status"] !== "OK") {
		throw new Exception("HTTP ".$code." ".(isset($j["error"]) ? $j["error"] : mb_substr($res,0,300)));
	}
	return $j;
}

//---------------------------------------------------------------
// 元の PDF からページ画像(JPEG)を作る
//   編集画面の「元画像」(itask_list_show_edit_window_getfullimage.do 108-245。test1/149 とも同じ)の写し:
//   ファイルは2台のサーバ(FTP)に分割・zip で保存されている → 両方取得 → 展開 → 結合 → pdftoppm
//   返り値: JPEG のバイナリの配列(ページ順)。失敗時は例外
//---------------------------------------------------------------
function ana_pdf_pages($itask_id, $user_id){
	global $link, $ANA_TMP, $ANA_MAX_SEND_BYTES;
	$rs = runsql(__FILE__, "SELECT file_tree_id FROM v_itask_file_info_pana WHERE itask_id=".intval($itask_id));
	$getid = "";
	while ($rs && ($row = mysql_fetch_assoc($rs))) { $getid = $row["file_tree_id"]; }
	if ($getid === "" || $getid === null) { throw new Exception("元ファイルの情報(file_tree_id)がありません"); }

	$rs = runsql(__FILE__, "SELECT * FROM db_server_master WHERE user_id=".intval($user_id));
	$instance_name = ""; $pass = ""; $ftp_ip = array(); $ftp_user = array(); $ftp_pass = array();
	while ($rs && ($row = mysql_fetch_assoc($rs))) {
		$instance_name = $row["instance_name"];
		$pass = $row["pass"];
		$ftp_ip = explode(",", $row["ftp_ip"]);
		$ftp_user = explode(",", $row["ftp_user"]);
		$ftp_pass = explode(",", $row["ftp_pass"]);
	}
	if ($instance_name === "") { throw new Exception("元ファイルの保存先サーバの情報がありません"); }
	$inst = explode(",", $instance_name);
	$link1 = mysql_connect($inst[0], "db1admin", $pass);
	$link2 = mysql_connect($inst[1], "db2admin", $pass);
	if (!$link1 || !$link2) { throw new Exception("元ファイルの DB に接続できません"); }
	mysql_select_db("db1", $link1); mysql_select_db("db2", $link2);
	mysql_set_charset('utf8', $link1); mysql_set_charset('utf8', $link2);

	$file_id = "";
	$r1 = mysql_query("SELECT * FROM db1.files_tbl WHERE tree_id=".intval($getid)." AND new_flag=1;", $link1);
	while ($r1 && ($row = mysql_fetch_assoc($r1))) { $file_id = $row["id"]; }
	if ($file_id === "") { throw new Exception("元ファイルがありません"); }
	$path1 = ""; $path2 = "";
	$r1 = mysql_query("SELECT * FROM db1.files_tbl WHERE id=".intval($file_id).";", $link1);
	while ($r1 && ($row = mysql_fetch_assoc($r1))) { $path1 = $row["data"]; }
	$r2 = mysql_query("SELECT * FROM db2.files_tbl WHERE id=".intval($file_id).";", $link2);
	while ($r2 && ($row = mysql_fetch_assoc($r2))) { $path2 = $row["data"]; }
	if ($path1 === "" || $path2 === "") { throw new Exception("元ファイルの保存場所がありません"); }

	$work = $ANA_TMP."/".$itask_id."_".str_replace(".", "", microtime(true))."/";
	@mkdir($work, 0700, true);
	try {
		$lp1 = basename($path1); $lp2 = basename($path2);
		foreach (array(array($ftp_ip[0], $ftp_user[0], $ftp_pass[0], $path1, $lp1), array($ftp_ip[1], $ftp_user[1], $ftp_pass[1], $path2, $lp2)) as $k => $f) {
			$conn = @ftp_connect($f[0]);
			if (!$conn || !@ftp_login($conn, $f[1], $f[2])) { throw new Exception("元ファイルのサーバ".($k+1)."に接続できません"); }
			ftp_pasv($conn, true);
			$ok = @ftp_get($conn, $work.$f[4], $f[3], FTP_BINARY);
			ftp_close($conn);
			if (!$ok) { throw new Exception("元ファイルの取得に失敗しました(".($k+1).")"); }
		}
		exec("unzip -o ".escapeshellarg($work.$lp1)." -d ".escapeshellarg($work)." 2>&1", $o1, $rc1);
		exec("unzip -o ".escapeshellarg($work.$lp2)." -d ".escapeshellarg($work)." 2>&1", $o2, $rc2);
		$pdf = $work."orig.pdf";
		exec("cat ".escapeshellarg($work."var/www/tmp/".$lp1)." ".escapeshellarg($work."var/www/tmp/".$lp2)." > ".escapeshellarg($pdf));
		if (!is_file($pdf) || filesize($pdf) < 100) { throw new Exception("元ファイル(PDF)を組み立てられませんでした"); }
		exec("/usr/bin/pdftoppm -jpeg -scale-to 4677 -r 400 ".escapeshellarg($pdf)." ".escapeshellarg($work."page")." 2>&1", $o3, $rc3);
		$files = glob($work."page-*.jpg");
		// page-1.jpg, page-2.jpg ... page-10.jpg を数字の順に並べる
		usort($files, function($a, $b){ return intval(preg_replace('/\D/', '', basename($a))) - intval(preg_replace('/\D/', '', basename($b))); });
		if (count($files) == 0) { throw new Exception("元ファイル(PDF)を画像にできませんでした"); }
		$total = 0;
		foreach ($files as $p) { $total += filesize($p); }
		$pages = array();
		foreach ($files as $p) {
			if ($total > $ANA_MAX_SEND_BYTES && function_exists("imagecreatefromjpeg")) {
				// 大きすぎるときは長辺 3508px(A4 300dpi 相当)・画質 80 に縮小(pdftoppm が古く画質を指定できないため GD で)
				$im = @imagecreatefromjpeg($p);
				if ($im) {
					$w = imagesx($im); $h = imagesy($im); $s = min(1.0, 3508 / max($w, $h));
					$dst = imagecreatetruecolor(max(1, intval($w * $s)), max(1, intval($h * $s)));
					imagecopyresampled($dst, $im, 0, 0, 0, 0, imagesx($dst), imagesy($dst), $w, $h);
					imagejpeg($dst, $p, 80);
					imagedestroy($im); imagedestroy($dst);
				}
			}
			$pages[] = file_get_contents($p);
		}
		return $pages;
	} finally {
		exec("rm -rf ".escapeshellarg(rtrim($work, "/")));
	}
}

//---------------------------------------------------------------
// 決算日を決める(ana の読み取り結果を、ファイル名の決算年月で確かめる)
//   ファイル名の年月はアップロード時(itask_upload.do 612-628)と同じ取り方:
//   「-」で区切った2つ目の、拡張子より前の先頭6文字(例 12021004-202408柳沢….pdf → 202408)。4〜5文字なら年だけ。
//   ・年月が ana の日付と同じ → ana の日付
//   ・違う / ana が読めない → ファイル名の年月の月末(年だけならその年の 12/31。make.do と同じ扱い)
//   決算日は通常は月末で、AI が期首(自 ○年○月1日)を答えることがあるため(2026-10-09)。
//   返り値: 'YYYY-MM-DD'(決められなければ '')。補正したときは $notes に理由を足す
//---------------------------------------------------------------
function ana_closing_date($itask_id, $ana_date, &$notes){
	$ana = "";
	if (preg_match('#^(\d{4})/(\d{2})/(\d{2})$#', (string)$ana_date, $m) && checkdate(intval($m[2]), intval($m[3]), intval($m[1]))) {
		$ana = $m[1]."-".$m[2]."-".$m[3];
	}
	$rs = runsql(__FILE__, "SELECT file_tree_name FROM v_itask_file_info WHERE itask_id=".intval($itask_id)." LIMIT 1");
	$name = ($rs && ($row = mysql_fetch_assoc($rs))) ? (string)$row["file_tree_name"] : "";
	$parts = explode("-", $name);
	$seg = isset($parts[1]) ? explode(".", $parts[1]) : array("");
	$ym = mb_substr($seg[0], 0, 6);
	$y  = mb_substr($seg[0], 0, 4);
	if (preg_match('/^\d{6}$/', $ym) && intval(substr($ym, 4, 2)) >= 1 && intval(substr($ym, 4, 2)) <= 12) {
		if ($ana !== "" && substr(str_replace("-", "", $ana), 0, 6) === $ym) { return $ana; }
		$fix = date("Y-m-t", strtotime(substr($ym, 0, 4)."-".substr($ym, 4, 2)."-01"));
		$notes[] = "決算日をファイル名の年月で補正しました(読み取り ".($ana !== "" ? $ana : "なし")." → $fix)";
		return $fix;
	}
	if (preg_match('/^\d{4}$/', $y)) {
		if ($ana !== "" && substr($ana, 0, 4) === $y) { return $ana; }
		$fix = $y."-12-31";
		$notes[] = "決算日をファイル名の年で補正しました(読み取り ".($ana !== "" ? $ana : "なし")." → $fix)";
		return $fix;
	}
	return $ana;     // ファイル名に年月が無い: 読み取り結果をそのまま使う
}

if (PHP_SAPI !== "cli") { exit(); }                 // cron からだけ動かす(Web から呼ばれても何もしない)
date_default_timezone_set("Asia/Tokyo");               // CLI の php は UTC のため(ログの時刻を日本時間に)
@mkdir(dirname($ANA_LOG), 0775, true);
$lockfp = fopen($ANA_LOCK, "c");
if (!$lockfp || !flock($lockfp, LOCK_EX | LOCK_NB)) { exit(); }   // 前の回がまだ動いている
@set_time_limit(0);
$time_start = microtime(true);

// 長く「処理中」のままのもの(プロセスが落ちた等)は失敗にする
$rs = runsql(__FILE__, "SELECT id, itask_id FROM i_itask_queue_ana WHERE status='MN' AND start_at < NOW() - INTERVAL $ANA_STALE_MIN MINUTE");
while ($rs && ($row = mysql_fetch_assoc($rs))) {
	ana_fail($row["id"], $row["itask_id"], "処理が {$ANA_STALE_MIN} 分以上終わらなかったため失敗にしました");
}

// 未処理を1件取る
$rs = runsql(__FILE__, "SELECT * FROM i_itask_queue_ana WHERE status='NM' ORDER BY id LIMIT 1");
$q = $rs ? mysql_fetch_assoc($rs) : null;
if (!$q) { exit(); }
$qid = intval($q["id"]);
$itask_id = intval($q["itask_id"]);
$doc_type = ($q["doc_type"] === "kojin") ? "kojin" : "houjin";
$use_pdf = (isset($q["use_pdf"]) && intval($q["use_pdf"]) === 1);
$notes = array();               // 成功時にキューへ残すメモ
runsql(__FILE__, "UPDATE i_itask_queue_ana SET status='MN', start_at=NOW() WHERE id=$qid AND status='NM'");
ana_log("START itask=$itask_id queue=$qid doc_type=$doc_type use_pdf=".($use_pdf ? 1 : 0)." door=".AITEXT_DOOR_URL);

try {
	// 案件の情報
	$rs = runsql(__FILE__, "SELECT itask_id, user_id, type FROM m_itask WHERE itask_id=$itask_id");
	$mi = $rs ? mysql_fetch_assoc($rs) : null;
	if (!$mi) { throw new Exception("案件がありません"); }
	$user_id = intval($mi["user_id"]);
	$type = $mi["type"];

	// ページ画像(保存済み: test1 はファイル、149 は DB。itask_aitext_analyze.do と同じ読み方)
	$pages = itask_aitext_page_images($itask_id);
	if ($pages === false) { $pages = array(); }
	$raws = array();
	if ($use_pdf) {
		// 元の PDF から作る。取れなければ保存済みの画像で分析し、その旨を残す
		try {
			$raws = ana_pdf_pages($itask_id, $user_id);
			ana_log("元PDF itask=$itask_id pages=".count($raws)."(保存済みの画像 ".count($pages)." ページ)");
			if (count($pages) > 0 && count($raws) != count($pages)) {
				$notes[] = "元PDFのページ数(".count($raws).")と保存済みの画像のページ数(".count($pages).")が違います";
			}
		} catch (Exception $e) {
			$raws = array();
			$notes[] = "元PDFを使えなかったため保存済みの画像で分析しました: ".$e->getMessage();
			ana_log("元PDF NG itask=$itask_id ".$e->getMessage());
		}
	}
	if (count($raws) == 0) {
		if (count($pages) == 0) { throw new Exception("ページ画像がありません"); }
		foreach ($pages as $p) {
			$raw = itask_aitext_page_raw($p);
			if ($raw === false || $raw === "") { throw new Exception("ページ画像を読めませんでした"); }
			$raws[] = $raw;
		}
	}
	$images = array();
	foreach ($raws as $raw) { $images[] = base64_encode($raw); }
	$page_count = count($images);
	unset($raws);

	// pmj-ana で分析
	$t1 = microtime(true);
	$res = ana_call(array("images" => $images, "doc_type" => $doc_type, "itask_id" => $itask_id));
	unset($images);
	$jsoncode = $res["result"];
	if ($doc_type === "kojin") { $jsoncode["document_judgment_flag"] = "kojin"; }
	$block = $jsoncode["format_info"]["cols"][0]["block_result"];
	ana_log("pmj-ana OK itask=$itask_id rows=".count($block["detail"])." ".round(microtime(true)-$t1,1)."s log=".json_encode(isset($res["log"]) ? $res["log"] : array(), JSON_UNESCAPED_UNICODE));

	// 分析動作の記録(make.do 1093-1119 と同じ。isplit_method を make_ana にする)
	$rs = runsql(__FILE__, "SELECT member_id FROM v_itask_file_info WHERE itask_id=$itask_id");
	$member_id = "NULL";
	while ($rs && ($row = mysql_fetch_assoc($rs))) { $member_id = intval($row["member_id"]); }
	runsql(__FILE__, "INSERT INTO i_analysis_history (TYPE, itask_id, user_id, member_id, isplit_api, isplit_method, call_api, unit)"
		." VALUES ('".ana_esc($type)."', $itask_id, $user_id, $member_id, 'B', 'make_ana', 'pmj-ana', $page_count)");
	runsql(__FILE__, "UPDATE m_itask SET itask_format_id=-1, update_at=now() WHERE itask_id=$itask_id");

	runsql(__FILE__, "START TRANSACTION");
	// 置き換える前の勘定科目を退避(元に戻すときは batch/ikisaki_itask_make_ana_restore.do)
	$cols = array();
	$rs = runsql(__FILE__, "SHOW COLUMNS FROM i_kanjo_info");
	while ($rs && ($row = mysql_fetch_assoc($rs))) { $cols[] = "`".$row["Field"]."`"; }
	$col_list = implode(",", $cols);
	$rs = runsql(__FILE__, "INSERT INTO i_kanjo_info_ana_bk (bk_queue_id, bk_at, $col_list) SELECT $qid, NOW(), $col_list FROM i_kanjo_info WHERE aitask_id=$itask_id");
	if (!$rs) {
		runsql(__FILE__, "ROLLBACK");
		throw new Exception("置き換え前の勘定科目の退避に失敗しました: ".mysqli_error($link));
	}
	$backup_rows = mysqli_affected_rows($link);
	// 精査ステータス・決算日・集計列(o0〜o31)も退避(キューの prev_top_info に JSON で)
	$o_cols = array();
	for ($oi = 0; $oi <= 31; $oi++) { $o_cols[] = "o".$oi; }
	$rs = runsql(__FILE__, "SELECT status, closing_date_date, ".implode(",", $o_cols)." FROM i_aitask_top_info WHERE itask_id=$itask_id");
	$prev_top = ($rs ? mysql_fetch_assoc($rs) : null);
	runsql(__FILE__, "UPDATE i_itask_queue_ana SET backup_rows=$backup_rows, prev_top_info='".ana_esc(json_encode($prev_top, JSON_UNESCAPED_UNICODE))."' WHERE id=$qid");

	// 勘定科目を置き換える(make.do の後処理の写し)
	$out = ana_build_kanjo($jsoncode, $itask_id);
	if (!empty($out["insert_error"])) {
		runsql(__FILE__, "ROLLBACK");
		throw new Exception("勘定科目の書き込みに失敗しました: ".$out["insert_error"]);
	}
	// 決算日(ana の読み取り結果で上書き。ファイル名の年月で確かめる)と精査ステータス=0(精査待)。会社コードは残す
	$set = array("status=0");
	$date = isset($block["closing_date"]["date"]) ? $block["closing_date"]["date"] : "";
	$closing = ana_closing_date($itask_id, $date, $notes);
	if ($closing !== "") {
		$set[] = "closing_date_date='".ana_esc($closing)."'";
		$set[] = "closing_date_page=NULL, closing_date_start_x=0, closing_date_start_y=0, closing_date_end_x=0, closing_date_end_y=0";
	}
	runsql(__FILE__, "UPDATE i_aitask_top_info SET ".implode(", ", $set)." WHERE itask_id=$itask_id");
	runsql(__FILE__, "COMMIT");

	// 成功: m_itask.status=9(完了)、キュー OK
	if ($out["bad"] === "bad") { $notes[] = "一部のタブ(資産/負債純資産/損益)の項目が見つかりませんでした"; }
	runsql(__FILE__, "UPDATE m_itask SET status=9, update_at=now() WHERE itask_id=$itask_id");
	runsql(__FILE__, "UPDATE i_itask_queue_ana SET status='OK', end_at=NOW(), error_message=".
		(count($notes) ? "'".ana_esc(mb_substr(implode(" / ", $notes), 0, 1000))."'" : "NULL")." WHERE id=$qid");
	ana_log("OK itask=$itask_id queue=$qid rows=".$out["rows"]." backup=$backup_rows bad=".$out["bad"]." ".round(microtime(true)-$time_start,1)."s ".implode(" / ", $notes));
} catch (Exception $e) {
	runsql(__FILE__, "ROLLBACK");      // 途中まで書いたものは戻す(トランザクション外なら何もしない)
	ana_fail($qid, $itask_id, $e->getMessage());
}
mysql_close($link);
?>
