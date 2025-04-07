from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_message', methods=['POST'])
def process_message():
    user_message = request.form['message']
    # In a real application, you would send this to your chatbot model
    response = f"Echo: {user_message}"
    return jsonify({'response': response})

@app.route('/upload_image', methods=['POST'])
def upload_image():
    if 'image' in request.files:
        image_file = request.files['image']
        # In a real application, you would save and process this image
        print("Image received:", image_file.filename)
        return jsonify({'status': 'success', 'message': 'Image uploaded successfully'})
    return jsonify({'status': 'error', 'message': 'No image file found'})

if __name__ == '__main__':
    app.run(debug=True)