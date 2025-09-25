import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
   type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: ["dist/entity/**/*{.ts,.js}"],
  migrations: ["dist/migration/**/*{.ts,.js}"],
  subscribers: ["dist/subscriber/**/*{.ts,.js}"],
  ssl: true,
});
