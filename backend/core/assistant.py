from core.voice import listen_for_activation, listen_for_command
from core.command_handler import process_command
from core.state import assistant_state
from core.camera import initialize_camera, show_camera
import threading

def start_assistant():
    print(f"🎙️ {assistant_state.name} is listening... Say 'Hello {assistant_state.name}' to activate.")
    
    while True:
        if not assistant_state.active:
            activated = listen_for_activation()
            if activated:
                assistant_state.active = True
                assistant_state.reset_messages()
                assistant_state.cap = initialize_camera()
                if assistant_state.cap and assistant_state.cap.isOpened():
                    threading.Thread(
                        target=show_camera, args=(assistant_state.active,assistant_state.cap), daemon=True
                    ).start()
                else:
                    print("⚠️ Could not open webcam.")
        else:
            command = listen_for_command()
            if command:
                process_command(command)
