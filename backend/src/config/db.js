const path = require("path");
const { PrismaClient } = require(path.join(__dirname, "../../node_modules/@prisma/client/.prisma/client/default.js"));
const { PrismaPg } = require("@prisma/adapter-pg");

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL
  })
});

module.exports = prisma;