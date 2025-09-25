import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,  // use env var
  synchronize: false,
  logging: false,
  ssl: { rejectUnauthorized: false }, // needed for Neon
  entities: ["dist/entity/**/*{.ts,.js}"],
  migrations: ["dist/migration/**/*{.ts,.js}"],
  subscribers: ["dist/subscriber/**/*{.ts,.js}"],
});