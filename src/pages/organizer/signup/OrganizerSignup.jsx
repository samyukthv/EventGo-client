import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import bgimg  from '../../../assets/images/fg.jpg'
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { registerOrganizer } from "../../../api/OrganizerApi";
import { useFormik } from "formik";
import { signUpSchema } from "../../../yup";
import { auth } from "../../../firebase/Config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setOrganizerDetails } from "../../../redux/organizerSlice";
import { motion } from "framer-motion";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
  otp: "",
};

function OrganizerSignup() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [user, setUser] = useState(null);
  const [verify, setVerify] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,

      onSubmit: async (values) => {
        const response = await registerOrganizer(values);
        if (response.data.ready) {
          onSignup();
        } else if (response.data.message) {
          toast.error(response.data.message);
        }
      },
    });

  //FIREBASE FUNCTION

  function onCaptchVerify() {
    if (!window.RecaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "large",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        },
        auth
      );
    }
  }

  async function onSignup() {
    console.log("on signup in frontend");
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    console.log(values);
    const formatPhone = "+91" + values.mobile;
    const confirmation = await signInWithPhoneNumber(
      auth,
      formatPhone,
      appVerifier
    );
    setUser(confirmation);
    // ...
    console.log("show otp");
    setShowOtp(true);
    console.log(showOtp);
    toast.success("OTP send successfully!");
  }

  async function onOTPVerify() {
    try {
      setLoading(true);

      console.log(values.otp);
      await user.confirm(values.otp);
      console.log("verified");

      const response = await registerOrganizer(values);
      console.log("response of verified");
      console.log(response);
      if (response.data.status) {
        console.log(response);

        dispatch(
          setOrganizerDetails({
            id: response.data.organizerData._id,
            firstName: response.data.organizerData.firstName,
            lastName: response.data.organizerData.lastName,
            mobile: response.data.organizerData.mobile,
            image: response.data.organizerData?.image,
            email: response.data.organizerData.email,
          })
        );

        localStorage.setItem("organizertoken", response.data.token);

        navigate("/organizer/home");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      console.log("catch");
      toast.error("Invalid OTP");
    } finally {
    }
  }

  //google signup response function

  const responseMessage = async (response) => {
    console.log(response);
    let cred = jwt_decode(response.credential);
    console.log("🚀 ~ file: UserSignup.jsx:49 ~ responseMessage ~ cred:", cred);

    const googleReg = await registerOrganizer({
      email: cred.email,
      firstName: cred.given_name,
      lastName: cred.family_name,
      image: cred.picture,
      password: cred.sub,
    });
    if (googleReg.data.message) {
      toast.error(googleReg.data.message);
    } else if (googleReg.data.google) {
      console.log("in the org ");
      console.log(googleReg.data);
      dispatch(
        setOrganizerDetails({
          id: googleReg.data.organizerData._id,
          firstName: googleReg.data.organizerData.firstName,
          lastName: googleReg.data.organizerData.lastName,
          mobile: googleReg.data.organizerData?.mobile,
          image: googleReg.data.organizerData?.image,
          email: googleReg.data.organizerData.email,
        })
      );
      console.log("2 of the org");
      localStorage.setItem("organizertoken", googleReg.data.token);
      toast.success("organizer created successfully");
      setTimeout(() => {
        navigate("/organizer/home");
      }, 1000);
    }
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <>
      {showOtp ? (
         <motion.div
         initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
         >
     <div>
       <div className="relative flex flex-row min-h-screen bg-no-repeat bg-cover justify-end overflow-hidden" style={{ backgroundImage: `url(${bgimg})` }}>
         <span className="text-3xl   mx-1 pt-2 text-purple-500"> <ion-icon name="finger-print-outline"></ion-icon></span>
         <span className="bg-gradient-to-r font-monoton text-2xl cursor-pointer mt-2 from bg-purple-500 to-pink-600 text-transparent bg-clip-text">
           EventGo
         </span>
         <div className="w-1/2 p-6 m-auto rounded-md shadow-md lg:max-w-xl border text-center border-purple-100 ">
           <h1 className="text-3xl font-semibold text-center text-purple-700">Register</h1>
             <div className="mb-2">
              
               <input
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                name="otp"
                value={values.otp}
                 className="w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
               />
              
             </div>
             <div className="mt-6">
               <button
                 onClick={onOTPVerify}
                 className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                 {loading && (
                      <CgSpinner size={20} className="mt-1 animate-spin" />
                    )}
                    <span>verify</span>
               </button>
             </div>


           <p className="mt-8 text-xs font-light text-center text-gray-700">
             Have an account?{" "}
             <button className="font-medium text-purple-600 hover:underline">Login</button>
           </p>
         </div>
       </div>
       <Toaster />
 
     </div>
   </motion.div>
      ) : (
        <motion.div
        initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
    <div>
      <div className="relative flex flex-row min-h-screen bg-no-repeat bg-cover justify-end overflow-hidden" style={{ backgroundImage: `url(${bgimg})` }}>
        <span className="text-3xl   mx-1 pt-2 text-purple-500"> <ion-icon name="finger-print-outline"></ion-icon></span>
        <span className="bg-gradient-to-r font-monoton text-2xl cursor-pointer mt-2 from bg-purple-500 to-pink-600 text-transparent bg-clip-text">
          EventGo
        </span>
        <div className="w-1/2 p-6 m-auto rounded-md shadow-md lg:max-w-xl border text-center border-purple-100 ">
          <h1 className="text-3xl font-semibold text-center text-purple-700">Organizer Register</h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-2">
             
              <input
               type="text"
               placeholder="First Name"
               onChange={handleChange}
               onBlur={handleBlur}
               name="firstName"
               value={values.firstName}
                className="w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
               {errors.firstName && touched.firstName ? (
                      <small className="form-error text-red-500">
                        {errors.firstName}
                      </small>
                    ) : null}
            </div>
            <div className="mb-2">
             
              <input
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                onBlur={handleBlur}
                name="lastName"
                value={values.lastName}
                className="w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
               {errors.lastName && touched.lastName ? (
                      <small className="form-error text-red-500">
                        {errors.lastName}
                      </small>
                    ) : null}
            </div>
            <div className="mb-2">
              
              <input
                type="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                value={values.email}
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
                type="text"
                placeholder="Mobile No"
                onChange={handleChange}
                onBlur={handleBlur}
                name="mobile"
                value={values.mobile}
                className="w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
                 {errors.mobile && touched.mobile ? (
                      <small className="form-error text-red-500">
                        {errors.mobile}
                      </small>
                    ) : null}
            </div>
            <div className="mb-2">
             
              <input
                type="password"
                placeholder="password"
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                value={values.password}
                className="w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
               {errors.password && touched.password ? (
                      <small className="form-error text-red-500">
                        {errors.password}
                      </small>
                    ) : null}
            </div>
            <div className="mb-2">
              
              <input
              type="password"
              placeholder=" confirm password"
              onChange={handleChange}
              onBlur={handleBlur}
              name="confirmPassword"
              value={values.confirmPassword}
                className="w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
               {errors.confirmPassword && touched.confirmPassword ? (
                      <small className="form-error text-red-500">
                        {errors.confirmPassword}
                      </small>
                    ) : null}
            </div>
            <div className="mt-6">
              <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                Register
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
            Have an account?{" "}
          <Link to='/organizer/'>  <button className="font-medium text-purple-600 hover:underline">Login</button></Link>
          </p>
        </div>
      </div>
      <Toaster />

    </div>
  </motion.div>
      )}
    </>
  );
}

export default OrganizerSignup;
