import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchContent = async (language = 'en') => {
  try {
    const response = await api.get(`/content?language=${language}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching content:', error);
    return null;
  }
};

export const logChatMessage = async (query) => {
  try {
    // For demo purposes, just log to console since we don't have a backend
    console.log('Chat message logged:', query);
    return { success: true, message: 'Message logged successfully' };
  } catch (error) {
    console.error('Error logging chat message:', error);
    return null;
  }
};

export default api;
