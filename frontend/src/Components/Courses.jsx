import React from 'react';
import { GiPartyPopper } from 'react-icons/gi'; // Import icon for header
import { CourseData } from '../Data/CourseData.js'; // Import courses data
import { FaSearch } from 'react-icons/fa';


function Courses() {
  return (
    <div className="flex flex-col pt-20 pb-10 md:pt-10 px-10 bg-[#F3EBE5]">
      {/* Header Section */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[77px] font-bold leading-tight text-gray-800">
        Empower Your Future <br className="hidden md:block" /> with Our Expert-Led Courses!
      </h1>

      {/* Explore Courses Section */}
      <div>
        <div className='flex flex-col md:flex-row md:mt-10 mt-5 md:items-center md:justify-between  '>
          <h1 className="text-4xl  font-medium flex text-gray-800">
          <GiPartyPopper /> Explore Courses
        </h1>
        <div className='flex items-center gap-2'>
          <input type="text" placeholder='search' className='bg-transparent border py-2 border-gray-800
          rounded-3xl pl-2'/>
         <div className='bg-white p-4 rounded-3xl'> <FaSearch /></div>
        </div>
        </div>
        

        {/* Course Cards */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {CourseData.map((course, index) => (
            <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
              
              {/* Course Icon */}
              <div className="flex justify-center mt-4">
                <div className="text-4xl text-gray-600">
                  {React.createElement(course.icon)}  {/* Render the icon dynamically */}
                </div>
              </div>

              {/* Course Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                <p className="text-sm text-gray-600">{course.category}</p>
                <div className="flex items-center gap-10 mt-2">
                  {/* Rating */}
                  <div className="flex items-center text-yellow-500">
                    <span className="mr-2">{course.rating}</span>
                    <span>⭐</span>
                  </div>
                  {/* Number of People */}
                  <div className="text-sm text-gray-600">{course.joinPersons} students</div>
                </div>
                {/* Buy Button */}
                <button className="bottom-0 relative mt-10 bg-blue-500 text-white py-2 px-4 rounded-full">{course.buyButton}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
