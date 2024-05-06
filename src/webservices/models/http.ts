import axios, { AxiosError, AxiosInstance } from 'axios';

import { useToast } from 'vue-toastification';

const toast = useToast();

// this interface is the default response data from ours api
interface HttpData {
  code: string;
  description?: string;
  status: number;
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    raw?: boolean;
    silent?: boolean;
  }
}

// this is all errrors allowed to receive
type THttpError = Error | AxiosError | null;

// object that can be passed to our registy
interface ErrorHandlerObject {
  after?(error?: THttpError, options?: ErrorHandlerObject): void;
  before?(error?: THttpError, options?: ErrorHandlerObject): void;
  message?: string;
}

//signature of error function that can be passed to ours registry
type ErrorHandlerFunction = (
  error?: THttpError
) => ErrorHandlerObject | boolean | undefined;

//type that our registry accepts
type ErrorHandler = ErrorHandlerFunction | ErrorHandlerObject | string;

//interface for register many handlers once (object where key will be presented as search key for error handling
interface ErrorHandlerMany {
  [key: string]: ErrorHandler;
}

// type guard to identify that is an ErrorHandlerObject
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isErrorHandlerObject(value: any): value is ErrorHandlerObject {
  if (typeof value === 'object') {
    return ['message', 'after', 'before'].some(key => key in value);
  }
  return false;
}

class ErrorHandlerRegistry {
  private handlers = new Map<string, ErrorHandler>();

  private parent: ErrorHandlerRegistry | null = null;

  constructor(parent?: ErrorHandlerRegistry, input?: ErrorHandlerMany) {
    if (typeof parent !== 'undefined') this.parent = parent;
    if (typeof input !== 'undefined') this.registerMany(input);
  }

  // allow to register an handler
  register(key: string, handler: ErrorHandler) {
    this.handlers.set(key, handler);
    return this;
  }

  // unregister a handler
  unregister(key: string) {
    this.handlers.delete(key);
    return this;
  }

  // search a valid handler by key
  find(seek: string): ErrorHandler | undefined {
    const handler = this.handlers.get(seek);
    if (handler) return handler;
    return this.parent?.find(seek);
  }

  // pass an object and register all keys/value pairs as handler.
  registerMany(input: ErrorHandlerMany) {
    for (const [key, value] of Object.entries(input)) {
      this.register(key, value);
    }
    return this;
  }

  // handle error seeking for key
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

  // if the error is an ErrorHandlerObject, handle here
  handleErrorObject(error: THttpError, options: ErrorHandlerObject = {}) {
    options?.before?.(error, options);
    toast.error(options.message ?? 'Unkown Error!!');
    options?.after?.(error, options);
    return true;
  }

  // this is the function that will be registered in interceptor.
  resposeErrorHandler(
    this: ErrorHandlerRegistry,
    error: THttpError,
    direct?: boolean
  ) {
    if (error === null)
      throw new Error('Unrecoverrable error!! Error is null!');
    if (axios.isAxiosError(error)) {
      const response = error?.response;
      const config = error?.config;
      const data = response?.data as HttpData;
      if (!direct && config?.raw) throw error;
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
    } else if (error instanceof Error) {
      return this.handleError(error.name, error);
    }

    //if nothings works, throw away
    throw error;
  }
}
// create ours globalHandlers object
const globalHandlers = new ErrorHandlerRegistry();

globalHandlers.registerMany({
  //this key is sent by api when login is required
  login_required: {
    message: 'Login required!',
    //the after function will be called when the message hides.
    after: () => console.warn('redirect user to /login'),
  },
  no_input_data: 'You must fill form values here!',
  //this key is sent by api on login error.
  invalid_login: {
    message: 'Invalid credentials!',
  },
  '404': { message: 'API Page Not Found!' },
  '401': {
    message: 'Unauthorized!',
    after: () => console.error('Unauthorized'),
  },
  ERR_FR_TOO_MANY_REDIRECTS: 'Too many redirects.',
});

function createHttpInstance() {
  const instance = axios.create({});
  const responseError = (error: THttpError) =>
    globalHandlers.resposeErrorHandler(error);
  instance.interceptors.response.use(undefined, responseError);
  return instance;
}

const http: AxiosInstance = createHttpInstance();

export default http;
