import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();


export const userApi=axios.create({
    baseURL:`http://localhost:3000`
})


export const organizerApi=axios.create({
    baseURL:`http://localhost:3000/organizer`
})

export const adminApi= axios.create({
    baseURL:`http://localhost:3000/admin`
})








userApi.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        console.log(" interseptor keeps the token in the header");
        req.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    return req; 
}
);


// userApi.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       console.error("Response error:", error);
//       if (error.response.status === 401) {
//         navigate("/")  
//         // console.log("Removing token and navigating to home page");
//         // localStorage.removeItem("token");
//         // Replace 'navigate("/")' with the appropriate navigation code for your application
           

// console.log("below");
//       }
      
//     }
//   );
  

userApi.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      
      if (error) {
  
          console.log("error occured");
        // Token expired
        // Display message to user
        toast.error("unauthenticated user")
        setTimeout(()=>{
            
            window.location.href = '/';
        },1000)
        // Redirect to login page
        localStorage.removeItem("token");
      }
      return Promise.reject(error);
    }
  );


export const cloudApi = axios.create({
    baseURL: `https://api.cloudinary.com/v1_1/dcsdqyoh1/image`,
});
