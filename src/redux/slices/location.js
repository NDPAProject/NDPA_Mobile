import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GOOGLE_API_KEY_ANDROID___} from '@env';

import axiosInstance from '../../utils/axios';
import {dispatch} from '../store';

const initialState = {
  isloading: false,
  error: null,
  message: '',
  up_message: '',
  transitInfo: [],
};

const slice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    startLoading(state) {
      state.isloading = true;
    },

    hasError(state, action) {
      state.isloading = false;
      state.error = action.payload;
    },

    GetTransitdatail(state, action) {
      state.isloading = true;
      state.transitInfo = action.payload;
    },
  },
});

export default slice.reducer;

export const {GetTransitdatail} = slice.actions;

export const GetTransit = (coordinates, mode) => async dispatch => {
  try {
    let response = null;
    fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${coordinates[0].latitude},${coordinates[0].longitude}&destination=${coordinates[1].latitude},${coordinates[1].longitude}&mode=transit&transit_mode=${mode}&key=${GOOGLE_API_KEY_ANDROID___}`,
    )
      .then(response => response.json())
      .then(data => {
        if (data) {
          response = data;
          dispatch(GetTransitdatail(response));
          // console.log('^^^^^^^AAA^^^^^^^^^^^^', data.routes[0].legs[0].steps);
        }
      })
      .catch(err => console.log(err));

    // Assuming getAudioTextSuccess is an action that handles the successful transcription

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
