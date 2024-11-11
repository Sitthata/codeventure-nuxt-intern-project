import type { LessonWithPath } from "~/types/course";

export default async (chapterSlug: string, lessonSlug: string) => {
  const url = `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`;
  return useFetchWithCache<LessonWithPath>(url);
};
