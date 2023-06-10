import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import signupimg from "../../../assets/images/Keep bang'n  on We Heart It.jpg";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { registerOrganizer } from "../../../api/OrganizerApi";
import { useFormik } from "formik";
import { signUpSchema } from "../../../yup";
import { auth } from "../../../firebase/Config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setOrganizerDetails } from "../../../redux/organizerSlice";

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
      dispatch(
        setOrganizerDetails({
          id: googleReg.data.organizerData._id,
          firstName: googleReg.data.organizerData.firstName,
          lastName: googleReg.data.organizerData.lastName,
          mobile: googleReg.data.organizerData.mobile,
          image: googleReg.data.organizerData?.image,
          email: googleReg.data.organizerData.email,
        })
      );
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
        <section className="p-20 h-screen bg-gradient-to-r from-fuchsia-200 to-violet-300 flex flex-col pt-10 px-20 justify-between">
          <div className="w-full  h-full flex items-center justify-center">
            <div className="hidden md:block relative w-1/2 h-full flex-col">
              <div className="absolute top-[15%] flex flex-col items-center">
                <h1 className="text-4xl text-black font-bold my-3 text-center">
                  Unlock unforgettable experiences.
                </h1>
                <p className="text-xl text-white font-normal text-center">
                  Sign in and secure your spot at the hottest events with our
                  seamless ticket booking platform.
                </p>
              </div>
              <img
                src={signupimg}
                alt="Login"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-1/2 h-full bg-gradient-to-r from-fuchsia-200 to-violet-200 flex flex-col  p-20 justify-between">
              <div className="w-full flex flex-col">
                <div className="w-full flex flex-col mb-2 max-w-[450px]">
                  <h3 className="text-3xl font-bold mb-2">Verify otp</h3>
                  <p className="text-base mb-2">
                    Welcome to EventGo, Please verify your account
                  </p>
                </div>

                <div className="w-full flex flex-col pt-10">
                  <input
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="otp"
                    value={values.otp}
                    className="w-full text-black py-1 my-2 border-b bg-transparent border-black outline-none focus:outline-none"
                  />
                </div>

                <div className="w-full flex flex-col pt-10">
                  <button
                    onClick={onOTPVerify}
                    className="text-white w-full bg-violet-500 hover:bg-violet-700 rounded-md p-4 mt-5 text-center flex items-center justify-center"
                  >
                    {loading && (
                      <CgSpinner size={20} className="mt-1 animate-spin" />
                    )}
                    <span>verify</span>
                  </button>
                </div>
              </div>
            </div>
            <Toaster />
          </div>
        </section>
      ) : (
        <section className="p-20 h-screen bg-gradient-to-r from-fuchsia-200 to-violet-300 flex flex-col pt-10 px-20 justify-between">
          <div className="w-full  h-full flex items-center justify-center">
            <div className="hidden md:block relative w-1/2 h-full flex-col">
              <div className="absolute top-[15%] flex flex-col items-center">
                <h1 className="text-4xl text-black font-bold my-3 text-center">
                  Sell Your Tickets
                </h1>
                <p className="text-xl text-white font-normal text-center">
                  Sign in and secure your spot at the hottest events with our
                  seamless ticket booking platform.
                </p>
                <p className="text-base text-center mt-28">
                  Already have an account? Please log in
                </p>

                <button className="text-black w-1/2 bg-violet-500 hover:bg-violet-700 rounded-md p-3 mt-2 text-center flex items-center justify-center">
                  <Link to="/organizer/login"> Log in</Link>
                </button>
                <div className="sm:w-1 md:w-full  mb-2 p-3 mt-2 text-center flex items-center justify-center">
                  <GoogleLogin
                    onSuccess={responseMessage}
                    onError={errorMessage}
                  />
                </div>
              </div>

              <img
                src={signupimg}
                alt="Signup"
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="w-1/2 h-full flex flex-col  px-20 justify-between"
              style={{ backgroundColor: "rgb(232,240,254)" }}
            >
              <div className="w-full flex flex-col">
                <div className="w-full flex flex-col mb-2 max-w-[450px]">
                  <h1 className="text-4xl text-black font-bold my-3 text-center">
                    Welcome organizer..!!
                  </h1>
                  <h3 className="text-3xl font-bold mb-2 text-center">
                    Log in
                  </h3>
                  <p className="text-base mb-2 text-center">
                    Welcome to EventGo, Please log in to your account
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="w-full flex flex-col">
                    <input
                      type="text"
                      placeholder="First Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="firstName"
                      value={values.firstName}
                      className="w-full text-black py-1 my-1 border-b bg-transparent rounded-sm border-collapse border-black outline-none focus:outline-none"
                    />
                    {errors.firstName && touched.firstName ? (
                      <small className="form-error text-red-500">
                        {errors.firstName}
                      </small>
                    ) : null}

                    <input
                      type="text"
                      placeholder="Last Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="lastName"
                      value={values.lastName}
                      className="w-full text-black py-1 my-1 border-b bg-transparent rounded-sm border-collapse border-black outline-none focus:outline-none"
                    />
                    {errors.lastName && touched.lastName ? (
                      <small className="form-error text-red-500">
                        {errors.lastName}
                      </small>
                    ) : null}

                    <input
                      type="email"
                      placeholder="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="email"
                      value={values.email}
                      className="w-full text-black py-1 my-1 border-b rounded-sm border-collapse bg-transparent border-black outline-none focus:outline-none"
                    />
                    {errors.email && touched.email ? (
                      <small className="form-error text-red-500">
                        {errors.email}
                      </small>
                    ) : null}

                    <input
                      type="password"
                      placeholder="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
                      value={values.password}
                      className="w-full text-black py-1 my-1 mb-3 border-b bg-transparent rounded-sm border-collapse border-black outline-none focus:outline-none"
                    />
                    {errors.password && touched.password ? (
                      <small className="form-error text-red-500">
                        {errors.password}
                      </small>
                    ) : null}

                    <input
                      type="password"
                      placeholder=" confirm password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="confirmPassword"
                      value={values.confirmPassword}
                      className="w-full text-black py-1 my-1 mb-3 border-b bg-transparent rounded-sm border-collapse border-black outline-none focus:outline-none"
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <small className="form-error text-red-500">
                        {errors.confirmPassword}
                      </small>
                    ) : null}
                    <input
                      type="text"
                      placeholder="Mobile No"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="mobile"
                      value={values.mobile}
                      className="w-full text-black py-1 my-1 mb-3 border-b bg-transparent rounded-sm border-collapse border-black outline-none focus:outline-none"
                    />
                    {errors.mobile && touched.mobile ? (
                      <small className="form-error text-red-500">
                        {errors.mobile}
                      </small>
                    ) : null}
                  </div>

                  <div id="recaptcha-container"></div>
                  <div className="w-full flex flex-col mt-5">
                    <button
                      type="submit"
                      className="text-white w-full bg-violet-500 hover:bg-violet- rounded-sm border-collapse  p-2 mt-2 text-center flex items-center justify-center"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <Toaster />
          </div>
        </section>
      )}
    </>
  );
}

export default OrganizerSignup;
