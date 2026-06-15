const { verifyAccessToken } = require("../utils/jwtHelper");
const authService = require("../services/authService");

const authenticate = async (req, res, next) => {
  let token = null;

  // 1. Read from HTTP-Only cookie
  if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  // 2. Fallback to Authorization Header (useful for API testing / Postman compatibility)
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication token missing"
    });
  }

  try {
    const decoded = verifyAccessToken(token);
    
    // Verify user is still valid and active in database
    const activeUser = await authService.validateUser(decoded.id);
    if (!activeUser) {
      return res.status(401).json({
        success: false,
        message: "User account is inactive or not found"
      });
    }

    req.user = {
      id: activeUser.id,
      username: activeUser.username,
      role: activeUser.role
    };

    // Backward compatibility for existing endpoints using req.admin
    req.admin = req.user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token"
    });
  }
};

module.exports = authenticate;