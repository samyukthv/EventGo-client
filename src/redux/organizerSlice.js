import {createSlice} from "@reduxjs/toolkit" 


const initialState={
    firstName:"",
    lastName:"",
    id:"",
    email:"",
    mobile:"",
    image:"",
    about:"",
    instagram:"",
    facebook:"",
    linkedin:"",

}

const organizerSlice = createSlice({
    name:"organizer",
    initialState,
    reducers:{
        setOrganizerDetails:(state,action)=>{
            state.id=action.payload.id
            state.firstName=action.payload.firstName
            state.lastName=action.payload.lastName
            state.email= action.payload.email
            state.mobile= action.payload.mobile
            state.image=action.payload.image
            state.about=action.payload.about
            state.instagram=action.payload.instagram
            state.facebook=action.payload.facebook
            state.linkedin=action.payload.linkedin
            
        },
        organizerLogout:(state,action)=>{
            state.id=""
            state.firstName=""
            state.lastName=""
            state.email= ""
            state.mobile= ""
            state.image=""
            state.about=""
            state.instagram=""
            state.facebook=""
            state.linkedin=""
        }
    }
})


export const { setOrganizerDetails,organizerLogout } = organizerSlice.actions;
export default organizerSlice.reducer;