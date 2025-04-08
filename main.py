import threading
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
                    if cap:
                        cap.release()
                        cv2.destroyAllWindows()
                    messages = messages=[{"role": "system", "content": f'''You are an intelligent Indian AI assistant named "{assistant_name} Bhai". You talk like a smart desi bro — polite but with swag, helpful but witty. Use Hinglish — mix of Hindi and English — to make it sound natural and fun. 

                        Be sharp, respectful, and confident. You help with tasks, answer questions, crack jokes sometimes, and handle everything from tech to chaat recipes. But don’t overdo the jokes — focus on being helpful first.

                        Examples of your tone:
                        - "Bilkul bhai, yeh raha solution!"
                        - "Arre simple hai, sun..."
                        - "Thoda time lagega, but ho jayega."
                        - "Kya baat hai bhai, kya mast sawaal pucha!"

                        Don’t use more than 50 words unless the user really needs more detail. Keep it short, helpful, and always reply like a smart desi AI.

                        You're not too formal, not too casual — bas ek perfect Indian tech bro vibe.
                        '''},]
                elif camera:
                    print(command)
                    handle_multimodal_request(command,cap)

                else:
                    print(command)
                    messages.append({"role": "user", "content": command})
                    res = send_text_only(command,messages)
                    messages.append({"role": "assistant", "content": res})
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
                        
                        messages=[{"role": "system", "content": f'''You are an intelligent Indian AI assistant named "{assistant_name} Bhai". You talk like a smart desi bro — polite but with swag, helpful but witty. Use Hinglish — mix of Hindi and English — to make it sound natural and fun. 

                        Be sharp, respectful, and confident. You help with tasks, answer questions, crack jokes sometimes, and handle everything from tech to chaat recipes. But don’t overdo the jokes — focus on being helpful first.

                        Examples of your tone:
                        - "Bilkul bhai, yeh raha solution!"
                        - "Arre simple hai, sun..."
                        - "Thoda time lagega, but ho jayega."
                        - "Kya baat hai bhai, kya mast sawaal pucha!"

                        Don’t use more than 50 words unless the user really needs more detail. Keep it short, helpful, and always reply like a smart desi AI.

                        You're not too formal, not too casual — bas ek perfect Indian tech bro vibe.
                        '''},]

                        cap = cv2.VideoCapture(1)
                        camera_index =0
                        while not cap.isOpened() and camera_index < 5:
                            print(f"Trying to open camera at index {camera_index}...")
                            cap = cv2.VideoCapture(camera_index)
                            camera_index += 1
                            
                        if not cap.isOpened():
                            print("Error: Could not open webcam.")

                        def show_camera(activate,cap):
                            cv2.namedWindow(f"{assistant_name} Cam", cv2.WINDOW_NORMAL)
                            cv2.resizeWindow(f"{assistant_name} Cam", 640, 480)
                            while activate and cap.isOpened():
                                ret, frame = cap.read()
                                if not ret:
                                    continue
                                cv2.imshow(f"{assistant_name} Cam", frame)
                                if cv2.waitKey(1) & 0xFF == ord('q'):
                                    break     
                            

                        threading.Thread(target=show_camera, args=(activate, cap),daemon=True).start()
                except sr.UnknownValueError:
                    continue
                except sr.RequestError as e:
                    continue
                except Exception as e:
                    print(f"Unexpected error: {e}")

            # time.sleep(1)
            command = ""


if __name__ == "__main__":
    main()
