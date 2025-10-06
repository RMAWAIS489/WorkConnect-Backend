import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    ssl: { rejectUnauthorized: false },
    entities: ["dist/entity/**/*{.ts,.js}"],
    migrations: ["dist/migration/**/*{.ts,.js}"],
    subscribers: ["dist/subscriber/**/*{.ts,.js}"],
});
