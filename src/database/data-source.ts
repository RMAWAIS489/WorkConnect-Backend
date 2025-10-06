import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "database-1.cjosm4m8044d.eu-north-1.rds.amazonaws.com",
  port: 5432,
  username: "postgres",
  password: "Awais!12345",
  database: "demo",
  synchronize: false,
  logging: false,
  ssl: { rejectUnauthorized: false },
  entities: ["dist/entity/**/*{.ts,.js}"],
  migrations: ["dist/migration/**/*{.ts,.js}"],
  subscribers: ["dist/subscriber/**/*{.ts,.js}"],
});
