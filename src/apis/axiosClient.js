import axios from 'axios';
import { baseURL } from 'src/utils/constants';
import { StorageConstants } from 'src/utils/enum';

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem(StorageConstants.ACCESS_TOKEN);
    // const token = process.env.TOKEN;
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosClient;
