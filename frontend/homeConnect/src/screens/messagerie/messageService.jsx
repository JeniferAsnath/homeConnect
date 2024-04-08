import axios from 'axios';

const API_URL = 'http://example.com/api';

export const sendMessage = async (houseId, message) => {
  try {
    const response = await axios.post(`${API_URL}/houses/${houseId}/messages`, {
      message: message,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
export const sendResponse = async (messageId, response) => {
    try {
      const response = await axios.post(`${API_URL}/messages/${messageId}/response`, {
        response: response,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending response:', error);
      throw error;
    }
  };
  