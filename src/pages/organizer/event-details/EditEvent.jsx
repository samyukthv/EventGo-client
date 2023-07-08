import React, { useEffect, useState } from "react";
import Navbar from "../../../components/organizer/organizerNavbar/Navbar";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { AddressAutofill } from "@mapbox/search-js-react";
import { useParams } from "react-router-dom";
import {  confirmEventEdit, eventDetails, uploadEditedEventImage } from "../../../api/OrganizerApi";
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
const COVER_IMAGE_URL = import.meta.env.VITE_COVER_IMAGE_URL;

function EditEvent() {
  const params = useParams();
  const eventId = params.id;
  const [event, setEvent] = useState(null);

  const [image, setImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  useEffect(() => {
    eventDetails(eventId).then((res) => {
      setEvent(res.data.details);
    });
  }, []);
  useEffect(() => {
    if (event) {
      setImage(event.image);
      setCoverImage(event.coverImage);
    }
  }, [event]);

  console.log(event, 9);
  const handleLocationChange = (name, value) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      location: [
        {
          ...prevEvent.location[0],
          [name]: value,
        },
      ],
    }));
  };

  // const [newCover, setNewCover] = useState(null);
  // const handleCoverImageChange = (event) => {
  //   const file = event.target.files[0];
  //   setNewCover(URL.createObjectURL(file));
  // };

  // const [newImg, setNewImg] = useState(null);
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   setNewImg(URL.createObjectURL(file));
  // };


 



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData1 = new FormData();
      formData1.append("file", image);
      formData1.append("upload_preset", "profileImage");
      formData1.append("cloud_name", "dcsdqyoh1");
  
      const formData2 = new FormData();
      formData2.append("file", coverImage);
      formData2.append("upload_preset", "profileImage");
      formData2.append("cloud_name", "dcsdqyoh1");
  
      const responses = await Promise.all([
        uploadEditedEventImage(formData1),
        uploadEditedEventImage(formData2),
      ]);
  
    const secureUrls = responses.map((res) => res.data.secure_url);
    
    setImage(secureUrls[0])
    setCoverImage(secureUrls[1])
    await confirmEventEdit(event,image,coverImage).then(res=>{
      if(res.data.success){
        toast.success("event edited successfully")
      }
    })

    } catch (error) {
    }
  };


console.log(image,"image");
console.log(coverImage,"coverImage");

  return (
    <div>
      <Navbar />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 ">
          <div className="h-full">
            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">
              Basic Info
            </h1>
            <p className="ml-5 sm:ml-20">
              Name your event and tell event-goers why they should come. Add
              details that highlight what makes it unique.
            </p>

            <input
              type="text"
              value={event?.eventName}
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              name="eventName"
              className="ml-5 sm:ml-20 mt p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Event Name"
            />

            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">
              Description
            </h1>
            <p className="ml-5 sm:ml-20">A short description about the event</p>

            <textarea
              type="text"
              value={event?.description}
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              name="description"
              className="ml-5 sm:ml-20 mt p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Event description"
            />

            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">Location</h1>
            <p className="ml-5 sm:ml-20">
              Help people in the area discover your event and let attendees know
              where to show up.
            </p>

            <input
              type="text"
              value={event?.location[0].street}
              onChange={(e) => handleLocationChange("street", e.target.value)}
              autoComplete="address-line1"
              name="street"
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="street"
            />

            <input
              value={event?.location[0].city}
              onChange={(e) => handleLocationChange("city", e.target.value)}
              name="city"
              placeholder="City"
              type="text"
              autoComplete="address-level2"
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
            />

            <input
              value={event?.location[0].state}
              onChange={(e) => handleLocationChange("state", e.target.value)}
              name="state"
              placeholder="State"
              type="text"
              autoComplete="address-level1"
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
            />

            <input
              value={event?.location[0].country}
              onChange={(e) => handleLocationChange("country", e.target.value)}
              name="country"
              placeholder="Country"
              type="text"
              autoComplete="country"
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
            />
            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">
              About Event
            </h1>
            <p className="ml-5 sm:ml-20">Give a description about the event</p>

            <textarea
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              value={event?.about}
              type="text"
              name="about"
              className="ml-5 sm:ml-20 mt-4 p-2    rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Event about"
            />
            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">
              cover Image
            </h1>
            <p className="ml-5 sm:ml-20">upload a cover image </p>
            <input
              type="file"
              file={event?.coverImage}
              name="coverImage"
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Ticket price"
              onChange={(e) =>
                setCoverImage(e.target.files[0])
              }
            />
          </div>

          <div className=" h-full">
            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">
              Date And Time
            </h1>
            <p className="ml-5 sm:ml-20">
              Tell event-goers when your event starts and ends so they can make
              plans to attend.
            </p>

            <div className="">
              <label htmlFor="startDate" className="block mt-4 ml-6 sm:ml-20">
                Start Date
              </label>
              <input
                onChange={(e) =>
                  setEvent({ ...event, [e.target.name]: e.target.value })
                }
                value={event?.startDate ? event.startDate.slice(0, 10) : ""}
                type="date"
                name="startDate"
                className="ml-5 sm:ml-20  p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
                placeholder="Start date"
              />
            </div>

            <label htmlFor="startDate" className="block mt-4  ml-6 sm:ml-20">
              Start Time
            </label>
            <input
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              value={event?.startTime}
              type="time"
              name="startTime"
              className="ml-5 sm:ml-20  p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Start time"
            />

            <label htmlFor="startDate" className="block mt-4  ml-6 sm:ml-20">
              End Time
            </label>
            <input
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              value={event?.endTime}
              type="time"
              name="endTime"
              className="ml-5 sm:ml-20  p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="End time"
            />

            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">
              Ticket Quantity
            </h1>
            <p className="ml-5 sm:ml-20">set a quantity for the ticket </p>

            <input
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              value={event?.ticketQuantity}
              type="text"
              name="ticketQuantity"
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Ticket Quantity"
            />

            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">
              Ticket price
            </h1>
            <p className="ml-5 sm:ml-20">
              set the ticket price per head in rupees{" "}
            </p>

            <input
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              value={event?.ticketPrice}
              name="ticketPrice"
              type="text"
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Ticket price"
            />

            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">Image</h1>
            <p className="ml-5 sm:ml-20">upload a main image </p>
          

            

            <input
              file={event?.image}
              type="file"
              name="image"
              onChange={(e) => 
                setImage(e.target.files[0])
              }
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-block rounded-full mb-5 text-center justify-center ml-20 bg-primary px-6 pb-2 mt-4 sm:mt-10 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Edit Event
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default EditEvent;
