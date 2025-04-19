import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

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
const auth = getAuth(app);

export async function signup(mail, pswd) {
    try{
        const userCred = await createUserWithEmailAndPassword(auth, mail, pswd);
        return userCred
    }
    catch(err){
        console.log(err);
        return null
    }
}

export async function login(mail, pswd) {
    try{
        const userCred = await signInWithEmailAndPassword(auth, mail, pswd);
        return userCred
    }
    catch(err){
        console.log(err);
        return null
    }
}
