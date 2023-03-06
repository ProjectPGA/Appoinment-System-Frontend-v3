import { createWebHistory, createRouter } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';

import { useAuthStore } from '@/stores/auth';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('@/views/FormValidationPage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async to => {
  if (!useAuthStore().isLogged && to.name !== 'Login') {
    return { name: 'Login' };
  }
});

export default router;
