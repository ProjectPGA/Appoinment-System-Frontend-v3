import { JsonHeaders } from './models/http/JsonHeaders';

/**
 * The function `getJsonHeaders` returns an object with headers for JSON content and an option to throw
 * global errors.
 *
 * @param [throwGlobalErrors=false] - The `throwGlobalErrors` parameter is a boolean flag that
 * determines whether global errors should be thrown or not. When set to `true`, global errors will be
 * thrown.
 *
 * @returns An object of type JsonHeaders is being returned
 */
export const getJsonHeaders: (throwGlobalErrors?: boolean) => JsonHeaders = (
  throwGlobalErrors = false
) => {
  const jsonHeaders: JsonHeaders = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,
    throwGlobalErrors: throwGlobalErrors,
  };
  return jsonHeaders;
};
