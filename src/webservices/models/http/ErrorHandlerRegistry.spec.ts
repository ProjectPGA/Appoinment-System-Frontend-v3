import {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from 'axios';
import ErrorHandlerRegistry, {
  isErrorHandlerObject,
} from './ErrorHandlerRegistry';

jest.mock('@grafana/faro-web-sdk', () => {
  const faroMock = {
    faro: {
      api: {
        pushError: jest.fn(),
      },
    },
  };
  return faroMock;
});

import { faro } from '@grafana/faro-web-sdk';
import { ErrorHandlerObject, THttpError } from './ErrorHandler';

beforeEach(() => {
  jest.clearAllMocks();
});

enum errorHandlerMessages {
  Unauthorized = 'Error Handler Unauthorized',
  Forbidden = 'Error Handler Forbidden',
  BadGateway = 'Error Handler BadGateway',
}

const errorHandlers = {
  [HttpStatusCode.Unauthorized]: { message: errorHandlerMessages.Unauthorized },
  [HttpStatusCode.Forbidden]: { message: errorHandlerMessages.Forbidden },
  [HttpStatusCode.BadGateway]: errorHandlerMessages.BadGateway,
  [HttpStatusCode.GatewayTimeout]: jest
    .fn()
    .mockImplementation((error?: THttpError): boolean => {
      faro.api.pushError(new Error(error?.message));
      return true;
    }),
  [HttpStatusCode.InternalServerError]: jest
    .fn()
    .mockImplementation((error?: THttpError): ErrorHandlerObject => {
      return {
        message: error?.message,
      };
    }),
  [HttpStatusCode.Conflict]: {},
  Error: {
    message: 'Generic Error',
  },
  [HttpStatusCode.Locked]: {
    after: jest
      .fn()
      .mockImplementation(
        (error?: THttpError, options?: ErrorHandlerObject) => {
          const errorMessage = options?.message ?? error?.message;

          return errorMessage;
        }
      ),
    before: jest
      .fn()
      .mockImplementation(
        (error?: THttpError, options?: ErrorHandlerObject) => {
          const errorMessage = options?.message ?? error?.message;

          return errorMessage;
        }
      ),
  },
};

describe('01 ErrorHanlderRegistry: isErrorHandlerObject function', () => {
  it('01 - 01 Should return true', () => {
    const handlerErrorObject = {
      message: 'Hello test',
    };

    const response = isErrorHandlerObject(handlerErrorObject);

    expect(response).toBe(true);
  });

  it('01 - 02 Should return false', () => {
    const handlerErrorObject = undefined;

    const response = isErrorHandlerObject(handlerErrorObject);

    expect(response).toBe(false);
  });
});

describe('02 ErrorHandlerRegistry: register function', () => {
  const errorHandlerRegistry = new ErrorHandlerRegistry(
    undefined,
    errorHandlers
  );

  it('02 - 01 Should register an error handler', () => {
    const findResultToBeUndefined = errorHandlerRegistry.find('Not valid key');

    expect(findResultToBeUndefined).toBe(undefined);

    errorHandlerRegistry.register(HttpStatusCode.FailedDependency.toString(), {
      message: 'Failed Dependency',
    });

    const findResult = errorHandlerRegistry.find(
      HttpStatusCode.FailedDependency.toString()
    );

    expect(findResult).toEqual({ message: 'Failed Dependency' });
  });
});

describe('03 ErrorHandlerRegistry: unregister function', () => {
  const errorHandlerRegistry = new ErrorHandlerRegistry(
    undefined,
    errorHandlers
  );

  it('03 - 01 Should unregister an error handler', () => {
    errorHandlerRegistry.unregister(HttpStatusCode.Unauthorized.toString());

    const findResult = errorHandlerRegistry.find(
      HttpStatusCode.Unauthorized.toString()
    );

    expect(findResult).toBe(undefined);
  });
});

describe('04 ErrorHandlerRegistry: handleError function', () => {
  const errorHandlerRegistry = new ErrorHandlerRegistry(
    undefined,
    errorHandlers
  );

  const handleErrorObjectSpy = jest.spyOn(
    errorHandlerRegistry,
    'handleErrorObject'
  );

  const handleErrorSpy = jest.spyOn(errorHandlerRegistry, 'handleError');

  it('04 - 01 Should use handleError function, throw error to grafana and return true', () => {
    const axiosError = new AxiosError(
      'Axios Error Forbidden',
      HttpStatusCode.Forbidden.toString()
    );

    const errorResponse = errorHandlerRegistry.resposeErrorHandler(axiosError);

    expect(errorResponse).toBe(true);
    expect(handleErrorObjectSpy).toHaveBeenCalledWith(axiosError, {
      message: errorHandlerMessages.Forbidden,
    });
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(errorHandlerMessages.Forbidden)
    );
  });

  it('04 - 02 Should use handleError function, not throw error to grafana and return false', () => {
    const axiosError = new AxiosError('Not valid key', 'Not valid key');

    const errorResponse = errorHandlerRegistry.resposeErrorHandler(axiosError);

    expect(handleErrorObjectSpy).toHaveBeenCalledTimes(0);
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledTimes(0);
    expect(errorResponse).toBe(false);
  });

  it('04 - 03 Throw handler type of string', () => {
    const axiosError = new AxiosError(
      'Axios Error Bad Gateway',
      HttpStatusCode.BadGateway.toString()
    );

    const errorResponse = errorHandlerRegistry.resposeErrorHandler(axiosError);

    expect(errorResponse).toBe(true);
    expect(handleErrorObjectSpy).toHaveBeenCalledWith(axiosError, {
      message: errorHandlerMessages.BadGateway,
    });
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(errorHandlerMessages.BadGateway)
    );
  });

  it('04 - 04 Throw handler type of function that return true and responseErrorHandler function return true', () => {
    const errorHandlerFunction = errorHandlerRegistry.find(
      HttpStatusCode.GatewayTimeout.toString()
    );

    const axiosError = new AxiosError(
      'Axios Error Gateway time out',
      HttpStatusCode.GatewayTimeout.toString()
    );

    const errorResponse = errorHandlerRegistry.resposeErrorHandler(axiosError);

    expect(errorResponse).toBe(true);
    expect(handleErrorObjectSpy).toHaveBeenCalledTimes(0);
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(errorHandlerFunction).toHaveBeenCalledWith(axiosError);
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(axiosError.message)
    );
  });

  it('04 - 05 Throw handler type of function that return an ErrorHandlerObject and responseErrorHandler function return true', () => {
    const axiosError = new AxiosError(
      'Axios Internal Server Error',
      HttpStatusCode.InternalServerError.toString()
    );

    const errorResponse = errorHandlerRegistry.resposeErrorHandler(axiosError);

    expect(errorResponse).toBe(true);
    expect(handleErrorObjectSpy).toHaveBeenCalledWith(axiosError, {
      message: axiosError.message,
    });
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(axiosError.message)
    );
  });

  it('04 - 06 Throw empty handler and handleError function must return false', () => {
    const axiosError = new AxiosError(
      'Axios Conflict Error',
      HttpStatusCode.Conflict.toString()
    );

    const errorResponse = errorHandlerRegistry.resposeErrorHandler(axiosError);

    expect(errorResponse).toBe(false);
    expect(handleErrorObjectSpy).toHaveBeenCalledTimes(0);
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledTimes(0);
  });
});

describe('05 ErrorHandlerRegistry: responseErrorHandler function', () => {
  it('05 - 01 Receive error in null and must trow an error', () => {
    const errorHandlerRegistry = new ErrorHandlerRegistry(
      undefined,
      errorHandlers
    );

    expect(() => {
      errorHandlerRegistry.resposeErrorHandler(null);
    }).toThrow('Unrecoverrable error!! Error is null!');
  });

  it('05 - 02 Receive error in null and must throw an error', () => {
    const errorHandlerRegistry = new ErrorHandlerRegistry(
      undefined,
      errorHandlers
    );

    const headers: AxiosHeaders = new AxiosHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    const requestConfig: InternalAxiosRequestConfig = {
      headers: headers,
    };

    const axiosResponse: AxiosResponse = {
      data: {
        code: 2,
        description: 'Basic error throwed',
      },
      status: 4,
      statusText: 'Error',
      headers: {
        Accept: 'application/json',
      },
      config: requestConfig,
    };

    const axiosError = new AxiosError(
      'Basic error',
      '2',
      undefined,
      undefined,
      axiosResponse
    );

    const handleErrorObjectSpy = jest.spyOn(
      errorHandlerRegistry,
      'handleErrorObject'
    );

    const handleErrorSpy = jest.spyOn(errorHandlerRegistry, 'handleError');

    const errorResponse = errorHandlerRegistry.resposeErrorHandler(axiosError);

    expect(errorResponse).toBe(true);
    expect(handleErrorObjectSpy).toHaveBeenCalledWith(axiosError, {
      message: 'Basic error throwed',
    });
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error('Basic error throwed')
    );
  });

  it('05 - 03 Receive an error instanceof Error instead AxiosError and must use handleError function correctly', () => {
    const errorHandlerRegistry = new ErrorHandlerRegistry(
      undefined,
      errorHandlers
    );

    const errorInstance = new Error('Error typeof Error');

    const handleErrorObjectSpy = jest.spyOn(
      errorHandlerRegistry,
      'handleErrorObject'
    );

    const handleErrorSpy = jest.spyOn(errorHandlerRegistry, 'handleError');

    const errorResponse =
      errorHandlerRegistry.resposeErrorHandler(errorInstance);

    expect(errorResponse).toBe(true);
    expect(handleErrorObjectSpy).toHaveBeenCalledWith(errorInstance, {
      message: 'Generic Error',
    });
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(new Error('Generic Error'));
  });

  it('05 - 04 Receive an error that is not typeof Error or AxiosError and must throw the error', () => {
    const errorHandlerRegistry = new ErrorHandlerRegistry(
      undefined,
      errorHandlers
    );

    // Use any to force an error object that is not typeof Error or AxiosError
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const personalizedError: any = {
      message: 'Other Error',
    };

    expect(() => {
      errorHandlerRegistry.resposeErrorHandler(personalizedError);
    }).toThrow('Other Error');
  });

  it('05 - 07 Receive an error that not contain a message property in the errorHandler config. Must throw the message of the error instance', () => {
    const errorHandlerRegistry = new ErrorHandlerRegistry(
      undefined,
      errorHandlers
    );

    const axiosError = new AxiosError(
      'Axios locked error',
      HttpStatusCode.Locked.toString()
    );

    console.info(axiosError);

    const response = errorHandlerRegistry.resposeErrorHandler(axiosError);

    expect(response).toBe(true);
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error('Axios locked error')
    );
  });
});

describe('06 - ErrorHandlerRegistry: constructor', () => {
  it('06 - 01 Create a ErrorHandlerRegistry with parent', () => {
    const parentErrorHandlerRegistry = new ErrorHandlerRegistry(undefined, {
      56: {
        message: 'test',
      },
    });
    const errorHandlerRegistry = new ErrorHandlerRegistry(
      parentErrorHandlerRegistry,
      errorHandlers
    );

    const axiosError = new AxiosError('Locked', '56');

    const response = errorHandlerRegistry.resposeErrorHandler(axiosError);

    expect(response).toBe(true);
  });
});
