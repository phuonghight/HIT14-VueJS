import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/docs',
      name: 'Document',
      component: () => import('../pages/Docs.vue'),
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/index.vue'),
    },
  ],
  scrollBehavior(to, from) {
    return { el: 'html', top: 0, behavior: 'smooth' };
  },
});
