from flask import Flask, request
from ..Firebase import getStorageBucket
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.post("/check")
def check():
    print("checking twice")
    print(request)
    print(request.form)
    print(request.json)
    return "checking"

@app.post("/startInterview")
def startInterview():

    try:        

        storage_bucket = getStorageBucket()

        resumeId = request.json['resumeId']
        job_desc = request.json['jobDesc']
        userDetails = request.json['userDetails']
        # userId = userDetails['userId']
        print(resumeId, job_desc, userDetails)

        blob = storage_bucket.blob(f'resumes/{resumeId}')

        blob.download_to_filename(f"../downloaded_resumes/{resumeId}.pdf")

        return "Downloaded successfully!"
    
    except Exception as e:
        print(e)
        return "Error in downloading file", 500









