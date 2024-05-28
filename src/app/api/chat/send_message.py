import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from pathlib import Path
import logging
from supabase import create_client, Client
from dotenv import load_dotenv
from model import process_message  # Ensure this import is correct for your structure

logging.basicConfig(level=logging.DEBUG)

# Initialize Flask app with CORS
app = Flask(__name__)
CORS(app, resources={r"/api/*": {
    "origins": "http://localhost:3000",  
    "methods": ["GET", "POST"],
    "allow_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True
}})

# Load environment variables from .env.local file
env_path = '.env.local'
load_dotenv(env_path)

# Setup Supabase client
supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
supabase_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
if not supabase_url or not supabase_key:
    raise EnvironmentError(f"Failed to load environment variables from {env_path}. Please check your .env.local file.")
supabase: Client = create_client(supabase_url, supabase_key)

@app.route('/api/chat/send_message', methods=['POST'])
def chat():
    app.logger.debug("Received request for /api/chat/send_message")

    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        app.logger.error("No message provided in the request")
        return jsonify({"error": "No message provided"}), 400
    
    response_message = process_message(user_message)
    
    app.logger.debug("Processed message: %s", response_message)

    return jsonify({"answer": response_message})

# Export the Flask app as the entry point
if __name__ == "__main__":
    from werkzeug.serving import run_simple
    run_simple('localhost', 8000, app)
else:
    # Vercel will call the app directly
    app = app
