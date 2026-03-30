const profileRepository = require("../repositories/profileRepository");
const degreeRepository = require("../repositories/degreeRepository");
const certificationRepository = require("../repositories/certificationRepository");
const licenceRepository = require("../repositories/licenceRepository");
const shortCourseRepository = require("../repositories/shortCourseRepository");
const employmentRepository = require("../repositories/employmentRepository");

const profileService = {
  getMyProfile: async (userId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found");
    }

    return profile;
  },

  createProfile: async (userId, fullName, biography, linkedinUrl, imageUrl) => {
    const existingProfile = await profileRepository.findByUserId(userId);

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

    const newProfile = await profileRepository.createProfile(
      userId,
      fullName,
      biography,
      linkedinUrl,
      imageUrl,
    );

    return newProfile;
  },

  updateProfileImage: async (userId, imageUrl) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found");
    }

    if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
      throw new Error("Invalid image URL");
    }

    const updated = await profileRepository.updateImageUrl(userId, imageUrl);
    return updated;
  },

  updateLinkedinUrl: async (userId, linkedinUrl) => {
    const profile = await profileRepository.findByUserId(userId);

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

    const updated = await profileRepository.updateLinkedinUrl(
      userId,
      linkedinUrl,
    );
    return updated;
  },

  getProfileCompletionStatus: async (userId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found");
    }

    const degrees = await degreeRepository.findByProfileId(profile.id);
    const certifications = await certificationRepository.findByProfileId(
      profile.id,
    );
    const licences = await licenceRepository.findByProfileId(profile.id);
    const shortCourses = await shortCourseRepository.findByProfileId(
      profile.id,
    );
    const employmentHistory = await employmentRepository.findByProfileId(
      profile.id,
    );

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
