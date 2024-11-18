import React, { useState } from "react";
import { FaRegStar, FaShoppingCart } from "react-icons/fa";
import {
  HiOutlineCode,
  HiOutlineDesktopComputer,
  HiOutlineLightBulb,
  HiOutlineCloud,
} from "react-icons/hi";
import { AiOutlineBulb } from "react-icons/ai";

const DashboardCourses = ({ courses, onGetNow }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-wrap justify-around mb-4 -mt-6 gap-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`h-[50px] text-[14px] w-fit gap-[14px] rounded-[20px] justify-between flex items-center pr-6 ${
              selectedCategory === category.name
                ? "bg-black text-white"
                : "bg-[#F3EBE5] text-black hover:bg-[#ffe6d3] hover:text-black"
            }`}
            onClick={() => setSelectedCategory(category.name)}>
            {category.icon}
            <span className="text-[14px] font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Courses List */}
      <div className="flex flex-wrap gap-4 h-[453px] rounded-3xl justify-center overflow-y-scroll  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="w-72 h-[210px] bg-[#F3EBE5] shadow-lg rounded-lg p-4 flex flex-col justify-between overys">
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
                <p className="text-[12px] font-semibold text-gray-900">
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
              <h3 className="text-2xl font-semibold text-gray-900">
                {course.name}
              </h3>
            </div>

            {/* Students and Button */}
            <div className="flex justify-between items-center">
              <p className="text-[12px] font-semibold text-gray-900">
                {course.joinPersons} students
              </p>
              <button
                onClick={() => {
                  console.log("Course clicked in DashboardCourses:", course); // Debug log for button click
                  onGetNow(course); // Ensure onGetNow is passed correctly
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black border border-gray-300 rounded-full hover:bg-gray-100">
                <FaShoppingCart className="text-sm" />
                <span className="text-sm font-semibold">Get Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCourses;
