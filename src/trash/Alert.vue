<template>
  <div class="relative overflow-hidden rounded-lg shadow-xl w-full max-w-sm">
    <Toast>
      <!-- Icon -->
      <div
        class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        :class="style.color"
      >
        <component :is="style.icon" class="h-5 w-5" />
      </div>

      <!-- Message -->
      <div class="ml-3 text-sm font-normal flex-1">{{ message }}</div>

      <!-- Close button -->
      <button
        @click="onClose"
        class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <XIcon class="h-5 w-5" />
      </button>
    </Toast>

    <!-- Progress Bar -->
    <div
      class="absolute bottom-0 left-0 h-1 w-full bg-gray-200 dark:bg-gray-700"
    >
      <div class="h-full animate-progress" :class="style.bar" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  TrashIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/solid";
import { computed } from "vue";

type Variant = "success" | "destructive" | "warning" | "info";

const props = defineProps<{
  message: string;
  variant?: Variant;
  onClose: () => void;
}>();

// Define the variants mapping
const variants = {
  success: {
    icon: CheckCircleIcon,
    color: "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200",
    bar: "bg-green-500",
  },
  destructive: {
    icon: TrashIcon,
    color: "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200",
    bar: "bg-red-500",
  },
  warning: {
    icon: ExclamationCircleIcon,
    color:
      "bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200",
    bar: "bg-orange-500",
  },
  info: {
    icon: InformationCircleIcon,
    color: "bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200",
    bar: "bg-blue-500",
  },
};

// Compute the current style
const style = computed(() => variants[props.variant || "success"]);
const message = props.message;
const onClose = props.onClose;
</script>
