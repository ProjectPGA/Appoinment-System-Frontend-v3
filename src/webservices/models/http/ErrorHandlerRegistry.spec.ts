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

import { GlobalErrorHandlerMessages } from './ErrorHandler';

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
  Error = 'Error Handler Generic Error',
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
    message: errorHandlerMessages.Error,
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

  it('04 - 01 Should use handleError function, send error to grafana and throw the error.', () => {
    const axiosError = new AxiosError(
      errorHandlerMessages.Forbidden,
      HttpStatusCode.Forbidden.toString()
    );

    expect(() => {
      errorHandlerRegistry.resposeErrorHandler(axiosError);
    }).toThrow(errorHandlerMessages.Forbidden);

    expect(handleErrorObjectSpy).toHaveBeenCalledWith(axiosError, {
      message: errorHandlerMessages.Forbidden,
    });
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(errorHandlerMessages.Forbidden)
    );
  });

  it('04 - 02 Should use handleError function, not send error to grafana and throw the error', () => {
    const axiosError = new AxiosError('Not valid key', 'Not valid key');

    expect(() => {
      errorHandlerRegistry.resposeErrorHandler(axiosError);
    }).toThrow('Not valid key');

    expect(handleErrorObjectSpy).toHaveBeenCalledTimes(0);
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledTimes(0);
  });

  it('04 - 03 Throw handler type of string, send error to grafana and throw the error.', () => {
    const axiosError = new AxiosError(
      errorHandlerMessages.BadGateway,
      HttpStatusCode.BadGateway.toString()
    );

    expect(() => {
      errorHandlerRegistry.resposeErrorHandler(axiosError);
    }).toThrow(errorHandlerMessages.BadGateway);

    expect(handleErrorObjectSpy).toHaveBeenCalledWith(axiosError, {
      message: errorHandlerMessages.BadGateway,
    });
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(errorHandlerMessages.BadGateway)
    );
  });

  it('04 - 04 Throw handler type of function that return true, send error to grafana and throw the error.', () => {
    const errorHandlerFunction = errorHandlerRegistry.find(
      HttpStatusCode.GatewayTimeout.toString()
    );

    const axiosError = new AxiosError(
      'Axios Error Gateway time out',
      HttpStatusCode.GatewayTimeout.toString()
    );

    expect(() => {
      errorHandlerRegistry.resposeErrorHandler(axiosError);
    }).toThrow('Axios Error Gateway time out');

    expect(handleErrorObjectSpy).toHaveBeenCalledTimes(0);
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(errorHandlerFunction).toHaveBeenCalledWith(axiosError);
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(axiosError.message)
    );
  });

  it('04 - 05 Throw handler type of function that return an ErrorHandlerObject, send error to grafana and throw the error.', () => {
    const axiosError = new AxiosError(
      'Axios Internal Server Error',
      HttpStatusCode.InternalServerError.toString()
    );

    expect(() => {
      errorHandlerRegistry.resposeErrorHandler(axiosError);
    }).toThrow('Axios Internal Server Error');

    expect(handleErrorObjectSpy).toHaveBeenCalledWith(axiosError, {
      message: axiosError.message,
    });
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(axiosError.message)
    );
  });

  it('04 - 06 Throw empty handler, not send error to grafana and throw the error.', () => {
    const axiosError = new AxiosError(
      'Axios Conflict Error',
      HttpStatusCode.Conflict.toString()
    );

    expect(() => {
      errorHandlerRegistry.resposeErrorHandler(axiosError);
    }).toThrow('Axios Conflict Error');

    expect(handleErrorObjectSpy).toHaveBeenCalledTimes(0);
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledTimes(0);
  });
});

describe('05 ErrorHandlerRegistry: responseErrorHandler function', () => {
  const errorHandlerRegistry = new ErrorHandlerRegistry(
    undefined,
    errorHandlers
  );

  const handleErrorObjectSpy = jest.spyOn(
    errorHandlerRegistry,
    'handleErrorObject'
  );

  const handleErrorSpy = jest.spyOn(errorHandlerRegistry, 'handleError');

  it('05 - 01 Receive error in null, send unrecoverrable error message to grafana and throw the error.', () => {
    expect(() => {
      errorHandlerRegistry.resposeErrorHandler(null);
    }).toThrow(GlobalErrorHandlerMessages.Unrecoverrable);

    expect(handleErrorObjectSpy).toHaveBeenCalledTimes(1);
    expect(handleErrorSpy).toHaveBeenCalledTimes(0);
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(GlobalErrorHandlerMessages.Unrecoverrable)
    );
  });

  it('05 - 02 Receive error not added in errorHandler, must send the error to grafana and throw an error.', () => {
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

    expect(() => {
      errorHandlerRegistry.resposeErrorHandler(axiosError);
    }).toThrow('Basic error');

    expect(handleErrorObjectSpy).toHaveBeenCalledWith(axiosError, {
      message: axiosError.response?.data.description,
    });
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(axiosError.response?.data.description)
    );
  });

  it('05 - 03 Receive an error instanceof Error instead AxiosError and must send the error to grafana and throw an error.', () => {
    const errorInstance = new Error('Error typeof Error');

    expect(() => {
      errorHandlerRegistry.resposeErrorHandler(errorInstance);
    }).toThrow('Error typeof Error');

    expect(handleErrorObjectSpy).toHaveBeenCalledWith(errorInstance, {
      message: errorHandlerMessages.Error,
    });
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(errorHandlerMessages.Error)
    );
  });

  it('05 - 04 Receive an error that is not typeof Error or AxiosError, must sent to grafana the message and throw the error.', () => {
    // Use any to force an error object that is not typeof Error or AxiosError
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const personalizedError: any = {
      message: 'Other Error',
    };

    expect(() => {
      errorHandlerRegistry.resposeErrorHandler(personalizedError);
    }).toThrow(personalizedError.message);
    expect(handleErrorSpy).toHaveBeenCalledTimes(0);
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(personalizedError.message)
    );
  });

  it('05 - 05 Receive an error that not contain a message property in the errorHandler config. Must send to grafana the message of the error instance and throw the error.', () => {
    const errorHandlerRegistry = new ErrorHandlerRegistry(
      undefined,
      errorHandlers
    );

    const axiosError = new AxiosError(
      'Axios locked error',
      HttpStatusCode.Locked.toString()
    );

    expect(() => {
      errorHandlerRegistry.resposeErrorHandler(axiosError);
    }).toThrow('Axios locked error');

    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(axiosError.message)
    );
  });
});

describe('06 - ErrorHandlerRegistry: constructor', () => {
  it('06 - 01 Create a ErrorHandlerRegistry with parent, must send the error message of the parent Registry to grafana and throw the error.', () => {
    const parentErrorHandlerRegistry = new ErrorHandlerRegistry(undefined, {
      [HttpStatusCode.NotAcceptable]: {
        message: 'Parent Not Acceptable Error',
      },
    });

    const parentNotAcceptableErrorHandler = parentErrorHandlerRegistry.find(
      HttpStatusCode.NotAcceptable.toString()
    ) as ErrorHandlerObject;

    const errorHandlerRegistry = new ErrorHandlerRegistry(
      parentErrorHandlerRegistry,
      errorHandlers
    );

    const findParentErrorHandlerFuntionSpy = jest.spyOn(
      parentErrorHandlerRegistry,
      'find'
    );

    const axiosError = new AxiosError(
      'Axios Not Acceptable Error',
      HttpStatusCode.NotAcceptable.toString()
    );

    const handleErrorObjectSpy = jest.spyOn(
      errorHandlerRegistry,
      'handleErrorObject'
    );

    const handleErrorSpy = jest.spyOn(errorHandlerRegistry, 'handleError');

    expect(() => {
      errorHandlerRegistry.resposeErrorHandler(axiosError);
    }).toThrow('Axios Not Acceptable Error');

    expect(findParentErrorHandlerFuntionSpy).toHaveBeenCalledWith(
      HttpStatusCode.NotAcceptable.toString()
    );
    expect(handleErrorObjectSpy).toHaveBeenCalledWith(
      axiosError,
      parentNotAcceptableErrorHandler
    );
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledWith(
      new Error(parentNotAcceptableErrorHandler.message)
    );
  });
});
