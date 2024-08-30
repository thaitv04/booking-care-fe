import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-type'] = 'application/json';

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthToken = (token, role, ID) => {
    window.localStorage.setItem('auth_token', token);
    window.localStorage.setItem('role', role);
    window.localStorage.setItem('ID', ID);
};

export const clearAuth = () => {
    window.localStorage.removeItem('auth_token');
    window.localStorage.removeItem('role');
    window.localStorage.removeItem('ID');
};

axios.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            clearAuth();
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;
