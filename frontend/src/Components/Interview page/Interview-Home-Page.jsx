import React, { useRef, useState } from 'react'
import './Interview-Home-Page.css';
import { Experience } from '../Avatar/Experience';
const HomePage = () => {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraOn(true);
            }
        } catch (err) {
            console.log("Camera Error : ", err);
        }
    };
    const stopCamera = () => {
        if (streamRef.current) {
            const track = streamRef.current.getTracks();
            track.forEach(track => track.stop());
            setIsCameraOn(false);
        }
    }

    return (
        <section className="homePage-section">
            <div className="row my-row">
                <div className="col-md-2 col-sm-4 p-0 subcontainers">
                    <div className="chat-section ">
                        <div className="messages" id="messages">
                            <div className="message user"><i className="fa-thin fa-user"></i></div>
                            <div className="message assistant">Chat History...</div>
                        </div>
                        <div className="input-area">
                            {/* chat history content */}
                        </div>

                    </div>
                </div>
                <div className="col-md-5 col-sm-6 p-0 subcontainers">
                    <div className="chat-section ">
                        {/* <div className="messages" id="messages">
                            <div className="message user">Hello Bablu!</div>
                            <div className="message assistant">Namaste Bhai! Kya help chahiye?</div>
                        </div>
                        <div className="input-area">
                            <input type="text" id="userInput" placeholder="Type your message..." />
                            <div className="mic"></div>
                        </div>
                         */}
                         <Experience/>

                    </div>
                    
                </div>
                <div className="col-md-4 col-sm-12 subcontainers">
                    <div className="chat-section ">
                        <video ref={videoRef} autoPlay muted className={(isCameraOn) ? 'demo' : 'background'} ></video>
                        {(isCameraOn) ? <button className="camera-toggle" onClick={stopCamera}>Stop Camera</button> : <button className="camera-toggle" onClick={startCamera}>Start Camera</button>}
                    </div>
                </div>
            </div>  
        </section>
    )
}

export default HomePage
