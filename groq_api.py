from groq import Groq
from playsound import text_to_speech

client = Groq(api_key="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")  # 🔒 Replace with env var for security!

def needs_camera(prompt: str) -> bool:
    check_msg = f"Does this question require seeing something visually (e.g. camera or image)? Answer Yes or No only: {prompt}"
    
    response = client.chat.completions.create(
        messages=[
            
            {"role": "user", "content": check_msg}
        ],
        model="gemma2-9b-it",
        max_tokens=5
    )

    reply = response.choices[0].message.content.strip().lower()
    if "yes" in reply:
        print("Opening camera...")
        # text_to_speech("Opening camera...")
    return "yes" in reply

def send_text_only(prompt: str) -> str:
    response = client.chat.completions.create(
        messages=[{
            "role": "system",
            "content": "You're Bablu. An indian character. Reply in funny hinglish everytime. Don't use more than 50 words always."
        },{"role": "user", "content": prompt}],
        model="meta-llama/llama-4-scout-17b-16e-instruct",
        max_tokens=50
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
                max_tokens=50
            )
        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"❌ Error calling GROQ: {e}")
        return None
