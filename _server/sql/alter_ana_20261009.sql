-- test1 用(2026-10-08 に作ったキューへの列追加と退避テーブル)。149 は create_i_itask_queue_ana.sql と
-- alter の後半(退避テーブルの列追加)を実行する
ALTER TABLE i_itask_queue_ana
  ADD COLUMN use_pdf       TINYINT NOT NULL DEFAULT 0 AFTER doc_type,
  ADD COLUMN prev_top_info TEXT    NULL AFTER prev_status,
  ADD COLUMN backup_rows   INT     NULL AFTER prev_top_info;
