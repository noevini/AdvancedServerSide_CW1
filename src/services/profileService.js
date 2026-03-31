const profileDAO = require("../dao/profileDAO");
const degreeDAO = require("../dao/degreeDAO");
const certificationDAO = require("../dao/certificationDAO");
const licenceDAO = require("../dao/licenceDAO");
const shortCourseDAO = require("../dao/shortCourseDAO");
const employmentDAO = require("../dao/employmentDAO");

const profileService = {
  getMyProfile: async (userId) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found");
    }

    return profile;
  },

  createProfile: async (userId, fullName, biography, linkedinUrl, imageUrl) => {
    const existingProfile = await profileDAO.findByUserId(userId);

    if (existingProfile) {
      throw new Error("Profile already exists for this user");
    }

    if (!fullName || fullName.trim().length < 2) {
      throw new Error("Full name is required");
    }

    if (linkedinUrl) {
      if (
        !linkedinUrl.startsWith("http://") &&
        !linkedinUrl.startsWith("https://")
      ) {
        throw new Error("Invalid LinkedIn URL");
      }
      if (!linkedinUrl.toLowerCase().includes("linkedin.com")) {
        throw new Error("Invalid LinkedIn URL");
      }
    }

    if (imageUrl) {
      if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
        throw new Error("Invalid image URL");
      }
    }

    return await profileDAO.createProfile(
      userId,
      fullName,
      biography,
      linkedinUrl,
      imageUrl,
    );
  },

  updateProfileImage: async (userId, imageUrl) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found");
    }

    if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
      throw new Error("Invalid image URL");
    }

    return await profileDAO.updateImageUrl(userId, imageUrl);
  },

  updateLinkedinUrl: async (userId, linkedinUrl) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found");
    }

    if (
      !linkedinUrl.startsWith("http://") &&
      !linkedinUrl.startsWith("https://")
    ) {
      throw new Error("Invalid LinkedIn URL");
    }

    if (!linkedinUrl.toLowerCase().includes("linkedin.com")) {
      throw new Error("Invalid LinkedIn URL");
    }

    return await profileDAO.updateLinkedinUrl(userId, linkedinUrl);
  },

  getProfileCompletionStatus: async (userId) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found");
    }

    const degrees = await degreeDAO.findByProfileId(profile.id);
    const certifications = await certificationDAO.findByProfileId(profile.id);
    const licences = await licenceDAO.findByProfileId(profile.id);
    const shortCourses = await shortCourseDAO.findByProfileId(profile.id);
    const employmentHistory = await employmentDAO.findByProfileId(profile.id);

    let completedFields = 0;
    const totalFields = 8;

    if (profile.full_name) completedFields++;
    if (profile.biography) completedFields++;
    if (profile.linkedin_url) completedFields++;
    if (profile.image_url) completedFields++;
    if (degrees.length > 0) completedFields++;
    if (certifications.length > 0) completedFields++;
    if (licences.length > 0 || shortCourses.length > 0) completedFields++;
    if (employmentHistory.length > 0) completedFields++;

    const percentage = Math.round((completedFields / totalFields) * 100);

    return {
      completed_fields: completedFields,
      total_fields: totalFields,
      completion_percentage: percentage,
    };
  },
};

module.exports = profileService;
