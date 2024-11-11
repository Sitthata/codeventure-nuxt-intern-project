import course from "~/server/courseData";

export default defineEventHandler((event) => {
  const params = event.context.params;
  if (!params) {
    throw new Error("Params are undefined");
  }
  const { chapterSlug, lessonSlug } = params;

  const chapter = course.chapters.find(
    (chapter) => chapter.slug === chapterSlug
  );

  if (!chapter) {
    throw createError({
      statusCode: 404,
      message: "Chapter not found",
    });
  }

  const lesson = chapter.lessons.find((lesson) => lesson.slug === lessonSlug);

  if (!lesson) {
    throw createError({
      statusCode: 404,
      message: "Lesson not found",
    });
  }
  return lesson
});
