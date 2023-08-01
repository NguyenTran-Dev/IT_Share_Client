import axios from 'axios';

const http = axios.create({
  baseURL: 'https://fd-booking.up.railway.app/api',
  headers: {
    Accept: 'application/json',
    ContentType: 'application/json',
  }
});

http.interceptors.request.use((config) => {
  return config;
});

http.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error.response.data);
});

export default http;
