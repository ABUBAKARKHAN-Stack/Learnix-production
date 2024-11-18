import React from 'react'
import Logo from '../assets/imgs/LogoText.png'
import Image from '../assets/imgs/Book.jpg'
import { Link } from 'react-router-dom'

function LandingHeader() {
  return (
    <div>
      <nav className='flex  items-center h-16 justify-between px-5 bg-[#F3EBE5] rounded-full mx-2 mt-2'>
        <img src={Logo} className='w-[80px] sm:w-[100px] h-auto' alt="" />
        <div className='flex gap-2'>
         <Link to='/signin'> <button className='bg-black text-[10px] sm:text-base outline-none text-white rounded-3xl px-5 p-2 '>Sign In</button></Link>
        </div>
      </nav>

      <div className='sm:flex sm:items-start sm:mt-10 md:mt-20'>
      
        <div className='px-2 mt-10 sm:mt-0'>
         <h1 className='font-bold text-[24px] sm:text-[30px] sm:leading-[35px] md:text-[52px] lg:text-[70px] lg:leading-[80px] md:leading-[50px] pl-5'>Learn, <br/> Grow, <br/> Succeed </h1>
         <p className='text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] md:w-[350px] pl-5 sm:w-[300px] lg:w-[500px] text-[#535050]'>Empowering learners with expert-led courses and tools to master skills anytime, anywhere.</p>
        </div>
        <img src={Image} className='rounded-2xl w-[300px] md:w-[400px] lg:w-[450px]  mt-5 sm:mt-0 h-auto mx-auto ' alt="" />
      </div>
      <hr className='mt-5 lg:mt-32 h-1 rounded-3xl bg-black mx-2' />
    </div>
  )
}

export default LandingHeader

