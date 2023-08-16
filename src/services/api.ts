import axios from 'axios';
import { getCookie } from '../filters/servicesCookie';


const http = axios.create({
  baseURL: 'https://it-share-server.vercel.app/api',
  headers: {
    Accept: 'application/json',
    ContentType: 'application/json',
    AccessControlAllowOrigin: '*',
    AccessControlAllowHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
  }
});

async function getTokenFromCookie() {
  const token = getCookie('access_token');
  if (token) {
    return token;
  }
  return null;
}

http.interceptors.request.use(
  async function (config) {
    const token = await getTokenFromCookie();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error.response.data);
});

export default http;
