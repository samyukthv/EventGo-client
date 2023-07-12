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


export const blockUser= async(userId)=>{
    try {
        const data= await adminApi.patch("/userBlock",{userId})
        return data
    } catch (error) {
        
    }
}
export const unBlockUser= async(userId)=>{
    try {
        const data= await adminApi.patch("/userUnblock",{userId})
        return data
    } catch (error) {
        
    }
}
export const blockOrganizer= async(organizerId)=>{
    try {
        const data= await adminApi.patch("/organizerBlock",{organizerId})
        return data
    } catch (error) {
        
    }
}
export const unBlockOrganizer= async(organizerId)=>{
    try {
        const data= await adminApi.patch("/organizerUnblock",{organizerId})
        return data
    } catch (error) {
        
    }
}