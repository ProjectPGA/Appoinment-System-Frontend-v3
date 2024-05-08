import { AxiosError } from 'axios';

export type THttpError = Error | AxiosError | null;

export interface ErrorHandlerObject {
  after?(error?: THttpError, options?: ErrorHandlerObject): void;
  before?(error?: THttpError, options?: ErrorHandlerObject): void;
  message?: string;
}

export type ErrorHandlerFunction = (
  error?: THttpError
) => ErrorHandlerObject | boolean | undefined;

export type ErrorHandler = ErrorHandlerFunction | ErrorHandlerObject | string;

export interface ErrorHandlerMany {
  [key: string]: ErrorHandler;
}

export const globalErrorHandlers: ErrorHandlerMany = {
  '400': { message: 'Bad Request' },
  '401': {
    message: 'Unauthorized!',
  },
  '403': { message: 'Forbidden' },
  '404': { message: 'Not Found' },
  '408': { message: 'Request Timeout' },
  '429': { message: 'Too Many Requests' },
  '500': { message: 'Internal Server Error' },
  '502': { message: 'Bad Gateway' },
  '503': { message: 'Service Unavailable' },
  '504': { message: 'Gateway Timeout' },
};
