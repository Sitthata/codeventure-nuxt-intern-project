<template>
  <div class="p-5 bg-zinc-50">
    <h2 class="text-3xl">{{ count }}</h2>
    <button class="btn" @click="increment">+</button>
  </div>
</template>

<script setup lang="ts">
const count = ref<number>(0);

function increment() {
  count.value++;
}
</script>
