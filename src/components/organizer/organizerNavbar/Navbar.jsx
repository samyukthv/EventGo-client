import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useSelector} from "react-redux"
import { organizerLogout } from '../../../redux/organizerSlice';
import {useDispatch} from 'react-redux'

function Navbar() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
const organizer=useSelector((state)=>state.organizer)

const logout=async(req,res)=>{
  try {
   
    localStorage.removeItem('organizertoken')
    dispatch(organizerLogout());
    navigate('/organizer/')
  } catch (error) {
    
  }
}




  return (
<div className="shadow-md w-full top-0 left-0 z-50">
  <div className="md:flex bg-white py-5 md:px-10 px-7">
    <div className="font-bold text-2xl cursor-pointer flex items-center">
      <span className="text-3xl text-indigo-600 mr-1 pt-2">
        <ion-icon name="finger-print-outline"></ion-icon>
      </span>
      EventGo
    </div>
    <div className="flex flex-grow justify-center md:justify-start">
      <h1 className="mt-3 md:ml-8 text-center md:text-left font-bold">
        Welcome {organizer.firstName}
      </h1>
      <ul className="hidden sm:flex px-4">
       <li className="p-3">
          <Link to="/organizer/home">Profile</Link>
        </li>
        <li className="p-3">
          <Link to="/organizer/add-event">Add Events</Link>
        </li>
        <li className="p-3">
          <a href="#jhghj">My Event</a>
        </li>
        <li className="p-3">
          <a href="#jj">About</a>
        </li>
      </ul>
    </div>
    <div className="flex ml-auto">
      <span className="text-2xl mr-6 pt-3">
        <ion-icon name="notifications-outline"></ion-icon>
      </span>
      <button  onClick={logout}
        type="button"
        className="inline-block rounded-full border-2 border-blue-600 px-6 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:border-blue-500 hover:bg-blue-900 hover:bg-opacity-10 hover:text-black focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
        data-te-ripple-init
      >
       Logout
      </button>
    </div>
  </div>
</div>

  )
}

export default Navbar
