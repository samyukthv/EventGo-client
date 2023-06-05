import React from 'react'
import {Navigate} from "react-router-dom"

function OrganizerProtectedRoutes(props) {

if(localStorage.getItem("organizertoken")){
return props.children
} if (!localStorage.getItem("organizerToken")) {
    return <Navigate to="/organizer/" />
  }

}

export default OrganizerProtectedRoutes
