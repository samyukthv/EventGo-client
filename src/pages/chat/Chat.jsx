import React,{useEffect,useState,useRef} from "react";
import Navbar from "../../components/navbar/Navbar";
import avatar from "../../assets/images/avathar2.png";
import { useParams } from "react-router-dom";
import cover from "../../assets/images/chatbg.jpg";
import ChatContainer from "../../components/chatComponent/ChatContainer";
import {io} from 'socket.io-client'
import { useSelector } from "react-redux";
const URL = import.meta.env.VITE_USER_API;



function Chat() {
  const socket=useRef()
  const userData = useSelector(state => state.user)
useEffect(()=>{
if(userData.id){
  socket.current=io(URL)
  console.log(userData.id);
  socket.current.emit("add-user",userData.id)
}
},[])

  const params = useParams();
  const sender = params.id;

  return (
  <>
 { sender && <ChatContainer sender={sender} socket={socket}/>}
  </>
  );
}

export default Chat;
