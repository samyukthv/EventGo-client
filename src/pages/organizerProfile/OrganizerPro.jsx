import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import img from "../../assets/images/avathar2.png"

import {
  followOrganizer,
  unFollowOrganizer,
  organizerDetails,
  isFollowingOrganizer,
} from "../../api/UserApi";
import { useSelector } from "react-redux";
import { Tooltip } from "@material-tailwind/react";
import defaultCoverImage from "../../assets/images/rachel-coyne-U7HLzMO4SIY-unsplash.jpg";

function OrganizerPro() {
  const location = useLocation();

  const params = useParams();
  const organizerId = params.id;
  const [organizer, setOrganizer] = useState(null);
  const [eventCount,setEventCount]=useState(null)
  useEffect(() => {

    organizerDetails(organizerId).then((response) => {
      setOrganizer(response.data.organizerDetails);
      setEventCount(response.data.eventCount)

    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const followersCount = organizer?.followers?.length;
  const postCount = organizer?.post.length;

  //state to check if user is following the organizer
  const [following, setFollowing] = useState(null);

  //getting user id from redux
  const userdata = useSelector((state) => state.user);
  const userId = userdata.id;

  //useEffect to check if the user is already following the organizer
  useEffect(() => {
    if (!userdata.id == "") {
      isFollowingOrganizer(userId, organizerId)
        .then((res) => {
          if (res.data.organizer) {
            setFollowing(true);
          } else {
            setFollowing(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);



  // function to follow the organizer
  const follow = async () => {
    try {
      const response = await followOrganizer(userId, organizerId);
      if (response.data.followed) {
        toast.success("followed organizer");
        setFollowing(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to Unfollow the organizer
  const unFollow = async () => {
    try {
      const response = await unFollowOrganizer(userId, organizerId);
      if (response.data.unFollowed) {
        toast.error("unfollowed organizer");

        setFollowing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // setting the cover image in the page
  const coverImageUrl = organizer?.coverImage
    ? `${organizer.coverImage}`
    : defaultCoverImage;
  return (
    <div>
      <section className="relative block h-500-px">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{ backgroundImage: `url(${coverImageUrl})` }}
        ></div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0px)" }}
        ></div>
      </section>
      <section className="relative py-16 bg-blueGray-200 ">
        <div className="container mx-auto px-4 ">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6  bg-gradient-to-t from-white to-blue-200">
              <div className="flex flex-wrap justify-center ">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center ">
                  <div className="relative">
                    {organizer ? (
                      <img
                        alt=""
                        src={
                          organizer?.image?.slice(0, 33) ===
                          "https://lh3.googleusercontent.com"
                            ? organizer.image
                            : organizer.image
                            ? `${organizer.image}`
                            : img
                        }
                        className="shadow-xl rounded-full w-36 h-36 align-middle border-none absolute -m-12 -mr-10 max-w-150-px"
                      />
                    ) : null}
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    {following ? (
                      <button
                        onClick={unFollow}
                        className="bg-blue-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        unfollow
                      </button>
                    ) : (
                      <button
                        onClick={follow}
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        follow
                      </button>
                    )}
                    <Link to={`/chat/${organizerId}`}>
                      <button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        messages
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {followersCount}
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Followers
                      </span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {eventCount}
                      </span>
                      <span className="text-sm text-blueGray-400">Events</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {postCount}
                      </span>
                      <span className="text-sm text-blueGray-400">Posts</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center"></div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12 ml-10">
                <div className="text-sm  mt-0 mb-2  font-bold ">
                  <input
                    value={organizer ? organizer.firstName : null}
                    disabled
                    type="text"
                    name="firstName"
                    className="p-2 uppercase rounded border w-full font-bold text-center sm:w-80 lg:w-96 border-gray-300 focus:border-primary focus:ring-0"
                  />
                </div>

                <div className="mb-2 ">
                  <input
                    value={organizer ? organizer.email : null}
                    disabled
                    type="text"
                    name="mobile"
                    className=" p-2 rounded border w-full font-bold sm:w-80 text-center lg:w-96 border-gray-300 focus:border-primary focus:ring-0"
                    placeholder="Mobile"
                  />
                </div>

                <div className="mb-2 ">
                  <input
                    value={organizer ? organizer.mobile : null}
                    disabled
                    type="text"
                    name="mobile"
                    className=" p-2 rounded border w-full font-bold sm:w-80 text-center lg:w-96 border-gray-300 focus:border-primary focus:ring-0"
                    placeholder="Mobile"
                  />
                </div>
              </div>

           {organizer?.about &&   <div className="mt-10 pt-10 border-t border-blueGray-200 text-center ">
                <p className="text-xl font-semibold">About: </p>
                <div className="flex flex-wrap justify-center">
                  <div className="w-full  lg:w-9/12 px-4">
                    <textarea
                      disabled
                      value={organizer ? organizer.about : null}
                      className="mb-4 w-full h-32 resize-none border-0 text-lg leading-relaxed "
                    ></textarea>
                  </div>
                </div>
              </div>}

              <div className="flex justify-center mb-10">
                {organizer && organizer.facebook && (
                  <Tooltip content="Follow">
                    <div className="flex items-center justify-center mx-4">
                      <a
                        href={organizer.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-facebook text-blue text-2xl"></i>
                      </a>
                    </div>
                  </Tooltip>
                )}

                {organizer && organizer.linkedin && (
                  <Tooltip content="Follow">
                    <div className="flex items-center justify-center mx-4">
                      <a
                        href={organizer.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-linkedin text-light-blue text-2xl"></i>
                      </a>
                    </div>
                  </Tooltip>
                )}

                {organizer && organizer.instagram && (
                  <Tooltip content="Follow">
                    <div className="flex items-center justify-center mx-4">
                      <a
                        href={organizer.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-instagram text-purple text-2xl"></i>
                      </a>
                    </div>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
          <Toaster />
        </div>
      </section>
    </div>
  );
}

export default OrganizerPro;
