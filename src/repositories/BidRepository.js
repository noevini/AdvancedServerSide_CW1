const db = require("../config/database");

const bidRepository = {
  createBid: (userId, bidAmount, bidDate) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO bids (user_id, bid_amount, bid_date)
        VALUES (?, ?, ?)
      `;

      db.run(sql, [userId, bidAmount, bidDate], function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          id: this.lastID,
          user_id: userId,
          bid_amount: bidAmount,
          bid_date: bidDate,
          status: "PENDING",
        });
      });
    });
  },

  findByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT * FROM bids WHERE user_id = ? ORDER BY created_at DESC";

      db.all(sql, [userId], (err, rows) => {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  },
};

module.exports = bidRepository;
