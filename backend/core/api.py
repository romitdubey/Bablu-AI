from flask import Flask, send_file, jsonify
from flask_restful import Resource, Api
import os
from firebase_admin import credentials, initialize_app, storage

# Initialize Flask app
app = Flask(__name__)
api = Api(app)

# Initialize Firebase
# Get the absolute path to the FirebaseKey.json file
current_dir = os.path.dirname(os.path.abspath(__file__))
firebase_key_path = os.path.join(os.path.dirname(current_dir), 'FirebaseKey.json')
cred = credentials.Certificate(firebase_key_path)
firebase_app = initialize_app(cred, {
    # 'storageBucket': 'hackathons-5f2de.appspot.com'  # Corrected bucket name format
    'storageBucket': 'hackathons-5f2de.firebasestorage.app'  # Corrected bucket name format
})

class PdfFetcher(Resource):
    def get(self, pdf_id):
        try:
            # Get a reference to the Firebase Storage bucket
            print(firebase_app)
            print(pdf_id)
            bucket = storage.bucket()
            
            # Create a blob reference to the PDF file
            path = f'resumes/{pdf_id}'
            blob = bucket.blob(f'resumes/{pdf_id}')
            print(bucket)
            print(blob)
            
            if not blob.exists():
                print("Not found")
                return {"error": "PDF not found"}, 404
            
            # Create a temporary file to store the PDF
            temp_file = f'temp_{pdf_id}.pdf'
            blob.download_to_filename(temp_file)
            
            # Send the file to the client
            response = send_file(
                temp_file,
                mimetype='application/pdf',
                as_attachment=True,
                download_name=f'{pdf_id}.pdf'
            )
            
            # Clean up the temporary file
            os.remove(temp_file)
            
            return response
            
        except Exception as e:
            return {"error": str(e)}, 500

api.add_resource(PdfFetcher, "/pdf/<string:pdf_id>")

if __name__ == '__main__':
    app.run(debug=True)



