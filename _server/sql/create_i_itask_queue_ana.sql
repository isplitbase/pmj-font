-- 強力分析のキュー (2026-10-08、2026-10-09 に use_pdf / prev_top_info / backup_rows を追加)
--   一覧の「強力分析」(itask_ana_request.do) が登録し、cron の batch/ikisaki_itask_make_ana.do が処理する
--   status: NM=未処理 / MN=処理中 / OK=成功 / NG=失敗
CREATE TABLE IF NOT EXISTS i_itask_queue_ana (
  id            INT          NOT NULL AUTO_INCREMENT,
  itask_id      INT          NOT NULL,
  status        VARCHAR(2)   NOT NULL DEFAULT 'NM',
  doc_type      VARCHAR(10)  NOT NULL DEFAULT 'houjin',   -- houjin / kojin
  use_pdf       TINYINT      NOT NULL DEFAULT 0,          -- 1: 元の PDF からページ画像を作って分析する
  user_id       INT          NULL,
  member_id     INT          NULL,
  prev_status   INT          NULL,                        -- 登録前の m_itask.status
  prev_top_info TEXT         NULL,                        -- 置き換え前の精査ステータス・決算日・o0〜o31(JSON)
  backup_rows   INT          NULL,                        -- i_kanjo_info_ana_bk に退避した行数
  error_message TEXT         NULL,
  create_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  start_at      DATETIME     NULL,
  end_at        DATETIME     NULL,
  PRIMARY KEY (id),
  KEY idx_status (status),
  KEY idx_itask (itask_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 強力分析で置き換える前の勘定科目の退避先(i_kanjo_info と同じ列 + 退避の情報)
--   戻すときは batch/ikisaki_itask_make_ana_restore.do <キュー番号> --restore
CREATE TABLE IF NOT EXISTS i_kanjo_info_ana_bk AS SELECT * FROM i_kanjo_info WHERE 1=0;
