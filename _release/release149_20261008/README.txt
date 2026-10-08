===========================================================================
 149 リリース手順  2026-10-08
   画像補正・再分析ポップアップ / 親画面の画像ビュー操作 / 項目の行ドラッグ移動
===========================================================================

■ 内容
---------------------------------------------------------------------------
 新規 (4)
   p4x9k2m7q1w8n3r6t5vz.html                              ポップアップ画面 (/?aitask_hosei)
   ikisaki_tool/js/pmjtools2.js                           ポップアップの処理・画像ビュー操作・行ドラッグ移動
   ikisaki_tool/ikisaki_itask_tool/itask_image_hosei.do   画像補正 (door-real → pmj-hosei-imges-real)
   ikisaki_tool/ikisaki_itask_tool/itask_aitext_analyze.do 再分析 (door-real → pmj-aitext-1-real)

 既存の変更 (149 の現物に、今回の変更だけを足したもの)
   index.php                         /?aitask_hosei の振り分け (4行)
   mdb_js/ikisaki_init.js            ボタンのメソッド登録・ポップアップの起動 (4行)
   hzcQShkeRUEksyyJrTndjdt3x.html    「openai画像処理」ボタン (5行)
                                     法人の表の勘定科目リンクに id を付与 (2か所)
   ikisaki_tool/ikisaki_itask_tool.do 新しい action 2つの分岐 (4行)
   ikisaki_tool/js/itask_tool.js     kanjo_detail_down の sindex 宣言漏れ (1行)
   ikisaki_tool/check_member.php     pmjtools2.js の読み込みを追加 (s11、件数 11→12)
                                     ※ アクセスキーを含むためファイルは同梱せず、release.sh が
                                       149 上で該当2か所だけを書き換える

 ・新しいライブラリのインストール、php.ini の変更、httpd の再起動は不要
 ・外への通信先は既存の2か所(oauth2.googleapis.com / pmj-door-real)だけ。新規の申請は不要


■ 手順 (149 に root でログイン)
---------------------------------------------------------------------------
[1] zip を 149 の /tmp に置いて展開する (WinSCP など)

      cd /tmp && unzip -o release149_20261008.zip && cd release149_20261008

    ※ unzip が無い場合は、手元で展開したフォルダごと /tmp/release149_20261008 に置く

[2] 事前チェックだけ実行する (何も変更しない)

      bash release.sh --check

    最後に「NG 0 件」と出ることを確認する。
    NG が出た場合は、何も変更されていない。表示内容を連絡してください。
    (例: 「149 の現物が取得時と違う」= 2026-10-08 13:41 の取得後に誰かが変更している)

[3] リリースする

      bash release.sh

    事前チェック → バックアップ → 配置 → 事後チェック まで自動で行う。
    最後に「完了: NG 0 件」と、バックアップのフォルダ名が表示される。

[4] door の疎通確認 (任意。料金はかからない)

      php check_door.php

    [OK] が3行 (ID トークン・画像補正・再分析) 出れば OK。

[5] 画面で確認
    ・zaiTask 編集画面(法人)を開き、Ctrl+F5 で再読み込み
    ・右の画像: ホイールで拡大縮小、左ボタンで引いて移動、拡大すると縦のスクロールバーが出る
    ・左の項目: 「移動」列の ▲▼ の右のつかむ印で、行を上下に移動できる
    ・「ツール表示」→「openai画像処理」でポップアップが開く
      → ページを選んで補正 → 比較画面で元画像/補正後を選ぶ → 分析 → 結果反映


■ 戻し方
---------------------------------------------------------------------------
      bash rollback.sh /data/release_backup/20261008_hosei_<日時>

    (<日時> は release.sh の最後に表示されたもの)
    退避したファイルを戻し、新規に置いた4ファイルを削除する。
