const express = require("express");
const bidController = require("../controllers/bidController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /bids:
 *   post:
 *     summary: Place a bid
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

module.exports = router;
