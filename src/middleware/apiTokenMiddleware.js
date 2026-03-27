const apiTokenService = require("../services/apiTokenService");

const apiTokenMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "API token missing",
      });
    }

    const validatedToken = await apiTokenService.validateApiToken(
      token,
      req.originalUrl,
      req.method,
    );

    req.apiToken = validatedToken;

    next();
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

module.exports = apiTokenMiddleware;
