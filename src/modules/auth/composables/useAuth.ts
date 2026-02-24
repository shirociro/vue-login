import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { authService } from "@/modules/auth/services/auth.service";

export const useAuth = () => {
  const authStore = useAuthStore();

  const login = async (email: string, password: string) => {
    const { user } = await authService.login(email, password);
    // In Pinia, we call the action directly—no .dispatch()!
    authStore.loginUser({ email: user?.email || "", role: "user" });
  };

  const register = async (email: string, password: string) => {
    const { user } = await authService.register(email, password);
    authStore.loginUser({ email: user?.email || "", role: "user" });
  };

  const logout = async () => {
    await authService.logout();
    authStore.logoutUser();
  };

  return { login, register, logout };
};