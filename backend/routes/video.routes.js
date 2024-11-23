import { Router } from "express";
import { createVideo, getAllVideos, updateProgress } from "../controller/video.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { upload } from "../config/multer.config.js";

const router = Router()


// Create new video route       
router.post("/create/:courseId", authMiddleware, upload.single("video"), createVideo)

// Get all videos route
router.get("/:courseId", authMiddleware, getAllVideos)

// Video progress route
router.post("/:videoId/progress", authMiddleware, updateProgress);


export default router