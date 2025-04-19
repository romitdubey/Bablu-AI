

from firebase_admin import credentials, storage, initialize_app

cred = credentials.Certificate('../FirebaseKey.json')

firebase_app = initialize_app(cred)

storage_bucket = storage.bucket('hackathons-5f2de.firebasestorage.app')

blob = storage_bucket.blob('resumes/userId')

blob.download_to_filename("resume.pdf")

print("Downloaded successfully!")