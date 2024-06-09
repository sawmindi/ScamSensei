import requests

def upload_file_for_fine_tuning(file_path):
    url = "https://api.openai.com/v1/files"
    headers = {
        "Authorization": ""
    }
    files = {
        "purpose": (None, "fine-tune"),
        "file": (file_path, open(file_path, "rb"), "application/json")
    }

    response = requests.post(url, headers=headers, files=files)
    return response.json()

file_path = "trainingData.jsonl"
response = upload_file_for_fine_tuning(file_path)
print(response)
