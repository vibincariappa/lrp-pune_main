const path = require("path");
const uploadService = require("../services/uploadService");

/**
 * Endpoint to upload a PDF file.
 * Triggers PDF text extraction and AI parsing without applying metrics to live DB.
 * POST /api/upload
 */
const uploadPdf = async (req, res, next) => {
    try {
        const adminId = req.user.id;
        const file = req.file;

        const result = await uploadService.saveUpload(adminId, file);

        return res.status(201).json({
            uploadId: result.uploadId,
            filename: result.filename,
            status: result.status,
            extractedMetrics: result.extractedMetrics,
            isSynced: result.isSynced
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Endpoint to fetch all upload logs metadata.
 * GET /api/upload/logs
 */
const getUploadLogs = async (req, res, next) => {
    try {
        const logs = await uploadService.getUploadLogs();
        return res.status(200).json(logs);
    } catch (error) {
        next(error);
    }
};

/**
 * Endpoint to confirm and apply AI-extracted metrics to live PillarData.
 * POST /api/upload/sync/:id
 */
const syncUploadMetrics = async (req, res, next) => {
    try {
        const adminId = req.user.id;
        const uploadId = req.params.id;

        const result = await uploadService.syncMetrics(adminId, uploadId);

        return res.status(200).json({
            success: true,
            syncedRecords: result.syncedRecords
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Endpoint to download a previously uploaded PDF.
 * GET /api/upload/download/:id
 */
const downloadUploadFile = async (req, res, next) => {
    try {
        const adminId = req.user.id;
        const uploadId = req.params.id;

        const result = await uploadService.downloadFile(adminId, uploadId);

        return res.download(result.storagePath, result.filename);
    } catch (error) {
        next(error);
    }
};

/**
 * Endpoint to view a previously uploaded document inline.
 * GET /api/upload/view/:id
 */
const viewUploadFile = async (req, res, next) => {
    try {
        const adminId = req.user.id;
        const uploadId = req.params.id;

        const result = await uploadService.viewFile(adminId, uploadId);
        const absolutePath = path.resolve(result.storagePath);

        return res.sendFile(absolutePath);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadPdf,
    getUploadLogs,
    syncUploadMetrics,
    downloadUploadFile,
    viewUploadFile
};
