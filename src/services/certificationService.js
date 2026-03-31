const certificationDAO = require("../dao/certificationDAO");
const profileDAO = require("../dao/profileDAO");

const certificationService = {
  createCertification: async (
    userId,
    certificationName,
    provider,
    yearCompleted,
  ) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await certificationDAO.createCertification(
      profile.id,
      certificationName,
      provider,
      yearCompleted,
    );
  },

  getCertifications: async (userId) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await certificationDAO.findByProfileId(profile.id);
  },

  updateCertification: async (
    userId,
    certificationId,
    certificationName,
    provider,
    yearCompleted,
  ) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const certification = await certificationDAO.findById(certificationId);

    if (!certification || certification.profile_id !== profile.id) {
      throw new Error("Certification not found");
    }

    return await certificationDAO.updateCertification(
      certificationId,
      certificationName,
      provider,
      yearCompleted,
    );
  },

  deleteCertification: async (userId, certificationId) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const certification = await certificationDAO.findById(certificationId);

    if (!certification || certification.profile_id !== profile.id) {
      throw new Error("Certification not found");
    }

    return await certificationDAO.deleteCertification(certificationId);
  },
};

module.exports = certificationService;
