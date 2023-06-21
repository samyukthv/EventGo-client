import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import EventHeader from '../../components/eventHeader/EventHeader'
import EventBody from '../../components/eventHeader/EventBody'
import EventInfo from '../../components/eventHeader/EventInfo'

function EventDetails() {
  return (
    <div className=''>
      <Navbar/>
      {/* <EventHeader/> */}
      <EventInfo/>
      <EventBody/>
    </div>
  )
}

export default EventDetails
