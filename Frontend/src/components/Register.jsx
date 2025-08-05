import { useState } from 'react'
import loginimg from '../assets/loginimg.png';
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useAuth } from '../firebase/Authcontext';

const Register = () => {
  const [message, setMessage] = useState("")
  const { registerUser, signInWithGoogle } = useAuth()
  console.log(registerUser)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  //registeruser
  const onSubmit = async (data) => {
    console.log(data)
    try {
      await registerUser(data.email, data.password);
      alert("user register successfully")
    } catch (error) {
      setMessage("please provide a valid email and password")
      console.log(error)
    }
  }

  const handleGoogleSignIn = async () => {
try {
      await signInWithGoogle();
      alert("loginsuccessful");
      navigate("/")
    } catch (error) {
      alert("google loginerror")
      console.log(error)
    }
  }


  return (
    <div className="flex h-screen w-full">
      {/* Left image section */}
      <div className="hidden md:flex w-1/2">
        <img className="object-cover w-full h-full" src={loginimg} alt="Bookstore visual" />
      </div>

      {/* Right register form section */}
      <div className="flex w-full md:w-1/2 items-center justify-center">

        <form onSubmit={handleSubmit(onSubmit)} className="w-80 md:w-96 flex flex-col items-center">
          <h2 className="text-4xl  font-semibold">Create Account</h2>
          <p className="text-sm text-gray-500 mt-4 mb-8 text-center">
            Sign up now to get access to your bookstore account
          </p>

          {/* Email input */}
          <div className="flex items-center w-full border border-gray-300 h-12 rounded-full pl-6 gap-2 mt-5">
            <input
              {...register("email", { required: true })}
              type="email" name="email" id="email" placeholder="Email address"
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full" required />
          </div>

          {/* Password input */}
          <div
            {...register("password", { required: true })}
            className="flex items-center w-full border border-gray-300 h-12 rounded-full pl-6 gap-2 mt-5">
            <input type="password" name="password" id="password" placeholder="Password"
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full" required />
          </div>

          {/* Terms and Conditions */}
          <div className="w-full flex items-center mt-6 text-sm text-gray-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-indigo-500" required />
              I agree to the&nbsp;
              <a href="#" className="text-indigo-500 hover:underline">Terms & Conditions</a>
            </label>
          </div>

          {
            message && <p className='text-red-500 text-xs italic mb-2'>{message}</p>
          }

          {/* Register button */}
          <button type="submit" className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition">
            Register
          </button>

          {/* Divider */}
          <div className="flex items-center w-full my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Google sign-up */}
          <button
            onClick={handleGoogleSignIn}
            type="button" className="w-full flex items-center justify-center h-12 rounded-full bg-gray-100">
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="Google sign-up" />
          </button>

          {/* Already have an account */}
          <p className="text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <Link to="/Login" className="text-indigo-500 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

