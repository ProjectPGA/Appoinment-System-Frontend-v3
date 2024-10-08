import { createWebHistory, createRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import {
  RouteNames,
  RoutePaths,
  RouteRecordRawAppointment,
} from '@/models/routes/Routes';

export const routes: RouteRecordRawAppointment[] = [
  {
    path: RoutePaths.LOGIN,
    name: RouteNames.LOGIN,
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: RoutePaths.HOME,
    name: RouteNames.HOME,
    component: () => import('@/views/AppointmentsView.vue'),
  },
  {
    path: RoutePaths.USERS,
    name: RouteNames.USERS,
    component: () => import('@/views/UsersView.vue'),
  },
  {
    path: RoutePaths.APPOINTMENTS,
    name: RouteNames.APPOINTMENTS,
    component: () => import('@/views/AppointmentsView.vue'),
  },
  {
    path: RoutePaths.REGISTER_USER,
    name: RouteNames.REGISTER_USER,
    component: () => import('@/views/RegisterUserView.vue'),
  },
  {
    path: RoutePaths.MY_ACCOUNT,
    name: RouteNames.MY_ACCOUNT,
    component: () => import('@/views/MyAccountView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async to => {
  if (!useAuthStore().isLogged && to.name !== 'Login') {
    return { name: 'Login' };
  } else if (useAuthStore().isLogged && to.name === 'Login') {
    return { name: 'home' };
  }
});

export default router;
