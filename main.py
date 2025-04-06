from multimodal_coordinator import handle_multimodal_request
from groq_api import needs_camera, send_text_only
import speech_recognition as sr
import time

recognizer = sr.Recognizer()
mic = sr.Microphone()

assistant_name = "Bablu"

def main():
    print(f"🎙️ {assistant_name} is listening... Say 'Hello {assistant_name}' to activate.")
    activate = False
    while True:        
        with mic as source:
            if activate:
                recognizer.adjust_for_ambient_noise(source,duration=1)
                print(f"🎙️ {assistant_name} is listening...")
                audio = recognizer.listen(source)
                try:
                    command = recognizer.recognize_google(audio).lower()
                except sr.UnknownValueError:
                    pass
                except sr.RequestError as e:
                    pass
                except Exception as e:
                    print(f"Unexpected error: {e}")
                camera = needs_camera(command)
                if "stop" in command:
                    return
                if camera:
                    print(command)
                    handle_multimodal_request(command)
                else:
                    print(command)
                    print(send_text_only(command))
            else:
                recognizer.adjust_for_ambient_noise(source,duration=1)
                print("🕵️ Listening...")
                audio = recognizer.listen(source)

        try:
            command = recognizer.recognize_google(audio).lower()
            if f"hello {assistant_name}" in command and not activate:
                print(f"🧠 Activating {assistant_name}...")
                activate = True
        except sr.UnknownValueError:
            pass
        except sr.RequestError as e:
            pass
        except Exception as e:
            print(f"Unexpected error: {e}")
        time.sleep(1)


if __name__ == "__main__":
    main()
