const degreeRepository = require("../repositories/degreeRepository");
const profileRepository = require("../repositories/profileRepository");

const degreeService = {
  createDegree: async (userId, degreeName, institution, yearCompleted) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await degreeRepository.createDegree(
      profile.id,
      degreeName,
      institution,
      yearCompleted,
    );
  },

  getDegrees: async (userId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await degreeRepository.findByProfileId(profile.id);
  },

  updateDegree: async (
    userId,
    degreeId,
    degreeName,
    institution,
    yearCompleted,
  ) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const degree = await degreeRepository.findById(degreeId);

    if (!degree || degree.profile_id !== profile.id) {
      throw new Error("Degree not found");
    }

    return await degreeRepository.updateDegree(
      degreeId,
      degreeName,
      institution,
      yearCompleted,
    );
  },

  deleteDegree: async (userId, degreeId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const degree = await degreeRepository.findById(degreeId);

    if (!degree || degree.profile_id !== profile.id) {
      throw new Error("Degree not found");
    }

    return await degreeRepository.deleteDegree(degreeId);
  },
};

module.exports = degreeService;
