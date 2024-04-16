import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axiosInstance from '../../utils/axios';
import {dispatch} from '../store';

const initialState = {
  isloading: false,
  error: null,
  message: '',
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state) {
      state.isloading = true;
    },

    hasError(state, action) {
      state.isloading = false;
      state.error = action.payload;
    },

    PutUserSuccess(state, action) {
      state.isloading = true;
      state.message = action.payload;
    },

    setisLoading(state) {
      state.isloading = false;
    },
  },
});

export default slice.reducer;

export const {PutUserSuccess, setisLoading} = slice.actions;

export const createProfile = (userData, id) => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('userData', userData, id, token);
    const response = await axiosInstance.put(
      `/user/createprofile/${id}`,
      {userData},
      {
        headers: {
          Authorization: '', // add the token to the request header
        },
      },
    );

    console.log('Put profile Result:', response.data);

    // Assuming getAudioTextSuccess is an action that handles the successful transcription
    dispatch(PutUserSuccess(response.data));

    return response;
  } catch (error) {
    console.error('Error during transcription:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    dispatch(slice.actions.hasError(error));
  }
};
