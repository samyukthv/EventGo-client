import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Create a separate navigate function to use for redirection
const navigateTo = (path) => {
  const navigate = useNavigate();
  navigate(path);
};

// user
export const userApi = axios.create({
  baseURL: "http://localhost:3000",
});

userApi.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    console.log("interceptor keeps the token in the header");
    req.headers.Authorization = "Bearer " + localStorage.getItem("token");
  }
  return req;
});

userApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("error occurred");

      toast.error("Unauthenticated user");
      localStorage.removeItem("token");
      window.location.href = "/";
      
    }
    return Promise.reject(error);
  }
);

// organizer
export const organizerApi = axios.create({
  baseURL: "http://localhost:3000/organizer",
});

organizerApi.interceptors.request.use((req) => {
  if (localStorage.getItem("organizertoken")) {
    console.log("interceptor keeps the token in the header organizer");
    req.headers.Authorization = "Bearer " + localStorage.getItem("organizertoken");
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
      window.location.href = "/organizer/";;
    }
    return Promise.reject(error);
  }
);

export const adminApi = axios.create({
  baseURL: "http://localhost:3000/admin",
});

export const cloudApi = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1/dcsdqyoh1/image",
});
