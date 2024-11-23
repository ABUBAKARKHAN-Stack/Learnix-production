import React, { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getPurchasedCourses } from "../API/mainFetching";

const DashboardCourses = () => {
  const navigate = useNavigate();
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  // Fetch purchased courses
  useEffect(() => {
    (async () => {
      try {
        const res = await getPurchasedCourses();
        const courses = res.data.data || [];
        setPurchasedCourses(courses);
      } catch (error) {
        console.error("Error fetching purchased courses:", error);
      }
    })();
  }, []);

  // Handle "View Details" button click
  const handleDetailsClick = (courseId) => {
    navigate(`/your-courses/course/${courseId}`);
  };

  // Handle "Browse Courses" button click
  const handleBrowse = () => {
    navigate("/courses");
  };

  return (
    <div className="w-full mx-auto px-4 pt-8">
      {/* Empty State */}
      {purchasedCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[400px]">
          <FaExclamationCircle className="text-red-500 text-6xl mb-4" />
          <h1 className="text-2xl text-center font-semibold text-gray-700">
            You don’t have any purchased courses.
          </h1>
          <button
            onClick={handleBrowse}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full shadow-lg transition-all duration-300"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {purchasedCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300 mx-auto max-w-xs"
            >
              {/* Course Thumbnail */}
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
                  Rs {course.price}
                </div>
              </div>

              {/* Course Details */}
              <div className="p-6 flex flex-col justify-between h-full">
                <h3 className="text-lg font-bold text-gray-800 truncate">
                  {course.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {course.description}
                </p>

                {/* Rating and Enrolled Students */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center text-yellow-500 text-base">
                    <span className="mr-1">{course.rating || 4.5}</span>
                    <span>⭐</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {course.enrolled || 0} students
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => handleDetailsClick(course._id)}
                  className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-medium py-2 rounded-lg transition-transform duration-300 hover:scale-105 shadow-md"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardCourses;
