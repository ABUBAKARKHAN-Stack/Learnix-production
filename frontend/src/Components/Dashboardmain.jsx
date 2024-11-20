import React, { useState } from "react";
import {
  FaLaptopCode,
  FaCode,
  FaPaintBrush,
  FaChartLine,
  FaBullhorn,
  FaBrain,
  FaWallet,
  FaLock,
  FaCloud,
  FaStar,
  FaRegStar,
} from "react-icons/fa"; // Importing icons
import DashboardCourses from "./DashboardCourses";

const DashboardMain = ({ courses, onGetNow }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Define categories for filtering
  const categories = [
    "All",
    "Web Development",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
  ];

  // Map course categories to corresponding icons
  const categoryIcons = {
    Programming: <FaCode />,
    "Web Development": <FaLaptopCode />,
    Design: <FaPaintBrush />,
    "Data Science": <FaChartLine />,
    Marketing: <FaBullhorn />,
    "Artificial Intelligence": <FaBrain />,
    Finance: <FaWallet />,
    Cybersecurity: <FaLock />,
    "Cloud Computing": <FaCloud />,
  };

  // Filter courses based on the selected category
  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  // Function to render the stars based on rating
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;
    const stars = [];

    // Add filled stars
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={`filled-${i}`} className="text-yellow-400" />);
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4 bg-gray-50 w-full max-w-[1100px] mx-auto">
      {/* Header Section */}
      <h1 className="font-bold text-gray-800 text-3xl sm:text-4xl md:text-5xl lg:text-[58px] text-center md:text-left leading-tight md:leading-[77px]">
        Empower Your Future <br className="hidden md:block" /> with Our Expert-Led Courses!
      </h1>

      {/* Category Selection */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`h-12 text-sm px-4 gap-2 rounded-full flex items-center transition-all duration-300 ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-[#F3EBE5] text-black hover:bg-[#ffe6d3]"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {categoryIcons[category] || <FaCode />} {/* Default icon if no specific one is mapped */}
            <span>{category}</span>
          </button>
        ))}
      </div>

      {/* Display Filtered Courses */}
      <div className="w-full mt-6">
        {/* Pass the onGetNow function to DashboardCourses */}
        <DashboardCourses courses={filteredCourses} onGetNow={onGetNow} />
      </div>
    </div>
  );
};

export default DashboardMain;
