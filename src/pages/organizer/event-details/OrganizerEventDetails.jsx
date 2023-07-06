import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  eventDetails,
  chartdetails,
  tableDetails,
} from "../../../api/OrganizerApi";
import Navbar from "../../../components/organizer/organizerNavbar/Navbar";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import Chart from "react-apexcharts";
import bgimg from "../../../assets/images/1f9bcc8e0cd6f1525f1c6a40ed6fbd88.jpg";
import avathar from "../../../assets/images/avathar2.png";
const PROFILE_URL = import.meta.env.VITE_PROFILE_URL;
import { AddressAutofill } from "@mapbox/search-js-react";

import "mapbox-gl/dist/mapbox-gl.css";
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
const COVER_IMAGE_URL = import.meta.env.VITE_COVER_IMAGE_URL;

function OrganizerEventDetails() {
  const Mapref = useRef();

  const params = useParams();
  const eventId = params.id;
  const [event, setEvent] = useState(null);
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  // useEffect(()=>{
  //   chartdetails(eventId).then(res=>{
  //    setChartCount(res.data.count)
  //    setChartDate(res.data.date)
  //   }).catch(err=>{
  // console.log(err);
  //   })
  // },[])
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    tableDetails(eventId)
      .then((res) => {
        setCustomer(res.data.userDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(customer);

  const [chart, setChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {},
    },
    series: [{}],
  });

  useEffect(() => {
    chartdetails(eventId)
      .then((res) => {
        const data = res.data; // Assuming the response object has properties 'date' and 'count'

        // Update the chart state
        setChart((prevChart) => ({
          ...prevChart,
          options: {
            ...prevChart.options,
            xaxis: {
              categories: data.date, // Use the received dates as categories
            },
          },
          series: [
            {
              ...prevChart.series[0],
              data: data.count, // Use the received counts as data
            },
          ],
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    eventDetails(eventId)
      .then((res) => {
        setEvent(res.data.details);
        setLocation(res.data.placeName);
        console.log(res.data.placeName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNsZzNwaWFncTBocHozb28zb3YzcHpvejEifQ.CJcMCCKk4SKR6JBo2-JNnQ`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.features.length > 0) {
          setCoordinates([
            data.features[0].center[1],
            data.features[0].center[0],
          ]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location]);

  // Format the date
  const formatDate = (dateString) => {
    const options = { weekday: "long", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };


console.log(event,90);

  return (
    <div>
      <Navbar />
      <div className="pb-5 pt-5 ">
        <div
          className="relative isolate overflow-hidden mb-5 mx-5 bg-gradient-to-t from-white to-blue-100 bg-gray-900 px-6 pt-16 shadow-xl rounded-2xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0"
          style={{
            backgroundImage: event
              ? `url(${COVER_IMAGE_URL + event.coverImage})`
              : "none",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="backdrop-filter backdrop-blur-sm bg-opacity-10 "
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 1) 100%)",
              mixBlendMode: "soft-light",
              zIndex: -1,
            }}
          ></div>
          <div className="mx-auto max-w-md text-center  lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h1 className="text-5xl font-chonburi font-bold uppercase  text-white ">
              {event ? event.eventName : null}{" "}
           <Link to={`/organizer/edit-event/${event?._id}`}>
           <span
               
               className="text-2xl ml-5"
             >
               <ion-icon name="create"></ion-icon>
             </span>
           </Link>
            </h1>
            <p className="mt-6 text-2xl font-roboto-slab leading-8 text-white">
              {event ? event.description : null}
            </p>
            <small className="mt-6  leading-8 text-red-600">
              <span className="">
                {" "}
                <ion-icon name="time-outline"></ion-icon>{" "}
              </span>

              {event
                ? `${formatDate(event.startDate)}, ${event.startTime} to ${
                    event.endTime
                  }`
                : null}
            </small>

            <p className="  leading-8 text-white">
              {" "}
              <span>
                <ion-icon className="mb-5" name="location-outline"></ion-icon>{" "}
              </span>{" "}
              {location ? location : null}
            </p>

        

            <div className="mt-10 flex flex-col items-start gap-x-6 lg:justify-start "></div>
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
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <h1 className="font-bold mt-20 ml-10 md:ml-20 text-3xl mb-5">
              About Event
            </h1>
            <p className="ml-10 md:ml-20 w-full md:w-1/2 mb-10">
              {event ? event.about : null}
            </p>

            <h1 className="font-bold mt-20 ml-10 md:ml-20 text-3xl mb-5">
              Daily ticket sales
            </h1>

            <div className="w-full md:w-1/2 mx-10 md:mx-20">
              <Chart
                options={chart.options}
                series={chart.series}
                type="area"
                width="500 "
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <h1 className="font-bold mt-20 ml-10 md:ml-20 text-3xl mb-5">
              Location
            </h1>
            <div className="w-full md:w-96 h-80 mx-10 md:mx-20">
              {coordinates && (
                <ReactMapGL
                  ref={Mapref}
                  mapboxAccessToken="pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNsZzNwaWFncTBocHozb28zb3YzcHpvejEifQ.CJcMCCKk4SKR6JBo2-JNnQ"
                  containerStyle={{
                    height: "100%",
                    width: "100%",
                  }}
                  initialViewState={{
                    longitude: coordinates[1],
                    latitude: coordinates[0],
                    zoom: 10,
                  }}
                  mapStyle="mapbox://styles/mapbox/streets-v12"
                >
                  <Marker
                    longitude={coordinates[1]}
                    latitude={coordinates[0]}
                    offsetLeft={-20}
                    offsetTop={-10}
                  ></Marker>
                  <NavigationControl position="bottom-right" />
                </ReactMapGL>
              )}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto mx-20 mt-20 mb-10">
          <h1 className="font-bold ml-10  text-3xl mb-5">customers</h1>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Account Details</th>
                <th>Booking Details</th>
                <th>Mobile</th>
                <th>Ticket Quantity</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {customer?.map((details) => (
                <tr>
                  <th></th>
                  <td>
                    <div className="flex items-center space-x-3 ">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={
                              details?.user.image?.slice(0, 33) ===
                              "https://lh3.googleusercontent.com"
                                ? details?.user.image
                                : details?.user.image
                                ? `${PROFILE_URL}${details?.user.image}`
                                : avathar
                            }
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {details.user.firstName}
                        </div>
                        <div className="text-sm opacity-50">
                          {details.user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {details.userFirstName} <br />
                    <span className="badge badge-ghost badge-sm">
                      {details.bookingEmail}
                    </span>
                  </td>
                  <td>{details.bookingMobile}</td>
                  <td>{details.ticketQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrganizerEventDetails;
