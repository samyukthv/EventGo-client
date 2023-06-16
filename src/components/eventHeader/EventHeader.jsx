import React, { useEffect, useState,useMemo } from "react";
import avatar from "../../assets/images/avathar2.png";
import img from "../../assets/images/1131w-54Tdz9HHh8w.webp";
import backgroundImage from "../../../../server/public/coverImage/coverImage-1686219448714.jpg";
import { Link, useParams } from "react-router-dom";
import { eventDetails } from "../../api/UserApi";
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
const GOOGLE_MAP_API_KEY= import.meta.env.VITE_GOOGLE_MAP_API_KEY;


import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";



const DEFAULT_LATITUDE = 37.7749; // Example latitude value
const DEFAULT_LONGITUDE = -122.4194; // Example longitude value




function EventHeader() {


  const params = useParams();
  const eventId = params.id;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const response = eventDetails(eventId).then((res) => {
      console.log(res.data.eventDetails);
      setEvent(res.data.eventDetails);
    });
  }, []);

  // Format the date
  const formatDate = (dateString) => {
    const options = { weekday: "long", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };




  const latitude = Number(event?.location[0]?.latitude) || DEFAULT_LATITUDE;
  const longitude = Number(event?.location[0]?.longitude) || DEFAULT_LONGITUDE;

  console.log(latitude,67);
  console.log(longitude,76);
  console.log(typeof(latitude));
  

  const markerPosition = useMemo(() => {


    if (typeof latitude === 'number' && typeof longitude === 'number') {
      return { lat:  latitude, lng:  longitude };
    }
    return null;
  }, [latitude, longitude]);

  console.log(event, 123);
  return (
    <div>
      <div className="relative isolate overflow-hidden m-5 bg-gradient-to-r from-white to-blue-200 bg-gray-900 px-6 pt-16 shadow-2xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0 ">
        <div className="mx-auto max-w-md text-center  lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
          <h1 className="text-5xl font-bold uppercase  text-black ">
            {event ? event.eventName : null}
          </h1>
          <p className="mt-6 text-2xl font-serif leading-8 text-black">
            {event ? event.description : null}
          </p>
          <small className="mt-6  leading-8 text-red-600">
            {event
              ? `${formatDate(event.startDate)}, ${event.startTime} to ${
                  event.endTime
                }`
              : null}
          </small>
          <p className="  leading-8 text-black">
            {event ? event.location[0].street : null}
            , {event ? event.location[0].city : null}
            , {event ? event.location[0].district : null}
           , {event ? event.location[0].state : null}
          </p>
          <div className="mt-10 flex flex-col items-start gap-x-6 lg:justify-start ">
            <Link to={`/booking/${event ? event._id : null}`}>
              <button
                type="button"
                class="inline-block rounded bg-success px-6 pb-2 w-44 h-10 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
              >
                Book Now
              </button>
            </Link>
            <small className=" leading-8 text-red-600">*20 tickets left</small>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-end md:flex-grow">
          <div className="flex-shrink-0">
            <img
              src={event ? IMAGE_URL + event.image : null}
              alt=""
              className=" h-96 rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="m-20 w-1/2 bg-gray-50 backdrop-filter backdrop-blur-md bg-opacity-50 rounded-md shadow-2xl">
  <ul role="list" className="divide-y divide-gray-100">
    <li className="flex flex-col sm:flex-row justify-between gap-x-6 py-5">
      <div className="flex flex-col sm:flex-row gap-x-4">
        <img
          className="h-20 w-20 ml-5 flex-none  rounded-full bg-gray-50"
          src={event ? event.eventOrganizer.image : null}
          alt=""
        />
        <div className="min-w-0 mt-4">
          <p className="text-sm font-semibold  leading-6 text-gray-900">
            {event ? event.eventOrganizer.firstName : null}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {event ? event.eventOrganizer.email : null}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center sm:flex-row sm:items-center md:flex-row">
        <div className="mb-4 sm:mb-0">
         <Link to={`/organizer-profile/${event?event.eventOrganizer._id:null}`}>
         <button
            type="button"
            className="block rounded bg-primary-700 px-6 pb-2 pt-2.5 mr-5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            View profile
          </button>
         </Link>
        </div>
        <div>
          <button
            type="button"
            className="block rounded bg-primary-700 px-6 pb-2 pt-2.5 mx-5 mt-4 sm:mt-0 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Follow Profile
          </button>
        </div>
      </div>
    </li>
  </ul>
</div>


      <h1 className="font-bold mt-20 ml-20 text-3xl mb-5">About Event:</h1>
      <p className="ml-20 w-1/2 mb-10">{event ? event.about : null}</p>










      <h1 className="font-bold mt-20 ml-20 text-3xl mb-5">Location</h1>
      <div className="h-96 w-1/2 bg-black ml-20  mb-20">
      <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>
  <GoogleMap
    mapContainerStyle={{ height: "400px", width: "100%" }}
    center={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
    zoom={12}
  >
    {markerPosition && <Marker position={markerPosition} />}
  </GoogleMap>
</LoadScript>

</div>

    
    
    
    
    
    
    </div>
  );
}

export default EventHeader;
