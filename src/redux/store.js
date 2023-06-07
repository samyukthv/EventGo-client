import {configureStore} from "@reduxjs/toolkit"
import organizerReducer from './organizerSlice'
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"


const persistConfig={
    key:"root",
    storage,

}

const persistedReducer=persistReducer(persistConfig,organizerReducer)
const store = configureStore({
reducer:{
    organizer:persistedReducer,
},

})


const persistor=persistStore(store)
export  {store,persistor}