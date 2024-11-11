import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const course = await prisma.course.findFirst({
    select: {
      title: true,
      chapters: {
        select: {
          title: true,
          slug: true,
          number: true,
          lessons: {
            select: {
              title: true,
              slug: true,
              number: true,
            },
          },
        },
      },
    },
  });
  return course;
});
