import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

generation_config = {
  "temperature": 0.7,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 1024,
  "response_mime_type": "application/json",
}

def generate_challenge():
    model = genai.GenerativeModel(
      model_name="gemini-2.5-flash",
      generation_config=generation_config,
    )
    prompt = """You are an expert programming instructor.
Generate a Python debugging challenge with:
- Exactly 2 logical bugs
- No syntax errors
- Under 25 lines
Return JSON with:
code, expected_output
Note: code and expected_output should be strings."""

    try:
        response = model.generate_content(prompt)
        # Verify JSON and strip markdown if present
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        elif text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        
        data = json.loads(text.strip())
        return data
    except Exception as e:
        print("Error generating challenge:", e)
        # Fallback challenge
        return {
            "code": "def add_numbers(a, b):\n    return a - b\n\nprint(add_numbers(5, 3))",
            "expected_output": "8\n"
        }

def get_hint(code: str, user_attempt: str):
    prompt = f"""You are a Socratic tutor.
DO NOT give the answer.
Ask a guiding question about the bug.

Original Code:
{code}

User's Attempt:
{user_attempt}
"""
    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        return {"hint": response.text.strip()}
    except Exception as e:
        print("Error generating hint:", e)
        return {"hint": "Take a closer look at the logic. What might be going wrong?"}
