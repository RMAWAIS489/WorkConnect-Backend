import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./database/data-source.js";
import app from "./app.js";

// const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    // app.listen(PORT, () => {
    //   console.log(`Server running on http://localhost:${PORT}`);
    // });
  })
  .catch((error: any) => {
    console.log("Database connection error:", error);
  });
export default app;