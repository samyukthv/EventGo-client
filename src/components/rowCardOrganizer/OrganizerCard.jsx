import React,{useState,useEffect} from 'react'
import avatar from "../../assets/images/avathar2.png"
import { useSelector } from 'react-redux'
import {getOrganizerDetails} from "../../api/UserApi"
import { Link } from 'react-router-dom'

function OrganizerCard(props) {
  const[ organizer,setOrganizer]=useState([])
console.log(props,12222222);
useEffect(()=>{
  const resp=getOrganizerDetails().then((response)=>{
    
    setOrganizer(response.data.organizerFind)
   })
},[]) 

  return (
    <div>
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 px-16 lg:grid-cols-4 gap-36 lg:px-16">
    
        {organizer.map((data) => (
        <div key={data._id} className="bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center justify-center h-full p-4">
            <img className="rounded-full mb-4 h-28" src={avatar} alt="" />

            <h5 className="font-bold pt-2 tracking-tight ml-2 text-gray-900 dark:text-white">
              {data.firstName}
            </h5>

            <p className="font-normal text-blue-700 px-2 text-center dark:text-gray-400">
             
            </p>

           <Link to=''><button
              type="button"
              className="inline-block items-center my-3 rounded-full border-2 border-info px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-info transition duration-150 ease-in-out hover:border-info-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-info-600 focus:border-info-600 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              data-te-ripple-init
            >
              view details
            </button></Link>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default OrganizerCard
