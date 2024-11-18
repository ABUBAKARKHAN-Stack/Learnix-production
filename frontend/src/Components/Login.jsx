import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import logo from '../assets/imgs/LogoText.png'
import { FaRegSmile } from 'react-icons/fa';
import { GiPartyPopper } from 'react-icons/gi'; 
import { MdSchool } from 'react-icons/md';
import { FaChalkboardTeacher } from 'react-icons/fa';

export function SignIn() {
    const {handleSubmit , register} = useForm()
    const[email,setEmail] = useState('')
    const[pass,setPass] = useState('')

   const onSubmit=(data) =>{
      console.log('your email is', data.email)
      console.log('your Pass is', data.pass)
   }

  return (
    <div className='  h-screen overflow-hidden pt-12'>
      <div className=' mx-5  rounded-md px-5 pb-5'>
      <form onSubmit={handleSubmit((data)=>{
            setEmail(data.email)      
            setPass(data.pass)
            onSubmit(data)
      })}
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
      {...register('email',{required:'Email is required'})} 
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
      {...register('pass',{required:'Password is required'})} 
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

export function SignUp(){
    const {handleSubmit , register} = useForm()
    const[email,setEmail] = useState('')
    const[user,setUser]= useState('')
    const[pass,setPass] = useState('')
    const[teacher, setTeacher] = useState(false)
    const[option, setOption] = useState(true)

    const handleStudent=()=>{
     setTeacher(false)
     setOption(false)
    }
    const handleTeacher=()=>{
        setTeacher(true)
        setOption(false)
       }

       const onSubmit=(data) =>{
        console.log('your email is', data.email)
        console.log('your Pass is', data.pass)
        console.log('your username is', data.username)
     }

    return(
        <div className=''> 
        <img src={logo} className='w-[120px] mx-auto mt-5 h-auto' alt="" />
        { option ?<>
            <h1 className='text-center mt-20 font-medium flex mx-auto w-fit items-center gap-3 text-[30px]'>Join Us <GiPartyPopper/> </h1>
          <div className='flex flex-col justify-center items-center mt-20 mx-16 gap-5'>
          <div onClick={handleStudent} className='bg-white flex items-center cursor-pointer gap-2 border-4 rounded-3xl w-full p-2 '>
             Student <MdSchool />
          </div>
          <div onClick={handleTeacher} className='bg-black border-4 flex items-center gap-2 cursor-pointer border-black text-white p-2 rounded-3xl w-full '>
            Teacher <FaChalkboardTeacher />
          </div>
       </div></>
    : null
        } 

{!option && (
                <div>
                    {teacher ? (
                        <div className='mx-10'>
                            <form onSubmit={handleSubmit((data)=>{
            setEmail(data.email)      
            setPass(data.pass)
            onSubmit(data)
      })}
      >
              <h1 className='mt-10 mb-5 flex items-center gap-2 text-xl'>Welcome<FaRegSmile /></h1>
              <div>
                                    <label htmlFor="username" className='text-[14px]'>UserName</label>
                                    <input
                                        type="text"
                                        id="username"
                                        {...register('username', { required: 'username is required' })}
                                        className=' outline-none pl-2  border text-xs py-2 w-full rounded-md'
                                    />
                                </div>
        <div className=' '>
        <label htmlFor="email" className='text-[14px]'>
        Email
      </label>
      <input type="email" 
      id="email"
      placeholder='email'
      {...register('email',{required:'Email is required'})} 
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
      {...register('pass',{required:'Password is required'})} 
      className='outline-none pl-2 border text-xs py-2 w-full rounded-md'
      />
      </div>
      <div className=' mx-auto'>
      <button type='submit' className=' w-full rounded-md mt-5 bg-black text-white py-2 shadow-lg outline-none ' >
        Sign Up
      </button> 
      </div>
      <p className='text-center text-[12px] mt-10 cursor-pointer'><Link to="/signin">Already have an account? <span className='text-red-700'>
      Sign In </span></Link></p>
      
      </form>
                        </div>
                    ) : (
                        <div className=' mx-5  rounded-md px-5 pb-5'>
      <form onSubmit={handleSubmit((data)=>{
            setEmail(data.email)      
            setPass(data.pass)
            onSubmit(data)
      })}
      >
              <h1 className='mt-10 mb-5 flex items-center gap-2 text-xl'>Welcome<FaRegSmile /></h1>
              <div>
                                    <label htmlFor="username" className='text-[14px]'>UserName</label>
                                    <input
                                        type="text"
                                        id="username"
                                        {...register('username', { required: 'username is required' })}
                                        className=' outline-none pl-2  border text-xs py-2 w-full rounded-md'
                                    />
                                </div>
        <div className=' '>
        <label htmlFor="email" className='text-[14px]'>
        Email
      </label>
      <input type="email" 
      id="email"
      placeholder='email'
      {...register('email',{required:'Email is required'})} 
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
      {...register('pass',{required:'Password is required'})} 
      className='outline-none pl-2 border text-xs py-2 w-full rounded-md'
      />
      </div>
      <div className=' mx-auto'>
      <button type='submit' className=' w-full rounded-md mt-5 bg-black text-white py-2 shadow-lg outline-none ' >
        Sign Up
      </button> 
      </div>
      <p className='text-center text-[12px] mt-10 cursor-pointer'><Link to="/signin">Already have an account? <span className='text-red-700'>
      Sign In </span></Link></p>
      
      </form>
      </div>
                    )}
                </div>
            )} 

        </div>
    )
}