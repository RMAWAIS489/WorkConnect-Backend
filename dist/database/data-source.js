import { DataSource } from "typeorm";
import { User } from "../entity/User.js";
import { Candidate } from "../entity/candidate.js";
import { Employer } from "../entity/Employers.js";
import { Job } from "../entity/jobs.js";
import { JobApplication } from "../entity/job_Application.js";
const isProduction = process.env.NODE_ENV === "production";
export const AppDataSource = new DataSource({
    type: "postgres",
    url: isProduction
        ? process.env.DATABASE_URL
        : "postgres://postgres:root@localhost:5432/tech_stack",
    synchronize: false,
    logging: false,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
    entities: isProduction
        ? ["dist/entity/**/*.js"] // 🔑 Use compiled JS in production
        : [User, Candidate, Employer, Job, JobApplication],
    migrations: isProduction
        ? ["dist/migration/**/*.js"]
        : ["src/migration/**/*.ts"],
    subscribers: isProduction
        ? ["dist/subscriber/**/*.js"]
        : ["src/subscriber/**/*.ts"],
});
