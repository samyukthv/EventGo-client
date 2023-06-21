import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import{ useDispatch,useSelector} from "react-redux"
import jwt_decode from 'jwt-decode'


function UserProtectedRoutes(props) {
   


  if (localStorage.getItem('token')) {
      return props.children;
    }
    setTimeout(()=>{

      toast.error('You have no account, Please Login');
    },500)
    return <Navigate to="/login" />;
}

export default UserProtectedRoutes
