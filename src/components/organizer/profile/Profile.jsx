import React, { useEffect, useState } from "react";
import img from "../../../assets/images/avathar2.png";
import { toast, Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setOrganizerDetails } from "../../../redux/organizerSlice";
import {
  profileUpdate,
  organizerCoverImageUpload,
  organizerImageUpdate,
  addPosts,
  saveImage,
  saveCoverImage,
  uploadEditedEventImage,
} from "../../../api/OrganizerApi";
import { addOrganizerPost } from "../../../yup";
import { useFormik } from "formik";
import defaultCoverImage from "../../../assets/images/rachel-coyne-U7HLzMO4SIY-unsplash.jpg";
import { organizerDetails } from "../../../api/UserApi";
import { Link } from "react-router-dom";

const ORGANIZER_PROFILE_URL = import.meta.env.VITE_ORGANIZER_PROFILE_URL;
const ORGANIZER_COVER_IMAGE_URL = import.meta.env
.VITE_ORGANIZER_COVER_IMAGE_URL;

function Profile() {
  const dispatch = useDispatch();
  const organizerData = useSelector((state) => state.organizer);
  const [secureUrl, setSecureUrl]=useState(null)

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



const[followersCount,setFollowersCount]=useState(null)
const[postCount,setPostCount]=useState(null)
useEffect(()=>{
  organizerDetails(organizerData.id).then(res=>{
    setFollowersCount(res.data.organizerDetails.followers.length);
    setPostCount(res.data.organizerDetails.post.length);
    
  })
})


  const [pimage, setImage] = useState(null);

  const uploadImage = async () => {
    try {
      console.log("hyhyh");
      const formData = new FormData();
      formData.append("file", pimage);
      formData.append("upload_preset","profileImage")
      formData.append ("cloud_name","dcsdqyoh1")
        await organizerImageUpdate(formData).then(res=>{
        setSecureUrl(res.data.secure_url)
       try {
        saveImage(secureUrl,organizerData.id).then(res=>{
          console.log(res.data.organizer);
          if (res.data.organizer.image) {
            toast.success("image updated successfully");
            dispatch(
              setOrganizerDetails({
                id: res.data.organizer?._id,
                firstName: res.data.organizer?.firstName,
                lastName: res.data.organizer?.lastName,
                mobile: res.data.organizer?.mobile,
                image: res.data.organizer?.image,
                email: res.data.organizer?.email,
              })
            );
            setImage(null);
            setOrganizerValues((prevValues) => ({
              ...prevValues,
              image: res.data.organizer?.image,
            }));       
            console.log("dispatched");
            console.log("New image value in Redux:", res.data.organizer?.image);
          }
      })
       } catch (error) {
        
       }
      })
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
  const[coverSecureUrl,setCoverSecureUrl]=useState(null)
  console.log(organizerData.id, 89989988);
  const uploadCoverImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", cImage);
      formData.append("upload_preset","profileImage")
      formData.append ("cloud_name","dcsdqyoh1")
      await organizerCoverImageUpload(formData).then(res=>{
        setCoverSecureUrl(res.data.secure_url)

      try {
        saveCoverImage(coverSecureUrl,organizerData.id).then(res=>{
          if(res.data.organizer.coverImage){
            toast.success("cover image updated successfully");
            dispatch(
              setOrganizerDetails({
                id: res.data.organizer?._id,
                firstName: res.data.organizer?.firstName,
                lastName: res.data.organizer?.lastName,
                mobile: res.data.organizer?.mobile,
                image: res.data.organizer?.image,
                email: res.data.organizer.email,
                about: res.data.organizer?.about,
                instagram: res.data.organizer?.instagram,
                linkedin: res.data.organizer?.linkedin,
                facebook: res.data.organizer?.facebook,
                coverImage: res.data.organizer?.coverImage,
              })
            );
            setCImage(null);
            setOrganizerValues((prevValues) => ({
              ...prevValues,
              coverImage: res.data.organizer?.coverImage,
            }));
          }
        })
      } catch (error) {
        
      }
      }) 

    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    title: "",
    description: "",
  };
  const [postImage, setPostImage] = useState("");
  const[postsecuralUrl,setPostSecureUrl]=useState(null)
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: addOrganizerPost,

      onSubmit: async (values) => {
        try {
          console.log(postImage);
          const formData = new FormData();
          formData.append("file", postImage);
          formData.append("upload_preset", "profileImage");
          formData.append("cloud_name", "dcsdqyoh1");
          console.log("hhyhy");
         await uploadEditedEventImage(formData).then(res=>{
            console.log("inside");
            console.log(res.data.secure_url);
            setPostSecureUrl(res.data.secure_url)

          })

          // const response = await addPosts(formData)
          
   
        } catch (error) {}
      },
    });


useEffect(()=>{
if(postsecuralUrl){
  addPosts(organizerData.id,values,postsecuralUrl).then(res=>{

  })
}
},[postsecuralUrl])


  const coverImageUrl = organizeValues.coverImage
    ? `${organizeValues.coverImage}`
    : defaultCoverImage;
     return (
    <main className="profile-page ">
      <section className="relative block h-500-px">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{ backgroundImage: `url(${coverImageUrl})` }}
        >
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
            onChange={(e) => setTimeout(()=>{
              setCImage(e.target.files[0])
            },1000)}
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
                          organizeValues.image.slice(0, 33) ===
                          "https://lh3.googleusercontent.com"
                            ? organizeValues.image
                            : organizeValues.image
                            ? `${organizeValues.image}`
                            : img
                        }
                        className="shadow-xl w-full  h-36 align-middle border-none absolute -m-16 -ml-24 lg:-ml-8 max-w-150-px rounded-full"
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
                           onChange={(e) => setTimeout(()=>{
                      setImage(e.target.files[0])
                    },1000)}
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
                      onClick={() => window.my_modal_5.showModal()}
                      className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      add post
                    </button>
                   <Link to='/organizer/messages'>
                   <button
                      className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      messages
                    </button>
                   </Link>
                  </div>
                </div>

                {/* modal  */}

                {/* Open the modal using ID.showModal() method */}
                <dialog
                  id="my_modal_5"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <form onSubmit={handleSubmit} className="modal-box">
                    <h3 className="font-bold text-4xl text-center">Add Post</h3>
                    <h1 className=" font-bold text-lg mt-5">Post Title</h1>
                    <p className=" text-sm ">A title the event</p>

                    {errors.title && touched.title ? (
                      <small className="form-error text-red-500">
                        {errors.title}
                      </small>
                    ) : null}
                    <input
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="title"
                      className=" p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
                      placeholder="Event description"
                    />

                    <h1 className=" font-bold text-lg mt-5 ">
                      Post Description
                    </h1>
                    <p className=" text-sm ">
                      A short description about the event
                    </p>

                    {errors.description && touched.description ? (
                      <small className="form-error text-red-500">
                        {errors.description}
                      </small>
                    ) : null}
                    <input
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="description"
                      className=" p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
                      placeholder="Event description"
                    />

                    <h1 className=" font-bold text-lg mt-5">Image</h1>
                    <p className=" text-sm ">Add the image</p>

                    <input
                      onChange={(e) => setPostImage(e.target.files[0])}
                      type="file"
                      name="postImage"
                      className=" p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
                      placeholder="Event description"
                    />

                    <div className="modal-action">
                      <button
                        type="submit"
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      >
                        Confirm Post
                      </button>
                      {/* if there is a button in form, it will close the modal */}
                      <button
                        type="button"
                        onClick={() => window.my_modal_5.close()}
                        className="btn"
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </dialog>

                {/* modal end */}

                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {followersCount}
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Followers
                      </span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {postCount}
                      </span>
                      <span className="text-sm text-blueGray-400">Posts</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center"></div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
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
