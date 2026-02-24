import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ email: string; role: string } | null>(null);

  function loginUser(userData: { email: string; role: string }) {
    user.value = userData;
  }

  function logoutUser() {
    user.value = null;
  }

  return { user, loginUser, logoutUser };
});