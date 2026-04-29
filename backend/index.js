const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const { generateChallenge, verifyFix } = require('./services/gemini');
const { saveDoc, query, getLeaderboard } = require('./services/cloudant');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rate limiting for AI routes
const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50 // limit each IP to 50 requests per windowMs
});

// Store active sessions in memory (for server-side timer validation)
const activeSessions = new Map();

// Routes
app.post('/api/generate-challenge', aiLimiter, async (req, res) => {
    try {
        const seed = req.body.seed || Math.random().toString(36).substring(7);
        const challenge = await generateChallenge(seed);
        
        const sessionId = uuidv4();
        activeSessions.set(sessionId, {
            startTime: Date.now(),
            challenge: challenge,
            attempts: 0
        });

        res.json({
            sessionId,
            ...challenge
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate challenge" });
    }
});

app.post('/api/verify-fix', async (req, res) => {
    const { sessionId, userCode } = req.body;
    const session = activeSessions.get(sessionId);

    if (!session) {
        return res.status(404).json({ error: "Session expired or not found" });
    }

    session.attempts += 1;
    
    try {
        const result = await verifyFix(
            userCode, 
            session.challenge.buggy_code, 
            session.challenge.description
        );

        if (result.is_correct) {
            const endTime = Date.now();
            const timeElapsedSeconds = (endTime - session.startTime) / 1000;
            const timeFactor = Math.max(1, timeElapsedSeconds / 60); // min 1 minute divisor or actual minutes
            
            // Formula: XP = BaseValue / (Attempts * Time)
            const baseValue = session.challenge.base_xp || 500;
            const earnedXp = Math.floor(baseValue / (session.attempts * timeFactor));
            
            result.earnedXp = earnedXp;
            result.timeElapsed = timeElapsedSeconds;
            
            // Save to history (Cloudant)
            await saveDoc('history', {
                userId: req.body.userId || 'anonymous',
                original_code: session.challenge.buggy_code,
                user_fix: userCode,
                language: session.challenge.language,
                timestamp: new Date().toISOString(),
                xp: earnedXp
            });

            activeSessions.delete(sessionId);
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Verification failed" });
    }
});

app.get('/api/leaderboard', async (req, res) => {
    try {
        const leaders = await getLeaderboard();
        res.json(leaders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
});

app.post('/api/user/check-username', async (req, res) => {
    const { username } = req.body;
    const users = await query('users', { username: username });
    res.json({ available: users.length === 0 });
});

app.listen(PORT, () => {
    console.log(`[SYSTEM] DebugQuest Backend running on port ${PORT}`);
});
