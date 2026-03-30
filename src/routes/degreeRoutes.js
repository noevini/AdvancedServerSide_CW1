const express = require("express");
const degreeController = require("../controllers/degreeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /degrees:
 *   post:
 *     summary: Create a degree
 *     tags: [Degrees]
 *     security:
 *       - bearerAuth: []
 *   get:
 *     summary: Get all degrees
 *     tags: [Degrees]
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
 *     tags: [Degrees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *   delete:
 *     summary: Delete a degree
 *     tags: [Degrees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.put("/:id", authMiddleware, degreeController.updateDegree);
router.delete("/:id", authMiddleware, degreeController.deleteDegree);

module.exports = router;
