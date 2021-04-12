import axios from 'axios';

const baseUrl = 'http://localhost:3030/api';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: localStorage.getItem('accessToken')
      ? 'Bearer ' + localStorage.getItem('accessToken')
      : null,
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
