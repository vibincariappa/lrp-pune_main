const fs = require("fs");
const prisma = require("../config/db");
const { parsePdf } = require("../services/pdfServices");
const aiService = require("../services/aiService");
const { extractedDataSchema } = require("../validators/extractedDataValidator");

const uploadPdf = async (req, res, next) => {
    let logEntry = null;
    let filePath = null;

    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file provided"
            });
        }

        filePath = req.file.path;
        const fileName = req.file.originalname;

        // Create initial pending upload log in database
        logEntry = await prisma.uploadLog.create({
            data: {
                filename: fileName,
                storagePath: filePath,
                status: "PROCESSING"
            }
        });

        // 1. Parse PDF text
        const textContent = await parsePdf(filePath);

        // 2. Extract metrics using optimized AI service
        const aiJsonResult = await aiService.extractMetrics(textContent);

        // 3. Parse and validate using Zod schema
        const parsedJson = JSON.parse(aiJsonResult);
        const validatedMetrics = extractedDataSchema.parse(parsedJson);

        // 4. Save/Upsert data into database
        for (const metric of validatedMetrics) {
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

        // 5. Mark upload log as completed
        await prisma.uploadLog.update({
            where: { id: logEntry.id },
            data: { status: "COMPLETED" }
        });

        // Delete temp file
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return res.status(200).json({
            success: true,
            message: "PDF uploaded, processed by AI, and database synchronized successfully",
            file: fileName,
            metricsCount: validatedMetrics.length,
            data: validatedMetrics
        });

    } catch (error) {
        // Clean up temp file on error
        if (filePath && fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
            } catch (unlinkError) {
                console.error("Failed to delete temp file:", unlinkError.message);
            }
        }

        // Update upload log status to FAILED in the DB
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

        console.error("PDF Processing Error:", error.message);

        // Pass error to error handler middleware
        next(error);
    }
};

module.exports = {
    uploadPdf
};
