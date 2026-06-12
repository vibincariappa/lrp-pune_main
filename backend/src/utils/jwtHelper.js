const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "dev-secret";

const generateToken = (payload) => {
    return jwt.sign(
        payload,
        secret,
        {
            expiresIn: "15m"
        }
    );
};

const verifyToken = (token) => {
    return jwt.verify(token, secret);
};

module.exports = {
    generateToken,
    verifyToken
};