import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='shadow-md w-full  top-0 left-0 z-50'>
    <div className='md:flex bg-white py-5 md:px-10 px-7'>
       <div className='font-bold text-2xl cursor-pointer flex items-center' >
       <span className='text-3xl text-indigo-600 mr-1 pt-2'><ion-icon name="finger-print-outline"></ion-icon></span>
       EventGo
        </div> 
        <div className='flex  '>
        <h1 className='mt-3 ml-8 text-center font-bold'>Welcome Organizer</h1>
        <ul  className='hidden sm:flex px-4'>
        <li className='p-3'>
                    <a href="/">Profile</a>
                </li>
                <li  className='p-3'>
                    <Link to="">Add post </Link>
                </li>
                <li  className='p-3'>
                    <a href="#jhghj">My Event</a>
                </li>
                <li  className='p-3'>
                    <a href="#jj">About</a>
                </li> 
            
            </ul> 
        
        </div>
        <div className='flex ml-auto '>
            <span className='text-2xl  mr-6 pt-3'><ion-icon name="notifications-outline"></ion-icon></span>
        <button
  type="button"
  class="inline-block  rounded-full border-2 border-blue-600 px-6  text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:border-blue-500 hover:bg-blue-900 hover:bg-opacity-10 hover:text-black focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
  data-te-ripple-init>
 <Link to='/choose_account'> Log in</Link>
</button>

        </div>


    </div>
   
   
   </div>
  )
}

export default Navbar
