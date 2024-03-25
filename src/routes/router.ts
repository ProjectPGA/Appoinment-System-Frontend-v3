import { createWebHistory, createRouter } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';

import { useAuthStore } from '@/stores/auth';

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
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
