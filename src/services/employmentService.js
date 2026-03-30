const employmentRepository = require("../repositories/employmentRepository");
const profileRepository = require("../repositories/profileRepository");

const employmentService = {
  createEmployment: async (
    userId,
    companyName,
    jobTitle,
    startYear,
    endYear,
  ) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await employmentRepository.createEmployment(
      profile.id,
      companyName,
      jobTitle,
      startYear,
      endYear,
    );
  },

  getEmploymentHistory: async (userId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await employmentRepository.findByProfileId(profile.id);
  },

  updateEmployment: async (
    userId,
    employmentId,
    companyName,
    jobTitle,
    startYear,
    endYear,
  ) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const employment = await employmentRepository.findById(employmentId);

    if (!employment || employment.profile_id !== profile.id) {
      throw new Error("Employment record not found");
    }

    return await employmentRepository.updateEmployment(
      employmentId,
      companyName,
      jobTitle,
      startYear,
      endYear,
    );
  },

  deleteEmployment: async (userId, employmentId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const employment = await employmentRepository.findById(employmentId);

    if (!employment || employment.profile_id !== profile.id) {
      throw new Error("Employment record not found");
    }

    return await employmentRepository.deleteEmployment(employmentId);
  },
};

module.exports = employmentService;
