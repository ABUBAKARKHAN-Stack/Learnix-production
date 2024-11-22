import React from 'react';
import { GiPartyPopper } from 'react-icons/gi'; // Import icon for header
import { CourseData } from '../Data/CourseData.js'; // Import courses data
import { FaSearch } from 'react-icons/fa';


function Courses() {
  return (
    <div className="flex flex-col md:pl-2 pt-20 w-full pb-10 md:pt-10 lg:px-10 bg-[#F3EBE5]">
      {/* Header Section */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[77px] font-bold leading-tight text-gray-800">
        Empower Your Future <br className="hidden md:block" /> with Our Expert-Led Courses!
      </h1>

      {/* Explore Courses Section */}
      <div>
        <div className='flex flex-col md:flex-row md:mt-10 mt-5 md:items-center md:justify-between  '>
          <h1 className="text-2xl md:text-3xl lg:text-4xl  font-medium flex text-gray-800">
          <GiPartyPopper /> Explore Courses
        </h1>
        <div className="flex items-center gap-4 bg-[#F7F3ED] mr-5 md:p-3 rounded-full shadow-lg">
  {/* Search Input */}
  <input
    type="text"
    placeholder="Search..."
    className="flex-1 bg-[#F7F3ED] border-none focus:outline-none placeholder-gray-500 text-gray-700 text-sm px-4 py-2 rounded-full"
  />

  {/* Search Icon Button */}
  <button className="bg-[#FFE8D6] hover:bg-[#FFD6B3] transition-all duration-300 p-3 rounded-full shadow-md">
    <FaSearch className="text-gray-700 text-lg" />
  </button>
</div>

        </div>
        

        {/* Course Cards */}
        <div className="relative grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {CourseData.map((course) => (
  <div
    key={course.id}
    className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 w-[300px] h-[400px] mx-auto"
  >
    {/* Course Icon */}
    <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 w-full h-1/3">
      <div className="text-5xl text-white">
        {React.createElement(course.icon)} {/* Render the icon dynamically */}
      </div>
    </div>

    {/* Course Details */}
    <div className="p-5 h-2/3 flex flex-col justify-between">
      <div>
        {/* Course Name */}
        <h3 className="text-lg font-bold text-gray-800">{course.name}</h3>
        {/* Course Category */}
        <p className="text-sm text-gray-600 mt-2">{course.category}</p>
        {/* Course Rating and People */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-yellow-500 text-base">
            <span className="mr-1">{course.rating}</span>
            <span>⭐</span>
          </div>
          <div className="text-sm text-gray-600">{course.joinPersons} students</div>
        </div>
      </div>
      {/* Buy Button */}
      <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg">
        {course.buyButton}
      </button>
    </div>
  </div>
))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
