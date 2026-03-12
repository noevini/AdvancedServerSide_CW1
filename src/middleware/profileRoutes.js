const express = require("express");
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /profile/me:
 *   get:
 *     summary: Get authenticated user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 */
router.get("/me", authMiddleware, profileController.getMyProfile);

/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Create profile for authenticated user
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, profileController.createProfile);

module.exports = router;
