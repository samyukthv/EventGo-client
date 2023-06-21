import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Banner from "../../components/banner/Banner";
import { toast, Toaster } from "react-hot-toast";
import RowCards from "../../components/rowcards/RowCards";
import { getEventDetails, getOrganizerDetails } from "../../api/UserApi";
import OrganizerCard from "../../components/rowCardOrganizer/OrganizerCard";

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const response = getEventDetails().then((response) => {
      setEvents(response.data.events);
    });
  }, []);

  console.log(events, 122);
  return (
    <>
  <div className="">
    <Navbar />
    <Banner />
    <h1 className="font-serif text-3xl my-10 ml-2 sm:ml-28 text-center sm:text-left">
      Your personalised events
    </h1>
    <RowCards props={events} />
    <div className="bg-gradient-to-t from-white to-blue-200 m-10 my-10 py-5">
      <div className="container mx-auto">
        <h1 className="text-center font-serif text-3xl mt-10">Welcome to the best ticket booking platform!</h1>
        <p className="text-center font-serif mx-4 mt-5">Discover a world of exciting events and secure your tickets with ease. Whether you're a music lover, a sports enthusiast, or a fan of live performances, we've got you covered. Browse through our extensive collection of upcoming events featuring top artists, thrilling sports matches, captivating theatrical performances, and much more. With just a few clicks, you can reserve your spot and ensure an unforgettable experience.</p>
        <p className="text-center font-serif mx-4 mt-5">Our user-friendly platform provides detailed event information, including dates, venues, artist lineups, and ticket prices, allowing you to make informed decisions. Explore different genres and categories, and find the perfect event that matches your interests and preferences.</p>
        <p className="text-center font-serif mx-4 mt-5">We prioritize convenience and reliability, offering secure online transactions and seamless ticket delivery options. Your satisfaction is our utmost priority, and our dedicated customer support team is always ready to assist you with any inquiries or concerns. Experience the joy of attending live events, creating lasting memories, and connecting with like-minded individuals. Join us on this exciting journey of exploration and entertainment. Book your tickets now and let the magic of live events unfold!</p>
      </div>
    </div>
    <h1 className="font-serif text-3xl my-10 ml-2 sm:ml-28 text-center sm:text-left">Latest Events</h1>
    <RowCards props={events} />
    <div className="text-center ">
      <h1 className="font-serif text-3xl my-10 ml-2 sm:ml-28 text-center sm:text-left">Organizers You Should Follow</h1>
      <OrganizerCard />
    </div>
  </div>
</>

  );
}

export default Home;
