import React from 'react'
import {  useFormik } from "formik";
import { changePassword } from "../../yup"
import signupimg from "../../assets/images/juliette-contin-aETBbsCWBpo-unsplash.jpg";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from 'react-router-dom'; 
import { setNewPassword } from '../../api/UserApi';
import {useNavigate} from "react-router-dom"
import bgimg  from '../../assets/images/1f9bcc8e0cd6f1525f1c6a40ed6fbd88.jpg'
import {motion} from 'framer-motion'


const initialValues = {
  
    password: "",
    confirmPassword: ""
   
  };

function ForgotPassword() {
    const navigate=useNavigate()
    const params=useParams()
    const userid = params.id

    const {values,errors,touched,handleBlur,handleSubmit,handleChange}=useFormik({
        initialValues:initialValues,
        validationSchema:changePassword,
    
        onSubmit: async(values)=>{
            console.log("hehhe");
          const response=await setNewPassword(userid,values)
          if(response.data.updated){
          toast.success(response.data.message)
      
          setTimeout(() => {
            navigate("/login");
          }, 1000);
         
          }else{
            
            toast.error(response.data.message)
          }
        }
    })

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
        <div className="w-1/2 p-6 m-auto rounded-md shadow-md lg:max-w-xl border text-center border-purple-100 ">
          <h1 className="text-3xl font-semibold text-center text-purple-700">Reset Password</h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-2">
             
              <input
                type="password" onChange={handleChange} onBlur={handleBlur} value={values.password} placeholder="password" name='password'
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
                type="password" onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} placeholder="confirm password" name='confirmPassword'
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
               confirm 
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />

    </div>
  </motion.div>

  )
}

export default ForgotPassword

