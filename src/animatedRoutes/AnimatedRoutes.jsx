import React from 'react'
import { Route,Routes ,useLocation} from 'react-router-dom'
import UserRoute from '../routes/UserRoute'
import AdminRoute from '../routes/AdminRoute'
import OrganizerRoutes from '../routes/OrganizerRoutes'
import {AnimatePresence} from 'framer-motion'


function AnimatedRoutes() {
    const location = useLocation()
  return (
    <AnimatePresence>

    <Routes location={location} key={location.pathname}>
    <Route path="/*" element={<UserRoute/>} /> 
    <Route path="/admin/*" element={<AdminRoute/>} />
    <Route path="/organizer/*" element={<OrganizerRoutes/>}/>
   </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
