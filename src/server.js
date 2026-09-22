import dns from "node:dns";

dns.setServers(["8.8.8.8","1.1.1.1"]);

import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDatabase from "./config/db.js";

const port = process.env.PORT || 5000;
connectDatabase()
  .then(() => {
    app.listen(port, () => console.log(`Digital Heroes API running on port ${port}`));
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exitCode = 1;
  });