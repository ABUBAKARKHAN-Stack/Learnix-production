import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCourseById,
  getAllVideosOfACourse,
//   deleteVideo,
//   publishCourse,
} from "../API/mainFetching";

function AdminCourseDetails({ id }) {
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishLoading, setPublishLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null); // For video delete loading

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseRes = await getCourseById(id);
        const videoRes = await getAllVideosOfACourse(id);

        setCourse(courseRes.data.data);
        setVideos(Array.isArray(videoRes.data.data) ? videoRes.data.data : []); // Ensure array
      } catch (error) {
        console.error("Error fetching course or videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [id]);

  const handlePublish = async () => {
    // if (window.confirm("Are you sure you want to publish this course?")) {
    //   setPublishLoading(true);
    //   try {
    //     await publishCourse(id); // API call to publish the course
    //     alert("Course published successfully!");
    //     navigate("/admin/dashboard");
    //   } catch (error) {
    //     console.error("Error publishing course:", error);
    //     alert("Failed to publish the course. Please try again.");
    //   } finally {
    //     setPublishLoading(false);
    //   }
    // }
  };

  const handleDeleteVideo = async (videoId) => {
    // if (window.confirm("Are you sure you want to delete this video?")) {
    //   setDeleteLoading(videoId);
    //   try {
    //     await deleteVideo(videoId); // API to delete the video
    //     setVideos((prev) => prev.filter((video) => video._id !== videoId));
    //     alert("Video deleted successfully!");
    //   } catch (error) {
    //     console.error("Error deleting video:", error);
    //     alert("Failed to delete video. Please try again.");
    //   } finally {
    //     setDeleteLoading(null);
    //   }
    // }
  };

  const handleDeleteCourse = async () => {
    // if (window.confirm("Are you sure you want to delete this course?")) {
    //   try {
    //     // Add your delete course API logic here
    //     alert("Course deleted successfully!");
    //     navigate("/admin/dashboard");
    //   } catch (error) {
    //     console.error("Error deleting course:", error);
    //     alert("Failed to delete the course. Please try again.");
    //   }
    // }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F3EBE5]">
        <p className="text-xl text-gray-500 animate-pulse">Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F3EBE5]">
        <p className="text-xl text-red-500">Course not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col py-10 px-4 sm:px-6 md:px-10 lg:px-20 bg-[#F3EBE5] min-h-screen">
      {/* Course Title and Details */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
        <div className="w-full lg:w-3/5">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{course.name}</h1>
          <p className="text-gray-600 text-base leading-relaxed">{course.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <p className="text-lg text-gray-800">
              <span className="font-medium">Price:</span> Rs {course.price}
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-medium">Enrolled Students:</span> {course.enrollments.length}
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-medium">Duration:</span> {convertDuration(course.courseDuration)}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-2/5 flex justify-center">
          <img
            src={course.image}
            alt={course.name}
            className="w-full max-w-xs rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Admin Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={handlePublish}
          disabled={publishLoading}
          className={`flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-teal-600 hover:to-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md ${
            publishLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {publishLoading ? "Publishing..." : "Publish Course"}
        </button>

        <button
          onClick={() => navigate(`/admin/course/${id}/edit`)}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
        >
          Edit Course
        </button>

        <button
          onClick={handleDeleteCourse}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
        >
          Delete Course
        </button>
      </div>

      {/* Course Videos */}
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Course Videos
          </h2>
          <button
            onClick={() => navigate(`/admin/course/${id}/add-video`)}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-transform duration-200"
          >
            Add Video
          </button>
        </div>
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video._id} className="bg-gray-100 rounded-lg shadow p-4">
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  className="w-full h-40 rounded"
                  allowFullScreen
                ></iframe>
                <h3 className="text-lg font-semibold text-gray-800 mt-4">{video.title}</h3>
                <p className="text-sm text-gray-600">{video.description}</p>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => navigate(`/admin/course/${id}/edit-video/${video._id}`)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-transform duration-200"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteVideo(video._id)}
                    disabled={deleteLoading === video._id}
                    className={`px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-transform duration-200 ${
                      deleteLoading === video._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {deleteLoading === video._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-800 mb-4">No videos added to this course yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Utility function to convert seconds to HH:MM:SS format
const convertDuration = (duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};

export { AdminCourseDetails };
