import React,{useState,useEffect,useRef} from 'react'
import ChatSideBar from '../../../components/organizer/chatSection/ChatSideBar'
import ChatBody from '../../../components/organizer/chatSection/ChatBody'
import { useSelector } from "react-redux";
import {io} from 'socket.io-client'
const URL = import.meta.env.VITE_USER_API;
import img from "../../../assets/images/avathar2.png"
import { Link } from 'react-router-dom';

const ORGANIZER_PROFILE_URL = import.meta.env.VITE_ORGANIZER_PROFILE_URL;


function Chat() {
  const socket=useRef()

  const organizer = useSelector(state => state.organizer)
  const [sender,setSender] = useState({})


useEffect(()=>{
  if(organizer.id){
    console.log("orgnizer side added to socket");
    socket.current=io(URL)
    socket.current.emit("add-user",organizer.id)
  }
},[sender])
  return (
    <div>
    <div class="flex h-screen antialiased text-gray-800">
    <div class="flex flex-row h-full w-full overflow-x-hidden">
      <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
      <div className="font-monoton  text-2xl cursor-pointer flex items-center bg-white">
          <span className="text-3xl  mr-1 pt-2  text-purple-500 "> <ion-icon name="finger-print-outline"></ion-icon></span>
          <span className="bg-gradient-to-r  from bg-purple-500 to-pink-600 text-transparent bg-clip-text ">
          EventGo
          </span>
        </div>
   <Link to="/organizer/home">
   <div
          class="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
        >
          <div class="h-20 w-20 rounded-full border overflow-hidden">
            <img
              src={
                organizer.image.slice(0, 33) ===
                "https://lh3.googleusercontent.com"
                  ? organizer.image
                  : organizer.image
                  ? `${organizer.image}`
                  : img
              }
              class="h-full w-full"
            />
          </div>
          <div class="text-sm font-semibold mt-2">{organizer?.firstName}</div>
         
        </div>
   </Link>
        <ChatSideBar setSender={setSender} socket={socket} />
      </div>
{    sender.id && <ChatBody  sender={sender} socket={socket}/>
}    </div>
  </div>
    </div>
  )
}

export default Chat
