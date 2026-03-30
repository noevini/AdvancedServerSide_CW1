const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verify user email
 */
router.post("/verify-email", authController.verifyEmail);

/**
 * @swagger
 * /auth/request-password-reset:
 *   post:
 *     summary: Request password reset
 */
router.post("/request-password-reset", authController.requestPasswordReset);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password
 */
router.post("/reset-password", authController.resetPassword);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     security:
 *       - bearerAuth: []
 */
router.post("/logout", authMiddleware, authController.logout);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get authenticated user
 *     security:
 *       - bearerAuth: []
 */
router.get("/me", authMiddleware, authController.me);

module.exports = router;
