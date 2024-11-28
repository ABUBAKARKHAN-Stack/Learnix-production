import React from 'react';
import logo from '../assets/imgs/LogoText.png';
import email from '../assets/imgs/email.png';
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

function LandingFooter() {
  return (
    <footer className="px-8 lg:px-10 py-16">
      {/* Logo and Links Container */}
      <div className="flex flex-col items-center md:flex-row md:justify-between md:items-start gap-12">
        {/* Logo */}
        <div className="mb-6 md:mb-0">
          <img src={logo} className="w-[140px] dark:invert lg:w-[200px] h-auto" alt="Learnix Logo" />
        </div>

        {/* Footer Links */}
        <div className="flex flex-col gap-10 md:flex-row md:gap-12">
          {/* About Us */}
          <div className="text-center md:text-left">
            <h1 className="font-semibold text-[18px] lg:text-[20px] text-gray-800 dark:text-gray-50">About Us</h1>
            <p className="text-[12px] lg:text-[14px] text-gray-700 dark:text-gray-50 mt-3 md:w-[270px]">
              Our platform bridges innovation and education, offering diverse courses to inspire lifelong learning and growth.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="text-center md:text-left">
            <h1 className="font-semibold text-[18px] lg:text-[20px] text-gray-800 dark:text-gray-50">Our Mission</h1>
            <p className="text-[12px] lg:text-[14px] text-gray-700 dark:text-gray-50 mt-3 md:w-[270px]">
              We are committed to fostering a community of learners who strive for excellence, success, and lifelong learning.
            </p>
          </div>

          {/* Information */}
          <div className="text-center md:text-left">
            <h1 className="font-semibold text-[18px] lg:text-[20px] text-gray-800 dark:text-gray-50">Information</h1>
            <ul className="text-[12px] lg:text-[14px] text-gray-600 dark:text-gray-50 space-y-2 mt-3">
              <li className="hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer">Infringement Verification</li>
              <li className="hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer">FAQ</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="text-center md:text-left">
            <h1 className="font-semibold text-[18px] lg:text-[20px] dark:text-gray-50 text-gray-800">Contact Us</h1>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
              <img src={email} className="w-[22px] dark:invert h-auto" alt="Email Icon" />
              <p className="text-[12px] lg:text-[14px] text-gray-600 dark:text-gray-50">learnix@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-8 text-center">
        <h2 className="font-semibold text-[18px] lg:text-[20px] text-gray-800 dark:text-gray-50 mb-4">Follow Us</h2>
        <div className="flex justify-center gap-6">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-gray-100">
            <FaGithub size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-500">
            <FaInstagram size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-200">
            <FaTwitter size={24} />
          </a>
        </div>
      </div>

    </footer >
  );
}

export default LandingFooter;
