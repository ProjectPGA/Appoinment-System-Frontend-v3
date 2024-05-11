import { AxiosHeaders, AxiosRequestConfig } from 'axios';

/**
 * The function `getRequestConfig` returns an object with headers for JSON content and an option to throw
 * global errors.
 *
 * @param [throwGlobalErrors=false] - The `throwGlobalErrors` parameter is a boolean flag that
 * determines whether global errors should be thrown or not. When set to `true`, global errors will be
 * thrown.
 *
 * @returns An object of type JsonHeaders is being returned
 */
export const getRequestConfig: (
  throwGlobalErrors?: boolean
) => AxiosRequestConfig = (throwGlobalErrors = false) => {
  const headers: AxiosHeaders = new AxiosHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  const requestConfig: AxiosRequestConfig = {
    headers: headers,
    withCredentials: true,
    throwGlobalErrors: throwGlobalErrors,
  };
  return requestConfig;
};
