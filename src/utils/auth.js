// utils
import axios from './axios';
import {decode as atob} from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ----------------------------------------------------------------------

export const jwtDecode = token => {
  const base64Url = token?.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const rawPayload = atob(base64);
  const jsonPayload = decodeURIComponent(
    Array.prototype.map
      .call(rawPayload, c => {
        return `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`;
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

// ----------------------------------------------------------------------

export const isValidToken = accessToken => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

// export const tokenExpired = async exp => {
//   let expiredTimer;

//   const currentTime = Date.now();
//   const timeLeft =
//     exp * 1000 - currentTime > 3600 * 1000
//       ? 3600 * 1000
//       : exp * 1000 - currentTime;

//   clearTimeout(expiredTimer);

//   expiredTimer = setTimeout(async () => {
//     console.log('Token expired');

//     await AsyncStorage.removeItem('accessToken');
//   }, timeLeft);
// };

// ----------------------------------------------------------------------

export const setSession = async accessToken => {
  if (accessToken) {
    await AsyncStorage.setItem('accessToken', accessToken);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    await AsyncStorage.removeItem('accessToken');

    delete axios.defaults.headers.common.Authorization;
  }
};
