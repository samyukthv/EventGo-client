import React, { useEffect, useState } from "react";
import avathar from "../../../assets/images/avathar2.png";
import { Link } from "react-router-dom";
import { allOrganizers, blockOrganizer, unBlockOrganizer } from "../../../api/adminApi";
import { toast } from "react-hot-toast";

function OrganizerList() {
  const [organizers, setOrganizers] = useState([]);
  const [isBlocked,setIsBlocked]=useState(false)


  useEffect(() => {
    allOrganizers()
      .then((res) => {
        setOrganizers(res.data.organizerList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isBlocked]);


  const organizerBlock= async(organizerId)=>{
    blockOrganizer(organizerId).then(res=>{
      if(res.data.blocked){
        toast.error("user blocked successfully")
        setIsBlocked(true);
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  const organizerUnblock= async(organizerId)=>{
    unBlockOrganizer(organizerId).then(res=>{
      if(res.data.unblock){
        toast.success("user unblocked successfully")
        setIsBlocked(false);
       
      }
    }).catch(err=>{
      console.log(err);
    })
  }
  return (
    <div>
      <div className="h-screen bg-white relative flex overflow-hidden">
        <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
          <Link to="/admin/home">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
              <i class="fa-solid fa-house-chimney"></i>
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
          <Link to="/admin/banner-setup">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
              <i class="fa-solid fa-calendar-days"></i>
            </div>
          </Link>
        </aside>

        <div class="w-full h-full flex flex-col justify-between">
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
                  <Link to="/profile">
                    {" "}
                    <a className="justify-between">Profile</a>
                  </Link>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </header>

          <main class="max-w-full h-full flex relative justify-evenly items-center overflow-y-hidden">
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
              <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900 text-center"
                    >
                      S.No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900 text-center"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900 text-center"
                    >
                      email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900 text-center"
                    >
                      Bookings
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900 text-center"
                    >
                      Block
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {organizers.map((details, index) => (
                    <tr className="hover:bg-gray-50">
                      <th className="text-center">{index + 1}</th>
                      <th className="flex gap-3  px-6 py-4 font-normal text-gray-900">
                        <div className="relative h-10 w-10">
                          <img
                            className="h-full w-full rounded-full object-cover object-center"
                            src={
                              details?.image?.slice(0, 33) ===  
                              "https://lh3.googleusercontent.com"
                                ? details?.image
                                : details?.image
                                ? `${details?.image}`
                                : avathar
                            }
                            alt=""
                          />
                        </div>
                        <div className="text-sm">
                          <div className="font-medium text-gray-700">
                            {details.firstName + " " + details.lastName}
                          </div>
                          <div className="text-gray-400">
                            {"+91 " + details.mobile}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{details.email}</td>
                      <button
                        type="button"
                        className=" mb-7 inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                      >
                        Success
                      </button>{" "}
                      <td className="px-6 py-4">
                      {details.isBlocked?<button
                       onClick={()=>organizerUnblock(details._id)}
                        type="button"
                        className=" mt-1 inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                      >
                        Unblock
                      </button>:
                      <button
                      onClick={()=>organizerBlock(details._id)}
                      type="button"
                      class="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                      Block
                    </button>
                      }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default OrganizerList;
