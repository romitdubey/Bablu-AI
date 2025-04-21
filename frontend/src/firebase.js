import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDCxuvCpAfSSmhd7cVS3Wzm3bnd3GoQudQ",
    authDomain: "hackathons-5f2de.firebaseapp.com",
    projectId: "hackathons-5f2de",
    storageBucket: "hackathons-5f2de.firebasestorage.app",
    messagingSenderId: "515532031820",
    appId: "1:515532031820:web:bd9a665daae44dab0231e9",
    measurementId: "G-MDS30FJ11V"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
