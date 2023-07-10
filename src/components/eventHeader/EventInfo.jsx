import React, { useEffect, useState, useRef } from "react";
import avatar from "../../assets/images/avathar2.png";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import { Link, useParams } from "react-router-dom";
import { allReview, eventDetails, submitReview } from "../../api/UserApi";
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
const COVER_IMAGE_URL = import.meta.env.VITE_COVER_IMAGE_URL;
const ORGANIZER_PROFILE_URL = import.meta.env.VITE_ORGANIZER_PROFILE_URL;
import "mapbox-gl/dist/mapbox-gl.css";
import { toast, Toaster } from "react-hot-toast";
import Countdown from "react-countdown";
import bgimg from "../../assets/images/hi.jpg";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

function EventInfo() {
  const Mapref = useRef();
  const params = useParams();
  const eventId = params.id;
  const [event, setEvent] = useState([]);
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [organizer, setOrganizer] = useState(null);
  const [user, setUser] = useState(null);
  const userData = useSelector((state) => state.user);
  const [currentStarValue, SetCurrentStarValue] = useState(0);
  const [starHoverValue, setStarHoverValue] = useState(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await eventDetails(eventId);
        if (res.status === 200) {
          setLocation(res.data.placeName);
          setEvent(res.data?.eventDetails);
          setOrganizer(res.data.eventDetails.eventOrganizer);
          setUser(res.data.bookedUsers.user);
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    }; 
    fetchData();
  }, [event._id, currentStarValue]);
      


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

  const getTimeDifferenceInSeconds = (startDate) => {
    const currentDate = new Date().getTime();
    const startDateMilliseconds = new Date(startDate).getTime();
    const timeDifferenceMilliseconds = startDateMilliseconds - currentDate;
    const timeDifferenceSeconds = Math.floor(timeDifferenceMilliseconds / 1000);
    return timeDifferenceSeconds > 0 ? timeDifferenceSeconds : 0;
  };

  // Inside your component
  const [timeDifference, setTimeDifference] = useState(
    getTimeDifferenceInSeconds(event.startDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDifference(getTimeDifferenceInSeconds(event.startDate));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [event.startDate]);
















  console.log(event, 1234567890);

  // RATING FOR THE EVENT

  const [reviewText, setReviewText] = useState(null);

  const color = {
    grey: "#808080",
    orange: "#FFA500",
  };
  const star = Array(5).fill(0);


  const handleClickStar = (value) => {
    SetCurrentStarValue(value);
  };

  console.log(currentStarValue, 223344);
  const handleMouseOver = (value) => {
    setStarHoverValue(value);
  };

  const handleMouseLeave = () => {
    setStarHoverValue(undefined);
  };

  const [reveiw, setReview] = useState({
    reviewerName: "",
    comment: "",
    rating: "",
  });

  const handleReview = (e) => {
    e.preventDefault();

if(userData.id===user){
  const newReview = {
    reviewerName:userData.id,
    comment: reviewText,
    rating: currentStarValue,
  };
  setReview(newReview);
  
  submitReview(reveiw, event?._id)
    .then((res) => {
      if(res.data.success){
        toast.success("review added successfully")
        SetCurrentStarValue(0); 
        document.getElementById("reviewBox").value = "";    
             
      }
    })
    .catch((err) => {
      console.log(err);
    });

}else{
  toast.error("you have'nt purchased a ticket")
  SetCurrentStarValue(0); 
  document.getElementById("reviewBox").value = "";
}

  };



  return (
    <div
      className="pb-5 pt-5 bg-gradient-to-r from-fuchsia-100 to-cyan-100"
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backdropFilter: "blur(5px)", // Adjust the value (5px) to increase or decrease the blur effect
          zIndex: -1,
        }}
      ></div>

      <div
        className="relative isolate overflow-hidden mb-5 mx-5 bg-gradient-to-t from-white to-blue-100 bg-gray-900 px-6 pt-16 shadow-xl rounded-2xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0"
        style={{
          backgroundImage: event
            ? `url(${ event.coverImage})`
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
            {event ? event.eventName : null}
          </h1>
          <p className="mt-6 text-2xl font-roboto-slab leading-8 text-white">
            {event ? event.description : null}
          </p>
          <small className="mt-6 text-lg leading-10 text-red-600">
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

          <p className="  leading-8 text-white text-lg">
            {" "}
            <span>
              <ion-icon className="mb-5" name="location-outline"></ion-icon>{" "}
            </span>{" "}
            {location ? location : null}
          </p>
          <div className="mt-10 flex flex-col items-start gap-x-6 lg:justify-start ">
            {event.ticketQuantity < 1 ? (
              <button
                type="button"
                onClick={() => toast.error("Tickets sold out")}
                className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                style={{ zIndex: 2 }} // Updated zIndex property
              >
                Tickets Sold Out
              </button>
            ) : new Date(event.startDate) <= new Date() ? (
              <button
                type="button"
                onClick={() => toast.error("Booking closed")}
                className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                style={{ zIndex: 2 }} // Updated zIndex property
              >
                Booking closed
              </button>
            ) : (
              <Link to={`/booking/${event ? event._id : null}`}>
                <button
                  type="button"
                  className="inline-block rounded bg-success px-6 pb-2 w-44 h-10 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                  style={{ zIndex: 2 }} // Updated zIndex property
                >
                  Book Now
                </button>
              </Link>
            )}

            <small className=" leading-8 text-red-600">
              *{event.ticketQuantity} tickets left
            </small>
          </div>
        </div>
        <div className="text-red-500 text-lg border-2 font-bold font-chonburi text-center mt-10 px-5 h-16 inline-block ml-5 mb-5 sm:ml-0 sm:mb-0">
          <h1 className="text-lg text-white ">The Event Begins in</h1>
          <Countdown
            className=" text-2xl"
            date={Date.now() + timeDifference * 1000}
          />
        </div>

        <div className="flex items-center justify-center md:justify-end md:flex-grow">
          <div className="flex-shrink-0">
            <img
              src={event ? event.image : null}
              alt=""
              className=" h-96 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="m-5 sm:m-20 w-auto sm:w-1/2 bg-white shadow-xl backdrop-filter bg-opacity-5">
        <ul role="list" className="divide-y bg-white">
          <li className="flex flex-col sm:flex-row justify-between gap-x-6 py-5">
            <div className="flex flex-col sm:flex-row gap-x-4 justify-center items-center">
              {organizer && event && (
                <img
                  className="h-20 w-20 ml-5 flex-none rounded-full bg-gray-50"
                  src={
                    organizer.image.slice(0, 33) ===
                    "https://lh3.googleusercontent.com"
                      ? organizer.image
                      : organizer.image
                      ? `${organizer.image}`
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

      <h1 className="font-bold mt-20 ml-20 text-3xl ">About Event</h1>
      <p className="ml-20 w-1/2 mb-10">{event ? event.about : null}</p>

      <h1 className="font-bold mt-20 ml-20 text-3xl mb-5">Location</h1>

      <div className=" h-96 mx-20 sm-mx-auto w-auto">
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

      {new Date(event.startDate) <= new Date() && (
        <div id="review" className="w-1/2 flex flex-col justify-end">
          <h1 className="font-bold mt-20 ml-20 text-3xl">Add Your Review</h1>

          <div className=" flex ml-20 mt-5 cursor-pointer">
            {star.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  color={
                    (starHoverValue || currentStarValue) > index
                      ? color.orange
                      : color.grey
                  }
                  onClick={() => handleClickStar(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                />
              );
            })}
          </div>

          <textarea id='reviewBox'
            className="ml-20 mt-2 w-full rounded-md"
            placeholder="Your message"
            onChange={(e) => {
              setReviewText(e.target.value);
            }}
          ></textarea>

          <div className="flex justify-end mt-5">
            <button
              onClick={handleReview}
              type="button"
              className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}

<div className="mx-20 mt-20 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
  {event?.reviews?.map((review, index) => (
    <div key={index} className="bg-white max-w-xl rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
      <div className="mt-4">
        <div className="flex mt-2">
          {Array.from({ length: 5 }, (_, starIndex) => (
            <FaStar
              key={starIndex}
              color={review.rating >= starIndex + 1 ? color.orange : color.grey}
            />
          ))}
        </div>
        <p className="mt-4 text-md text-gray-600">{review.comment}</p>
        <div className="flex justify-between items-center">
          <div className="mt-4 flex items-center space-x-4 py-6">
            <div className="">
              <img
                className="w-12 h-12 rounded-full"
                src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80"
                alt=""
              />
            </div>
            <div className="text-sm font-semibold">{review.reviewerName.firstName}<span className="font-normal">{formatDate(review.date)}</span></div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


    </div>
  );
}

export default EventInfo;
