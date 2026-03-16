const degreeService = require("../services/degreeService");

const degreeController = {
  createDegree: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { degree_name, institution, year_completed } = req.body;

      const degree = await degreeService.createDegree(
        userId,
        degree_name,
        institution,
        year_completed,
      );

      return res.status(201).json({
        message: "Degree created successfully",
        degree,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  getDegrees: async (req, res) => {
    try {
      const userId = req.user.userId;

      const degrees = await degreeService.getDegrees(userId);

      return res.status(200).json(degrees);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },
};

module.exports = degreeController;
