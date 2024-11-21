import React from "react";
import { PurchasedCourses } from "../Data/PurchaseCourse";
import { Link } from "react-router-dom";
import { FaExclamationCircle } from 'react-icons/fa';

const DashboardCourses = () => {

  return (
    <div className=" w-full mx-auto px-4">
    {
      PurchasedCourses.length ===0 ?<div className=" lg:w-[40vw] xl:w-[55vw]"> <div className="bg-[#dac9bc] mt-5 h-[270px] w-[240px] p-5 rounded-xl text-center"><h2 className="font-bold text-[20px] ">You have'nt purchase any course yet <FaExclamationCircle className="mx-auto" /> </h2>
      <p className="text-gray-500 my-3">Explore courses and enhance your learning</p>
      <Link to='/courses'><button className="bg-black hover:bg-white hover:text-black transition-all duration-500 text-white p-2 mt-2 rounded-3xl">Browse Courses</button></Link></div>
        
      </div> :
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
          {PurchasedCourses.map((course, index) => (
            <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
              
              {/* Course Icon */}
              <div className="flex justify-center mt-4">
                <div className="text-4xl text-gray-600">
                  {React.createElement(course.icon)}  {/* Render the icon dynamically */}
                </div>
              </div>

              {/* Course Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                <p className="text-sm text-gray-600">{course.category}</p>
                <div className="flex items-center gap-5 mt-2">
                  {/* Rating */}
                  <div className="flex items-center text-yellow-500">
                    <span className="mr-2">{course.rating}</span>
                    <span>⭐</span>
                  </div>
                  {/* Number of People */}
                  <div className="text-sm text-gray-600">{course.joinPersons} students</div>
                </div>
                {/* Buy Button */}
                <button className="bottom-0 relative mt-10 bg-blue-500 text-white py-2 px-4 rounded-full">{course.details}</button>
              </div>
            </div>
          ))}
        </div>
    }
      
    </div>
  );
};

export default DashboardCourses;
