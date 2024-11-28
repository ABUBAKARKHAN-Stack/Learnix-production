import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

function Card({ name, role, img, social }) {
  return (
    <div className="w-full h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl rounded-2xl p-6 bg-gray-100 dark:bg-[#121214] flex flex-col items-center text-center shadow-lg">
      {/* Profile Image */}
      <div className="w-[120px] h-[120px] border-2 border-gray-200 rounded-full overflow-hidden mb-4 shadow-md">
        <img src={img} className="w-full h-full object-cover" alt={`${name}'s profile`} />
      </div>

      {/* Name */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{name}</h2>

      {/* Role */}
      <p className="text-gray-600 dark:text-gray-50 font-medium mb-4">{role}</p>

      {/* Social Media Icons */}
      <div className="flex space-x-4 mt-4">
        {social?.linkedin && (
          <a 
            href={social.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"  // DARK MODE ONLY
          >
            <FaLinkedin size={24} />
          </a>
        )}
        {social?.github && (
          <a 
            href={social.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-gray-100"  // DARK MODE ONLY
          >
            <FaGithub size={24} />
          </a>
        )}
        {social?.instagram && (
          <a 
            href={social.instagram} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-pink-500 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-500"  // DARK MODE ONLY
          >
            <FaInstagram size={24} />
          </a>
        )}
      </div>
    </div>
  );
}

export default Card;
