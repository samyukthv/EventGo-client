import React, { Fragment,useEffect } from "react";
import { useDispatch } from "react-redux";
import img from "../../assets/images/1131w-54Tdz9HHh8w.webp";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from "@material-tailwind/react";

import Navbar from "../../components/navbar/Navbar";
import { unsetBookingDetails } from "../../redux/EventSlice";
import { getBillingDetails } from "../../api/UserApi";
import { useState } from "react";
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;




function ConfirmBooking() {
const dispatch=useDispatch()
const[eventDetails,setDetails]=useState({})
useEffect(()=>{
  dispatch(unsetBookingDetails())
  getBillingDetails().then((res)=>{
    setDetails(res.data.latestBooking)
  console.log(res,112);
})
  },[])
  
  const formatDate = (dateString) => {
    const options = { weekday: "long", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };


  return (
    <Fragment>
      <Navbar />
      <div className="flex justify-center items-center w-auto h-[80vh]   ">
  <div className="flex flex-col md:flex-row mx-10   w-[180vh] h-[60vh]  rounded-xl shadow-2xl bg-gradient-to-t from-white to-blue-200">
    <div className="w-full md:w-auto  flex  inset-0 top-0 left-0">
      <img src={eventDetails.event ?  eventDetails.event.image : null} alt="" className="h-full max-w-full object-contain rounded-l-lg  " />
    </div>
    <div className="w-full md:w-1/3 text-center flex flex-col mt-5 ">
      <div className="font-bold text-4xl cursor-pointer flex justify-center items-center mb-4">
        <span className="text-3xl text-indigo-600 mr-1 pt-2">
          <ion-icon name="finger-print-outline"></ion-icon>
        </span>
        EventGo
      </div>

<div className="flex flex-col items-center justify-center  mt-10">

      <h1 className="text-2xl uppercase font-bold font-serif mb-4">
      "{eventDetails.event?.eventName}"
      </h1>
      <h1 className="text-xl font-serif text-gray-700 mb-4">
      {eventDetails.event?.description}
      </h1>
      <h1 className="text-red-500 font-semibold mb-4">
      {eventDetails.event
              ? `${formatDate(eventDetails.event.startDate)}, ${eventDetails.event.startTime} to ${
                eventDetails.event.endTime
                }`
              : null}
      </h1>
      <h1 className="text-gray-400-500 font-semibold">
        {eventDetails.event?.location[0].street}
       , {eventDetails.event?.location[0].city}
       , {eventDetails.event?.location[0].district}
       , {eventDetails.event?.location[0].state}
      </h1>
</div>


    </div>
    <div className="w-full md:w-auto  ">
      <h1 className="text-3xl font-semibold text-center mt-5">Billing Details</h1>
      <div className="my-10">
        <h1 className="text-lg font-medium ml-5 mb-3">Billing Account email :  {eventDetails.user?.email}</h1>
        <h1 className="text-lg font-medium ml-5 mb-3">Booking ID:  {eventDetails.event?._id}</h1>
        <h1 className="text-lg font-medium ml-5 mb-3">Billing Name:  {eventDetails?.userFirstName}</h1>
      </div>
      <div className="my-10">
        <h1 className="text-lg font-medium ml-5 mb-3">Ticket Quantity:  {eventDetails?.ticketQuantity}</h1>
        <h1 className="text-lg font-medium ml-5 mb-3">Billing Amount: &#8377;{eventDetails?.totalBill}</h1>

      </div>
      <div className=" flex items-center justify-center">

      <Button className="items-center">Download ticket</Button>
      </div>
    </div>
  </div>
</div>




    </Fragment>
  );
}

export default ConfirmBooking;
