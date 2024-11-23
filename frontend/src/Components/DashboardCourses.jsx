import React, { useState, useEffect } from "react";
import { FaExclamationCircle, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getPurchasedCourses } from "../API/mainFetching";
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';


const DashboardCourses = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]); // State to store fetched courses
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Fetch courses based on user type (Admin or Student)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch admin courses if `isAdmin` is true, else fetch purchased courses
        const res = isAdmin ? await getAdminCourses() : await getPurchasedCourses();
        const fetchedCourses = res.data.data || [];
        setCourses(fetchedCourses); // Update state with fetched courses
      } catch (error) {
        console.error(`Error fetching ${isAdmin ? "admin" : "purchased"} courses:`, error);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchCourses();
  }, [isAdmin]);

  console.log(courses);

  // Navigate to course details page
  const handleDetailsClick = (courseId) => {
    navigate(`/your-courses/course/${courseId}`);
  };

  // Navigate to browse courses page for students
  const handleBrowse = () => {
    navigate("/courses");
  };


  //handle createCourse
  const handleCreateCourse = () => {
    navigate('/create_course')
  }

  return (
    <div className="w-full mx-auto px-4">
      {isAdmin ? (
        <>
          {/* Admin View */}
          <div>
            {courses.length === 0 ? (
              <div className="flex mt-10 flex-col items-center justify-center h-[400px]">
                <h1 className="text-2xl text-center font-semibold text-gray-700">
                  You have not created any courses yet.
                </h1>
              </div>
            ) : (
              <div className="relative overflow-hidden grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:flex xl:flex-col gap-8 mt-8">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 xl:hover:scale-100 transition-all duration-300 w-[300px] md:w-[270px] md:h-[400px] xl:flex xl:h-auto xl:w-full lg:w-[250px] h-[400px] mx-auto"
                  >
                    {/* Course Icon */}
                    <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 xl:w-[200px] xl:h-auto w-full h-1/3">
                      <div className="text-5xl text-white">
                        {course.icon ? React.createElement(course.icon) : "📚"}
                      </div>
                    </div>

                    {/* Course Details */}
                    <div className="p-5 h-2/3 flex xl:flex-row xl:justify-between xl:w-full flex-col justify-between">
                      <div className="xl:flex">
                        <div className="xl:flex xl:flex-col">
                          {/* Course Name */}
                          <h3 className="text-lg font-bold text-gray-800">{course.name}</h3>
                          {/* Course Category */}
                          <p className="text-sm text-gray-600 mt-2">{course.category || "Uncategorized"}</p>
                        </div>
                        <div className="flex xl:flex-col xl:items-start xl:mt-0 xl:ml-5 items-center justify-between mt-4">
                          {/* Rating */}
                          <div className="flex items-center text-yellow-500 text-base">
                            <span className="mr-1">{course.rating || "4.5"}</span>
                            <span>⭐</span>
                          </div>
                          {/* Student Count */}
                          <div className="text-sm text-gray-600">
                            {course.enrollments?.length || 0} students
                          </div>
                        </div>
                      </div>

                      {/* Admin Action Buttons */}
                      <div className="flex mx-auto w-fit md:mx-0 gap-5">
                        <button
                          onClick={() => handleDetailsClick(course._id)}
                          className="p-5 rounded-full transition-all duration-300 shadow-lg bg-blue-500 text-white"
                        >
                          <MdAdd />
                        </button>
                        <button
                          onClick={() => handleEditClick(course._id)}
                          className="p-5 rounded-full transition-all duration-300 shadow-lg bg-green-500 text-white"
                        >
                          <MdEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(course._id)}
                          className="p-5 rounded-full transition-all duration-300 shadow-lg bg-red-500 text-white"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Student View */}
          {courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px]">
              <FaExclamationCircle className="text-red-500 text-6xl mb-4" />
              <h1 className="text-2xl text-center font-semibold text-gray-700">
                You have not purchased any courses yet.
              </h1>
              <button
                onClick={handleBrowse}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 px-4 rounded-3xl mt-10"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-[1.025] transition-all duration-300"
                >
                  <img
                    src={course.image || "https://via.placeholder.com/150"}
                    alt={course.name || "Course Image"}
                    className="w-full h-40 object-cover"
                  />

                  {/* Course Details */}
                  <div className="py-6 px-4 flex flex-col justify-between">
                    <h3 className="text-xl font-semibold text-gray-900 truncate">
                      {course.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {course.description || "No description available."}
                    </p>
                    {/* View Details Button */}
                    <button
                      onClick={() => handleDetailsClick(course._id)}
                      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg transition-all duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}


export default DashboardCourses;
