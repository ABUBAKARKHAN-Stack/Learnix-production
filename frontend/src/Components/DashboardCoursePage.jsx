import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheckCircle, FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";

const dummyVideos = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React and how it works...",
    length: "10:23",
    author: "John Doe",
    thumbnail: "https://via.placeholder.com/150",
    authorImage: "https://via.placeholder.com/50",
    role: "Frontend Developer",
  },
  {
    id: 2,
    title: "State and Props",
    description: "Learn the basics of React and how it works...",
    length: "15:45",
    author: "Jane Smith",
    thumbnail: "https://via.placeholder.com/150",
    authorImage: "https://via.placeholder.com/50",
    role: "React Specialist",
  },
  {
    id: 3,
    title: "React Hooks",
    description: "Learn the basics of React and how it works...",
    length: "20:12",
    author: "Emily Johnson",
    thumbnail: "https://via.placeholder.com/150",
    authorImage: "https://via.placeholder.com/50",
    role: "Senior Developer",
  },
];

const DashboardCoursePage = ({ courses }) => {
  const { id } = useParams();
  const course = courses.find((course) => course.id === parseInt(id));
  const [activeVideo, setActiveVideo] = useState(dummyVideos[0]);
  const [progress, setProgress] = useState(50); // Example progress

  if (!course) {
    return <div>Course not found</div>;
  }

  const courseKeyPoints = [
    "React Basics and Fundamentals",
    "State Management and Props",
    "Advanced React Hooks",
    "Building Real-World Projects",
    "Performance Optimization",
  ];

  const getCirclePosition = (achievement) => (achievement / 100) * 100;

  return (
    <div className="bg-[#F3EBE5] font-sans flex flex-row w-screen h-screen">
      <div className="ml-[25px] mt-[39px]  ">
        <Sidebar />
      </div>

      <div className="p-4 md:p-4 ss:overscroll-auto md:overflow-x-hidden flex-1 ">
        <div className="flex flex-col md:flex-row gap-6 overflow-hidden">
          {/* Left Section */}
          <div className="flex flex-col md:w-[50%] mid:w-2/3 overflow-hidden">
            <div className="ss:text-2xl md:text-3xl font-bold text-gray-800">
              {course.name}
            </div>

            <div className="rounded-[15px] mt-4 overflow-hidden">
              <div className="flex items-center">
                <img
                  src={activeVideo.thumbnail}
                  alt={activeVideo.title}
                  className="md:w-full md:h-[320px] rounded-[15px] object-cover ss:w-[95%] ss:h-[250px]"
                />
              </div>
            </div>

            <div className="p-1 rounded-lg mt-2 w-fit h-fit ">
              <div className="flex items-center">
                <img
                  src={activeVideo.authorImage}
                  alt={activeVideo.author}
                  className="md:w-12 md:h-12 ss:h-10 ss:w-10 rounded-full object-cover md:mr-6 ss:mr-3"
                />
                <div>
                  <h4 className="ss:text-base md:text-lg font-semibold text-gray-800">
                    {activeVideo.author}
                  </h4>
                  <p className="ss:text-xs md:text-sm text-gray-600">
                    {activeVideo.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-1 bg-white rounded-[15px] mt-2 overflow-hidden">
              <h3 className="ss:text-base ss:text-black md:text-lg font-semibold text-gray-800">
                Description
              </h3>
              <p className="ss:text-sm md:text-sm text-gray-600 mt-2">
                {activeVideo.description}
              </p>
            </div>

            <div className="p-1 rounded-[15px] mt-2 overflow-hidden bg-white">
              <h3 className="ss:text-base md:text-lg font-semibold text-gray-800">
                Who This Course is For
              </h3>
              <p className="ss:text-sm md:text-sm text-gray-600 mt-2">
                This course is suitable for beginners who want to dive into
                React or developers looking to deepen their skills.
              </p>
            </div>

            <div className="p-1 bg-white rounded-lg mt-2 overflow-hidden">
              <h3 className="ss:text-base md:text-lg font-semibold text-gray-800">
                What You'll Learn
              </h3>
              <ul className="list-none space-y-2 text-gray-600 mt-2">
                {courseKeyPoints.map((point, index) => (
                  <li key={index} className="text-sm flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:w-[40%] mid:w-1/3 flex flex-col space-y-6 mt-2 overflow-hidden">
            <div className="ss:p-2 md:p-4 bg-white rounded-[20px] flex flex-col items-center">
              <h3 className="ss:text-base md:text-lg font-semibold text-gray-800 mt-1 ss:px-1 md:p-2 self-start">
                Your Course Progress
              </h3>
              <div className="w-[90%]">
                <div className="relative bg-[#F3EBE5]  rounded-lg h-6 mt-5">
                  <div
                    className="absolute bg-black h-full rounded-lg"
                    style={{ width: `${progress}%` }}></div>
                  {[0, 25, 50, 75, 100].map((achievement) => (
                    <div
                      key={achievement}
                      className="absolute bg-[#F3EBE5] rounded-full w-6 h-6 border-2 border-gray-600"
                      style={{
                        left: `${getCirclePosition(achievement)}%`,
                        top: "0px",
                        transform: "translateX(-50%)",
                      }}></div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="bg-[#F3EBE5] p-2 rounded-[15px] mt-2 w-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Remarks
                </h3>
                <p className="text-sm text-gray-600">
                  Keep up the great work! You're making progress on your journey
                  to mastering React.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg overflow-hidden">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                All Course Videos
              </h3>
              <div className="space-y-4">
                {dummyVideos.map((video) => (
                  <div
                    key={video.id}
                    className={`flex items-center p-4 border rounded-lg transition cursor-pointer ${
                      activeVideo.id === video.id ? "bg-[#F3EBE5]" : "bg-white"
                    }`}
                    onClick={() => setActiveVideo(video)}>
                    <div
                      className={`flex items-center justify-center rounded-full w-12 h-12 ${
                        activeVideo.id === video.id
                          ? "bg-black text-[#F3EBE5]"
                          : "bg-gray-300 text-black"
                      }`}>
                      {activeVideo.id === video.id ? (
                        <FaPauseCircle />
                      ) : (
                        <FaPlayCircle />
                      )}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {video.title}
                      </h4>
                      <p className="text-sm text-gray-600">{video.length}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCoursePage;
