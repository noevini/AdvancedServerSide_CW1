const degreeRepository = require("../repositories/degreeRepository");
const profileRepository = require("../repositories/profileRepository");

const degreeService = {
  createDegree: async (userId, degreeName, institution, yearCompleted) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const degree = await degreeRepository.createDegree(
      profile.id,
      degreeName,
      institution,
      yearCompleted,
    );

    return degree;
  },

  getDegrees: async (userId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const degrees = await degreeRepository.findByProfileId(profile.id);

    return degrees;
  },
};

module.exports = degreeService;
