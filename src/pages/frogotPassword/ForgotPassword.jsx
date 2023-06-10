import React from 'react'
import {  useFormik } from "formik";
import { changePassword } from "../../yup"
import signupimg from "../../assets/images/juliette-contin-aETBbsCWBpo-unsplash.jpg";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from 'react-router-dom'; 
import { setNewPassword } from '../../api/UserApi';
import {useNavigate} from "react-router-dom"


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
                <h3 className="text-3xl font-bold mb-2   mt-20">Reset your password</h3>
                <p className="text-base mb-2">
                  Welcome to EventGo, Please change your  password
                  
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="w-full flex flex-col  mt-20  ">
                <input type="password" onChange={handleChange} onBlur={handleBlur} value={values.password} placeholder="password" name='password' className="w-full text-black py-1 my-2 border-b bg-transparent border-black outline-none focus:outline-none" />
              {errors.password && touched.password ? (
                <small className="form-error text-red-500">
                  {errors.password}
                </small>
              ) : null}

<input type="password" onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} placeholder="confirm password" name='confirmPassword' className="w-full text-black py-1 my-2 border-b bg-transparent border-black outline-none focus:outline-none" />
              {errors.confirmPassword && touched.confirmPassword ? (
                <small className="form-error text-red-500">
                  {errors.confirmPassword}
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

  )
}

export default ForgotPassword

