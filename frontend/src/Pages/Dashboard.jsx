import React, { useState } from "react";
import Sidebar from "../Components/sidebar";
import DashboardMain from "../Components/dashboardmain";
import DashboardProfile from "../Components/DashboardProfile";

function Dashboard({ courses }) {
  const [userProfileCourses, setUserProfileCourses] = useState([]);

  // Handle the action of adding a course to the profile
  const handleGetNow = (course) => {
    console.log("Course clicked:", course); // Debug log to confirm course data
    if (!userProfileCourses.find((c) => c.id === course.id)) {
      setUserProfileCourses((prevCourses) => {
        const updatedCourses = [...prevCourses, course];
        console.log("Updated User Profile Courses:", updatedCourses); // Debug log to show updated courses
        return updatedCourses;
      });
    }
  };

  // Handle the action of canceling/removing a course from the profile
  const handleCancelCourse = (courseToRemove) => {
    setUserProfileCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== courseToRemove.id)
    );
  };

  return (
    <div className="relative m-0 gap-4  bg-[#F3EBE5] overflow-hidden">
      {/* Show on screens larger than md */}
      <div className="hidden md:relative md:flex flex-row overflow-hidden justify-between">
        <div className="my-auto">
        <Sidebar />
        </div>
        <DashboardMain courses={courses} onGetNow={handleGetNow} />
        <div className="my-10"><DashboardProfile
          userProfileCourses={userProfileCourses}
          onCancelCourse={handleCancelCourse}
        /></div>
        
      </div>

      {/* Show on screens smaller than md */}
      <div className="flex flex-col ss:flex md:hidden">
        <Sidebar />
        <DashboardProfile
          userProfileCourses={userProfileCourses}
          onCancelCourse={handleCancelCourse}
        />
        <DashboardMain courses={courses} onGetNow={handleGetNow} />
      </div>
    </div>
  );
}

export default Dashboard;
