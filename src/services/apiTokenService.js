const crypto = require("crypto");
const apiTokenRepository = require("../repositories/apiTokenRepository");
const apiUsageLogRepository = require("../repositories/apiUsageLogRepository");

const apiTokenService = {
  createToken: async (clientName) => {
    if (!clientName) {
      throw new Error("Client name is required");
    }

    const token = crypto.randomBytes(32).toString("hex");

    const newToken = await apiTokenRepository.createToken(token, clientName);

    return newToken;
  },

  getAllTokens: async () => {
    const tokens = await apiTokenRepository.findAllTokens();
    return tokens;
  },

  revokeToken: async (tokenId) => {
    const updatedToken = await apiTokenRepository.revokeToken(tokenId);
    return updatedToken;
  },

  getAllLogs: async () => {
    const logs = await apiUsageLogRepository.findAllLogs();
    return logs;
  },

  validateApiToken: async (token, endpoint, method) => {
    const existingToken = await apiTokenRepository.findByToken(token);

    if (!existingToken) {
      throw new Error("Invalid API token");
    }

    if (existingToken.is_revoked) {
      throw new Error("API token has been revoked");
    }

    await apiUsageLogRepository.createLog(existingToken.id, endpoint, method);

    return existingToken;
  },
};

module.exports = apiTokenService;
