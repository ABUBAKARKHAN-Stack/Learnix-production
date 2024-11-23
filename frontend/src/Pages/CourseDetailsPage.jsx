import React from 'react'
import { CourseDetail as CourseDetailComponent } from '../Components/CourseDetails'
import { useParams } from 'react-router-dom';
function CourseDetailsPage() {
    const { id } = useParams(); // Get the course ID from the URL
    return (
        <div>
            <CourseDetailComponent id={id} />
        </div>
    )
}

export default CourseDetailsPage