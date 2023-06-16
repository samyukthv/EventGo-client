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


export async function userProfile(){
    try {
        const data= await userApi.get('/userProfile')
        console.log(data,12334455677889);
        return data
    } catch (error) {
        console.log("userProfile  error api");
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
            const data= await userApi.post(`/updateProfile`,value)
            return data
        } catch (error) {
            
        }
    }

    export async function eventDetails(id){
        try {
            const data= await userApi.get(`/eventDetails/${id}`)
            return data
        } catch (error) {
            
        }
    }


    export async function organizerDetails(id){
        try {
            const data= await userApi.get(`/organizerDetails/${id}`)
            return data
        } catch (error) {
            
        }
    }