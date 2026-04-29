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

def generate_challenge(language="python", difficulty="easy"):
    difficulty_context = {
        "easy": "subtle logical bug, under 15 lines, basic concepts",
        "medium": "non-obvious bug involving async, memory, or complex logic, 15-30 lines",
        "hard": "extremely subtle architectural or algorithmic bug, 30-50 lines, high complexity"
    }

    prompt = f"""You are an expert programming instructor for "DebugQuest", a high-stakes cyberpunk hacking simulation.
    
    YOUR TASK: Generate a {language.upper()} debugging challenge with a {difficulty.upper()} difficulty.
    
    CONSTRAINTS:
    - Language: {language}
    - Difficulty: {difficulty} ({difficulty_context.get(difficulty)})
    - The code must be idiomatic and look like real production code.
    - There must be EXACTLY ONE logical bug that prevents the code from working correctly.
    - NO syntax errors. The code must be syntactically valid.
    
    OUTPUT FORMAT: Return ONLY a valid JSON object with these fields:
    {{
        "title": "A short, hacker-style title for the anomaly",
        "language": "{language}",
        "buggy_code": "The full code snippet containing the logical bug",
        "correct_code": "The full code snippet with the bug fixed",
        "description": "A brief mission briefing describing what the code is supposed to do and the observed anomaly",
        "socratic_hint": "A guiding question that helps the user find the bug without giving away the answer",
        "solution_snippet": "Just the specific line or lines that were changed to fix the bug",
        "base_xp": {200 if difficulty == 'easy' else 600 if difficulty == 'medium' else 1500}
    }}"""

    try:
        # Using Gemini 3 as verified available in this environment
        model = genai.GenerativeModel(
          model_name="models/gemini-3-flash-preview",
          generation_config=generation_config,
        )
        response = model.generate_content(prompt)
        text = response.text.strip()
        
        # Robust JSON cleaning
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0]
        elif "```" in text:
            text = text.split("```")[1].split("```")[0]
        
        data = json.loads(text.strip())
        return data
    except Exception as e:
        print(f"ERROR generating {language} ({difficulty}) challenge: {str(e)}")
        # Fallback challenge based on requested language
        fallbacks = {
            "python": {
                "title": "The Minus Mistake",
                "language": "python",
                "buggy_code": "def add_numbers(a, b):\n    return a - b\n\nprint(add_numbers(5, 3))",
                "correct_code": "def add_numbers(a, b):\n    return a + b\n\nprint(add_numbers(5, 3))",
                "description": "A simple addition function is subtracting instead.",
                "socratic_hint": "Check the arithmetic operator in the return statement.",
                "solution_snippet": "return a + b",
                "base_xp": 200
            },
            "javascript": {
                "title": "Shadowed Variable",
                "language": "javascript",
                "buggy_code": "let count = 0;\nfunction increment() {\n  let count = count + 1;\n  return count;\n}\nconsole.log(increment());",
                "correct_code": "let count = 0;\nfunction increment() {\n  count = count + 1;\n  return count;\n}\nconsole.log(increment());",
                "description": "The counter is not persisting its value.",
                "socratic_hint": "Is there a variable shadowing issue inside the function?",
                "solution_snippet": "count = count + 1",
                "base_xp": 200
            },
            "cpp": {
                "title": "Buffer Overflow Risk",
                "language": "cpp",
                "buggy_code": "#include <iostream>\n#include <string.h>\n\nint main() {\n    char buffer[10];\n    strcpy(buffer, \"This is a very long string that will overflow\");\n    std::cout << buffer << std::endl;\n    return 0;\n}",
                "correct_code": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string buffer = \"This is a very long string that will overflow\";\n    std::cout << buffer << std::endl;\n    return 0;\n}",
                "description": "The C-style string copy is dangerous.",
                "socratic_hint": "What happens when you copy a string larger than the destination buffer?",
                "solution_snippet": "std::string buffer = ...",
                "base_xp": 200
            }
        }
        return fallbacks.get(language, fallbacks["python"])

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
        model = genai.GenerativeModel("models/gemini-3-flash-preview")
        response = model.generate_content(prompt)
        return {"hint": response.text.strip()}
    except Exception as e:
        print("Error generating hint:", e)
        return {"hint": "Take a closer look at the logic. What might be going wrong?"}

def verify_fix(user_code: str, correct_code: str, description: str):
    prompt = f"""You are the "Arena Arbiter".
System Description: {description}
Correct Reference Solution: {correct_code}
User's Submitted Code: {user_code}

Determine if the user's code is logically equivalent to the correct reference solution. 
It doesn't have to be character-identical, but the bug must be fixed and the logic must be sound.

Return in STRICT JSON format:
{{
    "is_correct": boolean,
    "explanation": "Brief explanation of why it is correct or incorrect"
}}"""
    try:
        model = genai.GenerativeModel("models/gemini-3-flash-preview")
        response = model.generate_content(prompt)
        text = response.text.strip()
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0]
        elif "```" in text:
            text = text.split("```")[1].split("```")[0]
        return json.loads(text.strip())
    except Exception as e:
        print("Error verifying fix:", e)
        return {"is_correct": False, "explanation": "Verification system error."}
