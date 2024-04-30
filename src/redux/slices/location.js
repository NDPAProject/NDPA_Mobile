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
  multitransitInfo: [],
  geomtrytInfo: [],
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
    GetMultitransitdatail(state, action) {
      state.isloading = true;
      state.multitransitInfo = action.payload;
    },
    GetGeometrydatail(state, action) {
      state.isloading = true;
      state.geomtrytInfo = action.payload;
    },
  },
});

export default slice.reducer;

export const {GetTransitdatail, GetMultitransitdatail, GetGeometrydatail} =
  slice.actions;

export const GetTransit = (coordinates, mode) => async dispatch => {
  try {
    let URL = '';
    console.log('mode ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', mode);
    if (mode)
      URL = `https://maps.googleapis.com/maps/api/directions/json?origin=${coordinates[0].latitude},${coordinates[0].longitude}&destination=${coordinates[2].latitude},${coordinates[2].longitude}&mode=transit&transit_mode=${mode}&key=${GOOGLE_API_KEY_ANDROID___}`;

    const response = await axiosInstance.get(URL);
    const data = response.data;

    if (data) {
      dispatch(GetTransitdatail(data));
    }

    return data;
  } catch (error) {
    console.error('Error during transcription:', error);
    dispatch(slice.actions.hasError(error));
  }
};

export const GetMultitransit = (coordinates, mode) => async dispatch => {
  try {
    const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${
      coordinates[0].latitude
    },${coordinates[0].longitude}&destinations=${coordinates[2].latitude},${
      coordinates[2].longitude
    }&mode=${mode.toLowerCase()}&key=${GOOGLE_API_KEY_ANDROID___}`;

    const response = await axiosInstance.get(URL);
    const data = response.data;

    if (data) {
      dispatch(GetMultitransitdatail(data));
    }

    return data;
  } catch (error) {
    console.error('Error during transcription:', error);
    dispatch(slice.actions.hasError(error));
  }
};

export const GetGeometry = placeId => async dispatch => {
  try {
    const URL = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_API_KEY_ANDROID___}`;

    const response = await axiosInstance.get(URL);
    const data = response.data;

    if (data) {
      dispatch(GetGeometrydatail(data));
    }

    return data;
  } catch (error) {
    console.error('Error during transcription:', error);
    dispatch(slice.actions.hasError(error));
  }
};
