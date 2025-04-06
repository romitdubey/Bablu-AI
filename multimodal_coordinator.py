from input_handler.image_handler import capture_image, encode_image
from groq_api import analyze_image
from playsound import text_to_speech

def handle_multimodal_request(command):
    image_path = capture_image()
    if not image_path:
        return

    base64_image = encode_image(image_path)
    response = analyze_image(base64_image,prompt=command)

    if response:
        print("🤖  says:")
        print(response)
        text_to_speech(response)
    else:
        print("❌ No response from Jarvis.")
