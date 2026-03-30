const db = require("../config/database");

const userRepository = {
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE email = ?";

      db.get(sql, [email], (err, row) => {
        if (err) {
          return reject(err);
        }

        resolve(row);
      });
    });
  },

  findById: (userId) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE id = ?";

      db.get(sql, [userId], (err, row) => {
        if (err) {
          return reject(err);
        }

        resolve(row);
      });
    });
  },

  createUser: (email, hashedPassword) => {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO users (email, password) VALUES (?, ?)";

      db.run(sql, [email, hashedPassword], function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          id: this.lastID,
          email: email,
          is_verified: 0,
        });
      });
    });
  },

  markEmailAsVerified: (userId) => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE users
        SET is_verified = 1
        WHERE id = ?
      `;

      db.run(sql, [userId], function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          user_id: userId,
          is_verified: 1,
        });
      });
    });
  },

  updatePassword: (userId, hashedPassword) => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE users
        SET password = ?
        WHERE id = ?
      `;

      db.run(sql, [hashedPassword, userId], function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          user_id: userId,
        });
      });
    });
  },
};

module.exports = userRepository;
