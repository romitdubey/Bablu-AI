from flask import Flask, request, jsonify
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))
from backend.Firebase import getStorageBucket
from flask_cors import CORS
from backend.core.resume_parsing import extract_text_from_pdf
from backend.config.groq_api import parse_resume_with_groq, parse_job_description, ready_for_interview, interview_with_groq
from backend.core.helper import update_chat_history

import json

app = Flask(__name__)
CORS(app)

@app.post("/startInterview")
def startInterview():
    try:
        storage_bucket = getStorageBucket()

        resumeId = request.json['resumeId']
        job_desc = request.json['jobDesc']
        userId = request.json['userId']
        userEmail = request.json['userEmail']

        print(request.json)
        
        blob = storage_bucket.blob(f'resumes/{resumeId}')
        print("Blob created successfully")
        blob.download_to_filename(f"../downloaded_resumes/{resumeId}.pdf")
        print("Downloaded file successfully")

        resumetext = extract_text_from_pdf(f"../downloaded_resumes/{resumeId}.pdf")
        resume_json = parse_resume_with_groq(resumetext)
        print("Parsed resume successfully")

        parsed_job_desc = parse_job_description(job_desc)
        print("Parsed job description successfully")

        chat_history = ready_for_interview(resume_json, parsed_job_desc)
        update_chat_history(True, chat_history)  # save initial history
        print("Ready for interview")
        print(chat_history)

        return jsonify({
            "message": "Interview started successfully!", 
            "chat": chat_history
            })

    except Exception as e:
        print(e)
        return "Error in downloading file", 500


@app.post("/chat")
def chat():
    try:
        user_input = request.json.get("text")
        if not user_input:
            return jsonify({"error": "Text is required"}), 400

        chat_history = update_chat_history(True, user_input)  # user message
        ai_response = interview_with_groq(chat_history)
        update_chat_history(False, ai_response)
        #chat_history = json.load(open("../user_history/chat_messages.json"))
       # latest_chat_history = chat_history[-1:]  # AI reply
        return jsonify({
            "reply": ai_response,
           # "chat_history": latest_chat_history
        })
    except Exception as e:
        print(e)
        return jsonify({"error": "Something went wrong"}), 500
@app.get("/chatHistory")
def get_chat_history():
    try:
        chat_messages = json.load(open("../user_history/chat_messages.json"))
        return jsonify({
            "chat_history": chat_messages
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
