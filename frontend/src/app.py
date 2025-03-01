# Import necessary libraries
import os
import google.generativeai as genai
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
# Initialize the Flask app
app = Flask(__name__)  # Use __name__ instead of _name_

CORS(app) 

# Configure the Google Generative AI API key
genai.configure(api_key="AIzaSyD6tndL6uyE7Powp-h_PEVMHcMe9CUytb0")  # Replace with your actual API key

# Chatbot configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# Initialize the generative model
model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
    system_instruction="you are a chatbot for an e-commerce app Reality Now which sells shirts that can have custom design options and other products. You should recommend products and act as customer support.",
    tools='code_execution',
)

# Start the chat session with predefined history
chat_session = model.start_chat(
    history=[
        {
            "role": "user",
            "parts": [
                "Hi there! I'm Jeja, your friendly shopping assistant at Reality .\n\n"
                "I'm here to make your shopping experience on Reality Now as smooth and enjoyable as possible. "
                "Whether you need help finding a product, have questions about your order, or want some expert advice, "
                "I'm just a message away.\n\n"
                "Here's what I can do for you:\n\n"
                "- Order Tracking: Want to know where your package is? Just ask! "
                "I can provide real-time updates on your order status, including shipping information and estimated delivery dates.\n"
                "- Product Information: Curious about a product's features or specifications? I can provide detailed information, "
                "including product descriptions, reviews, and comparisons.\n"
                "- Personalized Recommendations: Looking for something new? Tell me your preferences and I'll suggest products "
                "that you might love.\n"
                "- Customer Support: Need help with a return, exchange, or any other issue? I'm here to assist you and provide solutions.\n\n"
                "To get started, just ask me a question. Here are a few examples:\n"
                "- \"Where's my order?\"\n"
                "- \"What's the return policy?\"\n"
                "- \"Can you recommend a good [product category] for [specific need]?\"\n"
                "- \"I'm having trouble with [issue]. Can you help?\"\n"
                "Let's shop together!"
            ]
        },
        {
            "role": "model",
            "parts": ["Okay, I'm ready to be Jeja, the friendly shopping assistant for Reality Now. Ask me anything!"]
        },
        {"role": "user", "parts": ["hi"]},
        {"role": "model", "parts": ["Hi there! Welcome to Reality Now. What can I help you with today? Are you looking for something specific or just browsing?"]},
        {"role": "user", "parts": ["i need a red shirt"]},
        {"role": "model", "parts": ["Great! We have a wide selection of red shirts. Do you have a particular shade of red in mind (like crimson, scarlet, burgundy)? What kind of material are you looking for (cotton, polyester, linen)? And what style do you prefer (t-shirt, long-sleeved, button-down)? The more details you can give me, the better I can help you find the perfect red shirt."]},
        {"role": "user", "parts": ["when will my product reach"]},
        {"role": "model", "parts": ["To track your order, I'll need your order number or the email address associated with your order. Could you provide me with one of those so I can check the delivery status for you?"]},
        {"role": "user", "parts": ["i need a replacement of the product"]},
        {"role": "model", "parts": ["I can definitely help you with a replacement. Could you please tell me your order number and which product you need to be replaced? Also, let me know the reason for the replacement (damaged, wrong size, etc.). This information will help me process your request quickly and efficiently."]},
    ]
)

# Define the home route to render the HTML interface
@app.route("/")
def home():
    return redirect("index.html")  

# Define the chat route to handle user messages
@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json["message"]
    response = chat_session.send_message(user_message)
    return jsonify({"response": response.text})

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
