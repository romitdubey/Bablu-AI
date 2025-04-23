from flask import Flask, request
from backend.Firebase import getStorageBucket
from flask_cors import CORS
from backend.core.resume_parsing import extract_text_from_pdf
from backend.config.groq_api import parse_resume_with_groq, parse_job_description, ready_for_interview, interview_with_groq
from backend.core.helper import update_chat_history


app = Flask(__name__)
CORS(app) 

@app.post("/startInterview")
def startInterview():

    try:        

        storage_bucket = getStorageBucket()

        resumeId = request.json['resumeId']
        job_desc = request.json['jobDesc']
        userDetails = request.json['userDetails']
        # userId = userDetails["user"]["uid"]
        # print(userId)

        blob = storage_bucket.blob(f'resumes/{resumeId}')

        blob.download_to_filename(f"backend/downloaded_resumes/{resumeId}.pdf")
        print("Downloaded file successfully")
        
    
        resumetext = extract_text_from_pdf(f"backend/downloaded_resumes/{resumeId}.pdf")
        resume_json = parse_resume_with_groq(resumetext)
        print(resume_json)
        print("Parsed resume successfully")

        parsed_job_desc = parse_job_description(job_desc)
        print(parsed_job_desc)
        print("Parsed job description successfully")
        chat_history = ready_for_interview(resume_json, parsed_job_desc)
        update_chat_history(True,chat_history)
        print("Ready for interview")
        print(chat_history)
        while True:
            user = input("User: ")
            chat_history = update_chat_history(True,user)
            ai = interview_with_groq(chat_history)
            print(ai)
            update_chat_history(False,ai)
            if user =="12":
                break

        return "Parsed OK!"
    
    except Exception as e:
        print(e)
        return "Error in downloading file", 500

if __name__ == "__main__":
    app.run(debug=True)





