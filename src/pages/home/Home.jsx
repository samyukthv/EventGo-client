import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Banner from '../../components/banner/Banner'
import { toast, Toaster } from "react-hot-toast";
import RowCards from '../../components/rowcards/RowCards';


function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <h1 className="font-serif text-3xl my-10 ml-2 sm:ml-28 text-center sm:text-left">
        Your personalised events
      </h1>
      <RowCards />
      <h1 className="font-serif text-3xl my-10 ml-2 sm:ml-28 text-center sm:text-left">
        Most happening city
      </h1>
      <RowCards />
    </>
  );
  
}

export default Home
