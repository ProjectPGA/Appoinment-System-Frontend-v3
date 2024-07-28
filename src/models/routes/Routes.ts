import { RouteRecordRaw } from 'vue-router';

export enum RoutePaths {
  LOGIN = '/login',
  HOME = '/',
  USERS = '/users',
  APPOINTMENTS = '/appointments',
  REGISTER_USER = '/register-user',
  MY_ACCOUNT = '/my-account',
}

export enum RouteNames {
  LOGIN = 'Login',
  HOME = 'Home',
  USERS = 'users',
  APPOINTMENTS = 'Appointments',
  REGISTER_USER = 'RegisterUser',
  MY_ACCOUNT = 'MyAccount',
}

export type RouteRecordRawAppointment = RouteRecordRaw & {
  path: RoutePaths;
  name: RouteNames;
};
