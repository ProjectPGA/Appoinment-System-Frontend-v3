import { AxiosHeaders, AxiosRequestConfig } from 'axios';

/**
 * The function `getRequestConfig` returns an object with headers for JSON content and an option to throw
 * global errors.
 *
 * @returns An object of type JsonHeaders is being returned
 */
export const getRequestConfig: () => AxiosRequestConfig = () => {
  const headers: AxiosHeaders = new AxiosHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  const requestConfig: AxiosRequestConfig = {
    headers: headers,
    withCredentials: true,
  };
  return requestConfig;
};
