import React, { useRef, useState, useEffect } from 'react'
import './Interview-Home-Page.css';
import { Experience } from '../Avatar/Experience';
import Dictaphone from '../Text-Speech/Dictaphone';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
const HomePage = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);

  const [buttonTrigger, setButtonTrigger] = useState(false);
  const [nextQues, setNextQues] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [script, setScript] = useState('');
  const [playAudio, setPlayAudio] = useState(false);


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
  const speekHandle = () => {
    (buttonTrigger) ? setButtonTrigger(false) : setButtonTrigger(true);
    console.log("hello")
    if (playAudio) {
      setPlayAudio(false)
    } else {

      setPlayAudio(true)
    }
    if (isSpeaking) {
      setIsSpeaking(false)
    } else {
      setIsSpeaking(true);
    }

    setScript(localStorage.getItem('chat'))
  }
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const inactivityTimer = useRef(null);
  const [hasSpoken, setHasSpoken] = useState(false);
  const previousTranscriptLength = useRef(0);

  // Stop mic after 5s of no activity
  const  startInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    // await setNextQues(true);
    inactivityTimer.current = setTimeout(() => {
      SpeechRecognition.stopListening();
      setNextQues(false);
      console.log('Mic stopped due to 5s of inactivity');
    }, 5000);
  };

  // Start listening + initialize everything
  const startListeningWithInactivityTimer = () => {
    setNextQues(true);
    resetTranscript();
    setHasSpoken(false);
    previousTranscriptLength.current = 0;

    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    console.log('Mic started');

    // Start inactivity timer immediately (in case user stays silent)
    startInactivityTimer();
  };

  // Watch for transcript updates
  useEffect(() => {
    if (!listening) return;

    if (transcript.length > previousTranscriptLength.current) {
      previousTranscriptLength.current = transcript.length;

      if (!hasSpoken) {
        setHasSpoken(true);
      }

      // Reset inactivity timer on new speech
      console.log('Speech detected, resetting inactivity timer');
      startInactivityTimer();
    }

    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [transcript, listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser doesn't support speech recognition.</span>;
  }
console.log(transcript)
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
            <Experience className="experience-interview-page"
              playAudio={isSpeaking}
              script={script}
              setSpeaking={setIsSpeaking}
            />
            <div className="position-absolute bottom-0 start-50 translate-middle-x">
              {buttonTrigger ? <button className='speak-btn' onClick={speekHandle}>Stop</button> : <button className='speak-btn' onClick={speekHandle}>Start</button>}
              {nextQues ? <button className='speak-btn' onClick={()=>{SpeechRecognition.stopListening(); setNextQues(false)}} >Stop</button> : <button className='speak-btn' onClick={startListeningWithInactivityTimer} >Speak</button>}
            </div>
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

            <img src="/user.png" alt="User Graphic" style={{ width: "22vw" }} hidden={isCameraOn} />

            {(isCameraOn) ? <button className="camera-toggle" onClick={stopCamera}>Stop Camera</button> : <button className="camera-toggle" onClick={startCamera}>Start Camera</button>}
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default HomePage
