import React from 'react'
import {Link} from'react-router-dom'
import signupimg from "../../assets/images/juliette-contin-aETBbsCWBpo-unsplash.jpg";


function UserLogin() {
  return (
    <section className="p-20 h-screen bg-gradient-to-r from-fuchsia-200 to-violet-300 flex flex-col pt-10 px-20 justify-between">
     <div className="w-full  h-full flex items-center justify-center">
    <div className="hidden md:block relative w-1/2 h-full flex-col">
    <div className="absolute top-[15%] flex flex-col items-center">
  <h1 className="text-4xl text-black font-bold my-3 text-center">
    Unlock unforgettable experiences.
  </h1>
  <p className="text-xl text-white font-normal text-center">
    Sign in and secure your spot at the hottest events with our seamless ticket booking platform.
  </p>
 
</div>
        <img src={signupimg} alt="Login" className="w-full h-full object-cover" />
      </div>

      <div className="w-1/2 h-full bg-gradient-to-r from-fuchsia-200 to-violet-200 flex flex-col  p-20 justify-between" >
      
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col mb-2 max-w-[450px]">
            <h3 className="text-3xl font-bold mb-2">Verify otp</h3>
            <p className="text-base mb-2">Welcome to EventGo, Please verify your account</p>
   
          </div>

          <div className="w-full flex flex-col pt-10">

            
            <input type="text" placeholder="verify otp" className="w-full text-black py-1 my-2 border-b bg-transparent border-black outline-none focus:outline-none" />


          
          </div>


          <div className="w-full flex flex-col pt-10">
            <button className="text-white w-full bg-violet-500 hover:bg-violet-700 rounded-md p-4 mt-5 text-center flex items-center justify-center">verify</button>

           

            
          </div>
        </div>
      </div>
    </div>
 </section>
  )
}

export default UserLogin
