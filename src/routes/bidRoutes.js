const express = require("express");
const bidController = require("../controllers/bidController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /bids:
 *   post:
 *     summary: Place or update a bid (increase-only)
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, bidController.createBid);

/**
 * @swagger
 * /bids/me:
 *   get:
 *     summary: Get bids of the authenticated user
 *     security:
 *       - bearerAuth: []
 */
router.get("/me", authMiddleware, bidController.getMyBids);

/**
 * @swagger
 * /bids/cancel:
 *   post:
 *     summary: Cancel current bid
 *     security:
 *       - bearerAuth: []
 */
router.post("/cancel", authMiddleware, bidController.cancelMyBid);

/**
 * @swagger
 * /bids/select-winner:
 *   post:
 *     summary: Select the highest bid as winner
 *     security:
 *       - bearerAuth: []
 */
router.post("/select-winner", authMiddleware, bidController.selectWinner);

/**
 * @swagger
 * /bids/featured:
 *   get:
 *     summary: Get the current featured alumnus
 */
router.get("/featured", bidController.getFeaturedAlumnus);

/**
 * @swagger
 * /bids/tomorrow-slot:
 *   get:
 *     summary: View tomorrow's slot
 */
router.get("/tomorrow-slot", bidController.getTomorrowSlot);

/**
 * @swagger
 * /bids/monthly-limit:
 *   get:
 *     summary: View monthly limit status
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/monthly-limit",
  authMiddleware,
  bidController.getMonthlyLimitStatus,
);

/**
 * @swagger
 * /bids/reset-appearance-counts:
 *   post:
 *     summary: Reset all appearance counts
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/reset-appearance-counts",
  authMiddleware,
  bidController.resetAppearanceCounts,
);

module.exports = router;
