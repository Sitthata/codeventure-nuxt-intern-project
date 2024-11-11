import course from "~/server/courseData";

export default defineEventHandler((event) => {
  const params = event.context.params;
  if (!params) {
    throw new Error("Params are undefined");
  }
  const { chapterSlug, lessonSlug } = params;

  return `POST GET CALLED`;
});
