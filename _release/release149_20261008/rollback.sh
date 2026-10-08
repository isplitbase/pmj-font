#!/bin/bash
# =====================================================================
#  149 リリース 2026-10-08 の戻し
#    使い方 (root で):  bash rollback.sh /data/release_backup/20261008_hosei_<日時>
#    ・release.sh が退避したファイルを元の場所に戻す
#    ・release.sh が新規に置いたファイル(created.txt)を削除する
#      (リリース後に中身が変わっていたら、念のため削除せずに残す)
# =====================================================================
set -u
ROOT="${ROOT:-/var/www/html}"
BK="${1:-}"
[ "$(id -u)" = "0" ] || { echo "root で実行してください"; exit 1; }
[ -n "$BK" ] && [ -f "$BK/manifest.tsv" ] || { echo "使い方: bash rollback.sh <バックアップのフォルダ>"; ls -d /data/release_backup/20261008_hosei_* 2>/dev/null; exit 1; }
md5of(){ md5sum "$1" 2>/dev/null | cut -c1-32; }

echo "=== 戻し: $BK → $ROOT ==="
# 入口(ディスパッチャ)を先に戻してから .do を消す
if [ -d "$BK/files" ]; then
	(cd "$BK/files" && find . -type f | sed 's#^\./##') | while read -r rel; do
		cat "$BK/files/$rel" > "$ROOT/$rel" && echo "  戻した: $rel"
	done
fi
if [ -f "$BK/created.txt" ]; then
	while read -r rel; do
		[ -z "$rel" ] && continue
		want=$(awk -F'\t' -v r="$rel" '$2==r{print $4}' "$BK/manifest.tsv")
		if [ ! -e "$ROOT/$rel" ]; then
			echo "  (既に無い) $rel"
		elif [ "$(md5of "$ROOT/$rel")" = "$want" ]; then
			rm -f "$ROOT/$rel" && echo "  削除: $rel"
		else
			echo "  [注意] リリース後に変更されているため削除せず残しました: $rel"
		fi
	done < "$BK/created.txt"
fi
echo "--- 確認"
(cd "$BK/files" && find . -type f | sed 's#^\./##') | while read -r rel; do
	[ "$(md5of "$ROOT/$rel")" = "$(md5of "$BK/files/$rel")" ] && echo "  [OK] $rel" || echo "  [NG] $rel"
done
echo "=== 戻し完了 ==="
