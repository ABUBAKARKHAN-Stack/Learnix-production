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
    const filledStars = Math.floor(rating); // The number of filled stars
    const emptyStars = 5 - filledStars; // The number of empty stars
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
    <div className="flex flex-col items-center space-y-8 p-6 bg-gray-50 w-[950px] ml-[15vh]">
      {/* Header Section */}
      <h1 className="font-bold text-gray-800 text-[58px] text-left w-[98%] leading-[77px]">
        Empower Your Future <br /> with Our Expert-Led  Courses!
      </h1>
      <div className="w-[920px]">
        {/* Pass the onGetNow function to DashboardCourses */}
        <DashboardCourses courses={filteredCourses} onGetNow={onGetNow} />
      </div>
    </div>
  );
};

export default DashboardMain;
