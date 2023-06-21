import { createSlice } from "@reduxjs/toolkit";


const initialState ={
   totalBill:"",
   ticketQuantity:"",
   organizerId:"",
   eventId:"",
   userId:"",
   userFirstName:"",
   userSecondName:"",
   bookingEmail:"",
   bookingMobile:"",



}

const bookingSlice=createSlice({
    name:"booking",
    initialState,
    reducers:{
        setBookingDetails:(state,action)=>{
            state.totalBill=action.payload.totalBill
            state.ticketQuantity=action.payload.ticketQuantity
            state.organizerId=action.payload.organizerId
            state.eventId=action.payload.eventId
            state.userId=action.payload.userId
            state.userFirstName=action.payload.userFirstName
            state.userSecondName=action.payload.userSecondName
            state.bookingEmail=action.payload.bookingEmail
            state.bookingMobile=action.payload.bookingMobile

        },
        unsetBookingDetails:(state,action)=>{
            state.totalBill=""
            state.ticketQuantity=""
            state.organizerId=""
            state.eventId=""
            state.userId=""
            state.userFirstName=""
            state.userSecondName=""
            state.bookingEmail=""
            state.bookingMobile=""
            

        }
    }
})

export const { setBookingDetails,unsetBookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;