const licenceRepository = require("../repositories/licenceRepository");
const profileRepository = require("../repositories/profileRepository");

const licenceService = {
  createLicence: async (
    userId,
    licenceName,
    issuingAuthority,
    yearCompleted,
  ) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await licenceRepository.createLicence(
      profile.id,
      licenceName,
      issuingAuthority,
      yearCompleted,
    );
  },

  getLicences: async (userId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await licenceRepository.findByProfileId(profile.id);
  },

  updateLicence: async (
    userId,
    licenceId,
    licenceName,
    issuingAuthority,
    yearCompleted,
  ) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const licence = await licenceRepository.findById(licenceId);

    if (!licence || licence.profile_id !== profile.id) {
      throw new Error("Licence not found");
    }

    return await licenceRepository.updateLicence(
      licenceId,
      licenceName,
      issuingAuthority,
      yearCompleted,
    );
  },

  deleteLicence: async (userId, licenceId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const licence = await licenceRepository.findById(licenceId);

    if (!licence || licence.profile_id !== profile.id) {
      throw new Error("Licence not found");
    }

    return await licenceRepository.deleteLicence(licenceId);
  },
};

module.exports = licenceService;
