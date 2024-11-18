import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import logo from '../assets/imgs/LogoText.png'
import { FaRegSmile } from 'react-icons/fa';


export function SignIn() {
  const { handleSubmit, register, formState: { errors } } = useForm()



  const onSubmit = (data) => {
   console.log('data', data);
  }

  return (
    <div className='  h-screen overflow-hidden pt-12'>
      <div className=' mx-5  rounded-md px-5 pb-5'>
        <form onSubmit={handleSubmit(onSubmit)}
        >
          <img src={logo} className='w-[120px] h-auto mx-auto' alt="" />
          <h1 className='mt-10 mb-5 flex items-center gap-2 text-xl'>Welcome Back!  <FaRegSmile /></h1>
          <div className=' '>
            <label htmlFor="email" className='text-[14px]'>
              Email
            </label>
            <input type="email"
              id="email"
              placeholder='email'
              {...register('email', { required: 'Email is required' })}
              className=' outline-none pl-2  border text-xs py-2 w-full rounded-md'
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
            <p className='text-center text-[12px] cursor-pointer'><Link to='/signup'>Not have account <span className='text-red-600 underline '>Create One</span></Link></p></div>

        </form>
      </div>

    </div>
  )
}

