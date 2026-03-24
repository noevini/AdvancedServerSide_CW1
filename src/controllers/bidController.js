const bidService = require("../services/bidService");

const bidController = {
  createBid: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { bid_amount } = req.body;

      const bid = await bidService.createBid(userId, bid_amount);

      return res.status(201).json({
        message: "Bid placed successfully",
        bid,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  getMyBids: async (req, res) => {
    try {
      const userId = req.user.userId;

      const bids = await bidService.getMyBids(userId);

      return res.status(200).json(bids);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },
};

module.exports = bidController;
