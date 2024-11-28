import React, { useRef, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Chart from "chart.js/auto";
import { getAdminCourses } from "../API/mainFetching";
import moment from "moment";

const DashboardProfile = ({ user }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [adminCourses, setAdminCourses] = useState([]);

  useEffect(() => {
    if (user?.isAdmin) {
      const fetchAdminCourses = async () => {
        try {
          const res = await getAdminCourses();
          setAdminCourses(res.data.data || []);
        } catch (error) {
          console.error("Error fetching admin courses:", error);
        }
      };
      fetchAdminCourses();
    }
  }, [user?.isAdmin]);

  const calculateDailyUploads = (courses) => {
    const dailyUploads = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

    courses.forEach((course) => {
      const dayOfWeek = moment(course.createdAt).format("ddd");
      if (dailyUploads[dayOfWeek] !== undefined) {
        dailyUploads[dayOfWeek]++;
      }
    });

    return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => dailyUploads[day]);
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      let chartData, chartLabel, chartBackgroundColor, chartBorderColor;

      if (user?.isAdmin) {
        // Admin Chart: Use real daily upload counts
        const dailyUploads = calculateDailyUploads(adminCourses);
        chartLabel = "Uploaded Courses";
        chartData = dailyUploads;
        chartBackgroundColor = "rgba(54, 162, 235, 0.5)";
        chartBorderColor = "rgba(54, 162, 235, 1)";
      } else {
        // Student Chart: Weekly learning hours
        chartLabel = "Learning mins";
        chartData = [2, 4, 3, 5, 6, 4, 7]; // Example data
        chartBackgroundColor = "rgba(243, 235, 229, 0.5)";
        chartBorderColor = "rgba(0, 0, 0, 0.8)";
      }

      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: chartLabel,
              data: chartData,
              backgroundColor: chartBackgroundColor,
              borderColor: chartBorderColor,
              borderWidth: 2,
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [user, adminCourses]);

  return (
    <div className="h-fit mt-20 md:mt-0 mx-auto min-w-[300px] md:w-[300px] lg:w-[200px] w-fit relative right-0 p-2 flex justify-center">
      <div className="bg-white rounded-2xl mt-4 shadow-lg p-6 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <FaUserCircle className="w-12 h-12 text-gray-500" />
            )}
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {user?.username || "John Doe"}
              </h1>
              <p className="text-sm text-gray-500">
                {user?.email || "john.doe@example.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Activity Chart */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {user?.isAdmin ? "Courses Uploaded Weekly" : "Weekly Learning Activity"}
          </h2>
          <canvas ref={canvasRef} className="w-full h-[200px]"></canvas>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
