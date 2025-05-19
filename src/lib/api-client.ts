import axios, { AxiosError } from 'axios';
import errorHandler, { ErrorResponseData } from '@/services/notifications/error-handler';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponseData>) => {
    errorHandler(error);
    return Promise.reject(error);
  }
);

export default apiClient;
