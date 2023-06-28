import React from 'react'
import bgimg from "../../assets/images/1f9bcc8e0cd6f1525f1c6a40ed6fbd88.jpg"

function LoginTest() {
  return (
    <div>
    <div>
      <div className="relative flex flex-row min-h-screen bg-no-repeat bg-cover justify-end overflow-hidden" style={{ backgroundImage: `url(${bgimg})` }}>
        <span className="text-3xl   mx-1 pt-2 text-purple-500"> <ion-icon name="finger-print-outline"></ion-icon></span>
        <span className="bg-gradient-to-r font-monoton text-2xl cursor-pointer mt-2 from bg-purple-500 to-pink-600 text-transparent bg-clip-text">
          EventGo
        </span>
        <div className="w-1/2 p-6 m-auto rounded-md shadow-md lg:max-w-xl border text-center border-purple-100 ">
          <h1 className="text-3xl font-semibold text-center text-purple-700">Register</h1>
          <form className="mt-6">
            <div className="mb-2">
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-800">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                className="w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="LastName" className="block text-sm font-semibold text-gray-800">
                Last name
              </label>
              <input
                type="text"
                name="LastName"
                className="w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                type="text"
                name="email"
                className="w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="phone_number" className="block text-sm font-semibold text-gray-800">
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                className="w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="confirm_pass" className="block text-sm font-semibold text-gray-800">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_pass"
                className="w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                Register
              </button>
            </div>
          </form>
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            Have an account?{" "}
            <button className="font-medium text-purple-600 hover:underline">Login</button>
          </p>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default LoginTest
