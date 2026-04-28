const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");
const apiTokenMiddleware = require("../middleware/apiTokenMiddleware");
const requirePermission = require("../middleware/requirePermission");

router.get(
  "/summary",
  apiTokenMiddleware,
  requirePermission("read:analytics"),
  analyticsController.getSummary,
);

router.get(
  "/certifications",
  apiTokenMiddleware,
  requirePermission("read:analytics"),
  analyticsController.getCertifications,
);

router.get(
  "/trends",
  apiTokenMiddleware,
  requirePermission("read:analytics"),
  analyticsController.getTrends,
);

router.get(
  "/employment",
  apiTokenMiddleware,
  requirePermission("read:analytics"),
  analyticsController.getEmployment,
);

router.get(
  "/short-courses",
  apiTokenMiddleware,
  requirePermission("read:analytics"),
  analyticsController.getShortCourses,
);

router.get(
  "/geographic",
  apiTokenMiddleware,
  requirePermission("read:analytics"),
  analyticsController.getGeographic,
);

router.get(
  "/alumni",
  apiTokenMiddleware,
  requirePermission("read:alumni"),
  analyticsController.getAlumni,
);

module.exports = router;
