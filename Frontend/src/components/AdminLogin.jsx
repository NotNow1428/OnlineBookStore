import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import axois from "axios"
import getBaseUrl from '../utils/baseURL'
import { useNavigate } from 'react-router-dom'
const AdminLogin = () => {
  const [message, setMessage] = useState("")
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await axois.post(`${getBaseUrl()}/api/auth/admin`, data, {
        headers:{
          'Content-Type': 'application/json',
        }
      })
      const auth = response.data;
      console.log(auth)
      if(auth.token){
        localStorage.setItem('token', auth.token);
        setTimeout(() => {
          localStorage.removeItem('token')
          alert('token has been expired, ReLogin please')
          navigate("/")

        },3600*1000)
      }
      // alert("Admin Login Successful")
      navigate("/dashboard")
    } catch (error) {
      setMessage("Please provide a valid email and password")
      console.error(error)
    }
  }

  return (
    <div className='h-screen flex justify-center items-center '>
      <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-xl font-semibold mb-4 text-gray-700'>Admin Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">username</label>
            <input
              {...register("username", { required: true })}
              type="text" name="username" id="username" placeholder='username'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow text-black'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
            <input
              {...register("password", { required: true })}
              type="password" name="password" id="password" placeholder='Password'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow text-black'
            />
          </div>
          {
            message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
          }
          <div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Login </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
