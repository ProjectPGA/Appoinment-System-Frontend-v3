export interface JsonHeaders {
  headers: {
    'Content-Type': string;
    Accept: string;
  };
  withCredentials: boolean;
  throwGlobalErrors: boolean;
}
