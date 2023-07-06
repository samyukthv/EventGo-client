import React, { useEffect, useState } from "react";
import Navbar from "../../../components/organizer/organizerNavbar/Navbar";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { AddressAutofill } from "@mapbox/search-js-react";
import { useParams } from "react-router-dom";
import { eventDetails } from "../../../api/OrganizerApi";
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
const COVER_IMAGE_URL = import.meta.env.VITE_COVER_IMAGE_URL;

function EditEvent() {
  const params = useParams();
  const eventId = params.id;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    eventDetails(eventId).then((res) => {
      setEvent(res.data.details);
    });
  }, []);

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

// useEffect(()=>{

// },[])

  const [newCover, setNewCover] = useState(null);
  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    setNewCover(URL.createObjectURL(file));
  };

  const [newImg, setNewImg] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setNewImg(URL.createObjectURL(file));
  };



  console.log(newCover,9099);
  return (
    <div>
      <Navbar />
      <form>
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
            {!newCover && event?.coverImage && (
  <img
    src={COVER_IMAGE_URL + event?.coverImage}
    alt="Existing Event Image"
    className="ml-5 h-32 sm:ml-20 mt-4 rounded border w-52 border-gray-300"
  />
)}

{newCover && (
  <img
    src={newCover}
    alt="Selected Event Image"
    className="ml-5 h-32 sm:ml-20 mt-4 rounded border w-52 border-gray-300"
  />
)}



            <input
              type="file"
              file={event?.coverImage}
              name="coverImage"
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Ticket price"
              onClick={handleCoverImageChange}
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
              value={event?.ticketPrice}
              name="ticketPrice"
              type="text"
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Ticket price"
            />

            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">Image</h1>
            <p className="ml-5 sm:ml-20">upload a main image </p>
            {!newImg && event?.image && (
  <img
    src={IMAGE_URL + event?.image}
    alt="Existing Event Image"
    className="ml-5 h-32 sm:ml-20 mt-4 rounded border w-52 border-gray-300"
  />
)}

{newImg && (
  <img
    src={newImg}
    alt="Selected Event Image"
    className="ml-5 h-32 sm:ml-20 mt-4 rounded border w-52 border-gray-300"
  />
)}

            <input
              file={event?.image}
              type="file"
              name="image"
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
