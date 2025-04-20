from flask import Flask, request
from ..Firebase import getStorageBucket

app = Flask(__name__)

@app.post("/startInterview")
def startInterview():

    try:

        storage_bucket = getStorageBucket()
        resumeId = request.form['resumeId']
        job_desc = request.form['jobDesc']

        blob = storage_bucket.blob(f'resumes/{resumeId}')

        blob.download_to_filename(f"../downloaded_resumes/{resumeId}.pdf")
        
        return "Downloaded successfully!"
    
    except Exception as e:
        print(e)
        return "Error in downloading file", 500









