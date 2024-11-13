<template>
  <div>
    <div class="mb-4 flex justify-between flex-grow items-center w-full">
      <NuxtLink to="/" class="no-underline">
        <h1 class="text-3xl font-bold link link-hover">
          {{ course.title }}
        </h1>
      </NuxtLink>
      <UserCard />
    </div>
    <div class="flex flex-row justify-center flex-grow">
      <div
        class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] flex flex-col"
      >
        <h3 class="font-bold mb-5">Chapters</h3>
        <!-- All the lessons for the course listed here -->
        <div
          class="space-y-1 mb-4 flex flex-col"
          v-for="(chapter, index) in course.chapters"
          :key="chapter.slug"
        >
          <h4 class="font-semibold flex justify-between">
            {{ chapter.title }}
            <span
              class="text-emerald-500 text-sm font-semibold"
              v-if="percentageCompleted && user"
              >{{ percentageCompleted.chapters[index] }}%</span
            >
          </h4>
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
        <div class="text-center" v-if="percentageCompleted && user">
          Course Completion:
          <span class="text-emerald-500 font-semibold"
            >{{ percentageCompleted?.course }}%</span
          >
        </div>
      </div>
      <NuxtErrorBoundary>
        <NuxtPage />
        <template #error="{ error }">
          <div class="prose p-8 bg-white rounded-md min-w-[20ch]">
            <h3 class="text-xl font-bold mb-5">
              Something went Wrong!
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
// import { useCourseProgress } from '~/stores/courseProgress';
const user = useSupabaseUser();
const course = await useCourse();
const firstLesson = await useFirstLesson();

const { percentageCompleted } = storeToRefs(useCourseProgress());

const resetError = async (error: any) => {
  // Avoid loop
  await navigateTo(firstLesson.path);
  error.value = null;
};
</script>

<style scoped></style>
