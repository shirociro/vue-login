<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod";
import { useAuth } from "@/modules/auth/composables/useAuth";

const router = useRouter();
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const form = ref({
  email: "",
  password: "",
});

const errors = ref<Record<string, string>>({});
const { login, register} = useAuth();
const message = ref<string | null>(null);

const handleSubmit = async () => {
  const result = loginSchema.safeParse(form.value);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      const field = err.path[0] as string;
      fieldErrors[field] = err.message;
    });
    errors.value = fieldErrors;
    return;
  }

  errors.value = {};
  message.value = null;

  try {
    await login(form.value.email, form.value.password);
    // router.push("/home");
  } catch (error: any) {
    message.value = error.message;
  }
};
</script>

<template>
  <div class="animate-fade-in p-4 w-full max-w-sm mx-auto">
    <fwb-alert
      v-if="message"
      :type="message.includes('successfully') ? 'success' : 'danger'"
      class="mb-4"
    >
      {{ message }}
    </fwb-alert>

    <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
      <!-- Email -->
      <div>
        <fwb-label for="email">Email</fwb-label>
        <fwb-input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Enter your email"
          size="sm"
          :validation-status="errors.email ? 'error' : undefined"
          :disabled="loading"
        >
          <template v-if="errors.email" #validationMessage>
            {{ errors.email }}
          </template>
        </fwb-input>
      </div>

      <!-- Password -->
      <div>
        <fwb-label for="password">Password</fwb-label>
        <fwb-input
          id="password"
          v-model="form.password"
          type="password"
          placeholder="Enter your password"
          size="sm"
          :validation-status="errors.password ? 'error' : undefined"
          :disabled="loading"
        >
          <template v-if="errors.password" #validationMessage>
            {{ errors.password }}
          </template>
        </fwb-input>
      </div>

      <fwb-button type="submit" class="w-full !rounded-xl" :disabled="loading">
        {{ loading ? "Signing in..." : "Sign in" }}
      </fwb-button>
    </form>
  </div>
</template>
