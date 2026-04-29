const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateChallenge = async (seed) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are an expert programming instructor for "DebugQuest", a gamified arena.
    Context Seed: ${seed}
    
    Generate a real-world coding challenge for a "Hunter" to solve.
    The challenge must contain EXACTLY one subtle logical bug.
    
    Return the response in STRICT JSON format:
    {
        "title": "A cool title for the challenge",
        "language": "javascript" or "python",
        "buggy_code": "The code with the bug",
        "correct_code": "The full code with the bug fixed correctly",
        "description": "Short explanation of what the system is supposed to do",
        "socratic_hint": "A guiding question that doesn't give away the answer",
        "solution_snippet": "Just the specific line(s) that were bugged, in their fixed form",
        "base_xp": 500
    }
    
    Constraints:
    - No static bug banks.
    - The bug should be logical (off-by-one, type mismatch, closure issue, etc.), not a syntax error.
    - Code should be under 30 lines.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // Clean markdown if present
        const jsonStr = text.replace(/```json|```/g, "").trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Gemini Generation Error:", error);
        throw error;
    }
};

const verifyFix = async (userCode, correctCode, description) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are the "Arena Arbiter".
    System Description: ${description}
    Correct Reference Solution: ${correctCode}
    User's Submitted Code: ${userCode}
    
    Determine if the user's code is logically equivalent to the correct reference solution. 
    It doesn't have to be character-identical, but the bug must be fixed and the logic must be sound.
    
    Return in STRICT JSON format:
    {
        "is_correct": true/false,
        "feedback_hint": "If wrong, a Socratic hint. If correct, a praise for the hunter."
    }`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonStr = text.replace(/```json|```/g, "").trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Gemini Verification Error:", error);
        throw error;
    }
};

module.exports = { generateChallenge, verifyFix };
