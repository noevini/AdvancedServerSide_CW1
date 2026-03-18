const shortCourseRepository = require("../repositories/shortCourseRepository");
const profileRepository = require("../repositories/profileRepository");

const shortCourseService = {
  createShortCourse: async (userId, courseName, provider, yearCompleted) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const shortCourse = await shortCourseRepository.createShortCourse(
      profile.id,
      courseName,
      provider,
      yearCompleted,
    );

    return shortCourse;
  },

  getShortCourses: async (userId) => {
    const profile = await profileRepository.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const shortCourses = await shortCourseRepository.findByProfileId(
      profile.id,
    );

    return shortCourses;
  },
};

module.exports = shortCourseService;
