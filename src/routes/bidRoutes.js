const express = require("express");
const bidController = require("../controllers/bidController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /bids:
 *   post:
 *     summary: Place a new bid
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bid_amount]
 *             properties:
 *               bid_amount:
 *                 type: number
 *                 example: 250
 *   put:
 *     summary: Update bid amount (increase only)
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bid_amount]
 *             properties:
 *               bid_amount:
 *                 type: number
 *                 example: 500
 */
router.post("/", authMiddleware, bidController.createBid);
router.put("/", authMiddleware, bidController.createBid);

/**
 * @swagger
 * /bids/me:
 *   get:
 *     summary: Get bidding history of the authenticated user
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 */
router.get("/me", authMiddleware, bidController.getMyBids);

/**
 * @swagger
 * /bids/cancel:
 *   delete:
 *     summary: Cancel current active bid
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/cancel", authMiddleware, bidController.cancelMyBid);

/**
 * @swagger
 * /bids/select-winner:
 *   post:
 *     summary: Manually trigger winner selection
 *     description: In production this runs automatically at midnight.
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 */
router.post("/select-winner", authMiddleware, bidController.selectWinner);

/**
 * @swagger
 * /bids/featured:
 *   get:
 *     summary: Get the current highest bid before winner is selected
 *     tags: [Bids]
 */
router.get("/featured", bidController.getFeaturedAlumnus);

/**
 * @swagger
 * /bids/tomorrow-slot:
 *   get:
 *     summary: View tomorrow's available featured alumni slot
 *     tags: [Bids]
 */
router.get("/tomorrow-slot", bidController.getTomorrowSlot);

/**
 * @swagger
 * /bids/monthly-limit:
 *   get:
 *     summary: View monthly bidding win limit status
 *     tags: [Bids]
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
 *     summary: Reset appearance count for all users
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/reset-appearance-counts",
  authMiddleware,
  bidController.resetAppearanceCounts,
);

/**
 * @swagger
 * /bids/active:
 *   get:
 *     summary: Get today's active featured alumnus
 *     tags: [Bids]
 */
router.get("/active", bidController.getActiveAlumnus);

module.exports = router;
