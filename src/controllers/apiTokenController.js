const apiTokenService = require("../services/apiTokenService");

const apiTokenController = {
  createToken: async (req, res) => {
    try {
      const { client_name } = req.body;

      const token = await apiTokenService.createToken(client_name);

      return res.status(201).json({
        message: "API token created successfully",
        token,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  getAllTokens: async (req, res) => {
    try {
      const tokens = await apiTokenService.getAllTokens();

      return res.status(200).json(tokens);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  revokeToken: async (req, res) => {
    try {
      const { tokenId } = req.params;

      const revoked = await apiTokenService.revokeToken(tokenId);

      return res.status(200).json({
        message: "Token revoked successfully",
        revoked,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  getAllLogs: async (req, res) => {
    try {
      const logs = await apiTokenService.getAllLogs();

      return res.status(200).json(logs);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },
};

module.exports = apiTokenController;
