const express = require("express");
const licenceController = require("../controllers/licenceController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /licences:
 *   post:
 *     summary: Create a licence for the authenticated user
 *     security:
 *       - bearerAuth: []
 *   get:
 *     summary: Get all licences for the authenticated user
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
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Delete a licence
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, licenceController.updateLicence);
router.delete("/:id", authMiddleware, licenceController.deleteLicence);

module.exports = router;
