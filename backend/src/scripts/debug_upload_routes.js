require("dotenv").config();

console.log("Testing uploadRoutes in detail...");

try {
    console.log("1. Testing uploadConfig...");
    const uploadConfig = require("../storage/uploadConfig");
    console.log("   uploadConfig type:", typeof uploadConfig, "keys:", Object.keys(uploadConfig).slice(0, 5));
} catch (e) {
    console.log("   uploadConfig ERROR:", e.message);
    process.exit(1);
}

try {
    console.log("2. Testing uploadController...");
    const uploadController = require("../controllers/uploadController");
    console.log("   uploadController:", uploadController);
} catch (e) {
    console.log("   uploadController ERROR:", e.message, e.stack);
    process.exit(1);
}

try {
    console.log("3. Testing uploadRoutes...");
    const uploadRoutes = require("../routes/uploadRoutes");
    console.log("   uploadRoutes type:", typeof uploadRoutes);
    console.log("   uploadRoutes constructor:", uploadRoutes.constructor.name);
    console.log("   uploadRoutes has .use?:", typeof uploadRoutes.use);
    console.log("   uploadRoutes has .post?:", typeof uploadRoutes.post);
    console.log("   uploadRoutes keys:", Object.keys(uploadRoutes).slice(0, 10));
} catch (e) {
    console.log("   uploadRoutes ERROR:", e.message, e.stack);
    process.exit(1);
}
