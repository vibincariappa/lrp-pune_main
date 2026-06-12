require("dotenv").config();
const prisma = require("../config/db");
const aiService = require("../services/aiService");
const { extractedDataSchema } = require("../vaidators/extractedDataValidator");

async function runTest() {
    console.log("Starting E2E AI and DB Integration test...");

    let logEntry = null;
    try {
        // Create an upload log
        logEntry = await prisma.uploadLog.create({
            data: {
                filename: "mock_report.pdf",
                storagePath: "uploads/temp/mock-file-path.pdf",
                status: "PROCESSING"
            }
        });
        console.log(`1. UploadLog created with ID: ${logEntry.id}, status: PROCESSING`);

        // Mock PDF text content
        const sampleTextContent = `
        LRP Pune Metro Progress Report
        
        Pillar 1: Social Development
        - Households Supported: 1450
        - Schools Supported: 42
        - Students Benefitted: 620
        
        Pillar 2: Infrastructure Development
        - Stations Constructed: 12
        - Kilometers of Track Laid: 24.5
        `;

        console.log("2. Sending sample text to aiService...");
        const aiJsonResult = await aiService.extractMetrics(sampleTextContent);
        console.log("3. Received response from Gemini:", aiJsonResult);

        console.log("4. Parsing and validating output...");
        const parsedJson = JSON.parse(aiJsonResult);
        const validatedMetrics = extractedDataSchema.parse(parsedJson);
        console.log("   Validated metrics count:", validatedMetrics.length);

        console.log("5. Upserting metrics to PillarData table...");
        for (const metric of validatedMetrics) {
            const upserted = await prisma.pillarData.upsert({
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
            console.log(`   Upserted Pillar ${upserted.pillar}: ${upserted.key} => ${upserted.value}`);
        }

        console.log("6. Updating UploadLog to COMPLETED...");
        await prisma.uploadLog.update({
            where: { id: logEntry.id },
            data: { status: "COMPLETED" }
        });
        console.log("   UploadLog status updated successfully!");

        console.log("\n7. Verifying data in database:");
        const allPillars = await prisma.pillarData.findMany();
        console.log("   PillarData rows in database:", allPillars);

        const logs = await prisma.uploadLog.findMany({
            where: { id: logEntry.id }
        });
        console.log("   UploadLog row in database:", logs);

    } catch (err) {
        console.error("Test failed with error:", err);
        if (logEntry) {
            await prisma.uploadLog.update({
                where: { id: logEntry.id },
                data: { status: "FAILED" }
            }).catch(e => console.error("Failed to mark log as FAILED:", e.message));
        }
    } finally {
        await prisma.$disconnect();
    }
}

runTest();
