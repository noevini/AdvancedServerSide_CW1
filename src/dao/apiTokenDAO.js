const db = require("../config/database");

const apiTokenRepository = {
  createToken: (token, clientName) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO api_tokens (token, client_name)
        VALUES (?, ?)
      `;

      db.run(sql, [token, clientName], function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          id: this.lastID,
          token,
          client_name: clientName,
          is_revoked: 0,
        });
      });
    });
  },

  findByToken: (token) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM api_tokens
        WHERE token = ?
      `;

      db.get(sql, [token], (err, row) => {
        if (err) {
          return reject(err);
        }

        resolve(row);
      });
    });
  },

  findAllTokens: () => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM api_tokens
        ORDER BY created_at DESC
      `;

      db.all(sql, [], (err, rows) => {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  },

  revokeToken: (tokenId) => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE api_tokens
        SET is_revoked = 1
        WHERE id = ?
      `;

      db.run(sql, [tokenId], function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          id: tokenId,
          is_revoked: 1,
        });
      });
    });
  },
};

module.exports = apiTokenRepository;
