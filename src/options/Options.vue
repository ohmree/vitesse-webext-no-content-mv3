<template>
  <main class="p-4 text-center flex flex-column align-items-center h-screen">
    <div class="flex align-items-center">
      <prime-sliders-h class="text-6xl text-primary min-h-6 mx-2 icon-btn">
        Options
      </prime-sliders-h>
    </div>
    <p class="mb-6 opacity-50">This is the options page</p>

    <p-input-text v-model="storageDemo" label="Type to update local storage" />

    <Chart class="pb-2" />
  </main>
</template>

<script setup lang="ts">
import { storageDemo } from '~/logic/storage';
</script>

<style scoped>
.icon-btn:hover {
  filter: brightness(0.8);
}
</style>
