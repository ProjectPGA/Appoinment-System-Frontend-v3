import { apiPrefix } from '@/webservices/consts';

/* This line of code is exporting a constant variable `usersBaseUrl` of type string. It is assigning
the result of calling the `apiPrefix` function with the argument `'/users'` to the `usersBaseUrl`
variable. The `apiPrefix` function is likely used to construct the base URL for user-related
endpoints in the application. */
export const usersBaseUrl: string = apiPrefix('/users');

/* The `authWebserviceauthBaseUrls` object is exporting a set of URLs for various authentication-related
endpoints. Each property in the object represents a specific endpoint, and its value is a string
that combines the `authBaseUrl` with a specific path for that endpoint. */
export const usersWebserviceBaseUrls = {
  register: `${usersBaseUrl}/register`,
  deleteUser: `${usersBaseUrl}/`,
  getAllUsers: `${usersBaseUrl}/all`,
};
