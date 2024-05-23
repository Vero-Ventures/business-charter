# import os
# import json
# from dotenv import load_dotenv
# from pathlib2 import Path
# from langchain.chains.conversational_retrieval.base import ConversationalRetrievalChain
# from langchain_openai import ChatOpenAI, OpenAIEmbeddings
# from langchain_community.vectorstores import FAISS
# from langchain.memory import ConversationBufferMemory

# # Load environment variables from .env.local
# # load_dotenv('.env.local')
# env_path = Path(__file__).resolve().parents[3] / '.env.local'

# load_dotenv(env_path)

# # Get the API key from the environment
# api_key = os.getenv("OPENAI_API_KEY")
# if api_key is None:
#     raise ValueError("OPENAI_API_KEY not found in environment variables")
# os.environ["OPENAI_API_KEY"] = api_key

# try:
#     # C:/Users/danie/Documents/BCIT/Semester4/ProjectsPracticum2/Project2/business-charter/src/app/model/vector_store/index.faiss
#     # faiss_index = Path("C:/Users/jasra/Documents/COMP 4800/final-model/business-charter/src/app/model/vector_store/index.faiss")
#     faiss_index = Path("C:/Users/danie/Documents/BCIT/Semester4/ProjectsPracticum2/Project2/business-charter/src/app/model/vector_store/index.faiss")
#     if faiss_index.is_file():
#         embeddings = OpenAIEmbeddings()
#         # vector_store = FAISS.load_local("C:/Users/jasra/Documents/COMP 4800/final-model/business-charter/src/app/model/vector_store/", embeddings=embeddings, allow_dangerous_deserialization=True)
#         vector_store = FAISS.load_local("C:/Users/danie/Documents/BCIT/Semester4/ProjectsPracticum2/Project2/business-charter/src/app/model/vector_store/", embeddings=embeddings, allow_dangerous_deserialization=True)
#     else:
#         print("Vector store not found. Please run 'update_vector_store.py' to create the vector store.")
#         exit(1)

#     # Initializing the conversation chain with GPT-4, the vector store, and memory.
#     llm = ChatOpenAI(temperature=0.7, model_name="gpt-4")
#     memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)

#     # Creating the conversational retrieval chain
#     conversation_chain = ConversationalRetrievalChain.from_llm(
#         llm=llm,
#         chain_type="stuff",
#         retriever=vector_store.as_retriever(),
#         memory=memory
#     )

#     questions = [
#         "What questions help guide your family's decision-making?",
#         "What are your family values?",
#         "What is a statement or commitment that your family lives by?",
#         "What statement defines your family's vision?",
#         "What is your family's impact statement?"
#     ]

#     # Function to ask questions and record responses
#     def ask_questions(questions):
#         responses = {}
#         for question in questions:
#             print(f"Videre AI: {question}")
#             response = input("You: ")
#             responses[question] = response
#             result = conversation_chain.invoke({"question": 
#                                                 "Here is the response that the user provided: \n" + response + " \nIn your response back, I would like you to acknowledge the user's response in a friendly manner and then rephrase it back so that the user knows you understand their response. Please be sure to not ask a question back to the user, just rephrase their response back to them in a friendly manner. This is very crucial: If the response is very short (one or two words), makes no grammatical sense, and/or is blank/empty, then make sure you don't say anything."})
#             answer = result["answer"]
#             print(f"Videre AI: {answer}")
#         with open('family_charter_responses.json', 'w') as file:
#             json.dump(responses, file)
#         return responses

#     # The loop to interact with the user
#     print("Welcome to VidereAI. Type 'exit' to end the conversation or 'start' to begin the family charter process.")
#     while True:
#         query = input("You: ")
#         if query.lower() == 'exit':
#             print("Goodbye!")
#             break
#         elif query.lower() == 'start':
#             user_responses = ask_questions(questions)
#             print("Videre AI: I have recorded all of your responses. Thank you for providing the information. If you would like to update your responses, please type 'start' again.")
#         else:
#             result = conversation_chain.invoke({"question": query})
#             answer = result["answer"]
#             print(f"Videre AI: {answer}")

# except Exception as e:
#     print(f"An error occurred: {e}")

import os
import json
from dotenv import load_dotenv
from pathlib import Path
from langchain.chains.conversational_retrieval.base import ConversationalRetrievalChain
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory

# Load environment variables from .env.local
env_path = Path(__file__).resolve().parents[3] / '.env.local'
load_dotenv(env_path)

# Get the API key from the environment
api_key = os.getenv("OPENAI_API_KEY")
if api_key is None:
    raise ValueError("OPENAI_API_KEY not found in environment variables")
os.environ["OPENAI_API_KEY"] = api_key

# Initialize components
try:
    faiss_index = Path("C:/Users/danie/Documents/BCIT/Semester4/ProjectsPracticum2/Project2/business-charter/src/app/model/vector_store/index.faiss")
    if faiss_index.is_file():
        embeddings = OpenAIEmbeddings()
        vector_store = FAISS.load_local("C:/Users/danie/Documents/BCIT/Semester4/ProjectsPracticum2/Project2/business-charter/src/app/model/vector_store/", embeddings=embeddings, allow_dangerous_deserialization=True)
    else:
        print("Vector store not found. Please run 'update_vector_store.py' to create the vector store.")
        exit(1)

    # Initializing the conversation chain with GPT-4, the vector store, and memory.
    llm = ChatOpenAI(temperature=0.7, model_name="gpt-4")
    memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)

    # Creating the conversational retrieval chain
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        chain_type="stuff",
        retriever=vector_store.as_retriever(),
        memory=memory
    )

except Exception as e:
    print(f"An error occurred during initialization: {e}")
    exit(1)

# Function to process chat messages
def process_message(user_message):
    try:
        result = conversation_chain.invoke({"question": user_message})
        answer = result["answer"]
        return answer
    except Exception as e:
        return str(e)
