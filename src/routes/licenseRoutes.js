const express = require("express");
const licenceController = require("../controllers/licenceController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /licences:
 *   post:
 *     summary: Create a licence
 *     tags: [Licences]
 *     security:
 *       - bearerAuth: []
 *   get:
 *     summary: Get all licences
 *     tags: [Licences]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, licenceController.createLicence);
router.get("/", authMiddleware, licenceController.getLicences);

/**
 * @swagger
 * /licences/{id}:
 *   put:
 *     summary: Update a licence
 *     tags: [Licences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *   delete:
 *     summary: Delete a licence
 *     tags: [Licences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.put("/:id", authMiddleware, licenceController.updateLicence);
router.delete("/:id", authMiddleware, licenceController.deleteLicence);

module.exports = router;
