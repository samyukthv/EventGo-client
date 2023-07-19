import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { organizerEvent } from '../../api/UserApi';

import img from "../../assets/images/fg.jpg";


function OrganizerEvents() {
    const params = useParams();
    const organizerId = params.id;
    const[events,setEvent]=useState(null)
    console.log(organizerId,"thtiehtiehteitneitnententeintentneinenter");
     useEffect(()=>{
        organizerEvent(organizerId).then(res=>{
            console.log(res.data.eventDetails);
            setEvent(res.data.eventDetails)
        }).catch(err=>{
            console.log(err);
        })
     },[])
  return (
    <>
    
    {events?.length===0?
    
    
    
    <div
    className="w-full sm:w-full h-72 bg-black mx-10 flex justify-center items-center font-bold text-3xl"
    style={{
      backgroundImage: `url(${img})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <h1>Sorry, This organizer dosen't have any events😢</h1>
  </div>
    
    
    :<div className="grid grid-cols-1 sm:grid-cols-2 my-5 md:grid-cols-3 px-16 lg:grid-cols-4 gap-20 lg:px-10">
    {events?.map((event) => (
      <div key={event._id} className="bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center justify-center h-full p-4">
          <img className="mb-4" src={event.image} alt="" />

          <h5 className="font-bold pt-2 tracking-tight ml-2 text-gray-900 dark:text-white">
            {event.eventName}
          </h5>

          <p className="font-normal text-blue-700 px-2 text-center dark:text-gray-400">
            {event.description}
          </p>

          <button
            type="button"
            className="inline-block items-center my-3 rounded-full border-2 border-info px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-info transition duration-150 ease-in-out hover:border-info-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-info-600 focus:border-info-600 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
          >
            View Details
          </button>
        </div>
      </div>
    ))}
  </div>}
    </>
  )
}

export default OrganizerEvents
