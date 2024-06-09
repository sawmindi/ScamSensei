import requests

def create_fine_tuning_job(training_file, model, api_key):
    url = "https://api.openai.com/v1/fine_tuning/jobs"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "training_file": training_file,
        "model": model
    }

    response = requests.post(url, headers=headers, json=payload)
    return response.json()

training_file = ""
model = "gpt-3.5-turbo"
api_key = ""
response = create_fine_tuning_job(training_file, model, api_key)
print(response)
