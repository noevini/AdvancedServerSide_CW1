const shortCourseDAO = require("../dao/shortCourseDAO");
const profileDAO = require("../dao/profileDAO");

const shortCourseService = {
  createShortCourse: async (userId, courseName, provider, yearCompleted) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await shortCourseDAO.createShortCourse(
      profile.id,
      courseName,
      provider,
      yearCompleted,
    );
  },

  getShortCourses: async (userId) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    return await shortCourseDAO.findByProfileId(profile.id);
  },

  updateShortCourse: async (
    userId,
    shortCourseId,
    courseName,
    provider,
    yearCompleted,
  ) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const shortCourse = await shortCourseDAO.findById(shortCourseId);

    if (!shortCourse || shortCourse.profile_id !== profile.id) {
      throw new Error("Short course not found");
    }

    return await shortCourseDAO.updateShortCourse(
      shortCourseId,
      courseName,
      provider,
      yearCompleted,
    );
  },

  deleteShortCourse: async (userId, shortCourseId) => {
    const profile = await profileDAO.findByUserId(userId);

    if (!profile) {
      throw new Error("Profile not found for this user");
    }

    const shortCourse = await shortCourseDAO.findById(shortCourseId);

    if (!shortCourse || shortCourse.profile_id !== profile.id) {
      throw new Error("Short course not found");
    }

    return await shortCourseDAO.deleteShortCourse(shortCourseId);
  },
};

module.exports = shortCourseService;
