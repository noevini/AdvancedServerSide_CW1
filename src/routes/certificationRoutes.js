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

/**
 * @swagger
 * /certifications/{id}:
 *   put:
 *     summary: Update a certification
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Delete a certification
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, certificationController.updateCertification);
router.delete(
  "/:id",
  authMiddleware,
  certificationController.deleteCertification,
);

module.exports = router;
