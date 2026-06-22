const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}
const logFile = path.join(logDir, "audit.log");

/**
 * Creates an audit record for file repository actions.
 * @param {string} action - Action name (e.g. UPLOAD_FILE, SYNC_METRICS, DOWNLOAD_FILE)
 * @param {string} adminId - ID of the admin performing the action
 * @param {string} filename - Name of the file involved
 * @param {string} uploadId - ID of the upload log entry
 */
const logAudit = async (action, adminId, filename, uploadId) => {
    try {
        const record = {
            action,
            adminId,
            filename,
            uploadId,
            timestamp: new Date().toISOString()
        };
        fs.appendFileSync(logFile, JSON.stringify(record) + "\n");
        console.log(`[AUDIT] ${action} - Admin: ${adminId}, File: ${filename}, UploadId: ${uploadId}`);
    } catch (error) {
        console.error("Failed to write to audit log file:", error.message);
    }
};

module.exports = {
    logAudit
};
