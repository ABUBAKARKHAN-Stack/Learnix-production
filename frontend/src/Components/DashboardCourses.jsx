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

  console.log(purchasedCourses);

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
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {purchasedCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-md h-fit transform hover:scale-105 hover:shadow-xl transition-all duration-300 mx-auto max-w-xs"
            >
      
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-40 object-cover"
                />
                
              {/* Course Details */}
              <div className="py-6 px-4 flex flex-col justify-between">
                <h3 className="text-lg font-bold text-gray-800 truncate">
                  {course.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {course.description}
                </p>

                {/* View Details Button */}
                <button
                  onClick={() => handleDetailsClick(course._id)}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg transition-all duration-300"
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
