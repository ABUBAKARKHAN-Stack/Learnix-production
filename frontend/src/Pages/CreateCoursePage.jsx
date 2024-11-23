import React from 'react'
import Sidebar from '../Components/Sidebar'
import CreateCourse from '../Components/CreateCourse'

function CreateCoursePage() {
  return (
    <div className='flex bg-[#F3EBE5] xl:h-screen '>
       <div className='my-10 z-20 '><Sidebar/></div> 
      <div className='mt-20 md:mt-0 w-fit mx-auto'>
        <CreateCourse/>
        </div>
    </div>
  )
}

export default CreateCoursePage