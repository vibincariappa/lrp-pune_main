require("dotenv").config();

console.log("Testing route exports...");

try {
    const adminRoutes = require("../routes/adminRoutes");
    console.log("adminRoutes:", typeof adminRoutes, "has.use?", typeof adminRoutes.use, "keys:", Object.keys(adminRoutes).slice(0, 5));
} catch (e) {
    console.log("adminRoutes ERROR:", e.message);
}

try {
    const authRoutes = require("../routes/authRoutes");
    console.log("authRoutes:", typeof authRoutes, "has.use?", typeof authRoutes.use, "keys:", Object.keys(authRoutes).slice(0, 5));
} catch (e) {
    console.log("authRoutes ERROR:", e.message);
}

try {
    const uploadRoutes = require("../routes/uploadRoutes");
    console.log("uploadRoutes:", typeof uploadRoutes, "has.use?", typeof uploadRoutes.use, "keys:", Object.keys(uploadRoutes).slice(0, 5));
} catch (e) {
    console.log("uploadRoutes ERROR:", e.message);
}

try {
    const pillarRoutes = require("../routes/pillarRoutes");
    console.log("pillarRoutes:", typeof pillarRoutes, "has.use?", typeof pillarRoutes.use, "keys:", Object.keys(pillarRoutes).slice(0, 5));
} catch (e) {
    console.log("pillarRoutes ERROR:", e.message);
}
