import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheckCircle, FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import { getPurchaseCourseById } from "../API/mainFetching";

const DashboardCoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(29);

  const keyPointsMapping = {
    "Comprehensive Understanding":
      "Gain a solid foundation and in-depth knowledge of {Course Name} principles, techniques, and applications.",
    "Hands-On Skills":
      "Develop practical skills and real-world experience in {Course Name} through engaging exercises and projects.",
    "Master Key Tools and Technologies":
      "Learn how to effectively use industry-standard tools and technologies relevant to {Course Name}.",
    "Problem-Solving and Critical Thinking":
      "Enhance your problem-solving abilities and critical thinking skills within the context of {Course Name}.",
    "Best Practices and Advanced Techniques":
      "Explore best practices, advanced strategies, and tips to excel in {Course Name}.",
    "Prepare for Real-World Application":
      "Get ready to apply what you've learned in {Course Name} to real-life scenarios and professional environments.",
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getPurchaseCourseById(id);
        const fetchedCourse = res.data.data;
        setCourse(fetchedCourse);

        if (fetchedCourse?.videos?.length > 0) {
          setActiveVideo(fetchedCourse.videos[0]);
        }
      } catch (error) {
        console.log("Error fetching course:", error);
      }
    })();
  }, [id]);

  const handleVideoClick = (video) => {
    setActiveVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F3EBE5]">
        <p className="text-2xl font-semibold text-gray-600">Loading course details...</p>
      </div>
    );
  }

  const courseKeyPoints = Object.values(keyPointsMapping).map((point) =>
    point.replace("{Course Name}", course.name)
  );

  return (
    <div className="bg-[#F3EBE5] font-sans flex flex-row w-full min-h-screen">
      {/* Sidebar */}
      <div className="ml-[25px] mt-[39px]">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="p-4 flex-1">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section */}
          <div className="flex flex-col md:w-[50%] overflow-hidden">
            <h1 className="text-3xl font-bold text-gray-800">{course.name}</h1>

            {/* Course Thumbnail */}
            <div className="rounded-lg mt-6 overflow-hidden">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-[300px] object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Course Description */}
            <div className="bg-white p-4 rounded-lg mt-4 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">Course Description</h3>
              <p className="text-gray-600 mt-2">{course.description}</p>
            </div>

            {/* Who This Course Is For */}
            <div className="bg-white p-4 rounded-lg mt-4 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">Who This Course Is For</h3>
              <p className="text-gray-600 mt-2">
                {`This course is designed for beginners eager to explore the fundamentals of ${course.name} or experienced developers seeking to enhance their skills and deepen their understanding.`}
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white p-4 rounded-lg mt-4 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">What You'll Learn</h3>
              <ul className="list-none space-y-2 mt-2 text-gray-600">
                {courseKeyPoints.map((point, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:w-[40%] flex flex-col gap-6">
            {/* Course Progress */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">Your Course Progress</h3>
              <div className="relative bg-[#F3EBE5] rounded-lg h-6 mt-4">
                <div
                  className="absolute bg-blue-500 h-full rounded-lg"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Video List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">All Course Videos</h3>
              <div className="space-y-4">
                {course.videos?.map((video) => (
                  <div
                    key={video._id}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                      activeVideo?._id === video._id ? "bg-[#F3EBE5]" : "bg-white"
                    }`}
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300">
                      {activeVideo?._id === video._id ? (
                        <FaPauseCircle className="text-blue-500" />
                      ) : (
                        <FaPlayCircle className="text-blue-500" />
                      )}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-800">{video.title}</h4>
                      <p className="text-sm text-gray-600">
                        {activeVideo?._id === video._id ? "Playing" : "Play Video"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Modal */}
            {isModalOpen && activeVideo && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-[90%] max-w-2xl relative">
                  <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
                  >
                    ✕
                  </button>
                  <video
                    controls
                    src={activeVideo.videoUrl}
                    className="w-full rounded-lg"
                    style={{ maxHeight: "400px" }}
                  />
                  <h4 className="text-lg font-semibold text-gray-800 mt-4">{activeVideo.title}</h4>
                  <p className="text-sm text-gray-600">{activeVideo.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCoursePage;
