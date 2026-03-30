const bidRepository = require("../repositories/BidRepository");
const userRepository = require("../repositories/userRepository");

const bidService = {
  createBid: async (userId, bidAmount) => {
    if (!bidAmount || bidAmount <= 0) {
      throw new Error("Invalid bid amount");
    }

    const yearMonth = new Date().toISOString().slice(0, 7);
    const monthlyWins = await bidRepository.countMonthlyWins(userId, yearMonth);

    if (monthlyWins >= 3) {
      throw new Error("Monthly bidding win limit reached");
    }

    const existingBid = await bidRepository.findLatestByUserId(userId);
    const today = new Date().toISOString().split("T")[0];

    if (existingBid && existingBid.status !== "CANCELLED") {
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
    return await bidRepository.findByUserId(userId);
  },

  cancelMyBid: async (userId) => {
    const latestBid = await bidRepository.findLatestByUserId(userId);

    if (!latestBid) {
      throw new Error("No bid found");
    }

    if (latestBid.status === "CANCELLED") {
      throw new Error("Bid already cancelled");
    }

    return await bidRepository.cancelBid(latestBid.id);
  },

  selectWinner: async () => {
    const highestBid = await bidRepository.findHighestBid();

    if (!highestBid) {
      throw new Error("No bids available");
    }

    await bidRepository.markAllAsLost();
    await bidRepository.markAsWinner(highestBid.id);
    await userRepository.incrementAppearanceCount(highestBid.user_id);

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

  getActiveAlumnus: async () => {
    const winner = await bidRepository.findCurrentWinner();

    if (!winner) {
      throw new Error("No active alumnus");
    }

    return winner;
  },

  getTomorrowSlot: async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
      slot_date: tomorrow.toISOString().split("T")[0],
      message: "This is tomorrow's featured alumni slot",
    };
  },

  getMonthlyLimitStatus: async (userId) => {
    const yearMonth = new Date().toISOString().slice(0, 7);
    const usedWins = await bidRepository.countMonthlyWins(userId, yearMonth);

    return {
      monthly_limit: 3,
      wins_used: usedWins,
      wins_remaining: Math.max(0, 3 - usedWins),
    };
  },

  resetAppearanceCounts: async () => {
    await userRepository.resetAppearanceCounts();

    return {
      message: "Appearance counts reset successfully",
    };
  },
};

module.exports = bidService;
