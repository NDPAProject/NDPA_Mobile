import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// utils
import {AZURE_OCR_API_ENDPOINT, AZURE_OCR_API_KEY} from '@env';
import {dispatch} from '../store';

const initialState = {
  isloading: false,
  error: null,
  audioTxt: null,
  txtAudio: null,
};

const slice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    startLoading(state) {
      state.isloading = true;
    },

    hasError(state, action) {
      state.isloading = false;
      state.error = action.payload;
    },

    getScanResult(state, action) {
      state.isloading = true;
      state.scanData = action.payload;
    },

    setisLoading(state, action) {
      state.isloading = false;
      state.scanData = action.payload;
    },
  },
});

export default slice.reducer;

export const {getScanResult, setisLoading} = slice.actions;

export const analyzeImage = imageData => async dispatch => {
  try {
    console.log(
      '--------------------',
      AZURE_OCR_API_ENDPOINT.trim(),
      AZURE_OCR_API_KEY.trim(),
    );
    const response = await axios.post(AZURE_OCR_API_ENDPOINT, imageData, {
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_OCR_API_KEY.trim(),
        'Content-Type': 'application/octet-stream',
      },
    });
    // const response = await fetch(AZURE_OCR_API_ENDPOINT.trim(), {
    //   method: 'POST',
    //   headers: {
    //     'Ocp-Apim-Subscription-Key': AZURE_OCR_API_KEY.trim(),
    //     'Content-Type': 'application/octet-stream',
    //   },
    //   body: imageData,
    // });
    const data = await response.json();
    console.log('------------data--------', data);
    dispatch(getScanResult(data));
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const setStateFunc = data => async dispatch => {
  try {
    console.log('---=======setStateFunc=====-------', data);
    dispatch(setisLoading(data));
  } catch (error) {
    console.error('Error:', error);
  }
};
