import React from 'react';
import Logo from '../assets/imgs/LogoText.png';
import Image from '../assets/imgs/Book.jpg';
import { Link } from 'react-router-dom';

function LandingHeader() {
  return (
    <div className="bg-gradient-to-b from-[#F9F6F3] to-[#F3EBE5] min-h-screen pt-5">
      {/* Navigation */}
      <nav className="flex items-center h-20 justify-between px-8 bg-white shadow-md rounded-full mx-4 ">
        <img src={Logo} className="w-[90px] sm:w-[110px] h-auto" alt="Logo" />
        <div className="flex gap-4">
          <Link to="/signin">
            <button className="bg-black text-white text-sm sm:text-base px-6 py-2 rounded-full shadow-lg hover:bg-gray-800 transition">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-black text-white text-sm sm:text-base px-6 py-2 rounded-full shadow-lg hover:bg-gray-800 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row items-start justify-between mt-12 sm:mt-20 px-6 sm:px-12">
        {/* Text Content */}
        <div className="max-w-xl sm:pr-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-800">
            Learn, <br /> Grow, <br /> Succeed
          </h1>
          <p className="mt-6 text-gray-600 text-sm sm:text-[12px] lg:text-base lg:w-[400px]">
            Empowering learners with expert-led courses and tools to master skills anytime, anywhere.
          </p>
          <div className="mt-8">
            <Link to="/signin">
              <button className="bg-black text-white text-sm sm:text-base px-8 py-3 rounded-full shadow-lg hover:bg-gray-800 transition">
                Explore Courses
              </button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="mt-8 sm:mt-0">
          <img
            src={Image}
            className="rounded-3xl shadow-2xl w-[320px] sm:w-[900px] lg:w-[500px] xl:w-[600px] h-auto"
            alt="Learning"
          />
        </div>
      </div>

      {/* Divider */}
      <hr className="mt-12 sm:mt-20 lg:mt-32 h-1 rounded-full bg-black mx-6" />
    </div>
  );
}

export default LandingHeader;