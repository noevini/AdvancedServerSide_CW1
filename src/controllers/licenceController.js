const licenceService = require("../services/licenceService");

const licenceController = {
  createLicence: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { licence_name, issuing_authority, year_completed } = req.body;

      const licence = await licenceService.createLicence(
        userId,
        licence_name,
        issuing_authority,
        year_completed,
      );

      return res.status(201).json({
        message: "Licence created successfully",
        licence,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  getLicences: async (req, res) => {
    try {
      const userId = req.user.userId;
      const licences = await licenceService.getLicences(userId);

      return res.status(200).json(licences);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },

  updateLicence: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { id } = req.params;
      const { licence_name, issuing_authority, year_completed } = req.body;

      const licence = await licenceService.updateLicence(
        userId,
        Number(id),
        licence_name,
        issuing_authority,
        year_completed,
      );

      return res.status(200).json({
        message: "Licence updated successfully",
        licence,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  deleteLicence: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { id } = req.params;

      const result = await licenceService.deleteLicence(userId, Number(id));

      return res.status(200).json({
        message: "Licence deleted successfully",
        result,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },
};

module.exports = licenceController;
