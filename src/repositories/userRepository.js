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
        });
      });
    });
  },
};

module.exports = userRepository;
