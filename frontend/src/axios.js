import axios from 'axios';

const backend = 'http://127.0.0.1:8000/api';

// Create an Axios instance for API requests
const api = axios.create({
    baseURL: backend,  // Update with your Laravel API base URL
});

// Set up a request interceptor to include the token in the Authorization header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
