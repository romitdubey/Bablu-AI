import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

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


export async function signup(mail, pswd) {
    try{
        const auth = getAuth(app);
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
        const auth = getAuth(app);
        const userCred = await signInWithEmailAndPassword(auth, mail, pswd);
        return userCred
    }
    catch(err){
        console.log(err);
        return null
    }
}

export async function uploadResume(resumeFile){
    try{
        const storage = getStorage(app)
        const resumeRef = ref(storage, 'resumes/userId'); 
        const snapshot = await uploadBytes(resumeRef, resumeFile)
        console.log("Success!")
        console.log(snapshot);
        return snapshot
    }
    catch(err){
        console.log("Oops, some error occured.");
        console.error(err);
        return null;
    }
}