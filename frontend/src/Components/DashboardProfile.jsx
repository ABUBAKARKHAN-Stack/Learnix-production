import React, { useRef, useEffect } from "react";
import {
  FaBell,
  FaCog,
  FaBook,
  FaUserCircle,
  FaTimes,
  FaPlus,
  FaRegStar,
} from "react-icons/fa"; // Import relevant icons
import {
  HiOutlineCode,
  HiOutlineDesktopComputer,
  HiOutlineCloud,
} from "react-icons/hi"; // Import course category icons
import { AiOutlineBulb } from "react-icons/ai"; // AI course icon
import Chart from "chart.js/auto"; // Import chart.js for the chart

const DashboardProfile = ({ userProfileCourses, onCancelCourse }) => {
  const canvasRef = useRef(null); // Ref to canvas element
  const chartRef = useRef(null); // Ref to the Chart instance

  useEffect(() => {
    // Destroy the chart if it exists before creating a new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current?.getContext("2d"); // Ensure the canvas element exists
    if (ctx) {
      // Initialize chart
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Activity",
              data: [3, 3, 4, 5, 3, 6, 6],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 12,
            },
          },
        },
      });
    }

    // Cleanup on unmount or re-render to prevent memory leaks
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []); // Empty dependency array to run effect only once

  return (
    <div
      className="bg-[#F3EBE5] w-[450px] h-[95vh] p-4 space-y-6 md:mt-[4vh] rounded-[15px] mr-4 ss:mt-[12vh] ss:-ml-[2.5%] s450:ml-[3%] 
      ss:w-[400px] 
    s500:ml-[6%]
    s550:ml-[10%]
    s600:ml-[14%]
    s650:ml-[3%] md:ml-[5vh]
   ">
      {/* 1st Div: Header Section */}
      <div className="bg-white p-2 rounded-lg shadow-lg w-[100%] ">
        <div className="flex justify-between items-center flex-col">
          {/* Notifications and Settings */}

          <div className="flex flex-row  justify-between w-full px-2 py-1">
            <FaBell className="text-gray-600 text-xl cursor-pointer hover:text-gray-800" />
            <FaCog className="text-gray-600 text-xl cursor-pointer hover:text-gray-800" />
          </div>
          {/* User Avatar */}
          <div className="flex flex-col items-center -mt-[3vh]">
            <FaUserCircle className="text-5xl text-gray-400" />
            <span className="text-gray-800 text-lg font-semibold">
              John Doe
            </span>
          </div>
          {/* Books and Assignments */}
          <div className="flex items-center space-x-2 w-[100%] bg-black rounded-[15px] h-[40px] mt-2 px-2 text-white flex-row justify-between">
            <FaBook className="text-white text-2xl" />
            <span className="text-white text-sm ml-[172px]">
              Assignments
            </span>{" "}
            <div className="flex items-center flex-row justify-around gap-2 ">
              <span className="text-white text-sm font-semibold">3</span>

              <span className="text-white text-sm">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2nd Div: Activity Chart */}
      <div className="bg-white p-2 rounded-lg shadow-lg h-[240px] mt-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 -mt-2">
          Weekly Activity
        </h3>
        <canvas ref={canvasRef}></canvas>
      </div>

      {/* 3rd Div: User Added Courses */}
      {/* 3rd Div: User Added Courses */}
      <div className="h-[250px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <div className="flex flex-col gap-4">
          {userProfileCourses.length === 0 ? (
            <div className="w-[100%] h-[240px] bg-white shadow-lg rounded-lg p-4 flex flex-col justify-center items-center">
              <FaPlus className="text-4xl text-gray-700 mb-4" />
              <p className="text-lg font-semibold text-gray-900 text-center">
                Unlock Your Next Skill!
              </p>
            </div>
          ) : (
            userProfileCourses.map((course) => (
              <div
                key={course.id}
                className="w-[100%] h-[240px] bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
                {/* Course Info */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="flex justify-center items-center w-9 h-9 bg-[#F3EBE5] rounded-full">
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
                  <div className="flex items-center w-[60px] justify-between h-8 bg-[#F3EBE5] rounded-full border border-gray-300 px-2">
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

                {/* Students and Cancel Button */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => onCancelCourse()}
                    className="flex items-center gap-2 px-4 py-2 bg-[#F3EBE5] text-black border border-gray-300 rounded-full hover:bg-gray-100">
                    <span className="text-sm font-semibold">View Course</span>
                  </button>
                  <button
                    onClick={() => onCancelCourse(course)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#F3EBE5] text-black border border-gray-300 rounded-full hover:bg-gray-100">
                    <FaTimes className="text-sm" /> {/* 'X' icon for cancel */}
                    <span className="text-sm font-semibold">Cancel</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
