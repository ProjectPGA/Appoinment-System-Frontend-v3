import { createWebHistory, createRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import { RouteNames, RouteRecordRawAppointment } from '@/models/routes/Routes';

export const routes: RouteRecordRawAppointment[] = [
  {
    path: '/login',
    name: RouteNames.LOGIN,
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/',
    name: RouteNames.HOME,
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/users',
    name: RouteNames.USERS,
    component: () => import('@/views/UsersView.vue'),
  },
  {
    path: '/appointments',
    name: RouteNames.APPOINTMENTS,
    component: () => import('@/views/AppointmentsView.vue'),
  },
  {
    path: '/register-user',
    name: RouteNames.REGISTER_USER,
    component: () => import('@/views/RegisterUserView.vue'),
  },
  {
    path: '/my-account',
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
