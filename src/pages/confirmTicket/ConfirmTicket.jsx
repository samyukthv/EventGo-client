import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import cover from "../../assets/images/rachel-coyne-U7HLzMO4SIY-unsplash.jpg";
import image from "../../assets/images/400.jpg";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useDispatch } from "react-redux";
import { unsetBookingDetails } from "../../redux/EventSlice";
import { getBillingDetails } from "../../api/UserApi";
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
import domToImage from 'dom-to-image';


function ConfirmTicket() {
  const dispatch = useDispatch();
  const [eventDetails, setEventDetails] = useState({});
  const [loader, setLoader] = useState(false);

  const [location, setLocation] = useState("");


  
  const downloadPDF = () => {
    const capture = document.querySelector(".actual-bill");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imagData = canvas.toDataURL("img/png/jpg");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imagData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("EventGo-ticket.pdf");
    });
  };
  
  useEffect(() => {
    dispatch(unsetBookingDetails());
    getBillingDetails().then((res) => {
      setEventDetails(res.data.latestBooking);
      setLocation(res.data.placeName)
    });
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: "long", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };


  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNsZzNwaWFncTBocHozb28zb3YzcHpvejEifQ.CJcMCCKk4SKR6JBo2-JNnQ`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.features.length > 0) {
          
          setLatitude(data.features[0].center[1]),
          setLongitude(data.features[0].center[0])
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location]);
  

  const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
console.log(latitude)
console.log(longitude);
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center pb-10 pt-10 bg-center bg-cover ">
        <div className="actual-bill  max-w-md w-full h-full mx-auto z-10  bg-blue-900 rounded-3xl  ">
          <div className="flex flex-col ">
            <div className="bg-white relative drop-shadow-2xl  rounded-3xl p-4 m-4">
              <div className="flex-none sm:flex">
                <div className="flex-auto justify-evenly">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center  my-1">
                      <div className="font-monoton  text-2xl cursor-pointer flex items-center bg-transparent">
                        <span className="text-3xl  mr-1 pt-2  text-purple-500 ">
                          {" "}
                          <ion-icon name="finger-print-outline"></ion-icon>
                        </span>
                        <span className="text-purple-500 ">EventGo</span>
                      </div>
                    </div>
                    <div className="ml-auto text-blue-800">
                      Booking Date: {formattedDate}
                    </div>
                  </div>
                  <div className="border-b border-dashed my-5"></div>
                  <div className="flex items-center mt-3 ">
                    <div className="theimg w-1/2">
                      <img
                        src={
                          eventDetails.event
                            ? `${IMAGE_URL}/${eventDetails.event.image}`
                            : null
                        }
                        alt=""
                      />
                    </div>

                    <div className="flex flex-col justify-center text-center items-center w-1/2">
                      <h1 className=" text-md font-chonburi uppercase mb-10 ">
                        Entry id:{" "}
                        <span className="text-red-500 ">
                          Go{eventDetails.event?._id?.substring(0, 5)}
                        </span>
                      </h1>

                      <h1 className=" text-md font-chonburi uppercase ">
                        "{eventDetails.event?.eventName}"
                      </h1>
                      <h6 className=" text-xs font-extralight ml-3  font-roboto-slab">
                        {eventDetails.event?.description}
                      </h6>
                      <h3 className="text-red-500 text-xs ml-3">
                        {" "}
                        {eventDetails.event
                          ? `${formatDate(eventDetails.event.startDate)}, ${
                              eventDetails.event.startTime
                            } to ${eventDetails.event.endTime}`
                          : null}
                      </h3>
                      <h3 className=" text-xs ml-3">
                        {" "}
                        {eventDetails.event?.location[0].street},{" "}
                        {eventDetails.event?.location[0].city},{" "}
                        {eventDetails.event?.location[0].district},{" "}
                        {eventDetails.event?.location[0].state}
                      </h3>
                      <h3 className="text-xs mt-5">
                        Ticket price per head : &#8377; 2000
                      </h3>
                    </div>
                  </div>
                  <div className="border-b border-dashed  my-5 pt-5">
                    <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
                    <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
                  </div>
                  <div className="flex items-center mb-3 p-2 text-sm">
                    <div className="flex flex-col">
                      <h3 className="text-md  font-extralight">
                        Account email:{eventDetails.user?.email}
                      </h3>
                      <h3 className="text-md font-extralight ">
                        Booking Account: {eventDetails?.bookingEmail}
                      </h3>
                      <h3 className="text-md   font-extralight">
                        Booking id :{eventDetails.event?._id}{" "}
                      </h3>
                      <h3 className="text-md mt-5  font-light">
                        Ticket quantity :{eventDetails?.ticketQuantity}{" "}
                      </h3>

                      <div className="flex justify-end">
                        <h1 className=" text-lg my-3 font-bold">
                          Totol bill amount:{" "}
                        </h1>
                        <h1 className=" font-bold text-lg my-3">
                          {" "}
                          &#8377;{eventDetails?.totalBill}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-dashed  my-2 pt-2">
                    <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
                    <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
                  </div>
                  <div className="flex items-center px-5 pt-3 text-sm">
                
                  </div>

                  <div className="flex flex-col py-2 justify-center text-sm">
                    <button
                      onClick={downloadPDF}
                      disabled={!(loader === false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center"
                    >
                      <svg
                        className="fill-current w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                      </svg>
                      {loader ? (
                        <span>Downloading</span>
                      ) : (
                        <span>Download</span>
                      )}
                    </button>
                    <h6 className="font-bold text-center mt-3">Scan here for event location</h6>
                    <div className="barcode flex justify-center ">
                      <div className=" bg-white mt-3">
                        <QRCode
                          size={150}
                          viewBox={`0 0 256 256`}
                          value={googleMapsLink}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmTicket;
