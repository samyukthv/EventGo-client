import React from "react";
import { Link, useNavigate } from "react-router-dom";
import bgimg  from '../../../assets/images/fg.jpg'
import { GoogleLogin } from "@react-oauth/google";
import { toast, Toaster } from "react-hot-toast";
import { loginOrganizer } from "../../../api/OrganizerApi";
import { loginSchema } from "../../../yup";
import jwt_decode from "jwt-decode";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setOrganizerDetails } from "../../../redux/organizerSlice";
import {motion} from 'framer-motion'

const initialValues = {
  email: "",
  password: "",
};

function OrganizerLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,

      onSubmit: async (values) => {
        console.log("onsubmit");
        const response = await loginOrganizer(values);
        if (response.data.login) {
          console.log("hello");
          console.log(response.data);
          dispatch(
            setOrganizerDetails({
              id: response.data.organizer._id,
              firstName: response.data.organizer.firstName,
              lastName: response.data.organizer.lastName,
              mobile: response.data.organizer.mobile,
              image: response.data.organizer?.image,
              email: response.data.organizer.email,
              about: response.data.organizer?.about,
              instagram: response.data.organizer?.instagram,
              linkedin: response.data.organizer?.linkedin,
              facebook: response.data.organizer?.facebook,
            })
          );

          console.log("after dispatch");
          console.log(response.data.organizer.lastName);
          localStorage.setItem("organizertoken", response.data.token);
          toast.success(response.data.message);
          navigate("/organizer/home");
        } else {
          toast.error(response.data.message);
        }
      },
    });

  // GOOGLE SIGNUP RESPONSE FUNCTION
  const responseMessage = async (response) => {
    console.log(response);
    let cred = jwt_decode(response.credential);
    console.log("🚀 ~ file: UserSignup.jsx:49 ~ responseMessage ~ cred:", cred);

    const googleReg = await loginOrganizer({
      email: cred.email,
      password: cred.sub,
    });
    console.log(googleReg.data.login);
    if (googleReg.data.login) {
      console.log(googleReg.data);
      toast.success(googleReg.data.message);
      console.log("before");
      dispatch(
        setOrganizerDetails({
          id: googleReg.data.organizer._id,
          firstName: googleReg.data.organizer.firstName,
          lastName: googleReg.data.organizer.lastName,
          mobile: googleReg.data.organizer.mobile,
          image: googleReg.data.organizer?.image,
          email: googleReg.data.organizer.email,
          about: googleReg.data.organizer?.about,
          instagram: googleReg.data.organizer?.instagram,
          linkedin: googleReg.data.organizer?.linkedin,
          facebook: googleReg.data.organizer?.facebook,
          coverImage: googleReg.data.organizer?.coverImage,
        })
      );
      console.log("after");
      localStorage.setItem("organizertoken", googleReg.data.token);

      
        navigate("/organizer/home");
      
    } else {
      toast.error(googleReg.data.message);
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
          <h1 className="text-3xl font-semibold text-center text-purple-700">Organizer Log in</h1>
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
            Dont have an account?{" "}
           <Link to="/organizer/signup"> <button className="font-medium text-purple-600 hover:underline">Register</button></Link>
          </p>
        </div>
      </div>
      <Toaster />

    </div>
  </motion.div>
  );
}

export default OrganizerLogin;
