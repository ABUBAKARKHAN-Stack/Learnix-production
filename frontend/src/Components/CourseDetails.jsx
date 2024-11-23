import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourseById, purchaseCourse } from "../API/mainFetching";

function CourseDetail({ id }) {
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch course details by ID
    useEffect(() => {
        (async () => {
            try {
                const res = await getCourseById(id);
                console.log(res.data);
                setCourse(res.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching course:", error);
                setLoading(false);
            }
        })();
    }, [id]);

    const handlePurchase = async () => {
        try {
            await purchaseCourse(id);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error purchasing course:", error);
        }
    }

    if (loading) {
        // Loading state
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#F3EBE5]">
                <p className="text-xl text-gray-500 animate-pulse">Loading course details...</p>
            </div>
        );
    }

    if (!course) {
        // Error state: Course not found
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#F3EBE5]">
                <p className="text-xl text-red-500">Course not found.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center py-20 px-4 sm:px-6 md:px-10 lg:px-20 bg-[#F3EBE5] min-h-screen">
            {/* Course Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 text-center">
                {course.name}
            </h1>

            {/* Course Image */}
            <div className="w-full max-w-4xl">
                <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
                />
            </div>

            {/* Course Details Section */}
            <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 sm:p-8 mt-6">
                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
                    Course Details
                </h2>

                {/* Course Description */}
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                    {course.description}
                </p>

                {/* Course Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <p className="text-lg text-gray-800">
                        <span className="font-medium">Price:</span> Rs {course.price}
                    </p>
                    <p className="text-lg text-gray-800">
                        <span className="font-medium">Rating:</span> {course.rating || 4.5} ⭐
                    </p>
                    <p className="text-lg text-gray-800">
                        <span className="font-medium">Enrolled Students:</span> {course.enrollments.length}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    {/* Proceed to Checkout Button */}
                    <button
                        // onClick={() => navigate(`/checkout`, { state: { course } })}
                        onClick={handlePurchase}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-[1.025] shadow-md"
                    >
                        Proceed to Checkout
                    </button>

                    {/* Go Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 bg-black hover:bg-gray-950 text-white  font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-[1.025]  shadow-md"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export { CourseDetail };
