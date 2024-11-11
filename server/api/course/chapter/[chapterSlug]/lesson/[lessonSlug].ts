export default defineEventHandler((event) => {
  const params = event.context.params;
  if (!params) {
    throw new Error('Params are undefined');
  }
  const { chapterSlug, lessonSlug } = params;
  return `Lesson "${lessonSlug}", "${chapterSlug}"`;
});
