import React, { useEffect, useState } from 'react';
import { getPurchasedCourses } from '../API/mainFetching';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

function QuizCards() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await getPurchasedCourses();
                setCourses(res.data.data) // Assuming res.data contains the courses
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    const handleStartQuiz = (quizId) => {
        navigate(`/courses/quiz/${quizId}`); // Navigate to quiz page with quiz ID
    };

    return (
        <div className='bg-[#F3EBE5] px-5 w-full h-screen'>
            <Sidebar />
            <div className="grid ml-16 pt-16  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {courses?.map((course) => (
                    <div key={course._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            src={course.image}
                            alt={course.name}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">{course.name}</h3>
                            <p className="text-gray-600 text-sm line-clamp-4 mt-2">{course.description}</p>
                            {course.quiz && course.quiz.length > 0 ? (
                                <button
                                    onClick={() => handleStartQuiz(course.quiz[0]._id)}
                                    className="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
                                >
                                    Start Quiz
                                </button>
                            ) : (
                                <p className="text-gray-500 text-sm mt-4">No quiz available for this course.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuizCards;
