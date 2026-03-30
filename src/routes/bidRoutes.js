const express = require("express");
const bidController = require("../controllers/bidController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /bids:
 *   post:
 *     summary: Place or update a bid (increase-only)
 *     description: Places a new bid or increases an existing one. The highest bid wins at midnight. Users cannot see the current highest bid — only win/lose status.
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BidRequest'
 *     responses:
 *       201:
 *         description: Bid placed or updated successfully
 *       400:
 *         description: Invalid bid amount or monthly limit reached
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", authMiddleware, bidController.createBid);

/**
 * @swagger
 * /bids/me:
 *   get:
 *     summary: Get all bids of the authenticated user
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's bids with status (PENDING, WON, LOST, CANCELLED)
 */
router.get("/me", authMiddleware, bidController.getMyBids);

/**
 * @swagger
 * /bids/cancel:
 *   post:
 *     summary: Cancel current active bid
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bid cancelled successfully
 *       400:
 *         description: No active bid found or bid already cancelled
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/cancel", authMiddleware, bidController.cancelMyBid);

/**
 * @swagger
 * /bids/select-winner:
 *   post:
 *     summary: Manually trigger winner selection
 *     description: Exposed for testing and demonstration. In production this runs automatically at midnight via a scheduled job.
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Winner selected successfully
 *       400:
 *         description: No bids available
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/select-winner", authMiddleware, bidController.selectWinner);

/**
 * @swagger
 * /bids/featured:
 *   get:
 *     summary: Get the current highest bid before winner is selected
 *     tags: [Bids]
 *     responses:
 *       200:
 *         description: Current highest bid
 *       404:
 *         description: No featured alumnus available
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/featured", bidController.getFeaturedAlumnus);

/**
 * @swagger
 * /bids/tomorrow-slot:
 *   get:
 *     summary: View tomorrow's available featured alumni slot date
 *     tags: [Bids]
 *     responses:
 *       200:
 *         description: Tomorrow's slot date
 */
router.get("/tomorrow-slot", bidController.getTomorrowSlot);

/**
 * @swagger
 * /bids/monthly-limit:
 *   get:
 *     summary: View monthly bidding win limit status
 *     description: Returns how many wins the user has used this month and how many remain (max 3 per month).
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly limit status
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
 *     description: Resets the monthly appearance counter for all alumni. Should be called at the start of each month.
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Appearance counts reset successfully
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
 *     summary: Get today's active featured alumnus (today's winner)
 *     description: Returns the alumni profile currently being featured. This is the main endpoint for the AR client.
 *     tags: [Bids]
 *     responses:
 *       200:
 *         description: Today's featured alumnus
 *       404:
 *         description: No active alumnus today
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/active", bidController.getActiveAlumnus);

module.exports = router;
