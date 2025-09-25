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
    ? process.env.DATABASE_URL // Neon in production
    : "postgres://postgres:root@localhost:5432/tech_stack", // local dev
  synchronize: false,
  logging: false,
  ssl: isProduction ? { rejectUnauthorized: false } : false, // SSL only in prod
  entities: [User, Candidate, Employer, Job, JobApplication],
  migrations: [],
  subscribers: [],
});
