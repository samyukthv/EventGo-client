import React, { useEffect,useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { userProfile } from "../../api/UserApi";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"
import {userLogout}  from "../../redux/userSlice"
import {useSelector,useDispatch} from 'react-redux'

function UserProfile() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const userData = useSelector((state) => state.user);
  const[enableEmail,setEnableEmail]=useState(false)


  const[user,setUser]=useState({
    firstName:userData?. firstName,
    lastName:userData?.lastName,
    email:userData?.email,
    mobile:userData?.mobile,
    image:userData?.image,
})



    useEffect(()=>{
        const response =userProfile().then((response)=>{
            console.log(response.data.userData);
        })
    })
    
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
                    <div className="relative">
                      <img
                        alt="..."
                        src={user.image}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"></div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8"></div>
                  </div>
                </div>
               
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <input
                        type="text" 
                        name="firstName"
                        className="ml-5 sm:ml-20 mt-3 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
                        placeholder="First Name" value={user.firstName}
                      />
                      <i onClick={()=>setEnableEmail(true)} className="ml-5 fa-solid fa-file-pen"></i>

                          <input
                        type="text"
                        name="lasttName" disabled
                        className="ml-5 sm:ml-20 mt-3 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
                        placeholder="Last Name" value={user.lastName}
                      />
                      <i className=" ml-5 fa-solid fa-file-pen"></i>
                          <input
                        type="text"
                        name="email" disabled
                        className="ml-5 sm:ml-20 mt-3 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
                        placeholder="Email" value={user.email}
                      />
                      <i className=" ml-5 fa-solid fa-file-pen"></i>
                       
                      <input
                        type="text"
                        name="mobile" disabled
                        className="ml-5 sm:ml-20 mt-3 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
                        placeholder="mobile" value={user.mobile}
                      />
                      <i className=" ml-5 fa-solid fa-file-pen"></i>
                       
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserProfile;
