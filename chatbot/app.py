from flask import Flask, render_template, request, jsonify
import os
import time

app = Flask(__name__)

# Load responses dynamically from file
def load_responses(file_path="responses.txt"):
    responses = {}
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            for line in file:
                if ":" in line:
                    key, value = line.strip().split(":", 1)
                    responses[key.lower()] = value
    else:
        print(f"Error: {file_path} not found.")
    return responses

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get_response", methods=["POST"])
def get_response():
    responses = load_responses()  # Dynamically load responses
    user_message = request.json.get("message", "").lower()
    if not user_message:
        return jsonify({"response": "Please provide a message."})
    
    response = responses.get(user_message, responses.get("default", "I don't understand that."))
    time.sleep(1)  # Simulate typing delay
    return jsonify({"response": response})

if __name__ == "__main__":
    # Ensure the app runs from the correct directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    app.run(debug=True)