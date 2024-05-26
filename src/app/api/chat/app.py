import sys
print("Using Python interpreter at:", sys.executable)
from flask import Flask, request, jsonify
from flask_cors import CORS
from pathlib import Path

# Add the parent directory to the system path to import model
sys.path.append(str(Path(__file__).resolve().parents[2] / 'model'))
from model import process_message  # Import process_message from model.py

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    
    response_message = process_message(user_message)
    
    return jsonify({"answer": response_message})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)