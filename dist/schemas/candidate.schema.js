import { object, string } from "zod";
export const candidateSchema = object({
    body: object({
        fullname: string().min(1),
        contact_number: string().min(1),
        email: string().email(),
        address: string().min(1),
        skill: string().min(1),
        education: string().min(1),
        work_experience: string().min(1),
        resume_link: string().min(1),
        portfolio_link: string().min(1),
        linkedin_url: string().min(1),
        github_url: string().min(1),
    }),
});
