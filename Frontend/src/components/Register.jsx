import React from 'react'
import loginimg from '../assets/loginimg.png';
const Register = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Left image section */}
      <div className="hidden md:flex w-1/2">
        <img
          className="object-cover w-full h-full"
          src={loginimg}
          alt="Bookstore visual"
        />
      </div>

      {/* Right register form section */}
      <div className="flex w-full md:w-1/2 items-center justify-center">
        <form className="w-80 md:w-96 flex flex-col items-center">
          <h2 className="text-4xl text-gray-900 font-semibold">Create Account</h2>
          <p className="text-sm text-gray-500 mt-4 mb-8 text-center">
            Sign up now to get access to your bookstore account
          </p>

          {/* Name input */}
          <div className="flex items-center w-full border border-gray-300 h-12 rounded-full pl-6 gap-2">
            <input
              type="text"
              placeholder="Full Name"
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
              required
            />
          </div>

          {/* Email input */}
          <div className="flex items-center w-full border border-gray-300 h-12 rounded-full pl-6 gap-2 mt-5">
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
              required
            />
          </div>

          {/* Password input */}
          <div className="flex items-center w-full border border-gray-300 h-12 rounded-full pl-6 gap-2 mt-5">
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
              required
            />
          </div>

          {/* Confirm Password input */}
          <div className="flex items-center w-full border border-gray-300 h-12 rounded-full pl-6 gap-2 mt-5">
            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
              required
            />
          </div>

          {/* Terms and Conditions */}
          <div className="w-full flex items-center mt-6 text-sm text-gray-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-indigo-500" required />
              I agree to the&nbsp;
              <a href="#" className="text-indigo-500 hover:underline">Terms & Conditions</a>
            </label>
          </div>

          {/* Register button */}
          <button
            type="submit"
            className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition"
          >
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
            type="button"
            className="w-full flex items-center justify-center h-12 rounded-full bg-gray-100"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="Google sign-up"
              className="h-5 w-5 mr-2"
            />
            <span className="text-sm text-gray-700">Sign up with Google</span>
          </button>

          {/* Already have an account */}
          <p className="text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <a href="/Login" className="text-indigo-500 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

