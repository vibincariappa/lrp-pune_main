const prisma = require("../config/db");

const getAllPillars = async () => {
    return await prisma.pillarData.findMany();
};

const updatePillar = async (pillar, key, value) => {
    return await prisma.pillarData.upsert({
        where: {
            pillar_key: {
                pillar: Number(pillar),
                key: key
            }
        },
        update: {
            value: String(value)
        },
        create: {
            pillar: Number(pillar),
            key: key,
            value: String(value)
        }
    });
};

module.exports = {
    getAllPillars,
    updatePillar
};
