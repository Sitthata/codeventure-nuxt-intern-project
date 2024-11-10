<template>
  <div class="p-5 bg-zinc-50">
    <h2 class="text-3xl">Welcome</h2>
    <NuxtLink class="btn" :to="`/course`"> My Lesson </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const count = ref<number>(0);

function increment() {
  count.value++;
}
</script>
