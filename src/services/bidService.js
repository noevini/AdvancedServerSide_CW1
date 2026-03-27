const bidRepository = require("../repositories/bidRepository");

const bidService = {
  createBid: async (userId, bidAmount) => {
    if (!bidAmount || bidAmount <= 0) {
      throw new Error("Invalid bid amount");
    }

    const existingBid = await bidRepository.findLatestByUserId(userId);
    const today = new Date().toISOString().split("T")[0];

    if (existingBid) {
      if (bidAmount <= existingBid.bid_amount) {
        throw new Error("New bid must be higher than the current bid");
      }

      const updatedBid = await bidRepository.updateBidAmount(
        existingBid.id,
        bidAmount,
      );

      return {
        ...existingBid,
        bid_amount: updatedBid.bid_amount,
      };
    }

    const bid = await bidRepository.createBid(userId, bidAmount, today);
    return bid;
  },

  getMyBids: async (userId) => {
    const bids = await bidRepository.findByUserId(userId);
    return bids;
  },

  selectWinner: async () => {
    const highestBid = await bidRepository.findHighestBid();

    if (!highestBid) {
      throw new Error("No bids available");
    }

    await bidRepository.markAllAsLost();
    await bidRepository.markAsWinner(highestBid.id);

    return {
      ...highestBid,
      status: "WON",
    };
  },

  getFeaturedAlumnus: async () => {
    const highestBid = await bidRepository.findHighestBid();

    if (!highestBid) {
      throw new Error("No featured alumnus available");
    }

    return highestBid;
  },
};

module.exports = bidService;
