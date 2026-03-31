const db = require("../config/database");

const apiUsageLogRepository = {
  createLog: (tokenId, endpoint, method) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO api_usage_logs (token_id, endpoint, method)
        VALUES (?, ?, ?)
      `;

      db.run(sql, [tokenId, endpoint, method], function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          id: this.lastID,
          token_id: tokenId,
          endpoint,
          method,
        });
      });
    });
  },

  findAllLogs: () => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM api_usage_logs
        ORDER BY accessed_at DESC
      `;

      db.all(sql, [], (err, rows) => {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  },
};

module.exports = apiUsageLogRepository;
