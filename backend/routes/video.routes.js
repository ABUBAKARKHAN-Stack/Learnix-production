import { Router } from "express";
import { createVideo , getAllVideos } from "../controller/video.controller.js";
import { upload } from "../config/multer.config.js";

const router = Router()


// Create new video route       
router.post("/create/:courseId", upload.single("video"), createVideo)

// Get all videos route
router.get("/:courseId", getAllVideos)


export default router