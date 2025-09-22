
import { Request, Response } from "express";
import { applyForJob,   getJobsAppliedByCandidate,  getJobsWithApplications, getTotalApplications, updateStatus } from "../services/jobApplication.service.js";
import upload from "../cloudinary/upload.js";
import { AppDataSource } from "../database/data-source.js";
import { Candidate } from "../entity/candidate.js";



export const createJobApplicationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  upload.single("resume")(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ error: "File upload failed" });
    }

    try {
      const { candidate_id, status } = req.body;
      const job_id = req.params.job_id;
      const resumeUrl = req.file?.path || ""; // Cloudinary URL

      if (!candidate_id || !job_id || !resumeUrl || !status) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      console.log("Uploaded Resume URL:", resumeUrl);

      const jobApplication = await applyForJob(
        Number(candidate_id),
        Number(job_id),
        resumeUrl,
        status
      );

      res.status(201).json({
        message: "Job application created successfully",
        jobApplication,
      });
    } catch (error: any) {
      console.error("Error in createJobApplicationController:", error);
      res.status(400).json({ error: error.message });
    }
  });
};



export const getJobApplicationsController = async (req: Request, res: Response): Promise<void> => {
  const employer_id = req.user?.userId; // Get employer id from authenticated user
  if (!employer_id) {
    res.status(403).json({ message: "Unauthorized: Employer ID is missing" });
    return;
  }

  try {
    const jobApplications = await getJobsWithApplications(employer_id);
    res.status(200).json({ jobApplications });
  } catch (error: any) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getCandidateApplicationsController = async (req: Request, res: Response): Promise<void> => {
  const candidate_id = req.user?.userId; 
  console.log("user id is",candidate_id)
  if (!candidate_id) {
    res.status(403).json({ message: "Unauthorized: User ID is missing" });
    return;
  }

  try {
    const appliedJobs = await getJobsAppliedByCandidate(candidate_id);
     console.log("candidate id",candidate_id)
    res.status(200).json({ appliedJobs });
  } catch (error: any) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ error: error.message });
  }
};




export const updateStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const applicationId = Number(req.params.applicationId); 
    const { status } = req.body; 

    if (!status) {
      res.status(400).json({ success: false, message: "Status is required" });
      return;
    }

    const updatedApplication = await updateStatus(applicationId, status);

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: updatedApplication,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};




// 🔹 Get ALL job applications (Admin use case)
export const getAllApplicationsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const total = await getTotalApplications();
    res.status(200).json({
      success: true,
       totalApplications: total,
    });
  } catch (error: any) {
    console.error("Error fetching all applications:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch applications",
    });
  }
};
