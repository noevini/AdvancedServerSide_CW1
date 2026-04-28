const db = require("../config/database");

// Builds a WHERE clause and params array from { programme, year } filters
const buildDegreeFilter = (filters = {}) => {
  const clauses = [];
  const params = [];
  if (filters.programme) { clauses.push("d.degree_name = ?"); params.push(filters.programme); }
  if (filters.year)      { clauses.push("d.year_completed = ?"); params.push(filters.year); }
  return { where: clauses.length ? "AND " + clauses.join(" AND ") : "", params };
};

const analyticsRepository = {
  getOverallSummary: () => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          (SELECT COUNT(*) FROM users) AS total_alumni,
          (SELECT COUNT(*) FROM certifications) AS total_certifications,
          (SELECT COUNT(DISTINCT profile_id) FROM employment_history) AS total_employed
      `;
      db.get(sql, [], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  getFilteredAlumniCount: (filters = {}) => {
    const { where, params } = buildDegreeFilter(filters);
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT COUNT(DISTINCT u.id) AS total
        FROM users u
        JOIN profiles p ON p.user_id = u.id
        JOIN degrees d ON d.profile_id = p.id
        WHERE 1=1 ${where}
      `;
      db.get(sql, params, (err, row) => {
        if (err) return reject(err);
        resolve(row ? row.total : 0);
      });
    });
  },

  getCertificationSummary: (filters = {}) => {
    const { where, params } = buildDegreeFilter(filters);
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT c.certification_name, COUNT(*) AS count
        FROM certifications c
        JOIN profiles p ON p.id = c.profile_id
        JOIN degrees d ON d.profile_id = p.id
        WHERE 1=1 ${where}
        GROUP BY c.certification_name
        ORDER BY count DESC
        LIMIT 10
      `;
      db.all(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  getCertificationsByYear: (filters = {}) => {
    const { where, params } = buildDegreeFilter(filters);
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT c.year_completed, COUNT(*) AS count
        FROM certifications c
        JOIN profiles p ON p.id = c.profile_id
        JOIN degrees d ON d.profile_id = p.id
        WHERE c.year_completed IS NOT NULL ${where}
        GROUP BY c.year_completed
        ORDER BY c.year_completed ASC
      `;
      db.all(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  getIndustrySummary: (filters = {}) => {
    const { where, params } = buildDegreeFilter(filters);
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT e.industry, COUNT(*) AS count
        FROM employment_history e
        JOIN profiles p ON p.id = e.profile_id
        JOIN degrees d ON d.profile_id = p.id
        WHERE e.industry IS NOT NULL ${where}
        GROUP BY e.industry
        ORDER BY count DESC
      `;
      db.all(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  getJobTitleSummary: (filters = {}) => {
    const { where, params } = buildDegreeFilter(filters);
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT e.job_title, COUNT(*) AS count
        FROM employment_history e
        JOIN profiles p ON p.id = e.profile_id
        JOIN degrees d ON d.profile_id = p.id
        WHERE 1=1 ${where}
        GROUP BY e.job_title
        ORDER BY count DESC
        LIMIT 8
      `;
      db.all(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  getEmployerSummary: (filters = {}) => {
    const { where, params } = buildDegreeFilter(filters);
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT e.company_name, COUNT(*) AS count
        FROM employment_history e
        JOIN profiles p ON p.id = e.profile_id
        JOIN degrees d ON d.profile_id = p.id
        WHERE 1=1 ${where}
        GROUP BY e.company_name
        ORDER BY count DESC
        LIMIT 8
      `;
      db.all(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  getShortCourseSummary: (filters = {}) => {
    const { where, params } = buildDegreeFilter(filters);
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT sc.course_name, COUNT(*) AS count
        FROM short_courses sc
        JOIN profiles p ON p.id = sc.profile_id
        JOIN degrees d ON d.profile_id = p.id
        WHERE 1=1 ${where}
        GROUP BY sc.course_name
        ORDER BY count DESC
        LIMIT 8
      `;
      db.all(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  getGeographicSummary: (filters = {}) => {
    const { where, params } = buildDegreeFilter(filters);
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT e.location, COUNT(*) AS count
        FROM employment_history e
        JOIN profiles p ON p.id = e.profile_id
        JOIN degrees d ON d.profile_id = p.id
        WHERE e.location IS NOT NULL ${where}
        GROUP BY e.location
        ORDER BY count DESC
      `;
      db.all(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  getAlumniList: () => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          u.email,
          p.full_name,
          d.degree_name,
          d.year_completed,
          e.company_name,
          e.job_title,
          e.industry
        FROM users u
        JOIN profiles p ON p.user_id = u.id
        LEFT JOIN degrees d ON d.profile_id = p.id
        LEFT JOIN employment_history e ON e.profile_id = p.id
        GROUP BY u.id
      `;
      db.all(sql, [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },
};

module.exports = analyticsRepository;
