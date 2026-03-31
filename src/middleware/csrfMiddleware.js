const { verifyToken } = require("../config/csrf");

// Validates CSRF token on all state-changing requests (POST, PUT, DELETE)
const csrfMiddleware = (req, res, next) => {
  // Skip CSRF for GET requests, API docs and auth endpoints
  if (
    req.method === "GET" ||
    req.path.startsWith("/api-docs") ||
    req.path.startsWith("/auth") ||
    req.path.startsWith("/csrf-token")
  ) {
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
