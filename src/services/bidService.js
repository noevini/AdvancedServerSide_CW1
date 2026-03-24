const bidRepository = require("../repositories/bidRepository");

const bidService = {
  createBid: async (userId, bidAmount) => {
    if (!bidAmount || bidAmount <= 0) {
      throw new Error("Invalid bid amount");
    }

    const today = new Date().toISOString().split("T")[0];

    const bid = await bidRepository.createBid(userId, bidAmount, today);

    return bid;
  },

  getMyBids: async (userId) => {
    const bids = await bidRepository.findByUserId(userId);

    return bids;
  },
};

module.exports = bidService;
