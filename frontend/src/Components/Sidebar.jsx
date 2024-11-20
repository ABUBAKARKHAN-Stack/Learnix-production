import React, { useState } from "react";
import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineVideoCamera,
  HiOutlineClipboardCheck,
  HiOutlineCog,
  HiOutlineUserCircle,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import Logo from "../assets/imgs/mobile-logo.png";
import LogoText from "../assets/imgs/LogoText.png";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-[95vh] w-[100px] bg-[#F3EBE5] text-white flex-col justify-between py-6 rounded-2xl fixed left-0 mt-5">
        {/* Logo Section */}
        <div className="flex justify-center mb-4">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-16 w-14" />
          </Link>
        </div>

        {/* Middle Navigation Section */}
        <div className="flex flex-col gap-8 items-center">
          <Link to="/Dashboard/Assignments" title="Assignments">
            <HiOutlineBookOpen className="text-3xl text-black cursor-pointer hover:text-gray-600" />
          </Link>
          <Link to="/Dashboard/Quizes" title="Quizzes">
            <HiOutlineClipboardCheck className="text-3xl text-black cursor-pointer hover:text-gray-600" />
          </Link>
          <Link to="/Dashboard/VideoLectures" title="Video Lectures">
            <HiOutlineVideoCamera className="text-3xl text-black cursor-pointer hover:text-gray-600" />
          </Link>
        </div>

        {/* Bottom Navigation Section */}
        <div className="flex flex-col gap-8 items-center">
          <Link to="/Dashboard/Settings" title="Settings">
            <HiOutlineCog className="text-3xl text-black cursor-pointer hover:text-gray-600" />
          </Link>
          <Link to="/Dashboard/Profile" title="Profile">
            <HiOutlineUserCircle className="text-3xl text-black cursor-pointer hover:text-gray-600" />
          </Link>
          <Link to="/Logout" title="Logout">
            <HiOutlineLogout className="text-3xl text-black cursor-pointer hover:text-gray-600" />
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 w-[70%] bg-[#F3EBE5] h-full transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
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
            to="/"
            className="flex items-center py-4"
            onClick={toggleMobileMenu}>
            <HiOutlineHome className="text-3xl text-black mr-4" />
            <span className="text-lg font-medium text-black">Home</span>
          </Link>
          <Link
            to="/Dashboard/Assignments"
            className="flex items-center py-4"
            onClick={toggleMobileMenu}>
            <HiOutlineBookOpen className="text-3xl text-black mr-4" />
            <span className="text-lg font-medium text-black">Assignments</span>
          </Link>
          <Link
            to="/Dashboard/Quizes"
            className="flex items-center py-4"
            onClick={toggleMobileMenu}>
            <HiOutlineClipboardCheck className="text-3xl text-black mr-4" />
            <span className="text-lg font-medium text-black">Quizzes</span>
          </Link>
          <Link
            to="/Dashboard/VideoLectures"
            className="flex items-center py-4"
            onClick={toggleMobileMenu}>
            <HiOutlineVideoCamera className="text-3xl text-black mr-4" />
            <span className="text-lg font-medium text-black">Video Lectures</span>
          </Link>
          <Link
            to="/Dashboard/Settings"
            className="flex items-center py-4"
            onClick={toggleMobileMenu}>
            <HiOutlineCog className="text-3xl text-black mr-4" />
            <span className="text-lg font-medium text-black">Settings</span>
          </Link>
          <Link
            to="/Dashboard/Profile"
            className="flex items-center py-4"
            onClick={toggleMobileMenu}>
            <HiOutlineUserCircle className="text-3xl text-black mr-4" />
            <span className="text-lg font-medium text-black">Profile</span>
          </Link>
          <Link
            to="/Logout"
            className="flex items-center py-4"
            onClick={toggleMobileMenu}>
            <HiOutlineLogout className="text-3xl text-black mr-4" />
            <span className="text-lg font-medium text-black">Logout</span>
          </Link>
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
    </div>
  );
};

export default Sidebar;
