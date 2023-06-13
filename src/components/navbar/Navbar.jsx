import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/userSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.user);
  const [user, setUser] = useState(false);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(true);
    }
  }, []);

  const logout = async (req, res) => {
    try {
      localStorage.removeItem("token");
      dispatch(userLogout());
      setUser(false);
      navigate("/");
    } catch (error) {}
  };



  return (
    <div className="shadow-md w-full top-0 left-0  ">
      <div className="md:flex bg-white py-5 md:px-10 px-7 backdrop-filter backdrop-blur-3xl bg-opacity-5  ">
        <div className="font-bold text-2xl cursor-pointer flex items-center">
          <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <ion-icon name="finger-print-outline"></ion-icon>
          </span>
          EventGo
        </div>
        <div className="flex">
          <ul
          
            className={`sm:flex ${showList ? "block" : "hidden"} px-4`}
            onClick={() => setShowList(false)}
          >
            <li className="p-3 font-serif ">
              <Link to="/">Home</Link>
            </li>
            <li className="p-3 font-serif">
              <Link to="/happening-city">Happening city</Link>
            </li>
            {user && (
              <li className="p-3 font-serif">
                <Link to="/profile">Profile</Link>
              </li>
            )}
            <li className="p-3 font-serif">
              <a href="#jhghj">Add event</a>
            </li>
            <li className="p-3 font-serif">
              <a href="#jj">About</a>
            </li>
          </ul>
          <div className="sm:hidden ml-auto">
            <button
              className="text-2xl mr-3 pt-3 focus:outline-none"
              onClick={() => setShowList(!showList)}
            >
              <ion-icon name="menu-outline"></ion-icon>
            </button>
          </div>
        </div>
        <div className="flex ml-auto">
        {user && (
           <img
           alt="..."
           src={userdata.image}
           className="shadow-2xl rounded-full h-10   border-none  mt-1 max-w-150-px"
         />
          )}
          {user && (
            <h1 className="mt-3 md:ml-8 text-center mr-7 font-serif md:text-left font-bold">
              Welcome {userdata.firstName}...!
            </h1>
          )}
          <span className="text-2xl mr-6 pt-3">
            <ion-icon name="notifications-outline"></ion-icon>
          </span>
          {user ? (
            <button
              type="button"
              onClick={logout}
              className="inline-block rounded-full border-2 border-blue-600 px-6 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:border-blue-500 hover:bg-blue-900 hover:bg-opacity-10 hover:text-black focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              data-te-ripple-init
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              className="inline-block rounded-full border-2 border-blue-600 px-6 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:border-blue-500 hover:bg-blue-900 hover:bg-opacity-10 hover:text-black focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              data-te-ripple-init
            >
              <Link to="/choose_account"> Log in</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
