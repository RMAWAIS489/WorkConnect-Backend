import express from "express";
import userRoutes from "./routes/user.route.js";
import employerRouter from "./routes/employer.route.js";
import candidateRouter from "./routes/candidate.route.js"
import jobsRouter from "./routes/jobs.route.js"
import JobApplicationRouter from "./routes/jobApplication.route.js"
import cors from 'cors'
import bodyParser from "body-parser";
import { swaggerDocs, swaggerUi } from "./swagger.js";
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));
  app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend server is running!");
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/users", userRoutes);
app.use("/employer",employerRouter);
app.use("/candidate",candidateRouter);
app.use("/jobs",jobsRouter)
app.use("/jobapplication",JobApplicationRouter)
export default app;
