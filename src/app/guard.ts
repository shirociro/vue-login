import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function adminGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (isAdmin) next();
  else next("/portfolio");
}
