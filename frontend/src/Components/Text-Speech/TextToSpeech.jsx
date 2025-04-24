import React, { useState, useEffect } from 'react';

function TextToSpeech() {
  const [text, setText] = useState(' hello, I m AI Interviewer. Welcome to the Text to Speech demo. ');
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      const hindiVoices = availableVoices.filter((voice) =>
        voice.name.includes('Google हिन्दी')
      );
      setVoices(hindiVoices);
      if (hindiVoices.length > 0) {
        setSelectedVoice(hindiVoices[0].name);
      }
        console.log(selectedVoice)
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  function handleSpeak () {
      if (text) {
          const utterance = new SpeechSynthesisUtterance(text);
          const voice = voices.find((v) => v.name === selectedVoice);
        //   console.log(voice)
          if (voice) {
          console.log("handleSpeak called")
        utterance.voice = voice;
      }
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };
    }
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

useEffect(() => {  
    if (isSpeaking) {
        handleSpeak();
    } else {
        handleStop();
    }   
 }, [isSpeaking])
// if(isSpeaking == false){
//     handleSpeak();
// }

  return (
    <div>
      {/* <textarea
        rows="4"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to speak"
      /> */}
      {/* <button onClick={handleSpeak} disabled={isSpeaking}>
        {isSpeaking ? 'Speaking...' : 'Speak'}
      </button>
      <button onClick={handleStop} disabled={!isSpeaking}>
        Stop
      </button> */}
    </div>
  );
}

export default TextToSpeech;