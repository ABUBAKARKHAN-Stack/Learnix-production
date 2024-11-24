import React from 'react'
import Sidebar from '../Components/Sidebar'
import CreateCourse from '../Components/CreateCourse'

function CreateCoursePage() {
  return (
    <div className='flex bg-[#F3EBE5] h-fit '>
      <div className='my-10 z-20  sticky'><Sidebar /></div>
      <div className='mt-20 md:mt-0 h-full w-full mx-auto'>
        <CreateCourse />
      </div>
    </div>
  )
}

export default CreateCoursePage