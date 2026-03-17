const express = require("express");
const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const router = express.Router();
const degreeRoutes = require("./degreeRoutes");
const certificationRoutes = require("./certificationRoutes");

router.get("/", (req, res) => {
  res.send("API is running");
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the current API status.
 *     responses:
 *       200:
 *         description: Server is running successfully
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
  });
});

/* auth routes */
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/degrees", degreeRoutes);
router.use("/certifications", certificationRoutes);

module.exports = router;
