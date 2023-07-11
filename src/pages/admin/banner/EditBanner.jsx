import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import avathar from "../../../assets/images/avathar2.png";
import { EditEvent, editedBannerImage, getBanner } from "../../../api/adminApi";
import { toast } from "react-hot-toast";

function EditBanner() {
  const navigate = useNavigate()
  const params = useParams()
  const eventId = params.id
  console.log(eventId);
  const [banner, setBanner] = useState(null)
  const [image, setImage] = useState(null)
  const [secureUrl, setSecureUrl] = useState(null)

  useEffect(() => {

    getBanner(eventId).then(res => {
      if (res.data.banner)
        setBanner(res.data.banner)
    }).catch(err => {
    console.log(err);
    })


  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (image) {

        const formData1 = new FormData();
        formData1.append("file", image);
        formData1.append("upload_preset", "profileImage");
        formData1.append("cloud_name", "dcsdqyoh1");

        await editedBannerImage(formData1).then(res => {
          setSecureUrl(res.data.secure_url)
        })
      } else {
        EditEvent(banner, banner.image).then(res => {
          if (res.data.success) {
            toast.success("banner edited succfully")
            navigate("/admin/banner-list")
          }
        })
      }
    } catch (error) {
    console.log(error);
    }
  }


  useEffect(() => {
    if (secureUrl) {
      EditEvent(banner, secureUrl).then(res => {
        if (res.data.success) {
          toast.success("banner edited succfully")
          navigate("/admin/banner-setup")
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }, [secureUrl])

  return (
    <div className="h-screen bg-white relative flex overflow-hidden">
      <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
        <Link to="/admin/home">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <i class="fa-solid fa-house-chimney"></i>
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
            <i class="fa-solid fa-calendar-days"></i>
          </div>
        </Link>
      </aside>

      <div class="w-full h-full flex flex-col justify-between">
        <header class="h-16 w-full flex  relative justify-between px-5 space-x-10 bg-gray-800">
          <div className="font-monoton  text-2xl cursor-pointer flex items-center ">
            <span className="text-3xl  mr-1 pt-2  text-purple-500 ">
              {" "}
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
                <img src={avathar} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52 bg-black"
            >
              <li>
                <Link to="/profile">
                  {" "}
                  <a className="justify-between">Profile</a>
                </Link>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </header>

        <main class="max-w-full h-auto flex justify-center  relative overflow-y-hidden">
          <form className=" p-8 rounded-lg mb-20 shadow-2xl " onSubmit={(e) => handleSubmit(e)}>
            <h3 className="font-bold text-4xl text-center">Add Post</h3>
            <h1 className=" font-bold text-lg mt-5">Post Title</h1>
            <p className=" text-sm ">A title the event</p>

            <input
              value={banner?.title}
              onChange={(e) => setBanner({ ...banner, [e.target.name]: e.target.value })}
              type="text"
              name="title"
              className=" p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Event title"
            />

            <h1 className=" font-bold text-lg mt-5 ">Post Description</h1>
            <p className=" text-sm ">A short description about the event</p>

            <textarea

              onChange={(e) => setBanner({ ...banner, [e.target.name]: e.target.value })}
              value={banner?.description}
              type="text"
              name="description"
              className=" p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Event description"
            />

            <h1 className=" font-bold text-lg mt-5">Image</h1>
            <p className=" text-sm ">Add the image</p>

            <input
              onChange={(e) => setImage(e.target.files[0])}


              file={banner?.image}
              type="file"
              name="postImage"
              className=" p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
            />

            <div>

              <button

                type="submit"
                class="inline-block rounded mt-5 bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]">
                Success
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default EditBanner;
