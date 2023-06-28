
import {organizerApi} from '../utils/Apis'

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



export async function addEvent(fromData,config){
    try {
        console.log("this is add event organizer api");
        const data= await organizerApi.post('/add-event',fromData,config)
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

export async function organizerCoverImageUpload(coverImage,config){
    try {
        const data= await organizerApi.patch('/organizerCoverImageUpdate',coverImage,config)
        return data
    } catch (error) {
        
    }
}


export async function organizerImageUpdate(profileImage,config){
    try {
        const data= await organizerApi.patch('/organizerImageUpdate',profileImage,config)
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