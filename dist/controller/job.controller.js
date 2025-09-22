import { createJob, deleteJobById, getActiveJobsCountByUser, getAllJobs, getAllJobsbyfiltering, getJobsByUserId, getJobsStats, updateEmploymentStatus, updateJob } from "../services/job.service.js";
export const createJobController = async (req, res) => {
    try {
        const { userId } = req.user || {};
        if (!userId) {
            res.status(400).json({ message: "User not authenticated" });
            return;
        }
        const { title, description, company_name, location, salary_range, job_type, employment_status, skills_required, application_deadline, } = req.body;
        const job = await createJob(userId, {
            title,
            description,
            company_name,
            location,
            salary_range,
            job_type,
            employment_status,
            skills_required,
            application_deadline,
        });
        res.status(201).json({ message: "Job created successfully", job });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const fetchJobsByUserIdController = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId); // Getting userId from params
        const jobs = await getJobsByUserId(userId);
        res.status(200).json({ success: true, data: jobs });
    }
    catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};
export const fetchAllJobsController = async (req, res) => {
    try {
        const jobs = await getAllJobs();
        res.status(200).json({ success: true, data: jobs });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
export const fetchAllJobsbyFilteringController = async (req, res) => {
    try {
        const { title, location, salary_range } = req.query;
        // Log the query parameters for debugging
        console.log("Received query params:", { title, location, salary_range });
        // Validate query parameters
        if (title && typeof title !== 'string') {
            res.status(400).json({ success: false, message: "Title must be a string" });
            return;
        }
        if (location && typeof location !== 'string') {
            res.status(400).json({ success: false, message: "Location must be a string" });
            return;
        }
        // If salary_range is provided, ensure it is a number
        let salaryRangeNumber;
        if (salary_range) {
            salaryRangeNumber = Number(salary_range);
            if (isNaN(salaryRangeNumber)) {
                res.status(400).json({ success: false, message: "Salary range must be a valid number" });
                return;
            }
        }
        // Call the function to filter jobs by title, location, and salary_range
        const jobs = await getAllJobsbyfiltering(title, location, salaryRangeNumber);
        res.status(200).json({ success: true, data: jobs });
    }
    catch (error) {
        console.error(error); // Log error for debugging
        res.status(400).json({ success: false, message: error.message });
    }
};
export const updateJobController = async (req, res) => {
    try {
        const jobId = Number(req.params.jobId);
        const updatedData = req.body;
        const updatedJob = await updateJob(jobId, updatedData);
        res.json({
            success: true,
            data: updatedJob,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
export const deleteJobController = async (req, res) => {
    try {
        const jobId = Number(req.params.jobId);
        await deleteJobById(jobId);
        res.json({
            success: true,
            message: "Job deleted successfully",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
export const updateEmploymentStatusController = async (req, res) => {
    try {
        const jobId = Number(req.params.jobId);
        const { employment_status } = req.body;
        if (!employment_status) {
            res.status(400).json({ success: false, message: "Employment status is required" });
            return;
        }
        const updatedJob = await updateEmploymentStatus(jobId, employment_status);
        res.json({
            success: true,
            message: "Employment status updated successfully",
            data: updatedJob,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
export const getActiveJobsCountByUserController = async (req, res) => {
    try {
        const userId = Number(req.params.userId); // Get userId from request params
        if (isNaN(userId)) {
            res.status(400).json({ success: false, message: "Invalid user ID" });
            return;
        }
        const { totalActiveJobs } = await getActiveJobsCountByUser(userId);
        res.status(200).json({
            success: true,
            message: "User's active jobs count fetched successfully",
            totalActiveJobs,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
export const getJobsStatsController = async (req, res) => {
    try {
        const { totalJobs, activeJobs } = await getJobsStats();
        res.status(200).json({
            success: true,
            message: "Jobs stats fetched successfully",
            totalJobs,
            activeJobs,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch job stats",
        });
    }
};
