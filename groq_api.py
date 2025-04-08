from groq import Groq
from playsound import text_to_speech

client = Groq(api_key="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")  # 🔒 Replace with env var for security!

def needs_camera(prompt: str) -> bool:
    response = client.chat.completions.create(
        messages=[
            {"role": "system","content":'''You are a smart judge. Your only job is to decide whether the user's message needs image or camera input to answer.

            If the user is asking about something they are holding, showing, or referring to visually — like "what’s in my hand", "how many fingers", "count candies", "what is this", or "solve this" without giving full details — then reply "Yes".

            If the message can be answered without seeing anything — like general knowledge, text-based questions, or math with numbers provided — reply "No".

            Reply only with "Yes" or "No". No explanation. No extra words. You can answer in English or Hinglish, but only say "Yes" or "No".
            '''},
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
                    #     {
                    #     "role": "system",
                    #     "content": "You're Bablu. An indian character. Reply in funny hinglish everytime. Don't use more than 50 words always."
                    # },
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
