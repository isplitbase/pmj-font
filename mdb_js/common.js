// var script = document.createElement("script");
// script.src = "./jquery-3.1.1.min.js";
// var head = document.getElementsByTagName("head");
// head[0].appendChild(script);
//基本オブジェクト
var CS = new Object();
// window.onunload = function(){};
//   ↑ ブラウザの「戻る」でキャッシュ(bfcache)から復元させないための書き方だが、今の Chrome では unload が
//     使えず「Permissions policy violation: unload is not allowed」と出るため、同じ目的を pageshow で行う(2026-10-09)
window.addEventListener("pageshow", function (e) { if (e.persisted) { location.reload(); } });
history.forward();
window.onresize = function(e){
	if(typeof CS.kaburudiv != "undefined" && CS.kaburudiv.style.display!="none"){
		CS.kaburudiv.style.display="none";
		CS.kaburudiv_font.style.display="none";
		CS.kaburudiv.style.height=window.innerHeight+"px";
		CS.kaburudiv.style.width=window.innerWidth+"px";
		CS.kaburudiv.style.left=$(window).scrollLeft()+"px";
		CS.kaburudiv.style.top=$(window).scrollTop()+"px";
		CS.kaburudiv_font.style.top=$(window).scrollTop()+(window.innerHeight-100-50)/2+"px";
		CS.kaburudiv_font.style.left=$(window).scrollLeft()+(window.innerWidth-300)/2+"px";
		CS.kaburudiv.style.display="";
		CS.kaburudiv_font.style.display="";
	}
	$(".windowbak").each(function(i, elem) {
		if(elem.kotei_flag){
			elem.style.top=$(window).scrollTop()+(window.innerHeight-CS.toI(elem.style.height))/2+"px";
			elem.style.left=$(window).scrollLeft()+(window.innerWidth-CS.toI(elem.style.width))/2+"px";
		}
		// elem.remove();
	});
	if(typeof CS.deletealert != "undefined" && CS.deletealert.style.display!="none"){
		CS.deletealert.style.height=window.innerHeight+"px";
		CS.deletealert.style.width=window.innerWidth+"px";
		CS.deletealert.style.left=$(window).scrollLeft()+"px";
		CS.deletealert.style.top=$(window).scrollTop()+"px";
		CS.modal_content.style.top=((window.innerHeight-179)/2)+"px";
		CS.modal_content.style.left=((window.innerWidth-430)/2)+"px";
	}
	if(typeof CS.stoppop != "undefined" && CS.stoppop.style.display!="none"){
		CS.stoppop.style.height=window.innerHeight+"px";
		CS.stoppop.style.width=window.innerWidth+"px";
		CS.stoppop.style.left=$(window).scrollLeft()+"px";
		CS.stoppop.style.top=$(window).scrollTop()+"px";
		CS.stoppop_content.style.top=((window.innerHeight-179)/2)+"px";
		CS.stoppop_content.style.left=((window.innerWidth-430)/2)+"px";
	}
	CS.itask_list_reset_header();
};
window.onscroll = function(e){
	if(typeof CS.kaburudiv != "undefined" && CS.kaburudiv.style.display!="none"){
		CS.kaburudiv.style.display="none";
		CS.kaburudiv_font.style.display="none";
		CS.kaburudiv.style.height=window.innerHeight+"px";
		CS.kaburudiv.style.width=window.innerWidth+"px";
		CS.kaburudiv.style.left=$(window).scrollLeft()+"px";
		CS.kaburudiv.style.top=$(window).scrollTop()+"px";
		CS.kaburudiv_font.style.top=$(window).scrollTop()+(window.innerHeight-100-50)/2+"px";
		CS.kaburudiv_font.style.left=$(window).scrollLeft()+(window.innerWidth-300)/2+"px";
		CS.kaburudiv.style.display="";
		CS.kaburudiv_font.style.display="";
	}
	$(".windowbak").each(function(i, elem) {
		if(elem.kotei_flag){
			elem.style.top=$(window).scrollTop()+(window.innerHeight-CS.toI(elem.style.height))/2+"px";
			elem.style.left=$(window).scrollLeft()+(window.innerWidth-CS.toI(elem.style.width))/2+"px";
		}
	});
	if(typeof CS.deletealert != "undefined" && CS.deletealert.style.display!="none"){
		CS.deletealert.style.height=window.innerHeight+"px";
		CS.deletealert.style.width=window.innerWidth+"px";
		CS.deletealert.style.left=$(window).scrollLeft()+"px";
		CS.deletealert.style.top=$(window).scrollTop()+"px";
		CS.modal_content.style.top=((window.innerHeight-179)/2)+"px";
		CS.modal_content.style.left=((window.innerWidth-430)/2)+"px";
	}
	if(typeof CS.stoppop != "undefined" && CS.stoppop.style.display!="none"){
		CS.stoppop.style.height=window.innerHeight+"px";
		CS.stoppop.style.width=window.innerWidth+"px";
		CS.stoppop.style.left=$(window).scrollLeft()+"px";
		CS.stoppop.style.top=$(window).scrollTop()+"px";
		CS.stoppop_content.style.top=((window.innerHeight-179)/2)+"px";
		CS.stoppop_content.style.left=((window.innerWidth-430)/2)+"px";
	}
};
CS.document_onkeydown=function(e){
	var isCtrlDown = false;
	if (e.metaKey) { // mac
		isCtrlDown = true;
	} else if (e.ctrlKey && navigator.userAgent.indexOf('Mac') === -1) { // pc
		isCtrlDown = true;
	}
	
	if (isCtrlDown) {
		/*if(CS.gaisansekeiflg){return false;}
		if(CS.isNotNull(e.currentTarget.offsetParent)&&CS.isNotNull(e.currentTarget.offsetParent.copytextObj)){
			e.currentTarget.offsetParent.copytextObj.style.display = "";
			e.currentTarget.offsetParent.copytextObj.select();
			return true;
		}else{
			return false;
		}*/
		return true;
	}
	if(e.target.mainasu!="OK"){
		if (e.keyCode == 189 || e.keyCode == 109) {
			for(var i=0;i<CS.selectedobjs.length;i++){
				if(CS.isNotNull(CS.selectedobjs[i])&&CS.selectedobjs[i].notminus==true){
					return false;
				}
			}
		}	
	}
	
	if (e.keyCode == 46) {
		for(var i=0;i<CS.selectedobjs.length;i++){
			if(CS.isNotNull(CS.selectedobjs[i])&&CS.isNotNull(CS.selectedobjs[i].style)&&CS.selectedobjs[i].style.display!="none"){
				CS.selectedobjs[i].innerHTML="";
				CS.selectedobjs[i].value="";
			}
		}
	}
	if ((e.keyCode>=37&&e.keyCode<=40)||e.keyCode==9||e.keyCode==13) {
		if(CS.isNotNull(CS.onbodyDirection)){
			CS.onbodyDirection(e);
		}
		if(CS.selectedobjs.length>1){
			return false;
		}
		if(CS.gaisansekeiflg){return false;}
		for(var i=0;i<CS.selectedobjs.length;i++){
			if(CS.isNotNull(CS.selectedobjs[i])&&CS.isNotNull(CS.selectedobjs[i].style)&&CS.selectedobjs[i].style.display!="none"){
				var ect=CS.selectedobjs[i];
				if(ect.style.backgroundColor!="rgb(0, 255, 255)"){
					return false;
				}
				if (e.keyCode == 38) {
					if (typeof ect.kobetufunction2 != "undefined") {
						// ↑ボタンを押したときに実行するイベント
						ect.kobetufunction2(ect);
					}
					if(CS.isNotNull(CS.to_select_flg)&&CS.to_select_flg){
						CS.to_select_flg=false;
						return false;
					}
					var focuseiti = ect.offsetParent.focuseiti;
					list = focuseiti.split("_");
					if(CS.isNotNull(ect.offsetParent.gyakuflg)&&ect.offsetParent.gyakuflg==true){
						var complet=true;
						//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
						if (CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2] - 1)])
							&& CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2] - 1)][CS.toI(list[3])])) {
							for (var i = CS.toI(list[2]) - 1; i > -1; i--) {
								if (CS.colored(ect.offsetParent.cl[i][CS.toI(list[3])].style.backgroundColor, 0) && ect.offsetParent.cl[i][CS.toI(list[3])].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[i][CS.toI(list[3])]);
									complet=false;
									break;
								}
							}
						}
						if(complet){
							if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3])-1])){
								var next=true;
								for(var j=CS.toI(list[3])-1;j>-1;j--){
									if(next){
										for (var i = ect.offsetParent.cl.length-1; i >-1; i--) {
											if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
												CS.toNoedit(ect);
												CS.to_select(ect.offsetParent.cl[i][j]);
												next=false;
												break;
											}
										}
									}else{break;}
								}
							}
						}						
					}else{
						var complet=true;
						if (CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])])
							&& CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) - 1])) {
							for (var i = CS.toI(list[3]) - 1; i > -1; i--) {
								if (CS.colored(ect.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && ect.offsetParent.cl[CS.toI(list[2])][i].editflg != false
									&& ect.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[CS.toI(list[2])][i]);
									complet=false;
									break
								}
							}
						}
						if(complet){
							if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])-1][0])){
								var next=true;
								for(var j=CS.toI(list[2])-1;j>-1;j--){
									if(next){
										for (var i = ect.offsetParent.cl[j].length-1; i > -1; i--) {
											if (CS.colored(ect.offsetParent.cl[j][i].style.backgroundColor, 0) && ect.offsetParent.clcl[j][i].editflg != false) {
												CS.toNoedit(ect);
												CS.to_select(ect.offsetParent.cl[j][i]);
												next=false;
												break;
											}
										}
									}else{break;}
								}
							}
						}
					}
					return false;
				} else if (e.keyCode == 40) {
					if (typeof ect.kobetufunction3 != "undefined") {
						// ↓ボタンを押したときに実行するイベント
						ect.kobetufunction3(ect);
					}
					if(CS.isNotNull(CS.to_select_flg)&&CS.to_select_flg){
						CS.to_select_flg=false;
						return false;
					}
					var focuseiti = ect.offsetParent.focuseiti;
					list = focuseiti.split("_");
					if(CS.isNotNull(ect.offsetParent.gyakuflg)&&ect.offsetParent.gyakuflg==true){
						//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
						var complet=true;
						if (CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2]) + 1]) 
							&& CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2]) + 1][CS.toI(list[3])])) {
							for (var i = CS.toI(list[2]) + 1; i < ect.offsetParent.cl.length; i++) {
								if (CS.colored(ect.offsetParent.cl[i][CS.toI(list[3])].style.backgroundColor, 0) && ect.offsetParent.cl[i][CS.toI(list[3])].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[i][CS.toI(list[3])]);
									complet=false;
									break;
								}
							}
						}
						if(complet){
							if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3])+1])){
								var next=true;
								for(var j=CS.toI(list[3])+1;j<ect.offsetParent.cl[0].length;j++){
									if(next){
										for (var i = 0; i < ect.offsetParent.cl.length; i++) {
											if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
												CS.toNoedit(ect);
												CS.to_select(ect.offsetParent.cl[i][j]);
												next=false;
												break;
											}
										}
									}else{break;}
								}
							}
						}
					}else{
						var complet=true;
						if (typeof ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) + 1] != "undefined") {
							for (var i = CS.toI(list[3]) + 1; i < ect.offsetParent.cl[CS.toI(list[2])].length; i++) {
								if (CS.colored(ect.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && ect.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[CS.toI(list[2])][i]);
									complet=false;
									break;
								}
							}
						}
						if(complet){
							if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])+1][0])){
								var next=true;
								for(var j=CS.toI(list[2])+1;j<ect.offsetParent.cl.length;j++){
									if(next){
										for (var i = 0; i < ect.offsetParent.cl[j].length; i++) {
											if (CS.colored(ect.offsetParent.cl[j][i].style.backgroundColor, 0) && ect.offsetParent.clcl[j][i].editflg != false) {
												CS.toNoedit(ect);
												CS.to_select(ect.offsetParent.cl[j][i]);
												next=false;
												break;
											}
										}
									}else{break;}
								}
							}
						}
					}
					return false;
				} else if (e.keyCode == 39) {
					if (typeof ect.kobetufunction4 != "undefined") {
						// →ボタンを押したときに実行するイベント
						ect.kobetufunction4(ect);
					}
					if(CS.isNotNull(CS.to_select_flg)&&CS.to_select_flg){
						CS.to_select_flg=false;
						return false;
					}
					var focuseiti = ect.offsetParent.focuseiti;
					list = focuseiti.split("_");
					if(CS.isNotNull(ect.offsetParent.gyakuflg)&&ect.offsetParent.gyakuflg==true){
						//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
						if (typeof ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) + 1] != "undefined") {
							for (var i = CS.toI(list[3]) + 1; i < ect.offsetParent.cl[CS.toI(list[2])].length; i++) {
								if (CS.colored(ect.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && ect.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[CS.toI(list[2])][i]);
									break;
								}
							}
						}
					}else{
						if (typeof ect.offsetParent.cl[CS.toI(list[2]) + 1] != "undefined" && typeof ect.offsetParent.cl[CS.toI(list[2]) + 1][CS.toI(list[3])] != "undefined") {
							for (var i = CS.toI(list[2]) + 1; i < ect.offsetParent.cl.length; i++) {
								if (CS.colored(ect.offsetParent.cl[i][CS.toI(list[3])].style.backgroundColor, 0) && ect.offsetParent.cl[i][CS.toI(list[3])].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[i][CS.toI(list[3])]);
									break;
								}
							}
						}	
					}
					return false;
				} else if (e.keyCode == 37) {
					if (typeof ect.kobetufunction5 != "undefined") {
						// ←ボタンを押したときに実行するイベント
						ect.kobetufunction5(ect);
					}
					if(CS.isNotNull(CS.to_select_flg)&&CS.to_select_flg){
						CS.to_select_flg=false;
						return false;
					}
					var focuseiti = ect.offsetParent.focuseiti;
					list = focuseiti.split("_");
					if(CS.isNotNull(ect.offsetParent.gyakuflg)&&ect.offsetParent.gyakuflg==true){
						//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
						if (typeof ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) - 1] != "undefined") {
							for (var i = CS.toI(list[3]) - 1; i > -1; i--) {
								if (CS.colored(ect.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && ect.offsetParent.cl[CS.toI(list[2])][i].editflg != false
									&& ect.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[CS.toI(list[2])][i]);
									break
								}
							}
						}
					}else{
						if (typeof ect.offsetParent.cl[CS.toI(list[2] - 1)][CS.toI(list[3])] != "undefined") {
							for (var i = CS.toI(list[2]) - 1; i > -1; i--) {
								if (CS.colored(ect.offsetParent.cl[i][CS.toI(list[3])].style.backgroundColor, 0) && ect.offsetParent.cl[i][CS.toI(list[3])].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[i][CS.toI(list[3])]);
									break;
								}
							}
						}	
					}
					return false;
				} else if (e.keyCode == 9) {
					// Tabボタンを押したときに実行するイベント
					if(CS.isNotNull(CS.to_select_flg)&&CS.to_select_flg){
						CS.to_select_flg=false;
						return false;
					}
					var focuseiti = ect.offsetParent.focuseiti;
					list = focuseiti.split("_");
					
					if(CS.isNotNull(ect.offsetParent.gyakuflg)&&ect.offsetParent.gyakuflg==true){
						//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
						if (CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) + 1])) {
							for (var i = CS.toI(list[3]) + 1; i < ect.offsetParent.cl[CS.toI(list[2])].length; i++) {
								if (CS.colored(ect.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && ect.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[CS.toI(list[2])][i]);
									break;
								}
							}
						}else if (CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2]) + 1]) && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2]) + 1][CS.toI(list[3])] )) {
							for (var i = 0; i < ect.offsetParent.cl[CS.toI(list[2]) + 1].length; i++) {
								if (CS.colored(ect.offsetParent.cl[CS.toI(list[2]) + 1][i].style.backgroundColor, 0) && ect.offsetParent.cl[CS.toI(list[2]) + 1][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[CS.toI(list[2]) + 1][i]);
									break;
								}
							}
						}	
					}else{
						if (CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2]) + 1])) {
							if (CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2]) + 1][CS.toI(list[3])])) {
								for (var i = CS.toI(list[2]) + 1; i < ect.offsetParent.cl.length; i++) {
									if (CS.colored(ect.offsetParent.cl[i][CS.toI(list[3])].style.backgroundColor, 0) && ect.offsetParent.cl[i][CS.toI(list[3])].editflg != false) {
										CS.toNoedit(ect);
										CS.to_select(ect.offsetParent.cl[i][CS.toI(list[3])]);
										break;
									}
								}
							}
						} else if (CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) + 1])) {
							for (var i = 0; i < ect.offsetParent.cl.length; i++) {
								if (CS.colored(ect.offsetParent.cl[i][CS.toI(list[3]) + 1].style.backgroundColor, 0)
									&& ect.offsetParent.cl[i][CS.toI(list[3]) + 1].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[i][CS.toI(list[3]) + 1]);
									break;
								}
							}
						}
					}
					return false;
				} else if (e.keyCode == 13) {
					//CS.toNoedit(ect);
					if (typeof ect.kobetufunction1 != "undefined") {
						// Enterボタンを押したときに実行するイベント
						if(ect.kobetufunction1(ect)==false){return false;}
					}
					if(CS.isNotNull(CS.to_select_flg)&&CS.to_select_flg){
						CS.to_select_flg=false;
						return false;
					}
					var focuseiti = ect.offsetParent.focuseiti;
					list = focuseiti.split("_");
					if(CS.isNotNull(ect.offsetParent.gyakuflg)&&ect.offsetParent.gyakuflg==true){
						var complet=true;
						//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
						if (typeof ect.offsetParent.cl[CS.toI(list[2]) + 1] != "undefined" && typeof ect.offsetParent.cl[CS.toI(list[2]) + 1][CS.toI(list[3])] != "undefined") {
							for (var i = CS.toI(list[2]) + 1; i < ect.offsetParent.cl.length; i++) {
								if (CS.colored(ect.offsetParent.cl[i][CS.toI(list[3])].style.backgroundColor, 0) && ect.offsetParent.cl[i][CS.toI(list[3])].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[i][CS.toI(list[3])]);
									complet=false;
									break;
								}
							}
						}
						if(complet){
							if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3])+1])){
								var next=true;
								for(var j=CS.toI(list[3])+1;j<ect.offsetParent.cl[0].length;j++){
									if(next){
										for (var i = 0; i < ect.offsetParent.cl.length; i++) {
											if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
												CS.toNoedit(ect);
												CS.to_select(ect.offsetParent.cl[i][j]);
												next=false;
												break;
											}
										}
									}else{break;}
								}
							}
						}
					}else{
						var complet=true;
						if (typeof ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) + 1] != "undefined") {
							for (var i = CS.toI(list[3]) + 1; i < ect.offsetParent.cl[CS.toI(list[2])].length; i++) {
								if (CS.colored(ect.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && ect.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[CS.toI(list[2])][i]);
									complet=false;
									break;
								}
							}
						}
						if(complet){
							if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])+1][0])){
								var next=true;
								for(var j=CS.toI(list[2])+1;j<ect.offsetParent.cl.length;j++){
									if(next){
										for (var i = 0; i < ect.offsetParent.cl[j].length; i++) {
											if (CS.colored(ect.offsetParent.cl[j][i].style.backgroundColor, 0) && ect.offsetParent.clcl[j][i].editflg != false) {
												CS.toNoedit(ect);
												CS.to_select(ect.offsetParent.cl[j][i]);
												next=false;
												break;
											}
										}
									}else{break;}
								}
							}
						}
					}
					return false;
				}
			}
		}
	} else if ((e.keyCode >= 48 && e.keyCode <= 90)
		|| (e.keyCode >= 96 && e.keyCode <= 105)
		|| (e.keyCode == 27 || e.keyCode == 32 
		|| e.keyCode == 109 || e.keyCode == 189
		|| e.keyCode == 110 || e.keyCode == 190)){
		var falseflg=false;
		for(var i=0;i<CS.selectedobjs.length;i++){
			if(CS.selectedobjs[i].style.backgroundColor=="rgb(0, 255, 255)"&&CS.isNotNull(CS.selectedobjs[i])&&CS.isNotNull(CS.selectedobjs[i].style)&&CS.selectedobjs[i].style.display!="none"){
				if(i==0){
					CS.selectedobjs[i].innerText = '';
					CS.selectedobjs[i].value= '';
					CS.to_select(CS.selectedobjs[i]);
					CS.selectedobjs[i].focus();
					if(CS.selectedobjs[i].thIstextflg){
						return true;
					}else{
						if((event.keyCode >= 48 && event.keyCode <= 57)
						|| (event.keyCode >= 96 && event.keyCode <= 105)
						|| event.keyCode == 109 || event.keyCode == 189
						|| event.keyCode == 110 
						|| event.keyCode == 190 || event.keyCode == 46){
							if(typeof CS.selectedobjs[i].select == "undefined"){
								//ミニキーボード対応
								var ekeycode=e.keyCode;//
								if (e.keyCode >= 96 && e.keyCode <= 105) {
									ekeycode = e.keyCode - 48;
								}
								CS.selectedobjs[i].innerText=String.fromCharCode(ekeycode);
								CS.selectedobjs[i].value=String.fromCharCode(ekeycode);
								if (e.keyCode == 110 || e.keyCode == 190) {
									CS.selectedobjs[i].innerText= ".";
									CS.selectedobjs[i].value= ".";
								}
								var range = document.createRange();  
								var len = CS.selectedobjs[i].childNodes.length;  
								range.setStart(CS.selectedobjs[i], len);  
								range.setEnd(CS.selectedobjs[i], len);
								window.getSelection().removeAllRanges();
								window.getSelection().addRange(range);
								CS.selectedobjs[i].focus();
								event.preventDefault();
							}
						}
						return CS.numOnly();
					}

					falseflg=true;
					/*var range = document.createRange();  
					var len = CS.selectedobjs[i].childNodes.length;  
					range.setStart(CS.selectedobjs[i], 0);  
					range.setEnd(CS.selectedobjs[i], len);  
					getSelection().addRange(range);  
					CS.selectedobjs[i].focus();*/

				}else{
					CS.toNoedit(CS.selectedobjs[i]);
				}
			}
		}
		
		if (e.keyCode != 27 && e.keyCode != 32 && e.keyCode != 110 && e.keyCode != 190) {
//			event.preventDefault();
		} else {
			if(CS.isNotNull(CS.selectedobjs[0])&&CS.isNotNull(CS.selectedobjs[0].style)&&CS.selectedobjs[0].style.display!="none"){
				//CS.selectedobjs[0].focus();
			}
		}
		if(falseflg){
			return false;
		}else{
			//return CS.numOnly();
		}
		//return true;
	}else if (e.keyCode == 25){
		for(var i=0;i<CS.selectedobjs.length;i++){
			if(CS.selectedobjs[i].style.backgroundColor=="rgb(0, 255, 255)"&&CS.isNotNull(CS.selectedobjs[i])&&CS.isNotNull(CS.selectedobjs[i].style)&&CS.selectedobjs[i].style.display!="none"){
				if(i==0){
					CS.to_select(CS.selectedobjs[i]);
					CS.selectedobjs[i].focus();
				}else{
					CS.toNoedit(CS.selectedobjs[i]);
				}
			}
		}
		return true;
	}
}

CS.document_onkeydown_ikkatuKajyu=function(e){
	var isCtrlDown = false;
	if (e.metaKey) { // mac
		isCtrlDown = true;
	} else if (e.ctrlKey && navigator.userAgent.indexOf('Mac') === -1) { // pc
		isCtrlDown = true;
	}
	
	if (isCtrlDown) {
		/*if(CS.gaisansekeiflg){return false;}
		if(CS.isNotNull(e.currentTarget.offsetParent)&&CS.isNotNull(e.currentTarget.offsetParent.copytextObj)){
			e.currentTarget.offsetParent.copytextObj.style.display = "";
			e.currentTarget.offsetParent.copytextObj.select();
			return true;
		}else{
			return false;
		}*/
		return true;
	}
	if(e.target.mainasu!="OK"){
		if (e.keyCode == 189 || e.keyCode == 109) {
			for(var i=0;i<CS.selectedobjs.length;i++){
				if(CS.isNotNull(CS.selectedobjs[i])&&CS.selectedobjs[i].notminus==true){
					return false;
				}
			}
		}	
	}
	
	if (e.keyCode == 46) {
		for(var i=0;i<CS.selectedobjs.length;i++){
			if(CS.isNotNull(CS.selectedobjs[i])&&CS.isNotNull(CS.selectedobjs[i].style)&&CS.selectedobjs[i].style.display!="none"){
				CS.selectedobjs[i].innerHTML="";
				CS.selectedobjs[i].value="";
			}
		}
	}
	if ((e.keyCode>=37&&e.keyCode<=40)||e.keyCode==9||e.keyCode==13) {
		if(CS.isNotNull(CS.onbodyDirection)){
			CS.onbodyDirection(e);
		}
		if(CS.selectedobjs.length>1){
			return false;
		}
		if(CS.gaisansekeiflg){return false;}
		for(var i=0;i<CS.selectedobjs.length;i++){
			if(CS.isNotNull(CS.selectedobjs[i])&&CS.isNotNull(CS.selectedobjs[i].style)&&CS.selectedobjs[i].style.display!="none"){
				var ect=CS.selectedobjs[i];
				if(ect.style.backgroundColor!="rgb(0, 255, 255)"){
					return false;
				}
				if (e.keyCode == 38) {
					if (typeof ect.kobetufunction2 != "undefined") {
						// ↑ボタンを押したときに実行するイベント
						ect.kobetufunction2(ect);
					}
					if(CS.isNotNull(CS.to_select_flg)&&CS.to_select_flg){
						CS.to_select_flg=false;
						return false;
					}
					var focuseiti = ect.offsetParent.focuseiti;
					list = focuseiti.split("_");
					if(CS.isNotNull(ect.offsetParent.gyakuflg)&&ect.offsetParent.gyakuflg==true){
						var complet=true;
						//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
						var nextrow=CS.toI(list[2]) - 1;
						var nextclu=CS.toI(list[3]);
						if(CS.toI(list[2])%CS.btnNameLst.length==0){
							nextrow=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)*CS.btnNameLst.length+CS.btnNameLst.length-1;
							nextclu=nextclu-1;
						}
						if (CS.isNotNull(ect.offsetParent.cl[nextrow])
							&& CS.isNotNull(ect.offsetParent.cl[nextrow][CS.toI(list[3])])) {
							for (var i = nextrow; i >= Math.floor(CS.toI(list[2])/CS.btnNameLst.length)*CS.btnNameLst.length; i--) {
								if (CS.colored(ect.offsetParent.cl[i][nextclu].style.backgroundColor, 0) && ect.offsetParent.cl[i][nextclu].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[i][nextclu]);
									complet=false;
									break;
								}
							}
						}
						if(complet){
							var k=Math.floor(CS.toI(list[2])/CS.btnNameLst.length);
							var next=true;
							for(var j=nextclu-1;j>=0;j--){
								for (var i = k*CS.btnNameLst.length+CS.btnNameLst.length-1; i >= k*CS.btnNameLst.length; i--) {
									if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
										CS.toNoedit(ect);
										CS.to_select(ect.offsetParent.cl[i][j]);
										complet=false;
										next=false;
										break;
									}
								}
								if(!next){
									break;
								}
							}
						}
						if(complet){
							nextrow=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)+1;
							nextrow=nextrow*CS.btnNameLst.length;
							if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[nextrow]) && CS.isNotNull(ect.offsetParent.cl[nextrow][0])){
								var next=true;
								for(var k=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)+1;k<ect.offsetParent.cl.length/CS.btnNameLst.length;k++){
									for(var j=ect.offsetParent.cl[0].length-1;j>=0;j--){
										if(next){
											for (var i = (k+1)*CS.btnNameLst.length-1; i >= k*CS.btnNameLst.length ; i--) {
												if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
													CS.toNoedit(ect);
													CS.to_select(ect.offsetParent.cl[i][j]);
													next=false;
													break;
												}
											}
										}else{break;}
									}
									if(!next){break;}
								}
							}
							
							// nextrow=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)-1;
							// nextrow=nextrow*CS.btnNameLst.length;
							// if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[nextrow]) && CS.isNotNull(ect.offsetParent.cl[nextrow][0])){
								// var next=true;
								// for(var k=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)-1;k>=0;k--){
									// for(var j=ect.offsetParent.cl[i].length-1;j>=0;j--){
										// if(next){
											// for (var i = k*CS.btnNameLst.length+CS.btnNameLst.length-1; i >=k*CS.btnNameLst.length; i--) {
												// if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
													// CS.toNoedit(ect);
													// CS.to_select(ect.offsetParent.cl[i][j]);
													// next=false;
													// break;
												// }
											// }
										// }else{break;}
									// }
								// }
							// }
						}						
					}else{
						var complet=true;
						if (CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])])
							&& CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) - 1])) {
							for (var i = CS.toI(list[3]) - 1; i > -1; i--) {
								if (CS.colored(ect.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && ect.offsetParent.cl[CS.toI(list[2])][i].editflg != false
									&& ect.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[CS.toI(list[2])][i]);
									complet=false;
									break
								}
							}
						}
						if(complet){
							if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])-1][0])){
								var next=true;
								for(var j=CS.toI(list[2])-1;j>-1;j--){
									if(next){
										for (var i = ect.offsetParent.cl[j].length-1; i > -1; i--) {
											if (CS.colored(ect.offsetParent.cl[j][i].style.backgroundColor, 0) && ect.offsetParent.clcl[j][i].editflg != false) {
												CS.toNoedit(ect);
												CS.to_select(ect.offsetParent.cl[j][i]);
												next=false;
												break;
											}
										}
									}else{break;}
								}
							}
						}
					}
					return false;
				} else if (e.keyCode == 40) {
					if (typeof ect.kobetufunction3 != "undefined") {
						// ↓ボタンを押したときに実行するイベント
						ect.kobetufunction3(ect);
					}
					if(CS.isNotNull(CS.to_select_flg)&&CS.to_select_flg){
						CS.to_select_flg=false;
						return false;
					}
					var focuseiti = ect.offsetParent.focuseiti;
					list = focuseiti.split("_");
					if(CS.isNotNull(ect.offsetParent.gyakuflg)&&ect.offsetParent.gyakuflg==true){
						//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
						var complet=true;
						var nextrow=CS.toI(list[2]) + 1;
						var nextclu=CS.toI(list[3]);
						if(CS.toI(list[2])%CS.btnNameLst.length==CS.btnNameLst.length-1){
							nextrow=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)*CS.btnNameLst.length;
							nextclu=nextclu+1;
						}
						if (CS.isNotNull(ect.offsetParent.cl[nextrow]) 
							&& CS.isNotNull(ect.offsetParent.cl[nextrow][nextclu])) {
							for (var i = nextrow; i < Math.floor(CS.toI(list[2])/CS.btnNameLst.length)*CS.btnNameLst.length+CS.btnNameLst.length; i++) {
								if (CS.colored(ect.offsetParent.cl[i][nextclu].style.backgroundColor, 0) && ect.offsetParent.cl[i][nextclu].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[i][nextclu]);
									complet=false;
									break;
								}
							}
						}
						if(complet){
							var k=Math.floor(CS.toI(list[2])/CS.btnNameLst.length);
							var next=true;
							for(var j=nextclu+1;j<ect.offsetParent.cl[0].length;j++){
								if(next){
									for (var i = k*CS.btnNameLst.length; i < (k+1)*CS.btnNameLst.length; i++) {
										if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
											CS.toNoedit(ect);
											CS.to_select(ect.offsetParent.cl[i][j]);
											complet=false;
											next=false;
											break;
										}
									}
								}else{break;}
							}
						}

						if(complet){
							
							nextrow=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)-1;
							nextrow=nextrow*CS.btnNameLst.length;
							if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[nextrow]) && CS.isNotNull(ect.offsetParent.cl[nextrow][0])){
								var next=true;
								for(var k=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)-1;k>=0;k--){
									for(var j=0;j<ect.offsetParent.cl[0].length;j++){
										if(next){
											for (var i = k*CS.btnNameLst.length; i <k*CS.btnNameLst.length+CS.btnNameLst.length; i++) {
												if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
													CS.toNoedit(ect);
													CS.to_select(ect.offsetParent.cl[i][j]);
													next=false;
													break;
												}
											}
										}else{break;}
									}
									if(!next){break;}
								}
							}
							
							// nextrow=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)+1;
							// nextrow=nextrow*CS.btnNameLst.length;
							// if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[nextrow]) && CS.isNotNull(ect.offsetParent.cl[nextrow][0])){
								// var next=true;
								// for(var k=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)+1;k<ect.offsetParent.cl.length/CS.btnNameLst.length;k++){
									// for(var j=0;j<ect.offsetParent.cl[0].length;j++){
										// if(next){
											// for (var i = k*CS.btnNameLst.length; i < (k+1)*CS.btnNameLst.length; i++) {
												// if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
													// CS.toNoedit(ect);
													// CS.to_select(ect.offsetParent.cl[i][j]);
													// next=false;
													// break;
												// }
											// }
										// }else{break;}
									// }
									// if(!next){break;}
								// }
							// }
						}
					}else{
						var complet=true;
						if (typeof ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) + 1] != "undefined") {
							for (var i = CS.toI(list[3]) + 1; i < ect.offsetParent.cl[CS.toI(list[2])].length; i++) {
								if (CS.colored(ect.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && ect.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[CS.toI(list[2])][i]);
									complet=false;
									break;
								}
							}
						}
						if(complet){
							if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])+1][0])){
								var next=true;
								for(var j=CS.toI(list[2])+1;j<ect.offsetParent.cl.length;j++){
									if(next){
										for (var i = 0; i < ect.offsetParent.cl[j].length; i++) {
											if (CS.colored(ect.offsetParent.cl[j][i].style.backgroundColor, 0) && ect.offsetParent.clcl[j][i].editflg != false) {
												CS.toNoedit(ect);
												CS.to_select(ect.offsetParent.cl[j][i]);
												next=false;
												break;
											}
										}
									}else{break;}
								}
							}
						}
					}
					return false;
				}else if (e.keyCode == 39) {
					if (typeof ect.kobetufunction4 != "undefined") {
						// →ボタンを押したときに実行するイベント
						ect.kobetufunction4(ect);
					}
					if(CS.isNotNull(CS.to_select_flg)&&CS.to_select_flg){
						CS.to_select_flg=false;
						return false;
					}
					var focuseiti = ect.offsetParent.focuseiti;
					list = focuseiti.split("_");
					if(CS.isNotNull(ect.offsetParent.gyakuflg)&&ect.offsetParent.gyakuflg==true){
						//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
						if (typeof ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) + 1] != "undefined") {
							for (var i = CS.toI(list[3]) + 1; i < ect.offsetParent.cl[CS.toI(list[2])].length; i++) {
								if (CS.colored(ect.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && ect.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[CS.toI(list[2])][i]);
									break;
								}
							}
						}
					}else{
						if (typeof ect.offsetParent.cl[CS.toI(list[2]) + 1] != "undefined" && typeof ect.offsetParent.cl[CS.toI(list[2]) + 1][CS.toI(list[3])] != "undefined") {
							for (var i = CS.toI(list[2]) + 1; i < ect.offsetParent.cl.length; i++) {
								if (CS.colored(ect.offsetParent.cl[i][CS.toI(list[3])].style.backgroundColor, 0) && ect.offsetParent.cl[i][CS.toI(list[3])].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[i][CS.toI(list[3])]);
									break;
								}
							}
						}	
					}
					return false;
				} else if (e.keyCode == 37) {
					if (typeof ect.kobetufunction5 != "undefined") {
						// ←ボタンを押したときに実行するイベント
						ect.kobetufunction5(ect);
					}
					if(CS.isNotNull(CS.to_select_flg)&&CS.to_select_flg){
						CS.to_select_flg=false;
						return false;
					}
					var focuseiti = ect.offsetParent.focuseiti;
					list = focuseiti.split("_");
					if(CS.isNotNull(ect.offsetParent.gyakuflg)&&ect.offsetParent.gyakuflg==true){
						//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
						if (typeof ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) - 1] != "undefined") {
							for (var i = CS.toI(list[3]) - 1; i > -1; i--) {
								if (CS.colored(ect.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && ect.offsetParent.cl[CS.toI(list[2])][i].editflg != false
									&& ect.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[CS.toI(list[2])][i]);
									break
								}
							}
						}
					}else{
						if (typeof ect.offsetParent.cl[CS.toI(list[2] - 1)][CS.toI(list[3])] != "undefined") {
							for (var i = CS.toI(list[2]) - 1; i > -1; i--) {
								if (CS.colored(ect.offsetParent.cl[i][CS.toI(list[3])].style.backgroundColor, 0) && ect.offsetParent.cl[i][CS.toI(list[3])].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[i][CS.toI(list[3])]);
									break;
								}
							}
						}	
					}
					return false;
				} else if (e.keyCode == 39 || e.keyCode == 40) {
					return false;
				} else if (e.keyCode == 13) {
					//CS.toNoedit(ect);
					if (typeof ect.kobetufunction1 != "undefined") {
						// Enterボタンを押したときに実行するイベント
						if(ect.kobetufunction1(ect)==false){return false;}
					}
					if(CS.isNotNull(CS.to_select_flg)&&CS.to_select_flg){
						CS.to_select_flg=false;
						return false;
					}
					var focuseiti = ect.offsetParent.focuseiti;
					list = focuseiti.split("_");
					if(CS.isNotNull(ect.offsetParent.gyakuflg)&&ect.offsetParent.gyakuflg==true){
						//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
						var complet=true;
						var nextrow=CS.toI(list[2]) + 1;
						var nextclu=CS.toI(list[3]);
						if(CS.toI(list[2])%CS.btnNameLst.length==CS.btnNameLst.length-1){
							nextrow=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)*CS.btnNameLst.length;
							nextclu=nextclu+1;
						}
						if (CS.isNotNull(ect.offsetParent.cl[nextrow]) 
							&& CS.isNotNull(ect.offsetParent.cl[nextrow][nextclu])) {
							for (var i = nextrow; i < Math.floor(CS.toI(list[2])/CS.btnNameLst.length)*CS.btnNameLst.length+CS.btnNameLst.length; i++) {
								if (CS.colored(ect.offsetParent.cl[i][nextclu].style.backgroundColor, 0) && ect.offsetParent.cl[i][nextclu].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[i][nextclu]);
									complet=false;
									break;
								}
							}
						}
						if(complet){
							var k=Math.floor(CS.toI(list[2])/CS.btnNameLst.length);
							var next=true;
							for(var j=nextclu+1;j<ect.offsetParent.cl[0].length;j++){
								if(next){
									for (var i = k*CS.btnNameLst.length; i < (k+1)*CS.btnNameLst.length; i++) {
										if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
											CS.toNoedit(ect);
											CS.to_select(ect.offsetParent.cl[i][j]);
											complet=false;
											next=false;
											break;
										}
									}
								}else{break;}
							}
						}
						
						if(complet){
							nextrow=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)-1;
							nextrow=nextrow*CS.btnNameLst.length;
							if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[nextrow]) && CS.isNotNull(ect.offsetParent.cl[nextrow][0])){
								var next=true;
								for(var k=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)-1;k>=0;k--){
									for(var j=0;j<ect.offsetParent.cl[0].length;j++){
										if(next){
											for (var i = k*CS.btnNameLst.length; i <k*CS.btnNameLst.length+CS.btnNameLst.length; i++) {
												if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
													CS.toNoedit(ect);
													CS.to_select(ect.offsetParent.cl[i][j]);
													next=false;
													break;
												}
											}
										}else{break;}
									}
									if(!next){break;}
								}
							}
						}
					}else{
						var complet=true;
						if (typeof ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) + 1] != "undefined") {
							for (var i = CS.toI(list[3]) + 1; i < ect.offsetParent.cl[CS.toI(list[2])].length; i++) {
								if (CS.colored(ect.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && ect.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[CS.toI(list[2])][i]);
									complet=false;
									break;
								}
							}
						}
						if(complet){
							if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])+1][0])){
								var next=true;
								for(var j=CS.toI(list[2])+1;j<ect.offsetParent.cl.length;j++){
									if(next){
										for (var i = 0; i < ect.offsetParent.cl[j].length; i++) {
											if (CS.colored(ect.offsetParent.cl[j][i].style.backgroundColor, 0) && ect.offsetParent.clcl[j][i].editflg != false) {
												CS.toNoedit(ect);
												CS.to_select(ect.offsetParent.cl[j][i]);
												next=false;
												break;
											}
										}
									}else{break;}
								}
							}
						}
					}
					return false;
				}
			}
		}
	} else if ((e.keyCode >= 48 && e.keyCode <= 90)
		|| (e.keyCode >= 96 && e.keyCode <= 105)
		|| (e.keyCode == 27 || e.keyCode == 32 
		|| e.keyCode == 109 || e.keyCode == 189
		|| e.keyCode == 110 || e.keyCode == 190)){
		var falseflg=false;
		for(var i=0;i<CS.selectedobjs.length;i++){
			if(CS.selectedobjs[i].style.backgroundColor=="rgb(0, 255, 255)"&&CS.isNotNull(CS.selectedobjs[i])&&CS.isNotNull(CS.selectedobjs[i].style)&&CS.selectedobjs[i].style.display!="none"){
				if(i==0){
					CS.selectedobjs[i].innerText = '';
					CS.selectedobjs[i].value= '';
					CS.to_select(CS.selectedobjs[i]);
					CS.selectedobjs[i].focus();
					if(CS.selectedobjs[i].thIstextflg){
						return true;
					}else{
						if((event.keyCode >= 48 && event.keyCode <= 57)
						|| (event.keyCode >= 96 && event.keyCode <= 105)
						|| event.keyCode == 109 || event.keyCode == 189
						|| event.keyCode == 110 
						|| event.keyCode == 190 || event.keyCode == 46){
							if(typeof CS.selectedobjs[i].select == "undefined"){
								//ミニキーボード対応
								var ekeycode=e.keyCode;//
								if (e.keyCode >= 96 && e.keyCode <= 105) {
									ekeycode = e.keyCode - 48;
								}
								CS.selectedobjs[i].innerText=String.fromCharCode(ekeycode);
								CS.selectedobjs[i].value=String.fromCharCode(ekeycode);
								if (e.keyCode == 110 || e.keyCode == 190) {
									CS.selectedobjs[i].innerText= ".";
									CS.selectedobjs[i].value= ".";
								}
								var range = document.createRange();  
								var len = CS.selectedobjs[i].childNodes.length;  
								range.setStart(CS.selectedobjs[i], 0);  
								range.setEnd(CS.selectedobjs[i], len);  
								getSelection().addRange(range);  
								CS.selectedobjs[i].focus();
							}
						}
						return CS.numOnly();
					}

					falseflg=true;
					/*var range = document.createRange();  
					var len = CS.selectedobjs[i].childNodes.length;  
					range.setStart(CS.selectedobjs[i], 0);  
					range.setEnd(CS.selectedobjs[i], len);  
					getSelection().addRange(range);  
					CS.selectedobjs[i].focus();*/

				}else{
					CS.toNoedit(CS.selectedobjs[i]);
				}
			}
		}
		
		if (e.keyCode != 27 && e.keyCode != 32 && e.keyCode != 110 && e.keyCode != 190) {
//			event.preventDefault();
		} else {
			if(CS.isNotNull(CS.selectedobjs[0])&&CS.isNotNull(CS.selectedobjs[0].style)&&CS.selectedobjs[0].style.display!="none"){
				//CS.selectedobjs[0].focus();
			}
		}
		if(falseflg){
			return false;
		}else{
			//return CS.numOnly();
		}
		//return true;
	}else if (e.keyCode == 25){
		for(var i=0;i<CS.selectedobjs.length;i++){
			if(CS.selectedobjs[i].style.backgroundColor=="rgb(0, 255, 255)"&&CS.isNotNull(CS.selectedobjs[i])&&CS.isNotNull(CS.selectedobjs[i].style)&&CS.selectedobjs[i].style.display!="none"){
				if(i==0){
					CS.to_select(CS.selectedobjs[i]);
					CS.selectedobjs[i].focus();
				}else{
					CS.toNoedit(CS.selectedobjs[i]);
				}
			}
		}
		return true;
	}
}
// document.onkeydown=CS.document_onkeydown;
CS.to_select=function(o){
	var toeditableflg=false;
	if (o.editevendflg == false &&o.inputflg == true ) {
		toeditableflg=true;
	}else if(!CS.isNotNull(o.editevendflg)){
		toeditableflg=true;
	}else if(o.editevendflg==true){
		toeditableflg=true;
	}
	if(toeditableflg){
		if(o.style.backgroundColor=="rgb(0, 255, 255)"){
			CS.toeditable(o);
		}else{
			CS.selectedobjs=[];
			CS.selectedobjs[CS.selectedobjs.length]=o;
			o.offsetParent.focuseiti = o.id;
			CS.takeStaticColor(o, "rgb(0, 255, 255)");
		}
	}
	o.contentEditable = "true";
	o.focus();
	//o.contentEditable = "false";
}
CS.tokyoyo=function(){
	if(CS.isNotNull(CS.albearcaserver_rp4)){
		CS.kyoyou_y="60px";
		//許容用サービス:rp4,ra1,ra2,ra3,ra11,ra12,ra13
		CS.albearcaserver_rp4();
	}
}
CS.tofugokyoyo=function(){
	if(CS.isNotNull(CS.fugokyoyo.albearcaserver_rp4)){
		CS.kyoyou_y="60px";
		//許容用サービス:rp4,ra1,ra2,ra3,ra11,ra12,ra13
		CS.fugokyoyo.albearcaserver_rp4();
	}
}

//ボタンを押した場合
CS.openPilelayout = function(e) {
	if (window.confirm('杭種テーブルが初期化されます。')) {
	} else {
		return;
	}
	function openPilelayout() {
		if (CS.openPilelayout.loadObj.readyState == 4 && CS.openPilelayout.loadObj.status == 200) {
			//杭の割付：長期LPに割付へ遷移する
			window.location.href = "./pilelayout.html";
		}
	}
	CS.openPilelayout.loadObj = createXMLHttpRequest(openPilelayout);
	CS.openPilelayout.loadObj.open("POST", "./kenteihizu.php?fun=openPilelayout&kouzousyssessionid=" 
							+ CS.getcookie("kouzousyssessionid") + "&data=" + Number(new Date), true);
	CS.openPilelayout.loadObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	CS.openPilelayout.loadObj.send("project_id="+CS.getcookie("prjId"));
};
CS.setShinko_flag=function(o){
$.ajax({
	type: "POST",
	url: "ankenlist.php?fun=setshinko_flag&kouzousyssessionid=" + CS.getcookie("kouzousyssessionid") + "&data=" + Number(new Date),
	async: false,
	dataType:'xml',
	data: {
		"project_id": CS.getcookie("prjId"),
		"shinko_flag": o
	},
	success: function(j_data){
		var req = j_data.getElementsByTagName("list");
		CS.getShinko_flag();
	}
});
};
CS.getShinko_flag=function(){
$.ajax({
	type: "POST",
	url: "ankenlist.php?fun=getshinkoflag&kouzousyssessionid=" + CS.getcookie("kouzousyssessionid") + "&data=" + Number(new Date),
	async: false,
	dataType:'xml',
	data: {
		"project_id": CS.getcookie("prjId")
	},
	success: function(j_data){
		var req = j_data.getElementsByTagName("list");
		
		var shinko_flag = CS.gettagchi(req[0],"shinko_flag");
		if(shinko_flag==""){
			shinko_flag=0;
		}else{
			shinko_flag=CS.toI(shinko_flag);
		}
		if(shinko_flag==10 && CS.common_kenntou_hanni=="0"){
			if(window.location.href.indexOf("pilelayout.html") == -1 
			&& window.location.href.indexOf("pilelayout2.html") == -1 
			&& window.location.href.indexOf("pilelayout3.html") == -1
			&& window.location.href.indexOf("pilelayout4.html") == -1){
				CS.getShinko_flag_1();
				return;
			}
		}else if(shinko_flag<10 && CS.common_kenntou_hanni=="1" && (window.location.href.indexOf("ankenregist.html") != -1
			|| window.location.href.indexOf("designprinc1.html") != -1
			|| window.location.href.indexOf("jibanbaseinfo.html") != -1
			|| window.location.href.indexOf("loadbatchinput.html") != -1
			|| window.location.href.indexOf("suiheiryoku.html?key=koteido") != -1)
		){
			CS.getShinko_flag_3();
			return;
		}else if(shinko_flag==10 && CS.common_kenntou_hanni=="1" && (window.location.href.indexOf("pilelayout.html") == -1
			&& window.location.href.indexOf("pilelayout2.html") == -1
			&& window.location.href.indexOf("pilelayout3.html") == -1
			&& window.location.href.indexOf("pilelayout4.html") == -1)
		){
			CS.getShinko_flag_4();
			return;
		}
		var sekkei_naiyou = CS.gettagchi(req[0],"sekkei_naiyou");
		if(sekkei_naiyou==""){
			sekkei_naiyou=0;
		}else{
			sekkei_naiyou=CS.toI(sekkei_naiyou);
		}
		CS.menu_none_torishin_touroku="./images/menyu/1/1_06.jpg";
		CS.menu_nogood_torishin_touroku="./images/menyu/2/2_06.jpg";
		CS.menu_now_torishin_touroku="./images/menyu/3/3_06.jpg";
		CS.menu_torishin_touroku_link="baseline.html";
		if(sekkei_naiyou==1){
			CS.menu_torishin_touroku_link="gaisandesign.html";
			CS.menu_none_torishin_touroku="./images/menyu/e1_03.jpg";
			CS.menu_nogood_torishin_touroku="./images/menyu/e2_03.jpg";
			CS.menu_now_torishin_touroku="./images/menyu/e3_03.jpg";
		}
		CS.menuimgs_none=[];
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/1/1_01.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/1/1_02.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/1/1_03.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/1/1_04.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/1/1_05.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]=CS.menu_none_torishin_touroku;
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/1/1_07.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/1/1_08.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/1/1_09.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/e1_01.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/e1_02.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/e1_04.jpg";
		
		CS.menuimgs_nogood=[];
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/2/2_03.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/2/2_04.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/2/2_05.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]=CS.menu_nogood_torishin_touroku;
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/2/2_07.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/2/2_08.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/2/2_09.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/e2_01.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/e2_02.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/e1_04.jpg";
		
		CS.menuimgs_now=[];
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/3/3_01.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/3/3_02.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/3/3_03.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/3/3_04.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/3/3_05.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]=CS.menu_now_torishin_touroku;
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/3/3_07.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/3/3_08.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/3/3_09.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/e3_01.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/e3_02.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/e1_04.jpg";
		
		if(!CS.isNotNull(CS.cssmenu)){
			CS.cssmenu = document.createElement("div");
			CS.cssmenu.style.left="20px";
			CS.cssmenu.style.zIndex = 9995;
			CS.cssmenu.style.width = "1750px";
			CS.cssmenu.id = "cssmenu2";
			document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu);
		}else{
			CS.cssmenu.innerHTML = "";
		}
		
		CS.cssmenu.main = document.createElement("table");
		
		CS.cssmenu.tr = document.createElement("tr");
		CS.cssmenu.tr.td = [];
		for(var i=0;i<12;i++){
			CS.cssmenu.tr.td[i] = document.createElement("td");
			CS.cssmenu.tr.appendChild(CS.cssmenu.tr.td[i]);
			CS.cssmenu.tr.td[i].im=document.createElement('img');
			CS.cssmenu.tr.td[i].im.src=CS.menuimgs_none[i];
			if(i==2 && shinko_flag<1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==3 && shinko_flag<2){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==4 && shinko_flag<3){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==5 && shinko_flag<4){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==6 && shinko_flag<5){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==7 && shinko_flag<6){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==8 && shinko_flag<7){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==9 && shinko_flag<8){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==10 && shinko_flag<9){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}
			if(i==0 && window.location.href.indexOf("ankenlist.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==1 && window.location.href.indexOf("ankenregist.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==2 && window.location.href.indexOf("designprinc1.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==3 && window.location.href.indexOf("jibanbaseinfo.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==4 && window.location.href.indexOf("borinfo.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==5 && window.location.href.indexOf(CS.menu_torishin_touroku_link) != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==6 && ( window.location.href.indexOf("loadinput.html") != -1 || window.location.href.indexOf("loadbatchinput.html") != -1 )){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==7 && window.location.href.indexOf("clumarlayout.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==8 && window.location.href.indexOf("footingin.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==9 && window.location.href.indexOf("pilelayout.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==10 && window.location.href.indexOf("suiheiryoku.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}
			if(i==0 && window.location.href.indexOf("ankenlist.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./ankenlist.html";};
			}else if(i==1 && window.location.href.indexOf("ankenregist.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){
					if(window.location.href.indexOf("ankenlist.html") != -1){
						//新規追加する場合
						CS.projectrigist("INIT",null);
					}else{
						location.href="./ankenregist.html";
					}
				};

			}else if(i==2 && shinko_flag>=1 && window.location.href.indexOf("designprinc1.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./designprinc1.html";};
			}else if(i==3 && shinko_flag>=2 && window.location.href.indexOf("jibanbaseinfo.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./jibanbaseinfo.html";};
			}else if(i==4 && shinko_flag>=3 && window.location.href.indexOf("borinfo.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./borinfo.html";};
			}else if(i==5 && shinko_flag>=4 && window.location.href.indexOf(CS.menu_torishin_touroku_link) == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./"+CS.menu_torishin_touroku_link;};
			}else if(i==6 && shinko_flag>=5 && ( window.location.href.indexOf("loadinput.html") == -1 || window.location.href.indexOf("loadbatchinput.html") == -1 )){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./loadbatchinput.html"};
			}else if(i==7 && shinko_flag>=6 && window.location.href.indexOf("clumarlayout.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./clumarlayout.html";};
			}else if(i==8 && shinko_flag>=7 && window.location.href.indexOf("footingin.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./footingin.html";};
			}else if(i==9 && shinko_flag>=8 && window.location.href.indexOf("pilelayout.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./pilelayout.html";};
			}else if(i==10 && shinko_flag>=9 && window.location.href.indexOf("suiheiryoku.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./suiheiryoku.html";};
			}else if(i==11){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){CS.logout();};
			}
			
			CS.cssmenu.tr.td[i].style.width="120px";
			CS.cssmenu.tr.td[i].appendChild(CS.cssmenu.tr.td[i].im);
		}
		CS.cssmenu.main.appendChild(CS.cssmenu.tr);
		CS.cssmenu.appendChild(CS.cssmenu.main);
		// 処理を記述

	}
});
};
CS.getShinko_flag_1=function(){
$.ajax({
	type: "POST",
	url: "ankenlist.php?fun=getshinkoflag&kouzousyssessionid=" + CS.getcookie("kouzousyssessionid") + "&data=" + Number(new Date),
	async: false,
	dataType:'xml',
	data: {
		"project_id": CS.getcookie("prjId")
	},
	success: function(j_data){
		var req = j_data.getElementsByTagName("list");
		
		var shinko_flag = CS.gettagchi(req[0],"shinko_flag");
		if(shinko_flag==""){
			shinko_flag=0;
		}else{
			shinko_flag=CS.toI(shinko_flag);
		}
		if(shinko_flag<10 && CS.common_kenntou_hanni!="1"){
			CS.getShinko_flag();
			return;
		}else if(shinko_flag<10 && CS.common_kenntou_hanni=="1" && (window.location.href.indexOf("ankenregist.html") != -1
			|| window.location.href.indexOf("designprinc1.html") != -1
			|| window.location.href.indexOf("jibanbaseinfo.html") != -1
			|| window.location.href.indexOf("loadbatchinput.html") != -1
			|| window.location.href.indexOf("suiheiryoku.html?key=koteido") != -1)
		){
			CS.getShinko_flag_3();
			return;
		}else if(shinko_flag==10 && CS.common_kenntou_hanni=="1" && (window.location.href.indexOf("pilelayout.html") == -1
			&& window.location.href.indexOf("pilelayout2.html") == -1
			&& window.location.href.indexOf("pilelayout3.html") == -1
			&& window.location.href.indexOf("pilelayout4.html") == -1)
		){
			CS.getShinko_flag_4();
			return;
		}
		var sekkei_naiyou = CS.gettagchi(req[0],"sekkei_naiyou");
		if(sekkei_naiyou==""){
			sekkei_naiyou=0;
		}else{
			sekkei_naiyou=CS.toI(sekkei_naiyou);
		}
		CS.menu_none_torishin_touroku="./images/menyu/1/1_06.jpg";
		CS.menu_nogood_torishin_touroku="./images/menyu/2/2_06.jpg";
		CS.menu_now_torishin_touroku="./images/menyu/3/3_06.jpg";
		CS.menu_torishin_touroku_link="baseline.html";
		if(sekkei_naiyou==1){
			CS.menu_torishin_touroku_link="gaisandesign.html";
			CS.menu_none_torishin_touroku="./images/menyu/e1_03.jpg";
			CS.menu_nogood_torishin_touroku="./images/menyu/e2_03.jpg";
			CS.menu_now_torishin_touroku="./images/menyu/e3_03.jpg";
		}
		CS.menuimgs_nogood=[];
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/0.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/1/1.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/1/2.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/1/3.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/1/4.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/1/5.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/1/6.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/1/7.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/1/8.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/1/9.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/1/10.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/1/11.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/1/12.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/1/13.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/14.jpg";
		CS.menuimgs_none=[];
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/0.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/1.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/2.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/3.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/4.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/5.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/6.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/7.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/8.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/9.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/10.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/11.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/12.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/13.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/14.jpg";
		
		if(!CS.isNotNull(CS.cssmenu)){
			CS.cssmenu = document.createElement("div");
			CS.cssmenu.style.left="20px";
			CS.cssmenu.style.zIndex = 9995;
			CS.cssmenu.style.width = "1850px";
			CS.cssmenu.id = "cssmenu2";
			document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu);
		}else{
			CS.cssmenu.innerHTML = "";
			CS.cssmenu.style.width = "1865px";
		}
		
		CS.cssmenu.main = document.createElement("table");
		CS.cssmenu.main.style.widht="1850px";
		CS.cssmenu.tr = document.createElement("tr");
		CS.cssmenu.tr.td = [];
		for(var i=0;i<15;i++){
			CS.cssmenu.tr.td[i] = document.createElement("td");
			CS.cssmenu.tr.appendChild(CS.cssmenu.tr.td[i]);
			CS.cssmenu.tr.td[i].im=document.createElement('img');
			CS.cssmenu.tr.td[i].im.src=CS.menuimgs_none[i];
			if(i==2 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==3 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==4 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==5 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==6 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==7 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==8 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==9 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==10 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==11 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==11 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==12 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==13 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==14 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}
			
			if(i==0 && window.location.href.indexOf("ankenlist.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./ankenlist.html";};
			}else if(i==1 && window.location.href.indexOf("ankenregist.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){
					if(window.location.href.indexOf("ankenlist.html") != -1){
						//新規追加する場合
						CS.projectrigist("INIT",null);
					}else{
						location.href="./ankenregist.html";
					}
				};

			}else if(i==2 && shinko_flag>=10 && window.location.href.indexOf("pilelayout.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./pilelayout.html";};
			}else if(i==3 && shinko_flag>=10 && window.location.href.indexOf("kenteihizudt.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./kenteihizudt.html";};
			}else if(i==4 && shinko_flag>=10 && window.location.href.indexOf("pileclass.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./pileclass.html";};
			}else if(i==5 && shinko_flag>=10 && window.location.href.indexOf("designprinc1.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./designprinc1.html";};
			}else if(i==6 && shinko_flag>=10 && ( window.location.href.indexOf("xxxxx") == -1 )){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].id="menu_jibankihon";
				CS.cssmenu.tr.td[i].im.mouseovermethod=function(e){
					var menu_jibankihon = $("#menu_jibankihon");
					CS.cssmenu.subbtn[0].style.display="";
					CS.cssmenu.subbtn[0].style.top=menu_jibankihon.offset().top+40+"px";
					CS.cssmenu.subbtn[0].style.left=menu_jibankihon.offset().left+23+"px";
					CS.cssmenu.subbtn[1].style.display="";
					CS.cssmenu.subbtn[1].style.top=menu_jibankihon.offset().top+82+"px";
					CS.cssmenu.subbtn[1].style.left=menu_jibankihon.offset().left+23+"px";
					
				};
				CS.cssmenu.tr.td[i].im.mouseoutmethod=function(e){
					var menu_jibankihon = $("#menu_jibankihon");
					CS.cssmenu.subbtn[0].style.display="none";
					CS.cssmenu.subbtn[1].style.display="none";
					
				};
				CS.cssmenu.tr.td[i].im.onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.tr.td[i].im.onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				
				CS.cssmenu.subbtn=[];
				CS.cssmenu.subbtn[0]=document.createElement('img');
				CS.cssmenu.subbtn[0].src="./images/menyu/4/3/a3_01.jpg";
				CS.cssmenu.subbtn[0].style.position = "absolute";
				CS.cssmenu.subbtn[0].style.display="none";
				CS.cssmenu.subbtn[0].style.zIndex = 99995;
				CS.cssmenu.subbtn[0].style.cursor="pointer";
				CS.cssmenu.subbtn[0].onclick=function(){location.href="./jibanbaseinfo.html";};
				CS.cssmenu.subbtn[0].onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.subbtn[0].onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu.subbtn[0]);
				CS.cssmenu.subbtn[1]=document.createElement('img');
				CS.cssmenu.subbtn[1].src="./images/menyu/4/3/a3_03.jpg";
				CS.cssmenu.subbtn[1].style.position = "absolute";
				CS.cssmenu.subbtn[1].style.display="none";
				CS.cssmenu.subbtn[1].style.zIndex = 99995;
				CS.cssmenu.subbtn[1].style.cursor="pointer";
				CS.cssmenu.subbtn[1].onclick=function(){location.href="./borinfo.html";};
				CS.cssmenu.subbtn[1].onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.subbtn[1].onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu.subbtn[1]);
			}else if(i==7 && shinko_flag>=10 && window.location.href.indexOf("xxxx") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].id="menu_torishinsyusei";
				CS.cssmenu.tr.td[i].im.mouseovermethod=function(e){
					var menu_jibankihon = $("#menu_torishinsyusei");
					CS.cssmenu.subbtn[2].style.display="";
					CS.cssmenu.subbtn[2].style.top=menu_jibankihon.offset().top+40+"px";
					CS.cssmenu.subbtn[2].style.left=menu_jibankihon.offset().left+23+"px";
					CS.cssmenu.subbtn[3].style.display="";
					CS.cssmenu.subbtn[3].style.top=menu_jibankihon.offset().top+82+"px";
					CS.cssmenu.subbtn[3].style.left=menu_jibankihon.offset().left+23+"px";
					
				};
				CS.cssmenu.tr.td[i].im.mouseoutmethod=function(e){
					var menu_jibankihon = $("#menu_jibankihon");
					CS.cssmenu.subbtn[2].style.display="none";
					CS.cssmenu.subbtn[3].style.display="none";
					
				};
				CS.cssmenu.tr.td[i].im.onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.tr.td[i].im.onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				
				CS.cssmenu.subbtn[2]=document.createElement('img');
				CS.cssmenu.subbtn[2].src="./images/menyu/4/3/c_01.jpg";
				CS.cssmenu.subbtn[2].style.position = "absolute";
				CS.cssmenu.subbtn[2].style.display="none";
				CS.cssmenu.subbtn[2].style.zIndex = 99995;
				CS.cssmenu.subbtn[2].style.cursor="pointer";
				CS.cssmenu.subbtn[2].onclick=function(){location.href="./clumarlayout.html";};
				CS.cssmenu.subbtn[2].onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.subbtn[2].onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu.subbtn[2]);
				CS.cssmenu.subbtn[3]=document.createElement('img');
				CS.cssmenu.subbtn[3].src="./images/menyu/4/3/c_02.jpg";
				CS.cssmenu.subbtn[3].style.position = "absolute";
				CS.cssmenu.subbtn[3].style.display="none";
				CS.cssmenu.subbtn[3].style.zIndex = 99995;
				CS.cssmenu.subbtn[3].style.cursor="pointer";
				CS.cssmenu.subbtn[3].onclick=function(){location.href="./kajyuitiraninput.html";};
				CS.cssmenu.subbtn[3].onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.subbtn[3].onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu.subbtn[3]);
			}else if(i==8 && shinko_flag>=10 && window.location.href.indexOf("suiheiryoku.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){
					CS.setcookie("suiheiryoku","");
					location.href="./suiheiryoku.html";
				};
			}else if(i==9 && shinko_flag>=10 && window.location.href.indexOf("footingikatuchange.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./footingikatuchange.html";};
			}else if(i==10 && shinko_flag>=10 && window.location.href.indexOf("許容支持.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].id="menu_kyoyoushiji";
				CS.cssmenu.tr.td[i].im.mouseovermethod=function(e){
					var menu_jibankihon = $("#menu_kyoyoushiji");
					CS.cssmenu.subbtn[4].style.display="";
					CS.cssmenu.subbtn[4].style.top=menu_jibankihon.offset().top+40+"px";
					CS.cssmenu.subbtn[4].style.left=menu_jibankihon.offset().left+23+"px";
					CS.cssmenu.subbtn[5].style.display="";
					CS.cssmenu.subbtn[5].style.top=menu_jibankihon.offset().top+82+"px";
					CS.cssmenu.subbtn[5].style.left=menu_jibankihon.offset().left+23+"px";
					
				};
				CS.cssmenu.tr.td[i].im.mouseoutmethod=function(e){
					var menu_jibankihon = $("#menu_jibankihon");
					CS.cssmenu.subbtn[4].style.display="none";
					CS.cssmenu.subbtn[5].style.display="none";
					
				};
				CS.cssmenu.tr.td[i].im.onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.tr.td[i].im.onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				
				CS.cssmenu.subbtn[4]=document.createElement('img');
				CS.cssmenu.subbtn[4].src="./images/menyu/4/3/a3_02.jpg";
				CS.cssmenu.subbtn[4].style.position = "absolute";
				CS.cssmenu.subbtn[4].style.display="none";
				CS.cssmenu.subbtn[4].style.zIndex = 99995;
				CS.cssmenu.subbtn[4].style.cursor="pointer";
				CS.cssmenu.subbtn[4].onclick=function(){CS.tokyoyo();};
				CS.cssmenu.subbtn[4].onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.subbtn[4].onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu.subbtn[4]);
				CS.cssmenu.subbtn[5]=document.createElement('img');
				CS.cssmenu.subbtn[5].src="./images/menyu/4/3/a3_04.jpg";
				CS.cssmenu.subbtn[5].style.position = "absolute";
				CS.cssmenu.subbtn[5].style.display="none";
				CS.cssmenu.subbtn[5].style.zIndex = 99995;
				CS.cssmenu.subbtn[5].style.cursor="pointer";
				CS.cssmenu.subbtn[5].onclick=function(){CS.tofugokyoyo();};
				CS.cssmenu.subbtn[5].onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.subbtn[5].onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu.subbtn[5]);
			}else if(i==11 && shinko_flag>=10 && window.location.href.indexOf("kuitousetugou.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./kuitousetugou.html";};
			}else if(i==12 && shinko_flag>=10 && window.location.href.indexOf("tyukansou1_new.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./tyukansou1_new.html";};
			}else if(i==13 && shinko_flag>=10 && window.location.href.indexOf("printpdf.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./printpdf.html";};
			}else if(i==14){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){CS.logout();};
			}
			
			
			if(i==0 && window.location.href.indexOf("ankenlist.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==1 && window.location.href.indexOf("ankenregist.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==2 && window.location.href.indexOf("pilelayout.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==3 && window.location.href.indexOf("kenteihizudt.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==4 && window.location.href.indexOf("pileclass.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==5 && window.location.href.indexOf("designprinc1.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==6 && ( window.location.href.indexOf("xxxxx") != -1 )){
			}else if(i==7 && window.location.href.indexOf("xxxx") != -1 ){
			}else if(i==8 && window.location.href.indexOf("suiheiryoku.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==9 && window.location.href.indexOf("footingikatuchange.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==10 && window.location.href.indexOf("許容支持.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==11 && window.location.href.indexOf("kuitousetugou.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==12 && window.location.href.indexOf("tyukansou1_new.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==13 && window.location.href.indexOf("printpdf.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}
			
			CS.cssmenu.tr.td[i].style.width="150px";
			CS.cssmenu.tr.td[i].appendChild(CS.cssmenu.tr.td[i].im);
		}
		CS.cssmenu.main.appendChild(CS.cssmenu.tr);
		CS.cssmenu.appendChild(CS.cssmenu.main);
		// 処理を記述

	}
});
};
CS.getShinko_flag_2=function(){
$.ajax({
	type: "POST",
	url: "ankenlist.php?fun=getshinkoflag&kouzousyssessionid=" + CS.getcookie("kouzousyssessionid") + "&data=" + Number(new Date),
	async: false,
	dataType:'xml',
	data: {
		"project_id": CS.getcookie("prjId")
	},
	success: function(j_data){
		var req = j_data.getElementsByTagName("list");
		
		var shinko_flag = CS.gettagchi(req[0],"shinko_flag");
		if(shinko_flag==""){
			shinko_flag=0;
		}else{
			shinko_flag=CS.toI(shinko_flag);
		}
		var sekkei_naiyou = CS.gettagchi(req[0],"sekkei_naiyou");
		if(sekkei_naiyou==""){
			sekkei_naiyou=0;
		}else{
			sekkei_naiyou=CS.toI(sekkei_naiyou);
		}
		var width_2=250;
		CS.menuimgs_nogood=[];
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/0.jpg";
		if(CS.common_suihei_flg!="0"){
			width_2=375;
			CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/1/3.jpg";
		}
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/14.jpg";
		CS.menuimgs_none=[];
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/0.jpg";
		if(CS.common_suihei_flg!="0"){
			CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/3.jpg";
		}
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/14.jpg";
		
		if(!CS.isNotNull(CS.cssmenu)){
			CS.cssmenu = document.createElement("div");
			CS.cssmenu.style.left="20px";
			CS.cssmenu.style.zIndex = 9995;
			CS.cssmenu.style.width = width_2+"px";
			CS.cssmenu.id = "cssmenu2";
			document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu);
		}else{
			CS.cssmenu.innerHTML = "";
			CS.cssmenu.style.width = width_2+"px";
		}
		
		CS.cssmenu.main = document.createElement("table");
		CS.cssmenu.main.style.widht=width_2+"px";
		CS.cssmenu.tr = document.createElement("tr");
		CS.cssmenu.tr.td = [];
		for(var i=0;i<CS.menuimgs_none.length;i++){
			CS.cssmenu.tr.td[i] = document.createElement("td");
			CS.cssmenu.tr.appendChild(CS.cssmenu.tr.td[i]);
			CS.cssmenu.tr.td[i].im=document.createElement('img');
			CS.cssmenu.tr.td[i].im.src=CS.menuimgs_none[i];
			
			if(i==0){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./ankenlist.html";};
			}else if(i==1 && CS.common_suihei_flg!="0"){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./kenteihizudt.html";};
			}else{
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){CS.logout();};
			}
			
			CS.cssmenu.tr.td[i].style.width="150px";
			CS.cssmenu.tr.td[i].appendChild(CS.cssmenu.tr.td[i].im);
		}
		CS.cssmenu.main.appendChild(CS.cssmenu.tr);
		CS.cssmenu.appendChild(CS.cssmenu.main);
		// 処理を記述

	}
});
};
CS.getShinko_flag_3=function(){
$.ajax({
	type: "POST",
	url: "ankenlist.php?fun=getshinkoflag&kouzousyssessionid=" + CS.getcookie("kouzousyssessionid") + "&data=" + Number(new Date),
	async: false,
	dataType:'xml',
	data: {
		"project_id": CS.getcookie("prjId")
	},
	success: function(j_data){
		var req = j_data.getElementsByTagName("list");
		
		var shinko_flag = CS.gettagchi(req[0],"shinko_flag");
		if(shinko_flag==""){
			shinko_flag=0;
		}else{
			shinko_flag=CS.toI(shinko_flag);
		}
		if(shinko_flag>=10 && CS.common_kenntou_hanni=="1"){
			if(window.location.href.indexOf("pilelayout.html") == -1 
			&& window.location.href.indexOf("pilelayout2.html") == -1 
			&& window.location.href.indexOf("pilelayout3.html") == -1
			&& window.location.href.indexOf("pilelayout4.html") == -1){
				CS.getShinko_flag_4();
				return;
			}
		}
		var sekkei_naiyou = CS.gettagchi(req[0],"sekkei_naiyou");
		if(sekkei_naiyou==""){
			sekkei_naiyou=0;
		}else{
			sekkei_naiyou=CS.toI(sekkei_naiyou);
		}
		CS.menu_none_torishin_touroku="./images/menyu/1/1_06.jpg";
		CS.menu_nogood_torishin_touroku="./images/menyu/2/2_06.jpg";
		CS.menu_now_torishin_touroku="./images/menyu/3/3_06.jpg";
		CS.menu_torishin_touroku_link="baseline.html";
		if(sekkei_naiyou==1){
			CS.menu_torishin_touroku_link="gaisandesign.html";
			CS.menu_none_torishin_touroku="./images/menyu/e1_03.jpg";
			CS.menu_nogood_torishin_touroku="./images/menyu/e2_03.jpg";
			CS.menu_now_torishin_touroku="./images/menyu/e3_03.jpg";
		}
		CS.menuimgs_none=[];
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/1/1_01.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/1/1_02.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/1/1_03.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/1/1_04.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/1/1_05.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]=CS.menu_none_torishin_touroku;
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/1/1_07.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/1/1_08.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/1/1_09.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/e1_01.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/e1_02.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/e1_04.jpg";
		
		CS.menuimgs_nogood=[];
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/2/2_03.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/2/2_04.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/2/2_05.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]=CS.menu_nogood_torishin_touroku;
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/2/2_07.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/2/2_08.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/2/2_09.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/e2_01.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/e2_02.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/e1_04.jpg";
		
		CS.menuimgs_now=[];
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/3/3_01.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/3/3_02.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/3/3_03.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/3/3_04.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/3/3_05.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]=CS.menu_now_torishin_touroku;
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/3/3_07.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/3/3_08.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/3/3_09.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/e3_01.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/e3_02.jpg";
		CS.menuimgs_now[CS.menuimgs_now.length]="./images/menyu/e1_04.jpg";
		
		if(!CS.isNotNull(CS.cssmenu)){
			CS.cssmenu = document.createElement("div");
			CS.cssmenu.style.left="20px";
			CS.cssmenu.style.zIndex = 9995;
			CS.cssmenu.style.width = "1750px";
			CS.cssmenu.id = "cssmenu2";
			document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu);
		}else{
			CS.cssmenu.innerHTML = "";
		}
		
		CS.cssmenu.main = document.createElement("table");
		
		CS.cssmenu.tr = document.createElement("tr");
		CS.cssmenu.tr.td = [];
		for(var i=0;i<12;i++){
			CS.cssmenu.tr.td[i] = document.createElement("td");
			CS.cssmenu.tr.appendChild(CS.cssmenu.tr.td[i]);
			CS.cssmenu.tr.td[i].im=document.createElement('img');
			CS.cssmenu.tr.td[i].im.src=CS.menuimgs_none[i];
			if(i==2 && shinko_flag<1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==3 && shinko_flag<2){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==4 && shinko_flag<3){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==5 && shinko_flag<4){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==6 && shinko_flag<5){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==7 && shinko_flag<6){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==8 && shinko_flag<7){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==9 && shinko_flag<8){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==10 && shinko_flag<9){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}
			if(i==0 && window.location.href.indexOf("ankenlist.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==1 && window.location.href.indexOf("ankenregist.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==2 && window.location.href.indexOf("designprinc1.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==3 && window.location.href.indexOf("jibanbaseinfo.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==4 && window.location.href.indexOf("borinfo.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==5 && window.location.href.indexOf(CS.menu_torishin_touroku_link) != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==6 && ( window.location.href.indexOf("loadinput.html") != -1 || window.location.href.indexOf("loadbatchinput.html") != -1 )){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==7 && window.location.href.indexOf("clumarlayout.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==8 && window.location.href.indexOf("footingin.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==9 && window.location.href.indexOf("pilelayout.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}else if(i==10 && window.location.href.indexOf("suiheiryoku.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_now[i];
			}
			if(i==0 && window.location.href.indexOf("ankenlist.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./ankenlist.html";};
			}else if(i==1 && window.location.href.indexOf("ankenregist.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){
					if(window.location.href.indexOf("ankenlist.html") != -1){
						//新規追加する場合
						CS.projectrigist("INIT",null);
					}else{
						location.href="./ankenregist.html";
					}
				};

			}else if(i==2 && shinko_flag>=1 && window.location.href.indexOf("designprinc1.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./designprinc1.html";};
			}else if(i==3 && shinko_flag>=2 && window.location.href.indexOf("jibanbaseinfo.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./jibanbaseinfo.html";};
			}else if(i==4 && shinko_flag>=3 && window.location.href.indexOf("borinfo.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./borinfo.html";};
			}else if(i==5 && shinko_flag>=4 && window.location.href.indexOf(CS.menu_torishin_touroku_link) == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./"+CS.menu_torishin_touroku_link;};
			}else if(i==6 && shinko_flag>=5 && ( window.location.href.indexOf("loadinput.html") == -1 || window.location.href.indexOf("loadbatchinput.html") == -1 )){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./loadbatchinput.html"};
			}else if(i==7 && shinko_flag>=6 && window.location.href.indexOf("clumarlayout.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./clumarlayout.html";};
			}else if(i==8 && shinko_flag>=7 && window.location.href.indexOf("footingin.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./footingin.html";};
			}else if(i==9 && shinko_flag>=8 && window.location.href.indexOf("pilelayout.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./pilelayout.html";};
			}else if(i==10 && shinko_flag>=9 && window.location.href.indexOf("suiheiryoku.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./suiheiryoku.html";};
			}else if(i==11){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){CS.logout();};
			}
			if(i==5||i==7||i==8||i==9){
				CS.cssmenu.tr.td[i].style.display="none";
			}
			CS.cssmenu.tr.td[i].style.width="120px";
			CS.cssmenu.tr.td[i].appendChild(CS.cssmenu.tr.td[i].im);
		}
		CS.cssmenu.main.appendChild(CS.cssmenu.tr);
		CS.cssmenu.appendChild(CS.cssmenu.main);
		// 処理を記述

	}
});
};
CS.getShinko_flag_4=function(){
$.ajax({
	type: "POST",
	url: "ankenlist.php?fun=getshinkoflag&kouzousyssessionid=" + CS.getcookie("kouzousyssessionid") + "&data=" + Number(new Date),
	async: false,
	dataType:'xml',
	data: {
		"project_id": CS.getcookie("prjId")
	},
	success: function(j_data){
		var req = j_data.getElementsByTagName("list");
		
		var shinko_flag = CS.gettagchi(req[0],"shinko_flag");
		if(shinko_flag==""){
			shinko_flag=0;
		}else{
			shinko_flag=CS.toI(shinko_flag);
		}
		if(shinko_flag<10){
			CS.getShinko_flag_3();
			return;
		}
		var sekkei_naiyou = CS.gettagchi(req[0],"sekkei_naiyou");
		if(sekkei_naiyou==""){
			sekkei_naiyou=0;
		}else{
			sekkei_naiyou=CS.toI(sekkei_naiyou);
		}
		CS.menu_none_torishin_touroku="./images/menyu/1/1_06.jpg";
		CS.menu_nogood_torishin_touroku="./images/menyu/2/2_06.jpg";
		CS.menu_now_torishin_touroku="./images/menyu/3/3_06.jpg";
		CS.menu_torishin_touroku_link="baseline.html";
		if(sekkei_naiyou==1){
			CS.menu_torishin_touroku_link="gaisandesign.html";
			CS.menu_none_torishin_touroku="./images/menyu/e1_03.jpg";
			CS.menu_nogood_torishin_touroku="./images/menyu/e2_03.jpg";
			CS.menu_now_torishin_touroku="./images/menyu/e3_03.jpg";
		}
		CS.menuimgs_nogood=[];
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/5/1/0.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/5/1/1.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/5/1/2.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/5/1/3.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/5/1/4.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/5/1/5.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/5/1/6.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/5/1/7.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/5/1/8.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/5/1/9.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/5/1/10.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/5/1/11.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/5/1/12.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/5/1/13.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/5/2/14.jpg";
		CS.menuimgs_none=[];
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/0.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/1.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/2.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/3.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/4.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/5.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/6.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/7.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/8.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/9.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/10.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/11.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/12.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/13.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/14.jpg";
		
		if(!CS.isNotNull(CS.cssmenu)){
			CS.cssmenu = document.createElement("div");
			CS.cssmenu.style.left="20px";
			CS.cssmenu.style.zIndex = 9995;
			CS.cssmenu.style.width = "1750px";
			CS.cssmenu.id = "cssmenu2";
			document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu);
		}else{
			CS.cssmenu.innerHTML = "";
			CS.cssmenu.style.width = "1750px";
		}
		
		CS.cssmenu.main = document.createElement("table");
		CS.cssmenu.main.style.widht="1850px";
		CS.cssmenu.tr = document.createElement("tr");
		CS.cssmenu.tr.td = [];
		for(var i=0;i<15;i++){
			CS.cssmenu.tr.td[i] = document.createElement("td");
			CS.cssmenu.tr.appendChild(CS.cssmenu.tr.td[i]);
			CS.cssmenu.tr.td[i].im=document.createElement('img');
			CS.cssmenu.tr.td[i].im.src=CS.menuimgs_none[i];
			if(i==2 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==3 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==4 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==5 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==6 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==7 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==8 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==9 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==10 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==11 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==11 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==12 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==13 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==14 && shinko_flag<10){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}
			
			if(i==0 && window.location.href.indexOf("ankenlist.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./ankenlist.html";};
			}else if(i==1 && window.location.href.indexOf("ankenregist.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){
					if(window.location.href.indexOf("ankenlist.html") != -1){
						//新規追加する場合
						CS.projectrigist("INIT",null);
					}else{
						location.href="./ankenregist.html";
					}
				};

			}else if(i==2 && shinko_flag>=10 && window.location.href.indexOf("pilelayout.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./pilelayout.html";};
			}else if(i==3 && shinko_flag>=10 && window.location.href.indexOf("kenteihizudt.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./kenteihizudt.html";};
			}else if(i==4 && shinko_flag>=10 && window.location.href.indexOf("pileclass.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./pileclass.html";};
			}else if(i==5 && shinko_flag>=10 && window.location.href.indexOf("designprinc1.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./designprinc1.html";};
			}else if(i==6 && shinko_flag>=10 && ( window.location.href.indexOf("xxxxx") == -1 )){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].id="menu_jibankihon";
				CS.cssmenu.tr.td[i].im.mouseovermethod=function(e){
					var menu_jibankihon = $("#menu_jibankihon");
					CS.cssmenu.subbtn[0].style.display="";
					CS.cssmenu.subbtn[0].style.top=menu_jibankihon.offset().top+40+"px";
					CS.cssmenu.subbtn[0].style.left=menu_jibankihon.offset().left+23+"px";
					CS.cssmenu.subbtn[1].style.display="";
					CS.cssmenu.subbtn[1].style.top=menu_jibankihon.offset().top+82+"px";
					CS.cssmenu.subbtn[1].style.left=menu_jibankihon.offset().left+23+"px";
					
				};
				CS.cssmenu.tr.td[i].im.mouseoutmethod=function(e){
					var menu_jibankihon = $("#menu_jibankihon");
					CS.cssmenu.subbtn[0].style.display="none";
					CS.cssmenu.subbtn[1].style.display="none";
					
				};
				CS.cssmenu.tr.td[i].im.onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.tr.td[i].im.onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				
				CS.cssmenu.subbtn=[];
				CS.cssmenu.subbtn[0]=document.createElement('img');
				CS.cssmenu.subbtn[0].src="./images/menyu/4/3/a3_01.jpg";
				CS.cssmenu.subbtn[0].style.position = "absolute";
				CS.cssmenu.subbtn[0].style.display="none";
				CS.cssmenu.subbtn[0].style.zIndex = 99995;
				CS.cssmenu.subbtn[0].style.cursor="pointer";
				CS.cssmenu.subbtn[0].onclick=function(){location.href="./jibanbaseinfo.html";};
				CS.cssmenu.subbtn[0].onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.subbtn[0].onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu.subbtn[0]);
				CS.cssmenu.subbtn[1]=document.createElement('img');
				CS.cssmenu.subbtn[1].src="./images/menyu/4/3/a3_03.jpg";
				CS.cssmenu.subbtn[1].style.position = "absolute";
				CS.cssmenu.subbtn[1].style.display="none";
				CS.cssmenu.subbtn[1].style.zIndex = 99995;
				CS.cssmenu.subbtn[1].style.cursor="pointer";
				CS.cssmenu.subbtn[1].onclick=function(){location.href="./borinfo.html";};
				CS.cssmenu.subbtn[1].onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.subbtn[1].onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu.subbtn[1]);
			}else if(i==7 && shinko_flag>=10 && window.location.href.indexOf("xxxx") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].id="menu_torishinsyusei";
				CS.cssmenu.tr.td[i].im.mouseovermethod=function(e){
					var menu_jibankihon = $("#menu_torishinsyusei");
					CS.cssmenu.subbtn[2].style.display="";
					CS.cssmenu.subbtn[2].style.top=menu_jibankihon.offset().top+40+"px";
					CS.cssmenu.subbtn[2].style.left=menu_jibankihon.offset().left+23+"px";
					CS.cssmenu.subbtn[3].style.display="";
					CS.cssmenu.subbtn[3].style.top=menu_jibankihon.offset().top+82+"px";
					CS.cssmenu.subbtn[3].style.left=menu_jibankihon.offset().left+23+"px";
					
				};
				CS.cssmenu.tr.td[i].im.mouseoutmethod=function(e){
					var menu_jibankihon = $("#menu_jibankihon");
					CS.cssmenu.subbtn[2].style.display="none";
					CS.cssmenu.subbtn[3].style.display="none";
					
				};
				CS.cssmenu.tr.td[i].im.onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.tr.td[i].im.onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				
				CS.cssmenu.subbtn[2]=document.createElement('img');
				CS.cssmenu.subbtn[2].src="./images/menyu/4/3/c_01.jpg";
				CS.cssmenu.subbtn[2].style.position = "absolute";
				CS.cssmenu.subbtn[2].style.display="none";
				CS.cssmenu.subbtn[2].style.zIndex = 99995;
				CS.cssmenu.subbtn[2].style.cursor="pointer";
				CS.cssmenu.subbtn[2].onclick=function(){location.href="./clumarlayout.html";};
				CS.cssmenu.subbtn[2].onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.subbtn[2].onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu.subbtn[2]);
				CS.cssmenu.subbtn[3]=document.createElement('img');
				CS.cssmenu.subbtn[3].src="./images/menyu/4/3/c_02.jpg";
				CS.cssmenu.subbtn[3].style.position = "absolute";
				CS.cssmenu.subbtn[3].style.display="none";
				CS.cssmenu.subbtn[3].style.zIndex = 99995;
				CS.cssmenu.subbtn[3].style.cursor="pointer";
				CS.cssmenu.subbtn[3].onclick=function(){location.href="./kajyuitiraninput.html";};
				CS.cssmenu.subbtn[3].onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.subbtn[3].onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu.subbtn[3]);
			}else if(i==8 && shinko_flag>=10 && window.location.href.indexOf("suiheiryoku.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){
					CS.setcookie("suiheiryoku","");
					location.href="./suiheiryoku.html";
				};
			}else if(i==9 && shinko_flag>=10 && window.location.href.indexOf("footingikatuchange.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./footingikatuchange.html";};
			}else if(i==10 && shinko_flag>=10 && window.location.href.indexOf("許容支持.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].id="menu_kyoyoushiji";
				CS.cssmenu.tr.td[i].im.mouseovermethod=function(e){
					var menu_jibankihon = $("#menu_kyoyoushiji");
					CS.cssmenu.subbtn[4].style.display="";
					CS.cssmenu.subbtn[4].style.top=menu_jibankihon.offset().top+40+"px";
					CS.cssmenu.subbtn[4].style.left=menu_jibankihon.offset().left+23+"px";
					CS.cssmenu.subbtn[5].style.display="";
					CS.cssmenu.subbtn[5].style.top=menu_jibankihon.offset().top+82+"px";
					CS.cssmenu.subbtn[5].style.left=menu_jibankihon.offset().left+23+"px";
					
				};
				CS.cssmenu.tr.td[i].im.mouseoutmethod=function(e){
					var menu_jibankihon = $("#menu_jibankihon");
					CS.cssmenu.subbtn[4].style.display="none";
					CS.cssmenu.subbtn[5].style.display="none";
					
				};
				CS.cssmenu.tr.td[i].im.onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.tr.td[i].im.onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				
				CS.cssmenu.subbtn[4]=document.createElement('img');
				CS.cssmenu.subbtn[4].src="./images/menyu/4/3/a3_02.jpg";
				CS.cssmenu.subbtn[4].style.position = "absolute";
				CS.cssmenu.subbtn[4].style.display="none";
				CS.cssmenu.subbtn[4].style.zIndex = 99995;
				CS.cssmenu.subbtn[4].style.cursor="pointer";
				CS.cssmenu.subbtn[4].onclick=function(){CS.tokyoyo();};
				CS.cssmenu.subbtn[4].onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.subbtn[4].onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu.subbtn[4]);
				CS.cssmenu.subbtn[5]=document.createElement('img');
				CS.cssmenu.subbtn[5].src="./images/menyu/4/3/a3_04.jpg";
				CS.cssmenu.subbtn[5].style.position = "absolute";
				CS.cssmenu.subbtn[5].style.display="none";
				CS.cssmenu.subbtn[5].style.zIndex = 99995;
				CS.cssmenu.subbtn[5].style.cursor="pointer";
				CS.cssmenu.subbtn[5].onclick=function(){CS.tofugokyoyo();};
				CS.cssmenu.subbtn[5].onmouseover=CS.cssmenu.tr.td[i].im.mouseovermethod;
				CS.cssmenu.subbtn[5].onmouseout=CS.cssmenu.tr.td[i].im.mouseoutmethod;
				document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu.subbtn[5]);
			}else if(i==11 && shinko_flag>=10 && window.location.href.indexOf("kuitousetugou.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./kuitousetugou.html";};
			}else if(i==12 && shinko_flag>=10 && window.location.href.indexOf("tyukansou1_new.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./tyukansou1_new.html";};
			}else if(i==13 && shinko_flag>=10 && window.location.href.indexOf("printpdf.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./printpdf.html";};
			}else if(i==14){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){CS.logout();};
			}
			
			if(i==2){
				CS.cssmenu.tr.td[i].style.display="none";
			}
			if(i==0 && window.location.href.indexOf("ankenlist.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==1 && window.location.href.indexOf("ankenregist.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==2 && window.location.href.indexOf("pilelayout.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==3 && window.location.href.indexOf("kenteihizudt.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==4 && window.location.href.indexOf("pileclass.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==5 && window.location.href.indexOf("designprinc1.html") != -1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==6 && ( window.location.href.indexOf("xxxxx") != -1 )){
			}else if(i==7 && window.location.href.indexOf("xxxx") != -1 ){
			}else if(i==8 && window.location.href.indexOf("suiheiryoku.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==9 && window.location.href.indexOf("footingikatuchange.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==10 && window.location.href.indexOf("許容支持.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==11 && window.location.href.indexOf("kuitousetugou.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==12 && window.location.href.indexOf("tyukansou1_new.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==13 && window.location.href.indexOf("printpdf.html") != -1 ){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}
			
			CS.cssmenu.tr.td[i].style.width="150px";
			CS.cssmenu.tr.td[i].appendChild(CS.cssmenu.tr.td[i].im);
		}
		CS.cssmenu.main.appendChild(CS.cssmenu.tr);
		CS.cssmenu.appendChild(CS.cssmenu.main);
		// 処理を記述

	}
});
};
function putmenu(actflag,name,imgurl,alink,midori){
	var restr='<div class="icon">';
	if(actflag){
		restr+='<div class="icon_txt"><a href="'+alink+'">';
		if(name=="案件登録" || midori){
			restr+='<div class="icon_img"><div class="aftr"><img src="./design/img/'+imgurl+'"></div></div>';
		}else{
			restr+='<div class="icon_img"><img src="./design/img/'+imgurl+'"></div> ';
		}
		restr+=name+'</a></div>';
		restr+='</div>';
	}else{
		restr+='<div class="icon_txt"><a href="'+alink+'">';
		restr+='<div class="icon_img"><div class="actv"><img src="./design/img/'+imgurl+'"></div></div>';
		restr+=name+'</a></div>';
		restr+='</div>';
	}
	return restr;
}
//画面頭のメニューを表示する
function initmenu_2() {
	//許容ポップライブラリインポート
	$.getScript("./js/fugoalbearcapop.js");
	$.getScript("./js/albearcapop.js");
	var menustr = "";
	if(window.location.pathname.indexOf("ankenlist.html")!=-1){
		menustr+=putmenu(false,"案件一覧","ico10.png","ankenlist.html");
	}else{
		menustr+=putmenu(true,"案件一覧","ico10.png","ankenlist.html");
	}
	if(window.location.pathname.indexOf("ankenregist.html")!=-1){
		menustr+=putmenu(false,"案件登録","ico11.png","ankenregist.html");
	}else{
		menustr+=putmenu(true,"案件登録","ico11.png","ankenregist.html");                       
	}
	if(CS.common_kenntou_hanni!="1" || CS.common_other_examination==""){
		if(window.location.pathname.indexOf("designprinc1.html")!=-1 || window.location.pathname.indexOf("designprinc2.html")!=-1){
			menustr+=putmenu(false,"設計方針","ico12.png","designprinc1.html");
		}else{
			if(window.location.pathname.indexOf("dositu.html")!=-1){
				menustr+=putmenu(true,"設計方針","ico12.png","designprinc1.html",true);
			}else{
				menustr+=putmenu(true,"設計方針","ico12.png","designprinc1.html");
			}
			
		}
	}
	if(window.location.pathname.indexOf("dositu.html")!=-1){
		menustr+=putmenu(false,"土&#12288;質","ico13.png","dositu.html");
	}else{
		menustr+=putmenu(true,"土&#12288;質","ico13.png","dositu.html");                       
	}
	if(window.location.pathname.indexOf("baseline.html")!=-1){
		menustr+=putmenu(false,"通 り 芯","ico14.png","baseline.html");
	}else{
		menustr+=putmenu(true,"通 り 芯","ico14.png","baseline.html");                          
	}
	if(window.location.pathname.indexOf("kajyuitiraninput.html")!=-1){
		menustr+=putmenu(false,"荷&#12288;重","ico15.png","kajyuitiraninput.html");
	}else{
		menustr+=putmenu(true,"荷&#12288;重","ico15.png","kajyuitiraninput.html");             
	}
	if(window.location.pathname.indexOf("clumarlayout.html")!=-1){
		menustr+=putmenu(false,"柱状図割付","ico16.png","clumarlayout.html");
	}else{
		menustr+=putmenu(true,"柱状図割付","ico16.png","clumarlayout.html");                    
	}
	if(window.location.pathname.indexOf("footingin.html")!=-1){
		menustr+=putmenu(false,"フーチング","ico17.png","footingin.html");
		// menustr+=putmenu(false,"フーチング","ico17.png","footingikatuchange.html");
	}else{
		menustr+=putmenu(true,"フーチング","ico17.png","footingin.html");
        // menustr+=putmenu(true,"フーチング","ico17.png","footingikatuchange.html");
	}
	if(window.location.pathname.indexOf("pilelayout.html")!=-1){
		menustr+=putmenu(false,"鉛直割付","ico18.png","pilelayout.html");
	}else{
		menustr+=putmenu(true,"鉛直割付","ico18.png","pilelayout.html"); 
	}
	if(window.location.pathname.indexOf("suiheiryoku.html")!=-1){
		menustr+=putmenu(false,"水 平 力","ico19.png","suiheiryoku.html");
	}else{
		menustr+=putmenu(true,"水 平 力","ico19.png","suiheiryoku.html");
	}
	if(window.location.pathname.indexOf("kenteihizudt.html")!=-1){
		menustr+=putmenu(false,"検 定 比","ico20.png","kenteihizudt.html");
	}else{
		menustr+=putmenu(true,"検 定 比","ico20.png","kenteihizudt.html");
	}
	if(window.location.pathname.indexOf("pileclass.html")!=-1){
		menustr+=putmenu(false,"杭テーブル","ico21.png","pileclass.html");
	}else{
		menustr+=putmenu(true,"杭テーブル","ico21.png","pileclass.html");
	}
	if(window.location.pathname.indexOf("kyoyou.html")!=-1){
		menustr+=putmenu(false,"許容支持力","ico22.png","kyoyou.html");
	}else{
		menustr+=putmenu(true,"許容支持力","ico22.png","kyoyou.html");
	}
	if(window.location.pathname.indexOf("kuitousetugou.html")!=-1){
		menustr+=putmenu(false,"杭頭接合","ico23.png","kuitousetugou.html");
	}else{
		menustr+=putmenu(true,"杭頭接合","ico23.png","kuitousetugou.html");
	}
	if(window.location.pathname.indexOf("tyukansou1_new.html")!=-1){
		menustr+=putmenu(false,"下部地盤","ico24.png","tyukansou1_new.html");
	}else{
		menustr+=putmenu(true,"下部地盤","ico24.png","tyukansou1_new.html");
	}
	if(window.location.pathname.indexOf("printpdf.html")!=-1){
		menustr+=putmenu(false,"印&#12288;刷","ico25.png","printpdf.html");
	}else{
		menustr+=putmenu(true,"印&#12288;刷","ico25.png","printpdf.html");
	}
	document.getElementById("navibox").innerHTML=menustr;
}
//画面頭のメニューを表示する
function initmenu() {
	//許容ポップライブラリインポート
	$.getScript("./js/fugoalbearcapop.js");
	$.getScript("./js/albearcapop.js");
	if(window.location.href.indexOf("ankenregist.html") != -1
	|| window.location.href.indexOf("designprinc1.html") != -1
	|| window.location.href.indexOf("jibanbaseinfo.html") != -1
	|| window.location.href.indexOf("borinfo.html") != -1
	|| window.location.href.indexOf("baseline.html") != -1
	|| window.location.href.indexOf("gaisandesign.html") != -1
	|| window.location.href.indexOf("gaisandesign2.html") != -1
	|| window.location.href.indexOf("gaisandesign3.html") != -1
	|| window.location.href.indexOf("gaisandesign4.html") != -1
	|| window.location.href.indexOf("pilelayout.html") != -1
	|| window.location.href.indexOf("pilelayout2.html") != -1
	|| window.location.href.indexOf("pilelayout3.html") != -1
	|| window.location.href.indexOf("pilelayout4.html") != -1
	|| window.location.href.indexOf("loadinput.html") != -1
	|| window.location.href.indexOf("loadbatchinput.html") != -1
	|| window.location.href.indexOf("clumarlayout.html") != -1
	|| window.location.href.indexOf("footingin.html") != -1
	|| window.location.href.indexOf("doshitsuinput_1.html") != -1
	|| window.location.href.indexOf("doshitsuinput_2.html") != -1
	|| window.location.href.indexOf("suiheiryoku.html") != -1){
		if(CS.common_kenntou_hanni=="0"){
			CS.getShinko_flag();
		}else{
			CS.getShinko_flag_3();
		}
		return;
	}
	if(CS.common_kenntou_hanni=="0" &&
	(window.location.pathname.indexOf("changetorisinmei.html")!=-1 ||
	window.location.pathname.indexOf("distriresult.html")!=-1 ||
	window.location.pathname.indexOf("ekitaika.html")!=-1 ||
	window.location.pathname.indexOf("footingikatuchange.html")!=-1 ||
	window.location.pathname.indexOf("kajyuitiraninput.html")!=-1 ||
	window.location.pathname.indexOf("kenteihizu.html")!=-1 ||
	window.location.pathname.indexOf("kenteihizudt.html")!=-1 ||
	window.location.pathname.indexOf("kuitousetugou.html")!=-1 ||
	window.location.pathname.indexOf("kuitousetugou2.html")!=-1 ||
	window.location.pathname.indexOf("pileclass.html")!=-1 ||
	window.location.pathname.indexOf("tyukansou1_new.html")!=-1 ||
	window.location.pathname.indexOf("tyukansou2_new.html")!=-1 ||
	window.location.pathname.indexOf("tyukansou3_new.html")!=-1 ||
	window.location.pathname.indexOf("tyukansou4_new.html")!=-1
	)){
		CS.getShinko_flag_1();
		return;
	}
	if(CS.common_kenntou_hanni=="1" &&
	(window.location.pathname.indexOf("changetorisinmei.html")!=-1 ||
	window.location.pathname.indexOf("distriresult.html")!=-1 ||
	window.location.pathname.indexOf("ekitaika.html")!=-1 ||
	window.location.pathname.indexOf("footingikatuchange.html")!=-1 ||
	window.location.pathname.indexOf("kajyuitiraninput.html")!=-1 ||
	window.location.pathname.indexOf("kenteihizu.html")!=-1 ||
	window.location.pathname.indexOf("kenteihizudt.html")!=-1 ||
	window.location.pathname.indexOf("kuitousetugou.html")!=-1 ||
	window.location.pathname.indexOf("kuitousetugou2.html")!=-1 ||
	window.location.pathname.indexOf("pileclass.html")!=-1 ||
	window.location.pathname.indexOf("tyukansou1_new.html")!=-1 ||
	window.location.pathname.indexOf("tyukansou2_new.html")!=-1 ||
	window.location.pathname.indexOf("tyukansou3_new.html")!=-1 ||
	window.location.pathname.indexOf("tyukansou4_new.html")!=-1
	)){
		CS.getShinko_flag_4();
		return;
	}
	if( window.location.pathname.indexOf("printpdf.html")!=-1 ){
		CS.getShinko_flag_2();
		return;
	}
	
	
	
	CS.cssmenu = document.createElement("div");
	CS.cssmenu.style.zIndex = 9995;
	CS.cssmenu.style.width = "1750px";
	if(CS.common_kenntou_hanni=="1"){
		var link = document.createElement('link');  
		with( link ) {  
			href = "./css/styles2.css";  
			type = 'text/css';  
			rel = 'stylesheet';  
		}  
		var head = document.getElementsByTagName('head');  
		head.item(0).appendChild(link);
	}

	str = "";
	if(window.location.pathname.indexOf("kenteihizudt11111111.html")!=-1){
		CS.cssmenu.style.width = "2200px";
		CS.cssmenu.id = "cssmenu1";
		str="";
		str += "<ul>";
		if(window.location.pathname.indexOf("ankenlist.html")!=-1){
			str += "   <li class='active'><a href='ankenlist.html'><span>案件一覧</span></a></li>";
		}else{
			str += "   <li><a href='ankenlist.html'><span>案件一覧</span></a></li>";
		}
		if(window.location.pathname.indexOf("ankenregist.html")!=-1){
			str += "   <li class='active'><a href='ankenregist.html'><span>案件登録</span></a></li>";
		}else{
			str += "   <li><a href='ankenregist.html'><span>案件登録</span></a></li>";
		}

		if(window.location.pathname.indexOf("jibanbaseinfo.html")!=-1){
			str += "  <li class='active'><a href='jibanbaseinfo.html'><span>地盤基本データ１</span></a></li>";
		}else{
			if(CS.common_kenntou_hanni!="1" || CS.common_other_examination==""){
				str += "  <li><a href='jibanbaseinfo.html'><span>地盤基本データ１</span></a></li>";
			}
		}
		if(window.location.pathname.indexOf("borinfo.html")!=-1){
			str += "  <li class='active'><a href='borinfo.html'><span>地盤基本データ２</span></a></li>";
		}else{
			str += "  <li><a href='borinfo.html'><span>地盤基本データ２</span></a></li>";
		}
		if(CS.common_kenntou_hanni!="1" || CS.common_other_examination==""){
			if(CS.common_kenntou_hanni!="1" || CS.common_other_examination==""){
				if(window.location.pathname.indexOf("clumarlayout.html")!=-1){
					str += "   <li class='active'><a href='clumarlayout.html'><span>柱状図割付</span></a></li>";
				}else{
					str += "   <li><a href='clumarlayout.html'><span>柱状図割付</span></a></li>";
				}	
			}

			if(window.location.pathname.indexOf("pilelayout.html")!=-1){
				str += "  <li class='active'><a href='pilelayout.html'><span>杭の割付（鉛直）</span></a></li>";
			}else{
				str += "  <li><a style='cursor:pointer;' onclick='CS.openPilelayout();'><span>杭の割付（鉛直）</span></a></li>";
			}
		}
		
		if(window.location.pathname.indexOf("kenteihizudt.html")!=-1){
			str += "  <li class='active'><a href='kenteihizudt.html'><span>検定比図</span></a></li>";
		}else{
			str += "  <li><a href='kenteihizudt.html'><span>検定比図</span></a></li>";
		}
		var kajyuname="荷重入力";
		if(window.location.href.indexOf("kenteihizudt.html") != -1){
			kajyuname="荷重変更";
		}
		if(CS.common_suihei_flg!="0"){
			if(window.location.pathname.indexOf("kajyuitiraninput.html")!=-1){
				str += "   <li class='active'><a href='kajyuitiraninput.html'><span>"+kajyuname+"</span></a></li>";
			}else{
				str += "   <li><a href='kajyuitiraninput.html'><span>"+kajyuname+"</span></a></li>";
			}
		}else{
			if(window.location.pathname.indexOf("loadbatchinput.html")!=-1){
				str += "   <li class='active'><a href='loadbatchinput.html'><span>"+kajyuname+"</span></a></li>";
			}else{
				str += "   <li><a href='loadbatchinput.html'><span>"+kajyuname+"</span></a></li>";
			}
		}
		if(window.location.pathname.indexOf("footingikatuchange.html")!=-1){
			str += "  <li class='active'><a href='footingikatuchange.html'><span>フーチング一括管理</span></a></li>";
		}else{
			str += "  <li><a href='footingikatuchange.html'><span>フーチング一括管理</span></a></li>";
		}
		if(window.location.pathname.indexOf("kuitousetugou.html")!=-1){
			str += "  <li class='active'><a href='kuitousetugou.html'><span>杭頭接合</span></a></li>";
		}else{
			str += "  <li><a href='kuitousetugou.html'><span>杭頭接合</span></a></li>";
		}
		if(window.location.pathname.indexOf("tyukansou1_new.html")!=-1){
			str += "  <li class='active'><a href='tyukansou1_new.html'><span>下部地盤の検討</span></a></li>";
		}else{
			str += "  <li><a href='tyukansou1_new.html'><span>下部地盤の検討</span></a></li>";
		}
		//if(window.location.pathname.indexOf("pilelayout.html")!=-1){
		//	str += "  <li class='active'><a href='#'><span>許容支持力</span></a></li>";
		//}else{
			str += "  <li><a href='#' onclick='CS.tokyoyo();'><span>許容支持力</span></a></li>";
		//}
//		if(window.location.pathname.indexOf("suiheiryoku.html")!=-1){
//			str += "  <li class='active'><a href='suiheiryoku.html'><span>符号毎許容支持力</span></a></li>";
//		}else{
			str += "  <li><a href='#' onclick='CS.tofugokyoyo();'><span>符号毎許容支持力</span></a></li>";
//		}
		
		if(window.location.pathname.indexOf("printpdf.html")!=-1){
			str += "   <li class='active'><a href='printpdf.html'><span>印刷</span></a></li>";
		}else{
			str += "   <li><a href='printpdf.html'><span>印刷</span></a></li>";
		}
 		str += "  <li><a onclick='CS.logout();'><span>ログアウト</span></a></li>";
		str += "</ul>";
	}
	if(CS.common_kenntou_hanni=="0" &&
		(window.location.pathname.indexOf("changetorisinmei.html")!=-1 ||
		window.location.pathname.indexOf("distriresult.html")!=-1 ||
		window.location.pathname.indexOf("ekitaika.html")!=-1 ||
		window.location.pathname.indexOf("footingikatuchange.html")!=-1 ||
		window.location.pathname.indexOf("kajyuitiraninput.html")!=-1 ||
		window.location.pathname.indexOf("kenteihizu.html")!=-1 ||
		window.location.pathname.indexOf("kenteihizudt.html")!=-1 ||
		window.location.pathname.indexOf("kuitousetugou.html")!=-1 ||
		window.location.pathname.indexOf("kuitousetugou2.html")!=-1 ||
		window.location.pathname.indexOf("pileclass.html")!=-1 ||
		window.location.pathname.indexOf("tyukansou1_new.html")!=-1 ||
		window.location.pathname.indexOf("tyukansou2_new.html")!=-1 ||
		window.location.pathname.indexOf("tyukansou3_new.html")!=-1 ||
		window.location.pathname.indexOf("tyukansou4_new.html")!=-1
		)){
		CS.cssmenu.id = "cssmenu1";
		
		CS.menuimgs_none=[];
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/0.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/1/1.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/1/2.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/1/3.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/1/4.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/1/5.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/1/6.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/1/7.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/1/8.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/1/9.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/1/10.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/1/11.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/1/12.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/1/13.jpg";
		CS.menuimgs_none[CS.menuimgs_none.length]="./images/menyu/4/2/14.jpg";
		CS.menuimgs_nogood=[];
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/0.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/1.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/2.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/3.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/4.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/5.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/6.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/7.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/8.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/9.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/10.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/11.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/12.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/13.jpg";
		CS.menuimgs_nogood[CS.menuimgs_nogood.length]="./images/menyu/4/2/14.jpg";
		
		if(!CS.isNotNull(CS.cssmenu)){
			CS.cssmenu = document.createElement("div");
			CS.cssmenu.style.left="20px";
			CS.cssmenu.style.zIndex = 9995;
			CS.cssmenu.style.width = "1750px";
			CS.cssmenu.id = "cssmenu2";
			document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu);
		}else{
			CS.cssmenu.innerHTML = "";
		}
		
		CS.cssmenu.main = document.createElement("table");
		
		CS.cssmenu.tr = document.createElement("tr");
		CS.cssmenu.tr.td = [];
		for(var i=0;i<12;i++){
			CS.cssmenu.tr.td[i] = document.createElement("td");
			CS.cssmenu.tr.appendChild(CS.cssmenu.tr.td[i]);
			CS.cssmenu.tr.td[i].im=document.createElement('img');
			CS.cssmenu.tr.td[i].im.src=CS.menuimgs_none[i];
			if(i==2 && shinko_flag<1){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==3 && shinko_flag<2){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==4 && shinko_flag<3){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==5 && shinko_flag<4){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==6 && shinko_flag<5){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==7 && shinko_flag<6){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==8 && shinko_flag<7){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==9 && shinko_flag<8){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}else if(i==10 && shinko_flag<9){
				CS.cssmenu.tr.td[i].im.src=CS.menuimgs_nogood[i];
			}
			
			if(i==0 && window.location.href.indexOf("ankenlist.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./ankenlist.html";};
			}else if(i==1 && window.location.href.indexOf("ankenregist.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){
					if(window.location.href.indexOf("ankenlist.html") != -1){
						//新規追加する場合
						CS.projectrigist("INIT",null);
					}else{
						location.href="./ankenregist.html";
					}
				};

			}else if(i==2 && shinko_flag>=1 && window.location.href.indexOf("designprinc1.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./designprinc1.html";};
			}else if(i==3 && shinko_flag>=2 && window.location.href.indexOf("jibanbaseinfo.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./jibanbaseinfo.html";};
			}else if(i==4 && shinko_flag>=3 && window.location.href.indexOf("borinfo.html") == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./borinfo.html";};
			}else if(i==5 && shinko_flag>=4 && window.location.href.indexOf(CS.menu_torishin_touroku_link) == -1){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./"+CS.menu_torishin_touroku_link;};
			}else if(i==6 && shinko_flag>=5 && ( window.location.href.indexOf("loadinput.html") == -1 || window.location.href.indexOf("loadbatchinput.html") == -1 )){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./loadbatchinput.html"};
			}else if(i==7 && shinko_flag>=6 && window.location.href.indexOf("clumarlayout.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./clumarlayout.html";};
			}else if(i==8 && shinko_flag>=7 && window.location.href.indexOf("footingin.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./footingin.html";};
			}else if(i==9 && shinko_flag>=8 && window.location.href.indexOf("pilelayout.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./pilelayout.html";};
			}else if(i==10 && shinko_flag>=9 && window.location.href.indexOf("suiheiryoku.html") == -1 ){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){location.href="./suiheiryoku.html";};
			}else if(i==11){
				CS.cssmenu.tr.td[i].im.style.cursor="pointer";
				CS.cssmenu.tr.td[i].im.onclick=function(){CS.logout();};
			}
			
			CS.cssmenu.tr.td[i].style.width="120px";
			CS.cssmenu.tr.td[i].appendChild(CS.cssmenu.tr.td[i].im);
		}
		CS.cssmenu.main.appendChild(CS.cssmenu.tr);
		CS.cssmenu.appendChild(CS.cssmenu.main);
		// str="";
		// str += "<ul>";
		// if(window.location.pathname.indexOf("ankenlist.html")!=-1){
			// str += "   <li class='active active_2'><a href='ankenlist.html'><span>案件一覧</span></a></li>";
		// }else{
			// str += "   <li><a href='ankenlist.html'><span>案件一覧</span></a></li>";
		// }
		// if(window.location.pathname.indexOf("ankenregist.html")!=-1){
			// str += "   <li class='active'><a href='ankenregist.html'><span>案件登録</span></a></li>";
		// }else{
			// str += "   <li><a href='ankenregist.html'><span>案件登録</span></a></li>";
		// }
		// if(window.location.pathname.indexOf("designprinc1.html")!=-1){
			// str += "   <li class='active'><a href='designprinc1.html'><span>設計方針</span></a></li>";
		// }else{
			// str += "   <li><a href='designprinc1.html'><span>設計方針</span></a></li>";
		// }
		// if(window.location.pathname.indexOf("jibanbaseinfo.html")!=-1){
			// str += "  <li class='active'><a href='jibanbaseinfo.html'><span>地盤基本データ１</span></a></li>";
		// }else{
			// str += "  <li><a href='jibanbaseinfo.html'><span>地盤基本データ１</span></a></li>";
		// }
		// if(window.location.pathname.indexOf("borinfo.html")!=-1){
			// str += "  <li class='active'><a href='borinfo.html'><span>地盤基本データ２</span></a></li>";
		// }else{
			// str += "  <li><a href='borinfo.html'><span>地盤基本データ２</span></a></li>";
		// }
		// if(CS.common_sekkei_naiyou=="1"){
			// if(window.location.pathname.indexOf("gaisandesign.html")!=-1){
				// str += "   <li class='active'><a href='gaisandesign.html'><span>概算設計</span></a></li>";
			// }else{
				// str += "   <li id='menu_toorishin'><a href='gaisandesign.html'><span>概算設計</span></a></li>";
			// }
		// }else{
			// if(CS.common_kenntou_hanni!="1" || CS.common_other_examination==""){
				// if(window.location.pathname.indexOf("baseline.html")!=-1){
					// str += "   <li class='active'><a href='baseline.html'><span>通り芯</span></a></li>";
				// }else{
					// str += "   <li id='menu_toorishin'><a href='baseline.html'><span>通り芯</span></a></li>";
				// }
			// }
		// }
 		// str += "  <li><a href='#' onclick='CS.logout();'><span>ログアウト</span></a></li>";
		// str += "</ul>";
	}
	// if( CS.common_suihei_flg=="0" && (window.location.pathname.indexOf("gaisandesign4.html")!=-1)){
		// CS.cssmenu.id = "cssmenu1";
		// str="";
		// str += "<ul>";
		// if(window.location.pathname.indexOf("ankenlist.html")!=-1){
			// str += "   <li class='active'><a href='ankenlist.html'><span>案件一覧</span></a></li>";
		// }else{
			// str += "   <li><a href='ankenlist.html'><span>案件一覧</span></a></li>";
		// }
		// if(window.location.pathname.indexOf("ankenregist.html")!=-1){
			// str += "   <li class='active'><a href='ankenregist.html'><span>案件登録</span></a></li>";
		// }else{
			// str += "   <li><a href='ankenregist.html'><span>案件登録</span></a></li>";
		// }
		// if(window.location.pathname.indexOf("designprinc1.html")!=-1){
			// str += "   <li class='active'><a href='designprinc1.html'><span>設計方針</span></a></li>";
		// }else{
			// str += "   <li><a href='designprinc1.html'><span>設計方針</span></a></li>";
		// }
		// if(window.location.pathname.indexOf("jibanbaseinfo.html")!=-1){
			// str += "  <li class='active'><a href='jibanbaseinfo.html'><span>地盤基本データ１</span></a></li>";
		// }else{
			// str += "  <li><a href='jibanbaseinfo.html'><span>地盤基本データ１</span></a></li>";
		// }
		// if(window.location.pathname.indexOf("borinfo.html")!=-1){
			// str += "  <li class='active'><a href='borinfo.html'><span>地盤基本データ２</span></a></li>";
		// }else{
			// str += "  <li><a href='borinfo.html'><span>地盤基本データ２</span></a></li>";
		// }
		// str += "   <li id='gaisansekkei' style='display:none;'><a href='gaisandesign.html'><span>概算設計</span></a></li>";
 		// str += "  <li><a href='#' onclick='CS.logout();'><span>ログアウト</span></a></li>";
		// str += "</ul>";
	// }
 	// if( window.location.pathname.indexOf("printpdf.html")!=-1 ){
		// CS.cssmenu.id = "cssmenu1";
		// str="";
		// str += "<ul>";
		// if(window.location.pathname.indexOf("ankenlist.html")!=-1){
			// str += "   <li class='active'><a href='ankenlist.html'><span>案件一覧</span></a></li>";
		// }else{
			// str += "   <li><a href='ankenlist.html'><span>案件一覧</span></a></li>";
		// }
		// if(CS.common_suihei_flg!="0"){
			// if(window.location.pathname.indexOf("kenteihizudt.html")!=-1){
				// str += "   <li class='active'><a href='kenteihizudt.html'><span>検定比図</span></a></li>";
			// }else{
				// str += "   <li><a href='kenteihizudt.html'><span>検定比図</span></a></li>";
			// }
		// }
 		// str += "  <li><a href='#' onclick='CS.logout();'><span>ログアウト</span></a></li>";
		// str += "</ul>";
	// }

	CS.cssmenu.innerHTML = str;
	document.getElementsByTagName("body").item(0).appendChild(CS.cssmenu);
}

//フッターを初期化する
function initfooter() {
	var footer = document.createElement("div");
	footer.style.zIndex = 0;
	footer.id = "footer";
	if(!!CS.cssmenu){
	footer.style.width = CS.cssmenu.clientWidth + "px";
	}
	
	footer.className = "footer";
	footer.style.top = CS.footertop + "px";
	footer.innerHTML = "株式会社トーヨーアサノ"
	document.getElementsByTagName("body").item(0).appendChild(footer);
}
// オブジェクトをintに転換する
CS.toI = function(o) {
	if(typeof o == "string"){
		o=o.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0) - 65248);});
	}
	if (o == "") {
		return 0;
	}
	return parseInt(o, 10);
};
// オブジェクトをintに転換する
CS.toI_notNaN = function(o) {
	if (o == "" || isNaN(parseInt(o, 10))) {
		return 0;
	}
	return parseInt(o, 10);
};
//白色をセットする時にいろいろ分枝があって共通メソッドで処理する
CS.setFFFFFF=function(o){
	if (CS.isNotNull(o.staticColor)) {
		o.style.backgroundColor = o.staticColor;
	}else if(CS.isNotNull(o.blackFlag) && o.blackFlag=="clearcolor"){
		o.style.backgroundColor = CS.usecolors[0];
	}else {
		var okflg=true;
		for (var i = 0; i < CS.colors.length; i++) {
			if (o.style.backgroundColor == CS.colors[i]) {
				okflg=false;
			}
		}
		if(okflg){
			o.style.backgroundColor = "#FFFFFF";
		}
	}
}
// オブジェクトをfloatに転換する
CS.toFloat = function(o) {
	if(typeof o == "string"){
		o=o.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0) - 65248);});
	}
	if (!CS.isNotNull(o) || o=="" || isNaN(parseFloat(o))) {
		return 0;
	}
	o=parseFloat(o)*100000;
	o=Math.round(o) / 100000;
	return o;
};
// オブジェクトをfloatに転換する　空の場合に空を戻す
CS.toFloat_tokara = function(o) {
	if (o == "") {
		return "";
	}
	return parseFloat(o);
};
// オブジェクトの位置、サイズを決める
CS.setSize = function(o, w, h, t, l) {
	o.style.width = w + "px";
	o.style.height = h + "px";
	o.style.top = t + "px";
	o.style.left = l + "px";
};
// カラムの本来（長い）内容を表示する
CS.showhonmyou = function(o) {
	o.onmouseover = CS.showhonmyouover;
	o.onmousemove = CS.showhonmyoumove;
	o.onmouseout = CS.showhonmyouout;
}
CS.messagese = [];
CS.messagese[0] = "申し訳ございません、予想外エラーが発生しました、システム管理者に連絡してください";
CS.messagese[1] = "不正アクセスです、案件を選択した後にこのページに遷移してください。";
CS.messagese[2] = "N値データと土質データ両方を登録した後に柱状図を表示してください。";
CS.messagese[3] = "新しいボーリングを登録しますか？";
CS.messagese[4] = "新しいボーリングデータを登録しました。";
CS.messagese[5] = "ボーリングを削除しますか？";
CS.messagese[6] = "のボーリングデータを削除しました。";
// ユーザログアウト
CS.logout = function() {
	if (CS.getcookie("id") == "" || CS.getcookie("kouzousyssessionid") == "") {
		CS.setcookie("id", "");
		CS.setcookie("kouzousyssessionid", "");
		location.href = "./";
	} else {
		location.href = "./logout.php?kouzousyssessionid=" + CS.getcookie("kouzousyssessionid")+ "&data=" + Number(new Date);
	}
}
//
CS.showhonmyoutakfont = function(o) {
	if (typeof o == "undefined") {
		return "";
	}
	var l = o.length + 0;
	var oo = o + "";
	o = "";
	var ii = 0;
	for (var i = 0; i < l; i++) {
		if (i == l - 1) {
			o = o + oo.substring(ii);
		} else if (i % 6 == 0 && i != 0) {
			o = o + oo.substring(ii, i) + "<br/>";
			ii = i;
		}
	}
	return o;
}
// divのサイズですべての文字内容を表示切れないので、ポップアップdivで本来内容を表示する
CS.showhonmyouover = function(e) {
	if (typeof CS.showhonmyouobj == "undefined") {
		CS.showhonmyouobj = document.createElement("div");
		// CS.showhonmyouobj.style.width="100px";
		CS.showhonmyouobj.style.backgroundColor = "#F0F8FF";
		CS.showhonmyouobj.style.position = "absolute";
		CS.showhonmyouobj.style.zIndex = 99995;
		document.getElementsByTagName("body").item(0).appendChild(CS.showhonmyouobj);
	}
//	CS.showhonmyouobj.innerHTML = CS.showhonmyoutakfont(e.currentTarget.honnmyou);
	CS.showhonmyouobj.innerHTML = e.currentTarget.honnmyou;
	CS.showhonmyouobj.style.display = "";
	CS.showhonmyouobj.style.top = e.pageY + e.currentTarget.scrollTop - 22 + "px";
	CS.showhonmyouobj.style.left = e.pageX + e.currentTarget.scrollLeft + 2 + "px";

}
// 本来内容を表示する
CS.showhonmyoumove = function(e) {
	if (typeof CS.showhonmyouobj == "undefined") {
		CS.showhonmyouobj = document.createElement("div");
		CS.showhonmyouobj.style.backgroundColor = "#F0F8FF";
		CS.showhonmyouobj.style.position = "absolute";
		CS.showhonmyouobj.style.zIndex = 99995;
		document.getElementsByTagName("body").item(0).appendChild(CS.showhonmyouobj);
	}
	CS.showhonmyouobj.style.top = e.pageY + e.currentTarget.scrollTop - 22 + "px";
	CS.showhonmyouobj.style.left = e.pageX + e.currentTarget.scrollLeft + 2 + "px";
}
//マウスが外した時に、本来内容を表示するDIVを隠す
CS.showhonmyouout = function(e) {
	if (typeof CS.showhonmyouobj != "undefined") {
		CS.showhonmyouobj.style.top = "-1000px";
		CS.showhonmyouobj.style.left = "-1000px";
		CS.showhonmyouobj.style.display = "none";
	}
}
//ajax送信中画面を触らないように、半透明のdivを表示する
CS.kaburu = function() {
	if (typeof CS.kaburudiv == "undefined") {
		CS.kaburudiv = document.createElement("div");
		CS.kaburudiv.style.background="#FFF";
		CS.kaburudiv.style.filter="alpha(opacity=30)";
		CS.kaburudiv.style.mozOpacity="0.3";
		CS.kaburudiv.style.opacity="0.3";
		CS.kaburudiv.style.zIndex = 20000;
		document.getElementsByTagName("body").item(0).appendChild(CS.kaburudiv);
	}
	CS.kaburudiv.style.display="none";
	CS.kaburudiv.style.height=window.innerHeight+"px";
	CS.kaburudiv.style.width=window.innerWidth+"px";
	CS.kaburudiv.style.left=$(window).scrollLeft()+"px";
	CS.kaburudiv.style.top=$(window).scrollTop()+"px";
	CS.kaburudiv.innerHTML = '<div style="width: 300px;height: 100px;position: absolute;top: 0;right: 0;bottom: 0;left: 0;margin: auto;text-align: center;line-height: 100px;font-size: 65px;">Loading...</div>';
	CS.kaburudiv.style.display = "";
	// CS.kaburudiv.style.verticalAlign="middle";
}
CS.kaburu = function(o) {
	if (typeof CS.kaburudiv == "undefined") {
		CS.kaburudiv = document.createElement("div");
		CS.kaburudiv.style.background="#FFFFFE";
		CS.kaburudiv.style.position="absolute";
		CS.kaburudiv.style.filter="alpha(opacity=30)";
		CS.kaburudiv.style.zIndex = 20000;
		CS.kaburudiv.style.mozOpacity="0.3";
		CS.kaburudiv.style.opacity="0.3";
		
		CS.kaburudiv_font = document.createElement("div");
		CS.kaburudiv_font.style.width="300px";
		CS.kaburudiv_font.style.height="100px";
		CS.kaburudiv_font.style.position="absolute";
		CS.kaburudiv_font.style.top="0";
		CS.kaburudiv_font.style.mozOpacity="0.3";
		CS.kaburudiv_font.style.opacity="0.3";
		CS.kaburudiv_font.style.textAlign="center";
		CS.kaburudiv_font.style.lineHeight="100px";
		CS.kaburudiv_font.style.fontSize="65px";
		CS.kaburudiv_font.style.position="absolute";
		CS.kaburudiv_font.style.zIndex = 20000;
		if(typeof o == "undefined"){
			CS.kaburudiv_font.innerHTML = 'Loading...';
		}else{
			CS.kaburudiv_font.innerHTML = o;
		}
		CS.kaburudiv.style.display="none";
		CS.kaburudiv_font.style.display="none";
		document.getElementsByTagName("body").item(0).appendChild(CS.kaburudiv);
		document.getElementsByTagName("body").item(0).appendChild(CS.kaburudiv_font);
	}
	CS.kaburudiv.style.display="none";
	CS.kaburudiv_font.style.display="none";
	
	CS.kaburudiv.style.height=window.innerHeight-50+"px";
	CS.kaburudiv.style.width=window.innerWidth+"px";
	CS.kaburudiv.style.left=$(window).scrollLeft()+"px";
	CS.kaburudiv.style.top=$(window).scrollTop()+"px";
	
	CS.kaburudiv_font.style.top=$(window).scrollTop()+(window.innerHeight-100-50)/2+"px";
	CS.kaburudiv_font.style.left=$(window).scrollLeft()+(window.innerWidth-300)/2+"px";
	
	CS.kaburudiv.style.display = "";
	CS.kaburudiv_font.style.display = "";
	// $("body").css("overflow","hidden");
	// CS.kaburudiv.style.verticalAlign="middle";
}
CS.hikaburu = function(o) {
	if(o==-1){
		if (typeof CS.kaburudiv != "undefined") {
			CS.kaburudiv.style.display = "none";
			CS.kaburudiv_font.style.display = "none";
		}
		return;
	}
	if (o.responseText == "not true user") {
		CS.setcookie("id", "");
		CS.setcookie("kouzousyssessionid", "");
		window.location.href = "./";
	}
	if (typeof CS.kaburudiv != "undefined") {
		CS.kaburudiv.style.display = "none";
		CS.kaburudiv_font.style.display = "none";
	}
	// $("body").css("overflow","");
}

//ajax送信中画面を触らないように、半透明のdivを表示する[解析中]
CS.analying = function() {
	if (!CS.isNotNull(CS.analydiv)) {
		CS.analydiv = document.createElement("div");
		CS.analydiv.style.width = "100%";
		CS.analydiv.style.height = "100%";
		CS.analydiv.style.position = "absolute";
		CS.analydiv.style.filter = 'alpha(opacity=0)';
		// Firefox用
		CS.analydiv.style.MozOpacity = 0;
		// Safari用
		CS.analydiv.style.opacity = 0;
		document.getElementsByTagName("body").item(0).appendChild(CS.analydiv);
		
//		var tmpTop = 360 - CS.toI(document.getElementsByTagName("body").item(0).style.height);
//		var tmpLef = 400 - CS.toI(document.getElementsByTagName("body").item(0).style.width);
		var tmpTop = 360;
		var tmpLef = 400;
		CS.worddiv = document.createElement("div");
		CS.worddiv.style.top = tmpTop + "px";
		CS.worddiv.style.left = tmpLef + "px";
		CS.worddiv.style.width = "360px";
		CS.worddiv.style.height = "90px";
		CS.worddiv.style.lineHeight = "90px";
		CS.worddiv.style.border = "solid 2px black";
		CS.worddiv.style.textAlign = "center";
		CS.worddiv.style.backgroundColor = "white";
		CS.worddiv.style.position = "absolute";
		CS.worddiv.style.zIndex = 20000;
		CS.worddiv.style.filter = 'alpha(opacity=100)';
		// Firefox用
		CS.worddiv.style.MozOpacity = 1;
		CS.worddiv.style.fontSize = "60px";
		CS.worddiv.innerHTML = "解析中・・・";
		// Safari用
		CS.worddiv.style.opacity = 1;
		document.getElementsByTagName("body").item(0).appendChild(CS.worddiv);
	} else {
		CS.analydiv.style.display = "";
		CS.worddiv.style.display = "";
	}
}
//解析完了
CS.analyed = function(o) {
	if (o.responseText == "not true user") {
		CS.setcookie("id", "");
		CS.setcookie("kouzousyssessionid", "");
		window.location.href = "./";
	}
	if (CS.isNotNull(CS.analydiv)) {
		CS.analydiv.style.display = "none";
		CS.worddiv.style.display = "none";
	}
}

// どの色を処理しないかを判断する
//CS.colors = [ "silver", "gainsboro", "rgb(220, 220, 220)", "rgb(255, 165, 0)"];
CS.colors = [ "silver", "gainsboro", "rgb(220, 220, 220)", "rgb(255, 165, 0)", "black", "rgb(0, 0, 0)","rgb(231, 230, 230)","rgb(255, 255, 1)" ];
CS.colored = function(s, v) {
	if (v == 1) {
		for (var i = 0; i < CS.colors.length; i++) {
			if (s == CS.colors[i]) {
				return true;
			}
		}
		return false;
	} else {
		for (var i = 0; i < CS.colors.length; i++) {
			if (s == CS.colors[i]) {
				return false;
			}
		}
		return true;
	}
}
CS.usecolors = [ "black", "rgb(0, 0, 0)" ];
CS.usecolored = function(s, v) {
	if (v == 1) {
		for (var i = 0; i < CS.colors.length; i++) {
			if (s == CS.colors[i]) {
				return true;
			}
		}
		return false;
	}
}
CS.dialogMove = function(window, title) {// which参数指定的是哪一个窗口的id，比如"#dialog"
	var offestLeft;
	var offestTop;
	title.draggable="true";
	var right = false;
	title.onmouseover = function(e) {
		//CS.disableSelection(document.getElementsByTagName("body").item(0));
	}
	
	title.ondragstart = function(e) {
		var x = e.clientX;
		var y = e.clientY;
		var styleLeft = CS.toI(window.style.left);
		var styleTop = CS.toI(window.style.top);
		offestLeft = x - CS.toI(styleLeft);
		offestTop = y - CS.toI(styleTop);
		right = true;
		return false;
	};
	
	//if(typeof title.ondragstart != "function"){
		title.onmousedown = function(e) {
			window.style.zIndex = 9999;
			var x = e.clientX;
			var y = e.clientY;
			var styleLeft = CS.toI(window.style.left);
			var styleTop = CS.toI(window.style.top);
			offestLeft = x - CS.toI(styleLeft);
			offestTop = y - CS.toI(styleTop);
			right = true;
		};
	//}
	//if(typeof title.ondragstart != "function"){
		title.onmousemove = function(e) {
			if (right) {
				var nowLeft = CS.toI(e.clientX) - offestLeft;
				var nowTop = CS.toI(e.clientY) - offestTop;
				window.style.left = nowLeft + "px";
				window.style.top = nowTop + "px";
			}
		};
		document.getElementsByTagName("body").item(0).onmousemove = function(e) {
			if (right) {
				var nowLeft = CS.toI(e.clientX) - offestLeft;
				var nowTop = CS.toI(e.clientY) - offestTop;
				window.style.left = nowLeft + "px";
				window.style.top = nowTop + "px";
			}
		};
	//}
	title.ondrag = function(e) {
		if (right) {
			var nowLeft = CS.toI(e.clientX) - offestLeft;
			var nowTop = CS.toI(e.clientY) - offestTop;
			window.style.left = nowLeft + "px";
			window.style.top = nowTop + "px";
		}
		//return false;
	};
	//if(typeof title.ondragstart != "function"){
		title.onmouseup = function(e) {
			right = false;
			var popwins = document.getElementsByClassName("windowbak");
			for (var i = 0; i < popwins.length; i++) {
				popwins[i].style.zIndex = 9997;
			}
			window.style.zIndex = 9998;
			CS.openSelection(document.getElementsByTagName("body").item(0))
		};
		title.onmouseout = function(e) {
			if (right == false) {
				return;
			}
			right = false;
			var popwins = document.getElementsByClassName("windowbak");
			for (var i = 0; i < popwins.length; i++) {
				popwins[i].style.zIndex = 9997;
			}
			window.style.zIndex = 9998;
			CS.openSelection(document.getElementsByTagName("body").item(0))
		};
	//}
	title.ondragend= function(e) {
	var nowLeft = CS.toI(e.clientX) - offestLeft;
		var nowTop = CS.toI(e.clientY) - offestTop;
		window.style.left = nowLeft + "px";
		window.style.top = nowTop + "px";
		right = false;
		var popwins = document.getElementsByClassName("windowbak");
		for (var i = 0; i < popwins.length; i++) {
			popwins[i].style.zIndex = 9997;
		}
		window.style.zIndex = 9998;
		CS.openSelection(document.getElementsByTagName("body").item(0));
		return false;
	};

};
//
CS.disableSelection = function(target) {
//	return true;
	if (typeof target.onselectstart != "undefined") // IE route
		target.onselectstart = function() {
			return false
		}
	if (typeof target.style.MozUserSelect != "undefined") // Firefox route
		target.style.MozUserSelect = "none"
	else if (typeof target.style.WebkitUserSelect != "undefined") // Firefox
																	// route
		target.style.WebkitUserSelect = "none";
	else if (typeof target.style.MsUserSelect != "undefined") // Firefox route
		target.style.MsUserSelect = "none";
	else
		// All other route (ie: Opera)
		target.onmousedown = function() {
			return false
		}
	target.style.cursor = "default"
}
CS.openSelection = function(target) {
	if (typeof target.onselectstart != "undefined") // IE route
		target.onselectstart = null;
	if (typeof target.style.MozUserSelect != "undefined") // Firefox route
		target.style.MozUserSelect = "";
	else if (typeof target.style.WebkitUserSelect != "undefined") // Firefox
																	// route
		target.style.WebkitUserSelect = "";
	else if (typeof target.style.MsUserSelect != "undefined") // Firefox route
		target.style.MsUserSelect = "";
	else
		// All other route (ie: Opera)
		target.onmousedown = true;
	target.style.cursor = "";
}
// ポップアップ画面を作成
// titmはタイトルに置くメニューです。
CS.createpopup =function(name, w, h, t, l, titm, kotei) {
		CS.popwindowlist=document.getElementsByName("popwindow");
		for(var i=0;i<CS.popwindowlist.length;i++){
			CS.popwindowlist[i].style.zIndex = 9996;
		}
		var popwindow = document.createElement("div");
		popwindow.name = "popwindow";
		//popwindow.draggable="true";
		//popwindow.dropzone="move"
		if(kotei!="mannaka" && kotei!="kotei"){
			CS.setSize(popwindow, w, h, t, l);
		}else{
			CS.setSize(popwindow, w, h, $(window).scrollTop()+(window.innerHeight-h)/2, $(window).scrollLeft()+(window.innerWidth-w)/2);
			if(kotei=="kotei"){
				popwindow.kotei_flag=true;
			}
		}
		popwindow.className = "windowbak";
		popwindow.style.zIndex = 9997;
		popwindow.titleobj = document.createElement("div");
		popwindow.titleobj.className = "windowtitle";
		CS.setSize(popwindow.titleobj, w, 30, 0, 0);
		popwindow.titleobj.position = "relative";
		popwindow.appendChild(popwindow.titleobj);
		popwindow.titleobj.innerHTML = "　" + name;

		popwindow.closebtn = document.createElement("div");
		CS.setSize(popwindow.closebtn, CS.toI(popwindow.titleobj.style.height), CS.toI(popwindow.titleobj.style.height), 0, CS.toI(popwindow.titleobj.style.width)
			- CS.toI(popwindow.titleobj.style.height));
		popwindow.closebtn.position = "relative";
		popwindow.closebtn.className = "windowtitle";
		popwindow.closebtn.innerHTML =
			"<img id='popclosebtn' src='./img/closebtn.png' style='top:3px;width:" + (CS.toI(popwindow.closebtn.style.height) - 6) + "px; height:" + (CS.toI(popwindow.closebtn.style.height) - 6) + "px;'>";
		popwindow.closebtn.style.cursor = "pointer";
		popwindow.closebtn.onclick = function() {
			this.parentNode.style.display = "none";
		}

		popwindow.main = document.createElement("div");
		popwindow.main.focuseiti = "A_A_A_A";
		popwindow.main.copyforexcelflg = false;
		popwindow.main.copytextObj = document.createElement('TEXTAREA');
		popwindow.main.copytextObj.style.width = '1px';
		popwindow.main.copytextObj.style.height = '1px';
		popwindow.main.copytextObj.style.opacity = "0";
		popwindow.main.copytextObj.style.position = "absolute";
		popwindow.main.appendChild(popwindow.main.copytextObj);

		popwindow.main.id = "main";
		CS.setSize(popwindow.main, CS.toI(popwindow.titleobj.style.width) - 8, CS.toI(popwindow.style.height) - CS.toI(popwindow.titleobj.style.height) - 8,
			CS.toI(popwindow.titleobj.style.height) + 3, 3);
		popwindow.main.style.border = "solid 1px white";
		popwindow.main.style.backgroundColor = 'rgb(245,245,245)';
		popwindow.main.style.overflow = "scroll";

		// その他メニュー
		// titm[0]
		if (CS.isNotNull(titm)) {
			if(CS.isNotNull(titm.titlekakudaimenu)){
				if(titm.titlekakudaimenu==true&&titm.titlekakudaimenu_type==1){
					popwindow.kakudaibtn = document.createElement("div");
					CS.setSize(popwindow.kakudaibtn, CS.toI(popwindow.titleobj.style.height), CS.toI(popwindow.titleobj.style.height), 0, CS.toI(popwindow.titleobj.style.width)
						- CS.toI(popwindow.titleobj.style.height)-40);
					popwindow.kakudaibtn.position = "relative";
					popwindow.kakudaibtn.className = "windowtitle";
					popwindow.kakudaibtn.innerHTML =
						"<img src='./img/kakudaibtn.png' style='top:3px;width:" + (CS.toI(popwindow.kakudaibtn.style.height) - 6) + "px; height:" + (CS.toI(popwindow.kakudaibtn.style.height) - 6) + "px;'>";
					popwindow.kakudaibtn.style.cursor = "pointer";
					popwindow.kakudaibtn.kiku=false;
					popwindow.kakudaibtn.onclick = function(e) {
						if(popwindow.kakudaibtn.kiku==false){
							e.currentTarget.kiku=true;
							e.currentTarget.innerHTML = "<img src='./img/fukugen.png' style='top:3px;width:" + (CS.toI(popwindow.kakudaibtn.style.height) - 6) + "px; height:" + (CS.toI(popwindow.kakudaibtn.style.height) - 6) + "px;'>";
							e.currentTarget.offsetParent.syukusyou.style.display="none";
							e.currentTarget.offsetParent.style.left="0px";
							e.currentTarget.offsetParent.style.top="50px";
							e.currentTarget.offsetParent.titleobj.style.width=e.currentTarget.offsetParent.style.width=(window.innerWidth-CS.toI(e.currentTarget.offsetParent.style.left)-30)+"px";
							e.currentTarget.offsetParent.main.style.left="3px"
							e.currentTarget.offsetParent.main.style.top=(CS.toI(e.currentTarget.offsetParent.titleobj.style.height) + 3)+"px"
							e.currentTarget.offsetParent.main.style.width=(CS.toI(e.currentTarget.offsetParent.titleobj.style.width) - 8)+"px";
							e.currentTarget.offsetParent.main.style.height=(CS.toI(e.currentTarget.offsetParent.style.height) - CS.toI(e.currentTarget.offsetParent.titleobj.style.height) - 8)+"px";
							e.currentTarget.offsetParent.closebtn.style.left=(CS.toI(e.currentTarget.offsetParent.titleobj.style.width) - CS.toI(e.currentTarget.offsetParent.titleobj.style.height))+"px";
							e.currentTarget.offsetParent.kakudaibtn.style.left=(CS.toI(e.currentTarget.offsetParent.titleobj.style.width)- CS.toI(e.currentTarget.offsetParent.titleobj.style.height)-40)+"px";
							e.currentTarget.offsetParent.syukusyou.style.left=(CS.toI(e.currentTarget.offsetParent.titleobj.style.width)- CS.toI(e.currentTarget.offsetParent.titleobj.style.height)-80)+"px";
							e.currentTarget.offsetParent.main.style.height=e.currentTarget.offsetParent.maxHeight+"px";
							e.currentTarget.offsetParent.style.height=CS.toI(e.currentTarget.offsetParent.main.style.height)+CS.toI(e.currentTarget.offsetParent.titleobj.style.height)+8+"px";
						}else{
							e.currentTarget.kiku=false;
							e.currentTarget.innerHTML = "<img src='./img/kakudaibtn.png' style='top:3px;width:" + (CS.toI(popwindow.kakudaibtn.style.height) - 6) + "px; height:" + (CS.toI(popwindow.kakudaibtn.style.height) - 6) + "px;'>";
							e.currentTarget.offsetParent.syukusyou.style.display="";
							e.currentTarget.offsetParent.style.left="0px";
							e.currentTarget.offsetParent.style.top="50px";
							e.currentTarget.offsetParent.titleobj.style.width=e.currentTarget.offsetParent.style.width=e.currentTarget.offsetParent.normalWidth+"px";
							e.currentTarget.offsetParent.style.height=e.currentTarget.offsetParent.normalHeight+"px";
							e.currentTarget.offsetParent.main.style.left="3px"
							e.currentTarget.offsetParent.main.style.top=(CS.toI(e.currentTarget.offsetParent.titleobj.style.height) + 3)+"px"
							e.currentTarget.offsetParent.main.style.width=(CS.toI(e.currentTarget.offsetParent.titleobj.style.width) - 8)+"px";
							e.currentTarget.offsetParent.main.style.height=(CS.toI(e.currentTarget.offsetParent.style.height) - CS.toI(e.currentTarget.offsetParent.titleobj.style.height) - 8)+"px";
							e.currentTarget.offsetParent.closebtn.style.left=(CS.toI(e.currentTarget.offsetParent.titleobj.style.width) - CS.toI(e.currentTarget.offsetParent.titleobj.style.height))+"px";
							e.currentTarget.offsetParent.kakudaibtn.style.left=(CS.toI(e.currentTarget.offsetParent.titleobj.style.width)- CS.toI(e.currentTarget.offsetParent.titleobj.style.height)-40)+"px";
							e.currentTarget.offsetParent.syukusyou.style.left=(CS.toI(e.currentTarget.offsetParent.titleobj.style.width)- CS.toI(e.currentTarget.offsetParent.titleobj.style.height)-80)+"px";
						}
					}
					popwindow.appendChild(popwindow.kakudaibtn);
					//縮小メニュー
					popwindow.syukusyou = document.createElement("div");
					CS.setSize(popwindow.syukusyou, CS.toI(popwindow.titleobj.style.height), CS.toI(popwindow.titleobj.style.height), 0, CS.toI(popwindow.titleobj.style.width)
						- CS.toI(popwindow.titleobj.style.height)-80);
					popwindow.syukusyou.position = "relative";
					popwindow.syukusyou.className = "windowtitle";
					popwindow.syukusyou.innerHTML =
						"<img src='./img/syukusyou.png' style='top:3px;width:" + (CS.toI(popwindow.syukusyou.style.height) - 6) + "px; height:" + (CS.toI(popwindow.syukusyou.style.height) - 6) + "px;'>";
					popwindow.syukusyou.style.cursor = "pointer";
					popwindow.syukusyou.kiku=false;
					popwindow.syukusyou.onclick = function(e) {
						if(popwindow.syukusyou.kiku==false){
							e.currentTarget.kiku=true;
							e.currentTarget.innerHTML = "<img src='./img/fukugen.png' style='top:3px;width:" + (CS.toI(popwindow.syukusyou.style.height) - 6) + "px; height:" + (CS.toI(popwindow.syukusyou.style.height) - 6) + "px;'>";
							e.currentTarget.offsetParent.kakudaibtn.style.display="none";
							e.currentTarget.offsetParent.style.left="0px";
							e.currentTarget.offsetParent.style.top="50px";
							
							var hyoujyunW=CS.toI(e.currentTarget.offsetParent.normalWidth/2);

							e.currentTarget.offsetParent.titleobj.style.width=e.currentTarget.offsetParent.style.width=hyoujyunW+50+"px";
							e.currentTarget.offsetParent.main.style.left="3px"
							e.currentTarget.offsetParent.main.style.top=(CS.toI(e.currentTarget.offsetParent.titleobj.style.height) + 3)+"px"
							e.currentTarget.offsetParent.main.style.width=(CS.toI(e.currentTarget.offsetParent.titleobj.style.width) - 8)+"px";
							//e.currentTarget.offsetParent.main.style.height=500*e.currentTarget.offsetParent.canvas.height/e.currentTarget.offsetParent.canvas.width+"px";
							e.currentTarget.offsetParent.main.style.height=500+"px";
							e.currentTarget.offsetParent.style.height=CS.toI(e.currentTarget.offsetParent.titleobj.style.height)+CS.toI(e.currentTarget.offsetParent.main.style.height)+8+"px";
							e.currentTarget.offsetParent.canvas.style.width=hyoujyunW+"px";
							var hh=CS.toI(hyoujyunW*e.currentTarget.offsetParent.canvas.height/e.currentTarget.offsetParent.canvas.width);
							e.currentTarget.offsetParent.canvas.style.height=hh+"px";
							e.currentTarget.offsetParent.canvas.width=hyoujyunW;
							e.currentTarget.offsetParent.canvas.height=hh;
							CS.createtyujyouzu_min(0);
							e.currentTarget.offsetParent.closebtn.style.left=(CS.toI(e.currentTarget.offsetParent.titleobj.style.width) - CS.toI(e.currentTarget.offsetParent.titleobj.style.height))+"px";
							e.currentTarget.offsetParent.kakudaibtn.style.left=(CS.toI(e.currentTarget.offsetParent.titleobj.style.width)- CS.toI(e.currentTarget.offsetParent.titleobj.style.height)-40)+"px";
							e.currentTarget.offsetParent.syukusyou.style.left=(CS.toI(e.currentTarget.offsetParent.titleobj.style.width)- CS.toI(e.currentTarget.offsetParent.titleobj.style.height)-80)+"px";
						}else{
							e.currentTarget.kiku=false;
							e.currentTarget.innerHTML = "<img src='./img/syukusyou.png' style='top:3px;width:" + (CS.toI(popwindow.syukusyou.style.height) - 6) + "px; height:" + (CS.toI(popwindow.syukusyou.style.height) - 6) + "px;'>";
							e.currentTarget.offsetParent.kakudaibtn.style.display="";
							e.currentTarget.offsetParent.style.left="0px";
							e.currentTarget.offsetParent.style.top="50px";
							e.currentTarget.offsetParent.titleobj.style.width=e.currentTarget.offsetParent.style.width=e.currentTarget.offsetParent.normalWidth+"px";
							e.currentTarget.offsetParent.style.height=e.currentTarget.offsetParent.normalHeight+"px";
							e.currentTarget.offsetParent.main.style.left="3px"
							e.currentTarget.offsetParent.main.style.top=(CS.toI(e.currentTarget.offsetParent.titleobj.style.height) + 3)+"px"
							e.currentTarget.offsetParent.main.style.width=(CS.toI(e.currentTarget.offsetParent.titleobj.style.width) - 8)+"px";
							e.currentTarget.offsetParent.main.style.height=(CS.toI(e.currentTarget.offsetParent.style.height) - CS.toI(e.currentTarget.offsetParent.titleobj.style.height) - 8)+"px";
							e.currentTarget.offsetParent.closebtn.style.left=(CS.toI(e.currentTarget.offsetParent.titleobj.style.width) - CS.toI(e.currentTarget.offsetParent.titleobj.style.height))+"px";
							e.currentTarget.offsetParent.kakudaibtn.style.left=(CS.toI(e.currentTarget.offsetParent.titleobj.style.width)- CS.toI(e.currentTarget.offsetParent.titleobj.style.height)-40)+"px";
							e.currentTarget.offsetParent.syukusyou.style.left=(CS.toI(e.currentTarget.offsetParent.titleobj.style.width)- CS.toI(e.currentTarget.offsetParent.titleobj.style.height)-80)+"px";
							e.currentTarget.offsetParent.canvas.width=CS.toI(e.currentTarget.offsetParent.main.style.width)-40;
							e.currentTarget.offsetParent.canvas.height=800;
							e.currentTarget.offsetParent.canvas.style.width=e.currentTarget.offsetParent.canvas.width+"px";
							e.currentTarget.offsetParent.canvas.style.height=e.currentTarget.offsetParent.canvas.height+"px";
							// e.currentTarget.offsetParent.canvas.width=CS.toI(e.currentTarget.offsetParent.canvas.style.width);
							// e.currentTarget.offsetParent.canvas.height=CS.toI(e.currentTarget.offsetParent.canvas.style.height);
							CS.createtyujyouzu(0);
						}
					}
					popwindow.appendChild(popwindow.syukusyou);
				}
			}
			if(CS.isNotNull(titm.deletspeaceflg)){
				popwindow.main.deletspeaceflg=titm.deletspeaceflg;
			}
		}
		
		CS.body.appendChild(popwindow);
		if(kotei!="kotei"){
			CS.dialogMove(popwindow, popwindow.titleobj);
		}
		popwindow.appendChild(popwindow.closebtn);
		popwindow.appendChild(popwindow.main);
		return popwindow;
	};
CS.tategaki = function(context, text, x, y, gyokan) {
	var textList = text.split('\n');
	var lineHeight = context.measureText("あ").width + gyokan;
	textList.forEach(function(elm, i) {
		Array.prototype.forEach.call(elm, function(ch, j) {
			context.fillText(ch, x - lineHeight * i, y + lineHeight * j);
		});
	});
};
CS.setcookie = function(id, code) {
	var expire = new Date();
	expire.setTime(expire.getTime() + 1000 * 3600 * 24);
	document.cookie = id + '=' + code + '; expires=' + expire.toUTCString() + '; path=/';
}
CS.getcookie = function(id) {
	if (!id || !document.cookie)
		return "";
	var cookies = document.cookie.split("; ");
	for (var i = 0; i < cookies.length; i++) {
		var str = cookies[i].split("=");
		if (str[0] != id)
			continue;
		if (typeof str[1] == "undefined") {
			return "";
		}
		return unescape(str[1]);
	}
	return "";
}
CS.checkuser = function() {
	if (CS.getcookie("id") == "" || CS.getcookie("kouzousyssessionid") == "") {
		CS.setcookie("id", "");
		CS.setcookie("kouzousyssessionid", "");
		location.href = "./index.html";

	} else {
		CS.id = CS.getcookie("id");
		$.ajax({
			type: "GET",
			url: "./checkuser.php?kouzousyssessionid=" + CS.getcookie("kouzousyssessionid") + "&data=" + Number(new Date),
			async: false,
			dataType:'xml',
			data: {
				"project_id": CS.getcookie("prjId"),
			},
			success: function(j_data){
				CS.userinfoxml = j_data;
				if (CS.userinfoxml.getElementsByTagName("err").length>0) {
					CS.setcookie("id", "");
					CS.setcookie("name", "");
					CS.setcookie("authority", "");
					CS.setcookie("expiration", "");
					CS.setcookie("sessionid", "");
					CS.setcookie("kouzousyssessionid", "");
					location.href = "./index.html";
					return;
				}
				if (CS.userinfoxml.getElementsByTagName("id")[0].childNodes[0].nodeValue == "99999999") {
					CS.setcookie("id", "");
					CS.setcookie("name", "");
					CS.setcookie("authority", "");
					CS.setcookie("expiration", "");
					CS.setcookie("sessionid", "");
					CS.setcookie("kouzousyssessionid", "");
					location.href = "./index.html";
				} else {
					CS.setcookie("id", CS.userinfoxml.getElementsByTagName("id")[0].childNodes[0].nodeValue);
					CS.setcookie("name", CS.userinfoxml.getElementsByTagName("name")[0].childNodes[0].nodeValue);
					CS.setcookie("authority", CS.userinfoxml.getElementsByTagName("authority")[0].childNodes[0].nodeValue);
					CS.setcookie("expiration", CS.userinfoxml.getElementsByTagName("expiration")[0].childNodes[0].nodeValue);
					CS.setcookie("kouzousyssessionid", CS.userinfoxml.getElementsByTagName("kouzousyssessionid")[0].childNodes[0].nodeValue);
					CS.setcookie("userflag", CS.userinfoxml.getElementsByTagName("userflag")[0].childNodes[0].nodeValue);
				}
			}
		});
		/* var getlogininfo = function(e) {
			if (CS.readObj.readyState == 4 && CS.readObj.status == 200) {
				CS.userinfoxml = CS.readObj.responseXML;
				if (CS.readObj.responseText.indexOf("not true user")!= -1) {
					CS.setcookie("id", "");
					CS.setcookie("name", "");
					CS.setcookie("authority", "");
					CS.setcookie("expiration", "");
					CS.setcookie("sessionid", "");
					CS.setcookie("kouzousyssessionid", "");
					location.href = "./index.html";
					return;
				}
				if (CS.userinfoxml.getElementsByTagName("id")[0].childNodes[0].nodeValue == "99999999") {
					CS.setcookie("id", "");
					CS.setcookie("name", "");
					CS.setcookie("authority", "");
					CS.setcookie("expiration", "");
					CS.setcookie("sessionid", "");
					CS.setcookie("kouzousyssessionid", "");
					location.href = "./index.html";
				} else {
					CS.setcookie("id", CS.userinfoxml.getElementsByTagName("id")[0].childNodes[0].nodeValue);
					CS.setcookie("name", CS.userinfoxml.getElementsByTagName("name")[0].childNodes[0].nodeValue);
					CS.setcookie("authority", CS.userinfoxml.getElementsByTagName("authority")[0].childNodes[0].nodeValue);
					CS.setcookie("expiration", CS.userinfoxml.getElementsByTagName("expiration")[0].childNodes[0].nodeValue);
					CS.setcookie("kouzousyssessionid", CS.userinfoxml.getElementsByTagName("kouzousyssessionid")[0].childNodes[0].nodeValue);
					CS.setcookie("userflag", CS.userinfoxml.getElementsByTagName("userflag")[0].childNodes[0].nodeValue);
				}
			}
		}
		CS.id = CS.getcookie("id");
		CS.readObj = createXMLHttpRequest(getlogininfo);
		CS.readObj.open("GET", "./checkuser.php?kouzousyssessionid=" + CS.getcookie("kouzousyssessionid") + "&data=" + Number(new Date), true);
		CS.readObj.send(null); */
	}
}
CS.numbereven=function(o){
	if(o.style.textAlign=="right"){
		o.onblur=function(e){
			if(e.currentTarget.innerHTML.substring(0,1)=="-"){
				if(isNaN(parseFloat(e.currentTarget.innerHTML))){
					e.currentTarget.innerHTML=0;	
				}else{
					e.currentTarget.innerHTML=parseFloat(e.currentTarget.innerHTML);
				}
			}else{
				if(e.currentTarget.innerHTML.substring(0,1)=="."){
					if(!isNaN(parseFloat("0"+e.currentTarget.innerHTML))){
						e.currentTarget.innerHTML="0"+e.currentTarget.innerHTML;
					}else{
						e.currentTarget.innerHTML="0";
					}
				}else{
					if(e.currentTarget.useblank && e.currentTarget.innerHTML==""){
					}else{
						if(isNaN(parseFloat(e.currentTarget.innerHTML))){
							e.currentTarget.innerHTML="0";
						}
					}
				}
			}
		}
	}
}
CS.logoutshell = function() {
	var getlogininfo = function(e) {
		if (CS.readObj.readyState == 4 && CS.readObj.status == 200) {
			CS.userinfoxml = CS.readObj.responseXML;
			if (CS.userinfoxml.getElementsByTagName("deleted")[0].childNodes[0].nodeValue != "1") {
				alert("ログアウトが失敗しました、システム管理者と連絡してください");
			} else {
				CS.setcookie("id", "");
				CS.setcookie("name", "");
				CS.setcookie("authority", "");
				CS.setcookie("expiration", "");
				location.href = "./";
			}
		}
	}
	CS.id = CS.getcookie("id");
	CS.readObj = createXMLHttpRequest(getlogininfo);
	CS.readObj.open("GET", "./logout.php?id=" + CS.id + "&data=" + Number(new Date), true);
	CS.readObj.send(null);
}
CS.copyobjoption=function(A,V){
	V.style.position=A.style.position;
	V.style.top=CS.toI(A.style.top)+23+"px";
	V.style.left=A.style.left;
	V.style.width=A.style.width;
	V.style.height=A.style.height;
	V.style.borderStyle=A.style.borderStyle;
	V.style.borderWidth=A.style.borderWidth
	V.style.textAlign=A.style.textAlign;
	V.style.backgroundColor=A.style.backgroundColor;
	V.editflg=A.editflg;
	V.editevendflg=A.editevendflg;
	V.selectedflg=A.selectedflg;
	V.contentEditable=A.contentEditable;
}
//選択されたオブジェクト配列
CS.selectedobjs=[];

// シンプルなメニューをセットする
CS.set_simple_menue =　function(o, t, l, menutitlelist, menufuctionlist) {
	if(!CS.isNotNull(o.offsetParent.menue)){
		o.offsetParent.menue = document.createElement("div");
		o.offsetParent.menue.style.position = "absolute";
		o.offsetParent.menue.style.top = "0px";
		o.offsetParent.menue.style.left = "0px";
		o.offsetParent.menue.style.width = "180px";
		o.offsetParent.menue.style.height = menutitlelist.length * 22 + "px";
		o.offsetParent.menue.style.borderStyle = "groove";
		o.offsetParent.menue.style.borderWidth = "2px";
		o.offsetParent.menue.style.display = "none";
		o.offsetParent.menue.style.zIndex = 10012;
		o.offsetParent.menue.sub = [];
		if (CS.isNotNull(menufuctionlist)) {
			o.offsetParent.menue.create_fugou_for_err = menufuctionlist[0];
		}

		for (var i = 0; i < menutitlelist.length; i++) {
			o.offsetParent.menue.sub[i] = document.createElement("div");
			o.offsetParent.menue.sub[i].style.position = "relative";
			o.offsetParent.menue.sub[i].style.width = "100%";
			o.offsetParent.menue.sub[i].style.height = "22px";
			o.offsetParent.menue.sub[i].style.textAlign = "left";
			o.offsetParent.menue.sub[i].style.color = "black";
			o.offsetParent.menue.sub[i].style.zIndex = 10012;
			if (i % 2 == 0) {
				o.offsetParent.menue.sub[i].style.backgroundColor = "#00FF00";
			} else {
				o.offsetParent.menue.sub[i].style.backgroundColor = "#ADFF2F";
			}
			o.offsetParent.menue.sub[i].innerHTML = menutitlelist[i];
			o.offsetParent.menue.sub[i].offset_menue=o.offsetParent.menue;
			if (menutitlelist[i] == "エラー杭のみ新規符号") {
				o.offsetParent.menue.sub[i].onmousedown = o.offsetParent.menue.create_fugou_for_err;
			}

			o.offsetParent.menue.sub[i].style.cursor = "pointer";
			o.offsetParent.menue.appendChild(o.offsetParent.menue.sub[i]);
		}
		CS.body.appendChild(o.offsetParent.menue);
	}
	o.offsetParent.onscroll=function(e){
		e.currentTarget.menue.style.display="none";
	}
	o.onmousedown = function(e) {
		if (e.which != 1) {
			CS.setcookie("use_pile_id",e.currentTarget.use_pile_id);
			CS.setcookie("use_pile_name",e.currentTarget.use_pile_name);
			CS.setcookie("kind_id",e.currentTarget.kind_id);
			//メニューリストが空の場合
			if (menutitlelist.length == 0 && CS.isNotNull(e.offsetParent.currentTarget.menue)) {
				e.currentTarget.offsetParent.menue.style.display = "none";
				return;
			}else{
				var obj = e.currentTarget.offsetParent;
				var x = obj.offsetLeft, y = obj.offsetTop;
				while (obj = obj.offsetParent) {
					x += CS.toI(obj.offsetLeft);
					y += CS.toI(obj.offsetTop);
				}
				var my = e.pageY;
				var mx = e.pageX;
				e.currentTarget.offsetParent.menue.style.top = my + "px";
				e.currentTarget.offsetParent.menue.style.left = mx + "px";
				e.currentTarget.offsetParent.menue.style.display = "";
			}
			document.oncontextmenu = function(e) {
				return false;
			};
			var te = function() {
				document.oncontextmenu = function(e) {
					return true;
				}
			};
			setTimeout(te, 300);
			return;
		}
		return true;
	};
}



// マウス移動でdivを選択できるように制御する
CS.setmousecell =
	function(o, t, l, menutitlelist, menufuctionlist) {
		// 選択用div
		o.sentakudiv = document.createElement("div");
		o.sentakudiv.style.position = "absolute";
		o.sentakudiv.style.top = "0px";
		o.sentakudiv.style.left = "0px";
		o.sentakudiv.style.width = "82px";
		o.sentakudiv.style.height = "22px";
		// o.sentakudiv.style.borderStyle="solid";
		// o.sentakudiv.style.borderWidth="1px";
		o.sentakudiv.style.backgroundColor = "red";
		o.sentakudiv.style.display = "none";
		o.sentakudiv.style.opacity = "0.5";
		o.sentakudiv.style.zIndex = 10011;
		o.appendChild(o.sentakudiv);

		o.menue = document.createElement("div");
		o.menue.style.position = "absolute";
		o.menue.style.top = "0px";
		o.menue.style.left = "0px";
		o.menue.style.width = "150px";
		o.menue.style.height = menutitlelist.length * 22 + "px";
		o.menue.style.borderStyle = "groove";
		o.menue.style.borderWidth = "2px";
		o.menue.style.display = "none";
		o.menue.style.zIndex = 10012;
		o.menue.sub = [];
		// コピーしたデータ
		o.codelist = [];
		// 目標地
		o.pastelist = [];
		o.copeflg = false;
		o.pasteflg = false;
		o.delflg = false;
		o.insertrowflg = false;
		o.deleterowflg = false;
		// コピーメソッド
		o.menue.copefunc = function(e) {
			o.copeflg = true;
			e.currentTarget.offsetParent.offsetParent.codelist = [];
			var v = e.currentTarget.offsetParent.offsetParent;
			v = v.cl;
			var newflg = true;
			for (var i = 0; i < v[0].length; i++) {
				newflg = true;
				for (var j = 0; j < v.length; j++) {
					if (v[j][i].style.backgroundColor == "rgb(0, 255, 255)") {
						if (newflg) {
							o.codelist[o.codelist.length] = [];
							newflg = false;
						}
						if (j >= v.length - 1) {
							newflg = true;
						}
						v[j][i].style.backgroundColor = "GreenYellow";
						o.codelist[o.codelist.length - 1][o.codelist[o.codelist.length - 1].length] = v[j][i];
					}
				}
			}
			var opencopeflag = function() {
				o.copeflg = false;
			}
			e.currentTarget.offsetParent.style.display = "none";
			setTimeout(opencopeflag, 200);
		};
		// 貼るメソッド
		o.menue.pastefunc = function(e) {
			o.pasteflg = true;
			// 当前、選択された位置を確認
			e.currentTarget.offsetParent.offsetParent.pastelist = [];
			var v = e.currentTarget.offsetParent.offsetParent;
			v = v.cl;
			if(CS.isNotNull(e.currentTarget.gyakuflg)&&e.currentTarget.gyakuflg==true){
				var newflg = true;
				for (var i = 0; i < v.length; i++) {
					newflg = true;
					for (var j = 0; j < v[0].length; j++) {
						if (v[i][j].style.backgroundColor == "rgb(0, 255, 255)") {
							if (newflg) {
								o.pastelist[o.pastelist.length] = [];
								newflg = false;
							}
							if (j >= v.length - 1) {
								newflg = true;
							}
							CS.setFFFFFF(v[i][j]);
							o.pastelist[o.pastelist.length - 1][o.pastelist[o.pastelist.length - 1].length] = v[i][j];
						}
					}
				}
				if (o.pastelist.length == 1) {
					if (o.pastelist[0].length == 1) {
						// 一つ枠セルだけ選択した場合
						// データを入れるかを判断するフラグ
						var instflg = false;
						var ii = 0;
						var ij = -1;
						var starti = 0;
						var startj = 0
						for (var i = 0; i < v.length; i++) {
							if (instflg) {
								ii++;
								ij = -1;
							}
							for (var j = 0; j < v[0].length; j++) {
								if (v[i][j].id == o.pastelist[0][0].id) {
									starti = i + 0;
									startj = j + 0;
									v[i][j].innerHTML = o.codelist[ii][++ij].innerHTML;
									instflg = true;
								} else if (instflg && j >= startj) {
									if (typeof o.codelist[ii] != "undefined" && typeof o.codelist[ii][++ij] != "undefined") {
										v[i][j].innerHTML = o.codelist[ii][ij].innerHTML;
									}
								}
							}
						}
					} else {
						// 一行枠セルだけ選択した場合
						var instflg = false;
						var ii = 0;
						var ij = -1;
						var starti = 0;
						var startj = 0
						for (var i = 0; i < v.length; i++) {
							if (instflg) {
								ii++;
								ij = -1;
							}
							for (var j = 0; j < v[0].length; j++) {
								if (v[j][i].id == o.pastelist[0][0].id) {
									starti = i + 0;
									startj = j + 0;
									v[j][i].innerHTML = o.codelist[ii][++ij].innerHTML;
									instflg = true;
								} else if (instflg && j >= startj) {
									if (ij <= o.pastelist[0].length - 1 && j - startj < o.pastelist[0].length) {
										ij++;
										if (o.codelist[0].length - 1 < ij) {
											ij = ij % o.codelist[0].length;
										}
										if (typeof o.codelist[ii] != "undefined" && typeof o.codelist[ii][ij] != "undefined") {
											v[j][i].innerHTML = o.codelist[ii][ij].innerHTML;
										}
									}
								}
							}
						}
					}
				} else {
					// 複数行枠セルだけ選択した場合
					var instflg = false;
					var ii = 0;
					var ij = 0;
					for (var i = 0; i < o.pastelist.length; i++) {
						for (var j = 0; j < o.pastelist[i].length; j++) {
							ii = i % o.codelist.length;
							ij = j % o.codelist[ii].length;
							o.pastelist[i][j].innerHTML = o.codelist[ii][ij].innerHTML;
						}
					}
				}
			}else{
				var newflg = true;
				for (var i = 0; i < v[0].length; i++) {
					newflg = true;
					for (var j = 0; j < v.length; j++) {
						if (v[j][i].style.backgroundColor == "rgb(0, 255, 255)") {
							if (newflg) {
								o.pastelist[o.pastelist.length] = [];
								newflg = false;
							}
							if (j >= v.length - 1) {
								newflg = true;
							}
							CS.setFFFFFF(v[j][i]);
							o.pastelist[o.pastelist.length - 1][o.pastelist[o.pastelist.length - 1].length] = v[j][i];
						}
					}
				}
				if (o.pastelist.length == 1) {
					if (o.pastelist[0].length == 1) {
						// 一つ枠セルだけ選択した場合
						// データを入れるかを判断するフラグ
						var instflg = false;
						var ii = 0;
						var ij = -1;
						var starti = 0;
						var startj = 0
						for (var i = 0; i < v[0].length; i++) {
							if (instflg) {
								ii++;
								ij = -1;
							}
							for (var j = 0; j < v.length; j++) {
								if (v[j][i].id == o.pastelist[0][0].id) {
									starti = i + 0;
									startj = j + 0;
									v[j][i].innerHTML = o.codelist[ii][++ij].innerHTML;
									instflg = true;
								} else if (instflg && j >= startj) {
									if (typeof o.codelist[ii] != "undefined" && typeof o.codelist[ii][++ij] != "undefined") {
										v[j][i].innerHTML = o.codelist[ii][ij].innerHTML;
									}
								}
							}
						}
					} else {
						// 一行枠セルだけ選択した場合
						var instflg = false;
						var ii = 0;
						var ij = -1;
						var starti = 0;
						var startj = 0
						for (var i = 0; i < v[0].length; i++) {
							if (instflg) {
								ii++;
								ij = -1;
							}
							for (var j = 0; j < v.length; j++) {
								if (v[j][i].id == o.pastelist[0][0].id) {
									starti = i + 0;
									startj = j + 0;
									v[j][i].innerHTML = o.codelist[ii][++ij].innerHTML;
									instflg = true;
								} else if (instflg && j >= startj) {
									if (ij <= o.pastelist[0].length - 1 && j - startj < o.pastelist[0].length) {
										ij++;
										if (o.codelist[0].length - 1 < ij) {
											ij = ij % o.codelist[0].length;
										}
										if (typeof o.codelist[ii] != "undefined" && typeof o.codelist[ii][ij] != "undefined") {
											v[j][i].innerHTML = o.codelist[ii][ij].innerHTML;
										}
									}
								}
							}
						}
					}
				} else {
					// 複数行枠セルだけ選択した場合
					var instflg = false;
					var ii = 0;
					var ij = 0;
					for (var i = 0; i < o.pastelist.length; i++) {
						for (var j = 0; j < o.pastelist[i].length; j++) {
							ii = i % o.codelist.length;
							ij = j % o.codelist[ii].length;
							o.pastelist[i][j].innerHTML = o.codelist[ii][ij].innerHTML;
						}
					}
				}
			}
			var openpasteflg = function() {
				o.pasteflg = false;
			}
			e.currentTarget.offsetParent.style.display = "none";
			setTimeout(openpasteflg, 200);
		};
		// 削除メソッド
		o.menue.delfunc = function(e) {
			o.delflg = true;
			// 当前、選択された位置を確認
			e.currentTarget.offsetParent.offsetParent.pastelist = [];
			var v = e.currentTarget.offsetParent.offsetParent;
			v = v.cl;
			var newflg = true;
			for (var i = 0; i < v[0].length; i++) {
				for (var j = 0; j < v.length; j++) {
					if (v[j][i].style.backgroundColor == "rgb(0, 255, 255)") {
						CS.setFFFFFF(v[j][i]);
						v[j][i].innerHTML = "";
					}
				}
			}
			var opendelflg = function() {
				o.delflg = false;
			}
			e.currentTarget.offsetParent.style.display = "none";
			setTimeout(opendelflg, 200);
		};
		// 行挿入メソッド
		o.menue.insertrow = function(e) {
			if(e.currentTarget.offsetParent.offsetParent.viewId=="baseline"){
				setTimeout(opendelflg, 200);
				CS.rowcol_edit(e);
				return;
			}
			
			o.insertrowflg = true;
			// 当前、選択された位置を確認
			e.currentTarget.offsetParent.offsetParent.pastelist = [];
			var v = e.currentTarget.offsetParent.offsetParent;
			var MO=e.currentTarget.offsetParent.offsetParent;
			var opendelflg = function() {
				o.insertrow = false;
			}
			e.currentTarget.offsetParent.style.display = "none";
			setTimeout(opendelflg, 200);
			//xxx.main
			v = v.cl;
			var thiswor=null;
			if(CS.isNotNull(e.currentTarget.gyakuflg)&&e.currentTarget.gyakuflg==true){
				for (var i = 0; i < v.length; i++) {
					if(thiswor!=null){
						break;
					}
					for (var t = 0; t < v[0].length; t++) {
						if(v[i][t].style.backgroundColor == "rgb(0, 255, 255)"
						||v[i][t].style.backgroundColor == "rgb(0, 255, 255)"
						||v[i][i].style.backgroundColor == "rgb(0, 255, 255)"){
							thiswor=i;
						}
					}
				}
			}else{
				for (var i = 0; i < v[0].length; i++) {
					if(thiswor!=null){
						break;
					}
					for (var t = 0; t < v.length; t++) {
						if(v[t][i].style.backgroundColor == "rgb(0, 255, 255)"
						||v[t][i].style.backgroundColor == "rgb(0, 255, 255)"
						||v[t][i].style.backgroundColor == "rgb(0, 255, 255)"){
							thiswor=i;
						}
					}
				}
			}

			//どのモジュールなりますかを判断する
			if(MO.offsetParent.titleobj.innerHTML=="　Ｎ値データ入力"){
				CS.addNthi_row(thiswor,"add");
			}else if(MO.offsetParent.titleobj.innerHTML=="　土質データ入力"){
				CS.adddshi_row(thiswor,"add");
			}else if(MO.offsetParent.titleobj.innerHTML=="　応答変位データ入力"){
				CS.addouto_row(thiswor,"add");
			}else if(MO.offsetParent.titleobj.innerHTML=="doshitsuinput_1"){
				CS.adddshi_row(thiswor,"add");
			}else if(MO.offsetParent.titleobj.innerHTML=="doshitsuinput_2"){
				CS.adddshi_row(thiswor,"add");
			}
		};
		// 行削除メソッド
		o.menue.deleterow = function(e) {
			if(e.currentTarget.offsetParent.offsetParent.viewId=="baseline"){
				setTimeout(opendelflg, 200);
				CS.rowcol_edit(e);
				return;
			}
			o.deleterowflg = true;
			// 当前、選択された位置を確認
			e.currentTarget.offsetParent.offsetParent.pastelist = [];
			var v = e.currentTarget.offsetParent.offsetParent;
			var MO=e.currentTarget.offsetParent.offsetParent;
			var opendelflg = function() {
				o.deleterow = false;
			}
			e.currentTarget.offsetParent.style.display = "none";
			setTimeout(opendelflg, 200);
			//xxx.main
			v = v.cl;
			var thiswor=null;
			if(CS.isNotNull(e.currentTarget.gyakuflg)&&e.currentTarget.gyakuflg==true){
				for (var i = 0; i < v.length; i++) {
					if(thiswor!=null){
						break;
					}
					for (var t = 0; t < v[0].length; t++) {
						if(v[i][t].style.backgroundColor == "rgb(0, 255, 255)"
						||v[i][t].style.backgroundColor == "rgb(0, 255, 255)"
						||v[i][i].style.backgroundColor == "rgb(0, 255, 255)"){
							thiswor=i;
						}
					}
				}
			}else{
				for (var i = 0; i < v[0].length; i++) {
					if(thiswor!=null){
						break;
					}
					for (var t = 0; t < v.length; t++) {
						if(v[t][i].style.backgroundColor == "rgb(0, 255, 255)"
						||v[t][i].style.backgroundColor == "rgb(0, 255, 255)"
						||v[t][i].style.backgroundColor == "rgb(0, 255, 255)"){
							thiswor=i;
						}
					}
				}
			}

			//どのモジュールなりますかを判断する
			if(MO.offsetParent.titleobj.innerHTML=="　Ｎ値データ入力"){
				CS.addNthi_row(thiswor,"del");
			}else if(MO.offsetParent.titleobj.innerHTML=="　土質データ入力"){
				CS.adddshi_row(thiswor,"del");
			}else if(MO.offsetParent.titleobj.innerHTML=="　応答変位データ入力"){
				CS.addouto_row(thiswor,"del");
			}else if(MO.offsetParent.titleobj.innerHTML=="doshitsuinput_1"){
				CS.adddshi_row(thiswor,"del");
			}else if(MO.offsetParent.titleobj.innerHTML=="doshitsuinput_2"){
				CS.adddshi_row(thiswor,"del");
			}
		};
		
		// 行列の編集
		o.menue.rowcol_edit = function(e) {
			if(e.currentTarget.offsetParent.offsetParent.viewId=="baseline"){
				CS.rowcol_edit(e);
				return;
			}
		}
		
		// エクセルからコピー
		o.menue.copyforexcel = function(e) {
			var data = null;
			if (typeof window.clipboardData != "undefined") {
				data = window.clipboardData.getData('Text');
			} else {
				e.preventDefault();
				data = e.clipboardData.getData("text");
			}

			if (data != null) {
				var cells = data.split('\n');
				var rowCnt = 5;
				for (i = 0; i < cells.length; i++) {
					if (i == rowCnt)
						return;
					var tbId = 'r' + i + 'c1';
				}
			}
		};
		// 使用しない
		o.menue.nouse = function(e) {
			o.delflg = true;
			// 当前、選択された位置を確認
			e.currentTarget.offsetParent.offsetParent.pastelist = [];
			var v = e.currentTarget.offsetParent.offsetParent;
			v = v.cl;
			var newflg = true;
			for (var i = 0; i < v[0].length; i++) {
				for (var j = 0; j < v.length; j++) {
					if (v[j][i].style.backgroundColor == "rgb(0, 255, 255)") {
						if (v[j][i].asgnFlag == false || v[j][i].baseFlag == false) {
							// v[j][i].style.backgroundImage='url(./img/nouse.png)';
							v[j][i].style.backgroundColor = "black";
							v[j][i].innerHTML = "";
							v[j][i].blackFlag = "clearcolor";
							v[j][i].contentEditable = "false";
							v[j][i].editevendflg = false;
						}
					}
				}
			}
			var opendelflg = function() {
				o.delflg = false;
			}
			e.currentTarget.offsetParent.style.display = "none";
			setTimeout(opendelflg, 200);
		};
		// 使用する
		o.menue.use = function(e) {
			o.delflg = true;
			// 当前、選択された位置を確認
			e.currentTarget.offsetParent.offsetParent.pastelist = [];
			var v = e.currentTarget.offsetParent.offsetParent;
			v = v.cl;
			var newflg = true;
			for (var i = 0; i < v[0].length; i++) {
				for (var j = 0; j < v.length; j++) {
					if (v[j][i].style.backgroundColor == "rgb(0, 255, 255)" || v[j][i].mtselected == true) {
						v[j][i].mtselected = false;
//						CS.setFFFFFF(v[j][i]);
						v[j][i].style.backgroundColor = "white";
						v[j][i].blackFlag = "addcolor";
						v[j][i].contentEditable = "true";
						v[j][i].editevendflg = true;
					}
				}
			}
			var opendelflg = function() {
				o.delflg = false;
			}
			e.currentTarget.offsetParent.style.display = "none";
			setTimeout(opendelflg, 200);
		};
		
		//する
		o.menue.make = function(e) {
			o.delflg = true;
			// 当前、選択された位置を確認
			e.currentTarget.offsetParent.offsetParent.pastelist = [];
			var v = e.currentTarget.offsetParent.offsetParent;
			v = v.cl;
			var newflg = true;
			for (var i = 0; i < v[0].length; i++) {
				for (var j = 0; j < v.length; j++) {
					if (v[j][i].style.backgroundColor == "rgb(0, 255, 255)") {
						v[j][i].innerHTML = "する";
						v[j][i].makeflag = 0;
					}
				}
			}
			var opendelflg = function() {
				o.delflg = false;
			}
			e.currentTarget.offsetParent.style.display = "none";
			setTimeout(opendelflg, 200);
		};
		//しない
		o.menue.nomake = function(e) {
			o.delflg = true;
			// 当前、選択された位置を確認
			e.currentTarget.offsetParent.offsetParent.pastelist = [];
			var v = e.currentTarget.offsetParent.offsetParent;
			v = v.cl;
			var newflg = true;
			for (var i = 0; i < v[0].length; i++) {
				for (var j = 0; j < v.length; j++) {
					if (v[j][i].style.backgroundColor == "rgb(0, 255, 255)") {
						v[j][i].innerHTML = "しない";
						v[j][i].makeflag = 1;
					}
				}
			}
			var opendelflg = function() {
				o.delflg = false;
			}
			e.currentTarget.offsetParent.style.display = "none";
			setTimeout(opendelflg, 200);
		};
		o.menue.maru = function(e) {
			o.delflg = true;
			var v = e.currentTarget.offsetParent.offsetParent;
			v = v.cl;
			for (var i = 0; i < v[0].length; i++) {
				for (var j = 0; j < v.length; j++) {
					if (v[j][i].style.backgroundColor == "rgb(0, 255, 255)") {
						if(v[j][i].marubatuflag){
							v[j][i].innerHTML = "○";	
						}
						v[j][i].mtselected = false;
					}
				}
			}
			e.currentTarget.offsetParent.style.display = "none";
			var opendelflg = function() {
				o.delflg = false;
			}
			setTimeout(opendelflg, 200);
			return false;
		};
		o.menue.batu = function(e) {
			o.delflg = true;
			var v = e.currentTarget.offsetParent.offsetParent;
			v = v.cl;
			for (var i = 0; i < v[0].length; i++) {
				for (var j = 0; j < v.length; j++) {
					if (v[j][i].style.backgroundColor == "rgb(0, 255, 255)") {
						if(v[j][i].marubatuflag){
							v[j][i].innerHTML = "×";	
						}
						v[j][i].mtselected = false;
					}
				}
			}
			e.currentTarget.offsetParent.style.display = "none";
			var opendelflg = function() {
				o.delflg = false;
			}
			setTimeout(opendelflg, 200);
			
			return false;
		};
		//
		o.menue.ktrEvent = function(e,id) {
			// 当前、選択された位置を確認
			e.currentTarget.offsetParent.offsetParent.pastelist = [];
			var v = e.currentTarget.offsetParent.offsetParent;
			var axis_id = v.id.split(",")[1];
			v = v.cl;
			CS.ktrEventByMouse(id,axis_id,e);
			e.currentTarget.offsetParent.style.display = "none";
		}
		
		if (CS.isNotNull(menufuctionlist)) {
			o.menue.setbor = menufuctionlist[0];
		}

		for (var i = 0; i < menutitlelist.length; i++) {
			o.menue.sub[i] = document.createElement("div");
			o.menue.sub[i].style.position = "relative";
			o.menue.sub[i].style.width = "100%";
			o.menue.sub[i].style.height = "22px";
			o.menue.sub[i].style.textAlign = "left";
			o.menue.sub[i].style.color = "black";
			o.menue.sub[i].style.zIndex = 10012;
			if (i % 2 == 0) {
				o.menue.sub[i].style.backgroundColor = "#00FF00";
			} else {
				o.menue.sub[i].style.backgroundColor = "#ADFF2F";
			}
			o.menue.sub[i].innerHTML = menutitlelist[i];
			if (menutitlelist[i] == "コピー") {
				o.menue.sub[i].onmousedown = o.menue.copefunc;
			} else if (menutitlelist[i] == "貼る") {
				o.menue.sub[i].onmousedown = o.menue.pastefunc;
			} else if (menutitlelist[i] == "削除") {
				o.menue.sub[i].onmousedown = o.menue.delfunc;
			} else if (menutitlelist[i] == "行挿入") {
				o.menue.sub[i].onmousedown = o.menue.insertrow;
			} else if (menutitlelist[i] == "行削除") {
				o.menue.sub[i].onmousedown = o.menue.deleterow;
			} else if (menutitlelist[i] == "列挿入") {
				o.menue.sub[i].onmousedown = o.menue.rowcol_edit;
			} else if (menutitlelist[i] == "列削除") {
				o.menue.sub[i].onmousedown = o.menue.rowcol_edit;
			} else if (menutitlelist[i] == "excelcopy") {
				o.menue.sub[i].onmousedown = o.menue.copyforexcel;
			} else if (menutitlelist[i] == "使用しない") {
				//asgnFlag或いはbaseFlagが必須
				o.menue.sub[i].onmousedown = o.menue.nouse;
			} else if (menutitlelist[i] == "使用する") {
				//asgnFlag或いはbaseFlagが必須
				o.menue.sub[i].onmousedown = o.menue.use;
			} else if (menutitlelist[i] == "する") {
				o.menue.sub[i].onmousedown = o.menue.make;
			} else if (menutitlelist[i] == "しない") {
				o.menue.sub[i].onmousedown = o.menue.nomake;
			} else if (menutitlelist[i] == "符号変更") {
				o.menue.sub[i].onmousedown = function(e) {o.menue.ktrEvent(e,0);};
			} else if (menutitlelist[i] == "フーチング") {
				o.menue.sub[i].onmousedown = function(e){o.menue.ktrEvent(e,1);};
			} else if (menutitlelist[i] == "荷重") {
				o.menue.sub[i].onmousedown = function(e){o.menue.ktrEvent(e,2);};
			} else if (menutitlelist[i] == "負担するしない") {
				o.menue.sub[i].onmousedown = function(e){o.menue.ktrEvent(e,3);};
			} else if (menutitlelist[i] == "プロパティ(一覧)") {
				o.menue.sub[i].onmousedown = function(e){o.menue.ktrEvent(e,4);};
			} else if (menutitlelist[i].substring(0, 1) == "○") {
				o.menue.sub[i].innerHTML = menutitlelist[i].substring(1).split("|")[1];
				o.menue.sub[i].paraId = menutitlelist[i].substring(1).split("|")[0];
				o.menue.sub[i].paraName = menutitlelist[i].substring(1).split("|")[1];
				o.menue.sub[i].onmousedown = o.menue.setbor;
			} else if (menutitlelist[i] == "　○") {
				o.menue.sub[i].onmousedown = o.menue.maru;
			} else if (menutitlelist[i] == "　×") {
				o.menue.sub[i].onmousedown = o.menue.batu;
			}
			o.menue.sub[i].style.cursor = "pointer";
			o.menue.appendChild(o.menue.sub[i]);
		}
		o.appendChild(o.menue);
		if(CS.isNotNull(o.dragstart)){
			o.dragstart= function(e) {
				if (e.which != 1) {
					document.oncontextmenu = function(e) {
						return false;
					};
					var te = function() {
						document.oncontextmenu = function(e) {
							return true;
						}
					};
					setTimeout(te, 300);
					return;
				}
				if (o.copeflg || o.pasteflg || o.delflg || o.insertrowflg || o.deleterowflg) {
					return false;
				}
				e.currentTarget.menue.style.display = "none";
				e.currentTarget.sentakudiv.style.display = "";
				var obj = e.currentTarget;
				var x = obj.offsetLeft, y = obj.offsetTop;
				while (obj = obj.offsetParent) {
					x += CS.toI(obj.offsetLeft);
					y += CS.toI(obj.offsetTop);
				}
				e.currentTarget.sentakudiv.style.top = e.pageY + e.currentTarget.scrollTop - y + "px";
				e.currentTarget.sentakudiv.style.left = e.pageX + e.currentTarget.scrollLeft - x + "px";
				e.currentTarget.startX = e.pageX;
				e.currentTarget.startY = e.pageY;
				e.currentTarget.sentakudiv.style.height = "0px";
				e.currentTarget.sentakudiv.style.width = "0px";
				return true;
			};
		}else{
			o.onmousedown = function(e) {
				//メニューリストが空の場合
				if (menutitlelist.length == 0 && CS.isNotNull(e.currentTarget.menue)) {
					e.currentTarget.menue.style.display = "none";
					return;
		        }
				if (e.which != 1) {
					document.oncontextmenu = function(e) {
						return false;
					};
					var te = function() {
						document.oncontextmenu = function(e) {
							return true;
						}
					};
					setTimeout(te, 300);
					return;
				}
				if (o.copeflg || o.pasteflg || o.delflg) {
					return false;
				}
				document.body.click();
				e.currentTarget.menue.style.display = "none";
				e.currentTarget.sentakudiv.style.display = "";
				var obj = e.currentTarget;
				var x = obj.offsetLeft, y = obj.offsetTop;
				while (obj = obj.offsetParent) {
					x += CS.toI(obj.offsetLeft);
					y += CS.toI(obj.offsetTop);
				}
				e.currentTarget.sentakudiv.style.top = e.pageY + e.currentTarget.scrollTop - y + "px";
				e.currentTarget.sentakudiv.style.left = e.pageX + e.currentTarget.scrollLeft - x + "px";
				e.currentTarget.startX = e.pageX;
				e.currentTarget.startY = e.pageY;
				e.currentTarget.sentakudiv.style.height = "0px";
				e.currentTarget.sentakudiv.style.width = "0px";
				return true;
			};
		}
		o.onmouseover=function(e){
			if(CS.isNotNull(e.currentTarget.poptext)){
				if(!CS.isNotNull(o.menue) ||o.menue.style.display=="none" ){
					if (!CS.isNotNull(CS.showhonmyouobj )) {
						CS.showhonmyouobj = document.createElement("div");
						CS.showhonmyouobj.style.backgroundColor = "#F0F8FF";
						CS.showhonmyouobj.style.position = "absolute";
						CS.showhonmyouobj.style.zIndex = 99995;
						document.getElementsByTagName("body").item(0).appendChild(CS.showhonmyouobj);
					}
					CS.showhonmyouobj.innerHTML = e.currentTarget.poptext;
					CS.showhonmyouobj.style.display = "";
					CS.showhonmyouobj.style.top = e.pageY + e.currentTarget.scrollTop + 2 + "px";
					CS.showhonmyouobj.style.left = e.pageX + e.currentTarget.scrollLeft + 2 + "px";	
				}
			}
		}
		// 本来内容を表示する
		o.onmousemove = function(e) {
			if(CS.isNotNull(e.currentTarget.poptext)){
				if(!CS.isNotNull(o.menue) ||o.menue.style.display=="none" ){
					if (!CS.isNotNull(CS.showhonmyouobj )) {
						CS.showhonmyouobj = document.createElement("div");
						CS.showhonmyouobj.style.backgroundColor = "#F0F8FF";
						CS.showhonmyouobj.style.position = "absolute";
						CS.showhonmyouobj.style.zIndex = 99995;
						document.getElementsByTagName("body").item(0).appendChild(CS.showhonmyouobj);
					}
					CS.showhonmyouobj.innerHTML = e.currentTarget.poptext;
					CS.showhonmyouobj.style.display = "";
					CS.showhonmyouobj.style.top = e.pageY + e.currentTarget.scrollTop + 2 + "px";
					CS.showhonmyouobj.style.left = e.pageX + e.currentTarget.scrollLeft + 2 + "px";	
				}
			}
		}
		//マウスが外した時に、本来内容を表示するDIVを隠す
		o.onmouseout = function(e) {
			if (typeof CS.showhonmyouobj != "undefined") {
				CS.showhonmyouobj.style.top = "-1000px";
				CS.showhonmyouobj.style.left = "-1000px";
				CS.showhonmyouobj.style.display = "none";
			}
		}
		o.onkeydown=function(e){
			var isCtrlDown = false;
			if (e.metaKey) { // mac
				isCtrlDown = true;
			} else if (e.ctrlKey && navigator.userAgent.indexOf('Mac') === -1) { // pc
				isCtrlDown = true;
			}
			
			if (isCtrlDown) {
				if(CS.gaisansekeiflg){return false;}
				if(CS.isNotNull(e.currentTarget.offsetParent)&&CS.isNotNull(e.currentTarget.offsetParent.copytextObj)){
					e.currentTarget.offsetParent.copytextObj.style.display = "";
					e.currentTarget.offsetParent.copytextObj.select();
					return true;
				}else{
					return false;
				}
			}else{
				//return CS.numOnly();
			}
		}
		CS.toNoedit = function(o) {
			if (typeof o.sobj != "undefined") {
				CS.removeChild(o, o.oldvalue);
			}
			CS.othermethod1(o);
			CS.disableSelection(o);
			o.onmousedown = CS.focuseven_down;
			CS.setFFFFFF(o);
			o.contentEditable = "false";
		}
		o.onmouseup =　function(e) {
			if (e.which != 1) {
				return;
			}
			if (o.copeflg || o.pasteflg || o.delflg) {
				return false;
			}
			CS.openSelection(e.currentTarget.offsetParent);
			e.currentTarget.offsetParent.focus();
			var v = e.currentTarget;
			v = v.cl;
			var minx = CS.toI(e.currentTarget.sentakudiv.style.left);
			var maxx = CS.toI(e.currentTarget.sentakudiv.style.left) + CS.toI(e.currentTarget.sentakudiv.style.width);
			var miny = CS.toI(e.currentTarget.sentakudiv.style.top);
			var maxy = CS.toI(e.currentTarget.sentakudiv.style.top) + CS.toI(e.currentTarget.sentakudiv.style.height);
			var math = 0;
			var mi = 0;
			var mj = 0;
			var oldcolor;
			if (typeof v[0][0] != "undefined" && miny < CS.toI(v[0][0].style.top)) {
				e.currentTarget.sentakudiv.style.display = "none";
				return true;
			}
			if(e.currentTarget.sentakudiv.style.display == "none"){
				return true;
			}
			var selectedflg=true;
			if (CS.toI(e.currentTarget.sentakudiv.style.width) <2) {
				for (var i = 0; i < v.length; i++) {
					for (var j = 0; j < v[i].length; j++) {
						if (CS.isNotNull(v[i][j]) && CS.colored(v[i][j].style.backgroundColor, 0) && v[i][j].editflg != false) {
							if (minx <= CS.toI(v[i][j].style.left) + CS.toI(v[i][j].style.width) && maxx >= CS.toI(v[i][j].style.left)
								&& miny <= CS.toI(v[i][j].style.top) + CS.toI(v[i][j].style.height) && maxy >= CS.toI(v[i][j].style.top)) {
								var toeditableflg=false;
								if (v[i][j].editevendflg == false &&v[i][j].inputflg == true ) {
									toeditableflg=true;
								}else if(!CS.isNotNull(v[i][j].editevendflg)){
									toeditableflg=true;
								}else if(v[i][j].editevendflg==true){
									toeditableflg=true;
								}
								if(toeditableflg){
									if(v[i][j].style.backgroundColor=="rgb(0, 255, 255)"){
										CS.toeditable(v[i][j]);
									}else if(v[i][j].style.backgroundColor!="rgb(255, 255, 0)"){
										if(selectedflg){
											CS.selectedobjs=[];
											v[i][j].offsetParent.focuseiti = v[i][j].id;
											selectedflg=false;
										}
										CS.selectedobjs[CS.selectedobjs.length]=v[i][j];
										CS.takeStaticColor(v[i][j], "rgb(0, 255, 255)");
										v[i][j].contentEditable = "true";
										v[i][j].focus();
										v[i][j].contentEditable = "false";
									}
								}
							} else {
								//if (v[i][j].contentEditable != "true") {
									CS.setFFFFFF(v[i][j]);
									CS.toNoedit(v[i][j]);
									CS.othermethod1(v[i][j]);
									if (typeof v[i][j].sobj != "undefined") {
										v[i][j].createflg = false;
										CS.disableSelection(v[i][j]);
									}
								//}
							}
						}
					}
				}
				//e.currentTarget.offsetParent.onpaste=function(e){alert(11)};
				if(e.currentTarget.viewId=="baseline"){
					//CS.disableSelection(e.currentTarget);
				}else{
					CS.disableSelection(e.currentTarget.offsetParent);
				}
				//CS.openSelection(e.currentTarget.offsetParent);
				//e.currentTarget.click();
			} else {
				for (var i = 0; i < v.length; i++) {
					for (var j = 0; j < v[i].length; j++) {
						if (CS.isNotNull(v[i][j]) && CS.colored(v[i][j].style.backgroundColor, 0) && v[i][j].editflg != false) {
							if (minx <= CS.toI(v[i][j].style.left) + CS.toI(v[i][j].style.width) && maxx >= CS.toI(v[i][j].style.left)
								&& miny <= CS.toI(v[i][j].style.top) + CS.toI(v[i][j].style.height) && maxy >= CS.toI(v[i][j].style.top)) {
								//if (v[i][j].contentEditable == "true") {
								//	v[i][j].contentEditable = "false";
								//}
								if(v[i][j].showmenueflg!=false){
									if(v[i][j].contentEditable == "true"){
										o.vv=v[i][j];
									}
									CS.toNoedit(v[i][j]);
									oldcolor = v[i][j].style.backgroundColor.toString();
									if(selectedflg){
										CS.selectedobjs=[];
										selectedflg=false;
									}
									CS.selectedobjs[CS.selectedobjs.length]=v[i][j];
									CS.takeStaticColor(v[i][j], "rgb(0, 255, 255)");
									v[i][j].contentEditable = "true";
									v[i][j].focus();
									v[i][j].contentEditable = "false";
									v[i][j].mtselected = true;
									CS.othermethod1(v[i][j]);
									math++;
									if (math == 1) {
										mi = i;
										mj = j;
									}
								}
							} else {
								if (v[i][j].contentEditable != "true") {
									CS.setFFFFFF(v[i][j]);
									v[i][j].mtselected = false;
									CS.toNoedit(v[i][j]);
									CS.othermethod1(v[i][j]);
									if (typeof v[i][j].sobj != "undefined") {
										v[i][j].createflg = false;
										CS.disableSelection(v[i][j]);
									}
								}else{
									CS.setFFFFFF(v[i][j]);
									v[i][j].mtselected = false;
									CS.toNoedit(v[i][j]);
									CS.othermethod1(v[i][j]);
									if (typeof v[i][j].sobj != "undefined") {
										v[i][j].createflg = false;
										CS.disableSelection(v[i][j]);
									}
								}
							}
						} else if (CS.isNotNull(v[i][j]) && CS.usecolored(v[i][j].style.backgroundColor, 1)) {
							if (minx <= CS.toI(v[i][j].style.left) + CS.toI(v[i][j].style.width) && maxx >= CS.toI(v[i][j].style.left)
								&& miny <= CS.toI(v[i][j].style.top) + CS.toI(v[i][j].style.height) && maxy >= CS.toI(v[i][j].style.top)) {
								v[i][j].mtselected = true;
							} else {
								v[i][j].mtselected = false;
							}
						}
					}
				}
				//e.currentTarget.offsetParent.onpaste=function(e){alert(11)};
				if(e.currentTarget.viewId=="baseline"){
					//CS.disableSelection(e.currentTarget);
				}else{
					CS.disableSelection(e.currentTarget.offsetParent);
				}
				CS.currentTarget_sentakudiv=e.currentTarget.sentakudiv;
				setTimeout(function(e){CS.currentTarget_sentakudiv.style.display = "none";CS.currentTarget_sentakudiv=null;},100);
				//CS.openSelection(e.currentTarget.offsetParent);
				//e.currentTarget.click();
			}
		};
		o.onmousemove = function(e) {
			if (e.which != 1) {
				return;
			}
			var minx = CS.toI(e.currentTarget.sentakudiv.style.left);
			var miny = CS.toI(e.currentTarget.sentakudiv.style.top);
			var v = e.currentTarget;
			v = v.cl;
			for (var i = 0; i < v.length; i++) {
				for (var j = 0; j < v[i].length; j++) {
					if (CS.isNotNull(v[i][j]) && minx >= CS.toI(v[i][j].style.left) && minx <= CS.toI(v[i][j].style.left) + CS.toI(v[i][j].style.width)
									&& miny >= CS.toI(v[i][j].style.top) && miny <= + CS.toI(v[i][j].style.height)+CS.toI(v[i][j].style.top)) {
						if(v[i][j].style.backgroundColor=="rgb(255, 255, 0)" || v[i][j].style.backgroundColor=="yello"){
							e.currentTarget.sentakudiv.style.display="none";
							return true;
						}
					}
				}
			}
			e.currentTarget.sentakudiv.style.height = e.pageY - e.currentTarget.startY + "px";
			e.currentTarget.sentakudiv.style.width = e.pageX - e.currentTarget.startX + "px";
			//CS.disableSelection(e.currentTarget.offsetParent);
		};
		o.onpaste = function(e) {
			if (o.copyforexcelflg) {
				o.copyforexcelflg = false;
				return;
			}
			var data = null;
			if (typeof window.clipboardData != "undefined") {
				data = window.clipboardData.getData('Text');
			} else {
				e.preventDefault();
				data = e.clipboardData.getData("text");
			}
			var cells = [];
			if (data != null) {
				var karidata = data.split('\n');
				var rowCnt = 5;
				for (var i = 0; i < karidata.length; i++) {
					var karidatat = karidata[i].split('\t');
					if (i == karidata.length - 1 && karidatat[0] == "") {
						break;
					}
					cells[i] = [];
					for (var j = 0; j < karidatat.length; j++) {
						//スペースを削除する
						if(CS.isNotNull(o.deletspeaceflg) && o.deletspeaceflg){
							karidatat[j]=karidatat[j].replace(/ /g,"");
							karidatat[j]=karidatat[j].replace(/　/g,"");
						}
						cells[i][j] = karidatat[j];
					}
				}
			} else {
				return;
			}
			if (cells.length == 0) {
				return;
			}
			var oo = e.currentTarget;
			// 当前、選択された位置を確認
			e.currentTarget.pastelist = [];
			var v = e.currentTarget;
			v = v.cl;
			if(CS.isNotNull(e.currentTarget.gyakuflg)&&e.currentTarget.gyakuflg==true){
				var newflg = true;
				for (var i = 0; i < v.length; i++) {
					newflg = true;
					for (var j = 0; j < v[0].length; j++) {
						if (v[i][j].style.backgroundColor == "rgb(0, 255, 255)") {
							if (newflg) {
								oo.pastelist[oo.pastelist.length] = [];
								newflg = false;
							}
							if (j >= v.length - 1) {
								newflg = true;
							}
							CS.setFFFFFF(v[i][j]);
							oo.pastelist[oo.pastelist.length - 1][oo.pastelist[oo.pastelist.length - 1].length] = v[i][j];
						}
					}
				}
				if (oo.pastelist.length == 1) {
					if (oo.pastelist[0].length == 1) {
						// 一つ枠セルだけ選択した場合
						// データを入れるかを判断するフラグ
						var instflg = false;
						var ii = 0;
						var ij = -1;
						var starti = 0;
						var startj = 0
						for (var i = 0; i < v.length; i++) {
							if (instflg) {
								ii++;
								ij = -1;
							}
							for (var j = 0; j < v[0].length; j++) {
								if (v[i][j].id == oo.pastelist[0][0].id) {
									starti = i + 0;
									startj = j + 0;
									v[i][j].innerHTML = cells[ii][++ij];
									instflg = true;
								} else if (instflg && j >= startj) {
									if (typeof cells[ii] != "undefined" && typeof cells[ii][++ij] != "undefined") {
										v[i][j].innerHTML = cells[ii][ij];
									}
								}
							}
						}
					} else {
						// 一行枠セルだけ選択した場合
						var instflg = false;
						var ii = 0;
						var ij = -1;
						var starti = 0;
						var startj = 0
						for (var i = 0; i < v.length; i++) {
							if (instflg) {
								ii++;
								ij = -1;
							}
							for (var j = 0; j < v[0].length; j++) {
								if (v[i][j].id == oo.pastelist[0][0].id) {
									starti = i + 0;
									startj = j + 0;
									v[i][j].innerHTML = cells[ii][++ij];
									instflg = true;
								} else if (instflg && j >= startj) {
									if (ij <= oo.pastelist[0].length - 1 && j - startj < oo.pastelist[0].length) {
										ij++;
										if (cells[0].length - 1 < ij) {
											ij = ij % cells[0].length;
										}
										if (typeof cells[ii] != "undefined" && typeof cells[ii][ij] != "undefined") {
											v[i][j].innerHTML = cells[ii][ij];
										}
									}
								}
							}
						}
					}
				} else {
					// 複数行枠セルだけ選択した場合
					var instflg = false;
					var ii = 0;
					var ij = 0;
					for (var i = 0; i < oo.pastelist.length; i++) {
						for (var j = 0; j < oo.pastelist[i].length; j++) {
							ii = i % cells.length;
							ij = j % cells[ii].length;
							oo.pastelist[i][j].innerHTML = cells[ii][ij];
						}
					}
				}
				
			}else{
				var newflg = true;
				for (var i = 0; i < v[0].length; i++) {
					newflg = true;
					for (var j = 0; j < v.length; j++) {
						if (v[j][i].style.backgroundColor == "rgb(0, 255, 255)") {
							if (newflg) {
								oo.pastelist[oo.pastelist.length] = [];
								newflg = false;
							}
							if (j >= v.length - 1) {
								newflg = true;
							}
							CS.setFFFFFF(v[j][i]);
							oo.pastelist[oo.pastelist.length - 1][oo.pastelist[oo.pastelist.length - 1].length] = v[j][i];
						}
					}
				}
				if (oo.pastelist.length == 1) {
					if (oo.pastelist[0].length == 1) {
						// 一つ枠セルだけ選択した場合
						// データを入れるかを判断するフラグ
						var instflg = false;
						var ii = 0;
						var ij = -1;
						var starti = 0;
						var startj = 0
						for (var i = 0; i < v[0].length; i++) {
							if (instflg) {
								ii++;
								ij = -1;
							}
							for (var j = 0; j < v.length; j++) {
								if (v[j][i].id == oo.pastelist[0][0].id) {
									starti = i + 0;
									startj = j + 0;
									v[j][i].innerHTML = cells[ii][++ij];
									instflg = true;
								} else if (instflg && j >= startj) {
									if (typeof cells[ii] != "undefined" && typeof cells[ii][++ij] != "undefined") {
										v[j][i].innerHTML = cells[ii][ij];
									}
								}
							}
						}
					} else {
						// 一行枠セルだけ選択した場合
						var instflg = false;
						var ii = 0;
						var ij = -1;
						var starti = 0;
						var startj = 0
						for (var i = 0; i < v[0].length; i++) {
							if (instflg) {
								ii++;
								ij = -1;
							}
							for (var j = 0; j < v.length; j++) {
								if (v[j][i].id == oo.pastelist[0][0].id) {
									starti = i + 0;
									startj = j + 0;
									v[j][i].innerHTML = cells[ii][++ij];
									instflg = true;
								} else if (instflg && j >= startj) {
									if (ij <= oo.pastelist[0].length - 1 && j - startj < oo.pastelist[0].length) {
										ij++;
										if (cells[0].length - 1 < ij) {
											ij = ij % cells[0].length;
										}
										if (typeof cells[ii] != "undefined" && typeof cells[ii][ij] != "undefined") {
											v[j][i].innerHTML = cells[ii][ij];
										}
									}
								}
							}
						}
					}
				} else {
					// 複数行枠セルだけ選択した場合
					var instflg = false;
					var ii = 0;
					var ij = 0;
					for (var i = 0; i < oo.pastelist.length; i++) {
						for (var j = 0; j < oo.pastelist[i].length; j++) {
							ii = i % cells.length;
							ij = j % cells[ii].length;
							oo.pastelist[i][j].innerHTML = cells[ii][ij];
						}
					}
				}
			}
			var openpasteflg = function() {
				oo.pasteflg = false;
			}
			// e.currentTarget.offsetParent.style.display="none";
			setTimeout(openpasteflg, 200);
			return false;
		};
		if (typeof o.copytextObj != "undefined") {
			o.copytextObj.onkeydown = function(e) {
				return;
			};
		}

	}
// ダブルクリックするとフォーカスさせる
CS.setfocuseven =
	function(o) {
		CS.disableSelection(o);
		CS.focuseven_down =
			function(e) {
				e.currentTarget.oldinnerHTML=e.currentTarget.innerHTML;
				if (e.which != 1) {
					document.oncontextmenu = function(e) {
						return false;
					}
					var te = function() {
						document.oncontextmenu = function(e) {
							return true;
						}
					}
					if (typeof e.currentTarget.offsetParent.menue.sub[1] != "undefined" && e.currentTarget.offsetParent.menue.sub[1].innerHTML == "貼る") {
						if (e.currentTarget.offsetParent.codelist.length == 0) {
							e.currentTarget.offsetParent.menue.sub[1].style.color = "DarkGray";
						} else {
							e.currentTarget.offsetParent.menue.sub[1].style.color = "black";
						}
					}
					var obj = e.currentTarget.offsetParent;
					var x = obj.offsetLeft, y = obj.offsetTop;
					while (obj = obj.offsetParent) {
						x += CS.toI(obj.offsetLeft);
						y += CS.toI(obj.offsetTop);
					}
					var my = e.pageY + e.currentTarget.offsetParent.scrollTop - y;
					var mx = e.pageX + e.currentTarget.offsetParent.scrollLeft - x;
					e.currentTarget.offsetParent.menue.style.top = my + "px";
					e.currentTarget.offsetParent.menue.style.left = mx + "px";
					
					if(e.currentTarget.marubatuflag==false){
						var marubatuflag=false;
						for (var i = 0; i < e.currentTarget.offsetParent.menue.sub.length; i++) {
							if(e.currentTarget.offsetParent.menue.sub[i].innerHTML=="　○" || e.currentTarget.offsetParent.menue.sub[i].innerHTML=="　×"){
								e.currentTarget.offsetParent.menue.sub[i].style.display="none";
								marubatuflag=true;
							}
						}
						if(marubatuflag){
							e.currentTarget.offsetParent.menue.style.height=CS.toI(e.currentTarget.offsetParent.menue.style.height)-44+"px";
						}
					}else if(e.currentTarget.marubatuflag==true){
						var marubatuflag=false;
						for (var i = 0; i < e.currentTarget.offsetParent.menue.sub.length; i++) {
							if(e.currentTarget.offsetParent.menue.sub[i].innerHTML=="　○" || e.currentTarget.offsetParent.menue.sub[i].innerHTML=="　×"){
								e.currentTarget.offsetParent.menue.sub[i].style.display="";
								marubatuflag=true;
							}
						}
						if(marubatuflag){
							e.currentTarget.offsetParent.menue.style.height=CS.toI(e.currentTarget.offsetParent.menue.style.height)+44+"px";
						}
					}
					// if(e.currentTarget.marubatuflag==true){	
					// }else if(e.currentTarget.marubatuflag==false){
					// }
					// もし、右クリックしたところはすでに選択されていないだったら、選択されている状態にする
					if (e.currentTarget.style.backgroundColor != "rgb(0, 255, 255)" && e.currentTarget.mtselected!=true) {
						var v = e.currentTarget.offsetParent;
						v = v.cl;
						for (var i = 0; i < v.length; i++) {
							for (var j = 0; j < v[i].length; j++) {
								if (CS.colored(v[i][j].style.backgroundColor, 0) && v[i][j].editflg != false) {
									if (CS.toI(v[i][j].style.top) < my && CS.toI(v[i][j].style.left) < mx && CS.toI(v[i][j].style.top) + CS.toI(v[i][j].style.height) > my
										&& CS.toI(v[i][j].style.left) + CS.toI(v[i][j].style.width) > mx) {
										if(e.currentTarget.showmenueflg!=false){
											CS.takeStaticColor(v[i][j], "rgb(0, 255, 255)");
											v[i][j].mtselected = true;
										}
									} else {
										CS.setFFFFFF(v[i][j]);
										v[i][j].mtselected = false;
										CS.toNoedit(v[i][j]);
										CS.othermethod1(v[i][j]);
										v[i][j].onmousedown = CS.focuseven_down;
										v[i][j].contentEditable = "false";
									}
								} else if (CS.usecolored(v[i][j].style.backgroundColor, 1)) {
									if (CS.toI(v[i][j].style.top) < my && CS.toI(v[i][j].style.left) < mx && CS.toI(v[i][j].style.top) + CS.toI(v[i][j].style.height) > my
										&& CS.toI(v[i][j].style.left) + CS.toI(v[i][j].style.width) > mx) {
										v[i][j].mtselected = true;
									} else {
										v[i][j].mtselected = false;
									}
								}
							}
						}
					}
					if(e.currentTarget.showmenueflg!=false){
						var check_v=e.currentTarget.offsetParent.cl;
						if(!CS.isNotNull(check_v) || CS.isNotNull(e.currentTarget.offsetParent.tokubetuShowMenuflg)){
							e.currentTarget.offsetParent.menue.style.display = "";
						}else{
							var check_v_okflg=false;
							for (var i = 0; i < check_v.length; i++) {
								for (var j = 0; j < check_v[i].length; j++) {
									if (check_v[i][j].style.backgroundColor == "rgb(0, 255, 255)") {
										check_v_okflg=true;
										break;
									}
								}
								if(check_v_okflg){break;}
							}
							if(check_v_okflg){
								e.currentTarget.offsetParent.menue.style.display = "";
							}else{
								e.currentTarget.offsetParent.menue.style.display = "none";
							}
						}
					}
					setTimeout(te, 300);
					return false;
				}
			};
		o.onmousedown = CS.focuseven_down;
		if (o.editevendflg != false) {
			o.onclick = function(e) {
				if (e.which != 1) {
					return false;
				}
				if(CS.isNotNull(o.commonclickmethodflg)){
					e.currentTarget.offsetParent.commonclickmethod[0](e);
				}
				if (e.currentTarget.style.backgroundColor == "rgb(255, 255, 0)") {
					e.currentTarget.offsetParent.menue.style.display = "none";
					if (CS.colored(e.currentTarget.style.backgroundColor, 1) && e.currentTarget.editflg != true) {
						return;
					}
					var v = e.currentTarget.offsetParent;
					v = v.cl;
					for (var i = 0; i < v.length; i++) {
						for (var j = 0; j < v[i].length; j++) {
							if (CS.colored(v[i][j].style.backgroundColor, 0) && v[i][j].editflg != false && v[i][j].id != e.currentTarget.id) {
								v[i][j].contentEditable = "false";
								CS.setFFFFFF(v[i][j]);
								CS.toNoedit(v[i][j]);
								v[i][j].onmousedown = CS.focuseven_down;
								if (typeof v[i][j].sobj != "undefined") {
									v[i][j].createflg = false;
									CS.disableSelection(v[i][j]);
								}
								CS.othermethod1(v[i][j]);
							}
						}
					}
					CS.toeditable(e.currentTarget);
				} else if (e.currentTarget.style.backgroundColor == "rgb(0, 255, 255)"){
					return;
					e.currentTarget.offsetParent.menue.style.display = "none";
					if (CS.colored(e.currentTarget.style.backgroundColor, 1) && e.currentTarget.editflg != true) {
						return;
					}
					var v = e.currentTarget.offsetParent;
					v = v.cl;
					for (var i = 0; i < v.length; i++) {
						for (var j = 0; j < v[i].length; j++) {
							if (CS.colored(v[i][j].style.backgroundColor, 0) && v[i][j].editflg != false && v[i][j].id != e.currentTarget.id) {
								v[i][j].contentEditable = "false";
								CS.setFFFFFF(v[i][j]);
								v[i][j].mtselected = false;
								CS.toNoedit(v[i][j]);
								v[i][j].onmousedown = CS.focuseven_down;
								if (typeof v[i][j].sobj != "undefined") {
									v[i][j].createflg = false;
									CS.disableSelection(v[i][j]);
								}
								CS.othermethod1(v[i][j]);
							}
						}
					}
					CS.toeditable(e.currentTarget);
					CS.toNoedit(e.currentTarget);
					CS.takeStaticColor(e.currentTarget, "rgb(0, 255, 255)");
					e.currentTarget.mtselected = true;
					e.currentTarget.focus();
				}

			}
		}

		// 背景がシルバーじゃないオブジェクトを編集可能に
		CS.toeditable = function(o) {
			if (CS.colored(o.style.backgroundColor, 0) && o.editflg != false && o.inputflg != false ) {
				if (typeof o.select != "undefined") {
					if (typeof o.createflg != "undefined" && o.createflg) {
						return;
					}
					if (typeof o.innerHTML != "undefined") {
						o.oldvalue = o.innerHTML + "";
					} else {
						o.oldvalue = "";
					}
					o.sobj = document.createElement("select");
					o.sobj.style.width = "100%";
					o.sobj.style.height = "22px";
					o.sobj.style.display = "block";
					o.sobj.style.margin = "0";
					o.sobj.style.position = "inherit";
					o.sobj.options[0] = new Option('○', '○');
					o.sobj.options[1] = new Option('×', '×');
					// o.sobj.innerHTML="<option value=\"○\">○</option><option
					// value=\"×\">×</option>";
					o.sobj.sum = 0;
					o.createflg = true;
					o.sobj.onclick = function(e) {
						if (e.currentTarget.sum == 0) {
							e.currentTarget.sum++;
							return;
						} else {
							CS.removeChild_obj(e.currentTarget.offsetParent, e.currentTarget.value);
						}
					}
					o.innerHTML = "";
					o.appendChild(o.sobj);
					o.sobj.focus();
				}
				if (typeof o.select1 != "undefined") {
					if (typeof o.createflg != "undefined" && o.createflg) {
						return;
					}
					if (typeof o.innerHTML != "undefined") {
						o.oldvalue = o.innerHTML + "";
					} else {
						o.oldvalue = "";
					}
					o.sobj = document.createElement("select");
					o.sobj.style.width = "100%";
					o.sobj.style.height = "22px";
					o.sobj.style.display = "block";
					o.sobj.style.margin = "0";
					o.sobj.style.position = "inherit";
					for (var ossp = 0; ossp < o.options.length; ossp++) {
						o.sobj.options[ossp] = new Option(o.options[ossp], o.options[ossp]);
					}
					// o.sobj.innerHTML="<option value=\"○\">○</option><option
					// value=\"×\">×</option>";
					o.sobj.sum = 0;
					o.createflg = true;
					o.sobj.onclick = function(e) {
						if (e.currentTarget.sum == 0) {
							e.currentTarget.sum++;
							return;
						} else {
							CS.removeChild_obj(e.currentTarget.offsetParent, e.currentTarget.value);
						}
					}
					o.innerHTML = "";
					o.appendChild(o.sobj);
					o.sobj.focus();
				} else {
					CS.numbereven(o);
					o.contentEditable = "true";
					o.focus();
				}
				if (typeof o.offsetParent != "undefined" && o.offsetParent != null) {
					CS.selectedobjs=[];
					CS.selectedobjs[CS.selectedobjs.length]=o;
					o.offsetParent.focuseiti = o.id;
					CS.openSelection(o);
					o.style.backgroundColor = "rgb(255, 255, 0)";
				}
			}
		}
		CS.toNoedit = function(o) {
			if (typeof o.sobj != "undefined") {
				CS.removeChild(o, o.oldvalue);
			}
			CS.othermethod1(o);
			CS.disableSelection(o);
			o.onmousedown = CS.focuseven_down;
			CS.setFFFFFF(o);
			o.contentEditable = "false";
		}
		o.onpaste = function(e) {
			e.currentTarget.offsetParent.copyforexcelflg = true;
			if (e.currentTarget.style.backgroundColor == "rgb(255, 255, 0)") {
				return true;
			} else {
				var data = null;
				if (typeof window.clipboardData != "undefined") {
					data = window.clipboardData.getData('Text');
				} else {
					e.preventDefault();
					data = e.clipboardData.getData("text");
				}
				var cells = [];
				if (data != null) {
					var karidata = data.split('\n');
					var rowCnt = 5;
					for (var i = 0; i < karidata.length; i++) {
						var karidatat = karidata[i].split('\t');
						if (i == karidata.length - 1 && karidatat[0] == "") {
							break;
						}
						cells[i] = [];
						for (var j = 0; j < karidatat.length; j++) {
							cells[i][j] = karidatat[j];
						}
					}
				} else {
					return;
				}
				if (cells.length == 0) {
					return;
				}
				var oo = e.currentTarget.offsetParent;
				// 当前、選択された位置を確認
				e.currentTarget.offsetParent.pastelist = [];
				var v = e.currentTarget.offsetParent;
				v = v.cl;
				if(CS.isNotNull(e.currentTarget.gyakuflg)&&e.currentTarget.gyakuflg==true){
					var newflg = true;
					for (var i = 0; i < v.length; i++) {
						newflg = true;
						for (var j = 0; j < v[0].length; j++) {
							if (v[i][j].style.backgroundColor == "rgb(0, 255, 255)") {
								if (newflg) {
									oo.pastelist[oo.pastelist.length] = [];
									newflg = false;
								}
								if (j >= v.length - 1) {
									newflg = true;
								}
								CS.setFFFFFF(v[i][j]);
								oo.pastelist[oo.pastelist.length - 1][oo.pastelist[oo.pastelist.length - 1].length] = v[i][j];
							}
						}
					}
					if (oo.pastelist.length == 1) {
						if (oo.pastelist[0].length == 1) {
							// 一つ枠セルだけ選択した場合
							// データを入れるかを判断するフラグ
							var instflg = false;
							var ii = 0;
							var ij = -1;
							var starti = 0;
							var startj = 0
							for (var i = 0; i < v.length; i++) {
								if (instflg) {
									ii++;
									ij = -1;
								}
								for (var j = 0; j < v[0].length; j++) {
									if (v[i][j].id == oo.pastelist[0][0].id) {
										starti = i + 0;
										startj = j + 0;
										v[i][j].innerHTML = cells[ii][++ij];
										instflg = true;
									} else if (instflg && j >= startj) {
										if (typeof cells[ii] != "undefined" && typeof cells[ii][++ij] != "undefined") {
											v[i][j].innerHTML = cells[ii][ij];
										}
									}
								}
							}
						} else {
							// 一行枠セルだけ選択した場合
							var instflg = false;
							var ii = 0;
							var ij = -1;
							var starti = 0;
							var startj = 0
							for (var i = 0; i < v.length; i++) {
								if (instflg) {
									ii++;
									ij = -1;
								}
								for (var j = 0; j < v[0].length; j++) {
									if (v[i][j].id == oo.pastelist[0][0].id) {
										starti = i + 0;
										startj = j + 0;
										v[i][j].innerHTML = cells[ii][++ij];
										instflg = true;
									} else if (instflg && j >= startj) {
										if (ij <= oo.pastelist[0].length - 1 && j - startj < oo.pastelist[0].length) {
											ij++;
											if (cells[0].length - 1 < ij) {
												ij = ij % cells[0].length;
											}
											if (typeof cells[ii] != "undefined" && typeof cells[ii][ij] != "undefined") {
												v[i][j].innerHTML = cells[ii][ij];
											}
										}
									}
								}
							}
						}
					} else {
						// 複数行枠セルだけ選択した場合
						var instflg = false;
						var ii = 0;
						var ij = 0;
						for (var i = 0; i < oo.pastelist.length; i++) {
							for (var j = 0; j < oo.pastelist[i].length; j++) {
								ii = i % cells.length;
								ij = j % cells[ii].length;
								oo.pastelist[i][j].innerHTML = cells[ii][ij];
							}
						}
					}
					
				}else{
					var newflg = true;
					for (var i = 0; i < v[0].length; i++) {
						newflg = true;
						for (var j = 0; j < v.length; j++) {
							if (v[j][i].style.backgroundColor == "rgb(0, 255, 255)") {
								if (newflg) {
									oo.pastelist[oo.pastelist.length] = [];
									newflg = false;
								}
								if (j >= v.length - 1) {
									newflg = true;
								}
								CS.setFFFFFF(v[j][i]);
								oo.pastelist[oo.pastelist.length - 1][oo.pastelist[oo.pastelist.length - 1].length] = v[j][i];
							}
						}
					}
					if (oo.pastelist.length == 1) {
						if (oo.pastelist[0].length == 1) {
							// 一つ枠セルだけ選択した場合
							// データを入れるかを判断するフラグ
							var instflg = false;
							var ii = 0;
							var ij = -1;
							var starti = 0;
							var startj = 0;
							if (e.currentTarget.offsetParent.gamenidx=="loadinput"
								|| e.currentTarget.offsetParent.gamenidx=="loadbatchinput") {
								var idlst = oo.pastelist[0][0].id.split("_");		//"PN_cl_"+i+"_"+j
								for (var i = 0; i < cells.length; i++) {
									for (var j = 0; j < cells[i].length; j++) {
										if (CS.isNotNull(v[CS.toI(idlst[2])+i]) 
											&& CS.isNotNull(v[CS.toI(idlst[2])+i][CS.toI(idlst[3])+j]) 
											&& (v[CS.toI(idlst[2])+i][CS.toI(idlst[3])+j].style.backgroundColor != 'silver' 
												&& v[CS.toI(idlst[2])+i][CS.toI(idlst[3])+j].style.backgroundColor != 'black')) {
											v[CS.toI(idlst[2])+i][CS.toI(idlst[3])+j].innerHTML = cells[i][j];
										}
									}
								}
							} else {
								for (var i = 0; i < v[0].length; i++) {
									if (instflg) {
										ii++;
										ij = -1;
									}
									for (var j = 0; j < v.length; j++) {
										if (v[j][i].id == oo.pastelist[0][0].id) {
											starti = i + 0;
											startj = j + 0;
											v[j][i].innerHTML = cells[ii][++ij];
											instflg = true;
										} else if (instflg && j >= startj) {
											if (typeof cells[ii] != "undefined" && typeof cells[ii][++ij] != "undefined") {
												v[j][i].innerHTML = cells[ii][ij];
											}
										}
									}
								}
							}
						} else {
							// 一行枠セルだけ選択した場合
							var instflg = false;
							var ii = 0;
							var ij = -1;
							var starti = 0;
							var startj = 0;
							if(e.currentTarget.offsetParent.gamenidx=="loadinput"
								||e.currentTarget.offsetParent.gamenidx=="loadbatchinput") {
								for (var i = 0; i < oo.pastelist.length; i++) {
									for (var j = 0; j < oo.pastelist[i].length; j++) {
										ii = j % cells.length;
										ij = i % cells[ii].length;
										if (CS.isNotNull(cells[ii]) && CS.isNotNull(cells[ii][ij]) 
											&& (oo.pastelist[i][j].style.backgroundColor != 'silver' && oo.pastelist[i][j].style.backgroundColor != 'black')) {
											oo.pastelist[i][j].innerHTML = cells[ii][ij];	
										}
	
									}
								}
							} else {
								for (var i = 0; i < v[0].length; i++) {
									if (instflg) {
										ii++;
										ij = -1;
									}
									for (var j = 0; j < v.length; j++) {
										if (v[j][i].id == oo.pastelist[0][0].id) {
											starti = i + 0;
											startj = j + 0;
											v[j][i].innerHTML = cells[ii][++ij];
											instflg = true;
										} else if (instflg && j >= startj) {
											if (ij <= oo.pastelist[0].length - 1 && j - startj < oo.pastelist[0].length) {
												ij++;
												if (cells[0].length - 1 < ij) {
													ij = ij % cells[0].length;
												}
												if (typeof cells[ii] != "undefined" && typeof cells[ii][ij] != "undefined") {
													v[j][i].innerHTML = cells[ii][ij];
												}
											}
										}
									}
								}
							}
						}
					} else {
						// 複数行枠セルだけ選択した場合
						var instflg = false;
						var ii = 0;
						var ij = 0;
						if(e.currentTarget.offsetParent.gamenidx=="loadinput"
							||e.currentTarget.offsetParent.gamenidx=="loadbatchinput") {
							for (var i = 0; i < oo.pastelist.length; i++) {
								for (var j = 0; j < oo.pastelist[i].length; j++) {
									ii = j % cells.length;
									ij = i % cells[ii].length;
									if (CS.isNotNull(cells[ii]) && CS.isNotNull(cells[ii][ij]) 
										&& (oo.pastelist[i][j].style.backgroundColor != 'silver' && oo.pastelist[i][j].style.backgroundColor != 'black')) {
										oo.pastelist[i][j].innerHTML = cells[ii][ij];	
									}

								}
							}
						}else{
							for (var i = 0; i < oo.pastelist.length; i++) {
								for (var j = 0; j < oo.pastelist[i].length; j++) {
									ii = i % cells.length;
									ij = j % cells[ii].length;
									oo.pastelist[i][j].innerHTML = cells[ii][ij];
								}
							}
						}
					}
				}
				var openpasteflg = function() {
					oo.pasteflg = false;
				}
				// e.currentTarget.offsetParent.style.display="none";
				setTimeout(openpasteflg, 200);
				return false;
			}
		}
		o.onkeydown = CS.clBtnMoveCtl;
	}
CS.clBtnMoveCtl = function(e) {
	var ect=e.currentTarget;
	if(CS.isNotNull(e.currentTarget.maxfontsize)){
		if(isNaN(parseFloat(e.currentTarget.innerHTML))||parseFloat(e.currentTarget.innerHTML)>=99999){
			return true;
		}
	}
	var isCtrlDown = false;
	if (e.metaKey) { // mac
		isCtrlDown = true;
	} else if (e.ctrlKey && navigator.userAgent.indexOf('Mac') === -1) { // pc
		isCtrlDown = true;
	}

	if (isCtrlDown) {
		if(CS.isNotNull(e.currentTarget.offsetParent)&&CS.isNotNull(e.currentTarget.offsetParent.copytextObj)){
			e.currentTarget.offsetParent.copytextObj.style.display = "";
			e.currentTarget.offsetParent.copytextObj.select();
			return true;;
		}else{
			return false;
		}
	}
	if (e.keyCode == 38) {
		if (typeof e.currentTarget.kobetufunction2 != "undefined") {
			// ↑ボタンを押したときに実行するイベント
			e.currentTarget.kobetufunction2(e.currentTarget);
		}
		var focuseiti = e.currentTarget.offsetParent.focuseiti;
		list = focuseiti.split("_");
		if(CS.isNotNull(e.currentTarget.offsetParent.gyakuflg)&&e.currentTarget.offsetParent.gyakuflg==true){
			var complet=true;
			//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
			if (CS.isNotNull(e.currentTarget.offsetParent.cl[CS.toI(list[2] - 1)])
				&& CS.isNotNull(e.currentTarget.offsetParent.cl[CS.toI(list[2] - 1)][CS.toI(list[3])])) {
				for (var i = CS.toI(list[2]) - 1; i > -1; i--) {
					if (CS.colored(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[i][CS.toI(list[3])].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])]);
						CS.to_select(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])]);
						CS.to_select_flg=true;
						complet=false;
						break;
					}
				}
			}
			if(complet){
				var ect=e.currentTarget;
				if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3])-1])){
					var next=true;
					for(var j=CS.toI(list[3])-1;j>-1;j--){
						if(next){
							for (var i = ect.offsetParent.cl.length-1; i > 0; i--) {
								if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[i][j]);
									CS.to_select_flg=true;
									next=false;
									break;
								}
							}
						}else{break;}
					}
				}
			}
		}else{
			var complet=true;
			if (CS.isNotNull(e.currentTarget.offsetParent.cl[CS.toI(list[2])])
				&& CS.isNotNull(e.currentTarget.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) - 1])) {
				for (var i = CS.toI(list[3]) - 1; i > -1; i--) {
					if (CS.colored(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].editflg != false
						&& e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select_flg=true;
						complet=false;
						break
					}
				}
			}
			if(complet){
				if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])-1][0])){
					var next=true;
					for(var j=CS.toI(list[2])-1;j>-1;j--){
						if(next){
							for (var i = ect.offsetParent.cl[j].length-1; i > -1; i--) {
								if (CS.colored(ect.offsetParent.cl[j][i].style.backgroundColor, 0) && ect.offsetParent.clcl[j][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[j][i]);
									CS.to_select_flg=true;
									next=false;
									break;
								}
							}
						}else{break;}
					}
				}
			}
		}
		return false;
	} else if (e.keyCode == 40) {
		if (typeof e.currentTarget.kobetufunction3 != "undefined") {
			// ↓ボタンを押したときに実行するイベント
			e.currentTarget.kobetufunction3(e.currentTarget);
		}
		var focuseiti = e.currentTarget.offsetParent.focuseiti;
		list = focuseiti.split("_");
		if(CS.isNotNull(e.currentTarget.offsetParent.gyakuflg)&&e.currentTarget.offsetParent.gyakuflg==true){
			var complet=true;
			//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
			if (typeof e.currentTarget.offsetParent.cl[CS.toI(list[2]) + 1] != "undefined" && typeof e.currentTarget.offsetParent.cl[CS.toI(list[2]) + 1][CS.toI(list[3])] != "undefined") {
				for (var i = CS.toI(list[2]) + 1; i < e.currentTarget.offsetParent.cl.length; i++) {
					if (CS.colored(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[i][CS.toI(list[3])].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])]);
						CS.to_select(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])]);
						CS.to_select_flg=true;
						complet=false;
						break;
					}
				}
			}
			if(complet){
				var ect=e.currentTarget;
				if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3])+1])){
					var next=true;
					for(var j=CS.toI(list[3])+1;j<ect.offsetParent.cl[0].length;j++){
						if(next){
							for (var i = 0; i < ect.offsetParent.cl.length; i++) {
								if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[i][j]);
									CS.to_select_flg=true;
									next=false;
									break;
								}
							}
						}else{break;}
					}
				}
			}
		}else{
			var complet=true;
			if (typeof e.currentTarget.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) + 1] != "undefined") {
				for (var i = CS.toI(list[3]) + 1; i < e.currentTarget.offsetParent.cl[CS.toI(list[2])].length; i++) {
					if (CS.colored(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select_flg=true;
						complet=false;
						break;
					}
				}
			}
			if(complet){
				if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])+1][0])){
					var next=true;
					for(var j=CS.toI(list[2])+1;j<ect.offsetParent.cl.length;j++){
						if(next){
							for (var i = 0; i < ect.offsetParent.cl[j].length; i++) {
								if (CS.colored(ect.offsetParent.cl[j][i].style.backgroundColor, 0) && ect.offsetParent.clcl[j][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[j][i]);
									CS.to_select_flg=true;
									next=false;
									break;
								}
							}
						}else{break;}
					}
				}
			}
		}
		return false;
	} else if (e.keyCode == 39) {
		if (typeof e.currentTarget.kobetufunction4 != "undefined") {
			// →ボタンを押したときに実行するイベント
			e.currentTarget.kobetufunction4(e.currentTarget);
		}		
		var focuseiti = e.currentTarget.offsetParent.focuseiti;
		list = focuseiti.split("_");
		if(CS.isNotNull(e.currentTarget.offsetParent.gyakuflg)&&e.currentTarget.offsetParent.gyakuflg==true){
			//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
			if (typeof e.currentTarget.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) + 1] != "undefined") {
				for (var i = CS.toI(list[3]) + 1; i < e.currentTarget.offsetParent.cl[CS.toI(list[2])].length; i++) {
					if (CS.colored(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select_flg=true;
						break;
					}
				}
			}
		}else{
			if (typeof e.currentTarget.offsetParent.cl[CS.toI(list[2]) + 1] != "undefined" && typeof e.currentTarget.offsetParent.cl[CS.toI(list[2]) + 1][CS.toI(list[3])] != "undefined") {
				for (var i = CS.toI(list[2]) + 1; i < e.currentTarget.offsetParent.cl.length; i++) {
					if (CS.colored(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[i][CS.toI(list[3])].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])]);
						CS.to_select(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])]);
						CS.to_select_flg=true;
						break;
					}
				}
			}	
		}
		return false;
	} else if (e.keyCode == 37) {
		if (typeof e.currentTarget.kobetufunction5 != "undefined") {
			// ←ボタンを押したときに実行するイベント
			e.currentTarget.kobetufunction5(e.currentTarget);
		}
		var focuseiti = e.currentTarget.offsetParent.focuseiti;
		list = focuseiti.split("_");
		if(CS.isNotNull(e.currentTarget.offsetParent.gyakuflg)&&e.currentTarget.offsetParent.gyakuflg==true){
			//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
			if (typeof e.currentTarget.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) - 1] != "undefined") {
				for (var i = CS.toI(list[3]) - 1; i > -1; i--) {
					if (CS.colored(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].editflg != false
						&& e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select_flg=true;
						break
					}
				}
			}
		}else{
			if (typeof e.currentTarget.offsetParent.cl[CS.toI(list[2] - 1)][CS.toI(list[3])] != "undefined") {
				for (var i = CS.toI(list[2]) - 1; i > -1; i--) {
					if (CS.colored(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[i][CS.toI(list[3])].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])]);
						CS.to_select(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])]);
						CS.to_select_flg=true;
						break;
					}
				}
			}	
		}
		return false;
	} else if (e.keyCode == 9) {
		// Tabボタンを押したときに実行するイベント
		var focuseiti = e.currentTarget.offsetParent.focuseiti;
		list = focuseiti.split("_");
		
		if(CS.isNotNull(e.currentTarget.offsetParent.gyakuflg)&&e.currentTarget.offsetParent.gyakuflg==true){
			//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
			if (CS.isNotNull(e.currentTarget.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) + 1])) {
				for (var i = CS.toI(list[3]) + 1; i < e.currentTarget.offsetParent.cl[CS.toI(list[2])].length; i++) {
					if (CS.colored(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select_flg=true;
						break;
					}
				}
			}else if (CS.isNotNull(e.currentTarget.offsetParent.cl[CS.toI(list[2]) + 1]) && CS.isNotNull(e.currentTarget.offsetParent.cl[CS.toI(list[2]) + 1][CS.toI(list[3])] )) {
				for (var i = 0; i < e.currentTarget.offsetParent.cl[CS.toI(list[2]) + 1].length; i++) {
					if (CS.colored(e.currentTarget.offsetParent.cl[CS.toI(list[2]) + 1][i].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[CS.toI(list[2]) + 1][i].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[CS.toI(list[2]) + 1][i]);
						CS.to_select(e.currentTarget.offsetParent.cl[CS.toI(list[2]) + 1][i]);
						CS.to_select_flg=true;
						break;
					}
				}
			}	
		}else{
			if (CS.isNotNull(e.currentTarget.offsetParent.cl[CS.toI(list[2]) + 1])) {
				if (CS.isNotNull(e.currentTarget.offsetParent.cl[CS.toI(list[2]) + 1][CS.toI(list[3])])) {
					for (var i = CS.toI(list[2]) + 1; i < e.currentTarget.offsetParent.cl.length; i++) {
						if (CS.colored(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[i][CS.toI(list[3])].editflg != false) {
							CS.toNoedit(e.currentTarget);
							//CS.toeditable(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])]);
							CS.to_select(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])]);
							CS.to_select_flg=true;
							break;
						}
					}
				}
			} else if (CS.isNotNull(e.currentTarget.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) + 1])) {
				for (var i = 0; i < e.currentTarget.offsetParent.cl.length; i++) {
					if (CS.colored(e.currentTarget.offsetParent.cl[i][CS.toI(list[3]) + 1].style.backgroundColor, 0)
						&& e.currentTarget.offsetParent.cl[i][CS.toI(list[3]) + 1].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[i][CS.toI(list[3]) + 1]);
						CS.to_select(e.currentTarget.offsetParent.cl[i][CS.toI(list[3]) + 1]);
						CS.to_select_flg=true;
						break;
					}
				}
			}
		}
		return false;
	} else if (e.keyCode == 13) {
		//CS.toNoedit(e.currentTarget);
		if (typeof e.currentTarget.kobetufunction1 != "undefined") {
			// Enterボタンを押したときに実行するイベント
			if(e.currentTarget.kobetufunction1(e.currentTarget)==false){return false;}
		}
		var focuseiti = e.currentTarget.offsetParent.focuseiti;
		list = focuseiti.split("_");
		if(CS.isNotNull(e.currentTarget.offsetParent.gyakuflg)&&e.currentTarget.offsetParent.gyakuflg==true){
			var complet=true;
			//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
			if (typeof e.currentTarget.offsetParent.cl[CS.toI(list[2]) + 1] != "undefined" && typeof e.currentTarget.offsetParent.cl[CS.toI(list[2]) + 1][CS.toI(list[3])] != "undefined") {
				for (var i = CS.toI(list[2]) + 1; i < e.currentTarget.offsetParent.cl.length; i++) {
					if (CS.colored(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[i][CS.toI(list[3])].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])]);
						CS.to_select(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])]);
						CS.to_select_flg=true;
						complet=false;
						break;
					}
				}
			}
			if(complet){
				var ect=e.currentTarget;
				if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3])+1])){
					var next=true;
					for(var j=CS.toI(list[3])+1;j<ect.offsetParent.cl[0].length;j++){
						if(next){
							for (var i = 0; i < ect.offsetParent.cl.length; i++) {
								if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[i][j]);
									CS.to_select_flg=true;
									next=false;
									break;
								}
							}
						}else{break;}
					}
				}
			}
		}else{
			var complet=true;
			if (typeof e.currentTarget.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) + 1] != "undefined") {
				for (var i = CS.toI(list[3]) + 1; i < e.currentTarget.offsetParent.cl[CS.toI(list[2])].length; i++) {
					if (CS.colored(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select_flg=true;
						complet=false;
						break;
					}
				}
			}
			if(complet){
				if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])+1][0])){
					var next=true;
					for(var j=CS.toI(list[2])+1;j<ect.offsetParent.cl.length;j++){
						if(next){
							for (var i = 0; i < ect.offsetParent.cl[j].length; i++) {
								if (CS.colored(ect.offsetParent.cl[j][i].style.backgroundColor, 0) && ect.offsetParent.clcl[j][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[j][i]);
									CS.to_select_flg=true;
									next=false;
									break;
								}
							}
						}else{break;}
					}
				}
			}
		}
		return false;
	} else if (e.keyCode == 86) {
		if (e.currentTarget.style.backgroundColor == "rgb(255, 255, 0)") {
			return true;
		} else {
			var data = null;
			if (typeof window.clipboardData != "undefined") {
				data = window.clipboardData.getData('Text');
			} else {
				e.preventDefault();
				data = e.clipboardData.getData("text");
			}
			var cells = [];
			if (data != null) {
				var karidata = data.split('\n');
				var rowCnt = 5;
				for (var i = 0; i < karidata.length; i++) {
					var karidatat = karidata[i].split('\t');
					if (i == karidata.length - 1 && karidatat[0] == "") {
						break;
					}
					cells[i] = [];
					for (var j = 0; j < karidatat.length; j++) {
						cells[i][j] = karidatat[j];
					}
				}
			} else {
				return;
			}
			if (cells.length == 0) {
				return;
			}
			var oo = e.currentTarget.offsetParent;
			// 当前、選択された位置を確認
			e.currentTarget.offsetParent.pastelist = [];
			var v = e.currentTarget.offsetParent;
			v = v.cl;
			if(CS.isNotNull(e.currentTarget.gyakuflg)&&e.currentTarget.gyakuflg==true){
				var newflg = true;
				for (var i = 0; i < v.length; i++) {
					newflg = true;
					for (var j = 0; j < v[0].length; j++) {
						if (v[i][j].style.backgroundColor == "rgb(0, 255, 255)") {
							if (newflg) {
								oo.pastelist[oo.pastelist.length] = [];
								newflg = false;
							}
							if (j >= v.length - 1) {
								newflg = true;
							}
							CS.setFFFFFF(v[i][j]);
							oo.pastelist[oo.pastelist.length - 1][oo.pastelist[oo.pastelist.length - 1].length] = v[i][j];
						}
					}
				}
				if (oo.pastelist.length == 1) {
					if (oo.pastelist[0].length == 1) {
						// 一つ枠セルだけ選択した場合
						// データを入れるかを判断するフラグ
						var instflg = false;
						var ii = 0;
						var ij = -1;
						var starti = 0;
						var startj = 0
						for (var i = 0; i < v.length; i++) {
							if (instflg) {
								ii++;
								ij = -1;
							}
							for (var j = 0; j < v[0].length; j++) {
								if (v[i][j].id == oo.pastelist[0][0].id) {
									starti = i + 0;
									startj = j + 0;
									v[i][j].innerHTML = cells[ii][++ij];
									instflg = true;
								} else if (instflg && j >= startj) {
									if (typeof cells[ii] != "undefined" && typeof cells[ii][++ij] != "undefined") {
										v[i][j].innerHTML = cells[ii][ij];
									}
								}
							}
						}
					} else {
						// 一行枠セルだけ選択した場合
						var instflg = false;
						var ii = 0;
						var ij = -1;
						var starti = 0;
						var startj = 0
						for (var i = 0; i < v.length; i++) {
							if (instflg) {
								ii++;
								ij = -1;
							}
							for (var j = 0; j < v[0].length; j++) {
								if (v[i][j].id == oo.pastelist[0][0].id) {
									starti = i + 0;
									startj = j + 0;
									v[i][j].innerHTML = cells[ii][++ij];
									instflg = true;
								} else if (instflg && j >= startj) {
									if (ij <= oo.pastelist[0].length - 1 && j - startj < oo.pastelist[0].length) {
										ij++;
										if (cells[0].length - 1 < ij) {
											ij = ij % cells[0].length;
										}
										if (typeof cells[ii] != "undefined" && typeof cells[ii][ij] != "undefined") {
											v[i][j].innerHTML = cells[ii][ij];
										}
									}
								}
							}
						}
					}
				} else {
					// 複数行枠セルだけ選択した場合
					var instflg = false;
					var ii = 0;
					var ij = 0;
					for (var i = 0; i < oo.pastelist.length; i++) {
						for (var j = 0; j < oo.pastelist[i].length; j++) {
							ii = i % cells.length;
							ij = j % cells[ii].length;
							oo.pastelist[i][j].innerHTML = cells[ii][ij];
						}
					}
				}
				
			}else{
				var newflg = true;
				for (var i = 0; i < v[0].length; i++) {
					newflg = true;
					for (var j = 0; j < v.length; j++) {
						if (v[j][i].style.backgroundColor == "rgb(0, 255, 255)") {
							if (newflg) {
								oo.pastelist[oo.pastelist.length] = [];
								newflg = false;
							}
							if (j >= v.length - 1) {
								newflg = true;
							}
							CS.setFFFFFF(v[j][i]);
							oo.pastelist[oo.pastelist.length - 1][oo.pastelist[oo.pastelist.length - 1].length] = v[j][i];
						}
					}
				}
				if (oo.pastelist.length == 1) {
					if (oo.pastelist[0].length == 1) {
						// 一つ枠セルだけ選択した場合
						// データを入れるかを判断するフラグ
						var instflg = false;
						var ii = 0;
						var ij = -1;
						var starti = 0;
						var startj = 0
						for (var i = 0; i < v[0].length; i++) {
							if (instflg) {
								ii++;
								ij = -1;
							}
							for (var j = 0; j < v.length; j++) {
								if (v[j][i].id == oo.pastelist[0][0].id) {
									starti = i + 0;
									startj = j + 0;
									v[j][i].innerHTML = cells[ii][++ij];
									instflg = true;
								} else if (instflg && j >= startj) {
									if (typeof cells[ii] != "undefined" && typeof cells[ii][++ij] != "undefined") {
										v[j][i].innerHTML = cells[ii][ij];
									}
								}
							}
						}
					} else {
						// 一行枠セルだけ選択した場合
						var instflg = false;
						var ii = 0;
						var ij = -1;
						var starti = 0;
						var startj = 0
						for (var i = 0; i < v[0].length; i++) {
							if (instflg) {
								ii++;
								ij = -1;
							}
							for (var j = 0; j < v.length; j++) {
								if (v[j][i].id == oo.pastelist[0][0].id) {
									starti = i + 0;
									startj = j + 0;
									v[j][i].innerHTML = cells[ii][++ij];
									instflg = true;
								} else if (instflg && j >= startj) {
									if (ij <= oo.pastelist[0].length - 1 && j - startj < oo.pastelist[0].length) {
										ij++;
										if (cells[0].length - 1 < ij) {
											ij = ij % cells[0].length;
										}
										if (typeof cells[ii] != "undefined" && typeof cells[ii][ij] != "undefined") {
											v[j][i].innerHTML = cells[ii][ij];
										}
									}
								}
							}
						}
					}
				} else {
					// 複数行枠セルだけ選択した場合
					var instflg = false;
					var ii = 0;
					var ij = 0;
					for (var i = 0; i < oo.pastelist.length; i++) {
						for (var j = 0; j < oo.pastelist[i].length; j++) {
							ii = i % cells.length;
							ij = j % cells[ii].length;
							oo.pastelist[i][j].innerHTML = cells[ii][ij];
						}
					}
				}
			}
			var openpasteflg = function() {
				oo.pasteflg = false;
			}
			// e.currentTarget.offsetParent.style.display="none";
			setTimeout(openpasteflg, 200);
			return false;
		}
	}else{
		if(e.currentTarget.thIstextflg!=true){
			return CS.numOnly();
		}
	}
};
//一括荷重入力画面のキーボード移動動作を変更する2016/12/17
CS.clBtnMoveCtl_ikkatuKajyu = function(e) {
	var ect=e.currentTarget;
	if(CS.isNotNull(e.currentTarget.maxfontsize)){
		if(isNaN(parseFloat(e.currentTarget.innerHTML))||parseFloat(e.currentTarget.innerHTML)>=99999){
			return true;
		}
	}
	var isCtrlDown = false;
	if (e.metaKey) { // mac
		isCtrlDown = true;
	} else if (e.ctrlKey && navigator.userAgent.indexOf('Mac') === -1) { // pc
		isCtrlDown = true;
	}

	if (isCtrlDown) {
		if(CS.isNotNull(e.currentTarget.offsetParent)&&CS.isNotNull(e.currentTarget.offsetParent.copytextObj)){
			e.currentTarget.offsetParent.copytextObj.style.display = "";
			e.currentTarget.offsetParent.copytextObj.select();
			return true;;
		}else{
			return false;
		}
	}
	if (e.keyCode == 38) {
		if (typeof e.currentTarget.kobetufunction2 != "undefined") {
			// ↑ボタンを押したときに実行するイベント
			e.currentTarget.kobetufunction2(e.currentTarget);
		}
		var focuseiti = e.currentTarget.offsetParent.focuseiti;
		list = focuseiti.split("_");
		if(CS.isNotNull(e.currentTarget.offsetParent.gyakuflg)&&e.currentTarget.offsetParent.gyakuflg==true){
			var ect=e.currentTarget;
			var complet=true;
			//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
			var nextrow=CS.toI(list[2]) - 1;
			var nextclu=CS.toI(list[3]);
			if(CS.toI(list[2])%CS.btnNameLst.length==0){
				nextrow=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)*CS.btnNameLst.length+CS.btnNameLst.length-1;
				nextclu=nextclu-1;
			}
			if (CS.isNotNull(ect.offsetParent.cl[nextrow])
				&& CS.isNotNull(ect.offsetParent.cl[nextrow][CS.toI(list[3])])) {
				for (var i = nextrow; i >= Math.floor(CS.toI(list[2])/CS.btnNameLst.length)*CS.btnNameLst.length; i--) {
					if (CS.colored(ect.offsetParent.cl[i][nextclu].style.backgroundColor, 0) && ect.offsetParent.cl[i][nextclu].editflg != false) {
						CS.toNoedit(ect);
						CS.to_select(ect.offsetParent.cl[i][nextclu]);
						CS.to_select_flg=true;
						complet=false;
						break;
					}
				}
			}
			if(complet){
				var k=Math.floor(CS.toI(list[2])/CS.btnNameLst.length);
				var next=true;
				for(var j=nextclu-1;j>=0;j--){
					for (var i = k*CS.btnNameLst.length+CS.btnNameLst.length-1; i >= k*CS.btnNameLst.length; i--) {
						if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
							CS.toNoedit(ect);
							CS.to_select(ect.offsetParent.cl[i][j]);
							CS.to_select_flg=true;
							complet=false;
							next=false;
							break;
						}
					}
					if(!next){
						break;
					}
				}
			}
			if(complet){
				nextrow=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)-1;
				nextrow=nextrow*CS.btnNameLst.length;
				if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[nextrow]) && CS.isNotNull(ect.offsetParent.cl[nextrow][0])){
					var next=true;
					for(var k=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)+1;k<ect.offsetParent.cl.length/CS.btnNameLst.length;k++){
						for(var j=ect.offsetParent.cl[i].length-1;j>=0;j--){
							if(next){
								for (var i = k*CS.btnNameLst.length+CS.btnNameLst.length-1; i >=k*CS.btnNameLst.length; i--) {
									if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
										CS.toNoedit(ect);
										CS.to_select(ect.offsetParent.cl[i][j]);
										CS.to_select_flg=true;
										next=false;
										break;
									}
								}
							}else{break;}
						}
					}
				}
			}
		}else{
			var complet=true;
			if (CS.isNotNull(e.currentTarget.offsetParent.cl[CS.toI(list[2])])
				&& CS.isNotNull(e.currentTarget.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) - 1])) {
				for (var i = CS.toI(list[3]) - 1; i > -1; i--) {
					if (CS.colored(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].editflg != false
						&& e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select_flg=true;
						complet=false;
						break
					}
				}
			}
			if(complet){
				if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])-1][0])){
					var next=true;
					for(var j=CS.toI(list[2])-1;j>-1;j--){
						if(next){
							for (var i = ect.offsetParent.cl[j].length-1; i > -1; i--) {
								if (CS.colored(ect.offsetParent.cl[j][i].style.backgroundColor, 0) && ect.offsetParent.clcl[j][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[j][i]);
									CS.to_select_flg=true;
									next=false;
									break;
								}
							}
						}else{break;}
					}
				}
			}
		}
		return false;
	} else if (e.keyCode == 40) {
		if (typeof e.currentTarget.kobetufunction3 != "undefined") {
			// ↓ボタンを押したときに実行するイベント
			e.currentTarget.kobetufunction3(e.currentTarget);
		}
		var focuseiti = e.currentTarget.offsetParent.focuseiti;
		list = focuseiti.split("_");
		if(CS.isNotNull(e.currentTarget.offsetParent.gyakuflg)&&e.currentTarget.offsetParent.gyakuflg==true){
			var ect=e.currentTarget;
			var complet=true;
			//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
			var nextrow=CS.toI(list[2]) + 1;
			var nextclu=CS.toI(list[3]);
			if(CS.toI(list[2])%CS.btnNameLst.length==CS.btnNameLst.length-1){
				nextrow=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)*CS.btnNameLst.length;
				nextclu=nextclu+1;
			}
			if (CS.isNotNull(ect.offsetParent.cl[nextrow]) 
				&& CS.isNotNull(ect.offsetParent.cl[nextrow][nextclu])) {
				for (var i = nextrow; i < Math.floor(CS.toI(list[2])/CS.btnNameLst.length)*CS.btnNameLst.length+CS.btnNameLst.length; i++) {
					if (CS.colored(ect.offsetParent.cl[i][nextclu].style.backgroundColor, 0) && ect.offsetParent.cl[i][nextclu].editflg != false) {
						CS.toNoedit(ect);
						CS.to_select(ect.offsetParent.cl[i][nextclu]);
						CS.to_select_flg=true;
						complet=false;
						break;
					}
				}
			}
			if(complet){
				var k=Math.floor(CS.toI(list[2])/CS.btnNameLst.length);
				var next=true;
				for(var j=nextclu+1;j<ect.offsetParent.cl[0].length;j++){
					if(next){
						for (var i = k*CS.btnNameLst.length; i < (k+1)*CS.btnNameLst.length; i++) {
							if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
								CS.toNoedit(ect);
								CS.to_select(ect.offsetParent.cl[i][j]);
								CS.to_select_flg=true;
								complet=false;
								next=false;
								break;
							}
						}
					}else{break;}
				}
			}


			if(complet){
				nextrow=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)-1;
				nextrow=nextrow*CS.btnNameLst.length;
				if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[nextrow]) && CS.isNotNull(ect.offsetParent.cl[nextrow][0])){
					var next=true;
					for(var k=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)-1;k>=0;k--){
						for(var j=0;j<ect.offsetParent.cl[0].length;j++){
							if(next){
								for (var i = k*CS.btnNameLst.length; i <k*CS.btnNameLst.length+CS.btnNameLst.length; i++) {
									if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
										CS.toNoedit(ect);
										CS.to_select(ect.offsetParent.cl[i][j]);
										CS.to_select_flg=true;
										next=false;
										break;
									}
								}
							}else{break;}
						}
						if(!next){
							break;
						}
					}
				}
				// nextrow=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)+1;
				// nextrow=nextrow*CS.btnNameLst.length;
				// if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[nextrow]) && CS.isNotNull(ect.offsetParent.cl[nextrow][0])){
					// var next=true;
					// for(var k=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)+1;k<ect.offsetParent.cl.length/CS.btnNameLst.length;k++){
						// for(var j=0;j<ect.offsetParent.cl[0].length;j++){
							// if(next){
								// for (var i = k*CS.btnNameLst.length; i < (k+1)*CS.btnNameLst.length; i++) {
									// if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
										// CS.toNoedit(ect);
										// CS.to_select(ect.offsetParent.cl[i][j]);
										// CS.to_select_flg=true;
										// next=false;
										// break;
									// }
								// }
							// }else{break;}
						// }
						// if(!next){
							// break;
						// }
					// }
				// }
			}
		}else{
			var complet=true;
			if (typeof e.currentTarget.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) + 1] != "undefined") {
				for (var i = CS.toI(list[3]) + 1; i < e.currentTarget.offsetParent.cl[CS.toI(list[2])].length; i++) {
					if (CS.colored(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select_flg=true;
						complet=false;
						break;
					}
				}
			}
			if(complet){
				if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])+1][0])){
					var next=true;
					for(var j=CS.toI(list[2])+1;j<ect.offsetParent.cl.length;j++){
						if(next){
							for (var i = 0; i < ect.offsetParent.cl[j].length; i++) {
								if (CS.colored(ect.offsetParent.cl[j][i].style.backgroundColor, 0) && ect.offsetParent.clcl[j][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[j][i]);
									CS.to_select_flg=true;
									next=false;
									break;
								}
							}
						}else{break;}
					}
				}
			}
		}
		return false;
	} else if (e.keyCode == 39) {
		if (typeof e.currentTarget.kobetufunction4 != "undefined") {
			// →ボタンを押したときに実行するイベント
			e.currentTarget.kobetufunction4(e.currentTarget);
		}		
		var focuseiti = e.currentTarget.offsetParent.focuseiti;
		list = focuseiti.split("_");
		if(CS.isNotNull(e.currentTarget.offsetParent.gyakuflg)&&e.currentTarget.offsetParent.gyakuflg==true){
			//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
			if (typeof e.currentTarget.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) + 1] != "undefined") {
				for (var i = CS.toI(list[3]) + 1; i < e.currentTarget.offsetParent.cl[CS.toI(list[2])].length; i++) {
					if (CS.colored(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select_flg=true;
						break;
					}
				}
			}
		}else{
			if (typeof e.currentTarget.offsetParent.cl[CS.toI(list[2]) + 1] != "undefined" && typeof e.currentTarget.offsetParent.cl[CS.toI(list[2]) + 1][CS.toI(list[3])] != "undefined") {
				for (var i = CS.toI(list[2]) + 1; i < e.currentTarget.offsetParent.cl.length; i++) {
					if (CS.colored(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[i][CS.toI(list[3])].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])]);
						CS.to_select(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])]);
						CS.to_select_flg=true;
						break;
					}
				}
			}	
		}
		return false;
	} else if (e.keyCode == 37) {
		if (typeof e.currentTarget.kobetufunction5 != "undefined") {
			// ←ボタンを押したときに実行するイベント
			e.currentTarget.kobetufunction5(e.currentTarget);
		}
		var focuseiti = e.currentTarget.offsetParent.focuseiti;
		list = focuseiti.split("_");
		if(CS.isNotNull(e.currentTarget.offsetParent.gyakuflg)&&e.currentTarget.offsetParent.gyakuflg==true){
			//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
			if (typeof e.currentTarget.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) - 1] != "undefined") {
				for (var i = CS.toI(list[3]) - 1; i > -1; i--) {
					if (CS.colored(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].editflg != false
						&& e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select_flg=true;
						break
					}
				}
			}
		}else{
			if (typeof e.currentTarget.offsetParent.cl[CS.toI(list[2] - 1)][CS.toI(list[3])] != "undefined") {
				for (var i = CS.toI(list[2]) - 1; i > -1; i--) {
					if (CS.colored(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[i][CS.toI(list[3])].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])]);
						CS.to_select(e.currentTarget.offsetParent.cl[i][CS.toI(list[3])]);
						CS.to_select_flg=true;
						break;
					}
				}
			}	
		}
		return false;
	} else if (e.keyCode == 13) {
		//CS.toNoedit(e.currentTarget);
		if (typeof e.currentTarget.kobetufunction1 != "undefined") {
			// Enterボタンを押したときに実行するイベント
			if(e.currentTarget.kobetufunction1(e.currentTarget)==false){return false;}
		}
		var focuseiti = e.currentTarget.offsetParent.focuseiti;
		list = focuseiti.split("_");
		if(CS.isNotNull(e.currentTarget.offsetParent.gyakuflg)&&e.currentTarget.offsetParent.gyakuflg==true){
			var ect=e.currentTarget;
			var complet=true;
			//配列の順序が特殊（横列→縦列、縦列→横列）になる場合にgyakuflgを設ける
			var nextrow=CS.toI(list[2]) + 1;
			var nextclu=CS.toI(list[3]);
			if(CS.toI(list[2])%CS.btnNameLst.length==CS.btnNameLst.length-1){
				nextrow=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)*CS.btnNameLst.length;
				nextclu=nextclu+1;
			}
			if (CS.isNotNull(ect.offsetParent.cl[nextrow]) 
				&& CS.isNotNull(ect.offsetParent.cl[nextrow][nextclu])) {
				for (var i = nextrow; i < Math.floor(CS.toI(list[2])/CS.btnNameLst.length)*CS.btnNameLst.length+CS.btnNameLst.length; i++) {
					if (CS.colored(ect.offsetParent.cl[i][nextclu].style.backgroundColor, 0) && ect.offsetParent.cl[i][nextclu].editflg != false) {
						CS.toNoedit(ect);
						CS.to_select(ect.offsetParent.cl[i][nextclu]);
						CS.to_select_flg=true;
						complet=false;
						break;
					}
				}
			}
			if(complet){
				var k=Math.floor(CS.toI(list[2])/CS.btnNameLst.length);
				var next=true;
				for(var j=nextclu+1;j<ect.offsetParent.cl[0].length;j++){
					if(next){
						for (var i = k*CS.btnNameLst.length; i < (k+1)*CS.btnNameLst.length; i++) {
							if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
								CS.toNoedit(ect);
								CS.to_select(ect.offsetParent.cl[i][j]);
								CS.to_select_flg=true;
								complet=false;
								next=false;
								break;
							}
						}
					}else{break;}
				}
			}
			if(complet){
				nextrow=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)-1;
				nextrow=nextrow*CS.btnNameLst.length;
				if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[nextrow]) && CS.isNotNull(ect.offsetParent.cl[nextrow][0])){
					var next=true;
					for(var k=Math.floor(CS.toI(list[2])/CS.btnNameLst.length)-1;k>=0;k--){
						for(var j=0;j<ect.offsetParent.cl[0].length;j++){
							if(next){
								for (var i = k*CS.btnNameLst.length; i <k*CS.btnNameLst.length+CS.btnNameLst.length; i++) {
									if (CS.colored(ect.offsetParent.cl[i][j].style.backgroundColor, 0) && ect.offsetParent.cl[i][j].editflg != false) {
										CS.toNoedit(ect);
										CS.to_select(ect.offsetParent.cl[i][j]);
										CS.to_select_flg=true;
										next=false;
										break;
									}
								}
							}else{break;}
						}
						if(!next){
							break;
						}
					}
				}
			}
		}else{
			var complet=true;
			if (typeof e.currentTarget.offsetParent.cl[CS.toI(list[2])][CS.toI(list[3]) + 1] != "undefined") {
				for (var i = CS.toI(list[3]) + 1; i < e.currentTarget.offsetParent.cl[CS.toI(list[2])].length; i++) {
					if (CS.colored(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].style.backgroundColor, 0) && e.currentTarget.offsetParent.cl[CS.toI(list[2])][i].editflg != false) {
						CS.toNoedit(e.currentTarget);
						//CS.toeditable(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select(e.currentTarget.offsetParent.cl[CS.toI(list[2])][i]);
						CS.to_select_flg=true;
						complet=false;
						break;
					}
				}
			}
			if(complet){
				if(ect.offsetParent.movemodle=="kajyu" && CS.isNotNull(ect.offsetParent.cl[CS.toI(list[2])+1][0])){
					var next=true;
					for(var j=CS.toI(list[2])+1;j<ect.offsetParent.cl.length;j++){
						if(next){
							for (var i = 0; i < ect.offsetParent.cl[j].length; i++) {
								if (CS.colored(ect.offsetParent.cl[j][i].style.backgroundColor, 0) && ect.offsetParent.clcl[j][i].editflg != false) {
									CS.toNoedit(ect);
									CS.to_select(ect.offsetParent.cl[j][i]);
									CS.to_select_flg=true;
									next=false;
									break;
								}
							}
						}else{break;}
					}
				}
			}
		}
		return false;
	} else if (e.keyCode == 86) {
		if (e.currentTarget.style.backgroundColor == "rgb(255, 255, 0)") {
			return true;
		} else {
			var data = null;
			if (typeof window.clipboardData != "undefined") {
				data = window.clipboardData.getData('Text');
			} else {
				e.preventDefault();
				data = e.clipboardData.getData("text");
			}
			var cells = [];
			if (data != null) {
				var karidata = data.split('\n');
				var rowCnt = 5;
				for (var i = 0; i < karidata.length; i++) {
					var karidatat = karidata[i].split('\t');
					if (i == karidata.length - 1 && karidatat[0] == "") {
						break;
					}
					cells[i] = [];
					for (var j = 0; j < karidatat.length; j++) {
						cells[i][j] = karidatat[j];
					}
				}
			} else {
				return;
			}
			if (cells.length == 0) {
				return;
			}
			var oo = e.currentTarget.offsetParent;
			// 当前、選択された位置を確認
			e.currentTarget.offsetParent.pastelist = [];
			var v = e.currentTarget.offsetParent;
			v = v.cl;
			if(CS.isNotNull(e.currentTarget.gyakuflg)&&e.currentTarget.gyakuflg==true){
				var newflg = true;
				for (var i = 0; i < v.length; i++) {
					newflg = true;
					for (var j = 0; j < v[0].length; j++) {
						if (v[i][j].style.backgroundColor == "rgb(0, 255, 255)") {
							if (newflg) {
								oo.pastelist[oo.pastelist.length] = [];
								newflg = false;
							}
							if (j >= v.length - 1) {
								newflg = true;
							}
							CS.setFFFFFF(v[i][j]);
							oo.pastelist[oo.pastelist.length - 1][oo.pastelist[oo.pastelist.length - 1].length] = v[i][j];
						}
					}
				}
				if (oo.pastelist.length == 1) {
					if (oo.pastelist[0].length == 1) {
						// 一つ枠セルだけ選択した場合
						// データを入れるかを判断するフラグ
						var instflg = false;
						var ii = 0;
						var ij = -1;
						var starti = 0;
						var startj = 0
						for (var i = 0; i < v.length; i++) {
							if (instflg) {
								ii++;
								ij = -1;
							}
							for (var j = 0; j < v[0].length; j++) {
								if (v[i][j].id == oo.pastelist[0][0].id) {
									starti = i + 0;
									startj = j + 0;
									v[i][j].innerHTML = cells[ii][++ij];
									instflg = true;
								} else if (instflg && j >= startj) {
									if (typeof cells[ii] != "undefined" && typeof cells[ii][++ij] != "undefined") {
										v[i][j].innerHTML = cells[ii][ij];
									}
								}
							}
						}
					} else {
						// 一行枠セルだけ選択した場合
						var instflg = false;
						var ii = 0;
						var ij = -1;
						var starti = 0;
						var startj = 0
						for (var i = 0; i < v.length; i++) {
							if (instflg) {
								ii++;
								ij = -1;
							}
							for (var j = 0; j < v[0].length; j++) {
								if (v[i][j].id == oo.pastelist[0][0].id) {
									starti = i + 0;
									startj = j + 0;
									v[i][j].innerHTML = cells[ii][++ij];
									instflg = true;
								} else if (instflg && j >= startj) {
									if (ij <= oo.pastelist[0].length - 1 && j - startj < oo.pastelist[0].length) {
										ij++;
										if (cells[0].length - 1 < ij) {
											ij = ij % cells[0].length;
										}
										if (typeof cells[ii] != "undefined" && typeof cells[ii][ij] != "undefined") {
											v[i][j].innerHTML = cells[ii][ij];
										}
									}
								}
							}
						}
					}
				} else {
					// 複数行枠セルだけ選択した場合
					var instflg = false;
					var ii = 0;
					var ij = 0;
					for (var i = 0; i < oo.pastelist.length; i++) {
						for (var j = 0; j < oo.pastelist[i].length; j++) {
							ii = i % cells.length;
							ij = j % cells[ii].length;
							oo.pastelist[i][j].innerHTML = cells[ii][ij];
						}
					}
				}
				
			}else{
				var newflg = true;
				for (var i = 0; i < v[0].length; i++) {
					newflg = true;
					for (var j = 0; j < v.length; j++) {
						if (v[j][i].style.backgroundColor == "rgb(0, 255, 255)") {
							if (newflg) {
								oo.pastelist[oo.pastelist.length] = [];
								newflg = false;
							}
							if (j >= v.length - 1) {
								newflg = true;
							}
							CS.setFFFFFF(v[j][i]);
							oo.pastelist[oo.pastelist.length - 1][oo.pastelist[oo.pastelist.length - 1].length] = v[j][i];
						}
					}
				}
				if (oo.pastelist.length == 1) {
					if (oo.pastelist[0].length == 1) {
						// 一つ枠セルだけ選択した場合
						// データを入れるかを判断するフラグ
						var instflg = false;
						var ii = 0;
						var ij = -1;
						var starti = 0;
						var startj = 0
						for (var i = 0; i < v[0].length; i++) {
							if (instflg) {
								ii++;
								ij = -1;
							}
							for (var j = 0; j < v.length; j++) {
								if (v[j][i].id == oo.pastelist[0][0].id) {
									starti = i + 0;
									startj = j + 0;
									v[j][i].innerHTML = cells[ii][++ij];
									instflg = true;
								} else if (instflg && j >= startj) {
									if (typeof cells[ii] != "undefined" && typeof cells[ii][++ij] != "undefined") {
										v[j][i].innerHTML = cells[ii][ij];
									}
								}
							}
						}
					} else {
						// 一行枠セルだけ選択した場合
						var instflg = false;
						var ii = 0;
						var ij = -1;
						var starti = 0;
						var startj = 0
						for (var i = 0; i < v[0].length; i++) {
							if (instflg) {
								ii++;
								ij = -1;
							}
							for (var j = 0; j < v.length; j++) {
								if (v[j][i].id == oo.pastelist[0][0].id) {
									starti = i + 0;
									startj = j + 0;
									v[j][i].innerHTML = cells[ii][++ij];
									instflg = true;
								} else if (instflg && j >= startj) {
									if (ij <= oo.pastelist[0].length - 1 && j - startj < oo.pastelist[0].length) {
										ij++;
										if (cells[0].length - 1 < ij) {
											ij = ij % cells[0].length;
										}
										if (typeof cells[ii] != "undefined" && typeof cells[ii][ij] != "undefined") {
											v[j][i].innerHTML = cells[ii][ij];
										}
									}
								}
							}
						}
					}
				} else {
					// 複数行枠セルだけ選択した場合
					var instflg = false;
					var ii = 0;
					var ij = 0;
					for (var i = 0; i < oo.pastelist.length; i++) {
						for (var j = 0; j < oo.pastelist[i].length; j++) {
							ii = i % cells.length;
							ij = j % cells[ii].length;
							oo.pastelist[i][j].innerHTML = cells[ii][ij];
						}
					}
				}
			}
			var openpasteflg = function() {
				oo.pasteflg = false;
			}
			// e.currentTarget.offsetParent.style.display="none";
			setTimeout(openpasteflg, 200);
			return false;
		}
	}else{
		if(e.currentTarget.thIstextflg!=true){
			return CS.numOnly();
		}
	}
};
CS.getAbsPoint = function(e) {
	var x = e.offsetLeft, y = e.offsetTop;
	while (e = e.offsetParent) {
		x += e.offsetLeft;
		y += e.offsetTop;
	}
	return {
		"x" : x,
		"y" : y
	};
}
// 変更したらスターを掛ける
CS.othermethod1 = function(o) {
	if (typeof o.macobj != "undefined") {
		o.onchangemethod(o);
	}
}
CS.removeChild = function(v, o) {
	CS.othermethod1(v);
	CS.disableSelection(v);
	v.onmousedown = CS.focuseven_down;
	CS.setFFFFFF(v);
	v.innerHTML = o;
}
CS.removeChild_obj = function(v, o) {
	setTimeout(function() {
		v.createflg = false;
		CS.othermethod1(v);
		CS.disableSelection(v);
		v.onmousedown = CS.focuseven_down;
		CS.setFFFFFF(v);
		// v.sobj = undefined;
		v.oldvalue = v.innerHTML = o;
	}, 50);
}

// ソート処理:タイトル名により、ソートパラーを設定し、ソート順と変更したタイトル名を返り
CS.sortExecute = function(tmpName) {
	var sortId = "";
	var columnName = tmpName;
	if (columnName.indexOf("▲▼") > 0) {
		columnName = columnName.replace("▲▼", "▲");
		sortId = "ASC";
	} else if (columnName.indexOf("▲") > 0) {
		columnName = columnName.replace("▲", "▼");
		sortId = "DESC";
	} else {
		columnName = columnName.replace("▼", "▲");
		sortId = "ASC";
	}
	return sortId + "&" + columnName;
}

// Is Number Check
CS.isNumberChk = function(textObj) {
	var tmpValue = "";
	if (CS.isNotNull(textObj.value)) {
		tmpValue = textObj.value;
	} else if (CS.isNotNull(textObj.innerHTML)) {
		tmpValue = textObj.innerHTML;
	}
	if (tmpValue.length > 0 && CS.isNumber(tmpValue) == false) {
		textObj.focus();
		textObj.style.backgroundColor = 'red';
		alert("半角数字を入力してください。");
		return false;
	} else {
		if(textObj.style.backgroundColor!="rgb(0, 255, 255)"){
			CS.setFFFFFF(textObj);
		}
		return true;
	}
}

// Is Number Check
CS.isNumber = function(x) {
	if (typeof (x) != 'number' && typeof (x) != 'string') {
		return false;
	} else {
		return (x == parseFloat(x) && isFinite(x));
	}
}
function bytes2(str) {
    return(encodeURIComponent(str).replace(/%../g,"x").length);
}
/**
 * GET　EMTHODのパラメータの取得
 * @param parameterName
 * @returns
 */

CS.getQueryParameter = function( parameterName ) {
	  var queryString = window.top.location.search.substring(1);

	  var parameterName = parameterName + "=";
	  if ( queryString.length > 0 ) {
	    begin = queryString.indexOf ( parameterName );
	    if ( begin != -1 ) {
	      begin += parameterName.length;
	      end = queryString.indexOf ( "&" , begin );
	        if ( end == -1 ) {
	        end = queryString.length
	      }
		  if(decodeURIComponent (queryString.substring ( begin, end )).length>100 || bytes2(decodeURIComponent(queryString.substring(begin, end))) > 256) {
			return 1;
		  }
	      return decodeURIComponent (queryString.substring ( begin, end ));
	    }
	  }
	  return "";
};
// フォーマットしていた小数を取得(tmpIdx1:カーマ間桁、tmpIdx2:小数桁、tmpNum:数字)
CS.FormatFloat = function(tmpIdx1, tmpIdx2, tmpNum) {
	if (isNaN(tmpNum)) {
		alert("数字を入力してください");
		return "NaN.NaN";
	} else {
		if(typeof tmpNum=="string"){
			tmpNum=tmpNum.replace(/,/g,"")
		}
		if (tmpIdx2 == 0 || tmpIdx2 == "") {
			tmpIdx2 = 0;
		}
		var tmpDecimber = CS.FormatNumber(tmpNum, tmpIdx2);
		var tmplst = tmpDecimber.split(".");
		if (tmpIdx2 != 0) {
			tmpDecimber = CS.toI(tmplst[0]).toFixed().replace(/(\d)(?=(\d{3})+\b)/g, '$1,') + "." + tmplst[1];
		} else {
			tmpDecimber = CS.toI(tmplst[0]).toFixed().replace(/(\d)(?=(\d{3})+\b)/g, '$1,');
		}
		if (!CS.isNotNull(tmpDecimber)) {
			tmpDecimber = "";
		}
		return tmpDecimber;
	}
}
/**
 *  GETパラメータを配列にして返す
 *  
 *  @return     パラメータのObject
 *
 */
 CS.getUrlVar = function(str){
    var vars = {}; 
    var param = location.search.substring(1).split('&');
    for(var i = 0; i < param.length; i++) {
        var keySearch = param[i].search(/=/);
        var key = '';
        if(keySearch != -1) key = param[i].slice(0, keySearch);
        var val = param[i].slice(param[i].indexOf('=', 0) + 1);
        if(key != '') vars[key] = decodeURI(val);
    } 
    return vars[str]; 
}
//ドット付数字のフォーマット
CS.getPointNumber = function(numStr) {
	var result = "";
	var count = 0;
	var index = 0;
	if (CS.isNotNull(numStr) && numStr != "") {
		count = numStr.split(".").length;
		if (count == 2) {
			index = numStr.indexOf(".");
			if (index == 0) {
				result = "0" + numStr;
			} else if (index == numStr.length-1) {
				result = numStr.replace(".","");
			} else {//正常数字である場合
				result = "0";
			}
		} else if (count > 2) {//数字ではないの場合
			result = "-1";	
		} else {//小数点がないの場合
			result = "0";
		}
	} else {//何も入力しないの場合
		result = "0";
	}
	return result;
}

// 点滅線を引く
CS.dotenmetu = function(o, x1, y1, x2, y2) {
	if (y2 - y1 == 0) {
		var ww = 4;
		var w = x2 - x1;
		var hh = CS.toI((y2 - y1) / CS.toI(w / ww));
		var h = y2 - y1;
		for (var i = 0; i < CS.toI(w / ww); i++) {
			if (i % 2 == 0) {
				if (i == CS.toI(w / ww) - 1) {
					o.moveTo(x1 + i * ww - 0.5, y1 + i * hh - 0.5);
					o.lineTo(x2 - 0.5, y2 - 0.5);
				} else {
					o.moveTo(x1 + i * ww - 0.5, y1 + i * hh - 0.5);
					o.lineTo(x1 + (i + 1) * ww - 0.5, y1 + (i + 1) * hh - 0.5);
				}
			}
		}
	} else if (x2 - x1 == 0) {
		var hh = 4;
		var h = y2 - y1;
		var ww = CS.toI((x2 - x1) / CS.toI(h / hh));
		var w = x2 - x1;
		for (var i = 0; i < CS.toI(h / hh); i++) {
			if (i % 2 == 0) {
				if (i == CS.toI(h / hh) - 1) {
					o.moveTo(x1 + i * ww - 0.5, y1 + i * hh - 0.5);
					o.lineTo(x2 - 0.5, y2 - 0.5);
				} else {
					o.moveTo(x1 + i * ww - 0.5, y1 + i * hh - 0.5);
					o.lineTo(x1 + (i + 1) * ww - 0.5, y1 + (i + 1) * hh - 0.5);
				}
			}
		}
	}

}
// xmlの値を取る
CS.gettagchi =
	function(o, name) {
		if (!CS.isNotNull(o) || o.getElementsByTagName(name)[0] == null || typeof o.getElementsByTagName(name)[0] == "undefined" || typeof o.getElementsByTagName(name)[0].childNodes[0] == "undefined"
			|| o.getElementsByTagName(name)[0].childNodes.length == 0) {
			return "";
		}
		return o.getElementsByTagName(name)[0].childNodes[0].nodeValue;
	}
// 違和文字列を全角に変換する
CS.changestr = function(o) {
	o = o.replace(/&amp;/g, "＆");
	o = o.replace(/,/g, "，");
	return o.replace(/&/g, "＆");
}
// 前頁に戻る
CS.backcome = function(e) {
	javascript: window.history.back();
}
// 前ページに戻る
CS.gotomaepage = function(e) {
	location.href = CS.maepage;
}
// NULLではないかを判断する
CS.isNotNull = function(o) {
	if (typeof o != "undefined" && o != null) {
		return true;
	} else {
		return false;
	}
}
//値があるかを判断する
CS.isNotEmpty = function(o) {
	if (typeof o != "undefined" && o != null && o != "") {
		return true;
	} else {
		return false;
	}
}
CS.toF = function(o) {
	if(typeof o == "string"){
		o=o.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0) - 65248);});
	}
	if (!CS.isNotNull(o) || o=="" || isNaN(parseFloat(o))) {
		return 0;
	}
	o=parseFloat(o)*100000;
	o=Math.round(o) / 100000;
	return parseFloat(o);
}
CS.getmaru = function(o) {
	if (!CS.isNotNull(o) || o == "") {
		return "×";
	}
	if (o == "1") {
		return "○";
	} else {
		return "×"
	}
}
CS.getnomaru = function(o) {
	if (!CS.isNotNull(o) || o == "") {
		return "";
	}
	if (o == "○") {
		return "1";
	} else {
		return "0"
	}
}
CS.Soil_horizontallist = [ "N値から算定", "ＬＬＴ", "E50", "試験結果" ];
CS.takeStaticColor = function(o, v) {
	if (CS.isNotNull(o.staticColor) && o.staticColor != "") {
		o.style.backgroundColor = o.staticColor;
	} else {
		o.style.backgroundColor = v;
	}
}
CS.takeyellow = function(o, v) {
	if (CS.isNotNull(o.staticColor)) {
		o.style.backgroundColor = o.staticColor;
	} else {
		o.style.backgroundColor = v;
	}
}
// アップロードツール
CS.uploadtool =
	function(filename, method) {
		var filemen = document.createElement("a");
		filemen.style.overflow = "hidden";
		filemen.style.display = "inline-block";
		filemen.style.height = "22px";
		filemen.style.width = "85px";
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			filemen.fileobj = document.createElement("input");
			filemen.fileobj.type = "file";
			filemen.fileobj.id = "csvfile";
			filemen.fileobj.name = "files[]";
			filemen.fileobj.style.width = "85px";
			filemen.fileobj.multiple = true;
			filemen.fileobj.style.position = "absolute";
			filemen.appendChild(filemen.fileobj);
			filemen.htmlsupport = true;
			function handleFileSelect(evt) {
				var files = evt.target.files;
				for (var i = 0, f; f = files[i]; i++) {
					CS.readFile(filename, f, method);
					// alert(escape(f.name));
				}
				evt.currentTarget.value = "";
			}
			filemen.fileobj.addEventListener('change', handleFileSelect, false);
			return filemen;
		} else {
			filemen.style.height = "30px";
			filemen.fileobj = document.createElement("input");
			filemen.fileobj.type = "button";
			filemen.fileobj.style.height = "30px";
			filemen.fileobj.style.fontSize = "10px";
			filemen.fileobj.id = "csvfile";
			filemen.fileobj.value = "アップロード"
			var fontobj = document.createElement("font");
			fontobj.size = 2;
			fontobj.appendChild(document.createTextNode("アップロード"));
			filemen.fileobj.appendChild(fontobj);
			filemen.appendChild(filemen.fileobj);
			filemen.fileobj.onclick =
				function(e) {
					CS.onIEuplaod = method;
					window.open('./upload.html' + "?kouzousyssessionid=" + CS.getcookie("kouzousyssessionid") + "&data=" + Number(new Date), 'filename',
						'width=400, height=300,menubar=no,toolbar=no,location=no,status=no,resizable=no,scrollbars=no');
				}
			return filemen;
		}
	}
CS.onIEuplaod = function(str) {

}
//金額にカンマをつける
CS.toKingaku= function(num) {
	return String( num ).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,' );
};
CS.readFile = function(filename, file, method) {
	// 中身を読み込む
	var reader = new FileReader(); // ファイルリーダー生成
	// ロード関数登録
	reader.onload = function(e) {
		// 読み込んだファイルの中身をテキストエリアにセット
		method(e.target.result);
	};
	// reader.readAsText(file);
	reader[filename](file, "shift-jis");
};

//Format the float number(value:float 数字,precision:小数桁数)
CS.FormatNumber = function(value, precision) {
	var precision = precision || 0, neg = value < 0,
	power = Math.pow(10, precision),
	value = Math.round(value * power),
	integral = String((neg ? Math.ceil : Math.floor)(value / power)), 
	fraction = String((neg ? -value : value) % power), padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
	return precision ? integral + '.' + padding + fraction : integral;
};
//Format the float number(value:float 数字,precision:小数桁数)負数サポート
CS.FormatNumber_mainasu = function(value, precision) {
	if(isNaN(parseFloat(value))){return "";}
	valuecopy=value;
	var precision = precision || 0, neg = value < 0,
	power = Math.pow(10, precision),
	value = Math.round(value * power),
	integral = String((neg ? Math.ceil : Math.floor)(value / power)), 
	fraction = String((neg ? -value : value) % power), padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
	var revar=precision ? integral + '.' + padding + fraction : integral;
	if(valuecopy<0 && valuecopy>-1){
		return "-"+revar;
	}else{
		return revar;
	}
};
//Format the float number(value:float 数字,precision:小数桁数)
CS.FormatNumber_notNull = function(value, precision) {
	if(value==""){return "";}
	var precision = precision || 0, neg = value < 0,
	power = Math.pow(10, precision),
	value = Math.round(value * power),
	integral = String((neg ? Math.ceil : Math.floor)(value / power)), 
	fraction = String((neg ? -value : value) % power), padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
	return precision ? integral + '.' + padding + fraction : integral;
};
// Delete the duplicate data from array
CS.FilteLst = function(tmplst) {
	for (var i = 0; i < tmplst.length; i++) {
		for (var j = tmplst.length; j >= i + 1; j--) {
			if (tmplst[i] == tmplst[j]) {
				tmplst.splice(j, 1);
			}
		}
	}

	for (var k = 0; k < tmplst.length; k++) {
		if (tmplst[k] == "" || tmplst[k] == " ") {
			tmplst.splice(k, 1);
		}
	}
	return tmplst;
}

// Download confirm popup
CS.ConfirmPop = function(link) {
	if (CS.isNotNull(CS.DwnConfirm)) {
		var downUrl = document.createElement("a");
		downUrl.href = EscapeSJIS(UnescapeUTF8(link));
		downUrl.target = "_blank";
		downUrl.innerHTML = "クリックして<br>ダウンロードしてください。";
		CS.DwnConfirm.main.innerHTML = "";
		CS.DwnConfirm.main.appendChild(downUrl);
		CS.DwnConfirm.style.display = "";
		return;
	}
	var downUrl = document.createElement("a");
	downUrl.href = EscapeSJIS(UnescapeUTF8(link));
	downUrl.target = "_blank";
	downUrl.innerHTML = "クリックして<br>ダウンロードしてください。";

	CS.DwnConfirm = CS.createpopup("ダウンロードリンク", 300, 150, 50, 750);
	CS.DwnConfirm.main.appendChild(downUrl);
	CS.DwnConfirm.main.style.textAlign = "center";
	CS.DwnConfirm.main.style.margin = "0 auto";
	CS.DwnConfirm.style.display = "";
};

CS.opendialog_pe = function(event,text,hai,iie,fun1,fun2,x,y) {
	if(CS.isNotNull(CS.DwnConfirm)){CS.DwnConfirm.style.display="none";}
	if (typeof CS.dialogkaburu == "undefined") {
		CS.dialogkaburu = document.createElement("div");
		CS.dialogkaburu.style.width = document.body.scrollWidth+"px";
		CS.dialogkaburu.style.height = document.body.scrollHeight+"px";
		CS.dialogkaburu.style.top = "0px";
		CS.dialogkaburu.style.left = "0px";
		CS.dialogkaburu.style.backgroundColor = "#F8F8FF";
		CS.dialogkaburu.style.position = "absolute";
		CS.dialogkaburu.style.zIndex = 9998;
		CS.dialogkaburu.style.filter = 'alpha(opacity=50)';
		// Firefox用
		CS.dialogkaburu.style.MozOpacity = 0.7;
		CS.dialogkaburu.style.fontSize = "50px";
		// Safari用
		CS.dialogkaburu.style.opacity = 0.7;
		document.getElementsByTagName("body").item(0).appendChild(CS.dialogkaburu);
	} else {
		CS.dialogkaburu.style.width = document.body.scrollWidth+"px";
		CS.dialogkaburu.style.height = document.body.scrollHeight+"px";
		CS.dialogkaburu.style.display = "";
	}
	var leftzahyou=event.pageX + event.currentTarget.scrollLeft-200;
	if(CS.isNotNull(x)){
		leftzahyou=x;
	}
	var topzahyou=event.pageY + event.currentTarget.scrollTop-260;
	if(CS.isNotNull(y)){
		topzahyou=y;
	}
	var openheight=200;
	if(CS.isNotNull(CS.opendialog.height)){
		openheight=CS.opendialog.height;
	}
	CS.DIALOG=CS.createpopup(" ",400,openheight,topzahyou,leftzahyou,null);
	CS.DIALOG.closebtn.style.display="none";
	CS.DIALOG.titleobj.style.display="none";
	CS.DIALOG.main.style.top=CS.toI(CS.DIALOG.main.style.top)-30+"px";
	CS.DIALOG.style.height=CS.toI(CS.DIALOG.style.height)-30+"px";
	CS.DIALOG.textdiv=document.createElement("div");
	CS.DIALOG.textdiv.innerHTML=text;
	CS.DIALOG.textdiv.style.position = "absolute";
	CS.DIALOG.textdiv.style.height="30px";
	CS.DIALOG.textdiv.style.width="360px";
	CS.DIALOG.textdiv.style.left = "10px";
	CS.DIALOG.textdiv.style.top = "10px";
	CS.DIALOG.textdiv.overflow = "hidden";
	CS.DIALOG.main.appendChild(CS.DIALOG.textdiv);
	
	CS.DIALOG.btn1=document.createElement("input");
	CS.DIALOG.btn1.type="button";
	CS.DIALOG.btn1.value=hai;
	CS.DIALOG.btn1.style.position = "absolute";
	CS.DIALOG.btn1.style.left = "10px";
	CS.DIALOG.btn1.style.top = openheight-150+"px";
	CS.DIALOG.main.appendChild(CS.DIALOG.btn1);
	CS.DIALOG.btn1.onclick=function(e){
		fun1();
		CS.DIALOG.style.display="none";
		CS.body.removeChild(CS.DIALOG);
		delete CS.DIALOG;
		CS.dialogkaburu.style.display = "none";
	}
	CS.DIALOG.btn2=document.createElement("input");
	CS.DIALOG.btn2.type="button";
	CS.DIALOG.btn2.value=iie;
	CS.DIALOG.btn2.style.position = "absolute";
	CS.DIALOG.btn2.style.left = "80px";
	CS.DIALOG.btn2.style.top = openheight-150+"px";
	CS.DIALOG.btn2.onclick=function(e){
		fun2();
		CS.DIALOG.style.display="none";
		CS.body.removeChild(CS.DIALOG);
		delete CS.DIALOG;
		CS.dialogkaburu.style.display = "none";
	}
	CS.DIALOG.style.zIndex = 9998;
	CS.DIALOG.main.appendChild(CS.DIALOG.btn2);
	CS.DIALOG.textdiv1=document.createElement("div");
	CS.DIALOG.textdiv1.innerHTML="ファイル名を指定する場合は下記を変更";
	CS.DIALOG.textdiv1.style.position = "absolute";
	CS.DIALOG.textdiv1.style.height="30px";
	CS.DIALOG.textdiv1.style.width="280px";
	CS.DIALOG.textdiv1.style.left = "90px";
	CS.DIALOG.textdiv1.style.top = "85px";
	CS.DIALOG.textdiv1.overflow = "hidden";
	CS.DIALOG.main.appendChild(CS.DIALOG.textdiv1);
	
	CS.DIALOG.textdiv2=document.createElement("div");
	CS.DIALOG.textdiv2.innerHTML="ファイル名:　　　　　　　　　　　　　　　　　　　　　　.pe";
	CS.DIALOG.textdiv2.style.position = "absolute";
	CS.DIALOG.textdiv2.style.height="23px";
	CS.DIALOG.textdiv2.style.width="360px";
	CS.DIALOG.textdiv2.style.left = "10px";
	CS.DIALOG.textdiv2.style.top = "110px";
	CS.DIALOG.textdiv2.overflow = "hidden";
	CS.DIALOG.main.appendChild(CS.DIALOG.textdiv2);
	
	CS.DIALOG.outputfilename=document.createElement("input");
	CS.DIALOG.outputfilename.type="text";
	CS.DIALOG.outputfilename.style.position = "absolute";
	CS.DIALOG.outputfilename.style.height="22px";
	CS.DIALOG.outputfilename.style.width="220px";
	CS.DIALOG.outputfilename.style.left = "90px";
	CS.DIALOG.outputfilename.style.top = "110px";
	CS.DIALOG.outputfilename.value = "eptext_"+Date.now();
	CS.DIALOG.main.appendChild(CS.DIALOG.outputfilename);
	
};
CS.opendialog = function(event,text,hai,iie,fun1,fun2,x,y) {
	if(CS.isNotNull(CS.DwnConfirm)){CS.DwnConfirm.style.display="none";}
	if (typeof CS.dialogkaburu == "undefined") {
		CS.dialogkaburu = document.createElement("div");
		CS.dialogkaburu.style.width = document.body.scrollWidth+"px";
		CS.dialogkaburu.style.height = document.body.scrollHeight+"px";
		CS.dialogkaburu.style.top = "0px";
		CS.dialogkaburu.style.left = "0px";
		CS.dialogkaburu.style.backgroundColor = "#F8F8FF";
		CS.dialogkaburu.style.position = "absolute";
		CS.dialogkaburu.style.zIndex = 9998;
		CS.dialogkaburu.style.filter = 'alpha(opacity=50)';
		// Firefox用
		CS.dialogkaburu.style.MozOpacity = 0.7;
		CS.dialogkaburu.style.fontSize = "50px";
		// Safari用
		CS.dialogkaburu.style.opacity = 0.7;
		document.getElementsByTagName("body").item(0).appendChild(CS.dialogkaburu);
	} else {
		CS.dialogkaburu.style.width = document.body.scrollWidth+"px";
		CS.dialogkaburu.style.height = document.body.scrollHeight+"px";
		CS.dialogkaburu.style.display = "";
	}
	var leftzahyou=event.pageX + event.currentTarget.scrollLeft-200;
	if(CS.isNotNull(x)){
		leftzahyou=x;
	}
	var topzahyou=event.pageY + event.currentTarget.scrollTop-260;
	if(CS.isNotNull(y)){
		topzahyou=y;
	}
	var openheight=120;
	if(CS.isNotNull(CS.opendialog.height)){
		openheight=CS.opendialog.height;
	}
	CS.DIALOG=CS.createpopup(" ",400,openheight,topzahyou,leftzahyou,null);
	CS.DIALOG.closebtn.style.display="none";
	CS.DIALOG.titleobj.style.display="none";
	CS.DIALOG.main.style.top=CS.toI(CS.DIALOG.main.style.top)-30+"px";
	CS.DIALOG.style.height=CS.toI(CS.DIALOG.style.height)-30+"px";
	CS.DIALOG.textdiv=document.createElement("div");
	CS.DIALOG.textdiv.innerHTML=text;
	CS.DIALOG.textdiv.style.position = "absolute";
	CS.DIALOG.textdiv.style.height="30px";
	CS.DIALOG.textdiv.style.width="360px";
	CS.DIALOG.textdiv.style.left = "10px";
	CS.DIALOG.textdiv.style.top = "10px";
	CS.DIALOG.textdiv.overflow = "hidden";
	CS.DIALOG.main.appendChild(CS.DIALOG.textdiv);
	
	CS.DIALOG.btn1=document.createElement("input");
	CS.DIALOG.btn1.type="button";
	CS.DIALOG.btn1.value=hai;
	CS.DIALOG.btn1.style.position = "absolute";
	CS.DIALOG.btn1.style.left = "10px";
	CS.DIALOG.btn1.style.top = openheight-80+"px";
	CS.DIALOG.main.appendChild(CS.DIALOG.btn1);
		CS.DIALOG.btn1.onclick=function(e){
		CS.DIALOG.style.display="none";
		CS.body.removeChild(CS.DIALOG);
		delete CS.DIALOG;
		CS.dialogkaburu.style.display = "none";
		fun1();
	}
	CS.DIALOG.btn2=document.createElement("input");
	CS.DIALOG.btn2.type="button";
	CS.DIALOG.btn2.value=iie;
	CS.DIALOG.btn2.style.position = "absolute";
	CS.DIALOG.btn2.style.left = "80px";
	CS.DIALOG.btn2.style.top = openheight-80+"px";
	CS.DIALOG.btn2.onclick=function(e){
		CS.DIALOG.style.display="none";
		CS.body.removeChild(CS.DIALOG);
		delete CS.DIALOG;
		CS.dialogkaburu.style.display = "none";
		fun2();
	}
	CS.DIALOG.style.zIndex = 9998;
	CS.DIALOG.main.appendChild(CS.DIALOG.btn2);
};
CS.openalert = function(event,text,hai,fun1,x,y) {
	if(CS.isNotNull(CS.DwnConfirm)){CS.DwnConfirm.style.display="none";}
	if (typeof CS.dialogkaburu == "undefined") {
		CS.dialogkaburu = document.createElement("div");
		CS.dialogkaburu.style.width = document.body.scrollWidth+"px";
		CS.dialogkaburu.style.height = document.body.scrollHeight+"px";
		CS.dialogkaburu.style.top = "0px";
		CS.dialogkaburu.style.left = "0px";
		CS.dialogkaburu.style.backgroundColor = "#F8F8FF";
		CS.dialogkaburu.style.position = "absolute";
		CS.dialogkaburu.style.zIndex = 9998;
		CS.dialogkaburu.style.filter = 'alpha(opacity=50)';
		// Firefox用
		CS.dialogkaburu.style.MozOpacity = 0.7;
		CS.dialogkaburu.style.fontSize = "50px";
		// Safari用
		CS.dialogkaburu.style.opacity = 0.7;
		document.getElementsByTagName("body").item(0).appendChild(CS.dialogkaburu);
	} else {
		CS.dialogkaburu.style.width = document.body.scrollWidth+"px";
		CS.dialogkaburu.style.height = document.body.scrollHeight+"px";
		CS.dialogkaburu.style.display = "";
	}
	var leftzahyou=0;
	if(CS.isNotNull(x)){
		leftzahyou=x;
	}else{
		leftzahyou=event.pageX + event.currentTarget.scrollLeft-200;
	}
	var topzahyou=0;
	if(CS.isNotNull(y)){
		topzahyou=y;
	}else{
		topzahyou=event.pageY + event.currentTarget.scrollTop-260;
	}
	CS.DIALOG=CS.createpopup(" ",400,120,topzahyou,leftzahyou,null);
	CS.DIALOG.closebtn.style.display="none";
	CS.DIALOG.titleobj.style.display="none";
	CS.DIALOG.main.style.top=CS.toI(CS.DIALOG.main.style.top)-30+"px";
	CS.DIALOG.style.height=CS.toI(CS.DIALOG.style.height)-30+"px";
	CS.DIALOG.textdiv=document.createElement("div");
	CS.DIALOG.textdiv.innerHTML=text;
	CS.DIALOG.textdiv.style.position = "absolute";
	CS.DIALOG.textdiv.style.height="30px";
	CS.DIALOG.textdiv.style.width="360px";
	CS.DIALOG.textdiv.style.left = "10px";
	CS.DIALOG.textdiv.style.top = "10px";
	CS.DIALOG.textdiv.overflow = "hidden";
	CS.DIALOG.main.appendChild(CS.DIALOG.textdiv);
	
	CS.DIALOG.btn1=document.createElement("input");
	CS.DIALOG.btn1.type="button";
	CS.DIALOG.btn1.value=hai;
	CS.DIALOG.btn1.style.position = "absolute";
	CS.DIALOG.btn1.style.left = "180px";
	CS.DIALOG.btn1.style.top = "40px";
	CS.DIALOG.main.appendChild(CS.DIALOG.btn1);
		CS.DIALOG.btn1.onclick=function(e){
		CS.DIALOG.style.display="none";
		CS.body.removeChild(CS.DIALOG);
		delete CS.DIALOG;
		CS.dialogkaburu.style.display = "none";
		fun1();
	}
	CS.DIALOG.style.zIndex = 9998;
};
CS.num2fig = function(Numeric) {
	Numeric += '';

	// うっかり入っていたカンマを消す(=fig2num())
	var Separator = Numeric.indexOf(',', 0);
	while (Separator != -1) {
		Numeric = Numeric.substring(0, Separator) + Numeric.substring(Separator + 1, Numeric.length);
		Separator = Numeric.indexOf(',', 0);
	}

	// 小数点を探し、小数点以下と整数部を分割して保持する
	var DecimalPoint = Numeric.lastIndexOf('.');
	if (DecimalPoint == -1) {
		var Decimals = '';
		var Integers = Numeric + '';
	} else {
		var Decimals = Numeric.substring(DecimalPoint, Numeric.length) + '';
		var Integers = Numeric.substring(0, DecimalPoint) + '';
	}
	// 整数部の文字列長を3の倍数にする。足りない分は手前に' 'を埋め込む
	Blanks = Integers.length % 3;
	if (Blanks != 0) {
		for (var i = 0; 3 - Blanks > i; i++) {
			Integers = ' ' + Integers;
		}
	}

	// 整数文字列先頭から3文字おきにカンマを挿入する
	// 先頭がマイナス符号の時は負数として処理する
	FigureInteger = Integers.substring(0, 3);
	var j = 2;
	if (Integers.charAt(2) == '-') {
		FigureInteger = FigureInteger + Integers.substring(3, 6);
		j = 4;
	}
	for (i = j; Integers.length > i; i++) {
		if (i % 3 == 0) {
			FigureInteger = FigureInteger + ',' + Integers.substring(i, i + 3);
		}
	}

	// 臨時に入れておいた' 'を削除する
	while (FigureInteger.charAt(0) == ' ') {
		FigureInteger = FigureInteger.substring(1, FigureInteger.length);
	}

	// 整形済みの整数部と、待避してあった小数部を連結。連結した文字列を返して終了！
	CommaNumber = FigureInteger + Decimals;
	return CommaNumber;
}

//ESCキー、F5キーをクリックする場合(ポップアップ画面を閉める)
CS.EscKeyEvent = function (e) {
    //ESCキーをクリックする場合
    if (e.keyCode == 27) {
    	//普通ポップアップ画面を閉める
    	//window.close();
        
        //ESCキーでのポップアップ画面
    	var tmpObj = document.getElementById("ESCKEY")
        if (CS.isNotNull(tmpObj) && CS.isNotNull(tmpObj.menue)) {
        	tmpObj.menue.style.display = "none";
        }
    } else if (e.keyCode == 116) {
    	//F5キー
    }
}

//DIVに編集する場合、ENTER KEYを押した時の特別処理(原始機能を削除)
CS.EnterKeyEvent = function (e) {
	// trap the return key being pressed
    if (e.keyCode == 13) {
      // prevent the default behaviour of return key pressed
      return false;
    }
}

//マウスキーをクリックする場合(ポップアップ画面を閉める)
CS.MouseKeyEvent = function(e) {
	var tmpObj = document.getElementById("ESCKEY");
	switch (e.which) {
        case 1:
        	//左マウスキーでの処理
            if (CS.isNotNull(tmpObj) && CS.isNotNull(tmpObj.menue)) {
            	tmpObj.menue.style.display = "none";
            }
            break;
        case 2:
        	//中マウスキーでの処理
            break;
        case 3:
        	//右マウスキーでの処理
            break;
        default:
        	//上述以外の場合
            alert('You have a strange Mouse!');
    }
}
//canasコンテキスト、フーチングNo、ｘ座標、ｙ座標、杭径サイズ、方向、線のカラー、内容のカラー
//CS.ShowFuchingu(context,21,300,300,450,1,'rgb(00,00,00)','rgb(255,255,0)');
//CS.ShowFuchingu(context,21,300,300,450,1);
CS.ShowFuchingu=function(ctx,No,x,y,kk,PI,fillcolor,strokecolor){
	//杭径の倍率を宣言
	kk=CS.toI(kk*0.05);
	ctx.save();
	ctx.translate(x,y);
	
	//回転角度判断
	if(PI==0){
	}else if(PI==1){
		ctx.rotate(Math.PI/2);
	}else if(PI==2){
		ctx.rotate(Math.PI);
	}else{
		ctx.rotate(-Math.PI/2);
	}
    
	var bakstrokecolor=ctx.strokeStyle;
	var bakfillcolor=ctx.fillStyle;
	if(CS.isNotNull(strokecolor)){
		ctx.strokeStyle = strokecolor;
	}
	if(CS.isNotNull(fillcolor)){
		ctx.fillStyle = fillcolor;
	}else{
		ctx.fillStyle = "rgb(255,255,255)";
	}
	var A=CS.toI(2*kk);
	var B=kk;
	var r=CS.toI(0.5*kk);
	//No1の描画
	if(No==1){
		//辺長
		var W=A;
		var H=A;
		ctx.beginPath();
		ctx.fillRect(0-B-0.5, 0-B-0.5, A, A);
		ctx.strokeRect(0-B-0.5, 0-B-0.5, A, A);
		ctx.beginPath();
		ctx.arc(0-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}
	
	//No2の描画
	if(No==2){
		//辺長
		var W=A+2*B;
		var H=2*B;
		ctx.beginPath();
		ctx.fillRect(0-CS.toI(A/2)-B-0.5, 0-B-0.5, A+2*B, 2*B);
		ctx.strokeRect(0-CS.toI(A/2)-B-0.5, 0-B-0.5, A+2*B, 2*B);
		ctx.beginPath();
		ctx.arc(0-CS.toI(A/2)-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0+CS.toI(A/2)-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}
	
	//No3の描画
	if(No==3){
		//辺長
		var W=2*A+2*B;
		var H=2*B;
		ctx.beginPath();
		ctx.fillRect(0-A-B-0.5, 0-B-0.5, 2*A+2*B, 2*B);
		ctx.strokeRect(0-A-B-0.5, 0-B-0.5, 2*A+2*B, 2*B);
		ctx.beginPath();
		ctx.arc(0-A-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0+A-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}
	
	//No4の描画
	if(No==4){
		//辺長
		var W=A+2*B;
		var H=CS.toI(0.86*A)+2*B;
		ctx.beginPath();
		ctx.fillRect(0-B-CS.toI(0.5*A)-0.5, 0-CS.toI(0.43*A)-B-0.5, A+2*B, CS.toI(0.86*A)+2*B);
		ctx.strokeRect(0-B-CS.toI(0.5*A)-0.5, 0-CS.toI(0.43*A)-B-0.5, A+2*B, CS.toI(0.86*A)+2*B);
		ctx.beginPath();
		ctx.arc(0-0.5, 0-CS.toI(0.43*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, CS.toI(0.43*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, CS.toI(0.43*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}
	
	//No5の描画
	if(No==5){
		//辺長
		var W=CS.toI(A+2.31*B);
		var H=A+B;
		ctx.beginPath();
		ctx.moveTo(0-CS.toI(0.5*A)-CS.toI(0.577*B)-0.5,CS.toI(0.289*A)+B-0.5);
		ctx.lineTo(CS.toI(0.5*A)+CS.toI(0.577*B)-0.5,CS.toI(0.289*A)+B-0.5);
		ctx.lineTo(CS.toI(0.5*A)+CS.toI(1.155*B)-0.5,CS.toI(0.289*A)-0.5);
		ctx.lineTo(CS.toI(0.35*A)-0.5,0-CS.toI(0.5*A)-B-0.5);
		ctx.lineTo(0-CS.toI(0.35*A)-0.5,0-CS.toI(0.5*A)-B-0.5);
		ctx.lineTo(0-CS.toI(0.5*A)-CS.toI(1.155*B)-0.5,CS.toI(0.289*A)-0.5);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, CS.toI(0.289*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, CS.toI(0.289*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-0.5, 0-CS.toI(0.577*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}
	
	//No6の描画
	if(No==6){
		//辺長
		var W=3*A+2*B;
		var H=2*B;
		ctx.beginPath();
		ctx.fillRect(0-CS.toI(1.5*A)-B-0.5, 0-B-0.5,3*A+2*B, 2*B);
		ctx.strokeRect(0-CS.toI(1.5*A)-B-0.5, 0-B-0.5,3*A+2*B, 2*B);
		ctx.beginPath();
		ctx.arc(0-CS.toI(1.5*A)-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(1.5*A)-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}
	
	//No7の描画
	if(No==7){
		//辺長
		var W=A+2*B;
		var H=A+2*B;
		ctx.beginPath();
		ctx.fillRect(0-CS.toI(0.5*A)-B-0.5, 0-CS.toI(0.5*A)-B-0.5,A+2*B, A+2*B);
		ctx.strokeRect(0-CS.toI(0.5*A)-B-0.5, 0-CS.toI(0.5*A)-B-0.5,A+2*B, A+2*B);
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, 0-CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, 0-CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}
	
	//No8の描画
	if(No==8){
		//辺長
		var W=CS.toI(1.414*A)+2*B;
		var H=CS.toI(1.414*A)+2*B;
		ctx.beginPath();
		ctx.fillRect(0-CS.toI(0.707*A)-B-0.5, 0-CS.toI(0.707*A)-B-0.5,CS.toI(1.414*A)+2*B, CS.toI(1.414*A)+2*B);
		ctx.strokeRect(0-CS.toI(0.707*A)-B-0.5, 0-CS.toI(0.707*A)-B-0.5,CS.toI(1.414*A)+2*B, CS.toI(1.414*A)+2*B);
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.707*A)-0.5, 0-CS.toI(0.707*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.707*A)-0.5, CS.toI(0.707*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.707*A)-0.5, 0-CS.toI(0.707*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.707*A)-0.5, CS.toI(0.707*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}
	
	//No9の描画
	if(No==9){
		//辺長
		var W=2*A+2*B;
		var H=A+2*B;
		ctx.beginPath();
		ctx.fillRect(0-A-B-0.5, 0-CS.toI(0.5*A)-B-0.5,2*A+2*B,A+2*B);
		ctx.strokeRect(0-A-B-0.5, 0-CS.toI(0.5*A)-B-0.5,2*A+2*B,A+2*B);
		ctx.beginPath();
		ctx.arc(0-A-0.5, 0-CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-0.5, 0-CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0+A-0.5, 0-CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-A-0.5, CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-0.5, CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0+A-0.5, CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}
	
	//No10の描画
	if(No==10){
		//辺長
		var W=2*A+2*B;
		var H=CS.toI(1.732*A)+2*B;
		ctx.beginPath();
		ctx.fillRect(0-A-B-0.5, 0-CS.toI(0.866*A)-B-0.5,2*A+2*B,CS.toI(1.732*A)+2*B);
		ctx.strokeRect(0-A-B-0.5, 0-CS.toI(0.866*A)-B-0.5,2*A+2*B,CS.toI(1.732*A)+2*B);
		ctx.beginPath();
		ctx.arc(0-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, 0-CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, 0-CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-A-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(A-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}
	
	//No11の描画
	if(No==11){
		//辺長
		var W=2*A+CS.toI(2.21*B);
		var H=CS.toI(1.732*A)+2*B;
		ctx.beginPath();
		ctx.moveTo(0-CS.toI(0.5*A)-CS.toI(0.6*B)-0.5,CS.toI(0.866*A)+B-0.5);
		ctx.lineTo(CS.toI(0.5*A)+CS.toI(0.6*B)-0.5,CS.toI(0.866*A)+B-0.5);
		ctx.lineTo(A+CS.toI(1.155*B)-0.5,0-0.5);
		ctx.lineTo(CS.toI(0.5*A)+CS.toI(0.6*B)-0.5,0-CS.toI(0.866*A)-B-0.5);
		ctx.lineTo(0-CS.toI(0.5*A)-CS.toI(0.6*B)-0.5,0-CS.toI(0.866*A)-B-0.5);
		ctx.lineTo(0-A-CS.toI(1.155*B)-0.5,0-0.5);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(0-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, 0-CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, 0-CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-A-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(A-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}

	//No12の描画
	if(No==12){
		//辺長
		var W=3*A+2*B;
		var H=A+2*B;
		ctx.beginPath();
		ctx.fillRect(0-CS.toI(1.5*A)-B-0.5, 0-CS.toI(0.5*A)-B-0.5,3*A+2*B,A+2*B);
		ctx.strokeRect(0-CS.toI(1.5*A)-B-0.5, 0-CS.toI(0.5*A)-B-0.5,3*A+2*B,A+2*B);
		
		ctx.beginPath();
		ctx.arc(0-CS.toI(1.5*A)-0.5, 0-CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, 0-CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(1.5*A)-0.5, 0-CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, 0-CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(1.5*A)-0.5, CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(1.5*A)-0.5, CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}
	
	//No13の描画
	if(No==13){
		//辺長
		var W=2*A+2*B;
		var H=CS.toI(1.732*A)+2*B;
		ctx.beginPath();
		ctx.fillRect(0-A-B-0.5, 0-CS.toI(0.866*A)-B-0.5,2*A+2*B,CS.toI(1.732*A)+2*B);
		ctx.strokeRect(0-A-B-0.5, 0-CS.toI(0.866*A)-B-0.5,2*A+2*B,CS.toI(1.732*A)+2*B);
		
		ctx.beginPath();
		ctx.arc(0-A-0.5, 0-CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-0.5, 0-CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(A-0.5, 0-CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-A-0.5,CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-0.5,CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(A-0.5,CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}
	
	//No14の描画
	if(No==14){
		//辺長
		var W=2*A+2*B;
		var H=2*A+2*B;
		ctx.beginPath();
		ctx.fillRect(0-A-B-0.5, 0-A-B-0.5,2*A+2*B,2*A+2*B);
		ctx.strokeRect(0-A-B-0.5, 0-A-B-0.5,2*A+2*B,2*A+2*B);
		
		ctx.beginPath();
		ctx.arc(0-A-0.5, 0-A-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-0.5, 0-A-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(A-0.5, 0-A-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-A-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(A-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-A-0.5, A-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-0.5, A-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(A-0.5, A-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}
	
	//No15の描画
	if(No==15){
		//辺長
		var W=3*A+2*B;
		var H=2*A+2*B;
		ctx.beginPath();
		ctx.fillRect(0-CS.toI(1.5*A)-B-0.5, 0-A-B-0.5,3*A+2*B,2*A+2*B);
		ctx.strokeRect(0-CS.toI(1.5*A)-B-0.5, 0-A-B-0.5,3*A+2*B,2*A+2*B);
		
		ctx.beginPath();
		ctx.arc(0-A-0.5, 0-CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-0.5, 0-CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(A-0.5, 0-CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(1.5*A)-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(1.5*A)-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-A-0.5, CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-0.5, CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(A-0.5, CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}
	
	//No16の描画
	if(No==16){
		//辺長
		var W=2*A+2*B;
		var H=CS.toI(3*A)+2*B;
		ctx.beginPath();
		ctx.fillRect(0-A-B-0.5, 0-CS.toI(1.5*A)-B-0.5,2*A+2*B,CS.toI(3*A)+2*B);
		ctx.strokeRect(0-A-B-0.5, 0-CS.toI(1.5*A)-B-0.5,2*A+2*B,CS.toI(3*A)+2*B);
		
		ctx.beginPath();
		ctx.arc(0-A-0.5, 0-CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-0.5, 0-CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(A-0.5, 0-CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-A-0.5,CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-0.5,CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(A-0.5,CS.toI(0.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, 0-CS.toI(1.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, 0-CS.toI(1.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5,CS.toI(1.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5,CS.toI(1.5*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}
	
	//No17の描画
	if(No==17){
		//辺長
		var W=3*A+2*B;
		var H=CS.toI(1.732*A)+2*B;
		ctx.beginPath();
		ctx.fillRect(0-CS.toI(1.5*A)-B-0.5, 0-CS.toI(0.866*A)-B-0.5,3*A+2*B,CS.toI(1.732*A)+2*B);
		ctx.strokeRect(0-CS.toI(1.5*A)-B-0.5, 0-CS.toI(0.866*A)-B-0.5,3*A+2*B,CS.toI(1.732*A)+2*B);
		
		ctx.beginPath();
		ctx.arc(0-CS.toI(1.5*A)-0.5, 0-CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, 0-CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, 0-CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(1.5*A)-0.5, 0-CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-A-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(A-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(1.5*A)-0.5, CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(1.5*A)-0.5, CS.toI(0.866*A)-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}
	
	//No18の描画
	if(No==18){
		//辺長
		var W=3*A+2*B;
		var H=2*A+2*B;
		ctx.beginPath();
		ctx.fillRect(0-CS.toI(1.5*A)-B-0.5, 0-A-B-0.5,3*A+2*B,2*A+2*B);
		ctx.strokeRect(0-CS.toI(1.5*A)-B-0.5, 0-A-B-0.5,3*A+2*B,2*A+2*B);
		
		ctx.beginPath();
		ctx.arc(0-CS.toI(1.5*A)-0.5, 0-A-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, 0-A-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, 0-A-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(1.5*A)-0.5, 0-A-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(1.5*A)-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(1.5*A)-0.5, 0-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(1.5*A)-0.5, A-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0-CS.toI(0.5*A)-0.5,A-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(0.5*A)-0.5,A-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(CS.toI(1.5*A)-0.5,A-0.5, r, 0, Math.PI*2, false);
		ctx.stroke();
	}
	
	//No19の描画
	if(No==19){
		//辺長
		var W=2*A+2*B;
		var H=4*A+2*B;
		ctx.beginPath();
		ctx.fillRect(0-A-B-0.5, 0-2*A-B-0.5,2*A+2*B,4*A+2*B);
		ctx.strokeRect(0-A-B-0.5, 0-2*A-B-0.5,2*A+2*B,4*A+2*B);
		
		for(var i=-1;i<2;i++){
			for(var j=-1;j<2;j++){
				ctx.beginPath();
				ctx.arc(0-i*A-0.5, 0-CS.toI(1.732*j*A)-0.5, r, 0, Math.PI*2, false);
				ctx.stroke();
			}
		}
		for(var i=-1;i<2;i++){
			for(var j=-1;j<2;j++){
				if(i!=0 && j!=0){
					ctx.beginPath();
					ctx.arc(0-CS.toI(0.5*i*A)-0.5, 0-CS.toI(0.866*j*A)-0.5, r, 0, Math.PI*2, false);
					ctx.stroke();
				}
			}
		}
	}
	
	//No20の描画
	if(No==20){
		//辺長
		var W=2*A+2*CS.toI(1.155*B);
		var H=2*CS.toI(0.866*A)+2*B;

		ctx.beginPath();
		ctx.moveTo(0-CS.toI(1.2*A)-CS.toI(1.155*B)-0.5,0-CS.toI(0.866*A)-B-0.5);
		ctx.lineTo(CS.toI(1.2*A)+CS.toI(1.155*B)-0.5,0-CS.toI(0.866*A)-B-0.5);
		ctx.lineTo(CS.toI(2*A)+CS.toI(1.155*B)-0.5,0-0.5);
		ctx.lineTo(CS.toI(1.2*A)+CS.toI(1.155*B)-0.5,CS.toI(0.866*A)+B-0.5);
		ctx.lineTo(0-CS.toI(1.2*A)-CS.toI(1.155*B)-0.5,CS.toI(0.866*A)+B-0.5);
		ctx.lineTo(0-CS.toI(2*A)-CS.toI(1.155*B)-0.5,0-0.5);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		var il=[-1.5,-0.5,0.5,1.5];
		var jl=[-0.866,0.866];
		for(var i=0;i<5;i++){
			for(var j=0;j<2;j++){
				ctx.beginPath();
				ctx.arc(CS.toI(il[i]*A)-0.5, CS.toI(jl[j]*A)-0.5, r, 0, Math.PI*2, false);
				ctx.stroke();
			}
		}
		for(var i=-2;i<3;i++){
			ctx.beginPath();
			ctx.arc(CS.toI(i*A)-0.5, 0-0.5, r, 0, Math.PI*2, false);
			ctx.stroke();
		}
	}
	
	//No21の描画
	if(No==21){
		//辺長
		var W=CS.toI(1.732*A)*2+2*B;
		var H=3*A+2*B;

		ctx.beginPath();
		ctx.moveTo(0-CS.toI(1.732*A)-B-0.5,CS.toI(0.5*A)+CS.toI(0.577*B)-0.5);
		ctx.lineTo(0-0.5,CS.toI(1.5*A)+B-0.5);
		ctx.lineTo(CS.toI(1.732*A)+B-0.5,CS.toI(0.5*A)+CS.toI(0.577*B)-0.5);
		ctx.lineTo(CS.toI(1.732*A)+B-0.5,0-CS.toI(0.5*A)-CS.toI(0.577*B)-0.5);
		ctx.lineTo(0-0.5,0-CS.toI(1.5*A)-B-0.5);
		ctx.lineTo(0-CS.toI(1.732*A)-B-0.5,0-CS.toI(0.5*A)-CS.toI(0.577*B)-0.5);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		
		var jl=[-1.5,1.5];
		for(var j=0;j<2;j++){
			ctx.beginPath();
			ctx.arc(-0.5, CS.toI(jl[j]*A)-0.5, r, 0, Math.PI*2, false);
			ctx.stroke();
		}
		var il=[-0.866,0.866];
		jl=[-1,0,1];
		for(var i=0;i<2;i++){
			for(var j=0;j<3;j++){
				ctx.beginPath();
				ctx.arc(CS.toI(il[i]*A)-0.5, CS.toI(jl[j]*A)-0.5, r, 0, Math.PI*2, false);
				ctx.stroke();
			}
		}
		il=[-1.732,0,1.732];
		jl=[-0.5,0.5];
		for(var i=0;i<3;i++){
			for(var j=0;j<2;j++){
				ctx.beginPath();
				ctx.arc(CS.toI(il[i]*A)-0.5, CS.toI(jl[j]*A)-0.5, r, 0, Math.PI*2, false);
				ctx.stroke();
			}
		}
	}
	//回転設定を復元する
	ctx.restore();
	ctx.strokeStyle=bakstrokecolor;
	ctx.fillStyle=bakfillcolor;
	if(PI==0||PI==2){
		return [W,H];
	}else{
		return [H,W];
	}
};

CS.copylist=function(form,to){
	function clone(obj) {
	    if (null == obj || "object" != typeof obj) return obj;
	    var copy = obj.constructor();
	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	    }
	    return copy;
	}
	for(var i=0;i<to.length;i++){
		to[i]=null;
	}
	to=[];
	for(var i=0;i<form.length;i++){
		if(typeof form[i]=="number"){
			to[i]=form[i]+0;
		}else if(typeof form[i]=="string"){
			to[i]=form[i]+"";
		}else{
			to[i]=clone(form[i]);
		}
	}
	return to;
}
//概算設計用
//mousedown event
//flgobj = {"rowflg":XX,"colflg":XX}
CS.clearobjcolor = function(objlst,flgobj) {
	var rowflg = null;
	var colflg = null;
	if (CS.isNotNull(flgobj)) {
		rowflg = flgobj["rowflg"];
		colflg = flgobj["colflg"];
	}
	
	var maxrow = 0;
	var maxcol = 0;
	if (CS.isNotNull(rowflg) && rowflg == true) {
		maxrow = objlst.length-1;
	}
	for(var i  = 0;i <= maxrow;i++){
		if (CS.isNotNull(colflg) && colflg == true) {
			maxcol = objlst[i].length-1;
		}
		for(var j = 0;j <= maxcol;j++){
			if(CS.isNotNull(objlst[i][j])
				&& CS.isNotNull(objlst[i][j].inputobj)){
				if(objlst[i][j].inputobj.selectedflg==true
					||objlst[i][j].inputobj.style.backgroundColor=="rgb(0, 255, 255)"
					||objlst[i][j].inputobj.style.backgroundColor=="rgb(255, 255, 0)"){
					objlst[i][j].inputobj.style.backgroundColor="";
				}
			}
			if(CS.isNotNull(objlst[i][j])){
				if(objlst[i][j].selectedflg==true
					||objlst[i][j].style.backgroundColor=="rgb(0, 255, 255)"
					||objlst[i][j].style.backgroundColor=="rgb(255, 255, 0)"){
					objlst[i][j].style.backgroundColor="";
				}
			}
		}
	}
}
//概算設計用
//mousedown event
CS.clearobjcolor2 = function(objlst) {
	if(!CS.isNotNull(objlst) || objlst.length == 0){
		return;
	}
	
	//データオブジェクト処理用リスト
	var tmpObj = null;
	for (var i = 0;i < objlst.length;i++) {
		tmpObj = objlst[i];
		if (CS.isNotNull(tmpObj.inputobj)) {
			tmpObj = tmpObj.inputobj;
		}
		
		if (tmpObj.style.backgroundColor != "silver") {
			tmpObj.style.backgroundColor = "white";
		}
	}
}
//概算設計用
//mousedown event
//obj：table object,currentXY：current axis,scopeLst:scope axis
CS.mousedownEvent = function(objLst,scopeLst) {
	//範囲座標
	var startX = scopeLst["startX"];
	var startY = scopeLst["startY"];
	var endX = scopeLst["endX"];
	var endY = scopeLst["endY"];
	var currentX = scopeLst["currentX"];
	var currentY = scopeLst["currentY"];
	
	//データオブジェクト処理用リスト
	var tmpObj = null;
	CS.selectedobjs = [];
	for (var i = startY;i <= endY;i++) {
		for (var j = startX;j <= endX;j++) {
			tmpObj = objLst[i][j];
			if (CS.isNotNull(tmpObj.inputobj)) {
				tmpObj = tmpObj.inputobj;
			}
			
			if (i == CS.toI(currentY) && j == CS.toI(currentX)) {
				if (tmpObj.style.backgroundColor == ""
					|| tmpObj.style.backgroundColor == "white"
					|| tmpObj.style.backgroundColor == "gray") {
					tmpObj.style.backgroundColor = "rgb(0, 255, 255)";
					tmpObj.selectedflg=true;
					tmpObj.readOnly="readonly";
					tmpObj.focus();
					tmpObj.contentEditable = "false";
					CS.selectedobjs[CS.selectedobjs.length] = tmpObj;
				} else if (tmpObj.style.backgroundColor == "rgb(0, 255, 255)"
						|| tmpObj.style.backgroundColor == "red") {
					tmpObj.style.backgroundColor = "rgb(255, 255, 0)";
					tmpObj.readOnly="";
					tmpObj.selectedflg=false;
					tmpObj.contentEditable = "true";
					tmpObj.focus();
				}
			} 
//			else {
//				if (tmpObj.style.backgroundColor != "gray") {
//					tmpObj.style.backgroundColor = "white";
//				}
//			}
		}
	}
}
//概算設計用
//mousedown event
//obj：table object,currentXY：current axis,scopeLst:scope axis,motoobj
CS.mousedownEvent2 = function(objLst,scopeLst,motoobj) {
	if(!CS.isNotNull(objLst) || objLst.length == 0){
		return;
	}
	
	//範囲座標
	var startX = scopeLst["startX"];
	var startY = scopeLst["startY"];
	var endX = scopeLst["endX"];
	var endY = scopeLst["endY"];
	var currentX = scopeLst["currentX"];
	var currentY = scopeLst["currentY"];
	
	//データオブジェクト処理用リスト
//	for(k1=0;k1<objLst.length;k1++){
//		for(k2=0;k2<objLst[k1].length;k2++){
//			if(CS.isNotNull(objLst[k1][k2].td)&&objLst[k1][k2].td.length!=0){
//				tmpObj1=objLst[k1][k2].td;
//			}
//		}
//	}
	
	CS.selectedobjs=[];
	var tmpObj = null;
	if (motoobj.style.backgroundColor == ""
		|| motoobj.style.backgroundColor == "white") {
		for (var i = startY;i <= endY;i++) {
			for (var j = startX;j <= endX;j++) {
				if(endY==0){
					tmpObj = objLst[j];
				}else if(endX==0){
					tmpObj = objLst[i];
				}
				
				if (CS.isNotNull(tmpObj.inputobj)) {
					tmpObj = tmpObj.inputobj;
				}
				if (tmpObj.style.backgroundColor != "silver") {
					tmpObj.style.backgroundColor = "white";
				}
			}
		}
		motoobj.style.backgroundColor = "rgb(0, 255, 255)";
		motoobj.selectedflg=true;
		motoobj.readOnly="readonly";
		motoobj.contentEditable = "false";
		CS.selectedobjs[CS.selectedobjs.length] = motoobj;
	} else if (motoobj.style.backgroundColor == "rgb(0, 255, 255)") {
		for (var i = startY;i <= endY;i++) {
			for (var j = startX;j <= endX;j++) {
				if(endY==0){
					tmpObj = objLst[j];
				}else if(endX==0){
					tmpObj = objLst[i];
				}
				
				if (CS.isNotNull(tmpObj.inputobj)) {
					tmpObj = tmpObj.inputobj;
				}
				if (tmpObj.style.backgroundColor != "silver"
					&& tmpObj.style.backgroundColor != "rgb(0, 255, 255)") {
					tmpObj.style.backgroundColor = "white";
				}
			}
		}
		motoobj.style.backgroundColor = "rgb(255, 255, 0)";
		motoobj.readOnly="";
		motoobj.selectedflg==false;
		motoobj.contentEditable = "true";
		motoobj.focus();
	}
}

//keydown event
CS.keydownEvent = function(objLst,scopeLst,curobj) {
	if(!CS.isNotNull(objLst) || objLst.length == 0){
		return;
	}
	
	//範囲座標
	var startX = scopeLst["startX"];
	var startY = scopeLst["startY"];
	var endX = scopeLst["endX"];
	var endY = scopeLst["endY"];
	var currentX = scopeLst["currentX"];
	var currentY = scopeLst["currentY"];
	
	//データオブジェクト処理用リスト
	var tmpObj1 = null;
	var tmpObj2 = null;
	
	var keyCode;
	if (event.which == null) {
		keyCode = String.fromCharCode(event.keyCode);	// old IE
	} else if (event.which != 0 && event.charCode != 0) {
		keyCode = String.fromCharCode(event.which);		// All others
	} else {
		//special key
		keyCode = event.which;
	}
	
	//enter key
	if (keyCode == 13 || keyCode == 40) {
		if (CS.toI(currentY)+1 <= endY) {
			tmpObj1 = objLst[CS.toI(currentY)][CS.toI(currentX)];
			tmpObj2 = objLst[CS.toI(currentY)+1][CS.toI(currentX)];
			if (CS.isNotNull(tmpObj1.inputobj)) {
				tmpObj1 = tmpObj1.inputobj;
				tmpObj2 = tmpObj2.inputobj;
			}
			tmpObj1.style.backgroundColor = "";
			tmpObj2.style.backgroundColor = "rgb(0, 255, 255)";
			tmpObj2.readOnly="readonly";
			tmpObj2.focus();
			CS.selectedobjs = [];
			CS.selectedobjs[CS.selectedobjs.length] = tmpObj2;
		} else {
			curobj.style.backgroundColor = "rgb(255, 255, 0)";
		}
	} else if (keyCode == 37) {//↑
		if (CS.toI(currentX)-1 >= startX) {
			tmpObj1 = objLst[CS.toI(currentY)][CS.toI(currentX)];
			tmpObj2 = objLst[CS.toI(currentY)][CS.toI(currentX)-1];
			if (CS.isNotNull(tmpObj1.inputobj)) {
				tmpObj1 = tmpObj1.inputobj;
				tmpObj2 = tmpObj2.inputobj;
			}
			tmpObj1.style.backgroundColor = "";
			tmpObj2.style.backgroundColor = "rgb(0, 255, 255)";
			tmpObj2.readOnly="readonly";
			tmpObj2.focus();
			CS.selectedobjs = [];
			CS.selectedobjs[CS.selectedobjs.length] = tmpObj2;
		}
	}  else if (keyCode == 38) {//↑
		if (CS.toI(currentY)-1 >= startY) {
			tmpObj1 = objLst[CS.toI(currentY)][CS.toI(currentX)];
			tmpObj2 = objLst[CS.toI(currentY)-1][CS.toI(currentX)];
			if (CS.isNotNull(tmpObj1.inputobj)) {
				tmpObj1 = tmpObj1.inputobj;
				tmpObj2 = tmpObj2.inputobj;
			}
			tmpObj1.style.backgroundColor = "";
			tmpObj2.style.backgroundColor = "rgb(0, 255, 255)";
			tmpObj2.readOnly="readonly";
			tmpObj2.focus();
			CS.selectedobjs = [];
			CS.selectedobjs[CS.selectedobjs.length] = tmpObj2;
		}
	} else if (keyCode == 39) {//↑
		if (CS.toI(currentX)+1 <= endX) {
			tmpObj1 = objLst[CS.toI(currentY)][CS.toI(currentX)];
			tmpObj2 = objLst[CS.toI(currentY)][CS.toI(currentX)+1];
			if (CS.isNotNull(tmpObj1.inputobj)) {
				tmpObj1 = tmpObj1.inputobj;
				tmpObj2 = tmpObj2.inputobj;
			}
			tmpObj1.style.backgroundColor = "";
			tmpObj2.style.backgroundColor = "rgb(0, 255, 255)";
			tmpObj2.readOnly="readonly";
			tmpObj2.focus();
			CS.selectedobjs = [];
			CS.selectedobjs[CS.selectedobjs.length] = tmpObj2;
		}
	} else if ((keyCode >= 48 && keyCode <= 90)
			|| (keyCode >= 96 && keyCode <= 105)
			|| (keyCode == 27 || keyCode == 32 || keyCode == 110 || keyCode == 109 || keyCode == 189 || keyCode == 190)){
		tmpObj1 = curobj;
		if (CS.isNotNull(tmpObj1.inputobj)) {
			tmpObj1 = tmpObj1.inputobj;
		}
		
		//numberpadの対応
		if (keyCode >= 96 && keyCode <= 105) {
			keyCode = keyCode - 48;
		}
		
		if (tmpObj1.style.backgroundColor == "rgb(0, 255, 255)") {
			tmpObj1.value = String.fromCharCode(keyCode);
			if (keyCode == 110 || keyCode == 190) {
				tmpObj1.value = ".";
			}
			if (keyCode == 109 || keyCode == 189) {
				tmpObj1.value = "-";
			}
		}
		tmpObj1.style.backgroundColor = "rgb(255, 255, 0)";
		tmpObj1.readOnly="";
		tmpObj1.selectedflg=false;
		tmpObj1.contentEditable = "true";
		tmpObj1.focus();
		if (keyCode != 27 && keyCode != 32 && keyCode != 110 && keyCode != 190) {
//			event.preventDefault();
		} else {
			tmpObj1.focus();
		}
		return true;
	} else if(keyCode==229){
		tmpObj1 = objLst[CS.toI(currentY)][CS.toI(currentX)];
		if (CS.isNotNull(tmpObj1.inputobj)) {
			tmpObj1 = tmpObj1.inputobj;
		}
		tmpObj1.style.backgroundColor = "rgb(255, 255, 0)";
		tmpObj1.readOnly="";
		tmpObj1.selectedflg=false;
		tmpObj1.contentEditable = "true";
		tmpObj1.focus();
		return true;
	}
	return false;
}

//keydown event
CS.keydownEvent2 = function(keyCode,objLst,scopeLst,curobj) {
	//範囲座標
	var startX = scopeLst["startX"];
	var startY = scopeLst["startY"];
	var endX = scopeLst["endX"];
	var endY = scopeLst["endY"];
	var currentX = scopeLst["currentX"];
	var currentY = scopeLst["currentY"];
	
	//データオブジェクト処理用リスト
	var tmpObj1 = null;
	var tmpObj2 = null;
	var tmpObj3 = null;
	CS.selectedobjs=[];

	//enter key
	if (keyCode == 13 || keyCode == 40) {
		if (CS.toI(currentY)+1 <= endY) {
			tmpObj1 = objLst[CS.toI(currentY)];
			tmpObj2 = objLst[CS.toI(currentY)+1];
			if (CS.isNotNull(tmpObj1.inputobj)) {
				tmpObj1 = tmpObj1.inputobj;
				tmpObj2 = tmpObj2.inputobj;
			}
			tmpObj1.style.backgroundColor = "";
			tmpObj2.style.backgroundColor = "rgb(0, 255, 255)";
			tmpObj2.readOnly="readonly";
			tmpObj2.focus();
			CS.selectedobjs = [];
			CS.selectedobjs[CS.selectedobjs.length] = tmpObj2;
		} else {
			curobj.style.backgroundColor = "rgb(255, 255, 0)";
		}
	} else if (keyCode == 37) {//↑
		if (CS.toI(currentX)-1 >= startX) {
			tmpObj1 = objLst[CS.toI(currentX)];
			tmpObj2 = objLst[CS.toI(currentX)-1];
			if (CS.isNotNull(tmpObj1.inputobj)) {
				tmpObj1 = tmpObj1.inputobj;
				tmpObj2 = tmpObj2.inputobj;
			}
			tmpObj1.style.backgroundColor = "";
			tmpObj2.style.backgroundColor = "rgb(0, 255, 255)";
			tmpObj2.readOnly="readonly";
			tmpObj2.focus();
			CS.selectedobjs = [];
			CS.selectedobjs[CS.selectedobjs.length] = tmpObj2;
		}
	} else if (keyCode == 38) {//↑
		if (CS.toI(currentY)-1 >= startY) {
			tmpObj1 = objLst[CS.toI(currentY)];
			tmpObj2 = objLst[CS.toI(currentY)-1];
			if (CS.isNotNull(tmpObj1.inputobj)) {
				tmpObj1 = tmpObj1.inputobj;
				tmpObj2 = tmpObj2.inputobj;
			}
			tmpObj1.style.backgroundColor = "";
			tmpObj2.style.backgroundColor = "rgb(0, 255, 255)";
			tmpObj2.readOnly="readonly";
			tmpObj2.focus();
			CS.selectedobjs = [];
			CS.selectedobjs[CS.selectedobjs.length] = tmpObj2;
		}
	} else if (keyCode == 39) {//↑
		if (CS.toI(currentX)+1 <= endX) {
			tmpObj1 = objLst[CS.toI(currentX)];
			tmpObj2 = objLst[CS.toI(currentX)+1];
			if (CS.isNotNull(tmpObj1.inputobj)) {
				tmpObj1 = tmpObj1.inputobj;
				tmpObj2 = tmpObj2.inputobj;
			}
			tmpObj1.style.backgroundColor = "";
			tmpObj2.style.backgroundColor = "rgb(0, 255, 255)";
			tmpObj2.readOnly="readonly";
			tmpObj2.focus();
			CS.selectedobjs = [];
			CS.selectedobjs[CS.selectedobjs.length] = tmpObj2;
		}
	} else if ((keyCode >= 48 && keyCode <= 90)
		|| (keyCode >= 96 && keyCode <= 105)
		|| (keyCode == 27 || keyCode == 32 || keyCode == 110 || keyCode == 109 || keyCode == 189 || keyCode == 190)){
		tmpObj1 = curobj;
		if (CS.isNotNull(tmpObj1.inputobj)) {
			tmpObj1 = tmpObj1.inputobj;
		}
		//numberpadの対応
		if (keyCode >= 96 && keyCode <= 105) {
			keyCode = keyCode - 48;
		}
		
		if (tmpObj1.style.backgroundColor == "rgb(0, 255, 255)") {
			tmpObj1.value = String.fromCharCode(keyCode);
			if (keyCode == 110 || keyCode == 190) {
				tmpObj1.value = ".";
			}
			if (keyCode == 109 || keyCode == 189) {
				tmpObj1.value = "-";
			}
		}
		tmpObj1.style.backgroundColor = "rgb(255, 255, 0)";
		tmpObj1.readOnly="";
		tmpObj1.selectedflg=false;
		tmpObj1.contentEditable = "true";
		tmpObj1.focus();
		if (keyCode != 27 && keyCode != 32 && keyCode != 110 && keyCode != 190) {
//			event.preventDefault();
		} else {
			tmpObj1.focus();
		}
		return true;
	}
	return false;
}

//共通 key down event
CS.commonmousedown = function(curobj,offobj) {
	var textflg = false;
	if (CS.isNotNull(curobj.type)&&curobj.type =="text") {
		textflg = true;
	}
	if (curobj.style.backgroundColor == "" 
		||curobj.style.backgroundColor == "white" 
		|| curobj.style.backgroundColor == "red"
		|| curobj.style.backgroundColor == "rgb(255, 255, 255)") {
		curobj.style.backgroundColor = "rgb(0, 255, 255)";
		curobj.readOnly = "true";
	} else if (curobj.style.backgroundColor == "rgb(0, 255, 255)") {
		curobj.style.backgroundColor = "rgb(255,255,0)";
		curobj.readOnly = "";
		curobj.focus();
	}
	
	//reset other object background color
	var nextobj = null;
	for (var i = 0;i < offobj.length;i++) {
		if (offobj[i].length > 0) {
			for (var j = 0;j < offobj[i].length;j++) {
				if (textflg && CS.isNotNull(offobj[i][j].inputobj)) {
					nextobj = offobj[i][j].inputobj;
				} else {
					nextobj = offobj[i][j];
				}
				if (CS.isNotNull(nextobj.ididx)) {
					if (curobj.ididx != nextobj.ididx &&
						(nextobj.style.backgroundColor == "rgb(0, 255, 255)" 
						|| nextobj.style.backgroundColor == "rgb(255, 255, 0)")) {
						nextobj.style.backgroundColor = "";
					}
				}
			}
		} else {
			if (textflg && CS.isNotNull(offobj[i].inputobj)) {
				nextobj = offobj[i].inputobj;
			} else {
				nextobj = offobj[i][j];
			}
			if (CS.isNotNull(nextobj.ididx)) {
				if (curobj.ididx != nextobj.ididx &&
					(nextobj.style.backgroundColor == "rgb(0, 255, 255)" 
					|| nextobj.style.backgroundColor == "rgb(255, 255, 0)")) {
					nextobj.style.backgroundColor = "";
				}
			}
		}
	}
}
//共通 key down event
CS.commonmousedown_yellow = function(curobj,offobj) {
	var textflg = false;
	if (CS.isNotNull(curobj.type)&&curobj.type =="text") {
		textflg = true;
	}
	if (curobj.style.backgroundColor == "" 
		||curobj.style.backgroundColor == "white" 
		|| curobj.style.backgroundColor == "red"
		|| curobj.style.backgroundColor == "rgb(255, 255, 255)") {
		curobj.style.backgroundColor = "rgb(255,255,0)";
		curobj.readOnly = "";
		curobj.focus();
	}
	
	//reset other object background color
	var nextobj = null;
	for (var i = 0;i < offobj.length;i++) {
		if (offobj[i].length > 0) {
			for (var j = 0;j < offobj[i].length;j++) {
				if (textflg && CS.isNotNull(offobj[i][j].inputobj)) {
					nextobj = offobj[i][j].inputobj;
				} else {
					nextobj = offobj[i][j];
				}
				if (CS.isNotNull(nextobj.ididx)) {
					if (curobj.ididx != nextobj.ididx &&
						(nextobj.style.backgroundColor == "rgb(0, 255, 255)" 
						|| nextobj.style.backgroundColor == "rgb(255, 255, 0)")) {
						nextobj.style.backgroundColor = "";
					}
				}
			}
		} else {
			if (textflg && CS.isNotNull(offobj[i].inputobj)) {
				nextobj = offobj[i].inputobj;
			} else {
				nextobj = offobj[i][j];
			}
			if (CS.isNotNull(nextobj.ididx)) {
				if (curobj.ididx != nextobj.ididx &&
					(nextobj.style.backgroundColor == "rgb(0, 255, 255)" 
					|| nextobj.style.backgroundColor == "rgb(255, 255, 0)")) {
					nextobj.style.backgroundColor = "";
				}
			}
		}
	}
}
CS.easykeydown = function(curobj) {
	//キーイブンット
	var keyCode = event.keyCode;
	switch (keyCode) {
		case 13:
			//Enter key
			if(CS.isNotNull(curobj.nextid) && CS.isNotNull(document.getElementById(curobj.nextid))){
				curobj.style.backgroundColor = "";
				curobj.readonly="true";
				if(document.getElementById(curobj.nextid).type=="text"){
					document.getElementById(curobj.nextid).style.backgroundColor = "rgb(0, 255, 255)";
					document.getElementById(curobj.nextid).readonly="";
				}
				document.getElementById(curobj.nextid).focus();
				document.getElementById(curobj.nextid).select();
				return false;
			}
			break;
		case 37:
			//← key
			if(CS.isNotNull(curobj.afterid) && CS.isNotNull(document.getElementById(curobj.afterid)) && curobj.LRflg){
				curobj.style.backgroundColor = "";
				curobj.readonly="true";
				if(document.getElementById(curobj.afterid).type=="text"){
					document.getElementById(curobj.afterid).style.backgroundColor = "rgb(0, 255, 255)";
					document.getElementById(curobj.afterid).readonly="";
				}
				document.getElementById(curobj.afterid).focus();
				document.getElementById(curobj.afterid).select();
				return false;
			}
			break;
		case 38:
			//↑ key
			if(CS.isNotNull(curobj.afterid) && CS.isNotNull(document.getElementById(curobj.afterid))){
				curobj.style.backgroundColor = "";
				curobj.readonly="true";
				if(document.getElementById(curobj.afterid).type=="text"){
					document.getElementById(curobj.afterid).style.backgroundColor = "rgb(0, 255, 255)";
					document.getElementById(curobj.afterid).readonly="";
				}
				document.getElementById(curobj.afterid).focus();
				document.getElementById(curobj.afterid).select();
				return false;
			}
			break;
		case 39:
			//→ key
			if(CS.isNotNull(curobj.nextid) && CS.isNotNull(document.getElementById(curobj.nextid)) && curobj.LRflg){
				curobj.style.backgroundColor = "";
				curobj.readonly="true";
				if(document.getElementById(curobj.nextid).type=="text"){
					document.getElementById(curobj.nextid).style.backgroundColor = "rgb(0, 255, 255)";
					document.getElementById(curobj.nextid).readonly="";
				}
				document.getElementById(curobj.nextid).focus();
				document.getElementById(curobj.nextid).select();
				return false;
			}
			break;
		case 40:
			//↓ key
			if(CS.isNotNull(curobj.nextid) && CS.isNotNull(document.getElementById(curobj.nextid))){
				curobj.style.backgroundColor = "";
				curobj.readonly="true";
				if(document.getElementById(curobj.nextid).type=="text"){
					document.getElementById(curobj.nextid).style.backgroundColor = "rgb(0, 255, 255)";
					document.getElementById(curobj.nextid).readonly="";
				}
				document.getElementById(curobj.nextid).focus();
				document.getElementById(curobj.nextid).select();
				return false;
			}
			break;
		default :
			break;
	}
	//object type
	var textflg = false;
	if (CS.isNotNull(curobj.type) && curobj.type =="text") {
		textflg = true;
	}
	
	//text枠の場合
	if (CS.isNotNull(curobj.inputobj)) {
		curobj = curobj.inputobj;
		textflg = true;
	}
	
	curobj.focus();
	if(curobj.type=="radio" && keyCode == 32){
		return true;
	}
	//データの編集
	//キーコードに対応するイブンット
	if (keyCode == 46) {
		if (curobj.style.backgroundColor == "rgb(0, 255, 255)") {
			if (textflg) {
				curobj.value = "";
			} else {
				curobj.innerHTML = "";
			}
		}
		return;
	} else if ((keyCode >= 48 && keyCode <= 90)
		|| (keyCode >= 96 && keyCode <= 105)
		|| (keyCode == 27 || keyCode == 32 || keyCode == 110 || keyCode == 109 || keyCode == 189 || keyCode == 190)){
		//numberpadの対応
		if (keyCode >= 96 && keyCode <= 105) {
			keyCode = keyCode - 48;
		}
		var tmpchar = String.fromCharCode(keyCode);
		if (keyCode == 110 || keyCode == 190) {
			tmpchar = ".";
		}
		if (keyCode == 109 || keyCode == 189) {
			tmpchar = "-";
		}
		if (curobj.style.backgroundColor == "rgb(0, 255, 255)"
			|| curobj.style.backgroundColor == "red") {
			curobj.style.backgroundColor = "rgb(255, 255, 0)";
			if (textflg) {
				curobj.readOnly = "";
				curobj.value = tmpchar;
			} else {
				curobj.innerHTML = tmpchar;
			}
		} else if (curobj.style.backgroundColor == "rgb(255, 255, 0)") {
			if (textflg) {
				//curobj.value = tmpchar+curobj.value;
				return true;
			} else {
				curobj.innerHTML = curobj.innerHTML + tmpchar;
			}
		}
	}
	
	if ((keyCode >= 37 && keyCode <= 40)
		|| (keyCode >= 48 && keyCode <= 90)
		|| (keyCode >= 96 && keyCode <= 105)
		|| (keyCode == 27 || keyCode == 32 || keyCode == 110 || keyCode == 109 || keyCode == 189 || keyCode == 190)){
		if ((keyCode >= 37 && keyCode <= 40) 
			&& curobj.style.backgroundColor == "rgb(255, 255, 0)") {
			//
		} else {
			return false;
		}
	}
	if(keyCode==8){
		if(curobj.style.backgroundColor == "rgb(0, 255, 255)"){
			curobj.value="";
			curobj.focus();
			return false;
		}	
	}
	return true;
}
CS.easykeydown_yellow = function(curobj) {
	//キーイブンット
	var keyCode = event.keyCode;
	switch (keyCode) {
		case 13:
			//Enter key
			if(CS.isNotNull(curobj.nextid) && CS.isNotNull(document.getElementById(curobj.nextid))){
				curobj.style.backgroundColor = "";
				//curobj.readonly="true";
				if(document.getElementById(curobj.nextid).type=="text"){
					document.getElementById(curobj.nextid).style.backgroundColor = "rgb(255, 255, 0)";
					//document.getElementById(curobj.nextid).readonly="";
				}
				document.getElementById(curobj.nextid).focus();
				document.getElementById(curobj.nextid).select();
				return false;
			}
			break;
		case 37:
			//← key
			if(CS.isNotNull(curobj.afterid) && CS.isNotNull(document.getElementById(curobj.afterid)) && curobj.LRflg){
				curobj.style.backgroundColor = "";
				//curobj.readonly="true";
				if(document.getElementById(curobj.afterid).type=="text"){
					document.getElementById(curobj.afterid).style.backgroundColor = "rgb(255, 255, 0)";
					//document.getElementById(curobj.afterid).readonly="";
				}
				document.getElementById(curobj.afterid).focus();
				document.getElementById(curobj.afterid).select();
				return false;
			}
			break;
		case 38:
			//↑ key
			if(CS.isNotNull(curobj.afterid) && CS.isNotNull(document.getElementById(curobj.afterid))){
				curobj.style.backgroundColor = "";
				//curobj.readonly="true";
				if(document.getElementById(curobj.afterid).type=="text"){
					document.getElementById(curobj.afterid).style.backgroundColor = "rgb(255, 255, 0)";
					//document.getElementById(curobj.afterid).readonly="";
				}
				document.getElementById(curobj.afterid).focus();
				document.getElementById(curobj.afterid).select();
				return false;
			}
			break;
		case 39:
			//→ key
			if(CS.isNotNull(curobj.nextid) && CS.isNotNull(document.getElementById(curobj.nextid)) && curobj.LRflg){
				curobj.style.backgroundColor = "";
				//curobj.readonly="true";
				if(document.getElementById(curobj.nextid).type=="text"){
					document.getElementById(curobj.nextid).style.backgroundColor = "rgb(255, 255, 0)";
					document.getElementById(curobj.nextid).readonly="";
				}
				document.getElementById(curobj.nextid).focus();
				document.getElementById(curobj.nextid).select();
				return false;
			}
			break;
		case 40:
			//↓ key
			if(CS.isNotNull(curobj.nextid) && CS.isNotNull(document.getElementById(curobj.nextid))){
				curobj.style.backgroundColor = "";
				//curobj.readonly="true";
				if(document.getElementById(curobj.nextid).type=="text"){
					document.getElementById(curobj.nextid).style.backgroundColor = "rgb(255, 255, 0)";
					document.getElementById(curobj.nextid).readonly="";
				}
				document.getElementById(curobj.nextid).focus();
				document.getElementById(curobj.nextid).select();
				return false;
			}
			break;
		default :
			break;
	}
	//object type
	var textflg = false;
	if (CS.isNotNull(curobj.type) && curobj.type =="text") {
		textflg = true;
	}
	
	//text枠の場合
	if (CS.isNotNull(curobj.inputobj)) {
		curobj = curobj.inputobj;
		textflg = true;
	}
	
	curobj.focus();
	if(curobj.type=="radio" && keyCode == 32){
		return true;
	}
	//データの編集
	//キーコードに対応するイブンット
	if (keyCode == 46) {
		if (curobj.style.backgroundColor == "rgb(0, 255, 255)") {
			if (textflg) {
				curobj.value = "";
			} else {
				curobj.innerHTML = "";
			}
		}
		return;
	} else if ((keyCode >= 48 && keyCode <= 90)
		|| (keyCode >= 96 && keyCode <= 105)
		|| (keyCode == 27 || keyCode == 32 || keyCode == 110 || keyCode == 109 || keyCode == 189 || keyCode == 190)){
		//numberpadの対応
		if (keyCode >= 96 && keyCode <= 105) {
			keyCode = keyCode - 48;
		}
		var tmpchar = String.fromCharCode(keyCode);
		if (keyCode == 110 || keyCode == 190) {
			tmpchar = ".";
		}
		if (keyCode == 109 || keyCode == 189) {
			tmpchar = "-";
		}
		if (curobj.style.backgroundColor == "rgb(0, 255, 255)"
			|| curobj.style.backgroundColor == "red") {
			curobj.style.backgroundColor = "rgb(255, 255, 0)";
			if (textflg) {
				curobj.readOnly = "";
				curobj.value = tmpchar;
			} else {
				curobj.innerHTML = tmpchar;
			}
		} else if (curobj.style.backgroundColor == "rgb(255, 255, 0)") {
			if (textflg) {
				//curobj.value = tmpchar+curobj.value;
				return true;
			} else {
				curobj.innerHTML = curobj.innerHTML + tmpchar;
			}
		}
	}
	
	if ((keyCode >= 37 && keyCode <= 40)
		|| (keyCode >= 48 && keyCode <= 90)
		|| (keyCode >= 96 && keyCode <= 105)
		|| (keyCode == 27 || keyCode == 32 || keyCode == 110 || keyCode == 109 || keyCode == 189 || keyCode == 190)){
		if ((keyCode >= 37 && keyCode <= 40) 
			&& curobj.style.backgroundColor == "rgb(255, 255, 0)") {
			//
		} else {
			return false;
		}
	}
	if(keyCode==8){
		if(curobj.style.backgroundColor == "rgb(0, 255, 255)"){
			curobj.value="";
			curobj.focus();
			return false;
		}	
	}
	return true;
}
//共通 key down event
CS.commonkeydown = function(curobj,offobj) {
	var tmpI = "";
	var tmpj = "";
	if (CS.isNotNull(curobj.ididx)) {
		if (curobj.ididx.split(",").length == 1) {
			tmpI = CS.toI(curobj.ididx);
			tmpj = "";
		} else if (curobj.ididx.split(",").length == 2) {
			tmpI = CS.toI(curobj.ididx.split(",")[0]);
			tmpj = CS.toI(curobj.ididx.split(",")[1]);
		}
	}

	//前のオブジェクト
	var preobj = curobj;
	
	//キーイブンット
	var keyCode = event.keyCode;
	switch (keyCode) {
		case 13:
			if(CS.isNotNull(curobj.nextid) && CS.isNotNull(document.getElementById(curobj.nextid))){
				curobj.style.backgroundColor = "";
				curobj.readonly="true";
				document.getElementById(curobj.nextid).style.backgroundColor = "rgb(0, 255, 255)";
				document.getElementById(curobj.nextid).readonly="";
				document.getElementById(curobj.nextid).focus();
				document.getElementById(curobj.nextid).select();
				return true;
			}
			//Enter key
			if (tmpj != "") {
				if (CS.isNotNull(offobj[tmpI+1]) && CS.isNotNull(offobj[tmpI+1][tmpj])) {
					curobj = offobj[tmpI+1][tmpj];
				}
			} else {
				if (CS.isNotNull(offobj[tmpI+1])) {
					curobj = offobj[tmpI+1];
				}
			}

			break;
		case 8:
			if(CS.isNotNull(curobj)&&curobj.style.backgroundColor == "rgb(0, 255, 255)"){
				curobj.value="";
				return false;
			}
			break;
		case 37:
			//← key
			if (tmpj != "") {
				if (CS.isNotNull(offobj[tmpI]) && CS.isNotNull(offobj[tmpI][tmpj-1])) {
					curobj = offobj[tmpI][tmpj-1];
				}
			} else {
				if (CS.isNotNull(offobj[tmpI-1])) {
					curobj = offobj[tmpI-1];
				}
			}
			break;
		case 38:
			//↑ key
			if (tmpj != "") {
				if (CS.isNotNull(offobj[tmpI-1]) && CS.isNotNull(offobj[tmpI-1][tmpj])) {
					curobj = offobj[tmpI-1][tmpj];
				}
			} else {
				if (CS.isNotNull(offobj[tmpI-1])) {
					curobj = offobj[tmpI-1];
				}
			}
			break;
		case 39:
			//→ key
			if (tmpj != "") {
				if (CS.isNotNull(offobj[tmpI]) && CS.isNotNull(offobj[tmpI][tmpj+1])) {
					curobj = offobj[tmpI][tmpj+1];
				}
			} else {
				if (CS.isNotNull(offobj[tmpI+1])) {
					curobj = offobj[tmpI+1];
				}
			}
			break;
		case 40:
			//↓ key
			if (tmpj != "") {
				if (CS.isNotNull(offobj[tmpI+1]) && CS.isNotNull(offobj[tmpI+1][tmpj])) {
					curobj = offobj[tmpI+1][tmpj];
				}
			} else {
				if (CS.isNotNull(offobj[tmpI+1])) {
					curobj = offobj[tmpI+1];
				}
			}
			break;
		default :
			break;
	}
	
	//object type
	var textflg = false;
	if (CS.isNotNull(curobj.type) && curobj.type =="text") {
		textflg = true;
	}
	
	//text枠の場合
	if (CS.isNotNull(curobj.inputobj)) {
		curobj = curobj.inputobj;
		textflg = true;
	}
	
	//次のオブジェクトがないの場合
	if (!CS.isNotNull(curobj.ididx)) {
		curobj = preobj;
	}
	curobj.focus();
	
	//次のオブジェクト
	var nextobj = null;
	
	//reset other object background color
	if (curobj.style.backgroundColor != "silver") {
		for (var i = 0;i < offobj.length;i++) {
			if (offobj[i].length > 0) {
				for (var j = 0;j < offobj[i].length;j++) {
					if (textflg && CS.isNotNull(offobj[i][j].inputobj)) {
						nextobj = offobj[i][j].inputobj;
					} else {
						nextobj = offobj[i][j];
					}
					if (CS.isNotNull(nextobj.ididx)) {
						if (curobj.ididx != nextobj.ididx &&
							(nextobj.style.backgroundColor == "rgb(0, 255, 255)" 
							|| nextobj.style.backgroundColor == "rgb(255, 255, 0)")) {
							nextobj.style.backgroundColor = "";
						}
					}
				}
			} else {
				if (textflg && CS.isNotNull(offobj[i].inputobj)) {
					nextobj = offobj[i].inputobj;
				} else {
					nextobj = offobj[i][j];
				}
				if (CS.isNotNull(nextobj.ididx)) {
					if (curobj.ididx != nextobj.ididx &&
						(nextobj.style.backgroundColor == "rgb(0, 255, 255)" 
						|| nextobj.style.backgroundColor == "rgb(255, 255, 0)")) {
						nextobj.style.backgroundColor = "";
					}
				}
			}
		}
	}
	
	//データの編集
	//キーコードに対応するイブンット
	if (keyCode == 46) {
		if (curobj.style.backgroundColor == "rgb(0, 255, 255)") {
			if (textflg) {
				curobj.value = "";
			} else {
				curobj.innerHTML = "";
			}
		}
		return;
	} else if ((keyCode >= 48 && keyCode <= 90)
		|| (keyCode >= 96 && keyCode <= 105)
		|| (keyCode == 27 || keyCode == 32 || keyCode == 110 || keyCode == 109 || keyCode == 189 || keyCode == 190)){
		//numberpadの対応
		if (keyCode >= 96 && keyCode <= 105) {
			keyCode = keyCode - 48;
		}
		var tmpchar = String.fromCharCode(keyCode);
		if (keyCode == 110 || keyCode == 190) {
			tmpchar = ".";
		}
		if (keyCode == 109 || keyCode == 189) {
			tmpchar = "-";
		}
		if (curobj.style.backgroundColor == "rgb(0, 255, 255)"
			|| curobj.style.backgroundColor == "red") {
			curobj.style.backgroundColor = "rgb(255, 255, 0)";
			if (textflg) {
				curobj.readOnly = "";
				curobj.value = tmpchar;
			} else {
				curobj.innerHTML = tmpchar;
			}
		} else if (curobj.style.backgroundColor == "rgb(255, 255, 0)") {
			if (textflg) {
				//curobj.value = tmpchar+curobj.value;
				return true;
			} else {
				curobj.innerHTML = curobj.innerHTML + tmpchar;
			}
		}
	}
	
	//change current object's background color
	if (keyCode != 46 && preobj != curobj) {
		if (curobj.style.backgroundColor == ""
			|| curobj.style.backgroundColor == "red"
			|| curobj.style.backgroundColor == "rgb(255, 255, 255)") {
			curobj.style.backgroundColor = "rgb(0, 255, 255)";
			if (textflg) {
				curobj.readOnly = "true";
			}
		} else if (curobj.style.backgroundColor == "rgb(0, 255, 255)") {
			curobj.style.backgroundColor = "rgb(255,255,0)";
			if (textflg) {
				curobj.readOnly = "";
			}
		}
	}
	
	if ((keyCode >= 37 && keyCode <= 40)
		|| (keyCode >= 48 && keyCode <= 90)
		|| (keyCode >= 96 && keyCode <= 105)
		|| (keyCode == 27 || keyCode == 32 || keyCode == 110 || keyCode == 109 || keyCode == 189 || keyCode == 190)){
		if ((keyCode >= 37 && keyCode <= 40) 
			&& curobj.style.backgroundColor == "rgb(255, 255, 0)") {
			//
		} else {
			return false;
		}
	}
	return true;
}
CS.TOBLUE_yellow=function(o){
	o.onmousedown = function (e) {
		var curobj = e.currentTarget;
		CS.commonmousedown_yellow(curobj,null);
	}
	o.onkeydown = function (e) {
		var curobj = e.currentTarget;
		if(curobj.id=="login_id" || curobj.id=="password" || curobj.id=="cs_id"){
			if(!CS.eisujiOnly()){
				return false;
			}
		}
		return CS.easykeydown_yellow(curobj,null);
	}
	o.onblur = function (e) {
		var tmpObj = e.currentTarget;
		tmpObj.style.backgroundColor = "";
	}
};
CS.TOBLUE=function(o){
	//mouse down event
	o.onmousedown = function (e) {
		CS.commonmousedown(e.currentTarget,e.currentTarget);
	}
	//key down event
	o.onkeydown = function (e) {
		if(e.currentTarget.id=="login_id" || e.currentTarget.id=="password" || e.currentTarget.id=="cs_id"){
			if(!CS.eisujiOnly()){
				return false;
			}
		}
		return CS.commonkeydown(e.currentTarget,e.currentTarget);
	}
	o.onblur = function (e) {
		var curobj = e.currentTarget;
		curobj.style.backgroundColor = "";
		curobj.readOnly = "true";
		curobj.value = CS.commaToZenkaku(curobj.value);
	}
};

CS.TOBLUENUM=function(o){
	//mouse down event
	o.onmousedown = function (e) {
		CS.commonmousedown(e.currentTarget,e.currentTarget);
	}
	//key down event
	o.onkeydown = function (e) {
		if(CS.numOnly()){
			return CS.commonkeydown(e.currentTarget,e.currentTarget);
		}else{
			return false;
		}
	}
	o.onblur = function (e) {
		var curobj = e.currentTarget;
		if(!CS.isNotNull(curobj.value)||curobj.value==""){
			curobj.value="";
			if(curobj.style.backgroundColor=="rgb(255, 255, 0)"||curobj.style.backgroundColor=="rgb(0, 255, 255)"){
				curobj.style.backgroundColor = "";
			}
			return true;
		}
		curobj.style.backgroundColor = "";
		curobj.readOnly = "true";
		if(CS.isNotNull(curobj.FixedNumber)){
			curobj.value = CS.commaToZenkakuFixed(curobj.value,curobj.FixedNumber);
		}else{
			curobj.value = CS.commaToZenkaku(curobj.value);
		}
	}
};

CS.getByte=function(text)
{
	var count = 0;
	for (var i=0; i<text.length; i++)
	{
		var n = escape(text.charAt(i));
		if (n.length < 4) count++; else count+=2;
	}
	return count;
};
CS.commaToZenkakuFixed=function(text,FixedNumber)
{
	return CS.toFixed(parseFloat(text.replace(/,/g, "")),FixedNumber);
};
CS.commaToZenkaku=function(text)
{
	return text.replace(/,/g, "、");
};
CS.eisujiOnly=function() {
	if((event.keyCode >= 65 && event.keyCode <= 90)
	||(event.keyCode >= 48 && event.keyCode <= 57)
	||(event.keyCode >= 96 && event.keyCode <= 105)
	||(event.keyCode >= 114 && event.keyCode <= 117)
	|| event.keyCode == 109 || event.keyCode == 189
	||(event.keyCode >= 8 && event.keyCode <= 40) 
	|| event.keyCode == 110 || event.keyCode == 190){
		return true;
	}else{
		return false;
	}
}

CS.numOnly=function() {
	if((event.keyCode >= 37 && event.keyCode <= 40)
	|| (event.keyCode >= 48 && event.keyCode <= 57)
	|| (event.keyCode >= 96 && event.keyCode <= 105)
	|| event.keyCode == 109 || event.keyCode == 189
	|| event.keyCode == 8 || event.keyCode == 110 
	|| event.keyCode == 190 || event.keyCode == 46
	|| event.keyCode == 13){
		return true;
	}else{
		return false;
	}
}
CS.toFixed=function(numb,Yi){
	if(!CS.isNotNull(numb) || (typeof numb != "number" && numb=="") || isNaN(parseFloat(numb))){
		return numb;
	}
	return parseFloat(numb).toFixed(Yi);
}
CS.commonenterkey_v2=function(){
	for(var i=0;i<CS.webobjlist.length;i++){
		$("#"+CS.webobjlist[i]).keydown(function(e){
			if(e.keyCode==13){
				for(var i=0;i<CS.webobjlist.length;i++){
					if(e.currentTarget.id==CS.webobjlist[i]){
						if(i==CS.webobjlist.length-1){
							for(var j=0;j<CS.webobjlist.length;j++){
								if($("#"+CS.webobjlist[j]).is(':visible') && !$("#"+CS.webobjlist[j]).attr("disabled")){
									$("#"+CS.webobjlist[j]).focus();
									break;
								}
							}
						}else{
							for(var j=i+1;j<CS.webobjlist.length;j++){
								if($("#"+CS.webobjlist[j]).is(':visible') && !$("#"+CS.webobjlist[j]).attr("disabled")){
									$("#"+CS.webobjlist[j]).focus();
									break;
								}
							}
						}

						break;
					}
				}
			}
		});
	}
}
CS.afterinit=function() {
	CS.afterinitflg==false;
	CS.afterinit.disp = function() {
		if (CS.afterinit.loadObj.readyState == 4 && CS.afterinit.loadObj.status == 200) {
			CS.hikaburu(CS.afterinit.loadObj);
			CS.common_suihei_flg=CS.gettagchi(CS.afterinit.loadObj.responseXML.getElementsByTagName("list")[0],"suihei_flag");
			if(CS.common_suihei_flg==""){
				CS.common_suihei_flg="0";
			}
			CS.common_kenntou_hanni=CS.gettagchi(CS.afterinit.loadObj.responseXML.getElementsByTagName("list")[0],"kenntou_hanni");
			if(CS.common_kenntou_hanni==""){
				CS.common_kenntou_hanni="0";
			}
			CS.common_sekkei_naiyou=CS.gettagchi(CS.afterinit.loadObj.responseXML.getElementsByTagName("list")[0],"sekkei_naiyou");
			if(CS.common_sekkei_naiyou==""){
				CS.common_sekkei_naiyou="0";
			}
			CS.common_kajyuu_flag1=CS.gettagchi(CS.afterinit.loadObj.responseXML.getElementsByTagName("list")[0],"kajyuu_flag1");
			if(CS.common_kajyuu_flag1==""){
				CS.common_kajyuu_flag1="0";
			}
			CS.common_method_id=CS.gettagchi(CS.afterinit.loadObj.responseXML.getElementsByTagName("list")[0],"method_id");
			CS.common_gl_name=CS.gettagchi(CS.afterinit.loadObj.responseXML.getElementsByTagName("list")[0],"gl_name");
			CS.common_other_examination=CS.gettagchi(CS.afterinit.loadObj.responseXML.getElementsByTagName("list")[0],"other_examination");
			CS.common_project_name=CS.gettagchi(CS.afterinit.loadObj.responseXML.getElementsByTagName("list")[0],"project_name");
			CS.common_method_name=CS.gettagchi(CS.afterinit.loadObj.responseXML.getElementsByTagName("list")[0],"method_name");
			CS.afterinitflg=true;
		}
	}
	CS.afterinit.loadObj = createXMLHttpRequest(CS.afterinit.disp);
	CS.kaburu();
	CS.afterinit.loadObj.open("GET", "./boring.php?fun=getsuihei_flag"
								+ "&project_id=" + CS.getcookie("prjId") + "&kouzousyssessionid=" + CS.getcookie("kouzousyssessionid") + "&data=" + Number(new Date), true);
	CS.afterinit.loadObj.send(null);
}
  _uac = {}; // define _uac as a global object
  var ua = window.navigator.userAgent.toLowerCase();
  var ver = window.navigator.appVersion.toLowerCase();
  // check browser version
  _uac.browser = (function(){
      if (ua.indexOf('edge') !== -1) return 'edge';                           // Edge
      else if (ua.indexOf("iemobile") !== -1)      return 'iemobile';         // ieMobile
      else if (ua.indexOf('trident/7') !== -1)     return 'ie11';             // ie11
      else if (ua.indexOf("msie") !== -1 && ua.indexOf('opera') === -1){
          if      (ver.indexOf("msie 6.")  !== -1) return 'ie6';              // ie6
          else if (ver.indexOf("msie 7.")  !== -1) return 'ie7';              // ie7
          else if (ver.indexOf("msie 8.")  !== -1) return 'ie8';              // ie8
          else if (ver.indexOf("msie 9.")  !== -1) return 'ie9';              // ie9
          else if (ver.indexOf("msie 10.") !== -1) return 'ie10';             // ie10
      }
      else if (ua.indexOf('chrome')  !== -1 && ua.indexOf('edge') === -1)   return 'chrome';    // Chrome
      else if (ua.indexOf('safari')  !== -1 && ua.indexOf('chrome') === -1) return 'safari';    // Safari
      else if (ua.indexOf('opera')   !== -1) return 'opera';                  // Opera
      else if (ua.indexOf('firefox') !== -1) return 'firefox';                // FIrefox
      else return 'unknown_browser';
  })();

  // check device
  _uac.device = (function(){
      if(ua.indexOf('iphone') !== -1 || ua.indexOf('ipod') !== -1 ) return 'iphone';
      else if (ua.indexOf('ipad')    !== -1) return 'ipad';
      else if (ua.indexOf('android') !== -1) return 'android';
      else if (ua.indexOf('windows') !== -1 && ua.indexOf('phone') !== -1) return 'windows_phone';
	  else if (ua.indexOf('mac os') !== -1) return 'mac';
      else return '';
  })();

  // check ios version
  _uac.iosVer = (function(){
      if ( /iP(hone|od|ad)/.test( navigator.platform ) ) {
          var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
          var versions = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
          return versions[0];
      }
      else return 0;
  })();

  _uac.isiOS = (_uac.device === 'iphone' || _uac.device === 'iPad');
  _uac.isMobile = (ua.indexOf('mobi') !== -1 || _uac.device === 'iphone' || (_uac.device === 'windows_phone' && ua.indexOf('wpdesktop') === -1) || _uac.device === 'iemobile');
  _uac.isTablet = (_uac.device === 'ipad' || (_uac.device === 'android' && !_uac.isMobile));
  _uac.isTouch  = ('ontouchstart' in window);
  _uac.isModern = !(_uac.browser === 'ie6' || _uac.browser === 'ie7' || _uac.browser === 'ie8' || _uac.browser === 'ie9' || (0 < _uac.iosVer && _uac.iosVer < 8));

  // Set the results as class names of the html
  _uac.addClass = function() {
    var home_class = ' ';
    home_class += (_uac.browser !== '') ? _uac.browser + " " : 'browser-unknown ',
    home_class += (_uac.device  !== '') ? _uac.device + " "  : 'device-unknown ',
    home_class += (_uac.isMobile) ? 'mobile ' : 'desktop ',
    home_class += (_uac.isTouch) ? 'touch '  : 'mouse ',
    home_class += (_uac.isModern) ? 'modern ' : 'old ';

    document.addEventListener('DOMContentLoaded', function() {
      document.documentElement.className += home_class;
    });
  };
  _uac.addClass();
//page初期化した直後の処理
$(document).ready(function() {
    var script = '<script src="./bootstrap-4.0.0-beta.2-dist/js/popper.min.js">';
    $('meta:last').after(script);
	var link = '<link rel="stylesheet" href="./bootstrap-4.0.0-beta.2-dist/css/bootstrap.min.css">';
    $('meta:last').after(link);
	script = '<script src="./bootstrap-4.0.0-beta.2-dist/js/bootstrap.min.js">';
    $('meta:last').after(script);
	link = '<link rel="stylesheet" href="./css/user_ui.css">';
    $('meta:last').after(link);
    $(".container").css("margin-left","initial");
    // style
    var style = '<style type="text/css">#inputError{width: 200px;}</style>';
    $(style).appendTo('head');
	// if(_uac.browser!='chrome'){
		// CS.stoppop=document.createElement("div");
		// CS.stoppop.id="modal";
		// CS.stoppop.onclick=function(e){
			// CS.stoppop.style.display='none';
		// }
		// CS.stoppop.className="modal";
		// var deletestr="";
		// deletestr+='  <div id="stoppop_content" class="modal-content">                                                     ';
		// deletestr+='	<a style="cursor:pointer" onclick="CS.stoppop.style.display=\'none\';" class="modal-close" title="閉じる">X</a>                            ';
		// deletestr+='	<h3>未対応ブラウザ検出</h3>                                                               ';
		// deletestr+='	<div class="modal-area">                                                      ';
		// deletestr+='	 <!-- <a href="http://"><span class="link">&raquo;ダウンロード</span></a><br />--> ';
		// deletestr+='	  <p>このブラウザはシステムに対応していません。<br />Google Chromeでご利用下さい。</p>            ';
		// deletestr+='<a style="cursor:pointer" onclick="CS.stoppop.style.display=\'none\';"><span class="link">OK</span></a>&emsp;&emsp;&emsp;                    ';
		// deletestr+='<!--<a href="#"><span class="link">×CLOSE</span></a>-->                           ';
		// deletestr+='	</div>                                                                        ';
		// deletestr+='  </div>                                                                          ';
		// CS.stoppop.innerHTML=deletestr;
		// document.getElementsByTagName("body").item(0).innerHTML="";
		// document.getElementsByTagName("body").item(0).appendChild(CS.stoppop);
		// CS.stoppop_content=document.getElementById("stoppop_content");
		// CS.stoppop_content.style.transform="translate(0%, -1000%)";
		// setTimeout(function(){CS.stoppop_content.style.transform="translate(0%, 0%)";}, 500);
		// CS.stoppop.style.display="";
		// CS.stoppop.style.height=window.innerHeight+"px";
		// CS.stoppop.style.width=window.innerWidth+"px";
		// CS.stoppop.style.left=$(window).scrollLeft()+"px";
		// CS.stoppop.style.top=$(window).scrollTop()+"px";
		// CS.stoppop_content.style.top=((window.innerHeight-179)/2)+"px";
		// CS.stoppop_content.style.left=((window.innerWidth-430)/2)+"px";
	// }
	$('.logout').css("cursor","pointer");
});
// ユーザの情報を取る
CS.getuserinfo = function() {
    var obj={};
    obj["api_name"]="";
	obj["action"]="getuserinfo";
    $.ajax({
		type: 'POST',
		url: "./apis/login.php",
		data: obj,
		dataType : 'json',
		async: true,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {
	}).done(function (data) {
		if(typeof data["error"] != "undefined"){
			alert("ログインしてください。");
			window.location.href = "./index.html";
		}else{
			if(typeof CS.vueObj != "undefined" && CS.vueObj["user_name"] != "undefined"){
				CS.vueObj["user_name"]=data["user_name"];
			}
		}
	});
}
// ユーザの情報を取る
CS.getuserinfo_sample = function() {
    var obj={};
    obj["api_name"]="";
	obj["action"]="getuserinfo";
    $.ajax({
		type: 'POST',
		url: "./apis/login.php",
		data: obj,
		dataType : 'json',
		async: false,
		scriptCharset: 'utf-8'
	}).fail(function (jqXHR, textStatus, errorThrown) {
	}).done(function (data) {
		CS.vueObj["user_name"]=data["user_name"];
		CS.vueObj["access_key"]=data["access_key"];
	});
}
CS.int2bol=function(o){
	if(typeof o == "undefined" || o==null){
		return false;
	}
	if(CS.toI(o)==1){
		return true;
	}else{
		return false;
	}
}
CS.sleep=function(waitMsec) {
	var startMsec = new Date();
	// 指定ミリ秒間、空ループ。CPUは常にビジー。
	while (new Date() - startMsec < waitMsec);

}

CS.getUrlParameter=function(name) {
	var arg  = new Object;
	url = location.search.substring(1).split('&');

	for(i=0; url[i]; i++) {
		var k = url[i].split('=');
		arg[k[0]] = k[1];
	}
	return arg[name];
}