import axios, { AxiosInstance } from 'axios';
import {
  THttpError,
  globalErrorHandlers,
} from '@/webservices/models/http/ErrorHandler';
import ErrorHandlerRegistry from '@/webservices/models/http/ErrorHandlerRegistry';

declare module 'axios' {
  export interface AxiosRequestConfig {
    throwGlobalErrors?: boolean;
    silent?: boolean;
  }
}

// create ours globalHandlers object
const globalHandlers = new ErrorHandlerRegistry();

globalHandlers.registerMany(globalErrorHandlers);

/**
 * The function `createHttpInstance` creates an Axios instance with a response error interceptor.
 * @returns An instance of an Axios HTTP client with an interceptor for handling response errors.
 */
function createHttpInstance() {
  const instance = axios.create({});
  const responseError = (error: THttpError) =>
    globalHandlers.resposeErrorHandler(error);
  instance.interceptors.response.use(undefined, responseError);
  return instance;
}

const axiosInstance: AxiosInstance = createHttpInstance();

export default axiosInstance;
