require("dotenv").config();
const prisma = require("./src/config/db");
const app = require("./src/app");
const { shutdownDatabase } = require("./src/config/db");

const PORT = process.env.PORT || 5000;

let server;

async function startServer() {
  console.log("Starting Pune Metro LRP Server...");
  
  try {
    // 1. Verify Database Connection
    console.log("Verifying database connection...");
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connection verification successful.");

    // 2. Start Express Application
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
    });

    // 3. Handle Server Errors
    server.on("error", (error) => {
      console.error("Express server encountered an error:", error);
      handleStartupFailure(error);
    });

  } catch (error) {
    console.error("Verification failed during server startup:", error);
    handleStartupFailure(error);
  }
}

function handleStartupFailure(error) {
  console.error("CRITICAL: Server startup failed!", error.message);
  shutdownDatabase().finally(() => {
    process.exit(1);
  });
}

// Graceful Server Shutdown
const gracefulServerShutdown = () => {
  console.log("Initiating graceful server shutdown...");
  if (server) {
    server.close(async () => {
      console.log("Express HTTP server closed.");
      await shutdownDatabase();
      console.log("Server shutdown sequence completed successfully.");
      process.exit(0);
    });
    
    // Force exit if connections take too long to close
    setTimeout(() => {
      console.error("Forcing server termination due to slow shutdown...");
      process.exit(1);
    }, 5000).unref();
  } else {
    shutdownDatabase().finally(() => {
      process.exit(0);
    });
  }
};

// Handle process shutdown signals
process.once("SIGINT", gracefulServerShutdown);
process.once("SIGTERM", gracefulServerShutdown);

startServer();