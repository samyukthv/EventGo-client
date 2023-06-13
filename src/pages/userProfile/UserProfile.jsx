import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { toast,Toaster } from "react-hot-toast";
import { userLogout } from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import {profileUpdate}from "../../api/UserApi"
import img from "../../assets/images/avathar2.png"

  const PROFILE_URL = import.meta.env.VITE_PROFILE_URL;

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    email: userData?.email,
    mobile: userData?.mobile,
    image: userData?.image,
  });

  const [userUpdated, setUserUpdated] = useState(false);
  const updateButton = () => {
    setUserUpdated(true);
  };

  const [mobileValidation, setMobileValidation] = useState(true);
  const [emailValidation, setEmailValidation] = useState(true);
  const [validFirstName, setFirstNameValidate] = useState(true);
  const [validLastName, setLastNameValidate] = useState(true);

  const verifyMobile = (phoneNumber) => {
    if (phoneNumber.length === 10) {
      console.log("Valid phone number");
      setMobileValidation(true);
    } else {
      console.log("Invalid phone number");
      setMobileValidation(false);
    }
  };

  const verifyEmial = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      setEmailValidation(true);
      console.log("Valid email format");
    } else {
      setEmailValidation(false);
      console.log("Invalid email format");
    }
  };

  const verifyFirstName = (firstName) => {
    if (firstName.length === 0) {
      setFirstNameValidate(false);
    } else {
      setFirstNameValidate(true);
    }
  };

  const verifyLastName = (lastName) => {
    console.log("gigigig");
    if (lastName.length === 0) {
      setLastNameValidate(false);
    } else {
      setLastNameValidate(true);
    }
  };

const updateProfile= async()=>{
  console.log("ethiii");
const response = await profileUpdate(user)
if(response.data.updated){
  toast.success("profile updated successfully")
  setUserUpdated(false)
}
}



  return (
    <div>
      <Navbar />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          ></div>
        </section>
        <section className="relative  py-16 bg-blueGray-200">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-3/5 mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    {/* <div className="relative ml-8">

                        alt="..."
                        src={user.image.slice(0,33)=="https://lh3.googleusercontent.com"? user.image : user.image?`${PROFILE_URL}${user.image}`:img}/>
                        <img className='img col-md-2' src={reduxUser.image.slice(0, 33) == 'https://lh3.googleusercontent.com' ? reduxUser.image : reduxUser.image ? `${process.env.REACT_APP_URL}/public/images/${reduxUser.image}` : img} alt="" />

                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-14 lg:-ml-16 max-w-150-px"
                      />
                    </div> */}
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"></div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8"></div>
                  </div>
                </div>
                <div className="text-center mt-5">
                  <button
                    type="button"
                    class="inline-block rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    update image
                  </button>
                  <p className="text-sm text-gray-600 mt-5">
                         {user.email}
                        </p>

                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">




                      <p className="text-center mt-4 font-thin">First Name</p>
                      {!validFirstName && (
                        <p className="text-sm text-red-500">
                          *Please enter your first name
                        </p>
                      )}
                      <input
                        type="text"
                        name="firstName" 
                        className="p-2 rounded border w-full font-bold text-center sm:w-80 lg:w-96 border-gray-300 focus:border-primary focus:ring-0"
                        placeholder="First Name"
                        value={user.firstName}
                        onChange={(e) => {
                          setUser({ ...user, [e.target.name]: e.target.value });
                          updateButton();
                        }}
                        onBlur={() => verifyFirstName(user?.firstName)}
                      />





                      <p className="text-center mt-4 font-light ">Last Name</p>

                      {!validLastName && (
                        <p className="text-sm text-red-500">
                          Please enter your last name
                        </p>
                      )}
                      <input
                        type="text"
                        name="lasttName"
                        className=" p-2 rounded border w-full  sm:w-80 font-bold text-center lg:w-96 border-gray-300 focus:border-primary focus:ring-0"
                        placeholder="Last Name"
                        value={user.lastName}
                        onChange={(e) => {
                          setUser({ ...user, [e.target.name]: e.target.value });
                          updateButton();
                        }}
                        onBlur={() => verifyLastName(user?.lastName)}
                      />


                      <p className=" mt-4 text-center font-light">Mobile</p>

                      {!mobileValidation && (
                        <p className="text-sm text-red-500">
                          *Please enter your Mobile Number
                        </p>
                      )}
                      <input
                        type="text"
                        name="mobile"
                        className=" p-2 rounded border w-full font-bold sm:w-80 text-center lg:w-96 border-gray-300 focus:border-primary focus:ring-0"
                        placeholder="Mobile"
                        value={user.mobile}
                        onChange={(e) => {
                          setUser({ ...user, [e.target.name]: e.target.value });
                          updateButton();
                        }}
                        onBlur={() => verifyMobile(user?.mobile)}
                      />






                    </div>
                  </div>
                  {userUpdated && validLastName &&validFirstName&&emailValidation&& mobileValidation && (
                    <button
                      type="button" onClick={updateProfile}
                      className="inline-block rounded-full bg-primary px-6 pb-2 mt-5 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                      Update Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Toaster/>
        </section>
      </main>
    </div>
  );
}

export default UserProfile;
