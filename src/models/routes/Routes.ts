import { RouteRecordRaw } from 'vue-router';

export enum RouteNames {
  LOGIN = 'Login',
  HOME = 'Home',
  USERS = 'users',
  APPOINTMENTS = 'Appointments',
  REGISTER_USER = 'RegisterUser',
}

export type RouteRecordRawAppointment = RouteRecordRaw & { name: RouteNames };
