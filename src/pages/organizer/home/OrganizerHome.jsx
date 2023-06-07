import React from 'react'
import Navbar from '../../../components/organizer/organizerNavbar/Navbar'
import Profile from '../../../components/organizer/profile/Profile'
import OrganizerPosts from '../../../components/organizer/posts/OrganizerPosts'

function OrganizerHome() {
  return (
    <div>
     <Navbar/>
     <Profile/>
     <OrganizerPosts/>
    </div>
  )
}

export default OrganizerHome
