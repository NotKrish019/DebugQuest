from fastapi import APIRouter
from pydantic import BaseModel
from services.judge0_service import execute_code

router = APIRouter()

class SubmissionRequest(BaseModel):
    user_code: str
    expected_output: str

class VerifyFixRequest(BaseModel):
    sessionId: str = None
    userCode: str = ""
    userId: str = None
    correctCode: str = ""

@router.post("/submit")
def submit_code(request: SubmissionRequest):
    output = execute_code(request.user_code)
    out_str = str(output).strip()
    exp_str = str(request.expected_output).strip()
    status = "success" if (out_str == exp_str) else "fail"
    return {"status": status, "output": output}

@router.post("/verify-fix")
def verify_fix(request: VerifyFixRequest):
    # Simple logic: Match user code with correct code (ignoring whitespace/comments for better UX)
    def normalize(code):
        import re
        # Remove comments
        code = re.sub(r'#.*', '', code) # Python
        code = re.sub(r'//.*', '', code) # JS
        # Remove whitespace
        return "".join(code.split())

    is_correct = normalize(request.userCode) == normalize(request.correctCode)
    
    # Calculate earned XP
    earnedXp = 500 if is_correct else 0
    
    return {
        "is_correct": is_correct,
        "earnedXp": earnedXp,
        "explanation": "Code matches the target logic." if is_correct else "Code does not match the intended fix."
    }
