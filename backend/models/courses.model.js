import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    enrollments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'videos'
        }
    ]
})

const courseModel = mongoose.model('courses', courseSchema)

export default courseModel;