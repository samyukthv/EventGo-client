import React, { useEffect, useState } from "react";
import img from "../../../assets/images/avathar2.png";
import { toast, Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setOrganizerDetails, } from "../../../redux/organizerSlice";
import {
  profileUpdate,
  organizerCoverImageUpload,
  organizerImageUpdate
} from "../../../api/OrganizerApi";

import defaultCoverImage  from "../../../assets/images/rachel-coyne-U7HLzMO4SIY-unsplash.jpg"

const ORGANIZER_PROFILE_URL = import.meta.env.VITE_ORGANIZER_PROFILE_URL;
const ORGANIZER_COVER_IMAGE_URL = import.meta.env.VITE_ORGANIZER_COVER_IMAGE_URL;

function Profile() {
  const dispatch = useDispatch();
  const organizerData = useSelector((state) => state.organizer);
console.log(organizerData,98);
  const [organizeValues, setOrganizerValues] = useState({
    firstName: organizerData?.firstName,
    lastName: organizerData?.lastName,
    email: organizerData?.email,
    mobile: organizerData?.mobile,
    image: organizerData?.image,
    about: organizerData?.about,
    instagram: organizerData?.instagram,
    linkedin: organizerData?.linkedin,
    facebook: organizerData?.facebook,
    coverImage: organizerData?.coverImage,
  });

  const [pimage, setImage] = useState(null);

  const uploadImage = async () => {
    try {
      console.log("hyhyh");
      const formData = new FormData();
      formData.append("organizerProfileImage", pimage);
      formData.append("id", JSON.stringify(organizerData.id));

      const response = await organizerImageUpdate(formData, {
        headers: {
          "content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(response, 23);
      if (response.data.organizer.image) {
        console.log("hello");
       
        dispatch(
          setOrganizerDetails({
            id: response.data.organizer?._id,
            firstName: response.data.organizer?.firstName,
            lastName: response.data.organizer?.lastName,
            mobile: response.data.organizer?.mobile,
            image: response.data.organizer?.image,
            email: response.data.organizer?.email,
          })
        );
        toast.success("image updated successfully");
        setImage(null);
        setOrganizerValues((prevValues) => ({
          ...prevValues,
          image: response.data.organizer?.image,
        }));
        console.log("dispatched");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [organizerUpdated, setOrganizerUpdated] = useState(false);
  const updateButton = () => {
    setOrganizerUpdated(true);
  };

  const [mobileValidation, setMobileValidation] = useState(true);
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
    console.log("ethiii");
    console.log(organizeValues);
    const response = await profileUpdate(organizeValues);
    if (response.data.updated) {
      dispatch(
        setOrganizerDetails({
          id: response.data.organizer?._id,
          firstName: response.data.organizer?.firstName,
          lastName: response.data.organizer?.lastName,
          mobile: response.data.organizer?.mobile,
          image: response.data.organizer?.image,
          email: response.data.organizer?.email,
          about: response.data.organizer?.about,
          instagram: response.data.organizer?.instagram,
          linkedin: response.data.organizer?.linkedin,
          facebook: response.data.organizer?.facebook,
          coverImage: response.data.organizer?.coverImage,
        })
      );
      toast.success("profile updated successfully");
      setOrganizerUpdated(false);
    }
  };
  const [cImage, setCImage] = useState(null);

  const uploadCoverImage = async () => {
    try {
      const formData = new FormData();
      formData.append("organizerCoverImage", cImage);
      formData.append("id", JSON.stringify(organizerData.id));
      console.log(...formData);
      const response = await organizerCoverImageUpload(formData, {
        headers: {
          "content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success("cover image updated successfully");
        dispatch(
          setOrganizerDetails({
            id: response.data.organizer?._id,
            firstName: response.data.organizer?.firstName,
            lastName: response.data.organizer?.lastName,
            mobile: response.data.organizer?.mobile,
            image: response.data.organizer?.image,
            email: response.data.organizer.email,
            about: response.data.organizer?.about,
            instagram: response.data.organizer?.instagram,
            linkedin: response.data.organizer?.linkedin,
            facebook: response.data.organizer?.facebook,
            coverImage: response.data.organizer?.coverImage,
          })
        );
        setCImage(null);
        setOrganizerValues((prevValues) => ({
          ...prevValues,
          coverImage: response.data.organizer?.coverImage,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  
console.log(organizeValues.coverImage,12);
  console.log(organizeValues.about);

  const coverImageUrl = organizeValues.coverImage
  ? `${ORGANIZER_COVER_IMAGE_URL}${organizeValues.coverImage}`
  : defaultCoverImage;
  return (
    <main className="profile-page ">
      <section className="relative block h-500-px">
      <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${coverImageUrl})` }}>

          {cImage ? (
            <label
              onClick={uploadCoverImage}
              type="button"
              class="absolute top-5 right-5  items-end inline-block rounded-full bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
            >
              confirm update
            </label>
          ) : (
            <label
              htmlFor="uploadCoverImage"
              type="button"
              className="absolute top-5 right-5 inline-block items-end rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              update cover image
            </label>
          )}
          <input
            type="file"
            hidden
            name="coverImage"
            id="uploadCoverImage"
            onChange={(e) => setCImage(e.target.files[0])}
          />
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0px)" }}
        ></div>
      </section>
      <section className="relative py-16 bg-blueGray-200 ">
        <div className="container mx-auto px-4 ">
          <div className="relative  flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center ">
                <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative ">
                  <div className="ml-12">
  <img
    alt="..."
    src={
      organizeValues.image.slice(0, 33) === "https://lh3.googleusercontent.com"
        ? organizeValues.image
        : organizeValues.image
        ? `${ORGANIZER_PROFILE_URL}${organizeValues.image}`
        : img
    }
    className="shadow-xl w-full  h-36 align-middle border-none absolute -m-16 -ml-20 lg:-ml-8 max-w-150-px rounded-full"
  />
</div>

                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"></div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8"></div>
                    </div>
                    <div className="flex justify-center items-center mt-8">
                      <div className="text-center  ">
                        {pimage ? (
                          <label
                            onClick={uploadImage}
                            class="inline-block mt-10 rounded-full bg-success   px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                          >
                            confirm upload
                          </label>
                        ) : (
                          <label
                            htmlFor="uploadImage"
                            class="inline-block mt-10 rounded-full bg-primary px-6  pb-2 pt-2.5 ml-3  text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
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
                          {organizeValues.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      messages
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        22
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Followers
                      </span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        10
                      </span>
                      <span className="text-sm text-blueGray-400">Events</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center"></div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <p className=" text-xl text-blueGray-700 mb-2">
                  {organizeValues.email}
                </p>
                <div className="text-sm  mt-0 mb-2  font-bold ">
                  <p className="text-center mt-4 font-light ">First Name</p>

                  {!validFirstName && (
                    <p className="text-sm text-red-500">
                      *Please enter your last name
                    </p>
                  )}
                  <input
                    type="text"
                    name="firstName"
                    className="p-2 rounded border w-full font-bold text-center sm:w-80 lg:w-96 border-gray-300 focus:border-primary focus:ring-0"
                    placeholder="First Name"
                    value={organizeValues.firstName}
                    onChange={(e) => {
                      setOrganizerValues({
                        ...organizeValues,
                        [e.target.name]: e.target.value,
                      });
                      updateButton();
                    }}
                    onBlur={() => verifyFirstName(organizeValues?.firstName)}
                  />
                </div>
                <div className="mb-2 ">
                  <p className="text-center mt-4 font-light ">Last Name</p>

                  {!validLastName && (
                    <p className="text-sm text-red-500">
                      *Please enter your last name
                    </p>
                  )}
                  <input
                    type="text"
                    name="lastName"
                    className="p-2 rounded border w-full font-bold text-center sm:w-80 lg:w-96 border-gray-300 focus:border-primary focus:ring-0"
                    placeholder="Last Name"
                    value={organizeValues.lastName}
                    onChange={(e) => {
                      setOrganizerValues({
                        ...organizeValues,
                        [e.target.name]: e.target.value,
                      });
                      updateButton();
                    }}
                    onBlur={() => verifyLastName(organizeValues?.image)}
                  />
                </div>
                <div className="mb-2 ">
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
                    value={organizeValues.mobile}
                    onChange={(e) => {
                      setOrganizerValues({
                        ...organizeValues,
                        [e.target.name]: e.target.value,
                      });
                      updateButton();
                    }}
                    onBlur={() => verifyMobile(organizeValues?.mobile)}
                  />
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-blueGray-200 text-center ">
                <p className="text-xl font-semibold">About: </p>
                <div className="flex flex-wrap justify-center">
                  <div className="w-full  lg:w-9/12 px-4">
                    <textarea
                      onChange={(e) => {
                        setOrganizerValues({
                          ...organizeValues,
                          [e.target.name]: e.target.value,
                        });
                        updateButton();
                      }}
                      name="about"
                      value={organizeValues.about}
                      className="mb-4 w-full h-32 resize-none border-0 text-lg leading-relaxed "
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="mt-10 py-10 border-t border-blueGray-200 text-center flex flex-wrap justify-center">
                <div className="w-full lg:w-1/3 px-4">
                  <p className="text-xl font-semibold text-center mb-2">
                    instagram
                  </p>
                  <i className="fab fa-instagram" />

                  <input
                    type="text"
                    name="instagram"
                    className="p-2 rounded border w-full font-bold text-center border-gray-300 focus:border-primary focus:ring-0"
                    placeholder="instagram link"
                    value={organizeValues.instagram}
                    onChange={(e) => {
                      setOrganizerValues({
                        ...organizeValues,
                        [e.target.name]: e.target.value,
                      });
                      updateButton();
                    }}
                  />
                </div>

                <div className="w-full lg:w-1/3 px-4">
                  <p className="text-xl font-semibold text-center mb-2">
                    facebook
                  </p>
                  <i className="fab fa-facebook" />

                  <input
                    type="text"
                    name="facebook"
                    className="p-2 rounded border w-full font-bold text-center border-gray-300 focus:border-primary focus:ring-0"
                    placeholder="facebook link"
                    value={organizeValues.facebook}
                    onChange={(e) => {
                      setOrganizerValues({
                        ...organizeValues,
                        [e.target.name]: e.target.value,
                      });
                      updateButton();
                    }}
                  />
                </div>

                <div className="w-full lg:w-1/3 px-4">
                  <p className="text-xl font-semibold text-center mb-2">
                    LinkedIn
                  </p>
                  <i className="fab fa-linkedin" />

                  <input
                    type="text"
                    name="linkedin"
                    className="p-2 rounded border w-full font-bold text-center border-gray-300 focus:border-primary focus:ring-0"
                    placeholder="linkedin link"
                    value={organizeValues.linkedin}
                    onChange={(e) => {
                      setOrganizerValues({
                        ...organizeValues,
                        [e.target.name]: e.target.value,
                      });
                      updateButton();
                    }}
                  />
                </div>
                {organizerUpdated &&
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
  );
}

export default Profile;
