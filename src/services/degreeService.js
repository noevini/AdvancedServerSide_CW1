const degreeDAO = require("../dao/degreeDAO");
const profileDAO = require("../dao/profileDAO");

const degreeService = {
  createDegree: async (userId, degreeName, institution, yearCompleted) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await degreeDAO.createDegree(
      profile.id,
      degreeName,
      institution,
      yearCompleted,
    );
  },

  getDegrees: async (userId) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await degreeDAO.findByProfileId(profile.id);
  },

  updateDegree: async (
    userId,
    degreeId,
    degreeName,
    institution,
    yearCompleted,
  ) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const degree = await degreeDAO.findById(degreeId);

    if (!degree || degree.profile_id !== profile.id) {
      throw new Error("Degree not found");
    }

    return await degreeDAO.updateDegree(
      degreeId,
      degreeName,
      institution,
      yearCompleted,
    );
  },

  deleteDegree: async (userId, degreeId) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const degree = await degreeDAO.findById(degreeId);

    if (!degree || degree.profile_id !== profile.id) {
      throw new Error("Degree not found");
    }

    return await degreeDAO.deleteDegree(degreeId);
  },
};

module.exports = degreeService;
