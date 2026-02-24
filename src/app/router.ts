import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";

// Lazy-load modules
const Users = () => import("@/modules/users/index.vue");
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
  {
    path: "/users",
    component: Users,
    // If AdminLayout isn't imported, you can use a string or import it like AuthLayout
    meta: { layout: "AdminLayout" }, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;