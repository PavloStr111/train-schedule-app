// базовий axios-запит з інтерсептором
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  console.log(token)
  if (token && cfg.headers) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
})

export default api;
