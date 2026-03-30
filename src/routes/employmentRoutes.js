const express = require("express");
const employmentController = require("../controllers/employmentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /employment-history:
 *   post:
 *     summary: Create an employment record
 *     tags: [Employment]
 *     security:
 *       - bearerAuth: []
 *   get:
 *     summary: Get all employment history
 *     tags: [Employment]
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
 *     tags: [Employment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *   delete:
 *     summary: Delete an employment record
 *     tags: [Employment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.put("/:id", authMiddleware, employmentController.updateEmployment);
router.delete("/:id", authMiddleware, employmentController.deleteEmployment);

module.exports = router;
