import type { LessonWithPath } from "~/types/course";

export default async (chapterSlug: string, lessonSlug: string) => {
  const { data: hasAccess, error: accessError } = await useFetch(
    "/api/user/hasAccess",
    {
      headers: useRequestHeaders(["cookie"]),
    }
  );
  const freeChapterSlug = "1-chapter-1";

  if (chapterSlug !== freeChapterSlug) {
    if (accessError.value) {
      // Handle errors from the access check
      throw createError({
        statusCode: accessError.value.statusCode || 500,
        statusMessage:
          accessError.value.statusMessage || "Failed to verify access.",
      });
    }
    
    if (!hasAccess.value) {
      // Throw a 403 Forbidden error if access is denied
      throw createError({
        statusCode: 403,
        statusMessage: "You need to buy the course to access this lesson.",
      });
    }
  }

  const lesson = useFetchWithCache<LessonWithPath>(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  );

  return lesson;
};
