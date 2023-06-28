import React from "react";
import { Link, useNavigate } from "react-router-dom";
import signupimg from "../../../assets/images/Keep bang'n  on We Heart It.jpg";
import { GoogleLogin } from "@react-oauth/google";
import { toast, Toaster } from "react-hot-toast";
import { loginOrganizer } from "../../../api/OrganizerApi";
import { loginSchema } from "../../../yup";
import jwt_decode from "jwt-decode";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setOrganizerDetails } from "../../../redux/organizerSlice";

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
    <section className="p-20 h-screen bg-gradient-to-t from-white to-blue-200 flex flex-col pt-10 px-20 justify-between">
      <div className="w-full  h-full flex items-center justify-center shadow-2xl ">
        <div className="hidden md:block relative w-1/2 h-full flex-col">
          <div className="absolute top-[15%] flex flex-col items-center">
            <h1 className="text-4xl text-black font-bold my-3 text-center">
              Sell Your Tickets
            </h1>
            <p className="text-xl text-white font-normal text-center">
              Sign in and secure your spot at the hottest events with our
              seamless ticket booking platform.
            </p>
            <p className="text-base text-center mt-28 text-white">
              Already have an account? Please log in
            </p>

            <button className="text-black w-1/2 bg-gradient-to-t from-white to-blue-200 rounded-md p-3 mt-2 text-center flex items-center justify-center">
              <Link to="/organizer/signup">Register</Link>
            </button>
            <div className="w-full sm:w-1 md:w-full mb-2 p-3 mt-2 text-center flex items-center justify-center">
              <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>
          </div>
          <img
            src={signupimg}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/2 h-full bg-gradient-to-t from-white to-blue-200 flex flex-col  px-20 justify-between">
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col mb-2 mt-5 max-w-[450px]">
              <h1 className="text-4xl text-black font-bold my-3 text-center">
                Welcome organizer..!!
              </h1>
              <h3 className="text-3xl font-bold mb-2 text-center">Log in</h3>
              <p className="text-base mb-2 mt-10 text-center">
                Welcome to EventGo, Please log in to your account
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="w-full flex flex-col pt-10">
                <input
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Email"
                  name="email"
                  className="w-full text-black py-1 my-2 border-b rounded-xl bg-transparent border-black outline-none focus:outline-none"
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
                  className="w-full text-black py-1 rounded-xl my-2 border-b bg-transparent border-black outline-none focus:outline-none"
                />
                {errors.password && touched.password ? (
                  <small className="form-error text-red-500">
                    {errors.password}
                  </small>
                ) : null}
              </div>

              <div className="w-full flex flex-col pt-">
                <button className="text-white w-full bg-violet-500 hover:bg-violet-700 rounded-md p-4 mt-5 text-center flex items-center justify-center">
                  Log in
                </button>
              </div>
            </form>
            <p className="text-sm ml-auto font-light cursor-pointer mt-5 underline underline-offset-2">
              Forgot Password ?
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
}

export default OrganizerLogin;
