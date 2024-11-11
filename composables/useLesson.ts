export default async (chapterSlug: string, lessonSlug: string) => {
    const { data, error } = await useFetch(
      `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
    );

  // Another equivalent way to fetch data
//   const { data, error } = await useAsyncData(() => 
//     $fetch(`/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`)
//   );

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch ${lessonSlug} from ${chapterSlug}`,
    });
  }

  return data;
};
