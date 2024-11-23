import React, { useEffect, useState } from 'react';
import { GiPartyPopper } from 'react-icons/gi';
import { FaRupeeSign } from "react-icons/fa6";
import { FaSearch } from 'react-icons/fa';
import { getAllCourses } from "../API/mainFetching";
import useDebouce from '../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';

function Courses() {
  const [allCourses, setAllCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebouce(searchTerm, 500);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllCourses();
        console.log(res.data.data);
        const courses = res.data.data.map((course) => ({
          id: course._id,
          description: course.description,
          name: course.name,
          price: course.price,
          image: course.image,
          enrolled: course.enrollments.length,
          rating: course.rating || 4.5,
        }));
        setAllCourses(courses);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const filteredCourses = allCourses.filter((course) => course.name.trim().toLowerCase().includes(debouncedSearchTerm.trim().toLowerCase()));


  return (
    <div className="flex flex-col md:pl-2 pt-20 w-full pb-10 md:pt-10 lg:px-14 bg-[#F3EBE5]">
      {/* Header Section */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[77px] font-bold leading-tight text-gray-800">
        Empower Your Future <br className="hidden md:block" /> with Our Expert-Led Courses!
      </h1>

      {/* Explore Courses Section */}
      <div>

        <div className="flex flex-col md:flex-row md:mt-10 mt-5 md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium flex text-gray-800 items-center gap-2">
            <GiPartyPopper className="text-gray-800" size={40} /> Explore Courses
          </h1>

          {/* Modern Search Bar */}
          <div className="relative w-full md:w-1/2 lg:w-1/3 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search courses..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-[0.5px] focus:ring-blue-500 transition duration-300"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-9 h-9 flex items-center justify-center transition duration-300 shadow-md">
              <FaSearch />
            </button>
          </div>
        </div>


        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-8  mt-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white w-full rounded-lg shadow-md overflow-hidden transform hover:scale-[1.04] hover:shadow-xl transition-all duration-300 mx-auto "
              >
                {/* Course Thumbnail */}
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute flex items-center gap-x-0.5 top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-600  text-white text-xs font-light font-mono px-2 py-1 rounded-md shadow-md">
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
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mt-3 text-gray-700">
                    <span className="flex items-center text-yellow-500">
                      <span className="text-lg font-bold">{course.rating}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </span>
                    <span className="text-sm">{course.enrolled} students</span>
                  </div>
                  <button
                    onClick={() => navigate(`/courses/course-details/${course.id}`)}
                    className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-medium py-2 rounded-lg transition-transform duration-300 hover:scale-[1.025]">
                    Get Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-3">
              No courses available. Check back later!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;
