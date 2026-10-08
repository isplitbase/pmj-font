# pmj-font

zaiTask (test1: 54.64.240.94) の画面まわりのソースのうち、
中核ファイル・よく変えるファイル・変更したファイルだけを置いて履歴を管理する。
(サーバ上のバックアップの代わり)

- 置き場所はサーバの `/var/www/html/` からの相対パスと同じ
- 変更前に、その時点の test1 のファイルをコミットしておき、変更後にもう一度コミットする
- 改行コードはファイルごとに違う(index.php は CR のみ、ikisaki_init.js は CRLF など)ので変換しない(.gitattributes)

| ファイル | 内容 |
|---|---|
| hzcQShkeRUEksyyJrTndjdt3x.html | 親画面(zaiTask 編集画面など) |
| p4x9k2m7q1w8n3r6t5vz.html | 画像補正・再分析ポップアップ (/?aitask_hosei) |
| index.php | 画面の振り分け |
| mdb_js/ikisaki_init.js | Vue の初期化・画面の起動 |
| css/style.css | 共通 CSS |
| ikisaki_tool/js/itask_tool.js | zaiTask 編集画面の処理 |
| ikisaki_tool/js/pmjtools.js | 手動分析など |
| ikisaki_tool/js/pmjtools2.js | 画像補正・再分析、親画面の画像ビュー操作、行のドラッグ移動 |
| ikisaki_tool/ikisaki_itask_tool.do | .do の振り分け |
| ikisaki_tool/ikisaki_itask_tool/itask_image_hosei.do | 画像補正 (door → pmj-hosei-imges) |
| ikisaki_tool/ikisaki_itask_tool/itask_aitext_analyze.do | 再分析 (door → pmj-aitext-1) |

## _server/ (Web ルートの外に置くもの)

`_server/` の下は、サーバのルート(`/`)からの相対パス。

| ファイル | 内容 |
|---|---|
| _server/data/pmj_cron/master_to_gcs.php | マスタ(pys/v2ac_kanjo_master.json)を door → pmj-simpletool(-real) 経由で GCS (pmjbase/, pmjbase/real/) へ転送 |
| _server/etc/cron.d/pmj_master_gcs | 上を10分ごとに ec2-user で実行 |
