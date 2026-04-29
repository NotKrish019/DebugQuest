from fastapi import APIRouter
from services.gemini_service import generate_challenge

router = APIRouter()

@router.post("/generate-challenge")
def create_challenge():
    data = generate_challenge()
    return data
