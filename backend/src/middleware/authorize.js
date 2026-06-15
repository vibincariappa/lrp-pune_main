const { hasPermission } = require("../config/permissions");

const authorize = (allowedRolesOrPermissions = []) => {
  // Normalize to array
  const requirements = Array.isArray(allowedRolesOrPermissions)
    ? allowedRolesOrPermissions
    : [allowedRolesOrPermissions];

  return (req, res, next) => {
    const user = req.user || req.admin;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { role } = user;

    // Check if the user's role satisfies any of the requirements
    const isAllowed = requirements.some(reqItem => {
      // 1. If requirement is a direct role string matching user's role
      if (role === reqItem) {
        return true;
      }
      
      // 2. Check permission mapping (centralized permissions matrix)
      return hasPermission(role, reqItem);
    });

    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Insufficient permissions"
      });
    }

    next();
  };
};

module.exports = authorize;