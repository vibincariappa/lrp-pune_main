const path = require("path");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require(path.join(__dirname, "../../node_modules/@prisma/client/.prisma/client/default.js"));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter: adapter
});

module.exports = prisma;