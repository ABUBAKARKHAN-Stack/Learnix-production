import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getCourseById,
    getAllVideosOfACourse,
    deleteCourse,
    deleteVideo,
    updateVideo,
    publishCourse,
    createQuiz,
    addQuestion,
    getFullQuizForAdmin
} from "../API/mainFetching";
import { showSuccessToast, showErrorToast } from "../utils/ToastNotification";

function AdminCourseDetails({ id }) {
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [videos, setVideos] = useState([]);
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteCourseLoading, setDeleteCourseLoading] = useState(false);
    const [publishLoading, setPublishLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(null); // For video delete loading
    const [quizLoading, setQuizLoading] = useState(false);
    const [newQuestion, setNewQuestion] = useState({
        question: "",
        options: [
            { optionText: "", isCorrect: false },
            { optionText: "", isCorrect: false },
        ],

    });



    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const courseRes = await getCourseById(id);
                const videoRes = await getAllVideosOfACourse(id);

                setCourse(courseRes.data.data);
                setVideos(Array.isArray(videoRes.data.data) ? videoRes.data.data : []);

                // Fetch quiz data if it exists
                if (courseRes.data.data.quiz) {
                    const quizRes = await getFullQuizForAdmin(courseRes.data.data.quiz[0]._id);
                    setQuiz(quizRes.data.data);
                }
            } catch (error) {
                console.error("Error fetching course, videos, or quiz:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id, newQuestion]);

    const handlePublish = async () => {
        if (window.confirm("Are you sure you want to publish this course?")) {
            setPublishLoading(true);

            // Validation: Ensure the course has at least one video or a quiz
            if (videos.length === 0 || !quiz) {
                showErrorToast("You must add at least one video or a quiz before publishing the course.");
                setPublishLoading(false);
                return;
            }
            try {
                const res = await publishCourse(id); // API call to publish the course
                console.log(res.data);
                showSuccessToast("Course published successfully!");
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);
            } catch (error) {
                console.error("Error publishing course:", error);
                showErrorToast("Failed to publish the course. Please try again.");
            } finally {
                setPublishLoading(false);
            }
        }
    };


    const handleDeleteVideo = async (videoId) => {
        if (window.confirm("Are you sure you want to delete this video?")) {
            setDeleteLoading(videoId);
            try {
                await deleteVideo(videoId); // API to delete the video
                setVideos((prev) => prev.filter((video) => video._id !== videoId));
                showSuccessToast("Video deleted successfully!");
            } catch (error) {
                console.error("Error deleting video:", error);
                showErrorToast("Failed to delete video. Please try again.");
            } finally {
                setDeleteLoading(null);
            }
        }
    };

    const handleCourseEdit = () => {
        navigate(`/admin/course/${id}/edit`)
    };

    const handleDeleteCourse = async () => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                setDeleteCourseLoading(true);
                const res = await deleteCourse(id); // API call to delete the course
                showSuccessToast(res.data.message);
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);

            } catch (error) {
                console.error("Error deleting course:", error);
                showErrorToast("Failed to delete the course. Please try again.");
            } finally {
                setDeleteCourseLoading(false);
            }
        }
    };



    const handleQuizAdd = async () => {
        try {
            setQuizLoading(true);
            const res = await createQuiz(id); // API to create a quiz
            setQuiz(res.data.data); // Save created quiz details
            showSuccessToast("Quiz created successfully!");
        } catch (error) {
            console.error("Error creating quiz:", error);
            showErrorToast("Failed to create quiz. Please try again.");
        } finally {
            setQuizLoading(false);
        }
    };

    const handleAddQuestion = async () => {
        if (quiz.questions.length >= 25) {
            showErrorToast("Maximum 25 questions allowed per quiz.");
            return;
        }
        if (!newQuestion.question || newQuestion.options.length < 2) {
            showErrorToast("Please provide a question and at least two options.");
            return;
        }
        if (!newQuestion.options.some((opt) => opt.isCorrect)) {
            showErrorToast("Please mark one option as correct.");
            return;
        }

        // Find the index of the correct answer
        const correctAnswerIndex = newQuestion.options.findIndex((opt) => opt.isCorrect);

        if (correctAnswerIndex === -1) {
            showErrorToast("Please ensure a valid correct answer is selected.");
            return;
        }

        try {
            const payload = {
                question: newQuestion.question,
                options: newQuestion.options,
                correctAnswerIndex,
            };

            const res = await addQuestion(quiz._id, payload); // API call to add question
            setQuiz((prev) => ({
                ...prev,
                questions: [...prev.questions, res.data.data],
            }));
            setNewQuestion({
                question: "",
                options: [{ optionText: "", isCorrect: false }],
            });
            showSuccessToast("Question added successfully!");
        } catch (error) {
            console.error("Error adding question:", error);
            showErrorToast("Failed to add question. Please try again.");
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center w-[80vw] items-center min-h-screen bg-[#F3EBE5]">
                <p className="text-2xl text-gray-500 font-medium animate-pulse">Loading course details...</p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex justify-center w-[80vw] items-center min-h-screen bg-[#F3EBE5]">
                <p className="text-xl text-red-500">Course not found.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col py-10 px-4 sm:px-6 md:px-10 lg:px-20 bg-[#F3EBE5] min-h-screen">
            {/* Course Title and Details */}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
                <div className="w-full lg:w-3/5">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{course.name}</h1>
                    <p className="text-gray-600 text-base leading-relaxed">{course.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        <p className="text-lg text-gray-800">
                            <span className="font-medium">Price:</span> ${course.price}
                        </p>
                        <p className="text-lg text-gray-800">
                            <span className="font-medium">Enrolled Students:</span> {course.enrollments.length}
                        </p>
                        <p className="text-lg text-gray-800">
                            <span className="font-medium">Duration:</span> {convertDuration(course.courseDuration)}
                        </p>
                    </div>
                </div>

                <div className="w-full lg:w-2/5 flex justify-center">
                    <img
                        src={course.image}
                        alt={course.name}
                        className="w-full max-w-xs rounded-lg shadow-lg"
                    />
                </div>
            </div>

            {/* Admin Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                    onClick={handlePublish}
                    disabled={publishLoading || course.isPublish}
                    className={`flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-teal-600 hover:to-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md ${publishLoading || course.isPublish ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {publishLoading ? "Publishing..." : course.isPublish ? "Published" : "Publish Course"}
                </button>

                <button
                    onClick={handleCourseEdit}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
                >
                    Edit Course
                </button>

                <button
                    onClick={handleDeleteCourse}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
                >
                    {deleteCourseLoading ? "Deleting..." : "Delete Course"}
                </button>
            </div>

            {/* Course Videos */}
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
                        Course Videos
                    </h2>
                    <button
                        onClick={() => navigate(`/admin/course/${id}/add-video`)}
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-transform duration-200"
                    >
                        Add Video
                    </button>
                </div>
                {videos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video) => (
                            <div key={video._id} className="bg-gray-100 rounded-lg shadow p-4">
                                <iframe
                                    src={video.videoUrl}
                                    title={video.title}
                                    className="w-full h-40 rounded"
                                    allowFullScreen
                                ></iframe>
                                <h3 className="text-lg font-semibold text-gray-800 mt-4">{video.title}</h3>
                                <p className="text-sm text-gray-600">{video.description}</p>

                                <div className="mt-4 flex justify-between">


                                    <button
                                        onClick={() => handleDeleteVideo(video._id)}
                                        disabled={deleteLoading === video._id}
                                        className={`px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-transform duration-200 ${deleteLoading === video._id
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                            }`}
                                    >
                                        {deleteLoading === video._id ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-lg text-gray-800 mb-4">No videos added to this course yet.</p>
                    </div>
                )}
            </div>
            {/* Course Quizes */}
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
                        Course Quiz
                    </h2>
                    {!quiz && (
                        <button
                            onClick={handleQuizAdd}
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 active:scale-95 transition-transform duration-200"
                        >
                            {quizLoading ? "Adding..." : "Add Quiz"}
                        </button>
                    )}
                </div>

                {quiz ? (
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Quiz Title: {quiz.title}</h3>
                        <p className="text-gray-600 mb-4">Description: {quiz.description}</p>

                        <div className="mt-4">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                Questions ({quiz.questions.length}/25)
                            </h4>
                            <ul className="list-disc pl-6 space-y-4">
                                {quiz?.questions?.map((q, index) => (
                                    <li key={index} className="text-gray-700">
                                        <div className="font-semibold text-base mb-1">{q.question}</div>
                                        <ul className="ml-4 list-decimal space-y-2">
                                            {q?.options?.map((option, idx) => (
                                                <li
                                                    key={idx}
                                                    className={`text-gray-600 px-2 py-1 rounded-lg ${option.isCorrect
                                                        ? "bg-green-100 border border-green-500 font-medium text-green-700"
                                                        : ""
                                                        }`}
                                                >
                                                    {option.optionText}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {quiz.questions.length < 25 && (
                            <div className="mt-8">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">Add New Question</h4>
                                <input
                                    type="text"
                                    value={newQuestion.question}
                                    onChange={(e) =>
                                        setNewQuestion((prev) => ({
                                            ...prev,
                                            question: e.target.value,
                                        }))
                                    }
                                    placeholder="Enter the question"
                                    className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />

                                {newQuestion?.options?.map((option, idx) => (
                                    <div key={idx} className="flex items-center mb-3">
                                        <input
                                            type="text"
                                            value={option.optionText}
                                            onChange={(e) => {
                                                const updatedOptions = [...newQuestion.options];
                                                updatedOptions[idx].optionText = e.target.value;
                                                setNewQuestion((prev) => ({
                                                    ...prev,
                                                    options: updatedOptions,
                                                }));
                                            }}
                                            placeholder={`Option ${idx + 1}`}
                                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
                                        />
                                        <input
                                            type="checkbox"
                                            checked={option.isCorrect}
                                            onChange={(e) => {
                                                const updatedOptions = newQuestion.options.map((opt, i) => ({
                                                    ...opt,
                                                    isCorrect: i === idx ? e.target.checked : false, // Only one correct option
                                                }));
                                                setNewQuestion((prev) => ({
                                                    ...prev,
                                                    options: updatedOptions,
                                                }));
                                            }}
                                            className="w-5 h-5"
                                        />
                                    </div>
                                ))}

                                <button
                                    onClick={() =>
                                        setNewQuestion((prev) => ({
                                            ...prev,
                                            options: [...prev.options, { optionText: "", isCorrect: false }],
                                        }))
                                    }
                                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 active:scale-95 mr-2 transition-transform duration-200 mb-3"
                                >
                                    Add Option
                                </button>

                                <button
                                    onClick={handleAddQuestion}
                                    className="mt-3 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 active:scale-95 transition-transform duration-200"
                                >
                                    Add Question
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-lg text-gray-800">No quiz added yet. Click "Add Quiz" to create one.</p>
                )}
            </div>





        </div>
    );

}


// Utility function to convert seconds to HH:MM:SS format
const convertDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
};

export { AdminCourseDetails };
