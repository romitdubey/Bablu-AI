from firebase_admin import credentials, initialize_app, storage

cred = credentials.Certificate('backend\FirebaseKey.json')
firebase_app = initialize_app(cred)
storage_bucket = storage.bucket('hackathons-5f2de.firebasestorage.app')

def getStorageBucket():
    return storage_bucket
