<template>
  <div>
    <div class="prose mb-12">
      <NuxtLink to="/" class="no-underline">
        <h1 class="text-3xl link link-hover">
          {{ title }}
        </h1>
      </NuxtLink>
    </div>
    <div class="flex flex-row justify-center flex-grow">
      <div
        class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] flex flex-col"
      >
        <h3 class="font-bold mb-5">Chapters</h3>
        <!-- All the lessons for the course listed here -->
        <div
          class="space-y-1 mb-4 flex flex-col"
          v-for="chapter in chapters"
          :key="chapter.slug"
        >
          <h4 class="font-semibold">{{ chapter.title }}</h4>
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
            <span>{{ lesson.title }}</span>
          </NuxtLink>
        </div>
      </div>
      <NuxtErrorBoundary>
        <NuxtPage />
        <template #error="{ error }">
          <div class="prose p-8 bg-white rounded-md min-w-[20ch]">
            <h3 class="text-xl font-bold mb-5">
              Oh no, Something wrong with the lesson!
            </h3>
            <code>{{ error }}</code>
            <div>
              <button
                class="hover:cursor-pointer bg-gray-500 text-white font-bold py-1 px-3 rounded"
                @click="resetError(error)"
              >
                Reset
              </button>
            </div>
          </div>
        </template>
      </NuxtErrorBoundary>
    </div>
  </div>
</template>

<script setup lang="ts">
const { chapters, title } = useCourse();
definePageMeta({
  layout: "default",
});

const resetError = async (error: any) => {
  // Avoid loop
  await navigateTo(
    `/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3`
  );
  error.value = null;
  // throw createError({
  //   fatal: true,
  //   message: "Fatal Error",
  // });
};
</script>

<style scoped></style>
