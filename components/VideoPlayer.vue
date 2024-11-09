<template>
  <iframe
    height="315"
    width="560"
    :src="`https://player.vimeo.com/video/${props.videoId}`"
    title="Video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</template>

<script setup lang="ts">
const props = defineProps<{
  videoId: number;
}>();
</script>

<style scoped></style>
