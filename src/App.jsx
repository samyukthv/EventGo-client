import {BrowserRouter} from "react-router-dom"

import AnimatedRoutes from "./animatedRoutes/AnimatedRoutes"
import { toast, Toaster } from "react-hot-toast";



function App() {


  return (
   <>
   <BrowserRouter>
  <AnimatedRoutes/>
  <Toaster/>
   </BrowserRouter>
   </>
  )
}

export default App
