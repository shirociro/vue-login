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

    async login(eemail: string, password: string) {
  try {
    this.loading = true;

    const response = await loginRequest(email, password);

    // backend structure:
    // response.data.accessToken
    const accessToken = response.data.accessToken;
    const user = response.data.user;

    this.token = accessToken;
    this.user = user;

    localStorage.setItem("token", accessToken);

    return response; // VERY IMPORTANT for useAuth
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