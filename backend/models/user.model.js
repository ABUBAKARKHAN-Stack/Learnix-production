import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String, // Coloudinary URL,
        default: '',
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    courseProgress: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'courses'
            },
            totalWatchDuration: {
                type: Number,
                default: 0
            },
            videos: [
                {
                    video: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'videos'
                    },
                    watchDuration: {
                        type: Number,
                        default: 0
                    },
                    isCompleted: {
                        type: Boolean,
                        default: false
                    }
                }
            ]
        }
    ]
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)

export default userModel;