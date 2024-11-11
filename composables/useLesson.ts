import { StorageSerializers } from "@vueuse/core";
import type { LessonWithPath } from "~/types/course";

export default async (chapterSlug: string, lessonSlug: string) => {
  const url = `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`;
  const lesson = useSessionStorage<LessonWithPath>(url, null, {
    // Seralize the data into string
    serializer: StorageSerializers.object,
  });

  if (!lesson.value) {
    const { data, error } = useFetch<LessonWithPath>(url);

    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch lesson: ${error.value.statusMessage}`,
      });
    }
    lesson.value = data.value;
  } else {
    console.log(`Getting lesson ${lessonSlug} from cache`);
  }

  return lesson;
};
