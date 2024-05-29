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
from model import process_message, generate_summary

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
    # app.logger.debug("Received request for /api/chat/send_message")

    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        # app.logger.error("No message provided in the request")
        return jsonify({"error": "No message provided"}), 400
    
    response_message = process_message(user_message)
    
    # app.logger.debug("Processed message: %s", response_message)

    return jsonify({"answer": response_message})

@app.route('/api/chat/submit_responses', methods=['POST'])
def submit_responses():
    data = request.json
    user_id = data.get('userId')
    responses = data.get('responses', {})
    
    if not user_id:
        return jsonify({"error": "User ID is missing"}), 400
    
    entries = {
        'question': responses.get("What questions help guide your family's decision-making?"),
        'family_value': responses.get("What are your family values?"),
        'family_statement': responses.get("What is a statement or commitment that your family lives by?"),
        'family_vision': responses.get("What statement defines your family's vision?"),
        'impact_statement': responses.get("What is your family's impact statement?")
    }

    print("Entries to insert:", entries)  # Debug print

    # Process responses after saving
    result = add_entry_to_supabase(responses, user_id)
    # app.logger.info(f"Insertion result: {result}")
    return jsonify(result)

def add_entry_to_supabase(entries, user_id):
    entry_map = {
        "Enter up to three questions that guide your family's decision making.": {
            'table': 'decision_tree',
            'data': lambda entry: {'question': entry, 'user_id': user_id}
        },
        "What are your family values?": {
            'table': 'family_values',
            'data': lambda entry: {'description': entry, 'user_id': user_id, 'title': 'Created by VidereAI'}
        },
        "What is a statement or commitment that your family lives by?": {
            'table': 'family_code',
            'data': lambda entry: {'statement': entry, 'user_id': user_id}
        },
        "What statement defines your family's vision?": {
            'table': 'family_vision',
            'data': lambda entry: {'statement': entry, 'user_id': user_id}
        },
        "What is your family's impact statement?": {
            'table': 'philanthropy_impact_statements',
            'data': lambda entry: {'statement': entry, 'user_id': user_id}
        }
    }

    for key, entry_info in entry_map.items():
        if key in entries:
            try:
                app.logger.debug(f"Attempting to insert into {entry_info['table']}: {entries[key]}")
                response = supabase.table(entry_info['table']).insert(entry_info['data'](entries[key])).execute()

                if 'error' in response.data:
                    raise ValueError(f"Error inserting into {entry_info['table']}: {response.data['error']['message']}")
                else:
                    app.logger.debug(f"Successfully inserted into {entry_info['table']}: {response.data}")

            except Exception as e:
                app.logger.error(f"Exception while inserting into {entry_info['table']}: {e}")
                return {'message': f"Error inserting into {entry_info['table']}: {e}"}

    return {'message': 'All entries added successfully'}

@app.route('/api/admin/charter', methods=['POST'])
def fetch_admin_family_charter():
    data = request.json
    print("Received data:", data) 
    admin_user_id = data.get('user_id')

    if not admin_user_id:
        return jsonify({"error": "Admin User ID is missing"}), 400
    
    # Fetch admin user info to get family_id
    admin_info = fetch_user_info(admin_user_id)
    if not admin_info:
        return jsonify({"error": "Admin user information could not be retrieved"}), 404

    if admin_info['role'] != 'admin':
        return jsonify({"error": "Unauthorized access"}), 403

    family_id = admin_info['family_id']
    try:
        aggregated_data = fetch_aggregated_family_data(family_id)
        summary = generate_summary(aggregated_data)
        return jsonify({"summary": summary})
    except Exception as e:
        app.logger.error(f"Error aggregating data for family ID {family_id}: {e}")
        return jsonify({"error": "Failed to process data"}), 500

def fetch_user_info(user_id):
    try:
        result = supabase.table('profiles').select('role', 'family_id').eq('user_id', user_id).single().execute()
        if result.data:
            app.logger.debug(f"User info fetched successfully for user_id={user_id}")
            return result.data
        else:
            app.logger.info(f"No data found for user_id={user_id}")
            return None
    except Exception as e:
        app.logger.error(f"Failed to fetch user info for user_id={user_id}: {e}")
        return None


def fetch_aggregated_family_data(family_id):
    try:
        query = """
        SELECT 
            'Questions' as section, ARRAY_AGG(question) as content FROM decision_tree WHERE family_id = %s
        UNION ALL
        SELECT 
            'Values' as section, ARRAY_AGG(description) as content FROM family_values WHERE family_id = %s
        UNION ALL
        SELECT 
            'Statements' as section, ARRAY_AGG(statement) as content FROM family_code WHERE family_id = %s
        UNION ALL
        SELECT 
            'Visions' as section, ARRAY_AGG(statement) as content FROM family_vision WHERE family_id = %s
        UNION ALL
        SELECT 
            'Impact Statements' as section, ARRAY_AGG(statement) as content FROM philanthropy_impact_statements WHERE family_id = %s
        """
        data = supabase.rpc('run_sql', {'query': query, 'bindings': [family_id, family_id, family_id, family_id, family_id]})
        if data.error:
            raise Exception(data.error.message)
        
        # Organize data into a structured format
        results = {item['section']: item['content'] for item in data.data}
        return results

    except Exception as e:
        app.logger.error(f"Failed to fetch aggregated family data: {e}")
        return {}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)

