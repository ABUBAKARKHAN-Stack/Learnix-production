import React from 'react'
import { AdminCourseDetails as AdminCourseDetailsComponnt } from '../Components/AdminCourseDetails'
import Sidebar from '../Components/Sidebar'
import { useParams } from 'react-router-dom'
function AdminCourseDetailsPage() {
    const { courseId } = useParams()
    return (
        <div className='flex pl-5 bg-[#F3EBE5] justify-between'>
            <Sidebar />
            <span className='ml-8'>
            <AdminCourseDetailsComponnt id={courseId} />
            </span>
        </div>
    )
}

export default AdminCourseDetailsPage