import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/index.vue'),
      meta: {
        title: 'Trang chu',
      },
      alias: '/home',
      beforeEnter: [
        (to, from, next) => {
          console.log('2');
          next();
        },
        (to, from, next) => {
          console.log('3');
          next();
        },
      ],
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../pages/About.vue'),
    },
    {
      path: '/:username',
      name: 'Profile',
      component: () => import('../pages/User/Profile.vue'),
      children: [
        {
          path: 'post/:postName',
          name: 'PostUser',
          component: () => import('../pages/User/Post.vue'),
        },
      ],
    },
    {
      path: '/docs',
      name: 'Document',
      component: () => import('../pages/Docs.vue'),
    },
  ],

  scrollBehavior(to, from) {
    return { el: 'html', top: 0, behavior: 'smooth' };
  },
});

router.beforeEach((to, from, next) => {
  console.log('1');
  // if (to.name == 'Home') return next({ name: 'About' });
  next();
});

router.afterEach((to, from) => {
  document.title = to.name + ' - Vue';
});
