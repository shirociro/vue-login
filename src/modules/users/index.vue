<script setup>
import { ref } from 'vue';
import LoginForm from "@/modules/auth/components/LoginForm.vue";
import RegisterForm from "@/modules/auth/components/RegisterForm.vue";

const mode = ref('login');

const toggleMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login';
};

const handleLogin = (e, p) => console.log("LOGIN", e, p);
const handleRegister = (e, p) => console.log("REGISTER", e, p);
</script>

<template>
  <div class="flex flex-col md:flex-row w-full min-h-screen">
    
    <div class="relative w-full md:w-1/2 flex flex-col items-center justify-center text-white p-10 md:p-12 bg-blue-600">
      <div class="absolute inset-0 bg-black opacity-10 pointer-events-none"></div>

      <div class="relative z-10 w-full text-center md:text-right flex flex-col items-center md:items-end">
        <h2 class="mb-2 text-2xl md:text-3xl font-bold">
          {{ mode === 'login' ? 'Create New Account' : 'Welcome back!' }}
        </h2>
        <p class="mb-6 text-sm opacity-90">
          {{ mode === 'login' 
              ? 'Enter your details to create a new account.' 
              : 'Log in with your email and password.' }}
        </p>
        <fwb-button
          color="light"
          class="w-full max-w-xs md:w-auto !rounded-xl"
          @click="toggleMode"
        >
          <strong class="text-blue-700">
            {{ mode === 'login' ? 'Create an account' : 'Go to login' }}
          </strong>
        </fwb-button>
      </div>
    </div>

    <div class="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-12">
      <div class="w-full max-w-sm">
        <LoginForm 
          v-if="mode === 'login'" 
          @submit="handleLogin" 
        />
        <RegisterForm 
          v-else 
          @submit="handleRegister" 
        />
      </div>
    </div>

  </div>
</template>