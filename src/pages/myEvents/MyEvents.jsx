import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useSelector } from "react-redux";
import { myEvents } from "../../api/UserApi";
import { useState } from "react";
import RowCards from "../../components/rowcards/RowCards";
import img from "../../assets/images/fg.jpg";
import Footer from "../../components/footer/Footer";

function MyEvents() {
  const [pastEvents, setPastEvents] = useState(null);
  const [futureEvents, seFutureEvents] = useState(null);
  const userData = useSelector((state) => state.user);

  console.log(userData, 89);
  useEffect(() => {
    if (!userData.id == "") {
      myEvents(userData.id)
        .then((res) => {
           setPastEvents(res.data.pastEvents);
          seFutureEvents(res.data.futureEvents);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  console.log(futureEvents, 88);
  return (
    <div className="">
    <Navbar />
    <h1 className="font-bold text-3xl mt-10 mb-10 ml-2 sm:ml-28 text-center sm:text-left">
      Your Future Events{" "}
      <span className="text-xs">latest events that are on the way</span>
    </h1>

    <div className="flex justify-center ">
      {futureEvents && futureEvents.length > 0 ? (
        <RowCards props={futureEvents} />
      ) : (
        <div
        className="w-full sm:w-full h-72 bg-black mx-10 flex justify-center items-center font-bold text-3xl"
        style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1>Sorry, currently you don't have any future events booked 😢</h1>
        </div>
      )}
    </div>

    <h1 className="font-bold text-3xl mt-10 mb-10 ml-2 sm:ml-28 text-center sm:text-left">
      Your Past Events{" "}
      <span className="text-xs">events that you have participated</span>
    </h1>
    <div className="flex justify-center mb-10">
      {pastEvents && pastEvents.length > 0 ? (
        <RowCards props={pastEvents} />
      ) : (
        <div
          className="w-full sm:w-full h-72 bg-black mx-10 flex justify-center items-center font-bold text-3xl"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1>Sorry, currently you haven't participated in any event 😢</h1>
        </div>
      )}
    </div>
   <Footer/>
  </div>

  );
}

export default MyEvents;
