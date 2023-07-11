import axios from "axios";



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
});


export const cloudApi = axios.create({
    baseURL: `https://api.cloudinary.com/v1_1/dcsdqyoh1/image`,
});
