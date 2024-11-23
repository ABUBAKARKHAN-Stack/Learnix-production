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


<<<<<<< HEAD
  //handle createCourse
  const handleCreateCourse = ()=>{
    navigate('/create_course')
  }

  return (
    <div className="w-full mx-auto px-4">
      {
        teacher ? <>
      
        <div>
          {PurchasedCourses.length === 0 ?  (
          <div className="flex mt-10 flex-col items-center justify-center h-[400px]">
            <h1 className="text-2xl text-center font-semibold text-gray-700">
              You have not created any course
            </h1>
          </div>
        ) : (
          <div className="relative overflow-hidden grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:flex xl:flex-col gap-8 mt-8 ">
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
                  <div className="flex mx-auto w-fit md:mx-0 gap-5"><button onClick={() => handleDetailsClick(course.id)} className="  p-5   rounded-full transition-all duration-300 shadow-lg">
                    <MdAdd/>
                  </button>
                  <button onClick={() => handleDetailsClick(course.id)} className="  p-5   rounded-full transition-all duration-300 shadow-lg">
                    <MdEdit/>
                  </button> 
                  <button onClick={() => handleDetailsClick(course.id)} className="  p-5   rounded-full transition-all duration-300 shadow-lg">
                    <MdDelete/>
                  </button> </div>
                  
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
=======
  // Navigate to create course page for admins
  const handleCreateCourse = () => {
    navigate("/create-course");
  };

  if (loading) {
    // Display loading state
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-lg font-medium text-gray-600">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 mx-auto">
      {isAdmin ? (
        <>
          {/* Admin Dashboard: Header Section */}
          <div className="flex justify-between items-center shadow-lg bg-white p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold text-gray-800">My Created Courses</h2>
            <button
              onClick={handleCreateCourse}
              className="p-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Create Course
>>>>>>> f506683e50fdbca98719032ca935ed53eff6b34f
            </button>
          </div>

          {/* Admin Dashboard: Courses Section */}
          {courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px]">
              <FaExclamationCircle className="text-red-500 text-6xl mb-4" />
              <h1 className="text-2xl text-center font-semibold text-gray-700">
                You haven't created any courses yet.
              </h1>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white w-full rounded-lg shadow-md overflow-hidden transform hover:scale-[1.025] hover:shadow-xl transition-all duration-300 mx-auto"
                >
                  {/* Course Thumbnail */}
                  <div className="relative">
                    <img
                      src={course.image || "https://via.placeholder.com/150"}
                      alt={course.name || "Course Image"}
                      className="w-full h-40 object-cover"
                    />
                    {/* Price Tag */}
                    <div className="absolute flex items-center gap-x-0.5 top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-light font-mono px-2 py-1 rounded-md shadow-md">
                      <FaRupeeSign size={11} className="mb-0.5" />
                      <span>{course.price}</span>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="py-6 px-4 flex flex-col justify-between">
                    <h3 className="text-xl font-semibold text-gray-900 truncate">
                      {course.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {course.description || "No description available."}
                    </p>
                    {/* Course Stats */}
                    <div className="flex items-center justify-between mt-3 text-gray-700">
                      <span className="flex items-center text-yellow-500">
                        <span className="text-lg font-bold">4.5</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </span>
                      <span className="text-sm">{course.enrollments?.length} Students</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Student Dashboard */}
          {courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px]">
              <FaExclamationCircle className="text-red-500 text-6xl mb-4" />
              <h1 className="text-2xl text-center font-semibold text-gray-700">
                You haven't purchased any courses.
              </h1>
              <button
                onClick={handleBrowse}
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
                >
                  {/* Course Thumbnail */}
                  <img
                    src={course.image || "https://via.placeholder.com/150"}
                    alt={course.name || "Course Image"}
                    className="w-full h-40 object-cover"
                  />

                  {/* Course Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 truncate">
                      {course.name || "Untitled Course"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {course.description || "No description available."}
                    </p>
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
};

export default DashboardCourses;
