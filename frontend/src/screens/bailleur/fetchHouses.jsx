import axios from 'axios';

const API_URL = 'http://192.168.43.225:8001';

const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

export const fetchHouses = async () => await fetchData('houses');

export const fetchHouseStats = async () => await fetchData('houses/stats');

export const fetchNotifications = async () => await fetchData('notifications');

export const fetchMessages = async () => await fetchData('messages');

export const fetchHouseRating = async (houseId) => await fetchData(`houses/${houseId}/rating`);

export const fetchHouseDetails = async (houseId) => await fetchData(`houses/${houseId}`);
