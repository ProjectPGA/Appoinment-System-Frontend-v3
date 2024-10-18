import { AxiosError, HttpStatusCode } from 'axios';

export type THttpError = Error | AxiosError | null;

export enum GlobalErrorHandlerMessages {
  Unrecoverable = 'Unrecoverable error!! Error is null!',
  BadRequest = 'The server could not understand the request due to invalid syntax.',
  Unauthorized = 'You are not authorized to access this resource. Please authenticate yourself.',
  Forbidden = 'Access to the requested resource is forbidden.',
  NotFound = 'The requested resource could not be found on the server.',
  RequestTimeout = 'The server timed out waiting for the request.',
  TooManyRequests = 'You have exceeded the rate limit. Please try again later.',
  InternalServerError = 'The server encountered an internal error and was unable to complete your request.',
  BadGateway = 'The server received an invalid response from the upstream server.',
  ServiceUnavailable = 'The server is currently unavailable. Please try again later.',
  GatewayTimeout = 'The server did not receive a timely response from the upstream server.',
  ECONNABORTED = 'The request was aborted due to a timeout.',
  ERR_NETWORK = 'A network error occurred while making the request.',
  ERR_INVALID_URL = 'The URL provided for the request is invalid.',
  ERR_BAD_REQUEST = 'The request to the server is invalid or malformed.',
  ERR_DEPRECATED = 'The functionality used in the request is deprecated and no longer supported. Please update your code.',
  ERR_BAD_OPTION_VALUE = 'The value provided for an option in the request is invalid.',
  ERR_BAD_OPTION = 'An invalid option was provided in the request.',
  ERR_BAD_RESPONSE = 'The response received from the server is invalid or malformed.',
  ERR_CANCELED = 'The request was canceled before completion.',
  ETIMEDOUT = 'The request timed out before receiving a response.',
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
  [HttpStatusCode.BadRequest]: GlobalErrorHandlerMessages.BadRequest,
  [HttpStatusCode.Unauthorized]: GlobalErrorHandlerMessages.Unauthorized,
  [HttpStatusCode.Forbidden]: GlobalErrorHandlerMessages.Forbidden,
  [HttpStatusCode.NotFound]: GlobalErrorHandlerMessages.NotFound,
  [HttpStatusCode.RequestTimeout]: GlobalErrorHandlerMessages.RequestTimeout,
  [HttpStatusCode.TooManyRequests]: GlobalErrorHandlerMessages.TooManyRequests,
  [HttpStatusCode.InternalServerError]:
    GlobalErrorHandlerMessages.InternalServerError,
  [HttpStatusCode.BadGateway]: GlobalErrorHandlerMessages.BadGateway,
  [HttpStatusCode.ServiceUnavailable]:
    GlobalErrorHandlerMessages.ServiceUnavailable,
  [HttpStatusCode.GatewayTimeout]: GlobalErrorHandlerMessages.GatewayTimeout,
  [AxiosError.ECONNABORTED]: GlobalErrorHandlerMessages.ECONNABORTED,
  [AxiosError.ERR_NETWORK]: GlobalErrorHandlerMessages.ERR_NETWORK,
  [AxiosError.ERR_INVALID_URL]: GlobalErrorHandlerMessages.ERR_INVALID_URL,
  [AxiosError.ERR_BAD_REQUEST]: GlobalErrorHandlerMessages.ERR_BAD_REQUEST,
  [AxiosError.ERR_DEPRECATED]: GlobalErrorHandlerMessages.ERR_DEPRECATED,
  [AxiosError.ERR_BAD_OPTION_VALUE]:
    GlobalErrorHandlerMessages.ERR_BAD_OPTION_VALUE,
  [AxiosError.ERR_BAD_OPTION]: GlobalErrorHandlerMessages.ERR_BAD_OPTION,
  [AxiosError.ERR_BAD_RESPONSE]: GlobalErrorHandlerMessages.ERR_BAD_RESPONSE,
  [AxiosError.ERR_CANCELED]: GlobalErrorHandlerMessages.ERR_CANCELED,
  [AxiosError.ETIMEDOUT]: GlobalErrorHandlerMessages.ETIMEDOUT,
};
