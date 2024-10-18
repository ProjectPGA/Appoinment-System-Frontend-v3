import { AxiosError, HttpStatusCode } from 'axios';
import { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import ErrorHandlerRegistry, {
  isErrorHandlerObject,
} from './ErrorHandlerRegistry';
import { GlobalErrorHandlerMessages } from './ErrorHandler';
import { expect, jest } from '@jest/globals';
import { SpyInstance } from 'jest-mock';
import { HttpData } from '@/webservices/models/http/HttpData';

jest.mock('@grafana/faro-web-sdk', () => ({
  faro: {
    api: {
      pushError: jest.fn(),
    },
  },
}));

import { faro } from '@grafana/faro-web-sdk';
import { ErrorHandlerObject, THttpError } from './ErrorHandler';

beforeEach(() => {
  jest.clearAllMocks();
});

enum ErrorHandlerMessages {
  Unauthorized = 'Error Handler Unauthorized',
  Forbidden = 'Error Handler Forbidden',
  BadGateway = 'Error Handler Bad Gateway',
  GenericError = 'Error Handler Generic Error',
}

type ErrorHandlerFunction = (
  error?: THttpError
) => boolean | ErrorHandlerObject;

const errorHandlers: Record<string, ErrorHandlerObject | ErrorHandlerFunction> =
  {
    [HttpStatusCode.Unauthorized]: {
      message: ErrorHandlerMessages.Unauthorized,
    },
    [HttpStatusCode.Forbidden]: { message: ErrorHandlerMessages.Forbidden },
    [HttpStatusCode.BadGateway]: { message: ErrorHandlerMessages.BadGateway },
    [HttpStatusCode.GatewayTimeout]: (error?: THttpError): boolean => {
      faro.api.pushError(new Error(error?.message));
      return true;
    },
    [HttpStatusCode.InternalServerError]: (
      error?: THttpError
    ): ErrorHandlerObject => ({
      message: error?.message || 'Internal Server Error',
    }),
    [HttpStatusCode.Conflict]: {},
    Error: {
      message: ErrorHandlerMessages.GenericError,
    },
    [HttpStatusCode.Locked]: {
      before: (error?: THttpError, options?: ErrorHandlerObject) =>
        options?.message || error?.message,
      after: (error?: THttpError, options?: ErrorHandlerObject) =>
        options?.message || error?.message,
    },
  };

describe('ErrorHandlerRegistry: isErrorHandlerObject', () => {
  it('should return true for valid ErrorHandlerObject', () => {
    const handlerErrorObject = { message: 'Test message' };
    expect(isErrorHandlerObject(handlerErrorObject)).toBe(true);
  });

  it('should return false for undefined', () => {
    expect(isErrorHandlerObject(undefined)).toBe(false);
  });
});

describe('ErrorHandlerRegistry: register', () => {
  let errorHandlerRegistry: ErrorHandlerRegistry;

  beforeEach(() => {
    errorHandlerRegistry = new ErrorHandlerRegistry(undefined, errorHandlers);
  });

  it('should register an error handler', () => {
    expect(errorHandlerRegistry.find('InvalidKey')).toBeUndefined();

    errorHandlerRegistry.register(HttpStatusCode.FailedDependency.toString(), {
      message: 'Failed Dependency',
    });

    expect(
      errorHandlerRegistry.find(HttpStatusCode.FailedDependency.toString())
    ).toEqual({ message: 'Failed Dependency' });
  });
});

describe('ErrorHandlerRegistry: unregister', () => {
  let errorHandlerRegistry: ErrorHandlerRegistry;

  beforeEach(() => {
    errorHandlerRegistry = new ErrorHandlerRegistry(undefined, errorHandlers);
  });

  it('should unregister an error handler', () => {
    errorHandlerRegistry.unregister(HttpStatusCode.Unauthorized.toString());

    expect(
      errorHandlerRegistry.find(HttpStatusCode.Unauthorized.toString())
    ).toBeUndefined();
  });
});

describe('ErrorHandlerRegistry: handleError', () => {
  let errorHandlerRegistry: ErrorHandlerRegistry;
  let handleErrorObjectSpy: SpyInstance<
    (error: THttpError, options?: ErrorHandlerObject) => boolean
  >;
  let handleErrorSpy: SpyInstance<
    (seek: string | (string | undefined)[], error: THttpError) => boolean
  >;

  beforeEach(() => {
    errorHandlerRegistry = new ErrorHandlerRegistry(undefined, errorHandlers);
    handleErrorObjectSpy = jest.spyOn(
      errorHandlerRegistry,
      'handleErrorObject'
    );
    handleErrorSpy = jest.spyOn(errorHandlerRegistry, 'handleError');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle Forbidden error and push to Grafana', () => {
    const axiosError = new AxiosError(ErrorHandlerMessages.Forbidden);
    axiosError.response = {
      status: HttpStatusCode.Forbidden,
      data: { code: HttpStatusCode.Forbidden.toString() } as HttpData,
      statusText: '',
      headers: new AxiosHeaders(),
      config: { headers: new AxiosHeaders() } as InternalAxiosRequestConfig,
    };

    expect(() => {
      errorHandlerRegistry.responseErrorHandler(axiosError);
    }).toThrow(ErrorHandlerMessages.Forbidden);

    expect(handleErrorObjectSpy).toHaveBeenCalledWith(axiosError, {
      message: ErrorHandlerMessages.Forbidden,
    });
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(ErrorHandlerMessages.Forbidden)
    );
  });

  it('should handle unknown error and push to Grafana', () => {
    const axiosError = new AxiosError('Unknown error', 'UnknownCode');

    expect(() => {
      errorHandlerRegistry.responseErrorHandler(axiosError);
    }).toThrow('Unknown error');

    expect(handleErrorObjectSpy).toHaveBeenCalledTimes(1);
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(new Error('Unknown error'));
  });

  it('should handle Bad Gateway error and push to Grafana', () => {
    const axiosError = new AxiosError(
      ErrorHandlerMessages.BadGateway,
      HttpStatusCode.BadGateway.toString()
    );

    expect(() => {
      errorHandlerRegistry.responseErrorHandler(axiosError);
    }).toThrow(ErrorHandlerMessages.BadGateway);

    expect(handleErrorObjectSpy).toHaveBeenCalledWith(axiosError, {
      message: ErrorHandlerMessages.BadGateway,
    });
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(ErrorHandlerMessages.BadGateway)
    );
  });

  it('should handle Gateway Timeout with function handler', () => {
    const axiosError = new AxiosError(
      'Gateway Timeout Error',
      HttpStatusCode.GatewayTimeout.toString()
    );

    expect(() => {
      errorHandlerRegistry.responseErrorHandler(axiosError);
    }).toThrow('Gateway Timeout Error');

    expect(handleErrorObjectSpy).not.toHaveBeenCalled();
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error('Gateway Timeout Error')
    );
  });

  it('should handle Internal Server Error with function returning ErrorHandlerObject', () => {
    const axiosError = new AxiosError(
      'Internal Server Error',
      HttpStatusCode.InternalServerError.toString()
    );

    expect(() => {
      errorHandlerRegistry.responseErrorHandler(axiosError);
    }).toThrow('Internal Server Error');

    expect(handleErrorObjectSpy).toHaveBeenCalledWith(axiosError, {
      message: 'Internal Server Error',
    });
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error('Internal Server Error')
    );
  });

  it('should handle Conflict error with empty handler', () => {
    const axiosError = new AxiosError(
      'Conflict Error',
      HttpStatusCode.Conflict.toString()
    );

    expect(() => {
      errorHandlerRegistry.responseErrorHandler(axiosError);
    }).toThrow('Conflict Error');

    expect(handleErrorObjectSpy).toHaveBeenCalledTimes(1);
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error('Conflict Error')
    );
  });
});

describe('ErrorHandlerRegistry: responseErrorHandler', () => {
  let errorHandlerRegistry: ErrorHandlerRegistry;
  let handleErrorObjectSpy: SpyInstance<
    (error: THttpError, options?: ErrorHandlerObject) => boolean
  >;
  let handleErrorSpy: SpyInstance<
    (seek: string | (string | undefined)[], error: THttpError) => boolean
  >;

  beforeEach(() => {
    errorHandlerRegistry = new ErrorHandlerRegistry(undefined, errorHandlers);
    handleErrorObjectSpy = jest.spyOn(
      errorHandlerRegistry,
      'handleErrorObject'
    );
    handleErrorSpy = jest.spyOn(errorHandlerRegistry, 'handleError');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle null error with unrecoverable message', () => {
    expect(() => {
      errorHandlerRegistry.responseErrorHandler(null);
    }).toThrow(GlobalErrorHandlerMessages.Unrecoverable);

    expect(handleErrorObjectSpy).toHaveBeenCalledTimes(1);

    const errorArgument = handleErrorObjectSpy.mock.calls[0][0];
    expect(errorArgument).toBeInstanceOf(Error);
    expect(errorArgument).toBeInstanceOf(Error);
    expect(errorArgument?.message).toBe(
      GlobalErrorHandlerMessages.Unrecoverable
    );

    expect(handleErrorSpy).not.toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: GlobalErrorHandlerMessages.Unrecoverable,
      })
    );
  });

  it('should handle error not in errorHandlers', () => {
    const axiosError = new AxiosError('Basic error', 'UnknownCode');

    expect(() => {
      errorHandlerRegistry.responseErrorHandler(axiosError);
    }).toThrow('Basic error');

    expect(handleErrorObjectSpy).toHaveBeenCalledWith(axiosError);
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(new Error('Basic error'));
  });

  it('should handle Error instance instead of AxiosError', () => {
    const errorInstance = new Error('Standard Error');

    expect(() => {
      errorHandlerRegistry.responseErrorHandler(errorInstance);
    }).toThrow('Standard Error');

    expect(handleErrorObjectSpy).toHaveBeenCalledWith(errorInstance, {
      message: ErrorHandlerMessages.GenericError,
    });
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(ErrorHandlerMessages.GenericError)
    );
  });

  it('should handle custom error object without Error type', () => {
    const customError = { message: 'Custom Error' };

    expect(() => {
      errorHandlerRegistry.responseErrorHandler(customError as any);
    }).toThrow('Custom Error');

    expect(handleErrorSpy).not.toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(new Error('Custom Error'));
  });

  it('should handle error without message in handler config', () => {
    const axiosError = new AxiosError(
      'Locked Error',
      HttpStatusCode.Locked.toString()
    );

    expect(() => {
      errorHandlerRegistry.responseErrorHandler(axiosError);
    }).toThrow('Locked Error');

    expect(faro.api.pushError).toHaveBeenCalledWith(new Error('Locked Error'));
  });
});

describe('ErrorHandlerRegistry: constructor with parent', () => {
  it('should use parent registry if handler not found', () => {
    const parentRegistry = new ErrorHandlerRegistry(undefined, {
      [HttpStatusCode.NotAcceptable]: {
        message: 'Parent Not Acceptable Error',
      },
    });

    const errorHandlerRegistry = new ErrorHandlerRegistry(
      parentRegistry,
      errorHandlers
    );

    const axiosError = new AxiosError(
      'Not Acceptable Error',
      HttpStatusCode.NotAcceptable.toString()
    );

    const handleErrorObjectSpy = jest.spyOn(
      errorHandlerRegistry,
      'handleErrorObject'
    );
    const handleErrorSpy = jest.spyOn(errorHandlerRegistry, 'handleError');

    expect(() => {
      errorHandlerRegistry.responseErrorHandler(axiosError);
    }).toThrow('Not Acceptable Error');

    expect(handleErrorObjectSpy).toHaveBeenCalledWith(axiosError, {
      message: 'Parent Not Acceptable Error',
    });
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error('Parent Not Acceptable Error')
    );
  });
});
