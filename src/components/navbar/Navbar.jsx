import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/userSlice";
import img from "../../assets/images/avathar2.png"
import bgimg from "../../assets/images/blur.jpg";

const PROFILE_URL = import.meta.env.VITE_PROFILE_URL;


function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.user);
  const [user, setUser] = useState(false);
  const [showList, setShowList] = useState(false);
  const[details,setDetails]=useState(null)

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
<div className="navbar bg-purple-300 "style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
         
          zIndex: 1,
        }}>
  <div className="flex-1">
  <Link to='/'>
<div className="font-monoton  text-2xl cursor-pointer flex items-center ">
    <span className="text-3xl  mr-1 pt-2  text-purple-500 "> <ion-icon name="finger-print-outline"></ion-icon></span>
    <span className="bg-gradient-to-r  from bg-purple-500 to-pink-600 text-transparent bg-clip-text ">
    EventGo
    </span>
  </div>
</Link>  </div>
  <div className="flex-none text-black">
    <ul className="menu menu-horizontal px-1">
    <Link to="/happening-city">  <li><a>Happening city</a></li></Link> 
  
    </ul>
    <ul className="menu menu-horizontal px-1">
    <Link to="/happening-city">  <li><a>About</a></li></Link> 
  
    </ul>
    {user?<div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
        {user && userdata && (
          <img src={userdata?.image?.slice(0, 33) === "https://lh3.googleusercontent.com" ? userdata.image : userdata.image ? `${userdata.image}` : img}/>
          )}
          </div>
      </label>
     <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
      
         <Link to="/profile">  <a className="justify-between">
            Profile
           
          </a></Link>
          
        </li>
        <li><a onClick={logout}>Logout</a></li>
      </ul> 
    </div>:<ul className="menu menu-horizontal px-1">
    <Link to="/choose_account">  <li><a>Log in</a></li></Link> 
  
    </ul>}
  </div>
</div>

  );
}

export default Navbar;
