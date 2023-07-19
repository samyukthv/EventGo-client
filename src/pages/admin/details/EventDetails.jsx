import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import avathar from "../../../assets/images/avathar2.png";
import { useParams } from "react-router-dom";
import { adminEventDetails } from "../../../api/adminApi";

function EventDetails() {
  const params = useParams();
  const eventId = params.id;
  const [event, setEvent] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    adminEventDetails(eventId).then((res) => {
      console.log(res.data, 8);
      setEvent(res.data.eventDetails);
      setLocation(res.data.placeName);
    });
  }, []);
  const formatDate = (dateString) => {
    const options = { weekday: "long", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const logout = async (req, res) => {
    try {
      localStorage.removeItem("admintoken");
      nagivate("/admin/");
    } catch (error) {}
  };
  return (
    <div>
      {/* <!-- component --> */}
      <div class="h-screen w-full bg-white relative flex overflow-hidden">
        {/* <!-- Sidebar --> */}
        <aside class="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
          {/* <!-- Profile --> */}
          <Link to="/admin/home">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
              <i className="fa-solid fa-house-chimney"></i>
            </div>
          </Link>

          <Link to="/admin/user-list">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>

          <Link to="/admin/organizer-list">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          </Link>

          <Link to="/admin/banner-setup">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
              <i className="fa-solid fa-image"></i>
            </div>
          </Link>
        </aside>

        <div class="w-full h-full flex flex-col justify-between">
          {/* <!-- Header --> */}
          <header class="h-16 w-full flex items-center relative justify-between px-5 space-x-10 bg-gray-800">
            {/* <!-- Informação --> */}
            <div className="font-monoton  text-2xl cursor-pointer flex items-center ">
              <span className="text-3xl  mr-1 pt-2  text-purple-500 ">
                {" "}
                <ion-icon name="finger-print-outline"></ion-icon>
              </span>
              <span className="bg-gradient-to-r  from bg-purple-500 to-pink-600 text-transparent bg-clip-text ">
                EventGo
              </span>
            </div>
            <h1 className="font-bold text-3xl text-white mt-3 ">
              ADMIN DASHBOARD
            </h1>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full mt-2">
                  <img src={avathar} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52 bg-black"
              >
        
                <li>
                <a
                onClick={logout}>Logout</a>                </li>
              </ul>
            </div>
          </header>

          {/* <!-- Main --> */}
          <main class="max-w-full h-full flex relative overflow-y-hidden">
            {/* <!-- Container --> */}
            <div class="h-full w-full m-4 flex flex-wrap items-start justify-start rounded-tl grid-flow-col auto-cols-max gap-4 overflow-y-scroll">
              {/* <!-- Container --> */}
              {/* <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div> */}

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
                className="relative isolate w-full overflow-hidden  mx-5 bg-gradient-to-t from-white to-blue-100 bg-gray-900 px-6 pt-16 shadow-xl rounded-2xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0"
                style={{
                  backgroundImage: event ? `url(${event.coverImage})` : "none",
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
                      ? `${formatDate(event.startDate)}, ${
                          event.startTime
                        } to ${event.endTime}`
                      : null}
                  </small>

                  <p className="  leading-8 text-white text-lg">
                    {" "}
                    <span>
                      <ion-icon
                        className="mb-5"
                        name="location-outline"
                      ></ion-icon>{" "}
                    </span>{" "}
                    {location ? location : null}
                  </p>
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

              <div>
                <h1 className="font-bold  ml-20 text-3xl ">About Event</h1>
                <p className="ml-20 w-1/2 mb-10">
                  {event ? event.about : null}
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
