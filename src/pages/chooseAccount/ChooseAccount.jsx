import React from "react";
import usericon from "../../assets/images/avathar2.png";
import organizer from "../../assets/images/hope-house-press-leather-diary-studio-PJzc7LOt2Ig-unsplash.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import bgimg  from '../../assets/images/fg.jpg'


function ChooseAccount() {

  return (
    <div className="w-full min-h-screen flex justify-center" style={{ backgroundImage: `url(${bgimg})`,backgroundSize: "cover",
    backgroundPosition: "center", }}>
      <div className="flex-1">
        <Link to="/">
          <div className="font-monoton  text-2xl cursor-pointer flex items-center ">
            <span className="text-3xl  mr-1 pt-2  text-purple-500 ">
              {" "}
              <ion-icon name="finger-print-outline"></ion-icon>
            </span>
            <span className="bg-gradient-to-r  from bg-purple-500 to-pink-600 text-transparent bg-clip-text ">
              EventGo
            </span>
          </div>
        </Link>{" "}
      </div>
    
  <div className="m-4 md:m-20 sm:h-[50vh] md:h-[77vh] bg-slate-200 w-full rounded-lg drop-shadow-md flex  justify-evenly items-center  sm:mr-2">
 
    <Link to="/login">
    <Card className="w-96 h-[60vh] my-4">
    <CardHeader floated={false} className="h-80">
        <img src={usericon} alt="profile-picture" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
         Login to book your ticket
        </Typography>
        
      </CardBody>
      
    </Card>
    </Link>

  <Link to='/organizer/'>
  <Card className="w-96 h-[60vh] my-4">
    <CardHeader floated={false} className="h-80">
        <img src={organizer} alt="profile-picture" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Login to add your event
        </Typography>
     
      </CardBody>
      
    </Card>
  </Link>
  </div>
</div>


  );
}

export default ChooseAccount;
