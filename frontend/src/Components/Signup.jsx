import React, { useState } from 'react'
import { GiPartyPopper } from 'react-icons/gi';
import { MdSchool } from 'react-icons/md';
import { FaChalkboardTeacher, FaRegSmile } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { useForm } from 'react-hook-form'
import logo from '../assets/imgs/LogoText.png'
import { Link, useNavigate } from 'react-router-dom';
import { signUpUser } from '../API/mainFetching';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import PasswordValidation from './PasswordValidation'; // Component for password validation feedback
import img from '../assets/imgs/loginImage.webp'
import { showErrorToast, showSuccessToast } from '../utils/ToastNotification';

export function SignUp() {
  // React Hook Form setup
  const { handleSubmit, register, watch, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    }
  });

  // State management for toggling between teacher/student views
  const [teacher, setTeacher] = useState(false);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState(true);
  const [password, SetPassword] = useState(false)
  const navigate = useNavigate();

  // State to track password validity
  const [isPasswordValid, setIsPasswordValid] = useState(false);


  //Toggle password hide show
  const handlePass = () => {
    SetPassword(!password)
  }

  // Toggle to student mode
  const handleStudent = () => {
    setTeacher(false);
    setOption(false);
  };

  // Toggle to teacher mode
  const handleTeacher = () => {
    setTeacher(true);
    setOption(false);
  };

  // Watch the password field for real-time updates
  const passwordFieldWatch = watch('password');

  // Function to handle updates to password validity
  const onValidityChange = (isValid) => {
    setIsPasswordValid(isValid);
  };

  // Form submission handler
  const onSubmit = async (data) => {
    // Prevent submission if password is invalid
    if (!isPasswordValid) {
      return showErrorToast('Please fulfill all password requirements.');
    }
    const formData = { ...data, isAdmin: teacher ? true : false }; // Add teacher role if applicable

    try {
      setLoading(true);
      const res = await signUpUser(formData); // API call to sign up the user
      console.log(res.data);
      showSuccessToast(res.data?.message);
      if (res.status === 201) {
        setTimeout(() => {
          navigate('/signin');
        }, 2500);
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
      // Handle error response
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again.';
      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  }

  return (
    <div>
      {/* Logo */}
      <img src={logo} className='w-[120px] lg:w-[190px] mx-auto mt-16 h-auto' alt="" />

      {/* Option Selection: Teacher or Student */}
      {option ? <>
        <div className="flex flex-col items-center mt-12 justify-center text-center">
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
            <h1 className="font-medium text-lg sm:text-xl lg:text-[30px]">
              Are You a Teacher or a Student?
            </h1>
            <GiPartyPopper className="hidden sm:block sm:text-3xl lg:text-4xl text-black" />
          </div>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-600">
            Define your role to get started. Join us and take the next step in your learning or teaching journey!
          </p>
        </div>

        <div className='flex flex-col sm:flex-row sm:mx-20 md:mx-40 justify-center items-center mt-20 mx-16 gap-5'>
          {/* Student Option */}
          <div
            onClick={handleStudent}
            className='bg-white hover:bg-black transition-colors duration-300 ease-linear border-4 flex lg:justify-center items-center lg:h-32 gap-x-4 cursor-pointer border-[#E5E7EB] hover:border-black hover:text-white text-black p-4 rounded-3xl w-full'
          >
            <p className='lg:text-2xl lg:font-semibold'>Student</p>
            <MdSchool className='lg:text-4xl' />
          </div>

          {/* Teacher Option */}
          <div onClick={handleTeacher} className='bg-black hover:bg-white transition-colors duration-300 ease-linear border-4 flex lg:justify-center items-center lg:h-32 gap-x-4 cursor-pointer border-black text-white hover:border-[#E5E7EB] hover:text-black p-4 rounded-3xl w-full '>
            <p className='lg:text-2xl lg:font-semibold'>Teacher</p>
            <FaChalkboardTeacher className='lg:text-4xl' />
          </div>
        </div>

      </> : null}




      {/* Form Section */}
      {!option && (
        <div>
          {teacher ? (


            <div className='mx-5 lg:flex lg:justify-between lg:px-16 lg:gap-16 rounded-md px-5 pb-5 sm:mx-16 md:mx-40 lg:mx-16 xl:mx-20'>

              {/* Back Button */}
              <div className='flex items-center'>
                <FiArrowLeft className='absolute cursor-pointer top-10 left-10 lg:top-20 lg:left-20' onClick={handleRefresh} size={40} />
              </div>

              {/* Teacher Info Section */}
              <div className='hidden lg:block mt-10 bg-black px-5 pt-5 rounded-xl text-white w-[50%] '>
                <div className='h-52 xxl:h-60 overflow-hidden flex justify-center items-center rounded-lg'>
                  <img src={img} className='object-cover object-center h-full w-full' alt="Teacher" />
                </div>
                <h2 className='mt-5 leading-loose text-[12px] xxl:text-[14px] font-medium text-center'>
                  Welcome to learnix our e-learning platform! As a teacher, you have the power to inspire, educate, and shape future minds with your knowledge.
                </h2>
              </div>



              {/* Teacher Sign-Up Form */}
              <form onSubmit={handleSubmit(onSubmit)} className='lg:w-[50%]'>
                <h1 className='mt-10 mb-5 flex items-center gap-2 text-xl'>
                  Welcome <FaRegSmile />
                </h1>

                {/* Username Input */}
                <div>
                  <label htmlFor="username" className='text-[14px]'>Username</label>
                  <input
                    type="text"
                    placeholder='username'
                    id="username"
                    {...register('username', {
                      required: 'Username is required',
                      pattern: {
                        value: /^[A-Za-z0-9]+$/,
                        message: 'Username can only contain letters and numbers'
                      }
                    })}
                    className='outline-none pl-2 border text-xs py-2 w-full rounded-md'
                  />
                  {errors.username && <p className='text-red-500 tracking-wide text-[10px]'>{errors.username.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className='text-[14px]'>Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder='email'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className='outline-none pl-2 border text-xs py-2 w-full rounded-md'
                  />
                  {errors.email && <p className='text-red-500 tracking-wide text-[10px]'>{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="password" className='text-[14px]'>Password</label>
                  <div className='relative'>
                    <input
                      type={password ? 'text' : 'password'}
                      placeholder='••••••••'
                      id="password"
                      {...register('password', { required: 'Password is required' })}
                      className='outline-none pl-2 border text-xs py-2 w-full rounded-md'
                    />
                    {
                      password ? <FaEyeSlash className='absolute top-2.5 right-3 cursor-pointer ' onClick={handlePass} /> : <FaEye className='absolute top-2.5 right-3 cursor-pointer ' onClick={handlePass} />
                    }
                  </div>
                  {errors.password && <p className='text-red-500 tracking-wide text-[10px]'>{errors.password.message}</p>}
                </div>

                {/* Password Validation Component */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <PasswordValidation password={passwordFieldWatch} onPasswordValidity={onValidityChange} />
                </div>

                <div className='mx-auto'>
                  <button
                    disabled={loading ? true : false}
                    type='submit'
                    className='w-full rounded-md mt-5 transition-opacity duration-200 ease-linear bg-black text-white disabled:cursor-not-allowed disabled:opacity-50 py-2 shadow-lg outline-none'>
                    Sign Up
                  </button>
                </div>
                {/* Sign In Link */}
                <p className='text-center text-[12px] mt-10'>
                  Already have an account? <Link to="/signin"><span className='text-red-700'>Sign In</span></Link>
                </p>
              </form>
            </div>
          ) : (

            <div className='mx-5 lg:flex lg:justify-between lg:px-16 lg:gap-16 rounded-md px-5 pb-5 sm:mx-16 md:mx-40 lg:mx-16 xl:mx-20'>


              {/* Back Button */}
              <div className='flex items-center'>
                <FiArrowLeft className='absolute top-10 cursor-pointer left-10 lg:top-20 lg:left-20' onClick={handleRefresh} size={40} />
              </div>


              {/* Student Info Section */}
              <div className='hidden lg:block mt-10 bg-black px-5 pt-5 rounded-xl text-white w-[50%]'>
                <div className='h-52 xxl:h-60 overflow-hidden flex justify-center items-center rounded-lg'>
                  <img src={img} className='object-cover object-center h-full w-full' alt="Student" />
                </div>
                <h2 className='mt-5 text-[12px] xxl:text-[14px] leading-loose font-medium text-center'>
                  Welcome to learnix our e-learning platform! As a student, you're embarking on a journey of knowledge, growth, and limitless learning opportunities.
                </h2>
              </div>



              {/* Student Sign-Up Form */}
              <form onSubmit={handleSubmit(onSubmit)} className='lg:w-[50%]'>


                <h1 className='mt-10 mb-5 flex items-center gap-2 text-xl'>
                  Welcome <FaRegSmile />
                </h1>
                <div>
                  <label htmlFor="username" className='text-[14px]'>Username</label>
                  <input
                    type="text"
                    placeholder='username'
                    id="username"
                    {...register('username', {
                      required: 'Username is required',
                      pattern: {
                        value: /^[A-Za-z0-9]+$/,
                        message: 'Username can only contain letters and numbers'
                      }
                    })}
                    className='outline-none pl-2 border text-xs py-2 w-full rounded-md'
                  />
                  {errors.username && <p className='text-red-500 tracking-wide text-[10px]'>{errors.username.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className='text-[14px]'>Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder='email'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className='outline-none pl-2 border text-xs py-2 w-full rounded-md'
                  />
                  {errors.email && <p className='text-red-500 tracking-wide text-[10px]'>{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="password" className='text-[14px]'>Password</label>
                  <div className='relative'>
                    <input
                      type={password ? 'text' : 'password'}
                      placeholder='••••••••'
                      id="password"
                      {...register('password', { required: 'Password is required' })}
                      className='outline-none pl-2 border text-xs py-2 w-full rounded-md'
                    />
                    {
                      password ? <FaEyeSlash className='absolute top-2.5 right-3 cursor-pointer ' onClick={handlePass} /> : <FaEye className='absolute top-2 right-3 cursor-pointer ' onClick={handlePass} />
                    }
                  </div>

                  {errors.password && <p className='text-red-500 tracking-wide text-[10px]'>{errors.password.message}</p>}
                </div>

                {/* Password Validation Component */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <PasswordValidation password={passwordFieldWatch} onPasswordValidity={onValidityChange} />
                </div>

                <div className='mx-auto'>
                  <button
                    disabled={loading ? true : false}
                    type='submit'
                    className='w-full rounded-md mt-5 transition-opacity duration-200 ease-linear bg-black text-white disabled:cursor-not-allowed disabled:opacity-50 py-2 shadow-lg outline-none'>
                    Sign Up
                  </button>
                </div>
                <p className='text-center text-[12px] mt-10 '>
                  Already have an account? <Link to="/signin"><span className='text-red-700'>Sign In</span></Link>
                </p>
              </form>
            </div>
          )}
        </div>
      )
      }

    </div >
  )
}
