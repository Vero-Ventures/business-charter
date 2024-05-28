import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from pathlib import Path
import logging
from supabase import create_client, Client
from dotenv import load_dotenv

logging.basicConfig(level=logging.DEBUG)

# Add the parent directory to the system path to import model
sys.path.append(str(Path(__file__).resolve().parents[2] / 'model'))
from model import process_message  # Import process_message from model.py

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

@app.route('/api/chat/submit_responses', methods=['POST'])
def submit_responses():
    data = request.json
    user_id = data.get('userId')
    responses = data.get('responses', {})
    
    if not user_id:
        return jsonify({"error": "User ID is missing"}), 400
    
    # Process responses after saving
    result = add_entry_to_supabase(responses, user_id)
    app.logger.info(f"Insertion result: {result}")
    return jsonify(result)

def revalidate_path(path: str):
    pass

def add_entry_to_supabase(entries, user_id):
    # try:
    #     with open(user_id_file_path, 'r') as file:
    #         user_id = file.read().strip()
    #         if not user_id:
    #             raise ValueError("User ID is empty.")
    #         print(f"User ID: {user_id}")
    # except Exception as e:
    #     return {'message': f"Error reading user ID file: {e}"}

    # # Insert the question with the user_id into decision_tree
    try:
        app.logger.debug(f"Attempting to insert: {entries}")
        response_question = supabase.table('decision_tree').insert({'question': entries['question'], 'user_id': user_id}).execute()
        
        if 'error' in response_question.data:
            raise ValueError(f"Error inserting question: {response_question.data['error']['message']}")
        else:
            app.logger.debug(f"Successfully inserted question: {response_question.data}")
    except Exception as e:
        return {'message': f"Error inserting question: {e}"}

    # Insert the family value with the user_id into family_values
    try:
        response_value = supabase.table('family_values').insert({
            'title': 'Created by VidereAI',
            'description': entries['family_value'],
            'user_id': user_id
        }).execute()
        print(response_value)
        if 'error' in response_value.data:
            raise ValueError(f"Error inserting family value: {response_value.data['error']['message']}")
    except Exception as e:
        return {'message': f"Error inserting family value: {e}"}

    # Insert the family code statement with the user_id into family_code
    try:
        response_statement = supabase.table('family_code').insert({
            'statement': entries['family_statement'],
            'user_id': user_id
        }).execute()
        print(response_statement)
        if 'error' in response_statement.data:
            raise ValueError(f"Error inserting family statement: {response_statement.data['error']['message']}")
    except Exception as e:
        return {'message': f"Error inserting family statement: {e}"}

    # Insert the family vision statement with the user_id into family_vision
    try:
        response_vision = supabase.table('family_vision').insert({
            'statement': entries['family_vision'],
            'user_id': user_id
        }).execute()
        print(response_vision)
        if 'error' in response_vision.data:
            raise ValueError(f"Error inserting family vision: {response_vision.data['error']['message']}")
    except Exception as e:
        return {'message': f"Error inserting family vision: {e}"}

    # Insert the impact statement with the user_id into philanthropy_impact_statements
    try:
        response_impact = supabase.table('philanthropy_impact_statements').insert({
            'statement': entries['impact_statement'],
            'user_id': user_id
        }).execute()
        print(response_impact)
        if 'error' in response_impact.data:
            raise ValueError(f"Error inserting impact statement: {response_impact.data['error']['message']}")
    except Exception as e:
        return {'message': f"Error inserting impact statement: {e}"}

    revalidate_path('/decision-tree')
    revalidate_path('/family-values')
    revalidate_path('/family-code')
    revalidate_path('/family-vision')
    revalidate_path('/philanthropy')
    return {'message': 'Question, family value, family statement, family vision, and impact statement added successfully'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
    json_file_path = 'src/app/api/chat/responses.json'
    keys = {
        'question': "Enter up to three questions that guide your family's decision making.",
        'family_value': "What are your family values?",
        'family_statement': "What is a statement or commitment that your family lives by?",
        'family_vision': "What statement defines your family's vision?",
        'impact_statement': "What is your family's impact statement?"
    }
    try:
        result = add_entry_to_supabase(json_file_path, keys)
        print(result)
    except Exception as e:
        print(f"An error occurred: {e}")
