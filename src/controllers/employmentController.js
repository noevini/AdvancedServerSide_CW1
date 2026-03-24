const employmentService = require("../services/employmentService");

const employmentController = {
  createEmployment: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { company_name, job_title, start_year, end_year } = req.body;

      const employment = await employmentService.createEmployment(
        userId,
        company_name,
        job_title,
        start_year,
        end_year,
      );

      return res.status(201).json({
        message: "Employment record created successfully",
        employment,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  getEmploymentHistory: async (req, res) => {
    try {
      const userId = req.user.userId;

      const employmentHistory =
        await employmentService.getEmploymentHistory(userId);

      return res.status(200).json(employmentHistory);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },
};

module.exports = employmentController;
