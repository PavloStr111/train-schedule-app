import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1',
});

api.interceptors.request.use(cfg => {

    const token = localStorage.getItem('token');

    if (token && cfg.headers) 
      cfg.headers.Authorization = `Bearer ${token}`;

    return cfg;
});

api.interceptors.response.use(
    res => res,
    err => {
      console.error('API error:', err);
      return Promise.reject(err);
    }
);

export default api;