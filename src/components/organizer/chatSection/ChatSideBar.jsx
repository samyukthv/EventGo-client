import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import img from "../../../assets/images/avathar2.png";
import { getAllContacts } from "../../../api/OrganizerApi";
const PROFILE_URL = import.meta.env.VITE_PROFILE_URL;

function ChatSideBar({ setSender, socket }) {
  const organizer = useSelector((state) => state.organizer);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    getAllContacts(organizer.id)
      .then((res) => {
        setContacts(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setSender({
      id: contact._id,
      firstName: contact.firstName,
      image: contact.image,
    });
  };

  return (
    <div>
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Conversations</span>
          <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
            {contacts.length}
          </span>
        </div>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
          {contacts?.map((result) => (
            <button
              key={result._id}
              onClick={() => handleContactClick(result)}
              className={`flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 ${
                selectedContact === result ? "bg-blue-200" : ""
              }`}
            >
              <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                <img
                  className="rounded-full h-8 w-8"
                  src={
                    result?.image?.slice(0, 33) ===
                    "https://lh3.googleusercontent.com"
                      ? result.image
                      : result.image
                      ? `${result.image}`
                      : img
                  }
                  alt=""
                />
              </div>
              <div className="ml-2 text-sm font-semibold">
                {result?.firstName}
              </div>
              
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatSideBar;
