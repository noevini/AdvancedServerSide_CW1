const db = require("../config/database");

const licenceRepository = {
  createLicence: (profileId, licenceName, issuingAuthority, yearCompleted) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO licences (profile_id, licence_name, issuing_authority, year_completed)
        VALUES (?, ?, ?, ?)
      `;

      db.run(
        sql,
        [profileId, licenceName, issuingAuthority, yearCompleted],
        function (err) {
          if (err) {
            return reject(err);
          }

          resolve({
            id: this.lastID,
            profile_id: profileId,
            licence_name: licenceName,
            issuing_authority: issuingAuthority,
            year_completed: yearCompleted,
          });
        },
      );
    });
  },

  findByProfileId: (profileId) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM licences WHERE profile_id = ?";

      db.all(sql, [profileId], (err, rows) => {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  },
};

module.exports = licenceRepository;
