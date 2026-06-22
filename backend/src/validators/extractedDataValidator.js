const { z } = require("zod");

const extractedDataSchema = z.array(
    z.object({
        pillar: z.number().int().min(1),
        key: z.string().min(1),
        value: z.string()
    })
);

module.exports = {
    extractedDataSchema
};
