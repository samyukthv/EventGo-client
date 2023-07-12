import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Banner from "../../components/banner/Banner";
import RowCards from "../../components/rowcards/RowCards";
import { getEventDetails, getOrganizerDetails ,personalChoice} from "../../api/UserApi";
import OrganizerCard from "../../components/rowCardOrganizer/OrganizerCard";
import { motion } from "framer-motion";
import Footer from "../../components/footer/Footer";
import SubBanner from "../../components/banner/SubBanner";
import bgimg from "../../assets/images/blur.jpg";
import { useSelector } from "react-redux";
import PostCards from "../../components/postCards/PostCards";

function Home() {
  const [events, setEvents] = useState([]);
  const userData = useSelector((state) => state.user);
  const[personal,setPersonal]=useState(null)

  useEffect(() => {
     getEventDetails().then((response) => {
      setEvents(response.data.events);
    });
  }, []);

  
  useEffect(()=>{
    if(!userData.id ==""){
      
      personalChoice(userData.id).then(res=>{
        setPersonal(res.data.personal);
      }).catch(err=>{
        
      })
    }
  },[])

  return (
    <motion.div
      className=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar />
      <div
        className=""
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
         
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
        // Adjust the value (5px) to increase or decrease the blur effect
            zIndex: -1,
          }}
        ></div>

        <Banner />
        <SubBanner />
        <h1 className="font-bold text-3xl my-10 ml-2 sm:ml-28 text-center sm:text-left">
          Your Personalised Events <span className="text-xs ">latest events from the organizers you follow</span>
        </h1>
        {userData.id !== "" && <RowCards props={personal} />}

        <div className="bg-gradient-to-t from-white to-blue-200 m-10 my-10 py-5">
          <div className="container mx-auto">
            <h1 className="text-center font-serif text-3xl mt-10">Welcome to the best ticket booking platform!</h1>
            <p className="text-center font-serif mx-4 mt-5">Discover a world of exciting events and secure your tickets with ease. Whether you're a music lover, a sports enthusiast, or a fan of live performances, we've got you covered. Browse through our extensive collection of upcoming events featuring top artists, thrilling sports matches, captivating theatrical performances, and much more. With just a few clicks, you can reserve your spot and ensure an unforgettable experience.</p>
            <p className="text-center font-serif mx-4 mt-5">Our user-friendly platform provides detailed event information, including dates, venues, artist lineups, and ticket prices, allowing you to make informed decisions. Explore different genres and categories, and find the perfect event that matches your interests and preferences.</p>
            <p className="text-center font-serif mx-4 mt-5">We prioritize convenience and reliability, offering secure online transactions and seamless ticket delivery options. Your satisfaction is our utmost priority, and our dedicated customer support team is always ready to assist you with any inquiries or concerns. Experience the joy of attending live events, creating lasting memories, and connecting with like-minded individuals. Join us on this exciting journey of exploration and entertainment. Book your tickets now and let the magic of live events unfold!</p>
          </div>
        </div>
        <h1 className="font-bold text-3xl my-10 ml-2 sm:ml-28 text-center sm:text-left">Latest Events</h1>
        <RowCards props={events} />

        <h1 className="font-bold text-3xl my-10 ml-2 sm:ml-28 text-center sm:text-left"> Organizer Posts</h1>
        <PostCards/>
        <div className="text-center ">
          <h1 className="font-bold text-3xl my-10 ml-2 sm:ml-28 text-center sm:text-left">Follow to know their latest events</h1>
          <OrganizerCard />
        </div>
        <Footer />
      </div>
    </motion.div>
  );
}

export default Home;
