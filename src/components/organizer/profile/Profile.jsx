import React from "react";
import dp from "../../../assets/images/avathar2.png";

function Profile() {
  return (
<div className="mt-18 bg-blue-100">
  <div className="flex flex-col sm:flex-row w-full h-[80vh]">
    <div className="w-full sm:w-1/2 h-full mt-36 flex flex-col items-center">
      <div className="flex pl-6 md:pl-8 mt-[-20px]">
        <img src={dp} className="w-48 sm:w-64 h-48 sm:h-64 rounded-full object-cover" />
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-xl ml-4 sm:ml-10 font-bold ">Username</h2>
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-xl ml-4 sm:ml-10 ">About In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</h2>
      </div>
    </div>
    <div className="w-full sm:w-1/2 mt-20">
      <div className="w-full mt-20 flex flex-col sm:flex-row h-28 pt-5 justify-evenly">
        <div className="text-center">
          <h1 className="font-bold">200k</h1>
          <p>Followers</p>
        </div>
        <div className="text-center">
          <h1 className="font-bold">5</h1>
          <p>Posts</p>
        </div>
        <div className="text-center">
          <h1 className="font-bold">50000</h1>
          <p>Revenue</p>
        </div>
        <div className="text-center">
          <h1 className="font-bold">3</h1>
          <p>Total events conducted</p>
        </div>
      </div>
      <div className="flex justify-center mt-6 sm:mt-10">
        <button
          type="button"
          className="inline-block rounded-full  bg-primary px-6 pb-2 mt-4 sm:mt-10 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Messages
        </button>
      </div>
    </div>
  </div>
</div>

  
  );
}

export default Profile;
