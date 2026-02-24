<template>
  <div class="relative relative overflow-hidden">
    <fwb-card
      class="h-full min-h-[250px] flex flex-col justify-center transition-all duration-300 ease-in-out cursor-pointer"
      @click="!showForm && (showForm = true)"
    >
      <div class="p-4">
        <div
          v-if="!showForm"
          class="flex flex-col items-center justify-center space-y-2 py-4"
        >
          <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
            <svg
              class="w-6 h-6 text-blue-600 dark:text-blue-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </div>
          <span class="text-lg font-medium text-gray-900 dark:text-white"
            >Add User</span
          >
        </div>

        <div v-else class="space-y-4">
          <fwb-input
            v-model="username"
            placeholder="User name"
            label="Username"
            size="sm"
            :validation-status="
              error && error.includes('Username') ? 'error' : ''
            "
          >
            <template
              v-if="error && error.includes('Username')"
              #validationMessage
            >
              {{ error }}
            </template>
          </fwb-input>

          <fwb-input
            v-model="password"
            type="password"
            placeholder="Password"
            label="Password"
            size="sm"
            :validation-status="
              error && (error.includes('Password') || error.includes('exists'))
                ? 'error'
                : ''
            "
          >
            <template
              v-if="error && !error.includes('Username')"
              #validationMessage
            >
              {{ error }}
            </template>
          </fwb-input>

          <div
            class="absolute top-[10px] right-[10px] z-10 flex gap-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm"
          >
            <fwb-tooltip content="Confirm" placement="top">
              <template #trigger>
                <button
                  type="button"
                  @click.stop="handleAdd"
                  class="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors focus:ring-2 focus:ring-green-300 outline-none"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </template>
            </fwb-tooltip>

            <fwb-tooltip content="Cancel" placement="top">
              <template #trigger>
                <button
                  type="button"
                  @click.stop="handleCancel"
                  class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors focus:ring-2 focus:ring-red-300 outline-none"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </template>
            </fwb-tooltip>
          </div>
        </div>
      </div>
    </fwb-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FwbCard, FwbInput, FwbButton } from "flowbite-vue";

// Props
const props = defineProps({
  onAdd: { type: Function, required: true },
  existingUsers: { type: Array, default: () => [] },
});

// State
const showForm = ref(false);
const username = ref("");
const password = ref("");
const error = ref("");

// Validation Logic
const validate = () => {
  if (!username.value.trim()) {
    error.value = "Username is required";
    return false;
  }
  if (props.existingUsers.some((u) => u.username === username.value.trim())) {
    error.value = "Username already exists";
    return false;
  }
  if (!password.value || password.value.length < 6) {
    error.value = "Password must be at least 6 characters";
    return false;
  }
  error.value = "";
  return true;
};

// Handlers
const handleAdd = () => {
  if (!validate()) return;
  props.onAdd({ username: username.value.trim(), password: password.value });
  resetForm();
};

const handleCancel = () => {
  resetForm();
};

const resetForm = () => {
  username.value = "";
  password.value = "";
  error.value = "";
  showForm.value = false;
};
</script>
