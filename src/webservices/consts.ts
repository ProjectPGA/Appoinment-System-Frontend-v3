// TODO. Just have this in a core module
export const BASE_URL =
  'https://os-appointment-system-backend.onrender.com/api';

export const apiPrefix = (url: string): string => BASE_URL + url;

export const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
export const htmlHeaders = {
  headers: {
    Accept: 'text/html',
  },
};
