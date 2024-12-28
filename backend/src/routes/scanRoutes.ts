import express, { Router } from "express";
import { scanController } from "../controllers/scanController";
import { authMiddleware } from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";

const router: Router = express.Router();

// Scan route with authentication and file upload
router.post(
  "/",
  // authMiddleware, // Uncomment if you need authentication
  upload.single("image"),
  scanController.scanFood
);

export default router;
