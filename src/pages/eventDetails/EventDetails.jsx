import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import EventHeader from '../../components/eventHeader/EventHeader'
import EventBody from '../../components/eventHeader/EventBody'
import EventInfo from '../../components/eventHeader/EventInfo'
import {motion}from "framer-motion"

function EventDetails() {
  return (
    <motion.div className=''
       initial={{width:0}}
    animate={{width:'100%'}}
    exit={{x:window.innerWidth,transition:{duration:0.2}}}
    >
      <Navbar/>
      {/* <EventHeader/> */}
      <EventInfo/>
      <EventBody/>
    </motion.div>
  )
}

export default EventDetails
