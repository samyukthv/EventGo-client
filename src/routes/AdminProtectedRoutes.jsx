import React from "react"
import { Navigate } from "react-router-dom"

function AdminProtectedRoutes(props){
    if(localStorage.getItem("admintoken")){
        return props.children
    }if(!localStorage.getItem("admintoken")){
        return <Navigate to="/admin/"/>
    }
}

export default AdminProtectedRoutes