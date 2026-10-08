-- 強力分析のキュー (2026-10-08)
--   一覧の「強力分析」(itask_ana_request.do) が登録し、cron の batch/ikisaki_itask_make_ana.do が処理する
--   status: NM=未処理 / MN=処理中 / OK=成功 / NG=失敗
CREATE TABLE IF NOT EXISTS i_itask_queue_ana (
  id            INT          NOT NULL AUTO_INCREMENT,
  itask_id      INT          NOT NULL,
  status        VARCHAR(2)   NOT NULL DEFAULT 'NM',
  doc_type      VARCHAR(10)  NOT NULL DEFAULT 'houjin',   -- houjin / kojin
  user_id       INT          NULL,
  member_id     INT          NULL,
  prev_status   INT          NULL,                        -- 登録前の m_itask.status
  error_message TEXT         NULL,
  create_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  start_at      DATETIME     NULL,
  end_at        DATETIME     NULL,
  PRIMARY KEY (id),
  KEY idx_status (status),
  KEY idx_itask (itask_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
