import axios from 'axios';
import {HOST_API_KEY} from '@env';

const axiosInstance = axios.create({
  baseURL: HOST_API_KEY,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
