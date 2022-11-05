import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
} from 'utils/authTokens';
import { CustomError } from './CustomError';
import { API_BASE_URL } from './apiRoutes';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const requestParser = <T>(result: AxiosResponse<T>): T => result.data;
const errorHandler = <T>(error: AxiosError<T>): Promise<never> =>
  Promise.reject(new CustomError(error));

axiosInstance.interceptors.request.use(request => request, errorHandler);

axiosInstance.interceptors.response.use(requestParser, error => {
  if (error.response?.status === 401) {
    removeAccessToken();
  }

  return errorHandler(error);
});

axiosInstance.interceptors.request.use(async request => {
  if (request.url) {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (accessToken && refreshToken && request.headers) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return request;
});

export { axiosInstance };
