const db = require("../config/database");

const certificationRepository = {
  createCertification: (
    profileId,
    certificationName,
    provider,
    yearCompleted,
  ) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO certifications (profile_id, certification_name, provider, year_completed)
        VALUES (?, ?, ?, ?)
      `;

      db.run(
        sql,
        [profileId, certificationName, provider, yearCompleted],
        function (err) {
          if (err) {
            return reject(err);
          }

          resolve({
            id: this.lastID,
            profile_id: profileId,
            certification_name: certificationName,
            provider: provider,
            year_completed: yearCompleted,
          });
        },
      );
    });
  },

  findByProfileId: (profileId) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM certifications WHERE profile_id = ?";

      db.all(sql, [profileId], (err, rows) => {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  },
};

module.exports = certificationRepository;
