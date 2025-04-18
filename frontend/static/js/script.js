// document.addEventListener('DOMContentLoaded', () => {
//   const userInput = document.getElementById('user-input');
//   const sendButton = document.getElementById('send-button');
//   const chatLog = document.getElementById('chat-log');
//   const audioOutput = document.getElementById('audio-output');
//   const cameraButton = document.getElementById('camera-button');
//   const microphoneButton = document.getElementById('microphone-button');
//   const imageButton = document.getElementById('image-button');
//   const cameraPreview = document.getElementById('camera-preview');
//   const imageCanvas = document.getElementById('image-canvas');
//   const imageContext = imageCanvas.getContext('2d');
//   let mediaStream = null;

//   sendButton.addEventListener('click', sendMessage);
//   userInput.addEventListener('keypress', (event) => {
//       if (event.key === 'Enter') {
//           sendMessage();
//       }
//   });

//   function sendMessage() {
//       const message = userInput.value.trim();
//       if (message) {
//           appendMessage('user', message);
//           userInput.value = '';
//           fetch('/process_message', {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/x-www-form-urlencoded',
//               },
//               body: `message=${message}`,
//           })
//           .then(response => response.json())
//           .then(data => {
//               appendMessage('chatbot', data.response);
//               // Basic audio output (replace with a proper TTS library integration)
//               if ('speechSynthesis' in window) {
//                   const utterance = new SpeechSynthesisUtterance(data.response);
//                   speechSynthesis.speak(utterance);
//               } else {
//                   console.log("Text-to-speech not supported.");
//               }
//           })
//           .catch(error => {
//               console.error('Error sending message:', error);
//               appendMessage('chatbot', 'Sorry, I encountered an error.');
//           });
//       }
//   }

//   function appendMessage(sender, text) {
//       const messageDiv = document.createElement('div');
//       messageDiv.classList.add(`${sender}-message`);
//       messageDiv.textContent = text;
//       chatLog.appendChild(messageDiv);
//       chatLog.scrollTop = chatLog.scrollHeight; // Scroll to the bottom
//   }

//   cameraButton.addEventListener('click', async () => {
//       try {
//           if (!mediaStream) {
//               mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
//               cameraPreview.srcObject = mediaStream;
//               cameraPreview.style.display = 'block';
//           } else {
//               // Stop camera stream
//               mediaStream.getTracks().forEach(track => track.stop());
//               cameraPreview.srcObject = null;
//               cameraPreview.style.display = 'none';
//               mediaStream = null;
//           }
//       } catch (error) {
//           console.error('Error accessing camera:', error);
//           appendMessage('chatbot', 'Failed to access camera.');
//       }
//   });

//   imageButton.addEventListener('click', () => {
//       if (mediaStream) {
//           imageCanvas.width = cameraPreview.videoWidth;
//           imageCanvas.height = cameraPreview.videoHeight;
//           imageContext.drawImage(cameraPreview, 0, 0, imageCanvas.width, imageCanvas.height);
//           const imageDataURL = imageCanvas.toDataURL('image/png'); // Or 'image/jpeg'
//           // You would typically send this imageDataURL to the backend
//           fetch('/upload_image', {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ image_data: imageDataURL }),
//           })
//           .then(response => response.json())
//           .then(data => {
//               appendMessage('chatbot', data.message);
//           })
//           .catch(error => {
//               console.error('Error uploading image:', error);
//               appendMessage('chatbot', 'Failed to upload image.');
//           });
//       } else {
//           appendMessage('chatbot', 'Camera is not active.');
//       }
//   });

//   microphoneButton.addEventListener('click', async () => {
//       try {
//           const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//           // Handle audio input here (e.g., using the Web Speech API)
//           console.log('Microphone access granted:', stream);
//           appendMessage('chatbot', 'Microphone access granted (functionality not fully implemented).');
//           // You would typically use a library like SpeechRecognition here
//       } catch (error) {
//           console.error('Error accessing microphone:', error);
//           appendMessage('chatbot', 'Failed to access microphone.');
//       }
//   });
// });



// Uploading resume to Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";
function upload(resumeFile) {

    const firebaseConfig = {
        apiKey: "AIzaSyDCxuvCpAfSSmhd7cVS3Wzm3bnd3GoQudQ",
        authDomain: "hackathons-5f2de.firebaseapp.com",
        projectId: "hackathons-5f2de",
        storageBucket: "hackathons-5f2de.firebasestorage.app",
        messagingSenderId: "515532031820",
        appId: "1:515532031820:web:bd9a665daae44dab0231e9",
        measurementId: "G-MDS30FJ11V"
    };


    //Creating a reference to upload resume file - .pdf only for now
    const firebase_app = initializeApp(firebaseConfig);
    const storage = getStorage(firebase_app); // This is the storage service
    const resumeRef = ref(storage, 'resumes/userId'); // storage reference

    // Upload the resume
    uploadBytes(resumeRef, resumeFile)
    .then((snapshot) => {
        console.log("Success!")
        console.log(snapshot);
    })
    .catch((error)=>{        
        console.log("Oops, some error occured.");
        console.error(error);
    });

}
let submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let resume = document.getElementById('resume').files[0];

    if (resume == undefined) alert("Please select a file")
    else {
        upload(resume);
    }

})
