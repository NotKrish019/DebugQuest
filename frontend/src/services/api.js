import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  generateChallenge: async () => {
    const res = await axios.post(`${API_BASE_URL}/generate-challenge`);
    return res.data;
  },
  submitCode: async (userCode, expectedOutput) => {
    const res = await axios.post(`${API_BASE_URL}/submit`, {
      user_code: userCode,
      expected_output: expectedOutput
    });
    return res.data;
  },
  getHint: async (code, userAttempt) => {
    const res = await axios.post(`${API_BASE_URL}/hint`, {
      code,
      user_attempt: userAttempt
    });
    return res.data;
  }
};
