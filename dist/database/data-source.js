import { DataSource } from "typeorm";
const isProduction = process.env.NODE_ENV === "production";
export const AppDataSource = new DataSource({
    type: "postgres",
    url: isProduction
        ? process.env.DATABASE_URL
        : "postgres://postgres:root@localhost:5432/tech_stack",
    synchronize: false,
    logging: false,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
    // Use globs in production
    entities: isProduction
        ? ["dist/entity/**/*.js"] // compiled JS files on Vercel
        : ["src/entity/**/*.ts"], // TS files locally
    migrations: isProduction
        ? ["dist/migration/**/*.js"]
        : ["src/migration/**/*.ts"],
    subscribers: isProduction
        ? ["dist/subscriber/**/*.js"]
        : ["src/subscriber/**/*.ts"],
});
