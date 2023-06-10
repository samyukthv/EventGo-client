import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Banner from '../../components/banner/Banner'
import { toast, Toaster } from "react-hot-toast";
import RowCards from '../../components/rowcards/RowCards';
import { getEventDetails} from "../../api/UserApi"
import OrganizerCard from '../../components/rowCardOrganizer/OrganizerCard';


function Home() {
const[events,setEvents]=useState([])
useEffect(()=>{
 
  const response =  getEventDetails().then((response)=>{
   
    setEvents(response.data.events)
    
  })
},[])






  return (
    <>
      <Navbar />
      <Banner />
      <h1 className="font-serif text-3xl my-10 ml-2 sm:ml-28 text-center sm:text-left">
        Your personalised events
      </h1>
      <RowCards  props={events} />
      <h1 className="font-serif text-3xl my-10 ml-2 sm:ml-28 text-center sm:text-left">
        Latest Events
      </h1>
      <RowCards props={events} />
      <h1 className="font-serif text-3xl my-10 ml-2 sm:ml-28 text-center sm:text-left">
    Organizers You Should Follow
      </h1>
      {/* <OrganizerCard/> */}
    </>
  );
  
}

export default Home
