<script setup lang="ts">
import { ref, reactive } from 'vue';
import { z } from 'zod';
import { useAuth } from '@/modules/auth/composables/useAuth';

const props = defineProps<{
  onSubmit?: (email: string, password: string) => void;
}>();

const { register } = useAuth();

// --- State ---
const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
});

const errors = ref<Record<string, string>>({});
const loading = ref(false);
const message = ref<string | null>(null);

// --- Zod Schema ---
const registerSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

// --- Methods ---
const handleSubmit = async () => {
  /* ✅ Validate */
  const result = registerSchema.safeParse(form);

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
  loading.value = true;
  message.value = null;

  try {
    await register(form.email, form.password);
    props.onSubmit?.(form.email, form.password);
    message.value = "Account created successfully!";
  } catch (error: any) {
    message.value = error.message || "Registration failed";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="animate-fade-in p-4">
    <fwb-alert 
      v-if="message" 
      :type="message.includes('successfully') ? 'success' : 'danger'"
      class="mb-4"
    >
      {{ message }}
    </fwb-alert>

    <form class="mt-4 flex flex-col gap-4" @submit.prevent="handleSubmit">
      <div>
        <fwb-label for="email">Email</fwb-label>
        <fwb-input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Work or personal email"
          size="sm"
          :validation-status="errors.email ? 'error' : undefined"
          :disabled="loading"
        >
          <template v-if="errors.email" #validationMessage>
            {{ errors.email }}
          </template>
        </fwb-input>
      </div>

      <div>
        <fwb-label for="password">Password</fwb-label>
        <fwb-input
          id="password"
          v-model="form.password"
          type="password"
          placeholder="At least 8 characters"
          size="sm"
          :validation-status="errors.password ? 'error' : undefined"
          :disabled="loading"
        >
          <template v-if="errors.password" #validationMessage>
            {{ errors.password }}
          </template>
        </fwb-input>
      </div>

      <div>
        <fwb-label for="confirmPassword">Confirm Password</fwb-label>
        <fwb-input
          id="confirmPassword"
          v-model="form.confirmPassword"
          type="password"
          placeholder="Confirm your password"
          size="sm"
          :validation-status="errors.confirmPassword ? 'error' : undefined"
          :disabled="loading"
        >
          <template v-if="errors.confirmPassword" #validationMessage>
            {{ errors.confirmPassword }}
          </template>
        </fwb-input>
      </div>

      <fwb-button
        type="submit"
        class="w-full !rounded-xl"
        :disabled="loading"
      >
        {{ loading ? "Creating account..." : "Register" }}
      </fwb-button>
    </form>
  </div>
</template>