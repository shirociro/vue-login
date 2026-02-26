import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";

const AuthPage = () => import("@/modules/auth/index.vue");

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Auth",
    component: AuthPage,
    meta: { layout: AuthLayout },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;