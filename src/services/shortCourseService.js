const shortCourseRepository = require("../repositories/shortCourseRepository");
const profileRepository = require("../repositories/profileRepository");

const shortCourseService = {
  createShortCourse: async (userId, courseName, provider, yearCompleted) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await shortCourseRepository.createShortCourse(
      profile.id,
      courseName,
      provider,
      yearCompleted,
    );
  },

  getShortCourses: async (userId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await shortCourseRepository.findByProfileId(profile.id);
  },

  updateShortCourse: async (
    userId,
    shortCourseId,
    courseName,
    provider,
    yearCompleted,
  ) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const shortCourse = await shortCourseRepository.findById(shortCourseId);

    if (!shortCourse || shortCourse.profile_id !== profile.id) {
      throw new Error("Short course not found");
    }

    return await shortCourseRepository.updateShortCourse(
      shortCourseId,
      courseName,
      provider,
      yearCompleted,
    );
  },

  deleteShortCourse: async (userId, shortCourseId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const shortCourse = await shortCourseRepository.findById(shortCourseId);

    if (!shortCourse || shortCourse.profile_id !== profile.id) {
      throw new Error("Short course not found");
    }

    return await shortCourseRepository.deleteShortCourse(shortCourseId);
  },
};

module.exports = shortCourseService;
