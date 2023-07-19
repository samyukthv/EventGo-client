import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div>
        
    <main class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
    <div className="font-monoton  text-2xl cursor-pointer flex items-center ">
                <span className="text-6xl  mr-1 pt-2  text-purple-500 ">
                  {" "}
                  <ion-icon name="finger-print-outline"></ion-icon>
                </span>
                <span className="bg-gradient-to-r text-6xl  from bg-purple-500 to-pink-600 text-transparent bg-clip-text ">
                  EventGo
                </span>
              </div>
        <h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
        <div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
            Page Not Found
        </div>
        <Link to="/admin/home">
        <button class="mt-5">
          <a
            class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
          >
            <span
              class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
            ></span>
    
            <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
              Go Home
            </span>
          </a>
        </button>
        </Link>
    </main>
        </div>
  )
}

export default PageNotFound
