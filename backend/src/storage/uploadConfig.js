const multer = require("multer");
const fs = require("fs");

const uploadDir = "uploads/documents";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const ext = file.originalname.toLowerCase();
    const mime = file.mimetype;
    if (
        ext.endsWith(".pdf") || mime === "application/pdf" ||
        ext.endsWith(".csv") || mime === "text/csv" ||
        ext.endsWith(".txt") || mime === "text/plain"
    ) {
        cb(null, true);
    } else {
        const error = new Error("Only PDF, CSV, and TXT files are allowed");
        error.statusCode = 400;
        cb(error, false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024
    }
});

module.exports = upload;

