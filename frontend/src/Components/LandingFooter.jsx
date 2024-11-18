import React from 'react'
import logo from '../assets/imgs/LogoText.png'
import email from '../assets/imgs/email.png'

function LandingFooter() {
  return (
    <div className='px-2 mt-5 sm:mx-auto sm:w-fit'>
      <img src={logo} className='w-[120px] h-auto' alt="" />
      <div className='flex flex-wrap gap-5'>
        <div>
            <h1 className='font-medium text-[20px]'>About Us</h1>
            <p className='text-[10px] w-[200px]'>Our platform bridges innovation and education, offering diverse courses to inspire lifelong learning and growth.</p>
        </div>
        <div>
            <h1 className='font-medium text-[20px]'>Information</h1>
            <ul className='text-[10px]'>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                <li>Infrigement Verification</li>
            </ul>
        </div>
        <div>
        <h1 className='font-medium text-[20px]'>Contact Us</h1>
            <ul className='text-[10px] flex items-center gap-2'>
                <img src={email} className='w-[20px] h-auto' alt="" />
                <li>learnix@gmail.com</li>
            </ul>
        </div>
      </div>
      <p className='text-[10px] mt-5  mb-10 text-[#8A827C] '>&#169; 2024 Learnix. All Rights Reserved.</p>
    </div>
  )
}

export default LandingFooter
