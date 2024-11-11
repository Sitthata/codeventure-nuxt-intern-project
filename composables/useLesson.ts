import type { LessonWithPath } from "~/types/course";

export default async (chapterSlug: string, lessonSlug: string) => {
  const lesson = useFetchWithCache<LessonWithPath>(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  );
  return lesson;
};
