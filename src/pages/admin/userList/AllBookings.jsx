import React, { useEffect, useState } from 'react'
import { useParams ,Link} from 'react-router-dom'
import { allUserEvents } from '../../../api/adminApi'
import RowCards from '../../../components/admin/Cards/RowCards'

function AllBookings() {
    const params= useParams()
    const userId= params.id
    const[events,setEvents]=useState(null)

    useEffect(()=>{
        console.log("yuio");
        allUserEvents(userId).then(res=>{
            console.log(res,789);
       if(res.data.eventDetails){
        console.log("eee");
      setEvents(res.data.eventDetails)

       }
        }).catch(err=>{
            console.log(err);
        })
    },[])

    console.log(events);
  return (
    <div>
     {/* <!-- component --> */}
<div class="h-screen w-full bg-white relative flex overflow-hidden">

  {/* <!-- Sidebar --> */}
  <aside class="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
  <Link to="/admin/home">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <i className="fa-solid fa-house-chimney"></i>
          </div>
        </Link>

        <Link to="/admin/user-list">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </Link>

        <Link to="/admin/organizer-list">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        </Link>

        <Link to="/admin/banner-setup">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <i className="fa-solid fa-image"></i>
          </div>
        </Link>
        <Link to="/admin/event-list">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <i className="fa-solid fa-calendar-days"></i>
          </div>
        </Link>
  </aside>

  
 
  <div class="w-full h-full flex flex-col justify-between">
    {/* <!-- Header --> */}
    <header class="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800">
      {/* <!-- Informação --> */}
      <div class="flex flex-shrink-0 items-center space-x-4 text-white">
        
        {/* <!-- Texto --> */}
        <div class="flex flex-col items-end ">
          {/* <!-- Nome --> */}
          <div class="text-md font-medium ">Unknow Unknow</div>
          {/* <!-- Título --> */}
          <div class="text-sm font-regular">Student</div>
        </div>
        
        {/* <!-- Foto --> */}
        <div class="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400"></div>
      </div>
    </header>

    {/* <!-- Main --> */}
    <main class="max-w-full h-full flex relative overflow-y-hidden">
      {/* <!-- Container --> */}
      <div class="h-full w-full m-4 flex flex-wrap items-start justify-start rounded-tl grid-flow-col auto-cols-max gap-4 overflow-y-scroll">

      <div className="overflow-x-auto overflow-y-hidden">
         <h1 className='text-center font-bold text-2xl'>All bookings</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 px-16 lg:px-10">

      {events?.map((data) => (
        <div key={data._id} className=" border border-gray-200 rounded-md  dark:border-gray-700 shadow-2xl transform hover:scale-105 transition duration-500">
          <div className="flex flex-col items-center justify-center h-full p-4">
            <img className="mb-4" src={ data.image} alt="" />
            <h5 className="font-bold pt-2 tracking-tight ml-2 text-gray-900 dark:text-white">
              {data.eventName}
            </h5>
            <p className="font-normal text-blue-700 px-2 text-center dark:text-gray-400">
              {data.description}
            </p>
            <Link to={`/admin/eventDetails/${data._id}`}>
              <button
                type="button"
                className="inline-block items-center my-3 rounded-full border-2 border-info px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-info transition duration-150 ease-in-out hover:border-info-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-info-600 focus:border-info-600 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                data-te-ripple-init
              >
                view details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
  

        {/* <!-- Container --> */}
         {/* <RowCards props={events}/> */}
        {/* <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div> */}
      </div>
    </main>
  </div>

</div>
    </div>
  )
}

export default AllBookings
