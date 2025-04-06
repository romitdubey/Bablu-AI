from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
    # 🤖 Placeholder response logic
    reply = f"Jarvis received: {user_input}"
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)
