from fastapi import APIRouter
from pydantic import BaseModel
from services.judge0_service import execute_code

router = APIRouter()

class SubmissionRequest(BaseModel):
    user_code: str
    expected_output: str

@router.post("/submit")
def submit_code(request: SubmissionRequest):
    output = execute_code(request.user_code)
    
    # Check if expected output is in the actual output or vice versa
    out_str = str(output).strip()
    exp_str = str(request.expected_output).strip()
    
    status = "success" if (out_str == exp_str) else "fail"
    
    return {
        "status": status,
        "output": output
    }
