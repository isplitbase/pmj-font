-- 退避テーブルに、退避の情報の列と索引を付ける(create_i_itask_queue_ana.sql の後に1回だけ実行)
ALTER TABLE i_kanjo_info_ana_bk
  ADD COLUMN bk_id       INT      NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST,
  ADD COLUMN bk_queue_id INT      NOT NULL AFTER bk_id,
  ADD COLUMN bk_at       DATETIME NOT NULL AFTER bk_queue_id,
  ADD KEY idx_bk_queue (bk_queue_id),
  ADD KEY idx_bk_itask (aitask_id);
