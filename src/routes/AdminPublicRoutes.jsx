import React from 'react'
import { Navigate } from 'react-router-dom'

function AdminPublicRoutes(props) {
if(localStorage.getItem("admintoken")){
    return<Navigate to="/admin/home"/>
}else{
    return props.children
}
}

export default AdminPublicRoutes
