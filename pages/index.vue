<template>
  <div class="p-5">
    <h2 class="text-3xl">Welcome</h2>
    <div class="flex gap-2">
      <NuxtLink class="btn" :to="firstLesson.path">Get Started!</NuxtLink>
      <NuxtLink class="btn btn-outline" :to="`/login`">Login </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const firstLesson = await useFirstLesson();
</script>
