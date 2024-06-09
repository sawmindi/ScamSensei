import requests

def get_response(question):
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": "",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "ft:gpt-3.5-turbo-0613:personal::8w80tEmr",
        "messages": [
            {
                "role": "system",
                "content": "You are ScamSensei a chatbot that only focuses on educating tourists about scams"
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
response = get_response(question)
response_message = response['choices'][0]['message']['content']
print(response_message)
