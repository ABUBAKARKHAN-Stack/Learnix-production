import React from 'react';
import logo from '../assets/imgs/LogoText.png';
import email from '../assets/imgs/email.png';

function LandingFooter() {
  return (
    <footer className="bg-[#F3EBE5] px-8 lg:px-16 py-12">
      {/* Logo and Links Container */}
      <div className="flex flex-col items-center md:flex-row md:justify-between md:items-start gap-12">
        {/* Logo */}
        <div className="mb-6 md:mb-0">
          <img src={logo} className="w-[140px] lg:w-[200px] h-auto" alt="Learnix Logo" />
        </div>

        {/* Footer Links */}
        <div className="flex flex-col gap-10 md:flex-row md:gap-12">
          {/* About Us */}
          <div className="text-center md:text-left">
            <h1 className="font-semibold text-[18px] lg:text-[20px] text-gray-800">About Us</h1>
            <p className="text-[12px] lg:text-[14px] text-gray-700 mt-3 md:w-[270px]">
              Our platform bridges innovation and education, offering diverse courses to inspire lifelong learning and growth.
            </p>
          </div>

          {/* Information */}
          <div className="text-center md:text-left">
            <h1 className="font-semibold text-[18px] lg:text-[20px] text-gray-800">Information</h1>
            <ul className="text-[12px] lg:text-[14px] text-gray-700 space-y-2 mt-3">
              <li className="hover:text-gray-900 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-gray-900 cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-gray-900 cursor-pointer">Infringement Verification</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="text-center md:text-left">
            <h1 className="font-semibold text-[18px] lg:text-[20px] text-gray-800">Contact Us</h1>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
              <img src={email} className="w-[22px] h-auto" alt="Email Icon" />
              <p className="text-[12px] lg:text-[14px] text-gray-700">learnix@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-12">
        <p className="text-[12px] text-[#8A827C]">
          &#169; 2024 Learnix. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default LandingFooter;
