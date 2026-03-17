const certificationService = require("../services/certificationService");

const certificationController = {
  createCertification: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { certification_name, provider, year_completed } = req.body;

      const certification = await certificationService.createCertification(
        userId,
        certification_name,
        provider,
        year_completed,
      );

      return res.status(201).json({
        message: "Certification created successfully",
        certification,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  getCertifications: async (req, res) => {
    try {
      const userId = req.user.userId;

      const certifications =
        await certificationService.getCertifications(userId);

      return res.status(200).json(certifications);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },
};

module.exports = certificationController;
