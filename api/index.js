import Express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import registerRoutes from "./routes/register.route.js";
import poleRoutes from "./routes/pole.route.js";
import tacheRoutes from "./routes/tache.route.js";
import pointingRoutes from "./routes/pointing.route.js";
import projectRoutes from "./routes/project.route.js";
import { requestPasswordReset, resetPassword, verifyOtp } from './controllers/user.controller.js';

import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import rateLimit from 'express-rate-limit';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

// file deepcode ignore UseCsurfForExpress: <please specify a reason of ignoring this>, file deepcode ignore DisablePoweredBy: <please specify a reason of ignoring this>
const app = Express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes"
});

app.use(limiter);

app.use(Express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/api/uploads", Express.static(path.join(__dirname, "/uploads")));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/register", registerRoutes);
app.use("/api", poleRoutes);
app.use("/api", tacheRoutes);
app.use("/api", pointingRoutes);
app.use('/api', projectRoutes);
app.use('/api/request-password-reset', requestPasswordReset);
app.use('/api/reset-password', resetPassword);
app.use('/api/verify-otp', verifyOtp);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
