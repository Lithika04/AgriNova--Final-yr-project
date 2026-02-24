import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerUser = (userData) => api.post('/register', userData);
export const loginUser = (credentials) => api.post('/login', credentials);
export const submitProfile = (profileData) => api.post('/profile', profileData);
export const getDashboardData = () => api.get('/dashboard');
export const checkSession = () => api.get('/check_session');
export const logoutUser = () => api.post('/logout');
export const downloadReport = (lang = 'en') => api.get(`/download_report?lang=${lang}`, { responseType: 'blob' });

export default api;
