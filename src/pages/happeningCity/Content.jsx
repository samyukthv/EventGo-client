import React, { useState, useEffect } from "react";
import { allEvents } from "../../api/UserApi";
import { Link, useNavigate } from "react-router-dom";
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
import bgimg from "../../assets/images/blur.jpg";

function content() {
  const navigate = useNavigate();
  const [displayFullContent, setDisplayFullContent] = useState(false);
  const [events, setEvents] = useState(null);
  const [city, setCity] = useState(null);
  useEffect(() => {
    allEvents()
      .then((res) => {
        setEvents(res.data.events);
        setCity(res.data.city);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(events);

  const formatDate = (dateString) => {
    const options = { weekday: "long", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");




  // const addedDate = new Date(event.addedOn);
  // const currentDate = new Date();
  // const timeDifference = currentDate.getTime() - addedDate.getTime();
  // const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000; 
  return (
    <div
      // style={{
      //   backgroundImage: `url(${bgimg})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   zIndex: 1,
      // }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // Adjust the value (5px) to increase or decrease the blur effect
          zIndex: -1,
        }}
      ></div>
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/2 mx-auto md:ml-20 sm:w-auto">
        <div className="flex justify-evenly items-center p-6 space-x-6  rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
          <div className="flex bg-gray-100 p-4 md:w-72 space-x-4 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mt-2 opacity-30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              className="bg-gray-100 outline-none"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="text"
              id="search"
              placeholder="Search your city"
            />
          </div>
          <div className="hidden sm:block">
            {displayFullContent ? (
              <div
                onClick={() => setDisplayFullContent(false)}
                className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer"
              >
                <span>All Cities</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </div>
            ) : (
              <div
                onClick={() => setDisplayFullContent(true)}
                className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer"
              >
                <span>All Cities</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {displayFullContent && (
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 h-auto mx-auto md:ml-20">
          <div className="text-blue-600">
            {city.map((cityName) => (
              <p
                key={cityName}
                className={`m-5 text-white-400 hover:underline hover:cursor-pointer ${
                  cityName.toLowerCase() === selectedLocation.toLowerCase()
                    ? "underline"
                    : ""
                }`}
                onClick={() => setSelectedLocation(cityName)}
              >
                {cityName}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="min-h-screen flex justify-center items-center py-20">
        <div className="md:px-4 md:grid md:grid-cols-4 lg:grid-cols-4 gap-5 space-y-4 md:space-y-0">
          {events &&
            events
              .filter((event) => {
                const locationMatches = event.location.some(
                  (loc) =>
                    loc.street.toLowerCase().includes(search.toLowerCase()) ||
                    loc.city.toLowerCase().includes(search.toLowerCase()) ||
                    loc.state.toLowerCase().includes(search.toLowerCase()) ||
                    loc.country.toLowerCase().includes(search.toLowerCase())
                );

                const selectedLocationMatches =
                  selectedLocation &&
                  event.location.some(
                    (loc) =>
                      loc.city.toLowerCase() === selectedLocation.toLowerCase()
                  );

                return (
                  locationMatches &&
                  (selectedLocation ? selectedLocationMatches : true)
                );
              })
              .map((event) => (
                <div
                  key={event._id}
                  className="  px-6 pt-6 pb-2 rounded-2xl shadow-lg transform hover:scale-105 transition duration-500 border-8 relative"
                >
                  {new Date(event.addedOn).toLocaleDateString() ===
                    new Date().toLocaleDateString() && (
                    <div className="absolute top-0 left-0">
                      <p className="bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                        latest
                      </p>
                    </div>
                  )}

                  <div className="relative flex justify-center items-center">
                    <img
                      className="w-40 h-48 object-cover"
                      src={event.image}
                      alt="Course Cover"
                    />
                  </div>
                  <h1 className="mt-4 text-gray-800 text-2xl text-center uppercase font-bold cursor-pointer">
                    {event.eventName}
                  </h1>
                  <div className="my-4 flex flex-col items-center">
                    <div className="flex space-x-1 items-center">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-indigo-600 mb-1.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {/* SVG path code */}
                        </svg>
                      </span>
                      <p className="text-center">{event.description}</p>
                    </div>
                    <div className="flex space-x-1 items-center">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-indigo-600 mb-1.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {/* SVG path code */}
                        </svg>
                      </span>
                      <p>{event.location[0].city}</p>
                    </div>
                    <div className="flex space-x-1 items-center">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-indigo-600 mb-1.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {/* SVG path code */}
                        </svg>
                      </span>
                      <p>{formatDate(event.startDate)}</p>
                    </div>

                    <button
                      onClick={() => navigate(`/event-details/${event._id}`)}
                      className="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default content;
