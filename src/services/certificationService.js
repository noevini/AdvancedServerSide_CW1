const certificationRepository = require("../repositories/certificationRepository");
const profileRepository = require("../repositories/profileRepository");

const certificationService = {
  createCertification: async (
    userId,
    certificationName,
    provider,
    yearCompleted,
  ) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const certification = await certificationRepository.createCertification(
      profile.id,
      certificationName,
      provider,
      yearCompleted,
    );

    return certification;
  },

  getCertifications: async (userId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const certifications = await certificationRepository.findByProfileId(
      profile.id,
    );

    return certifications;
  },
};

module.exports = certificationService;
