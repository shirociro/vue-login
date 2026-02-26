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

        const data = await loginRequest(email, password);

        this.token = data.token;
        this.user = data.user;

        localStorage.setItem("token", data.token);
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

        const data = await registerRequest(email, password);

        return data; // return response if needed
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