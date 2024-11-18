import videoModel from "../models/videos.model.js";
import courseModel from "../models/courses.model.js";
import { ApiError, ApiResponse } from "../utils/index.js";
import uploadVideoToVimeo from "../config/vimeo.config.js";

// Create a new video
const createVideo = async (req, res) => {
    const { title, description } = req.body
    const { courseId } = req.params
    const videoPath = req?.file?.path

    if (!title || !description) {
        return res
            .status(400)
            .json(new ApiError(400, "Fill all fields"))
    }

    if (!videoPath) {
        return res
            .status(400)
            .json(new ApiError(400, "File is required"))
    }

    if (!courseId) {
        return res
            .status(400)
            .json(new ApiError(400, "Course ID is required"))
    }

    const videoUrl = await uploadVideoToVimeo(videoPath, title, description)

    try {
        const video = await videoModel.create({
            title,
            description,
            videoUrl: videoUrl,
            course: courseId
        })

        await courseModel.findByIdAndUpdate(courseId, {
            $push: {
                videos: video._id
            }
        }, { new: true })

        return res
            .status(201)
            .json(new ApiResponse(201, video, "Video created successfully"))
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, error.message))
    }
}

// Get all videos
const getAllVideos = async (req, res) => {

    try {
        const videos = await videoModel.find({
            course: req.params.courseId
        })
        if (videos.length === 0) {
            return res
                .status(200)
                .json(new ApiResponse(200, "This course has no Lectures", "Videos fetched successfully"))
        }
        return res
            .status(200)
            .json(new ApiResponse(200, videos, "Videos fetched successfully"))
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, error.message))
    }
}



export { createVideo, getAllVideos }