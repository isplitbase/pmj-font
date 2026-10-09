/*
 * pmjtools2.js
 *   zaiTask編集画面の「openai画像処理」(画像補正・再分析ポップアップ)。
 *   他の tool 系と同じく CS.関数名 に定義する。
 *
 *   読み込み: ikisaki_tool/check_member.php の s13(親画面にもポップアップにも読み込まれる)
 *
 *   ■ 親画面側
 *     CS.itask_list_show_edit_window_openai_image … ボタン。ポップアップ(/?aitask_hosei)を開く
 *     CS.aitask_hosei_get_param                  … ポップアップに画像・タブ等を渡す
 *
 *   ■ ポップアップ側(/?aitask_hosei → 画面は p4x9k2m7q1w8n3r6t5vz.html)
 *     CS.aitask_hosei_start … ikisaki_init.js の URL 判定から呼ばれ、画面(Vue)を作る
 *     流れ: ページ選択 → OpenAI で補正 → 元画像と並べて比較
 *           → ページごとに分析に使う画像(元画像/補正後)を選ぶ → 分析 → 1つの表で確認 → 結果反映
 *
 *   ■ サーバ側
 *     補正 … itask_image_hosei.do   → pmj-door(-real) → pmj-hosei-imges(-real) → OpenAI
 *     分析 … itask_aitext_analyze.do → pmj-door(-real) → pmj-aitext-1(-real)    → Cloud Vision
 *
 *   ※ 補正後の画像はサーバに保存しない(ポップアップの中だけで持つ)。
 *   ※ 結果反映は、手動分析・gemini分析の反映(pmjtools.js の ma_return)の法人の部分を真似ている。
 *      親画面の ma_savepage() と set_kanjo_detail() を呼ぶ。DB に書くのは親画面で保存したとき。
 *   ※ 現在は法人のみ対応(個人は今後)。
 */

//===============================================================
// 親画面側
//===============================================================
CS.pmjtools2_win = null;        // ポップアップの window
CS.pmjtools2_watch = null;      // ポップアップの閉じ監視

//---------------------------------------------------------------
// 親画面のふた(ポップアップを開いている間は親を触らせない)
//   ふたをクリックしたらポップアップを前に出す。
//---------------------------------------------------------------
CS.pmjtools2_lock_show = function (message) {
	CS.pmjtools2_lock_hide();
	var html = ''
		+ '<div id="pmjtools2_lock" style="position:fixed;top:0;left:0;width:100%;height:100%;'
		+ 'background:rgba(0,0,0,0.5);z-index:200000;display:flex;align-items:center;justify-content:center;'
		+ 'cursor:pointer;">'
		+ '<div style="background:#fff;border-radius:6px;padding:20px 28px;text-align:center;'
		+ 'font-size:14px;line-height:1.8;box-shadow:0 2px 12px rgba(0,0,0,0.3);">'
		+ '<div id="pmjtools2_lock_msg"></div>'
		+ '<div style="margin-top:6px;font-size:12px;color:#888;">クリックすると別ウィンドウを前に出します</div>'
		+ '</div></div>';
	$("body").append(html);
	$("#pmjtools2_lock_msg").text(message || "別ウィンドウで操作してください");
	$("#pmjtools2_lock").on("click", function () {
		if (CS.pmjtools2_win && !CS.pmjtools2_win.closed) { CS.pmjtools2_win.focus(); }
	});
};
CS.pmjtools2_lock_hide = function () {
	$("#pmjtools2_lock").off("click").remove();
};
CS.pmjtools2_cleanup = function () {
	if (CS.pmjtools2_watch) { clearInterval(CS.pmjtools2_watch); CS.pmjtools2_watch = null; }
	CS.pmjtools2_lock_hide();
	CS.pmjtools2_win = null;
};

//---------------------------------------------------------------
// openai画像処理(ボタン)
//---------------------------------------------------------------
CS.itask_list_show_edit_window_openai_image = function () {
	var imgs = CS.vueObj.itask_list_show_file_list_now_imgs;
	if (!imgs || imgs.length == 0) {
		alert("画像がありません。");
		return;
	}
	// 現在は法人のみ対応
	var itask_type = (CS.vueObj.itask_list_show_edit_window_itask_type || "") + "";
	if (itask_type.indexOf("houjin") == -1) {
		alert("画像補正・再分析は、現在は法人のみ対応です。");
		return;
	}
	var tab = CS.vueObj.itask_list_show_edit_pana_tag_button_index;
	if (!(tab >= 1 && tab <= 4)) {
		alert("反映先のタブ（借方・貸方・損益計算書・販管費）を開いてから押してください。");
		return;
	}
	if (CS.pmjtools2_win && !CS.pmjtools2_win.closed) {
		CS.pmjtools2_win.focus();
		return;
	}
	var w = Math.min(1400, Math.max(900, screen.availWidth - 120));
	var h = Math.max(600, screen.availHeight - 80);
	var l = Math.max(0, Math.floor((screen.availWidth - w) / 2));
	var t = Math.max(0, Math.floor((screen.availHeight - h) / 2));
	var win = window.open("/?aitask_hosei", "aitask_hosei",
		"width=" + w + ",height=" + h + ",left=" + l + ",top=" + t + ",resizable=yes,scrollbars=yes");
	if (!win) {
		alert("ポップアップがブロックされました。\nこのサイトのポップアップを許可してください。");
		return;
	}
	CS.pmjtools2_win = win;
	CS.pmjtools2_lock_show("別ウィンドウで画像補正・再分析をしています");
	// ポップアップが閉じられたら、親のふたを外す
	CS.pmjtools2_watch = setInterval(function () {
		if (!CS.pmjtools2_win || CS.pmjtools2_win.closed) { CS.pmjtools2_cleanup(); }
	}, 500);
	win.focus();
};

//---------------------------------------------------------------
// ポップアップに渡すもの(ポップアップから呼ばれる)
//   開いた時点のタブに反映する(ポップアップの中ではタブを切り替えない)
//---------------------------------------------------------------
CS.aitask_hosei_get_param = function () {
	return {
		imgs: CS.vueObj.itask_list_show_file_list_now_imgs,
		now_index: CS.vueObj.itask_list_show_file_list_now_imgs_index,
		tab_index: CS.vueObj.itask_list_show_edit_pana_tag_button_index,
		itask_id: CS.vueObj.i_aitask_top_info["itask_id"],
		itask_type: CS.vueObj.itask_list_show_edit_window_itask_type,
		tool_url: CS.ITASK_TOOL_URL
	};
};

//===============================================================
// 共通の小物
//===============================================================

//---------------------------------------------------------------
// 画像の大きさを測る
//---------------------------------------------------------------
CS.pmjtools2_measure = function (src, callback) {
	var im = new Image();
	im.onload = function () { callback(im.naturalWidth || im.width, im.naturalHeight || im.height); };
	im.onerror = function () { callback(0, 0); };
	im.src = src;
};

//---------------------------------------------------------------
// 元画像の縦横比から、補正API に渡す出力サイズを決める
//   モデルが受け付けるのは 1024x1024 / 1024x1536 / 1536x1024 のみ。
//---------------------------------------------------------------
CS.pmjtools2_size_hint = function (w, h) {
	if (!w || !h) { return "1024x1536"; }       // 測れないときは帳票らしい縦長にする
	var r = w / h;
	if (r < 0.9) { return "1024x1536"; }        // 縦長
	if (r > 1.1) { return "1536x1024"; }        // 横長
	return "1024x1024";
};

//---------------------------------------------------------------
// png の data URL を jpeg に変換する(画面側も分析側も jpeg 前提のため)
//---------------------------------------------------------------
CS.pmjtools2_to_jpeg = function (src, callback) {
	var im = new Image();
	im.onload = function () {
		try {
			var cv = document.createElement("canvas");
			cv.width = im.naturalWidth || im.width;
			cv.height = im.naturalHeight || im.height;
			var cx = cv.getContext("2d");
			cx.fillStyle = "#ffffff";
			cx.fillRect(0, 0, cv.width, cv.height);
			cx.drawImage(im, 0, 0);
			callback(cv.toDataURL("image/jpeg", 0.95), cv.width, cv.height);
		} catch (e) {
			callback(null, 0, 0);
		}
	};
	im.onerror = function () { callback(null, 0, 0); };
	im.src = src;
};

CS.pmjtools2_strip_b64 = function (s) {
	return (s + "").replace(/^data:image\/[a-zA-Z]+;base64,/, "");
};

CS.pmjtools2_toI = function (v) {
	if (typeof CS.toI === "function") { return CS.toI(v); }
	var n = parseInt(v, 10);
	return isNaN(n) ? 0 : n;
};

//===============================================================
// 勘定科目の候補探し
//   手動分析(pmjtools.js の CS.itask_list_show_edit_window_map_do_find)を真似たもの。
//   マスタは .do から受け取った m_kanjo_view_list を、画面で持って使う。
//===============================================================
CS.aitask_hosei_kanjo_view = [];     // 今のタブで使う勘定科目(除外リストの分は抜いてある)
CS.aitask_hosei_excodelist = [];

//---------------------------------------------------------------
// マスタを今のタブの分に絞る(手動分析の法人の分け方と同じ)
//   1借方: order2・family<40 / 2貸方: order2・family>=40 / 3損益: order1 / 4販管費: order1・family4
//---------------------------------------------------------------
CS.aitask_hosei_set_kanjo_view = function (list, excodelist, tab) {
	var view = [];
	for (var i = 0; i < list.length; i++) {
		var k = list[i];
		if (excodelist.indexOf(k["m_kanjo_code"]) != -1) { continue; }
		var order = CS.pmjtools2_toI(k["order_code"]);
		var family = CS.pmjtools2_toI(k["family_code"]);
		if (tab == 1 && !(order == 2 && family < 40)) { continue; }
		if (tab == 2 && !(order == 2 && family >= 40)) { continue; }
		if (tab == 3 && !(order == 1)) { continue; }
		if (tab == 4 && !(order == 1 && family == 4)) { continue; }
		view.push(k);
	}
	CS.aitask_hosei_kanjo_view = view;
	CS.aitask_hosei_excodelist = excodelist;
};

CS.aitask_hosei_levenshtein = function (a, b) {
	var matrix = [];
	for (var i = 0; i <= b.length; i++) { matrix[i] = [i]; }
	for (var j = 0; j <= a.length; j++) { matrix[0][j] = j; }
	for (var i = 1; i <= b.length; i++) {
		for (var j = 1; j <= a.length; j++) {
			if (b[i - 1] === a[j - 1]) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
			}
		}
	}
	return matrix[b.length][a.length];
};

//---------------------------------------------------------------
// キーワードから勘定科目の候補を探す(近い順)
//   param: null / "init" / "2_20"(固定資産を先に) / 勘定科目コード(そのコードを先頭に)
//---------------------------------------------------------------
CS.aitask_hosei_find = function (str, param) {
	var view = CS.aitask_hosei_kanjo_view;
	var relist = [];
	str = (str == null) ? "" : (str + "");
	for (var i = 0; i < view.length; i++) {
		if (str == "") {
			relist.push(view[i]);
			continue;
		}
		var arr = Array.from(str);
		var okm = 0;
		for (var j = 0; j < arr.length; j++) {
			if (view[i]["m_kanjo_name"].indexOf(arr[j]) != -1) { okm++; }
		}
		var addflag = false;
		if (arr.length == 1) {
			if (okm > 0) { addflag = true; }
		} else if (arr.length == 2) {
			if (okm == 2) { addflag = true; }
		} else if (arr.length > 2) {
			if (okm / arr.length > 0.6) { addflag = true; }
		}
		view[i]["okm"] = CS.aitask_hosei_levenshtein(str, view[i]["m_kanjo_name"]);
		if (addflag) { relist.push(view[i]); }
	}
	relist.sort(function (a, b) { return (a["okm"] - b["okm"]); });
	var copyrelist = [];

	// 固定資産(family 20 以上)を先に
	if (param != null && param == "2_20") {
		for (var i = 0; i < relist.length; i++) { if (CS.pmjtools2_toI(relist[i]["family_code"]) >= 20) { copyrelist.push(relist[i]); } }
		for (var i = 0; i < relist.length; i++) { if (!(CS.pmjtools2_toI(relist[i]["family_code"]) >= 20)) { copyrelist.push(relist[i]); } }
		relist = copyrelist;
		copyrelist = [];
	}
	// 名前が完全に一致するものを先頭に
	for (var i = 0; i < relist.length; i++) { if (str == relist[i]["m_kanjo_name"]) { copyrelist.push(relist[i]); } }
	for (var i = 0; i < relist.length; i++) { if (str != relist[i]["m_kanjo_name"]) { copyrelist.push(relist[i]); } }
	// 指定したコードを先頭に
	if (param != null && param != "2_20") {
		relist = copyrelist;
		copyrelist = [];
		for (var i = 0; i < relist.length; i++) { if (relist[i]["m_kanjo_code"] == param) { copyrelist.push(relist[i]); } }
		for (var i = 0; i < relist.length; i++) { if (relist[i]["m_kanjo_code"] != param) { copyrelist.push(relist[i]); } }
	}
	return copyrelist;
};

//---------------------------------------------------------------
// 金額を 1,234,567 の形に揃える(手動分析の kingaku_change と同じ)
//---------------------------------------------------------------
CS.aitask_hosei_format_kingaku = function (v) {
	if (v == null) { return ""; }
	var s = (v + "").replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0xFEE0); });
	s = s.replace(/[,，\s]/g, "").replace(/[△▲]/g, "-");
	if (s === "") { return ""; }
	var n = parseInt(s, 10);
	return isNaN(n) ? (v + "") : n.toLocaleString();
};

//---------------------------------------------------------------
// 読み取った行に、勘定科目の候補を付ける
//   手動分析の法人の候補づくり(pmjtools.js 1708 行あたり)を真似たもの:
//   ・借方で固定資産が3回以上続いたら、以降は固定資産を優先
//   ・投資その他の資産のあとの 出資金/リサイクル預託金/長期前払費用 は投資その他に
//   ・雑収入は、前の行が営業外収益(1_6_0_)なら 1_6_0_9_1 を優先
//---------------------------------------------------------------
CS.aitask_hosei_uid_seq = 0;
CS.aitask_hosei_new_uid = function () {
	CS.aitask_hosei_uid_seq++;
	return CS.aitask_hosei_uid_seq;
};

CS.aitask_hosei_make_rows = function (src, tab) {
	var rows = [];
	var koteisu = 0;
	var tousi_sonota_sisan = 0;   // 投資その他の資産
	for (var i = 0; i < src.length; i++) {
		var r = src[i];
		var str = r["val"] || "";
		var list;
		if (koteisu > 2 && tab == 1) {
			list = CS.aitask_hosei_find(str, "2_20");
			if (tousi_sonota_sisan > 0) {
				if (list.length > 0 && list[0]["m_kanjo_name"] == "資金") {
					list[0]["m_kanjo_name"] = "出資金";
				}
				if (list.length > 0 && ["出資金", "リサイクル預託金", "長期前払費用"].indexOf(list[0]["m_kanjo_name"]) != -1) {
					var copyrelist = [];
					for (var o = 0; o < list.length; o++) { if (list[o]["m_kanjo_code"].substr(0, 6) == "2_20_3") { copyrelist.push(list[o]); } }
					for (var o = 0; o < list.length; o++) { if (list[o]["m_kanjo_code"].substr(0, 6) != "2_20_3") { copyrelist.push(list[o]); } }
					list = copyrelist;
				}
			}
		} else {
			list = CS.aitask_hosei_find(str, "init");
		}
		if (list.length > 0 && list[0]["m_kanjo_name"] == "雑収入") {
			var prev = rows.length > 0 ? rows[rows.length - 1].list : [];
			if (prev.length > 0 && prev[0]["m_kanjo_code"].substr(0, 6) == "1_6_0_") {
				list = CS.aitask_hosei_find(str, "1_6_0_9_1");
			}
		}
		if (tab == 1 && list.length > 0 && list[0]["family_code"] == "20") { koteisu++; }
		if (tab == 1 && list.length > 0 && list[0]["m_kanjo_code"].substr(0, 8) == "2_20_3_0") { tousi_sonota_sisan++; }

		rows.push({
			uid: CS.aitask_hosei_new_uid(),   // 並べ替えても行を見分けるための番号(反映には使わない)
			keyword: str,
			list: list,
			index: (list.length > 0) ? 0 : "",
			konki: CS.aitask_hosei_format_kingaku(r["amount_this_year"]),
			zenki: CS.aitask_hosei_format_kingaku(r["amount_pre_year"]),
			page: (r["page"] != null) ? parseInt(r["page"], 10) : -1,
			start_x: r["start_x"] || 0, start_y: r["start_y"] || 0,
			end_x: r["end_x"] || 0, end_y: r["end_y"] || 0
		});
	}
	return rows;
};

//===============================================================
// 確認用: 分析に送った画像をコンソールに出す
//   ブラウザの開発者ツール(F12)→ Console で見る。
//   画像は CRC32(指紋)で見分ける。サーバ側(.do)も受け取った画像の CRC32 を返すので、
//   「画面が送った画像」と「サーバが分析に使った画像」が同じかを突き合わせられる。
//===============================================================
CS.pmjtools2_crc32 = function (str) {
	if (!CS.pmjtools2_crc32_table) {
		var tbl = [];
		for (var n = 0; n < 256; n++) {
			var c = n;
			for (var k = 0; k < 8; k++) { c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); }
			tbl[n] = c >>> 0;
		}
		CS.pmjtools2_crc32_table = tbl;
	}
	var t = CS.pmjtools2_crc32_table, crc = 0xFFFFFFFF;
	for (var i = 0; i < str.length; i++) { crc = t[(crc ^ str.charCodeAt(i)) & 0xFF] ^ (crc >>> 8); }
	return ("00000000" + ((crc ^ 0xFFFFFFFF) >>> 0).toString(16)).slice(-8);
};

CS.aitask_hosei_last_send = [];   // 最後に送った内容(コンソールで CS.aitask_hosei_last_send と打てば見られる)

CS.aitask_hosei_log_send = function (targets, pages) {
	try {
		var map = {};
		for (var i = 0; i < targets.length; i++) { map[targets[i].index + 1] = targets[i]; }
		var list = [];
		for (var i = 0; i < pages.length; i++) {
			var p = pages[i], t = map[p.no];
			var orig = CS.pmjtools2_strip_b64(t.orig);
			var hosei = t.hosei ? CS.pmjtools2_strip_b64(t.hosei) : "";
			var sent = p.image || "";
			list.push({
				"ページ": p.no,
				"画面の選択": t.source,
				"送ったもの": p.source == "hosei" ? "補正後の画像(画面から送信)" : "元画像(サーバの /data/iimgs を使う)",
				"送った画像の大きさ": sent.length,
				"送った画像の指紋": sent ? CS.pmjtools2_crc32(sent) : "-",
				"補正後の画像と同じ": sent ? (sent === hosei) : "-",
				"元画像と同じ": sent ? (sent === orig) : "-",
				"補正後の指紋": hosei ? CS.pmjtools2_crc32(hosei) : "-",
				"元画像の指紋": CS.pmjtools2_crc32(orig)
			});
		}
		CS.aitask_hosei_last_send = list;
		console.group("【画像補正・再分析】分析に送る画像 (" + new Date().toLocaleTimeString() + ")");
		console.table(list);
		// 送った画像の縮小版をコンソールに表示する
		for (var i = 0; i < pages.length; i++) {
			var p = pages[i], t = map[p.no];
			var src = (p.source == "hosei") ? t.hosei : t.orig;
			console.log("%c ", "font-size:1px;padding:110px 78px;background:url(" + src + ") no-repeat center/contain;border:1px solid #999;",
				p.no + " ページ: " + (p.source == "hosei" ? "補正後の画像" : "元画像"));
		}
		console.groupEnd();
	} catch (e) {
		console.log("【画像補正・再分析】送信内容の表示に失敗:", e);
	}
};

CS.aitask_hosei_log_received = function (received) {
	try {
		var sentMap = {};
		for (var i = 0; i < CS.aitask_hosei_last_send.length; i++) {
			sentMap[CS.aitask_hosei_last_send[i]["ページ"]] = CS.aitask_hosei_last_send[i];
		}
		var list = [];
		for (var i = 0; i < received.length; i++) {
			var r = received[i], s = sentMap[r["no"]] || {};
			list.push({
				"ページ": r["no"],
				"サーバが使ったもの": r["source"] == "hosei" ? "補正後の画像(画面から受信)" : "元画像(/data/iimgs)",
				"受け取った画像の大きさ": r["b64_length"],
				"受け取った画像の指紋": r["crc32"],
				"画面が送った指紋と同じ": (r["source"] == "hosei") ? (r["crc32"] === s["送った画像の指紋"]) : "-",
				"画面の元画像と同じ": (r["source"] == "orig") ? (r["crc32"] === s["元画像の指紋"]) : "-",
				"拡大後の大きさ": r["resize_to"] ? r["resize_to"].join("x") : "-"
			});
		}
		console.group("【画像補正・再分析】サーバが受け取った画像");
		console.table(list);
		console.groupEnd();
	} catch (e) {
		console.log("【画像補正・再分析】受信内容の表示に失敗:", e);
	}
};

//===============================================================
// ポップアップ側(/?aitask_hosei)
//===============================================================
CS.aitask_hosei_tab_names = { 1: "借方（総資産）", 2: "貸方（総資本）", 3: "損益計算書", 4: "販管費" };

CS.aitask_hosei_start = function () {
	var op = window.opener;
	if (!op || op.closed || !op.CS || typeof op.CS.aitask_hosei_get_param !== "function") {
		document.getElementById("hoseiApp").removeAttribute("v-cloak");
		document.getElementById("hoseiApp").innerHTML =
			'<div style="padding:60px;text-align:center;">zaiTask の編集画面の「openai画像処理」から開いてください。</div>';
		return;
	}
	var param = op.CS.aitask_hosei_get_param();
	var pages = [];
	for (var i = 0; i < param.imgs.length; i++) {
		pages.push({ orig: param.imgs[i], checked: (i == param.now_index) });
	}

	CS.hoseiVue = new Vue({
		el: "#hoseiApp",
		data: {
			step: "select",            // select → compare → analyze → result
			pages: pages,
			targets: [],               // 処理するページ { index, orig, hosei, source, state, error, info }
			busy: false,
			stack: false,
			rows: [],                  // 分析結果(1つの表) { keyword, list(候補), index(選択), konki, zenki, page, 座標 }
			moveTarget: null,          // 移動で選んだ行
			dragReady: false,          // ⋮⋮ を押している間だけ行をドラッグできる
			dragIndex: null,           // ドラッグ中の行
			dragOverIndex: null,       // 落とす先の行
			dragPos: "",               // 落とす先の行の before(上) / after(下)
			// 結果画面の右側の画像
			sentPages: [],             // 分析に送ったページ { index, no, orig, hosei, used, origW, origH }
			viewerOpen: true,          // 画像の欄を出すか
			viewerPos: 0,              // 表示しているページ(sentPages の何番目か)
			viewerSrc: "orig",         // 表示する画像 orig(元画像) / hosei(補正後)
			zoom: 100,                 // 拡大率(%)。100 で欄の幅に合わせる
			selUid: null,              // クリックで選んだ行(行の uid)
			// 補正のプロンプト(歯車)。このウィンドウを閉じるまでだけ有効で、どこにも保存しない
			customPrompt: "",          // 指定したプロンプト(空なら API の既定プロンプト)
			promptDraft: "",           // 入力中の内容
			promptOpen: false,         // 入力欄を開いているか
			usedPrompt: "",            // 直近の「補正開始」で使ったプロンプト
			closingDate: "",
			allRowsCount: 0,
			elapsed: 0,
			tabIndex: param.tab_index,          // 分析・反映するタブ(比較画面で選べる。初期値は親画面で開いているタブ)
			parentTab: param.tab_index,         // 親画面で開いていたタブ
			tabNames: CS.aitask_hosei_tab_names,
			itaskId: param.itask_id,
			toolUrl: param.tool_url
		},
		computed: {
			selectedCount: function () {
				var n = 0;
				for (var i = 0; i < this.pages.length; i++) { if (this.pages[i].checked) { n++; } }
				return n;
			},
			tabName: function () {
				return CS.aitask_hosei_tab_names[this.tabIndex] || "";
			},
			progressText: function () {
				// 補正するページだけを数える(補正しないページ state=none は数えない)
				var all = 0, done = 0, ng = 0;
				for (var i = 0; i < this.targets.length; i++) {
					var s = this.targets[i].state;
					if (s == "none") { continue; }
					all++;
					if (s == "ok" || s == "error") { done++; }
					if (s == "error") { ng++; }
				}
				var used = "分析に使うページ " + this.usedCount + " 枚";
				if (all == 0) { return used; }
				if (this.busy) { return "補正中 " + done + " / " + all + " ／ " + used; }
				return "補正完了 " + done + " / " + all + (ng ? "（失敗 " + ng + "）" : "") + " ／ " + used;
			},
			usedCount: function () {
				var n = 0;
				for (var i = 0; i < this.targets.length; i++) { if (this.targets[i].source != "none") { n++; } }
				return n;
			},
			promptDraftLen: function () {
				return Array.from(this.promptDraft || "").length;   // 全角も1文字と数える(サーバの mb_strlen と同じ)
			},
			viewerPage: function () {
				return this.sentPages[this.viewerPos] || {};
			},
			viewerImage: function () {
				var p = this.viewerPage;
				return (this.viewerSrc == "hosei" && p.hosei) ? p.hosei : p.orig;
			},
			// 選んだ行を読み取った場所の枠(表示中のページの行だけ)
			//   エンジンの座標は元画像の大きさで返る(補正後の画像も元の大きさに拡大して分析している)ので、
			//   元画像の幅・高さに対する割合にすれば、元画像でも補正後でも同じ計算で枠を置ける
			boxStyle: function () {
				var p = this.viewerPage;
				if (this.selUid === null || !p.origW || !p.origH) { return null; }
				var r = null;
				for (var i = 0; i < this.rows.length; i++) { if (this.rows[i].uid === this.selUid) { r = this.rows[i]; } }
				if (!r || r.page !== p.index) { return null; }
				var sx = +r.start_x, sy = +r.start_y, ex = +r.end_x, ey = +r.end_y;
				if (!(ex > sx && ey > sy)) { return null; }
				var pad = 6;   // 文字に枠が重ならないよう少し広げる
				return {
					left: ((sx - pad) / p.origW * 100) + "%",
					top: ((sy - pad) / p.origH * 100) + "%",
					width: ((ex - sx + pad * 2) / p.origW * 100) + "%",
					height: ((ey - sy + pad * 2) / p.origH * 100) + "%"
				};
			},
			resultInfo: function () {
				var s = this.rows.length + " 行";
				if (this.closingDate) { s = "決算日 " + this.closingDate + " ／ " + s; }
				if (this.elapsed) { s += " ／ " + this.elapsed + " 秒"; }
				return s;
			}
		},
		methods: {
			url: function () {
				return CS.ITASK_TOOL_URL || this.toolUrl;
			},
			closeWindow: function () {
				window.close();
			},

			//----- 1. ページ選択 -----
			checkAll: function (flag) {
				for (var i = 0; i < this.pages.length; i++) { this.pages[i].checked = !!flag; }
			},
			checkNow: function () {
				var now = window.opener.CS.vueObj.itask_list_show_file_list_now_imgs_index;
				for (var i = 0; i < this.pages.length; i++) { this.pages[i].checked = (i == now); }
			},
			// 比較画面には全ページを出す。
			//   選んだページ: 補正する(state=wait)。補正しない場合は元画像で分析に使う
			//   選んでいないページ: 補正しない(state=none)。初期値は「使わない」だが、
			//                       「元画像」を選べば補正したページと一緒に分析に送れる
			makeTargets: function (doHosei) {
				var list = [];
				for (var i = 0; i < this.pages.length; i++) {
					var checked = this.pages[i].checked;
					list.push({ index: i, orig: this.pages[i].orig, hosei: null,
						source: checked ? "orig" : "none",
						state: (checked && doHosei) ? "wait" : "none",
						error: "", info: "" });
				}
				return list;
			},
			skipHosei: function () {
				this.targets = this.makeTargets(false);
				this.usedPrompt = "";
				this.step = "compare";
			},
			startHosei: function () {
				this.targets = this.makeTargets(true);
				this.usedPrompt = this.customPrompt;   // 補正の途中で変えても、この回は同じプロンプトで揃える
				console.log("【画像補正・再分析】補正のプロンプト:", this.usedPrompt ? this.usedPrompt : "(指定なし。API の既定プロンプト)");
				this.step = "compare";
				this.busy = true;
				this.runHosei(0);
			},

			//----- 補正のプロンプト(歯車) -----
			openPrompt: function () {
				this.promptDraft = this.customPrompt;
				this.promptOpen = true;
			},
			closePrompt: function () {
				this.promptOpen = false;
			},
			savePrompt: function () {
				var s = (this.promptDraft || "").trim();
				if (Array.from(s).length > 300) {
					alert("プロンプトは300文字以内にしてください。");
					return;
				}
				this.customPrompt = s;
				this.promptOpen = false;
			},
			backToSelect: function () {
				var has = false;
				for (var i = 0; i < this.targets.length; i++) { if (this.targets[i].hosei) { has = true; } }
				if (has && !confirm("補正した画像は破棄されます。よろしいですか？")) { return; }
				this.targets = [];
				this.step = "select";
			},

			//----- 2. 補正(1枚ずつ) -----
			runHosei: function (pos) {
				var self = this;
				// 補正しないページは飛ばす
				while (pos < this.targets.length && this.targets[pos].state != "wait") { pos++; }
				if (pos >= this.targets.length) { this.busy = false; return; }
				var t = this.targets[pos];
				t.state = "run";
				CS.pmjtools2_measure(t.orig, function (sw, sh) {
					var obj = {};
					obj["action"] = "itask_image_hosei";
					obj["itask_pages_str"] = CS.pmjtools2_strip_b64(t.orig);
					obj["itask_pages_no"] = t.index + 1;
					obj["itask_id"] = self.itaskId;
					// auto のままだと正方形で返ってきて縦横比が壊れるので、近い形を指定する
					obj["size"] = CS.pmjtools2_size_hint(sw, sh);
					// 歯車で指定したプロンプト(無ければ送らず、API の既定プロンプトを使う)
					if (self.usedPrompt) { obj["prompt"] = self.usedPrompt; }
					$.ajax({
						type: "POST", url: self.url(), data: obj, dataType: "json",
						async: true, cache: false, timeout: 900000, scriptCharset: "utf-8"
					}).fail(function (jqXHR, textStatus) {
						t.state = "error";
						t.error = (textStatus == "timeout") ? "時間がかかりすぎたため中断しました。" : "通信に失敗しました。";
						self.runHosei(pos + 1);
					}).done(function (data) {
						if (!data || data["status"] != "OK" || !data["image_base64"]) {
							t.state = "error";
							t.error = (data && (data["error"] || data["message"])) || "原因不明";
							self.runHosei(pos + 1);
							return;
						}
						var mime = data["mime"] || "image/png";
						CS.pmjtools2_to_jpeg("data:" + mime + ";base64," + data["image_base64"], function (jpeg, w, h) {
							if (!jpeg) {
								t.state = "error";
								t.error = "画像を読み込めませんでした。";
							} else {
								t.hosei = jpeg;
								t.source = "hosei";
								t.state = "ok";
								t.info = w + "×" + h + (data["elapsed"] ? " ／ " + data["elapsed"] + " 秒" : "");
							}
							self.runHosei(pos + 1);
						});
					});
				});
			},

			//----- 3. 分析 -----
			startAnalyze: function () {
				var self = this;
				var pages = [];
				for (var i = 0; i < this.targets.length; i++) {
					var t = this.targets[i];
					if (t.source == "none") { continue; }          // 「使わない」は送らない
					var p = { no: t.index + 1, source: (t.source == "hosei" && t.hosei) ? "hosei" : "orig" };
					if (p.source == "hosei") { p.image = CS.pmjtools2_strip_b64(t.hosei); }
					pages.push(p);
				}
				if (pages.length == 0) { alert("分析に使うページを1つ以上選んでください（元画像または補正後）。"); return; }
				// 確認用: どの画像を送ったかをコンソールに出す
				CS.aitask_hosei_log_send(this.targets, pages);
				// 結果画面の右側に出す画像(送ったページの元画像と補正後)
				var sent = [];
				for (var i = 0; i < this.targets.length; i++) {
					var t = this.targets[i];
					if (t.source == "none") { continue; }
					sent.push({ index: t.index, no: t.index + 1, orig: t.orig, hosei: t.hosei,
						used: (t.source == "hosei" && t.hosei) ? "hosei" : "orig", origW: 0, origH: 0 });
				}
				this.sentPages = sent;
				this.viewerPos = 0;
				this.viewerSrc = "orig";
				this.zoom = 100;
				this.selUid = null;
				sent.forEach(function (p) {
					CS.pmjtools2_measure(p.orig, function (w, h) { p.origW = w; p.origH = h; });
				});
				var obj = {};
				obj["action"] = "itask_aitext_analyze";
				obj["itask_id"] = this.itaskId;
				obj["tab_index"] = this.tabIndex;
				obj["document_judgment_flag"] = "houjin";
				obj["pages"] = JSON.stringify(pages);
				this.step = "analyze";
				$.ajax({
					type: "POST", url: self.url(), data: obj, dataType: "json",
					async: true, cache: false, timeout: 1200000, scriptCharset: "utf-8"
				}).fail(function (jqXHR, textStatus) {
					self.step = "compare";
					alert(textStatus == "timeout" ? "分析に時間がかかりすぎたため中断しました。" : "通信に失敗しました。");
				}).done(function (data) {
					if (!data || data["status"] != "OK") {
						self.step = "compare";
						alert("分析に失敗しました。\n\n" + ((data && (data["error"] || data["message"])) || "原因不明"));
						return;
					}
					// 確認用: サーバが実際に受け取った画像をコンソールに出す
					CS.aitask_hosei_log_received(data["received"] || []);
					self.setResult(data);
					self.step = "result";
				});
			},
			setResult: function (data) {
				// マスタ(m_kanjo_view_list)を画面で持ち、今のタブの分に絞ってから候補を探す
				CS.aitask_hosei_set_kanjo_view(data["m_kanjo_view_list"] || [], data["excodelist"] || [], this.tabIndex);
				this.rows = CS.aitask_hosei_make_rows(data["rows"] || [], this.tabIndex);
				this.moveTarget = null;
				this.closingDate = data["closing_date"] || "";
				this.allRowsCount = data["all_rows_count"] || 0;
				this.elapsed = data["elapsed"] || 0;
			},
			backToCompare: function () {
				this.step = "compare";
			},

			//----- 表の操作(手動分析のステップDと同じ) -----
			optionLabel: function (o) {
				return "(" + o["goukei"] + ")" + o["m_kanjo_name"] + "@" + o["species_name"] + "@" + o["genus_name"] + "[" + o["m_kanjo_code"] + "]";
			},
			// キーワードを変えたら候補を探し直す(空にすると全科目)
			keywordChange: function (i) {
				var r = this.rows[i];
				r.list = CS.aitask_hosei_find(r.keyword, null);
				r.index = (r.list.length > 0) ? 0 : "";
			},
			kingakuChange: function (i, key) {
				this.rows[i][key] = CS.aitask_hosei_format_kingaku(this.rows[i][key]);
			},
			emptyRow: function () {
				return { uid: CS.aitask_hosei_new_uid(), keyword: "", list: CS.aitask_hosei_find("", null), index: "", konki: "", zenki: "",
					page: -1, start_x: 0, start_y: 0, end_x: 0, end_y: 0 };
			},
			addUp: function (i) {
				this.rows.splice(i, 0, this.emptyRow());
			},
			addDown: function (i) {
				this.rows.splice(i + 1, 0, this.emptyRow());
			},
			deleteRow: function (i) {
				if (this.rows.length == 1) {
					alert("最低限1行が必要です");
					return;
				}
				this.rows.splice(i, 1);
			},
			// 移動: ▶ で動かす行を選び、行き先の行の ▲(上へ) / ▼(下へ) を押す
			getTarget: function (i) {
				this.moveTarget = i;
			},
			setTarget: function (i, updw) {
				var from = this.moveTarget, to = i;
				if (from > to && updw == "dw") { to = i + 1; }
				if (from < to && updw == "up") { to = i - 1; }
				if (from != null && from >= 0 && from < this.rows.length && to >= 0 && to < this.rows.length) {
					var el = this.rows.splice(from, 1)[0];
					this.rows.splice(to, 0, el);
				}
				this.moveTarget = null;
			},

			//----- 右側の画像 -----
			// 行をクリックしたら、その行のページを表示し、読み取った場所を枠で囲んでそこまでスクロール
			selectRow: function (i) {
				var r = this.rows[i];
				if (!r) { return; }
				this.selUid = r.uid;
				for (var k = 0; k < this.sentPages.length; k++) {
					if (this.sentPages[k].index === r.page) { this.viewerPos = k; }
				}
				var self = this;
				this.$nextTick(function () {
					var box = self.$refs.box, body = self.$refs.viewerBody;
					if (!box || !body) { return; }
					var b = box.getBoundingClientRect(), v = body.getBoundingClientRect();
					body.scrollTop += (b.top - v.top) - (v.height / 2 - b.height / 2);
					body.scrollLeft += (b.left - v.left) - (v.width / 2 - b.width / 2);
				});
			},
			zoomBy: function (d) {
				this.zoom = Math.max(50, Math.min(400, this.zoom + d));
			},

			// ドラッグ移動: 左端の ⋮⋮ をつかんで、行き先の行の上半分/下半分に落とす
			//   反映時の並び順(sort)は表の上から順に付け直すので、番号がずれることはない
			onDragStart: function (i, ev) {
				if (!this.dragReady) { ev.preventDefault(); return; }
				this.dragIndex = i;
				this.moveTarget = null;
				try {
					ev.dataTransfer.effectAllowed = "move";
					ev.dataTransfer.setData("text/plain", String(i));   // Firefox はこれが無いとドラッグが始まらない
				} catch (e) { }
			},
			onDragOver: function (i, ev) {
				if (this.dragIndex === null) { return; }
				var rect = ev.currentTarget.getBoundingClientRect();
				this.dragOverIndex = i;
				this.dragPos = (ev.clientY < rect.top + rect.height / 2) ? "before" : "after";
			},
			onDrop: function (i) {
				var from = this.dragIndex;
				if (from !== null && from !== i) {
					var to = (this.dragPos == "after") ? i + 1 : i;
					if (from < to) { to--; }               // 先に取り出すぶん、後ろの位置が1つ前にずれる
					var el = this.rows.splice(from, 1)[0];
					this.rows.splice(to, 0, el);
				}
				this.onDragEnd();
			},
			onDragEnd: function () {
				this.dragIndex = null;
				this.dragOverIndex = null;
				this.dragPos = "";
				this.dragReady = false;
			},

			//----- 4. 結果反映 -----
			//   pmjtools.js の CS.itask_list_show_edit_window_ma_return(法人の部分)を真似たもの。
			//   今のタブの行を全部消して、この表のチェックした行を後ろに足す。
			applyResult: function () {
				var op = window.opener;
				if (!op || op.closed || !op.CS || !op.CS.vueObj) {
					alert("親画面が閉じられています。");
					return;
				}
				var tab = this.tabIndex;
				var use = [];
				var noSel = 0;
				for (var i = 0; i < this.rows.length; i++) {
					var r = this.rows[i];
					var kinfo = (r.index !== "" && r.list[r.index]) ? r.list[r.index] : null;
					if (!kinfo) { noSel++; continue; }
					use.push({ row: r, kinfo: kinfo });
				}
				// 手動分析の結果反映と同じ確認
				if (noSel > 0 && !confirm("勘定科目が選択されていない項目を保存しなくてもよろしいでしょうか？")) {
					return;
				}
				if (use.length == 0) {
					alert("反映する行がありません。");
					return;
				}
				var tabNote = (op.CS.vueObj.itask_list_show_edit_pana_tag_button_index != tab)
					? "\n親画面のタブも「" + this.tabName + "」に切り替わります。" : "";
				if (!confirm("親画面の「" + this.tabName + "」の行を、この表の " + use.length + " 行で置き換えます。よろしいですか？" + tabNote + "\n（親画面で保存するまでは DB には書き込まれません）")) {
					return;
				}

				// 親画面のタブを、分析したタブに合わせる。
				//   ma_savepage / set_kanjo_detail は親画面で開いているタブを前提に動くため。
				//   親画面でタブをクリックしたときと同じ処理(change_tab)を呼ぶ
				if (op.CS.vueObj.itask_list_show_edit_pana_tag_button_index != tab) {
					op.CS.itask_list_show_edit_window_change_tab(tab);
				}

				// タブとページの紐付け(既存の反映と同じく、先に呼ぶ)
				op.CS.itask_list_show_edit_window_ma_savepage();

				var kanjo_detail = JSON.parse(JSON.stringify(op.CS.vueObj.kanjo_detail));
				var delete_list = [];
				// 元リストから今のタブの行を消す
				for (var i = kanjo_detail.length - 1; i >= 0; i--) {
					var k = kanjo_detail[i];
					var hit = false;
					if (tab == 1 && k["order"] == 2 && parseInt(k["family"], 10) < 40) { hit = true; }
					if (tab == 2 && k["order"] == 2 && parseInt(k["family"], 10) >= 40) { hit = true; }
					if (tab == 3 && k["order"] == 1 && typeof k["tabindex"] != "undefined" && parseInt(k["tabindex"], 10) != 4) { hit = true; }
					if (tab == 4 && k["order"] == 1 && typeof k["tabindex"] != "undefined" && parseInt(k["tabindex"], 10) == 4) { hit = true; }
					if (!hit) { continue; }
					if (k["kanjo_info_id"] != null && k["kanjo_info_id"] != "") {
						delete_list.push(k["kanjo_info_id"]);
					}
					kanjo_detail.splice(i, 1);
				}
				// 新しいリストを後ろに足す
				for (var i = 0; i < use.length; i++) {
					var r = use[i].row, kinfo = use[i].kinfo;
					var kanjo = {};
					kanjo["m_kanjo_code"] = kinfo["m_kanjo_code"];
					kanjo["order"] = kinfo["order_code"];
					kanjo["m_kanjo_id"] = kinfo["m_kanjo_code"];
					kanjo["family"] = kinfo["family_code"];
					kanjo["family_name"] = kinfo["family_name"];
					kanjo["genus"] = kinfo["genus_code"];
					kanjo["genus_name"] = kinfo["genus_name"];
					kanjo["species"] = kinfo["species_code"];
					kanjo["species_name"] = kinfo["species_name"];
					kanjo["variety"] = CS.pmjtools2_toI(kinfo["variety"]);
					kanjo["variety_name"] = kinfo["m_kanjo_name"];
					kanjo["property"] = CS.pmjtools2_toI(kinfo["property"]);
					kanjo["abc_flag"] = CS.pmjtools2_toI(kinfo["abc_flag"]);
					kanjo["sort"] = i;
					kanjo["candidate_select_list"] = [];
					kanjo["addflag"] = true;
					kanjo["amount_this_year"] = r.konki;
					kanjo["amount_pre_year"] = r.zenki;
					kanjo["kenzankaijyo"] = false;
					kanjo["koteiitem"] = "NN";
					kanjo["koteiitemflag"] = false;
					kanjo["tabindex"] = tab;
					kanjo["page"] = (r.page >= 0) ? r.page : -1;
					kanjo["start_x"] = r.start_x || 0;
					kanjo["start_y"] = r.start_y || 0;
					kanjo["end_x"] = r.end_x || 0;
					kanjo["end_y"] = r.end_y || 0;
					kanjo_detail.push(kanjo);
				}
				op.CS.set_kanjo_detail(kanjo_detail, delete_list);
				window.close();
			}
		}
	});
};

//===============================================================
// 親画面(zaiTask編集)の右の画像ビュー(#itask_list_show_edit_window_imgtank)のマウス操作
//   ・ホイール      … 拡大縮小(上で拡大、下で縮小。マウスの下の場所を中心に)
//   ・左ボタンで引く … 画像を動かす
//   既存の HTML・JS には手を入れず、ここで document にイベントを足すだけ。
//   拡大縮小は倍率バーと同じ処理(CS.itask_list_show_edit_window_table_zoom_change)を呼ぶので、
//   倍率バーの数字も一緒に動き、赤枠(読み取り位置)の位置もずれない。
//   手動分析中(キャンバスで四角を描いている間)は、その操作とぶつかるので何もしない。
//===============================================================
CS.pmjtools2_viewer_init = function () {
	if (CS.pmjtools2_viewer_inited) { return; }
	CS.pmjtools2_viewer_inited = true;

	var TANK = "#itask_list_show_edit_window_imgtank";
	var ZOOM_STEP = 5;                 // ホイール1目盛りで倍率バーを動かす量(倍率バーは 0〜100)
	var drag = null;
	var wheelAcc = 0;                  // タッチパッドの細かい動きを貯める(マウスの1目盛り分で1段階)

	function tankOf(el) {
		return (el && el.closest) ? el.closest(TANK) : null;
	}
	// 使ってよい状態か(親画面で、手動分析中でないこと)
	function enabled() {
		var v = CS.vueObj;
		if (!v || typeof v.itask_list_show_edit_window_table_zoom === "undefined") { return false; }
		if (typeof CS.itask_list_show_edit_window_table_zoom_change !== "function") { return false; }
		if (v.itask_list_show_edit_window_map_flag !== -1) { return false; }   // 手動分析中
		return true;
	}
	function imgOf(tank) {
		return tank.querySelector("#itask_list_show_edit_window_img");
	}

	// ホイールで拡大縮小
	document.addEventListener("wheel", function (e) {
		var tank = tankOf(e.target);
		if (!tank || !enabled()) { return; }
		var img = imgOf(tank);
		if (!img) { return; }
		e.preventDefault();
		// 行単位・ページ単位で来る場合も、だいたいの画素数にそろえる
		var dy = e.deltaY * (e.deltaMode === 1 ? 33 : (e.deltaMode === 2 ? 400 : 1));
		wheelAcc += dy;
		if (Math.abs(wheelAcc) < 50) { return; }      // まだ1目盛り分に足りない
		var dir = (wheelAcc < 0) ? 1 : -1;
		wheelAcc = 0;
		var cur = CS.toI(CS.vueObj.itask_list_show_edit_window_table_zoom);
		var next = Math.max(0, Math.min(100, cur + dir * ZOOM_STEP));
		if (next === cur) { return; }
		var rect = tank.getBoundingClientRect();
		var mx = e.clientX - rect.left, my = e.clientY - rect.top;
		var sl = tank.scrollLeft, st = tank.scrollTop;
		var ow = img.offsetWidth;
		CS.vueObj.itask_list_show_edit_window_table_zoom = next;
		CS.itask_list_show_edit_window_table_zoom_change();      // 倍率バーと同じ処理
		var k = ow ? img.offsetWidth / ow : 1;
		// マウスの下にあった場所が、拡大縮小のあとも同じ位置に来るようにスクロールを合わせる
		tank.scrollLeft = (sl + mx) * k - mx;
		tank.scrollTop = (st + my) * k - my;
	}, { passive: false });

	// 左ボタンで引いて動かす
	document.addEventListener("mousedown", function (e) {
		if (e.button !== 0) { return; }
		var tank = tankOf(e.target);
		if (!tank || !enabled()) { return; }
		// スクロールバーの上を押したときは、今までどおりスクロールバーの操作にする
		var rect = tank.getBoundingClientRect();
		if (e.clientX - rect.left >= tank.clientWidth || e.clientY - rect.top >= tank.clientHeight) { return; }
		drag = { tank: tank, x: e.clientX, y: e.clientY, sl: tank.scrollLeft, st: tank.scrollTop };
		tank.style.cursor = "grabbing";
		e.preventDefault();                                       // 文字の選択・画像のドラッグを始めない
	});
	document.addEventListener("mousemove", function (e) {
		if (drag) {
			drag.tank.scrollLeft = drag.sl - (e.clientX - drag.x);
			drag.tank.scrollTop = drag.st - (e.clientY - drag.y);
			return;
		}
		// 動かせる場所では手の形のカーソルにする
		var tank = tankOf(e.target);
		if (tank) { tank.style.cursor = enabled() ? "grab" : ""; }
	});
	document.addEventListener("mouseup", function () {
		if (!drag) { return; }
		drag.tank.style.cursor = enabled() ? "grab" : "";
		drag = null;
	});
	// ブラウザ標準の「画像をつかんでドラッグ」を止める(つかんで動かす操作とぶつかるため)
	document.addEventListener("dragstart", function (e) {
		if (tankOf(e.target) && enabled()) { e.preventDefault(); }
	});

	// 画像の箱の高さに上限を付ける(決算書の画面の箱 class="jXGpVWJC" だけ)
	//   style.css で height:auto !important になっていて、拡大すると箱ごと縦に伸びるため、
	//   縦のスクロールバーが出ず、上下に動かせない。箱の上端から画面の下端までを上限にする。
	//   ・style.css は他の画面と共有しているので変えず、この箱の style にだけ付ける
	//   ・手動分析中は、四角を描く操作に影響しないよう上限を外す
	//   ・もう一方の画面(項目一覧)の箱には付けない(ページ全体をスクロールする既存の処理があるため)
	function fitHeight() {
		var tanks = document.querySelectorAll(TANK + ".jXGpVWJC");
		for (var i = 0; i < tanks.length; i++) {
			var tank = tanks[i];
			if (!enabled() || tank.offsetParent === null) {          // 手動分析中・非表示のとき
				if (tank.style.getPropertyValue("max-height")) { tank.style.removeProperty("max-height"); }
				continue;
			}
			var top = tank.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
			var h = Math.max(300, Math.floor(window.innerHeight - top - 16));   // 16 = 下の余白
			if (tank.style.getPropertyValue("max-height") !== h + "px") {
				tank.style.setProperty("max-height", h + "px", "important");
			}
		}
	}
	window.addEventListener("resize", fitHeight);
	setInterval(fitHeight, 1000);     // 画面の切り替え(Vue の描き直し)や手動分析の開始・終了に追従する
	fitHeight();
};
CS.pmjtools2_viewer_init();

//===============================================================
// 親画面(zaiTask編集)左の「項目の編集」パネル(法人)の行を、マウスで上下に移動する
//   ・各行の「移動」列(▲▼)の右につかむ印(fa-grip-vertical)を付け、それをつかんで落とした位置へ行を移す
//   ・既存の HTML・JS には手を入れず、ここで document にイベントを足すだけ(画像ビューと同じやり方)
//   ・並びは CS.vueObj.kanjo_detail の順番そのもの。移したあとは ▲▼ と同じく
//     CS.itask_list_show_edit_pana_resort_kanjo_detail() で分類セルの結合と検算をやり直す
//   ・DB への反映は ▲▼ と同じく「保存」時(サーバが配列の順番で sort を振る)
//   ・分類をまたいだ移動は ▲▼ と同じく許す
//===============================================================
CS.pmjtools2_rowdnd_init = function () {
	if (CS.pmjtools2_rowdnd_inited) { return; }
	CS.pmjtools2_rowdnd_inited = true;

	var TBODY = 'div.HdJuNQCi[text="法人の場合"] tbody.AhxDWewm';
	var drag = null;          // { item, fromK, tbody }
	var dropPos = -1;         // 落とす位置(表示中の行の何番目の前か。行数と同じなら最後)
	var line = null;          // 落とす位置を示す線

	// 見た目
	var st = document.createElement("style");
	st.textContent =
		".pt2-grip{flex:0 0 10px;width:10px;cursor:grab;color:#999;font-size:11px;text-align:center;padding-right:2px;user-select:none;line-height:1;}" +
		".pt2-grip:hover{color:rgb(66,133,244);}" +
		".pt2-dropline{position:fixed;height:3px;background:rgb(66,133,244);z-index:99999;pointer-events:none;display:none;border-radius:2px;}" +
		".pt2-flash{position:fixed;background:rgba(66,133,244,.25);z-index:99998;pointer-events:none;transition:opacity .6s;}";
	document.head.appendChild(st);

	function tbodyOf(el) {
		return (el && el.closest) ? el.closest(TBODY) : null;
	}
	// 今のタブで表示している行が kanjo_detail の何番目か(HTML の v-if と同じ条件)
	function visibleIndexes() {
		var v = CS.vueObj, tab = v.itask_list_show_edit_pana_tag_button_index, list = [];
		for (var i = 0; i < v.kanjo_detail.length; i++) {
			var it = v.kanjo_detail[i];
			var fam = parseInt(it.family, 10), ti = parseInt(it.tabindex, 10);
			if ((tab == 1 && it.order == '2' && fam < 40) ||
				(tab == 2 && it.order == '2' && fam >= 40) ||
				(tab == 3 && it.order == '1' && ti != 4) ||
				(tab == 4 && it.order == '1' && ti == 4)) {
				list.push(i);
			}
		}
		return list;
	}
	function rowsOf(tbody) {
		var rows = [];
		for (var i = 0; i < tbody.children.length; i++) {
			if (tbody.children[i].tagName === "TR") { rows.push(tbody.children[i]); }
		}
		return rows;
	}
	// 行の中の勘定科目のリンク(id="itask_list_show_edit_pana_kanjyo_番号")から番号を読む
	function indexOfRow(tr) {
		var a = tr.querySelector('[id^="itask_list_show_edit_pana_kanjyo_"]');
		return a ? parseInt(a.id.replace("itask_list_show_edit_pana_kanjyo_", ""), 10) : null;
	}
	// 移動してよい状態か
	function enabled() {
		var v = CS.vueObj;
		if (!v || !v.kanjo_detail || typeof CS.itask_list_show_edit_pana_resort_kanjo_detail !== "function") { return false; }
		if (v.itask_list_show_edit_pana_houjin_input_show) { return false; }     // 簡易入力中
		return true;
	}
	// 編集中の行があると、入力欄の番号がずれるので動かさない
	function editing() {
		var d = CS.vueObj.kanjo_detail;
		for (var i = 0; i < d.length; i++) {
			if (d[i].edit0 || d[i].edit1 || d[i].candidate_select_list_showflag) { return true; }
		}
		return false;
	}

	// つかむ印を付ける(Vue が行を作り直すと消えるので、繰り返し確認して足す)
	function ensureGrips() {
		var tbodies = document.querySelectorAll(TBODY);
		for (var b = 0; b < tbodies.length; b++) {
			var rows = rowsOf(tbodies[b]);
			for (var r = 0; r < rows.length; r++) {
				var td = rows[r].lastElementChild;                  // 「移動」列
				var box = td ? td.querySelector(".iTWRbtNa") : null;
				if (!box || box.querySelector(".pt2-grip")) { continue; }
				var g = document.createElement("span");
				g.className = "pt2-grip";
				g.innerHTML = '<i class="fas fa-grip-vertical"></i>';
				g.title = "ドラッグで移動";
				g.setAttribute("draggable", "true");
				box.appendChild(g);
			}
		}
	}

	function showLine(tbody, rows, pos) {
		if (!line) {
			line = document.createElement("div");
			line.className = "pt2-dropline";
			document.body.appendChild(line);
		}
		var tb = tbody.getBoundingClientRect();
		var y = (pos < rows.length) ? rows[pos].getBoundingClientRect().top : rows[rows.length - 1].getBoundingClientRect().bottom;
		line.style.left = tb.left + "px";
		line.style.width = tb.width + "px";
		line.style.top = (y - 1) + "px";
		line.style.display = "block";
	}
	function hideLine() {
		if (line) { line.style.display = "none"; }
	}
	function flash(tr) {
		var r = tr.getBoundingClientRect();
		var f = document.createElement("div");
		f.className = "pt2-flash";
		f.style.left = r.left + "px"; f.style.top = r.top + "px";
		f.style.width = r.width + "px"; f.style.height = r.height + "px";
		document.body.appendChild(f);
		setTimeout(function () { f.style.opacity = "0"; }, 300);
		setTimeout(function () { if (f.parentNode) { f.parentNode.removeChild(f); } }, 1000);
	}
	// マウスの高さから、何番目の行の前に落とすかを決める
	//   (大分類などのセルは複数行にまたがるので、マウスの下の要素ではなく高さで判断する)
	function posAt(rows, y) {
		var p = 0;
		for (var i = 0; i < rows.length; i++) {
			var r = rows[i].getBoundingClientRect();
			if (y > r.top + r.height / 2) { p = i + 1; }
		}
		return p;
	}

	document.addEventListener("mouseover", function (e) {
		if (tbodyOf(e.target)) { ensureGrips(); }
	});
	setInterval(ensureGrips, 1000);

	document.addEventListener("dragstart", function (e) {
		var g = (e.target && e.target.closest) ? e.target.closest(".pt2-grip") : null;
		if (!g) { return; }
		var tbody = tbodyOf(g), tr = g.closest("tr");
		if (!tbody || !tr || !enabled() || editing()) { e.preventDefault(); return; }
		var rows = rowsOf(tbody), vis = visibleIndexes();
		var k = rows.indexOf(tr);
		// 画面の行と配列の対応がずれていたら何もしない(安全のため)
		if (k < 0 || rows.length !== vis.length || indexOfRow(tr) !== vis[k]) {
			console.warn("[pmjtools2] 行の対応が取れないため移動しません", { k: k, rows: rows.length, vis: vis.length });
			e.preventDefault();
			return;
		}
		drag = { item: CS.vueObj.kanjo_detail[vis[k]], fromK: k, tbody: tbody };
		dropPos = -1;
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", "");                 // Firefox はこれが無いとドラッグが始まらない
		var r = tr.getBoundingClientRect();
		e.dataTransfer.setDragImage(tr, e.clientX - r.left, e.clientY - r.top);
	});
	document.addEventListener("dragover", function (e) {
		if (!drag) { return; }
		if (tbodyOf(e.target) !== drag.tbody) { hideLine(); dropPos = -1; return; }
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
		var rows = rowsOf(drag.tbody);
		var p = posAt(rows, e.clientY);
		// 今の位置のすぐ上・すぐ下は動かないのと同じなので線を出さない
		if (p === drag.fromK || p === drag.fromK + 1) { hideLine(); dropPos = -1; return; }
		dropPos = p;
		showLine(drag.tbody, rows, p);
	});
	document.addEventListener("drop", function (e) {
		if (!drag) { return; }
		e.preventDefault();
		var d = drag, p = dropPos;
		drag = null; dropPos = -1; hideLine();
		if (p < 0) { return; }
		var list = CS.vueObj.kanjo_detail, vis = visibleIndexes();
		var from = list.indexOf(d.item);
		if (from < 0 || !vis.length) { return; }
		// 落とす先: 表示中の p 番目の行の前(最後なら最後の行の後ろ)
		var to = (p < vis.length) ? vis[p] : vis[vis.length - 1] + 1;
		list.splice(from, 1);
		if (from < to) { to--; }
		list.splice(to, 0, d.item);
		CS.itask_list_show_edit_pana_resort_kanjo_detail();      // ▲▼ と同じ後処理
		// 移した行を一瞬光らせる
		CS.vueObj.$nextTick(function () {
			var tbody = document.querySelector(TBODY);
			if (!tbody) { return; }
			var k = visibleIndexes().indexOf(CS.vueObj.kanjo_detail.indexOf(d.item));
			var rows = rowsOf(tbody);
			if (k >= 0 && rows[k]) { flash(rows[k]); }
		});
	});
	document.addEventListener("dragend", function () {
		drag = null; dropPos = -1; hideLine();
	});
};
CS.pmjtools2_rowdnd_init();

//===============================================================
// 一覧の「強力分析」: チェックした案件を強力分析(ana 方式)のキューに登録する
//   選択削除(itask_tool.js CS.itask_list_delete_all)と同じく、各行のチェック(delete_flag)を使う。
//   「元PDFで分析」にチェックがあれば、保存済みの画像ではなく元の PDF から画像を作って分析する(use_pdf=1)。
//   登録した案件は「分析中」になり、cron の batch/ikisaki_itask_make_ana.do が順に分析する。
//   成功: 状態=完了、精査ステータス=精査待 / 失敗: 状態=要確認。結果は一覧の再読み込みで確認する。
//===============================================================
CS.itask_list_ana_all = function () {
	var v = CS.vueObj;
	var ids = [];
	for (var i = 0; i < v.itask_list_show_file_list_now.length; i++) {
		if (v.itask_list_show_file_list_now[i].delete_flag) {
			ids.push(v.itask_list_show_file_list_now[i]["itask_id"]);
		}
	}
	if (ids.length === 0) {
		alert("強力分析する行を選択してください");
		return;
	}
	var usePdf = v.itask_list_ana_use_pdf ? 1 : 0;
	if (!window.confirm("選択した " + ids.length + " 件を強力分析します" + (usePdf ? "(元のPDFから画像を作って分析)" : "") + "。\n今の勘定科目は分析結果で置き換わります(精査ステータスは「精査待」に戻ります。置き換え前の勘定科目は保存しておきます)。\nよろしいですか？")) {
		return;
	}
	$.ajax({
		type: "POST",
		url: CS.ITASK_TOOL_URL,
		data: { action: "itask_ana_request", itask_id_list: ids.join(","), use_pdf: usePdf },
		dataType: "json",
		cache: false
	}).fail(function () { CS.alert_error(null); }).done(function (data) {
		if (data["status"] != "OK") {
			CS.alert_error(data["message"]);
			return;
		}
		var msg = data["added"] + " 件を強力分析に登録しました。";
		if (data["skipped_busy"] > 0) { msg += "\n(" + data["skipped_busy"] + " 件はすでに分析中のため登録していません)"; }
		msg += "\n終わったら一覧を再読み込みしてください。";
		alert(msg);
		for (var j = 0; j < v.itask_list_show_file_list_now.length; j++) {
			v.itask_list_show_file_list_now[j].delete_flag = false;
		}
		if (typeof CS.menu_itask_refresh === "function") { CS.menu_itask_refresh(); }
	});
};
