const shortCourseService = require("../services/shortCourseService");

const shortCourseController = {
  createShortCourse: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { course_name, provider, year_completed } = req.body;

      const shortCourse = await shortCourseService.createShortCourse(
        userId,
        course_name,
        provider,
        year_completed,
      );

      return res.status(201).json({
        message: "Short course created successfully",
        shortCourse,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  getShortCourses: async (req, res) => {
    try {
      const userId = req.user.userId;
      const shortCourses = await shortCourseService.getShortCourses(userId);

      return res.status(200).json(shortCourses);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },

  updateShortCourse: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { id } = req.params;
      const { course_name, provider, year_completed } = req.body;

      const shortCourse = await shortCourseService.updateShortCourse(
        userId,
        Number(id),
        course_name,
        provider,
        year_completed,
      );

      return res.status(200).json({
        message: "Short course updated successfully",
        shortCourse,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  deleteShortCourse: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { id } = req.params;

      const result = await shortCourseService.deleteShortCourse(
        userId,
        Number(id),
      );

      return res.status(200).json({
        message: "Short course deleted successfully",
        result,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },
};

module.exports = shortCourseController;
