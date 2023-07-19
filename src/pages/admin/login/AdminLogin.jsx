import React from 'react'
import bgimg  from '../../../assets/images/fg.jpg'
import {motion} from 'framer-motion'
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../../yup";
import { loginAdmin } from '../../../api/adminApi';


const initialValues = {
    email: "",
    password: "",
  };
  
function AdminLogin() {
const navigate = useNavigate();
const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,

    onSubmit: async (values) => {
   
      await loginAdmin(values).then(res=>{
      if(res?.response?.status==400){
        toast.error(res.response.data.message)
      }else{
        localStorage.setItem("admintoken", res.data.token);
         toast.success("login successful")
         navigate("/admin/home")
      }
     
      })

    },
  });

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
          <h1 className="text-3xl font-semibold text-center text-purple-700">Admin Log in</h1>
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
         
               
                
         
        </div>
      </div>
      <Toaster />

    </div>
  </motion.div>
  )
}

export default AdminLogin
