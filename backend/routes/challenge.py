from fastapi import APIRouter
from services.gemini_service import generate_challenge

router = APIRouter()

from pydantic import BaseModel

class ChallengeRequest(BaseModel):
    language: str = "python"
    difficulty: str = "easy"
    seed: str = None

@router.post("/generate-challenge")
def create_challenge(request: ChallengeRequest):
    import uuid
    data = generate_challenge(request.language, request.difficulty)
    data["sessionId"] = str(uuid.uuid4())
    return data
