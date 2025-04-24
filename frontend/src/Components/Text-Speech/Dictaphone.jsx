import React, { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
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
  const startInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    inactivityTimer.current = setTimeout(() => {
      SpeechRecognition.stopListening();
      console.log('Mic stopped due to 5s of inactivity');
    }, 5000);
  };

  // Start listening + initialize everything
  const startListeningWithInactivityTimer = () => {
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

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startListeningWithInactivityTimer}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p><strong>Transcript:</strong></p>
      <p style={{ minHeight: "100px", border: "1px solid #ccc", padding: "10px" }}>{transcript}</p>
      {listening && <p>Waiting for voice input…</p>}
      {listening && <p>Mic will auto-stop after 5s of silence</p>}
    </div>
  );
};

export default Dictaphone;