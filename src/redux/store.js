import {configureStore} from "@reduxjs/toolkit"
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import organizerReducer from './organizerSlice'
import userReducer from "./userSlice"
import bookingReducer from './EventSlice'

const persistConfig={
    key:"user",
    storage,

}

const persistConfigOrganizer={
    key:"organizer",
    storage,

}
const persistConfigBooking={
    key:"booking",
    storage,

}



const persistedUserReducer=persistReducer(persistConfig,userReducer)
const persistedReducer=persistReducer(persistConfigOrganizer,organizerReducer)
const persistedBookingReducer=persistReducer(persistConfigBooking,bookingReducer)


const store = configureStore({
reducer:{
    user:persistedUserReducer,
    organizer:persistedReducer,
    booking:persistedBookingReducer
},

})


const persistor=persistStore(store)
export  {store,persistor}