import { useState } from 'react';
import loginimg from '../assets/loginimg.png';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useAuth } from '../firebase/Authcontext';

const Login = () => {
  const [message, setMessage] = useState("")
  const { loginUser, signInWithGoogle} = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      alert("login successfully");
      navigate("/")
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

      {/* Right login form section */}
      <div className="flex w-full md:w-1/2 items-center justify-center">

        <form onSubmit={handleSubmit(onSubmit)} className="w-80 md:w-96 flex flex-col items-center">
          <h2 className="text-4xl font-semibold">Sign in</h2>
          <p className="text-sm text-gray-500 mt-4 mb-8 text-center">
            Welcome back! Please sign in to continue to your bookstore
          </p>

          <div className="flex items-center w-full border border-gray-300 h-12 rounded-full pl-6 gap-2">
            <input
              {...register("email", { required: true })}
              type="email" name="email" id="email" placeholder="Email address"
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
              required />
          </div>

          <div className="flex items-center w-full border border-gray-300 h-12 rounded-full pl-6 gap-2 mt-5">
            <input
              {...register("password", { required: true })}
              type="password" name="password" id="password" placeholder="Password"
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
              required />
          </div>

          <div className="w-full flex items-center justify-between mt-6 text-sm text-gray-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-indigo-500" />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>
          {
            message && <p className='text-red-500 text-xs italic mb-2'>{message}</p>
          }
          <button type="submit" className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition">
            Login
          </button>

          <div className="flex items-center w-full my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            type="button" className="w-full flex items-center justify-center h-12 rounded-full bg-gray-100">
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="Google login" />
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Don’t have an account?{' '}
            <Link to="/Register" className="text-indigo-500 hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
