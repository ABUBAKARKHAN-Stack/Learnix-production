import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/imgs/LogoText.png'
import img from '../assets/imgs/loginImage.webp'
import mobileLogo from '../assets/imgs/mobile-logo.png'
import { FiArrowLeft } from 'react-icons/fi';
import { FaRegSmile } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { signInUser } from '../API/mainFetching';
import { showErrorToast, showSuccessToast } from '../utils/ToastNotification'


export function SignIn() {
  const { handleSubmit, register, formState: { errors } } = useForm()
  const [password, SetPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handlePass = () => {
    SetPassword(!password)
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await signInUser(data);
      if (res.status === 202) {
        showSuccessToast(res.data.message);
        console.log(res.headers["authorization"]);
      }
      if (res.status === 200) {
        showSuccessToast(res.data.message);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2500);
      }
      console.log(res);
    } catch (error) {
      const errorMessage = error.response.data.error || error.message || 'An error occurred. Please try again.';
      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='h-screen overflow-hidden pt-12'>
      <div className='mx-5 rounded-md px-5 pb-5'>

        <img src={logo} className='w-[120px] lg:w-[190px] h-auto mx-auto' alt="" />
        <div className='flex items-center'>
          <Link to='/'><FiArrowLeft className='absolute top-10 left-10 lg:top-20 lg:left-20 ' size={40} /></Link>
        </div>
        {/* FORM DIV */}
        <div className=' mx-5 lg:flex lg:justify-between lg:px-16 lg:gap-16  rounded-md px-5 pb-5 sm:mx-16 md:mx-40 lg:mx-16 xl:mx-20 xl:gap-20 '>

          <div className='hidden lg:block mt-10 bg-black px-5 pt-5 rounded-xl  text-white w-[50%] '>
            <div className='h-52 xxl:h-60 overflow-hidden flex justify-center items-center rounded-lg'><img src={img} className='object-cover object-center h-full w-full' alt="" /></div>
            <div className="flex flex-col gap-y-0.5 mt-2">
              <div className='flex flex-row-reverse justify-center items-center' >
                <img src={mobileLogo} className=' w-12' alt="" />
                <h2 className='text-[12px] xxl:text-[18px] font-semibold text-center'>
                  Welcome Back to Learnix!
                </h2>
              </div>
              <p className='text-[12px] xxl:text-[14px] text-center'>
                Ready to continue your learning journey?
              </p>
              <p className='text-[12px] xxl:text-[14px] text-center'>
                Sign in to pick up right where you left off!
              </p>
            </div>

          </div>

          <form onSubmit={handleSubmit(onSubmit)}
            className='lg:w-[50%]'
          >
            <img src={logo} className='w-[120px] h-auto mx-auto' alt="" />
            <h1 className='mt-10 mb-5 flex items-center gap-2 text-xl'>Welcome Back!  <FaRegSmile /></h1>

            <div className=' '>
              <label htmlFor="email" className='text-[14px]'>
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder='email'
                {...register('email', { required: 'Email is required' })}
                className='outline-none pl-2 border text-xs py-2 focus:ring-1 w-full rounded-md'
              />
              {errors.email && <p className='text-red-500 tracking-wide text-[10px]'>{errors.email.message}</p>}
            </div>
            <div className=''>
              <label htmlFor="password" className='text-[14px]'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={password ? 'text' : 'password'}
                  placeholder='password'
                  id="password"
                  {...register('password', { required: 'Password is required' })}
                  className='outline-none pl-2 relative border text-xs focus:ring-1 py-2 w-full rounded-md'
                />
                {
                  password ? <FaEyeSlash className='absolute top-2.5 right-3 cursor-pointer ' onClick={handlePass} /> : <FaEye className='absolute top-2.5 right-3 cursor-pointer ' onClick={handlePass} />
                }</div>

              {errors.password && <p className='text-red-500 tracking-wide text-[10px]'>{errors.password.message}</p>}
            </div>
            <div className='mx-auto'>
              <button
                disabled={loading ? true : false}
                type='submit'
                className='w-full rounded-md mt-5 bg-black transition-colors duration-200 ease-linear disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 shadow-lg outline-none'>
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
            <div className='mt-20 flex flex-col justify-center items-center gap-y-1 text-xs'>
              <Link to={'/forgot-password'} className='text-gray-950 hover:underline' >Forgot password?</Link>
              <p>Not have account <Link to='/signup'> <span className='text-red-600 hover:underline '>Create One</span></Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
