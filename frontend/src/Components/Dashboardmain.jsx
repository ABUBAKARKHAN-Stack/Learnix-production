import React from "react";
import DashboardCourses from "./DashboardCourses";

const DashboardMain = () => {


  return (
    <div className="flex flex-col  w-full lg:pt-5 lg:pl-5  overflow-hidden h-screen bg-[#F3EBE5] ">
      <h1 className="text-3xl sm:text-4xl md:text-5xl pl-5 mt-10 lg:text-6xl lg:leading-[77px] font-bold leading-tight text-gray-800">Your Courses</h1>
      {/* Display Filtered Courses */}
      <div className="w-full overflow-y-auto mt-0">
        <DashboardCourses />
      </div>
    </div>
  );
};

export default DashboardMain;
