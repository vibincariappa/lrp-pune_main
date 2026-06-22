const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const { generalLimiter } = require("./config/rateLimit");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const errorHandler = require("./routes/errorhandler");
const pillarRoutes = require("./routes/pillarRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Security and utility middleware
app.use(helmet());
app.use(cors({
  origin: true,
  credentials: true // Required for HTTP-Only cookie-based session handling
}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

// Apply global rate limiter
app.use(generalLimiter);

// Routes
app.use("/api/pillars", pillarRoutes);
app.use("/api/pillarpage", pillarRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/home", dashboardRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Backend Running"
  });
});

app.use(errorHandler);

module.exports = app;