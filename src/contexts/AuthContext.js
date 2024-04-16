import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import asyncStorageAvailable from '../utils/asyncStorageAvailable';
import axiosInstance from '../utils/axios';
import {isValidToken, jwtDecode, setSession} from '../utils/auth';
// import {HOST_API_KEY} from '@env';

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  isRegister: false,
  isForgotPassword: false,
  isVerifyEmail: false,
  isCheckCode: false,
  isChangePwd: false,
  user: null,
  users: [],
  email: null,
  access: null,
  data: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      isRegister: action.payload.isRegister,
      isForgotPassword: action.payload.isForgotPassword,
      isVerifyEmail: action.payload.isVerifyEmail,
      isCheckCode: action.payload.isCheckCode,
      isChangePwd: action.payload.isChangePwd,
      user: action.payload.user,
      users: action.payload.users,
      email: action.payload.email,
      access: action.payload.access,
      data: action.payload.data,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      isAuthenticated: action.payload.isAuthenticated,
      users: action.payload.users,
      user: action.payload.user,
      access: action.payload.access,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      isRegister: action.payload.isRegister,
      data: action.payload.data,
    };
  }
  if (action.type === 'FORGOTPASS') {
    return {
      ...state,
      isForgotPassword: true,
      email: action.payload.email,
    };
  }
  if (action.type === 'SENDVERIFY') {
    return {
      ...state,
      isVerifyEmail: true,
    };
  }
  if (action.type === 'CHECKCODE') {
    return {
      ...state,
      isCheckCode: true,
    };
  }
  if (action.type === 'UPDATE') {
    return {
      ...state,
      isChangePwd: true,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      users: [],
      access: null,
      email: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

const AuthContext = createContext();

const storageAvailable = asyncStorageAvailable();

// ----------------------------------------------------------------------

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  let expiredTimer;

  // const storageAvailable = asyncStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable
        ? await AsyncStorage.getItem('accessToken')
        : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const {id} = jwtDecode(accessToken);

        console.log('-------jwtDecode-----', id);

        if (id) {
          dispatch({
            type: 'INITIAL',
            payload: {
              isAuthenticated: false,
              isRegister: false,
              isForgotPassword: false,
              isChangePwd: false,
              isVerifyEmail: false,
              isCheckCode: false,
              // user,
            },
          });
        } else {
          dispatch({
            type: 'INITIAL',
            payload: {
              isAuthenticated: false,
              isRegister: false,
              isForgotPassword: false,
              isVerifyEmail: false,
              isCheckCode: false,
              isChangePwd: false,
              user: null,
            },
          });
        }
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            isRegister: false,
            isForgotPassword: false,
            isCheckCode: false,
            isVerifyEmail: false,
            isChangePwd: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          isForgotPassword: false,
          isRegister: false,
          isVerifyEmail: false,
          isCheckCode: false,
          isChangePwd: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/signin', {
        email,
        password,
      });
      console.log('---------------data---------------', response.data);
      if (response.data.code === 410) {
        dispatch({
          type: 'LOGIN',
          payload: {
            isAuthenticated: false,
            user: response.data.message,
          },
        });
      } else {
        const {accessToken, user} = response.data.data;
        setSession(accessToken);
        const {exp} = jwtDecode(accessToken);
        await tokenExpired(exp);
        dispatch({
          type: 'LOGIN',
          payload: {
            isAuthenticated: true,
            users: user,
            access: accessToken,
          },
        });
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Error data:', error.response.data);
        console.log('Error status:', error.response.status);
        console.log('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error message:', error.message);
      }
      console.log('Error config:', error.config);

      throw (error && error.response && error.response.data) || error;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // REGISTER
  const register = useCallback(async (email, password) => {
    try {
      const registerResponse = await axiosInstance.post('/auth/signup/', {
        email,
        password,
      });

      console.log('register==========', registerResponse.data);
      if (registerResponse.data.code === 201) {
        dispatch({
          type: 'REGISTER',
          payload: {
            isRegister: true,
            data: registerResponse.data,
          },
        });
      } else if (registerResponse.data.code === 407) {
        dispatch({
          type: 'REGISTER',
          payload: {
            isRegister: true,
            data: registerResponse.data,
          },
        });
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Error data:', error.response.data);
        console.log('Error status:', error.response.status);
        console.log('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error message:', error.message);
      }
      console.log('Error config:', error.config);

      throw (error && error.response && error.response.data) || error;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearData = useCallback(async => {
    dispatch({
      type: 'INITIAL',
      payload: {
        isAuthenticated: false,
        isRegister: false,
        isForgotPassword: false,
        isVerifyEmail: false,
        isCheckCode: false,
        isChangePwd: false,
        user: null,
        data: null,
        email: null,
        access: null,
        users: [],
      },
    });
  }, []);

  // ForgetPassword
  const forgotPassword = useCallback(async email => {
    console.log('---------email---------', email);
    const reponse = await axiosInstance.post('/auth/forgotPassword', {email});
    console.log('==================', reponse.data);
    const res = reponse.data;
    if (res.code === 200) {
      // AsyncStorage.setItem('current', res.data);
      dispatch({
        type: 'FORGOTPASS',
        payload: {
          email: email,
        },
      });
      return true;
    } else {
      return false;
    }
  }, []);

  // CheckCode
  const checkCode = useCallback(async (email, code) => {
    console.log('---------email---------', email);
    const reponse = await axiosInstance.post('/auth/verifyCode', {
      email,
      code,
    });
    console.log('==================', reponse.data);
    const res = reponse.data;
    if (res.code === 200) {
      AsyncStorage.setItem('current', res.data);
      dispatch({
        type: 'CHECKCODE',
        payload: {
          // email: email,
        },
      });
      return true;
    } else {
      return false;
    }
  }, []);

  // Resend
  const resend = useCallback(async data => {
    const response = await axiosInstance.post('/auth/resendCode', {
      email: data,
    });
    const res = response.data;
    if (res.code === 'SUCCESS') {
      return true;
    } else {
      return false;
    }
  }, []);

  // ChangePWD
  const changePassword = useCallback(async (email, password) => {
    const response = await axiosInstance.post('/auth/resetPassword', {
      email,
      password,
    });
    console.log('090909', response.data);
    const res = response.data;
    if (res.code === 200) {
      AsyncStorage.removeItem('current');
      dispatch({
        type: 'UPDATE',
      });
    } else {
      return res.message;
    }
  }, []);

  const tokenExpired = async exp => {
    const currentTime = Date.now();

    const timeLeft =
      exp * 1000 - currentTime > 3600 * 1000 * 24 * 14
        ? 3600 * 1000 * 24 * 14
        : exp * 1000 - currentTime;

    clearTimeout(expiredTimer);

    expiredTimer = setTimeout(async () => {
      console.log('Token expired');

      logout();
      await AsyncStorage.removeItem('accessToken');
    }, timeLeft);
  };

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      isRegister: state.isRegister,
      isForgotPassword: state.isForgotPassword,
      isVerifyEmail: state.isVerifyEmail,
      isCheckCode: state.isCheckCode,
      user: state.user,
      access: state.access,
      email: state.email,
      data: state.data,
      users: state.users,
      isChangePwd: state.isChangePwd,
      method: 'jwt',
      initialize,
      login,
      logout,
      register,
      checkCode,
      forgotPassword,
      logout,
      resend,
      clearData,
      changePassword,
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.isRegister,
      state.isForgotPassword,
      state.isVerifyEmail,
      state.isCheckCode,
      state.user,
      state.users,
      state.access,
      state.email,
      state.data,
      state.isChangePwd,
      initialize,
      login,
      logout,
      register,
      checkCode,
      forgotPassword,
      logout,
      resend,
      clearData,
      changePassword,
    ],
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export {AuthProvider, useAuth};
