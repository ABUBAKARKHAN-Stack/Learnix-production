import React, { useState } from "react";
import { FaRegStar, FaSearch } from "react-icons/fa";
import {
  HiOutlineCode,
  HiOutlineDesktopComputer,
  HiOutlineCloud,
} from "react-icons/hi";
import { AiOutlineBulb } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const DashboardCourses = ({ courses, onViewCourse }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const categories = [
    { name: "All", icon: <HiOutlineCode className="text-2xl ml-2" /> },
    { name: "Programming", icon: <HiOutlineCode className="text-2xl ml-2" /> },
    {
      name: "Web Development",
      icon: <HiOutlineDesktopComputer className="text-2xl ml-2" />,
    },
    {
      name: "Artificial Intelligence",
      icon: <AiOutlineBulb className="text-2xl ml-2" />,
    },
    {
      name: "Cloud Computing",
      icon: <HiOutlineCloud className="text-2xl ml-2" />,
    },
  ];

  // Filter courses based on category and search term
  const filteredCourses = courses
    .filter(
      (course) =>
        selectedCategory === "All" || course.category === selectedCategory
    )
    .filter((course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Your Courses</h1>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex justify-center items-center group-hover:animate-spin-slow">
              <FaSearch className="text-white text-xl" />
            </div>
          </div>
          <input
            type="text"
            placeholder="Search for courses"
            className="w-full pl-16 pr-4 py-3 text-sm bg-gray-100 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white shadow-sm transition-all duration-300 ease-in-out"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 max-h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="w-[280px] h-[260px] p-4 bg-[#F3EBE5] shadow-lg rounded-lg flex flex-col justify-between">
              {/* Course Info */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="flex justify-center items-center w-9 h-9 bg-white rounded-full">
                    <div className="text-2xl text-gray-700">
                      {course.category === "Programming" && <HiOutlineCode />}
                      {course.category === "Web Development" && (
                        <HiOutlineDesktopComputer />
                      )}
                      {course.category === "Artificial Intelligence" && (
                        <AiOutlineBulb />
                      )}
                      {course.category === "Cloud Computing" && (
                        <HiOutlineCloud />
                      )}
                    </div>
                  </div>
                  <p className="text-[12px] sm:text-sm font-semibold text-gray-900">
                    {course.category}
                  </p>
                </div>
                <div className="flex items-center w-[60px] justify-between h-8 bg-white rounded-full border border-gray-300 px-2">
                  <FaRegStar className="text-gray-700 text-sm" />
                  <span className="ml-1 text-sm font-semibold text-gray-700">
                    {course.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Course Name */}
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {course.name}
                </h3>
              </div>

              {/* View Button */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => onViewCourse(course)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black border border-gray-300 rounded-full hover:bg-gray-100 text-xs sm:text-sm">
                  <span className="text-sm font-semibold">View Course</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex justify-center items-center">
            <div className="w-[315px] h-[260px] p-6 bg-[#F3EBE5] shadow-lg rounded-lg flex flex-col justify-center items-center text-center">
              <p className="text-lg font-medium text-gray-900">
                No courses found
              </p>
              <p className="text-sm text-gray-700 mb-4">
                Try searching or exploring other categories.
              </p>
              <button
                onClick={() => navigate("/courses")}
                className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800">
                Browse Courses
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCourses;
