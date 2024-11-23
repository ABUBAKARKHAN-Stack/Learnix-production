import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import DashboardMain from "../Components/DashboardMain";
import DashboardProfile from "../Components/DashboardProfile";
import { getLoggedInUser } from "../API/mainFetching";



function Dashboard() {

  const [activeUser, setActiveUser] = useState({});
  const getActiveUser = async () => {
    try {
      const res = await getLoggedInUser();
      console.log(res.data.data);
      setActiveUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getActiveUser();
  }, []);




  return (
    <div className="relative m-0 gap-4 h-screen bg-[#F3EBE5] overflow-hidden">
      {/* Show on screens larger than md */}
      <div className="hidden md:relative md:flex flex-row overflow-hidden justify-between">
        <div className="my-auto">
          <Sidebar />
        </div>
        <DashboardMain isAdmin={activeUser.isAdmin} />
        <div className="my-32">
          <DashboardProfile user={activeUser} />
        </div>

      </div>

      {/* Small screens */}
      <div className="flex flex-col ss:flex md:hidden">
        <Sidebar />
        <DashboardProfile user={activeUser} />
        <DashboardMain isAdmin={activeUser.isAdmin} />
      </div>
    </div>
  );
}

export default Dashboard;
