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
      <div className="hidden  sm:flex h-[95vh] mt-5 w-[100px] bg-[#F3EBE5] text-white flex-col justify-between py-6 rounded-2xl fixed left-0">
        {/* Logo Section */}
        <div className="flex justify-center mb-4">
          <Link to="/">
            <img src={Logo} alt="" className="h-16 w-14" />
          </Link>
        </div>

        {/* Middle Navigation Section */}
        <div className="flex flex-col gap-8 items-center">
          <Link to="/Dashboard/Assignments">
            <HiOutlineBookOpen
              className="text-3xl text-black cursor-pointer hover:text-gray-400"
              title="Assignments"
            />
          </Link>
          <Link to="/Dashboard/Quizes">
            <HiOutlineClipboardCheck
              className="text-3xl text-black cursor-pointer hover:text-gray-400"
              title="Quizzes"
            />
          </Link>
          <Link to="/Dashboard/VideoLectures">
            <HiOutlineVideoCamera
              className="text-3xl text-black cursor-pointer hover:text-gray-400"
              title="Video Lectures"
            />
          </Link>
        </div>

        {/* Bottom Navigation Section */}
        <div className="flex flex-col gap-8 items-center">
          <Link to="/Dashboard/Settings">
            <HiOutlineCog
              className="text-3xl text-black cursor-pointer hover:text-gray-400"
              title="Settings"
            />
          </Link>
          <Link to="/Dashboard/Profile">
            <HiOutlineUserCircle
              className="text-3xl text-black cursor-pointer hover:text-gray-400"
              title="Profile"
            />
          </Link>
          <Link to="/Logout">
            <HiOutlineLogout
              className="text-3xl text-black cursor-pointer hover:text-gray-400"
              title="Logout"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 w-[80%] bg-[#F3EBE5] h-full transform transition-transform ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}>
        {/* Close Button */}
        <div className="flex justify-end items-center p-4 bg-[#F3EBE5]">
          <HiOutlineX
            className="text-3xl text-black cursor-pointer hover:text-gray-400"
            onClick={toggleMobileMenu}
          />
        </div>

        {/* Mobile Navigation Links (Full Screen) */}
        <div className="flex flex-col items-start justify-start h-full py-6 px-6 space-y-4">
          <Link
            to="/"
            className="flex items-center w-full py-4"
            onClick={toggleMobileMenu}>
            <HiOutlineHome className="text-3xl text-black cursor-pointer hover:text-gray-400 mr-4" />
            <span className="text-black text-lg font-medium">Home</span>
          </Link>
          <Link
            to="/Dashboard/Assignments"
            className="flex items-center w-full py-4"
            onClick={toggleMobileMenu}>
            <HiOutlineBookOpen className="text-3xl text-black cursor-pointer hover:text-gray-400 mr-4" />
            <span className="text-black text-lg font-medium">Assignments</span>
          </Link>
          <Link
            to="/Dashboard/Quizes"
            className="flex items-center w-full py-4"
            onClick={toggleMobileMenu}>
            <HiOutlineClipboardCheck className="text-3xl text-black cursor-pointer hover:text-gray-400 mr-4" />
            <span className="text-black text-lg font-medium">Quizzes</span>
          </Link>
          <Link
            to="/Dashboard/VideoLectures"
            className="flex items-center w-full py-4"
            onClick={toggleMobileMenu}>
            <HiOutlineVideoCamera className="text-3xl text-black cursor-pointer hover:text-gray-400 mr-4" />
            <span className="text-black text-lg font-medium">
              Video Lectures
            </span>
          </Link>
          <Link
            to="/Dashboard/Settings"
            className="flex items-center w-full py-4"
            onClick={toggleMobileMenu}>
            <HiOutlineCog className="text-3xl text-black cursor-pointer hover:text-gray-400 mr-4" />
            <span className="text-black text-lg font-medium">Settings</span>
          </Link>
          <Link
            to="/Dashboard/Profile"
            className="flex items-center w-full py-4"
            onClick={toggleMobileMenu}>
            <HiOutlineUserCircle className="text-3xl text-black cursor-pointer hover:text-gray-400 mr-4" />
            <span className="text-black text-lg font-medium">Profile</span>
          </Link>
          <Link
            to="/Logout"
            className="flex items-center w-full py-4"
            onClick={toggleMobileMenu}>
            <HiOutlineLogout className="text-3xl text-black cursor-pointer hover:text-gray-400 mr-4" />
            <span className="text-black text-lg font-medium">Logout</span>
          </Link>
        </div>
      </div>

      {/* Header with Hamburger Icon (Mobile only) */}
      <div className="sm:hidden fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-[#F3EBE5] z-50 ">
        {/* Logo */}
        <Link to="/">
          <img src={LogoText} alt="" className="h-12 w-22" />
        </Link>
        {/* Hamburger Icon */}
        <HiOutlineMenu
          className="text-3xl text-black cursor-pointer hover:text-gray-400"
          onClick={toggleMobileMenu}
        />
      </div>
    </div>
  );
};

export default Sidebar;
