import { api } from "@/api/axios"; // Your Axios instance we fixed earlier

// Types for your .NET Backend responses
interface AuthResponse {
  user: {
    email: string;
    id: string;
  };
  token: string;
}

export const authService = {
  /**
   * Login user and store token
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    
    // Pro-tip: If you aren't using an interceptor for tokens yet, 
    // you can set it here manually:
    // localStorage.setItem("token", data.token);
    
    return data;
  },

  /**
   * Register a new user
   */
  async register(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/register", {
      email,
      password,
    });
    return data;
  },

  /**
   * Logout (Inform backend or just clear local data)
   */
  async logout(): Promise<void> {
    // If your backend has a logout endpoint:
    await api.post("/auth/logout");
    
    // Clear local storage
    localStorage.removeItem("token");
  },
};