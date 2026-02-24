<template>
  <div class="flex h-screen">
    <Sidebar />
    <main class="flex-1 p-4 overflow-auto">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Sidebar from "@/shared/components/Sidebar.vue";
</script>

<style scoped>
/* Basic layout styling */
</style>
