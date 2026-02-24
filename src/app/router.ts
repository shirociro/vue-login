import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";

// Lazy-load modules
const Auth = () => import("@/modules/auth/index.vue");

const routes = [
  { path: "/", 
    component: Auth,
    meta: { layout: AuthLayout }, 
    
    redirect: "/auth" },
  {
    path: "/auth",
    component: Auth,
    meta: { layout: AuthLayout }, // Passing the component directly
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;