import { AppDataSource } from "../database/data-source.js";
import { Job } from "../entity/jobs.js";
import { User } from "../entity/User.js";
export const createJob = async (userId, jobData) => {
    const jobRepository = AppDataSource.getRepository(Job);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error("User not found");
    }
    if (user.role !== "employer") {
        throw new Error("User role must be employer to create a job");
    }
    const job = jobRepository.create({
        ...jobData,
        user,
    });
    await jobRepository.save(job);
    return job;
};
export const getAllJobs = async () => {
    const jobRepository = AppDataSource.getRepository(Job);
    const jobs = await jobRepository.find({
        relations: ["user"],
    });
    return jobs;
};
export const getAllJobsbyfiltering = async (title, location, salary_range) => {
    const jobRepository = AppDataSource.getRepository(Job);
    let query = jobRepository.createQueryBuilder("job");
    if (title) {
        query = query.andWhere("job.title LIKE :title", { title: `%${title}%` });
    }
    if (location) {
        query = query.andWhere("job.location LIKE :location", { location: `%${location}%` });
    }
    if (salary_range !== undefined) {
        query = query.andWhere("job.salary_range = :salary_range", { salary_range });
    }
    const jobs = await query.getMany();
    return jobs;
};
export const getJobsByUserId = async (userId) => {
    const jobRepository = AppDataSource.getRepository(Job);
    const jobs = await jobRepository.find({
        where: { user: { id: userId } }, // Filter by userId
        relations: ["user"], // Include the related user if needed
    });
    return jobs;
};
export const updateJob = async (jobId, updatedData) => {
    const jobRepository = AppDataSource.getRepository(Job);
    const job = await jobRepository.findOne({
        where: { id: jobId },
    });
    if (!job) {
        throw new Error("Job not found");
    }
    Object.assign(job, updatedData);
    await jobRepository.save(job);
    return job;
};
export const updateEmploymentStatus = async (jobId, employment_status) => {
    const jobRepository = AppDataSource.getRepository(Job);
    const job = await jobRepository.findOne({ where: { id: jobId } });
    if (!job) {
        throw new Error("Job not found");
    }
    job.employment_status = employment_status;
    await jobRepository.save(job);
    return job;
};
export const deleteJobById = async (jobId) => {
    const jobRepository = AppDataSource.getRepository(Job);
    const job = await jobRepository.findOne({
        where: { id: jobId },
        relations: [],
    });
    if (!job) {
        throw new Error("Job not found");
    }
    await jobRepository.remove(job);
    return { message: "Job deleted successfully" };
};
export const getActiveJobsCountByUser = async (userId) => {
    const jobRepository = AppDataSource.getRepository(Job);
    const totalActiveJobs = await jobRepository.count({
        where: {
            employment_status: "Active",
            user: { id: userId },
        },
    });
    return { totalActiveJobs };
};
export const getJobsStats = async () => {
    const jobRepository = AppDataSource.getRepository(Job);
    // Total jobs in DB
    const totalJobs = await jobRepository.count();
    // Only Active jobs
    const activeJobs = await jobRepository.count({
        where: { employment_status: "Active" },
    });
    return {
        totalJobs,
        activeJobs,
    };
};
