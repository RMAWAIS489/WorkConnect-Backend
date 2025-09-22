import { object, number, string, z } from 'zod'; // Ensure correct imports

export const jobApplicationSchema = object({
  body: object({
    job_id: number().min(1, "Job ID is required"), // Foreign Key from Job Table
    candidate_id: number().min(1, "Candidate ID is required"), // Foreign Key from Candidate Table
    resume: string().min(1, "Resume file path is required"), // Ensures that the resume field is not empty
    status: z.enum(["Pending", "Shortlisted", "Rejected", "Accepted"]), // Correct use of z.enum for ENUM Status
  }),
});