import React, { useState } from "react";
import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineClipboardCheck,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineViewGrid
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/imgs/mobile-logo.png";
import LogoText from "../assets/imgs/LogoText.png";
import { logoutUser } from "../API/mainFetching";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate()

  // Toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); // Log out the user
      navigate('/signin')
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-[90vh] w-[70px] bg-white text-white flex-col justify-between py-6 rounded-full fixed transform top-1/2 -translate-y-1/2 shadow-lg z-50">
        {/* Logo Section */}
        <div className="flex justify-center mb-4">
          <Link to="/dashboard">
            <img src={Logo} alt="Logo" className="h-16 w-14" />
          </Link>
        </div>

        {/* Middle Navigation Section */}
        <div className="flex flex-col gap-8 items-center">
          <Link to="/dashboard" title="Dashboard">
            <HiOutlineViewGrid className="text-3xl text-black cursor-pointer hover:text-gray-600" />
          </Link>
          <Link to="/courses" title="Courses">
            <HiOutlineBookOpen className="text-3xl text-black cursor-pointer hover:text-gray-600" />
          </Link>
          <Link to="/Quizes" title="Quizzes">
            <HiOutlineClipboardCheck className="text-3xl text-black cursor-pointer hover:text-gray-600" />
          </Link>
        </div>

        {/* Bottom Navigation Section */}
        <div className="flex flex-col gap-8 items-center">
          <Link to="/setting" title="Settings">
            <HiOutlineCog className="text-3xl text-black cursor-pointer hover:text-gray-600" />
          </Link>
          <button onClick={handleLogout}>
            <HiOutlineLogout className="text-3xl text-black cursor-pointer hover:text-gray-600" />
          </button>
        </div>
      </div>


      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 w-[70%] bg-[#F3EBE5] h-full transform transition-transform duration-300 ease-in-out z-50 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden`}>
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 bg-[#F3EBE5]">
          <HiOutlineX
            className="text-3xl text-black cursor-pointer hover:text-gray-600"
            onClick={toggleMobileMenu}
          />
          <img src={LogoText} alt="Logo Text" className="h-10 w-auto" />
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex flex-col px-6 py-4 space-y-6">
          <Link
            to="/dashboard"
            className="flex items-center py-4"
            onClick={toggleMobileMenu}>
            <HiOutlineHome className="text-3xl text-black mr-4" />
            <span className="text-lg font-medium text-black">Dashboard</span>
          </Link>
          <Link
            to="/quizes"
            className="flex items-center py-4"
            onClick={toggleMobileMenu}>
            <HiOutlineClipboardCheck className="text-3xl text-black mr-4" />
            <span className="text-lg font-medium text-black">Quizzes</span>
          </Link>
          <Link
            to="/setting"
            className="flex items-center py-4"
            onClick={toggleMobileMenu}>
            <HiOutlineCog className="text-3xl text-black mr-4" />
            <span className="text-lg font-medium text-black">Settings</span>
          </Link>

          <button className="flex items-center py-4" onClick={handleLogout}>
            <HiOutlineLogout className="text-3xl text-black cursor-pointer hover:text-gray-600 mr-4" />
            <span className="text-lg font-medium text-black">Logout</span>
          </button>
        </div>
      </div>

      {/* Header with Hamburger Icon (Mobile only) */}
      <div className="md:hidden fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-[#F3EBE5]">
        <Link to="/">
          <img src={LogoText} alt="Logo" className="h-12" />
        </Link>
        <HiOutlineMenu
          className="text-3xl text-black cursor-pointer"
          onClick={toggleMobileMenu}
        />
      </div>
    </>
  );
};

export default Sidebar;
