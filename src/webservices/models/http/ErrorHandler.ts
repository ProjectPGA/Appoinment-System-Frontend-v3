import { AxiosError, HttpStatusCode } from 'axios';

export type THttpError = Error | AxiosError | null;

export enum GlobalErrorHandlerMessages {
  Unrecoverrable = 'Unrecoverrable error!! Error is null!',
}

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
  [HttpStatusCode.BadRequest]: { message: 'Bad Request' },
  [HttpStatusCode.Unauthorized]: {
    message: 'Unauthorized!',
  },
  [HttpStatusCode.Forbidden]: { message: 'Forbidden' },
  [HttpStatusCode.NotFound]: { message: 'Not Found' },
  [HttpStatusCode.RequestTimeout]: { message: 'Request Timeout' },
  [HttpStatusCode.TooManyRequests]: { message: 'Too Many Requests' },
  [HttpStatusCode.InternalServerError]: { message: 'Internal Server Error' },
  [HttpStatusCode.BadGateway]: { message: 'Bad Gateway' },
  [HttpStatusCode.ServiceUnavailable]: { message: 'Service Unavailable' },
  [HttpStatusCode.GatewayTimeout]: { message: 'Gateway Timeout' },
};
