import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  getAccessToken,
  removeAccessToken,
} from 'utils/authTokens';
import { CustomError } from './CustomError';
import { API_BASE_URL } from './apiRoutes';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const requestParser = <T>(result: AxiosResponse<T>): T => result.data;
const errorHandler = <T>(error: AxiosError<T>): Promise<never> =>
  Promise.reject(new CustomError(error));

axiosInstance.interceptors.request.use(request => request, errorHandler);

const notifyError = (msg: string) => toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  }
);

axiosInstance.interceptors.response.use(requestParser, error => {
  if (error.response?.status === 401) {
    removeAccessToken();
  }
  notifyError(error.message);
  return errorHandler(error);
});

axiosInstance.interceptors.request.use(async request => {
  if (request.url) {
    const accessToken = getAccessToken();

    if (accessToken && request.headers) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return request;
});

export { axiosInstance };
