import {configureStore} from "@reduxjs/toolkit"
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import organizerReducer from './organizerSlice'
import userReducer from "./userSlice"

const persistConfig={
    key:"root",
    storage,

}


const persistedUserReducer=persistReducer(persistConfig,userReducer)
const persistedReducer=persistReducer(persistConfig,organizerReducer)


const store = configureStore({
reducer:{
    user:persistedUserReducer,
    organizer:persistedReducer,
},

})


const persistor=persistStore(store)
export  {store,persistor}