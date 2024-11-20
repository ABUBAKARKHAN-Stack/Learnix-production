import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

function Card({ name, role, img, social }) {
  return (
    <div className="w-full h-full rounded-2xl p-6 bg-gray-100 flex flex-col items-center text-center shadow-lg">
      <div className="w-[120px] h-[120px] border-2 border-gray-200 rounded-full overflow-hidden mb-4 shadow-md">
        <img src={img} className="w-full h-full object-cover" alt={`${name}'s profile`} />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
      <p className="text-gray-600 font-medium mb-4">{role}</p>

      {/* Social Media Icons */}
      <div className="flex space-x-4 mt-4">
        {social?.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
            <FaLinkedin size={24} />
          </a>
        )}
        {social?.github && (
          <a href={social.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black">
            <FaGithub size={24} />
          </a>
        )}
        {social?.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
            <FaInstagram size={24} />
          </a>
        )}
      </div>
    </div>
  );
}

export default Card;
