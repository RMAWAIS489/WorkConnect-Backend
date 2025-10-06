import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.route.js";
import employerRouter from "./routes/employer.route.js";
import candidateRouter from "./routes/candidate.route.js";
import jobsRouter from "./routes/jobs.route.js";
import JobApplicationRouter from "./routes/jobApplication.route.js";
import { swaggerDocs, swaggerUi } from "./swagger.js";
const app = express();
// ✅ Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// ✅ CORS configuration (fixed for Netlify + local dev)
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://workconnectfrontend.netlify.app", // your deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
// ✅ Handle preflight (OPTIONS) requests for all routes
app.options("*", cors());
// ✅ Middleware setup
app.use(bodyParser.json());
app.use(express.json());
// ✅ Health check route
app.get("/", (req, res) => {
    res.send("✅ Backend server is running and CORS is configured properly!");
});
// ✅ API routes
app.use("/users", userRoutes);
app.use("/employer", employerRouter);
app.use("/candidate", candidateRouter);
app.use("/jobs", jobsRouter);
app.use("/jobapplication", JobApplicationRouter);
// ✅ Export app for server.js or Railway
export default app;
