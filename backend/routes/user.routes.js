import { Router } from "express";
import {
    createUser,
    loginUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
    logout,
    uploadAvatar,
    updateUser,
    getLoggedInUser,
    getProgress
} from "../controller/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { upload } from "../config/multer.config.js";


const router = Router()

// Register user route
router.post("/register", createUser)

// Login user route
router.post("/login", loginUser)

// Verify email route
router.get('/verify-email/:token', verifyEmail)

// Forgot password route
router.post('/forgot-password', forgotPassword)

//  Reset password route
router.post('/reset-password/:token', resetPassword)

// Logout user route
router.get('/logout', authMiddleware, logout)


// Upload user profile picture
router.post('/upload-avatar', authMiddleware, upload.single('avatar'), uploadAvatar)


// Update user route
router.put('/update-settings', authMiddleware, upload.single('update_avatar'), updateUser)


// Get logged in user route
router.get('/me', authMiddleware, getLoggedInUser)

// Get user progress
router.get('/progress', authMiddleware, getProgress)



export default router

