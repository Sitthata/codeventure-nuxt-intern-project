<template>
  <div class="prose p-12 bg-white rounded-md max-w-[75ch]">
    <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
      Lesson {{ chapter.number }} - {{ lesson.number }}
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
        :model-value="isLessonCompleted"
        @update:model-value="
          throw createError('Could not update lesson completion status');
        "
      />
    </div>
  </div>
</template>

<script setup>
const course = useCourse();
const route = useRoute();
const { chapterSlug, lessonSlug } = route.params;
const lesson = await useLesson(chapterSlug, lessonSlug);

definePageMeta({
  middleware: [
    function ({ params }, from) {
      const course = useCourse();

      const chapter = course.chapters.find(
        (chapter) => chapter.slug === params.chapterSlug
      );

      if (!chapter) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: "Chapter not found",
          })
        );
      }

      const lesson = chapter.lessons.find(
        (lesson) => lesson.slug === params.lessonSlug
      );

      if (!lesson) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: "Lesson not found",
          })
        );
      }
    },
    "auth",
  ],
});

const chapter = computed(() => {
  return course.chapters.find(
    (chapter) => chapter.slug === route.params.chapterSlug
  );
});

useHead({
  title: `${lesson.value.title} - ${chapter.value.title}`,
});

const progress = useLocalStorage("progress", []);

const isLessonCompleted = computed(() => {
  const chapterIndex = chapter.value.number - 1;
  const lessonIndex = lesson.value.number - 1;
  if (!progress.value[chapterIndex]) {
    return false;
  }

  if (!progress.value[chapterIndex][lessonIndex]) {
    return false;
  }

  return progress.value[chapterIndex][lessonIndex];
});

const toggleCompleted = () => {
  const chapterIndex = chapter.value.number - 1;
  const lessonIndex = lesson.value.number - 1;

  if (!progress.value[chapterIndex]) {
    progress.value[chapterIndex] = [];
  }

  progress.value[chapterIndex][lessonIndex] = !isLessonCompleted.value;
};
</script>

<style scoped></style>
