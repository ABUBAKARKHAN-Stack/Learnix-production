import React from "react";
import { PurchasedCourses } from "../Data/PurchaseCourse";
import { FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const DashboardCourses = () => {

  const navigate = useNavigate();


  const handleDetailsClick = (courseId) => {
    navigate(`/your-courses/course/${courseId}`);
  };

  const handleBrowse = () => {
    navigate('/courses')
  }

  return (
    <div className="w-full mx-auto px-4">
      {PurchasedCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[400px]">
          <FaExclamationCircle className="text-red-500 text-6xl mb-4" />
          <h1 className="text-2xl text-center font-semibold text-gray-700">
            You don't have purchased courses
          </h1>
          <button onClick={handleBrowse} className="bg-black p-2 px-4 text-white rounded-3xl mt-10">
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="relative grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
          {PurchasedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 w-[300px] md:w-[270px] md:h-[400px] lg:w-[270px] xl:w-[240px] h-[400px] mx-auto"
            >
              {/* Course Icon */}
              <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 w-full h-1/3">
                <div className="text-5xl text-white">
                  {React.createElement(course.icon)} {/* Render the icon dynamically */}
                </div>
              </div>

              {/* Course Details */}
              <div className="p-5 h-2/3 flex flex-col justify-between">
                <div>
                  {/* Course Name */}
                  <h3 className="text-lg font-bold text-gray-800">{course.name}</h3>
                  {/* Course Category */}
                  <p className="text-sm text-gray-600 mt-2">{course.category}</p>
                  {/* Course Rating and People */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center text-yellow-500 text-base">
                      <span className="mr-1">{course.rating}</span>
                      <span>⭐</span>
                    </div>
                    <div className="text-sm text-gray-600">{course.joinPersons} students</div>
                  </div>
                </div>
                {/* Details Button */}
                <button onClick={() => handleDetailsClick(course.id)} className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg">
                  {course.details}
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
