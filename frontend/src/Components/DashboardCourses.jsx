import React, { useState,useEffect } from "react";
import { PurchasedCourses } from "../Data/PurchaseCourse";
import { FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { getPurchasedCourses } from "../API/mainFetching";

const DashboardCourses = () => {

  const [teacher , setTeacher] = useState(true)
  const navigate = useNavigate();
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  // Fetch purchased courses
  useEffect(() => {
    (async () => {
      try {
        const res = await getPurchasedCourses();
        const courses = res.data.data || [];
        setPurchasedCourses(courses);
      } catch (error) {
        console.error("Error fetching purchased courses:", error);
      }
    })();
  }, []);

  console.log(purchasedCourses);

  // Handle "View Details" button click
  const handleDetailsClick = (courseId) => {
    navigate(`/your-courses/course/${courseId}`);
  };

  // Handle "Browse Courses" button click
  const handleBrowse = () => {
    navigate("/courses");
  };

  return (
    <div className="w-full mx-auto px-4">
      {
        teacher ? <>
        <div className="flex justify-end shadow-xl rounded-xl bg-white p-2 border-b-0"><button className="p-3 bg-black rounded-lg text-white">Create Course</button>         </div>

        <div>
          {PurchasedCourses.length === 0 ?  (
          <div className="flex flex-col items-center justify-center h-[400px]">
            <h1 className="text-2xl text-center font-semibold text-gray-700">
              You have not created any course
            </h1>
          </div>
        ) : (
          <div className="relative  overflow-hidden grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:flex xl:flex-col gap-8 mt-8">
            {PurchasedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 xl:hover:scale-100 transition-all duration-300 w-[300px] md:w-[270px] md:h-[400px] xl:flex xl:h-auto xl:w-full lg:w-[250px]  h-[400px] mx-auto"
              >
                {/* Course Icon */}
                <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 xl:w-[200px] xl:h-auto w-full h-1/3">
                  <div className="text-5xl text-white">
                    {React.createElement(course.icon)} {/* Render the icon dynamically */}
                  </div>
                </div>
  
                {/* Course Details */}
                <div className="p-5 h-2/3 flex xl:flex-row xl:justify-between xl:w-full flex-col justify-between">
                  <div className="xl:flex">
                    <div className="xl:flex xl:flex-col">
                      {/* Course Name */}
                    <h3 className="text-lg font-bold text-gray-800">{course.name}</h3>
                    {/* Course Category */}
                    <p className="text-sm text-gray-600 mt-2">{course.category}</p>
                    {/* Course Rating and People */}
                    </div>
                    <div className="flex xl:flex-col xl:items-start xl:mt-0 xl:ml-5 xl:justify-normal items-center justify-between mt-4">
                      <div className="flex items-center text-yellow-500 text-base">
                        <span className="mr-1">{course.rating}</span>
                        <span>⭐</span>
                      </div>
                      <div className="text-sm text-gray-600">{course.joinPersons} students</div>
                    </div>
                  </div>
                  {/* Details Button */}
                  <button onClick={() => handleDetailsClick(course.id)} className="w-full xl:w-[120px] mt-4 xl:mt-0 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg">
                    {course.details}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
        
        </> : <>  {PurchasedCourses.length === 0 ? (
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
          <div className="relative  overflow-hidden grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
            {PurchasedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 w-[300px] md:w-[270px] md:h-[400px] lg:w-[250px] xl:w-[240px] h-[400px] mx-auto"
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
        )}</>
      }
      
    </div>
  );
};

export default DashboardCourses;
