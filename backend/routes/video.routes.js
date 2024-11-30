import { Router } from "express";
import { createVideo, getAllVideos, updateProgress, updateVideo, deleteVideo } from "../controller/video.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { upload } from "../config/multer.config.js";

const router = Router()


// Create new video route       
router.post("/create", authMiddleware, upload.single("video"), createVideo)

// Update video route
router.put("/update/:videoId", authMiddleware, upload.single("video"), updateVideo)

// Delete video route
router.delete("/delete/:videoId", authMiddleware, deleteVideo)

// Get all videos route
router.get("/:courseId", authMiddleware, getAllVideos)

// Video progress route
router.post("/:videoId/progress", authMiddleware, updateProgress);


export default router