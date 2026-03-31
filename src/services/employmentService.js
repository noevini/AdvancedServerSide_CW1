const employmentDAO = require("../dao/employmentDAO");
const profileDAO = require("../dao/profileDAO");

const employmentService = {
  createEmployment: async (
    userId,
    companyName,
    jobTitle,
    startYear,
    endYear,
  ) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await employmentDAO.createEmployment(
      profile.id,
      companyName,
      jobTitle,
      startYear,
      endYear,
    );
  },

  getEmploymentHistory: async (userId) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await employmentDAO.findByProfileId(profile.id);
  },

  updateEmployment: async (
    userId,
    employmentId,
    companyName,
    jobTitle,
    startYear,
    endYear,
  ) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const employment = await employmentDAO.findById(employmentId);

    if (!employment || employment.profile_id !== profile.id) {
      throw new Error("Employment record not found");
    }

    return await employmentDAO.updateEmployment(
      employmentId,
      companyName,
      jobTitle,
      startYear,
      endYear,
    );
  },

  deleteEmployment: async (userId, employmentId) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const employment = await employmentDAO.findById(employmentId);

    if (!employment || employment.profile_id !== profile.id) {
      throw new Error("Employment record not found");
    }

    return await employmentDAO.deleteEmployment(employmentId);
  },
};

module.exports = employmentService;
