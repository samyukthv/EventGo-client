
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