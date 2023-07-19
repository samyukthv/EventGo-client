import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Create a separate navigate function to use for redirection


// user
export const userApi = axios.create({
  baseURL: "https://eventgo-server.onrender.com",
});https://eventgo-server.onrender.com

userApi.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = "Bearer " + localStorage.getItem("token");
  }
  return req;
});


userApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        toast.error('Unauthenticated user');
        localStorage.removeItem('token');

setTimeout(()=>{
  window.location.href = "/";

},1000)


} else if (error.response.status === 500) {


        window.location.href = "/error-page";
      }
    }
    return Promise.reject(error);
  }
);

// organizer
export const organizerApi = axios.create({
  baseURL: "https://eventgo-server.onrender.com/organizer",
});

organizerApi.interceptors.request.use((req) => {
  if (localStorage.getItem("organizertoken")) {
    console.log("interceptor keeps the token in the header organizer");
    req.headers.Authorization =
      "Bearer " + localStorage.getItem("organizertoken");
  }
  return req;
});

organizerApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("error occurred");

      toast.error("Unauthenticated organizer");
      localStorage.removeItem("organizertoken");
      setTimeout(()=>{
        window.location.href = "/organizer/";
      
      },1000)      // navigateTo("/organizer/")
    }
    return Promise.reject(error);
  }
);

export const adminApi = axios.create({
  baseURL: "https://eventgo-server.onrender.com/admin",
});

export const cloudApi = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1/dcsdqyoh1/image",
});
