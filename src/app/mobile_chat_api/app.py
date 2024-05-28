from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
from pathlib import Path

# Add the parent directory to the system path to import model
sys.path.append(str(Path(__file__).resolve().parents[1] / 'model'))
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
    app.run(host='0.0.0.0', port=5000)


###############################################################################


# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import sys
# from pathlib import Path

# # Add the parent directory to the system path to import model
# sys.path.append(str(Path(__file__).resolve().parents[1] / 'model'))
# from model import process_message  # Import process_message from model.py

# app = Flask(__name__)
# CORS(app)  # This will enable CORS for all routes

# @app.route('/api/chat', methods=['POST'])
# def chat():
#     data = request.json
#     user_message = data.get('message', '')
#     print("user_message received: " + user_message)

#     if not user_message:
#         return jsonify({"error": "No message provided"}), 400

#     try:
#         response_message = process_message(user_message)
#         return jsonify({"answer": response_message})
#     except Exception as e:
#         print(f"Error processing message: {e}")
#         return jsonify({"error": "Internal server error"}), 500

# if __name__ == '__main__':
#     print("app.py started listening on 5000")
#     app.run(host='0.0.0.0', port=5000, debug=True)

##########################################################################################

# from http.server import BaseHTTPRequestHandler
# import json
# import sys
# from pathlib import Path

# # Add the parent directory to the system path to import model
# sys.path.append(str(Path(__file__).resolve().parents[1] / 'model'))
# from model import process_message  # Import process_message from model.py

# class handler(BaseHTTPRequestHandler):
#     def do_POST(self):
#         content_length = int(self.headers['Content-Length'])
#         post_data = self.rfile.read(content_length)
#         data = json.loads(post_data.decode('utf-8'))
#         user_message = data.get('message', '')

#         if not user_message:
#             self.send_response(400)
#             self.send_header('Content-type', 'application/json')
#             self.end_headers()
#             self.wfile.write(json.dumps({"error": "No message provided"}).encode())
#             return

#         try:
#             response_message = process_message(user_message)
#             self.send_response(200)
#             self.send_header('Content-type', 'application/json')
#             self.end_headers()
#             self.wfile.write(json.dumps({"answer": response_message}).encode())
#         except Exception as e:
#             self.send_response(500)
#             self.send_header('Content-type', 'application/json')
#             self.end_headers()
#             self.wfile.write(json.dumps({"error": "Internal server error"}).encode())
#             print(f"Error processing message: {e}")
