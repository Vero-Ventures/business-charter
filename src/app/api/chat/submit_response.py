import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
from dotenv import load_dotenv

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
    result = add_entry_to_supabase(entries, user_id)
    app.logger.info(f"Insertion result: {result}")
    return jsonify(result)

def add_entry_to_supabase(entries, user_id):
    entry_map = {
        "What questions help guide your family's decision-making?": {
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

# Export the Flask app as the entry point
if __name__ == "__main__":
    from werkzeug.serving import run_simple
    run_simple('localhost', 8000, app)
else:
    # Vercel will call the app directly
    app = app
