import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        resource_type: "auto",
        folder: "resumes",
        public_id: `resume-${Date.now()}`,
        access_mode: "public",
        type: "upload",
    }),
});
const upload = multer({ storage });
export default upload;
