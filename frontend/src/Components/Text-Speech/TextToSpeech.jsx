import React, { useEffect, useState } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState("hello, I m AI Interviewer. Welcome to the Text s to Speech demo. I can read this text for you in Hindi. Please listen carefully.");
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

  return (
    <div>
      <h2>Text to Speech</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        cols={50}
      />
    </div>
  );
};

export default TextToSpeech;
