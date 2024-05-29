
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
    faiss_index = Path(__file__).resolve().parent / "vector_store/index.faiss"
    if faiss_index.is_file():
        embeddings = OpenAIEmbeddings()
        vector_store = FAISS.load_local(str(faiss_index.parent), embeddings=embeddings, allow_dangerous_deserialization=True)
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
    print(f"An error occurred: {e}")

# Function to process chat messages
def process_message(user_message):
    try:
        result = conversation_chain.invoke({"question": user_message})
        answer = result["answer"]
        return answer
    except Exception as e:
        return str(e)

# Function to summarize family responses
def generate_summary(responses):
    summary_prompt = f"Summarize the following responses: {json.dumps(responses)}"
    try:
        result = conversation_chain.invoke({"question": summary_prompt})
        return result["answer"]
    except Exception as e:
        return str(e)
