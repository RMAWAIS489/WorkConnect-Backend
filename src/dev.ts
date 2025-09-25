import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./database/data-source.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");

    // Only start server locally
    if (process.env.VERCEL !== "1") {
      app.listen(PORT, () => {
        console.log(`Local server running at http://localhost:${PORT}`);
      });
    }
  })
  .catch((error: any) => {
    console.log("Database connection error:", error);
  });

// Export app for Vercel
export default app;
