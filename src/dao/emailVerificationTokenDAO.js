const db = require("../config/database");

const emailVerificationTokenRepository = {
  createToken: (userId, token, expiresAt) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO email_verification_tokens (user_id, token, expires_at)
        VALUES (?, ?, ?)
      `;

      db.run(sql, [userId, token, expiresAt], function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          id: this.lastID,
          user_id: userId,
          token,
          expires_at: expiresAt,
          is_used: 0,
        });
      });
    });
  },

  findByToken: (token) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM email_verification_tokens
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

  markAsUsed: (tokenId) => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE email_verification_tokens
        SET is_used = 1
        WHERE id = ?
      `;

      db.run(sql, [tokenId], function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          id: tokenId,
          is_used: 1,
        });
      });
    });
  },
};

module.exports = emailVerificationTokenRepository;
