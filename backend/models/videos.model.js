import mongoose from "mongoose";


const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses'
    }

}, { timestamps: true })



const videoModel = mongoose.model('videos', videoSchema)

export default videoModel;