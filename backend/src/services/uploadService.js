const fs = require("fs");
const path = require("path");
const prisma = require("../config/db");
const pdfServices = require("./pdfServices");
const aiService = require("./aiService");
const { extractedDataSchema } = require("../validators/extractedDataValidator");
const { logAudit } = require("./auditService");

/**
 * Handles processing a newly uploaded PDF, extracting metrics using Gemini AI, 
 * validating metrics, saving the PDF permanently, and creating a pending log entry.
 * 
 * @param {string} adminId - The ID of the authenticated administrator
 * @param {Object} file - The file object from multer
 */
const saveUpload = async (adminId, file) => {
    if (!file) {
        const error = new Error("No file provided");
        error.statusCode = 400;
        throw error;
    }

    const filePath = file.path;
    const fileName = file.originalname;
    let logEntry = null;

    try {
        // Create initial pending upload log in the database
        logEntry = await prisma.uploadLog.create({
            data: {
                filename: fileName,
                storagePath: filePath,
                status: "PROCESSING",
                isSynced: false
            }
        });

        let textContent = "";
        const fileExt = path.extname(filePath).toLowerCase();

        if (fileExt === ".pdf") {
            // 1. Parse PDF text content
            textContent = await pdfServices.parsePdf(filePath);
        } else if (fileExt === ".csv" || fileExt === ".txt") {
            // Read CSV/TXT files directly as plain text
            textContent = fs.readFileSync(filePath, "utf8");
        } else {
            const error = new Error("Unsupported file format");
            error.statusCode = 400;
            throw error;
        }

        // 2. Extract metrics using Gemini AI service
        const aiJsonResult = await aiService.extractMetrics(textContent);

        // 3. Parse and validate using Zod schema
        const parsedJson = JSON.parse(aiJsonResult);
        const validatedMetrics = extractedDataSchema.parse(parsedJson);

        // 4. Update the UploadLog with the extracted metrics and complete status
        await prisma.uploadLog.update({
            where: { id: logEntry.id },
            data: {
                status: "COMPLETED",
                extractedData: JSON.stringify(validatedMetrics)
            }
        });

        // 5. Create audit record
        await logAudit("UPLOAD_FILE", adminId, fileName, logEntry.id);

        return {
            uploadId: logEntry.id,
            filename: fileName,
            status: "COMPLETED",
            extractedMetrics: validatedMetrics,
            isSynced: false
        };

    } catch (error) {
        // Update upload log status to FAILED in the DB if the log row was created
        if (logEntry) {
            try {
                await prisma.uploadLog.update({
                    where: { id: logEntry.id },
                    data: { status: "FAILED" }
                });
            } catch (dbError) {
                console.error("Failed to update upload log status to FAILED:", dbError.message);
            }
        }
        throw error;
    }
};

/**
 * Retrieves all upload logs from the database, ordered by creation date descending.
 */
const getUploadLogs = async () => {
    const logs = await prisma.uploadLog.findMany({
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            filename: true,
            createdAt: true,
            status: true,
            isSynced: true,
            extractedData: true
        }
    });
    return logs;
};

/**
 * Confirms and synchronizes the extracted metrics of a completed upload log into PillarData.
 * 
 * @param {string} adminId - The ID of the authenticated administrator
 * @param {string} uploadId - The ID of the upload log to sync
 */
const syncMetrics = async (adminId, uploadId) => {
    if (!uploadId) {
        const error = new Error("Invalid upload ID");
        error.statusCode = 400;
        throw error;
    }

    const log = await prisma.uploadLog.findUnique({
        where: { id: uploadId }
    });

    if (!log) {
        const error = new Error("Upload log not found");
        error.statusCode = 404;
        throw error;
    }

    if (log.status !== "COMPLETED") {
        const error = new Error("Cannot sync metrics of an incomplete or failed upload");
        error.statusCode = 400;
        throw error;
    }

    if (log.isSynced) {
        const error = new Error("Metrics for this upload have already been synchronized");
        error.statusCode = 400;
        throw error;
    }

    if (!log.extractedData) {
        const error = new Error("No extracted metrics found in this upload log");
        error.statusCode = 400;
        throw error;
    }

    const metrics = JSON.parse(log.extractedData);

    // Save/Upsert data into Database
    for (const metric of metrics) {
        await prisma.pillarData.upsert({
            where: {
                pillar_key: {
                    pillar: metric.pillar,
                    key: metric.key
                }
            },
            update: {
                value: metric.value
            },
            create: {
                pillar: metric.pillar,
                key: metric.key,
                value: metric.value
            }
        });
    }

    // Mark upload log as synced
    await prisma.uploadLog.update({
        where: { id: uploadId },
        data: { isSynced: true }
    });

    // Create audit record
    await logAudit("SYNC_METRICS", adminId, log.filename, log.id);

    return {
        success: true,
        syncedRecords: metrics.length
    };
};

/**
 * Prepares the file path for downloading an uploaded document.
 * 
 * @param {string} adminId - The ID of the authenticated administrator
 * @param {string} uploadId - The ID of the upload log corresponding to the file
 */
const downloadFile = async (adminId, uploadId) => {
    if (!uploadId) {
        const error = new Error("Invalid upload ID");
        error.statusCode = 400;
        throw error;
    }

    const log = await prisma.uploadLog.findUnique({
        where: { id: uploadId }
    });

    if (!log) {
        const error = new Error("Upload log not found");
        error.statusCode = 404;
        throw error;
    }

    if (!fs.existsSync(log.storagePath)) {
        const error = new Error("File not found on disk");
        error.statusCode = 404;
        throw error;
    }

    // Create audit record
    await logAudit("DOWNLOAD_FILE", adminId, log.filename, log.id);

    return {
        filename: log.filename,
        storagePath: log.storagePath
    };
};

/**
 * Prepares the file path for viewing an uploaded document inline.
 * 
 * @param {string} adminId - The ID of the authenticated administrator
 * @param {string} uploadId - The ID of the upload log corresponding to the file
 */
const viewFile = async (adminId, uploadId) => {
    if (!uploadId) {
        const error = new Error("Invalid upload ID");
        error.statusCode = 400;
        throw error;
    }

    const log = await prisma.uploadLog.findUnique({
        where: { id: uploadId }
    });

    if (!log) {
        const error = new Error("Upload log not found");
        error.statusCode = 404;
        throw error;
    }

    if (!fs.existsSync(log.storagePath)) {
        const error = new Error("File not found on disk");
        error.statusCode = 404;
        throw error;
    }

    // Create audit record
    await logAudit("VIEW_FILE", adminId, log.filename, log.id);

    return {
        filename: log.filename,
        storagePath: log.storagePath
    };
};

module.exports = {
    saveUpload,
    getUploadLogs,
    syncMetrics,
    downloadFile,
    viewFile
};
