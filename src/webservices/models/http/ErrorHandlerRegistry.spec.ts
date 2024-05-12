import { AxiosError, HttpStatusCode } from 'axios';
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

const errorHandlers = {
  [HttpStatusCode.Unauthorized]: { message: 'Unauthorized!' },
  [HttpStatusCode.Forbidden]: { message: 'Forbidden' },
  [HttpStatusCode.BadGateway]: 'Bad Gatway',
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
  [HttpStatusCode.BadRequest]: jest
    .fn()
    .mockImplementation((error?: THttpError): ErrorHandlerObject => {
      return {
        message: error?.message,
      };
    }),
  [HttpStatusCode.Conflict]: {},
};

describe('01 ErrorHanlderRegistry: isErrorHanlderObject function', () => {
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
  it('02 - 01 Should register an error handler', () => {
    const errorHandlerRegistry = new ErrorHandlerRegistry(
      undefined,
      errorHandlers
    );

    const findResultToBeUndefined = errorHandlerRegistry.find('Not valid key');

    expect(findResultToBeUndefined).toBe(undefined);

    errorHandlerRegistry.register(HttpStatusCode.Unauthorized.toString(), {
      message: 'Unauthorized!',
    });

    const findResultToFound = errorHandlerRegistry.find(
      HttpStatusCode.Unauthorized.toString()
    );

    expect(findResultToFound).toEqual({ message: 'Unauthorized!' });
  });
});

describe('03 ErrorHandlerRegistry: unregister function', () => {
  it('03 - 01 Should unregister an error handler', () => {
    const errorHandlerRegistry = new ErrorHandlerRegistry(
      undefined,
      errorHandlers
    );

    errorHandlerRegistry.unregister(HttpStatusCode.Unauthorized.toString());

    const findResult = errorHandlerRegistry.find(
      HttpStatusCode.Unauthorized.toString()
    );

    expect(findResult).toBe(undefined);
  });
});

describe('04 ErrorHandlerRegistry: handleError function', () => {
  it('04 - 01 Should use handleError function, throw error to grafana and return true', () => {
    const errorHandlerRegistry = new ErrorHandlerRegistry(
      undefined,
      errorHandlers
    );

    const handleErrorObjectSpy = jest.spyOn(
      errorHandlerRegistry,
      'handleErrorObject'
    );
    const handleErrorSpy = jest.spyOn(errorHandlerRegistry, 'handleError');

    const errorToTest = new AxiosError('Forbidden', '403');

    const errorResponse = errorHandlerRegistry.resposeErrorHandler(errorToTest);

    expect(errorResponse).toBe(true);
    expect(handleErrorObjectSpy).toHaveBeenCalled();
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalled();
  });

  it('04 - 02 Should use handleError function, not throw error to grafana and return false', () => {
    const errorHandlerRegistry = new ErrorHandlerRegistry(
      undefined,
      errorHandlers
    );

    const handleErrorObjectSpy = jest.spyOn(
      errorHandlerRegistry,
      'handleErrorObject'
    );
    const handleErrorSpy = jest.spyOn(errorHandlerRegistry, 'handleError');

    const axiosError = new AxiosError('Not valid key', 'Not valid key');

    const errorResponse = errorHandlerRegistry.resposeErrorHandler(axiosError);
    expect(handleErrorObjectSpy).toHaveBeenCalledTimes(0);
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledTimes(0);
    expect(errorResponse).toBe(false);
  });

  it('04 - 03 Throw handler type of string', () => {
    const errorHandlerRegistry = new ErrorHandlerRegistry(
      undefined,
      errorHandlers
    );

    const handleErrorObjectSpy = jest.spyOn(
      errorHandlerRegistry,
      'handleErrorObject'
    );

    const handleErrorSpy = jest.spyOn(errorHandlerRegistry, 'handleError');

    const axiosError = new AxiosError('Bad Gatway', '502');

    const errorResponse = errorHandlerRegistry.resposeErrorHandler(axiosError);

    expect(errorResponse).toBe(true);
    expect(handleErrorObjectSpy).toHaveBeenCalled();
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalled();
  });

  it('04 - 04 Throw handler type of function that return true and responseErrorHandler function return true', () => {
    const errorHandlerRegistry = new ErrorHandlerRegistry(
      undefined,
      errorHandlers
    );

    const handleErrorObjectSpy = jest.spyOn(
      errorHandlerRegistry,
      'handleErrorObject'
    );

    const handleErrorSpy = jest.spyOn(errorHandlerRegistry, 'handleError');
    const errorHandlerFunction = errorHandlerRegistry.find('504');

    const axiosError = new AxiosError('Gateway time out', '504');

    const errorResponse = errorHandlerRegistry.resposeErrorHandler(axiosError);

    expect(errorResponse).toBe(true);
    expect(handleErrorObjectSpy).toHaveBeenCalledTimes(0);
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(errorHandlerFunction).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalled();
  });

  it('04 - 05 Throw handler type of function that return an ErrorHandlerObject and responseErrorHandler function return true', () => {
    const errorHandlerRegistry = new ErrorHandlerRegistry(
      undefined,
      errorHandlers
    );

    const handleErrorObjectSpy = jest.spyOn(
      errorHandlerRegistry,
      'handleErrorObject'
    );

    const handleErrorSpy = jest.spyOn(errorHandlerRegistry, 'handleError');

    const axiosError = new AxiosError('Internal Server Error', '500');

    const errorResponse = errorHandlerRegistry.resposeErrorHandler(axiosError);

    expect(errorResponse).toBe(true);
    expect(handleErrorObjectSpy).toHaveBeenCalled();
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalled();
  });

  it('04 - 06 Throw handler type of function that return an ErrorHandlerObject and responseErrorHandler function return true', () => {
    const errorHandlerRegistry = new ErrorHandlerRegistry(
      undefined,
      errorHandlers
    );

    const handleErrorObjectSpy = jest.spyOn(
      errorHandlerRegistry,
      'handleErrorObject'
    );

    const handleErrorSpy = jest.spyOn(errorHandlerRegistry, 'handleError');

    const axiosError = new AxiosError('Internal Server Error', '500');

    const errorResponse = errorHandlerRegistry.resposeErrorHandler(axiosError);

    expect(errorResponse).toBe(true);
    expect(handleErrorObjectSpy).toHaveBeenCalled();
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalled();
  });

  it('04 - 07 Throw empty handler and handleError function must return false', () => {
    const errorHandlerRegistry = new ErrorHandlerRegistry(
      undefined,
      errorHandlers
    );

    const handleErrorObjectSpy = jest.spyOn(
      errorHandlerRegistry,
      'handleErrorObject'
    );

    const handleErrorSpy = jest.spyOn(errorHandlerRegistry, 'handleError');

    const axiosError = new AxiosError('Internal Server Error', '409');

    const errorResponse = errorHandlerRegistry.resposeErrorHandler(axiosError);

    expect(errorResponse).toBe(false);
    expect(handleErrorObjectSpy).toHaveBeenCalledTimes(0);
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(faro.api.pushError).toHaveBeenCalledTimes(0);
  });
});
