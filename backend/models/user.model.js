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
    }
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)

export default userModel;