import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import logo from '../assets/imgs/LogoText.png'
import { FaRegSmile } from 'react-icons/fa';
import img from '../assets/imgs/loginImage.webp'
import { FiArrowLeft } from 'react-icons/fi';

export function SignIn() {
  const { handleSubmit, register, formState: { errors } } = useForm()



  const onSubmit = (data) => {
    console.log('data', data);
  }


  return (
    <div className='  h-screen overflow-hidden pt-12'>
      <img src={logo} className='w-[120px] lg:w-[190px] h-auto mx-auto' alt="" />
      <div className='flex items-center'>
        <Link to='/'><FiArrowLeft className='absolute top-10 left-10 lg:top-20 lg:left-20 ' size={40} /></Link>
      </div>

{/* FORM DIV */}
      <div className=' mx-5 lg:flex lg:justify-between lg:px-16 lg:gap-16  rounded-md px-5 pb-5 sm:mx-16 md:mx-40 lg:mx-16 xl:mx-20 xl:gap-20 '>
        <div className='hidden lg:block mt-10 bg-black px-5 pt-5 rounded-xl  text-white w-[50%] h-[61vh] '>
          <div className='h-52 xxl:h-60 overflow-hidden flex justify-center items-center rounded-lg'><img src={img} className='object-cover object-center h-full w-full' alt="" /></div>
          <h2 className='mt-5 text-[12px] xxl:text-[14px]  text-center'> Welcome Back to Learnix - Ready to Continue Your Learning Journey? Sign In to Pick Up Right Where You Left Off!</h2>
        </div>
        {/* Form  */}
        <form onSubmit={handleSubmit(onSubmit)}
          className='lg:w-[50%]'
        >
          <h1 className='mt-10 mb-5 flex items-center gap-2 text-xl'>Welcome Back!  <FaRegSmile /></h1>
          <div className=' '>
            <label htmlFor="email" className='text-[14px]'>
              Email
            </label>
            <input type="email"
              id="email"
              placeholder='email'
              {...register('email', { required: 'Email is required' })}
              className=' outline-none pl-2 border text-xs py-2 w-full  rounded-md'
            />
          </div>
          <div className=''>
            <label htmlFor="pass" className='text-[14px]'>
              Password
            </label>
            <input type="password"
              placeholder='password'
              id="pass"
              {...register('pass', { required: 'Password is required' })}
              className='outline-none pl-2 border text-xs py-2 w-full rounded-md'
            />
          </div>
          <div className=' mx-auto'>
            <button type='submit' className=' w-full rounded-md mt-5 bg-black text-white py-2 shadow-lg outline-none ' >
              Sign In
            </button>
          </div>
          <div className='mt-20'><p className='text-center text-[12px] cursor-pointer '>Forgot password?</p>
            <p className='text-center text-[12px] cursor-pointer'>Not have account <Link to='/signup'> <span className='text-red-600 underline '>Create One</span></Link></p></div>
        </form>
      </div>

    </div>
  )
}

