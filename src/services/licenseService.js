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

    const licence = await licenceRepository.createLicence(
      profile.id,
      licenceName,
      issuingAuthority,
      yearCompleted,
    );

    return licence;
  },

  getLicences: async (userId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const licences = await licenceRepository.findByProfileId(profile.id);

    return licences;
  },
};

module.exports = licenceService;
