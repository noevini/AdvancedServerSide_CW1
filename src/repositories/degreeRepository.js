const db = require("../config/database");

const degreeRepository = {
  createDegree: (profileId, degreeName, institution, yearCompleted) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO degrees (profile_id, degree_name, institution, year_completed)
        VALUES (?, ?, ?, ?)
      `;

      db.run(
        sql,
        [profileId, degreeName, institution, yearCompleted],
        function (err) {
          if (err) {
            return reject(err);
          }

          resolve({
            id: this.lastID,
            profile_id: profileId,
            degree_name: degreeName,
            institution: institution,
            year_completed: yearCompleted,
          });
        },
      );
    });
  },

  findByProfileId: (profileId) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM degrees WHERE profile_id = ?";

      db.all(sql, [profileId], (err, rows) => {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  },
};

module.exports = degreeRepository;
