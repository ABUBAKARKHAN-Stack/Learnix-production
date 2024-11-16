import React from 'react'
import Logo from '../assets/imgs/LogoText.png'
import Image from '../assets/imgs/Book.jpg'

function LandingHeader() {
  return (
    <div>
      <nav className='flex  items-center h-16 justify-between px-5 bg-[#F3EBE5] rounded-full mx-2 mt-2'>
        <img src={Logo} className='w-[80px] h-auto' alt="" />
        <div className='flex gap-2'>
          <button className='bg-white text-[10px] rounded-3xl p-2 px-5 '>Sign Up</button>
          <button className='bg-black text-[10px] text-white rounded-3xl px-5 p-2 '>Sign In</button>
        </div>
      </nav>

      <div className='sm:flex sm:items-start sm:mt-10'>
      
        <div className='px-2 mt-10 sm:mt-0'>
         <h1 className='font-bold text-[24px] pl-5'>Learn, <br/> Grow, <br/> Succeed </h1>
         <p className='text-[10px] pl-5 sm:w-[300px] text-[#535050]'>Empowering learners with expert-led courses and tools to master skills anytime, anywhere.</p>
        </div>
        <img src={Image} className='rounded-2xl w-[300px]  mt-5 sm:mt-0 h-auto mx-auto ' alt="" />
      </div>
      <hr className='mt-5 mx-2' />
    </div>
  )
}

export default LandingHeader

