import axios from "axios";



export const userApi=axios.create({
    baseURL:`http://localhost:3000`
})


export const organizerApi=axios.create({
    baseURL:`http://localhost:3000/organizer`
})





userApi.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        console.log("intersrptor");
        req.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    console.log("not the if of interseptor");
    return req; 
});


