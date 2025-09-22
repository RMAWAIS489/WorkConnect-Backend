import { object, string, number } from "zod";

export const employerSchema = object({
  body: object({
    userId: number(),
    company_name: string().min(1),
    contact_number: string().min(1),
    email: string().email(),
    address: string().min(1),
    website: string().min(1),
    industry_type: string().min(1),
    company_description: string().min(1),
    linkedin_url: string().min(1),
  }),
});
