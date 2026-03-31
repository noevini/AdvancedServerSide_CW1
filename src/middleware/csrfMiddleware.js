const { verifyToken } = require("../config/csrf");

// Validates CSRF token on all state-changing requests (POST, PUT, DELETE)
// Client must first call GET /csrf-token to get a token, then send it
// in the x-csrf-token header on every state-changing request
const csrfMiddleware = (req, res, next) => {
  // Skip CSRF check for GET requests and API docs
  if (req.method === "GET" || req.path.startsWith("/api-docs")) {
    return next();
  }

  const secret = req.cookies["csrf_secret"];
  const token = req.headers["x-csrf-token"];

  if (!secret || !token) {
    return res.status(403).json({ error: "CSRF token missing" });
  }

  if (!verifyToken(secret, token)) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }

  next();
};

module.exports = csrfMiddleware;
