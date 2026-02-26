import { defineStore } from "pinia";
import { loginRequest, registerRequest } from "../services/auth.service";

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: localStorage.getItem("token"),
    user: null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(email: string, password: string) {
      try {
        this.loading = true;

        const response = await loginRequest(email, password);

        // Based on your backend structure:
        // {
        //   ok: true,
        //   message: "...",
        //   data: { accessToken, refreshToken, user }
        // }

        const accessToken = response.data.data.accessToken;
        const user = response.data.data.user;

        if (!accessToken) {
          throw new Error("Access token missing in response");
        }

        this.token = accessToken;
        this.user = user;

        localStorage.setItem("token", accessToken);

        return response; // important for useAuth
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message || "Login failed"
        );
      } finally {
        this.loading = false;
      }
    },

    async register(email: string, password: string) {
      try {
        this.loading = true;

        const response = await registerRequest(email, password);

        return response;
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message || "Registration failed"
        );
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },
  },
});