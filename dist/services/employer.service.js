import { AppDataSource } from "../database/data-source.js";
import { Employer } from "../entity/Employers.js";
import { User } from "../entity/User.js";
export const createEmployer = async (userId, employerData) => {
    const employerRepository = AppDataSource.getRepository(Employer);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error("User not found");
    }
    if (user.role !== "employer") {
        throw new Error("User role must be employer to create employer data");
    }
    const employer = employerRepository.create({
        ...employerData,
        user,
    });
    await employerRepository.save(employer);
    return employer;
};
export const getAllEmployers = async () => {
    const employerRepository = AppDataSource.getRepository(Employer);
    const employers = await employerRepository.find({
        relations: ["user"], // Include the related user if needed
    });
    return employers;
};
export const getEmployerByUserId = async (userId) => {
    const employerRepository = AppDataSource.getRepository(Employer);
    const employer = await employerRepository.findOne({
        where: { user: { id: userId } },
        relations: [],
    });
    if (!employer) {
        throw new Error("Employer not found");
    }
    return employer;
};
export const updateEmployer = async (userId, updatedData) => {
    const employerRepository = AppDataSource.getRepository(Employer);
    const employer = await employerRepository.findOne({
        where: { user: { id: userId } },
    });
    if (!employer) {
        throw new Error("Employer not found");
    }
    Object.assign(employer, updatedData);
    await employerRepository.save(employer);
    return employer;
};
export const deleteEmployerByUserId = async (userId) => {
    const employerRepository = AppDataSource.getRepository(Employer);
    const employer = await employerRepository.findOne({
        where: { user: { id: userId } },
        relations: [],
    });
    if (!employer) {
        throw new Error("Candidate not found");
    }
    await employerRepository.remove(employer);
    return { message: "Candidate deleted successfully" };
};
