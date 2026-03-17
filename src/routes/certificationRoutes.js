const express = require("express");
const certificationController = require("../controllers/certificationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /certifications:
 *   post:
 *     summary: Create a certification for the authenticated user
 *     security:
 *       - bearerAuth: []
 *   get:
 *     summary: Get all certifications for the authenticated user
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, certificationController.createCertification);
router.get("/", authMiddleware, certificationController.getCertifications);

module.exports = router;
