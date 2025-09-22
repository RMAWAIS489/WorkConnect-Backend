import { Router } from "express";
import { createEmployerController, deleteEmployerController, fetchAllEmployersController, fetchEmployerByUserId, updateEmployerController } from "../controller/employer.controller.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Employers
 *   description: Employer management API
 */
/**
 * @swagger
 * /employer/information:
 *   post:
 *     summary: Create an employer
 *     description: This endpoint allows an employer to add their company details (Requires authentication)
 *     tags: [Employers]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 123
 *               company_name:
 *                 type: string
 *                 example: "Tech Solutions Ltd."
 *               contact_number:
 *                 type: string
 *                 example: "+1-234-567-890"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "employer@example.com"
 *               address:
 *                 type: string
 *                 example: "123 Business Street, NY, USA"
 *               website:
 *                 type: string
 *                 example: "https://techsolutions.com"
 *               industry_type:
 *                 type: string
 *                 example: "IT Services"
 *               company_description:
 *                 type: string
 *                 example: "We provide IT solutions and consulting."
 *               linkedin_url:
 *                 type: string
 *                 example: "https://linkedin.com/company/techsolutions"
 *     responses:
 *       201:
 *         description: Employer information created successfully
 *       400:
 *         description: Bad request (Invalid input)
 *       401:
 *         description: Unauthorized (Invalid token)
 */
router.post("/information", authMiddleware, createEmployerController);
/**
 * @swagger
 * /employer/all:
 *   get:
 *     summary: Get all employers
 *     description: Fetch all employer records (Requires authentication)
 *     tags: [Employers]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all employers
 *       401:
 *         description: Unauthorized (Invalid token)
 */
router.get("/all", authMiddleware, fetchAllEmployersController);
/**
 * @swagger
 * /employer/information/{userId}:
 *   get:
 *     summary: Get employer details by userId
 *     description: Fetch employer details by user ID (Requires authentication)
 *     tags: [Employers]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employer details found
 *       404:
 *         description: Employer not found
 */
router.get("/information/:userId", authMiddleware, fetchEmployerByUserId);
/**
 * @swagger
 * /employer/information/{userId}:
 *   put:
 *     summary: Update employer details
 *     description: This endpoint allows an employer to update their company details (Requires authentication)
 *     tags: [Employers]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company_name:
 *                 type: string
 *               contact_number:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               address:
 *                 type: string
 *               website:
 *                 type: string
 *               industry_type:
 *                 type: string
 *               company_description:
 *                 type: string
 *               linkedin_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employer information updated successfully
 *       404:
 *         description: Employer not found
 */
router.put("/information/:userId", authMiddleware, updateEmployerController);
/**
 * @swagger
 * /employer/information/{userId}:
 *   delete:
 *     summary: Delete employer details
 *     description: This endpoint allows an employer to delete their information (Requires authentication)
 *     tags: [Employers]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employer information deleted successfully
 *       404:
 *         description: Employer not found
 */
router.delete("/information/:userId", authMiddleware, deleteEmployerController);
export default router;
