<template>
  <div class="flex flex-row justify-center flex-grow">
    <div class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] flex flex-col">
      <h3 class="text-xl font-bold mb-5">Chapters</h3>
      <!-- All the lessons for the course listed here -->
      <div
        class="space-y-1 mb-4 flex flex-col"
        v-for="chapter in chapters"
        :key="chapter.slug"
      >
        <h4 class="text-lg font-semibold">{{ chapter.title }}</h4>
        <NuxtLink
          v-for="(lesson, index) in chapter.lessons"
          :key="lesson.slug"
          class="flex flex-row space-x-1 prose-sm font-normal py-1 px-4 -mx-4"
          :to="lesson.path"
          :class="{
            'text-blue-500': lesson.path === $route.fullPath,
            'text-gray-600': lesson.path !== $route.fullPath,
          }"
        >
          <span class="text-gray-500">{{ index + 1 }}.</span>
          <span class="link link-hover">{{ lesson.title }}</span>
        </NuxtLink>
      </div>
    </div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { chapters } = useCourse();
definePageMeta({
  layout: 'default',
});
</script>

<style scoped></style>
