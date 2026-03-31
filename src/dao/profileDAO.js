const db = require("../config/database");

const profileRepository = {
  findByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM profiles WHERE user_id = ?";

      db.get(sql, [userId], (err, row) => {
        if (err) {
          return reject(err);
        }

        resolve(row);
      });
    });
  },

  createProfile: (userId, fullName, biography, linkedinUrl, imageUrl) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO profiles (user_id, full_name, biography, linkedin_url, image_url)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.run(
        sql,
        [userId, fullName, biography, linkedinUrl, imageUrl],
        function (err) {
          if (err) {
            return reject(err);
          }

          resolve({
            id: this.lastID,
            user_id: userId,
            full_name: fullName,
            biography,
            linkedin_url: linkedinUrl,
            image_url: imageUrl,
          });
        },
      );
    });
  },

  updateImageUrl: (userId, imageUrl) => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE profiles
        SET image_url = ?
        WHERE user_id = ?
      `;

      db.run(sql, [imageUrl, userId], function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          user_id: userId,
          image_url: imageUrl,
        });
      });
    });
  },

  updateLinkedinUrl: (userId, linkedinUrl) => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE profiles
        SET linkedin_url = ?
        WHERE user_id = ?
      `;

      db.run(sql, [linkedinUrl, userId], function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          user_id: userId,
          linkedin_url: linkedinUrl,
        });
      });
    });
  },
};

module.exports = profileRepository;
