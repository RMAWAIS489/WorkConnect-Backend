import { AppDataSource } from "../database/data-source.js";
import { Employer } from "../entity/Employers.js";
import { User } from "../entity/User.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from 'bcryptjs';
const userRepository = AppDataSource.getRepository(User);
const employerRepository = AppDataSource.getRepository(Employer);
export const createUser = async (name, email, password, role) => {
    // ✅ Check if user already exists
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
        throw { message: "User with this email already exists", status: 409 };
    }
    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // ✅ Create user entity
    const user = userRepository.create({ name, email, password: hashedPassword, role });
    await userRepository.save(user);
    // ✅ Generate token just like login
    const token = generateToken(user.id, user.role, user.name);
    // ✅ Return user + token
    return {
        message: "Signup successful",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};
export const updateUserPassword = async (userId, currentPassword, newPassword) => {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user)
        throw new Error("User not found");
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid)
        throw new Error("Current password is incorrect");
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await userRepository.save(user);
};
export const updateUserEmail = async (userId, newEmail) => {
    const existingUser = await userRepository.findOne({ where: { email: newEmail } });
    if (existingUser)
        throw new Error("Email is already taken");
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user)
        throw new Error("User not found");
    user.email = newEmail;
    await userRepository.save(user);
};
export const deleteUserAccount = async (userId) => {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error("User not found");
    }
    // Delete employer record linked to this user
    await employerRepository.delete({ user: { id: userId } });
    // Now delete user
    await userRepository.delete(userId);
};
export const getAllUsers = async () => {
    try {
        const users = await userRepository.find({
            select: ["id", "name", "email", "role", "createdAt"],
            order: { createdAt: "DESC" },
        });
        // Format date
        const formattedUsers = users.map(u => ({
            ...u,
            createdAt: u.createdAt.toISOString().split("T")[0], // YYYY-MM-DD
        }));
        return {
            message: "Users fetched successfully",
            users: formattedUsers,
        };
    }
    catch (error) {
        throw { message: "Failed to fetch users", status: 500 };
    }
};
export const deleteUser = async (id) => {
    try {
        const user = await userRepository.findOne({ where: { id } });
        if (!user) {
            throw { message: "User not found", status: 404 };
        }
        await userRepository.remove(user);
        return { message: "User deleted successfully" };
    }
    catch (error) {
        throw { message: error.message || "Failed to delete user", status: error.status || 500 };
    }
};
