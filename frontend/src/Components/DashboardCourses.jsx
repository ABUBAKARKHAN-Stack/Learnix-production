import React, { useState, useEffect } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAdminCourses, getPurchasedCourses } from "../API/mainFetching";
import { GiPartyPopper } from "react-icons/gi";


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



  // Navigate to admin course details page
  const handleAdminDetailsClick = (courseId) => {
    navigate(`/admin/course-details/${courseId}`);
  };

  // Navigate to browse courses page for students
  const handleBrowse = () => {
    navigate("/courses");
  };



  if (loading) {
    return (
      <div className="h-screen flex w-[70vw] flex-col items-center justify-center bg-[#F3EBE5] px-4">
        <div className="text-gray-700 text-7xl mb-4">
          <GiPartyPopper />
        </div>
        <p className="text-gray-700 text-lg font-medium animate-pulse text-center mb-6">
          Loading...
        </p>

      </div>
    )
  }

  return (
    <div className="w-full mx-auto px-4">
      {isAdmin ? (
        <>
          {/* Admin View */}
  
            {isAdmin && courses.length === 0 ? (
              <div className="flex mt-10 flex-col items-center w-[60vw] justify-center h-[400px]">
                <h1 className="text-2xl text-center font-semibold text-gray-700">
                  You have not created any courses yet.
                </h1>
              </div>
            ) : (
              <div className="relative overflow-hidden grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:flex xl:flex-col gap-8 mt-8">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden w-[300px] md:w-[270px] md:h-[400px] xl:flex xl:h-auto xl:w-full lg:w-[250px] h-[400px] mx-auto"
                  >
                    {/* Course Image */}
                    <div>
                      <img src={course.image} alt={course.name} className="w-ful h-full object-cover" />
                    </div>

                    {/* Course Details */}
                    <div className="p-5 flex flex-col justify-between h-2/3 xl:w-full xl:flex-row">
                      <div>
                        {/* Course Name */}
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{course.name}</h3>
                        {/* Course Description */}
                        <p className="text-gray-600 text-sm line-clamp-3 w-[95%]">
                          {course.description}
                        </p>

                        <span className={`text-white text-sm ${course.isPublish ? "opacity-100" : "opacity-40"} w-fit mt-4 block bg-black px-3 py-1.5 rounded-full`}>
                          {course.isPublish ? "Published" : "Unpublished"}
                        </span>

                      </div>

                      <button
                        className="bg-blue-500 text-nowrap hover:bg-blue-600 text-white p-2 px-4 rounded-3xl my-auto"
                        onClick={() => handleAdminDetailsClick(course._id)}
                      >
                        View Details
                      </button>



                    </div>
                  </div>
                ))}
              </div>

            )}
      
        </>
      ) : (
        <>
          {/* Student View */}
          { courses.length === 0 ? (
            <div className='flex w-[60vw] flex-col items-center justify-center h-[400px]'>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ml-8 gap-x-6 gap-y-8">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden "
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
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {course.description}
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
