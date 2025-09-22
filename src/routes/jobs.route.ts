import { Router } from "express";
import { authMiddleware } from "../middlewares/authmiddleware.js";
import { createJobController, deleteJobController, fetchAllJobsbyFilteringController, fetchAllJobsController, fetchJobsByUserIdController, getActiveJobsCountByUserController, getJobsStatsController, updateEmploymentStatusController, updateJobController } from "../controller/job.controller.js";


const router = Router();

/**
 * @swagger
 * /jobs/create:
 *   post:
 *     summary: Create a new job
 *     description: This endpoint allows an employer to create a new job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Job title
 *                 example: "Software Engineer"
 *               description:
 *                 type: string
 *                 description: Job description
 *                 example: "We are looking for a skilled Software Engineer."
 *               company_name:
 *                 type: string
 *                 description: Company name
 *                 example: "Tech Solutions Ltd."
 *               location:
 *                 type: string
 *                 description: Job location
 *                 example: "New York, USA"
 *               salary_range:
 *                 type: string
 *                 description: Salary range for the job
 *                 example: "$5000 - $7000 per month"
 *               job_type:
 *                 type: string
 *                 description: Type of job (e.g., Full-time, Part-time, Remote)
 *                 example: "Full-time"
 *               userId:
 *                 type: integer
 *                 description: ID of the employer creating the job
 *                 example: 123
 *               skills_required:
 *                 type: string
 *                 description: Required skills for the job
 *                 example: "JavaScript, React, Node.js"
 *                 nullable: true
 *               application_deadline:
 *                 type: string
 *                 format: date
 *                 description: Deadline to apply for the job
 *                 example: "2024-12-31"
 *                 nullable: true
 *               employment_status:
 *                 type: string
 *                 description: Employment status (e.g., Permanent, Contract)
 *                 example: "Permanent"
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

router.post("/create",authMiddleware,  createJobController);

/**
 * @swagger
 * /jobs/all:
 *   get:
 *     summary: Get all jobs
 *     description: This endpoint fetches all the jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of jobs
 */
router.get("/all", authMiddleware, fetchAllJobsController);

/**
 * @swagger
 * /jobs/fetch/{userId}:
 *   get:
 *     summary: Get a job by ID
 *     description: Fetch job details by job ID
 *     tags: [Jobs]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the job to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job found
 *       404:
 *         description: Job not found
 */
router.get("/fetch/:userId", authMiddleware, fetchJobsByUserIdController);

/**
 * @swagger
 * /jobs/update/{jobId}:
 *   put:
 *     summary: Update a job
 *     description: This endpoint allows you to update an existing job
 *     tags: [Jobs]
 *     parameters:
 *       - name: jobId
 *         in: path
 *         required: true
 *         description: The ID of the job to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               company_name:
 *                 type: string
 *               location:
 *                 type: string
 *               salary_range:
 *                 type: string
 *               job_type:
 *                 type: string
 *               employment_status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       404:
 *         description: Job not found
 */
router.put("/update/:jobId", authMiddleware, updateJobController);

/**
 * @swagger
 * /jobs/delete/{jobId}:
 *   delete:
 *     summary: Delete a job
 *     description: This endpoint allows an employer to delete a job by job ID
 *     tags: [Jobs]
 *     parameters:
 *       - name: jobId
 *         in: path
 *         required: true
 *         description: The ID of the job to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 */
router.delete("/delete/:jobId", authMiddleware, deleteJobController);
router.get("/all/data",authMiddleware,fetchAllJobsbyFilteringController)
/**
 * @swagger
 * /jobs/update/employment-status/{jobId}:
 *   put:
 *     summary: Update the employment status of a job
 *     description: This endpoint allows an employer to update the employment status of a job
 *     tags: [Jobs]
 *     parameters:
 *       - name: jobId
 *         in: path
 *         required: true
 *         description: The ID of the job to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employment_status:
 *                 type: string
 *                 description: Employment status (e.g., Permanent, Contract)
 *                 example: "Permanent"
 *     responses:
 *       200:
 *         description: Employment status updated successfully
 *       400:
 *         description: Invalid request or missing employment status
 *       404:
 *         description: Job not found
 */
router.put("/update/employment-status/:jobId", authMiddleware, updateEmploymentStatusController);
router.get("/ActiveJobs/:userId",authMiddleware,getActiveJobsCountByUserController)
router.get("/status",authMiddleware, getJobsStatsController)

export default router;
