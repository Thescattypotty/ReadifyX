import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8222/api/v1', // Set your base URL here
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add other default headers here
    }
});

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Optionally, add response interceptors if needed
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;