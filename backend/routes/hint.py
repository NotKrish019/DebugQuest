from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini_service import get_hint

router = APIRouter()

class HintRequest(BaseModel):
    code: str
    user_attempt: str

@router.post("/hint")
def request_hint(req: HintRequest):
    data = get_hint(req.code, req.user_attempt)
    return data
