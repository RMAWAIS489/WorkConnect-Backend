import { Router } from "express";
import { authMiddleware } from "../middlewares/authmiddleware.js";
import { createCandidateController, deleteCandidateController, fetchAllCandidatesController, fetchCandidateByUserId, getCandidateResumeById, updateCandidateController } from "../controller/candidate.controller.js";
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Candidates
 *   description: Candidate management API
 */
/**
 * @swagger
 * /candidate/information:
 *   post:
 *     summary: Create a candidate profile
 *     description: This endpoint allows a candidate to add their personal and professional details (Requires authentication)
 *     tags: [Candidates]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "John Doe"
 *               contact_number:
 *                 type: string
 *                 example: "+1-234-567-890"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               address:
 *                 type: string
 *                 example: "456 Candidate Street, NY, USA"
 *               skill:
 *                 type: string
 *                 example: "JavaScript, React, Node.js"
 *               education:
 *                 type: string
 *                 example: "B.Sc. in Computer Science"
 *               work_experience:
 *                 type: string
 *                 example: "3 years as a Frontend Developer"
 *               resume_link:
 *                 type: string
 *                 example: "https://drive.google.com/resume.pdf"
 *               portfolio_link:
 *                 type: string
 *                 example: "https://portfolio-johndoe.com"
 *               linkedin_url:
 *                 type: string
 *                 example: "https://linkedin.com/in/johndoe"
 *               github_url:
 *                 type: string
 *                 example: "https://github.com/johndoe"
 *     responses:
 *       201:
 *         description: Candidate profile created successfully
 *       400:
 *         description: Bad request (Invalid input)
 *       401:
 *         description: Unauthorized (Invalid token)
 */
router.post("/information", authMiddleware, createCandidateController);
/**
 * @swagger
 * /candidate/all:
 *   get:
 *     summary: Get all candidates
 *     description: Fetch all candidate profiles
 *     tags: [Candidates]
 *     responses:
 *       200:
 *         description: List of all candidates
 */
router.get("/all", fetchAllCandidatesController);
/**
 * @swagger
 * /candidate/information/{userId}:
 *   get:
 *     summary: Get candidate details by userId
 *     description: Fetch candidate details by user ID (Requires authentication)
 *     tags: [Candidates]
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
 *         description: Candidate details found
 *       404:
 *         description: Candidate not found
 */
router.get("/information/:userId", authMiddleware, fetchCandidateByUserId);
/**
 * @swagger
 * /candidate/information/{userId}:
 *   put:
 *     summary: Update candidate profile
 *     description: This endpoint allows a candidate to update their profile details (Requires authentication)
 *     tags: [Candidates]
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
 *               fullname:
 *                 type: string
 *               contact_number:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               address:
 *                 type: string
 *               skill:
 *                 type: string
 *               education:
 *                 type: string
 *               work_experience:
 *                 type: string
 *               resume_link:
 *                 type: string
 *               portfolio_link:
 *                 type: string
 *               linkedin_url:
 *                 type: string
 *               github_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Candidate profile updated successfully
 *       404:
 *         description: Candidate not found
 */
router.put("/information/:userId", authMiddleware, updateCandidateController);
/**
 * @swagger
 * /candidate/information/{userId}:
 *   delete:
 *     summary: Delete candidate profile
 *     description: This endpoint allows a candidate to delete their profile (Requires authentication)
 *     tags: [Candidates]
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
 *         description: Candidate profile deleted successfully
 *       404:
 *         description: Candidate not found
 */
router.delete("/information/:userId", authMiddleware, deleteCandidateController);
router.get("/resume/:userId", authMiddleware, getCandidateResumeById);
export default router;
