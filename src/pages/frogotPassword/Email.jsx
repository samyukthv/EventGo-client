import React from "react";
import { Link } from "react-router-dom";
import signupimg from "../../assets/images/Keep bang'n  on We Heart It.jpg";
import { toast, Toaster } from "react-hot-toast";
import {  useFormik } from "formik";
import { emailConfirm } from "../../yup";
import {sendMail} from '../../api/UserApi'

const initialValues={
    email:""
}


function Email() {

const {values,errors,touched,handleBlur,handleSubmit,handleChange}=useFormik({
    initialValues:initialValues,
    validationSchema:emailConfirm,

    onSubmit: async(values)=>{
        console.log("hehhe");
        const response= await sendMail(values)
        if(response.data.message){
            toast.success(response.data.message)
        }
    }
})





  return (
    <div>
      <section className="p-20 h-screen bg-gradient-to-r from-fuchsia-200 to-violet-300 flex flex-col pt-10 px-20 justify-between">
        <div className="w-full  h-full flex items-center justify-center content-center align-middle">
          <div className="hidden md:block relative w-1/2 h-full flex-col content-center align-middle">
            <div className="absolute top-[15%] flex flex-col items-center ">
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
              alt="Signup"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="w-1/2 h-full flex flex-col pt-5 px-20 justify-between"
            style={{ backgroundColor: "rgb(232,240,254)" }}
          >
            <div className="w-full flex flex-col">
              <div className="w-full flex flex-col mb-2 max-w-[450px] ">
                <h3 className="text-3xl font-bold mb-2 mt-20 ">Verify Email</h3>
                <p className="text-base mb-2">
                  Welcome to EventGo, Please verify your email to create new
                  password
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="w-full flex flex-col  mt-20 ">
                <input type="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Email" name='email' className="w-full text-black py-1 my-2 border-b bg-transparent border-black outline-none focus:outline-none" />
              {errors.email && touched.email ? (
                <small className="form-error text-red-500">
                  {errors.email}
                </small>
              ) : null}
                </div>

                <div className="w-full flex flex-col mt-5">
                  <button 
                    type="submit"
                    className="text-white w-full bg-violet-500 hover:bg-violet- rounded-sm border-collapse  p-2 mt-2 text-center flex items-center justify-center"
                  >
                    confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Toaster />
        </div>
      </section>
    </div>
  );
}

export default Email;
