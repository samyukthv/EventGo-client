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
    <motion.section 
    initial={{width:0}}
    animate={{width:'100%'}}
    exit={{x:window.innerWidth,transition:{duration:0.2}}}

    className="p-4 md:p-20 h-screen bg-gradient-to-t from-white to-blue-200 flex flex-col pt-10 px-4 md:px-20 justify-between">
    <div className="w-full h-full flex items-center justify-center shadow-2xl">
      <div className="hidden md:block relative w-full md:w-1/2 h-full flex-col">
        <div className="absolute top-[15%] flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl text-black font-bold mt-12 md:mt-28 my-3 text-center">
            Unlock unforgettable experiences.
          </h1>
          <p className="text-base md:text-xl text-white font-normal text-center">
            Sign in and secure your spot at the hottest events with our seamless ticket booking platform.
          </p>
          <p className="text-base text-white text-center mt-12">
            Already have an account? Please log in.
          </p>
          <button className="text-black w-1/2 bg-gradient-to-t from-white to-blue-200 rounded-md p-3 mt-2 text-center flex items-center justify-center">
            <Link to='/signup'>Register</Link>
          </button>
        </div>
        <img src={signupimg} alt="Login" className="w-full h-full object-cover" />
      </div>
  
      <div className="w-full md:w-1/2 h-full flex flex-col p-4 md:p-20 justify-between  bg-white bg-opacity-20" >
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col mb-2 max-w-[450px]">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Log in</h3>
            <p className="text-base md:text-lg mb-2">Welcome to EventGo, Please log in to your account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col pt-4 md:pt-10">
            <input
  type="email"
  onChange={handleChange}
  onBlur={handleBlur}
  value={values.email}
  placeholder="Email"
  name="email"
  className="w-full py-2 my-2 border-b border-black outline-none bg-transparent text-black placeholder-gray-400 focus:placeholder-opacity-50"
/>
              {errors.email && touched.email ? (
                <small className="form-error text-red-500">
                  {errors.email}
                </small>
              ) : null}
  
  <input
  type="password"
  onChange={handleChange}
  onBlur={handleBlur}
  value={values.password}
  placeholder="Password"
  name="password"
  className="w-full py-2 my-2 border-b border-black outline-none bg-transparent text-black placeholder-gray-400 focus:placeholder-opacity-50"
/>
              {errors.password && touched.password ? (
                <small className="form-error text-red-500">
                  {errors.password}
                </small>
              ) : null}
            </div>
  
            <div className="w-full flex flex-col pt-4 md:pt-10">
              <button type='submit' className="text-white w-full bg-violet-500 hover:bg-violet-700 rounded-md p-4 text-center flex items-center justify-center">Log in</button>
            </div>
          </form>
       </div>
       <Link to="/confirm-email">          <p className="text-sm md:text-base ml-auto mt-5 md:mt-4 font-light cursor-pointer underline underline-offset-2">Forgot Password?</p>
</Link> 
        <div className="w-full sm:w-1 md:w-full mb-2 p-3 mt-2 text-center flex items-center justify-center">
          <GoogleLogin
            onSuccess={responseMessage}
            onError={errorMessage}
          />
        </div>
      </div>
    </div>
    <Toaster />
  </motion.section>
  
  
  )
}

export default UserLogin
