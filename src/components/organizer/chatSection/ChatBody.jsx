import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getAllMessages, addMessage } from "../../../api/OrganizerApi";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
const ORGANIZER_PROFILE_URL = import.meta.env.VITE_ORGANIZER_PROFILE_URL;
const PROFILE_URL = import.meta.env.VITE_PROFILE_URL;
import img from "../../../assets/images/avathar2.png"

function ChatBody({ sender, socket }) {
  const [msgSent, setMsgSent] = useState(false);
  const organizer = useSelector((state) => state.organizer);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const scrollRef = useRef();
console.log(socket,"sockett");
console.log(sender,98765);
useEffect(() => {
  if (socket.current) {
    socket.current.on("msg-receive", (msg) => {
      setArrivalMsg({ fromSelf: false, message: msg, time: "just now" });
    });
  }
}, [socket.current]);

  useEffect(() => {
    if (sender.id) {
      getAllMessages(sender.id, organizer.id).then(({ data: { messages } }) => {
        setMessages(messages);
      });
    }
  }, [msgSent, sender]);


  useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
      
  const sendMessage = (e) => {
    console.log("into send emittttttt ");
    console.log(sender);
    e.preventDefault();
    socket.current.emit("send-msg", {
      to: sender.id,
      from: organizer.id,
      msg: msg,
    });
    addMessage(organizer.id, sender.id, msg).then((res) => {
      setMsgSent((prevState) => !prevState);
      setMsg("");
      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
    });
  };

  return (
    <div className="w-full">
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
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          <img
                src={
                  organizer?.image.slice(0, 33) ===
                  "https://lh3.googleusercontent.com"
                    ? organizer?.image
                    : organizer?.image
                    ? `${ORGANIZER_PROFILE_URL}${organizer?.image}`
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
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          <img
                src={
                  sender?.image.slice(0, 33) ===
                  "https://lh3.googleusercontent.com"
                    ? sender?.image
                    : sender?.image
                    ? `${PROFILE_URL}${sender?.image}`
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
  );
}

export default ChatBody;
