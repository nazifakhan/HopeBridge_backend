import dns from "node:dns";

dns.setServers(["8.8.8.8","1.1.1.1"]);

import app from "./app.js";
import connectDatabase from "./config/db.js";

const port = process.env.PORT || 5000;

async function startServer() {
  if (process.env.MONGO_URI) {
    try {
      await connectDatabase();
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      console.error("The API is starting, but database-backed endpoints will not work until MONGO_URI is fixed.");
    }
  } else {
    console.warn("MONGO_URI is not configured. The API is starting without a database connection.");
  }

  app.listen(port, () => console.log(`HopeBright API running on port ${port}`));
}

startServer().catch((error) => {
  console.error("Server startup failed:", error);
  process.exitCode = 1;
});