import React, { useRef, useState, useEffect } from 'react'
import './Interview-Home-Page.css';
import { Experience } from '../Avatar/Experience';
const HomePage = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  /*TEXT TO SPEECH START */
  const [text, setText] = useState("hello, I m AI Interviewer bablu. Welcome to the Text s to Speech demo. I am your personal AI ineterview. Please listen carefully.");
  //   function speek(){
  //       const value = new SpeechSynthesisUtterance(text);
  //       window.speechSynthesis.speak(value);
  //     }
  //     useEffect(() => {  speek() },[])
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Load voices and set Hindi voice
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      const hindiVoices = availableVoices.filter(voice => voice.lang.includes('hi') || voice.name.includes('हिन्दी'));

      if (hindiVoices.length > 0) {
        setVoices(hindiVoices);
        setSelectedVoice(hindiVoices[0]);
      }
    };

    if (speechSynthesis.getVoices().length !== 0) {
      loadVoices();
    } else {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Speak the text when voice is loaded
  useEffect(() => {
    if (selectedVoice && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      speechSynthesis.speak(utterance);
    }
  }, [selectedVoice, text]);


  /*TEXT TO SPEECH END */



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
              <div className="message assistant">Chat History</div>
              <div className='chat'>{localStorage.getItem('chat')}</div>              
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
            <Experience />

          </div>

        </div>
        <div className="col-md-4 col-sm-12 subcontainers">
          <div className="chat-section ">
            {/* 
            {
              (isCameraOn) ?
                <>
                  {console.log(isCameraOn)}
                  <video ref={videoRef} autoPlay muted className={(isCameraOn) ? 'demo' : 'background'} ></video>
                  <button className="camera-toggle" onClick={stopCamera}>Stop Camera</button>
                </>
                :
                <>
                  {console.log(isCameraOn)}
                  
                  <button className="camera-toggle" onClick={startCamera}>Start Camera</button>
                </>
            } */}


            <video ref={videoRef} autoPlay muted className={(isCameraOn) ? 'demo' : 'background'} hidden={!isCameraOn}></video>

            <img src="/user.png" alt="User Graphic" style={{ width: "22vw" }} hidden={isCameraOn}/>

            {(isCameraOn) ? <button className="camera-toggle" onClick={stopCamera}>Stop Camera</button> : <button className="camera-toggle" onClick={startCamera}>Start Camera</button>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage
