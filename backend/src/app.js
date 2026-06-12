const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const errorHandler = require("./routes/errorhandler");
const pillarRoutes = require("./routes/pillarRoutes");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
    "/api/pillars",
    pillarRoutes
);

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