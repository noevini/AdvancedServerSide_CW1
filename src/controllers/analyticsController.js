const analyticsService = require("../services/analyticsService");

const analyticsController = {
  getSummary: async (req, res) => {
    try {
      const data = await analyticsService.getSummary();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getCertifications: async (req, res) => {
    try {
      const data = await analyticsService.getCertifications(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getTrends: async (req, res) => {
    try {
      const data = await analyticsService.getTrends(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getEmployment: async (req, res) => {
    try {
      const data = await analyticsService.getEmployment(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getShortCourses: async (req, res) => {
    try {
      const data = await analyticsService.getShortCourses(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getGeographic: async (req, res) => {
    try {
      const data = await analyticsService.getGeographic(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getAlumni: async (req, res) => {
    try {
      const data = await analyticsService.getAlumni();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = analyticsController;
