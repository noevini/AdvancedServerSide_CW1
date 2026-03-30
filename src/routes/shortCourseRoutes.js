const express = require("express");
const shortCourseController = require("../controllers/shortCourseController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /short-courses:
 *   post:
 *     summary: Create a short course
 *     tags: [Short Courses]
 *     security:
 *       - bearerAuth: []
 *   get:
 *     summary: Get all short courses
 *     tags: [Short Courses]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, shortCourseController.createShortCourse);
router.get("/", authMiddleware, shortCourseController.getShortCourses);

/**
 * @swagger
 * /short-courses/{id}:
 *   put:
 *     summary: Update a short course
 *     tags: [Short Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *   delete:
 *     summary: Delete a short course
 *     tags: [Short Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.put("/:id", authMiddleware, shortCourseController.updateShortCourse);
router.delete("/:id", authMiddleware, shortCourseController.deleteShortCourse);

module.exports = router;
