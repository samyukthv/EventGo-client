import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { addMessage, getAllMessages, senderDetails } from "../../api/UserApi";
const ORGANIZER_PROFILE_URL = import.meta.env.VITE_ORGANIZER_PROFILE_URL;
import img from "../../assets/images/avathar2.png";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
const PROFILE_URL = import.meta.env.VITE_PROFILE_URL;


function ChatContainer({ sender, socket }) {
  const userData = useSelector((state) => state.user);
  const [organizerDetails, setOrganizerDetails] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [msgSent, setMsgSent] = useState(false);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const scrollRef = useRef();

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (present, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };
  
  const sendMessage = (e) => {
    e.preventDefault();
    console.log('send-msg emit in chatContainer');
    socket.current.emit("send-msg", {
      to: sender, 
      from: userData.id,
      msg: msg,   
    });
    addMessage(userData.id, sender, msg)
      .then((res) => {
        setMsgSent((prevState) => !prevState);
        setMsg("");
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
      })
      .catch((err) => { 
        console.log(err);
      });
  };

  useEffect(() => {
    if (sender && userData.id) {
      getAllMessages(userData.id, sender).then(({ data: { messages } }) => {
        setMessages(messages);
      });
    }
  }, [msgSent, sender, userData.id]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        console.log("msg-receive chat container");
        setArrivalMsg({ fromSelf: false, message: msg ,time: "just now" });
      });
    }
  }, [socket.current]);


  // useEffect(() => {
  //   console.log('soket is', socket.current);
  //   if (socket.current) {
  //      console.log("msg received frontend");
  //       socket.current.on("msg-receive", ( msg) => {
         
  //         setArrivalMsg({ fromSelf: false, message: msg ,time: "just now" });
  //       });
     
  //   }
  // }, [socket]);

  useEffect(() => {
    senderDetails(sender)
      .then((result) => {
        setOrganizerDetails(result.data.senderDetails);
      })
      .catch((err) => {});
  }, []);
 
  
  

  useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="font-monoton  text-2xl cursor-pointer flex items-center bg-white">
            <span className="text-3xl  mr-1 pt-2  text-purple-500 ">
              {" "}
              <ion-icon name="finger-print-outline"></ion-icon>
            </span>
            <span className="bg-gradient-to-r  from bg-purple-500 to-pink-600 text-transparent bg-clip-text ">
              EventGo
            </span>
          </div>
     <Link to={`/organizer-profile/${organizerDetails ? organizerDetails._id : null}`}>
     <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div className="h-20 w-20 rounded-full border overflow-hidden">
              <img
                src={
                  organizerDetails?.image.slice(0, 33) ===
                  "https://lh3.googleusercontent.com"
                    ? organizerDetails?.image
                    : organizerDetails?.image
                    ? `${ORGANIZER_PROFILE_URL}${organizerDetails?.image}`
                    : img
                }
                alt="Avatar"
                className="h-full w-full"
              />
            </div>
            <div className="text-sm font-semibold mt-2">
              {organizerDetails?.firstName}
            </div>
          </div>
     </Link>
        </div>
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                {messages.map((message) => {
                  return (
                    <div
                      className="grid grid-cols-12 gap-y-2"
                      ref={scrollRef}
                      key={uuidv4()}
                    >
                      {message.fromSelf ? (
                        <div className="col-start-7 col-end-13 p-3 rounded-lg">
                          <div className="flex items-center justify-start flex-row-reverse">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            <img
                src={
                  userData?.image.slice(0, 33) ===
                  "https://lh3.googleusercontent.com"
                    ? userData?.image
                    : userData?.image
                    ? `${PROFILE_URL}${userData?.image}`
                    : img
                }
                alt="Avatar"
                className="h-full w-full rounded-full"
              />
                            </div>
                            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                              <div>{message.message}</div>
                              <small className="text-xs text-gray-400">
                                {message.time}
                              </small>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="col-start-1 col-end-7 p-3 rounded-lg">
                          <div className="flex flex-row items-center">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            <img
                src={
                  organizerDetails?.image.slice(0, 33) ===
                  "https://lh3.googleusercontent.com"
                    ? organizerDetails?.image
                    : organizerDetails?.image
                    ? `${ORGANIZER_PROFILE_URL}${organizerDetails?.image}`
                    : img
                }
                alt="Avatar"
                className="h-full w-full rounded-full"
              />
                            </div>
                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                              <div>{message.message}</div>
                              <small>{message.time}</small>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <form onSubmit={sendMessage}>
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      type="text"
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    {/* <div className="absolute flex items-center justify-center h-full w-auto ml-5 left-0 top-0 text-gray-400 hover:text-gray-600">
        <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
        {showEmojiPicker   && <Picker onEmojiClick={handleEmojiClick}  />}
      </div> */}
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    type="submit"
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>Send</span>
                    <span className="ml-2">
                      <IoMdSend />
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
