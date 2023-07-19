import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import { adminOrganizerEvents } from '../../../api/adminApi'
import avathar from "../../../assets/images/avathar2.png";


function OrganizerEvents() {
const params= useParams()
const evenId= params.id
 const[events,setEvents]=useState(null)
useEffect(()=>{
adminOrganizerEvents(evenId).then(res=>{
if(res.data.events){
    setEvents(res.data.events)
}
}).catch(err=>{
   console.log(err);
})
},[])


const logout = async (req, res) => {
  try {
    localStorage.removeItem("admintoken");
    nagivate("/admin/");
  } catch (error) {}
};


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

 </aside>

 

 <div class="w-full h-full flex flex-col justify-between">
   {/* <!-- Header --> */}
        <header class="h-16 w-full flex  relative justify-between px-5 space-x-10 bg-gray-800">
    <div className="font-monoton  text-2xl cursor-pointer flex items-center ">
            <span className="text-3xl  mr-1 pt-2  text-purple-500 ">
              {" "}
              <ion-icon name="finger-print-outline"></ion-icon>
            </span>
            <span className="bg-gradient-to-r  from bg-purple-500 to-pink-600 text-transparent bg-clip-text ">
              EventGo
            </span>
          </div>
          <h1 className="font-bold text-3xl text-white mt-3 ">
            ADMIN DASHBOARD
          </h1>
   <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full mt-2">
                  <img src={avathar} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52 bg-black"
              >
        
                <li>
                <a
                onClick={logout}>Logout</a>                </li>
              </ul>
            </div>
   </header>

   {/* <!-- Main --> */}
   <main class="max-w-full h-full flex relative overflow-y-hidden">
     {/* <!-- Container --> */}
     <div class="h-full w-full m-4 flex flex-wrap items-start justify-start rounded-tl grid-flow-col auto-cols-max gap-4 overflow-y-scroll">

     <div className="overflow-x-auto overflow-y-hidden">
        <h1 className='text-center font-bold text-2xl'>Organizer Events</h1>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 px-16 lg:px-10 mt-10 pb-10">

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

export default OrganizerEvents
