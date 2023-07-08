
import {organizerApi} from '../utils/Apis'
import {cloudApi} from "../utils/Apis"


export async function registerOrganizer(credentials){
    try {
        console.log("this is reg");
        const data = await organizerApi.post('/register',credentials)
        console.log("below");
        return data
    } catch (error) {
        console.log("catched the error");
       
        if(error.response.status==400){
            return {error:error.response.data.message}
        }
        
    }
}




export async function loginOrganizer(credentials){
    try {
        console.log("this is login api");
        const data= await organizerApi.post('/login',credentials)
        return data
    } catch (error) {
        console.log("login error in api");
    }
}



export async function addEvent(eventDetails,image,coverImage){
    try {
        console.log("this is add event organizer api");
        const data= await organizerApi.post('/add-event',{eventDetails,image,coverImage})
        return data
    } catch (error) {
        console.log("add event error is api");
    }
}


export async function profileUpdate(value){
    try {
        const data= await organizerApi.post(`/updateProfile`,value)
        return data
    } catch (error) {
        
    }
}

export async function organizerCoverImageUpload(coverImage){
    try {
        const data= await cloudApi.post('/upload',coverImage)
        return data
    } catch (error) {
        
    }
}



export const saveCoverImage= async(coverImage,organizerId)=>{
    try {
        const data= await organizerApi.patch("/saveCoverImage",{coverImage,organizerId})
        return data
    } catch (error) {
        
    }
}

export  const saveImage= async(image,organizerId)=>{
    try {
        const data= await organizerApi.patch('/saveImage',{image,organizerId})
        return data
    } catch (error) {
        
    }
   }


export async function organizerImageUpdate(profileImage){
    try {
        const data= await cloudApi.post('/upload',profileImage)
        return data
    } catch (error) {
        
    }
}


export async function organizerEvents(organizerId) {
    try {
      const data = await organizerApi.get('/organizerEvents', {
        params: { organizerId: organizerId }
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }


  export const addPosts =async(formData,config)=>{
    try {
        const data=await organizerApi.post('/organizerAddPost',formData,config)
        return data
    } catch (error) {
        console.log("addpost error");
    }

  }

  export const getPosts=async(organizerId)=>{
    try {
        const data= await organizerApi.get("/organizerPosts",{
         params : { organizerId: organizerId }
        })
        return data
    } catch (error) {
        
    }
  }


  export const eventDetails=async(eventId)=>{
    try {
        const data= await organizerApi.get("/eventDetails",{
            params:{eventId:eventId}

        })
        return data
    } catch (error) {
        
    }
  }


  export const chartdetails=async(eventId)=>{
    try {
        const data= await organizerApi.get('/chartdetails',{
            params:{eventId:eventId}
        })
        return data
    } catch (error) {
        
    }
  }
  export const tableDetails=async(eventId)=>{
    try {
        const data= await organizerApi.get('/tableDetails',{
            params:{eventId:eventId}
        })
        return data
    } catch (error) {
        
    }
  }


export const getAllContacts = async(organizerId)=>{
    try {
       const data =await organizerApi.get("/getAllContacts",{
        params:{organizerId:organizerId}
       })
       return data 
    } catch (error) {
        
    }
}

export const getAllMessages = async(to,from)=>{
    try {
        const data= await organizerApi.get("/getAllMessages",{
            params:{to,from}
        })
        return data
    } catch (error) {
        
    }
}

export const addMessage = async (from, to, msg) => {
    try {
      const data = await organizerApi.post("/addMessage", { from, to, msg });
      return data;
    } catch (error) {
      // Handle the error
    }
  };

export const uploadEditedEventImage= async(formData)=>{
    try {
        const data= await cloudApi.post("/upload",formData)
        return data
    } catch (error) {
        
    }
}

  export async function confirmEventEdit(event,image,coverImage){
    try {
        const data= await organizerApi.patch('/editEvent',{event,image,coverImage})
        return data
    } catch (error) {
        console.log("add event error is api");
    }
}

//   export async function addEvent(fromData,config){
//     try {
//         const data= await organizerApi.post('/add-event',{fromData,config})
//         return data
//     } catch (error) {
//         console.log("add event error is api");
//     }
// }
