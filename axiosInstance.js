//axiosInstance frontend
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: 'http://192.168.27.213:6554/api',
});

// Add a request interceptor to include the JWT token in the authorization header
axiosInstance.interceptors.request.use(
  async function (config) {
    // Retrieve the JWT token from AsyncStorage
    const authToken = await AsyncStorage.getItem('authToken');
    // If the token exists, add it to the Authorization header
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
