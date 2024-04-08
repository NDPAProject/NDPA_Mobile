import axios from 'axios';
// import {HOST_API_KEY} from '@env';

const HOST_API_KEY = 'http://172.174.247.52:5000';

const axiosInstance = axios.create({
  baseURL: HOST_API_KEY,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
