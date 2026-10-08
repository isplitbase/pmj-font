#!/bin/bash
# =====================================================================
#  149 リリース 2026-10-08
#    画像補正・再分析ポップアップ / 親画面の画像ビュー操作 / 項目の行ドラッグ移動
#
#  使い方 (root で):
#    bash release.sh --check   … 事前チェックだけ(何も変更しない)
#    bash release.sh           … 事前チェック → バックアップ → 配置 → 事後チェック
#
#  ・事前チェックで1つでも NG があれば、何も変更せずに終了する
#  ・既存ファイルは、2026-10-08 13:41 に取得した 149 の現物と md5 が一致するときだけ置き換える
#    (その後に誰かが変更していたら止まる)
#  ・バックアップ: /data/release_backup/20261008_hosei_<日時>/ (戻すときは rollback.sh)
#  ・httpd の再起動は不要
# =====================================================================
set -u
KIT="$(cd "$(dirname "$0")" && pwd)"
ROOT="${ROOT:-/var/www/html}"                          # 試験用に上書きできる
BACKUP_BASE="${BACKUP_BASE:-/data/release_backup}"
MANIFEST="$KIT/manifest.tsv"
TS=$(date +%Y%m%d%H%M%S)
MODE="apply"
[ "${1:-}" = "--check" ] && MODE="check"

ng=0
ok()   { echo "  [OK] $*"; }
bad()  { echo "  [NG] $*"; ng=$((ng+1)); }
warn() { echo "  [注意] $*"; }
md5of(){ md5sum "$1" 2>/dev/null | cut -c1-32; }

echo "=== 149 リリース 2026-10-08 (${MODE}) ROOT=$ROOT ==="
[ "$(id -u)" = "0" ] || { echo "root で実行してください"; exit 1; }
[ -f "$MANIFEST" ] || { echo "manifest.tsv がありません (zip を展開したフォルダで実行してください)"; exit 1; }

# ---------------------------------------------------------------------
echo "--- 1. 事前チェック"
applied=0; todo=0
while IFS=$'\t' read -r kind rel before after; do
	[ -z "$kind" ] && continue
	cur=$(md5of "$ROOT/$rel")
	if [ "$cur" = "$after" ]; then
		ok "適用済み: $rel"; applied=$((applied+1)); continue
	fi
	todo=$((todo+1))
	case "$kind" in
		new)
			if [ -e "$ROOT/$rel" ]; then bad "新規のはずが既にある(中身が違う): $rel"; else ok "新規: $rel"; fi
			[ "$(md5of "$KIT/files/$rel")" = "$after" ] || bad "素材が壊れている: files/$rel" ;;
		replace)
			if [ "$cur" = "$before" ]; then ok "置換: $rel"; else bad "149 の現物が取得時と違う: $rel (今 ${cur:-なし})"; fi
			[ "$(md5of "$KIT/files/$rel")" = "$after" ] || bad "素材が壊れている: files/$rel" ;;
		patch)
			if [ "$cur" = "$before" ]; then ok "書き換え: $rel"; else bad "149 の現物が取得時と違う: $rel (今 ${cur:-なし})"; fi ;;
		*) bad "manifest が不正: $kind $rel" ;;
	esac
done < "$MANIFEST"

# PHP の構文
for f in "$KIT"/files/ikisaki_tool/ikisaki_itask_tool/*.do "$KIT/files/ikisaki_tool/ikisaki_itask_tool.do" "$KIT/files/index.php"; do
	if php -l "$f" >/dev/null 2>&1; then ok "構文 OK: ${f#$KIT/}"; else bad "構文エラー: ${f#$KIT/}"; fi
done
# 新しい .do が借りる関数(8月リリースの keieidangi_call_ai.do)
CA="$ROOT/ikisaki_tool/ikisaki_itask_tool/keieidangi_call_ai.do"
if grep -q "function get_cloud_run_id_token_keieidangi" "$CA" 2>/dev/null && grep -q "function keieidangi_release_session" "$CA" 2>/dev/null; then
	ok "keieidangi_call_ai.do の関数あり"
else
	bad "keieidangi_call_ai.do に必要な関数が無い"
fi
# 新しい .do の関数名が既存とぶつからないか
for fn in itask_image_hosei itask_aitext_analyze itask_aitext_ng itask_aitext_page_images itask_aitext_page_raw; do
	hit=$(grep -l -E "function[[:space:]]+${fn}[[:space:]]*\(" "$ROOT"/ikisaki_tool/ikisaki_itask_tool/* 2>/dev/null | grep -v -E "/itask_(image_hosei|aitext_analyze)\.do$")
	[ -z "$hit" ] && ok "関数名の重複なし: $fn" || bad "関数名が既存とぶつかる: $fn ($hit)"
done
[ -f /data/gen-lang-client-0018414550-f50b079b0584.json ] && ok "サービスアカウント鍵あり" || bad "サービスアカウント鍵が無い"
if [ -f /data/hosei_door.conf ]; then
	warn "/data/hosei_door.conf がある: $(cat /data/hosei_door.conf) (149 は無いのが正しい。無ければ pmj-door-real を使う)"
else
	ok "/data/hosei_door.conf なし (pmj-door-real を使う)"
fi

echo "--- 事前チェック結果: NG ${ng} 件 / 適用済み ${applied} 件 / これから ${todo} 件"
if [ "$ng" -gt 0 ]; then echo "NG があるため何も変更せずに終了します"; exit 1; fi
if [ "$MODE" = "check" ]; then echo "(--check のため変更はしていません)"; exit 0; fi
if [ "$todo" -eq 0 ]; then echo "すべて適用済みです"; exit 0; fi

# ---------------------------------------------------------------------
BK="$BACKUP_BASE/20261008_hosei_$TS"
echo "--- 2. バックアップ → $BK"
mkdir -p "$BK" || { echo "バックアップ先を作れません"; exit 1; }
cp -p "$MANIFEST" "$BK/manifest.tsv"
while IFS=$'\t' read -r kind rel before after; do
	[ -z "$kind" ] && continue
	if [ -e "$ROOT/$rel" ]; then
		mkdir -p "$BK/files/$(dirname "$rel")"
		cp -p "$ROOT/$rel" "$BK/files/$rel" && echo "  退避: $rel"
	else
		echo "$rel" >> "$BK/created.txt"            # 新規に置くもの(戻すときは削除する)
	fi
done < "$MANIFEST"

# ---------------------------------------------------------------------
echo "--- 3. 配置"
# 先に新規ファイル(.do は置いた時点から読み込まれるので、関数が揃ってから入口を変える)
while IFS=$'\t' read -r kind rel before after; do
	[ "$kind" = "new" ] || continue
	[ "$(md5of "$ROOT/$rel")" = "$after" ] && continue
	case "$rel" in
		*.do) ref="$ROOT/ikisaki_tool/ikisaki_itask_tool/keieidangi_call_ai.do" ;;
		*.js) ref="$ROOT/ikisaki_tool/js/itask_tool.js" ;;
		*)    ref="$ROOT/hzcQShkeRUEksyyJrTndjdt3x.html" ;;
	esac
	cp "$KIT/files/$rel" "$ROOT/$rel" && chown --reference="$ref" "$ROOT/$rel" && chmod --reference="$ref" "$ROOT/$rel" \
		&& echo "  新規: $rel" || { echo "  失敗: $rel"; exit 1; }
done < "$MANIFEST"
# 既存ファイルの置き換え(cp で上書きすると所有者・権限はそのまま)
while IFS=$'\t' read -r kind rel before after; do
	[ "$kind" = "replace" ] || continue
	[ "$(md5of "$ROOT/$rel")" = "$after" ] && continue
	cp "$KIT/files/$rel" "$ROOT/$rel" && echo "  置換: $rel" || { echo "  失敗: $rel"; exit 1; }
done < "$MANIFEST"
# check_member.php は 149 上で2か所だけ書き換える(アクセスキーを含むためファイルは持ち込まない)
while IFS=$'\t' read -r kind rel before after; do
	[ "$kind" = "patch" ] || continue
	[ "$(md5of "$ROOT/$rel")" = "$after" ] && continue
	tmp=$(mktemp)
	php -r '
		$s = file_get_contents($argv[1]);
		$a1 = "\t\$putmobj[\"load_flag_list_num\"]=11;\r";
		$a2 = "\t\$putmobj[\"s10\"]=\"./ikisaki_tool/js/pmjtools.js?data=\";\r";
		if (substr_count($s, $a1) != 1 || substr_count($s, $a2) != 1) { fwrite(STDERR, "差し込み位置が見つかりません\n"); exit(1); }
		$s = str_replace($a1, "\t\$putmobj[\"load_flag_list_num\"]=12;\r", $s);
		$s = str_replace($a2, $a2 . "\t\$putmobj[\"s11\"]=\"./ikisaki_tool/js/pmjtools2.js?data=\";\r", $s);
		file_put_contents($argv[2], $s);
	' "$ROOT/$rel" "$tmp" || { rm -f "$tmp"; echo "  失敗: $rel"; exit 1; }
	if [ "$(md5of "$tmp")" != "$after" ]; then rm -f "$tmp"; echo "  失敗(書き換え結果が想定と違う): $rel"; exit 1; fi
	cat "$tmp" > "$ROOT/$rel" && rm -f "$tmp" && echo "  書き換え: $rel"
done < "$MANIFEST"

# ---------------------------------------------------------------------
echo "--- 4. 事後チェック"
ng=0
while IFS=$'\t' read -r kind rel before after; do
	[ -z "$kind" ] && continue
	[ "$(md5of "$ROOT/$rel")" = "$after" ] && ok "$rel" || bad "md5 が違う: $rel"
done < "$MANIFEST"
for f in "$ROOT"/ikisaki_tool/ikisaki_itask_tool/itask_image_hosei.do "$ROOT"/ikisaki_tool/ikisaki_itask_tool/itask_aitext_analyze.do "$ROOT/ikisaki_tool/ikisaki_itask_tool.do" "$ROOT/ikisaki_tool/check_member.php" "$ROOT/index.php"; do
	php -l "$f" >/dev/null 2>&1 && ok "構文 OK: ${f#$ROOT/}" || bad "構文エラー: ${f#$ROOT/}"
done
odd=$(ls "$ROOT/ikisaki_tool/ikisaki_itask_tool/" | grep -v -E "\.do$")
[ -z "$odd" ] && ok "ikisaki_itask_tool/ に .do 以外のファイルなし" || warn "ikisaki_itask_tool/ に .do 以外: $odd (全部 include されるので注意)"
ls -la "$ROOT/p4x9k2m7q1w8n3r6t5vz.html" "$ROOT/ikisaki_tool/js/pmjtools2.js" "$ROOT"/ikisaki_tool/ikisaki_itask_tool/itask_image_hosei.do "$ROOT"/ikisaki_tool/ikisaki_itask_tool/itask_aitext_analyze.do

echo "=== 完了: NG ${ng} 件 / バックアップ: $BK ==="
echo "  戻すとき: bash $KIT/rollback.sh $BK"
echo "  door の疎通確認(任意): php $KIT/check_door.php"
[ "$ng" -eq 0 ] || exit 1
