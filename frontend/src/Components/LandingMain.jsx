import React from 'react'
import img from '../assets/imgs/Team.jpg'
import Card from './Card';

function LandingMain() {

    const teamMembers = [
        {
            name: 'Awais',
            role: 'Frontend Developer',
            img: '../assets/imgs/Awais.jpg'
        },
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
        }
    ];

  return (
    <div className='mt-10 '>
        <div className='sm:flex sm:items-start sm:mt-10'>
        <div>
        <h1 className='font-bold text-[24px] pl-5'>What Sets Us Apart</h1>
        <p className='text-[10px] pl-5 text-[#535050] sm:w-[300px]'>Our e-learning platform is designed to offer a seamless and personalized learning journey. With expert instructors, interactive content, and flexible schedules, we make it easy for you to gain new skills and advance your career. Whether you're a student, professional, or lifelong learner, our courses are tailored to meet your needs and help you achieve your goals.</p>
        <p className='text-[10px] pl-5 text-[#535050] mt-2 sm:w-[300px]'>
        Our platform combines cutting-edge technology with quality education to bring you an unparalleled learning experience. From industry-relevant courses to hands-on projects, we equip you with the skills and confidence to excel in a competitive world. Start your journey with us and turn your aspirations into achievements.
        </p>
      </div>
      <img src={img} className='rounded-2xl w-[300px] mt-5 sm:mt-0 h-auto mx-auto ' alt="" />
        </div>
      
      <hr className='mt-5 mx-2' />


<h1 className='font-bold text-[24px] pl-5 mt-10'>Our Team</h1>
      <div className='grid grid-cols-1 w-fit mt-10 mx-auto gap-5 px-2'>
      {teamMembers.map((member, index) => (
                    <Card
                        key={index}
                        name={member.name}
                        role={member.role}
                        img={member.img}
                    />
                ))}
      </div>


      <hr className='mt-5 mx-2' />

    </div>
  )
}

export default LandingMain
