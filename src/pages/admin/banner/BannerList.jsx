import React, { useEffect, useState } from "react";
import avathar from "../../../assets/images/avathar2.png";
import { Link } from "react-router-dom";
import { addOrganizerPost } from "../../../yup";
import { useFormik } from "formik";
import { uploadEditedEventImage } from "../../../api/OrganizerApi";
import { addBanner, bannerOne } from "../../../api/adminApi";
import { toast } from "react-hot-toast";

const initialValues = {
  title: "",
  description: "",
};

function BannerList() {
  const [banner, setBanner] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [secureUrl, setSecureUrl] = useState(null);

  useEffect(() => {
    console.log("hyy");
    bannerOne()
      .then((res) => {
        if (res.data.banner) {
          console.log("hii");
          setBanner(res.data.banner);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [secureUrl]);

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: addOrganizerPost,

      onSubmit: async (values) => {
        try {
          console.log("on submit");
          const formData = new FormData();
          formData.append("file", bannerImage);
          formData.append("upload_preset", "profileImage");
          formData.append("cloud_name", "dcsdqyoh1");
          console.log("hhyhy");
          await uploadEditedEventImage(formData).then((res) => {
            console.log("inside");
            console.log(res.data.secure_url);
            setSecureUrl(res.data.secure_url);
          });
        } catch (error) {}
      },
    });
  const [list, setList] = useState("");
  useEffect(() => {
    if (secureUrl) {
      addBanner(values, secureUrl).then((res) => {
        if (res.data.success) {
          window.my_modal_5.close();
          toast.success("banner added successfully");
          setList(res.data.bannerSet);
        }
      });
    }
  }, [secureUrl]);

console.log(banner);
  return (
    <div className="h-screen bg-white relative flex overflow-hidden">
      <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
        <Link to="/admin/home">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <i className="fa-solid fa-house-chimney"></i>
          </div>
        </Link>

        <Link to="/admin/user-list">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </Link>

        <Link to="/admin/organizer-list">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        </Link>

        <Link to="/admin/banner-setup">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <i className="fa-solid fa-image"></i>
          </div>
        </Link>

        <Link to="/admin/event-list">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <i className="fa-solid fa-calendar-days"></i>
          </div>
        </Link>
      </aside>

      <div className="flex flex-col justify-between flex-grow">
        <header className="h-16 w-full flex items-center relative justify-between px-5 space-x-10 bg-gray-800">
          <div className="font-monoton  text-2xl cursor-pointer flex items-center ">
            <span className="text-3xl  mr-1 pt-2  text-purple-500 ">
              <ion-icon name="finger-print-outline"></ion-icon>
            </span>
            <span className="bg-gradient-to-r  from bg-purple-500 to-pink-600 text-transparent bg-clip-text ">
              EventGo
            </span>
          </div>
          <h1 className="font-bold text-3xl text-white mt-3 ">
            ADMIN DASHBOARD
          </h1>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full mt-2">
                <img src={avathar} alt="Avatar" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52 bg-black"
            >
              <li>
                <Link to="/profile">
                  <a className="justify-between">Profile</a>
                </Link>
              </li>
              <li>
                <a>Logout</a>{" "}
              </li>
            </ul>
          </div>
        </header>

        <div className="flex justify-between items-center px-6 py-4">
          <h2 className="text-2xl font-semibold">Banner List</h2>
          {list.length >= 2 ? (
            <button
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg shadow"
              onClick={() => window.my_modal_5.showModal()}
            >
              Add Banner
            </button>
          ) : null}
        </div>

        {/* modal start */}

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <form onSubmit={handleSubmit} className="modal-box">
            <h3 className="font-bold text-4xl text-center">Add Post</h3>
            <h1 className=" font-bold text-lg mt-5">Post Title</h1>
            <p className=" text-sm ">A title the event</p>

            {errors.title && touched.title ? (
              <small className="form-error text-red-500">{errors.title}</small>
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

            <h1 className=" font-bold text-lg mt-5 ">Post Description</h1>
            <p className=" text-sm ">A short description about the event</p>

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
              onChange={(e) => setBannerImage(e.target.files[0])}
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

        <main className="max-w-full h-full flex flex-col justify-center items-center overflow-y-auto">
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900 text-center"
                  >
                    S.No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900 text-center"
                  >
                    Banner Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900 text-center"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900 text-center"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900 text-center"
                  >
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {banner?.map((details) => (
                  <tr className="hover:bg-gray-50">
                    <th className="text-center">1</th>
                    <th className="flex gap-3  px-6 py-4 font-normal text-gray-900">
                      <div className="relative h-28 w-36">
                        <img
                          className="h-full w-full  object-cover object-center"
                          src={details?.image}
                          alt=""
                        />
                      </div>
                    </th>
                    <td className="px-6 py-4 font-bold">{details?.title}</td>
                    <td className="px-6 py-4">{details?.description}</td>
                    <td className="px-6 py-4">
                    <Link to={`/admin/edit-banner/${details?._id}`}>
                    <button
                        type="button"
                        className="mt-1 inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                      >
                        Edit
                      </button>
                    </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default BannerList;
