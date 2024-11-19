import React, { useState } from 'react'
import { GiPartyPopper } from 'react-icons/gi';
import { MdSchool } from 'react-icons/md';
import { FaChalkboardTeacher, FaRegSmile } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { useForm } from 'react-hook-form'
import logo from '../assets/imgs/LogoText.png'
import img from '../assets/imgs/loginImage.webp'
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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
      setLoading(true);
      const res = await signUpUser(formData); // API call to sign up the user
      console.log(res.data);
      alert(res.data?.message);
      if (res.status === 201) {
        navigate('/signin');
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
      // Handle error response
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again.';
      alert(errorMessage);
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
      <img src={logo} className='w-[120px] mx-auto mt-5 h-auto' alt="" />

      {/* Option Selection: Teacher or Student */}
      {option ? <>
        <h1 className='text-center mt-20 font-medium flex mx-auto w-fit items-center gap-3 text-[30px]'>
          Join Us <GiPartyPopper />
        </h1>
        <div className='flex flex-col justify-center items-center mt-20 mx-16 gap-5'>
          {/* Student Option */}
          <div onClick={handleStudent} className='bg-white flex items-center cursor-pointer gap-2 border-4 rounded-3xl w-full p-2 '>
            Student <MdSchool />
          </div>

          {/* Teacher Option */}
          <div onClick={handleTeacher} className='bg-black border-4 flex items-center gap-2 cursor-pointer border-black text-white p-2 rounded-3xl w-full '>
            Teacher <FaChalkboardTeacher />
          </div>
        </div>
      </> : null}


      {/* Form Section */}
      {!option && (
        <div>
          {teacher ? (
            <div className='mx-10'>
              {/* Teacher Sign-Up Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
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

                <div className='mx-auto'>
                  <button
                    disabled={loading ? true : false}
                    type='submit'
                    className='w-full rounded-md mt-5 transition-opacity duration-200 ease-linear bg-black text-white disabled:cursor-not-allowed disabled:opacity-50 py-2 shadow-lg outline-none'>
                    Sign Up
                  </button>
                </div>
                {/* Sign In Link */}
                <p className='text-center text-[12px] mt-10 cursor-pointer'>
                  <Link to="/signin">Already have an account? <span className='text-red-700'>Sign In</span></Link>
                </p>
              </form>
            </div>
          ) : (
            <div className=' mx-5  rounded-md px-5 pb-5'>
              {/* Student Sign-Up Form (same as Teacher) */}
              <form onSubmit={handleSubmit(onSubmit)}>
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
      )}

    </div>
  )
}
