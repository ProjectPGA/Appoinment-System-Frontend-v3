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
  '404': { message: 'API Page Not Found!' },
  '401': {
    message: 'Unauthorized!',
  },
  '500': { message: 'Server Error' },
};
