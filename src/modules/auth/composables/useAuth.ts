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

  // Optional: get state param for CSRF verification
  // const getState = (): string | null => {
  //   const params = new URLSearchParams(window.location.search);
  //   return params.get("state");
  // };

  // Wrap store login with redirect
  const login = async (email: string, password: string) => {
    await store.login(email, password);

    const redirectUri = getRedirectUri();
    // const state = getState();

    // Optionally, verify state here if you stored it previously
    // if (!isValidState(state)) return alert("Invalid login attempt");

    window.location.href = redirectUri;
  };

  // Wrap store register with optional redirect
  const register = async (email: string, password: string) => {
    await store.register(email, password);

    const redirectUri = getRedirectUri();
    const state = getState();

    // Optionally, verify state here if you stored it previously
    // if (!isValidState(state)) return alert("Invalid registration attempt");

    window.location.href = redirectUri;
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