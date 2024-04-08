import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.34.89:8001', // Remplacez par l'URL de votre backend
});

// Middleware pour inclure automatiquement le token JWT dans le header
api.interceptors.request.use(
  async (config) => {
    // Récupérer le token JWT depuis le stockage local
    const token = await AsyncStorage.getItem('token');
    // Si le token existe, l'inclure dans le header 'Authorization'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
