import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { toast, Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { profileUpdate } from "../../api/UserApi";
import img from "../../assets/images/avathar2.png";
import { setUserDetails } from "../../redux/userSlice";
import cover from "../../assets/images/rachel-coyne-U7HLzMO4SIY-unsplash.jpg";
import { motion } from "framer-motion";
import { userImageUpdate } from "../../api/UserApi";
import wall from "../../assets/images/chatbg.jpg"

const PROFILE_URL = import.meta.env.VITE_PROFILE_URL;

function UserProfile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [uservalues, setUserValues] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    email: userData?.email,
    mobile: userData?.mobile,
    image: userData?.image,
  });

  const [pimage, setImage] = useState(null);
  const uploadImage = async () => {
    try {
      console.log("hyhyh");
      const formData = new FormData();
      formData.append("profileImage", pimage);
      formData.append("id", JSON.stringify(userData.id));

      const response = await userImageUpdate(formData, {
        headers: {
          "content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(response, 23);
      if (response.data.user.image) {
        console.log("hello");
        toast.success("image updated successfully");
        dispatch(
          setUserDetails({
            id: response.data.user?._id,
            firstName: response.data.user?.firstName,
            lastName: response.data.user?.lastName,
            mobile: response.data.user?.mobile,
            image: response.data.user?.image,
            email: response.data.user?.email,
          })
        );
        setImage(null);
        setUserValues((prevValues) => ({
          ...prevValues,
          image: response.data.user?.image,
        }));       
        console.log("dispatched");
        console.log("New image value in Redux:", response.data.user?.image);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [userUpdated, setUserUpdated] = useState(false);
  const updateButton = () => {
    setUserUpdated(true);
  };

  const [mobileValidation, setMobileValidation] = useState(true);
  const [validFirstName, setFirstNameValidate] = useState(true);
  const [validLastName, setLastNameValidate] = useState(true);
  




  const verifyMobile = (phoneNumber) => {
    const mobileNumberRegex = /^\d{10}$/; // Regular expression to match 10 digits
  
    if (!isNaN(phoneNumber) && mobileNumberRegex.test(phoneNumber)) {
      setMobileValidation(true); // Valid mobile number
    } else {
      setMobileValidation(false); // Invalid mobile number
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
    if (lastName.length === 0) {
      setLastNameValidate(false);
    } else {
      setLastNameValidate(true);
    }
  };

  const updateProfile = async () => {
    console.log(uservalues);
    const response = await profileUpdate(uservalues);
    if (response.data.updated) {
      dispatch(
        setUserDetails({
          id: response.data.user._id,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          mobile: response.data.user.mobile,
          image: response.data.user?.image,
          email: response.data.user.email,
        })
      );
      toast.success("profile updated successfully");
      setUserUpdated(false);
    }
  };

  console.log(uservalues.image, 33);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
    >
      <Navbar />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-500-px bg-center bg-cover"
            style={{
              backgroundImage: `url(${cover})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div
            className="top-0 bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          ></div>
        </section>
        <section className="relative   bg-blueGray-200 ">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="relative flex flex-col min-w-0 break-words   w-3/5 mb-6 shadow-xl rounded-lg -mt-96"  style={{ backgroundImage: `url(${wall})`,backgroundSize:cover, backgroundPosition: "center", }}>
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div class="relative">
                      <div
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          marginTop: "-50px", // Adjust the margin value as needed
                        }}
                      >
                        <img
                          src={
                            uservalues.image.slice(0, 33) ===
                            "https://lh3.googleusercontent.com"
                              ? uservalues.image
                              : uservalues.image
                              ? `${PROFILE_URL}${uservalues.image}`
                              : img
                          }
                          class="shadow-xl h-auto align-middle border-none max-w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"></div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8"></div>
                  </div>
                </div>
                <div className="text-center mr-2 ">
                  {pimage ? (
                    <label
                      onClick={uploadImage}
                      class="inline-block rounded-full bg-success   mt-3 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                    >
                      confirm upload
                    </label>
                  ) : (
                    <label
                      htmlFor="uploadImage"
                      class="inline-block rounded-full bg-primary px-6  pb-2 pt-2.5 ml-3 mt-3 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                      update image
                    </label>
                  )}

                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                    name="profilePic"
                    id="uploadImage"
                  />

                  <p className="text-sm text-gray-600 mt-5">
                    {uservalues.email}
                  </p>
                </div>
                <div className=" py-7 border-t border-blueGray-200 text-center">
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
                        value={uservalues.firstName}
                        onChange={(e) => {
                          setUserValues({
                            ...uservalues,
                            [e.target.name]: e.target.value,
                          });
                          updateButton();
                        }}
                        onBlur={() => verifyFirstName(uservalues?.firstName)}
                      />

                      <p className="text-center mt-4 font-light ">Last Name</p>

                      {!validLastName && (
                        <p className="text-sm text-red-500">
                          Please enter your last name
                        </p>
                      )}
                      <input
                        type="text"
                        name="lastName"
                        className="p-2 rounded border w-full font-bold text-center sm:w-80 lg:w-96 border-gray-300 focus:border-primary focus:ring-0"
                        placeholder="Last Name"
                        value={uservalues.lastName}
                        onChange={(e) => {
                          setUserValues({
                            ...uservalues,
                            [e.target.name]: e.target.value,
                          });
                          updateButton();
                        }}
                        onBlur={() => verifyLastName(uservalues?.lastName)}
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
                        value={uservalues.mobile}
                        onChange={(e) => {
                          setUserValues({
                            ...uservalues,
                            [e.target.name]: e.target.value,
                          });
                          updateButton();
                        }}
                        onBlur={() => verifyMobile(uservalues?.mobile)}
                      />
                    </div>
                  </div>
                  {userUpdated &&
                    validLastName &&
                    validFirstName &&
                    mobileValidation && (
                      <button
                        type="button"
                        onClick={updateProfile}
                        className="inline-block rounded-full bg-primary px-6 pb-2 mt-5 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      >
                        Update Profile
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
          <Toaster />
        </section>
      </main>
    </motion.div>
  );
}

export default UserProfile;
