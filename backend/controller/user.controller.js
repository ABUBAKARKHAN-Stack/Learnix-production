import userModel from '../models/user.model.js'
import { ApiError, ApiResponse } from '../utils/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendEmails from '../middlewares/nodemailer.middleware.js'
import { uploadOnCloudinary, deleteImageFromCloudinary } from '../config/cloudinary.config.js'




// Create a new user
const createUser = async (req, res) => {
    const { username, email, password, isAdmin } = req.body

    if (!username || !email || !password) {
        return res
            .status(400)
            .json(new ApiError(400, "Fill all fields"))
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            isAdmin
        })

        setTimeout(() => {
            return res
                .status(201)
                .json(new ApiResponse(201, user, "User created successfully"))
        }, 750);

    } catch (error) {
        setTimeout(() => {
            if (error.code === 11000) {
                return res
                    .status(400)
                    .json(new ApiError(400, error.keyValue, `User with ${error.keyValue.email || error.keyValue.username} already exists`))

            }
            return res
                .status(500)
                .json(new ApiError(500, error, "Something went wrong"))
        }, 750);

    }

}


// Login user with email and password & check if user is verified & generate JWT token & set cookie & return response
const loginUser = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) return res
        .status(400)
        .json(new ApiError(400, "Fill all fields"))


    try {

        const user = await userModel.findOne({
            email
        })

        if (!user) {
            return res
                .status(404)
                .json(new ApiError(404, "Invalid email"))
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res
                .status(400)
                .json(new ApiError(400, "Invalid password"))
        }

        if (!user.isVerified) {

            // Generate JWT token for email verification
            const verifyEmailToken = jwt.sign(
                { _id: user._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                })


            const verificationURL = `${process.env.CLIENT_URL}/verification-email/${verifyEmailToken}`

            // await sendEmailVerification(user.email, verificationURL)
            await sendEmails(user.email, "Email Verification", `
            <h1>Verify your email</h1>
            <p>Please click the link below to verify your email:</p>
            <a href="${verificationURL}">Verify Email</a>
            <p>This link will expire in 1 hour.</p>
            `)

            setTimeout(() => {
                return res
                    .status(202)
                    .json(new ApiResponse(202, null, "A verification email has been sent to your inbox."))
            }, 750);

        } else {

            // Generate JWT token for user if email verification is successful
            const token = jwt.sign({
                _id: user._id,
                email: user.email,
                isAdmin: user.isAdmin
            }, process.env.JWT_SECRET, {
                expiresIn: "30d"
            })

            setTimeout(() => {
                return res
                    .status(200)
                    .cookie("token", token, {
                        httpOnly: false,  // Ensures the cookie is not accessible from JavaScript (security best practice)
                        secure: true,    // Ensures the cookie is only sent over HTTPS
                        sameSite: "None", // Allows the cookie to be sent cross-origin (required for third-party cookies)
                        domain: "learnix-production.vercel.app",  // Optional: Ensure this matches your frontend's domain
                        maxAge: 30 * 24 * 60 * 60 * 1000  // Cookie expiration (30 days)
                    })
                    .setHeader("Access-Control-Allow-Origin", "https://learnix-production.vercel.app")
                    .json(new ApiResponse(200, null, "User logged in successfully"))
            }, 750)

        }

    } catch (error) {
        setTimeout(() => {
            return res
                .status(500)
                .json(new ApiError(500, error.message))
        }, 750);
    }

}


// Verify user email with JWT token
const verifyEmail = async (req, res) => {
    const { token } = req.params

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userID = decodedToken._id

        if (!decodedToken) {
            return res
                .status(400)
                .json(new ApiError(400, "Invalid token"))
        }



        const user = await userModel.findByIdAndUpdate(userID, {
            $set: {
                isVerified: true
            }
        }, {
            new: true
        })


        if (!user) {
            return res
                .status(404)
                .json(new ApiError(404, "User not found"))
        }


        setTimeout(() => {
            return res
                .status(200)
                .json(new ApiResponse(200, null, "Email verified successfully"))
        }, 1000);

    } catch (error) {
        setTimeout(() => {
            return res
                .status(500)
                .json(new ApiError(500, error))
        }, 1000);

    }

}

// Send password reset email with JWT token
const forgotPassword = async (req, res) => {
    const { email } = req.body

    if (!email) {
        return res
            .status(400)
            .json(new ApiError(400, "Fill all fields"))
    }

    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            return res
                .status(404)
                .json(new ApiError(404, "User not found"))
        }

        const resetToken = jwt.sign({
            _id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`

        const emailSent = await sendEmails(user.email, "Reset Password", ` 
       <h1>Reset your password</h1>
       <p>Please click the link below to reset your password:</p>
       <a href="${resetURL}">Reset Password</a>
       <p>This link will expire in 1 hour.</p>
       `)

        if (!emailSent) {
            return res
                .status(500)
                .json(new ApiError(500, "Failed to send reset password email"));
        }

        return res
            .status(202)
            .json(new ApiResponse(202, null, "A reset password email has been sent to your inbox."))

    } catch (error) {

        return res
            .status(500)
            .json(new ApiError(500, error.message, "Something went wrong while sending reset password email"))
    }
}

// Reset user password with JWT token & hashed password & save in DB
const resetPassword = async (req, res) => {
    const { token } = req.params
    const { newPassword } = req.body

    if (!newPassword) {
        return res
            .status(400)
            .json(new ApiError(400, "Fill all fields"))
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!decodedToken) {
        return res
            .status(400)
            .json(new ApiError(400, "Invalid or expired token"))
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    try {
        await userModel.findByIdAndUpdate(decodedToken._id, {
            $set: {
                password: hashedPassword
            }
        })

        setTimeout(() => {
            return res
                .status(200)
                .json(new ApiResponse(200, null, "Password reset successfully"))
        }, 500);
    } catch (error) {

        return res
            .status(500)
            .json(new ApiError(500, error.message, "Something went wrong while resetting password"))
    }
}


// Logout user & clear cookie
const logout = async (req, res) => {
    res
        .clearCookie("token")
        .status(200)
        .json(new ApiResponse(200, null, "User logged out successfully"))
}

const uploadAvatar = async (req, res) => {
    const fileBuffer = req?.file?.buffer;  // Get the file from memory
    const userID = req.user._id;

    if (!fileBuffer) {
        return res.status(400).json(new ApiError(400, "File is required"));
    }

    let file;
    try {
        // Upload directly to Cloudinary from memory buffer
        file = await uploadOnCloudinary(fileBuffer);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(new ApiError(500, error.message, "Error uploading to Cloudinary"));
    }

    try {
        // Update user's avatar with the Cloudinary URL
        const user = await userModel.findByIdAndUpdate(userID, {
            $set: {
                avatar: file.secure_url  // Store the secure URL returned by Cloudinary
            }
        }, { new: true });

        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }

        return res.status(200).json(new ApiResponse(200, user, "Avatar uploaded successfully"));
    } catch (error) {
        // Optionally delete the file from Cloudinary if user update fails
        if (file && file.public_id) {
            deleteImageFromCloudinary(file.public_id);
        }
        return res.status(500).json(new ApiError(500, error.message, "Something went wrong while uploading avatar"));
    }
};



// Get Logged in user
const getLoggedInUser = async (req, res) => {
    const userID = req.user._id
    try {
        const user = await userModel.findById(userID)
        return res
            .status(200)
            .json(new ApiResponse(200, user, "User fetched successfully"))
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, error.message, "Something went wrong while fetching user"))
    }
}

// Update user profile
const updateUser = async (req, res) => {
    const { username, email, password } = req.body
    const fileBuffer = req?.file?.buffer;  // Get the file from memory
    const userID = req.user._id

    if (!userID) {
        return res
            .status(400)
            .json(new ApiError(400, "User ID is required"))
    }


    if (!username && !email && !password && !fileBuffer) {
        return res
            .status(400)
            .json(new ApiError(400, "Fill at least one field"))
    }

    const user = await userModel.findById(userID)

    if (!user) {
        return res
            .status(404)
            .json(new ApiError(404, "User not found"))
    }

    let file;
    if (fileBuffer) {
        try {
            file = await uploadOnCloudinary(fileBuffer)
            if (user.avatar) {
                await deleteImageFromCloudinary(user.avatar.split("/").pop().split(".")[0])
            }
        } catch (error) {
            deleteImageFromCloudinary(file?.public_id)
            console.log(error.message)
        }
    }

    try {
        const updatedUser = await userModel.findByIdAndUpdate(userID, {
            $set: {
                username: username || user.username,
                email: email || user.email,
                password: password ? await bcrypt.hash(password, 10) : user.password,
                avatar: file?.secure_url || user.avatar
            }
        }, {
            new: true
        })

        setTimeout(() => {
            return res
                .status(200)
                .json(new ApiResponse(200, { updatedUser, publicId: file.secure_url.split("/").pop().split(".")[0] }, "User updated successfully"))
        }, 1000);
    } catch (error) {

        if (file && file.public_id) {
            await deleteImageFromCloudinary(file.public_id)
        }

        return res
            .status(500)
            .json(new ApiError(500, error.message, "Something went wrong while updating user"))
    }




}

// Get user progress
const getProgress = async (req, res) => {
    const userID = req.user._id; // Extract user ID from the authenticated request
    try {
        // Fetch the user's course progress
        const progress = await getUserProgress(userID);

        return res
            .status(200)
            .json(new ApiResponse(200, progress, "User progress fetched successfully"));
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, error.message, "Something went wrong while fetching user progress"));
    }
};

const getUserProgress = async (userId) => {
    const user = await userModel.findById(userId)
        .populate({
            path: 'courseProgress.course',
            select: 'name courseDuration'
        })
        .populate({
            path: 'courseProgress.videos.video',
            select: 'title duration'
        });

    if (!user) {
        throw new Error("User not found");
    }

    return user.courseProgress.map((progress) => ({
        courseName: progress.course.name,
        courseDuration: progress.course.courseDuration,
        totalWatchDuration: progress.totalWatchDuration,
        videos: progress.videos.map((videoProgress) => ({
            videoTitle: videoProgress.video.title,
            watchDuration: videoProgress.watchDuration,
            duration: videoProgress.video.duration,
            isCompleted: videoProgress.isCompleted
        }))
    }));
};




// Export controllers
export {
    createUser,
    loginUser,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    uploadAvatar,
    updateUser,
    getLoggedInUser,
    getProgress
}