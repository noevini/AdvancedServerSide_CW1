const express = require("express");
const degreeController = require("../controllers/degreeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /degrees:
 *   post:
 *     summary: Create a degree for the authenticated user
 *     security:
 *       - bearerAuth: []
 *   get:
 *     summary: Get all degrees for the authenticated user
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, degreeController.createDegree);
router.get("/", authMiddleware, degreeController.getDegrees);

/**
 * @swagger
 * /degrees/{id}:
 *   put:
 *     summary: Update a degree
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Delete a degree
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, degreeController.updateDegree);
router.delete("/:id", authMiddleware, degreeController.deleteDegree);

module.exports = router;
