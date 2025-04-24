import json

def update_chat_history(User:bool,response):
    if User:
        chat_messages = json.load(open("../user_history/chat_messages.json"))
        chat_messages.append({"role": "user", "content": response})
        json.dump(chat_messages, open("../user_history/chat_messages.json", "w"))
        return chat_messages
    else:
        chat_messages = json.load(open("../user_history/chat_messages.json"))
        chat_messages.append({"role": "assistant", "content": response})
        json.dump(chat_messages, open("../user_history/chat_messages.json", "w"))
        return True

    