<template>
  <div class="prose p-8 bg-white rounded-md min-w-[20ch]">
    <h3 class="text-xl font-bold mb-5">
      {{ errorMessage }}
    </h3>
    <div v-if="isAccessDenied">
      <p>You do not have access to this lesson.</p>
      <NuxtLink
        to="/purchase"
        class="btn bg-green-500 text-white hover:bg-green-600"
      >
        Buy Full Course to Access
      </NuxtLink>
    </div>
    <div v-else>
      <p>Something went wrong while loading the lesson.</p>
      <code>{{ error.message }}</code>
    </div>
    <div class="mt-4">
      <button
        class="hover:cursor-pointer bg-gray-500 text-white font-bold py-1 px-3 rounded"
        @click="resetError(error)"
      >
        Try Again
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const firstLesson = await useFirstLesson();

// Define the props expected by this component
const props = defineProps<{
  error: NuxtError;
  resetError: (error: NuxtError) => void;
}>();

// Computed property to check if the error is access denied
const isAccessDenied = computed(() => props.error.statusCode === 401);

// Define the error message based on the error type
const errorMessage = computed(() => {
  if (isAccessDenied.value) {
    return "Access Denied";
  }
  return "Oh no, Something went wrong with the lesson!";
});
</script>

<style scoped></style>
