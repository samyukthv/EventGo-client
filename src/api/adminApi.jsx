import { adminApi } from "../utils/Apis";
import {cloudApi} from "../utils/Apis"


export const loginAdmin= async(details)=>{
    try {
        console.log("hi");
        const data = await adminApi.post("/adminLogin",details)
        return data
    } catch (error) {
        return error
    }
}

export const allUsers = async()=>{
    try {
        const data= await adminApi.get("/allUsers")
        return data
    } catch (error) {
        
    }
}
export const allOrganizers = async()=>{
    try {
        const data= await adminApi.get("/allOrganizers")
        return data
    } catch (error) {
        
    }
}

export const addBanner= async(values,image)=>{
    try {
        const data= await adminApi.post("/banner",{values,image})
        return data
    } catch (error) {
        
    }
}

export const bannerOne= async()=>{
    try {
        const data= await adminApi.get("/bannerOne")
        return data
    } catch (error) {
        
    }
}

export const getBanner=async(eventId)=>{
    try {
        const data= await adminApi.get("/getBanner",{params:{eventId}})
        return data
    } catch (error) {
        
    }
}

export const EditEvent=async(banner,image)=>{
    try {
        const data= await adminApi.patch("/editBanner",{banner,image})
        return data
    } catch (error) {
        
    }
}




export async function editedBannerImage(bannerImage){
    try {
        const data= await cloudApi.post('/upload',bannerImage)
        return data
    } catch (error) {
        
    }
}