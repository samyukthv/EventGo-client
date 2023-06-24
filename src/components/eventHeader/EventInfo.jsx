import React, { useEffect, useState, useRef } from "react";
import avatar from "../../assets/images/avathar2.png";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import { Link, useParams } from "react-router-dom";
import { eventDetails } from "../../api/UserApi";
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
const COVER_IMAGE_URL = import.meta.env.VITE_COVER_IMAGE_URL;
const PROFILE_URL = import.meta.env.VITE_PROFILE_URL;
import "mapbox-gl/dist/mapbox-gl.css";

function EventInfo() {
  const Mapref = useRef();
  const params = useParams();
  const eventId = params.id;
  const [event, setEvent] = useState([]);
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [organizer, setOrganizer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await eventDetails(eventId);
        if (res.status === 200) {
          console.log("response", res);
          setLocation(res.data.placeName);
          setEvent(res.data.eventDetails);
          setOrganizer(res.data.eventDetails.eventOrganizer);
        } else {
          console.log("oocured");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
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

  return (
    <div className="pb-5 pt-5 bg-gradient-to-r from-fuchsia-100 to-cyan-100 ">
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
            mixBlendMode: "multiply",
            zIndex: -1,
          }}
        ></div>
        <div className="mx-auto max-w-md text-center  lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
          <h1 className="text-5xl font-chonburi font-bold uppercase  text-white ">
            {event ? event.eventName : null}
          </h1>
          <p className="mt-6 text-2xl font-roboto-slab leading-8 text-white">
            {event ? event.description : null}
          </p>
          <small className="mt-6  leading-8 text-red-600">
            {event
              ? `${formatDate(event.startDate)}, ${event.startTime} to ${
                  event.endTime
                }`
              : null}
          </small>
          <p className="  leading-8 text-white">{location ? location : null}</p>
          <div className="mt-10 flex flex-col items-start gap-x-6 lg:justify-start ">
            <Link to={`/booking/${event ? event._id : null}`}>
              <button
                type="button"
                className="inline-block rounded bg-success px-6 pb-2 w-44 h-10 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                style={{ zIndex: 2 }} // Updated zIndex property
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

      <div className="m-5 sm:m-20 w-full sm:w-1/2 bg-white  shadow-xl backdrop-filter  bg-opacity-5">
        <ul role="list" className="divide-y bg-white ">
          <li className="flex flex-col sm:flex-row justify-between gap-x-6 py-5">
            <div className="flex flex-col sm:flex-row gap-x-4">
              {organizer && event && (
                <img
                  className="h-20 w-20 ml-5 flex-none rounded-full bg-gray-50"
                  src={
                    organizer.image.slice(0, 33) ===
                    "https://lh3.googleusercontent.com"
                      ? organizer.image
                      : organizer.image
                      ? `${PROFILE_URL}${organizer.image}`
                      : avatar
                  }
                  alt=""
                />
              )}
              <div className="min-w-0 mt-4">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {organizer ? organizer.firstName : null}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {organizer ? organizer.email : null}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center sm:flex-row sm:items-center md:flex-row">
              <div className="mb-4 sm:mb-0">
                <Link
                  to={`/organizer-profile/${organizer ? organizer._id : null}`}
                >
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

      <h1 className="font-bold mt-20 ml-20 text-3xl ">About Event:</h1>
      <p className="ml-20 w-1/2 mb-10">{event ? event.about : null}</p>

      <h1 className="font-bold mt-20 ml-20 text-3xl mb-5">Location</h1>

      <div className="w-96 h-96 mx-20">
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
  );
}

export default EventInfo;
