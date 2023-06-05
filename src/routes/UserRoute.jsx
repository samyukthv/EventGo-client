import {Route,Routes} from 'react-router-dom'
import UserSignup from '../pages/signup/UserSignup'
import Home from '../pages/home/Home'
import UserLogin from '../pages/login/UserLogin'
import ChooseAccount from '../pages/chooseAccount/ChooseAccount'
import MobileOtp from '../pages/mobileotp/MobileOtp'

import UserPublicRoutes from './UserPublicRoutes'

function UserRoute() {
  return (
    <>
    <Routes>
        <Route exact path='/login' element={<UserPublicRoutes><UserLogin/></UserPublicRoutes>}  />
        <Route exact path='/signup' element={<UserPublicRoutes><UserSignup/></UserPublicRoutes>}/>
        <Route exact path='/choose_account' element={<UserPublicRoutes><ChooseAccount/></UserPublicRoutes>}/>
        <Route exact path='/verify_otp' element={<MobileOtp/>}/>
        <Route exact path='/' element={<Home/>}/>
    </Routes>
    
    </>
      
    
  )
}

export default UserRoute
