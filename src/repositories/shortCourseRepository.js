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
            provider,
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

  findById: (shortCourseId) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM short_courses WHERE id = ?";

      db.get(sql, [shortCourseId], (err, row) => {
        if (err) {
          return reject(err);
        }

        resolve(row);
      });
    });
  },

  updateShortCourse: (shortCourseId, courseName, provider, yearCompleted) => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE short_courses
        SET course_name = ?, provider = ?, year_completed = ?
        WHERE id = ?
      `;

      db.run(
        sql,
        [courseName, provider, yearCompleted, shortCourseId],
        function (err) {
          if (err) {
            return reject(err);
          }

          resolve({
            id: shortCourseId,
            course_name: courseName,
            provider,
            year_completed: yearCompleted,
          });
        },
      );
    });
  },

  deleteShortCourse: (shortCourseId) => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM short_courses WHERE id = ?`;

      db.run(sql, [shortCourseId], function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          id: shortCourseId,
          deleted: true,
        });
      });
    });
  },
};

module.exports = shortCourseRepository;
