import Navbar from "../../components/navbar/Navbar";
import React,{useEffect,useState} from 'react'


import OrganizerPosts from "../../components/organizer/posts/OrganizerPosts";
import OrganizerPro from "./OrganizerPro";
import OriginalPosts from "../../components/organizer/orginalPost/OriginalPosts";

function OrganizerProfile() {


  const Tabs = () => {
    const [openTab, setOpenTab] = useState(1);
  
    return (
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row  " role="tablist">
            <li className="-mb-px mr-2 last:mr-0 flex-auto justify-center  text-center">
              <a
                className={`text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal justify-center items-center  ml-5 ${
                  openTab === 1 ? 'text-black bg-blue-300' : 'text-blue-600 bg-white'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                role="tab"
              >
              Posts
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={`text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal justify-center items-center mr-5 ${
                  openTab === 2 ? 'text-black bg-blue-300' : 'text-blue-600 bg-white'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                role="tab"
              >
                Events
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
               <OriginalPosts/>
                </div>
                <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
                <OrganizerPosts/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Navbar />
      <OrganizerPro />
      <Tabs />

     
    </div>
  );
}

export default OrganizerProfile;
