from multimodal_coordinator import handle_multimodal_request
from groq_api import needs_camera, send_text_only
import speech_recognition as sr
import time
from playsound import text_to_speech
import cv2

recognizer = sr.Recognizer()
mic = sr.Microphone()

assistant_name = "bablu"

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
                    continue
                except sr.RequestError as e:
                    continue
                except Exception as e:
                    print(f"Unexpected error: {e}")
                camera = needs_camera(command)
                if f"stop {assistant_name}" in command:
                    activate = False
                    cap.release()
                elif camera:
                    print(command)
                    handle_multimodal_request(command,cap)
                else:
                    print(command)
                    res = send_text_only(command)
                    print(res)
                    text_to_speech(res)
            else:
                recognizer.adjust_for_ambient_noise(source,duration=1)
                print("🕵️ Listening...")
                audio = recognizer.listen(source)

                try:
                    command = recognizer.recognize_google(audio).lower()
                    if f"{assistant_name}" in command and not activate:
                        print(f"🧠 Activating {assistant_name}...")
                        activate = True
                        cap = cv2.VideoCapture(1)
                        
                        camera_index =0
                        while not cap.isOpened() and camera_index < 5:
                            print(f"Trying to open camera at index {camera_index}...")
                            cap = cv2.VideoCapture(camera_index)
                            camera_index += 1
                            
                        if not cap.isOpened():
                            print("Error: Could not open webcam.")
                except sr.UnknownValueError:
                    continue
                except sr.RequestError as e:
                    continue
                except Exception as e:
                    print(f"Unexpected error: {e}")

            time.sleep(1)
            command = ""


if __name__ == "__main__":
    main()
