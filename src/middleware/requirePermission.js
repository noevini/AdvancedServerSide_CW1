const requirePermission = (permission) => (req, res, next) => {
  const permissions = (req.apiToken.permissions || "").split(",");
  if (!permissions.includes(permission)) {
    return res.status(403).json({
      error: `Insufficient permissions — requires ${permission}`,
    });
  }
  next();
};

module.exports = requirePermission;
