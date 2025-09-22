// routes/jobApplication.routes.js
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authmiddleware.js'; // Assuming you have authentication middleware
import { createJobApplicationController, getAllApplicationsController, getCandidateApplicationsController, getJobApplicationsController, updateStatusController } from '../controller/jobApplication.controller.js';
const router = Router();
router.post('/apply/:job_id', authMiddleware, createJobApplicationController);
router.get("/fetchApplications", authMiddleware, getJobApplicationsController);
router.get("/fetchAppliedApplications", authMiddleware, getCandidateApplicationsController);
router.put("/updatestatus/:applicationId", authMiddleware, updateStatusController);
router.get("/all", authMiddleware, getAllApplicationsController);
export default router;
