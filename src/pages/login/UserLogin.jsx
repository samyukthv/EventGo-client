import React from 'react'
import {Link,useNavigate} from'react-router-dom'
import signupimg from "../../assets/images/Keep bang'n  on We Heart It.jpg";
import { GoogleLogin } from "@react-oauth/google";
import { loginUser } from '../../api/UserApi';
import jwt_decode from "jwt-decode";
import { toast, Toaster } from "react-hot-toast";
import {  useFormik } from "formik";
import { loginSchema } from "../../yup";
import {useDispatch} from 'react-redux'
import {setUserDetails} from "../../redux/userSlice"
import {motion} from 'framer-motion'
 import bgimg  from '../../assets/images/fg.jpg'

const initialValues={
  email:"",
  password:""
}

function UserLogin() {
const navigate=useNavigate()
const dispatch=useDispatch()

//USE FORMIK AND ITS VALIDATION

const {values,errors,touched,handleBlur,handleSubmit,handleChange}= useFormik({
      initialValues:initialValues,
      validationSchema:loginSchema,


      onSubmit: async(values)=>{
        console.log("onsubmit");
         const response = await loginUser(values)
         if (response.data.login) {
          console.log(response.data.token);
          localStorage.setItem("token", response.data.token)
          toast.success(response.data.message);
          dispatch(
            setUserDetails({
              id:response.data.user._id,
              firstName:response.data.user.firstName,
              lastName:response.data.user.lastName,
              mobile:response.data.user.mobile,
              image:response.data.user?.image,
              email:response.data.user.email,
              
            })
          )
          navigate("/");
    
        } else {
          toast.error(response.data.message)
        }
          
      }

})


   // GOOGLE SIGNUP RESPONSE FUNCTION
   const responseMessage = async (response) => {
    let cred = jwt_decode(response.credential);

    const googleReg = await loginUser({
      email: cred.email,
      password: cred.sub,
    });
    if (googleReg.data.login) {
      toast.success(googleReg.data.message);
      console.log("////////////////////////////////////////////////////////////");
    
      localStorage.setItem("token", googleReg.data.token)
     
      dispatch(
        setUserDetails({
          id:googleReg.data.user._id,
          firstName:googleReg.data.user.firstName,
          lastName:googleReg.data.user.lastName,
          mobile:googleReg.data.user?.mobile,
          image:googleReg.data.user?.image,
          email:googleReg.data.user.email
        })
  
      )
      
        navigate("/");
      

    } else {
      toast.error(googleReg.data.message)
    }
  };


  const errorMessage = (error) => {
    console.log(error);
  };


  return (
    <motion.div
    initial={{width:0}}
    animate={{width:'100%'}}
    exit={{x:window.innerWidth,transition:{duration:0.2}}}
        >
    <div>
      <div className="relative flex flex-row min-h-screen bg-no-repeat bg-cover justify-end overflow-hidden" style={{ backgroundImage: `url(${bgimg})` }}>
        <span className="text-3xl   mx-1 pt-2 text-purple-500"> <ion-icon name="finger-print-outline"></ion-icon></span>
        <span className="bg-gradient-to-r font-monoton text-2xl cursor-pointer mt-2 from bg-purple-500 to-pink-600 text-transparent bg-clip-text">
          EventGo
        </span>
        <div className="w-1/2 p-6 m-auto rounded-md shadow-2xl lg:max-w-xl border text-center border-purple-100 ">
          <h1 className="text-3xl font-semibold text-center text-purple-700">Log in</h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-2">
             
              <input
             type="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
             placeholder="Email"
             name="email"
                className="w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
                {errors.email && touched.email ? (
            <small className="form-error text-red-500">
              {errors.email}
            </small>
          ) : null}
            </div>
           
            
            
            <div className="mb-2">
             
              <input
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Password"
                name="password"
                className="w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
                 {errors.password && touched.password ? (
            <small className="form-error text-red-500">
              {errors.password}
            </small>
          ) : null}
            </div>
           
            <div className="mt-6">
              <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                Log in
              </button>
            </div>
            <div className="mt-3" id="recaptcha-container"></div>
          </form>
          <div className="sm:w-1 md:w-full  mb-2 p-3 mt-2 text-center flex items-center justify-center">
                  <GoogleLogin
                    onSuccess={responseMessage}
                    onError={errorMessage}
                  />
                </div>
                <p className="mt-8 text-xs font-light text-center text-gray-700">
            Forgot Password?{" "}
            <Link to="/confirm-email"> <button className="font-medium text-purple-600 hover:underline">change Password</button></Link> 
          </p>
                
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            Have an account?{" "}
            <button className="font-medium text-purple-600 hover:underline">Login</button>
          </p>
        </div>
      </div>
      <Toaster />

    </div>
  </motion.div>
  
  )
}

export default UserLogin
