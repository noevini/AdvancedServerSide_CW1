const express = require("express");
const shortCourseController = require("../controllers/shortCourseController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /short-courses:
 *   post:
 *     summary: Create a short course for the authenticated user
 *     security:
 *       - bearerAuth: []
 *   get:
 *     summary: Get all short courses for the authenticated user
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
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Delete a short course
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, shortCourseController.updateShortCourse);
router.delete("/:id", authMiddleware, shortCourseController.deleteShortCourse);

module.exports = router;
