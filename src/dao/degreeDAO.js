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
            institution,
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

  findById: (degreeId) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM degrees WHERE id = ?";

      db.get(sql, [degreeId], (err, row) => {
        if (err) {
          return reject(err);
        }

        resolve(row);
      });
    });
  },

  updateDegree: (degreeId, degreeName, institution, yearCompleted) => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE degrees
        SET degree_name = ?, institution = ?, year_completed = ?
        WHERE id = ?
      `;

      db.run(
        sql,
        [degreeName, institution, yearCompleted, degreeId],
        function (err) {
          if (err) {
            return reject(err);
          }

          resolve({
            id: degreeId,
            degree_name: degreeName,
            institution,
            year_completed: yearCompleted,
          });
        },
      );
    });
  },

  deleteDegree: (degreeId) => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM degrees WHERE id = ?`;

      db.run(sql, [degreeId], function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          id: degreeId,
          deleted: true,
        });
      });
    });
  },
};

module.exports = degreeRepository;
