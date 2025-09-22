import { object, string, number, optional } from "zod";
export const jobSchema = object({
    body: object({
        title: string().min(1, "Job title is required"),
        description: string().min(1, "Job description is required"),
        company_name: string().min(1, "Company name is required"),
        location: string().min(1, "Location is required"),
        salary_range: string().min(1, "Salary range is required"),
        job_type: string().min(1, "Job type is required"),
        userId: number().min(1, "User ID is required"),
        skills_required: optional(string().min(1, "Skills are required")),
        application_deadline: optional(string().min(1, "Application deadline is required")),
        employment_status: string().min(1, "Employment status is required")
    }),
});
