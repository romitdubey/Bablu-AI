import React, { useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const inactivityTimer = useRef(null);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListeningWithInactivityTimer = () => {
    SpeechRecognition.startListening();
    console.log('Started listening');

    // Clear any existing timer
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
console.log(inactivityTimer.current)
    // Start a new inactivity timer
    inactivityTimer.current = setTimeout(() => {
      SpeechRecognition.stopListening();
      console.log('Stopped listening due to inactivity');
    }, 5000); // 5000ms = 5 seconds
  };

  useEffect(() => {
    // Reset the inactivity timer whenever the transcript changes
    if (listening) {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }

      inactivityTimer.current = setTimeout(() => {
        SpeechRecognition.stopListening();
        console.log('Stopped listening due to inactivity');
      }, 10000); // 5000ms = 5 seconds
    }

    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [transcript, listening]);

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startListeningWithInactivityTimer}>Start with Inactivity Timer</button>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default Dictaphone;