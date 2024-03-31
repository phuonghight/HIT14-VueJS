import axios from 'axios';
const api_url = 'https://api.openweathermap.org/data/2.5/weather';

export const api = axios.create({
  baseURL: api_url,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.response.use((res) => {
  return res.data;
});
