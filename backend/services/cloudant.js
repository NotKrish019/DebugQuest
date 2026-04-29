const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
require('dotenv').config();

let client;
if (process.env.CLOUDANT_API_KEY && process.env.CLOUDANT_URL) {
    const authenticator = new IamAuthenticator({
        apikey: process.env.CLOUDANT_API_KEY,
    });
    client = CloudantV1.newInstance({
        authenticator: authenticator,
    });
    client.setServiceUrl(process.env.CLOUDANT_URL);
}

const USERS_DB = 'users';
const HISTORY_DB = 'history';

// Helper to handle mock vs real
const query = async (db, selector) => {
    if (client) {
        try {
            const response = await client.postPartitionedFind({
                db: db,
                selector: selector
            });
            return response.result.docs;
        } catch (e) {
            console.error(`Cloudant Error on ${db}:`, e);
            return [];
        }
    }
    // Mock local storage for demo if no Cloudant
    return []; 
};

const saveDoc = async (db, doc) => {
    if (client) {
        try {
            await client.postDocument({
                db: db,
                document: doc
            });
            return true;
        } catch (e) {
            console.error(`Cloudant Save Error on ${db}:`, e);
            return false;
        }
    }
    console.log(`[MOCK] Saved to ${db}:`, doc);
    return true;
};

const getLeaderboard = async () => {
    if (client) {
        // Real Cloudant query for top XP users
        const response = await client.postFind({
            db: USERS_DB,
            selector: { total_xp: { "$gt": 0 } },
            sort: [{ total_xp: "desc" }],
            limit: 10
        });
        return response.result.docs;
    }
    // Mock Leaderboard
    return [
        { username: "null_pointer", total_xp: 18940, level: 45, rank_title: "Pointer Whisperer" },
        { username: "async_ghost", total_xp: 17420, level: 42, rank_title: "Race Condition Master" },
        { username: "byte_knight", total_xp: 16800, level: 40, rank_title: "Memory Guard" }
    ];
};

module.exports = { saveDoc, query, getLeaderboard };
