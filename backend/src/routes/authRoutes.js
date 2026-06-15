const router = require("express").Router();
const { register, login, logout } = require("../controllers/authController");
const validate = require("../middleware/validates");
const authenticate = require("../middleware/authenticate");
const { loginLimiter } = require("../config/rateLimit");
const { registerSchema, loginSchema } = require("../validators/authValidator");

// Login endpoint with rate limiter and Zod validation
router.post(
  "/login",
  loginLimiter,
  validate(loginSchema),
  login
);

// Logout endpoint
router.post(
  "/logout",
  logout
);

// Fetch current user details for session persistence
router.get(
  "/me",
  authenticate,
  (req, res) => {
    return res.json({
      success: true,
      admin: req.user
    });
  }
);

// Registration endpoint (for administrator provisioning)
router.post(
  "/register",
  validate(registerSchema),
  register
);

module.exports = router;
