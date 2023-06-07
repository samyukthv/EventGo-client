import {createSlice} from "@reduxjs/toolkit" 


const initialState={
    firstName:"",
    lastName:"",
    id:"",
    email:"",
    mobile:"",
    image:"",
}

const organizerSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setOrganizerDetails:(state,action)=>{
            state.id=action.payload.id
            state.firstName=action.payload.firstName
            state.lastName=action.payload.lastName
            state.email= action.payload.email
            state.mobile= action.payload.mobile
            state.image=action.payload.image

            
        },
        organizerLogout:(state,action)=>{
            state.id=""
            state.firstName=""
            state.lastName=""
            state.email= ""
            state.mobile= ""
            state.image=""
        }
    }
})


export const { setOrganizerDetails,organizerLogout } = organizerSlice.actions;
export default organizerSlice.reducer;