import axios from 'axios';
import {
  HOST_API_KEY,
  AZURE_SPEECH_KEY,
  AZURE_SPEECH_ENDPOINT,
  AZURE_APP_ID,
} from '@env';

console.log('HOST_API_KEY', HOST_API_KEY);

const axiosInstance = axios.create({
  baseURL: HOST_API_KEY,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
