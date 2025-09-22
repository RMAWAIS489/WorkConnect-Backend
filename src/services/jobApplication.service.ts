
import { AppDataSource } from "../database/data-source.js";
import { Candidate } from "../entity/candidate.js";
import { JobApplication } from "../entity/job_Application.js";
import { Job } from "../entity/jobs.js";
import { In } from 'typeorm';


export const applyForJob = async (
  candidate_id: number,
  job_id: number,
  resumeUrl: string, // Now storing Cloudinary URL
  status: string
) => {
  const jobApplicationRepository = AppDataSource.getRepository(JobApplication);
  const candidateRepository = AppDataSource.getRepository(Candidate);
  const jobRepository = AppDataSource.getRepository(Job);

  console.log("Candidate ID:", candidate_id);
  console.log("Job ID:", job_id);
  console.log("Resume URL:", resumeUrl);
  console.log("Status:", status);

  const candidate = await candidateRepository.findOne({ where: { id: candidate_id }, relations: ["user"] });
  if (!candidate) {
    throw new Error("Candidate not found");
  }

  const job = await jobRepository.findOne({ where: { id: job_id }, relations: ["user"] });
  if (!job) {
    throw new Error("Job not found");
  }

  const existingApplication = await jobApplicationRepository.findOne({
    where: { candidate: { id: candidate_id }, job: { id: job_id } },
  });

  if (existingApplication) {
    throw new Error("You have already applied for this job");
  }

  const jobApplication = jobApplicationRepository.create({
    candidate,
    job,
    resume: resumeUrl, 
    status,
  });

  await jobApplicationRepository.save(jobApplication);
  console.log("Job application saved to database:", jobApplication);

  return jobApplication;
};



export const getJobsWithApplications = async (employer_id: number) => {
  const jobApplicationRepository = AppDataSource.getRepository(JobApplication);
  const jobRepository = AppDataSource.getRepository(Job);
  const jobApplications = await jobApplicationRepository.find({
    where: { job: { user: { id: employer_id } } },
    relations: ['job', 'candidate', 'candidate.user'],
  });
  const jobIdsWithApplications = jobApplications.map(app => app.job.id);
  const jobs = await jobRepository.find({
    where: { id: In(jobIdsWithApplications) }, 
    relations: ['user'], 
  });
  const jobDetailsWithApplications = jobs.map((job) => {
    const applicationsForThisJob = jobApplications.filter(app => app.job.id === job.id);
    const applicationDetails = applicationsForThisJob.map(application => ({
      id: application.id,
      resume:application.resume,
      applicantName: application.candidate.fullname,
      status: application.status,
    }));
    const applicationCount = applicationsForThisJob.length;
    return {
     
      jobId:job.id,
      jobTitle: job.title,
      applications: applicationDetails,
      applicationsCount: applicationCount,
    };
  });

  return jobDetailsWithApplications;
};

export const getJobsAppliedByCandidate = async (candidate_id: number) => {
  const jobApplicationRepository = AppDataSource.getRepository(JobApplication);
  const jobApplications = await jobApplicationRepository.find({
    where: { candidate: { user: { id: candidate_id } } }, 
    relations: ['job', 'job.user', 'candidate.user'],
  });
  const appliedJobsDetails = jobApplications.map((application) => ({
    job: {
      id: application.job.id,
      title: application.job.title,
      description: application.job.description,
      company_name: application.job.company_name,
      location: application.job.location,
      salary_range: application.job.salary_range,
      job_type: application.job.job_type,
      employment_status: application.job.employment_status,
      skills_required: application.job.skills_required,
      application_deadline: application.job.application_deadline,
    },
    status: application.status,
    
  }));
  
  return appliedJobsDetails;
  
};




export const updateStatus = async (applicationId: number, status: string): Promise<JobApplication> => {
  const jobApplicationRepository = AppDataSource.getRepository(JobApplication);
  const validStatuses = ["Pending", "Reviewed", "Shortlisted", "Rejected"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status value");
  }

  const application = await jobApplicationRepository.findOne({ where: { id: applicationId } });

  if (!application) {
    throw new Error("Job application not found");
  }

  application.status = status;
  await jobApplicationRepository.save(application);

  return application;
};


export const getTotalApplications = async () => {
  const jobApplicationRepository = AppDataSource.getRepository(JobApplication);

  // count() returns number of rows
  const total = await jobApplicationRepository.count();

  return total;
};











































// export const getApplicationsByCandidate = async (candidate_id: number) => {
//   const jobApplicationRepository = AppDataSource.getRepository(JobApplication);
//   const applications = await jobApplicationRepository.find({
//     where: { candidate: { id: candidate_id } },
//     relations: ["job"],
//   });

//   return applications;
// };

// export const getApplicationsByJob = async (job_id: number) => {
//   const jobApplicationRepository = AppDataSource.getRepository(JobApplication);
//   const applications = await jobApplicationRepository.find({
//     where: { job: { id: job_id } },
//     relations: ["candidate"],
//   });

//   return applications;
// };

// export const updateApplicationStatus = async (
//   applicationId: number,
//   status: "Pending" | "Shortlisted" | "Rejected" | "Accepted"
// ) => {
//   const jobApplicationRepository = AppDataSource.getRepository(JobApplication);
//   const jobApplication = await jobApplicationRepository.findOne({
//     where: { id: applicationId },
//   });

//   if (!jobApplication) {
//     throw new Error("Job application not found");
//   }

//   jobApplication.status = status;
//   await jobApplicationRepository.save(jobApplication);
//   return jobApplication;
// };

// export const deleteApplication = async (applicationId: number) => {
//   const jobApplicationRepository = AppDataSource.getRepository(JobApplication);
//   const jobApplication = await jobApplicationRepository.findOne({
//     where: { id: applicationId },
//   });

//   if (!jobApplication) {
//     throw new Error("Job application not found");
//   }

//   await jobApplicationRepository.remove(jobApplication);
//   return { message: "Job application deleted successfully" };
// };
