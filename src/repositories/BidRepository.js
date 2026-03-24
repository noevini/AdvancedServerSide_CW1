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
      const sql = `
        SELECT * FROM bids
        WHERE user_id = ?
        ORDER BY created_at DESC
      `;

      db.all(sql, [userId], (err, rows) => {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  },

  findLatestByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM bids
        WHERE user_id = ?
        ORDER BY created_at DESC
        LIMIT 1
      `;

      db.get(sql, [userId], (err, row) => {
        if (err) {
          return reject(err);
        }

        resolve(row);
      });
    });
  },

  updateBidAmount: (bidId, newAmount) => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE bids
        SET bid_amount = ?
        WHERE id = ?
      `;

      db.run(sql, [newAmount, bidId], function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          id: bidId,
          bid_amount: newAmount,
        });
      });
    });
  },
};

module.exports = bidRepository;
