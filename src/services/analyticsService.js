const analyticsDAO = require("../dao/analyticsDAO");

const analyticsService = {
  getSummary: async () => {
    const data = await analyticsDAO.getOverallSummary();
    const employmentRate =
      data.total_alumni > 0
        ? Math.round((data.total_employed / data.total_alumni) * 100)
        : 0;
    return {
      totalAlumni: data.total_alumni,
      totalCertifications: data.total_certifications,
      employmentRate,
    };
  },

  getCertifications: async (filters = {}) => {
    const hasFilter = filters.programme || filters.year;
    const [rows, total] = await Promise.all([
      analyticsDAO.getCertificationSummary(filters),
      hasFilter
        ? analyticsDAO.getFilteredAlumniCount(filters)
        : analyticsDAO.getOverallSummary().then((s) => s.total_alumni),
    ]);
    const totalAlumni = total || 1;
    return {
      labels: rows.map((r) => r.certification_name),
      values: rows.map((r) => Math.round((r.count / totalAlumni) * 100)),
    };
  },

  getTrends: async (filters = {}) => {
    const rows = await analyticsDAO.getCertificationsByYear(filters);
    return {
      labels: rows.map((r) => r.year_completed),
      datasets: [
        {
          label: "Certifications Acquired",
          data: rows.map((r) => r.count),
          borderColor: "#3B82F6",
          backgroundColor: "transparent",
        },
      ],
    };
  },

  getEmployment: async (filters = {}) => {
    const [industries, jobTitles, employers] = await Promise.all([
      analyticsDAO.getIndustrySummary(filters),
      analyticsDAO.getJobTitleSummary(filters),
      analyticsDAO.getEmployerSummary(filters),
    ]);
    return {
      industries: {
        labels: industries.map((r) => r.industry),
        values: industries.map((r) => r.count),
      },
      jobTitles: {
        labels: jobTitles.map((r) => r.job_title),
        values: jobTitles.map((r) => r.count),
      },
      employers: {
        labels: employers.map((r) => r.company_name),
        values: employers.map((r) => r.count),
      },
    };
  },

  getShortCourses: async (filters = {}) => {
    const rows = await analyticsDAO.getShortCourseSummary(filters);
    return {
      labels: rows.map((r) => r.course_name),
      values: rows.map((r) => r.count),
    };
  },

  getGeographic: async (filters = {}) => {
    const rows = await analyticsDAO.getGeographicSummary(filters);
    return {
      labels: rows.map((r) => r.location),
      values: rows.map((r) => r.count),
    };
  },

  getAlumni: async () => {
    return await analyticsDAO.getAlumniList();
  },
};

module.exports = analyticsService;
