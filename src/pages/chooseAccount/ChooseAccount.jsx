import React from "react";
import usericon from "../../assets/images/avathar2.png";
import organizer from "../../assets/images/hope-house-press-leather-diary-studio-PJzc7LOt2Ig-unsplash.jpg";
import { Link, useNavigate } from "react-router-dom";

function ChooseAccount() {
  let navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex  sm:justify-center">
  <div className="m-4 md:m-20 sm:h-[50vh] md:h-[77vh] bg-slate-200 w-full rounded-lg drop-shadow-md  sm:mr-2">
    <h1 className="font-bold text-2xl md:text-3xl flex justify-center mt-10">
      Choose Your Account
    </h1>
    <div className="w-full h-auto flex flex-col md:flex-row justify-center">
      <div
        onClick={() => {
          navigate("/login");
        }}
        className="w-full  md:w-1/4 bg-red-300 rounded-lg drop-shadow-md h-60 md:h-96 mx-2 md:mx-20 mt-5 text-center text-white font-semibold"
        style={{
          backgroundImage: `url(${usericon})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        USER ACCOUNT
      </div>

      <div
        onClick={() => {
          navigate("/organizer_login");
        }}
        className="w-full md:w-1/4 bg-red-300 rounded-lg drop-shadow-md h-60 md:h-96 mx-2 md:mx-20 mt-5 text-center text-white font-semibold"
        style={{
          backgroundImage: `url(${organizer})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        ORGANIZER ACCOUNT
      </div>
    </div>
  </div>
</div>

  );
}

export default ChooseAccount;
