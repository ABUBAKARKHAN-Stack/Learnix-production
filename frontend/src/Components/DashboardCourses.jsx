import React, { useState } from "react";
import { FaRegStar, FaShoppingCart } from "react-icons/fa";
import {
  HiOutlineCode,
  HiOutlineDesktopComputer,
  HiOutlineCloud,
} from "react-icons/hi";
import { AiOutlineBulb } from "react-icons/ai";

const DashboardCourses = ({ courses, onGetNow }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    { name: "All", icon: <HiOutlineCode className="text-xl ml-2" /> },
    { name: "Programming", icon: <HiOutlineCode className="text-xl ml-2" /> },
    {
      name: "Web Development",
      icon: <HiOutlineDesktopComputer className="text-xl ml-2" />,
    },
    {
      name: "Artificial Intelligence",
      icon: <AiOutlineBulb className="text-xl ml-2" />,
    },
    {
      name: "Cloud Computing",
      icon: <HiOutlineCloud className="text-xl ml-2" />,
    },
  ];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <div className="space-y-6 w-full mx-auto p-4">
      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`h-12 text-sm px-4 gap-2 rounded-full flex items-center transition-all duration-300 ${
              selectedCategory === category.name
                ? "bg-black text-white"
                : "bg-[#F3EBE5] text-black hover:bg-[#ffe6d3]"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.icon}
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Courses List */}
      <div className="flex flex-wrap justify-center gap-4 overflow-y-scroll max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {filteredCourses.length === 0 ? (
          <p className="text-lg font-semibold text-gray-700">No courses available.</p>
        ) : (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="w-[280px] md:w-[240px] lg:w-[220px] h-[220px] bg-[#F3EBE5] shadow-lg rounded-lg p-4 flex flex-col justify-between transition-transform duration-300 hover:scale-105"
            >
              {/* Course Info */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="flex justify-center items-center w-9 h-9 bg-white rounded-full">
                    <div className="text-xl text-gray-700">
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
                  <p className="text-sm font-semibold text-gray-900">{course.category}</p>
                </div>
                <div className="flex items-center px-2 py-1 bg-white rounded-full border border-gray-300">
                  <FaRegStar className="text-gray-700 text-sm" />
                  <span className="ml-1 text-sm font-semibold text-gray-700">
                    {course.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Course Name */}
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                {course.name}
              </h3>

              {/* Students and Button */}
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-900">
                  {course.joinPersons} students
                </p>
                <button
                  onClick={() => onGetNow(course)}
                  className="flex items-center gap-2 px-3 py-1 bg-white text-black border border-gray-300 rounded-full hover:bg-gray-100"
                >
                  <FaShoppingCart className="text-sm" />
                  <span className="text-sm font-semibold">Get Now</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardCourses;
