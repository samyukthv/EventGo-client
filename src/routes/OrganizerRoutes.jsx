import React from "react";
import { Route, Routes } from "react-router-dom";
import OrganizerLogin from "../pages/organizer/login/OrganizerLogin";
import OrganizerSignup from "../pages/organizer/signup/OrganizerSignup";
import OrganizerHome from "../pages/organizer/home/OrganizerHome";
import OrganizerProtectedRoutes from "./OrganizerProtectedRoutes";
import OrganizerPublicRoutes from "./OrganizerPublicRoutes";
import AddEvent from "../pages/organizer/addEvent/AddEvent";
import OrganizerEventDetails from "../pages/organizer/event-details/OrganizerEventDetails";
import Chat from "../pages/organizer/chat/Chat";
import EditEvent from "../pages/organizer/event-details/EditEvent";
import PageNotFound from "../pages/organizer/error/PageNotFound";

function OrganizerRoutes() {
  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <OrganizerPublicRoutes>
            <OrganizerSignup />
          </OrganizerPublicRoutes>
        }
      />
      <Route
        path="/home"
        element={
          <OrganizerProtectedRoutes>
            <OrganizerHome />
          </OrganizerProtectedRoutes>
        }
      />
      <Route 
      path="/eventDetails/:id"
      element={
        <OrganizerProtectedRoutes><OrganizerEventDetails/></OrganizerProtectedRoutes>
      }
      />
      <Route
        path="/add-event"
        element={
          <OrganizerProtectedRoutes>
            <AddEvent />
          </OrganizerProtectedRoutes>
        }
      />
      <Route
        path="/"
        element={
          <OrganizerPublicRoutes>
            <OrganizerLogin />
          </OrganizerPublicRoutes>
        }
      />
      <Route
        path="/messages"
        element={
          <OrganizerProtectedRoutes>
            <Chat/>
          </OrganizerProtectedRoutes>
        }
      />
      <Route
        path="/edit-event/:id"
        element={
          <OrganizerProtectedRoutes>
            <EditEvent/>
          </OrganizerProtectedRoutes>
        }
      />

  <Route path="*" element={<PageNotFound />} /> 


    </Routes>
  );
}

export default OrganizerRoutes;
