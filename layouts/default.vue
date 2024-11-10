<template>
  <div
    class="p-4 pb-12 bg-gray-100 w-full h-full min-h-screen flex flex-col items-center"
  >
    <div class="prose mb-12">
      <NuxtLink to="/">
        <h1 class="text-3xl link link-hover">
          <span class="font-medium">
            Course:
            <span class="font-bold">Mastering Nuxt 3</span>
          </span>
        </h1>
      </NuxtLink>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
