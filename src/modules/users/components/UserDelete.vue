<template>
  <div class="relative relative overflow-hidden">
    <fwb-card
      class="h-full min-h-[250px] bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
    >
      <div class="p-5 flex flex-col items-center text-center">
        <div class="mb-2 p-2 bg-red-100 dark:bg-red-800 rounded-full">
          <svg
            class="w-5 h-5 text-red-600 dark:text-red-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div class="mb-4">
          <p class="text-sm font-bold text-red-800 dark:text-red-200">
            Delete user?
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400 italic">
            "{{ user.username }}"
          </p>
        </div>

          <div
            class="absolute top-[10px] right-[10px] z-10 flex gap-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm"
          >
            <fwb-tooltip content="Confirm" placement="top">
              <template #trigger>
                <button
                  type="button"
                  @click="$emit('confirm')"
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
                  @click="$emit('cancel')"
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
defineProps({
  user: { type: Object, required: true },
});

defineEmits(["confirm", "cancel"]);
</script>
