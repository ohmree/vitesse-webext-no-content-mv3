<template>
  <main class="w-full px-4 py-5 text-center">
    <Logo />
    <h1>Popup</h1>
    <p class="mt-2 opacity-50">This is the popup page</p>
    <p-button
      :loading="isOptionsPageLoading"
      icon="pi pi-sliders-h"
      label="Open options"
      @click="openOptionsPage()"
    />
    <div class="mt-2">
      <span class="opacity-50">Storage:</span> {{ storageDemo }}
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAsyncState } from '@vueuse/core';
import { storageDemo } from '~/logic/storage';

const { execute: openOptionsPage, isLoading: isOptionsPageLoading } =
  useAsyncState<void>(browser.runtime.openOptionsPage, undefined, {
    immediate: false,
  });
</script>
