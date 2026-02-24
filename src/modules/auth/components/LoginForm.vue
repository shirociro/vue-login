<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod";
import { useAuth } from "@/modules/auth/composables/useAuth";

const router = useRouter();
const { login } = useAuth();

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const form = ref({
  email: "",
  password: "",
});

const errors = ref<any>({});
const loading = ref(false);

const handleSubmit = async () => {
  const result = loginSchema.safeParse(form.value);

  if (!result.success) {
    const fieldErrors: any = {};
    result.error.issues.forEach((err) => {
      fieldErrors[err.path[0]] = err.message;
    });
    errors.value = fieldErrors;
    return;
  }

  errors.value = {};
  loading.value = true;

  try {
    await login(form.value.email, form.value.password);
    router.push("/home");
  } catch (error) {
    errors.value.password = "Invalid email or password";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="w-full max-w-sm">
    <h2 class="text-3xl font-semibold mb-2 text-gray-800">
      Welcome back
    </h2>

    <p class="text-sm text-gray-500 mb-8">
      Sign in to continue to your account
    </p>

    <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
      <!-- Email -->
      <div>
        <input
          v-model="form.email"
          type="email"
          placeholder="Enter your email"
          class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :disabled="loading"
        />
        <p v-if="errors.email" class="mt-1 text-sm text-red-500">
          {{ errors.email }}
        </p>
      </div>

      <!-- Password -->
      <div>
        <input
          v-model="form.password"
          type="password"
          placeholder="Enter your password"
          class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :disabled="loading"
        />
        <p v-if="errors.password" class="mt-1 text-sm text-red-500">
          {{ errors.password }}
        </p>
      </div>

      <button
        type="submit"
        class="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
        :disabled="loading"
      >
        {{ loading ? "Signing in..." : "Sign in" }}
      </button>
    </form>
  </div>
</template>