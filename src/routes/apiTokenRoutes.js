const express = require("express");
const apiTokenController = require("../controllers/apiTokenController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api-tokens:
 *   post:
 *     summary: Create a new API token
 *     security:
 *       - bearerAuth: []
 *   get:
 *     summary: Get all API tokens
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, apiTokenController.createToken);
router.get("/", authMiddleware, apiTokenController.getAllTokens);

/**
 * @swagger
 * /api-tokens/{tokenId}:
 *   delete:
 *     summary: Revoke an API token
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:tokenId", authMiddleware, apiTokenController.revokeToken);

/**
 * @swagger
 * /api-tokens/logs:
 *   get:
 *     summary: Get all API usage logs
 *     security:
 *       - bearerAuth: []
 */
router.get("/logs", authMiddleware, apiTokenController.getAllLogs);

module.exports = router;
