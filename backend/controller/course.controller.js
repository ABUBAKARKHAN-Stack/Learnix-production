import courseModel from "../models/courses.model.js";
import { ApiError, ApiResponse } from "../utils/index.js";
import { uploadOnCloudinary, deleteFromCloudinary, thumbnailImageForCourse } from "../config/cloudinary.config.js";
import stripe from "../config/stripe.config.js";
import mongoose from "mongoose";


// Create new course 
const createCourse = async (req, res) => {
    const { name, description, price } = req.body
    const userID = req.user._id
    const courseThumbnail = req?.file?.path

    let courseImage;

    try {
        if (courseThumbnail) {
            courseImage = await uploadOnCloudinary(courseThumbnail);
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


        return  setTimeout(() => {
             res
                .status(201)
                .json(new ApiResponse(201, course, "Course created successfully"))
        }, 1000);
    } catch (error) {
        if (courseImage?.public_id) {
            deleteFromCloudinary(courseImage?.public_id)
        }
        return res
            .status(500)
            .json(new ApiError(500, error, 'Course creation failed'))
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

        setTimeout(() => {
            return res
                .status(200)
                .json(new ApiResponse(200, updatedCourse, "Course updated successfully!"));
        }, 1000);
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
        setTimeout(() => {
            return res
                .status(200)
                .json(new ApiResponse(200, null, "Course deleted successfully"))
        }, 1000);
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, error.message))
    }
}

// Publish course
const publishCourse = async (req, res) => {
    const { courseId } = req.params
    try {
        const course = await courseModel.findOne({ _id: courseId, user: req.user._id })

        if (!course) {
            return res
                .status(403)
                .json(new ApiError(403, "You are not authorized to publish this course or course does not exist"))
        }

        course.isPublish = true
        await course.save()
        setTimeout(() => {
            return res
                .status(200)
                .json(new ApiResponse(200, null, "Course published successfully"))
        }, 1000);
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
        const course = await courseModel.findById(courseId).populate("videos quiz")

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

// Get Single Course Details without lectures
const getSingleCourse = async (req, res) => {
    const { courseId } = req.params
    try {
        const course = await courseModel.findById(courseId).select("name description price image enrollments courseDuration quiz isPublish").populate("quiz")

        if (!course) {
            return res
                .status(404)
                .json(new ApiError(404, "Course not found"))
        }


        return res
            .status(200)
            .json(new ApiResponse(200, course, "Course fetched successfully"))

    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, error.message))
    }
}


// Get all published courses 
const getAllCourses = async (req, res) => {
    try {
        const courses = await courseModel.find({
            isPublish: true
        })
            .select("name description price image enrollments user isPublish")
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

// Purchase course
const purchaseCourseWithPayment = async (req, res) => {
    const { courseId } = req.params;
    const { amount } = req.body; // Payment amount
    const userID = req.user._id; // Assuming user ID is coming from authenticated middleware

    try {
        // Validate user ID
        if (!mongoose.Types.ObjectId.isValid(userID)) {
            return res.status(400).json(new ApiError(400, "Invalid user ID"));
        }

        // Validate course ID and fetch course details
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json(new ApiError(404, "Course not found"));
        }

        // Validate amount
        if (!amount) {
            return res.status(400).json(new ApiError(400, "Amount is required"));
        }

        // Create a Stripe Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Amount in cents
            currency: "usd",
            payment_method_types: ["card"],
        });

        // Check if the user is already enrolled
        if (course.enrollments.includes(userID)) {
            return res.status(400).json(new ApiError(400, "User already enrolled in the course"));
        }

        // Add the user to the course enrollments after payment intent creation
        course.enrollments.push(userID);
        await course.save();

        // Return response with clientSecret and course details
        return res
            .status(200)
            .json(new ApiResponse(200, {
                clientSecret: paymentIntent.client_secret,
                course,
            }, "Payment Intent created and course purchased successfully"));
    } catch (error) {
        console.error("Error in purchaseCourseWithPayment:", error);
        return res.status(500).json(new ApiError(500, error.message));
    }
};


// Get Purchased Courses
const getPurchasedCourses = async (req, res) => {
    const userID = req.user._id;

    try {
        if (!mongoose.Types.ObjectId.isValid(userID)) {
            return res.status(400).json(new ApiError(400, "Invalid user ID"));
        }

        // Query courses where the user is enrolled
        const courses = await courseModel
            .find({ enrollments: userID })
            .select("name description price image videos quiz").populate("quiz")
            .lean();

        if (courses.length === 0) {
            return res
                .status(200)
                .json(new ApiResponse(200, [], "You have not enrolled in any courses yet"));
        }

        return res
            .status(200)
            .json(new ApiResponse(200, courses, "Purchased courses fetched successfully"));
    } catch (error) {
        console.error("Error fetching purchased courses:", error);
        return res
            .status(500)
            .json(new ApiError(500, error.message || "An unexpected error occurred"));
    }
};

// Get Admin Courses
const getAdminCourses = async (req, res) => {
    const userID = req.user._id; // Get the logged-in user's ID
    const isAdmin = req.user.isAdmin; // Check if the user is an admin

    // Ensure that only admin users can fetch admin courses
    if (!isAdmin) {
        return res
            .status(403)
            .json(new ApiError(403, "You are not authorized to access admin courses"));
    }

    try {
        // Fetch courses created by this admin user with the `isAdminCourse` field set to true
        const courses = await courseModel.find({ user: userID })
        if (!courses || courses.length === 0) {
            return res
                .status(404)
                .json(new ApiResponse(404, [], "No admin courses found for this user"));
        }

        return res
            .status(200)
            .json(new ApiResponse(200, courses, "Admin courses fetched successfully"));
    } catch (error) {
        console.error("Error fetching admin courses:", error);
        return res
            .status(500)
            .json(new ApiError(500, error.message || "An unexpected error occurred"));
    }
};



export {
    createCourse,
    updateCourse,
    deleteCourse,
    publishCourse,
    getAllCourses,
    getCourseWithLectures,
    getSingleCourse,
    getPurchasedCourses,
    purchaseCourseWithPayment,
    getAdminCourses,
} 
