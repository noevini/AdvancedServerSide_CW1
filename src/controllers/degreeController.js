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

  updateDegree: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { id } = req.params;
      const { degree_name, institution, year_completed } = req.body;

      const degree = await degreeService.updateDegree(
        userId,
        Number(id),
        degree_name,
        institution,
        year_completed,
      );

      return res.status(200).json({
        message: "Degree updated successfully",
        degree,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  deleteDegree: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { id } = req.params;

      const result = await degreeService.deleteDegree(userId, Number(id));

      return res.status(200).json({
        message: "Degree deleted successfully",
        result,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },
};

module.exports = degreeController;
