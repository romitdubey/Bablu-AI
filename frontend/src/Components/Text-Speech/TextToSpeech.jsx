import React, { useState, useEffect } from 'react';

function TextToSpeech() {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      // Filter voices to include only "Google हिन्दी"
      const hindiVoices = availableVoices.filter((voice) =>
        voice.name.includes('Google हिन्दी')
      );
      setVoices(hindiVoices);
      if (hindiVoices.length > 0) {
        setSelectedVoice(hindiVoices[0].name); // Default to the first Hindi voice
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices; // Ensure voices are loaded in all browsers
  }, []);

  const handleSpeak = () => {
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = voices.find((v) => v.name === selectedVoice);
      if (voice) {
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

  return (
    <div>
      <textarea
        rows="4"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to speak"
      />
      {/* <select
        value={selectedVoice}
        onChange={(e) => setSelectedVoice(e.target.value)}
      >
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select> */}
      <button onClick={handleSpeak} disabled={isSpeaking}>
        {isSpeaking ? 'Speaking...' : 'Speak'}
      </button>
      <button onClick={handleStop} disabled={!isSpeaking}>
        Stop
      </button>
    </div>
  );
}

export default TextToSpeech;