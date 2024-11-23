import courseModel from "../models/courses.model.js";
import { ApiError, ApiResponse } from "../utils/index.js";
import { uploadOnCloudinary, deleteFromCloudinary, thumbnailImageForCourse } from "../config/cloudinary.config.js";


// Create new course 
const createCourse = async (req, res) => {
    const { name, description, price } = req.body
    const userID = req.user._id
    const filePath = req?.file?.path

    let courseImage;

    try {
        if (filePath) {
            courseImage = await uploadOnCloudinary(filePath);
        }
    } catch (error) {
        console.error(`Image upload failed: ${error.message}`);
        return res
            .status(500)
            .json(new ApiError(500, "Failed to upload course image"));
    }


    if (!name || !description || !price) {
        return res
            .status(400)
            .json(new ApiError(400, "Fill all fields"))
    }

    try {
        const course = await courseModel.create({
            name,
            description,
            price,
            image: courseImage ? thumbnailImageForCourse(courseImage?.public_id) : undefined,
            user: userID,
        })


        return res
            .status(201)
            .json(new ApiResponse(201, course, "Course created successfully"))
    } catch (error) {
        if (courseImage?.public_id) {
            deleteFromCloudinary(courseImage?.public_id)
        }
        return res
            .status(500)
            .json(new ApiError(500, error.message))
    }
}

const updateCourse = async (req, res) => {
    const { name, description, price } = req.body;
    const { courseId } = req.params;
    const userID = req.user._id;
    const filePath = req?.file?.path;

    if (!courseId) {
        return res.status(400).json(new ApiError(400, "Course ID is required"));
    }

    if (!userID) {
        return res.status(400).json(new ApiError(400, "User ID is required"));
    }

    try {
        // Fetch the course with one query
        const course = await courseModel.findOne({ _id: courseId, user: userID });

        if (!course) {
            return res
                .status(403)
                .json(new ApiError(403, "You are not authorized to update this course or course does not exist"));
        }

        // Handle Cloudinary upload and deletion
        let uploadedImage = null;
        if (filePath) {
            try {
                uploadedImage = await uploadOnCloudinary(filePath);

                // Delete the old image from Cloudinary if it exists
                if (course.image) {
                    const oldImageId = course.image.split("/").pop().split("?")[0];
                    await deleteFromCloudinary(oldImageId);
                }
            } catch (cloudinaryError) {
                return res
                    .status(500)
                    .json(new ApiError(500, "Failed to upload or delete Cloudinary image"));
            }
        }

        // Update course properties directly
        course.name = name || course.name;
        course.description = description || course.description;
        course.price = price || course.price;
        if (uploadedImage) {
            course.image = thumbnailImageForCourse(uploadedImage.public_id);
        }

        // Save the updated course
        const updatedCourse = await course.save();

        return res
            .status(200)
            .json(new ApiResponse(200, updatedCourse, "Course updated successfully"));
    } catch (error) {
        console.error("Error updating course:", error);
        return res
            .status(500)
            .json(new ApiError(500, error.message || "An unexpected error occurred"));
    }
};


// Delete course
const deleteCourse = async (req, res) => {
    const { courseId } = req.params


    try {
        const course = await courseModel.findOne({ _id: courseId, user: req.user._id })

        if (!course) {
            return res
                .status(403)
                .json(new ApiError(403, "You are not authorized to delete this course or course does not exist"))
        }

        await course.deleteOne()
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Course deleted successfully"))
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, error.message))
    }
}


// Get Single course with all Lectures
const getCourseWithLectures = async (req, res) => {
    const { courseId } = req.params
    try {
        const course = await courseModel.findById(courseId).populate("videos")

        if (!course) {
            return res
                .status(404)
                .json(new ApiError(404, "Course not found"))
        }


        return res
            .status(200)
            .json(new ApiResponse(200, course, "Course & Lectures fetched successfully"))
    } catch (error) {

        return res
            .status(500)
            .json(new ApiError(500, error.message))
    }
}


// Get all courses 
const getAllCourses = async (req, res) => {
    try {
        const courses = await courseModel.find({})
            .select("name description price image user")
            .lean()
        return res
            .status(200)
            .json(new ApiResponse(200, courses, "Courses fetched successfully"))
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, error.message))
    }
}


export {
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourses,
    getCourseWithLectures
} 
