from backend.redundant.state import assistant_state
from config.groq_api import needs_camera, send_text_only
from .image_handler import handle_multimodal_request
from config.playsound import text_to_speech

def process_command(command: str):
    print(f"🗣️ Command: {command}")

    if f"stop {assistant_state.name}" in command:
        print("🛑 Stopping assistant...")
        assistant_state.active = False
        assistant_state.release_camera()
        assistant_state.reset_messages()
        return

    if needs_camera(command):
        handle_multimodal_request(command, assistant_state.cap)
    else:
        assistant_state.messages.append({"role": "user", "content": command})
        res = send_text_only(command, assistant_state.messages)
        assistant_state.messages.append({"role": "assistant", "content": res})
        print(res)
        text_to_speech(res)
