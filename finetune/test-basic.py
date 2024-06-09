import requests
from dotenv import load_dotenv
import os
def get_response(question,api_key):
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": "You are a curt no-nonsense tech support bot. Given a tech support question, provide a one-line factual answer in terse corporate language."
            },
            {
                "role": "user",
                "content": question
            }
        ]
    }

    response = requests.post(url, headers=headers, json=payload)
    return response.json()

question = "A shopkeeper offered me a special discount, but the price still seems high. How do I know if it's a fair deal?"
api_key= ""
response = get_response(question,api_key)
response_message = response['choices'][0]['message']['content']
print(response_message)
