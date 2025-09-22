import { Router } from "express";
import { changePassword, createUserHandler, deleteAccount, deleteUsers, getAllUsersController, loginController, updateEmail } from "../controller/user.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { changePasswordSchema, loginUserSchema, updateEmailSchema } from "../schemas/user.schema.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";

const router = Router();
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows a user to register with their email and password
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "SecurePassword123"
 *               passwordConfirm:
 *                 type: string
 *                 example: "SecurePassword123"
 *               role:
 *                 type: string
 *                 enum:
 *                   - candidate
 *                   - employer
 *                   - admin
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request (Validation error)
 */
router.post("/register",  createUserHandler);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: This endpoint allows a user to login with their email and password
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "SecurePassword123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid email or password
 */
router.post("/login", validateRequest(loginUserSchema), loginController);
router.put("/change-password", authMiddleware, validateRequest(changePasswordSchema), changePassword);
router.put("/update-email", authMiddleware, validateRequest(updateEmailSchema), updateEmail);
router.delete("/delete-account", authMiddleware, deleteAccount);
router.get("/all",authMiddleware, getAllUsersController)
router.delete("/:id", authMiddleware,deleteUsers);
export default router;
