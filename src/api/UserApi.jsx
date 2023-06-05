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
