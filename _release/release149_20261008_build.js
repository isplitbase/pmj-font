// 149 リリース素材の組み立て
//   node build.js <149のソース(html)> <pmj-font(test1)> <出力先>
//   ・既存ファイルは 149 の現物に今回の変更だけを足す(改行コードは元のまま)
//   ・新規ファイルは pmj-font(test1) のものをそのまま使う
//   ・check_member.php はアクセスキーを含むので持ち出さず、release.sh が 149 上で書き換える
//     (書き換え後の md5 だけをここで計算して manifest に入れる)
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const [SRC149, FONT, OUT] = process.argv.slice(2);
const md5 = (b) => crypto.createHash("md5").update(b).digest("hex");

function eolOf(s) { return s.includes("\r\n") ? "\r\n" : (s.includes("\r") ? "\r" : "\n"); }
function norm(s, eol) { return eol === "\n" ? s : s.split(eol).join("\n"); }
function back(s, eol) { return eol === "\n" ? s : s.split("\n").join(eol); }
function once(s, from, to, label) {
	const n = s.split(from).length - 1;
	if (n !== 1) { throw new Error(label + ": 差し込み位置が " + n + " 件(1件のはず)"); }
	return s.replace(from, () => to);
}

const manifest = [];
function patchFile(rel, fn) {
	const buf = fs.readFileSync(path.join(SRC149, rel));
	const s = buf.toString("utf8");
	const eol = eolOf(s);
	const out = back(fn(norm(s, eol)), eol);
	const dst = path.join(OUT, "files", rel);
	fs.mkdirSync(path.dirname(dst), { recursive: true });
	fs.writeFileSync(dst, out);
	manifest.push(["replace", rel, md5(buf), md5(Buffer.from(out, "utf8"))]);
	console.log("replace", rel, JSON.stringify(eol));
}
function newFile(rel) {
	const buf = fs.readFileSync(path.join(FONT, rel));
	const dst = path.join(OUT, "files", rel);
	fs.mkdirSync(path.dirname(dst), { recursive: true });
	fs.writeFileSync(dst, buf);
	manifest.push(["new", rel, "-", md5(buf)]);
	console.log("new    ", rel);
}

// ---- 新規ファイル ----
newFile("p4x9k2m7q1w8n3r6t5vz.html");
newFile("ikisaki_tool/js/pmjtools2.js");
newFile("ikisaki_tool/ikisaki_itask_tool/itask_image_hosei.do");
newFile("ikisaki_tool/ikisaki_itask_tool/itask_aitext_analyze.do");

// ---- itask_tool.js: kanjo_detail_down の sindex 宣言漏れ ----
patchFile("ikisaki_tool/js/itask_tool.js", (s) => once(s,
	"CS.kanjo_detail_down = function(index) {\n\tif(index<CS.vueObj.kanjo_detail.length-1){",
	"CS.kanjo_detail_down = function(index) {\n\tvar sindex=null;\t// 宣言漏れ(前回の値が残る・初回はエラー)のため追加\n\tif(index<CS.vueObj.kanjo_detail.length-1){",
	"itask_tool.js"));

// ---- ikisaki_init.js: ボタンのメソッド登録と、ポップアップの起動 ----
patchFile("mdb_js/ikisaki_init.js", (s) => {
	s = once(s,
		"\tvueUseObj.methods.itask_list_show_edit_window_show_tool= CS.itask_list_show_edit_window_show_tool;\n",
		"\tvueUseObj.methods.itask_list_show_edit_window_show_tool= CS.itask_list_show_edit_window_show_tool;\n" +
		"\tvueUseObj.methods.itask_list_show_edit_window_openai_image= CS.itask_list_show_edit_window_openai_image;\n",
		"ikisaki_init.js(method)");
	s = once(s,
		"\t}else if(location.href.indexOf(\"aitask_image_edit\")!=-1){\n",
		"\t}else if(location.href.indexOf(\"aitask_hosei\")!=-1){\n" +
		"\t\t// 画像補正・再分析ポップアップ(pmjtools2.js)\n" +
		"\t\tCS.aitask_hosei_start();\n" +
		"\t}else if(location.href.indexOf(\"aitask_image_edit\")!=-1){\n",
		"ikisaki_init.js(start)");
	return s;
});

// ---- index.php: /?aitask_hosei の振り分け ----
patchFile("index.php", (s) => once(s,
	"\tif(mb_substr($_SERVER[\"REQUEST_URI\"], 0, 19, \"UTF-8\")==\"/?aitask_image_edit\"){\n",
	"\tif(mb_substr($_SERVER[\"REQUEST_URI\"], 0, 14, \"UTF-8\")==\"/?aitask_hosei\"){\n" +
	"\t\tinclude('p4x9k2m7q1w8n3r6t5vz.html');\n" +
	"\t\texit();\n" +
	"\t}\n" +
	"\tif(mb_substr($_SERVER[\"REQUEST_URI\"], 0, 19, \"UTF-8\")==\"/?aitask_image_edit\"){\n",
	"index.php"));

// ---- ikisaki_itask_tool.do: 新しい action 2つ ----
patchFile("ikisaki_tool/ikisaki_itask_tool.do", (s) => once(s,
	"\t}else if($action == \"keieidangi_call_summary\"){\n\t\tkeieidangi_call_summary();\n",
	"\t}else if($action == \"keieidangi_call_summary\"){\n\t\tkeieidangi_call_summary();\n" +
	"\t}else if($action == \"itask_image_hosei\"){\n\t\titask_image_hosei();\n" +
	"\t}else if($action == \"itask_aitext_analyze\"){\n\t\titask_aitext_analyze();\n",
	"ikisaki_itask_tool.do"));

// ---- 親画面 HTML: 「openai画像処理」ボタン と 法人の勘定科目リンクの id ----
const t1html = norm(fs.readFileSync(path.join(FONT, "hzcQShkeRUEksyyJrTndjdt3x.html"), "utf8"), "\r\n");
const btnStart = t1html.indexOf('                                <button style="" title="openai画像処理"');
const btnEnd = t1html.indexOf("openai画像処理</button>\n", btnStart) + "openai画像処理</button>\n".length;
if (btnStart < 0 || btnEnd <= btnStart) { throw new Error("test1 のボタンが見つからない"); }
const btn = t1html.slice(btnStart, btnEnd);
patchFile("hzcQShkeRUEksyyJrTndjdt3x.html", (s) => {
	const toolHide =
		'                                <button style="" title="ツール非表示"\n' +
		'                                  v-if="!itask_list_show_edit_window_getfullimage_show && itask_list_show_edit_window_map_flag==-1 && itask_list_show_edit_window_tool_show"\n' +
		'                                  type="button" class="btn btn-primary verify waves-effect waves-light xEKNMHLy"\n' +
		'                                  v-on:click="itask_list_show_edit_window_show_tool"><i class="fas fa-ellipsis-v"\n' +
		'                                    style="margin-right: 4px;"></i>ツール非表示</button>\n';
	s = once(s, toolHide + "                              </div>\n", toolHide + btn + "                              </div>\n", "html(button)");
	// 法人の表(text="法人の場合" 〜 赤字メッセージ)の中だけ、勘定科目リンクに id を付ける
	const a = s.indexOf('text="法人の場合"');
	const b = s.indexOf('<div style="color:red"', a);
	if (a < 0 || b < 0) { throw new Error("法人の表の範囲が見つからない"); }
	let sec = s.slice(a, b);
	const from = '<a class="gXcsEDTG" v-bind:class=';
	const to = '<a class="gXcsEDTG" v-bind:id="\'itask_list_show_edit_pana_kanjyo_\'+index" v-bind:class=';
	const lines = sec.split("\n");
	let n = 0;
	for (let i = 0; i < lines.length; i++) {
		const L = lines[i];
		if (L.trimStart().startsWith("<!--")) { continue; }                 // コメント行は触らない
		if ((L.includes('<div class="tLigTPeX" v-if="member_info.member_id==\'1\'">' + from) ||
			 L.includes('<div class="tLigTPeX" v-else>' + from))) {
			lines[i] = L.replace(from, to); n++;
		}
	}
	if (n !== 2) { throw new Error("法人の勘定科目リンクが " + n + " 件(2件のはず)"); }
	sec = lines.join("\n");
	return s.slice(0, a) + sec + s.slice(b);
});

// ---- check_member.php: 書き換え後の md5 だけ計算(ファイルは持ち出さない) ----
{
	const rel = "ikisaki_tool/check_member.php";
	const buf = fs.readFileSync(path.join(SRC149, rel));
	let s = buf.toString("utf8");
	const A1 = '\t$putmobj["load_flag_list_num"]=11;\r';
	const A2 = '\t$putmobj["s10"]="./ikisaki_tool/js/pmjtools.js?data=";\r';
	s = once(s, A1, '\t$putmobj["load_flag_list_num"]=12;\r', "check_member(num)");
	s = once(s, A2, A2 + '\t$putmobj["s11"]="./ikisaki_tool/js/pmjtools2.js?data=";\r', "check_member(s11)");
	manifest.push(["patch", rel, md5(buf), md5(Buffer.from(s, "utf8"))]);
	console.log("patch  ", rel, "(149 上で書き換え)");
}

fs.writeFileSync(path.join(OUT, "manifest.tsv"), manifest.map((r) => r.join("\t")).join("\n") + "\n");
console.log("manifest:", manifest.length, "件");
