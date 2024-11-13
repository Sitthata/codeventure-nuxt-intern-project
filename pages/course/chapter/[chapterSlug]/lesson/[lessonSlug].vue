<template>
  <div class="prose p-12 bg-white rounded-md max-w-[75ch]">
    <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
      Lesson {{ chapter!.number }} - {{ lesson.number }}
    </p>
    <h2 class="my-0 font-bold">{{ lesson.title }}</h2>
    <div class="flex space-x-4 mt-2 mb-8">
      <NuxtLink
        v-if="lesson.sourceUrl"
        class="link link-hover font-normal text-md text-gray-500"
        :href="lesson.sourceUrl"
      >
        Download Source Code
      </NuxtLink>
      <NuxtLink
        v-if="lesson.downloadUrl"
        class="link link-hover font-normal text-md text-gray-500"
        :href="lesson.downloadUrl"
      >
        Download Video
      </NuxtLink>
    </div>
    <VideoPlayer v-if="lesson.videoId" :videoId="lesson.videoId" />
    <div>
      <p class="mb-4">{{ lesson.text }}</p>
      <LessonCompleteButton
        v-if="user"
        :model-value="isCompleted"
        @update:model-value="courseStore.toggleComplete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCourseProgress } from "~/stores/courseProgress";
const course = await useCourse();
const route = useRoute();
const { chapterSlug, lessonSlug } = route.params as {
  chapterSlug: string;
  lessonSlug: string;
};

const lesson = await useLesson(chapterSlug as string, lessonSlug as string);
const user = useSupabaseUser();
const courseStore = useCourseProgress();

courseStore.initialize();

definePageMeta({
  middleware: [
    async function ({ params }, from) {
      const course = await useCourse();

      const chapter = course.value?.chapters.find(
        (chapter) => chapter.slug === params.chapterSlug
      );

      if (!chapter) {
        throw createError({
          statusCode: 404,
          message: "Chapter not found",
        });
      }

      const lesson = chapter.lessons.find(
        (lesson) => lesson.slug === params.lessonSlug
      );

      if (!lesson) {
        throw createError({
          statusCode: 404,
          message: "Lesson not found",
        });
      }
    },
    "auth",
  ],
});

const isCompleted = computed(() => {
  return courseStore.progress?.[chapterSlug]?.[lessonSlug] || false;
});

const chapter = computed(() => {
  return course.value?.chapters.find(
    (chapter) => chapter.slug === route.params.chapterSlug
  );
});

const title = computed(() => `${lesson.value.title} - ${chapter.value?.title}`);

useHead({
  title,
});
</script>

<style scoped></style>
