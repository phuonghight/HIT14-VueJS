import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../layouts/default.vue"),
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("../pages/index.vue"),
        },
        {
          path: "/login",
          name: "Login",
          component: () => import("../components/login.vue"),
        },
        {
          path: "/register",
          name: "Register",
          component: () => import("../components/register.vue"),
        },
        {
          path: "/profile/:user",
          name: "Profile",
          component: () => import("../components/profile.vue"),
        },
      ],
    },
  ],
});
router.afterEach((to, from) => {
  if (to.path !== "/" && to.name) document.title = to.name;
  else document.title = "Home";
});
