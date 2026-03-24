const db = require("../config/database");

const employmentRepository = {
  createEmployment: (profileId, companyName, jobTitle, startYear, endYear) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO employment_history (profile_id, company_name, job_title, start_year, end_year)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.run(
        sql,
        [profileId, companyName, jobTitle, startYear, endYear],
        function (err) {
          if (err) {
            return reject(err);
          }

          resolve({
            id: this.lastID,
            profile_id: profileId,
            company_name: companyName,
            job_title: jobTitle,
            start_year: startYear,
            end_year: endYear,
          });
        },
      );
    });
  },

  findByProfileId: (profileId) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM employment_history WHERE profile_id = ?";

      db.all(sql, [profileId], (err, rows) => {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  },
};

module.exports = employmentRepository;
