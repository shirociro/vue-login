import { useAuthStore } from "../stores/auth.store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export const useAuth = () => {
  const store = useAuthStore();
  const router = useRouter();
  const { loading, isAuthenticated } = storeToRefs(store);

  // Helper: get redirect_uri from query params
  const getRedirectUri = (): string => {
    const params = new URLSearchParams(window.location.search);
    const redirectUri = params.get("redirect_uri") || "/tasks"; // default page
    return redirectUri;
  };

  // Helper: get state param
  const getState = (): string | null => {
    const params = new URLSearchParams(window.location.search);
    return params.get("state");
  };


  // Wrap store login with redirect
  const login = async (email: string, password: string) => {
    try {
      const response = await store.login(email, password);
      const { accessToken } = response.data;

      // Only append token to redirect URL
      const redirectUri = getRedirectUri();
      const state = getState();

      const url = new URL(redirectUri);
      url.searchParams.set("token", accessToken);
      if (state) url.searchParams.set("state", state);

      window.location.href = url.toString();
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed: " + err.response?.data?.message || err.message);
    }
  };

   const register = async (email: string, password: string) => {
    try {
      const response = await store.register(email, password);

      const { accessToken, refreshToken } = response.data;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

      const redirectUri = getRedirectUri();
      const state = getState();

      const url = new URL(redirectUri);
      url.searchParams.set("token", accessToken);
      if (state) url.searchParams.set("state", state);

      window.location.href = url.toString();
    } catch (err) {
      console.error("Register failed", err);
      alert("Register failed: " + err.response?.data?.message || err.message);
    }
  };

  const logout = () => {
    store.logout();
    router.push("/login"); // redirect after logout
  };

  return {
    login,
    logout,
    register,
    loading,
    isAuthenticated,
  };
};