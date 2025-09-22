import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
console.log("Cloud Name:", process.env.CLOUD_NAME);
console.log("API Key:", process.env.CLOUD_API);
console.log("API Secret:", process.env.API_SECRET);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.API_SECRET,
});


export default cloudinary;
