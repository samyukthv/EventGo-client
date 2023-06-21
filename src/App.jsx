import {BrowserRouter,Route,Routes} from "react-router-dom"
import UserRoute from "./routes/UserRoute"
import AdminRoute from "./routes/AdminRoute"
import OrganizerRoutes from "./routes/OrganizerRoutes"


function App() {

  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path="/*" element={<UserRoute/>} /> 
    <Route path="/admin/*" element={<AdminRoute/>} />
    <Route path="/organizer/*" element={<OrganizerRoutes/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
