import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux"
import {store,persistor} from "./redux/store"
import {PersistGate} from "redux-persist/integration/react"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <GoogleOAuthProvider  clientId="308444847826-14iq1plqjaqe570ekmrfmguv6geueed7.apps.googleusercontent.com">
 
    <App />
  
  </GoogleOAuthProvider>
  </PersistGate>
  </Provider>
  ,
)
