import React from 'react';
import logo from '../assets/imgs/LogoText.png';
import email from '../assets/imgs/email.png';

function LandingFooter() {
  return (
    <footer className="bg-[#F3EBE5] px-5 lg:px-10 py-10">
      {/* Logo and Links Container */}
      <div className="flex flex-col items-center md:flex-row md:justify-between md:items-start gap-10">
        {/* Logo */}
        <div className="mb-5 md:mb-0">
          <img src={logo} className="w-[120px] lg:w-[190px] h-auto" alt="Learnix Logo" />
        </div>

        {/* Footer Links */}
        <div className="flex flex-col gap-8 md:flex-row md:gap-10">
          {/* About Us */}
          <div className="text-center md:text-left">
            <h1 className="font-medium text-[20px]  text-gray-800">About Us</h1>
            <p className="text-[10px] text-gray-600 lg:text-[12px] mt-2 md:w-[250px]">
              Our platform bridges innovation and education, offering diverse courses to inspire lifelong learning and
              growth.
            </p>
          </div>

          {/* Information */}
          <div className="text-center md:text-left">
            <h1 className="font-medium text-[20px] text-gray-800">Information</h1>
            <ul className="text-[10px] lg:text-[12px] text-gray-600 space-y-1 mt-2">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Infringement Verification</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="text-center md:text-left">
            <h1 className="font-medium text-[20px] text-gray-800">Contact Us</h1>
            <ul className="text-[10px] lg:text-[12px] text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-2">
              <img src={email} className="w-[20px] h-auto" alt="Email Icon" />
              <li>learnix@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-10">
        <p className="text-[10px] text-[#8A827C]">
          &#169; 2024 Learnix. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default LandingFooter;
