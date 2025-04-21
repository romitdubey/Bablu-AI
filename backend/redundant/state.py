import cv2
import json

prompts = json.load(open("prompts.json"))

class AssistantState:
    def __init__(self, name="bablu"):
        self.name = name
        self.active = False
        self.cap = None
        self.messages = [{"role": "system", "content": prompts["system_prompt"]}]
    
    def reset_messages(self):
        self.messages = [{"role": "system", "content": prompts["system_prompt"]}]

    def release_camera(self):
        if self.cap:
            self.cap.release()
            cv2.destroyAllWindows()
            self.cap = None

assistant_state = AssistantState()
