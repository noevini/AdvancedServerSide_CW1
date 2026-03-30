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

  cancelMyBid: async (req, res) => {
    try {
      const userId = req.user.userId;
      const cancelledBid = await bidService.cancelMyBid(userId);

      return res.status(200).json({
        message: "Bid cancelled successfully",
        bid: cancelledBid,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  selectWinner: async (req, res) => {
    try {
      const winner = await bidService.selectWinner();

      return res.status(200).json({
        message: "Winner selected successfully",
        winner,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  getFeaturedAlumnus: async (req, res) => {
    try {
      const featured = await bidService.getFeaturedAlumnus();

      return res.status(200).json({
        featured_alumnus: featured,
      });
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },

  getActiveAlumnus: async (req, res) => {
    try {
      const alumnus = await bidService.getActiveAlumnus();

      return res.status(200).json({
        active_alumnus: alumnus,
      });
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },

  getTomorrowSlot: async (req, res) => {
    try {
      const slot = await bidService.getTomorrowSlot();

      return res.status(200).json(slot);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  getMonthlyLimitStatus: async (req, res) => {
    try {
      const userId = req.user.userId;
      const status = await bidService.getMonthlyLimitStatus(userId);

      return res.status(200).json(status);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  resetAppearanceCounts: async (req, res) => {
    try {
      const result = await bidService.resetAppearanceCounts();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },
};

module.exports = bidController;
