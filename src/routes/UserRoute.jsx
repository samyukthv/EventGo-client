import {Route,Routes} from 'react-router-dom'
import UserSignup from '../pages/signup/UserSignup'
import Home from '../pages/home/Home'
import UserLogin from '../pages/login/UserLogin'
import ChooseAccount from '../pages/chooseAccount/ChooseAccount'
import MobileOtp from '../pages/mobileotp/MobileOtp'

import UserPublicRoutes from './UserPublicRoutes'
import HappeningCity from '../pages/happeningCity/HappeningCity'
import UserProfile from '../pages/userProfile/UserProfile'
import UserProtectedRoutes from "./UserProtectedRoutes"
import Email from '../pages/frogotPassword/Email'
import ForgotPassword from '../pages/frogotPassword/ForgotPassword'
import EventDetails from '../pages/eventDetails/EventDetails'
import Booking from '../pages/bookingPage/Booking'
import OrganizerProfile from '../pages/organizerProfile/OrganizerProfile'
import ConfirmBooking from '../pages/confirmBooking/ConfirmBooking'
import ConfirmTicket from '../pages/confirmTicket/ConfirmTicket'
import LoginTest from '../pages/loginTest/LoginTest'
import Chat from '../pages/chat/Chat'

function UserRoute() {
  return (
    <>
    <Routes>
        <Route exact path='/login' element={<UserPublicRoutes><UserLogin/></UserPublicRoutes>}  />
        <Route exact path='/logintest' element={<UserPublicRoutes><LoginTest/></UserPublicRoutes>}  />
        <Route exact path='/signup' element={<UserPublicRoutes><UserSignup/></UserPublicRoutes>}/>
        <Route exact path='/choose_account' element={<UserPublicRoutes><ChooseAccount/></UserPublicRoutes>}/>
        <Route excat path ="/confirm-email" element={<Email/>}/>
        <Route excat path ="/reset-password/:id" element={<ForgotPassword/>}/>
        <Route exact path='/verify_otp' element={<MobileOtp/>}/>
        <Route exact path='/happening-city' element={<HappeningCity/>}/>
        <Route exact path='/profile' element={<UserProtectedRoutes><UserProfile/></UserProtectedRoutes>}/>
        <Route exact path='/event-details/:id' element ={<EventDetails/>}/>
        <Route exact path='/booking/:id' element={<UserProtectedRoutes><Booking/></UserProtectedRoutes>}/>
        <Route exact path ='/organizer-profile/:id' element={<OrganizerProfile/>}/>
        <Route exact path='/booking-confirmed'element={<UserProtectedRoutes><ConfirmTicket/></UserProtectedRoutes>}/>
       


       <Route exact path='/chat/:id' element={<UserProtectedRoutes><Chat/></UserProtectedRoutes>}/>
       
        <Route exact path='/' element={<Home/>}/>
    </Routes>
    
    </>
      
    
  )
}

export default UserRoute
