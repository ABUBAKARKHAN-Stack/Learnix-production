import mongoose from "mongoose";

// Define the schema for a quiz question
const quizQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    options: [
        {
            optionText: {
                type: String,
                required: true,
                trim: true 
            },
            isCorrect: {
                type: Boolean,
                required: true
            }
        }
    ],
    correctAnswerIndex: { 
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return this.options && value >= 0 && value < this.options.length;
            },
            message: "Correct answer index is out of bounds"
        }
    },
}, { timestamps: true });


const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    questions: [quizQuestionSchema], 
}, { timestamps: true });

const quizModel = mongoose.model('quizzes', quizSchema);

export default quizModel;
