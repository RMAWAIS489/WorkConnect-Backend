import { AppDataSource } from "../database/data-source.js";
import { Candidate } from "../entity/candidate.js";
import { User } from "../entity/User.js";

export const createCandidate = async (
  userId: number,
  candidateData: {
    fullname: string;
    contact_number: string;
    email: string;
    address: string;
    skill: string;
    education: string;
    work_experience: string;
    resume_link: string; // Cloudinary URL
    portfolio_link: string;
    linkedin_url: string;
    github_url: string;
  }
) => {
  const candidateRepository = AppDataSource.getRepository(Candidate);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error("User not found");
  }
  if (user.role !== "candidate") {
    throw new Error("User role must be candidate to create candidate data");
  }

  const candidate = candidateRepository.create({
    ...candidateData,
    user,
  });

  await candidateRepository.save(candidate);
  return candidate;
};
export const getCandidateResume = async (userId: number) => {
  const candidateRepository = AppDataSource.getRepository(Candidate);

  const candidate = await candidateRepository.findOne({
    where: { user: { id: userId } },
    relations:[],
    
  });
  

  if (!candidate) {
    throw new Error("Candidate not found");
  }

  return candidate.resume_link;
};


export const getAllCandidates = async () => {
  const userRepository = AppDataSource.getRepository(User);
  const candidates = await userRepository.find({
   relations: [],
  });
  return candidates;
};

export const getCandidateByUserId = async (userId: number) => {
  const candidateRepository = AppDataSource.getRepository(Candidate);
  const candidate = await candidateRepository.findOne({
    where: { user: { id: userId } },
    relations: [],
  });
  if (!candidate) {
    throw new Error("Employer not found");
  }
  return candidate;
};

export const updateCandidate = async (
  userId: number,
  updatedData: Partial<Candidate>
) => {
  const candidateRepository = AppDataSource.getRepository(Candidate);
  const candidate = await candidateRepository.findOne({
    where: { user: { id: userId } },
  });
  if (!candidate) {
    throw new Error("Candidate not found");
  }
  Object.assign(candidate, updatedData);
  await candidateRepository.save(candidate);
  return candidate;
};

export const deleteCandidateByUserId = async (userId: number) => {
  const candidateRepository = AppDataSource.getRepository(Candidate);
  const candidate = await candidateRepository.findOne({
    where: { user: { id: userId } },
    relations: [],
  });
  if (!candidate) {
    throw new Error("Candidate not found");
  }
  await candidateRepository.remove(candidate);
  return { message: "Candidate deleted successfully" };
};
