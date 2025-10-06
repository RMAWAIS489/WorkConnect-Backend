import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./database/data-source.js";
import app from "./app.js";

// ✅ Always listen on process.env.PORT — Railway injects this automatically
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected successfully");

    // ✅ Always start the server (Railway requires it)
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error("❌ Database connection error:", error);
  });
