const express = require("express");
const employmentController = require("../controllers/employmentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /employment-history:
 *   post:
 *     summary: Create an employment record for the authenticated user
 *     security:
 *       - bearerAuth: []
 *   get:
 *     summary: Get employment history for the authenticated user
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, employmentController.createEmployment);
router.get("/", authMiddleware, employmentController.getEmploymentHistory);

module.exports = router;
