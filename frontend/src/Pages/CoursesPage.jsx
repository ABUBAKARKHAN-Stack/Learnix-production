import React from 'react'
import Courses from '../Components/Courses'
import Sidebar from '../Components/Sidebar'

function CoursesPage() {
  return (
    <div className='bg-[#F3EBE5]  pl-5 flex flex-col md:flex-row '>
      <div className='z-50 md:pt-10 md:top-0 md:left-0 md:sticky md:h-screen'>
        <Sidebar />
      </div>
      <Courses />
    </div>
  )
}

export default CoursesPage
