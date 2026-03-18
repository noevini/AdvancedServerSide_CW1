const db = require("../config/database");

const shortCourseRepository = {
  createShortCourse: (profileId, courseName, provider, yearCompleted) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO short_courses (profile_id, course_name, provider, year_completed)
        VALUES (?, ?, ?, ?)
      `;

      db.run(
        sql,
        [profileId, courseName, provider, yearCompleted],
        function (err) {
          if (err) {
            return reject(err);
          }

          resolve({
            id: this.lastID,
            profile_id: profileId,
            course_name: courseName,
            provider: provider,
            year_completed: yearCompleted,
          });
        },
      );
    });
  },

  findByProfileId: (profileId) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM short_courses WHERE profile_id = ?";

      db.all(sql, [profileId], (err, rows) => {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  },
};

module.exports = shortCourseRepository;
