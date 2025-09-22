import { createCandidate, deleteCandidateByUserId, getAllCandidates, getCandidateByUserId, getCandidateResume, updateCandidate, } from "../services/candidate.service.js";
import upload from "../cloudinary/upload.js";
export const createCandidateController = async (req, res) => {
    upload.single("resume")(req, res, async (err) => {
        if (err) {
            console.error("File upload error:", err);
            return res.status(400).json({ error: "File upload failed" });
        }
        try {
            const { userId } = req.user || {};
            if (!userId) {
                return res.status(400).json({ message: "User not authenticated" });
            }
            const { fullname, contact_number, email, address, skill, education, work_experience, portfolio_link, linkedin_url, github_url, } = req.body;
            const resume_link = req.file?.path || "";
            const resume_filename = req.file ? req.file.originalname : "";
            console.log("Original Resume Filename:", resume_filename);
            if (!resume_link) {
                return res.status(400).json({ message: "Resume file is required" });
            }
            console.log("Uploaded Resume URL:", resume_link);
            const candidate = await createCandidate(userId, {
                fullname,
                contact_number,
                email,
                address,
                skill,
                education,
                work_experience,
                resume_link,
                portfolio_link,
                linkedin_url,
                github_url,
            });
            res.status(201).json({
                message: "Candidate created successfully",
                candidate,
            });
        }
        catch (error) {
            console.error("Error in createCandidateController:", error);
            res.status(400).json({ error: error.message });
        }
    });
};
export const getCandidateResumeById = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const resume_link = await getCandidateResume(userId);
        const resume_name = resume_link ? resume_link.split("/").pop()?.split("?")[0] : "Unknown";
        res.status(200).json({ resume_link, resume_name });
    }
    catch (error) {
        console.error("Error in getCandidateResumeById:", error);
        res.status(500).json({ error: error.message });
    }
};
export const fetchAllCandidatesController = async (req, res) => {
    try {
        const candidates = await getAllCandidates();
        res.status(200).json({ success: true, data: candidates });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
export const fetchCandidateByUserId = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const candidate = await getCandidateByUserId(userId);
        res.status(200).json({ success: true, data: candidate });
    }
    catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};
export const updateCandidateController = async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const updatedData = req.body;
        const updatedEmployer = await updateCandidate(userId, updatedData);
        res.json({
            success: true,
            data: updatedEmployer,
        });
        return;
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
export const deleteCandidateController = async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        await deleteCandidateByUserId(userId);
        res.json({
            success: true,
            message: "Candidate deleted successfully",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
