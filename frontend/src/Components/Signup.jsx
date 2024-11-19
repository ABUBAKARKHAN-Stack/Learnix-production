import React, { useState } from 'react'
import { GiPartyPopper } from 'react-icons/gi';
import { MdSchool } from 'react-icons/md';
import { FaChalkboardTeacher, FaRegSmile } from 'react-icons/fa';
import { useForm } from 'react-hook-form'
import logo from '../assets/imgs/LogoText.png'
import { Link } from 'react-router-dom';
import { signUpUser } from '../API/mainFetching';
import PasswordValidation from './PasswordValidation'; // Component for password validation feedback
import img from '../assets/imgs/loginImage.webp'
import { FiArrowLeft } from 'react-icons/fi';

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

  // State to track password validity
  const [isPasswordValid, setIsPasswordValid] = useState(false);

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
      return alert('Please fulfill all password requirements.');
    }
    const formData = { ...data, isAdmin: teacher ? true : false }; // Add teacher role if applicable

    try {
      const res = await signUpUser(formData); // API call to sign up the user
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  }

  return (
    <div className=''>
      {/* Logo */}
      <img src={logo} className='w-[120px] lg:w-[190px] mx-auto mt-5 h-auto' alt="" />

      {/* Option Selection: Teacher or Student */}
      {option ? <>
        <h1 className='text-center mt-20 font-medium flex mx-auto w-fit items-center gap-3 text-[30px]'>
          Join Us <GiPartyPopper />
        </h1>
        <div className='flex flex-col sm:flex-row sm:mx-20 md:mx-40 justify-center items-center mt-20 mx-16 gap-5'>
          {/* Student Option */}
          <div onClick={handleStudent} className='bg-white flex items-center cursor-pointer lg:h-32 gap-2 border-4 rounded-3xl w-full p-2 '>
            Student <MdSchool />
          </div>
          {/* Teacher Option */}
          <div onClick={handleTeacher} className='bg-black border-4 flex items-center lg:h-32 gap-2 cursor-pointer border-black text-white p-2 rounded-3xl w-full '>
            Teacher <FaChalkboardTeacher />
          </div>
        </div>
      </> : null}

      {/* Form Section */}
      {!option && (
        <div>
          {teacher ? (
            <div className='mx-5 lg:flex lg:justify-between lg:px-16 lg:gap-16 rounded-md px-5 pb-5 sm:mx-16 md:mx-40 lg:mx-16 xl:mx-20  '>
              <div className='flex items-center'>
                <FiArrowLeft className='absolute top-10 left-10 lg:top-20 lg:left-20 ' onClick={handleRefresh} size={40} />
              </div>
              {/* Teacher Sign-Up Form */}

              <div className='hidden lg:block mt-10 bg-black px-5 pt-5 rounded-xl  text-white w-[50%] h-[61vh] '>
                <div className='h-52 xxl:h-60 overflow-hidden flex justify-center items-center rounded-lg'><img src={img} className='object-cover object-center h-full w-full' alt="" /></div>
                <h2 className='mt-5 text-[12px] xxl:text-[14px]  text-center'>A teacher plants seeds of knowledge that bloom for a lifetime.</h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}
                className='lg:w-[50%]'
              >
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
                    {...register('username',
                      {
                        required: 'Username is required',
                        pattern: {
                          value: /^[A-Za-z0-9]+$/,
                          message: 'Username can only contain letters and numbers'
                        }
                      }
                    )}
                    className=' outline-none pl-2  border text-xs py-2 w-full rounded-md'
                  />
                  {errors.username && <p className='text-red-500 tracking-wide text-[10px]'>{errors.username.message}</p>}
                </div>
                {/* Email Input */}
                <div className=''>
                  <label htmlFor="email" className='text-[14px]'>Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder='email'
                    {...register('email',
                      {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    className=' outline-none pl-2  border text-xs py-2 w-full rounded-md'
                  />
                  {errors.email && <p className='text-red-500 tracking-wide text-[10px]'>{errors.email.message}</p>}
                </div>
                {/* Password Input */}
                <div className=''>
                  <label htmlFor="password" className='text-[14px]'>Password</label>
                  <input
                    type="password"
                    placeholder='••••••••'
                    id="password"
                    {...register('password', { required: 'Password is required' })}
                    className='outline-none pl-2 border text-xs py-2 w-full rounded-md'
                  />
                  {errors.password && <p className='text-red-500 tracking-wide text-[10px]'>{errors.password.message}</p>}
                </div>

                {/* Password Validation Component */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <PasswordValidation password={passwordFieldWatch} onPasswordValidity={onValidityChange} />
                </div>

                {/* Submit Button */}
                <div className=' mx-auto'>
                  <button type='submit' className=' w-full rounded-md mt-5 bg-black text-white py-2 shadow-lg outline-none '>
                    Sign Up
                  </button>
                </div>
                {/* Sign In Link */}
                <p className='text-center text-[12px] mt-10 cursor-pointer'>
                  Already have an account? <Link to="/signin"> <span className='text-red-700'>Sign In</span></Link>
                </p>
              </form>
            </div>
          ) : (
            <div className='mx-5 lg:flex lg:justify-between lg:px-16 lg:gap-16 rounded-md px-5 pb-5 sm:mx-16 md:mx-40 lg:mx-16 xl:mx-20  '>
              <div className='flex items-center'>
                <FiArrowLeft className='absolute top-10 left-10 lg:top-20 lg:left-20 ' onClick={handleRefresh} size={40} />
              </div>
              {/* Student Sign-Up Form (same as Teacher) */}
              <div className='hidden lg:block mt-10 bg-black px-5 pt-5 rounded-xl  text-white w-[50%] h-[61vh] '>
                <div className='h-52 xxl:h-60 overflow-hidden flex justify-center items-center rounded-lg'><img src={img} className='object-cover object-center h-full w-full' alt="" /></div>
                <h2 className='mt-5 text-[12px] xxl:text-[14px]  text-center'>A student's curiosity turns learning into a journey of discovery.</h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}
                className='lg:w-[50%]'
              >
                <h1 className='mt-10 mb-5 flex items-center gap-2 text-xl'>
                  Welcome <FaRegSmile />
                </h1>
                <div>
                  <label htmlFor="username" className='text-[14px]'>UserName</label>
                  <input
                    type="text"
                    placeholder='username'
                    id="username"
                    {...register('username', { required: 'username is required' })}
                    className=' outline-none pl-2  border text-xs py-2 w-full rounded-md'
                  />
                </div>
                <div className=''>
                  <label htmlFor="email" className='text-[14px]'>Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder='email'
                    {...register('email', { required: 'Email is required' })}
                    className=' outline-none pl-2  border text-xs py-2 w-full rounded-md'
                  />
                </div>
                <div className=''>
                  <label htmlFor="password" className='text-[14px]'>Password</label>
                  <input
                    type="password"
                    placeholder='password'
                    id="password"
                    {...register('password', { required: 'Password is required' })}
                    className='outline-none pl-2 border text-xs py-2 w-full rounded-md'
                  />
                </div>

                {/* Password Validation Component */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <PasswordValidation password={passwordFieldWatch} onPasswordValidity={onValidityChange} />
                </div>

                <div className=' mx-auto'>
                  <button type='submit' className=' w-full rounded-md mt-5 bg-black text-white py-2 shadow-lg outline-none '>
                    Sign Up
                  </button>
                </div>
                <p className='text-center text-[12px] mt-10 cursor-pointer'>
                  <Link to="/signin">Already have an account? <span className='text-red-700'>Sign In</span></Link>
                </p>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
