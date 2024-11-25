import React from 'react';
import img from '../assets/imgs/Team.jpg';
import abubakar from '../assets/imgs/abubakar.webp'
import mansoor from '../assets/imgs/mansoor.webp'
import awais from '../assets/imgs/awais.webp'
import ubaid from '../assets/imgs/ubaid.webp'
import Card from './Card';

function LandingMain() {
  const teamMembers = [
    {
      name: 'Awais',
      role: 'Frontend Developer',
      img: awais,
      social: {
        github: 'https://github.com/iawais-dev',
        linkedin: 'https://www.linkedin.com/in/awais-tahir-6a2898333?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        instagram: 'https://www.instagram.com/'
      }
    },
    {
      name: 'Mansoor',
      role: 'Frontend Developer',
      img: mansoor,
      social: {
        github: 'https://github.com/iammansoor007',
        linkedin: 'https://www.linkedin.com/in/themansoorshah?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        instagram: 'https://www.instagram.com/'
      }
    },
    {
      name: 'Abubakar',
      role: 'Backend Developer',
      img: abubakar,
      social: {
        github: 'https://github.com/ABUBAKARKHAN-Stack',
        linkedin: 'https://www.linkedin.com/',
        instagram: 'https://www.instagram.com/'
      }
    },
    {
      name: 'Ubaidullah',
      role: 'Backend Developer',
      img: ubaid ,
      social: {
        github: 'https://github.com/sardarubaidullah',
        linkedin: 'https://pk.linkedin.com/in/sardar-ubaidullah-karlal-986358292',
        instagram: 'https://www.instagram.com/'
      }
    },
  ];

  return (
    <div className="bg-[#F3EBE5] pt-12">
      {/* What Sets Us Apart Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 lg:gap-20 px-6 sm:px-12">
        {/* Image */}
        <img
          src={img}
          className="hidden sm:block rounded-3xl shadow-lg w-[300px] md:w-[400px] lg:w-[500px] h-auto"
          alt="Team"
        />

        {/* Text Content */}
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-gray-800">
            What Sets Us Apart
          </h1>
          <p className="mt-6 text-sm sm:text-[10px] lg:text-base text-gray-600 max-w-lg">
            Our e-learning platform is designed to offer a seamless and personalized learning journey.
            With expert instructors, interactive content, and flexible schedules, we make it easy for
            you to gain new skills and advance your career. Whether you're a student, professional, or
            lifelong learner, our courses are tailored to meet your needs and help you achieve your goals.
          </p>
          <p className="mt-4 text-sm sm:text-[10px] lg:text-base text-gray-600 max-w-lg">
            Our platform combines cutting-edge technology with quality education to bring you an unparalleled
            learning experience. From industry-relevant courses to hands-on projects, we equip you with the
            skills and confidence to excel in a competitive world. Start your journey with us and turn your
            aspirations into achievements.
          </p>
        </div>

        {/* Mobile Image */}
        <img
          src={img}
          className="sm:hidden rounded-3xl shadow-lg w-[300px] sm:w-[900px] mx-auto mt-8"
          alt="Team"
        />
      </div>

      <hr className="mt-12 h-1 bg-gray-300 rounded-full mx-6" />

      {/* Our Team Section */}
      <div className="mt-12 px-6 sm:px-12">
        <h1 className="text-3xl sm:text-5xl font-semibold text-gray-800">
          Our Team
        </h1>
        <div className="grid grid-cols-1 ssm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="transform transition-transform duration-300 hover:scale-105 shadow-lg rounded-lg hover:shadow-2xl"
            >
              <Card name={member.name} role={member.role} img={member.img} social={member.social} />
            </div>
          ))}
        </div>



      </div>

      <hr className="mt-12 h-1 bg-gray-300 rounded-full mx-6" />
    </div>
  );
}

export default LandingMain;