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

    return await certificationRepository.createCertification(
      profile.id,
      certificationName,
      provider,
      yearCompleted,
    );
  },

  getCertifications: async (userId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await certificationRepository.findByProfileId(profile.id);
  },

  updateCertification: async (
    userId,
    certificationId,
    certificationName,
    provider,
    yearCompleted,
  ) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const certification =
      await certificationRepository.findById(certificationId);

    if (!certification || certification.profile_id !== profile.id) {
      throw new Error("Certification not found");
    }

    return await certificationRepository.updateCertification(
      certificationId,
      certificationName,
      provider,
      yearCompleted,
    );
  },

  deleteCertification: async (userId, certificationId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const certification =
      await certificationRepository.findById(certificationId);

    if (!certification || certification.profile_id !== profile.id) {
      throw new Error("Certification not found");
    }

    return await certificationRepository.deleteCertification(certificationId);
  },
};

module.exports = certificationService;
