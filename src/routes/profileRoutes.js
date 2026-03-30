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

/**
 * @swagger
 * /profile/image:
 *   put:
 *     summary: Update profile image
 *     security:
 *       - bearerAuth: []
 */
router.put("/image", authMiddleware, profileController.updateProfileImage);

/**
 * @swagger
 * /profile/linkedin:
 *   put:
 *     summary: Update LinkedIn URL
 *     security:
 *       - bearerAuth: []
 */
router.put("/linkedin", authMiddleware, profileController.updateLinkedinUrl);

/**
 * @swagger
 * /profile/completion-status:
 *   get:
 *     summary: Get profile completion status
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/completion-status",
  authMiddleware,
  profileController.getProfileCompletionStatus,
);

module.exports = router;
