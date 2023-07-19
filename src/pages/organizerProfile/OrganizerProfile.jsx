import Navbar from "../../components/navbar/Navbar";
import React,{useEffect,useState} from 'react'
import { useParams } from "react-router-dom";



import OrganizerPro from "./OrganizerPro";
import OrganizerPostsUserSide from "../../components/organizerPostUserSide.jsx/OrganizerPostsUserSide";
import OrganizerEvents from "../../components/organizerEvents/OrganizerEvents";
import Spinner from "../../components/spinner/Spinner";

function OrganizerProfile() {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
  }, []);
  
  const Tabs = () => {
    const params = useParams();
    const organizerId = params.id;
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
                 
               <OrganizerPostsUserSide/>
                </div>
                <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
               <OrganizerEvents/>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
 <>
    {showSpinner ? <Spinner/> :<div>
    <Navbar />
      <OrganizerPro />
      <Tabs />
      </div>}
    </>
  );
}

export default OrganizerProfile;
