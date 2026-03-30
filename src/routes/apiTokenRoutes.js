const express = require("express");
const apiTokenController = require("../controllers/apiTokenController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api-tokens:
 *   post:
 *     summary: Create a new API bearer token
 *     description: Generates a secure bearer token for an external client to access the public API endpoints.
 *     tags: [API Tokens]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiTokenRequest'
 *     responses:
 *       201:
 *         description: Token created successfully
 *       400:
 *         description: Client name is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", authMiddleware, apiTokenController.createToken);

/**
 * @swagger
 * /api-tokens:
 *   get:
 *     summary: Get all API tokens
 *     description: Returns all bearer tokens with their client name, creation date, and revocation status.
 *     tags: [API Tokens]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all API tokens
 */
router.get("/", authMiddleware, apiTokenController.getAllTokens);

/**
 * @swagger
 * /api-tokens/logs:
 *   get:
 *     summary: Get API usage logs
 *     description: Returns all usage logs showing which tokens accessed which endpoints and when.
 *     tags: [API Tokens]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of usage logs with token ID, endpoint, method and timestamp
 */
router.get("/logs", authMiddleware, apiTokenController.getAllLogs);

/**
 * @swagger
 * /api-tokens/{tokenId}:
 *   delete:
 *     summary: Revoke an API token
 *     description: Revokes a bearer token so it can no longer be used to access the API.
 *     tags: [API Tokens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tokenId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the token to revoke
 *     responses:
 *       200:
 *         description: Token revoked successfully
 *       404:
 *         description: Token not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/:tokenId", authMiddleware, apiTokenController.revokeToken);

module.exports = router;
