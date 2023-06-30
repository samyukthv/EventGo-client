import {userApi} from '../utils/Apis'



export async function registerUser(credentials){
    try {
        console.log("this is reg");
        const data = await userApi.post('/register',credentials)
        console.log("below");
        return data
    } catch (error) {
        console.log("catched teh error");
       
        if(error.response.status==400){
            return {error:error.response.data.message}
        }
        
    }
}


export async function loginUser(credentials){
    try {
        console.log("this is login api");
        const data= await userApi.post('/login',credentials)
        return data
    } catch (error) {
        console.log("login error in api");
    }
}


export async function getEventDetails(){
    try {
        const data=await userApi.get('/events')
       
        return data
    } catch (error) {
        console.log("event details error api");
    }
}



export async function getOrganizerDetails(){
    try {
        const data =await userApi.get("/getOrganizerDetails")
        return data
    } catch (error) {
        console.log("organizer details error api");
    }
}


export async function userProfile(userId){
    try {
        const data= await userApi.get('/userProfile',userId)
        return data
    } catch (error) {
        console.log("userProfile error api");
    }
}


export async function sendMail(values){
try {
    const data = await userApi.post('/sendMail',values)
    return data
} catch (error) {
    
}
}

export async function setNewPassword(id,values){
    try {
        const data = await userApi.post(`/setNewPassword/${id}`,values)
        return data
    } catch (error) {
        
    }
    }

    export async function profileUpdate(value){
        try {
            const data= await userApi.patch(`/updateProfile`,value)
            return data
        } catch (error) {
            
        }
    }


    export async function userImageUpdate(profileImage,config){
        try {
            const data= await userApi.patch('/userImageUpdate',profileImage,config)
            return data
        } catch (error) {
            
        }
    }

    export async function eventDetails(id){
        try {
            const data= await userApi.get(`/eventDetails/${id}`)
            console.log("hy 1");
            return data
        } catch (error) {
            return error
           
        }
    }


    export async function organizerDetails(id){
        try {
            const data= await userApi.get(`/organizerDetails/${id}`)
            return data
        } catch (error) {
            return {error:"organizer details error"}
        }
    }


export const confirmBooking = async(value)=>{
    try {
        const data =await userApi.post('/confirmBooking',value)
        return data
    } catch (error) {
        
        return error
    }
}

export const getBillingDetails= async()=>{
    try {
        const data= await userApi.get('/getBillingDetails')
        return data
    } catch (error) {
        return {error:"billing details error"}
    }
}

export const isFollowingOrganizer= async(userId,organizerId)=>{
    try {
        const data = await userApi.get('/isFollowingOrganizer', {
            params: { organizerId: organizerId,userId:userId }
          });
        return data
    } catch (error) {
        console.log("follow error");
    }
}

export const followOrganizer =async(userId,organizerId)=>{
    try {
        const data = await userApi.post('/followOrganizer', 
             { organizerId: organizerId,userId:userId }
          );
        return data
    } catch (error) {
        console.log("follow error");
    }
}
export const unFollowOrganizer =async(userId,organizerId)=>{
    try {
        const data = await userApi.post('/unFollowOrganizer', 
             { organizerId: organizerId,userId:userId }
          );
        return data
    } catch (error) {
        console.log("follow error");
    }
}

export const organizerEvent= async(organizerId)=>{
    try {
        const data = await userApi.get("/organizerEvent",{
            params:{organizerId:organizerId}
        })
        return data
    } catch (error) {
        
    }
  }
export const organizerPosts= async(organizerId)=>{
    try {
        const data = await userApi.get("/organizerPosts",{
            params:{organizerId:organizerId}
        })
        return data
    } catch (error) {
        
    }
  }