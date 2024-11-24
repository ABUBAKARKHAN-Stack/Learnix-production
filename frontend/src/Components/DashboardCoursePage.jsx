import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlayCircle, FaPauseCircle, FaCheckCircle } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import { TiTimesOutline } from "react-icons/ti";
import { getPurchaseCourseById } from "../API/mainFetching";

const DashboardCoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null); // Store the currently active (playing) video
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(29);


  // Fetch course data on load
  useEffect(() => {
    (async () => {
      try {
        const res = await getPurchaseCourseById(id);
        const fetchedCourse = res.data.data;
        setCourse(fetchedCourse);

        // Set the first video as active by default
        if (fetchedCourse?.videos?.length > 0) {
          setActiveVideo(null); // No video playing initially
        }
      } catch (error) {
        console.log("Error fetching course:", error);
      }
    })();
  }, [id]);


  const handleVideoClick = (video) => {
    setActiveVideo(video); // Set the clicked video as the active video
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setActiveVideo(null); // Reset active video when the modal closes
  };

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

  const courseKeyPoints = Object.values(keyPointsMapping).map((point) =>
    point.replace("{Course Name}", course?.name)
  );

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F3EBE5]">
        <p className="text-2xl font-semibold text-gray-600">Loading course details...</p>
      </div>
    );
  }

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
          <div className="flex flex-col w-full">
            <h1 className="text-4xl font-bold text-gray-900">{course?.name}</h1>

            {/* Course Thumbnail */}
            <div className="rounded-lg mt-6 overflow-hidden shadow-lg">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-[320px] object-cover rounded-lg"
              />
            </div>

            {/* Course Description */}
            <div className="bg-white p-6 rounded-lg mt-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Course Description</h3>
              <p className="text-gray-600 mt-4 leading-relaxed">{course.description}</p>
            </div>

            {/* Who This Course Is For */}
            <div className="bg-white p-6 rounded-lg mt-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Who This Course Is For</h3>
              <p className="text-gray-600 mt-4 leading-relaxed">
                {`This course is designed for beginners eager to explore the fundamentals of web development or experienced developers looking to deepen their knowledge.`}
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white p-6 rounded-lg mt-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">What You'll Learn</h3>
              <ol className="space-y-4 list-decimal  mt-4 text-gray-600 pl-6">
                {courseKeyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    {point}
                  </li>
                ))}
              </ol>
            </div>

          </div>

          {/* Right Section */}
          <div className="md:w-4/5 mt-16 flex flex-col gap-6">
            {/* Course Progress */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">Your Course Progress</h3>
              <div className="relative bg-gray-200 rounded-full h-6 mt-4">
                <div
                  className="absolute bg-blue-500 h-full rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{progress}% completed</p>
            </div>

            {/* Video List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">All Course Videos</h3>
              <div className="space-y-4">
                {
                  course?.videos.length > 0 ? (
                    <>
                      {course.videos?.map((video) => (
                        <div
                          key={video._id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${activeVideo?._id === video._id ? "bg-blue-100" : "bg-white"
                            }`}
                          onClick={() => handleVideoClick(video)}
                        >
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-300">
                            {activeVideo?._id === video._id ? (
                              <FaPauseCircle className="text-blue-500" size={24} />
                            ) : (
                              <FaPlayCircle className="text-blue-500" size={24} />
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
                    </>
                  ) : (
                    <p className="text-gray-600">No videos available for this course.</p>
                  )
                }
              </div>
            </div>

            {/* Video Modal */}
            {isModalOpen && activeVideo && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-[90%] h-fit max-w-3xl lg:max-w-5xl relative shadow-lg">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-800 hover:text-gray-900"
                    title="Close"
                  >
                    <TiTimesOutline size={30} />
                  </button>

                  {/* Video Player */}
                  <iframe
                    src={activeVideo.videoUrl}
                    title={`Video: ${activeVideo.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="mt-4 w-full h-[400px] rounded-lg"
                  ></iframe>

                  {/* Video Title */}
                  <h4 className="text-xl font-bold text-gray-800 mt-6 text-center">
                    {activeVideo.title}
                  </h4>

                  {/* Video Description */}
                  <p className="text-md text-gray-600 mt-4 text-center leading-relaxed">
                    {activeVideo.description || "No description available for this video."}
                  </p>
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
