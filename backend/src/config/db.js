const path = require("path");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require(path.join(__dirname, "../../node_modules/@prisma/client/.prisma/client/default.js"));

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;
let retryCount = 0;

console.log("Initializing database connection pool...");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

pool.on("connect", () => {
  console.log("Database connection established successfully via Pool.");
  retryCount = 0;
});

pool.on("error", (err) => {
  console.error("Unexpected database client error in connection pool:", err);
  handleReconnection();
});

const handleReconnection = () => {
  if (retryCount < MAX_RETRIES) {
    retryCount++;
    console.log(`Attempting to reconnect database (attempt ${retryCount}/${MAX_RETRIES}) in ${RETRY_DELAY_MS}ms...`);
    setTimeout(async () => {
      try {
        await pool.query("SELECT 1");
        console.log("Database reconnection successful!");
      } catch (err) {
        console.error("Database reconnection attempt failed:", err.message);
        handleReconnection();
      }
    }, RETRY_DELAY_MS);
  } else {
    console.error("Critical: Maximum database reconnection retries exceeded. Exiting process.");
    process.exit(1);
  }
};

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter: adapter,
  log: [
    { emit: "event", level: "query" },
    { emit: "stdout", level: "info" },
    { emit: "stdout", level: "warn" },
    { emit: "stdout", level: "error" }
  ]
});

prisma.$on("query", (e) => {
  if (process.env.DEBUG_SQL === "true") {
    console.log(`SQL Query: ${e.query} - Params: ${e.params} - Duration: ${e.duration}ms`);
  }
});

const shutdownDatabase = async () => {
  console.log("Gracefully disconnecting database client...");
  try {
    await prisma.$disconnect();
    await pool.end();
    console.log("Database pool disconnected successfully.");
  } catch (error) {
    console.error("Error during database disconnection:", error);
  }
};

const registerSignalHandlers = () => {
  const handleSignal = async (signal) => {
    console.log(`Received signal ${signal}. Starting graceful shutdown...`);
    await shutdownDatabase();
    setTimeout(() => {
      console.log(`Exiting process for signal ${signal}`);
      process.exit(0);
    }, 1000).unref();
  };

  process.once("SIGINT", () => handleSignal("SIGINT"));
  process.once("SIGTERM", () => handleSignal("SIGTERM"));

  process.on("unhandledRejection", async (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    await shutdownDatabase();
    process.exit(1);
  });

  process.on("uncaughtException", async (error) => {
    console.error("Uncaught Exception thrown:", error);
    await shutdownDatabase();
    process.exit(1);
  });
};

registerSignalHandlers();

module.exports = prisma;
module.exports.shutdownDatabase = shutdownDatabase;