<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import LoginForm from "@/modules/auth/components/LoginForm.vue";
import RegisterForm from "@/modules/auth/components/RegisterForm.vue";

// State: 'login' or 'register'
const mode = ref("login");

const toggleMode = () => {
  mode.value = mode.value === "login" ? "register" : "login";
};

const handleLogin = (email, password) => console.log("LOGIN", email, password);
const handleRegister = (email, password) =>
  console.log("REGISTER", email, password);

// Reactive screen width
const width = ref(window.innerWidth);

// Update width on resize
const updateWidth = () => (width.value = window.innerWidth);
onMounted(() => window.addEventListener("resize", updateWidth));
onUnmounted(() => window.removeEventListener("resize", updateWidth));

// Determine if mobile (you can change breakpoint, here 768px)
const isMobile = computed(() => width.value < 768);
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-10">
    <!-- MOBILE LAYOUT -->
    <template v-if="isMobile">
      <div
        class="flex flex-col w-full max-w-md shadow-2xl rounded-xl overflow-hidden bg-white"
      >
        <!-- Top panel: blue info -->
        <div
          class="relative flex flex-col items-center justify-center text-white px-8 text-center p-8"
        >
          <div class="absolute inset-0 bg-blue-600 bg-opacity-70"></div>
          <div class="relative z-10 w-full">
            <h2 class="mb-3 text-3xl font-bold">
              {{ mode === "login" ? "Create New Account" : "Welcome back!" }}
            </h2>

            <p class="mb-6 text-sm opacity-90">
              {{
                mode === "login"
                  ? "Enter your details to create a new account."
                  : "Log in with your email and password."
              }}
            </p>

            <Button
              color="light"
              class="w-full !rounded-xl"
              @click="toggleMode"
            >
              <strong class="text-white">
                {{ mode === "login" ? "Create an account" : "Go to login" }}
              </strong>
            </Button>
          </div>
        </div>

        <!-- Bottom panel: form -->
        <div class="flex items-center justify-center p-8 bg-white">
          <div class="w-full">
            <LoginForm v-if="mode === 'login'" @submit="handleLogin" />
            <RegisterForm v-else @submit="handleRegister" />
          </div>
        </div>
      </div>
    </template>

    <!-- DESKTOP LAYOUT -->
    <template v-else>
      <div
        class="flex w-full max-w-5xl h-[600px] shadow-2xl rounded-xl overflow-hidden bg-white mx-[300px]"
      >
        <div
          class="relative w-1/2 flex flex-col items-center justify-center text-white px-8 text-center"
        >
          <div class="absolute inset-0 bg-blue-600 bg-opacity-70"></div>

          <div class="relative z-10 w-full max-w-sm">
            <h2 class="mb-3 text-3xl font-bold">
              {{ mode === "login" ? "Create New Account" : "Welcome back!" }}
            </h2>

            <p class="mb-8 text-sm opacity-90">
              {{
                mode === "login"
                  ? "Enter your details to create a new account."
                  : "Log in with your email and password."
              }}
            </p>

            <Button
              color="light"
              class="w-full !rounded-xl"
              @click="toggleMode"
            >
              <strong class="text-white">
                {{ mode === "login" ? "Create an account" : "Go to login" }}
              </strong>
            </Button>
          </div>
        </div>

        <div class="w-1/2 flex items-center justify-center p-12">
          <div class="w-full max-w-md">
            <LoginForm v-if="mode === 'login'" @submit="handleLogin" />
            <RegisterForm v-else @submit="handleRegister" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
