import type { LessonWithPath } from "~/types/course";

export default async () => {
  const { data: hasAccess } = await useFetch("/api/user/hasAccess", {
    headers: useRequestHeaders(["cookie"]),
  });

  return hasAccess;
};
