import cv2
import base64
import time
from config.groq_api import analyze_image
from config.playsound import text_to_speech

def handle_multimodal_request(command,cap):
    print("Opening camera...")
    image_path = capture_image(cap)
    if not image_path:
        return

    base64_image = encode_image(image_path)
    response = analyze_image(base64_image, prompt=f"Answer this question: {command}, with respect to the given image")

    if response:
        print("🤖  says:")
        print(response)
        text_to_speech(response)
    else:
        print("❌ No response from Jarvis.")

def capture_image(cap,filename='capture.jpg', camera_index=1):
    ret, frame = cap.read()

    if not ret:
        print("Error: Failed to capture image.")
        return None

    cv2.imwrite(filename, frame)
    return filename

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')