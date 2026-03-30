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

/**
 * @swagger
 * /employment-history/{id}:
 *   put:
 *     summary: Update an employment record
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Delete an employment record
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, employmentController.updateEmployment);
router.delete("/:id", authMiddleware, employmentController.deleteEmployment);

module.exports = router;
