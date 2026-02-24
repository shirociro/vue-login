<template>
  <div class="relative relative overflow-hidden">
    <fwb-card
      class="h-full min-h-[250px] border-blue-200 dark:border-blue-800 shadow-lg"
    >
      <div class="p-4 space-y-3 mt-6">
        <div class="space-y-2">
          <fwb-input
            v-model="username"
            placeholder="User name"
            label="Edit Username"
            size="sm"
          />

          <fwb-input
            v-model="password"
            type="password"
            placeholder="New password (optional)"
            label="Edit Password"
            size="sm"
          />
        </div>
      
         <div
            class="absolute top-[10px] right-[10px] z-10 flex gap-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm"
          >
            <fwb-tooltip content="Confirm" placement="top">
              <template #trigger>
                <button
                  type="button"
                  @click.stop="handleSave"
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
                  @click="emit('cancel')"
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
    </fwb-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FwbCard, FwbInput, FwbButton } from "flowbite-vue";

// Props
const props = defineProps({
  user: { type: Object, required: true },
});

// Emits
const emit = defineEmits(["save", "cancel"]);

// Reactive state initialized from props
const username = ref(props.user.username);
const password = ref(props.user.password || "");

// Methods
const handleSave = () => {
  if (!username.value.trim()) return;

  // Emit the updated user object back to the parent
  emit("save", {
    ...props.user,
    username: username.value.trim(),
    password: password.value,
  });
};
</script>
