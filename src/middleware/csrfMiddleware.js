const { verifyToken } = require("../config/csrf");

const csrfMiddleware = (req, res, next) => {
  if (
    req.method === "GET" ||
    req.path.startsWith("/api-docs") ||
    req.path.startsWith("/auth") ||
    req.path.startsWith("/csrf-token")
  ) {
    return next();
  }

  const secret = req.cookies["csrf_secret"] || req.headers["x-csrf-secret"];
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
