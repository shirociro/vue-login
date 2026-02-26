import { useAuthStore } from "../stores/auth.store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export const useAuth = () => {
  const store = useAuthStore();
  const router = useRouter();
  const { loading, isAuthenticated } = storeToRefs(store);

  // Get redirect_uri from query params
  const getRedirectUri = (): string => {
    const params = new URLSearchParams(window.location.search);
    return params.get("redirect_uri") || "/tasks";
  };

  // Get state param
  const getState = (): string | null => {
    const params = new URLSearchParams(window.location.search);
    return params.get("state");
  };

  const login = async (email: string, password: string) => {
    try {
      // Just call store login (do NOT expect response)
      await store.login(email, password);

      // Read token from storage (since store was already handling it before)
      const accessToken = sessionStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found after login");
      }

      const redirectUri = getRedirectUri();
      const state = getState();

      const url = new URL(redirectUri);
      url.searchParams.set("token", accessToken);
      if (state) url.searchParams.set("state", state);

      window.location.href = url.toString();
    } catch (err: any) {
      console.error("Login failed", err);
      alert("Login failed: " + (err?.message || "Unknown error"));
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await store.register(email, password);

      const accessToken = sessionStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found after register");
      }

      const redirectUri = getRedirectUri();
      const state = getState();

      const url = new URL(redirectUri);
      url.searchParams.set("token", accessToken);
      if (state) url.searchParams.set("state", state);

      window.location.href = url.toString();
    } catch (err: any) {
      console.error("Register failed", err);
      alert("Register failed: " + (err?.message || "Unknown error"));
    }
  };

  const logout = () => {
    store.logout();
    router.push("/login");
  };

  return {
    login,
    logout,
    register,
    loading,
    isAuthenticated,
  };
};