import videoModel from "../models/videos.model.js";
import courseModel from "../models/courses.model.js";
import userModel from "../models/user.model.js";
import { ApiError, ApiResponse } from "../utils/index.js";
import uploadVideoToVimeo from "../config/vimeo.config.js";

// Create a new video
const createVideo = async (req, res) => {
    const { title, description } = req.body;
    const { courseId } = req.params;
    const videoPath = req?.file?.buffer;

    if (!title || !description) {
        return res
            .status(400)
            .json(new ApiError(400, "Fill all fields"));
    }

    if (!videoPath) {
        return res
            .status(400)
            .json(new ApiError(400, "File is required"));
    }

    if (!courseId) {
        return res
            .status(400)
            .json(new ApiError(400, "Course ID is required"));
    }

    try {
        // Upload video to Vimeo
        const response = await uploadVideoToVimeo(videoPath, title, description);

        // Create new video in the database
        const video = await videoModel.create({
            title,
            description,
            videoUrl: response.embedUrl,
            duration: response.duration,
            course: courseId,
        });

        // Update the course by adding the new video and recalculating the course duration
        const course = await courseModel.findById(courseId);

        if (!course) {
            return res
                .status(404)
                .json(new ApiError(404, "Course not found"));
        }

        // Update course with the new video and recalculate duration
        course.videos.push(video._id);
        const updatedDuration = course.courseDuration + response.duration;
        course.courseDuration = updatedDuration;

        await course.save();

        return res
            .status(201)
            .json(new ApiResponse(201, { video, updatedCourse: course }, "Video created and course updated successfully"));
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, error.message));
    }
};

// Update video
const updateVideo = async (req, res) => {
    const { title, description } = req.body;
    const { videoId } = req.params;

    if (!title || !description) {
        return res
            .status(400)
            .json(new ApiError(400, "Fill all fields"));
    }

    try {
        const video = await videoModel.findById(videoId);

        if (!video) {
            return res
                .status(404)
                .json(new ApiError(404, "Video not found"));
        }

        video.title = title;
        video.description = description;

        await video.save();

        return res
            .status(200)
            .json(new ApiResponse(200, video, "Video updated successfully"));
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, error.message));
    }
}

// Delete video
const deleteVideo = async (req, res) => {
    const { videoId } = req.params;

    try {
        const video = await videoModel.findById(videoId);

        if (!video) {
            return res
                .status(404)
                .json(new ApiError(404, "Video not found"));
        }

        const course = await courseModel.findById(video.course);

        if (!course) {
            return res
                .status(404)
                .json(new ApiError(404, "Course not found"));
        }

        course.videos.pull(videoId);
        await course.save();

        await video.deleteOne();

        return res
            .status(200)
            .json(new ApiResponse(200, video, "Video deleted successfully"));
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, error.message));
    }
}

// Get all videos with course
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

// Update video progress
const updateProgress = async (req, res) => {
    const { videoId } = req.params;
    const { courseId, watchedDuration } = req.body;
    const userId = req.user._id;

    try {
        const video = await videoModel.findById(videoId);
        if (!video) throw new Error("Video not found");

        const course = await courseModel.findById(courseId);
        if (!course) throw new Error("Course not found");

        const user = await userModel.findById(userId);

        // Check if course progress exists
        let courseProgress = user.courseProgress.find(
            (progress) => progress.course.toString() === courseId
        );

        // Initialize progress if not exists
        if (!courseProgress) {
            courseProgress = {
                course: courseId,
                totalWatchDuration: 0,
                videos: course.videos.map((video) => ({
                    video: video._id,
                    watchDuration: 0,
                    isCompleted: false,
                })),
            };
            user.courseProgress.push(courseProgress);
        }

        // Update video progress
        const videoProgress = courseProgress.videos.find(
            (progress) => progress.video.toString() === videoId
        );

        if (videoProgress) {
            videoProgress.watchDuration = Math.min(watchedDuration, video.duration);
            videoProgress.isCompleted = videoProgress.watchDuration === video.duration;
        } else {
            courseProgress.videos.push({
                video: videoId,
                watchDuration: Math.min(watchedDuration, video.duration),
                isCompleted: watchedDuration === video.duration,
            });
        }

        // Update course progress
        courseProgress.totalWatchDuration = courseProgress.videos.reduce(
            (total, videoProgress) => total + videoProgress.watchDuration,
            0
        );

        courseProgress.completed = courseProgress.videos.every((v) => v.isCompleted);

        await user.save();

        return res.status(200).json(new ApiResponse(200, "Video progress updated successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message));
    }
};





export {
    createVideo,
    deleteVideo,
    updateVideo,
    getAllVideos,
    updateProgress
}