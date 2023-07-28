import axios from 'axios';

const http = axios.create({
  baseURL: 'https://fd-booking.up.railway.app/api'
});

export default http;
