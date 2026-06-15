const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "dev-secret";

const generateAccessToken = (payload) => {
  return jwt.sign(
    {
      id: payload.id,
      username: payload.username,
      role: payload.role
    },
    secret,
    {
      expiresIn: "15m"
    }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, secret);
};

// Backward compatibility wrappers
const generateToken = (payload) => {
  return generateAccessToken(payload);
};

const verifyToken = (token) => {
  return verifyAccessToken(token);
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  generateToken,
  verifyToken
};