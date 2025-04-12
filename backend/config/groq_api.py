from groq import Groq
from .playsound import text_to_speech
import json
from dotenv import load_dotenv

load_dotenv()

client = Groq()  # 🔒 Replace with env var for security!
prompts = json.load(open("prompts.json"))


def needs_camera(prompt: str) -> bool:
    response = client.chat.completions.create(
        messages=[
            {"role": "system","content":prompts["camera_prompt"]},
            {"role": "user", "content": prompt}
        ],
        model="gemma2-9b-it",
        max_tokens=5
    )
    reply = response.choices[0].message.content.strip().lower()
    if "yes" in reply:
        print("Opening camera...")
        text_to_speech("Opening camera...")
    return "yes" in reply

def send_text_only(prompt: str,messages) -> str:
    response = client.chat.completions.create(
        messages=messages,
        model="meta-llama/llama-4-scout-17b-16e-instruct"
    )
    return response.choices[0].message.content.strip()

def analyze_image(base64_image, prompt="What's in this image?"):
    try:
        chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{base64_image}",
                                },
                            },
                        ],
                    }
                ],
                model="llama-3.2-11b-vision-preview",
                
            )
        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"❌ Error calling GROQ: {e}")
        return None
