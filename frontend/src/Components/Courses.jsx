import React from 'react'
import Sidebar from './Sidebar'

function Courses() {
  return (
    <div className='flex  p-4 bg-[#F3EBE5] '>
      <Sidebar />
{/* Header Section */}
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[77px] font-bold leading-tight text-gray-800">
        Empower Your Future <br className="hidden md:block" /> with Our Expert-Led Courses!
      </h1>
      {/* coursespage */}
      <div>
          <h1>Courses</h1>

      </div>

    </div>
  )
}

export default Courses
