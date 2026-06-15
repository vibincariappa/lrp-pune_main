const authService = require("../services/authService");

const login = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const identifier = email || username;
    
    const ipAddress = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];

    const { token, admin } = await authService.login(
      identifier,
      password,
      ipAddress,
      userAgent
    );

    // Set HTTP-only Cookie
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    return res.json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin.id,
        email: admin.email,
        username: admin.username,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout();
    
    // Clear Cookie
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    return res.json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    next(error);
  }
};

// Keep register endpoint controller for testing/creation purposes
const register = async (req, res, next) => {
  try {
    const admin = await authService.registerAdmin(req.body);

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        id: admin.id,
        email: admin.email,
        username: admin.username,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  register
};