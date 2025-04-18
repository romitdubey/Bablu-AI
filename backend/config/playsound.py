from elevenlabs.client import ElevenLabs
from elevenlabs import play

def text_to_speech(response):
    # return
    client = ElevenLabs(
    api_key="sk_9abb3692ef2885f88fef5f57737705752db4823b20ad309a",
    )

    audio = client.text_to_speech.convert(
        text=response,
        voice_id="JBFqnCBsd6RMkjVDRZzb",
        model_id="eleven_multilingual_v2",
        output_format="mp3_44100_128",
    )

    play(audio)
