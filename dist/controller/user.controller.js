import { createUser, deleteUserAccount, deleteUser, getAllUsers, updateUserEmail, updateUserPassword } from "../services/user.service.js";
import { loginUser } from "../services/authService.js";
export const createUserHandler = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log("Received user data:", req.body);
        const user = await createUser(name, email, password, role);
        res.status(201).json(user);
    }
    catch (error) {
        console.error("Error creating user:", error);
        res
            .status(500)
            .json({ message: "Error creating user", error: error.message });
    }
};
export const loginController = async (req, res) => {
    console.log("Request Body:", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
    }
    try {
        const { message, token } = await loginUser(email, password);
        res.status(200).json({ message, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const changePassword = async (req, res) => {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized request" });
        return;
    }
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;
    await updateUserPassword(userId, currentPassword, newPassword);
    res.status(200).json({ message: "Password updated successfully" });
};
export const updateEmail = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized request" });
            return;
        }
        const userId = req.user.userId;
        const { newEmail } = req.body;
        await updateUserEmail(userId, newEmail);
        res.status(200).json({ message: "Email updated successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const deleteAccount = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized request" });
            return;
        }
        const userId = req.user.userId;
        await deleteUserAccount(userId);
        res.status(200).json({ message: "Account deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getAllUsersController = async (req, res) => {
    try {
        const result = await getAllUsers();
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};
export const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await deleteUser(Number(id));
        res.json(response);
    }
    catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};
