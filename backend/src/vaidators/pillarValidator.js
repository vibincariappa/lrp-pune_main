const { z } = require("zod");

const updatePillarSchema = z.object({
    key: z.string().min(1, { message: "Key must be at least 1 character long" }),
    value: z.string({ required_error: "Value is required" })
});

module.exports = {
    updatePillarSchema
};
