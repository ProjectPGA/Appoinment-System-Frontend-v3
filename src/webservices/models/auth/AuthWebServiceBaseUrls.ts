import { apiPrefix } from '@/webservices/consts';

/* The line `export const authBaseUrl: string = apiPrefix('/auth');` is declaring a constant variable
named `authBaseUrl` of type `string`. It is assigning the value returned by the `apiPrefix`
function, which is passed the argument `'/auth'`. The purpose of this line is to set the base URL
for the authentication-related endpoints by appending `/auth` to the `apiPrefix` value. */
export const authBaseUrl: string = apiPrefix('/auth');

/* The `authWebserviceauthBaseUrls` object is exporting a set of URLs for various authentication-related
endpoints. Each property in the object represents a specific endpoint, and its value is a string
that combines the `authBaseUrl` with a specific path for that endpoint. */
export const authWebserviceBaseUrls = {
  login: `${authBaseUrl}/login`,
  logout: `${authBaseUrl}/logout`,
  register: `${authBaseUrl}/register`,
  deleteUser: `${authBaseUrl}/users/`,
  getAllUsers: `${authBaseUrl}/users/all`,
};
