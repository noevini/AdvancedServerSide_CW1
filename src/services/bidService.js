const bidDAO = require("../dao/bidDAO");
const userDAO = require("../dao/userDAO");

const bidService = {
  // Creates a new bid or updates an existing one (increase only)
  // Enforces the monthly win limit of 3 per calendar month
  createBid: async (userId, bidAmount) => {
    if (bidAmount === undefined || bidAmount === null || isNaN(bidAmount)) {
      throw new Error("Bid amount must be a valid number");
    }

    const numericBidAmount = Number(bidAmount);

    if (numericBidAmount <= 0) {
      throw new Error("Bid amount must be greater than zero");
    }

    // Check how many times this user has won this month
    const yearMonth = new Date().toISOString().slice(0, 7);
    const monthlyWins = await bidDAO.countMonthlyWins(userId, yearMonth);

    if (monthlyWins >= 3) {
      throw new Error("Monthly bidding win limit reached");
    }

    // If the user already has an active bid, update it instead of creating a new one
    const existingBid = await bidDAO.findLatestByUserId(userId);
    const today = new Date().toISOString().split("T")[0];

    if (existingBid && existingBid.status !== "CANCELLED") {
      // Bids can only increase — blind bidding system means users cannot lower their bid
      if (numericBidAmount <= existingBid.bid_amount) {
        throw new Error("New bid must be higher than the current bid");
      }

      const updatedBid = await bidDAO.updateBidAmount(
        existingBid.id,
        numericBidAmount,
      );

      return { ...existingBid, bid_amount: updatedBid.bid_amount };
    }

    // No active bid exists — create a new one
    return await bidDAO.createBid(userId, numericBidAmount, today);
  },

  // Returns all bids placed by the authenticated user
  getMyBids: async (userId) => {
    return await bidDAO.findByUserId(userId);
  },

  // Cancels the user's latest active bid
  cancelMyBid: async (userId) => {
    const latestBid = await bidDAO.findLatestByUserId(userId);

    if (!latestBid) {
      throw new Error("No bid found");
    }

    if (latestBid.status === "CANCELLED") {
      throw new Error("Bid already cancelled");
    }

    return await bidDAO.cancelBid(latestBid.id);
  },

  // Selects the winner of the day — called automatically at midnight
  // Marks all other bids as LOST and the highest bid as WON
  selectWinner: async () => {
    const highestBid = await bidDAO.findHighestBid();

    if (!highestBid) {
      throw new Error("No bids available");
    }

    // Mark all active bids as lost first, then set the winner
    await bidDAO.markAllAsLost();
    await bidDAO.markAsWinner(highestBid.id);

    // Track how many times this alumni has been featured
    await userDAO.incrementAppearanceCount(highestBid.user_id);

    return { ...highestBid, status: "WON" };
  },

  // Returns the current highest bid — used before winner is selected
  getFeaturedAlumnus: async () => {
    const highestBid = await bidDAO.findHighestBid();

    if (!highestBid) {
      throw new Error("No featured alumnus available");
    }

    return highestBid;
  },

  // Returns the date of tomorrow's available featured slot
  getTomorrowSlot: async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
      slot_date: tomorrow.toISOString().split("T")[0],
      message: "This is tomorrow's featured alumni slot",
    };
  },

  // Returns how many wins the user has used this month and how many remain
  getMonthlyLimitStatus: async (userId) => {
    const yearMonth = new Date().toISOString().slice(0, 7);
    const usedWins = await bidDAO.countMonthlyWins(userId, yearMonth);

    return {
      monthly_limit: 3,
      wins_used: usedWins,
      wins_remaining: Math.max(0, 3 - usedWins),
    };
  },

  // Resets the appearance count for all users — called at the start of each month
  resetAppearanceCounts: async () => {
    await userDAO.resetAppearanceCounts();
    return { message: "Appearance counts reset successfully" };
  },

  // Returns the currently active featured alumnus (today's winner)
  getActiveAlumnus: async () => {
    const winner = await bidDAO.findCurrentWinner();

    if (!winner) {
      throw new Error("No active alumnus");
    }

    return winner;
  },

  // Schedules automatic winner selection every day at midnight using native setTimeout
  // Calculates the exact ms until midnight so it always runs at 00:00
  scheduleWinnerSelection: () => {
    const msUntilMidnight = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      return midnight - now;
    };

    const runAtMidnight = async () => {
      try {
        await bidService.selectWinner();
      } catch (error) {
        // No bids placed today — skip silently
      }
      // Schedule the next run for the following midnight
      setTimeout(runAtMidnight, msUntilMidnight());
    };

    // Schedule the first run
    setTimeout(runAtMidnight, msUntilMidnight());
  },
};

module.exports = bidService;
