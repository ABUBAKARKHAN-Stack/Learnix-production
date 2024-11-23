import React, { useState } from "react";
import DashboardCourses from "./DashboardCourses";
import { useNavigate } from "react-router-dom";

const DashboardMain = () => {
const [teacher,setTeacher]= useState(true)

const navigate = useNavigate()
const handleCreateCourse = ()=>{
  navigate('/create_course')
}

  return (
    <div className="flex flex-col  w-full lg:pt-5 lg:pl-5  overflow-hidden h-screen bg-[#F3EBE5]  ">
     {
      teacher ?  <div className="flex mx-10 md:mt-10 justify-end shadow-xl rounded-xl bg-white p-2 border-b-0"><button onClick={handleCreateCourse} className="p-3 bg-black rounded-lg text-white">Create Course</button>         </div>
      :<h1 className="text-3xl sm:text-4xl md:text-5xl pl-5 mt-10 lg:text-6xl lg:leading-[77px] font-bold leading-tight text-gray-800">Your Courses</h1>
     } 


      {/* Display Filtered Courses */}
      <div className="w-full overflow-y-auto mt-0">
        <DashboardCourses />
      </div>
    </div>
  );
};

export default DashboardMain;
