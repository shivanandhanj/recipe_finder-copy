from flask import Flask, request, jsonify
import os
import json
from dotenv import load_dotenv
from chroma_db.chroma_setup import create_chroma_db, load_chroma_collection
from gemini_api.generate_answer import split_text, get_answer
from flask_cors import CORS
# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load environment variables from .env file
load_dotenv()

# Verify API key
gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY not found. Please check your .env setup.")

# Load and process the JSON file
with open('recipe.json', 'r') as file:
    data = json.load(file)
    text_data = json.dumps(data, indent=21)

# Split text into chunks
chunked_text = split_text(text_data)

# Create and load Chroma DB
db, name = create_chroma_db(documents=chunked_text, path="D:/Full stack/chroma", name="rag_experiment")
db = load_chroma_collection(path="D:/Full stack/chroma", name="rag_experiment")
print("DB loaded:", db is not None)
@app.route('/',methods=['POST','GET'])
def home():
    return jsonify('hello from server')

# Define an endpoint for querying the database
@app.route('/query', methods=['POST'])
def query_answer():
    # Get the query from the request JSON payload
    data = request.get_json()
    query = data.get("query")
    print(query)
    
    # Check if query is provided
    if not query:
        return jsonify({"error": "No query provided"}), 400
    
    # Retrieve the relevant answer
    relevant_text = get_answer(query=query, db=db)
    print(relevant_text)
    
    # Return the answer as JSON response
    return jsonify({"query": query, "answer": relevant_text})

# Run the Flask server
if __name__ == '__main__':
    app.run(debug=True,port=7000)
