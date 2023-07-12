import {userApi} from '../utils/Apis'
import {cloudApi} from "../utils/Apis"



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
    }
}


export async function userProfile(userId){
    try {
        const data= await userApi.get('/userProfile',userId)
        return data
    } catch (error) {
        console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
       return error
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
            console.log("hiiii");
             
        }
    }


    export async function userImageUpdate(profileImage){
        try {
            const data= await cloudApi.post('/upload',profileImage)
            return data
        } catch (error) {
            
        }
    }

   export  const saveImage= async(image,userId)=>{
    try {
        const data= await userApi.patch('/saveImage',{image,userId})
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

  export const personalChoice= async(userId)=>{
 try {
    const data= await userApi.get("/personalChoice",{
        params:{userId:userId}
    })
    return data
 } catch (error) {
    
 }
  }


  export const allEvents=async()=>{
    try {
        const data = await userApi.get('/allEvents')
        return data
    } catch (error) {
        
    }
  }

  export const senderDetails= async(senderId)=>{
    try {
        const data = await userApi.get("/senderDetails",{
            params:{senderId:senderId}
        })
        return data
    } catch (error) {
        
    }}


    export const addMessage = async (from, to, msg) => {
        try {
          const data = await userApi.post("/addMessage", { from, to, msg });
          return data;
        } catch (error) {
          // Handle the error
        }
      };


      export const getAllMessages=async(from,to)=>{
        try {
            const data = await userApi.get("/getAllMessages",{
                params:{from,to}
            })
            return data;
        } catch (error) {
            
        }
      }


      export const submitReview =async(details,eventId)=>{
        try {
            const data= await userApi.post("/setReview",{
                details,eventId
            })
            return data
        } catch (error) {
            
        }
      }


      export const allReview= async(eventId)=>{
        try {
            const data= await userApi.get("/allReview",{
                params:{eventId}
            })
            
            return data
        } catch (error) {
            
        }
      }

      export const getPosts= async()=>{
        try {
            const data= await userApi.get("/listenPosts")
            return data
        } catch (error) {
            
        }
      }


      export const getUserProfileDetails= async(userId)=>{
        try {
            const data= await userApi.get("/getUserProfileDetails",{params:{userId}})
            return data
        } catch (error) {
            
        }
      }