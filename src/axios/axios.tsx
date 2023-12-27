import axios, {
    AxiosInstance,
    AxiosError,
    InternalAxiosRequestConfig,
  } from 'axios';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import axiosRetry from 'axios-retry';
import { BASE_URL } from '../screens/utils/constants/routes';
//   import { BASE_URL } from '../constants/endpoints';

  
  
  const myHeaders = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "Multipart/form-data",
  };
  
  
  
  const axiosInstance: AxiosInstance = axios.create({
    baseURL:BASE_URL ,
    headers: myHeaders,
  });
  
  // Set a default timeout of 10 seconds for all requests
  axiosInstance.defaults.timeout = 100000;
  
  // Set the Content-Type header to application/json for all POST requests
  axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
  
  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );
  
  // Add a retry mechanism to the axios instance with exponential backoff
  axiosRetry(axiosInstance, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
  });
  
  axiosInstance.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      
      const status = error.response?.status;
      let errorMessage = 'An error occurred. Please try again later.';
  
      if (status === 401) {
        errorMessage = 'Unauthorized. Please login again.';
      } else if (status === 404) {
        errorMessage = 'Not found.';
      } else if (status === 500) {
        errorMessage = 'Internal server error. Please try again later.';
      }
  
      // showMessage({
      //   message: "Error",
      //   description: errorMessage,
      //   type: 'danger',
      //   icon:"danger"
      // })
      console.log(`There was an  error is ${JSON.stringify(error.response?.data)}}`)
  
      return Promise.reject(error);
    },
  );
  
  export default axiosInstance;
  
  