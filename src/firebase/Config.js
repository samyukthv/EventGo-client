



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtRbPH9PK1uwPcUIUUWC5fzQ15Sq_LUTM",
  authDomain: "eventgo2-e9beb.firebaseapp.com",
  projectId: "eventgo2-e9beb",
  storageBucket: "eventgo2-e9beb.appspot.com",
  messagingSenderId: "738869414185",
  appId: "1:738869414185:web:f617f10d64dff0272b8f38"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)