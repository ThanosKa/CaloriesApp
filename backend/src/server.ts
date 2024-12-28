import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import { config } from "./config";
import authRoutes from "./routes/authRoutes";
import foodRoutes from "./routes/foodRoutes";
import scanRoutes from "./routes/scanRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// MongoDB connection
mongoose
  .connect(config.db.uri)
  .then(() => {
    console.log(
      `API_BASE_URL is set to: http://localhost:${config.server.port}/api`
    );
    console.log("\nCONNECTED TO MONGODB");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/scan", scanRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date(),
    environment: config.server.nodeEnv,
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(config.server.port, () => {
  console.log(
    `Server running on port ${config.server.port} in ${config.server.nodeEnv} mode`
  );
});
