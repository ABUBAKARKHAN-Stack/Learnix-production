import React, { useRef, useEffect } from "react";
import { FaBell, FaCog, FaUserCircle, FaAward, FaTrophy } from "react-icons/fa";
import Chart from "chart.js/auto";

const DashboardProfile = ({ user }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Learning Hours",
              data: [2, 4, 3, 5, 6, 4, 7],
              backgroundColor: "rgba(243, 235, 229, 0.5)",
              borderColor: "rgba(0, 0, 0, 0.8)",
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
  }, []);

  return (
    <div className=" h-[90vh] mt-20 md:mt-0 mx-auto min-w-[300px] md:w-[300px] lg:w-[200px] w-fit relative right-0 p-2  flex justify-center">
      <div className="bg-white   rounded-2xl shadow-lg p-6 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <FaUserCircle className="text-5xl text-gray-400" />
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {user?.name || "John Doe"}
              </h1>
              <p className="text-sm text-gray-500">
                {user?.email || "john.doe@example.com"}
              </p>
            </div>
          </div>
          {/* <div className="flex items-center gap-4">
            <FaBell className="text-gray-600 text-2xl cursor-pointer hover:text-gray-800" />
            <FaCog className="text-gray-600 text-2xl cursor-pointer hover:text-gray-800" />
          </div> */}
        </div>

        {/* Activity Chart */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Weekly Learning Activity
          </h2>
          <canvas ref={canvasRef} className="w-full h-[200px]"></canvas>
        </div>

        
      </div>
    </div>
  );
};

export default DashboardProfile;