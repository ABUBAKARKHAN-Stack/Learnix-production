import React from 'react'
import Courses from '../Components/Courses'
import Sidebar from '../Components/Sidebar'

function CoursesPage() {

  return (
    <div className='bg-[#F3EBE5] h-screen  pl-5 flex flex-col md:flex-row '>

      <Sidebar />
      
      <span className='ml-8'>
        <Courses />
      </span>
    </div>
  )
}

export default CoursesPage
