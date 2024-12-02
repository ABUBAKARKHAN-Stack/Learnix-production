import quizModel from "../models/quiz.model.js";
import courseModel from "../models/courses.model.js";
import { ApiError, ApiResponse } from "../utils/index.js";

// Create new Quiz (only one quiz per course allowed)
const createQuiz = async (req, res) => {
    const { courseId } = req.params;

    if (!courseId) {
        return res.status(400).json(new ApiError(400, "Course ID is required"));
    }

    let course;
    try {
        course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json(new ApiError(404, "Course not found"));
        }
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message));
    }

    // Check if a quiz already exists for the course
    try {
        const existingQuiz = await quizModel.findOne({ course: courseId });
        if (existingQuiz) {
            return res.status(400).json(new ApiError(400, "Quiz already exists for this course"));
        }
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message));
    }

    // Create the quiz
    try {
        const quiz = await quizModel.create({
            title: `${course.name} Quiz`, // Auto-generate title from course name
            description: `This is a quiz for the course: ${course.name}. Make sure to review all the material and answer the questions based on the content covered in the course`,
            course: course._id,
            questions: [],
        });

        await course.updateOne({ $push: { quiz: quiz } });

        return res
            .status(201)
            .json(new ApiResponse(201, quiz, "Quiz created successfully"));

    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message));
    }
};

// Add question to Quiz (max 25 questions per quiz)
const addQuestionToQuiz = async (req, res) => {
    const { question, options, correctAnswerIndex } = req.body;
    const { quizId } = req.params;

    if (!quizId) {
        return res.status(400).json(new ApiError(400, "Quiz ID is required"));
    }

    if (!question || !options) {
        return res.status(400).json(new ApiError(400, "Question and options are required"));
    }

    if (!Array.isArray(options) || options.length < 2) {
        return res.status(400).json(new ApiError(400, "Options must be an array with at least two items"));
    }

    try {
        const quiz = await quizModel.findById(quizId);
        if (!quiz) {
            return res.status(404).json(new ApiError(404, "Quiz not found"));
        }

        // Check if quiz already has 25 questions
        if (quiz.questions.length >= 25) {
            return res.status(400).json(new ApiError(400, "Maximum of 25 questions per quiz reached"));
        }

        // Validate that options are well-formed
        options.forEach((option, index) => {
            if (!option.optionText || typeof option.isCorrect !== 'boolean') {
                return res.status(400).json(new ApiError(400, `Option ${index + 1} is invalid`));
            }
        });

        const newQuestion = {
            question,
            options,
            correctAnswerIndex
        };

        quiz.questions.push(newQuestion);

        await quiz.save();

        return res.status(200).json(new ApiResponse(200, quiz, "Question added to quiz successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message));
    }
};

// Get Full Quiz (For students to view the quiz)
const getFullQuiz = async (req, res) => {
    const { quizId } = req.params;

    if (!quizId) {
        return res.status(400).json(new ApiError(400, "Quiz ID is required"));
    }

    try {
        const quiz = await quizModel.findById(quizId).populate('course', 'name , image');

        if (!quiz) {
            return res.status(404).json(new ApiError(404, "Quiz not found"));
        }

        return res.status(200).json(new ApiResponse(200, quiz, "Quiz fetched successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message));
    }
};

export { createQuiz, addQuestionToQuiz, getFullQuiz };
