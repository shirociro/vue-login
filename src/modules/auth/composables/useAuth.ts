import { useAuthStore } from "../stores/auth.store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { loginRequest } from "../services/auth.service";
export const useAuth = () => {
  const store = useAuthStore();
  const router = useRouter();
  // const { loading, isAuthenticated } = storeToRefs(store);

  // Helper: get redirect_uri from query params
  const getRedirectUri = (): string => {
    const params = new URLSearchParams(window.location.search);
    return params.get("redirect_uri") || "/tasks"; // default page
  };

  // Helper: get state param
  const getState = (): string | null => {
    const params = new URLSearchParams(window.location.search);
    return params.get("state");
  };

const login = async (email: string, password: string) => {
  try {
    const response = await loginRequest(email, password);

    console.log("Login response:", response);

    // Backend returns { data: { accessToken, refreshToken, user } }
    const { accessToken, refreshToken } = response.data;

    if (!accessToken) throw new Error("Access token missing");

    // Optional: store temporarily if you need before redirect
    // sessionStorage.setItem("accessToken", accessToken);
    // sessionStorage.setItem("refreshToken", refreshToken);

    // Prepare redirect to the task manager
    const redirectUri = getRedirectUri();
    const state = getState();
    const url = new URL(redirectUri);
    url.searchParams.set("token", accessToken);
    if (state) url.searchParams.set("state", state);

    // Redirect SSO-style
    window.location.href = url.toString();
  } catch (err: any) {
    console.error("Login failed", err);
    alert("Login failed: " + (err?.message || "Unknown error"));
  }
};
  // Wrap store register with redirect
  const register = async (email: string, password: string) => {
    try {
      const response = await store.register(email, password);

        
      // Extract tokens just like login
      const accessToken = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;
      
      if (!accessToken) {
        throw new Error("Access token not found after register");
      }

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

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

  // const logout = () => {
  //   store.logout();
  //   router.push("/login"); // redirect after logout
  // };

  return {
    login,
    // logout,
    register,
    // loading,
    // isAuthenticated,
  };
};