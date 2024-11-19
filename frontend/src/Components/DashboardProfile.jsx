import React, { useRef, useEffect } from "react";
import {
  FaBell,
  FaCog,
  FaBook,
  FaUserCircle,
  FaTimes,
  FaPlus,
  FaRegStar,
} from "react-icons/fa";
import {
  HiOutlineCode,
  HiOutlineDesktopComputer,
  HiOutlineCloud,
} from "react-icons/hi";
import { AiOutlineBulb } from "react-icons/ai";
import Chart from "chart.js/auto";

const DashboardProfile = ({ userProfileCourses, onCancelCourse }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
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

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div
      className="bg-[#F3EBE5] w-full max-w-[600px] md:max-w-[450px] h-full md:h-[95vh] p-4 space-y-6 rounded-[15px] mx-auto">
      {/* Header Section */}
      <div className="bg-white p-2 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center items-center">
          {/* Notifications and Settings */}
          <div className="flex justify-between w-full px-2 py-1">
            <FaBell className="text-gray-600 text-xl cursor-pointer hover:text-gray-800" />
            <FaCog className="text-gray-600 text-xl cursor-pointer hover:text-gray-800" />
          </div>
          {/* User Avatar */}
          <div className="flex flex-col items-center -mt-4">
            <FaUserCircle className="text-5xl text-gray-400" />
            <span className="text-gray-800 text-lg font-semibold">John Doe</span>
          </div>
          {/* Assignments */}
          <div className="flex items-center justify-between w-full bg-black rounded-[15px] h-[40px] mt-2 px-4 text-white">
            <FaBook className="text-white text-2xl" />
            <span className="text-white text-sm font-semibold">Assignments</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">3</span>
              <span className="text-sm">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white p-2 rounded-lg shadow-lg h-[240px]">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Weekly Activity</h3>
        <canvas ref={canvasRef}></canvas>
      </div>

      {/* User Added Courses */}
      <div className="h-[250px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <div className="flex flex-col gap-4">
          {userProfileCourses.length === 0 ? (
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-center items-center">
              <FaPlus className="text-4xl text-gray-700 mb-4" />
              <p className="text-lg font-semibold text-gray-900">Unlock Your Next Skill!</p>
            </div>
          ) : (
            userProfileCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
                {/* Course Info */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="flex justify-center items-center w-9 h-9 bg-[#F3EBE5] rounded-full">
                      <div className="text-2xl text-gray-700">
                        {course.category === "Programming" && <HiOutlineCode />}
                        {course.category === "Web Development" && <HiOutlineDesktopComputer />}
                        {course.category === "Artificial Intelligence" && <AiOutlineBulb />}
                        {course.category === "Cloud Computing" && <HiOutlineCloud />}
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{course.category}</p>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#F3EBE5] rounded-full">
                    <FaRegStar className="text-gray-700 text-sm" />
                    <span className="text-sm font-semibold">{course.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Course Name */}
                <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => onCancelCourse()}
                    className="flex items-center gap-2 px-4 py-1 bg-[#F3EBE5] rounded-full border border-gray-300 hover:bg-gray-100">
                    <span className="text-sm font-semibold">View Course</span>
                  </button>
                  <button
                    onClick={() => onCancelCourse(course)}
                    className="flex items-center gap-2 px-4 py-1 bg-[#F3EBE5] rounded-full border border-gray-300 hover:bg-gray-100">
                    <FaTimes className="text-sm" />
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
