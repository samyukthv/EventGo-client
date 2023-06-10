import {createSlice} from "@reduxjs/toolkit" 


const initialState={
    firstName:"",
    lastName:"",
    id:"",
    email:"",
    mobile:"",
    image:"",
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserDetails:(state,action)=>{
            state.id=action.payload.id
            state.firstName=action.payload.firstName
            state.lastName=action.payload.lastName
            state.email= action.payload.email
            state.mobile= action.payload.mobile
            state.image=action.payload.image

            
        },
        userLogout:(state,action)=>{
            state.id=""
            state.firstName=""
            state.lastName=""
            state.email= ""
            state.mobile= ""
            state.image=""
        }
    }
})


export const { setUserDetails,userLogout } = userSlice.actions;
export default userSlice.reducer;