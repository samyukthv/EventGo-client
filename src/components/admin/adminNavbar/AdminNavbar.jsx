import React from "react";
import avathar from "../../../assets/images/avathar2.png";
import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <div className="h-screen bg-white relative flex overflow-hidden">
      <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
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
            <h1 className="font-bold text-3xl text-white mt-3 ">ADMIN DASHBOARD</h1>

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

        <main class="max-w-full h-full flex relative overflow-y-hidden">

           
        </main>
      </div>
    </div>
  );
}

export default AdminNavbar;
