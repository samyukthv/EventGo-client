import React from 'react'
import { Route, Routes } from 'react-router-dom'
import OrganizerLogin from '../pages/organizer/login/OrganizerLogin'
import OrganizerSignup from '../pages/organizer/signup/OrganizerSignup'
import OrganizerHome from '../pages/organizer/home/OrganizerHome'
import OrganizerProtectedRoutes from './OrganizerProtectedRoutes'
import OrganizerPublicRoutes from './OrganizerPublicRoutes'

function OrganizerRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<OrganizerPublicRoutes><OrganizerSignup /></OrganizerPublicRoutes>} />
      <Route
        path="/home"
        element={
          <OrganizerProtectedRoutes>
            <OrganizerHome />
          </OrganizerProtectedRoutes>
        }
      />
      <Route path="/" element={<OrganizerPublicRoutes><OrganizerLogin /></OrganizerPublicRoutes>} />
    </Routes>
  )
}

export default OrganizerRoutes

