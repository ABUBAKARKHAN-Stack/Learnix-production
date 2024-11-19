import React from 'react';
import img from '../assets/imgs/Team.jpg';
import Card from './Card';

function LandingMain() {
  const teamMembers = [
    {
      name: 'Awais',
      role: 'Frontend Developer',
      img: '../assets/imgs/Awais.jpg'    },
    {
      name: 'Mansoor',
      role: 'Frontend Developer',
      img: '../assets/imgs/Mansoor.jpg'
    },
    {
      name: 'Abubakar',
      role: 'Backend Developer',
      img: '../assets/imgs/Abubakkar.jpg' 
    },
    {
      name: 'Ubaidullah',
      role: 'Backend Developer',
      img: '../assets/imgs/Ubaidullah.jpg'
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#F9F6F3] to-[#F3EBE5] pt-12">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
  {teamMembers.map((member, index) => (
    <div
      key={index}
      className="transform transition-transform px-2 duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#f5f5f5] rounded-lg"
    >
      <Card name={member.name} role={member.role} img={member.img} />
    </div>
  ))}
</div>


      </div>

      <hr className="mt-12 h-1 bg-gray-300 rounded-full mx-6" />
    </div>
  );
}

export default LandingMain;
