const crypto = require("crypto");
const apiTokenDAO = require("../dao/apiTokenDAO");
const apiUsageLogDAO = require("../dao/apiUsageLogDAO");

const apiTokenService = {
  createToken: async (clientName) => {
    if (!clientName) {
      throw new Error("Client name is required");
    }

    const token = crypto.randomBytes(32).toString("hex");
    return await apiTokenDAO.createToken(token, clientName);
  },

  getAllTokens: async () => {
    return await apiTokenDAO.findAllTokens();
  },

  revokeToken: async (tokenId) => {
    return await apiTokenDAO.revokeToken(tokenId);
  },

  getAllLogs: async () => {
    return await apiUsageLogDAO.findAllLogs();
  },

  validateApiToken: async (token, endpoint, method) => {
    const existingToken = await apiTokenDAO.findByToken(token);

    if (!existingToken) {
      throw new Error("Invalid API token");
    }

    if (existingToken.is_revoked) {
      throw new Error("API token has been revoked");
    }

    await apiUsageLogDAO.createLog(existingToken.id, endpoint, method);

    return existingToken;
  },
};

module.exports = apiTokenService;
