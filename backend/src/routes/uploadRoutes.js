const router = require("express").Router();
const upload = require("../storage/uploadConfig");
const authenticate = require("../middleware/authenticate");
const {
    uploadPdf,
    getUploadLogs,
    syncUploadMetrics,
    downloadUploadFile,
    viewUploadFile
} = require("../controllers/uploadController");

// Apply authentication middleware to all upload-related routes
router.use(authenticate);

// POST /api/upload - Upload a PDF and process staged metrics
router.post("/", upload.single("file"), uploadPdf);

// GET /api/upload/logs - Retrieve the upload logs history
router.get("/logs", getUploadLogs);

// POST /api/upload/sync/:id - Synchronize/Apply metrics of a log entry to live DB
router.post("/sync/:id", syncUploadMetrics);

// GET /api/upload/download/:id - Download the uploaded PDF report
router.get("/download/:id", downloadUploadFile);

// GET /api/upload/view/:id - View the uploaded PDF report inline in the browser
router.get("/view/:id", viewUploadFile);

module.exports = router;
