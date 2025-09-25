import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, // Neon connection string
  synchronize: false,
  logging: false,
  ssl: { rejectUnauthorized: false }, // needed for Neon

  entities: [
    process.env.NODE_ENV === "production"
      ? "dist/entity/**/*{.js}" // only JS in production
      : "src/entity/**/*{.ts}", // TS in dev
  ],
  migrations: [
    process.env.NODE_ENV === "production"
      ? "dist/migration/**/*{.js}"
      : "src/migration/**/*{.ts}",
  ],
  subscribers: [
    process.env.NODE_ENV === "production"
      ? "dist/subscriber/**/*{.js}"
      : "src/subscriber/**/*{.ts}",
  ],
});
