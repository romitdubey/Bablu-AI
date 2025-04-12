import speech_recognition as sr
from core.state import assistant_state

recognizer = sr.Recognizer()
mic = sr.Microphone()

def listen_for_activation():
    with mic as source:
        recognizer.adjust_for_ambient_noise(source, duration=1)
        print("🕵️ Listening for activation...")
        try:
            audio = recognizer.listen(source)
            command = recognizer.recognize_google(audio).lower()
            if assistant_state.name in command:
                print(f"🧠 Activating {assistant_state.name}...")
                return True
        except Exception:
            return False
    return False

def listen_for_command():
    with mic as source:
        recognizer.adjust_for_ambient_noise(source, duration=1)
        print(f"🎙️ {assistant_state.name} is listening...")
        try:
            audio = recognizer.listen(source)
            return recognizer.recognize_google(audio).lower()
        except Exception:
            return None
