const licenceDAO = require("../dao/licenceDAO");
const profileDAO = require("../dao/profileDAO");

const licenceService = {
  createLicence: async (
    userId,
    licenceName,
    issuingAuthority,
    yearCompleted,
  ) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await licenceDAO.createLicence(
      profile.id,
      licenceName,
      issuingAuthority,
      yearCompleted,
    );
  },

  getLicences: async (userId) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await licenceDAO.findByProfileId(profile.id);
  },

  updateLicence: async (
    userId,
    licenceId,
    licenceName,
    issuingAuthority,
    yearCompleted,
  ) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const licence = await licenceDAO.findById(licenceId);

    if (!licence || licence.profile_id !== profile.id) {
      throw new Error("Licence not found");
    }

    return await licenceDAO.updateLicence(
      licenceId,
      licenceName,
      issuingAuthority,
      yearCompleted,
    );
  },

  deleteLicence: async (userId, licenceId) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const licence = await licenceDAO.findById(licenceId);

    if (!licence || licence.profile_id !== profile.id) {
      throw new Error("Licence not found");
    }

    return await licenceDAO.deleteLicence(licenceId);
  },
};

module.exports = licenceService;
