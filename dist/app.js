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
// ✅ Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// ✅ Allow CORS for frontend & local dev
const allowedOrigins = [
    "http://localhost:3000",
    "https://workconnectfrontend.netlify.app",
];
// ✅ CORS middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// ✅ Manually handle OPTIONS preflight safely (TypeScript friendly)
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
        return; // ✅ stop here safely
    }
    next();
});
// ✅ JSON + Body parser
app.use(bodyParser.json());
app.use(express.json());
// ✅ Health check
app.get("/", (req, res) => {
    res.send("✅ Backend running with CORS fully configured for Netlify!");
});
// ✅ Routes
app.use("/users", userRoutes);
app.use("/employer", employerRouter);
app.use("/candidate", candidateRouter);
app.use("/jobs", jobsRouter);
app.use("/jobapplication", JobApplicationRouter);
export default app;
