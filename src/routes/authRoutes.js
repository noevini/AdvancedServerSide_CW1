const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const { authLimiter } = require("../middleware/rateLimitMiddleware");

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new alumni user
 *     tags: [Auth]
 */
router.post("/register", authLimiter, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and receive a JWT token
 *     tags: [Auth]
 */
router.post("/login", authLimiter, authController.login);

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verify email with token
 *     tags: [Auth]
 */
router.post("/verify-email", authController.verifyEmail);

/**
 * @swagger
 * /auth/request-password-reset:
 *   post:
 *     summary: Request a password reset token
 *     tags: [Auth]
 */
router.post(
  "/request-password-reset",
  authLimiter,
  authController.requestPasswordReset,
);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password using token
 *     tags: [Auth]
 */
router.post("/reset-password", authLimiter, authController.resetPassword);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 */
router.post("/logout", authMiddleware, authController.logout);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 */
router.get("/me", authMiddleware, authController.me);

module.exports = router;
