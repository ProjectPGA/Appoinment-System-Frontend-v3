import { RawAxiosRequestHeaders } from 'axios';

export interface JsonHeaders {
  headers: RawAxiosRequestHeaders;
  withCredentials: boolean;
  throwGlobalErrors: boolean;
}
