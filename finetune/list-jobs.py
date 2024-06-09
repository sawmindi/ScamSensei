import requests

def get_fine_tuning_jobs():
    url = "https://api.openai.com/v1/fine_tuning/jobs"
    headers = {
        "Authorization": ""
    }

    response = requests.get(url, headers=headers)
    return response.json()

jobs = get_fine_tuning_jobs()
print(jobs)
