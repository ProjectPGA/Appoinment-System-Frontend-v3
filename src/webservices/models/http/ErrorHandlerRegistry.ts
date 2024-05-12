import {
  ErrorHandler,
  ErrorHandlerMany,
  ErrorHandlerObject,
  THttpError,
} from '@/webservices/models/http/ErrorHandler';
import { HttpData } from '@/webservices/models/http/HttpData';

import { faro } from '@grafana/faro-web-sdk';

import axios from 'axios';

/**
 * The function `isErrorHandlerObject` checks if a value is of type `ErrorHandlerObject`.
 *
 * @param {ErrorHandlerObject | boolean | undefined} value - The `value` parameter in the
 * `isErrorHandlerObject` function can be of type `ErrorHandlerObject`, `boolean`, or `undefined`.
 *
 * @returns The function `isErrorHandlerObject` is checking if the `value` parameter is of type
 * `ErrorHandlerObject`. If the `value` is an object and contains the keys 'message', 'after', or
 * 'before', then it returns `true`, indicating that the `value` is an `ErrorHandlerObject`. Otherwise,
 * it returns `false`.
 */
export function isErrorHandlerObject(
  value: ErrorHandlerObject | boolean | undefined
): value is ErrorHandlerObject {
  if (typeof value === 'object') {
    return ['message', 'after', 'before'].some(key => key in value);
  }
  return false;
}

export default class ErrorHandlerRegistry {
  private handlers = new Map<string, ErrorHandler>();

  private parent: ErrorHandlerRegistry | null = null;

  constructor(parent?: ErrorHandlerRegistry, input?: ErrorHandlerMany) {
    if (typeof parent !== 'undefined') this.parent = parent;
    if (typeof input !== 'undefined') this.registerMany(input);
  }

  /**
   * The `register` function in TypeScript adds an error handler to a map and returns the instance for
   * chaining.
   *
   * @param {string} key - The `key` parameter is a string that is used as a unique identifier for the
   * error handler being registered.
   *
   * @param {ErrorHandler} handler - The `handler` parameter in the `register` function is of type
   * `ErrorHandler`. This means that it is expecting a function or configuration object to handle the errors.
   *
   * @returns The `register` method is returning the instance of the object (`this`) to allow for
   * method chaining.
   */
  register(key: string, handler: ErrorHandler) {
    this.handlers.set(key, handler);
    return this;
  }

  /**
   * The `unregister` function removes a handler associated with a specific key and returns the object
   * it belongs to.
   *
   * @param {string} key - The `key` parameter is a string that represents the identifier of the
   * handler that you want to unregister or remove from the collection of handlers.
   *
   * @returns The `unregister` method is returning `this`, which refers to the current object instance.
   */
  unregister(key: string) {
    this.handlers.delete(key);
    return this;
  }

  /**
   * The function `find` searches for a specific error handler based on a given string key.
   *
   * @param {string} seek - The `seek` parameter is a string that is used to search for a specific item
   * in the `handlers` map. The `find` method is trying to locate an `ErrorHandler` object in the map
   * based on the `seek` string.
   *
   * @returns {ErrorHandler | undefined} If a handler with the specified `seek` string is found in the current `handlers` map,
   * that handler will be returned. If no handler is found in the current map, the `find` method will
   * recursively call the `find` method on the parent object (if it exists) until a handler is found or
   * until the parent is `undefined`. If not found  any handler returns undefined.
   */
  find(seek: string): ErrorHandler | undefined {
    const handler = this.handlers.get(seek);
    if (handler) return handler;
    return this.parent?.find(seek);
  }

  /**
   * The function `registerMany` iterates over an object of error handlers and registers each handler
   * with a key.
   *
   * @param {ErrorHandlerMany} input - The `registerMany` function takes an object `input` as a
   * parameter. This object, `ErrorHandlerMany`, likely contains key-value pairs where the key
   * represents an error code or type, and the value represents the corresponding error handler
   * function.
   *
   * @returns The `registerMany` function is returning `this`, that contain the ErrorHanlderRegistry instance.
   */
  registerMany(input: ErrorHandlerMany) {
    for (const [key, value] of Object.entries(input)) {
      this.register(key, value);
    }
    return this;
  }

  /**
   * The handleError function in TypeScript handles errors based on the provided seek parameter and
   * error object.
   *
   * @param {ErrorHandlerRegistry} this -  The `this` parameter contain the ErrorHandlerRegistry instance
   * @param {(string | undefined)[] | string} seek - The `seek` parameter in the `handleError` function
   * can be either a string or an array of strings. It is used to search for a specific error handler
   * based on the provided key(s). If `seek` is an array, the function will iterate over each key and
   * try to find a
   * @param {THttpError} error - The `error` parameter in the `handleError` function represents an
   * instance of the `THttpError` type. This parameter is used to pass information about the error that
   * occurred, such as error codes, messages, or any other relevant details related to the error. The
   * function uses this parameter to
   *
   * @returns The `handleError` function returns a boolean value.
   */
  handleError(
    this: ErrorHandlerRegistry,
    seek: (string | undefined)[] | string,
    error: THttpError
  ): boolean {
    if (Array.isArray(seek)) {
      return seek.some(key => {
        if (key !== undefined) return this.handleError(String(key), error);
      });
    }
    const handler = this.find(String(seek));
    if (!handler) {
      return false;
    } else if (typeof handler === 'string') {
      return this.handleErrorObject(error, { message: handler });
    } else if (typeof handler === 'function') {
      const result = handler(error);
      if (isErrorHandlerObject(result))
        return this.handleErrorObject(error, result);
      return !!result;
    } else if (isErrorHandlerObject(handler)) {
      return this.handleErrorObject(error, handler);
    }
    return false;
  }

  /**
   * The function `handleErrorObject` handles HTTP errors using before and after options
   * provided in an object parameter.
   * @param {THttpError} error - The `error` parameter is of type `THttpError`, which likely represents
   * an HTTP error object containing information about the error that occurred during an HTTP request.
   * @param {ErrorHandlerObject} options - The `options` parameter is an object with the different options configured for the error.
   * @returns true
   */
  handleErrorObject(error: THttpError, options: ErrorHandlerObject) {
    const errorMessage = options?.message ?? error?.message;

    options?.before?.(error, options);
    faro.api.pushError(new Error(errorMessage));
    options?.after?.(error, options);

    return true;
  }

  /**
   * The function `responseErrorHandler` handles HTTP errors, checks for Axios errors, and throws an
   * error if no specific handling is found.
   *
   * @param {ErrorHandlerRegistry} this - The `this` parameter contain the ErrorHanlderRegistry instance
   * @param {THttpError} error - The `error` parameter in the `responseErrorHandler` function
   * represents the error object that is being handled.
   * @param {boolean} [direct] - The `direct` parameter in the `responseErrorHandler` function is an
   * optional boolean parameter. It is used to determine whether to handle the error directly without
   * any additional processing. If `direct` is set to `true`, the error will be thrown without further
   * handling.
   *
   * @returns The `resposeErrorHandler` function returns the result of handling the error based on
   * different conditions. It could return the result of calling `this.handleError` method with
   * specific parameters, or it could return the result of handling an error object with a message. If
   * none of these conditions are met, it will throw the original error.
   */
  resposeErrorHandler(
    this: ErrorHandlerRegistry,
    error: THttpError,
    direct?: boolean
  ) {
    if (error === null) {
      throw new Error('Unrecoverrable error!! Error is null!');
    }

    if (axios.isAxiosError(error)) {
      const response = error?.response;
      const config = error?.config;
      const data = response?.data as HttpData;

      if (!direct && config?.throwGlobalErrors) throw error;

      const seekers = [
        data?.code,
        error.code,
        error?.name,
        String(data?.status),
        String(response?.status),
      ];

      const result = this.handleError(seekers, error);

      if (!result) {
        if (data?.code && data?.description) {
          return this.handleErrorObject(error, {
            message: data?.description,
          });
        }
      }

      return result;
    } else if (error instanceof Error) {
      return this.handleError(error.name, error);
    }

    //if nothings works, throw away
    throw error;
  }
}
