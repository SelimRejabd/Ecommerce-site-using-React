import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/users/login/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = document.cookie.split(';').find(item => item.trim().startsWith('csrftoken='));
        if (token) {
            config.headers['X-CSRFToken'] = token.split('=')[1];
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
