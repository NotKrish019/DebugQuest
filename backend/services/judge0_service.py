import os
import time
import requests
from dotenv import load_dotenv

load_dotenv()

JUDGE0_API_URL = os.getenv("JUDGE0_API_URL", "https://judge0-ce.p.rapidapi.com")
JUDGE0_API_KEY = os.getenv("JUDGE0_API_KEY")

def execute_code(source_code: str):
    if not JUDGE0_API_KEY:
        # Simple mock if no judge0 key to allow frontend demoing
        return "Simulated execution output... (Please configure Judge0 API Key)"

    url = f"{JUDGE0_API_URL}/submissions"
    querystring = {"base64_encoded": "false", "fields": "*"}
    
    headers = {
        "content-type": "application/json",
        "X-RapidAPI-Key": JUDGE0_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
    }

    if "rapidapi" not in JUDGE0_API_URL:
        headers = { "content-type": "application/json" }

    payload = {
        "language_id": 71, # Python (3.8.1)
        "source_code": source_code
    }

    try:
        response = requests.post(url, json=payload, headers=headers, params=querystring)
        response.raise_for_status()
        token = response.json().get("token")
        
        # Poll for result
        while True:
            time.sleep(1)
            res = requests.get(f"{url}/{token}", headers=headers, params={"base64_encoded": "false", "fields": "*"})
            res_data = res.json()
            status_id = res_data.get("status", {}).get("id")
            if status_id not in [1, 2]: # In Queue or Processing
                break
                
        output = res_data.get("stdout") or res_data.get("stderr") or res_data.get("compile_output") or ""
        return output
    except Exception as e:
        print("Judge0 Error:", e)
        return "Execution failed. Check Judge0 Configuration."
