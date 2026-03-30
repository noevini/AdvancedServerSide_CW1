const express = require("express");
const certificationController = require("../controllers/certificationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /certifications:
 *   post:
 *     summary: Create a certification
 *     tags: [Certifications]
 *     security:
 *       - bearerAuth: []
 *   get:
 *     summary: Get all certifications
 *     tags: [Certifications]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, certificationController.createCertification);
router.get("/", authMiddleware, certificationController.getCertifications);

/**
 * @swagger
 * /certifications/{id}:
 *   put:
 *     summary: Update a certification
 *     tags: [Certifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *   delete:
 *     summary: Delete a certification
 *     tags: [Certifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.put("/:id", authMiddleware, certificationController.updateCertification);
router.delete(
  "/:id",
  authMiddleware,
  certificationController.deleteCertification,
);

module.exports = router;
