import { DataSource } from "typeorm";
import { User } from "../entity/User.js";
import { Candidate } from "../entity/candidate.js";
import { Employer } from "../entity/Employers.js";
import { Job } from "../entity/jobs.js";
import { JobApplication } from "../entity/job_Application.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, // Neon connection string
  synchronize: false,
  logging: false,
  ssl: { rejectUnauthorized: false }, // needed for Neon

  entities: [User, Candidate, Employer, Job, JobApplication],
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
