import React from 'react'
import { Navigate } from 'react-router-dom';




function OrganizerPublicRoutes(props) {
 if(localStorage.getItem("organizertoken")){
     return <Navigate to='/organizer/home'/>
    }else{
     return props.children

 }
}

export default OrganizerPublicRoutes
