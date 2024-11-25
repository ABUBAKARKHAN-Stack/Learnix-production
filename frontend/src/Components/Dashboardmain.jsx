import React, { useState } from "react";
import DashboardCourses from "./DashboardCourses";
import { useNavigate } from "react-router-dom";

const DashboardMain = ({ isAdmin }) => {

  const navigate = useNavigate()
  const handleCreateCourse = () => {
    navigate('/create-course')
  }

  return (

    <div className="flex flex-col  w-full lg:pt-5 lg:pl-5  overflow-hidden h-screen bg-[#F3EBE5]  ">
      {
        isAdmin ?
        <div className="mx-10 md:mt-10 shadow-xl bg-white rounded-xl p-4 border-b-0 flex justify-between items-center">
        {/* Text Section */}
        <h2 className="text-2xl font-bold text-gray-800">Your Courses</h2>
      
        {/* Button Section */}
        <button
          onClick={handleCreateCourse}
          className="p-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg rounded-lg shadow-md hover:from-purple-600 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Create Course
        </button>
      </div>
      
      
          : <h1 className="text-3xl sm:text-4xl md:text-5xl pl-5 mt-10 lg:text-6xl lg:leading-[77px] font-bold leading-tight text-gray-800">Your Courses</h1>
      }


      {/* Display Filtered Courses */}
      <div className="flex flex-col  w-full lg:pt-5 lg:pl-5  overflow-hidden h-screen bg-[#F3EBE5] ">

        <div className="w-full overflow-y-auto scrollbar-custom mt-0">
          <DashboardCourses isAdmin={isAdmin} />
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
