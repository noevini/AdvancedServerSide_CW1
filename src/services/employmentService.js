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

    const employment = await employmentRepository.createEmployment(
      profile.id,
      companyName,
      jobTitle,
      startYear,
      endYear,
    );

    return employment;
  },

  getEmploymentHistory: async (userId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const employmentHistory = await employmentRepository.findByProfileId(
      profile.id,
    );

    return employmentHistory;
  },
};

module.exports = employmentService;
