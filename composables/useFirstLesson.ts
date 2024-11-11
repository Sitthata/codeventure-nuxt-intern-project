export default async () => {
  const course = await useCourse();
  console.log(course.value)
  return course.value.chapters[0].lessons[0];
};
