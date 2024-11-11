export default async (chapterSlug: string, lessonSlug: string) => {
  const path = `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`;
  const { data, error } = await useFetch(path);

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch ${lessonSlug} from ${chapterSlug}`,
    });
  }

  return data;
};
