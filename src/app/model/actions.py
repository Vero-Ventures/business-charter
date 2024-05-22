# import os
# from supabase import create_client, Client
# from dotenv import load_dotenv

# # Load environment variables from .env.local file
# env_path = '.env.local'
# load_dotenv(env_path)

# # Get the environment variables
# supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
# supabase_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

# # Check if the environment variables are loaded correctly
# if not supabase_url or not supabase_key:
#     raise EnvironmentError(f"Failed to load environment variables from {env_path}. Please check your .env.local file.")

# # Initialize Supabase client
# supabase: Client = create_client(supabase_url, supabase_key)

# def revalidate_path(path: str):
#     pass

# def add_question(question: str):
#     # Sign in the user
#     try:
#         data = supabase.auth.sign_in_with_password({"email": "e.amir2010@gmail.com", "password": "Iambadass2314."})
#         session = data.session
#         if not session:
#             raise ValueError("Failed to sign in user.")
        
#         user = session.user
#         if not user:
#             raise ValueError("Authenticated user is not available.")
        
#         user_id = user.id
#         print(user_id)
#     except Exception as e:
#         return {'message': f"Error retrieving authenticated user: {e}"}

#     # Insert the question with the user_id
#     try:
#         response = supabase.table('decision_tree').insert({'question': question, 'user_id': user_id}).execute()
#         print(response)
#         if 'error' in response.data:
#             raise ValueError(f"Error inserting question: {response.data['error']['message']}")
#     except Exception as e:
#         return {'message': f"Error inserting question: {e}"}
    
#     revalidate_path('/decision-tree')
#     return {'message': 'Question added successfully'}

# if __name__ == "__main__":
#     try:
#         result = add_question("What is your favorite color?")
#         print(result)
#     except Exception as e:
#         print(f"An error occurred: {e}")

# import os
# import json
# from supabase import create_client, Client
# from dotenv import load_dotenv

# # Load environment variables from .env.local file
# env_path = '.env.local'
# load_dotenv(env_path)

# # Get the environment variables
# supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
# supabase_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

# # Check if the environment variables are loaded correctly
# if not supabase_url or not supabase_key:
#     raise EnvironmentError(f"Failed to load environment variables from {env_path}. Please check your .env.local file.")

# # Initialize Supabase client
# supabase: Client = create_client(supabase_url, supabase_key)

# def revalidate_path(path: str):
#     pass

# def add_question_from_json(file_path: str, question_key: str):
#     # Read the JSON file and extract the value for the given key
#     try:
#         with open(file_path, 'r') as file:
#             data = json.load(file)
#             question = data.get(question_key, None)
#             if question is None:
#                 raise ValueError(f"Key '{question_key}' not found in the JSON file.")
#             # Remove the quotation marks from the question string
#             question = question.replace('\"', '')
#     except Exception as e:
#         return {'message': f"Error reading JSON file: {e}"}
    
#     # Sign in the user
#     try:
#         auth_response = supabase.auth.sign_in_with_password({"email": "e.amir2010@gmail.com", "password": "Iambadass2314."})
#         session = auth_response.session
#         if not session:
#             raise ValueError("Failed to sign in user.")
        
#         user = session.user
#         if not user:
#             raise ValueError("Authenticated user is not available.")
        
#         user_id = user.id
#         print(user_id)
#     except Exception as e:
#         return {'message': f"Error retrieving authenticated user: {e}"}

#     # Insert the question with the user_id
#     try:
#         response = supabase.table('decision_tree').insert({'question': question, 'user_id': user_id}).execute()
#         print(response)
#         if 'error' in response.data:
#             raise ValueError(f"Error inserting question: {response.data['error']['message']}")
#     except Exception as e:
#         return {'message': f"Error inserting question: {e}"}
    
#     revalidate_path('/decision-tree')
#     return {'message': 'Question added successfully'}

# if __name__ == "__main__":
#     json_file_path = r"C:\Users\test\Documents\Programming Directories\BCIT\COMP 4800\business-charter\family_charter_responses.json"
#     question_key = "What questions help guide your family's decision-making?"
#     try:
#         result = add_question_from_json(json_file_path, question_key)
#         print(result)
#     except Exception as e:
#         print(f"An error occurred: {e}")

# import os
# import json
# from supabase import create_client, Client
# from dotenv import load_dotenv

# # Load environment variables from .env.local file
# env_path = '.env.local'
# load_dotenv(env_path)

# # Get the environment variables
# supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
# supabase_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

# # Check if the environment variables are loaded correctly
# if not supabase_url or not supabase_key:
#     raise EnvironmentError(f"Failed to load environment variables from {env_path}. Please check your .env.local file.")

# # Initialize Supabase client
# supabase: Client = create_client(supabase_url, supabase_key)

# def revalidate_path(path: str):
#     pass

# def add_entry_from_json(file_path: str, question_key: str, family_value_key: str):
#     # Read the JSON file and extract the values for the given keys
#     try:
#         with open(file_path, 'r') as file:
#             data = json.load(file)
#             question = data.get(question_key, None)
#             family_value = data.get(family_value_key, None)
#             if question is None or family_value is None:
#                 raise ValueError(f"Key '{question_key}' or '{family_value_key}' not found in the JSON file.")
#             # Remove the quotation marks from the strings
#             question = question.replace('\"', '')
#             family_value = family_value.replace('\"', '')
#     except Exception as e:
#         return {'message': f"Error reading JSON file: {e}"}
    
#     # Sign in the user
#     try:
#         # TODO: Replace the email and password with the actual user credentials
#         auth_response = supabase.auth.sign_in_with_password({"email": "e.amir2010@gmail.com", "password": "Iambadass2314."})
#         session = auth_response.session
#         if not session:
#             raise ValueError("Failed to sign in user.")
        
#         user = session.user
#         if not user:
#             raise ValueError("Authenticated user is not available.")
        
#         user_id = user.id
#         print(user_id)
#     except Exception as e:
#         return {'message': f"Error retrieving authenticated user: {e}"}

#     # Insert the question with the user_id into decision_tree
#     try:
#         response_question = supabase.table('decision_tree').insert({'question': question, 'user_id': user_id}).execute()
#         print(response_question)
#         if 'error' in response_question.data:
#             raise ValueError(f"Error inserting question: {response_question.data['error']['message']}")
#     except Exception as e:
#         return {'message': f"Error inserting question: {e}"}

#     # Insert the family value with the user_id into family_values
#     try:
#         response_value = supabase.table('family_values').insert({
#             'title': 'Created by VidereAI',
#             'description': family_value,
#             'user_id': user_id
#         }).execute()
#         print(response_value)
#         if 'error' in response_value.data:
#             raise ValueError(f"Error inserting family value: {response_value.data['error']['message']}")
#     except Exception as e:
#         return {'message': f"Error inserting family value: {e}"}

#     revalidate_path('/decision-tree')
#     revalidate_path('/family-values')
#     return {'message': 'Question and family value added successfully'}

# if __name__ == "__main__":
#     json_file_path = r"C:\Users\test\Documents\Programming Directories\BCIT\COMP 4800\business-charter\family_charter_responses.json"
#     question_key = "What questions help guide your family's decision-making?"
#     family_value_key = "What are your family values?"
#     try:
#         result = add_entry_from_json(json_file_path, question_key, family_value_key)
#         print(result)
#     except Exception as e:
#         print(f"An error occurred: {e}")

# import os
# import json
# from supabase import create_client, Client
# from dotenv import load_dotenv

# # Load environment variables from .env.local file
# env_path = '.env.local'
# load_dotenv(env_path)

# # Get the environment variables
# supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
# supabase_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

# # Check if the environment variables are loaded correctly
# if not supabase_url or not supabase_key:
#     raise EnvironmentError(f"Failed to load environment variables from {env_path}. Please check your .env.local file.")

# # Initialize Supabase client
# supabase: Client = create_client(supabase_url, supabase_key)

# def revalidate_path(path: str):
#     pass

# def add_entry_from_json(file_path: str, question_key: str, family_value_key: str, family_statement_key: str):
#     # Read the JSON file and extract the values for the given keys
#     try:
#         with open(file_path, 'r') as file:
#             data = json.load(file)
#             question = data.get(question_key, None)
#             family_value = data.get(family_value_key, None)
#             family_statement = data.get(family_statement_key, None)
#             if question is None or family_value is None or family_statement is None:
#                 raise ValueError(f"Key '{question_key}', '{family_value_key}' or '{family_statement_key}' not found in the JSON file.")
#             # Remove the quotation marks from the strings
#             question = question.replace('\"', '')
#             family_value = family_value.replace('\"', '')
#             family_statement = family_statement.replace('\"', '')
#     except Exception as e:
#         return {'message': f"Error reading JSON file: {e}"}
    
#     # Sign in the user
#     try:
#         auth_response = supabase.auth.sign_in_with_password({"email": "e.amir2010@gmail.com", "password": "Iambadass2314."})
#         session = auth_response.session
#         if not session:
#             raise ValueError("Failed to sign in user.")
        
#         user = session.user
#         if not user:
#             raise ValueError("Authenticated user is not available.")
        
#         user_id = user.id
#         print(user_id)
#     except Exception as e:
#         return {'message': f"Error retrieving authenticated user: {e}"}

#     # Insert the question with the user_id into decision_tree
#     try:
#         response_question = supabase.table('decision_tree').insert({'question': question, 'user_id': user_id}).execute()
#         print(response_question)
#         if 'error' in response_question.data:
#             raise ValueError(f"Error inserting question: {response_question.data['error']['message']}")
#     except Exception as e:
#         return {'message': f"Error inserting question: {e}"}

#     # Insert the family value with the user_id into family_values
#     try:
#         response_value = supabase.table('family_values').insert({
#             'title': 'Created by VidereAI',
#             'description': family_value,
#             'user_id': user_id
#         }).execute()
#         print(response_value)
#         if 'error' in response_value.data:
#             raise ValueError(f"Error inserting family value: {response_value.data['error']['message']}")
#     except Exception as e:
#         return {'message': f"Error inserting family value: {e}"}

#     # Insert the family code statement with the user_id into family_code
#     try:
#         response_statement = supabase.table('family_code').insert({
#             'statement': family_statement,
#             'user_id': user_id
#         }).execute()
#         print(response_statement)
#         if 'error' in response_statement.data:
#             raise ValueError(f"Error inserting family statement: {response_statement.data['error']['message']}")
#     except Exception as e:
#         return {'message': f"Error inserting family statement: {e}"}

#     revalidate_path('/decision-tree')
#     revalidate_path('/family-values')
#     revalidate_path('/family-code')
#     return {'message': 'Question, family value, and family statement added successfully'}

# if __name__ == "__main__":
#     json_file_path = r"C:\Users\test\Documents\Programming Directories\BCIT\COMP 4800\business-charter\family_charter_responses.json"
#     question_key = "What questions help guide your family's decision-making?"
#     family_value_key = "What are your family values?"
#     family_statement_key = "What is a statement or commitment that your family lives by?"
#     try:
#         result = add_entry_from_json(json_file_path, question_key, family_value_key, family_statement_key)
#         print(result)
#     except Exception as e:
#         print(f"An error occurred: {e}")

# import os
# import json
# from supabase import create_client, Client
# from dotenv import load_dotenv

# # Load environment variables from .env.local file
# env_path = '.env.local'
# load_dotenv(env_path)

# # Get the environment variables
# supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
# supabase_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

# # Check if the environment variables are loaded correctly
# if not supabase_url or not supabase_key:
#     raise EnvironmentError(f"Failed to load environment variables from {env_path}. Please check your .env.local file.")

# # Initialize Supabase client
# supabase: Client = create_client(supabase_url, supabase_key)

# def revalidate_path(path: str):
#     pass

# def add_entry_from_json(file_path: str, question_key: str, family_value_key: str, family_statement_key: str, family_vision_key: str):
#     # Read the JSON file and extract the values for the given keys
#     try:
#         with open(file_path, 'r') as file:
#             data = json.load(file)
#             question = data.get(question_key, None)
#             family_value = data.get(family_value_key, None)
#             family_statement = data.get(family_statement_key, None)
#             family_vision = data.get(family_vision_key, None)
#             if question is None or family_value is None or family_statement is None or family_vision is None:
#                 raise ValueError(f"Key '{question_key}', '{family_value_key}', '{family_statement_key}', or '{family_vision_key}' not found in the JSON file.")
#             # Remove the quotation marks from the strings
#             question = question.replace('\"', '')
#             family_value = family_value.replace('\"', '')
#             family_statement = family_statement.replace('\"', '')
#             family_vision = family_vision.replace('\"', '')
#     except Exception as e:
#         return {'message': f"Error reading JSON file: {e}"}
    
#     # Sign in the user
#     try:
#         auth_response = supabase.auth.sign_in_with_password({"email": "e.amir2010@gmail.com", "password": "Iambadass2314."})
#         session = auth_response.session
#         if not session:
#             raise ValueError("Failed to sign in user.")
        
#         user = session.user
#         if not user:
#             raise ValueError("Authenticated user is not available.")
        
#         user_id = user.id
#         print(user_id)
#     except Exception as e:
#         return {'message': f"Error retrieving authenticated user: {e}"}

#     # Insert the question with the user_id into decision_tree
#     try:
#         response_question = supabase.table('decision_tree').insert({'question': question, 'user_id': user_id}).execute()
#         print(response_question)
#         if 'error' in response_question.data:
#             raise ValueError(f"Error inserting question: {response_question.data['error']['message']}")
#     except Exception as e:
#         return {'message': f"Error inserting question: {e}"}

#     # Insert the family value with the user_id into family_values
#     try:
#         response_value = supabase.table('family_values').insert({
#             'title': 'Created by VidereAI',
#             'description': family_value,
#             'user_id': user_id
#         }).execute()
#         print(response_value)
#         if 'error' in response_value.data:
#             raise ValueError(f"Error inserting family value: {response_value.data['error']['message']}")
#     except Exception as e:
#         return {'message': f"Error inserting family value: {e}"}

#     # Insert the family code statement with the user_id into family_code
#     try:
#         response_statement = supabase.table('family_code').insert({
#             'statement': family_statement,
#             'user_id': user_id
#         }).execute()
#         print(response_statement)
#         if 'error' in response_statement.data:
#             raise ValueError(f"Error inserting family statement: {response_statement.data['error']['message']}")
#     except Exception as e:
#         return {'message': f"Error inserting family statement: {e}"}

#     # Insert the family vision statement with the user_id into family_vision
#     try:
#         response_vision = supabase.table('family_vision').insert({
#             'statement': family_vision,
#             'user_id': user_id
#         }).execute()
#         print(response_vision)
#         if 'error' in response_vision.data:
#             raise ValueError(f"Error inserting family vision: {response_vision.data['error']['message']}")
#     except Exception as e:
#         return {'message': f"Error inserting family vision: {e}"}

#     revalidate_path('/decision-tree')
#     revalidate_path('/family-values')
#     revalidate_path('/family-code')
#     revalidate_path('/family-vision')
#     return {'message': 'Question, family value, family statement, and family vision added successfully'}

# if __name__ == "__main__":
#     json_file_path = r"C:\Users\test\Documents\Programming Directories\BCIT\COMP 4800\business-charter\family_charter_responses.json"
#     question_key = "What questions help guide your family's decision-making?"
#     family_value_key = "What are your family values?"
#     family_statement_key = "What is a statement or commitment that your family lives by?"
#     family_vision_key = "What statement defines your family's vision?"
#     try:
#         result = add_entry_from_json(json_file_path, question_key, family_value_key, family_statement_key, family_vision_key)
#         print(result)
#     except Exception as e:
#         print(f"An error occurred: {e}")

import os
import json
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env.local file
env_path = '.env.local'
load_dotenv(env_path)

# Get the environment variables
supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
supabase_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

# Check if the environment variables are loaded correctly
if not supabase_url or not supabase_key:
    raise EnvironmentError(f"Failed to load environment variables from {env_path}. Please check your .env.local file.")

# Initialize Supabase client
supabase: Client = create_client(supabase_url, supabase_key)

def revalidate_path(path: str):
    pass

def add_entry_from_json(file_path: str, keys: dict):
    # Read the JSON file and extract the values for the given keys
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            entries = {key: data.get(value, None) for key, value in keys.items()}
            for key, value in entries.items():
                if value is None:
                    raise ValueError(f"Key '{keys[key]}' not found in the JSON file.")
                # Remove the quotation marks from the strings
                entries[key] = value.replace('\"', '')
    except Exception as e:
        return {'message': f"Error reading JSON file: {e}"}
    
    # Sign in the user
    try:
        auth_response = supabase.auth.sign_in_with_password({"email": "e.amir2010@gmail.com", "password": "Iambadass2314."})
        session = auth_response.session
        if not session:
            raise ValueError("Failed to sign in user.")
        
        user = session.user
        if not user:
            raise ValueError("Authenticated user is not available.")
        
        user_id = user.id
        print(user_id)
    except Exception as e:
        return {'message': f"Error retrieving authenticated user: {e}"}

    # Insert the question with the user_id into decision_tree
    try:
        response_question = supabase.table('decision_tree').insert({'question': entries['question'], 'user_id': user_id}).execute()
        print(response_question)
        if 'error' in response_question.data:
            raise ValueError(f"Error inserting question: {response_question.data['error']['message']}")
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

if __name__ == "__main__":
    json_file_path = r"C:\Users\test\Documents\Programming Directories\BCIT\COMP 4800\business-charter\family_charter_responses.json"
    keys = {
        'question': "What questions help guide your family's decision-making?",
        'family_value': "What are your family values?",
        'family_statement': "What is a statement or commitment that your family lives by?",
        'family_vision': "What statement defines your family's vision?",
        'impact_statement': "What is your family's impact statement?"
    }
    try:
        result = add_entry_from_json(json_file_path, keys)
        print(result)
    except Exception as e:
        print(f"An error occurred: {e}")
