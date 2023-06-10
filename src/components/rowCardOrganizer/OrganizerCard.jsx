import React,{useState} from 'react'
import avatar from "../../assets/images/avathar2.png"
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import {getOrganizerDetails} from "../../api/UserApi"

function OrganizerCard() {
    const[org,setOrg]=useState([])
   
  useEffect(() => {
    getOrganizerDetails()
      .then((result) => {
        console.log(result, 90909);
        setOrg(result.data.organizerFind); // Set organizerFind data to org state
        console.log(org, 80808);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 px-16 lg:grid-cols-4 gap-36 lg:px-16">
    
        {org.map((data) => (
        <div key={data._id} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center justify-center h-full p-4">
            <img className="rounded-lg mb-4" src={avatar} alt="" />

            <h5 className="font-bold pt-2 tracking-tight ml-2 text-gray-900 dark:text-white">
              {org.firstName}
            </h5>

            <p className="font-normal text-blue-700 px-2 text-center dark:text-gray-400">
             
            </p>

           <button
              type="button"
              className="inline-block items-center my-3 rounded-full border-2 border-info px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-info transition duration-150 ease-in-out hover:border-info-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-info-600 focus:border-info-600 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              data-te-ripple-init
            >
              view details
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default OrganizerCard
